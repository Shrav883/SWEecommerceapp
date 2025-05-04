import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/Shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setLoading(false);
                return; //  Redirect to login
            }
            try {
                const response = await axios.post(`${backendUrl}/api/order/get`, {}, {
                    headers: { token },
                });
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast.error('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [backendUrl, token]);

    if (loading) {
        return <div className="text-center">Loading orders...</div>;
    }

    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
                    <p>You need to be logged in to view your orders.</p>
                    <Link to="/login" className="text-blue-500 hover:underline mt-4 inline-block">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
                {orders.map((order) => (
                    <div key={order._id} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="flex justify-between items-start mb-4 border-b pb-4">
                            <div>
                                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Order Date: {new Date(order.createdAt).toLocaleString()}
                                </p>
                                 <p className="text-gray-500 dark:text-gray-400">
                                    Delivery Email: {order.address.email}
                                </p>
                            </div>
                            <div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        order.status === 'pending'
                                            ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                                            : order.status === 'shipped'
                                            ? 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
                                            : 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item._id} className="mb-2">
                                    {item.name} ({item.ticketType}) x {item.quantity} - ${item.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <p className="text-lg font-bold">
                                Total Amount: ${order.amount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;