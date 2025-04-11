import React from 'react';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const { state } = useLocation();

  if (!state || !state.movie || !state.selectedSeats || !state.seatTypes) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Cart Empty</h2>
          <p>Currently not connecting to assets.js or selectseat.jsx for booking data</p>
        </div>
      </div>
    );
  }

  const { movie, selectedSeats, subtotal, seatTypes } = state;
  const onlineFee = 4.99;
  const tax = 3.99;
  const total = subtotal + onlineFee + tax;

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Your Booking Summary</h2>

        {/* Movie Details */}
        <div className="flex flex-col md:flex-row mb-8">
          <div className="md:w-1/3">
            {movie?.image && movie.image[0] && (
              <img
                src={movie.image[0]}
                alt={movie.Name}
                className="w-full h-auto rounded-lg mb-4 md:mb-0"
              />
            )}
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h3 className="text-2xl font-semibold mb-2">{movie?.Name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{movie?.Description}</p>
            <p className="mb-1">
              <strong>Director:</strong> {movie?.director}
            </p>
            <p>
              <strong>Actors:</strong> {movie?.main_actor?.join(', ')}
            </p>
          </div>
        </div>

        {/* Selected Seats */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-3">Selected Seats</h4>
          <ul className="list-disc list-inside">
            {selectedSeats.map((seat) => (
              <li key={seat}>
                {seat} ({seatTypes[seat]})
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-3">Pricing</h4>
          <div className="space-y-2">
            <p>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </p>
            <p>
              <strong>Online Fee:</strong> ${onlineFee.toFixed(2)}
            </p>
            <p>
              <strong>Tax:</strong> ${tax.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <p className="text-2xl font-bold">
            <strong>Total:</strong> ${total.toFixed(2)}
          </p>
        </div>

        {/* Proceed to Payment Button */}
        <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;