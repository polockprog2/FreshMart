// dashboard.api.js
import { products } from '@/data/products';
import { orders } from '@/data/orders';

/**
 * Service to aggregate dashboard metrics
 */
export const getDashboardStats = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStockItems = products.filter(p => p.stock < 10).length;

    // Simulate active customers
    const activeCustomers = 1240;

    return {
        kpis: [
            { id: 'total-orders', label: 'Total Orders', value: totalOrders, trend: '+12%', icon: 'shopping-bag' },
            { id: 'revenue', label: 'Total Revenue', value: `€${revenue.toFixed(2)}`, trend: '+8.4%', icon: 'euro' },
            { id: 'active-customers', label: 'Active Customers', value: activeCustomers, trend: '+5.2%', icon: 'users' },
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
        recentOrders: orders.slice(0, 5)
    };
};
