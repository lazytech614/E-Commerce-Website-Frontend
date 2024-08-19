import React from 'react'
import {Item} from '../Item/Item'
import data_copy from '../../constants/data copy'
// import { latestProductKids } from '../../constants/latestProducts'

export const RelatedProducts = () => {
  return (
    <div className='px-4 sm:px-10 md:px-20 mt-10 mb-[40px] md:mb-[100px]'>
        <p className='uppercase text-[#171717] text-[20px] sm:text-[30px] md:text-[50px] font-semibold'>Related Products</p>
        <div className='w-[100%] h-[2px] bg-[#D9D9D9]'></div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 gap-y-6 mt-4 md:mt-8'>
            {data_copy.map((product) => (
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
