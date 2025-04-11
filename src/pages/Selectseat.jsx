import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../assets/assets';
//import Cart from './cart';

const SelectSeat = () => {
  const { id } = useParams();
  const movie = products.find((m) => m.id.toString() === id);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatTypes, setSeatTypes] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null); // Keep track of which dropdown is open
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = Array.from({ length: 10 }, (_, i) => i + 1);
  const seatPriceAdult = 20;
  const seatPriceChild = 12;
  const dropdownRef = useRef(null);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );

    setSeatTypes((prev) => {
      const newSeatTypes = { ...prev };
      if (selectedSeats.includes(seat)) {
        delete newSeatTypes[seat];
        setOpenDropdown(null)
      } else {
        newSeatTypes[seat] = 'adult';
        setOpenDropdown(seat);
      }
      return newSeatTypes;
    });
  };

  const handleSeatTypeChange = (seat, type) => {
    setSeatTypes((prev) => ({ ...prev, [seat]: type }));
  };

  const calculateSubtotal = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + (seatTypes[seat] === 'child' ? seatPriceChild : seatPriceAdult);
    }, 0);
  };

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    if (movie) {
      const bookingData = {
        movie: movie,
        selectedSeats: selectedSeats,
        subtotal: calculateSubtotal(),
        seatTypes: seatTypes,
      };
      console.log("Movie Object:", movie);
      console.log("Selected Seats:", selectedSeats);
      console.log("Subtotal:", calculateSubtotal());
      console.log("Seat Types:", seatTypes);
      navigate('/cart', {
        state: bookingData,
      });
    } else {
      console.error('Movie data not found for ID:', id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-8 dark:bg-gray-900 min-h-screen text-black dark:text-white rounded-xl">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>
        <div className="grid grid-cols-10 gap-3">
          {rows.map((row) =>
            cols.map((col) => {
              const seat = `${row}${col}`;
              const isSelected = selectedSeats.includes(seat);
              return (
                <div key={seat} className="relative">
                  <button
                    onClick={() => handleSeatClick(seat)}
                    className={`w-10 h-10 rounded ${
                      isSelected
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {seat}
                  </button>
                  {isSelected && openDropdown === seat && (
                    <div ref={dropdownRef} className="absolute top-12 left-0 w-24 bg-white dark:bg-gray-800 rounded shadow-md p-2 z-10">
                      <select
                        value={seatTypes[seat] || 'adult'}
                        onChange={(e) => handleSeatTypeChange(seat, e.target.value)}
                        className="w-full text-sm dark:bg-gray-700 dark:text-white"
                      >
                        <option value="adult">Adult</option>
                        <option value="child">Child</option>
                      </select>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="flex items-center justify-between"></div>
      </div>

      <div className="w-full lg:w-1/3 p-4 rounded bg-gray-100 dark:bg-gray-800 shadow-lg">
        {movie?.image && movie.image[0] && (
          <img src={movie.image[0]} alt={movie.Name} className="w-full h-48 object-cover rounded mb-4" />
        )}
        <h3 className="text-xl font-bold mb-2">{movie?.Name}</h3>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">{movie?.Description}</p>
        <p className="mb-2">
          Director: <span className="font-semibold">{movie?.director}</span>
        </p>
        <p className="mb-2">
          Actors: <span className="font-semibold">{Array.isArray(movie?.main_actor) ? movie?.main_actor.join(', ') : movie?.main_actor}</span>
        </p>
        <p className="mb-4">
          Adult Price: <strong className="text-red-500">${seatPriceAdult}</strong> per seat
        </p>
        <p className="mb-4">
          Child Price: <strong className="text-blue-500">${seatPriceChild}</strong> per seat
        </p>
        <p className="mb-2">
          Selected Seats: {selectedSeats.map(seat => `${seat} (${seatTypes[seat]})`).join(', ') || 'None'}
        </p>
        <p className="mb-2 text-lg font-semibold">
          Subtotal: ${calculateSubtotal().toFixed(2)}
        </p>
        {/*{`/cart/${movie?.id}`*/}
        <Link to='/cart'>
          <button
            disabled={selectedSeats.length === 0}
            onClick={handleConfirmBooking}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Confirm Booking
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectSeat;