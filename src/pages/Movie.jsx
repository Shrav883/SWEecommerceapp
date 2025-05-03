import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';

const Movie = ({ token }) => {
    const [list, setList] = useState([]);
    const { backendUrl, currency } = useContext(ShopContext);
    const [expandedProductId, setExpandedProductId] = useState(null);
    const dropdownRef = useRef(null);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setExpandedProductId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleProductDetails = (productId) => {
        setExpandedProductId(expandedProductId === productId ? null : productId);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-700 text-white">
            <p className="text-2xl font-bold mb-4 text-slate-100">Movies Collectiont</p>
            <div className="rounded-md shadow-md">
                {/*-----------List Table Title --------- */}
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 p-2 bg-gray-100">
                    <b className="text-sm font-medium text-gray-700">Image</b>
                    <b className="text-sm font-medium text-gray-700">Name</b>
                    <b className="text-sm font-medium text-gray-700">Category</b>
                    <b className="text-sm font-medium text-gray-700">Price</b>
                    <b className="text-sm font-medium text-gray-700">Action</b>
                </div>
                {/*---------------Product List---------------- */}
                {list.map((item) => (
                    <div key={item._id} className="grid grid-cols-4 md:grid-cols-5 gap-2 p-2 border-b border-gray-200 last:border-0 items-center relative">
                        <img
                            src={item.image && item.image.length > 0 ? item.image[0] : ''}
                            alt={item.name || 'Product Image'}
                            className="w-16 h-16 rounded object-cover"
                        />
                        <p className="text-white">{item.name}</p>
                        <p className="text-white">{item.category}</p>
                        <p className="text-white">
                            {currency}
                            {item.price}
                        </p>
                        <div className="flex items-center justify-center" ref={dropdownRef}>
                            <button
                                onClick={() => toggleProductDetails(item._id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                View Details
                            </button>
                            {expandedProductId === item._id && (
                                <div className="absolute mt-10 bg-white dark:bg-gray-800 border rounded-md shadow-lg p-4 z-10 w-64">
                                    <ul className="space-y-2 text-gray-700 dark:text-white">
                                        <li><strong>Description:</strong> {item.description}</li>
                                        <li><strong>Price:</strong> {currency}{item.price}</li>
                                        <li><strong>Category:</strong> {item.category}</li>
                                        <li><strong>Director:</strong> {item.director}</li>
                                        <li><strong>Main Actors:</strong> {item.actors}</li>
                                        <li><strong>Best Seller:</strong> {item.best_seller ? 'Yes' : 'No'}</li>
                                        <li><strong>Release Date:</strong> {item.release_date}</li>
                                    </ul>
                                    {/* <Link to={`/selectseat/${item._id}`}>
                                        <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Book Now
                                        </button>
                                    </Link> */}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Movie;

