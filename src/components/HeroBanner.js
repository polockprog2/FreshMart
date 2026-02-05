import Link from 'next/link';

/**
 * HeroBanner Component - Jamoona Style
 * Large hero banner with featured product/sale and CTA button
 */
export default function HeroBanner() {
    return (
        <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left z-10">
                        <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            🎉 Special Offer
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Fresh Groceries
                            <span className="block text-green-600">Delivered to Your Door</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-xl">
                            Shop from 1,500+ authentic products. Free delivery on orders over €50.
                            130,000+ happy customers trust us!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/products" className="btn-primary text-lg px-8 py-4">
                                Shop Now
                            </Link>
                            <Link href="/categories" className="btn-secondary text-lg px-8 py-4">
                                View Categories
                            </Link>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="relative lg:block">
                        <div className="relative w-full h-64 md:h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Placeholder for hero image - in production, use actual image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">🛒</div>
                                    <p className="text-2xl font-bold text-green-800">Fresh & Organic</p>
                                    <p className="text-lg text-green-600">Quality Guaranteed</p>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-bounce">
                                –30% OFF
                            </div>
                            <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                                Value Deals
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
        </section>
    );
}
