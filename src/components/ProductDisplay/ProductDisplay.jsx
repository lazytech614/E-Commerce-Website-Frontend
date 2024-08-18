import React, { useContext, useState } from 'react';
import star_icon from '/star_icon.png';
import star_dull_icon from '/star_dull_icon.png';
import { sizesList } from '../../constants/sizes';
import { ShopContext } from '../../contexts/ShopContext';
import { SELECT_SIZE } from '../../constants/errorMessages';

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, setSelectedSize } = useContext(ShopContext);
    const [size, setSize] = useState("");
    const [errors, setErrors] = useState({});

    const handleClick = (selectedSize) => {
        setSize(selectedSize);
        setSelectedSize(product.id, selectedSize);
        setErrors((prevErrors) => ({
            ...prevErrors,
            size: ""
        }));
    }

    const validate = () => {
        const newErrors = {};
        if (!size) newErrors.size = SELECT_SIZE;
        return newErrors;
    }

    const handleAddToCart = () => {
        // console.log(product.id);
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            addToCart(product.id);
        }
    }

    return (
        <div className='px-4 sm:px-10 md:px-20 my-10 flex flex-col sm:flex-row gap-y-10 gap-2 lg:gap-4'>
            <div className='sm:w-[60%] flex flex-col-reverse justify-end lg:flex-row items-center gap-4'>
                <div className='flex lg:flex-col items-center justify-center gap-2 lg:gap-4'>
                    <img className='w-[80px] lg:w-auto lg:h-[163px] cursor-pointer' src={product.image} alt='image' />
                    <img className='w-[80px] lg:w-auto lg:h-[163px] cursor-pointer' src={product.image} alt='image' />
                    <img className='w-[80px] lg:w-auto lg:h-[163px] cursor-pointer' src={product.image} alt='image' />
                    <img className='w-[80px] lg:w-auto lg:h-[163px] cursor-pointer' src={product.image} alt='image' />
                </div>
                <div>
                    <img className='w-[100%] lg:w-[586px] lg:h-[700px]' src={product.image} alt='image' />
                </div>
            </div>
            <div className='sm:w-[40%] flex flex-col'>
                <p className='text-[22px] sm:text-[28px] lg:text-[36px] text-[#3d3d3d] font-bold leading-[30px] sm:leading-[36px] lg:leading-[44px]'>{product.name}</p>
                <div className='flex items-center text-[#1c1c1c] gap-1 mt-4 lg:mt-8'>
                    <img src={star_icon} alt='star' />
                    <img src={star_icon} alt='star' />
                    <img src={star_icon} alt='star' />
                    <img src={star_icon} alt='star' />
                    <img src={star_dull_icon} alt='star' />
                    <p>(122)</p>
                </div>
                <div className='flex gap-2 lg:mt-2 text-[24px] font-bold'>
                    <div className='line-through text-[#8c8c8c]'>${product.old_price}</div>
                    <div className='text-[#ff4141]'>${product.new_price}</div>
                </div>
                <div className='mt-4 lg:mt-8'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto necessitatibus esse accusantium, error sed exercitationem nesciunt inventore beatae optio officiis vero sequi quisquam, nulla ut ipsam recusandae? Reiciendis, veniam eveniet?
                </div>
                <div className='relative my-4 lg:my-10'>
                    <p className='text-[#656565] text-[18px] lg:text-[20px] capitalize font-semibold'>select size</p>
                    <div className='flex flex-wrap gap-2 mt-2 uppercase'>
                        {sizesList.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => handleClick(item.size)} 
                                className={`px-6 py-2 lg:text-[22px] font-semibold border-[2px] duration-300 cursor-pointer 
                                    ${size === item.size 
                                        ? 'bg-[#ff4141] text-white border-[#ff4141]' 
                                        : 'bg-[#fbfbfb] hover:bg-[#F0F0F0] border-[#ebebeb] hover:border-[#D9D9D9]'
                                    }
                                `}
                            >
                                {item.size}
                            </div>
                        ))}
                    </div>
                    {errors.size && (
                        <span className='absolute bottom-[-16px] sm:bottom-[-28px] left-0 text-[10px] sm:text-[16px] text-[#ff4141]'>
                            {errors.size}
                        </span>
                    )}
                </div>
                <button 
                    onClick={handleAddToCart} 
                    className='w-[120px] sm:w-[160px] lg:w-[200px] lg:px-[40px] py-[10px] sm:py-[20px] bg-[#ff4141] text-white text-[12px] lg:text-[16px] font-semibold uppercase cursor-pointer'
                >
                    add to cart
                </button>
                <div className='mt-4'>
                    <p><span className='font-semibold'>Category: </span>{product.category}</p>
                    <p><span className='font-semibold'>Tag: </span>tag1, tag2, tag3</p>
                </div>
            </div>
        </div>
    );
}
