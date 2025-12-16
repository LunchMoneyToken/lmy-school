'use client'
import { useState } from 'react'
import Image from "next/image"

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null)

    const faq = [
        {
            question: "1. What problem does Lunch Money solve?",
            answer: "Lunch Money eliminates unpaid school lunch debt so students are never denied meals due to lack of funds."
        },
        {
            question: "2. How does Lunch Money work in simple terms?",
            answer: "Donors fund a pool. The system issues offset credits. Those credits automatically pay off school lunch debt. The credits are then permanently retired."
        },
        {
            question: "3. What is Lunch Money (LMY)?",
            answer: "LMY is an on-chain offset credit used to eliminate school lunch debt. It is not a reward, investment, or yield-generating token."
        },
        {
            question: "4. Is LMY a cryptocurrency investment?",
            answer: "No. LMY is issued as proof of funding and retired when used to eliminate debt. It is not marketed or designed as an investment."
        },
        {
            question: "5. Do schools receive or manage tokens?",
            answer: "No. Schools never receive, hold, trade, or manage LMY. They receive only debt relief and certification status."
        },
        {
            question: "6. Who receives LMY?",
            answer: "LMY is issued to donors as an on-chain record of their contribution and offset capacity."
        },
        {
            question: "7. Can donors choose which schools to support?",
            answer: "Yes—optionally. Donors may indicate preferences (school, district, region). If no preference is set, the protocol allocates funds automatically based on need."
        },
        {
            question: "8. What happens when lunch debt is eliminated?",
            answer: "The corresponding LMY offset credits are permanently retired (burned), and the school's debt bar moves toward 100%."
        },
        {
            question: "9. What does \"Lunch Money Certified: Debt-Free\" mean?",
            answer: "It means a school's lunch debt has been fully offset through the Lunch Money hedge and verified through transparent reporting."
        },
        {
            question: "10. Is Lunch Money transparent?",
            answer: "Yes. All offset credits issued and retired are recorded on-chain, providing public verification of impact without exposing student data."
        },
        {
            question: "11. Is Lunch Money compliant with regulations?",
            answer: "Lunch Money is designed with compliance in mind. LMY functions as an accounting and settlement unit, not a financial security. The platform avoids yield, speculation, and consumer crypto exposure."
        },
        {
            question: "12. Is Lunch Money a charity?",
            answer: "Lunch Money may work with charitable partners, but it functions as a technology platform that provides transparent debt-offset infrastructure."
        },
        {
            question: "13. How is this different from fundraising?",
            answer: "Fundraising is episodic and opaque. Lunch Money is continuous, automated, and verifiable—every dollar is tracked from contribution to debt elimination."
        },
        {
            question: "14. Can organizations or companies participate?",
            answer: "Yes. Corporations, foundations, nonprofits, and community partners can fund the Lunch Money pool and receive transparent proof of impact."
        },
        {
            question: "15. What does it cost schools to participate?",
            answer: "Schools do not pay to receive lunch debt protection. Participation terms may vary by district and partnership."
        },
        {
            question: "16. Why use blockchain at all?",
            answer: "Blockchain provides: • Public verification • Immutable accounting • Transparent issuance and retirement of offset credits. It ensures trust without exposing schools or students to complexity."
        },
        {
            question: "17. What is the long-term goal?",
            answer: "To make school lunch debt a thing of the past by creating a permanent, scalable protection mechanism."
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
                                            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
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