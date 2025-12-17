'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LocationAnim() {
    const [visiblePins, setVisiblePins] = useState(0)
    const totalPins = 20

    useEffect(() => {
        const interval = setInterval(() => {
            setVisiblePins((prev) => {
                if (prev < totalPins) {
                    return prev + 1
                }
                return prev
            })
        }, 150) // Adjust timing as needed (150ms delay between each pin)

        return () => clearInterval(interval)
    }, [])

    const pins = [
        { left: '10%', top: '5%' },
        { left: '45%', top: '10%' },
        { left: '90%', top: '1%' },
        { left: '20%', top: '25%' },
        { left: '55%', top: '25%' },
        { left: '83%', top: '28%' },
        { left: '24%', top: '40%' },
        { left: '60%', top: '42%' },
        { left: '80%', top: '42%' },
        { left: '10%', top: '50%' },
        { left: '3%', top: '65%' },
        { left: '20%', top: '62%' },
        { left: '40%', top: '58%' },
        { left: '60%', top: '62%' },
        { left: '77%', top: '66%' },
        { left: '75%', top: '55%' },
        { left: '79%', top: '85%' },
        { left: '13%', top: '83%' },
        { left: '33%', top: '88%' },
        { left: '53%', top: '83%' },
    ]

    return (
        <div className="h-full relative">
            {pins.map((pin, index) => (
                <Image
                    key={index}
                    src="/assets/orange_map_pin.svg"
                    alt="logo"
                    width={70}
                    height={100}
                    style={{
                        position: 'absolute',
                        left: pin.left,
                        top: pin.top,
                    }}
                    className={`transition-opacity duration-500 ${
                        index < visiblePins ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}
            <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
                <Image src="/assets/blue_map_pin.svg" alt="logo" width={50} height={100} />
                <Image src="/assets/map_pin_info.svg" alt="logo" width={200} height={100} className='absolute -top-[90px]' />
            </div>
        </div>
    )
}