"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { getOrders } from '@/api/order.api';
import { formatPrice, formatDate, getOrderStatusColor } from '@/utils/helpers';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated } = useUser();
    const { language } = useLanguage();
    const t = translations[language] || translations.EN;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }
        
        const fetchOrders = async () => {
            try {
                if (user?.id) {
                    const response = await getOrders({ userId: user.id });
                    setOrders(response.data || response);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [isAuthenticated, router, user?.id]);

    return (
        <div className="min-h-screen bg-[#F9F7F2] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-black text-[#003B4A] mb-12 uppercase tracking-tight">{t.my_profile}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 sticky top-28">
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#003B4A] to-[#0A9396] rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-xl shadow-[#003B4A]/20">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <h2 className="text-2xl font-black text-[#003B4A] mb-1">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-gray-400 font-bold text-sm tracking-wide">{user.email}</p>
                            </div>

                            <div className="space-y-3">
                                <a href="#profile" className="block px-6 py-4 rounded-2xl bg-[#F9F7F2] text-[#003B4A] font-black uppercase tracking-widest text-xs transition-all hover:translate-x-1">
                                    {t.profile_info}
                                </a>
                                <a href="#orders" className="block px-6 py-4 rounded-2xl hover:bg-[#F9F7F2] text-gray-400 hover:text-[#003B4A] font-black uppercase tracking-widest text-xs transition-all hover:translate-x-1">
                                    {t.order_history}
                                </a>
                                <a href="#addresses" className="block px-6 py-4 rounded-2xl hover:bg-[#F9F7F2] text-gray-400 hover:text-[#003B4A] font-black uppercase tracking-widest text-xs transition-all hover:translate-x-1">
                                    {t.saved_addresses}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Profile Information */}
                        <div id="profile" className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-gray-100">
                            <h3 className="text-2xl font-black text-[#003B4A] mb-8 uppercase tracking-wider">{t.profile_info}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{t.first_name}</label>
                                    <p className="text-[#003B4A] font-bold text-lg">{user.firstName}</p>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{t.last_name}</label>
                                    <p className="text-[#003B4A] font-bold text-lg">{user.lastName}</p>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{t.email_label}</label>
                                    <p className="text-[#003B4A] font-bold text-lg">{user.email}</p>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{t.phone_number}</label>
                                    <p className="text-[#003B4A] font-bold text-lg">{user.phone}</p>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{t.member_since}</label>
                                    <p className="text-[#003B4A] font-bold text-lg">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>

                            <button className="mt-10 bg-[#003B4A] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#003B4A]/90 transition-all shadow-lg shadow-[#003B4A]/10 active:scale-95">
                                {t.edit_profile}
                            </button>
                        </div>

                        {/* Order History */}
                        <div id="orders" className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-gray-100">
                            <h3 className="text-2xl font-black text-[#003B4A] mb-8 uppercase tracking-wider">{t.order_history}</h3>

                            {orders.length > 0 ? (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-[#F9F7F2] rounded-[2rem] p-6 transition-all hover:shadow-xl hover:shadow-[#003B4A]/5 border border-transparent hover:border-white">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                                <div>
                                                    <p className="font-black text-[#003B4A] text-xl">{order.id}</p>
                                                    <p className="text-gray-400 font-bold text-sm tracking-wide">{formatDate(order.date)}</p>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-sm ${getOrderStatusColor(order.status).replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                                                    {order.status.replace('-', ' ')}
                                                </span>
                                            </div>

                                            <div className="space-y-3 mb-6 bg-white/50 p-4 rounded-2xl">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between text-sm font-bold">
                                                        <span className="text-gray-500">
                                                            {item.productName} <span className="text-[#003B4A]/30 mx-2">×</span> {item.quantity}
                                                        </span>
                                                        <span className="text-[#003B4A]">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-[#003B4A]/5">
                                                <span className="font-black text-[#003B4A] text-lg uppercase tracking-wider">{t.total}: {formatPrice(order.total)}</span>
                                                <Link href={`/order-success?orderId=${order.id}`} className="text-green-600 font-black text-sm uppercase tracking-widest hover:underline underline-offset-8">
                                                    {t.view_details} →
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-8xl mb-6">📦</div>
                                    <p className="text-gray-500 font-bold mb-8">{t.no_orders}</p>
                                    <Link href="/products" className="bg-[#003B4A] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#003B4A]/90 transition-all shadow-xl shadow-[#003B4A]/20">
                                        {t.start_shopping}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Saved Addresses */}
                        <div id="addresses" className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-gray-100">
                            <h3 className="text-2xl font-black text-[#003B4A] mb-8 uppercase tracking-wider">{t.saved_addresses}</h3>

                            {user.addresses && user.addresses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {user.addresses.map((address) => (
                                        <div key={address.id} className="bg-[#F9F7F2] rounded-[2rem] p-6 border border-transparent hover:border-white transition-all shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="px-3 py-1 bg-[#003B4A] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    {address.type}
                                                </span>
                                                {address.isDefault && (
                                                    <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                        {t.default}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[#003B4A] font-black text-lg mb-1">{address.street}</p>
                                            <p className="text-gray-500 font-bold text-sm">
                                                {address.city}, {address.state} {address.zipCode}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-8xl mb-6">📍</div>
                                    <p className="text-gray-500 font-bold mb-8">{t.no_addresses}</p>
                                    <button className="bg-[#003B4A] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#003B4A]/90 transition-all shadow-xl shadow-[#003B4A]/10">
                                        {t.add_address}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
