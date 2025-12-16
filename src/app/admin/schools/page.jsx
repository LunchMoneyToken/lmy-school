'use client';

export default function SchoolsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <div className="text-6xl mb-4">🏫</div>
                    <h1 className="text-3xl font-bold text-[#0D4E9E] mb-4">School Management</h1>
                    <p className="text-gray-600 text-lg mb-6">Advanced school management features coming soon!</p>
                    <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full inline-block font-semibold">
                        Coming Soon
                    </div>
                    <div className="mt-8 text-left max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4">Planned Features:</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>• School profile management</li>
                            <li>• Student enrollment tracking</li>
                            <li>• School-specific settings</li>
                            <li>• Multi-school dashboard views</li>
                            <li>• School performance monitoring</li>
                            <li>• Communication tools</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
