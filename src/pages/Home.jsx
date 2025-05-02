import React, { useState } from 'react';
import {  } from 'react-router-dom';
import Hero from '../components/Hero';
import Collection from '../components/Collection';

const Home = () => {
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectFilter = (category) => {
    setFilter(category);
    setDropdownOpen(false);
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
      <Collection filterType={ filter } />
    </div>
  );
};

export default Home;
