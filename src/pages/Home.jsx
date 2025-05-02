import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [movies, setMovies] = useState([]); // Changed 'products' to 'movies' for clarity
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products`); // Adjust the endpoint if needed
      if (response.data.success) {
        setMovies(response.data.products); // Assuming your backend returns an array of products
      } else {
        console.error('Error fetching movies:', response.data.message);
        
      }
    } catch (error) {
      console.error('Network error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [backendUrl]); // Fetch movies on component mount and if backendUrl changes

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'All') return true;
    return movie.category?.toLowerCase() === filter.toLowerCase();
  });

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectFilter = (category) => {
    setFilter(category);
    setDropdownOpen(false); // close dropdown after selecting
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen rounded-lg">
      <div>
        <Hero />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Now Showing
      </h1>

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-6 relative">
        <button
          onClick={toggleDropdown}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Filter: {filter}
        </button>
        {dropdownOpen && (
          <div className="text-white absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded z-20">
            {['All', 'Solo', 'Team'].map((type) => (
              <div
                key={type}
                onClick={() => selectFilter(type)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  filter === type ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id} // Assuming your backend returns a unique '_id' field
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={movie.image && movie.image[0]} // Adjust based on your backend's image structure
              alt={movie.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                {movie.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {movie.releaseDate} {/* Adjust to the correct field from your backend */}
              </p>
              <p className="mt-1 text-sm font-medium text-red-500">
                ${movie.ticketPrice} {/* Adjust to the correct field */}
              </p>
              <Link to={`/selectseat/${movie?._id}`}> {/* Use the backend ID for navigation */}
                <button className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;