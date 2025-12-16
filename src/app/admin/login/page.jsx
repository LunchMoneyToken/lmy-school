'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/admin/login');
            const data = await response.json();
            if (data.authenticated) {
                router.push('/admin/dashboard');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D4E9E] to-[#FF8823] px-5">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0D4E9E] mb-2">Admin Login</h1>
                    <p className="text-gray-600">Enter your credentials to access the admin panel</p>
                </div>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#626B75] text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none focus:ring-2 focus:ring-[#FF8823]"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-[#626B75] text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none focus:ring-2 focus:ring-[#FF8823]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF8823] text-white px-5 py-3 rounded-md font-semibold text-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#e6771a] active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
