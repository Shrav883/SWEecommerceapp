import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); // { itemId: { adult: quantity, child: quantity } }
    const [token, setToken] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const adultPrice = 20;
    const childPrice = 12;
    const onlineFee = 4.99;

    const addToCart = async (itemId, ticketType, quantity) => {
        if (quantity <= 0) {
            toast.error('Quantity must be greater than zero');
            return;
        }

        if (ticketType !== 'adult' && ticketType !== 'child') {
            toast.error('Invalid ticket type');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][ticketType] = (cartData[itemId][ticketType] || 0) + quantity;
        } else {
            cartData[itemId] = { [ticketType]: quantity };
        }
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, ticketType, quantity }, { headers: { token } });
                if (!response.data.success) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let count = 0;
        for (const itemId in cartItems) {
            for (const ticketType in cartItems[itemId]) {
                count += cartItems[itemId][ticketType];
            }
        }
        return count;
    };

    const updateQuantity = async (itemId, ticketType, quantity) => {
        if (quantity <= 0) {
            // Remove the item from the cart
            let cartData = structuredClone(cartItems);
            if (cartData[itemId]) {
                delete cartData[itemId][ticketType]
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId]
                }
            }
            setCartItems(cartData);

            if (token) {
                try {
                    const response = await axios.post(backendUrl + '/api/cart/quantity', { itemId, ticketType, quantity: 0 }, { headers: { token } });
                    if (!response.data.success) {
                        toast.error(response.data.message);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error(error.message);
                }
            }
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId][ticketType] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/quantity', { itemId, ticketType, quantity }, { headers: { token } });
                if (!response.data.success) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let amount = 0;
        for (const itemId in cartItems) {
            for (const ticketType in cartItems[itemId]) {
                const quantity = cartItems[itemId][ticketType];
                const price = ticketType === 'adult' ? adultPrice : childPrice;
                amount += quantity * price;
            }
        }
        return amount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
                return response.data.products; // Return the products data
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            return [];
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData); //  adjust the response
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        currency,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        adultPrice,  // Make prices available in context
        childPrice,
        onlineFee,
        getProductsData,
        products
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
