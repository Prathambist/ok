import React from 'react';
import { Link } from 'react-router-dom';

// Dynamically import all images from src/assets
const images = import.meta.glob('/src/assets/*.jpg', { eager: true });

function ProduceGrid({ items, type, limit, showViewMore }) {
  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <div>
      <h3 className="text-white text-2xl font-semibold mb-4 flex items-center">
        {type === 'fruit'
          ? '🍓 Fruits'
          : type === 'vegetable'
          ? '🥕 Vegetables'
          : type === 'dryfruit'
          ? '🌰 Dry Fruits'
          : type === 'dairy'
          ? '🥛 Dairy'
          : 'Items'}
        <span className="ml-2 text-sm bg-green-500 px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedItems.map((item, index) => {
          const imgPath = `/src/assets/${item.imageKey}.jpg`;
          const imageUrl = images[imgPath]?.default;

          return (
            <Link
              to={`/product/${item.name}`}
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden border-4 border-purple-500 transform hover:scale-105 transition-all duration-300"
            >
              {/* Optional badge for type */}
              <div className="absolute top-2 left-2 bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-semibold z-10 shadow">
                {item.type === 'fruit'
                  ? 'Fruit'
                  : item.type === 'vegetable'
                  ? 'Vegetable'
                  : item.type === 'dryfruit'
                  ? 'Dry Fruit'
                  : item.type === 'dairy'
                  ? 'Dairy'
                  : ''}
              </div>

              <div className="h-52 w-full overflow-hidden bg-pink-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">{item.name}</h4>
                <div className="pt-2 text-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                    NPR {item.price}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {showViewMore && (
        <div className="text-center mt-4">
          <Link
            to={`/${type === 'dryfruit' ? 'dryfruits' : type === 'dairy' ? 'dairy' : `${type}s`}`}
            className="text-white underline hover:text-green-300 transition"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProduceGrid;
