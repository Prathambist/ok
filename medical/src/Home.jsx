import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProduceGrid({ items, type, limit, showViewMore }) {
  const displayedItems = limit ? items.slice(0, limit) : items;
  return (
    <div>
      <h3 className="text-white text-2xl font-semibold mb-4 flex items-center">
        {type === 'fruit' ? '🍓 Fruits' : type === 'vegetable' ? '🥕 Vegetables' : '🌰 Dry Fruits'}
        <span className="ml-2 text-sm bg-green-500 px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden border-4 border-purple-500 transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-2 left-2 bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-semibold z-10 shadow">
              {item.type === 'fruit' ? 'Fruit' : item.type === 'vegetable' ? 'Vegetable' : 'Dry Fruit'}
            </div>
            <Link to={`/product/${encodeURIComponent(item.name)}`}>
              <div className="h-52 w-full overflow-hidden bg-pink-100 cursor-pointer">
                <img
                  src={`/src/assets/${item.imageKey}.jpg`}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">{item.name}</h4>
              <div className="pt-2 text-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                  NPR {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showViewMore && (
        <div className="text-center mt-4">
          <Link
            to={`/${type}s`}
            className="text-white underline hover:text-green-300 transition"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Mountain Landscape",
      description: "Beautiful mountain scenery"
    },
    {
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      title: "Nature View",
      description: "Stunning natural landscape"
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      title: "Scenic Beauty",
      description: "Breathtaking outdoor view"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        { name: 'Apple', imageKey: 'apple', type: 'fruit', price: 120 },
        { name: 'Banana', imageKey: 'banana', type: 'fruit', price: 90 },
        { name: 'Orange', imageKey: 'orange', type: 'fruit', price: 100 },
        { name: 'Strawberry', imageKey: 'strawberry', type: 'fruit', price: 150 },
        { name: 'Mango', imageKey: 'mango', type: 'fruit', price: 130 },
        { name: 'Pineapple', imageKey: 'pineapple', type: 'fruit', price: 160 },
        { name: 'Grapes', imageKey: 'grapes', type: 'fruit', price: 110 },
        { name: 'Watermelon', imageKey: 'watermelon', type: 'fruit', price: 140 },
        { name: 'Carrot', imageKey: 'carrot', type: 'vegetable', price: 60 },
        { name: 'Broccoli', imageKey: 'broccoli', type: 'vegetable', price: 80 },
        { name: 'Tomato', imageKey: 'tomato', type: 'vegetable', price: 55 },
        { name: 'Cucumber', imageKey: 'cucumber', type: 'vegetable', price: 50 },
        { name: 'Bell Pepper', imageKey: 'bellpepper', type: 'vegetable', price: 85 },
        { name: 'Spinach', imageKey: 'spinach', type: 'vegetable', price: 45 },
        { name: 'Potato', imageKey: 'potato', type: 'vegetable', price: 40 },
        { name: 'Onion', imageKey: 'onion', type: 'vegetable', price: 55 },
        { name: 'Almonds', imageKey: 'almonds', type: 'dryfruit', price: 300 },
        { name: 'Cashews', imageKey: 'cashews', type: 'dryfruit', price: 350 },
        { name: 'Raisins', imageKey: 'raisins', type: 'dryfruit', price: 200 },
        { name: 'Walnuts', imageKey: 'walnuts', type: 'dryfruit', price: 400 },
        { name: 'Pistachios', imageKey: 'pistachios', type: 'dryfruit', price: 380 },
        { name: 'Dates', imageKey: 'dates', type: 'dryfruit', price: 220 },
        { name: 'Figs', imageKey: 'figs', type: 'dryfruit', price: 260 }
      ];
      setProduce(data);
      setLoading(false);
    }, 700);
  }, []);

  const fruits = produce.filter((item) => item.type === 'fruit');
  const vegetables = produce.filter((item) => item.type === 'vegetable');
  const dryfruits = produce.filter((item) => item.type === 'dryfruit');

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* Image Slider */}
        <div className="relative w-[99.99%] h-[500px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <h3 className="text-white text-2xl font-bold mb-2">{slide.title}</h3>
                <p className="text-white/90">{slide.description}</p>
              </div>
            </div>
          ))}
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Fruits & Vegetables Display Section */}
        <div className="bg-blue-500 w-full min-h-screen flex items-center justify-center py-8">
          <div className="w-[98%] bg-purple-700 rounded p-6 overflow-auto">
            <h2 className="text-white text-3xl font-bold text-center mb-6"> Currently Trending </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-white text-xl">Loading products...</div>
              </div>
            ) : (
              <div className="space-y-8">
                <ProduceGrid items={fruits} type="fruit" limit={5} showViewMore={true} />
                <ProduceGrid items={vegetables} type="vegetable" limit={5} showViewMore={true} />
                <ProduceGrid items={dryfruits} type="dryfruit" limit={5} showViewMore={true} />
              </div>
            )}
          </div>
        </div>

        {/* Your original sections */}
        <div className="bg-yellow-500 w-full h-screen flex items-center justify-center">
          {/* Left section — hidden on small screens */}
          <div className="hidden md:flex h-screen bg-blue-600 flex-1 items-center justify-center">
            <div className="h-[90%] w-[90%] bg-fuchsia-300 border rounded"></div>
          </div>

          {/* Center section — always visible */}
          <div className="h-screen bg-red-400 flex flex-2 items-center justify-center">
            <div className="h-[95%] w-[90%] bg-fuchsia-300 border rounded"></div>
          </div>

          {/* Right section — hidden on small screens */}
          <div className="hidden md:flex h-screen bg-yellow-400 flex-1 items-center justify-center">
            <div className="h-[90%] w-[90%] bg-fuchsia-300 border rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
