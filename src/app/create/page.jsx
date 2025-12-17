'use client'
import CreateFormPartner from '../../components/Auth/CreateFormPartner'
import CreateFormSchool from '../../components/Auth/CreateFormSchool'
import LocationAnim from '../../components/Auth/LocationAnim'
import { useSearchParams } from 'next/navigation'

export default function Create() {
    const searchParams = useSearchParams()
    const accountType = searchParams.get('accountType')?.toLowerCase()

    return (
        <div className="min-h-screen w-full login-bg">
            <div className='max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between md:p-3 h-full min-h-screen'>
                <div className='w-full md:w-1/2 flex items-center justify-center md:block'>
                    {
                        accountType === 'partner' ? <CreateFormPartner /> : <CreateFormSchool />
                    }
                </div>
                <div className='hidden md:block w-full md:w-1/2'>
                    <LocationAnim />
                </div>

            </div>
        </div>
    )
}