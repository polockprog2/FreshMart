"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, registerUser } from '@/data/users';

// Create User Context
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};

// User Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') {
            setIsLoading(false);
            return;
        }
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error loading user from localStorage:', error);
            }
        }
        setIsLoading(false);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (!isLoading && typeof window !== 'undefined') {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        }
    }, [user, isLoading]);

    // Login function
    // In production, this would call: POST /api/auth/login
    const login = async (email, password) => {
        try {
            const authenticatedUser = authenticateUser(email, password);
            if (authenticatedUser) {
                setUser(authenticatedUser);
                return { success: true, user: authenticatedUser };
            } else {
                return { success: false, error: 'Invalid email or password' };
            }
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' };
        }
    };

    // Register function
    // In production, this would call: POST /api/auth/register
    const register = async (userData) => {
        try {
            const newUser = registerUser(userData);
            setUser(newUser);
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, error: 'Registration failed. Please try again.' };
        }
    };

    // Logout function
    // In production, this would call: POST /api/auth/logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Update user profile
    // In production, this would call: PATCH /api/users/{userId}
    const updateProfile = (updatedData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...updatedData
        }));
    };

    // Add address
    // In production, this would call: POST /api/users/{userId}/addresses
    const addAddress = (address) => {
        const newAddress = {
            id: user.addresses.length + 1,
            ...address
        };
        setUser(prevUser => ({
            ...prevUser,
            addresses: [...prevUser.addresses, newAddress]
        }));
    };

    // Update address
    // In production, this would call: PATCH /api/users/{userId}/addresses/{addressId}
    const updateAddress = (addressId, updatedAddress) => {
        setUser(prevUser => ({
            ...prevUser,
            addresses: prevUser.addresses.map(addr =>
                addr.id === addressId ? { ...addr, ...updatedAddress } : addr
            )
        }));
    };

    // Delete address
    // In production, this would call: DELETE /api/users/{userId}/addresses/{addressId}
    const deleteAddress = (addressId) => {
        setUser(prevUser => ({
            ...prevUser,
            addresses: prevUser.addresses.filter(addr => addr.id !== addressId)
        }));
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return user !== null;
    };

    // Check if user is admin
    const isAdmin = () => {
        return user?.isAdmin === true;
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        isAuthenticated,
        isAdmin
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
