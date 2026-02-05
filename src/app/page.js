"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroBanner from '@/components/HeroBanner';
import DealsCarousel from '@/components/DealsCarousel';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import TrustSection from '@/components/TrustSection';
import { products, getFeaturedProducts, getDealsProducts } from '@/data/products';
import { categories } from '@/data/categories';

/**
 * Home Page - Jamoona Style Layout
 * Sections: Hero Banner, Weekly Deals, Value Deals, Categories, Featured Products, Trust Section
 */
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [weeklyDeals, setWeeklyDeals] = useState([]);
  const [valueDeals, setValueDeals] = useState([]);

  useEffect(() => {
    // In production, these would be API calls:
    // const featured = await fetch('/api/products/featured').then(r => r.json());
    // const deals = await fetch('/api/products/deals').then(r => r.json());
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
        <DealsCarousel
          title="Weekly Deals 🔥"
          products={weeklyDeals}
          badgeType="weekly-deal"
        />
      )}

      {/* Value Deals Carousel */}
      {valueDeals.length > 0 && (
        <section className="py-8 bg-gray-50">
          <DealsCarousel
            title="Value Deals - Wallet-Friendly Prices 💰"
            products={valueDeals}
            badgeType="value-deal"
          />
        </section>
      )}

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-2xl font-black text-[#003B4A] tracking-tight">SEE ALL OUR CATEGORIES</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
            {categories.slice(0, 9).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/categories" className="btn-secondary px-8 py-3">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-xl text-gray-600">Top-rated items loved by our customers</p>
            </div>
            <Link href="/products" className="hidden md:block text-green-600 hover:text-green-700 font-semibold">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/products" className="btn-primary px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FreshMart?</h2>
            <p className="text-xl text-gray-600">Your trusted partner for fresh groceries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh & Organic</h3>
              <p className="text-gray-600">
                Sourced directly from farms to ensure maximum freshness and quality
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Free delivery on orders over €50. Get your groceries within 24 hours
              </p>
            </div>

            <div className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with regular deals and discounts on top brands
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                100% satisfaction guarantee. Not happy? We'll make it right
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 text-green-100">
            Join 130,000+ happy customers and experience the best online grocery shopping in Germany
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              Browse Products
            </Link>
            <Link href="/register" className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors text-lg border-2 border-white">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
