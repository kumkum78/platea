import React, { useState } from "react";
import { Heart, Bookmark, Clock, User } from "lucide-react";

const categories = [
  "All Recipes",
  "Appetizers",
  "Main Dishes",
  "Desserts",
  "Drinks",
  "Healthy",
  "Other Recipes",
];

const recipes = [
  {
    id: 1,
    category: "Pasta",
    title: "Creamy Garlic Mushroom Penne Pasta",
    image: "/images/recipe-2-630x785.jpg",
    rating: 4.8,
    time: "5 min",
    difficulty: "Beginner",
    cuisine: "Lebanese",
    flag: "🇱🇧",
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    category: "Salads",
    title: "Zesty Lemon Quinoa with Fresh Herbs",
    image: "/images/recipe-3-630x785.jpg",
    rating: 4.5,
    time: "60 min",
    difficulty: "Beginner",
    cuisine: "Moroccan",
    flag: "🇲🇦",
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    category: "Meat",
    title: "Smoky Barbecue Pulled Beef Sandwiches",
    image: "/images/recipe-4-550x690.jpg",
    rating: 4.8,
    time: "15 min",
    difficulty: "Easy",
    cuisine: "French",
    flag: "🇫🇷",
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    category: "Breakfasts",
    title: "Fluffy Banana Pancakes with Maple Syrup",
    image: "/images/recipe-5-630x785.jpg",
    rating: 4.8,
    time: "60 min",
    difficulty: "Advanced",
    cuisine: "Thai",
    flag: "🇹🇭",
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    category: "Desserts",
    title: "Molten Chocolate Lava Cake Dessert",
    image: "/images/recipe-6-630x785.jpg",
    rating: 4.9,
    time: "80 min",
    difficulty: "Advanced",
    cuisine: "Ethiopian",
    flag: "🇪🇹",
    liked: false,
    bookmarked: false,
  },
  {
    id: 6,
    category: "Side Dishes",
    title: "Crispy Parmesan Garlic Zucchini Sticks",
    image: "/images/recipe-7-630x785.jpg",
    rating: 4.4,
    time: "100 min",
    difficulty: "Advanced",
    cuisine: "Korean",
    flag: "🇰🇷",
    liked: false,
    bookmarked: false,
  },
  {
    id: 7,
    category: "Drinks",
    title: "Mango Pineapple Smoothie with Coconut",
    image: "/images/recipe-8-630x785.jpg",
    rating: 4.9,
    time: "30 min",
    difficulty: "Easy",
    cuisine: "Thai",
    flag: "🇹🇭",
    liked: false,
    bookmarked: false,
  },
  {
    id: 8,
    category: "Gluten-Free",
    title: "Gluten-Free Almond Waffles with Berries",
    image: "/images/recipe-9-630x785.jpg",
    rating: 4.8,
    time: "20 min",
    difficulty: "Advanced",
    cuisine: "Lebanese",
    flag: "🇱🇧",
    liked: false,
    bookmarked: false,
  },
];

const NewRecipe = () => {
  const [activeCategory, setActiveCategory] = useState("All Recipes");
  const [recipesState, setRecipesState] = useState(recipes);

  const toggleLike = (id) => {
    setRecipesState((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, liked: !recipe.liked } : recipe
      )
    );
  };

  const toggleBookmark = (id) => {
    setRecipesState((prev) =>
      prev.map((recipe) =>
        recipe.id === id
          ? { ...recipe, bookmarked: !recipe.bookmarked }
          : recipe
      )
    );
  };

  // Filter recipes by category
  const filteredRecipes =
    activeCategory === "All Recipes"
      ? recipesState
      : recipesState.filter((r) => r.category === activeCategory);

  return (
    <div className="max-w-[88%] mx-auto px-4 py-4">
      {/* New Recipes Section */}
      <div className="relative flex flex-col items-center mb-10 py-6">
        {/* Optional faint icon background */}
        <span className="absolute text-[8rem] opacity-15 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          🍴
        </span>
        <h2 className="text-5xl font-semibold tracking-tighter text-gray-900 z-10 mb-4">
          New Recipes
        </h2>
        <p className="text-lg text-black z-10 text-center max-w-2xl tracking-tighter">
          Explore our latest recipes, from quick snacks to hearty meals and
          indulgent desserts.
        </p>
      </div>

      {/* Category Filters */}
      {/* <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 border focus:outline-none ${
              activeCategory === cat
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 text-base font-semibold rounded-full transition-colors duration-200 border focus:outline-none ${
              activeCategory === cat
                ? "bg-red-500 text-white border-red-500 hover:cursor-pointer"
                : "bg-white text-black border-gray-200 hover:cursor-pointer hover:bg-red-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative group cursor-pointer">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-94 object-cover"
              />
              {/* Top Overlay Icons */}
              <div className="absolute top-3 left-3">
                <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs font-medium text-gray-800">
                    {recipe.rating}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <button
                  onClick={() => toggleLike(recipe.id)}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    recipe.liked
                      ? "bg-red-500 text-white hover:cursor-pointer"
                      : "bg-white text-red-500 hover:bg-gray-50 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <Heart
                    size={22}
                    fill={recipe.liked ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => toggleBookmark(recipe.id)}
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    recipe.bookmarked
                      ? "bg-red-500 text-white hover:cursor-pointer"
                      : "bg-white text-red-500 hover:bg-gray-50 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <Bookmark
                    size={22}
                    fill={recipe.bookmarked ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <div className="mb-2">
                <span className="text-md font-bold text-red-500 tracking-wide">
                  {recipe.category}
                </span>
              </div>
              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3 leading-tight tracking-tight hover:text-red-500 hover:cursor-pointer">
                {recipe.title}
              </h3>
              {/* Meta Information */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                  <Clock size={16} />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center justify-center text-sm space-x-1 hover:text-red-500 hover:cursor-pointer">
                  <span>{recipe.flag}</span>
                  <span>{recipe.cuisine}</span>
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
    </div>
  );
};

export default NewRecipe;
