'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/admin/login');
            const data = await response.json();
            setAuthenticated(data.authenticated);
            if (!data.authenticated && pathname !== '/admin/login') {
                router.push('/admin/login');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            if (pathname !== '/admin/login') {
                router.push('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: '📊', available: true },
        { name: 'Enrollments', path: '/admin/enrollments', icon: '📝', available: true },
        { name: 'Plans Management', path: '/admin/plans', icon: '💳', available: true },
        { name: 'Contact Info', path: '/admin/contact-info', icon: '📞', available: true },
        { name: 'Analytics & Reports', path: '/admin/analytics', icon: '📈', available: false },
        { name: 'Payment Processing', path: '/admin/payments', icon: '💵', available: false },
        { name: 'Hedge Allocation', path: '/admin/hedge', icon: '🛡️', available: false },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️', available: false },
        { name: 'Support Tickets', path: '/admin/support', icon: '🎫', available: false },
        { name: 'Documentation', path: '/admin/docs', icon: '📚', available: false },
        { name: 'System Health', path: '/admin/health', icon: '🏥', available: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#0D4E9E] text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
                <div className="p-6 border-b border-blue-700">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <p className="text-sm text-blue-200 mt-1">Lunch Money</p>
                </div>
                
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.available ? item.path : '#'}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        pathname === item.path
                                            ? 'bg-[#FF8823] text-white font-semibold'
                                            : item.available
                                            ? 'hover:bg-blue-700 text-white'
                                            : 'text-blue-200 opacity-60 cursor-not-allowed'
                                    }`}
                                    onClick={(e) => {
                                        if (!item.available) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="flex-1">{item.name}</span>
                                    {!item.available && (
                                        <span className="text-xs bg-blue-800 px-2 py-1 rounded">Soon</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-blue-700">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {children}
            </div>
        </div>
    );
}
