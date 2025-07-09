import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';

// Header Component with Search (reusable)
function Header({ searchTerm, onSearchChange, onSearch }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (localSearchTerm.trim()) {
      onSearch(localSearchTerm.trim())
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    onSearchChange(value)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img src="bazar.png" alt="Bazar Logo" className="h-15 w-18" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            <div className="relative group">
               <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/fruits">Fruits</NavDropdown.Item>
              <NavDropdown.Item href="/vegetables">
                Vegetable
              </NavDropdown.Item>
              <NavDropdown.Item href="/dryfruits">Dry Fruits</NavDropdown.Item>
              
              <NavDropdown.Item href="/dairys">
                Dairy
              </NavDropdown.Item>
            </NavDropdown>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fruits</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vegetables</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Organic</a>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={localSearchTerm}
                onChange={handleSearchChange}
                placeholder="Search fruits and vegetables..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            <a href="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Main Home Component
function Home() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  const handleSearch = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <div>
      {/* Header Component */}
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        onSearch={handleSearch}
      />
    </div>
  )
}

export default Home