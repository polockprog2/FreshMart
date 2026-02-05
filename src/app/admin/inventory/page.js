"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { products } from '@/data/products';

export default function AdminInventoryPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [searchQuery, setSearchQuery] = useState('');

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

    const categoryColors = {
        'vegetables': 'from-green-500 to-green-600',
        'fruits': 'from-red-500 to-red-600',
        'meat-fish': 'from-orange-500 to-orange-600',
        'dairy': 'from-blue-500 to-blue-600',
        'packaged-food': 'from-amber-500 to-amber-600',
        'household': 'from-purple-500 to-purple-600'
    };

    const totalProducts = products.length;
    const inStockTotal = products.filter(p => p.inStock).length;
    const outOfStockTotal = products.filter(p => !p.inStock).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-slate-900">Inventory Status</h1>
                    <p className="text-slate-600 mt-2">Monitor stock levels across all categories</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-blue-500 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 mb-2 font-medium">Total Products</p>
                                <p className="text-5xl font-black text-blue-600">{totalProducts}</p>
                            </div>
                            <div className="text-6xl">📦</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-green-500 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 mb-2 font-medium">In Stock</p>
                                <p className="text-5xl font-black text-green-600">{inStockTotal}</p>
                                <p className="text-sm text-slate-600 mt-2">{((inStockTotal/totalProducts)*100).toFixed(0)}% availability</p>
                            </div>
                            <div className="text-6xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-red-500 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 mb-2 font-medium">Out of Stock</p>
                                <p className="text-5xl font-black text-red-600">{outOfStockTotal}</p>
                                <p className="text-sm text-slate-600 mt-2">Need attention</p>
                            </div>
                            <div className="text-6xl">⚠️</div>
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
                            <div key={category} className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all border-l-4 border-slate-300">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 bg-gradient-to-r ${categoryColors[category]} rounded-xl flex items-center justify-center text-4xl`}>
                                            {categoryIcons[category]}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">{categoryNames[category]}</h3>
                                            <p className="text-sm text-slate-600">{categoryProducts.length} products</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-600 font-medium">Stock Level</p>
                                        <p className="text-4xl font-black text-slate-900">{stockPercentage.toFixed(0)}%</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                                        <div
                                            className={`bg-gradient-to-r ${categoryColors[category]} h-4 rounded-full transition-all duration-500`}
                                            style={{ width: `${stockPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                                        <p className="text-sm text-slate-600 mb-1 font-medium">In Stock</p>
                                        <p className="text-3xl font-black text-green-600">{inStock}</p>
                                    </div>
                                    <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                                        <p className="text-sm text-slate-600 mb-1 font-medium">Out of Stock</p>
                                        <p className="text-3xl font-black text-red-600">{outOfStock}</p>
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className="mt-6 pt-6 border-t-2 border-slate-200">
                                    <p className="text-sm font-bold text-slate-700 mb-3">Products:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {categoryProducts.map(product => (
                                            <div key={product.id} className={`flex items-center justify-between p-3 rounded-lg text-sm ${product.inStock ? 'bg-green-50' : 'bg-red-50'}`}>
                                                <span className="font-medium text-slate-900">{product.name}</span>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${product.inStock ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                    {product.inStock ? '✓' : '✗'}
                                                </span>
                                            </div>
                                        ))}
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
