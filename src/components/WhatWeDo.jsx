import React, { useState, useEffect } from "react";
import { Heart, Bookmark, Clock, User, ChefHat, X } from "lucide-react";
import { useRecipeContext } from "../hooks/useRecipeContext";

const tabApiMap = {
  "Latest Recipes": async () => {
    // Get latest meals (search with empty string returns a list)
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await res.json();
    return data.meals ? data.meals.slice(0, 5) : [];
  },
  "Most Popular Recipes": async () => {
    // Use Beef as a popular category
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");
    const data = await res.json();
    return data.meals ? data.meals.slice(0, 5) : [];
  },
  "Fastest Recipes": async () => {
    // Use Chicken as a fast category
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken");
    const data = await res.json();
    return data.meals ? data.meals.slice(0, 5) : [];
  },
  "Editor's Choice": async () => {
    // Use Dessert as editor's choice
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert");
    const data = await res.json();
    return data.meals ? data.meals.slice(0, 5) : [];
  },
};

// Update randomTime to only return values between 30 and 60 mins (in 5 min increments)
const randomTime = () => {
  const mins = ["30 min", "35 min", "40 min", "45 min", "50 min", "55 min", "60 min"];
  return mins[Math.floor(Math.random() * mins.length)];
};
const randomDifficulty = () => {
  const diffs = ["Beginner", "Easy", "Intermediate", "Advanced"];
  return diffs[Math.floor(Math.random() * diffs.length)];
};

const WhatWeDo = () => {
  const [activeTab, setActiveTab] = useState("Latest Recipes");
  const [recipesState, setRecipesState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function fetchRecipes() {
      setLoading(true);
      if (tabApiMap[activeTab]) {
        const meals = await tabApiMap[activeTab]();
        if (!ignore) {
          // Add random time and difficulty to each recipe
          const mealsWithRandomData = meals.map(meal => ({
            ...meal,
            time: randomTime(),
            difficulty: randomDifficulty()
          }));
          setRecipesState(mealsWithRandomData);
        }
      } else {
        setRecipesState([]);
      }
      setLoading(false);
    }
    fetchRecipes();
    return () => { ignore = true; };
  }, [activeTab]);

  // Use shared context for likes and bookmarks
  const { toggleLike, toggleBookmark, isLiked, isBookmarked, refreshUserPreferences } = useRecipeContext();

  // Refresh user preferences when component mounts
  useEffect(() => {
    refreshUserPreferences();
  }, [refreshUserPreferences]);

  // Fetch full recipe details by idMeal
  const handleOpenRecipeModal = async (recipe) => {
    setModalOpen(true);
    setModalRecipe(null);
    setModalLoading(true);
    const id = recipe.idMeal || recipe.id;
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setModalRecipe(data.meals[0]);
      } else {
        setModalRecipe(null);
      }
    } catch {
      setModalRecipe(null);
    }
    setModalLoading(false);
  };
  const handleCloseRecipeModal = () => {
    setModalOpen(false);
    setModalRecipe(null);
  };

  // Helper to get ingredients list
  const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-14">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 w-full sm:w-auto">
          {["Latest Recipes", "Most Popular Recipes", "Fastest Recipes", "Editor's Choice"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-5 text-lg sm:text-2xl font-semibold text-center sm:text-left ${
                activeTab === tab
                  ? "text-gray-900 lg:border-b-1 lg:border-gray-900"
                  : "text-gray-400 hover:text-gray-900 lg:hover:border-b-1 lg:hover:border-gray-900 hover:cursor-pointer"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <ChefHat className="animate-spin text-red-500" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {recipesState.map((recipe) => (
            <div key={recipe.idMeal || recipe.id} className="bg-white rounded-xl overflow-hidden">
              {/* Image Container */}
              <div className="relative group cursor-pointer">
                <img
                  src={recipe.strMealThumb || recipe.image}
                  alt={recipe.strMeal || recipe.title}
                  className="w-full h-94 object-cover"
                />
                {/* Top Overlay Icons */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-xs font-medium text-gray-800">4.8</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <button
                    onClick={() => toggleLike(`external_${recipe.idMeal || recipe.id}`)}
                    className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                      isLiked(`external_${recipe.idMeal || recipe.id}`)
                        ? "bg-red-500 text-white hover:cursor-pointer"
                        : "bg-white text-red-500 hover:bg-gray-50 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart
                      size={22}
                      fill={isLiked(`external_${recipe.idMeal || recipe.id}`) ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => toggleBookmark(`external_${recipe.idMeal || recipe.id}`)}
                    className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                      isBookmarked(`external_${recipe.idMeal || recipe.id}`)
                        ? "bg-red-500 text-white hover:cursor-pointer"
                        : "bg-white text-red-500 hover:bg-gray-50 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Bookmark
                      size={22}
                      fill={isBookmarked(`external_${recipe.idMeal || recipe.id}`) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                {/* Category */}
                <div className="mb-2">
                  <span className="text-md font-bold text-red-500 tracking-wide">
                    {recipe.strCategory || recipe.category}
                  </span>
                </div>
                {/* Title */}
                <h3
                  className="text-xl font-bold text-black mb-3 leading-tight tracking-tight hover:text-red-500 hover:cursor-pointer"
                  onClick={() => handleOpenRecipeModal(recipe)}
                >
                  {recipe.strMeal || recipe.title}
                </h3>
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                    <Clock size={16} />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                    <User size={16} />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500" onClick={handleCloseRecipeModal}><X size={24} /></button>
            {modalLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ChefHat className="animate-spin text-red-500 mb-4" size={48} />
                <div className="text-gray-600">Loading recipe...</div>
              </div>
            ) : modalRecipe ? (
              <div className="p-6">
                <img src={modalRecipe.strMealThumb} alt={modalRecipe.strMeal} className="w-full h-64 object-cover rounded mb-4" />
                <h2 className="text-2xl font-bold mb-2">{modalRecipe.strMeal}</h2>
                <div className="mb-4">
                  <span className="font-semibold">Category:</span> {modalRecipe.strCategory} <span className="ml-4 font-semibold">Area:</span> {modalRecipe.strArea}
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Ingredients:</span>
                  <ul className="list-disc list-inside ml-4">
                    {getIngredientsList(modalRecipe).map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Instructions:</span>
                  <p className="whitespace-pre-line mt-1">{modalRecipe.strInstructions}</p>
                </div>
                {modalRecipe.strYoutube && (
                  <div className="mb-2">
                    <a href={modalRecipe.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch on YouTube</a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">No recipe details found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatWeDo;
