import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, currency, adultPrice, childPrice, onlineFee } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const movieIds = Object.keys(cartItems);
        if (movieIds.length > 0) {
            const tempData = [];
            let total = 0;
            for (const movieId of movieIds) {
                const movieCart = cartItems[movieId];
                const adultQuantity = movieCart.adult || 0;
                const childQuantity = movieCart.child || 0;
                const movieSubtotal = (adultQuantity * adultPrice) + (childQuantity * childPrice);

                tempData.push({
                    movieId: movieId,
                    adultQuantity: adultQuantity,
                    childQuantity: childQuantity,
                    subtotal: movieSubtotal,
                });
                total += movieSubtotal;
            }
            setCartData(tempData);
        }
    }, [cartItems, adultPrice, childPrice]);

    const handleProceedToCheckout = () => {
        // Implement your checkout logic here.  You might want to calculate the final
        // order details (including online fee and tax) and then proceed to a
        // payment gateway or order confirmation page.
        console.log('Proceeding to checkout with cart data:', cartData);
        navigate('/checkout'); //  Adjust the route as necessary
    };

    if (cartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
                    <p>No tickets have been added to your cart yet.</p>
                    <Link to="/" className="text-red-500 hover:underline mt-4 inline-block">
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white'>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

                {cartData.map((item) => (
                    <div key={item.movieId} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2 md:mb-0">Movie: {item.movieId}</h2> {/* Display Movie ID */}
                            <div className="flex items-center gap-4">
                                <div className='flex flex-col sm:flex-row gap-2'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adult:</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.adultQuantity}
                                            onChange={(e) => updateQuantity(item.movieId, 'adult', parseInt(e.target.value, 10))}
                                            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Child:</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.childQuantity}
                                            onChange={(e) => updateQuantity(item.movieId, 'child', parseInt(e.target.value, 10))}
                                            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-lg">Subtotal: {currency}{(item.subtotal).toFixed(2)}</p>
                    </div>
                ))}

                <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>{currency}{cartData.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Online Fee:</span>
                        <span>{currency}{onlineFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span>{currency}{(cartData.reduce((acc, item) => acc + item.subtotal, 0) + onlineFee).toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleProceedToCheckout}
                        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
