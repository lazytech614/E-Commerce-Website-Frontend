import React, {useState, useContext} from 'react'
import { navItems } from '../../constants/navItems'
import cartIcon from "/cart_icon.png"
import {Link} from "react-router-dom"
import { IoIosMenu } from "react-icons/io";
import { Sidebar } from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../../contexts/ShopContext';
import { SignUpModal } from '../Modal/SignUpModal';
import { SignInModal } from '../Modal/SignInModal';
import {toast } from 'react-toastify';


export const Navbar = () => {
    const [navItem, setNavItem] = useState("Shop");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
    const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);

    const navigate = useNavigate();

    const {cartCount} = useContext(ShopContext);

    const handleNavItemClick = (item) => {
        setNavItem(item)
    }

    const handleToggleMenuClick = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleSignInClick = () => {
        setIsOpenSignInModal(true)
    }

    const handleSignUpClick = () => {
        setIsOpenSignUpModal(true)
    }

    const handleCartClick = () => {
        localStorage.getItem("authToken") ? navigate("/cart") : toast.error("Please log in first")
    }

    return (
        <div className='sticky top-0 z-[100]'>
            {isSidebarOpen && (
                <Sidebar handleToggleMenuClick={handleToggleMenuClick} navItem={navItem} handleNavItemClick={handleNavItemClick}/>
            )}  
            <header className='sticky top-0 custom-backdrop flex justify-between items-center px-4 sm:px-10  py-2 sm:py-4 shadow-custom'>
                <div className='flex items-center gap-2 sm:gap-4'>
                    <IoIosMenu onClick={handleToggleMenuClick} className='lg:hidden text-[30px] sm:text-[40px] cursor-pointer'/>
                    <Link to="/" onClick={() => handleNavItemClick("Shop")} className='flex items-end gap-2 cursor-pointer'>
                        <img className='w-[40px] sm:w-[60px]' src='/logo.png' alt='logo' />
                        <span className='hidden sm:block uppercase text-3xl text-[#ff4141] font-semibold'>shopper</span>
                    </Link>
                </div>
                <nav className='hidden lg:block'>
                    <ul className='flex items-center gap-8 text-[20px] text-[#626262] font-medium'>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link to={item.text.toLocaleLowerCase()}>
                                    <button onClick={() => handleNavItemClick(item.text)} className={`group relative ${navItem === item.text ? "text-[#ff4141] font-semibold" : ""} overflow-x-hidden`}>
                                        <div className={`h-[2px] w-full absolute bottom-0 ${navItem === item.text ? "left-0" : "left-[-100%]"}  sm:group-hover:left-0 transition-all duration-300 bg-[#ff4141] `}></div>
                                        {item.text}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className='flex items-center gap-2 sm:gap-6'>
                    {localStorage.getItem("authToken") ? (
                        <button onClick={() => {localStorage.removeItem("authToken"); window.location.replace("/")}} className='sm:text-[20px] text-[#515151] font-medium px-4 py-1 sm:px-8 sm:py-2 border border-[#7a7a7a] rounded-3xl capitalize'>
                            log out
                        </button>
                    ) : (
                        <>
                            <button onClick={handleSignUpClick} className='sm:text-[20px] text-[#515151] font-medium px-4 py-1 sm:px-8 sm:py-2 border border-[#7a7a7a] rounded-3xl capitalize'>
                                sign up
                            </button>
                            <button onClick={handleSignInClick} className='sm:text-[20px] text-[#515151] font-medium px-4 py-1 sm:px-8 sm:py-2 border border-[#7a7a7a] rounded-3xl capitalize'>
                                log in
                            </button>
                        </>
                    )}
                    <div onClick={handleCartClick} className='relative cursor-pointer'>
                        <img className='w-[30px]' src={cartIcon} alt='cart' />
                        <span className='absolute top-[-2px] right-[-4px] bg-[red] text-white text-xs h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] flex justify-center items-center rounded-full'>
                            {cartCount}
                        </span>
                    </div>
                </div>
            </header>
            <SignUpModal isOpenSignUpModal={isOpenSignUpModal} setIsOpenSignUpModal={setIsOpenSignUpModal} setIsOpenSignInModal={setIsOpenSignInModal}/>
            <SignInModal isOpenSignInModal={isOpenSignInModal} setIsOpenSignInModal={setIsOpenSignInModal}/>
        </div>
    )
}
