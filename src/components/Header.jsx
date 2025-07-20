import React, { useState } from 'react';
import { ChevronDown, Menu, X, Search, Bookmark, User, Plus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white">
      {/* Top bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-8">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
              <div className="flex items-center justify-center space-x-1">
                <div className="w-3 h-3 flex flex-col space-y-0.5">
                  <div className="w-3 h-0.5 bg-gray-600"></div>
                  <div className="w-3 h-0.5 bg-gray-600"></div>
                  <div className="w-3 h-0.5 bg-gray-600"></div>
                </div>
                <span className="font-small">Recipe Categories</span>
              </div>
              <span className="font-small">1.6K</span>
              <span>Video Recipes</span>
              <span>A-Z Recipes</span>
              <span>This Week's Recipes</span>
              <span>Contact Us</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Instagram */}
              <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              
              {/* Twitter/X */}
              <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              
              {/* YouTube */}
              <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              
              {/* Pinterest */}
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.744-1.378l-.628 2.43c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {/* <div className="flex items-center"> */}
              <div className="flex items-center">
                <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-red-500">Platea</span>
              </div>
            {/* </div> */}

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('home')}
                    className="text-gray-800 hover:text-red-500 text-sm font-medium flex items-center py-2"
                  >
                    Home
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {activeDropdown === 'home' && (
                    <div className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Home Option 1</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Home Option 2</a>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('recipes')}
                    className="text-gray-800 hover:text-red-500 text-sm font-medium flex items-center py-2"
                  >
                    Recipes
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {activeDropdown === 'recipes' && (
                    <div className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All Recipes</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Popular Recipes</a>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('cuisines')}
                    className="text-gray-800 hover:text-red-500 text-sm font-medium flex items-center py-2"
                  >
                    Cuisines
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {activeDropdown === 'cuisines' && (
                    <div className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Italian</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Chinese</a>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('categories')}
                    className="text-gray-800 hover:text-red-500 text-sm font-medium flex items-center py-2"
                  >
                    Categories
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {activeDropdown === 'categories' && (
                    <div className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Breakfast</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Lunch</a>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('blog')}
                    className="text-gray-800 hover:text-red-500 text-sm font-medium flex items-center py-2"
                  >
                    Blog
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {activeDropdown === 'blog' && (
                    <div className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Latest Posts</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cooking Tips</a>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('features')}
                    className="text-gray-800 hover:text-red-500 text-sm font-medium flex items-center py-2"
                  >
                    Features
                    <ChevronDown size={14} className="ml-1" />
                  </button>
                  {activeDropdown === 'features' && (
                    <div className="absolute z-50 mt-1 w-48 bg-white rounded-md shadow-lg border py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Meal Planner</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Recipe Calculator</a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-red-500 p-1">
                <Bookmark size={18} />
              </button>
              <button className="text-gray-600 hover:text-red-500 p-1">
                <User size={18} />
              </button>
              <button className="text-gray-600 hover:text-red-500 p-1">
                <Search size={18} />
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">
                Add Recipe
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-red-500 p-2"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-b border-gray-100">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white">
            <a href="#" className="text-gray-800 hover:text-red-500 block px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-red-500 block px-3 py-2 text-sm font-medium">
              Recipes
            </a>
            <a href="#" className="text-gray-800 hover:text-red-500 block px-3 py-2 text-sm font-medium">
              Cuisines
            </a>
            <a href="#" className="text-gray-800 hover:text-red-500 block px-3 py-2 text-sm font-medium">
              Categories
            </a>
            <a href="#" className="text-gray-800 hover:text-red-500 block px-3 py-2 text-sm font-medium">
              Blog
            </a>
            <a href="#" className="text-gray-800 hover:text-red-500 block px-3 py-2 text-sm font-medium">
              Features
            </a>
            <div className="px-3 py-2">
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">
                Add Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;