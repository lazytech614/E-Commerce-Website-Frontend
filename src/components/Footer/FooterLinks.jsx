import React from 'react'
import footer_logo from '/logo_big.png'
import instagram_logo from '/instagram_icon.png'
import pintester_logo from '/pintester_icon.png'
import whatsapp_lgog from '/whatsapp_icon.png'

export const FooterLinks = () => {
  return (
    <div className='px-4 sm:px-10 md:px-20 py-[10px] flex flex-col justify-center items-start gap-4'>
        <div className='w-[100%] flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row justify-between items-start sm:items-center '>
            <div className='flex justify-center items-end lg:items-start gap-2'>
                <img className='w-[50px] sm:w-[60px] lg::w-[100px]' src={footer_logo} alt='footer logo' />
                <p className='uppercase text-[22px] sm:text-[30px] lg:text-[46px] text-[#171717] font-semibold'>Shopper</p>
            </div>
            <div className='flex flex-col sm:items-end gap-4 sm:gap-2'>
                <ul className='capitalize sm:flex gap-2 lg:gap-4 text-[#252525] text-[12px] sm:text-[14px] lg:text-[20px]'>
                    <li className='cursor-pointer sm:hover:text-[#ff4141] duration-200 sm:hover:scale-95'>company</li>
                    <li className='cursor-pointer sm:hover:text-[#ff4141] duration-200 sm:hover:scale-95'>products</li>
                    <li className='cursor-pointer sm:hover:text-[#ff4141] duration-200 sm:hover:scale-95'>offices</li>
                    <li className='cursor-pointer sm:hover:text-[#ff4141] duration-200 sm:hover:scale-95'>about</li>
                    <li className='cursor-pointer sm:hover:text-[#ff4141] duration-200 sm:hover:scale-95'>contact</li>
                </ul>
                <div className='flex items-center gap-4'>
                    <div className='cursor-pointer'>
                        <img className='w-[20px] sm:w-[30px]' src={instagram_logo} alt='instagram icon'/>
                    </div>
                    <div className='cursor-pointer'>
                        <img className='w-[20px] sm:w-[30px]' src={pintester_logo} alt='pintester icon'/>
                    </div>
                    <div className='cursor-pointer'>
                        <img className='w-[20px] sm:w-[30px]' src={whatsapp_lgog} alt='whatsapp icon'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-[100%] flex flex-col items-center text-[10px] md:text-[12px] text-gray-500'>
            <div className='w-[100%] h-[2px] bg-[#D9D9D9] my-[10px]'></div>
            <p className='self-start'>Copyright @ {new Date().getFullYear()} - All rights reserved</p> 
        </div>
    </div>
  )
}
