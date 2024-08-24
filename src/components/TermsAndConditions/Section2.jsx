import React from 'react'

export const Section2 = () => {
  return (
    <div>
        <div className='px-4 sm:px-10 md:px-20 py-2 sm:py-4'>
            <span className='text-[#ff4141] text-[20px] sm:text-[30px] font-semibold'>SECTION 2 - GENERAL CONDITIONS</span>
            <div className='w-[100%] h-[2px] bg-[#D9D9D9] my-2 mb-[10px]'></div>
            <div className='flex flex-col gap-2 text-[12px] sm:text-[16px] text-[#171717]'>
                <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
                <p>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to the technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</p>
                <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the service, use of the service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>
                <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>
            </div>
        </div>
    </div>
  )
}
