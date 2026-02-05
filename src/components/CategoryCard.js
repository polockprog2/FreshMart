import Link from 'next/link';

/**
 * CategoryCard Component - Jamoona Style
 * Features: Image overlay, clean design, hover scale effect
 */
export default function CategoryCard({ category }) {
    return (
        <Link href={`/products?category=${category.slug}`}>
            <div className="bg-[#F9F6F0] rounded-2xl p-8 flex flex-col items-center h-[400px] cursor-pointer hover:shadow-xl transition-all duration-300 group">
                <h3 className="text-xl font-bold text-[#003B4A] mb-8 group-hover:scale-105 transition-transform">
                    {category.name}
                </h3>

                <div className="flex-1 flex items-center justify-center w-full">
                    {category.image ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ) : (
                        <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                            {category.icon}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
