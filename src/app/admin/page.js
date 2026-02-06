"use client";

import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/api/dashboard.api';
import Link from 'next/link';

/**
 * Enterprise Dashboard Overview
 */
export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200"></div>
                    ))}
                </div>
                <div className="h-96 bg-white rounded-2xl border border-slate-200"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Welcome back! Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-[#003B4A] rounded-xl text-sm font-bold text-white hover:bg-[#002B36] transition-colors shadow-sm">
                        Create New Listing
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats?.kpis.map((kpi) => (
                    <div key={kpi.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 group-hover:bg-[#003B4A] group-hover:text-white transition-colors">
                                {kpi.icon === 'shopping-bag' && (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                )}
                                {kpi.icon === 'euro' && (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                )}
                                {kpi.icon === 'users' && (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                )}
                                {kpi.icon === 'alert-triangle' && (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" /></svg>
                                )}
                            </div>
                            <span className={`text-xs font-black px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-wider">{kpi.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 mt-1">{kpi.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900">Revenue Analytics</h3>
                            <p className="text-slate-500 text-xs font-medium">Monthly sales performance and trends</p>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    {/* Visual Chart Placeholder */}
                    <div className="h-64 flex items-end gap-2 px-2">
                        {stats?.salesData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-slate-100 group-hover:bg-[#003B4A] transition-all duration-300 rounded-t-lg relative"
                                    style={{ height: `${(data.sales / 4000) * 100}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        €{data.sales}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{data.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 mb-6">Recent Orders</h3>
                    <div className="space-y-6">
                        {stats?.recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#F9F7F2] rounded-xl flex items-center justify-center text-sm font-black text-[#003B4A]">
                                    #{order.id.split('-')[1]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-slate-900 truncate">€{order.total.toFixed(2)}</p>
                                    <p className="text-[10px] font-medium text-slate-500 truncate">{order.items.length} items • {order.status}</p>
                                </div>
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="p-2 text-slate-400 hover:text-[#003B4A] hover:bg-slate-50 rounded-lg transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/admin/orders"
                        className="block text-center text-xs font-black text-[#003B4A] mt-8 hover:underline uppercase tracking-wider"
                    >
                        View All Orders →
                    </Link>
                </div>
            </div>
        </div>
    );
}
