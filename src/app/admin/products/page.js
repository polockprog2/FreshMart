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
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'vegetables',
        price: '',
        discount: '0',
        inStock: true
    });

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
            return;
        }
        setProductList(products);
    }, [isAdmin, router]);

    const filteredProducts = productList.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProductList(productList.filter(p => p.id !== productId));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            discount: product.discount,
            inStock: product.inStock
        });
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            category: 'vegetables',
            price: '',
            discount: '0',
            inStock: true
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingProduct) {
            setProductList(productList.map(p =>
                p.id === editingProduct.id ? { ...p, ...formData } : p
            ));
        } else {
            const newProduct = {
                id: Math.max(...productList.map(p => p.id), 0) + 1,
                ...formData,
                rating: 4.5,
                reviews: 0
            };
            setProductList([...productList, newProduct]);
        }
        setShowModal(false);
    };

    const toggleStock = (productId) => {
        setProductList(productList.map(p =>
            p.id === productId ? { ...p, inStock: !p.inStock } : p
        ));
    };

    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900">Product Management</h1>
                        <p className="text-slate-600 mt-2">Manage all products in your inventory</p>
                    </div>
                    <button 
                        onClick={handleAddNew}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        + Add New Product
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">🔍 Search Products</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name..."
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📂 Filter by Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="all">All Categories</option>
                                <option value="vegetables">🥬 Vegetables</option>
                                <option value="fruits">🍎 Fruits</option>
                                <option value="meat-fish">🥩 Meat & Fish</option>
                                <option value="dairy">🥛 Dairy</option>
                                <option value="packaged-food">🍝 Packaged Food</option>
                                <option value="household">🧹 Household</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📊 Total Products</label>
                            <div className="px-4 py-2.5 rounded-lg bg-blue-50 border-2 border-blue-200 text-2xl font-bold text-blue-600">
                                {filteredProducts.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Discount</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                                                    {product.category === 'vegetables' && '🥬'}
                                                    {product.category === 'fruits' && '🍎'}
                                                    {product.category === 'meat-fish' && '🥩'}
                                                    {product.category === 'dairy' && '🥛'}
                                                    {product.category === 'packaged-food' && '🍝'}
                                                    {product.category === 'household' && '🧹'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{product.name}</p>
                                                    <p className="text-sm text-slate-600">{product.unit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900">{formatPrice(product.price)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${product.discount > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                                                {product.discount > 0 ? `-${product.discount}%` : 'No discount'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStock(product.id)}
                                                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${product.inStock ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                                            >
                                                {product.inStock ? '✓ In Stock' : '✗ Out'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="font-bold text-slate-900">{product.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-600 hover:text-blue-700 font-bold text-sm hover:bg-blue-50 px-3 py-1 rounded transition-colors"
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-700 font-bold text-sm hover:bg-red-50 px-3 py-1 rounded transition-colors"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-slate-600 text-lg font-medium">No products found</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="vegetables">Vegetables</option>
                                        <option value="fruits">Fruits</option>
                                        <option value="meat-fish">Meat & Fish</option>
                                        <option value="dairy">Dairy</option>
                                        <option value="packaged-food">Packaged Food</option>
                                        <option value="household">Household</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Price</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Discount %</label>
                                        <input
                                            type="number"
                                            value={formData.discount}
                                            onChange={(e) => setFormData({...formData, discount: parseInt(e.target.value)})}
                                            className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.inStock}
                                        onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                                        className="w-5 h-5 rounded accent-blue-500"
                                    />
                                    <label className="text-sm font-bold text-slate-700">In Stock</label>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 rounded-lg border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
