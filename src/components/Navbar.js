"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import SearchBar from './SearchBar';

/**
 * Navbar Component - Jamoona Style
 * Features: Top bar, language selector, multi-level categories, sticky header
 */
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [language, setLanguage] = useState('EN');
    const { getCartCount } = useCart();
    const { user, logout } = useUser();

    // Expanded categories matching Jamoona structure
    const categories = [
        { name: 'Value Deals', slug: 'value-deals', icon: '💰', badge: 'Hot' },
        { name: 'Vegetables', slug: 'vegetables', icon: '🥬' },
        { name: 'Fruits', slug: 'fruits', icon: '🍎' },
        { name: 'Basmati Rice', slug: 'basmati-rice', icon: '🍚' },
        { name: 'Flour & Flatbreads', slug: 'flour-flatbreads', icon: '🫓' },
        { name: 'Lentils & Beans', slug: 'lentils-beans', icon: '🫘' },
        { name: 'Spices', slug: 'spices', icon: '🌶️' },
        { name: 'Snacks & Sweets', slug: 'snacks-sweets', icon: '🍬' },
        { name: 'Ready to Eat', slug: 'ready-to-eat', icon: '🍱' },
        { name: 'Pickles & Condiments', slug: 'pickles-condiments', icon: '🥒' },
        { name: 'Frozen', slug: 'frozen', icon: '❄️' },
        { name: 'Sauces, Oil & Ghee', slug: 'sauces-oil-ghee', icon: '🫗' },
        { name: 'Fresh Paneer & Batter', slug: 'fresh-paneer-batter', icon: '🧈' },
        { name: 'Beverages', slug: 'beverages', icon: '🥤' },
        { name: 'Household & Care', slug: 'household-care', icon: '🧹' }
    ];

    return (
        <>
            {/* Top Bar - Jamoona Style */}
            <div className="bg-green-900 text-white py-2 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span>🚚</span>
                        <span className="font-medium">Free Shipping on orders over €50</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setLanguage(language === 'EN' ? 'DE' : 'EN')}
                                className="flex items-center gap-1 hover:text-green-100 transition-colors"
                            >
                                <span>🌐</span>
                                <span className="font-medium">{language}</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-3xl">🛒</span>
                            <span className="text-2xl font-bold text-green-600">
                                FreshMart
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6 flex-1 mx-8">
                            {/* Categories Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                    onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-gray-700 font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <span>Categories</span>
                                    <svg className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in-down max-h-96 overflow-y-auto">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.slug}
                                                href={`/products?category=${category.slug}`}
                                                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-green-50 transition-colors"
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{category.icon}</span>
                                                    <span className="font-medium text-gray-700">{category.name}</span>
                                                </div>
                                                {category.badge && (
                                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                                        {category.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Search Bar */}
                            <div className="flex-1 max-w-xl">
                                <SearchBar />
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-4">
                            {/* Cart */}
                            <Link href="/cart" className="relative p-2 hover:bg-green-50 rounded-lg transition-colors">
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                                        {getCartCount()}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu */}
                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center gap-2 p-2 hover:bg-green-50 rounded-lg transition-colors">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.firstName[0]}
                                        </div>
                                        <span className="hidden lg:block font-medium text-gray-700">{user.firstName}</span>
                                    </button>

                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <Link href="/profile" className="block px-4 py-2 hover:bg-green-50 transition-colors text-gray-700">
                                            My Profile
                                        </Link>
                                        <Link href="/profile#orders" className="block px-4 py-2 hover:bg-green-50 transition-colors text-gray-700">
                                            My Orders
                                        </Link>
                                        {user.isAdmin && (
                                            <Link href="/admin" className="block px-4 py-2 hover:bg-green-50 transition-colors text-green-600 font-medium">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <hr className="my-2" />
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                                    Login
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 hover:bg-green-50 rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden pb-4">
                        <SearchBar />
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in-down max-h-96 overflow-y-auto">
                        <div className="px-4 py-2">
                            <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Categories</p>
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/products?category=${category.slug}`}
                                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{category.icon}</span>
                                        <span className="font-medium text-gray-700">{category.name}</span>
                                    </div>
                                    {category.badge && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                            {category.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
