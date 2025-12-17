'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function LoginForm() {
    const router = useRouter()

    return (
        <div className="bg-white h-screen md:h-full rounded-xl p-8 shadow-md" style={{ backgroundImage: `url(/asset/loginbg.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div>
                <Image src="/assets/navLogo.svg" alt="logo" width={100} height={100} className='mb-4' />
                <Image src="/assets/welcomeHeading.svg" alt="logo" width={480} height={100} />
            </div>
            <div className='mt-20'>
                <h1 className='text-[26px] font-[600]'>Sign In to View and Manage School Lunch Debt Protection</h1>
                <p className='text-[14px] mt-1 font-[400] text-[#626B75]'>Access your Lunch Money dashboard to track lunch debt, hedge coverage, and certification status.</p>
                <form className='mb-10' action="">
                    <div className='flex flex-col gap-3 mt-8'>
                        <input
                            type="text"
                            placeholder="Email Address or Organization ID"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            className='w-full text-xs sm:text-sm md:text-[14px] font-[500] p-2 sm:p-3 rounded-md bg-[#ECF1F8] text-[#628DC1] outline-none placeholder:text-[#628DC1]'
                            required
                        />
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" />
                            <p className='text-[14px] font-[400] text-[#626B75]'>Remember me ?</p>
                        </div>
                        <p className='text-[14px] font-[400] text-[#0D4E9E]'>Forgot your Password ?</p>
                    </div>
                    <button className='w-full mt-3 bg-[#FF8823] text-white py-3 rounded-md font-[600] text-[14px]'>
                        <p className='text-center'>Sign In</p>
                    </button>
                    <p className='text-[14px] text-[#626B75] text-center mt-3'>Don't have an account? <span onClick={() => router.push('/create/account-type')} className='text-[#0D4E9E] font-[600] cursor-pointer'>Create an Account</span></p>
                </form>
            </div>
        </div>
    )
}