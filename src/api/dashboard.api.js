// dashboard.api.js
import { getOrders } from './order.api';
import { getProducts } from './product.api';

/**
 * Service to aggregate dashboard metrics from APIs
 */
export const getDashboardStats = async () => {
    try {
        const [ordersRes, productsRes] = await Promise.all([
            getOrders({ limit: 100 }),
            getProducts({ limit: 100 })
        ]);

        const orders = ordersRes.data || ordersRes;
        const products = productsRes.data || productsRes;

        const totalOrders = orders.length;
        const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const lowStockItems = Array.isArray(products) ? products.filter(p => (p.stock || 0) < 10).length : 0;

        return {
            kpis: [
                { id: 'total-orders', label: 'Total Orders', value: totalOrders, trend: '+12%', icon: 'shopping-bag' },
                { id: 'revenue', label: 'Total Revenue', value: `$${revenue.toFixed(2)}`, trend: '+8.4%', icon: 'euro' },
                { id: 'active-customers', label: 'Active Customers', value: orders.length, trend: '+5.2%', icon: 'users' },
                { id: 'low-stock', label: 'Low Stock Items', value: lowStockItems, trend: '-2', icon: 'alert-triangle' }
            ],
            salesData: [
                { name: 'Mon', sales: 4000 },
                { name: 'Tue', sales: 3000 },
                { name: 'Wed', sales: 2000 },
                { name: 'Thu', sales: 2780 },
                { name: 'Fri', sales: 1890 },
                { name: 'Sat', sales: 2390 },
                { name: 'Sun', sales: 3490 },
            ],
            recentOrders: Array.isArray(orders) ? orders.slice(0, 5) : []
        };
    } catch (error) {
        console.error('getDashboardStats error:', error);
        throw error;
    }
};
