import React, { createContext, useState, useEffect } from "react";
import all_product from "../constants/all_product";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;
const TIME_INTERVAL_FOR_OFFER_CHANGE = Number(import.meta.env.VITE_TIME_INTERVAL_FOR_OFFER_CHANGE);
const CART_STORAGE_KEY = import.meta.env.VITE_CART_ITEMS_KEY;

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (storedCart) {
        return storedCart;
    }
    let cart = {};
    for (let i = 0; i < all_product.length; i++) {
        cart[i] = 0;
    }
    return cart;
}

const getRandomNumber = (min, max) => {
    min = Math.ceil(min / 5) * 5;
    max = Math.floor(max / 5) * 5;
    return Math.floor(Math.random() * ((max - min) / 5 + 1)) * 5 + min;
}

const startOfferTimer = (endTime, setTimer) => {
    const interval = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));

        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = Math.floor(remainingTime % 60);

        setTimer(`${hours} hours ${minutes} minutes ${seconds} seconds`);

        if (remainingTime <= 0) {
            clearInterval(interval);
            setTimer("Offer expired!");
            localStorage.removeItem(STORAGE_KEY); 
        }
    }, 1000);

    return interval;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [offerTimer, setOfferTimer] = useState("");
    const [randomOfferAmount, setRandomOfferAmount] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [selectedSizes, setSelectedSizes] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const setSelectedSize = (itemId, size) => {
        setSelectedSizes((prevSizes) => ({ ...prevSizes, [itemId]: size }));
    }

    useEffect(() => {
        const now = Date.now();
        const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

        let initialRandomOfferAmount;
        let endTime;

        if (storedData && now < storedData.endTime) {
            initialRandomOfferAmount = storedData.number;
            endTime = storedData.endTime;
        } else {
            initialRandomOfferAmount = getRandomNumber(20, 80);
            endTime = now + TIME_INTERVAL_FOR_OFFER_CHANGE;
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                number: initialRandomOfferAmount,
                timestamp: now,
                endTime: endTime
            }));
        }

        setRandomOfferAmount(initialRandomOfferAmount);
        const intervalId = startOfferTimer(endTime, setOfferTimer);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        const totalCount = Object.values(cartItems).reduce((acc, quantity) => {
            return acc + (typeof quantity === 'number' ? quantity : 0);
        }, 0);
        setCartCount(totalCount);
    }, [cartItems]);

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        randomOfferAmount,
        offerTimer, 
        cartCount,
        getTotalCartAmount,
        selectedSizes,
        setSelectedSize
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
