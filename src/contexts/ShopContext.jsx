import React, { createContext, useState, useEffect } from "react";

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
    for (let i = 1; i < 10 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
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
    const [all_product, setAll_Product] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/allproducts', { method: 'GET' });
                const data = await response.json();
                setAll_Product(data); // Set the products in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        const getCartData = () => {
            fetch('http://localhost:4000/getcartdata', {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "authToken": `${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: ""
            })
            .then((res) => res.json())
            .then((data) => setCartItems(data))
        }
        if(localStorage.getItem("authToken")){
            getCartData()
        }
    }, []); 

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                quantity: (prev[itemId].quantity || 0) + 1
            }
        }));
        if(localStorage.getItem("authToken")){
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "authToken": `${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                quantity: Math.max(0, (prev[itemId].quantity || 0) - 1)
            }
        }));

        fetch('http://localhost:4000/removefromcart', {
            method: 'POST',
            headers: {
                Accept: "application/form-data",
                "authToken": `${localStorage.getItem("authToken")}`,
                "content-Type": "application/json" 
            },
            body: JSON.stringify({"itemId": itemId})
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
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
        for (const item in cartItems) {
            // console.log(item);
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

    useEffect(() => {
        const totalCount = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
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
