import React from 'react'

export const DescriptionBox = () => {
  return (
        <div className='px-4 sm:px-10 md:px-20'>
            <div className='flex gap-2'>
                <div className='w-[120px] sm:w-[171px] h-[40px] sm:h-[70px] text-[14px] sm:text-[16px] flex items-center justify-center border border-[#d0d0d0] font-semibold'>Description</div>
                <div className='w-[120px] sm:w-[171px] h-[40px] sm:h-[70px] text-[14px] sm:text-[16px] flex items-center justify-center border border-[#d0d0d0] font-semibold bg-[#FBFBFB] text-[#555]'>Reviews <span>(122)</span></div>
            </div>
            <div className='flex flex-col gap-2 mt-2 border border-[#D0D0D0] text-[14px] sm:text-[16px] px-[16px] sm:px-[36px] pt-[20px] sm:pt-[48px] pb-[40px] sm:pb-[70px]'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, assumenda perspiciatis similique odio, dolorem ad exercitationem dolor voluptatum accusamus minima ea vel ipsum, fugit eius quod ipsam temporibus nemo aliquid?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem tempore rem incidunt eius iure voluptates, rerum at itaque id omnis deleniti a repellendus, alias minus, laudantium facere corporis dicta.</p>
            </div>
        </div>
    )
}
