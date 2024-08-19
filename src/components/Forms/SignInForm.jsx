import React, {useState} from 'react'
import { PHONE_NUMBER_REQUIRED, FULL_NAME_REQUIRED, MINIMUM_LENGTH_PHONE, PASSWORD_REQUIRED } from '../../constants/errorMessages'
import close_icon from '/red_close_icon.svg'
export const SignInForm = ({setIsOpenSignInModal}) => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: ""
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = FULL_NAME_REQUIRED;
    if (!formData.phone) newErrors.phone = PHONE_NUMBER_REQUIRED;
    if (formData.phone.length < 10 && formData.phone.length>0) newErrors.phone = MINIMUM_LENGTH_PHONE;
    if (!formData.password) newErrors.password = PASSWORD_REQUIRED;
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }else{
      setIsOpenSignInModal(false)
    }
  }

  return (
      <div className='fixed z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] sm:w-[600px] mx-auto p-[20px] sm:p-[40px] bg-white  flex flex-col'>
        <div onClick={() => setIsOpenSignInModal(false)} className='w-[20px] sm:w-[30px] absolute right-[20px] sm:right-[40px] cursor-pointer'>
            <img className='w-full' src={close_icon} alt='cross' />
        </div>
        <h1 className='text-center text-[22px] sm:text-[28px] text-[#171717] capitalize font-semibold'>sign in</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] sm:gap-[30px] mt-[20px] bg-transparent'>
          <div className='relative'>
            <input 
              type='text'
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              errors={errors.name}
              className='h-[40px] sm:h-[60px] w-[100%] px-4 border border-[#c9c9c9] text-[#5c5c5c] text-[14px] sm:text-[16px] outline-none bg-transparent'
            />
            {errors.name && (
              <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.name}</span>
            )}
          </div>
          <div className='relative'>
            <input 
              type="tel"
              placeholder="Phone number"
              name="phone"
              value={formData.phone}
              maxLength={10}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
              errors={errors.phone}
              className="h-[40px] sm:h-[60px] w-[100%] px-4 border border-[#c9c9c9] text-[#5c5c5c] text-[14px] sm:text-[16px] outline-none bg-transparent"
            />
            {errors.phone && (
              <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.phone}</span>
            )}
          </div>
          <div className='relative'>
            <input 
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              errors={errors.password}
              className='h-[40px] sm:h-[60px] w-[100%] px-4 border border-[#c9c9c9] text-[#5c5c5c] text-[14px] sm:text-[16px] outline-none bg-transparent'
            />
            {errors.password && (
              <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.password}</span>
            )}
          </div>
          <button className='w-[100%] h-[40px] sm:h-[60px] bg-[#ff4141] text-white sm:text-[24px] cursor-pointer'>Submit</button>
        </form>
        <div className='flex gap-2 items-center mt-[10px] text-[#5c5c5c] text-[10px] sm:text-[16px]'>
          <input className='cursor-pointer' type='checkbox' name='' id=''/>
          <p>Keep me signed in</p>
        </div>
      </div>
  )
}
