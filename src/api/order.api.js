// order.api.js
import { orders } from '@/data/orders';

/**
 * Service to handle order data for Admin
 */
export const getOrders = async (params = {}) => {
    const { page = 1, limit = 10, status = '', search = '' } = params;

    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...orders];

    // Status filter
    if (status) {
        filtered = filtered.filter(o => o.status === status);
    }

    // Search filter (Order ID or Email)
    if (search) {
        filtered = filtered.filter(o =>
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.customerEmail?.toLowerCase().includes(search.toLowerCase())
        );
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

export const getOrderById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return orders.find(o => o.id === id);
};

export const updateOrderStatus = async (id, status) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, id, status };
};
