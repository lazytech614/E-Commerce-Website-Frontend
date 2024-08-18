import React from 'react'
import new_collections from "../../constants/new_collections"
import { Item } from '../Item/Item'

export const NewCollections = () => {
  return (
    <div className='sm:min-h-[90vh] px-4 sm:px-10 md:px-20 mt-[20px] sm:mt-0 mb-[40px] md:mb-[100px]'>
        <p className='uppercase text-[#171717] text-[20px] sm:text-[30px] md:text-[50px] font-semibold'>new collections</p>
        <div className='w-[100%] h-[2px] bg-[#D9D9D9] '></div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 gap-y-6 mt-4 md:mt-8'>
            {new_collections.map((collection) => (
                <Item 
                 key={collection.id}
                 id={collection.id}
                 name={collection.name}
                 image={collection.image}
                 newPrice={collection.new_price}
                 oldPrice={collection.old_price}
                />
            ))}
        </div>
    </div>
  )
}
