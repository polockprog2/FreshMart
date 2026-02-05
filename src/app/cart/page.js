"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';

export default function CartPage() {
    const router = useRouter();
    const { cartItems, getCartSubtotal, getCartTax, getDeliveryFee, getCartGrandTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="text-8xl mb-6">🛒</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link href="/products" className="btn-primary text-lg px-8 py-4">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{formatPrice(getCartSubtotal())}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (8%)</span>
                                    <span className="font-semibold">{formatPrice(getCartTax())}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold">
                                        {getDeliveryFee() === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            formatPrice(getDeliveryFee())
                                        )}
                                    </span>
                                </div>

                                {getCartSubtotal() < 50 && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="text-sm text-blue-800">
                                            Add {formatPrice(50 - getCartSubtotal())} more for FREE delivery!
                                        </p>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="text-purple-600">{formatPrice(getCartGrandTotal())}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push('/checkout')}
                                className="w-full btn-primary text-lg py-4"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                href="/products"
                                className="block text-center mt-4 text-purple-600 hover:text-purple-700 font-medium"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
