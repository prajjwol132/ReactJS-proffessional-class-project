import React from 'react';
import { Link } from 'react-router-dom';

function Rooms() {
  const rooms = [
    {
      name: 'Standard Room',
      price: '$150',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['Queen Bed', 'City View', 'Free WiFi', 'Mini Bar'],
    },
    {
      name: 'Deluxe Room',
      price: '$250',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['King Bed', 'Ocean View', 'Free WiFi', 'Balcony'],
    },
    {
      name: 'Executive Suite',
      price: '$400',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'],
    },
    {
      name: 'Family Room',
      price: '$300',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['2 Queen Beds', 'Garden View', 'Kids Area', 'Free Breakfast'],
    },
    {
      name: 'Presidential Suite',
      price: '$800',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['Master Bedroom', 'Private Pool', 'Personal Chef', '24/7 Butler'],
    },
    {
      name: 'Honeymoon Suite',
      price: '$500',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=350&fit=crop&q=80&fm=webp',
      features: ['King Bed', 'Romantic Setup', 'Spa Access', 'Champagne'],
    },
  ];

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&h=600&fit=crop&q=80&fm=webp" 
          alt="Rooms Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Rooms</h1>
            <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto">
              Discover our luxurious accommodations designed for your comfort
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rooms.map((room, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-48 md:h-56 lg:h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold text-sm md:text-base">
                    {room.price}/night
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{room.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm md:text-base text-gray-600">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={`/booking?room=${room.id}`}
                    className="w-full inline-block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full transition-colors duration-300 text-sm md:text-base"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-orange-500">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            Special Weekend Offer
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto">
            Book any room for the weekend and get 20% off! Use code: WEEKEND20
          </p>
          <button className="bg-white text-orange-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-base md:text-lg">
            Book Your Weekend Stay
          </button>
        </div>
      </section>
    </div>
  );
}

export default Rooms;
