'use client'
import { useState } from 'react'
import Image from "next/image"

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null)

    const faq = [
        {
            question: "1. What is Lunch Money?",
            answer: "Lunch Money is a school-focused financial hedge that helps offset and eliminate unpaid student meal balances. It ensures that no child is denied lunch due to inability to pay, while giving schools a transparent, real-time tool to monitor and reduce lunch debt."
        },
        {
            question: "2. How does the Lunch Money Hedge work?",
            answer: "Schools report their current unpaid meal debt. Lunch Money allocates hedge funds that automatically cover negative balances as they occur. As the hedge grows, the school’s Lunch Debt Bar fills toward 100%, leading to full debt protection and Lunch Money certification."
        },
        {
            question: "3. Does Lunch Money change how students get lunch?",
            answer: "No. Students continue to receive their meals the same way they always have. Lunch Money works in the background, offsetting debt so that students never face embarrassment, lunch shaming, alternate meals, or account denials."
        },
        {
            question: "4. What do schools need to get started?",
            answer: "Very little. Schools simply provide their current meal debt totals and student count. Lunch Money creates a dashboard with the school’s Lunch Debt Bar and begins allocating hedge coverage. No new equipment, software, or cafeteria changes are required."
        },
        {
            question: "5. Who can support a school’s hedge?",
            answer: "Parents, community members, local businesses, nonprofits, and district partners can all contribute to strengthening a school’s hedge. These contributions directly increase hedge coverage, moving the school closer to being Lunch Money Certified: Debt-Free."
        },
    ]

    return (
        <div className="px-4 sm:px-5 mt-16 sm:mt-20 md:mt-28 rounded-xl">
            <div className='rounded-2xl py-10 sm:py-12 md:py-16 px-4 sm:px-5' style={{ backgroundImage: `url(/assets/bg_gradient4.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="text-center">
                    <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Frequently Asked Questions</p>
                    <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">FAQ’s</p>
                </div>

                <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mt-10 sm:mt-12 md:mt-16 mx-auto'>
                    <div className='flex flex-col gap-2 sm:gap-3'>
                        {faq.map((item, index) => {
                            const isOpen = openIndex === index
                            return (
                                <div key={index} className='bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md'>
                                    <div 
                                        className='flex justify-between items-center py-3 sm:py-4 px-3 sm:px-4 md:px-5 cursor-pointer transition-colors duration-200 hover:bg-gray-50'
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                    >
                                        <p className='text-sm sm:text-base md:text-[18px] font-[600] pr-2'>{item.question}</p>
                                        <Image 
                                            src={isOpen ? "/assets/plus.svg" : "/assets/plus_grey.svg"} 
                                            alt={isOpen ? "plus" : "plus_grey"} 
                                            width={24} 
                                            height={24}
                                            className={`cursor-pointer transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                                        />
                                    </div>
                                    <div 
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className='flex justify-between items-center py-3 sm:py-4 px-3 sm:px-4 md:px-5 border-t border-[#b1b1b1c4]'>
                                            <p className='text-xs sm:text-sm md:text-[15px] font-[500] text-[#626B75] leading-relaxed'>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div >
        </div >
    )
}