import React, { useContext } from 'react'
import {ShopContext} from '../contexts/ShopContext'
import {useParams} from 'react-router-dom'
import { Breadcrum } from '../components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../components/RelatedProducts/RelatedProducts';

export const Product = () => {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  // console.log(all_product[0].id);
  const product = all_product.find((product) => product.id === Number(productId))

  return (
    <div>
      {/* <Breadcrum product={product}/> */}
      {product && (
        <ProductDisplay product={product}/>
      )}
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}
