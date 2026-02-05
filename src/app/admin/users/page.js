"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { users } from '@/data/users';

export default function AdminUsersPage() {
    const router = useRouter();
    const { isAdmin } = useUser();
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        if (!isAdmin()) {
            router.push('/');
            return;
        }
        setUserList(users);
    }, [isAdmin, router]);

    const filteredUsers = userList.filter(user => {
        const matchesSearch = user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || (filterRole === 'admin' ? user.isAdmin : !user.isAdmin);
        return matchesSearch && matchesRole;
    });

    const handleToggleAdmin = (userId) => {
        setUserList(userList.map(u =>
            u.id === userId ? { ...u, isAdmin: !u.isAdmin } : u
        ));
    };

    const handleDelete = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUserList(userList.filter(u => u.id !== userId));
        }
    };

    if (!isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-slate-900">User Management</h1>
                    <p className="text-slate-600 mt-2">Manage user accounts and permissions</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
                        <p className="text-slate-600 text-sm font-medium mb-1">Total Users</p>
                        <p className="text-4xl font-black text-blue-600">{userList.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-500">
                        <p className="text-slate-600 text-sm font-medium mb-1">Admins</p>
                        <p className="text-4xl font-black text-purple-600">{userList.filter(u => u.isAdmin).length}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
                        <p className="text-slate-600 text-sm font-medium mb-1">Regular Users</p>
                        <p className="text-4xl font-black text-green-600">{userList.filter(u => !u.isAdmin).length}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-pink-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">🔍 Search Users</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">👥 Filter by Role</label>
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
                            >
                                <option value="all">All Users</option>
                                <option value="admin">Admins Only</option>
                                <option value="regular">Regular Users</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                                                <p className="text-sm text-slate-600">ID: {user.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-700 font-medium">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-700 font-medium">{user.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {user.isAdmin ? '👑 Admin' : '👤 User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleToggleAdmin(user.id)}
                                                    className={`font-bold text-sm px-3 py-1 rounded transition-colors ${user.isAdmin ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                                                >
                                                    {user.isAdmin ? '⬇️ Remove Admin' : '⬆️ Make Admin'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:text-red-700 font-bold text-sm hover:bg-red-50 px-3 py-1 rounded transition-colors"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-slate-600 text-lg font-medium">No users found</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-slate-600">
                    Showing {filteredUsers.length} of {userList.length} users
                </div>
            </div>
        </div>
    );
}
