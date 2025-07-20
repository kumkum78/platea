import React, { useState } from 'react';
import { Heart, Bookmark, Clock, User, ChefHat } from 'lucide-react';

const WhatWeDo = () => {
  const [activeTab, setActiveTab] = useState('Latest Recipes');

  const tabs = ['Latest Recipes', 'Most Popular Recipes', 'Fastest Recipes', "Editor's Choice"];

  const recipes = [
    {
      id: 1,
      category: 'Pasta',
      title: 'Creamy Garlic Mushroom Penne Pasta',
      image: '../../images/recipe-2-550x690.jpg',
      rating: 4.8,
      time: '5 min',
      difficulty: 'Beginner',
      cuisine: 'Lebanese',
      flag: '🇱🇧',
      categoryColor: 'text-red-500',
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      category: 'Salads',
      title: 'Zesty Lemon Quinoa with Fresh Herbs',
      image: '../../images/recipe-3-630x785.jpg',
      rating: 4.5,
      time: '60 min',
      difficulty: 'Beginner',
      cuisine: 'Moroccan',
      flag: '🇲🇦',
      categoryColor: 'text-red-500',
      liked: true,
      bookmarked: false
    },
    {
      id: 3,
      category: 'Meat',
      title: 'Smoky Barbecue Pulled Beef Sandwiches',
      image: '../../images/recipe-4-630x785.jpg',
      rating: 4.8,
      time: '15 min',
      difficulty: 'Easy',
      cuisine: 'French',
      flag: '🇫🇷',
      categoryColor: 'text-red-500',
      liked: false,
      bookmarked: false
    },
    {
      id: 4,
      category: 'Breakfasts',
      title: 'Fluffy Banana Pancakes with Maple Syrup',
      image: '../../images/recipe-5-630x785.jpg',
      rating: 4.8,
      time: '60 min',
      difficulty: 'Advanced',
      cuisine: 'Thai',
      flag: '🇹🇭',
      categoryColor: 'text-red-500',
      liked: false,
      bookmarked: false
    },
    {
      id: 5,
      category: 'Desserts',
      title: 'Molten Chocolate Lava Cake Dessert',
      image: '../../images/recipe-6-630x785.jpg',
      rating: 4.9,
      time: '80 min',
      difficulty: 'Advanced',
      cuisine: 'Ethiopian',
      flag: '🇪🇹',
      categoryColor: 'text-red-500',
      liked: false,
      bookmarked: false
    }
  ];

  const [recipesState, setRecipesState] = useState(recipes);

  const toggleLike = (id) => {
    setRecipesState(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === id ? { ...recipe, liked: !recipe.liked } : recipe
      )
    );
  };

  const toggleBookmark = (id) => {
    setRecipesState(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === id ? { ...recipe, bookmarked: !recipe.bookmarked } : recipe
      )
    );
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-12">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {recipesState.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Image Container */}
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-94 object-cover"
              />
              
              {/* Top Overlay Icons */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs font-medium text-gray-800">{recipe.rating}</span>
                </div>
              </div>
              
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                  onClick={() => toggleLike(recipe.id)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    recipe.liked
                      ? 'bg-red-500 text-white'
                      : 'bg-white bg-opacity-90 text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <Heart size={14} fill={recipe.liked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => toggleBookmark(recipe.id)}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    recipe.bookmarked
                      ? 'bg-gray-800 text-white'
                      : 'bg-white bg-opacity-90 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark size={14} fill={recipe.bookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <div className="mb-3">
                <span className={`text-sm font-medium ${recipe.categoryColor}`}>
                  {recipe.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-4 line-clamp-2 leading-tight">
                {recipe.title}
              </h3>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{recipe.flag}</span>
                  <span>{recipe.cuisine}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={12} />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;