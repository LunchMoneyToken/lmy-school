'use client'
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function HeroSection() {
     const router = useRouter()

    return (
        <div className="">
            <div className="flex items-center justify-center w-full min-h-[400px] sm:h-[400px] md:h-[500px] lg:h-[565px] rounded-xl overflow-hidden py-8 sm:py-2" style={{ backgroundImage: `url(/assets/heroSection.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="w-full max-w-4xl px-2 sm:px-4">
                    <div className="flex justify-center px-2 sm:px-4">
                        <Image src="/assets/heading.svg" alt="heading" width={800} height={200} className="h-auto w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] object-contain" />
                    </div>
                    <p className="text-center text-[18px] sm:text-[28px] md:text-[36px] lg:text-[48px] xl:text-[52px] font-[600] text-white px-2 sm:px-4 mt-3 sm:mt-4 leading-tight sm:leading-normal">
                        With a Hedge That Protects <br className="hidden sm:block" />Every Student
                    </p>
                    <p className="text-center text-[11px] sm:text-[13px] md:text-[15px] lg:text-[16px] mt-3 sm:mt-4 md:mt-5 font-[200] text-white px-4 sm:px-6 leading-relaxed">Lunch Money converts real funding into on-chain offset credits that automatically eliminate unpaid school lunch balances.</p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3 justify-center mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6">
                        <button onClick={() => router.push('/login')} className="bg-[#3CB371] px-4 sm:px-5 py-2.5 sm:py-2 rounded-md text-white font-[600] text-[11px] sm:text-[13px] md:text-[14px] shadow-3xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#2e8b57] active:scale-95 transform w-full sm:w-auto text-center whitespace-nowrap">
                            View Your School's Lunch Debt Bar
                        </button>
                        <button className="bg-[#bfbfbf7a] text-white px-4 sm:px-5 py-2.5 sm:py-2 rounded-md font-[600] text-[11px] sm:text-[13px] md:text-[14px] shadow-3xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#bfbfbf9a] active:scale-95 transform w-full sm:w-auto text-center whitespace-nowrap">
                            Learn How Lunch Money Works
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
