import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='h-[92vh] px-4 sm:px-10 md:px-20 flex items-center justify-between'>
        <div className='h-[70vh]'>
            <img className='h-full' src='https://static.vecteezy.com/system/resources/previews/027/390/996/original/payment-failed-concept-illustration-vector.jpg' alt='payment failed' />
        </div>
        <div className='max-w-[50%] flex flex-col gap-4'>
            <p className='uppercase font-bold text-[40px] text-[#ff4141]'>payment failed !</p>
            <p>Your payment was unsuccessful. Please try again or use a different payment method. If the issue persists, contact our <span className='text-[#ff4141] hover:text-[#15A86F] cursor-pointer underline'>support team</span> for assistance. We're here to help!</p>
            <div className='group relative w-fit overflow-x-hidden'>
                <Link to='/placeorder' className='text-[#15A86F]'>Try Again</Link>
                <div className='h-[2px] w-full bg-[#15A86F] absolute bottom-0 left-[-100%] group-hover:left-0 transition-all duration-300'></div>
            </div>
        </div>
    </div>
  )
}

export default Cancel