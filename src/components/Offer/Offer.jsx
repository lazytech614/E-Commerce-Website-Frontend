import React from 'react'
import exclusive_img from "/exclusive_image.png"
import arrow from "/arrow.png"

export const Offer = () => {
  return (
    <div className='sm:min-h-[60vh] px-4 sm:px-10 md:px-20 py-4 sm:py-0 mt-[20px] sm:mt-0 flex items-center justify-between bg-custom-gradient'>
        <div className='flex flex-col justify-center items-start text-[#171717] text-[30px] sm:text-[60px] lg:text-[80px] capitalize font-semibold leading-[30px] sm:leading-[60px] lg:leading-[80px]'>
            <p>exclusive</p>
            <p>Offers for you</p>
            <p className='uppercase text-[14px] sm:text-[18px] lg:text-[22px] leading-[20px] mt-[20px]'>only on the best seller products</p>
            <button className='w-[120px] sm:w-[180px] lg:w-[282px] lg:h-[70px] rounded-[35px] flex justify-center items-center gap-2 sm:hover:gap-4 duration-300 text-white text-[12px] sm:text-[18px] lg:text-[22px] font-medium mt-[30px] cursor-pointer bg-[#ff4141]'>
              Check now 
              <img className='w-[12px] sm:w-[28px]' src={arrow} alt="arrow icon" />
            </button>
        </div>
        <div className=''>
            <img className='w-[200px] sm:w-[400px] lg:w-[500px]' src={exclusive_img} alt='exclusive image' />
        </div>
    </div>
  )
}
