import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaBed, 
  FaDollarSign, 
  FaUsers, 
  FaBell, 
  FaClock,
  FaStar,
  FaChartLine
} from 'react-icons/fa';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [recentBookings, setRecentBookings] = useState([
    {
      id: 1,
      room: 'Deluxe Suite',
      checkIn: '2026-02-10',
      checkOut: '2026-02-15',
      status: 'Confirmed',
      amount: 1250,
    },
    {
      id: 2,
      room: 'Ocean View Room',
      checkIn: '2026-02-20',
      checkOut: '2026-02-22',
      status: 'Pending',
      amount: 450,
    },
    {
      id: 3,
      room: 'Presidential Suite',
      checkIn: '2026-01-15',
      checkOut: '2026-01-20',
      status: 'Completed',
      amount: 3500,
    },
  ]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const stats = [
    {
      title: 'Total Bookings',
      value: '12',
      icon: <FaCalendarAlt className="w-6 h-6" />,
      color: 'bg-blue-500',
      change: '+2 this month',
    },
    {
      title: 'Nights Stayed',
      value: '28',
      icon: <FaBed className="w-6 h-6" />,
      color: 'bg-green-500',
      change: '+5 this year',
    },
    {
      title: 'Total Spent',
      value: '$4,850',
      icon: <FaDollarSign className="w-6 h-6" />,
      color: 'bg-yellow-500',
      change: '+12% vs last year',
    },
    {
      title: 'Rewards Points',
      value: '2,425',
      icon: <FaStar className="w-6 h-6" />,
      color: 'bg-purple-500',
      change: 'Gold Member',
    },
  ];

  const quickActions = [
    { 
      name: 'Book a Room', 
      icon: <FaBed className="w-6 h-6" />, 
      link: '/booking',
      color: 'bg-orange-500 hover:bg-orange-600' 
    },
    { 
      name: 'View Bookings', 
      icon: <FaCalendarAlt className="w-6 h-6" />, 
      link: '/booking-history',
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      name: 'Explore Rooms', 
      icon: <FaChartLine className="w-6 h-6" />, 
      link: '/rooms',
      color: 'bg-green-500 hover:bg-green-600' 
    },
    { 
      name: 'Amenities', 
      icon: <FaStar className="w-6 h-6" />, 
      link: '/amenities',
      color: 'bg-purple-500 hover:bg-purple-600' 
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                Welcome back, {currentUser?.firstName || 'Guest'}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your hotel bookings
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors relative">
                <FaBell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-4 md:p-6 rounded-xl text-center transition-colors duration-300 shadow-md hover:shadow-lg`}
                >
                  <div className="flex justify-center mb-3">
                    {action.icon}
                  </div>
                  <span className="font-medium text-sm md:text-base">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
              <Link 
                to="/booking-history"
                className="mt-2 md:mt-0 text-orange-500 hover:text-orange-600 font-medium text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Room</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Check-in</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Check-out</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-800">{booking.room}</span>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaClock className="w-4 h-4" />
                          {booking.checkIn}
                        </div>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaClock className="w-4 h-4" />
                          {booking.checkOut}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-800">${booking.amount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Upcoming Stay */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Stay</h2>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaBed className="w-8 h-8 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Deluxe Suite</h3>
                  <p className="text-gray-600 text-sm mt-1">Feb 10 - Feb 15, 2026</p>
                  <p className="text-gray-600 text-sm">5 nights • 2 guests</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  to="/booking-history"
                  className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                >
                  View Booking Details →
                </Link>
              </div>
            </div>

            {/* Member Benefits */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Member Benefits</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaStar className="w-4 h-4" />
                  </div>
                  <span>10% off on all room bookings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaClock className="w-4 h-4" />
                  </div>
                  <span>Early check-in availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUsers className="w-4 h-4" />
                  </div>
                  <span>Complimentary room upgrade</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <Link 
                  to="/amenities"
                  className="text-white hover:text-gray-100 font-medium text-sm underline"
                >
                  Explore All Benefits →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
