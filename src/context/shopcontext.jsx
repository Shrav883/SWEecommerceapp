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
    const [cartItems, setCartItems] = useState({}); // { movieId: { adult: quantity, child: quantity } }
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const adultPrice = 20;
    const childPrice = 12;
    const onlineFee = 4.99;

    const addToCart = async (movieId, ticketType, quantity) => {
        if (quantity <= 0) {
            toast.error('Quantity must be greater than zero');
            return;
        }

        if (ticketType !== 'adult' && ticketType !== 'child') {
            toast.error('Invalid ticket type');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[movieId]) {
            cartData[movieId][ticketType] = (cartData[movieId][ticketType] || 0) + quantity;
        } else {
            cartData[movieId] = { [ticketType]: quantity };
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { movieId, ticketType, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const movieId in cartItems) {
            if (cartItems[movieId].adult) totalCount += cartItems[movieId].adult;
            if (cartItems[movieId].child) totalCount += cartItems[movieId].child;
        }
        return totalCount;
    };

      const updateQuantity = async (movieId, ticketType, quantity) => {
        if (quantity <= 0) {
          toast.error('Quantity must be greater than zero.');
          return;
        }
        let cartData = structuredClone(cartItems);
    
        if (cartData[movieId]) {
          cartData[movieId][ticketType] = quantity;
        }
        setCartItems(cartData);
    
        if (token) {
          try {
            await axios.post(
              `${backendUrl}/api/cart/update`,
              { movieId, ticketType, quantity },
              { headers: { token } }
            );
          } catch (error) {
            console.error(error);
            toast.error(error.message);
          }
        }
      };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const movieId in cartItems) {
            const movieCart = cartItems[movieId];
            const adultQuantity = movieCart.adult || 0;
            const childQuantity = movieCart.child || 0;
            totalAmount += adultQuantity * adultPrice + childQuantity * childPrice;
        }
        return totalAmount;
    };

    //  No need for getProductsData in this context, but if you have movies
      const getMoviesData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product`); //  change the endpoint
            if (response.data.success) {
               // setMovies(response.data.movies.reverse()); // Assuming your backend returns { success: true, movies: [] }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData); //  adjust the response
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
       // getMoviesData();  // Fetch movies
    }, []);

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
        onlineFee
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
