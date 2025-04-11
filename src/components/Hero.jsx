import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
return (
    <div className='flex flex-col sm:flex-row border-6 border-red-500 rounded-lg'>
        {/*Hero Left Side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='text-white font-medium text-xl md:text-base'>Book Your Premier!</p>
                </div>
                <h1 className='text-white text-3xl sm:py-3 lg:text-5x1 leading-relaxed'>COMING SOON</h1>
                <div className='flex items-center gap-2'>
                    <p className='text-white font-semibold text-xl md:text-base'>Tired of being a Hero?</p>
                    {/*<p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>*/}
                </div>
                <div className='flex items-center gap-2'>
                <p className='text-white font-semibold text-2xl md:text-3xl'>Join the Thunderbolts*!</p>
                </div>
                <div className='flex items-center gap-2'>
                    <a href={'https://www.youtube.com/watch?v=hUUszE29jS0'} target='_blank' rel='noopener noreferrer' 
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md text-sm md:text-base'>Watch Trailer</a>
                </div>
            </div>
        </div>
        {/*Hero Right Side*/}
        <img className='w-full sm:w-1/2' src={assets.thunderbolts} alt=''/>
    </div>
  )
}

export default Hero