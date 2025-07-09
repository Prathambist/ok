import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'

// Search Component
function Search() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [produce, setProduce] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
    }
  }, [searchParams])

  useEffect(() => {
    const produceData = [
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
      { name: 'Figs', imageKey: 'figs', type: 'dryfruit', price: 260 },
      { name: 'Milk', imageKey: 'milk', type: 'dairy', price: 90 },
      { name: 'Cheese', imageKey: 'cheese', type: 'dairy', price: 250 },
      { name: 'Yogurt', imageKey: 'yogurt', type: 'dairy', price: 110 },
      { name: 'Butter', imageKey: 'butter', type: 'dairy', price: 180 },
      { name: 'Paneer', imageKey: 'paneer', type: 'dairy', price: 220 },
    ]
    setTimeout(() => {
      setProduce(produceData)
      setLoading(false)
    }, 700)
  }, [])

  const filteredProduce = produce.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const fruits = filteredProduce.filter(item => item.type === 'fruit')
  const vegetables = filteredProduce.filter(item => item.type === 'vegetable')
  const dairy = filteredProduce.filter(item => item.type === 'dairy')
  const dryfruit = filteredProduce.filter(item => item.type === 'dryfruit')

  const clearSearch = () => {
    navigate('/')
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-gray-100 py-4 px-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-gray-600 mt-1">
                  Found {filteredProduce.length} items ({fruits.length} fruits, {vegetables.length} vegetables, {dairy.length} dairy, {dryfruit.length} dryfruits)
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-500 w-full min-h-screen flex items-center justify-center py-8">
          <div className="w-[98%] bg-purple-700 rounded p-6 overflow-auto">
            <h2 className="text-white text-3xl font-bold text-center mb-6">
              🔍 Search Results
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-white text-xl">🔄 Searching...</div>
              </div>
            ) : (
              <div className="space-y-8">

                {filteredProduce.length === 0 && (
                  <div className="text-center text-white py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold mb-2">No results found for "{searchTerm}"</h3>
                    <p className="text-lg mb-4">Try searching for a different product</p>
                    <button
                      onClick={clearSearch}
                      className="bg-white text-purple-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Back to Home
                    </button>
                  </div>
                )}

                {/* Fruits */}
                {fruits.length > 0 && (
                  <ProductGridSection items={fruits} title="🍓 Fruits" />
                )}

                {/* Vegetables */}
                {vegetables.length > 0 && (
                  <ProductGridSection items={vegetables} title="🥕 Vegetables" />
                )}

                {/* Dairy */}
                {dairy.length > 0 && (
                  <ProductGridSection items={dairy} title="🥛 Dairy" />
                )}

                {/* Dry Fruits */}
                {dryfruit.length > 0 && (
                  <ProductGridSection items={dryfruit} title="🌰 Dry Fruits" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Extracted component for all section rendering
function ProductGridSection({ items, title }) {
  return (
    <div>
      <h3 className="text-white text-2xl font-semibold mb-4 flex items-center">
        {title}
        <span className="ml-2 text-sm bg-green-500 px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <Link to={`/product/${encodeURIComponent(item.name)}`}>
              <div className="h-52 w-full overflow-hidden bg-pink-100 flex items-center justify-center cursor-pointer">
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
    </div>
  )
}

export default Search
