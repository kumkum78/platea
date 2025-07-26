import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Trash2 } from "lucide-react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await API.get('/users/profile');
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.error('Failed to get current user:', error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await API.get("/recipes");
      setRecipes(response.data);
    } catch {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (recipeId) => {
    try {
      await API.post(`/users/like/${recipeId}`);
      fetchRecipes(); // Refresh to get updated likes
    } catch {
      console.error("Failed to like recipe");
    }
  };

  const handleBookmark = async (recipeId) => {
    try {
      await API.post(`/users/bookmark/${recipeId}`);
      fetchRecipes(); // Refresh to get updated bookmarks
    } catch {
      console.error("Failed to bookmark recipe");
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    try {
      await API.delete(`/recipes/${recipeId}`);
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      alert(error.response?.data?.message || "Failed to delete recipe");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
          <button
            onClick={() => navigate("/add-recipe")}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Add Recipe
          </button>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes found. Be the first to add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                  
                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                      <ul className="text-sm text-gray-600">
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                          <li key={index}>• {ingredient}</li>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <li className="text-gray-500">... and {recipe.ingredients.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleLike(recipe._id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        ❤️ {recipe.likes?.length || 0}
                      </button>
                      <button
                        onClick={() => handleBookmark(recipe._id)}
                        className="text-gray-500 hover:text-yellow-500"
                      >
                        🔖 {recipe.bookmarks?.length || 0}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        By {recipe.createdBy?.name || "Unknown"}
                      </div>
                      {currentUser && recipe.createdBy?._id === currentUser._id && (
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete recipe"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 