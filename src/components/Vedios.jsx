import React, { useState } from 'react';
import { Heart, Bookmark, Clock, User, PlayCircle, Play } from 'lucide-react';

const videos = [
  {
    id: 1,
    category: 'Desserts',
    title: 'Molten Chocolate Lava Cake Dessert',
    image: '/images/recipe-6-630x785.jpg',
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
    image: '/images/recipe-21-630x785.jpg',
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
    image: '/images/recipe-20-630x785.jpg',
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
    image: '/images/recipe-19-630x785.jpg',
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
    image: '/images/recipe-18-630x785.jpg',
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
    image: '/images/recipe-13-630x785.jpg',
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
    image: '/images/recipe-28-630x785.jpg',
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
    image: '/images/recipe-35-630x785.jpg',
    rating: 4.5,
    time: '45 min',
    difficulty: 'Intermediate',
    cuisine: 'Turkish',
    flag: '🇹🇷',
    liked: false,
    bookmarked: false,
  },
];

export default function Vedios({id}) {
  const [videosState, setVideosState] = useState(videos);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [exploreRecipes, setExploreRecipes] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(false);
  const [exploreError, setExploreError] = useState("");
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [dishRecipe, setDishRecipe] = useState(null);
  const [dishLoading, setDishLoading] = useState(false);

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

  const handleOpenExploreModal = async () => {
    setExploreModalOpen(true);
    setExploreLoading(true);
    setExploreError("");
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setExploreRecipes(data.meals.slice(0, 16));
      } else {
        setExploreError("No recipes found.");
      }
    } catch {
      setExploreError("Failed to fetch recipes.");
    }
    setExploreLoading(false);
  };

  const handleCloseExploreModal = () => {
    setExploreModalOpen(false);
    setExploreRecipes([]);
    setExploreError("");
  };

  const handleOpenDishModal = async (recipe) => {
    setDishModalOpen(true);
    setDishRecipe(null);
    setDishLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setDishRecipe(data.meals[0]);
      } else {
        setDishRecipe(null);
      }
    } catch {
      setDishRecipe(null);
    }
    setDishLoading(false);
  };

  const handleCloseDishModal = () => {
    setDishModalOpen(false);
    setDishRecipe(null);
  };

  return (
    <div id={id} className="max-w-[90%] mx-auto px-4 py-12">
      {/* Explore All Recipes Button */}
      <div className="flex items-center justify-center mb-18">
  <div className="flex-grow h-px bg-gray-200"></div>
  <button
    className="mx-4 px-6 py-2 bg-white border border-gray-200 rounded-md font-semibold hover:text-white hover:bg-red-500"
    onClick={handleOpenExploreModal}
  >
    Explore All Recipes
  </button>
  <div className="flex-grow h-px bg-gray-200"></div>
</div>

      {/* Heading and Subtitle */}
      <div className="relative flex flex-col items-center mb-14">
        <span className="absolute text-[8rem] opacity-15 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">🍴</span>
        <h2 className="text-5xl font-semibold tracking-tighter text-gray-900 z-10 mb-4">Video Recipes</h2>
        <p className="text-md text-black z-10 text-center max-w-2xl tracking-tighter">
          Watch our latest recipe videos and learn step-by-step cooking tips and techniques!
        </p>
      </div>
      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {videosState.map((video) => (
          <div key={video.id} className="bg-white rounded-xl overflow-hidden duration-200">
            {/* Image Container */}
            <div className="relative group cursor-pointer">
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
                      ? 'bg-red-500 text-white hover:cursor-pointer'
                      : 'bg-white text-red-500 hover:bg-gray-50 hover:cursor-pointer hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart size={22} fill={video.liked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => toggleBookmark(video.id)}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    video.bookmarked
                      ? 'bg-red-500 text-white hover:cursor-pointer'
                      : 'bg-white text-red-500 hover:bg-gray-50 hover:cursor-pointer hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Bookmark size={22} fill={video.bookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <div className="mb-2">
                <span className="text-md font-bold text-red-500 tracking-wide">{video.category}</span>
              </div>
              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3 leading-tight tracking-tight hover:text-red-500 hover:cursor-pointer">
                {video.title}
              </h3>
              {/* Meta Information */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                  <Clock size={16} />
                  <span>{video.time}</span>
                </div>
                <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                  <span>{video.flag}</span>
                  <span>{video.cuisine}</span>
                </div>
                <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                  <User size={16} />
                  <span>{video.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Explore Modal */}
      {exploreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={handleCloseExploreModal}>×</button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Explore Recipes</h2>
              {exploreLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <span className="text-3xl animate-spin">🍴</span>
                  <div className="text-gray-600">Loading recipes...</div>
                </div>
              ) : exploreError ? (
                <div className="p-8 text-center text-gray-500">{exploreError}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {exploreRecipes.map((recipe) => (
                    <div
                      key={recipe.idMeal}
                      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                      onClick={() => handleOpenDishModal(recipe)}
                    >
                      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <div className="text-md font-bold text-red-500 mb-1">{recipe.strCategory}</div>
                        <div className="text-lg font-semibold text-black mb-2 hover:text-red-500">{recipe.strMeal}</div>
                        <div className="text-xs text-gray-400">{recipe.strArea}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Dish Modal */}
      {dishModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={handleCloseDishModal}>×</button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Recipe Details</h2>
              {dishLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <span className="text-3xl animate-spin">🍴</span>
                  <div className="text-gray-600">Loading recipe...</div>
                </div>
              ) : dishRecipe ? (
                <>
                  <img src={dishRecipe.strMealThumb} alt={dishRecipe.strMeal} className="w-full h-64 object-cover rounded mb-4" />
                  <h3 className="text-xl font-bold mb-2">{dishRecipe.strMeal}</h3>
                  <div className="mb-4">
                    <span className="font-semibold">Category:</span> {dishRecipe.strCategory} <span className="ml-4 font-semibold">Area:</span> {dishRecipe.strArea}
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Ingredients:</span>
                    <ul className="list-disc list-inside ml-4">
                      {Array.from({ length: 20 }, (_, i) => i + 1)
                        .map(i => {
                          const ing = dishRecipe[`strIngredient${i}`];
                          const measure = dishRecipe[`strMeasure${i}`];
                          return ing && ing.trim() ? `${measure ? measure.trim() + ' ' : ''}${ing.trim()}` : null;
                        })
                        .filter(Boolean)
                        .map((ing, idx) => <li key={idx}>{ing}</li>)}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">Instructions:</span>
                    <p className="whitespace-pre-line mt-1">{dishRecipe.strInstructions}</p>
                  </div>
                  {dishRecipe.strYoutube && (
                    <div className="mb-2">
                      <a href={dishRecipe.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch on YouTube</a>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center text-gray-500">No recipe details found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
