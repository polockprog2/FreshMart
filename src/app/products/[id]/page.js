"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useCart } from '@/context/CartContext';
import { getProductById, products } from '@/data/products';
import { formatPrice } from '@/utils/helpers';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // In production, this would be an API call:
        // const data = await fetch(`/api/products/${params.id}`).then(r => r.json());

        const foundProduct = getProductById(params.id);

        if (foundProduct) {
            setProduct(foundProduct);

            // Get related products from same category
            const related = products
                .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
                .slice(0, 4);
            setRelatedProducts(related);
        } else {
            setError('Product not found');
        }

        setIsLoading(false);
    }, [params.id]);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity);
        setTimeout(() => setIsAdding(false), 1000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading product..." />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <ErrorMessage
                    message={error || 'Product not found'}
                    onRetry={() => router.push('/products')}
                />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-purple-600">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-purple-600">Products</Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">{product.name}</span>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="relative">
                            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-9xl">
                                {product.category === 'vegetables' && '🥬'}
                                {product.category === 'fruits' && '🍎'}
                                {product.category === 'meat-fish' && '🥩'}
                                {product.category === 'dairy' && '🥛'}
                                {product.category === 'packaged-food' && '🍝'}
                                {product.category === 'household' && '🧹'}
                            </div>

                            {product.discount > 0 && (
                                <div className="absolute top-4 right-4 badge-discount px-4 py-2 rounded-full text-lg font-bold">
                                    {product.discount}% OFF
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-lg text-gray-600">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-5xl font-bold text-purple-600">{formatPrice(product.price)}</span>
                                {product.discount > 0 && (
                                    <span className="text-2xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                                )}
                            </div>

                            <p className="text-gray-600 mb-2">Unit: <span className="font-semibold">{product.unit}</span></p>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.inStock ? (
                                    <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-red-600 font-semibold">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Quantity Selector */}
                            {product.inStock && (
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center font-bold text-xl"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-12 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center font-bold text-xl"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock || isAdding}
                                    className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg transition-all ${product.inStock
                                            ? isAdding
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {isAdding ? '✓ Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>

                                <Link href="/cart" className="btn-secondary py-4 px-8 text-lg">
                                    View Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
