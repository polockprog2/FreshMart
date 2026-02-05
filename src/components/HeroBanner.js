import Link from 'next/link';

/**
 * HeroBanner Component - Jamoona Style
 * Large hero banner with featured product/sale and CTA button
 */
export default function HeroBanner() {
    return (
        <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left z-10 animate-fade-in-up">
                        <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-green-200 shadow-md hover:shadow-lg transition-shadow">
                            🎉 Special Offer - Save Up to 30%
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                            Fresh Groceries
                            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Delivered to Your Door</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl leading-relaxed">
                            Shop from 1,500+ authentic products. Free delivery on orders over €50.
                            130,000+ happy customers trust us!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/products" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                                Shop Now
                            </Link>
                            <Link href="/categories" className="bg-white text-green-600 border-2 border-green-600 font-bold text-lg px-8 py-4 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                                View Categories
                            </Link>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="relative hidden lg:block animate-fade-in-down" style={{ animationDelay: '200ms' }}>
                        <div className="relative w-full h-80 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100 group hover:shadow-3xl transition-all duration-500">
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 group-hover:from-green-200 group-hover:via-emerald-200 group-hover:to-teal-200 transition-all duration-700"></div>
                            
                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-9xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block">🛒</div>
                                    <p className="text-3xl font-black text-green-800 mb-2">Fresh & Organic</p>
                                    <p className="text-lg text-green-600 font-semibold">Quality Guaranteed</p>
                                </div>
                            </div>

                            {/* Floating badges with animations */}
                            <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg animate-bounce hover:shadow-2xl transition-shadow">
                                –30% OFF
                            </div>
                            <div className="absolute bottom-6 left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-110 duration-300">
                                Value Deals
                            </div>

                            {/* Decorative floating elements */}
                            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/30 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
