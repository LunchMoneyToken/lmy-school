'use client';

import { useState } from 'react';
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()
    const navItems = [
        { label: "Home", id: "home" },
        { label: "Benefits", id: "benefits" },
        { label: "How it works", id: "how-it-works" },
        { label: "Track Hedge", id: "track-rewards" },
        { label: "Converter", id: "track-rewards" },
        { label: "Reviews", id: "reviews" },
        { label: "Plans", id: "plans" }
    ]

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    const scrollToEnrollment = () => {
        const element = document.getElementById('enrollment-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 w-full bg-[#E1E7EF] shadow-md">
            <div className="max-w-[1280px] mx-auto flex justify-between items-center p-3 sm:p-4 md:p-5">
                <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
                    <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
                        <Image src="/assets/navLogo.svg" alt="logo" width={56} height={56} className="h-10 sm:h-12 md:h-14"/>
                    </div>
                    <div className="hidden lg:flex items-center gap-4 xl:gap-7">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-700 hover:text-[#0D4E9E] transition-all duration-300 hover:scale-105 font-medium relative group bg-transparent border-none cursor-pointer text-sm xl:text-base"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D4E9E] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <button 
                        onClick={scrollToEnrollment}
                        className="bg-[#0D4E9E] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-md font-[600] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#0a3d7a] active:scale-95 transform text-xs sm:text-sm"
                    >
                        <span className="hidden sm:inline">Claim Wallet</span>
                        <span className="sm:hidden">Wallet</span>
                    </button>
                    <button 
                        onClick={() => router.push('/login')}
                        className="bg-[#C0C7CF] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-md text-[#000] font-[600] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#a8b3c0] active:scale-95 transform text-xs sm:text-sm"
                    >
                        <span className="hidden sm:inline">Create Account</span>
                        <span className="sm:hidden">Sign Up</span>
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden ml-2 p-2 text-gray-700 hover:text-[#0D4E9E] transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#E1E7EF] border-t border-gray-300">
                    <div className="max-w-[1280px] mx-auto px-4 py-4 space-y-2">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(item.id)}
                                className="w-full text-left text-gray-700 hover:text-[#0D4E9E] transition-colors font-medium py-2 px-4 rounded-md hover:bg-gray-200"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}