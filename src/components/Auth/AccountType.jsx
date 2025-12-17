'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AccountType() {
    const [selectedOption, setSelectedOption] = useState(null)
    const router = useRouter()

    const handleContinue = () => {
        if (selectedOption) {
            const accountType = selectedOption === 'school' ? 'school' : 'partner'
            router.push(`/create?accountType=${accountType}`)
        }
    }
    return (
        <div className="bg-white rounded-xl p-8 shadow-md" style={{ backgroundImage: `url(/asset/loginbg.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div>
                <Image src="/assets/navLogo.svg" alt="logo" width={100} height={100} className='mb-4' />
                <Image src="/assets/welcomeHeading.svg" alt="logo" width={480} height={100} />
            </div>
            <div className='mt-20'>
                <h1 className='text-[26px] font-[600]'>Let's Get Your Organization Set Up</h1>
                <p className='text-[14px] mt-1 font-[400] text-[#626B75]'>Select the option that best describes how you'll use Lunch Money.</p>
                <div className='mt-5 flex flex-col gap-3'>
                    <div 
                        onClick={() => setSelectedOption('school')}
                        className={`flex border p-4 rounded-md gap-4 items-center cursor-pointer transition-colors group ${
                            selectedOption === 'school' 
                                ? 'border-[#0D4E9E] bg-[#DCE8F3]' 
                                : 'hover:border-[#0D4E9E] hover:bg-[#DCE8F3]'
                        }`}
                    >
                        <div>
                            <Image 
                                src={selectedOption === 'school' ? "/assets/selected.svg" : "/assets/unselected.svg"} 
                                alt="school" 
                                width={20} 
                                height={20} 
                            />
                        </div>
                        <div>
                            <p className={`font-[700] text-[20px] transition-colors ${
                                selectedOption === 'school' 
                                    ? 'text-[#0D4E9E]' 
                                    : 'text-[#000] group-hover:text-[#0D4E9E]'
                            }`}>I'm a School or District</p>
                            <p className='text-[14px] font-[400] text-[#626B75]'>Track lunch debt, apply hedge coverage, and work toward debt-free certification.</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedOption('partner')}
                        className={`flex border p-4 rounded-md gap-4 items-center cursor-pointer transition-colors group ${
                            selectedOption === 'partner' 
                                ? 'border-[#0D4E9E] bg-[#DCE8F3]' 
                                : 'hover:border-[#0D4E9E] hover:bg-[#DCE8F3]'
                        }`}
                    >
                        <div>
                            <Image 
                                src={selectedOption === 'partner' ? "/assets/selected.svg" : "/assets/unselected.svg"} 
                                alt="school" 
                                width={20} 
                                height={20} 
                            />
                        </div>
                        <div>
                            <p className={`font-[700] text-[20px] transition-colors ${
                                selectedOption === 'partner' 
                                    ? 'text-[#0D4E9E]' 
                                    : 'text-[#000] group-hover:text-[#0D4E9E]'
                            }`}>I'm a Partner or Sponsor
                            </p>
                            <p className='text-[14px] font-[400] text-[#626B75]'>Support schools by contributing to lunch debt hedge coverage.</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleContinue}
                    disabled={!selectedOption}
                    className={`w-full mt-3 py-3 rounded-md font-[600] text-[14px] cursor-pointer mb-10 transition-colors ${
                        selectedOption 
                            ? 'bg-[#0D4E9E] text-white hover:bg-[#0a3d7a]' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <p className='text-center'>Continue</p>
                </button>
            </div>
        </div>
    )
}
