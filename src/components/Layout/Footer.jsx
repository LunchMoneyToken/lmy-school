'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Footer() {
    const footerRef = useRef(null)
    const [contactInfo, setContactInfo] = useState({
        email: 'exampleemail@example.com',
        phone: '+265 998 998 9990'
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchContactInfo()
    }, [])

    const fetchContactInfo = async () => {
        try {
            const response = await fetch('/api/contact-info')
            const data = await response.json()
            if (response.ok && data.contactInfo) {
                setContactInfo({
                    email: data.contactInfo.email,
                    phone: data.contactInfo.phone
                })
            }
        } catch (error) {
            console.error('Error fetching contact info:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp')
                    }
                })
            },
            { threshold: 0.1 }
        )

        if (footerRef.current) {
            observer.observe(footerRef.current)
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current)
            }
        }
    }, [])

    return (
        <div className="bg-[#040D18] w-full mt-16 sm:mt-20 md:mt-30" ref={footerRef}>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-5 md:pl-5 md:pr-16 py-10 sm:py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 lg:gap-0">
                    <div className="flex flex-col items-start gap-6 sm:gap-8 w-full md:w-auto">
                        <Image src="/assets/navLogo.svg" alt="logo" width={88} height={88} className="h-16 sm:h-20 md:h-22" />
                        <p className='text-xs sm:text-sm md:text-[14px] text-[#B3B6B9] font-[300]'>Lunch Money — On-chain <br className="hidden sm:block" /> offset credits . </p>
                    </div>
                    <div className='flex flex-col items-start gap-3 sm:gap-4 w-full md:w-auto'>
                        <h1 className='text-base sm:text-lg md:text-[20px] text-white font-[600]'>Explore Site</h1>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>About</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>How it works</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Contact</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Privacy Policy</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Terms</li>
                    </div>
                    <div className='flex flex-col items-start gap-3 sm:gap-4 w-full md:w-auto'>
                        <h1 className='text-base sm:text-lg md:text-[20px] text-white font-[600]'>Useful Links</h1>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Whitepaper</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Media Kit</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Partnership Inquiries</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Products</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>LunchSwap</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Exchanges</li>
                        <li className='text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'>Disclaimer</li>
                    </div>
                    <div className='flex flex-col items-start gap-3 sm:gap-4 w-full md:w-auto'>
                        <h1 className='text-base sm:text-lg md:text-[20px] text-white font-[600]'>Contact Information</h1>
                        <li className='flex items-center gap-2 text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white break-all'><Image src="/assets/email.svg" alt="email" width={16} height={16} className='h-3 sm:h-4 flex-shrink-0 transition-all duration-300 hover:brightness-150 hover:opacity-90' /> <span className="break-all">{contactInfo.email}</span></li>
                        <li className='flex items-center gap-2 text-xs sm:text-sm md:text-[15px] text-[#B3B6B9] font-[300] list-none cursor-pointer transition-all duration-300 hover:text-white'><Image src="/assets/phone.svg" alt="phone" width={16} height={16} className='h-3 sm:h-4 flex-shrink-0 transition-all duration-300 hover:brightness-150 hover:opacity-90' /> {contactInfo.phone}</li>
                        <h1 className='text-base sm:text-lg md:text-[20px] text-white font-[600] mt-4 sm:mt-5'>Social Media</h1>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <Image src="/assets/telegram.svg" alt="telegram" width={40} height={40} className='h-8 sm:h-9 md:h-10 cursor-pointer transition-all duration-300 hover:brightness-150 hover:opacity-90' />
                            <Image src="/assets/x.svg" alt="x" width={40} height={40} className='h-8 sm:h-9 md:h-10 cursor-pointer transition-all duration-300 hover:brightness-150 hover:opacity-90' />
                            <Image src="/assets/yt.svg" alt="youtube" width={40} height={40} className='h-8 sm:h-9 md:h-10 cursor-pointer transition-all duration-300 hover:brightness-150 hover:opacity-90' />
                            <Image src="/assets/discord.svg" alt="discord" width={40} height={40} className='h-8 sm:h-9 md:h-10 cursor-pointer transition-all duration-300 hover:brightness-150 hover:opacity-90' />
                            <Image src="/assets/browser.svg" alt="browser" width={40} height={40} className='h-8 sm:h-9 md:h-10 cursor-pointer transition-all duration-300 hover:brightness-150 hover:opacity-90' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}