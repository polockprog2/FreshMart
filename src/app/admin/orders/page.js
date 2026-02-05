"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { orders } from '@/data/orders';
import { formatPrice, formatDate } from '@/utils/helpers';

export default function AdminOrdersPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [orderList, setOrderList] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
            return;
        }
        setOrderList(orders);
    }, [isAdmin, router]);

    const filteredOrders = orderList.filter(order =>
        statusFilter === 'all' || order.status === statusFilter
    );

    const updateOrderStatus = (orderId, newStatus) => {
        setOrderList(orderList.map(o =>
            o.id === orderId ? { ...o, status: newStatus } : o
        ));
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'processing': return 'bg-amber-100 text-amber-800 border-amber-300';
            case 'in-transit': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-slate-100 text-slate-800 border-slate-300';
        }
    };

    if (!isAdmin()) {
        return null;
    }

    const stats = [
        { label: 'Total Orders', value: orderList.length, icon: '📦', color: 'from-blue-500 to-blue-600' },
        { label: 'Processing', value: orderList.filter(o => o.status === 'processing').length, icon: '⏳', color: 'from-amber-500 to-amber-600' },
        { label: 'In Transit', value: orderList.filter(o => o.status === 'in-transit').length, icon: '🚚', color: 'from-purple-500 to-purple-600' },
        { label: 'Delivered', value: orderList.filter(o => o.status === 'delivered').length, icon: '✅', color: 'from-green-500 to-green-600' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-slate-900">Orders Management</h1>
                    <p className="text-slate-600 mt-2">Track and manage all customer orders</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-slate-300">
                            <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                                {stat.icon}
                            </div>
                            <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filter */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
                    <label className="block text-sm font-bold text-slate-700 mb-3">🔍 Filter by Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors font-medium"
                    >
                        <option value="all">All Orders ({orderList.length})</option>
                        <option value="processing">Processing ({orderList.filter(o => o.status === 'processing').length})</option>
                        <option value="in-transit">In Transit ({orderList.filter(o => o.status === 'in-transit').length})</option>
                        <option value="delivered">Delivered ({orderList.filter(o => o.status === 'delivered').length})</option>
                        <option value="cancelled">Cancelled ({orderList.filter(o => o.status === 'cancelled').length})</option>
                    </select>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                            <div 
                                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex flex-wrap justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-blue-600 mb-2">{order.id}</h3>
                                        <p className="text-sm text-slate-600">Ordered on {formatDate(order.date)}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                                        </span>
                                        <span className="text-2xl font-black text-slate-900">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedOrder === order.id && (
                                <div className="border-t-2 border-slate-200 p-6 bg-slate-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-white rounded-lg p-4">
                                            <p className="text-sm text-slate-600 mb-1 font-medium">Customer</p>
                                            <p className="font-bold text-slate-900">User #{order.userId}</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <p className="text-sm text-slate-600 mb-1 font-medium">Payment Method</p>
                                            <p className="font-bold text-slate-900">{order.paymentMethod}</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <p className="text-sm text-slate-600 mb-1 font-medium">Items</p>
                                            <p className="font-bold text-slate-900">{order.items.length} items</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <p className="text-sm text-slate-600 mb-1 font-medium">Est. Delivery</p>
                                            <p className="font-bold text-slate-900">{formatDate(order.estimatedDelivery)}</p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="bg-white rounded-lg p-4 mb-6">
                                        <p className="text-sm font-bold text-slate-700 mb-3">📦 Order Items:</p>
                                        <div className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                                                    <span className="text-slate-700">
                                                        {item.productName} <span className="font-bold">x{item.quantity}</span>
                                                    </span>
                                                    <span className="font-bold text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="bg-white rounded-lg p-4 mb-6">
                                        <p className="text-sm font-bold text-slate-700 mb-2">📍 Delivery Address:</p>
                                        <p className="text-slate-700">
                                            {order.deliveryAddress.street}<br/>
                                            {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                                        </p>
                                    </div>

                                    {/* Status Update */}
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-sm font-bold text-slate-700 mb-3">🔄 Update Status:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['processing', 'in-transit', 'delivered', 'cancelled'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => updateOrderStatus(order.id, status)}
                                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                                                        order.status === status
                                                            ? `${getStatusColor(status)} border-2`
                                                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                                    }`}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-16 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-slate-600 text-lg font-medium">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
