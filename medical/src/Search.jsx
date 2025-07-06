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
    // Get search term from URL parameters
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
    }
  }, [searchParams])

  useEffect(() => {
    // Use the same produce data structure as in Home.jsx
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
      { name: 'Onion', imageKey: 'onion', type: 'vegetable', price: 55 }
    ]
    setTimeout(() => {
      setProduce(produceData)
      setLoading(false)
    }, 700)
  }, [])

  // Filter produce based on search term
  const filteredProduce = produce.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const fruits = filteredProduce.filter(item => item.type === 'fruit')
  const vegetables = filteredProduce.filter(item => item.type === 'vegetable')

  const clearSearch = () => {
    navigate('/')
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* Search Results Header */}
        <div className="w-full bg-gray-100 py-4 px-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-gray-600 mt-1">
                  Found {filteredProduce.length} items ({fruits.length} fruits, {vegetables.length} vegetables)
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

        {/* Search Results Section */}
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
                {/* Show message when no results found */}
                {filteredProduce.length === 0 && (
                  <div className="text-center text-white py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold mb-2">No results found for "{searchTerm}"</h3>
                    <p className="text-lg mb-4">Try searching for a different fruit or vegetable.</p>
                    <button
                      onClick={clearSearch}
                      className="bg-white text-purple-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Back to Home
                    </button>
                  </div>
                )}

                {/* Fruits Section */}
                {fruits.length > 0 && (
                  <div>
                    <h3 className="text-white text-2xl font-semibold mb-4 flex items-center">
                      🍓 Fruits
                      <span className="ml-2 text-sm bg-green-500 px-2 py-1 rounded-full">
                        {fruits.length} items
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {fruits.map((fruit, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                          <Link to={`/product/${encodeURIComponent(fruit.name)}`}>
                            <div className="h-52 w-full overflow-hidden bg-pink-100 flex items-center justify-center cursor-pointer">
                              <img
                                src={`/src/assets/${fruit.imageKey}.jpg`}
                                alt={fruit.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </Link>
                          <div className="p-4">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">{fruit.name}</h4>
                            <div className="pt-2 text-center">
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                                NPR {fruit.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vegetables Section */}
                {vegetables.length > 0 && (
                  <div>
                    <h3 className="text-white text-2xl font-semibold mb-4 flex items-center">
                      🥕 Vegetables
                      <span className="ml-2 text-sm bg-green-500 px-2 py-1 rounded-full">
                        {vegetables.length} items
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {vegetables.map((vegetable, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                          <Link to={`/product/${encodeURIComponent(vegetable.name)}`}>
                            <div className="h-52 w-full overflow-hidden bg-pink-100 flex items-center justify-center cursor-pointer">
                              <img
                                src={`/src/assets/${vegetable.imageKey}.jpg`}
                                alt={vegetable.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </Link>
                          <div className="p-4">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">{vegetable.name}</h4>
                            <div className="pt-2 text-center">
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                                NPR {vegetable.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search