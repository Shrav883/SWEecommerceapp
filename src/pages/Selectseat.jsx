import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useRef } from 'react';

const SelectSeat = () => {
    const { productId } = useParams(); // Get movie ID from URL
    const { addToCart, adultPrice, childPrice, currency, products } = useContext(ShopContext); // Get products from context
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatTypes, setSeatTypes] = useState({});
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const [movie, setMovie] = useState(null); // To store movie details
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Fetch movie details from context
    useEffect(() => {
        setLoading(true);
        const foundMovie = products.find(item => item._Id === productId); // Assuming 'id' is the unique identifier
        if (foundMovie) {
            setMovie(foundMovie);
            setLoading(false);
        } else {
            toast.error("Movie not found.");
            navigate('/movie'); // Redirect to collection page
            setLoading(false);
        }
    }, [productId, products, navigate]);

    // Dummy seat data (replace with actual data if needed)
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const seatsPerRow = 10;

    const handleSeatSelect = (row, seatNumber) => {
        const seatId = `${row}${seatNumber}`;
        if (selectedSeats.includes(seatId)) {
            // Remove seat
            setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
            setSeatTypes({ ...seatTypes, [seatId]: undefined }); // remove seat type
        } else {
            // Add seat
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleSeatTypeChange = (seatId, type) => {
        setSeatTypes({ ...seatTypes, [seatId]: type });
    };

    const handleConfirmBooking = () => {
        if (selectedSeats.length === 0) {
            toast.error("Please select seats before confirming.");
            return;
        }

        // Group selected seats by ticket type and add them to cart
        const ticketCounts = {};
        selectedSeats.forEach(seatId => {
            const ticketType = seatTypes[seatId] || 'adult';
            ticketCounts[ticketType] = (ticketCounts[ticketType] || 0) + 1;
        });

        for (const ticketType in ticketCounts) {
            const quantity = ticketCounts[ticketType];
            addToCart(productId, ticketType, quantity);
        }

        navigate('/cart');
    };

    const calculateSubtotal = () => {
        let subtotal = 0;
        selectedSeats.forEach(seatId => {
            const ticketType = seatTypes[seatId] || 'adult';
            subtotal += ticketType === 'adult' ? adultPrice : childPrice;
        });
        return subtotal;
    };

    useEffect(() => {
        const handleMouseLeave = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                event.target.className !== 'seat-button'
            ) {
                setHoveredSeat(null);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };

    },[dropdownRef])

    if (loading) {
        return <div className="text-center">Loading...</div>; // Simple loader
    }

    if (!movie) {
        return <div className="text-center">Movie not found.</div>;
    }

    const subtotal = calculateSubtotal();
    const onlineFee = 4.99;
    const tax = 3.99;
    const total = subtotal + onlineFee + tax;

    return (
        <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Select Seats for {movie.name}</h2>

                {/* Seat Selection Area */}
                <div className="mb-8">
                    <div className="grid grid-cols-10 gap-2">
                        {rows.map((row) =>
                            Array.from({ length: seatsPerRow }).map((_, index) => {
                                const seatNumber = index + 1;
                                const seatId = `${row}${seatNumber}`;
                                const isSelected = selectedSeats.includes(seatId);
                                const isHovered = hoveredSeat === seatId;
                                const ticketType = seatTypes[seatId];
                                return (
                                    <div
                                        key={seatId}
                                        className='relative'
                                        onMouseEnter={() => {
                                            if (selectedSeats.includes(seatId)) {
                                                setHoveredSeat(seatId);
                                            }
                                        }}
                                        onMouseLeave={()=>setHoveredSeat(null)}
                                    >
                                        <div
                                            className={`seat-button flex items-center justify-center w-10 h-10 rounded-md cursor-pointer
                                            ${isSelected ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600'}
                                        `}
                                            onClick={() => handleSeatSelect(row, seatNumber)}>
                                        {seatNumber}
                                        </div>
                                        {isSelected && isHovered && (
                                            <div ref={dropdownRef} style={{transform:'translateY(2px)'}} className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white dark:bg-gray-900 border rounded-md shadow-md p-1 z-10">
                                                <select
                                                    value={ticketType}
                                                    onChange={(e) => handleSeatTypeChange(seatId, e.target.value)}
                                                    className="text-xs text-black dark:text-white bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
                    {/* Seat Map Key */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded-md"></div>
                            <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            <span>Available</span>
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3">Booking Summary</h4>
                    <ul className="list-disc list-inside">
                        {selectedSeats.map((seat) => (
                            <li key={seat}>
                                {seat} ({seatTypes[seat] || 'Adult'}) - {currency}
                                {seatTypes[seat] === 'child' ? childPrice.toFixed(2) : adultPrice.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <p>Subtotal: {currency}{subtotal.toFixed(2)}</p>
                        <p>Online Fee: {currency}{onlineFee.toFixed(2)}</p>
                        <p>Tax: {currency}{tax.toFixed(2)}</p>
                        <p className="text-lg font-bold">Total: {currency}{total.toFixed(2)}</p>
                    </div>
                </div>

                {/* Confirm Booking Button */}
                <button
                    onClick={handleConfirmBooking}
                    className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Go To Cart
                </button>
            </div>
        </div>
    );
};

export default SelectSeat;