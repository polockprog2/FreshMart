"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { getOrdersByUserId } from '@/data/orders';
import { formatPrice, formatDate, getOrderStatusColor } from '@/utils/helpers';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!user) {
        return null;
    }

    // In production, this would be an API call:
    // const orders = await fetch(`/api/orders?userId=${user.id}`).then(r => r.json());
    const orders = getOrdersByUserId(user.id);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>

                            <div className="space-y-2">
                                <a href="#profile" className="block px-4 py-3 rounded-lg bg-purple-50 text-purple-600 font-medium">
                                    Profile Information
                                </a>
                                <a href="#orders" className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                                    Order History
                                </a>
                                <a href="#addresses" className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                                    Saved Addresses
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Information */}
                        <div id="profile" className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                    <p className="text-gray-800 font-medium">{user.firstName}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                    <p className="text-gray-800 font-medium">{user.lastName}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <p className="text-gray-800 font-medium">{user.email}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                    <p className="text-gray-800 font-medium">{user.phone}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Member Since</label>
                                    <p className="text-gray-800 font-medium">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>

                            <button className="mt-6 btn-secondary">
                                Edit Profile
                            </button>
                        </div>

                        {/* Order History */}
                        <div id="orders" className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Order History</h3>

                            {orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="font-bold text-purple-600">{order.id}</p>
                                                    <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                                                </div>
                                                <span className={`badge ${getOrderStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                                                </span>
                                            </div>

                                            <div className="space-y-2 mb-3">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between text-sm">
                                                        <span className="text-gray-600">
                                                            {item.productName} x {item.quantity}
                                                        </span>
                                                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-center pt-3 border-t">
                                                <span className="font-bold text-gray-800">Total: {formatPrice(order.total)}</span>
                                                <Link href={`/order-success?orderId=${order.id}`} className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                                    View Details →
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">📦</div>
                                    <p className="text-gray-600 mb-4">No orders yet</p>
                                    <Link href="/products" className="btn-primary">
                                        Start Shopping
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Saved Addresses */}
                        <div id="addresses" className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Saved Addresses</h3>

                            {user.addresses && user.addresses.length > 0 ? (
                                <div className="space-y-4">
                                    {user.addresses.map((address) => (
                                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="badge bg-gray-100 text-gray-800">
                                                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                                                </span>
                                                {address.isDefault && (
                                                    <span className="badge bg-green-100 text-green-800">Default</span>
                                                )}
                                            </div>
                                            <p className="text-gray-800 font-medium">{address.street}</p>
                                            <p className="text-gray-600">
                                                {address.city}, {address.state} {address.zipCode}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">📍</div>
                                    <p className="text-gray-600 mb-4">No saved addresses</p>
                                    <button className="btn-primary">
                                        Add Address
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
