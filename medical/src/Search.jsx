import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

// Search Component
function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
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
    const loadFruitsAndVegetables = () => {
      setTimeout(() => {
        const produceData = [
          // Fruits
          { 
            name: 'Apple', 
            family: 'Rosaceae', 
            genus: 'Malus', 
            nutritions: { calories: 52, sugar: 10.4 },
            color: 'ff6b6b',
            type: 'fruit',
            emoji: '🍎'
          },
          { 
            name: 'Banana', 
            family: 'Musaceae', 
            genus: 'Musa', 
            nutritions: { calories: 89, sugar: 12.2 },
            color: 'ffd93d',
            type: 'fruit',
            emoji: '🍌'
          },
          { 
            name: 'Orange', 
            family: 'Rutaceae', 
            genus: 'Citrus', 
            nutritions: { calories: 47, sugar: 9.4 },
            color: 'ff8c42',
            type: 'fruit',
            emoji: '🍊'
          },
          { 
            name: 'Strawberry', 
            family: 'Rosaceae', 
            genus: 'Fragaria', 
            nutritions: { calories: 32, sugar: 4.9 },
            color: 'ff6b9d',
            type: 'fruit',
            emoji: '🍓'
          },
          { 
            name: 'Mango', 
            family: 'Anacardiaceae', 
            genus: 'Mangifera', 
            nutritions: { calories: 60, sugar: 13.7 },
            color: 'ffbe0b',
            type: 'fruit',
            emoji: '🥭'
          },
          { 
            name: 'Pineapple', 
            family: 'Bromeliaceae', 
            genus: 'Ananas', 
            nutritions: { calories: 50, sugar: 9.9 },
            color: 'f77f00',
            type: 'fruit',
            emoji: '🍍'
          },
          { 
            name: 'Grapes', 
            family: 'Vitaceae', 
            genus: 'Vitis', 
            nutritions: { calories: 62, sugar: 16.3 },
            color: '9b59b6',
            type: 'fruit',
            emoji: '🍇'
          },
          { 
            name: 'Watermelon', 
            family: 'Cucurbitaceae', 
            genus: 'Citrullus', 
            nutritions: { calories: 30, sugar: 6.2 },
            color: '2ecc71',
            type: 'fruit',
            emoji: '🍉'
          },
          // Vegetables
          { 
            name: 'Carrot', 
            family: 'Apiaceae', 
            genus: 'Daucus', 
            nutritions: { calories: 41, sugar: 4.7 },
            color: 'ff8c42',
            type: 'vegetable',
            emoji: '🥕'
          },
          { 
            name: 'Broccoli', 
            family: 'Brassicaceae', 
            genus: 'Brassica', 
            nutritions: { calories: 34, sugar: 1.5 },
            color: '2ecc71',
            type: 'vegetable',
            emoji: '🥦'
          },
          { 
            name: 'Tomato', 
            family: 'Solanaceae', 
            genus: 'Solanum', 
            nutritions: { calories: 18, sugar: 2.6 },
            color: 'e74c3c',
            type: 'vegetable',
            emoji: '🍅'
          },
          { 
            name: 'Cucumber', 
            family: 'Cucurbitaceae', 
            genus: 'Cucumis', 
            nutritions: { calories: 16, sugar: 1.7 },
            color: '2ecc71',
            type: 'vegetable',
            emoji: '🥒'
          },
          { 
            name: 'Bell Pepper', 
            family: 'Solanaceae', 
            genus: 'Capsicum', 
            nutritions: { calories: 31, sugar: 4.2 },
            color: 'f39c12',
            type: 'vegetable',
            emoji: '🫑'
          },
          { 
            name: 'Spinach', 
            family: 'Amaranthaceae', 
            genus: 'Spinacia', 
            nutritions: { calories: 23, sugar: 0.4 },
            color: '27ae60',
            type: 'vegetable',
            emoji: '🥬'
          },
          { 
            name: 'Potato', 
            family: 'Solanaceae', 
            genus: 'Solanum', 
            nutritions: { calories: 77, sugar: 0.8 },
            color: 'd4a574',
            type: 'vegetable',
            emoji: '🥔'
          },
          { 
            name: 'Onion', 
            family: 'Amaryllidaceae', 
            genus: 'Allium', 
            nutritions: { calories: 40, sugar: 4.2 },
            color: 'e8c547',
            type: 'vegetable',
            emoji: '🧅'
          }
        ]
        setProduce(produceData)
        setLoading(false)
      }, 1000)
    }

    loadFruitsAndVegetables()
  }, [])

  // Filter produce based on search term
  const filteredProduce = produce.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genus.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                          <div className="h-32 flex items-center justify-center text-6xl" style={{backgroundColor: `#${fruit.color}20`}}>
                            {fruit.emoji}
                          </div>
                          <div className="p-3">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{fruit.name}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><span className="font-semibold">Family:</span> {fruit.family}</p>
                              <p><span className="font-semibold">Genus:</span> {fruit.genus}</p>
                              <div className="flex justify-between pt-2">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  {fruit.nutritions.calories} cal
                                </span>
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                                  {fruit.nutritions.sugar}g sugar
                                </span>
                              </div>
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
                          <div className="h-32 flex items-center justify-center text-6xl" style={{backgroundColor: `#${vegetable.color}20`}}>
                            {vegetable.emoji}
                          </div>
                          <div className="p-3">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{vegetable.name}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><span className="font-semibold">Family:</span> {vegetable.family}</p>
                              <p><span className="font-semibold">Genus:</span> {vegetable.genus}</p>
                              <div className="flex justify-between pt-2">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {vegetable.nutritions.calories} cal
                                </span>
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                  {vegetable.nutritions.sugar}g sugar
                                </span>
                              </div>
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