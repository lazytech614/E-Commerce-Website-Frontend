import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CART_STORAGE_KEY = import.meta.env.VITE_CART_ITEMS_KEY;
const baseURL = 'https://e-commerce-website-backend-sandy.vercel.app/'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (storedCart) {
        return storedCart;
    }
    let cart = {};
    for (let i = 1; i < 300 + 1; i++) {
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
                const response = await fetch(`${baseURL}/allproducts`, { method: 'GET' });
                const data = await response.json();
                setAll_Product(data); // Set the products in state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        const getCartData = () => {
            if(localStorage.getItem("authToken")){
                try{
                    fetch(`${baseURL}/getcartdata`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            authToken: `${localStorage.getItem("authToken")}`,
                            'Content-Type': 'application/json'
                        },
                        body: ''
                    })
                    .then((res) => res.json())
                    .then((data) => setCartItems(data))
                }catch(err){
                    console.log("Error fetching cart data", err);
                }
            }
        }
        getCartData()
    }, []); 

    const addToCart = async(itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
        if(localStorage.getItem("authToken")){
            await fetch(`${baseURL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "authToken": `${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((res) => res.json())
            .then((data) => setCartItems(data))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));

        fetch(`${baseURL}/removefromcart`, {
            method: 'POST',
            headers: {
                Accept: "application/form-data",
                "authToken": `${localStorage.getItem("authToken")}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({"itemId": itemId})
        })
        .then((res) => res.json())
        .then((data) => setCartItems(data))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) { 
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    

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
        formatIndianNumber
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
