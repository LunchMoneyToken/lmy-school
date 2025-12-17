import Image from "next/image"

export default function Banner() {
    return (
        <div className='mt-6 sm:mt-8 md:mt-10'>
            <div className='flex items-center justify-center py-6 sm:py-8 md:py-10 px-4 sm:px-5'>
                <div className='w-full min-h-[300px] sm:min-h-[350px] md:h-[420px] bg-[#0D4E9E] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between'>
                    <div className='w-full md:w-1/2 h-full flex justify-center flex-col items-start p-6 sm:p-8 md:pl-10'>
                        <p className='text-[28px] sm:text-[40px] md:text-[48px] lg:text-[55px] font-[700] text-white leading-tight sm:leading-[0.6]'>Transparent Reporting</p>
                        <p className='text-[28px] sm:text-[40px] md:text-[48px] lg:text-[55px] text-[#FF8823] font-[700]'>Schools Can Trust</p>
                        <p className='font-[600] text-[#9EB8D8] mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base'>Lunch Money provides real-time dashboards showing lunch debt levels, hedge allocations, students impacted, and certification readiness. Schools, districts, and partners can see exactly where funds are applied. </p>
                    </div>
                    <div className='w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-full'>
                        <Image src="/assets/heroSection3.png" alt="heroSection3" width={640} height={420} className='w-full h-full object-cover'/>
                    </div>
                </div>
            </div>
        </div>
    )
}