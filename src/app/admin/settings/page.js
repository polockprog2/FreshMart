"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function AdminSettingsPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [settings, setSettings] = useState({
        siteName: 'FreshMart',
        siteDescription: 'Fresh groceries delivered to your door',
        freeDeliveryThreshold: 50,
        deliveryTime: '24 hours',
        supportEmail: 'support@freshmart.com',
        supportPhone: '+1 (555) 123-4567',
        maintenanceMode: false,
        allowNewRegistrations: true,
        maxOrderValue: 1000
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
        }
    }, [isAdmin, router]);

    const handleChange = (field, value) => {
        setSettings({...settings, [field]: value});
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-slate-900">Website Settings</h1>
                    <p className="text-slate-600 mt-2">Configure your website and business settings</p>
                </div>

                {saved && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg font-bold">
                        ✓ Settings saved successfully!
                    </div>
                )}

                <div className="space-y-8">
                    {/* General Settings */}
                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">🌐 General Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => handleChange('siteName', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Site Description</label>
                                <textarea
                                    value={settings.siteDescription}
                                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Settings */}
                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-green-500">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">🚚 Delivery Settings</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Free Delivery Threshold (€)</label>
                                    <input
                                        type="number"
                                        value={settings.freeDeliveryThreshold}
                                        onChange={(e) => handleChange('freeDeliveryThreshold', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Time</label>
                                    <input
                                        type="text"
                                        value={settings.deliveryTime}
                                        onChange={(e) => handleChange('deliveryTime', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Max Order Value (€)</label>
                                <input
                                    type="number"
                                    value={settings.maxOrderValue}
                                    onChange={(e) => handleChange('maxOrderValue', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-green-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Settings */}
                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-purple-500">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">📞 Contact Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Support Email</label>
                                <input
                                    type="email"
                                    value={settings.supportEmail}
                                    onChange={(e) => handleChange('supportEmail', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Support Phone</label>
                                <input
                                    type="tel"
                                    value={settings.supportPhone}
                                    onChange={(e) => handleChange('supportPhone', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-purple-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* System Settings */}
                    <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-amber-500">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">⚙️ System Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-bold text-slate-900">Maintenance Mode</p>
                                    <p className="text-sm text-slate-600">Disable access for all users except admins</p>
                                </div>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenanceMode}
                                        onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                                        className="w-6 h-6 rounded accent-amber-500"
                                    />
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-bold text-slate-900">Allow New Registrations</p>
                                    <p className="text-sm text-slate-600">Allow users to create new accounts</p>
                                </div>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.allowNewRegistrations}
                                        onChange={(e) => handleChange('allowNewRegistrations', e.target.checked)}
                                        className="w-6 h-6 rounded accent-amber-500"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            💾 Save Settings
                        </button>
                        <button
                            onClick={() => router.push('/admin')}
                            className="flex-1 bg-slate-300 text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-slate-400 transition-all"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
