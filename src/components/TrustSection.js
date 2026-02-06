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
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            number: '130,000+',
            label: t.happy_customers,
            color: 'text-red-500'
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            number: '1,800+',
            label: t.positive_reviews,
            color: 'text-yellow-500'
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            number: '1,500+',
            label: t.products_stock,
            color: 'text-green-500'
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
            ),
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
                            <div className={`flex justify-center mb-3 ${stat.color}`}>{stat.icon}</div>
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
            </div>
        </section>
    );
}
