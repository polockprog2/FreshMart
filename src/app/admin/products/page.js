"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { products } from '@/data/products';
import { formatPrice } from '@/utils/helpers';

export default function AdminProductsPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [productList, setProductList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
            return;
        }

        // In production, this would be an API call:
        // const data = await fetch('/api/admin/products').then(r => r.json());
        setProductList(products);
    }, [isAdmin, router]);

    const filteredProducts = productList.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (productId) => {
        // In production, this would be an API call:
        // await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
        setProductList(productList.filter(p => p.id !== productId));
    };

    const toggleStock = (productId) => {
        // In production, this would be an API call:
        // await fetch(`/api/admin/products/${productId}`, { method: 'PATCH', body: JSON.stringify({ inStock: !product.inStock }) });
        setProductList(productList.map(p =>
            p.id === productId ? { ...p, inStock: !p.inStock } : p
        ));
    };

    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Product Management</h1>
                    <button className="btn-primary">
                        + Add New Product
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Products</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field"
                            >
                                <option value="all">All Categories</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="fruits">Fruits</option>
                                <option value="meat-fish">Meat & Fish</option>
                                <option value="dairy">Dairy</option>
                                <option value="packaged-food">Packaged Food</option>
                                <option value="household">Household</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                    {product.category === 'vegetables' && '🥬'}
                                                    {product.category === 'fruits' && '🍎'}
                                                    {product.category === 'meat-fish' && '🥩'}
                                                    {product.category === 'dairy' && '🥛'}
                                                    {product.category === 'packaged-food' && '🍝'}
                                                    {product.category === 'household' && '🧹'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                                    <p className="text-sm text-gray-600">{product.unit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="badge bg-purple-100 text-purple-800">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-800">{formatPrice(product.price)}</p>
                                            {product.discount > 0 && (
                                                <p className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStock(product.id)}
                                                className={`badge ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="font-semibold">{product.rating}</span>
                                                <span className="text-sm text-gray-500">({product.reviews})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-gray-600">No products found</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-gray-600">
                    Showing {filteredProducts.length} of {productList.length} products
                </div>
            </div>
        </div>
    );
}
