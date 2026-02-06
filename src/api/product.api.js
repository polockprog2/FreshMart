// product.api.js
import { products } from '@/data/products';

/**
 * Service to handle product data for Admin
 * This layer abstracts the data source (currently mock data).
 */
export const getProducts = async (params = {}) => {
    const { page = 1, limit = 10, search = '', category = '', sort = 'newest' } = params;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...products];

    // Search filter
    if (search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toString().includes(search)
        );
    }

    // Category filter
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    // Sorting
    switch (sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-az':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default: // newest
            filtered.sort((a, b) => b.id - a.id);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        meta: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / limit)
        }
    };
};

export const getProductById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(p => p.id === parseInt(id));
};

export const createProduct = async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data: { id: Date.now(), ...productData } };
};

export const updateProduct = async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data: { id, ...productData } };
};

export const deleteProduct = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
};
