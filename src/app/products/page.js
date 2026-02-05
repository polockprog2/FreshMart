"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { products } from '@/data/products';
import { sortProducts, filterByCategory, searchProductsUtil } from '@/utils/helpers';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
            <LoadingSpinner size="lg" text="Loading products..." />
        </div>}>
            <ProductsContent />
        </Suspense>
    );
}

function ProductsContent() {
    const searchParams = useSearchParams();
    const { language } = useLanguage();
    const t = translations[language] || translations.EN;

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');

        if (categoryParam) setSelectedCategory(categoryParam);
        if (searchParam) setSearchQuery(searchParam);

        setTimeout(() => setIsLoading(false), 300);
    }, [searchParams]);

    useEffect(() => {
        let result = [...products];
        result = filterByCategory(result, selectedCategory);
        if (searchQuery) {
            result = searchProductsUtil(result, searchQuery);
        }
        result = sortProducts(result, sortBy);
        setFilteredProducts(result);
    }, [selectedCategory, searchQuery, sortBy]);

    const categories = [
        { name: t.all_products, slug: 'all' },
        { name: t.cat_fruits_veg, slug: 'vegetables' }, // Reusing keys from main nav
        { name: t.cat_fresh_frozen, slug: 'meat-fish' },
        { name: t.cat_staples, slug: 'dairy' },
        { name: t.cat_essentials, slug: 'packaged-food' },
        { name: t.cat_home_new, slug: 'household' }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
                <LoadingSpinner size="lg" text={t.loading_products} />
            </div>
        );
    }

    return (
        <div className="bg-[#F9F7F2] min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-[#003B4A] mb-3">
                        {searchQuery
                            ? t.search_results_for.replace('{{query}}', searchQuery)
                            : (selectedCategory === 'all' ? t.all_products : categories.find(c => c.slug === selectedCategory)?.name || t.all_products)}
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                        {t.showing} {filteredProducts.length} {filteredProducts.length === 1 ? t.item_singular : t.item_plural}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sticky top-28 border border-gray-100">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">{t.categories_filter}</h3>
                            <div className="space-y-2 mb-10">
                                {categories.map((category) => (
                                    <button
                                        key={category.slug}
                                        onClick={() => setSelectedCategory(category.slug)}
                                        className={`w-full text-left px-5 py-3 rounded-2xl font-bold transition-all duration-300 ${selectedCategory === category.slug
                                            ? 'bg-[#003B4A] text-white shadow-lg shadow-[#003B4A]/20 scale-[1.02]'
                                            : 'hover:bg-[#F9F7F2] text-gray-500 hover:text-[#003B4A]'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Sort Options */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">{t.sort_by}</h3>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-5 py-4 bg-[#F9F7F2] border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#003B4A]/20 text-[#003B4A] font-black uppercase tracking-wider text-xs appearance-none cursor-pointer"
                                    >
                                        <option value="newest">{t.newest}</option>
                                        <option value="price-low-high">{t.price_low_high}</option>
                                        <option value="price-high-low">{t.price_high_low}</option>
                                        <option value="rating">{t.top_rated}</option>
                                        <option value="name-a-z">{t.name_a_z}</option>
                                        <option value="name-z-a">{t.name_z_a}</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#003B4A]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-20 text-center border border-gray-100">
                                <div className="text-8xl mb-8">🔍</div>
                                <h3 className="text-3xl font-black text-[#003B4A] mb-4">{t.no_products_found}</h3>
                                <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
                                    {searchQuery
                                        ? t.no_products_matching.replace('{{query}}', searchQuery)
                                        : t.no_products_category}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSearchQuery('');
                                    }}
                                    className="bg-[#003B4A] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#003B4A]/90 transition-all shadow-xl shadow-[#003B4A]/20 active:scale-95"
                                >
                                    {t.view_all_products}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
