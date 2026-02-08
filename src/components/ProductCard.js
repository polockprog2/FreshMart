"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

/**
 * ProductCard Component - Enhanced UX
 * Features: Smooth interactions, better visual hierarchy, professional styling
 */
export default function ProductCard({ product, badgeType = null }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);
    const { language } = useLanguage();
    const t = translations[language] || translations.EN;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 1200);
    };

    // Determine badge based on product discount or badgeType prop
    const getBadge = () => {
        if (badgeType === 'weekly-deal') {
            return { text: t.cat_weekly_deals, className: 'bg-gradient-to-r from-red-500 to-red-600' };
        }
        if (badgeType === 'value-deal' || product.discount >= 20) {
            return { text: t.cat_value_deals, className: 'bg-gradient-to-r from-amber-500 to-amber-600' };
        }
        if (product.discount > 0) {
            return { text: `–${product.discount}%`, className: 'bg-gradient-to-r from-green-500 to-emerald-600' };
        }
        return null;
    };

    const badge = getBadge();
    const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;

    return (
        <div className="relative group h-full">
            <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                {/* Product Image Section */}
                <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    {/* Badge */}
                    {badge && (
                        <div className={`absolute top-3 right-3 z-20 ${badge.className} text-white text-xs font-bold py-1.5 px-2.5 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 uppercase tracking-wide`}>
                            {badge.text}
                        </div>
                    )}

                    {/* Image container */}
                    <div className="w-full h-full flex items-center justify-center relative p-4 bg-white">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className={`object-contain group-hover:scale-110 transition-transform duration-500 p-4 ${!product.inStock ? 'grayscale opacity-40' : ''}`}
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                            />
                        ) : (
                            <span className={`text-6xl transition-transform duration-500 group-hover:scale-110 ${!product.inStock ? 'grayscale opacity-40' : ''}`}>
                                {product.category === 'vegetables' && '�'}
                                {product.category === 'fruits' && '�'}
                                {product.category === 'meat-fish' && '�'}
                                {product.category === 'dairy' && '🥛'}
                                {product.category === 'packaged-food' && '🍝'}
                                {product.category === 'household' && '🧹'}
                                {!['vegetables', 'fruits', 'meat-fish', 'dairy', 'packaged-food', 'household'].includes(product.category) && '🛒'}
                            </span>
                        )}
                    </div>

                    {/* Sold Out Overlay */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <span className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                                {t.sold_out}
                            </span>
                        </div>
                    )}

                    {/* Quick View Overlay */}
                    {product.inStock && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-white text-sm font-semibold bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                                View Details
                            </div>
                        </div>
                    )}
                </Link>

                {/* Product Info Section */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Product Name */}
                    <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors text-sm leading-tight group-hover:text-green-600">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Unit */}
                    <p className="text-xs text-gray-500 mb-3 font-medium">{product.unit || '1 unit'}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-xs text-gray-600 font-medium">({product.rating})</span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-baseline gap-2 mb-4 mt-auto">
                        <span className="text-xl font-black text-slate-900">
                            {formatPrice(discountedPrice)}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-xs text-gray-400 line-through font-medium">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    {product.inStock ? (
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide ${
                                isAdding
                                    ? 'bg-green-600 text-white shadow-lg scale-95'
                                    : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-lg active:scale-95'
                            }`}
                            aria-label={t.add_to_cart}
                        >
                            {isAdding ? (
                                <>
                                    <span className="text-lg">✓</span>
                                    <span>Added!</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-lg">+</span>
                                    <span>Add to Cart</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            disabled
                            className="w-full py-2.5 rounded-lg font-bold text-sm bg-gray-200 text-gray-500 uppercase tracking-wide cursor-not-allowed"
                        >
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
