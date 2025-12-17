'use client';

import { useState } from 'react';

export default function EnrollmentForm() {
    const [formData, setFormData] = useState({
        schoolName: '',
        districtName: '',
        administratorName: '',
        email: '',
        totalStudents: '',
        currentLunchDebt: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Enrollment submitted successfully!' });
                setFormData({
                    schoolName: '',
                    districtName: '',
                    administratorName: '',
                    email: '',
                    totalStudents: '',
                    currentLunchDebt: ''
                });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to submit enrollment' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-16 sm:mt-20 md:mt-30 px-4 sm:px-5">
            <div className='rounded-2xl pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-28 px-4 sm:px-5' style={{ backgroundImage: `url(/assets/bg_gradient3.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="text-center">
                    <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">School</p>
                    <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Enrollment Form</p>
                </div>
                <div className='bg-white flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12 rounded-2xl py-8 sm:py-10 md:py-12 px-4 sm:px-6'>
                    {message.text && (
                        <div className={`w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mb-4 p-3 rounded-md text-sm sm:text-base ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className='w-full sm:w-[90%] md:w-[80%] lg:w-[70%]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-6'>
                            <div>
                                <p className='text-[#626B75] text-xs sm:text-sm md:text-[14px] font-[500] mb-2'>School Name</p>
                                <input 
                                    type="text" 
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    placeholder="Enter your school name" 
                                    className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none' 
                                    required
                                />
                            </div>
                            <div>
                                <p className='text-[#626B75] text-xs sm:text-sm md:text-[14px] font-[500] mb-2'>District Name </p>
                                <input 
                                    type="text" 
                                    name="districtName"
                                    value={formData.districtName}
                                    onChange={handleChange}
                                    placeholder="Enter District" 
                                    className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none' 
                                    required
                                />
                            </div>
                            <div>
                                <p className='text-[#626B75] text-xs sm:text-sm md:text-[14px] font-[500] mb-2'>Administrator Name </p>
                                <input 
                                    type="text" 
                                    name="administratorName"
                                    value={formData.administratorName}
                                    onChange={handleChange}
                                    placeholder="Enter administrator name" 
                                    className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none' 
                                    required
                                />
                            </div>
                            <div>
                                <p className='text-[#626B75] text-xs sm:text-sm md:text-[14px] font-[500] mb-2'>Email Address  </p>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email" 
                                    className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none' 
                                    required
                                />
                            </div>
                            <div>
                                <p className='text-[#626B75] text-xs sm:text-sm md:text-[14px] font-[500] mb-2'>Total Students </p>
                                <input 
                                    type="number" 
                                    name="totalStudents"
                                    value={formData.totalStudents}
                                    onChange={handleChange}
                                    placeholder="500" 
                                    className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none' 
                                    required
                                    min="1"
                                />
                            </div>
                            <div>
                                <p className='text-[#626B75] text-xs sm:text-sm md:text-[14px] font-[500] mb-2'>Current Lunch Debt  </p>
                                <input 
                                    type="text" 
                                    name="currentLunchDebt"
                                    value={formData.currentLunchDebt}
                                    onChange={handleChange}
                                    placeholder="5%" 
                                    className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#4f79ad] outline-none' 
                                    required
                                />
                            </div>
                        </div>
                        <div className='mt-6 sm:mt-8 md:mt-10'>
                            <button 
                                type="submit"
                                disabled={loading}
                                className='w-full bg-[#FF8823] text-white px-4 sm:px-5 py-2 rounded-md font-[600] text-xs sm:text-sm md:text-[14px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#e6771a] active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? 'Submitting...' : 'Enroll School'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
