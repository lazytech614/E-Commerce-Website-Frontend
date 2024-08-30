import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CART_STORAGE_KEY = import.meta.env.VITE_CART_ITEMS_KEY;
const baseURL = 'http://localhost:4000'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (Array.isArray(storedCart)) {
        return storedCart;
    }
    let cart = [];
    for (let i = 1; i <= 300; i++) {
        cart.push({
            productId: i,
            quantity: 0,
            size: "Not selected"
        });
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
                setAll_Product(data); 
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        const getCartData = async () => {
            if (localStorage.getItem("authToken")) {
                try {
                    const response = await fetch(`${baseURL}/getcartdata`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/form-data',
                            authToken: `${localStorage.getItem("authToken")}`,
                            'Content-Type': 'application/json'
                        },
                        body: ''
                    });
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setCartItems(data);
                    } else {
                        console.warn("Cart data is not an array", data);
                    }
                } catch (err) {
                    console.log("Error fetching cart data", err);
                }
            }
        }
        getCartData();
    }, []);

    const addToCart = async (itemId, size) => {
        setCartItems((prev) => {
            if (Array.isArray(prev)) {
                return prev.map(item =>
                    item.productId === itemId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            console.warn("cartItems is not an array", prev);
            return prev;
        });

        if (localStorage.getItem("authToken")) {
            await fetch(`${baseURL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "authToken": `${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "itemId": itemId, "size": size })
            })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCartItems(data);
                }
            });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (Array.isArray(prev)) {
                const itemIndex = prev.findIndex(item => item.productId === itemId);
                if (itemIndex !== -1) {
                    const updatedCart = [...prev];
                    const item = updatedCart[itemIndex];
                    
                    if (item.quantity > 0) {
                        item.quantity -= 1;
                    }
                    
                    if (item.quantity === 0) {
                        updatedCart.splice(itemIndex, 1);
                    }
                    
                    return updatedCart;
                }
            }
            return prev;
        });
    
        try {
            const response = await fetch(`${baseURL}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "authToken": `${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "itemId": itemId })
            });
    
            const data = await response.json();
    
            if (Array.isArray(data.cartData)) {
                setCartItems(data.cartData);
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            if (item.quantity > 0) {
                let itemInfo = all_product.find(product => product.id === item.productId);
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * item.quantity;
                }
            }
        });
        return totalAmount;
    };

    useEffect(() => {
        if (Array.isArray(cartItems)) {
            const totalCount = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);
            setCartCount(totalCount);
        }
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
