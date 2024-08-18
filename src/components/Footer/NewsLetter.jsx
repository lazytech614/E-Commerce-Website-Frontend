import React, {useState} from 'react'
import {EMAIL_REQUIRED} from '../../constants/errorMessages'

export const NewsLetter = () => {

    const [formData, setFormData] = useState({
        email: '',
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
        if(!formData.email) newErrors.email = EMAIL_REQUIRED;
        return newErrors;
    }

    const handleNewsLetterSubmit = (e) => {
        e.preventDefault()
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }
    }

    return (
        <div className=' sm:min-h-[40vh] flex flex-col items-start justify-center gap-2 lg:gap-4 px-4 sm:px-10 md:px-20 py-[20px] sm:py-0 bg-custom-gradient '>
            <p className='capitalize text-[#171717] text-[30px] sm:text-[40px] lg:text-[55px] font-semibold leading-[32px] sm:leading-[40px]'>Get exclusive offers on your E-mail</p>
            <p className='text-[#454545] text-[14px] sm:text-[18px] lg:text-[20px]'>Subscribe to our newsletter and stay updated</p>
            <div className='relative'>
                <form onSubmit={handleNewsLetterSubmit} className='w-[90%] sm:w-fit h-[50px] sm:h-[60px] lg:h-[70px] mt-[10px] flex items-center justify-between bg-white gap-2 rounded-[80px] border border-[#454545] overflow-hidden'>
                    <input 
                        placeholder='Enter your e-mail'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-[60%] sm:w-[400px] lg:w-[500px] h-full ml-[30px] outline-none bg-transparent text-[#616161] text-[14px] sm:text-[16px]'
                    />
                    <button type='submit' className='w-[120px] sm:w-[160px] lg:w-[210px] h-full bg-black text-white text-[14px] sm:text-[16px] rounded-[80px] cursor-pointer'>Subscribe</button>
                </form>
                <span className='absolute bottom-[-16px] sm:bottom-[-28px] left-0 text-[10px] sm:text-[16px] text-[#ff4141]'>{errors.email}</span>
            </div>
        </div>
    )
}
