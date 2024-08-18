import React from 'react';
import hand_icon from '/hand_icon.png';
import arrow from '/arrow.png';
import hero_image from '/hero_image.png';

export const Hero = () => {
  return (
    <div className="sm:min-h-[90vh] flex  md:flex-row items-center bg-custom-gradient px-4 sm:px-10 md:px-20 py-6">
      <div className=" flex w-[100%] sm:w-[70%] flex-col justify-center gap-[25px] lg:gap-[40px]">
        <p className="uppercase text-[14px] sm:text-[22px] lg:text-[26px] text-[#090909] font-semibold">
          new arrivals only
        </p>
        <div className="text-[26px] sm:text-[60px] lg:text-[100px] text-[#171717] font-semibold leading-[25px] sm:leading-[60px] lg:leading-[100px]">
          <div className="flex items-center">
            <p>new</p>
            <img className="w-[30px] sm:w-[60px] lg:w-[105px]" src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p className='text-nowrap'>for everyone</p>
        </div>
        <div className="w-[130px] h-[30px] sm:w-[260px] sm:h-[60px] lg:w-[310px] lg:h-[70px] rounded-[70px] flex items-center justify-center gap-1 sm:gap-4 sm:hover:gap-6 duration-300 cursor-pointer font-medium text-white text-[10px] sm:text-[16px] lg:text-[22px] bg-[#ff4141]">
          <p>Latest collections</p>
          <img className='w-[12px] sm:w-[28px]' src={arrow} alt="" />
        </div>
      </div>
      <div className="flex justify-center sm:justify-end w-[100%] ">
        <img className="w-[200px] sm:w-[400px] lg:w-[500px]" src={hero_image} alt="hero image" />
      </div>
    </div>
  );
};
