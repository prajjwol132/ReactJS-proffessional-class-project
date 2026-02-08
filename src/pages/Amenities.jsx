import React from 'react';

function Amenities() {
  // Random amenity images from Unsplash
  const amenities = [
    {
      name: 'Swimming Pool',
      description: 'Enjoy our infinity pool with stunning panoramic views. Open 24/7 for your convenience.',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop',
    },
    {
      name: 'Spa & Wellness',
      description: 'Relax and rejuvenate with our world-class spa treatments and wellness programs.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
    },
    {
      name: 'Fitness Center',
      description: 'State-of-the-art gym equipment with personal trainers available on request.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    },
    {
      name: 'Fine Dining',
      description: 'Multiple restaurants offering international cuisine prepared by award-winning chefs.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    },
    {
      name: 'Business Center',
      description: 'Fully equipped business facilities with meeting rooms and conference halls.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    },
    {
      name: 'Kids Club',
      description: 'Safe and fun environment for children with supervised activities and games.',
      image: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&h=400&fit=crop',
    },
  ];

  const additionalServices = [
    { icon: '🚗', name: 'Valet Parking', desc: 'Complimentary valet service' },
    { icon: '✈️', name: 'Airport Transfer', desc: 'Luxury car pickup & drop' },
    { icon: '🧹', name: 'Housekeeping', desc: 'Daily room cleaning' },
    { icon: '🍽️', name: 'Room Service', desc: '24/7 in-room dining' },
    { icon: '👔', name: 'Laundry', desc: 'Same-day dry cleaning' },
    { icon: '🎫', name: 'Concierge', desc: 'Tour & ticket booking' },
    { icon: '💆', name: 'In-Room Spa', desc: 'Private spa treatments' },
    { icon: '🏌️', name: 'Golf Access', desc: 'Nearby golf course' },
  ];

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&h=600&fit=crop" 
          alt="Amenities Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Amenities</h1>
            <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto">
              World-class facilities designed for your comfort and enjoyment
            </p>
          </div>
        </div>
      </section>

      {/* Main Amenities Grid */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Premium Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={amenity.image} 
                    alt={amenity.name} 
                    className="w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{amenity.name}</h3>
                  <p className="text-sm md:text-base text-gray-600">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Additional Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-gray-50 p-4 md:p-6 rounded-xl text-center hover:bg-orange-50 hover:shadow-md transition-all duration-300">
                <span className="text-3xl md:text-4xl mb-3 block">{service.icon}</span>
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-1">{service.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
            ].map((img, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-square md:aspect-video">
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Amenities;
