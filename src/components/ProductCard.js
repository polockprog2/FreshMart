"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';

/**
 * ProductCard Component - Jamoona Style
 * Features: Sale badges, unit pricing, clean white design, add to cart inside tile
 */
export default function ProductCard({ product, badgeType = null }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 1000);
    };

    // Determine badge based on product discount or badgeType prop
    const getBadge = () => {
        if (badgeType === 'weekly-deal') {
            return { text: 'Weekly Deal', className: 'sale-badge' };
        }
        if (badgeType === 'value-deal' || product.discount >= 20) {
            return { text: 'Value Deal', className: 'value-badge' };
        }
        if (product.discount > 0) {
            return { text: `–${product.discount}% SALE`, className: 'sale-badge' };
        }
        return null;
    };

    const badge = getBadge();

    return (
        <Link href={`/products/${product.id}`} className="block group">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    {/* Badge */}
                    {badge && (
                        <div className={`absolute top-2 left-2 z-10 ${badge.className}`}>
                            {badge.text}
                        </div>
                    )}

                    {/* Placeholder image - in production, use actual product image */}
                    <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                        {product.category === 'vegetables' && '🥬'}
                        {product.category === 'fruits' && '🍎'}
                        {product.category === 'meat-fish' && '🥩'}
                        {product.category === 'dairy' && '🥛'}
                        {product.category === 'packaged-food' && '🍝'}
                        {product.category === 'household' && '🧹'}
                        {!['vegetables', 'fruits', 'meat-fish', 'dairy', 'packaged-food', 'household'].includes(product.category) && '🛒'}
                    </div>

                    {/* Out of stock overlay */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Unit Info */}
                    <p className="text-sm text-gray-500 mb-2">{product.unit || '1 unit'}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3 mt-auto">
                        <span className="text-xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock || isAdding}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${product.inStock
                                ? isAdding
                                    ? 'bg-green-700 text-white'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isAdding ? '✓ Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </Link>
    );
}
