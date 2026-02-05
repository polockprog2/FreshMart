"use client";

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

/**
 * TrustSection Component - Jamoona Style
 * Social proof section with customer stats and testimonials
 */
export default function TrustSection() {
    const { language } = useLanguage();
    const t = translations[language] || translations.EN;

    const stats = [
        {
            icon: '❤️',
            number: '130,000+',
            label: t.happy_customers,
            color: 'text-red-500'
        },
        {
            icon: '⭐',
            number: '1,800+',
            label: t.positive_reviews,
            color: 'text-yellow-500'
        },
        {
            icon: '📦',
            number: '1,500+',
            label: t.products_stock,
            color: 'text-green-500'
        },
        {
            icon: '🚚',
            number: 'Free',
            label: t.free_delivery_over,
            color: 'text-blue-500'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah M.',
            rating: 5,
            text: t.testimonial_1,
            location: t.berlin
        },
        {
            name: 'Raj P.',
            rating: 5,
            text: t.testimonial_2,
            location: t.munich
        },
        {
            name: 'Lisa K.',
            rating: 5,
            text: t.testimonial_3,
            location: t.frankfurt
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className={`text-5xl mb-3 ${stat.color}`}>{stat.icon}</div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                            <div className="text-sm text-gray-600 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-[#003B4A] mb-4">{t.what_customers_say}</h2>
                    <p className="text-xl text-gray-600 font-medium">{t.trusted_families}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            {/* Star Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-xl">★</span>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-4 italic font-medium">"{testimonial.text}"</p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-[#003B4A]">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500 font-medium">{testimonial.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">🔒</span>
                        <span className="font-bold uppercase tracking-wider text-xs">{t.secure_payment}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">✓</span>
                        <span className="font-bold uppercase tracking-wider text-xs">{t.quality_guaranteed}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">🌿</span>
                        <span className="font-bold uppercase tracking-wider text-xs">{t.fresh_organic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">📞</span>
                        <span className="font-bold uppercase tracking-wider text-xs">{t.support_247}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
