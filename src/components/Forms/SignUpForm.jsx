import React, {useState, useEffect} from 'react'
import { PHONE_NUMBER_REQUIRED, FULL_NAME_REQUIRED, MINIMUM_LENGTH_PHONE, EMAIL_REQUIRED, PASSWORD_REQUIRED, GENDER_REQUIRED, TERMS_AND_POLICY } from '../../constants/errorMessages'
import CustomDropdown from '../CustomDropDown/CustomDropDown'
import close_icon from '/red_close_icon.svg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const SignUpForm = ({setIsOpenSignUpModal, setIsOpenSignInModal}) => {
  const baseURL = 'http://localhost:4000'

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: ""
  })
  const [isChecked, setIsChecked] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name === "checkbox"){
      setIsChecked(!isChecked)
    }
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
    if (!formData.email) newErrors.email = EMAIL_REQUIRED;
    if (!formData.password) newErrors.password = PASSWORD_REQUIRED;
    if (!formData.gender && formData.gender === "")
      newErrors.gender = GENDER_REQUIRED;
    if(!isChecked) newErrors.checkbox = TERMS_AND_POLICY
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }else if(!isChecked){
      console.log("Please check");
    }else{
      let responseData;
      await fetch(`${baseURL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then((res) => res.json())
      .then((data) => responseData = data)

      if(responseData.success){
        localStorage.setItem("authToken", responseData.token);
      }else{
        toast.error(responseData.error)
      }
      setIsOpenSignUpModal(false)
    }
  }

  const handleClick = () => {
    setIsOpenSignUpModal(false)
    setIsOpenSignInModal(true)
  }
  return (
    <div className='fixed z-[999] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] sm:w-[600px] mx-auto p-[20px] sm:p-[40px] bg-white  flex flex-col'>
        <div onClick={() => setIsOpenSignUpModal(false)} className='w-[20px] sm:w-[30px] absolute right-[20px] sm:right-[40px] cursor-pointer'>
            <img className='w-full' src={close_icon} alt='cross' />
        </div>
        <h1 className='text-center text-[22px] sm:text-[28px] text-[#171717] capitalize font-semibold'>sign up</h1>
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
              type='email'
              placeholder='E-mail address'
              name='email'
              value={formData.email}
              onChange={handleChange}
              errors={errors.email}
              className='h-[40px] sm:h-[60px] w-[100%] px-4 border border-[#c9c9c9] text-[#5c5c5c] text-[14px] sm:text-[16px] outline-none bg-transparent'
            />
            {errors.email && (
              <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.email}l</span>
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
          <CustomDropdown
              name='gender'
              value={formData.gender}
              onChange={(value) => handleChange({ target: { name: 'gender', value } })}
              placeholder='Select your gender'
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Others', label: 'Others' }
              ]}
            />
            {errors.gender && (
              <span className='absolute bottom-[-16px] sm:bottom-[-20px] left-0 text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.gender}</span>
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
        <p onClick={handleClick} className='mt-[20px] text-[#5c5c5c] text-[10px] sm:text-[16px]'>Already have an account <span className='text-[#ff4141] font-semibold cursor-pointer sm:hover:underline'>sign in here</span></p>
        <div className='relative flex gap-2 items-start sm:items-center text-[#5c5c5c] text-[10px] sm:text-[16px]'>
          <input onChange={handleChange} className='mt-1 sm:mt-0 cursor-pointer' type='checkbox' name='checkbox' id='checkbox'/>
          <p>By continuing, I agree to the <span className='text-[#ff4141] font-semibold cursor-pointer sm:hover:underline'>terms of use & privacy policy</span></p>
          {errors.checkbox && (
            <span className='absolute bottom-[-16px] text-[10px] sm:text-[12px] text-[#ff4141]'>{errors.checkbox}</span>
          )}
        </div>
    </div>
  )
}
