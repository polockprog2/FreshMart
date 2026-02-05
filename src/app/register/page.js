"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { isValidEmail, isValidPhone } from '@/utils/helpers';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useUser();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!isValidPhone(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const result = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        });

        if (result.success) {
            router.push('/');
        } else {
            setErrors({ general: result.error });
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Subtle background blur elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>

            <div className="max-w-md w-full relative z-10">
                {/* Professional Glassmorphism Card */}
                <div className="backdrop-blur-2xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-300 text-sm">Join FreshMart and start shopping</p>
                    </div>

                    {/* Error Message */}
                    {errors.general && (
                        <div className="backdrop-blur-md bg-red-500/10 rounded-lg p-4 mb-6 border border-red-500/30">
                            <p className="text-sm text-red-200">{errors.general}</p>
                        </div>
                    )}

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 ${errors.firstName ? 'border-red-500/50 ring-2 ring-red-500/30' : 'border-white/20'}`}
                                    placeholder="John"
                                />
                                {errors.firstName && <p className="text-red-300 text-xs mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 ${errors.lastName ? 'border-red-500/50 ring-2 ring-red-500/30' : 'border-white/20'}`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="text-red-300 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 ${errors.email ? 'border-red-500/50 ring-2 ring-red-500/30' : 'border-white/20'}`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 ${errors.phone ? 'border-red-500/50 ring-2 ring-red-500/30' : 'border-white/20'}`}
                                placeholder="+1 (555) 123-4567"
                            />
                            {errors.phone && <p className="text-red-300 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 ${errors.password ? 'border-red-500/50 ring-2 ring-red-500/30' : 'border-white/20'}`}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg backdrop-blur-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 ${errors.confirmPassword ? 'border-red-500/50 ring-2 ring-red-500/30' : 'border-white/20'}`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <div className="flex items-start pt-2">
                            <input 
                                type="checkbox" 
                                required 
                                className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer accent-blue-400 mt-0.5" 
                            />
                            <span className="ml-2 text-sm text-gray-300">
                                I agree to the{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                                    Privacy Policy
                                </a>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2.5 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-400">Or</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-gray-300 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
