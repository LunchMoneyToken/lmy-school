import Image from 'next/image'

export default function CreateFormSchool() {
    return (
        <div className="bg-white h-screen md:h-full rounded-xl p-8 shadow-md" style={{ backgroundImage: `url(/asset/loginbg.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div>
                <Image src="/assets/navLogo.svg" alt="logo" width={100} height={100} className='mb-4' />
                <Image src="/assets/welcomeHeading.svg" alt="logo" width={480} height={100} />
            </div>
            <div className='mt-20'>
                <h1 className='text-[26px] font-[600]'>Create Your School or District Account</h1>
                <p className='text-[14px] mt-1 font-[400] text-[#626B75]'>Set up your Lunch Money dashboard to track lunch debt and hedge protection.</p>
                <form className='mb-10' action="">
                    <div className='flex flex-col gap-3 mt-8'>
                        <input
                            type="text"
                            placeholder="School or District Name"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Administrator Full Name"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <input
                            type="email"
                            placeholder="Administrator Email Address"
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
                        <div className='flex flex-col md:flex-row gap-3'>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                                required
                            />
                            <select
                                className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                                required
                            >
                                <option value="">Organization Type</option>
                                <option value="Elementary School">Elementary School</option>
                                <option value="Middle School">Middle School</option>
                                <option value="High School">High School</option>
                                <option value="District Office">District Office</option>
                                <option value="Charter Network">Charter Network</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Organization Display Name (optional)"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                    </div>
                    <button className='w-full mt-3 bg-[#0D4E9E] text-white py-3 rounded-md font-[600] text-[14px]'>
                        <p className='text-center'>Create Account</p>
                    </button>
                </form>
            </div>
        </div>
    )
}