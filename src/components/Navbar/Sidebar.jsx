import React,{useState} from 'react'
import { navItems } from '../../constants/navItems'
import { MdOutlineClose } from "react-icons/md";
import { Link } from 'react-router-dom';


export const Sidebar = ({handleToggleMenuClick, navItem, handleNavItemClick}) => {
    return (
        <div className='fixed z-[101] h-[100vh] w-[50%] bg-[#f3f4f3] p-4 sm:px-10'>
            <div onClick={handleToggleMenuClick}>
                <MdOutlineClose className='ml-auto text-[30px] cursor-pointer'/>
            </div>
            <ul className='flex flex-col gap-2 sm:text-[20px]'>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <Link to={item.text.toLocaleLowerCase()}>
                            <button onClick={() => {
                                handleNavItemClick(item.text)
                                handleNavItemClick}} className='relative'>
                            {item.text}
                            <hr className={`absolute bottom-[-6px] left-[50%] translate-x-[-50%] w-[80%] h-[3px] rounded-[10px] bg-[#FF4141] ${navItem === item.text ? "block" : "hidden"}`}/>
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
