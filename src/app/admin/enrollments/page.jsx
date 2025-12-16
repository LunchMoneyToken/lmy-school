'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
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

            fetchEnrollments();
        } catch (error) {
            console.error('Auth check failed:', error);
            router.push('/admin/login');
        }
    };

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/enrollments');
            
            if (response.status === 401) {
                router.push('/admin/login');
                return;
            }

            const data = await response.json();
            if (response.ok) {
                setEnrollments(data.enrollments || []);
            } else {
                setError(data.error || 'Failed to fetch enrollments');
            }
        } catch (error) {
            setError('An error occurred while fetching enrollments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this enrollment?')) {
            return;
        }

        try {
            const response = await fetch(`/api/enrollments/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setEnrollments(enrollments.filter(e => e._id !== id));
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete enrollment');
            }
        } catch (error) {
            alert('An error occurred while deleting the enrollment');
        }
    };

    const handleEdit = (enrollment) => {
        setEditingId(enrollment._id);
        setEditForm({
            schoolName: enrollment.schoolName,
            districtName: enrollment.districtName,
            administratorName: enrollment.administratorName,
            email: enrollment.email,
            totalStudents: enrollment.totalStudents,
            currentLunchDebt: enrollment.currentLunchDebt,
        });
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`/api/enrollments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            if (response.ok) {
                const data = await response.json();
                setEnrollments(enrollments.map(e => e._id === id ? data.enrollment : e));
                setEditingId(null);
                setEditForm({});
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update enrollment');
            }
        } catch (error) {
            alert('An error occurred while updating the enrollment');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
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
        <div className="min-h-screen bg-gray-50 py-4 lg:py-8 px-4 lg:px-5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#0D4E9E] mb-2">Enrollments Management</h1>
                    <p className="text-sm lg:text-base text-gray-600">Manage all school enrollments</p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-4 lg:p-6 border-b">
                        <h2 className="text-xl lg:text-2xl font-semibold text-[#0D4E9E]">
                            Enrollments ({enrollments.length})
                        </h2>
                    </div>

                    {enrollments.length === 0 ? (
                        <div className="p-6 lg:p-8 text-center text-gray-500 text-sm lg:text-base">
                            No enrollments found.
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-[#ECF1F8]">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">School Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">District</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Administrator</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Students</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Lunch Debt</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#626B75] uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {enrollments.map((enrollment) => (
                                            <tr key={enrollment._id} className="hover:bg-gray-50">
                                                {editingId === enrollment._id ? (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="text"
                                                                value={editForm.schoolName}
                                                                onChange={(e) => setEditForm({...editForm, schoolName: e.target.value})}
                                                                className="w-full p-2 border rounded text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="text"
                                                                value={editForm.districtName}
                                                                onChange={(e) => setEditForm({...editForm, districtName: e.target.value})}
                                                                className="w-full p-2 border rounded text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="text"
                                                                value={editForm.administratorName}
                                                                onChange={(e) => setEditForm({...editForm, administratorName: e.target.value})}
                                                                className="w-full p-2 border rounded text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="email"
                                                                value={editForm.email}
                                                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                                                className="w-full p-2 border rounded text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="number"
                                                                value={editForm.totalStudents}
                                                                onChange={(e) => setEditForm({...editForm, totalStudents: e.target.value})}
                                                                className="w-full p-2 border rounded text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="text"
                                                                value={editForm.currentLunchDebt}
                                                                onChange={(e) => setEditForm({...editForm, currentLunchDebt: e.target.value})}
                                                                className="w-full p-2 border rounded text-sm"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {formatDate(enrollment.createdAt)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => handleUpdate(enrollment._id)}
                                                                className="text-green-600 hover:text-green-900 mr-3"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId(null);
                                                                    setEditForm({});
                                                                }}
                                                                className="text-gray-600 hover:text-gray-900"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enrollment.schoolName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.districtName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.administratorName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.totalStudents}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enrollment.currentLunchDebt}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(enrollment.createdAt)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button
                                                                onClick={() => handleEdit(enrollment)}
                                                                className="text-[#FF8823] hover:text-[#e6771a] mr-3"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(enrollment._id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden divide-y divide-gray-200">
                                {enrollments.map((enrollment) => (
                                    <div key={enrollment._id} className="p-4 hover:bg-gray-50">
                                        {editingId === enrollment._id ? (
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">School Name</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.schoolName}
                                                        onChange={(e) => setEditForm({...editForm, schoolName: e.target.value})}
                                                        className="w-full p-2 border rounded text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">District</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.districtName}
                                                        onChange={(e) => setEditForm({...editForm, districtName: e.target.value})}
                                                        className="w-full p-2 border rounded text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Administrator</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.administratorName}
                                                        onChange={(e) => setEditForm({...editForm, administratorName: e.target.value})}
                                                        className="w-full p-2 border rounded text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        value={editForm.email}
                                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                                        className="w-full p-2 border rounded text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Students</label>
                                                    <input
                                                        type="number"
                                                        value={editForm.totalStudents}
                                                        onChange={(e) => setEditForm({...editForm, totalStudents: e.target.value})}
                                                        className="w-full p-2 border rounded text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Lunch Debt</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.currentLunchDebt}
                                                        onChange={(e) => setEditForm({...editForm, currentLunchDebt: e.target.value})}
                                                        className="w-full p-2 border rounded text-sm"
                                                    />
                                                </div>
                                                <div className="text-xs text-gray-500 mb-3">
                                                    Date: {formatDate(enrollment.createdAt)}
                                                </div>
                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        onClick={() => handleUpdate(enrollment._id)}
                                                        className="flex-1 text-green-600 hover:text-green-900 text-sm font-medium py-2 border border-green-600 rounded-lg hover:bg-green-50"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(null);
                                                            setEditForm({});
                                                        }}
                                                        className="flex-1 text-gray-600 hover:text-gray-900 text-sm font-medium py-2 border border-gray-600 rounded-lg hover:bg-gray-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="mb-3">
                                                    <h3 className="text-base font-semibold text-gray-900 mb-1">{enrollment.schoolName}</h3>
                                                    <p className="text-sm text-gray-500">{enrollment.districtName}</p>
                                                </div>
                                                <div className="space-y-2 mb-3 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Administrator: </span>
                                                        <span className="text-gray-900">{enrollment.administratorName}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Email: </span>
                                                        <span className="text-gray-900 break-all">{enrollment.email}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Students: </span>
                                                        <span className="text-gray-900">{enrollment.totalStudents}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Lunch Debt: </span>
                                                        <span className="text-gray-900">{enrollment.currentLunchDebt}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Date: </span>
                                                        <span className="text-gray-900">{formatDate(enrollment.createdAt)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        onClick={() => handleEdit(enrollment)}
                                                        className="flex-1 text-[#FF8823] hover:text-[#e6771a] text-sm font-medium py-2 border border-[#FF8823] rounded-lg hover:bg-orange-50"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(enrollment._id)}
                                                        className="flex-1 text-red-600 hover:text-red-900 text-sm font-medium py-2 border border-red-600 rounded-lg hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
