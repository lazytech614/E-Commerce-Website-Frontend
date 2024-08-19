import React, {useEffect} from 'react'
import { createPortal } from 'react-dom'
import { SignInForm } from '../Forms/SignInForm'

export const SignInModal = ({isOpenSignInModal, setIsOpenSignInModal}) => {
    useEffect(() => {
        if (document) {
          document.body.style.overflowY = isOpenSignInModal ? "hidden" : "scroll";
        }
      }, [isOpenSignInModal]);

    if(!isOpenSignInModal) return null

    return createPortal(
        <div>
            <div onClick={() => setIsOpenSignInModal(false)} className='bg-[#171717bf] fixed inset-0 z-[100]'></div>
            <div className=''>
                <SignInForm setIsOpenSignInModal={setIsOpenSignInModal}/>
            </div>
        </div>,
        document.querySelector(".showMyPortal")
    )
}
