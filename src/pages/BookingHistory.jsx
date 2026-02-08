import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BookingHistory() {
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    // Get user's bookings
    const allBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    const userBookings = allBookings.filter(b => b.userId === user.id);
    setBookings(userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const allBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
      const updatedBookings = allBookings.map(b => {
        if (b.id === bookingId) {
          return { ...b, status: 'Cancelled' };
        }
        return b;
      });
      localStorage.setItem('hotelBookings', JSON.stringify(updatedBookings));
      
      // Update local state
      setBookings(prev => prev.map(b => {
        if (b.id === bookingId) {
          return { ...b, status: 'Cancelled' };
        }
        return b;
      }));
      
      alert('Booking cancelled successfully.');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=400&fit=crop&q=80&fm=webp" 
          alt="Booking History Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">Booking History</h1>
            <p className="text-base md:text-lg text-white">View and manage your reservations</p>
          </div>
        </div>
      </section>

      {/* User Info */}
      <section className="py-6 px-4 md:px-8 lg:px-16 bg-white border-b">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
          </div>
          <Link
            to="/booking"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 text-sm"
          >
            New Booking
          </Link>
        </div>
      </section>

      {/* Bookings Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'all' && ` (${bookings.length})`}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? "You haven't made any bookings yet." 
                  : `No ${filter} bookings found.`}
              </p>
              <Link
                to="/booking"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Make Your First Booking
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Room Image */}
                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                      <img 
                        src={booking.room?.image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=350&fit=crop&q=80&fm=webp'} 
                        alt={booking.room?.name || 'Room'} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{booking.room?.name || 'Room'}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Order ID: {booking.oderId}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-500">${booking.totalPrice}</p>
                          <p className="text-sm text-gray-500">{booking.nights} night{booking.nights > 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Check-in</p>
                          <p className="text-sm font-medium text-gray-800">{formatDate(booking.checkIn)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Check-out</p>
                          <p className="text-sm font-medium text-gray-800">{formatDate(booking.checkOut)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Guests</p>
                          <p className="text-sm font-medium text-gray-800">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Booked On</p>
                          <p className="text-sm font-medium text-gray-800">{formatDate(booking.createdAt)}</p>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 uppercase mb-1">Special Requests</p>
                          <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                        </div>
                      )}

                      {/* Room Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {booking.room?.features?.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {booking.status === 'Confirmed' && (
                          <>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-full text-sm font-medium transition-colors duration-300"
                            >
                              Cancel Booking
                            </button>
                            <button className="px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full text-sm font-medium transition-colors duration-300">
                              Modify Booking
                            </button>
                          </>
                        )}
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors duration-300">
                          View Details
                        </button>
                        {booking.status === 'Completed' && (
                          <button className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-full text-sm font-medium transition-colors duration-300">
                            Book Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-8">
            Our customer support team is available 24/7 to assist you with your bookings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors duration-300"
            >
              Contact Support
            </Link>
            <a
              href="tel:+9779745614586"
              className="px-6 py-3 border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold rounded-full transition-colors duration-300"
            >
              Call: +977 9745614586
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingHistory;
