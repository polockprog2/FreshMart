"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { categories } from '@/data/categories';

export default function AdminCategoriesPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [categoryList, setCategoryList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        icon: ''
    });

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
            return;
        }
        setCategoryList(categories);
    }, [isAdmin, router]);

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            icon: category.icon
        });
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingCategory(null);
        setFormData({ name: '', slug: '', icon: '' });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingCategory) {
            setCategoryList(categoryList.map(c =>
                c.id === editingCategory.id ? { ...c, ...formData } : c
            ));
        } else {
            const newCategory = {
                id: Math.max(...categoryList.map(c => c.id), 0) + 1,
                ...formData
            };
            setCategoryList([...categoryList, newCategory]);
        }
        setShowModal(false);
    };

    const handleDelete = (categoryId) => {
        if (confirm('Are you sure you want to delete this category?')) {
            setCategoryList(categoryList.filter(c => c.id !== categoryId));
        }
    };

    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900">Category Management</h1>
                        <p className="text-slate-600 mt-2">Manage product categories</p>
                    </div>
                    <button 
                        onClick={handleAddNew}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-8 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        + Add Category
                    </button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryList.map((category) => (
                        <div key={category.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-amber-500">
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-5xl">{category.icon}</div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="text-blue-600 hover:text-blue-700 font-bold text-sm hover:bg-blue-50 px-3 py-1 rounded transition-colors"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-600 hover:text-red-700 font-bold text-sm hover:bg-red-50 px-3 py-1 rounded transition-colors"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{category.name}</h3>
                            <p className="text-slate-600 text-sm mb-4">Slug: <span className="font-mono bg-slate-100 px-2 py-1 rounded">{category.slug}</span></p>
                            <p className="text-slate-600 text-sm">ID: {category.id}</p>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-amber-500 focus:outline-none"
                                        placeholder="e.g., Vegetables"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Slug</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-amber-500 focus:outline-none"
                                        placeholder="e.g., vegetables"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Icon Emoji</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({...formData, icon: e.target.value})}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-amber-500 focus:outline-none text-2xl"
                                        placeholder="🥬"
                                        maxLength="2"
                                    />
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
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
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
