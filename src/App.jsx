import { useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Shop } from './pages/Shop'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {ShopCategory} from './pages/ShopCategory'
import {Product} from './pages/Product'
import {Cart} from './pages/Cart'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import men_banner from '/banner_mens.png'
import women_banner from '/banner_women.png'
import kids_banner from '/banner_kids.png'

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />}/>
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />}/>
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />}/>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App
