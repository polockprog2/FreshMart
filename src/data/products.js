// Mock product data for grocery e-commerce
// In production, this data would come from an API endpoint like: GET /api/products

export const products = [
    // Vegetables
    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 2.99,
        originalPrice: 3.99,
        discount: 25,
        rating: 4.5,
        reviews: 128,
        image: "/images/products/tomatoes.jpg",
        description: "Fresh, ripe tomatoes perfect for salads and cooking. Locally sourced and organic.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 2,
        name: "Red Onions",
        category: "vegetables",
        price: 1.49,
        originalPrice: 1.99,
        discount: 25,
        rating: 4.3,
        reviews: 95,
        image: "/images/products/onions.jpg",
        description: "Crisp red onions with a mild, sweet flavor. Great for grilling and salads.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 3,
        name: "Russet Potatoes",
        category: "vegetables",
        price: 3.99,
        originalPrice: 4.99,
        discount: 20,
        rating: 4.6,
        reviews: 203,
        image: "/images/products/potatoes.jpg",
        description: "Premium russet potatoes ideal for baking, mashing, and frying.",
        inStock: true,
        unit: "5 lb bag"
    },
    {
        id: 4,
        name: "Fresh Carrots",
        category: "vegetables",
        price: 2.49,
        originalPrice: 2.49,
        discount: 0,
        rating: 4.7,
        reviews: 156,
        image: "/images/products/carrots.jpg",
        description: "Sweet, crunchy carrots packed with vitamins. Perfect for snacking and cooking.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 5,
        name: "Broccoli Crowns",
        category: "vegetables",
        price: 3.49,
        originalPrice: 3.49,
        discount: 0,
        rating: 4.4,
        reviews: 87,
        image: "/images/products/broccoli.jpg",
        description: "Fresh broccoli crowns, rich in nutrients and perfect for steaming or roasting.",
        inStock: true,
        unit: "each"
    },
    {
        id: 6,
        name: "Bell Peppers Mix",
        category: "vegetables",
        price: 4.99,
        originalPrice: 5.99,
        discount: 17,
        rating: 4.5,
        reviews: 112,
        image: "/images/products/bell-peppers.jpg",
        description: "Colorful mix of red, yellow, and green bell peppers. Sweet and crunchy.",
        inStock: true,
        unit: "3 pack"
    },
    {
        id: 7,
        name: "Fresh Spinach",
        category: "vegetables",
        price: 2.99,
        originalPrice: 2.99,
        discount: 0,
        rating: 4.6,
        reviews: 145,
        image: "/images/products/spinach.jpg",
        description: "Tender baby spinach leaves, pre-washed and ready to use.",
        inStock: true,
        unit: "10 oz bag"
    },
    {
        id: 8,
        name: "Cucumber",
        category: "vegetables",
        price: 1.29,
        originalPrice: 1.29,
        discount: 0,
        rating: 4.3,
        reviews: 76,
        image: "/images/products/cucumber.jpg",
        description: "Crisp, refreshing cucumbers perfect for salads and snacking.",
        inStock: true,
        unit: "each"
    },

    // Fruits
    {
        id: 9,
        name: "Gala Apples",
        category: "fruits",
        price: 3.99,
        originalPrice: 4.99,
        discount: 20,
        rating: 4.7,
        reviews: 234,
        image: "/images/products/apples.jpg",
        description: "Sweet and crispy Gala apples. Perfect for snacking and baking.",
        inStock: true,
        unit: "3 lb bag"
    },
    {
        id: 10,
        name: "Bananas",
        category: "fruits",
        price: 0.59,
        originalPrice: 0.59,
        discount: 0,
        rating: 4.8,
        reviews: 456,
        image: "/images/products/bananas.jpg",
        description: "Fresh, ripe bananas rich in potassium. Great for smoothies and snacking.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 11,
        name: "Navel Oranges",
        category: "fruits",
        price: 4.49,
        originalPrice: 5.49,
        discount: 18,
        rating: 4.6,
        reviews: 189,
        image: "/images/products/oranges.jpg",
        description: "Juicy navel oranges bursting with vitamin C. Seedless and easy to peel.",
        inStock: true,
        unit: "4 lb bag"
    },
    {
        id: 12,
        name: "Strawberries",
        category: "fruits",
        price: 3.99,
        originalPrice: 4.99,
        discount: 20,
        rating: 4.5,
        reviews: 267,
        image: "/images/products/strawberries.jpg",
        description: "Sweet, fresh strawberries. Perfect for desserts and breakfast.",
        inStock: true,
        unit: "16 oz container"
    },
    {
        id: 13,
        name: "Blueberries",
        category: "fruits",
        price: 4.99,
        originalPrice: 6.49,
        discount: 23,
        rating: 4.7,
        reviews: 198,
        image: "/images/products/blueberries.jpg",
        description: "Plump, fresh blueberries packed with antioxidants.",
        inStock: true,
        unit: "12 oz container"
    },
    {
        id: 14,
        name: "Grapes",
        category: "fruits",
        price: 2.99,
        originalPrice: 2.99,
        discount: 0,
        rating: 4.4,
        reviews: 143,
        image: "/images/products/grapes.jpg",
        description: "Seedless green grapes, sweet and refreshing.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 15,
        name: "Watermelon",
        category: "fruits",
        price: 5.99,
        originalPrice: 7.99,
        discount: 25,
        rating: 4.6,
        reviews: 176,
        image: "/images/products/watermelon.jpg",
        description: "Sweet, juicy watermelon perfect for summer refreshment.",
        inStock: true,
        unit: "each"
    },
    {
        id: 16,
        name: "Mangoes",
        category: "fruits",
        price: 1.99,
        originalPrice: 2.49,
        discount: 20,
        rating: 4.5,
        reviews: 134,
        image: "/images/products/mangoes.jpg",
        description: "Ripe, tropical mangoes with sweet, juicy flesh.",
        inStock: true,
        unit: "each"
    },

    // Meat & Fish
    {
        id: 17,
        name: "Chicken Breast",
        category: "meat-fish",
        price: 7.99,
        originalPrice: 9.99,
        discount: 20,
        rating: 4.6,
        reviews: 312,
        image: "/images/products/chicken-breast.jpg",
        description: "Fresh, boneless chicken breast. Lean protein for healthy meals.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 18,
        name: "Ground Beef",
        category: "meat-fish",
        price: 5.99,
        originalPrice: 6.99,
        discount: 14,
        rating: 4.5,
        reviews: 245,
        image: "/images/products/ground-beef.jpg",
        description: "Premium ground beef, 85% lean. Perfect for burgers and tacos.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 19,
        name: "Atlantic Salmon",
        category: "meat-fish",
        price: 12.99,
        originalPrice: 14.99,
        discount: 13,
        rating: 4.7,
        reviews: 189,
        image: "/images/products/salmon.jpg",
        description: "Fresh Atlantic salmon fillet, rich in omega-3 fatty acids.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 20,
        name: "Pork Chops",
        category: "meat-fish",
        price: 6.99,
        originalPrice: 8.49,
        discount: 18,
        rating: 4.4,
        reviews: 156,
        image: "/images/products/pork-chops.jpg",
        description: "Tender, bone-in pork chops perfect for grilling.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 21,
        name: "Shrimp",
        category: "meat-fish",
        price: 9.99,
        originalPrice: 11.99,
        discount: 17,
        rating: 4.6,
        reviews: 201,
        image: "/images/products/shrimp.jpg",
        description: "Large, peeled and deveined shrimp. Ready to cook.",
        inStock: true,
        unit: "per lb"
    },
    {
        id: 22,
        name: "Turkey Breast",
        category: "meat-fish",
        price: 8.49,
        originalPrice: 8.49,
        discount: 0,
        rating: 4.5,
        reviews: 134,
        image: "/images/products/turkey-breast.jpg",
        description: "Lean turkey breast, perfect for healthy sandwiches and meals.",
        inStock: true,
        unit: "per lb"
    },

    // Dairy
    {
        id: 23,
        name: "Whole Milk",
        category: "dairy",
        price: 3.49,
        originalPrice: 3.99,
        discount: 13,
        rating: 4.6,
        reviews: 423,
        image: "/images/products/milk.jpg",
        description: "Fresh whole milk from local farms. Rich and creamy.",
        inStock: true,
        unit: "1 gallon"
    },
    {
        id: 24,
        name: "Cheddar Cheese",
        category: "dairy",
        price: 4.99,
        originalPrice: 5.99,
        discount: 17,
        rating: 4.7,
        reviews: 289,
        image: "/images/products/cheddar.jpg",
        description: "Sharp cheddar cheese, aged to perfection. Great for snacking and cooking.",
        inStock: true,
        unit: "8 oz block"
    },
    {
        id: 25,
        name: "Greek Yogurt",
        category: "dairy",
        price: 5.49,
        originalPrice: 6.49,
        discount: 15,
        rating: 4.8,
        reviews: 356,
        image: "/images/products/yogurt.jpg",
        description: "Thick, creamy Greek yogurt. High in protein and probiotics.",
        inStock: true,
        unit: "32 oz container"
    },
    {
        id: 26,
        name: "Butter",
        category: "dairy",
        price: 3.99,
        originalPrice: 4.49,
        discount: 11,
        rating: 4.5,
        reviews: 234,
        image: "/images/products/butter.jpg",
        description: "Salted butter made from fresh cream. Perfect for baking and cooking.",
        inStock: true,
        unit: "1 lb"
    },
    {
        id: 27,
        name: "Eggs",
        category: "dairy",
        price: 2.99,
        originalPrice: 3.49,
        discount: 14,
        rating: 4.7,
        reviews: 512,
        image: "/images/products/eggs.jpg",
        description: "Farm-fresh large eggs. Grade A quality.",
        inStock: true,
        unit: "dozen"
    },
    {
        id: 28,
        name: "Mozzarella Cheese",
        category: "dairy",
        price: 4.49,
        originalPrice: 4.49,
        discount: 0,
        rating: 4.6,
        reviews: 198,
        image: "/images/products/mozzarella.jpg",
        description: "Fresh mozzarella cheese, perfect for pizza and caprese salad.",
        inStock: true,
        unit: "8 oz"
    },
    {
        id: 29,
        name: "Sour Cream",
        category: "dairy",
        price: 2.49,
        originalPrice: 2.99,
        discount: 17,
        rating: 4.4,
        reviews: 167,
        image: "/images/products/sour-cream.jpg",
        description: "Rich, tangy sour cream. Great for dips and toppings.",
        inStock: true,
        unit: "16 oz"
    },

    // Packaged Food
    {
        id: 30,
        name: "Basmati Rice",
        category: "packaged-food",
        price: 8.99,
        originalPrice: 10.99,
        discount: 18,
        rating: 4.7,
        reviews: 289,
        image: "/images/products/rice.jpg",
        description: "Premium basmati rice with long, aromatic grains.",
        inStock: true,
        unit: "5 lb bag"
    },
    {
        id: 31,
        name: "Pasta",
        category: "packaged-food",
        price: 1.99,
        originalPrice: 2.49,
        discount: 20,
        rating: 4.5,
        reviews: 345,
        image: "/images/products/pasta.jpg",
        description: "Italian penne pasta made from durum wheat.",
        inStock: true,
        unit: "16 oz box"
    },
    {
        id: 32,
        name: "Whole Grain Bread",
        category: "packaged-food",
        price: 3.49,
        originalPrice: 3.99,
        discount: 13,
        rating: 4.6,
        reviews: 267,
        image: "/images/products/bread.jpg",
        description: "Freshly baked whole grain bread, soft and nutritious.",
        inStock: true,
        unit: "24 oz loaf"
    },
    {
        id: 33,
        name: "Breakfast Cereal",
        category: "packaged-food",
        price: 4.99,
        originalPrice: 5.99,
        discount: 17,
        rating: 4.4,
        reviews: 412,
        image: "/images/products/cereal.jpg",
        description: "Crunchy whole grain cereal with honey. Heart-healthy breakfast.",
        inStock: true,
        unit: "18 oz box"
    },
    {
        id: 34,
        name: "Peanut Butter",
        category: "packaged-food",
        price: 5.49,
        originalPrice: 6.49,
        discount: 15,
        rating: 4.7,
        reviews: 389,
        image: "/images/products/peanut-butter.jpg",
        description: "Creamy peanut butter made from roasted peanuts. No added sugar.",
        inStock: true,
        unit: "16 oz jar"
    },
    {
        id: 35,
        name: "Olive Oil",
        category: "packaged-food",
        price: 9.99,
        originalPrice: 12.99,
        discount: 23,
        rating: 4.8,
        reviews: 456,
        image: "/images/products/olive-oil.jpg",
        description: "Extra virgin olive oil, cold-pressed from premium olives.",
        inStock: true,
        unit: "25 oz bottle"
    },
    {
        id: 36,
        name: "Canned Tomatoes",
        category: "packaged-food",
        price: 1.49,
        originalPrice: 1.99,
        discount: 25,
        rating: 4.5,
        reviews: 234,
        image: "/images/products/canned-tomatoes.jpg",
        description: "Diced tomatoes in rich tomato juice. Perfect for sauces and soups.",
        inStock: true,
        unit: "14.5 oz can"
    },
    {
        id: 37,
        name: "Black Beans",
        category: "packaged-food",
        price: 1.29,
        originalPrice: 1.29,
        discount: 0,
        rating: 4.4,
        reviews: 178,
        image: "/images/products/black-beans.jpg",
        description: "Canned black beans, ready to use. High in protein and fiber.",
        inStock: true,
        unit: "15 oz can"
    },
    {
        id: 38,
        name: "Honey",
        category: "packaged-food",
        price: 6.99,
        originalPrice: 8.49,
        discount: 18,
        rating: 4.6,
        reviews: 201,
        image: "/images/products/honey.jpg",
        description: "Pure, raw honey from local beekeepers. Natural sweetener.",
        inStock: true,
        unit: "16 oz jar"
    },

    // Household Essentials
    {
        id: 39,
        name: "Paper Towels",
        category: "household",
        price: 12.99,
        originalPrice: 14.99,
        discount: 13,
        rating: 4.5,
        reviews: 567,
        image: "/images/products/paper-towels.jpg",
        description: "Ultra-absorbent paper towels. 8 mega rolls.",
        inStock: true,
        unit: "8 pack"
    },
    {
        id: 40,
        name: "Dish Soap",
        category: "household",
        price: 3.49,
        originalPrice: 3.99,
        discount: 13,
        rating: 4.6,
        reviews: 423,
        image: "/images/products/dish-soap.jpg",
        description: "Powerful dish soap that cuts through grease. Fresh scent.",
        inStock: true,
        unit: "24 oz bottle"
    },
    {
        id: 41,
        name: "Laundry Detergent",
        category: "household",
        price: 11.99,
        originalPrice: 13.99,
        discount: 14,
        rating: 4.7,
        reviews: 689,
        image: "/images/products/laundry-detergent.jpg",
        description: "High-efficiency laundry detergent. Fresh clean scent. 64 loads.",
        inStock: true,
        unit: "100 oz bottle"
    },
    {
        id: 42,
        name: "Toilet Paper",
        category: "household",
        price: 18.99,
        originalPrice: 21.99,
        discount: 14,
        rating: 4.6,
        reviews: 812,
        image: "/images/products/toilet-paper.jpg",
        description: "Soft, strong toilet paper. 12 mega rolls = 48 regular rolls.",
        inStock: true,
        unit: "12 pack"
    },
    {
        id: 43,
        name: "All-Purpose Cleaner",
        category: "household",
        price: 4.49,
        originalPrice: 5.49,
        discount: 18,
        rating: 4.5,
        reviews: 345,
        image: "/images/products/cleaner.jpg",
        description: "Multi-surface cleaner that disinfects and deodorizes.",
        inStock: true,
        unit: "32 oz spray bottle"
    },
    {
        id: 44,
        name: "Trash Bags",
        category: "household",
        price: 9.99,
        originalPrice: 11.99,
        discount: 17,
        rating: 4.4,
        reviews: 456,
        image: "/images/products/trash-bags.jpg",
        description: "Heavy-duty trash bags with drawstring. 13 gallon, 80 count.",
        inStock: true,
        unit: "80 count"
    },
    {
        id: 45,
        name: "Sponges",
        category: "household",
        price: 5.99,
        originalPrice: 6.99,
        discount: 14,
        rating: 4.3,
        reviews: 289,
        image: "/images/products/sponges.jpg",
        description: "Non-scratch scrub sponges for dishes and surfaces.",
        inStock: true,
        unit: "6 pack"
    },
    {
        id: 46,
        name: "Hand Soap",
        category: "household",
        price: 2.99,
        originalPrice: 3.49,
        discount: 14,
        rating: 4.5,
        reviews: 378,
        image: "/images/products/hand-soap.jpg",
        description: "Moisturizing hand soap with antibacterial protection.",
        inStock: true,
        unit: "12 oz pump bottle"
    },
    {
        id: 47,
        name: "Aluminum Foil",
        category: "household",
        price: 4.99,
        originalPrice: 5.99,
        discount: 17,
        rating: 4.4,
        reviews: 234,
        image: "/images/products/aluminum-foil.jpg",
        description: "Heavy-duty aluminum foil for cooking and food storage.",
        inStock: true,
        unit: "75 sq ft roll"
    },
    {
        id: 48,
        name: "Plastic Wrap",
        category: "household",
        price: 3.99,
        originalPrice: 4.49,
        discount: 11,
        rating: 4.3,
        reviews: 198,
        image: "/images/products/plastic-wrap.jpg",
        description: "Clear plastic wrap for food storage and preservation.",
        inStock: true,
        unit: "100 sq ft roll"
    },
    {
        id: 49,
        name: "Ziplock Bags",
        category: "household",
        price: 6.49,
        originalPrice: 7.49,
        discount: 13,
        rating: 4.6,
        reviews: 512,
        image: "/images/products/ziplock-bags.jpg",
        description: "Resealable storage bags in assorted sizes. Freezer safe.",
        inStock: true,
        unit: "variety pack"
    },
    {
        id: 50,
        name: "Bleach",
        category: "household",
        price: 3.49,
        originalPrice: 3.99,
        discount: 13,
        rating: 4.5,
        reviews: 289,
        image: "/images/products/bleach.jpg",
        description: "Concentrated bleach for whitening and disinfecting.",
        inStock: true,
        unit: "64 oz bottle"
    }
];

// Helper function to get products by category
// In production, this would be replaced with: GET /api/products?category={category}
export const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
};

// Helper function to get product by ID
// In production, this would be replaced with: GET /api/products/{id}
export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};

// Helper function to search products
// In production, this would be replaced with: GET /api/products/search?q={query}
export const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
};

// Helper function to get featured products
// In production, this would be replaced with: GET /api/products/featured
export const getFeaturedProducts = () => {
    return products.filter(product => product.rating >= 4.6).slice(0, 8);
};

// Helper function to get products on sale
// In production, this would be replaced with: GET /api/products/deals
export const getDealsProducts = () => {
    return products.filter(product => product.discount > 0).slice(0, 8);
};
