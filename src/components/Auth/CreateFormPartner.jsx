import Image from 'next/image'

export default function CreateFormPartner() {
    return (
        <div className="bg-white h-screen md:h-full rounded-xl p-8 shadow-md" style={{ backgroundImage: `url(/asset/loginbg.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div>
                <Image src="/assets/navLogo.svg" alt="logo" width={100} height={100} className='mb-4' />
                <Image src="/assets/welcomeHeading.svg" alt="logo" width={480} height={100} />
            </div>
            <div className='mt-20'>
                <h1 className='text-[26px] font-[600]'>Create Partner or Sponsor Account</h1>
                <p className='text-[14px] mt-1 font-[400] text-[#626B75]'>Support schools by helping offset school lunch debt through Lunch Money.</p>
                <form className='mb-10' action="">
                    <div className='flex flex-col gap-3 mt-8'>
                        <input
                            type="text"
                            placeholder="Organization Name"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Primary Contact Name"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <input
                            type="email"
                            placeholder="Business Email Address"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <div className='flex flex-col md:flex-row gap-3'>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Organization Address"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <div className='flex flex-col md:flex-row gap-3'>
                            <input
                                type="text"
                                placeholder="Business Phone Number"
                                className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Public Display Name"
                                className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                                required
                            />
                        </div>
                    </div>
                    <button className='w-full mt-3 bg-[#0D4E9E] text-white py-3 rounded-md font-[600] text-[14px]'>
                        <p className='text-center'>Create Account</p>
                    </button>
                    <p className='text-[14px] mt-1 mb-10 font-[400] text-[#626B75]'>By signing up, you agree to our <span className='text-[#0D4E9E] font-[600] cursor-pointer'>Terms & Conditions</span> and commitment to transparent impact reporting.</p>
                </form>
            </div>
        </div>
    )
}