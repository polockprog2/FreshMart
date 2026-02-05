"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrderById } from '@/data/orders';
import { formatPrice, formatDate } from '@/utils/helpers';

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading order details...</p>
            </div>
        </div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        if (orderId) {
            // In production, this would be an API call:
            // const orderData = await fetch(`/api/orders/${orderId}`).then(r => r.json());
            const orderData = getOrderById(orderId);
            setOrder(orderData);
        } else {
            router.push('/');
        }
    }, [searchParams, router]);

    if (!order) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Thank you for your order. We'll send you a confirmation email shortly.
                    </p>

                    {/* Order Details */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                                <p className="font-bold text-purple-600">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                                <p className="font-semibold">{formatDate(order.date)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                                <p className="font-semibold">{formatDate(order.estimatedDelivery)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                <p className="font-bold text-2xl text-purple-600">{formatPrice(order.total)}</p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-600 mb-2">Delivery Address</p>
                            <p className="font-semibold">
                                {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="text-left mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                                            🛒
                                        </div>
                                        <div>
                                            <p className="font-semibold">{item.productName}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/profile" className="btn-primary px-8 py-3">
                            View Order Details
                        </Link>
                        <Link href="/products" className="btn-secondary px-8 py-3">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
