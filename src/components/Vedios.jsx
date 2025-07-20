import React, { useState } from 'react';
import { Heart, Bookmark, Clock, User, PlayCircle, Play } from 'lucide-react';

const videos = [
  {
    id: 1,
    category: 'Desserts',
    title: 'Molten Chocolate Lava Cake Dessert',
    image: '../../images/recipe-6-630x785.jpg',
    rating: 4.9,
    time: '80 min',
    difficulty: 'Advanced',
    cuisine: 'Ethiopian',
    flag: '🇪🇹',
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    category: 'Vegetarian',
    title: 'Spinach Ricotta Stuffed Vegan Pasta Shells',
    image: '../../images/recipe-21-630x785.jpg',
    rating: 4.8,
    time: '25 min',
    difficulty: 'Expert',
    cuisine: 'Italian',
    flag: '🇮🇹',
    liked: false,
    bookmarked: false,
  },
  {
    id: 3,
    category: 'Desserts',
    title: 'Apple Crumble with Cinnamon Oat Topping',
    image: '../../images/recipe-20-630x785.jpg',
    rating: 5.0,
    time: '35 min',
    difficulty: 'Easy',
    cuisine: 'Korean',
    flag: '🇰🇷',
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    category: 'Vegan',
    title: 'Vegan Black Bean Tacos with Avocado Salsa',
    image: '../../images/recipe-19-630x785.jpg',
    rating: 4.6,
    time: '15 min',
    difficulty: 'Advanced',
    cuisine: 'Greek',
    flag: '🇬🇷',
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    category: 'Healthy',
    title: 'Chickpea and Kale Salad with Lemon Dressing',
    image: '../../images/recipe-18-630x785.jpg',
    rating: 4.6,
    time: '5 min',
    difficulty: 'Intermediate',
    cuisine: 'Spanish',
    flag: '🇪🇸',
    liked: false,
    bookmarked: false,
  },
  {
    id: 6,
    category: 'Breads',
    title: 'Savory Garlic Herb Butter Dinner Rolls',
    image: '../../images/recipe-13-630x785.jpg',
    rating: 4.8,
    time: '85 min',
    difficulty: 'Beginner',
    cuisine: 'Mexican',
    flag: '🇲🇽',
    liked: false,
    bookmarked: false,
  },
  {
    id: 7,
    category: 'Salads',
    title: 'Asian Sesame Noodles with Crunchy Veggies',
    image: '../../images/recipe-28-630x785.jpg',
    rating: 4.5,
    time: '60 min',
    difficulty: 'Beginner',
    cuisine: 'Moroccan',
    flag: '🇲🇦',
    liked: false,
    bookmarked: false,
  },
  {
    id: 8,
    category: 'Meat',
    title: 'Slow Cooker Beef and Black Bean Chili',
    image: '../../images/recipe-35-630x785.jpg',
    rating: 4.5,
    time: '45 min',
    difficulty: 'Intermediate',
    cuisine: 'Turkish',
    flag: '🇹🇷',
    liked: false,
    bookmarked: false,
  },
];

export default function Vedios() {
  const [videosState, setVideosState] = useState(videos);

  const toggleLike = (id) => {
    setVideosState(prev =>
      prev.map(video =>
        video.id === id ? { ...video, liked: !video.liked } : video
      )
    );
  };

  const toggleBookmark = (id) => {
    setVideosState(prev =>
      prev.map(video =>
        video.id === id ? { ...video, bookmarked: !video.bookmarked } : video
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Explore All Recipes Button */}
      <div className="flex justify-center mb-8">
        <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 font-semibold">Explore All Recipes</button>
      </div>
      {/* Heading and Subtitle */}
      <div className="relative flex flex-col items-center mb-10">
        <span className="absolute text-[7rem] opacity-5 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">🍳</span>
        <h2 className="text-4xl font-bold text-gray-900 z-10 mb-2">Video Recipes</h2>
        <p className="text-lg text-gray-600 z-10 text-center max-w-2xl">
          Watch our latest recipe videos and learn step-by-step cooking tips and techniques!
        </p>
      </div>
      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {videosState.map((video) => (
          <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
            {/* Image Container */}
            <div className="relative group">
              <img
                src={video.image}
                alt={video.title}
                className="w-full h-96 object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/30 rounded-full p-8 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-white" fill="currentColor" />
                </span>
              </div>
              {/* Top Overlay Icons */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs font-medium text-gray-800">{video.rating}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                  onClick={() => toggleLike(video.id)}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    video.liked
                      ? 'bg-red-500 text-white'
                      : 'bg-white bg-opacity-90 text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <Heart size={16} fill={video.liked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => toggleBookmark(video.id)}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    video.bookmarked
                      ? 'bg-gray-800 text-white'
                      : 'bg-white bg-opacity-90 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark size={16} fill={video.bookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <div className="mb-2">
                <span className="text-xs font-medium text-red-500 uppercase tracking-wide">{video.category}</span>
              </div>
              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                {video.title}
              </h3>
              {/* Meta Information */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{video.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{video.flag}</span>
                  <span>{video.cuisine}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>{video.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
