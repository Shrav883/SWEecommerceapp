import React, { useState } from 'react';
import { products } from '../assets/assets';
import { Link } from 'react-router-dom';

const Movie = () => {
  const [movies, setMovies] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredMovies = products.filter(
      (movie) =>
        movie.Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        movie.director.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  const toggleMovieDetails = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  return (
    <div className="p-6 bg-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Movies Collection</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Type Movie Name or Director"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>


      {movies.length > 0 ? (
        <ul className="space-y-2">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="bg-white rounded-md shadow-md p-4 flex flex-col items-start justify-between"
            >
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-700">{movie.Name}</h3>
                </div>
                <div className="w-full sm:w-1/4 mb-2 sm:mb-0 text-xs text-gray-500">
                </div>
                <div className="w-full sm:w-1/4 mb-2 sm:mb-0 text-xs text-gray-500">
                </div>
                <div className="w-full sm:w-1/6 flex justify-center">
                  <button
                    onClick={() => toggleMovieDetails(movie.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-sm items-center"
                  >
                    {expandedMovieId === movie.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {expandedMovieId === movie.id && (
                <div className="w-full mt-4">
                  {movie.image && (
                    <img
                      src={movie.image}
                      alt={movie.Name}
                      className="max-w-xs mb-4"
                    />
                  )}
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    
                    <p><strong>Description:</strong></p><p>{movie.Description}</p>
                    <p><strong>Release Date:</strong></p><p>{movie.releasedate}</p>
                    <p><strong>Director:</strong></p><p>{movie.director}</p>
                    <p><strong>Main Actor:</strong></p><p>{movie.main_actor}</p>
                    <p><strong>Category:</strong></p><p>{movie.category}</p>
                    <p><strong>Ticket Price:</strong></p><p>${movie.ticketprice}</p>
                    <p><strong>Best Seller:</strong></p><p>{movie.bestseller ? 'Yes' : 'No'}</p>
                  
                  </div>
                  <Link to={`/selectseat/${movie.id}`}>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4">
                    Book Now
                  </button>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No movies found.</p>
      )}
    </div>
  );
};

export default Movie;