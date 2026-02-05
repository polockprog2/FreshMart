"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

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

    const stats = [
        { label: 'Total Products', value: '50', icon: '📦', color: 'from-blue-500 to-blue-600' },
        { label: 'Total Orders', value: '3', icon: '🛒', color: 'from-green-500 to-green-600' },
        { label: 'Total Revenue', value: '$73.73', icon: '💰', color: 'from-purple-500 to-purple-600' },
        { label: 'Active Users', value: '2', icon: '👥', color: 'from-pink-500 to-pink-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user.firstName}!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                                {stat.icon}
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/products" className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all group">
                            <div className="text-4xl mb-3">📦</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600">Manage Products</h3>
                            <p className="text-gray-600 text-sm">Add, edit, or remove products from inventory</p>
                        </Link>

                        <Link href="/admin/orders" className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all group">
                            <div className="text-4xl mb-3">📋</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600">View Orders</h3>
                            <p className="text-gray-600 text-sm">Track and manage customer orders</p>
                        </Link>

                        <Link href="/admin/inventory" className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all group">
                            <div className="text-4xl mb-3">📊</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600">Inventory Status</h3>
                            <p className="text-gray-600 text-sm">Monitor stock levels and availability</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                ✓
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">New order received</p>
                                <p className="text-sm text-gray-600">Order #ORD-2024-003 - $25.49</p>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                📦
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">Order shipped</p>
                                <p className="text-sm text-gray-600">Order #ORD-2024-002 is in transit</p>
                            </div>
                            <span className="text-sm text-gray-500">5 hours ago</span>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                👤
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">New user registered</p>
                                <p className="text-sm text-gray-600">John Doe joined FreshMart</p>
                            </div>
                            <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
