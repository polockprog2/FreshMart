import Link from 'next/link';

/**
 * CategoryCard Component - Clean Grid Style
 * Compact design matching the reference layout
 */
export default function CategoryCard({ category }) {
    const isNew = category.badge === 'NEW';

    return (
        <Link href={`/products?category=${category.slug}`}>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 flex flex-col items-center aspect-[4/5] h-full cursor-pointer hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border-2 border-gray-100 hover:border-green-300 transform hover:scale-105 active:scale-95">
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                {/* Title at top */}
                <h3 className="text-xs md:text-sm font-black text-[#003B4A] mb-4 group-hover:text-green-700 transition-colors duration-300 text-center uppercase tracking-tight line-clamp-2 min-h-[2.5rem] flex items-center">
                    {category.name}
                </h3>

                {/* Image centered below - background-less with drop shadow */}
                <div className="flex-1 flex items-center justify-center w-full relative">
                    {category.image ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="max-w-full max-h-[120px] object-contain group-hover:scale-125 transition-transform duration-700 drop-shadow-xl group-hover:drop-shadow-2xl filter group-hover:brightness-110"
                            />
                        </div>
                    ) : (
                        <span className="text-6xl group-hover:scale-125 transition-transform duration-700 group-hover:drop-shadow-lg filter drop-shadow-md">
                            {category.icon}
                        </span>
                    )}
                </div>

                {/* Special "NEW" badge styling */}
                {isNew && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="relative transform -rotate-12">
                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-black italic">
                                New
                            </div>
                        </div>
                    </div>
                )}

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full" style={{ animation: 'none' }}></div>
            </div>
        </Link>
    );
}
