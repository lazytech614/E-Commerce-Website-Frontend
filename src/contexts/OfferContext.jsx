import { useEffect, createContext, useState } from "react";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;
const TIME_INTERVAL_FOR_OFFER_CHANGE = Number(import.meta.env.VITE_TIME_INTERVAL_FOR_OFFER_CHANGE);

export const OfferContext = createContext(null);

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
            // Optional: Instead of removing the STORAGE_KEY, set an expired state
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ number: null, expired: true }));
        }
    }, 1000);

    return interval;
}

const OfferContextProvider = (props) => {
    const [randomOfferAmount, setRandomOfferAmount] = useState(null);
    const [offerTimer, setOfferTimer] = useState("");

    useEffect(() => {
        const now = Date.now();
        let storedData = null;

        // Error handling for invalid or missing localStorage data
        try {
            storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch (error) {
            console.error("Failed to parse stored offer data:", error);
            localStorage.removeItem(STORAGE_KEY); // Clear corrupted data if any
        }
    
        let initialRandomOfferAmount;
        let endTime;
    
        if (storedData && storedData.endTime && now < storedData.endTime) {
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
    
        return () => clearInterval(intervalId); // Proper cleanup
    }, []); // Only runs once on mount

    const contextValue = {
        offerTimer,
        randomOfferAmount
    };

    return (
        <OfferContext.Provider value={contextValue}>
            {props.children}
        </OfferContext.Provider>
    );
}

export default OfferContextProvider;
