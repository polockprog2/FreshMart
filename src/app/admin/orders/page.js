"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { orders } from '@/data/orders';
import { formatPrice, formatDate, getOrderStatusColor } from '@/utils/helpers';

export default function AdminOrdersPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [orderList, setOrderList] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
            return;
        }

        // In production, this would be an API call:
        // const data = await fetch('/api/admin/orders').then(r => r.json());
        setOrderList(orders);
    }, [isAdmin, router]);

    const filteredOrders = orderList.filter(order =>
        statusFilter === 'all' || order.status === statusFilter
    );

    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Orders Management</h1>

                {/* Filter */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field max-w-xs"
                    >
                        <option value="all">All Orders</option>
                        <option value="processing">Processing</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex flex-wrap justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-purple-600 mb-1">{order.id}</h3>
                                    <p className="text-sm text-gray-600">Ordered on {formatDate(order.date)}</p>
                                </div>
                                <span className={`badge ${getOrderStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Customer</p>
                                    <p className="font-semibold">User #{order.userId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                    <p className="font-bold text-lg text-purple-600">{formatPrice(order.total)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                                    <p className="font-semibold">{order.paymentMethod}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                                    <p className="font-semibold">{formatDate(order.estimatedDelivery)}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Order Items:</p>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.productName} x {item.quantity}
                                            </span>
                                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t mt-4 pt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-1">Delivery Address:</p>
                                <p className="text-gray-600">
                                    {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-gray-600">No orders found</p>
                    </div>
                )}

                <div className="mt-6 text-sm text-gray-600">
                    Showing {filteredOrders.length} of {orderList.length} orders
                </div>
            </div>
        </div>
    );
}
