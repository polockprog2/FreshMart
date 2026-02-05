/**
 * TrustSection Component - Jamoona Style
 * Social proof section with customer stats and testimonials
 */
export default function TrustSection() {
    const stats = [
        {
            icon: '❤️',
            number: '130,000+',
            label: 'Happy Customers',
            color: 'text-red-500'
        },
        {
            icon: '⭐',
            number: '1,800+',
            label: 'Positive Reviews',
            color: 'text-yellow-500'
        },
        {
            icon: '📦',
            number: '1,500+',
            label: 'Products in Stock',
            color: 'text-green-500'
        },
        {
            icon: '🚚',
            number: 'Free',
            label: 'Delivery Over €50',
            color: 'text-blue-500'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah M.',
            rating: 5,
            text: 'Amazing quality and fast delivery! The fresh vegetables are always top-notch.',
            location: 'Berlin'
        },
        {
            name: 'Raj P.',
            rating: 5,
            text: 'Best place for authentic Indian groceries in Germany. Great prices and selection!',
            location: 'Munich'
        },
        {
            name: 'Lisa K.',
            rating: 5,
            text: 'Customer service is excellent. They really care about quality and freshness.',
            location: 'Frankfurt'
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
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                    <p className="text-xl text-gray-600">Trusted by thousands of families across Germany</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            {/* Star Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-xl">★</span>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">🔒</span>
                        <span className="font-medium">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">✓</span>
                        <span className="font-medium">Quality Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">🌿</span>
                        <span className="font-medium">Fresh & Organic</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-2xl">📞</span>
                        <span className="font-medium">24/7 Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
