"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import DealsCarousel from '@/components/DealsCarousel';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import TrustSection from '@/components/TrustSection';
import BannerSection from '@/components/BannerSection';
import { categories } from '@/data/categories';
import { getProducts } from '@/api/product.api';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import SkeletonCard from '@/components/SkeletonCard';

/**
 * Home Page - Jamoona Style Layout
 */
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [weeklyDeals, setWeeklyDeals] = useState([]);
  const [valueDeals, setValueDeals] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getProducts({ limit: 100 });
        const products = response.data || response;
        
        // Separate featured products and deals
        const featured = products.filter(p => p.featured).slice(0, 8);
        const deals = products.filter(p => p.discount >= 20);
        
        setFeaturedProducts(featured.length > 0 ? featured : products.slice(0, 8));
        setWeeklyDeals(deals.slice(0, 8));
        setValueDeals(deals.slice(8, 16));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Weekly Deals Carousel */}
      {weeklyDeals.length > 0 && (
        <section className="py-12 bg-[#F9F7F2]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-black text-red-600">{t.cat_weekly_deals} 🔥</h2>
            <Link href="/deals/weekly" className="text-red-600 hover:text-red-700 font-bold text-lg transition-colors">
              View All →
            </Link>
          </div>
          <DealsCarousel
            title=""
            products={weeklyDeals}
            badgeType="weekly-deal"
            isLoading={isDataLoading}
          />
        </section>
      )}

      {/* Value Deals Carousel */}
      {valueDeals.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-black text-amber-600">{t.cat_value_deals} 💰</h2>
            <Link href="/deals/value" className="text-amber-600 hover:text-amber-700 font-bold text-lg transition-colors">
              View All →
            </Link>
          </div>
          <DealsCarousel
            title=""
            products={valueDeals}
            badgeType="value-deal"
            isLoading={isDataLoading}
          />
        </section>
      )}

      {/* Promotional Banners */}
      <BannerSection />

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
            {isDataLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i}>
                  <SkeletonCard />
                </div>
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
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

      {/* Refined & Compact Premium CTA Section */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-[#003B4A]">
        {/* Complex Mesh Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/40 via-emerald-600/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] -mr-48 -mb-48 animate-pulse"></div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden group">
            {/* Inner Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            <div className="max-w-2xl mx-auto">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-green-300 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Join the Community
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter drop-shadow-2xl animate-fade-in-up">
                {t.ready_to_shop}
              </h2>

              <p className="text-lg md:text-xl mb-10 text-gray-300 font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                {t.join_customers}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Link
                  href="/products"
                  className="group relative px-10 py-4 bg-white text-[#003B4A] rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">{t.browse_products}</span>
                  <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 font-black">{t.browse_products}</span>
                </Link>

                <Link
                  href="/register"
                  className="px-10 py-4 bg-transparent text-white border border-white/30 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#003B4A] hover:border-white transition-all duration-500 hover:scale-105 active:scale-95 backdrop-blur-md"
                >
                  {t.sign_up}
                </Link>
              </div>
            </div>

            {/* Decorative Floating Icon */}
            <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none transform rotate-12 transition-transform group-hover:rotate-0 duration-1000">
              <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
