import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, [location]);

  return (
    <>
      <div className="flex items-center justify-between border border-[#000000] border-solid w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] rounded-3xl md:rounded-4xl fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-20 bg-[#ffffff] h-16 md:h-20 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg md:text-xl">Hotel TopView</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-sm lg:text-lg transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dashboard Link */}
          {currentUser && (
            <Link
              to="/dashboard"
              className={`text-sm lg:text-lg transition-colors duration-300 ${
                isActive('/dashboard')
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              Dashboard
            </Link>
          )}
          
          {/* My Bookings Link */}
          {currentUser && (
            <Link
              to="/booking-history"
              className={`text-sm lg:text-lg transition-colors duration-300 ${
                isActive('/booking-history')
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              My Bookings
            </Link>
          )}
          
          {/* Login/Profile Button */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                  </span>
                </div>
                <span className="text-sm lg:text-lg text-gray-700">{currentUser.firstName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full transition-colors duration-300 text-sm lg:text-base"
              >
                <FaSignOutAlt />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 lg:px-6 rounded-full transition-colors duration-300 text-sm lg:text-base"
            >
              <FaUser />
              <span>Login</span>
            </Link>
          )}
          
          {/* Desktop Book Now Button */}
          <Link
            to="/booking"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 lg:px-6 rounded-full transition-colors duration-300 text-sm lg:text-base"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-orange-500 transition-colors duration-300 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 left-2 right-2 bg-white rounded-2xl shadow-xl z-10 md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={toggleMenu}
              className={`py-3 px-4 text-lg rounded-lg transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-orange-500 font-semibold bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Login/Profile Section */}
          {currentUser ? (
            <>
              <Link
                to="/booking-history"
                onClick={toggleMenu}
                className={`py-3 px-4 text-lg rounded-lg transition-colors duration-300 ${
                  isActive('/booking-history')
                    ? 'text-orange-500 font-semibold bg-orange-50'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-gray-50'
                }`}
              >
                My Bookings
              </Link>
              <div className="flex items-center gap-3 py-3 px-4 border-t border-gray-100 mt-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{currentUser.firstName} {currentUser.lastName}</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="mt-4 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
            >
              <FaUser />
              Login
            </Link>
          )}
          
          {/* Mobile Book Now Button */}
          <Link
            to="/booking"
            onClick={toggleMenu}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-center"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

