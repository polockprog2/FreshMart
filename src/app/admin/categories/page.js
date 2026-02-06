"use client";

import { useState, useEffect } from 'react';
import { categories } from '@/data/categories';

/**
 * Enterprise Category Management
 */
export default function AdminCategoriesPage() {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const fetchCategories = async () => {
            await new Promise(r => setTimeout(r, 400));
            setCategoryList(categories);
            setIsLoading(false);
        };
        fetchCategories();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Category Management</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">Organize your products with custom categories and icons</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#003B4A] rounded-xl text-sm font-bold text-white hover:bg-[#002B36] transition-all shadow-md active:scale-95">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    [1, 2, 3, 4].map(i => (
                        <div key={i} className="h-48 bg-white border border-slate-200 rounded-2xl animate-pulse"></div>
                    ))
                ) : categoryList.map((category) => (
                    <div key={category.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-slate-400 hover:text-[#003B4A] transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                        </div>
                        <div className="w-16 h-16 bg-[#F9F7F2] rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
                        </div>
                        <h3 className="text-lg font-black text-slate-900">{category.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Slug: {category.slug}</p>

                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#003B4A] bg-[#003B4A]/5 px-2 py-1 rounded-lg">ID: {category.id}</span>
                            <button className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
