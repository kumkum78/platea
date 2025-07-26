import React, { useState, useEffect } from 'react';
import API from '../api';
import { RecipeContext } from './RecipeContext.js';

export const RecipeProvider = ({ children }) => {
  const [likedRecipes, setLikedRecipes] = useState(new Set());
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load user's likes and bookmarks on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUserPreferences();
    }
  }, []);

  const loadUserPreferences = async () => {
    try {
      setLoading(true);
      const response = await API.get('/users/profile');
      const profile = response.data;
      
      // Convert arrays to Sets for efficient lookup
      const likedIds = new Set(profile.likedRecipes?.map(recipe => recipe._id) || []);
      const bookmarkedIds = new Set(profile.bookmarkedRecipes?.map(recipe => recipe._id) || []);
      
      setLikedRecipes(likedIds);
      setBookmarkedRecipes(bookmarkedIds);
    } catch (error) {
      console.error('Failed to load user preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (recipeId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to like recipes');
      return;
    }

    console.log('Toggling like for recipe:', recipeId);
    console.log('Current token:', token);

    try {
      if (likedRecipes.has(recipeId)) {
        // Unlike
        console.log('Unliking recipe:', recipeId);
        const response = await API.delete(`/users/like/${recipeId}`);
        console.log('Unlike response:', response);
        setLikedRecipes(prev => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
      } else {
        // Like
        console.log('Liking recipe:', recipeId);
        const response = await API.post(`/users/like/${recipeId}`);
        console.log('Like response:', response);
        setLikedRecipes(prev => new Set([...prev, recipeId]));
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      console.error('Error response:', error.response);
      // Don't show alert for 400 errors (already liked/unliked)
      if (error.response?.status !== 400) {
        alert('Failed to update like status');
      }
    }
  };

  const toggleBookmark = async (recipeId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to bookmark recipes');
      return;
    }

    console.log('Toggling bookmark for recipe:', recipeId);
    console.log('Current token:', token);

    try {
      if (bookmarkedRecipes.has(recipeId)) {
        // Remove bookmark
        console.log('Unbookmarking recipe:', recipeId);
        const response = await API.delete(`/users/bookmark/${recipeId}`);
        console.log('Unbookmark response:', response);
        setBookmarkedRecipes(prev => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
      } else {
        // Add bookmark
        console.log('Bookmarking recipe:', recipeId);
        const response = await API.post(`/users/bookmark/${recipeId}`);
        console.log('Bookmark response:', response);
        setBookmarkedRecipes(prev => new Set([...prev, recipeId]));
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      console.error('Error response:', error.response);
      // Don't show alert for 400 errors (already bookmarked/unbookmarked)
      if (error.response?.status !== 400) {
        alert('Failed to update bookmark status');
      }
    }
  };

  const isLiked = (recipeId) => likedRecipes.has(recipeId);
  const isBookmarked = (recipeId) => bookmarkedRecipes.has(recipeId);

  const value = {
    likedRecipes,
    bookmarkedRecipes,
    loading,
    toggleLike,
    toggleBookmark,
    isLiked,
    isBookmarked,
    loadUserPreferences
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}; 