import Image from "next/image"

export default function HeroBanner() {

    const features = [
        {
            title: <p>Track School Lunch <br /> Debt</p>,
            description: "See how much unpaid meal debt exists and how many students are affected. ",
            image: "/assets/chart.svg"
        },
        {
            title: <p>Build a Protective <br /> Hedge</p>,
            description: "Lunch Money grows a hedge fund dedicated to absorbing school lunch debt.  ",
            image: "/assets/shield.svg"
        },
        {
            title: <p>Ensure No Child Is Denied <br /> Lunch</p>,
            description: "The hedge offsets negative balances so every student can eat with dignity.   ",
            image: "/assets/trayMeal.svg"
        },
        {
            title: <p>Become a Debt-Free <br /> Certified School </p>,
            description: "Once your hedge reaches 100%, your school earns official Lunch Money certification.  ",
            image: "/assets/badge.svg"
        }
    ]

    return (
        <div className="px-4 sm:px-5 md:px-6">
            <div className="text-center mt-10 sm:mt-16 md:mt-20 mb-8 sm:mb-10 md:mb-12">
                <p className="text-[#FF8823] text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight">Lunch Money</p>
                <p className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight mt-1 sm:mt-2">Makes School Lunch Secure for</p>
                <p className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-[700] leading-tight mt-1 sm:mt-2">Every Child</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5 sm:gap-7 md:gap-6 mt-8 sm:mt-10 md:mt-12">
                {features.map((item, index) => {
                    return (
                        <div 
                            key={index}
                            className="w-full rounded-xl p-5 sm:p-6 md:p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 transform cursor-pointer" 
                            style={{ background: 'linear-gradient(to bottom, #F9FCFF 0%, #F9FCFF 38%, #EAF4FF 100%)' }}
                        >
                            <div className="flex items-center justify-center transition-transform duration-300 hover:scale-110 mb-3 sm:mb-4">
                                <Image src={item.image} alt="" width={80} height={80} className="h-14 sm:h-16 md:h-20 transition-transform duration-300" />
                            </div>
                            <div className="mt-4 sm:mt-5 text-center">
                                <p className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[20px] font-[700] leading-tight">{item.title}</p>
                                <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#626B75] font-[300] mt-3 sm:mt-3 md:mt-4 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}