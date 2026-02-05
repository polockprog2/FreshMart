/**
 * Categories Data - Jamoona Style
 * Expanded categories matching Jamoona.com structure
 */

export const categories = [
    {
        id: 'value-deals',
        slug: 'value-deals',
        name: 'Value Deals',
        icon: '💰',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
        description: 'Wallet-friendly prices on quality products',
        productCount: 25
    },
    {
        id: 'basmati-rice',
        slug: 'basmati-rice',
        name: 'Basmati Rice',
        icon: '🍚',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
        description: 'Premium quality basmati rice',
        productCount: 8
    },
    {
        id: 'flour-flatbreads',
        slug: 'flour-flatbreads',
        name: 'Flour & Flatbreads',
        icon: '🫓',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
        description: 'Wheat flour, atta, and fresh flatbreads',
        productCount: 10
    },
    {
        id: 'vegetables',
        slug: 'vegetables',
        name: 'Fruits & Vegetables',
        icon: '🥬',
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=400',
        description: 'Fresh vegetables delivered daily',
        productCount: 15
    },
    {
        id: 'lentils-beans',
        slug: 'lentils-beans',
        name: 'Lentils & Beans',
        icon: '🫘',
        image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=400',
        description: 'Dal, lentils, and beans',
        productCount: 12
    },
    {
        id: 'sona-masoori-rice',
        slug: 'sona-masoori-rice',
        name: 'Sona Masoori Rice',
        icon: '🌾',
        image: 'https://images.unsplash.com/photo-1590080876351-941da35790be?auto=format&fit=crop&q=80&w=400',
        description: 'Quality Sona Masoori rice',
        productCount: 6
    },
    {
        id: 'new-arrivals',
        slug: 'new-arrivals',
        name: 'New Arrivals',
        icon: '✨',
        image: 'https://images.unsplash.com/photo-1534452285072-8ef39958e65a?auto=format&fit=crop&q=80&w=400',
        description: 'Latest additions to our collection',
        productCount: 12
    },
    {
        id: 'spices',
        slug: 'spices',
        name: 'Spices',
        icon: '🌶️',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400',
        description: 'Authentic spices and masalas',
        productCount: 20
    },
    {
        id: 'snacks-sweets',
        slug: 'snacks-sweets',
        name: 'Snacks & Sweets',
        icon: '🍬',
        image: 'https://images.unsplash.com/photo-1599490659223-2678688439df?auto=format&fit=crop&q=80&w=400',
        description: 'Traditional snacks and sweets',
        productCount: 18
    },
];

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug) {
    return categories.find(cat => cat.slug === slug);
}

/**
 * Get category by ID
 */
export function getCategoryById(id) {
    return categories.find(cat => cat.id === id);
}

/**
 * Get all category slugs
 */
export function getAllCategorySlugs() {
    return categories.map(cat => cat.slug);
}
