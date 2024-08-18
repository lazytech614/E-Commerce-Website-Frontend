import React from 'react'
import { Item } from '../Item/Item'

export const PopularItems = (props) => {
  return (
    <div className='sm:min-h-[90vh] px-4 sm:px-10 md:px-20 mt-[20px] sm:mt-0'>
        <div className='flex justify-between items-center'>
          <p className='uppercase text-[#171717] text-[20px] sm:text-[30px] md:text-[50px] font-semibold'>popular in {props.name}</p>
          <button  className='h-fit px-3 py-1 md:px-8 sm:py-2 flex justify-center items-center text-[12px] sm:text-[14px] md:text-[20px] text-white
            font-medium rounded-full bg-[#ff4141]'>more...</button>
        </div>
        <div className='w-[100%] h-[2px] bg-[#D9D9D9] '></div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 gap-y-6 mt-4 md:mt-8'>
            {props.list.map((product) => (
                <Item 
                    key={product.id} 
                    id={product.id}
                    name={product.name} 
                    image={product.image} 
                    newPrice={product.new_price} 
                    oldPrice={product.old_price}
                />
            ))}
        </div>
    </div>
  )
}
