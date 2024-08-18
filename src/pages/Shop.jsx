import React from 'react'
import { Hero } from '../components/Hero/Hero'
import { Item } from '../components/Item/Item'
import { Popular } from '../components/Popular/Popular'
import { Offer } from '../components/Offer/Offer'
import { NewCollections } from '../components/NewCollections/NewCollections'

export const Shop = () => {
    return (
      <div>
        <Hero />
        <Popular />
        <Offer />
        <NewCollections />
      </div>
    )
}
