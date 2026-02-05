"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import SearchBar from './SearchBar';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

/**
 * Navbar Component - Jamoona Reference Style
 */
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const t = translations[language] || translations.EN;
    const { getCartCount } = useCart();
    const { user, logout } = useUser();

    const categories = [
        {
            name: 'STAPLES',
            slug: 'staples',
            hasDropdown: true,
            subcategories: [
                { name: 'Basmati Rice', slug: 'basmati-rice' },
                { name: 'Grains & Pulses', slug: 'grains-pulses' },
                { name: 'Atta & Flours', slug: 'atta-flours' },
                { name: 'Oils & Ghee', slug: 'oils-ghee' }
            ]
        },
        {
            name: 'ESSENTIALS',
            slug: 'essentials',
            hasDropdown: true,
            subcategories: [
                { name: 'Spices & Herbs', slug: 'spices-herbs' },
                { name: 'Sauces & Pastes', slug: 'sauces-pastes' },
                { name: 'Ready to Eat', slug: 'ready-to-eat' },
                { name: 'Snacks', slug: 'snacks' }
            ]
        },
        { name: 'FRUITS & VEGETABLES', slug: 'vegetables' },
        {
            name: 'FRESH & FROZEN',
            slug: 'frozen',
            hasDropdown: true,
            subcategories: [
                { name: 'Dairy & Eggs', slug: 'dairy-eggs' },
                { name: 'Paneer & Tofu', slug: 'paneer-tofu' },
                { name: 'Frozen Meals', slug: 'frozen-meals' },
                { name: 'Meat & Poultry', slug: 'meat-poultry' }
            ]
        },
        { name: 'BESTSELLERS', slug: 'featured' },
        { name: 'SAVE FOOD', slug: 'save-food' },
        {
            name: 'HOME & NEW',
            slug: 'new-arrivals',
            hasDropdown: true,
            subcategories: [
                { name: 'Incense & Puja', slug: 'incense-puja' },
                { name: 'Personal Care', slug: 'personal-care' },
                { name: 'Cookware', slug: 'cookware' }
            ]
        },
    ];

    return (
        <header className="w-full z-50 bg-white">
            {/* Row 1: Announcement Bar */}
            <div className="bg-[#F9F7F2] border-b border-gray-100 py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-between items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-1.5 px-2">
                            <span>📦</span> {t.announcement_shipping}
                        </div>
                        <div className="flex items-center gap-1.5 px-2">
                            <span>🏅</span> {t.announcement_startup}
                        </div>
                        <div className="flex items-center gap-1.5 px-2">
                            <span>💚</span> {t.announcement_customers}
                        </div>
                        <div className="flex items-center gap-1.5 px-2">
                            <span>🍛</span> {t.announcement_about} <Link href="/about" className="hover:text-[#003B4A] transition-colors ml-1">→ {t.about_us}</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Main Bar */}
            <div className="bg-white py-4 border-b border-gray-100 sticky top-0 md:relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
                    {/* Logo (Animated Style) */}
                    <div className="flex items-center">
                        <Link href="/" className="logo-animated">
                            <span>📦Baksho®</span>
                            <span>📦Baksho®</span>
                            <span>Find Your Need®</span>
                        </Link>
                    </div>
                    {/* Desktop Search Bar */}
                    <div className="hidden md:block flex-1 max-w-2xl px-4">
                        <SearchBar />
                    </div>

                    {/* Icons Section */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Language Switcher */}
                        <div className="relative group">
                            <div className="flex items-center gap-1 text-sm font-bold text-[#003B4A] cursor-pointer hover:opacity-80 transition-opacity">
                                <span className="text-lg">{language === 'EN' ? '🇬🇧' : '🇧🇩'}</span>
                                <span className="hidden sm:inline uppercase">{language}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Dropdown */}
                            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl py-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100]">
                                <button
                                    onClick={() => changeLanguage('EN')}
                                    className={`w-full text-left px-4 py-2 hover:bg-[#F9F7F2] flex items-center gap-2 text-xs font-bold ${language === 'EN' ? 'text-[#003B4A]' : 'text-gray-500'}`}
                                >
                                    <span>🇬🇧</span> ENGLISH
                                </button>
                                <button
                                    onClick={() => changeLanguage('BN')}
                                    className={`w-full text-left px-4 py-2 hover:bg-[#F9F7F2] flex items-center gap-2 text-xs font-bold ${language === 'BN' ? 'text-[#003B4A]' : 'text-gray-500'}`}
                                >
                                    <span>🇧🇩</span> বাংলা
                                </button>
                                <button
                                    onClick={() => changeLanguage('DE')}
                                    className={`w-full text-left px-4 py-2 hover:bg-[#F9F7F2] flex items-center gap-2 text-xs font-bold ${language === 'DE' ? 'text-[#003B4A]' : 'text-gray-500'}`}
                                >
                                    <span>🇩🇪</span> DEUTSCH
                                </button>
                            </div>
                        </div>

                        {/* Wishlist */}
                        <Link href="/wishlist" className="p-1 hover:opacity-70 transition-opacity">
                            <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </Link>

                        {/* Profile */}
                        <Link href="/profile" className="p-1 hover:opacity-70 transition-opacity">
                            <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative p-1 hover:opacity-70 transition-opacity">
                            <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#BF4136] text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
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
                            <></>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-1 text-gray-800"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden px-4 pt-3">
                    <SearchBar />
                </div>
            </div>

            {/* Row 3: Category Nav (Desktop only) */}
            <div className="hidden md:block bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 h-12">
                    {/* ! VALUE DEALS (Teal Badge) */}
                    <Link
                        href="/products?category=value-deals"
                        className="bg-[#003B4A] text-white px-4 py-1.5 rounded-full text-xs font-black italic tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                        ! VALUE DEALS
                    </Link>

                    {/* WEEKLY DEALS (Red Badge) */}
                    <Link
                        href="/products?category=weekly-deals"
                        className="bg-[#BF4136] text-white px-4 py-1.5 rounded-full text-xs font-black italic tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                        WEEKLY DEALS
                    </Link>

                    {/* Other Categories */}
                    <div className="flex items-center gap-6 h-full">
                        {categories.map((cat) => (
                            <div key={cat.name} className="relative group h-full flex items-center">
                                <Link
                                    href={`/products?category=${cat.slug}`}
                                    className="text-[12px] font-black text-[#003B4A] hover:opacity-70 transition-opacity whitespace-nowrap flex items-center gap-1"
                                >
                                    {cat.name}
                                    {cat.hasDropdown && (
                                        <svg className="w-3 h-3 text-[#003B4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {cat.hasDropdown && (
                                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                                        <div className="bg-white shadow-xl border border-gray-100 rounded-lg py-3 w-56">
                                            {cat.subcategories?.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={`/products?category=${sub.slug}`}
                                                    className="block px-4 py-2 text-xs font-bold text-gray-600 hover:text-[#003B4A] hover:bg-[#F9F7F2] transition-colors"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                        className="absolute right-0 top-0 w-80 h-full bg-white p-6 shadow-2xl animate-slide-in-right"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8 border-b pb-4">
                            <span className="text-xl font-black text-[#003B4A]">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <Link href="/products?category=value-deals" className="flex items-center text-[#003B4A] font-black italic text-lg py-2 border-b border-gray-50">
                                💰 ! VALUE DEALS
                            </Link>
                            <Link href="/products?category=weekly-deals" className="flex items-center text-[#BF4136] font-black italic text-lg py-2 border-b border-gray-50">
                                🔥 WEEKLY DEALS
                            </Link>
                            {categories.map(cat => (
                                <Link key={cat.name} href={`/products?category=${cat.slug}`} className="block font-bold text-gray-700 py-2 border-b border-gray-50 uppercase text-sm">
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
