'use client'
import { useState, useEffect } from 'react'
import Image from "next/image"

const LMY_CONTRACT_ADDRESS = '0x66fd97a78d8854fec445cd1c80a07896b0b4851f'
const COINGECKO_API_URL = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${LMY_CONTRACT_ADDRESS}&vs_currencies=usd`

export default function DebtTracker() {
    const [debtAmount, setDebtAmount] = useState(100)
    const [lmyPrice, setLmyPrice] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchLmyPrice()
        // Refresh price every 60 seconds
        const interval = setInterval(fetchLmyPrice, 60000)
        return () => clearInterval(interval)
    }, [])

    const fetchLmyPrice = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(COINGECKO_API_URL)
            const data = await response.json()
            
            if (data[LMY_CONTRACT_ADDRESS.toLowerCase()]?.usd) {
                setLmyPrice(data[LMY_CONTRACT_ADDRESS.toLowerCase()].usd)
            } else {
                setError('Price data not available from CoinGecko.')
                setLmyPrice(null)
            }
        } catch (err) {
            console.error('Error fetching LMY price:', err)
            setError('Unable to fetch real-time price.')
            setLmyPrice(null)
        } finally {
            setLoading(false)
        }
    }

    const calculateHedgeCoverage = () => {
        if (!lmyPrice || lmyPrice === 0) return 0
        // If 1 LMY = X USD, then to cover $Y debt, we need Y/X LMY tokens
        return debtAmount / lmyPrice
    }

    const hedgeCoverage = calculateHedgeCoverage()

    return (
        <div className="px-4 sm:px-5 mt-10 sm:mt-16 md:mt-20 rounded-xl">
            <div className='rounded-2xl py-8 sm:py-12 md:py-16 px-4 sm:px-5' style={{ backgroundImage: `url(/assets/bg_gradient2.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="text-center px-2">
                    <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Track Your School's Lunch Debt</p>
                    <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">in Real Time</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-14'>
                    <div className='bg-white rounded-2xl p-4 sm:p-5 md:p-6'>
                        <p className='text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[700]'>National Lunch Debt (Reported Districts) </p>
                        <p className='text-[#0D4E9E] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-[800] mt-2'>$20,300,000  </p>
                    </div>
                    <div className='bg-white rounded-2xl p-4 sm:p-5 md:p-6'>
                        <p className='text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[700]'>Schools Participating in Lunch Money  </p>
                        <p className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[#0D4E9E] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-[800] mt-2'><span>175.9K</span> <span className='text-[#FF8823] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-[800]'> (placeholder until backend) </span> </p>
                    </div>
                    <div className='bg-white rounded-2xl p-4 sm:p-5 md:p-6'>
                        <p className='text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[700]'>Total Hedge Value Allocated  </p>
                        <p className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[#0D4E9E] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-[800] mt-2'><span>$46,678</span> <span className='text-[#FF8823] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-[800]'>(sample school impact) </span> </p>
                    </div>
                    <div className='bg-white rounded-2xl p-4 sm:p-5 md:p-6'>
                        <p className='text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[700]'>Verified Data Sources  </p>
                        <p className='text-[#0D4E9E] text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-[800] leading-[1.1] mt-2'>Education Data Initiative, <br /> USDA, SNA  </p>
                    </div>
                </div>
                <div className="text-center mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 px-2">
                    <p className="text-[#FF8823] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Lunch Debt </p>
                    <p className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[700]">Offset Calculator</p>
                </div>
                <div className='bg-white flex items-center justify-center rounded-2xl mt-6 sm:mt-8 md:mt-10 py-6 sm:py-8 px-4 sm:px-6'>
                    <div className='w-full max-w-2xl'>
                        <p className='text-[#0D4E9E] text-center text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-[700] px-2 sm:px-4 md:px-6 py-4 sm:py-6'>Enter your school's outstanding lunch debt to calculate how much Lunch Money hedge coverage is required to eliminate it. </p>
                        <div className='text-center mb-4 sm:mb-6'>
                            {loading && (
                                <p className='text-[#6E95C5] text-sm sm:text-[14px] md:text-[16px] font-[600]'>Loading price data...</p>
                            )}
                            {!loading && lmyPrice && (
                                <p className='text-[#6E95C5] text-sm sm:text-[14px] md:text-[16px] font-[600]'>
                                    Current LMY/USD Rate: <span className='text-[#FF8823] font-[700]'>${lmyPrice.toFixed(6)}</span> (≈ USDT)
                                </p>
                            )}
                            {!loading && error && (
                                <p className='text-red-500 text-xs sm:text-sm md:text-[14px] font-[600] mt-1'>{error}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2 sm:gap-3 items-center justify-center mt-4'>
                            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 border border-[#b1b1b1c4] w-full sm:w-[90%] md:w-[80%] p-3 sm:p-4 rounded-lg justify-between'>
                                <p className='text-[#6E95C5] text-sm sm:text-base md:text-lg lg:text-[20px] font-[700] whitespace-nowrap'>Enter Lunch Debt Amount:</p>
                                <div className='flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start'>
                                    <input 
                                        type="number" 
                                        value={debtAmount} 
                                        onChange={(e) => setDebtAmount(parseFloat(e.target.value) || 0)}
                                        className='text-base sm:text-lg md:text-[20px] text-[#FF8823] font-[700] w-24 sm:w-[100px] border-none outline-none text-right' 
                                    />
                                    <span className='text-[#6E95C5] text-base sm:text-lg md:text-[20px] font-[700]'>USD</span>
                                </div>
                                <Image src="/assets/arrow.svg" alt="arrow" width={16} height={16} className='h-4 flex-shrink-0 hidden sm:block' />
                            </div>
                            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 border border-[#b1b1b1c4] bg-[#E7EEF6] w-full sm:w-[90%] md:w-[80%] p-3 sm:p-4 rounded-lg justify-between'>
                                <p className='text-[#6E95C5] text-sm sm:text-base md:text-lg lg:text-[20px] font-[700] whitespace-nowrap'>Required Hedge Coverage:</p>
                                <input 
                                    type="text" 
                                    value={loading ? 'Loading...' : lmyPrice && lmyPrice > 0 ? `${hedgeCoverage.toLocaleString('en-US', { maximumFractionDigits: 2 })} LMY` : 'N/A'} 
                                    readOnly
                                    className='text-base sm:text-lg md:text-[20px] text-[#FF8823] font-[700] min-w-[120px] border-none outline-none bg-transparent text-right w-full sm:w-auto' 
                                />
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}
