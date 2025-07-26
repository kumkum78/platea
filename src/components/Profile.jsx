import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useRecipeContext } from "../hooks/useRecipeContext";
import { X, Clock, ChefHat, Trash2 } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadUserPreferences } = useRecipeContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/users/profile");
      setProfile(response.data);
      // Refresh user preferences after loading profile
      loadUserPreferences();
    } catch {
      setError("Failed to fetch profile. Please login first.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRecipeClick = async (recipe) => {
    setRecipeModalOpen(true);
    setRecipeDetails(null);
    setRecipeLoading(true);

    try {
      if (recipe._id.startsWith('external_')) {
        // Fetch from TheMealDB
        const recipeId = recipe._id.replace('external_', '');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          setRecipeDetails({
            title: meal.strMeal,
            image: meal.strMealThumb,
            category: meal.strCategory,
            cuisine: meal.strArea,
            instructions: meal.strInstructions,
            ingredients: getIngredientsList(meal),
            youtube: meal.strYoutube
          });
        }
      } else {
        // Internal recipe - already has details
        setRecipeDetails(recipe);
      }
    } catch (error) {
      console.error('Failed to fetch recipe details:', error);
    } finally {
      setRecipeLoading(false);
    }
  };

  const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
      }
    }
    return ingredients;
  };

  const closeRecipeModal = () => {
    setRecipeModalOpen(false);
    setRecipeDetails(null);
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    try {
      await API.delete(`/recipes/${recipeId}`);
      // Refresh profile to update the uploaded recipes list
      fetchProfile();
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      alert(error.response?.data?.message || "Failed to delete recipe");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>


    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}'s Profile</h1>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Recipe Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liked Recipes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">❤️ Liked Recipes</h2>
            {profile.likedRecipes && profile.likedRecipes.length > 0 ? (
              <div className="space-y-3">
                {profile.likedRecipes.map((recipe) => (
                  <div 
                    key={recipe._id} 
                    className="border-b pb-3 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <div className="flex items-start space-x-3">
                      {recipe.image && (
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                        <p className="text-sm text-gray-600">{recipe.description}</p>
                        {recipe.category && (
                          <p className="text-xs text-red-500 mt-1">{recipe.category}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No liked recipes yet.</p>
            )}
          </div>

          {/* Bookmarked Recipes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔖 Bookmarked Recipes</h2>
            {profile.bookmarkedRecipes && profile.bookmarkedRecipes.length > 0 ? (
              <div className="space-y-3">
                {profile.bookmarkedRecipes.map((recipe) => (
                  <div 
                    key={recipe._id} 
                    className="border-b pb-3 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <div className="flex items-start space-x-3">
                      {recipe.image && (
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                        <p className="text-sm text-gray-600">{recipe.description}</p>
                        {recipe.category && (
                          <p className="text-xs text-red-500 mt-1">{recipe.category}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bookmarked recipes yet.</p>
            )}
          </div>

          {/* Uploaded Recipes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 My Recipes</h2>
            {profile.uploadedRecipes && profile.uploadedRecipes.length > 0 ? (
              <div className="space-y-3">
                {profile.uploadedRecipes.map((recipe) => (
                  <div key={recipe._id} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                        <p className="text-sm text-gray-600">{recipe.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteRecipe(recipe._id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors ml-2"
                        title="Delete recipe"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No uploaded recipes yet.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/recipes")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            View All Recipes
          </button>
          <button
            onClick={() => navigate("/add-recipe")}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Add New Recipe
          </button>
        </div>
      </div>

      {/* Recipe Modal */}
      {recipeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-10" 
              onClick={closeRecipeModal}
            >
              <X size={24} />
            </button>
            
            {recipeLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ChefHat className="animate-spin text-red-500 mb-4" size={48} />
                <div className="text-gray-600">Loading recipe details...</div>
              </div>
            ) : recipeDetails ? (
              <div className="p-6">
                {/* Recipe Image */}
                {recipeDetails.image && (
                  <img 
                    src={recipeDetails.image} 
                    alt={recipeDetails.title} 
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                )}
                
                {/* Recipe Title */}
                <h2 className="text-2xl font-bold mb-2">{recipeDetails.title}</h2>
                
                {/* Recipe Meta */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  {recipeDetails.category && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                      {recipeDetails.category}
                    </span>
                  )}
                  {recipeDetails.cuisine && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {recipeDetails.cuisine}
                    </span>
                  )}
                </div>
                
                {/* Ingredients */}
                {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <ChefHat size={20} className="mr-2" />
                      Ingredients
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {recipeDetails.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Instructions */}
                {recipeDetails.instructions && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Clock size={20} className="mr-2" />
                      Instructions
                    </h3>
                    <div className="text-gray-700 whitespace-pre-line">
                      {recipeDetails.instructions}
                    </div>
                  </div>
                )}
                
                {/* YouTube Link */}
                {recipeDetails.youtube && (
                  <div className="mb-4">
                    <a 
                      href={recipeDetails.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No recipe details found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}