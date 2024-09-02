import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='h-fit sm:min-h-[92vh] px-4 sm:px-10 md:px-20 py-20 sm:py-0 flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-6'>
        <div className='h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]'>
            <img className='h-full' src='https://static.vecteezy.com/system/resources/previews/027/390/996/original/payment-failed-concept-illustration-vector.jpg' alt='payment failed' />
        </div>
        <div className='h-full md:max-w-[50%] flex flex-col gap-4 justify-center'>
            <p className='uppercase font-bold text-[24px] sm:text-[32px] lg:text-[40px] text-[#ff4141]'>payment failed !</p>
            <p className='text-[12px] sm:text-[14px] lg:text-[16px]'>Your payment was unsuccessful. Please try again or use a different payment method. If the issue persists, contact our <span className='text-[#ff4141] hover:text-[#15A86F] cursor-pointer underline'>support team</span> for assistance. We're here to help!</p>
            <div className='group relative w-fit overflow-x-hidden'>
                <Link to='/placeorder' className='text-[#15A86F] text-[12px] sm:text-[14px] lg:text-[16px]'>Try Again</Link>
                <div className='hidden sm:block h-[2px] w-full bg-[#15A86F] absolute bottom-0 left-[-100%] group-hover:left-0 transition-all duration-300'></div>
            </div>
        </div>
    </div>
  )
}

export default Cancel