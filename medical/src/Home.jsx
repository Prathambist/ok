import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ───────────────── ProduceGrid reusable component ───────────────── */
function ProduceGrid({ items, type, limit, showViewMore }) {
  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <div>
      {/* Section heading */}
      <h3 className="text-black text-2xl font-semibold mb-4 flex items-center">
        {type === "fruit"
          ? "🍓 Fruits"
          : type === "vegetable"
          ? "🥕 Vegetables"
          : type === "dryfruit"
          ? "🌰 Dry Fruits"
          : type === "dairy"
          ? "🥛 Dairy"
          : "Produce"}
        <span className="ml-2 text-sm bg-green-500 px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </h3>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedItems.map((item, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-500 transform hover:scale-105 transition-all duration-300"
          >
            {/* Type badge */}
            <div className="absolute top-2 left-2 bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-semibold z-10 shadow">
              {item.type === "fruit"
                ? "Fruit"
                : item.type === "vegetable"
                ? "Vegetable"
                : item.type === "dryfruit"
                ? "Dry Fruit"
                : item.type === "dairy"
                ? "Dairy"
                : ""}
            </div>

            {/* Image */}
            <Link to={`/product/${encodeURIComponent(item.name)}`}>
              <div className="h-52 w-full overflow-hidden bg-pink-100 cursor-pointer">
                <img
                  src={`/src/assets/${item.imageKey}.jpg`}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>

            {/* Name + price */}
            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {item.name}
              </h4>
              <div className="pt-2 text-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                  NPR {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* “View more” link */}
      {showViewMore && (
        <div className="text-center mt-4">
          <Link
            to={`/${type}s`}
            className="text-black underline hover:text-green-300 transition"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Home page component ───────────────────────── */
function Home() {
  /* State */
  const [produce, setProduce] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Carousel slides
     If you keep “carousal1.png” inside /src/assets, import it instead:
     import slide1 from "../assets/carousal1.png";
     … then use slide1 in place of "/carousal1.png". */
  const slides = [
    {
      image: "/carousal1.png",
      title: "Welcome to Our Store",
      description: "We present you a variety of fresh produce",
    },
    {
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=60",
      title: "Nature View",
      description: "Stunning natural landscape",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=60",
      title: "Scenic Beauty",
      description: "Breathtaking outdoor view",
    },
  ];

  /* ─── Auto‑advance every 6 s ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 50);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  /* Manual nav */
  const handleSlideChange = (idx) => {
    if (idx !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(idx);
        setIsTransitioning(false);
      }, 50);
    }
  };
  const goToPrevSlide = () =>
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  const goToNextSlide = () =>
    handleSlideChange((currentSlide + 1) % slides.length);

  /* ─── Fake API call (0.7 s delay) ─── */
  useEffect(() => {
    setTimeout(() => {
      setProduce([
        /* Fruits */
        { name: "Apple", imageKey: "apple", type: "fruit", price: 120 },
        { name: "Banana", imageKey: "banana", type: "fruit", price: 90 },
        { name: "Orange", imageKey: "orange", type: "fruit", price: 100 },
        { name: "Strawberry", imageKey: "strawberry", type: "fruit", price: 150 },
        { name: "Mango", imageKey: "mango", type: "fruit", price: 130 },
        { name: "Pineapple", imageKey: "pineapple", type: "fruit", price: 160 },
        { name: "Grapes", imageKey: "grapes", type: "fruit", price: 110 },
        { name: "Watermelon", imageKey: "watermelon", type: "fruit", price: 140 },
        /* Vegetables */
        { name: "Carrot", imageKey: "carrot", type: "vegetable", price: 60 },
        { name: "Broccoli", imageKey: "broccoli", type: "vegetable", price: 80 },
        { name: "Tomato", imageKey: "tomato", type: "vegetable", price: 55 },
        { name: "Cucumber", imageKey: "cucumber", type: "vegetable", price: 50 },
        { name: "Bell Pepper", imageKey: "bellpepper", type: "vegetable", price: 85 },
        { name: "Spinach", imageKey: "spinach", type: "vegetable", price: 45 },
        { name: "Potato", imageKey: "potato", type: "vegetable", price: 40 },
        { name: "Onion", imageKey: "onion", type: "vegetable", price: 55 },
        /* Dry fruits */
        { name: "Almonds", imageKey: "almonds", type: "dryfruit", price: 300 },
        { name: "Cashews", imageKey: "cashews", type: "dryfruit", price: 350 },
        { name: "Raisins", imageKey: "raisins", type: "dryfruit", price: 200 },
        { name: "Walnuts", imageKey: "walnuts", type: "dryfruit", price: 400 },
        { name: "Pistachios", imageKey: "pistachios", type: "dryfruit", price: 380 },
        { name: "Dates", imageKey: "dates", type: "dryfruit", price: 220 },
        { name: "Figs", imageKey: "figs", type: "dryfruit", price: 260 },
        /* Dairy */
        { name: "Milk", imageKey: "milk", type: "dairy", price: 90 },
        { name: "Cheese", imageKey: "cheese", type: "dairy", price: 250 },
        { name: "Yogurt", imageKey: "yogurt", type: "dairy", price: 110 },
        { name: "Butter", imageKey: "butter", type: "dairy", price: 180 },
        { name: "Paneer", imageKey: "paneer", type: "dairy", price: 220 },
      ]);
      setLoading(false);
    }, 700);
  }, []);

  /* Filtered arrays */
  const fruits = produce.filter((p) => p.type === "fruit");
  const vegetables = produce.filter((p) => p.type === "vegetable");
  const dryfruits = produce.filter((p) => p.type === "dryfruit");
  const dairy = produce.filter((p) => p.type === "dairy");

  /* ─────────────────────── JSX ─────────────────────── */
  return (
    <div className="scroll-smooth">
      <div className="flex flex-col items-center justify-center">
        {/* ────── Carousel ────── */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="relative min-w-full h-full flex-shrink-0"
              >
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* Caption */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-2/5 pl-8 pr-4 text-white">
                    <h3 className="text-4xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-lg opacity-90 leading-relaxed">
                      {slide.description}
                    </p>
                    <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200">
                      <a
                        href="#Trend"
                        className="text-white no-underline hover:text-green-200 transition"
                      >
                        Shop Now
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideChange(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* ────── Sidebar / placeholder layout (optional) ────── */}
        <div className="w-full h-screen flex items-center justify-center">
          {/* Left sidebar */}
          <div className="hidden md:flex h-screen flex-1 items-center justify-center">
            <div className="h-[90%] w-[90%] bg-gray-200 p-[50px] border rounded flex flex-col space-y-4">
              <span className="text-lg font-semibold">Categories</span>
              <a
                href="#fruits-section"
                className="text-black underline hover:text-green-300 transition"
              >
                Fruits
              </a>
              <a
                href="#vegetables-section"
                className="text-black underline hover:text-green-300 transition"
              >
                Vegetables
              </a>
              <a
                href="#dryfruits-section"
                className="text-black underline hover:text-green-300 transition"
              >
                Dry Fruits
              </a>
              <a
                href="#dairy-section"
                className="text-black underline hover:text-green-300 transition"
              >
                Dairy
              </a>
            </div>
          </div>

          {/* Center placeholder */}
          <div className="h-screen flex flex-2 items-center justify-center">
            <div className="h-[95%] w-[90%] bg-gray-200 border rounded"></div>
          </div>

          {/* Right placeholder */}
          <div className="hidden md:flex h-screen flex-1 items-center justify-center">
            <div className="h-[90%] w-[90%] bg-gray-200 border rounded"></div>
          </div>
        </div>

        {/* ────── Products (“Currently Trending”) ────── */}
        <div className="w-full min-h-screen flex items-center justify-center py-8">
          <div className="w-[98%] bg-gray-200 rounded p-6 overflow-auto">
            <h2
              id="Trend"
              className="text-black text-3xl font-bold text-center mb-6"
            >
              Currently Trending
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-black text-xl">Loading products…</div>
              </div>
            ) : (
              <div className="space-y-8">
                <div id="fruits-section">
                  <ProduceGrid
                    items={fruits}
                    type="fruit"
                    limit={5}
                    showViewMore
                  />
                </div>
                <div id="vegetables-section">
                  <ProduceGrid
                    items={vegetables}
                    type="vegetable"
                    limit={5}
                    showViewMore
                  />
                </div>
                <div id="dryfruits-section">
                  <ProduceGrid
                    items={dryfruits}
                    type="dryfruit"
                    limit={5}
                    showViewMore
                  />
                </div>
                <div id="dairy-section">
                  <ProduceGrid items={dairy} type="dairy" limit={5} showViewMore />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
