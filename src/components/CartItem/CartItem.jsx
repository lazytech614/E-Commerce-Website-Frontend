import React, { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import remove_icon from '/cart_cross_icon.png';
import empty_cart from '/Empty-cart.webp';
import { ENTER_THE_PROMO_CODE_FIRST } from '../../constants/errorMessages';

export const CartItems = () => {
  const { all_product, getTotalCartAmount, cartItems, removeFromCart, cartCount, formatIndianNumber } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    promoCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.promoCode) newErrors.promoCode = ENTER_THE_PROMO_CODE_FIRST;
    return newErrors;
  };

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Handle promo code logic here
  };

  return (
    <>
      {cartCount > 0 ? (
        <div className='my-10'>
          <div className='flex lg:block overflow-x-auto py-8 lg:py-0'>
            <div className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-[75px] mr-[60px] lg:mr-0 py-[20px] text-[#454545] text-[18px] font-semibold capitalize">
              <p>Product</p>
              <p>Name</p>
              <p>Price</p>
              <p>Size</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <div className='hidden lg:block w-[100%] h-[2px] bg-[#D9D9D9] my-2'></div>
            {all_product.map((item) => {
              if (cartItems[item.id]?.quantity > 0) {
                return (
                  <div key={item.id}>
                    <div className='w-[260px] lg:w-auto grid lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-[75px] text-gray-700'>
                      <img className='w-[64px]' src={item.image} alt='image' />
                      <p>{item.name}</p>
                      <p>Rs. {formatIndianNumber(item.new_price)}</p>
                      <p>{cartItems[item.id].size}</p>
                      <button className='w-[64px] h-[52px] border-[2px] border-[#ebebeb]'>{cartItems[item.id].quantity}</button>
                      <p>Rs. {formatIndianNumber(item.new_price * cartItems[item.id].quantity)}</p>
                      <button onClick={() => removeFromCart(item.id)} className='w-[64px] h-[52px] bg-[#ff4141] text-white text-xl'>
                        -
                      </button>
                    </div>
                    <div className='hidden lg:block w-[100%] h-[2px] bg-[#D9D9D9] my-2'></div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className='flex flex-wrap-reverse gap-[100px] my-20'>
            <div className='flex flex-col flex-1 gap-[40px]'>
              <span className='text-[#171717] text-[36px] font-semibold'>Cart total</span>
              <div>
                <div className='flex justify-between py-[16px]'>
                  <p>Subtotal</p>
                  <p>Rs. {formatIndianNumber(getTotalCartAmount())}</p>
                </div>
                <div className='w-[100%] h-[2px] bg-[#D9D9D9] my-2'></div>
                <div className='flex justify-between py-[16px]'>
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <div className='w-[100%] h-[2px] bg-[#D9D9D9] my-2'></div>
                <div className='flex justify-between py-[16px]'>
                  <p>Total</p>
                  <p>Rs. {formatIndianNumber(getTotalCartAmount())}</p>
                </div>
              </div>
              <button className='w-[262px] h-[58px] bg-[#ff4141] text-white font-semibold cursor-pointer'>Proceed to Checkout</button>
            </div>
            <div className='w-[100%] relative'>
              <p className='text-[#555]'>If you have a promo code enter it here</p>
              <form onSubmit={handlePromoCodeSubmit} className='sm:w-[504px] h-[44px] sm:h-[58px] flex items-center mt-[15px] pl-[20px] bg-[#eaeaea]'>
                <input 
                  name='promoCode'
                  value={formData.promoCode}
                  onChange={handleChange} 
                  type="text" 
                  placeholder='Enter promo code...' 
                  className='outline-none w-[100%] sm:w-[330px] h-[40px] sm:h-[50px] pe-4 text-[14px] sm:text-[16px] bg-transparent'
                />
                <button type='submit' className='w-[120px] sm:w-[170px] h-full text-[14px] sm:text-[16px] bg-black text-white cursor-pointer'>Submit</button>
              </form>
              <span className='absolute bottom-[-16px] sm:bottom-[-28px] left-0 text-[10px] sm:text-[16px] text-[#ff4141]'>{errors.promoCode}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center my-9'>
          <img className='w-[200px]' src={empty_cart} alt='empty cart' />
          <p className='text-[#171717] text-[22px] font-medium'>Your <span className='text-[#ff4141] font-semibold'>SHOPPER</span> cart is empty</p>
        </div>
      )}
    </>
  );
};
