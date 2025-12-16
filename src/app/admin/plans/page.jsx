'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlansPage() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        for: '',
        features: [''],
        button: '',
        order: 0,
        isActive: true,
    });
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

            fetchPlans();
        } catch (error) {
            console.error('Auth check failed:', error);
            router.push('/admin/login');
        }
    };

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/plans');
            
            if (response.status === 401) {
                router.push('/admin/login');
                return;
            }

            const data = await response.json();
            if (response.ok) {
                setPlans(data.plans || []);
            } else {
                setError(data.error || 'Failed to fetch plans');
            }
        } catch (error) {
            setError('An error occurred while fetching plans');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const features = formData.features.filter(f => f.trim() !== '');
            
            if (!formData.title || !formData.for || features.length === 0 || !formData.button) {
                alert('Please fill in all required fields');
                return;
            }

            const url = editingId ? `/api/plans/${editingId}` : '/api/plans';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    features,
                }),
            });

            if (response.ok) {
                await fetchPlans();
                resetForm();
                alert(editingId ? 'Plan updated successfully!' : 'Plan created successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to save plan');
            }
        } catch (error) {
            alert('An error occurred while saving the plan');
        }
    };

    const handleEdit = (plan) => {
        setEditingId(plan._id);
        setFormData({
            title: plan.title,
            for: plan.for,
            features: plan.features.length > 0 ? plan.features : [''],
            button: plan.button,
            order: plan.order || 0,
            isActive: plan.isActive !== undefined ? plan.isActive : true,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this plan?')) {
            return;
        }

        try {
            const response = await fetch(`/api/plans/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchPlans();
                alert('Plan deleted successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete plan');
            }
        } catch (error) {
            alert('An error occurred while deleting the plan');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            for: '',
            features: [''],
            button: '',
            order: 0,
            isActive: true,
        });
        setEditingId(null);
        setShowForm(false);
    };

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...formData.features, ''],
        });
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            features: newFeatures.length > 0 ? newFeatures : [''],
        });
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({
            ...formData,
            features: newFeatures,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0D4E9E] mb-2">Plans Management</h1>
                        <p className="text-gray-600">Create and manage subscription plans</p>
                    </div>
                    <div className="flex gap-3">
                        {plans.length === 0 && (
                            <button
                                onClick={async () => {
                                    if (!confirm('This will create the 4 default plans from the original landing page. Continue?')) {
                                        return;
                                    }
                                    try {
                                        setLoading(true);
                                        const response = await fetch('/api/plans/seed', {
                                            method: 'POST',
                                        });
                                        const data = await response.json();
                                        if (response.ok) {
                                            alert('Plans seeded successfully!');
                                            await fetchPlans();
                                        } else {
                                            alert(data.error || 'Failed to seed plans');
                                        }
                                    } catch (error) {
                                        alert('An error occurred while seeding plans');
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                className="bg-[#FF8823] text-white px-6 py-2 rounded-lg hover:bg-[#e6771a] transition-colors"
                            >
                                🌱 Seed Default Plans
                            </button>
                        )}
                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="bg-[#0D4E9E] text-white px-6 py-2 rounded-lg hover:bg-[#0a3d7a] transition-colors"
                        >
                            + Create New Plan
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {showForm && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-[#0D4E9E] mb-4">
                            {editingId ? 'Edit Plan' : 'Create New Plan'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Plan Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        For (Target Audience) *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.for}
                                        onChange={(e) => setFormData({...formData, for: e.target.value})}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Features *
                                </label>
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            className="flex-1 p-2 border rounded-lg"
                                            placeholder={`Feature ${index + 1}`}
                                        />
                                        {formData.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="mt-2 text-[#0D4E9E] hover:underline"
                                >
                                    + Add Feature
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Button Text *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.button}
                                        onChange={(e) => setFormData({...formData, button: e.target.value})}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                    Active (visible on landing page)
                                </label>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-[#0D4E9E] text-white px-6 py-2 rounded-lg hover:bg-[#0a3d7a] transition-colors"
                                >
                                    {editingId ? 'Update Plan' : 'Create Plan'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-semibold text-[#0D4E9E]">
                            All Plans ({plans.length})
                        </h2>
                    </div>

                    {plans.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No plans found. Create your first plan to get started.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#ECF1F8]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Order</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">For</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Features</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Button</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {plans.map((plan) => (
                                        <tr key={plan._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.for}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <ul className="list-disc list-inside">
                                                    {plan.features.slice(0, 2).map((feature, idx) => (
                                                        <li key={idx} className="truncate max-w-xs">{feature}</li>
                                                    ))}
                                                    {plan.features.length > 2 && (
                                                        <li className="text-gray-400">+{plan.features.length - 2} more</li>
                                                    )}
                                                </ul>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.button}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    plan.isActive 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {plan.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(plan)}
                                                    className="text-[#FF8823] hover:text-[#e6771a] mr-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(plan._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
