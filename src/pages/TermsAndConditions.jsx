import React from 'react'
import { Overview } from '../components/TermsAndConditions/Overview'
import { Section1 } from '../components/TermsAndConditions/Section1'
import { Section2 } from '../components/TermsAndConditions/Section2'
import { Section3 } from '../components/TermsAndConditions/Section3'
import { Section4 } from '../components/TermsAndConditions/Section4'
import { Section5 } from '../components/TermsAndConditions/Section5'
import { Section6 } from '../components/TermsAndConditions/Section6'
import { Section7 } from '../components/TermsAndConditions/Section7'
import { Section8 } from '../components/TermsAndConditions/Section8'

export const TermsAndConditions = () => {
  return (
    <div className='flex flex-col gap-2 my-4'>
        <Overview />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
    </div>
  )
}
