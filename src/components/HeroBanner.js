"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

/**
 * HeroBanner Component - Baksho Style
 * Large hero banner with featured product/sale and CTA button
 */
export default function HeroBanner() {
    const { language } = useLanguage();
    const t = translations[language] || translations.EN;

    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-gold-50 to-teal-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left z-10 animate-fade-in-up">
                        <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-green-200 shadow-md hover:shadow-lg transition-shadow">
                            🎉 Special Offer - Save Up to 30%
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                            {t.hero_title}
                            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{t.hero_subtitle}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl leading-relaxed">
                            {t.hero_desc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/products" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                                {t.shop_now}
                            </Link>
                            <Link href="/categories" className="bg-white text-green-600 border-2 border-green-600 font-bold text-lg px-8 py-4 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                                {t.view_categories}
                            </Link>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="relative right-[-100] hidden lg:block animate-fade-in-down" style={{ animationDelay: '200ms' }}>
                        <div className="relative w-full h-[450px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/50 group hover:shadow-3xl transition-all duration-700">
                            {/* Full-bleed Background Image */}
                            <Image
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                                alt="Fresh Groceries"
                                fill
                                priority
                                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Soft Bottom Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                            {/* Branding Text - Glassmorphic / Modern Style */}
                            <div className="absolute bottom-8 left-8 right-8 z-10 animate-fade-in-up">
                                <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl">
                                    <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg tracking-tight">Fresh & Organic</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="h-1 w-12 bg-green-500 rounded-full"></span>
                                        <p className="text-sm text-green-400 font-black uppercase tracking-[0.2em] drop-shadow-md">Quality Guaranteed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Refined Floating Badge */}
                            <div className="absolute top-8 right-8 z-20">
                                <div className="bg-[#BF4136] text-white px-8 py-3 rounded-2xl font-black shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                                    –30% OFF
                                </div>
                            </div>

                            {/* Subtitle Badge */}
                            <div className="absolute top-8 left-8 z-20">
                                <div className="backdrop-blur-md bg-black/30 text-white px-4 py-2 rounded-xl font-bold text-xs border border-white/20 uppercase tracking-widest">
                                    Premium Selection
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative animated elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-15 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-teal-200 rounded-full opacity-10 blur-3xl"></div>
        </section>
    );
}
