'use client';

import { useState, useEffect } from 'react';

export default function Plans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await fetch('/api/plans');
            const data = await response.json();
            if (response.ok) {
                setPlans(data.plans || []);
            }
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToEnrollment = () => {
        const element = document.getElementById('enrollment-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (loading) {
        return (
            <div className="mt-10 sm:mt-14 md:mt-16 mb-10 sm:mb-14 md:mb-16 px-4 sm:px-5">
                <div className="text-center">
                    <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Flexible Plans </p>
                    <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">for Every School or District </p>
                </div>
                <div className="flex items-center justify-center mt-12 sm:mt-16 md:mt-20">
                    <div className="text-gray-500">Loading plans...</div>
                </div>
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="mt-10 sm:mt-14 md:mt-16 mb-10 sm:mb-14 md:mb-16 px-4 sm:px-5">
                <div className="text-center">
                    <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Flexible Plans </p>
                    <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">for Every School or District </p>
                </div>
                <div className="flex items-center justify-center mt-12 sm:mt-16 md:mt-20">
                    <div className="text-gray-500">No plans available at the moment.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10 sm:mt-14 md:mt-16 mb-10 sm:mb-14 md:mb-16 px-4 sm:px-5">
            <div className="text-center">
                <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Flexible Plans </p>
                <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">for Every School or District </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-8">
                {plans.map((plan, index) => {
                    return (
                        <div key={plan._id || index} className="bg-white rounded-2xl items-center justify-center gap-2 w-full py-5 sm:py-6 px-4">
                            <h1 className="text-[20px] sm:text-[24px] md:text-[26px] text-center font-[700] mb-2">{plan.title}</h1>
                            <p className="text-xs sm:text-sm md:text-[14px] text-[#626B75] text-center font-[300] mb-5 sm:mb-7">{plan.for}</p>
                            <div className="flex flex-col gap-2">
                                {plan.features.map((feature, featureIndex) => {
                                    return (
                                        <div 
                                            key={featureIndex}
                                            className='bg-[#F1F5F9] w-full text-xs sm:text-sm md:text-[14px] border border-[#b1b1b1c4] p-2 sm:p-3 rounded-xl text-center transition-all duration-200 hover:bg-[#E2E8F0] hover:border-[#0D4E9E] cursor-pointer'
                                        >
                                            {feature}
                                        </div>
                                    )
                                })}
                            </div>
                            <button 
                                onClick={scrollToEnrollment}
                                className="bg-[#0D4E9E] w-full text-white px-4 sm:px-5 py-2 rounded-md font-[600] cursor-pointer mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#0a3d7a] active:scale-95 transform text-sm sm:text-base"
                            >
                                {plan.button}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
