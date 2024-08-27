import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../../contexts/ShopContext';

export const Item = (props) => {
  const navigate = useNavigate();

  const {formatIndianNumber} = useContext(ShopContext);

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
        <p className='my-2 text-[12px] md:text-[16px] text-[#171717] font-medium'>{props.name}</p>
        <div className='flex gap-2 md:gap-4 text-[12px] md:text-[18px] '>
          <p className='text-[#ff4141] font-semibold'>Rs. {formatIndianNumber(props.oldPrice)}</p>
          <p className='text-[#8c8c8c] font-medium line-through'>{formatIndianNumber(props.newPrice)}</p>
        </div>
      </div>
    </div>
  )
}
