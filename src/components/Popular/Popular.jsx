import React from 'react'
import { PopularItems } from './PopularItems'
import { latestProductMen, latestProductWomen,latestProductKids } from '../../constants/latestProducts'

export const Popular = () => {
  return (
    <div>
        <PopularItems name="women" list={latestProductWomen}/>
        <PopularItems name="men" list={latestProductMen}/>
        <PopularItems name="kids" list={latestProductKids}/>
    </div>
  )
}
