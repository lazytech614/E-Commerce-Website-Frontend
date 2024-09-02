import React from 'react'
import payment_successful from '/payment_successful.png'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='h-[92vh] px-4 sm:px-10 md:px-20 flex items-center justify-between'>
        <div className='h-[70vh]'>
            <img className='h-full' src={payment_successful} alt='payment successful' />
        </div>
        <div className='h-full max-w-[50%] flex flex-col gap-4 justify-center'>
            <p className='uppercase font-bold text-[40px] text-[#15A86F]'>payment successful</p>
            <p>Thank you for your purchase! Your order has been successfully placed and is being processed. We'll notify you once it's shipped. If you have any questions or need assistance, feel free to contact our <span className='text-[#ff4141] underline cursor-pointer hover:text-[#15A86F]'>support team.</span></p>
            <div className='group w-fit relative overflow-x-hidden'>
                <Link to="/" className='text-[#ff4141]'>Continue Shopping</Link>
                <div className='h-[2px] w-full absolute bottom-0 left-[-100%] group-hover:left-0 transition-all duration-300 bg-[#ff4141]'></div>
            </div>
        </div>
    </div>
  )
}

export default Success