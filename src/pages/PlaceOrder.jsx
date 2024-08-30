import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { stateList } from '../constants/stateList';
import { countryList } from '../constants/countryList';
import { ShopContext } from '../contexts/ShopContext';
import CustomDropdown from '../components/CustomDropDown/CustomDropDown';
import {
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  EMAIL_REQUIRED,
  STREET_REQUIRED,
  CITY_REQUIRED,
  STATE_REQUIRED,
  PINCODE_REQUIRED,
  COUNTRY_REQUIRED,
  PHONE_NUMBER_REQUIRED,
  MINIMUM_LENGTH_PHONE
} from '../constants/errorMessages';

export const PlaceOrder = () => {
  const baseURL = "http://localhost:4000";
  const { getTotalCartAmount, formatIndianNumber, cartItems } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    eMail: "",
    street: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    phone: "",
    total: "",
    items: [] // Initialize as an empty array
  });
  const [shippingFee, setShippingFee] = useState(0);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fName) newErrors.fName = FIRST_NAME_REQUIRED;
    if (!formData.lName) newErrors.lName = LAST_NAME_REQUIRED;
    if (!formData.eMail) newErrors.eMail = EMAIL_REQUIRED;
    if (!formData.street) newErrors.street = STREET_REQUIRED;
    if (!formData.city) newErrors.city = CITY_REQUIRED;
    if (!formData.pinCode) newErrors.pinCode = PINCODE_REQUIRED;
    if (!formData.state) newErrors.state = STATE_REQUIRED;
    if (!formData.country) newErrors.country = COUNTRY_REQUIRED;
    if (!formData.phone) newErrors.phone = PHONE_NUMBER_REQUIRED;
    if (formData.phone.length < 10 && formData.phone.length > 0) newErrors.phone = MINIMUM_LENGTH_PHONE;
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // console.log(formData);
    fetch(`${baseURL}/payment`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("Order placed successfully");
        navigate('/payment'); 
      } else {
        console.log("Order placement failed");
      }
    })
    .catch((err) => console.error("Error placing order:", err));
  };

  useEffect(() => {
    const totalAmount = getTotalCartAmount() + shippingFee;
    setFormData((prevData) => ({ ...prevData, total: totalAmount }));
  }, [getTotalCartAmount, shippingFee]);

  // Update items based on cartItems
  useEffect(() => {
    const itemsInCart = cartItems.filter(item => item.quantity > 0);
    setFormData(prevData => ({ ...prevData, items: itemsInCart }));
  }, [cartItems]);

  return (
    <div className='min-h-[90vh] px-4 sm:px-10 md:px-20 py-2 my-10 lg:my-0 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row w-full justify-between items-center lg:items-start gap-x-20 gap-y-10 text-[12px] sm:text-[16px]'>
        {/* Delivery Information Section */}
        <div className='flex flex-col gap-y-6 w-full lg:w-[50%]'>
          <span className='text-[20px] sm:text-[36px] font-semibold capitalize mb-2 md:mb-10'>Delivery informations</span>
          {/* First and Last Name */}
          <div className='flex gap-4'>
            <div className='w-[50%] relative'>
              <input
                type='text'
                name='fName'
                value={formData.fName}
                onChange={handleChange}
                placeholder='Firstname'
                className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
              />
              {errors.fName && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.fName}</span>
              )}
            </div>
            <div className='w-[50%] relative'>
              <input
                type='text'
                name='lName'
                value={formData.lName}
                onChange={handleChange}
                placeholder='Lastname'
                className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
              />
              {errors.lName && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.lName}</span>
              )}
            </div>
          </div>
          {/* Other Form Fields */}
          <div className='flex gap-y-6 flex-col'>
            <div className='relative'>
              <input
                type='email'
                name='eMail'
                value={formData.eMail}
                onChange={handleChange}
                placeholder='Email Address'
                className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
              />
              {errors.eMail && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.eMail}</span>
              )}
            </div>
            <div className='relative'>
              <input
                type='text'
                name='street'
                value={formData.street}
                onChange={handleChange}
                placeholder='Street'
                className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
              />
              {errors.street && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.street}</span>
              )}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 gap-y-6'>
            <div className='relative'>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='City'
                className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
              />
              {errors.city && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.city}</span>
              )}
            </div>
            <div className='relative'>
              <input
                type='text'
                name='pinCode'
                value={formData.pinCode}
                onChange={handleChange}
                placeholder='Pin Code'
                className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
              />
              {errors.pinCode && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.pinCode}</span>
              )}
            </div>
            <div className='relative'>
              <CustomDropdown
                name='state'
                value={formData.state}
                onChange={(value) => handleChange({ target: { name: 'state', value } })}
                placeholder='State'
                className="rounded-md border border-[#7a7a7a]"
                options={stateList.map((state) => ({
                  value: state.name,
                  label: state.name
                }))}
              />
              {errors.state && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.state}</span>
              )}
            </div>
            <div className='relative'>
              <CustomDropdown
                name='country'
                value={formData.country}
                onChange={(value) => handleChange({ target: { name: 'country', value } })}
                placeholder='Country'
                className="rounded-md border border-[#7a7a7a]"
                options={countryList.map((country) => ({
                  value: country.name,
                  label: country.name
                }))}
              />
              {errors.country && (
                <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.country}</span>
              )}
            </div>
          </div>
          <div className='relative'>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Phone'
              className='h-[40px] sm:h-[60px] w-full px-2 outline-none border border-[#7a7a7a] rounded-md'
            />
            {errors.phone && (
              <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.phone}</span>
            )}
          </div>
        </div>
        {/* Cart Totals Section */}
        <div className='flex flex-col gap-y-6 w-full lg:w-[50%]'>
          <span className='text-[20px] sm:text-[36px] font-semibold capitalize mb-2 md:mb-10'>Cart totals</span>
          <div className='text-[#515151]'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>Rs. {formatIndianNumber(getTotalCartAmount())}</p>
            </div>
            <div className='w-[100%] h-[2px] bg-[#D9D9D9] mb-2'></div>
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{shippingFee}</p>
            </div>
            <div className='w-[100%] h-[2px] bg-[#D9D9D9] mb-2'></div>
            <div className='flex justify-between font-semibold text-[#ff4141]'>
              <p>Total</p>
              <p>Rs. {formatIndianNumber(getTotalCartAmount() + shippingFee)}</p>
            </div>
          </div>
          <button type='submit' className='w-[262px] h-[58px] bg-[#ff4141] cursor-pointer mt-4 text-white font-semibold capitalize'>Proceed to Payment</button>
        </div>
      </form>
    </div>
  );
};
