import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h1>
                    <p className="text-xl text-gray-600">
                        Browse our wide selection of fresh groceries and household essentials
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
                    <p className="text-xl mb-6 text-purple-100">
                        Browse all our products or use the search feature
                    </p>
                    <Link href="/products" className="btn-primary bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
