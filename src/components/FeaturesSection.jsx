import Image from "next/image"

export default function FeaturesSection() {

    const features = [
        {
            title: "For Students ",
            image: "/assets/student.svg",
            features: [
                "No embarrassment in lunch lines ",
                "No “alternate meals” for unpaid balances ",
                "Guaranteed access to daily meals ",
                "A healthier, more inclusive school experience "
            ]
        },
        {
            title: "For Schools",
            image: "/assets/school.svg",
            features: [
                "Offsets unpaid balances",
                "Reduces district budget strain ",
                "Eliminates staff-led debt collection",
                " Transparent hedge dashboard with real-time reporting "
            ]
        }
    ]

    return (
        <div className="px-4 sm:px-5 mt-10 sm:mt-16 md:mt-20 rounded-xl">
            <div className='rounded-2xl pb-6 sm:pb-8 md:pb-10' style={{ backgroundImage: `url(/assets/bg_gradient.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className='flex flex-col md:flex-row pt-6 sm:pt-8 md:pt-10 px-4 sm:px-6 md:px-10 gap-6 sm:gap-8 md:gap-0'>
                    <div className='w-full md:w-1/2'>
                        <p className='text-[#FF8823] text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight'>School Lunch Debt</p>
                        <p className='text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight mt-1 sm:mt-2'>Is a Growing National Problem </p>
                    </div>
                    <div className='w-full md:w-1/2'>
                        <p className='text-[#626B75] text-sm sm:text-base leading-relaxed'>Across the United States, school lunch debt exceeds $20 million, based on districts that report data. This debt leads to embarrassment, unequal treatment, and lunch denials for children who cannot pay. </p>
                        <p className='mt-3 sm:mt-4 md:mt-5 text-[#626B75] text-sm sm:text-base leading-relaxed'>Lunch Money creates a financial hedge that absorbs unpaid meal costs and guarantees that students are fed every day—without shame or stigma. </p>
                    </div>
                </div>
                <div className="mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4">
                    <Image src="/assets/heroSection2.png" alt="" width={1200} height={600} className="w-full h-auto rounded-lg" />
                </div>
                <div className="text-center mt-8 sm:mt-10 md:mt-14 px-4">
                    <p className="text-[#FF8823] text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight">Lunch Money</p>
                    <p className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight mt-1 sm:mt-2">Protects Students and Schools </p>
                </div>
                <div className='flex flex-col md:flex-row px-4 sm:px-6 md:px-7 mt-6 sm:mt-8 md:mt-10 gap-4 sm:gap-5'>
                    {
                        features.map((feature, index) => {
                            return (
                                <div 
                                    key={index}
                                    className='w-full md:w-1/2 bg-white rounded-xl p-4 sm:p-5 md:p-6'
                                >
                                    <div className='flex items-center justify-center mb-3 sm:mb-4'>
                                        <Image src={feature.image} alt="" width={100} height={100} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
                                    </div>
                                    <p className='text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-[700] mt-3 sm:mt-4 text-center leading-tight'>{feature.title}</p>
                                    <div className='flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-5'>
                                        {feature.features.map((featureItem, itemIndex) => {
                                            return (
                                                <div 
                                                    key={itemIndex}
                                                    className='bg-[#F1F5F9] text-[#626B75] text-xs sm:text-sm md:text-[14px] border border-[#b1b1b1c4] p-2 sm:p-3 rounded-xl text-center transition-all duration-300 hover:bg-[#E2E8F0] hover:scale-105 hover:shadow-md hover:border-[#FF8823] cursor-pointer transform leading-relaxed'
                                                >
                                                    {featureItem}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}