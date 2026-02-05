"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { products } from '@/data/products';
import { sortProducts, filterByCategory, searchProductsUtil } from '@/utils/helpers';

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get URL parameters
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');

        if (categoryParam) setSelectedCategory(categoryParam);
        if (searchParam) setSearchQuery(searchParam);

        // Simulate loading
        setTimeout(() => setIsLoading(false), 300);
    }, [searchParams]);

    useEffect(() => {
        // In production, this would be an API call:
        // const data = await fetch(`/api/products?category=${selectedCategory}&search=${searchQuery}&sort=${sortBy}`).then(r => r.json());

        let result = [...products];

        // Apply category filter
        result = filterByCategory(result, selectedCategory);

        // Apply search filter
        if (searchQuery) {
            result = searchProductsUtil(result, searchQuery);
        }

        // Apply sorting
        result = sortProducts(result, sortBy);

        setFilteredProducts(result);
    }, [selectedCategory, searchQuery, sortBy]);

    const categories = [
        { name: 'All Products', slug: 'all' },
        { name: 'Vegetables', slug: 'vegetables' },
        { name: 'Fruits', slug: 'fruits' },
        { name: 'Meat & Fish', slug: 'meat-fish' },
        { name: 'Dairy', slug: 'dairy' },
        { name: 'Packaged Food', slug: 'packaged-food' },
        { name: 'Household', slug: 'household' }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading products..." />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                    </h1>
                    <p className="text-gray-600">
                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.slug}
                                        onClick={() => setSelectedCategory(category.slug)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.slug
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                                : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Sort Options */}
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Sort By</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low-high">Price: Low to High</option>
                                    <option value="price-high-low">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="name-a-z">Name: A to Z</option>
                                    <option value="name-z-a">Name: Z to A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                                <p className="text-gray-600 mb-6">
                                    {searchQuery
                                        ? `We couldn't find any products matching "${searchQuery}"`
                                        : 'No products available in this category'}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSearchQuery('');
                                    }}
                                    className="btn-primary"
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
