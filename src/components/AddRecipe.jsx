import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    image: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        ingredients: form.ingredients.split(",").map(item => item.trim()).filter(item => item),
        steps: form.steps.split(",").map(item => item.trim()).filter(item => item)
      };
      await API.post("/recipes", payload);
      setMessage("Recipe added successfully! Redirecting...");
      setTimeout(() => navigate("/recipes"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Recipe</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter recipe title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Describe your recipe"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients (comma separated)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="e.g., 2 cups flour, 1 cup sugar, 3 eggs"
                value={form.ingredients}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
                Steps (comma separated)
              </label>
              <textarea
                id="steps"
                name="steps"
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="e.g., Mix ingredients, Bake at 350F, Let cool"
                value={form.steps}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (optional)
              </label>
              <input
                type="url"
                id="image"
                name="image"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? "Adding Recipe..." : "Add Recipe"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/recipes")}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>

            {message && (
              <div className={`text-sm text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}