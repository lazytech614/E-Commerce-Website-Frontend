import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Navbar } from './components/Navbar/Navbar'
import { Shop } from './pages/Shop'
import {ShopCategory} from './pages/ShopCategory'
import {Product} from './pages/Product'
import {Cart} from './pages/Cart'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import men_banner from '/banner_mens.png'
import women_banner from '/banner_women.png'
import kids_banner from '/banner_kids.png'
import { NewCollections } from './components/NewCollections/NewCollections';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { PlaceOrder } from './pages/PlaceOrder';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />}/>
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />}/>
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kids" />}/>
          <Route path='/newcollections' element={<NewCollections />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
  )
}

export default App
