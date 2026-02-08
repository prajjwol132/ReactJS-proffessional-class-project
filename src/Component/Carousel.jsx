import Slider from "react-slick";
import { Link } from 'react-router-dom';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80&fm=webp",
      title: "Welcome to Hotel TopView",
      subtitle: "Experience Luxury Like Never Before",
    },
    {
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&h=1080&fit=crop&q=80&fm=webp",
      title: "Stunning Ocean Views",
      subtitle: "Wake Up to Paradise Every Day",
    },
    {
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&q=80&fm=webp",
      title: "World-Class Amenities",
      subtitle: "Everything You Need for a Perfect Stay",
    },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative">
              <img 
                src={slide.image} 
                alt={`Hotel Banner ${index + 1}`} 
                className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover" 
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-4 md:mb-6 drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <Link 
                  to="/booking"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full text-base md:text-lg lg:text-xl transition-colors duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
