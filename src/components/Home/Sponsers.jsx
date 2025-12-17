import Image from "next/image"

export default function Sponsers() {
    return (
        <div className="mt-10 sm:mt-16 md:mt-20 lg:mt-30 px-4 sm:px-5 py-8 sm:py-10 md:py-12 lg:py-16">
            <div className="text-center max-w-[1200px] mx-auto">
                <p className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[700]">As <span className="text-[#FF8823]">Seen</span> On</p>
                <p className="text-xs sm:text-sm md:text-[14px] text-[#626B75] font-[300] mt-2 sm:mt-3 px-2 sm:px-4 leading-relaxed">Lunch Money is featured and recognized across leading platforms and <br className="hidden sm:block" /> publications!</p>

                <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-3 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 mt-8 sm:mt-12 md:mt-16 lg:mt-20 w-full mx-auto px-2 sm:px-4">
                    <Image src="/assets/sponser1.svg" alt="Education Data Initiative" width={200} height={80} className="h-10 sm:h-14 md:h-16 lg:h-20 w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                    <Image src="/assets/sponser2.svg" alt="School Nutrition Association" width={200} height={80} className="h-10 sm:h-14 md:h-16 lg:h-20 w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                    <Image src="/assets/sponser3.svg" alt="K-12 Dive" width={200} height={80} className="h-10 sm:h-14 md:h-16 lg:h-20 w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                    <Image src="/assets/sponser4.svg" alt="Forbes" width={200} height={80} className="h-10 sm:h-14 md:h-16 lg:h-20 w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                </div>
            </div>
        </div>
    )
}