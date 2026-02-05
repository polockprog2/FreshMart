"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { products } from '@/data/products';
import { orders } from '@/data/orders';

export default function AdminDashboard() {
    const router = useRouter();
    const { user, isAdmin } = useUser();

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
        }
    }, [isAdmin, router]);

    if (!user || !isAdmin()) {
        return null;
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const stats = [
        { label: 'Total Products', value: products.length, icon: '📦', color: 'from-blue-500 to-blue-600', href: '/admin/products' },
        { label: 'Total Orders', value: orders.length, icon: '🛒', color: 'from-green-500 to-green-600', href: '/admin/orders' },
        { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: '💰', color: 'from-purple-500 to-purple-600', href: '/admin/orders' },
        { label: 'In Stock Items', value: products.filter(p => p.inStock).length, icon: '✅', color: 'from-emerald-500 to-emerald-600', href: '/admin/inventory' }
    ];

    const adminActions = [
        { label: 'Manage Products', icon: '📦', desc: 'Add, edit, delete products', href: '/admin/products', color: 'from-blue-50 to-blue-100', borderColor: 'border-blue-300' },
        { label: 'View Orders', icon: '📋', desc: 'Track and manage orders', href: '/admin/orders', color: 'from-green-50 to-green-100', borderColor: 'border-green-300' },
        { label: 'Inventory', icon: '📊', desc: 'Monitor stock levels', href: '/admin/inventory', color: 'from-purple-50 to-purple-100', borderColor: 'border-purple-300' },
        { label: 'Categories', icon: '🏷️', desc: 'Manage product categories', href: '/admin/categories', color: 'from-amber-50 to-amber-100', borderColor: 'border-amber-300' },
        { label: 'Users', icon: '👥', desc: 'Manage user accounts', href: '/admin/users', color: 'from-pink-50 to-pink-100', borderColor: 'border-pink-300' },
        { label: 'Settings', icon: '⚙️', desc: 'Website configuration', href: '/admin/settings', color: 'from-slate-50 to-slate-100', borderColor: 'border-slate-300' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-5xl font-black text-slate-900 mb-2">Admin Dashboard</h1>
                    <p className="text-lg text-slate-600">Welcome back, <span className="font-bold text-slate-900">{user.firstName}</span>! Here's your control center.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, index) => (
                        <Link key={index} href={stat.href} className="group">
                            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-slate-200">
                                <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
                                <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions Grid */}
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adminActions.map((action, index) => (
                            <Link key={index} href={action.href}>
                                <div className={`bg-gradient-to-br ${action.color} rounded-2xl p-6 border-2 ${action.borderColor} hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group`}>
                                    <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{action.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{action.label}</h3>
                                    <p className="text-slate-700 text-sm">{action.desc}</p>
                                    <div className="mt-4 text-slate-600 group-hover:text-slate-900 transition-colors font-semibold">
                                        Go to {action.label} →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-blue-500">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">📈 Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                <span className="text-slate-700 font-medium">Out of Stock Items</span>
                                <span className="text-2xl font-bold text-red-600">{products.filter(p => !p.inStock).length}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                                <span className="text-slate-700 font-medium">Pending Orders</span>
                                <span className="text-2xl font-bold text-amber-600">{orders.filter(o => o.status === 'processing').length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-700 font-medium">Avg Order Value</span>
                                <span className="text-2xl font-bold text-green-600">${(totalRevenue / orders.length).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-purple-500">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">🎯 Top Categories</h3>
                        <div className="space-y-4">
                            {['vegetables', 'fruits', 'dairy'].map((cat, idx) => {
                                const count = products.filter(p => p.category === cat).length;
                                return (
                                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-slate-200">
                                        <span className="text-slate-700 font-medium capitalize">{cat}</span>
                                        <span className="text-2xl font-bold text-purple-600">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">📋 Recent Activity</h2>
                    <div className="space-y-4">
                        {orders.slice(0, 3).map((order, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">{order.id}</p>
                                    <p className="text-sm text-slate-600">Status: <span className="font-semibold capitalize">{order.status}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">${order.total.toFixed(2)}</p>
                                    <p className="text-sm text-slate-600">{order.items.length} items</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
