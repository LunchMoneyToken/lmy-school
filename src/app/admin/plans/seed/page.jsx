'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SeedPlansPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSeed = async () => {
        if (!confirm('This will create the default plans from the original landing page. Continue?')) {
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/plans/seed', {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Plans seeded successfully!');
                setTimeout(() => {
                    router.push('/admin/plans');
                }, 2000);
            } else {
                setError(data.error || 'Failed to seed plans');
            }
        } catch (error) {
            setError('An error occurred while seeding plans');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-5">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-[#0D4E9E] mb-4">Seed Default Plans</h1>
                    <p className="text-gray-600 mb-6">
                        This will create the 4 default plans that were originally on the landing page:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                        <li><strong>Starter Plan</strong> - For Small Schools</li>
                        <li><strong>Growth Plan</strong> - For mid-sized schools</li>
                        <li><strong>Premium Plan</strong> - For districts</li>
                        <li><strong>Enterprise Plan</strong> - For state/regional networks</li>
                    </ul>

                    {message && (
                        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button
                            onClick={handleSeed}
                            disabled={loading}
                            className="bg-[#0D4E9E] text-white px-6 py-2 rounded-lg hover:bg-[#0a3d7a] transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Seeding...' : 'Seed Plans'}
                        </button>
                        <button
                            onClick={() => router.push('/admin/plans')}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Back to Plans
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
