import React from 'react'

export const OfferBanner = ({offerAmount, timeLeft, heroIcon}) => {
  return (
    <div className='px-4 sm:px-10 md:px-20 pt-10 flex justify-between items-center bg-offer-gradient'>
        <div className='flex flex-col'>
            <p className='uppercase text-[40px] sm:text-[60px] lg:text-[84px] font-semibold text-[#ff4141] leading-[56px] lg:leading-normal'>flat <span>{offerAmount}%</span> off</p>
            <div className='capitalize text-[20px] sm:text-[24px] lg:text-[36px] mt-4 lg:mt-0 font-semibold leading-[26px] sm:leading-[30px] lg:leading-normal'>
                Offer ends in <br className='lg:hidden'></br><span className='text-[#ff4141] font-bold '>{timeLeft}</span>
            </div>
            <button className='w-[160px] sm:w-[200px] lg:w-[240px] h-[40px] sm:h-[60px] lg:h-[70px] bg-[#ff4141] text-white text-[12px] sm:text-[16px] lg:text-[20px] font-medium rounded-full mt-6 mb-6'>Explore now</button>
        </div>
        <div className='self-end hidden sm:block'>
            <img src={heroIcon} alt='' />
        </div>
    </div>
  )
}
