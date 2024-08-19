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
    for (let i = 1; i < all_product.length + 1; i++) {
        cart[i] = { quantity: 0, size: "not selected" }; // Initialize with size "not selected"
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

function formatIndianNumber(number) {
    let numStr = number.toString().replace(/[^0-9]/g, '');

    let [integerPart, decimalPart] = numStr.split('.');

    let lastThreeDigits = integerPart.slice(-3);
    let otherDigits = integerPart.slice(0, -3);
    if (otherDigits !== '') {
        lastThreeDigits = ',' + lastThreeDigits;
    }
    let formattedInteger = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits;

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [offerTimer, setOfferTimer] = useState("");
    const [randomOfferAmount, setRandomOfferAmount] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [selectedSizes, setSelectedSizes] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ 
            ...prev, 
            [itemId]: { 
                ...prev[itemId], 
                quantity: (prev[itemId].quantity || 0) + 1 
            }
        }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ 
            ...prev, 
            [itemId]: { 
                ...prev[itemId], 
                quantity: Math.max(0, (prev[itemId].quantity || 0) - 1) 
            }
        }));
    }

    const setSizeForItem = (itemId, size) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                size
            }
        }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item].quantity > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item].quantity
            }
        }
        return totalAmount;
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
        const totalCount = Object.values(cartItems).reduce((acc, item) => {
            return acc + (item.quantity || 0);
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
        setSizeForItem, 
        formatIndianNumber
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
