import React, { useContext, useState } from 'react';
import { assets,icons } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/Shopcontext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const { setShowSearch, getCartCount, token, setToken, setCartItems, products } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    const handleSearchIconClick = () => {
        setShowSearchInput(!showSearchInput);
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            const productsCopy = [...products];
            const filteredResults = productsCopy.filter(item =>
                item.name && item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSelect = (movieId) => {
        setSearchTerm('');
        setSearchResults([]);
        setShowSearchInput(false);
        navigate(`/selectseat/${movieId}`);
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/movie' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-6'>
                <div className="relative">
                    <img onClick={handleSearchIconClick} src={icons.search_icon} className='w-5 cursor-pointer' alt="Search Icon" />
                    {showSearchInput && (
                        <div className="absolute top-full left-0 bg-white shadow-md rounded mt-1 z-10">
                            <input
                                type="text"
                                placeholder="Search Movies..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                className="py-2 px-3 border-b w-64 rounded-t focus:outline-none"
                            />
                            {searchResults.length > 0 && (
                                <ul className="max-h-48 overflow-y-auto">
                                    {searchResults.map(movie => (
                                        <li
                                            key={movie._id}
                                            onClick={() => handleSearchSelect(movie.id)}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {movie.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-5 cursor-pointer' src={icons.profile_icon} alt="Profile Icon" />
                    {token &&
                        <div className='bg-slate-100 group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}
                </div>
                <Link to='/cart' className='relative'>
                    <img src={icons.cart_icon} className='w-5 min-w-5' alt="Cart Icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={icons.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon" />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={icons.dropdown_icon} alt="Dropdown Icon" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    );
};

export default Navbar;