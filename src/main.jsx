import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './contexts/ShopContext.jsx';
import OfferContextProvider from './contexts/OfferContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ShopContextProvider>
        <OfferContextProvider>
        <App />
        </OfferContextProvider>
      </ShopContextProvider>
  </StrictMode>,
)
