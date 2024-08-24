import React, {useEffect, useState} from 'react'
import new_collections from "../../constants/new_collections"
import { Item } from '../Item/Item'

export const NewCollections = () => {
  const baseURL = 'https://e-commerce-website-backend-30l8.onrender.com'

  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/newcollections`)
    .then((res) => res.json())
    .then((data) => setNewCollections(data))
  }, [])

  return (
    <div id='latest-collections' className='sm:min-h-[90vh] px-4 sm:px-10 md:px-20 mt-[20px] sm:mt-0 mb-[40px] md:mb-[100px]'>
        <p className='uppercase text-[#171717] text-[20px] sm:text-[30px] md:text-[50px] font-semibold'>new collections</p>
        <div className='w-[100%] h-[2px] bg-[#D9D9D9] '></div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-8 mt-4 md:mt-8'>
            {newCollections.map((collection) => (
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
