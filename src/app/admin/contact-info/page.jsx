'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactInfoPage() {
    const [contactInfo, setContactInfo] = useState({
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        checkAuthAndFetch();
    }, []);

    const checkAuthAndFetch = async () => {
        try {
            const authResponse = await fetch('/api/admin/login');
            const authData = await authResponse.json();
            
            if (!authData.authenticated) {
                router.push('/admin/login');
                return;
            }

            fetchContactInfo();
        } catch (error) {
            console.error('Auth check failed:', error);
            router.push('/admin/login');
        }
    };

    const fetchContactInfo = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contact-info');
            const data = await response.json();
            
            if (response.ok && data.contactInfo) {
                setContactInfo({
                    email: data.contactInfo.email || '',
                    phone: data.contactInfo.phone || '',
                });
            } else {
                // Set defaults if no contact info exists
                setContactInfo({
                    email: 'exampleemail@example.com',
                    phone: '+265 998 998 9990',
                });
            }
        } catch (error) {
            setError('An error occurred while fetching contact info');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('/api/contact-info', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactInfo),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Contact information updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setError(data.error || 'Failed to update contact information');
            }
        } catch (error) {
            setError('An error occurred while updating contact information');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 lg:py-8 px-4 lg:px-5">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#0D4E9E] mb-2">Contact Information</h1>
                    <p className="text-sm lg:text-base text-gray-600">Manage email and phone number displayed in the footer</p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
                        {message}
                    </div>
                )}

                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                value={contactInfo.email}
                                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E9E] focus:border-transparent text-sm lg:text-base"
                                placeholder="example@email.com"
                                required
                            />
                            <p className="mt-1 text-xs lg:text-sm text-gray-500">This email will be displayed in the footer</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="text"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D4E9E] focus:border-transparent text-sm lg:text-base"
                                placeholder="+1 234 567 8900"
                                required
                            />
                            <p className="mt-1 text-xs lg:text-sm text-gray-500">This phone number will be displayed in the footer</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-[#0D4E9E] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-[#0a3d7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm lg:text-base"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={fetchContactInfo}
                                className="bg-gray-300 text-gray-700 px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold text-sm lg:text-base"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 lg:mt-8 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-sm font-semibold text-[#0D4E9E] mb-2">Preview</h3>
                        <div className="text-xs lg:text-sm text-gray-700 space-y-1">
                            <p><strong>Email:</strong> {contactInfo.email || 'Not set'}</p>
                            <p><strong>Phone:</strong> {contactInfo.phone || 'Not set'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
