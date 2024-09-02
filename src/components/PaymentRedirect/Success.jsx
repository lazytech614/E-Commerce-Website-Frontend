import React from 'react'
import payment_successful from '/payment_successful.png'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='h-fit sm:min-h-[92vh] px-4 sm:px-10 md:px-20 py-20 sm:py-0 flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-6'>
        <div className='h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]'>
            <img className='h-full' src={payment_successful} alt='payment successful' />
        </div>
        <div className='h-full md:max-w-[50%] flex flex-col gap-4 justify-center'>
            <p className='uppercase font-bold text-[24px] sm:text-[32px] lg:text-[40px] text-[#15A86F]'>payment successful</p>
            <p className='text-[12px] sm:text-[14px] lg:text-[16px]'>Thank you for your purchase! Your order has been successfully placed and is being processed. We'll notify you once it's shipped. If you have any questions or need assistance, feel free to contact our <span className='text-[#ff4141] underline cursor-pointer hover:text-[#15A86F]'>support team.</span></p>
            <div className='group w-fit relative overflow-x-hidden'>
                <Link to="/" className='text-[#ff4141] text-[12px] sm:text-[14px] lg:text-[16px]'>Continue Shopping</Link>
                <div className='hidden sm:block h-[2px] w-full absolute bottom-0 left-[-100%] group-hover:left-0 transition-all duration-300 bg-[#ff4141]'></div>
            </div>
        </div>
    </div>
  )
}

export default Success