import React from 'react'

export const Section1 = () => {
  return (
    <div className='px-4 sm:px-10 md:px-20 py-2 sm:py-4'>
        <span className='text-[#ff4141] text-[20px] sm:text-[30px] font-semibold'>SECTION 1 - ONLINE STORE TERMS</span>
        <div className='w-[100%] h-[2px] bg-[#D9D9D9] my-2 mb-[10px]'></div>
        <div className='flex flex-col gap-2 text-[12px] sm:text-[16px] text-[#171717]'>
            <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
            <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
            <p>A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>
        </div>
    </div>
  )
}
