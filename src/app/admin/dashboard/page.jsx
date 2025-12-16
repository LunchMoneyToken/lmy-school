'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        enrollments: 0,
        plans: 0,
        activeSchools: 0,
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [enrollmentsRes, plansRes] = await Promise.all([
                fetch('/api/enrollments'),
                fetch('/api/plans'),
            ]);

            const enrollmentsData = await enrollmentsRes.json();
            const plansData = await plansRes.json();

            setStats({
                enrollments: enrollmentsData.enrollments?.length || 0,
                plans: plansData.plans?.length || 0,
                activeSchools: enrollmentsData.enrollments?.length || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const quickActions = [
        { name: 'View Enrollments', path: '/admin/enrollments', icon: '📝', color: 'bg-blue-500' },
        { name: 'Manage Plans', path: '/admin/plans', icon: '💳', color: 'bg-green-500' },
        { name: 'Analytics', path: '/admin/analytics', icon: '📈', color: 'bg-purple-500', comingSoon: true },
        { name: 'School Management', path: '/admin/schools', icon: '🏫', color: 'bg-orange-500', comingSoon: true },
    ];

    const recentFeatures = [
        { name: 'Payment Processing', description: 'Process payments and manage transactions', comingSoon: true },
        { name: 'Hedge Allocation', description: 'Manage hedge fund allocations for schools', comingSoon: true }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 lg:py-8 px-4 lg:px-5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 lg:mb-8">
                    <h1 className="text-2xl lg:text-4xl font-bold text-[#0D4E9E] mb-2">Dashboard Overview</h1>
                    <p className="text-sm lg:text-base text-gray-600">Welcome to the Lunch Money Admin Panel</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs lg:text-sm">Total Enrollments</p>
                                <p className="text-2xl lg:text-3xl font-bold text-[#0D4E9E] mt-2">{stats.enrollments}</p>
                            </div>
                            <div className="text-3xl lg:text-4xl">📝</div>
                        </div>
                        <Link href="/admin/enrollments" className="text-[#FF8823] text-xs lg:text-sm mt-4 inline-block hover:underline">
                            View All →
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs lg:text-sm">Active Plans</p>
                                <p className="text-2xl lg:text-3xl font-bold text-[#0D4E9E] mt-2">{stats.plans}</p>
                            </div>
                            <div className="text-3xl lg:text-4xl">💳</div>
                        </div>
                        <Link href="/admin/plans" className="text-[#FF8823] text-xs lg:text-sm mt-4 inline-block hover:underline">
                            Manage Plans →
                        </Link>
                    </div>

                    <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-xs lg:text-sm">Active Schools</p>
                                <p className="text-2xl lg:text-3xl font-bold text-[#0D4E9E] mt-2">{stats.activeSchools}</p>
                            </div>
                            <div className="text-3xl lg:text-4xl">🏫</div>
                        </div>
                        <Link href="/admin/schools" className="text-[#FF8823] text-xs lg:text-sm mt-4 inline-block hover:underline opacity-50 cursor-not-allowed">
                            Coming Soon →
                        </Link>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
                    <h2 className="text-xl lg:text-2xl font-semibold text-[#0D4E9E] mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        {quickActions.map((action, index) => (
                            <Link
                                key={index}
                                href={action.comingSoon ? '#' : action.path}
                                className={`${action.color} text-white p-4 lg:p-6 rounded-lg lg:rounded-xl hover:opacity-90 transition-all transform hover:scale-105 ${
                                    action.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
                                }`}
                                onClick={(e) => {
                                    if (action.comingSoon) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <div className="text-2xl lg:text-3xl mb-2">{action.icon}</div>
                                <div className="font-semibold text-sm lg:text-base">{action.name}</div>
                                {action.comingSoon && (
                                    <div className="text-xs mt-2 bg-white bg-opacity-20 px-2 py-1 rounded inline-block">
                                        Coming Soon
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Coming Soon Features */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                    <h2 className="text-xl lg:text-2xl font-semibold text-[#0D4E9E] mb-4">Upcoming Features</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {recentFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="border-2 border-dashed border-gray-300 rounded-lg lg:rounded-xl p-4 lg:p-6 hover:border-[#FF8823] transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base lg:text-lg text-gray-800 mb-2">{feature.name}</h3>
                                        <p className="text-gray-600 text-xs lg:text-sm">{feature.description}</p>
                                    </div>
                                    <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                                        Coming Soon
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
