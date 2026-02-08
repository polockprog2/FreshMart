"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { initialBanners } from '@/data/banners';

const BannerContext = createContext();

export function BannerProvider({ children }) {
    const [banners, setBanners] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage or default data
    useEffect(() => {
        const savedBanners = localStorage.getItem('baksho_banners');
        if (savedBanners) {
            setBanners(JSON.parse(savedBanners));
        } else {
            setBanners(initialBanners);
            localStorage.setItem('baksho_banners', JSON.stringify(initialBanners));
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever banners change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('baksho_banners', JSON.stringify(banners));
        }
    }, [banners, isLoaded]);

    const addBanner = (banner) => {
        const newBanner = {
            ...banner,
            id: Date.now(),
            active: true
        };
        setBanners(prev => [...prev, newBanner]);
    };

    const updateBanner = (id, updatedFields) => {
        setBanners(prev => prev.map(banner =>
            banner.id === id ? { ...banner, ...updatedFields } : banner
        ));
    };

    const deleteBanner = (id) => {
        setBanners(prev => prev.filter(banner => banner.id !== id));
    };

    const toggleBannerStatus = (id) => {
        setBanners(prev => prev.map(banner =>
            banner.id === id ? { ...banner, active: !banner.active } : banner
        ));
    };

    const getActiveBanners = () => {
        return banners.filter(banner => banner.active);
    };

    return (
        <BannerContext.Provider value={{
            banners,
            addBanner,
            updateBanner,
            deleteBanner,
            toggleBannerStatus,
            getActiveBanners,
            isLoaded
        }}>
            {children}
        </BannerContext.Provider>
    );
}

export const useBanners = () => {
    const context = useContext(BannerContext);
    if (!context) {
        throw new Error('useBanners must be used within a BannerProvider');
    }
    return context;
};
