import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Item = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/product/${props.id}`);
  };

  return (
    <div className='sm:hover:scale-[1.01] duration-300 cursor-pointer'>
      <div onClick={handleClick}>
        <img src={props.image} alt='image' />
        <p className='my-2 text-[12px] md:text-[16px]'>{props.name}</p>
        <div className='flex gap-2 md:gap-4 text-[12px] md:text-[18px] '>
          <p className='text-[#374251] font-semibold'>${props.newPrice}</p>
          <p className='text-[#8c8c8c] font-medium line-through'>${props.oldPrice}</p>
        </div>
      </div>
    </div>
  )
}
