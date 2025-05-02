import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Collection = ({ filterType, maxItems = 0 }) => {
    const { products } = useContext(ShopContext);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        let filtered = products || []; // Ensure products is not undefined
        if (filterType !== 'All') {
            filtered = (products || []).filter( // Ensure products is not undefined
                (movie) => movie.category?.toLowerCase() === filterType.toLowerCase()
            );
        }
        if (maxItems > 0) {
            setDisplayProducts(filtered.slice(0, maxItems));
        }
        else {
            setDisplayProducts(filtered)
        }
    }, [products, filterType, maxItems]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayProducts && displayProducts.length > 0 ? ( // Check if displayProducts exists and has length
                displayProducts.map((movie) => (
                    <div
                        key={movie._id}
                        className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
                    >
                        <img
                            src={movie.image && movie.image[0] ? movie.image[0] : '/default-image.jpg'}
                            alt={movie.name}
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-3">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                                {movie.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {movie.releaseDate}
                            </p>
                            <p className="mt-1 text-sm font-medium text-red-500">
                                ${movie.ticketPrice}
                            </p>
                            <Link to={`/selectseat/${movie?._id}`}>
                                <button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <div>No movies to display</div> // Or any other message you want
            )}
        </div>
    );
};

export default Collection;
