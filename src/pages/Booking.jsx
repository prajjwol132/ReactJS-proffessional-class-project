import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Booking() {
  const [searchParams] = useSearchParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      price: 150,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['Queen Bed', 'City View', 'Free WiFi', 'Mini Bar'],
      maxGuests: 2
    },
    {
      id: 2,
      name: 'Deluxe Room',
      price: 250,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['King Bed', 'Ocean View', 'Free WiFi', 'Balcony'],
      maxGuests: 2
    },
    {
      id: 3,
      name: 'Executive Suite',
      price: 400,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'],
      maxGuests: 3
    },
    {
      id: 4,
      name: 'Family Room',
      price: 300,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['2 Queen Beds', 'Garden View', 'Kids Area', 'Free Breakfast'],
      maxGuests: 4
    },
    {
      id: 5,
      name: 'Presidential Suite',
      price: 800,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['Master Bedroom', 'Private Pool', 'Personal Chef', '24/7 Butler'],
      maxGuests: 4
    },
    {
      id: 6,
      name: 'Honeymoon Suite',
      price: 500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['King Bed', 'Romantic Setup', 'Spa Access', 'Champagne'],
      maxGuests: 2
    },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    
    // Pre-fill user data if logged in
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
      setValue('phone', user.phone);
    }

    // Check for room parameter
    const roomId = searchParams.get('room');
    if (roomId) {
      const room = rooms.find(r => r.id === parseInt(roomId));
      if (room) {
        setSelectedRoom(room);
        setValue('roomType', room.id.toString());
      }
    }
  }, [searchParams, setValue]);

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');
  const roomType = watch('roomType');

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const room = rooms.find(r => r.id === parseInt(roomType));
    if (room && nights > 0) {
      return room.price * nights;
    }
    return 0;
  };

  const onSubmit = (data) => {
    if (!currentUser) {
      alert('Please login to make a booking.');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const room = rooms.find(r => r.id === parseInt(data.roomType));
      const booking = {
        id: Date.now(),
        oderId: 'ORD-' + Date.now().toString().slice(-8),
        userId: currentUser.id,
        userEmail: currentUser.email,
        userName: `${data.firstName} ${data.lastName}`,
        room: room,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
        specialRequests: data.specialRequests,
        nights: calculateNights(),
        totalPrice: calculateTotal(),
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('hotelBookings', JSON.stringify(bookings));

      setIsLoading(false);
      alert(`Booking confirmed! Your order ID is ${booking.oderId}. Total: $${booking.totalPrice}`);
      navigate('/booking-history');
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=400&fit=crop&q=80&fm=webp" 
          alt="Booking Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">Book Your Stay</h1>
            <p className="text-base md:text-lg text-white">Reserve your perfect room today</p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Reservation Details</h2>
                
                {!currentUser && (
                  <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-700">
                      <span className="font-semibold">Note:</span> Please{' '}
                      <a href="/login" className="text-orange-500 underline hover:text-orange-600">login</a>{' '}
                      to make a booking and view your booking history.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.lastName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          {...register('phone', { required: 'Phone number is required' })}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                          placeholder="+977 9800000000"
                        />
                        {errors.phone && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Check-in Date</label>
                        <input
                          type="date"
                          {...register('checkIn', { required: 'Check-in date is required' })}
                          min={today}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                        />
                        {errors.checkIn && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.checkIn.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Check-out Date</label>
                        <input
                          type="date"
                          {...register('checkOut', { 
                            required: 'Check-out date is required',
                            validate: value => !checkIn || new Date(value) > new Date(checkIn) || 'Check-out must be after check-in'
                          })}
                          min={checkIn || today}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                        />
                        {errors.checkOut && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.checkOut.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Room Type</label>
                        <select
                          {...register('roomType', { required: 'Please select a room type' })}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                        >
                          <option value="">Select a room</option>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                              {room.name} - ${room.price}/night
                            </option>
                          ))}
                        </select>
                        {errors.roomType && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.roomType.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Number of Guests</label>
                        <select
                          {...register('guests', { required: 'Please select number of guests' })}
                          className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                        >
                          <option value="">Select guests</option>
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                        {errors.guests && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.guests.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                    <textarea
                      {...register('specialRequests')}
                      rows="3"
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm md:text-base resize-none"
                      placeholder="Any special requests or requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 md:py-4 px-6 rounded-full transition-colors duration-300 text-sm md:text-base flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Booking...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-28">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>
                
                {roomType && rooms.find(r => r.id === parseInt(roomType)) ? (
                  <>
                    <div className="mb-4">
                      <img 
                        src={rooms.find(r => r.id === parseInt(roomType)).image} 
                        alt={rooms.find(r => r.id === parseInt(roomType)).name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {rooms.find(r => r.id === parseInt(roomType)).name}
                    </h4>
                    <ul className="space-y-1 mb-4">
                      {rooms.find(r => r.id === parseInt(roomType)).features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="mb-4 p-8 bg-gray-100 rounded-lg text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-500 text-sm">Select a room to see details</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{checkIn || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{checkOut || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-medium">{calculateNights() || '-'}</span>
                  </div>
                  {roomType && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate per night:</span>
                      <span className="font-medium">${rooms.find(r => r.id === parseInt(roomType))?.price || 0}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-orange-500">${calculateTotal()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Taxes and fees included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;
