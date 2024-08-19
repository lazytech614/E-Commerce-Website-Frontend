import React, {useEffect} from 'react'
import { createPortal } from 'react-dom';
import { SignUpForm } from '../Forms/SignUpForm'

export const SignUpModal = ({isOpenSignUpModal, setIsOpenSignUpModal}) => {
    useEffect(() => {
        if (document) {
          document.body.style.overflowY = isOpenSignUpModal ? "hidden" : "scroll";
        }
      }, [isOpenSignUpModal]);

    if(!isOpenSignUpModal) return null

    return createPortal(
        <div>
            <div onClick={() => setIsOpenSignUpModal(false)} className='bg-[#171717bf] fixed inset-0 z-[100]'></div>
            <div className=''>
                <SignUpForm setIsOpenSignUpModal={setIsOpenSignUpModal}/>
            </div>
        </div>,
        document.querySelector(".showMyPortal")
    )
}
