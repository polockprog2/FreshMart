"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import DealsCarousel from '@/components/DealsCarousel';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import TrustSection from '@/components/TrustSection';
import { getFeaturedProducts, getDealsProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

/**
 * Home Page - Jamoona Style Layout
 */
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [weeklyDeals, setWeeklyDeals] = useState([]);
  const [valueDeals, setValueDeals] = useState([]);
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts().slice(0, 8));
    const deals = getDealsProducts();
    setWeeklyDeals(deals.slice(0, 8));
    setValueDeals(deals.slice(8, 16));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Weekly Deals Carousel */}
      {weeklyDeals.length > 0 && (
        <section className="py-12 bg-[#F9F7F2]/50">
          <DealsCarousel
            title={`${t.cat_weekly_deals} 🔥`}
            products={weeklyDeals}
            badgeType="weekly-deal"
          />
        </section>
      )}

      {/* Value Deals Carousel */}
      {valueDeals.length > 0 && (
        <section className="py-8 bg-gray-50">
          <DealsCarousel
            title={`${t.cat_value_deals} 💰`}
            products={valueDeals}
            badgeType="value-deal"
          />
        </section>
      )}

      {/* Categories Grid */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#003B4A] tracking-tight mb-3 animate-fade-in uppercase">
              {t.explore_categories}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.discover_fresh}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 mb-12">
            {categories.slice(0, 18).map((category, index) => (
              <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/categories" className="inline-block border-2 border-[#003B4A] text-[#003B4A] px-10 py-3 rounded-full font-black hover:bg-[#003B4A] hover:text-white hover:shadow-lg transition-all duration-300 uppercase tracking-widest text-sm transform hover:scale-105 active:scale-95">
              {t.view_all_categories}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{t.featured_products}</h2>
              <p className="text-xl text-gray-600">{t.top_rated_items}</p>
            </div>
            <Link href="/products" className="hidden md:block text-green-600 hover:text-green-700 font-semibold text-lg transition-colors hover:underline">
              {t.view_all} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link href="/products" className="btn-primary px-8 py-3">
              {t.view_all}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">{t.why_choose_us}</h2>
            <p className="text-xl text-gray-600">{t.trusted_partner}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🌿', title: t.fresh_organic, desc: t.fresh_organic_desc, color: 'from-green-50 to-emerald-50', borderColor: 'border-green-200' },
              { icon: '🚚', title: t.free_delivery_over, desc: t.fast_delivery_desc, color: 'from-blue-50 to-cyan-50', borderColor: 'border-blue-200' },
              { icon: '💰', title: t.best_prices_desc.split(' ')[0] + ' ' + t.best_prices_desc.split(' ')[1], desc: t.best_prices_desc, color: 'from-amber-50 to-orange-50', borderColor: 'border-amber-200' },
              { icon: '✓', title: t.quality_guaranteed, desc: t.quality_guaranteed_desc, color: 'from-purple-50 to-pink-50', borderColor: 'border-purple-200' }
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-gradient-to-br ${item.color} rounded-2xl border-2 ${item.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-7xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">{t.ready_to_shop}</h2>
          <p className="text-xl md:text-2xl mb-10 text-green-100 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t.join_customers}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link href="/products" className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95">
              {t.browse_products}
            </Link>
            <Link href="/register" className="bg-green-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-800 transition-all duration-300 text-lg border-2 border-white shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95">
              {t.sign_up}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
