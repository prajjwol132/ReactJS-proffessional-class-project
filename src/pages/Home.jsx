import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Component/Carousel';

function Home() {
  const featuredImages = [
    {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80&fm=webp',
      name: 'Deluxe Suite',
      description: 'Luxurious accommodation with stunning views and premium amenities.'
    },
    {
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop&q=80&fm=webp',
      name: 'Ocean View Room',
      description: 'Wake up to breathtaking ocean views every morning.'
    },
    {
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&q=80&fm=webp',
      name: 'Presidential Suite',
      description: 'The ultimate luxury experience with exclusive amenities.'
    },
  ];

  const whyChooseUs = [
    { 
      title: 'Prime Location', 
      desc: 'Located in the heart of the city with easy access to attractions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      title: '24/7 Service', 
      desc: 'Round-the-clock concierge and room service for your convenience',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: 'Luxury Amenities', 
      desc: 'World-class spa, pool, and fitness center at your disposal',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      title: 'Fine Dining', 
      desc: 'Award-winning restaurants serving international cuisine',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
  ];

  return (
    <div className="pt-24 md:pt-28">
      <Carousel className="flex justify-center" />

      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Welcome to Hotel TopView
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            Experience luxury and comfort at its finest. Our hotel offers breathtaking views, 
            world-class amenities, and exceptional service to make your stay unforgettable.
          </p>
          <Link 
            to="/booking"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-base md:text-lg"
          >
            Book Your Stay
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Featured Rooms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredImages.map((room, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-48 md:h-56 lg:h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4">
                    {room.description}
                  </p>
                  <Link 
                    to="/rooms"
                    className="w-full inline-block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-full transition-colors duration-300 text-sm md:text-base"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
