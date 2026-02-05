"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { products } from '@/data/products';

export default function AdminInventoryPage() {
    const router = useRouter();
    const { isAdmin } = useUser();

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
        }
    }, [isAdmin, router]);

    if (!isAdmin()) {
        return null;
    }

    // Group products by category
    const categorizedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    const categoryNames = {
        'vegetables': 'Vegetables',
        'fruits': 'Fruits',
        'meat-fish': 'Meat & Fish',
        'dairy': 'Dairy',
        'packaged-food': 'Packaged Food',
        'household': 'Household'
    };

    const categoryIcons = {
        'vegetables': '🥬',
        'fruits': '🍎',
        'meat-fish': '🥩',
        'dairy': '🥛',
        'packaged-food': '🍝',
        'household': '🧹'
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Inventory Status</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 mb-1">Total Products</p>
                                <p className="text-3xl font-bold text-gray-800">{products.length}</p>
                            </div>
                            <div className="text-5xl">📦</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 mb-1">In Stock</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {products.filter(p => p.inStock).length}
                                </p>
                            </div>
                            <div className="text-5xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 mb-1">Out of Stock</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {products.filter(p => !p.inStock).length}
                                </p>
                            </div>
                            <div className="text-5xl">⚠️</div>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-6">
                    {Object.entries(categorizedProducts).map(([category, categoryProducts]) => {
                        const inStock = categoryProducts.filter(p => p.inStock).length;
                        const outOfStock = categoryProducts.filter(p => !p.inStock).length;
                        const stockPercentage = (inStock / categoryProducts.length) * 100;

                        return (
                            <div key={category} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-4xl">{categoryIcons[category]}</span>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{categoryNames[category]}</h3>
                                            <p className="text-sm text-gray-600">{categoryProducts.length} products</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Stock Level</p>
                                        <p className="text-2xl font-bold text-purple-600">{stockPercentage.toFixed(0)}%</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                                            style={{ width: `${stockPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <p className="text-sm text-gray-600 mb-1">In Stock</p>
                                        <p className="text-xl font-bold text-green-600">{inStock}</p>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-3">
                                        <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
                                        <p className="text-xl font-bold text-red-600">{outOfStock}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
