"use client";

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';

export default function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(item.id);
        } else {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Product Image */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                {item.category === 'vegetables' && '🥬'}
                {item.category === 'fruits' && '🍎'}
                {item.category === 'meat-fish' && '🥩'}
                {item.category === 'dairy' && '🥛'}
                {item.category === 'packaged-food' && '🍝'}
                {item.category === 'household' && '🧹'}
            </div>

            {/* Product Info */}
            <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.unit}</p>
                <p className="text-lg font-bold text-purple-600">{formatPrice(item.price)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end justify-between">
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        className="w-8 h-8 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center font-bold"
                    >
                        -
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        className="w-8 h-8 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center font-bold"
                    >
                        +
                    </button>
                </div>

                <p className="text-lg font-bold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                </p>
            </div>
        </div>
    );
}
