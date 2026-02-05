"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

/**
 * ProductCard Component - Jamoona Style
 */
export default function ProductCard({ product, badgeType = null }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const { language } = useLanguage();
    const t = translations[language] || translations.EN;

    const handleAddToCart = (e) => {
        e.preventDefault();
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 1000);
    };

    // Determine badge based on product discount or badgeType prop
    const getBadge = () => {
        if (badgeType === 'weekly-deal') {
            return { text: t.cat_weekly_deals, className: 'sale-badge' };
        }
        if (badgeType === 'value-deal' || product.discount >= 20) {
            return { text: t.cat_value_deals, className: 'value-badge' };
        }
        if (product.discount > 0) {
            return { text: `–${product.discount}% ${t.sale}`, className: 'sale-badge' };
        }
        return null;
    };

    const badge = getBadge();

    return (
        <div className="relative group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:border-green-300 transform hover:scale-105 active:scale-95">
            {/* Product Image Link */}
            <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gradient-to-br from-[#F9F7F2] to-gray-100 overflow-hidden">
                {/* Badge */}
                {badge && (
                    <div className={`absolute top-3 left-3 z-10 ${badge.className} text-[10px] font-bold py-1 px-2 rounded-md shadow-lg group-hover:shadow-xl transition-shadow uppercase`}>
                        {badge.text}
                    </div>
                )}

                {/* Image container with enhanced hover */}
                <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-700 relative">
                    <span className={`drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500 ${!product.inStock ? 'grayscale opacity-50' : ''}`}>
                        {product.category === 'vegetables' && '🥬'}
                        {product.category === 'fruits' && '🍎'}
                        {product.category === 'meat-fish' && '🥩'}
                        {product.category === 'dairy' && '🥛'}
                        {product.category === 'packaged-food' && '🍝'}
                        {product.category === 'household' && '🧹'}
                        {!['vegetables', 'fruits', 'meat-fish', 'dairy', 'packaged-food', 'household'].includes(product.category) && '🛒'}
                    </span>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>

                {/* Sold Out Overlay */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-[#003B4A] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            {t.sold_out}
                        </span>
                    </div>
                )}
            </Link>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow relative">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-[#003B4A] mb-1 line-clamp-2 hover:text-green-600 transition-colors text-sm group-hover:line-clamp-none">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs text-gray-400 mb-2">{product.unit || `1 unit`}</p>

                <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                </div>

                <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-lg font-black text-[#003B4A] group-hover:text-green-600 transition-colors">
                        {formatPrice(product.price)}
                    </span>
                    {product.discount > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Plus Button - Enhanced with animations */}
                {product.inStock && (
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-125 active:scale-90 ${isAdding
                            ? 'bg-green-700 text-white shadow-xl scale-110'
                            : 'bg-[#003B4A] text-white hover:bg-green-600 hover:shadow-2xl'
                            }`}
                        aria-label={t.add_to_cart}
                    >
                        {isAdding ? (
                            <span className="text-lg animate-in zoom-in">✓</span>
                        ) : (
                            <span className="text-2xl font-light">+</span>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
