import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { Copy, Users, Mail, Plus, X, Trash2 } from "lucide-react";
import io from "socket.io-client";

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function RoomDetails() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState({ breakfast: [], lunch: [], snacks: [], dinner: [] });
  const [inputs, setInputs] = useState({ breakfast: "", lunch: "", snacks: "", dinner: "" });
  const [message, setMessage] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invites, setInvites] = useState([]);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    ingredients: [""],
    steps: [""],
    image: ""
  });
  const [socket, setSocket] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const today = getToday();

  useEffect(() => {
    fetchRoom();
    fetchSuggestions();
    
    // Initialize socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    
    // Join room
    newSocket.emit('join-room', roomId);
    
    // Listen for real-time updates
    newSocket.on('suggestion-added', (data) => {
      if (data.roomId === roomId) {
        fetchSuggestions();
      }
    });
    
    newSocket.on('recipe-added', (data) => {
      if (data.roomId === roomId) {
        fetchRoom();
      }
    });
    
    return () => {
      newSocket.emit('leave-room', roomId);
      newSocket.disconnect();
    };
    // eslint-disable-next-line
  }, [roomId]);

  const fetchRoom = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/rooms/${roomId}`);
      setRoom(res.data);
    } catch (err) {
      setError("Failed to load room");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    setError("");
    try {
      const res = await API.get(`/rooms/${roomId}/suggestions?date=${today}`);
      setSuggestions(res.data || { breakfast: [], lunch: [], snacks: [], dinner: [] });
    } catch (err) {
      setSuggestions({ breakfast: [], lunch: [], snacks: [], dinner: [] });
    }
  };

  const handleInputChange = (meal, value) => {
    setInputs((prev) => ({ ...prev, [meal]: value }));
  };

  const handleSuggest = async (meal) => {
    setMessage("");
    setError("");
    try {
      await API.post(`/rooms/${roomId}/suggestions`, {
        date: today,
        meal,
        dish: inputs[meal],
      });
      setMessage(`Suggestion added for ${meal}!`);
      setInputs((prev) => ({ ...prev, [meal]: "" }));
      fetchSuggestions();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to add suggestion for ${meal}`);
    }
  };

  const createInvite = async () => {
    setMessage("");
    setError("");
    try {
      const response = await API.post(`/rooms/${roomId}/invite`);
      setInviteCode(response.data.inviteCode);
      setInviteUrl(response.data.inviteUrl);
      setShowInviteModal(true);
      setMessage("Invite created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create invite");
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setMessage("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 1200);
  };

  const fetchInvites = async () => {
    try {
      const response = await API.get(`/rooms/${roomId}/invites`);
      setInvites(response.data);
    } catch (err) {
      console.error("Failed to fetch invites:", err);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [roomId]);

  const addRecipeToRoom = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await API.post(`/rooms/${roomId}/recipes`, newRecipe);
      setMessage("Recipe added to room!");
      setNewRecipe({
        title: "",
        description: "",
        ingredients: [""],
        steps: [""],
        image: ""
      });
      setShowAddRecipeModal(false);
      fetchRoom();
      
      // Emit socket event for real-time update
      if (socket) {
        socket.emit('new-recipe', { roomId, recipe: response.data });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add recipe");
    }
  };

  const removeMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to remove this member?')) {
      return;
    }
    
    setMessage("");
    setError("");
    try {
      await API.delete(`/rooms/${roomId}/members`, { data: { memberId } });
      setMessage("Member removed successfully!");
      fetchRoom();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to remove member");
    }
  };

  const addIngredient = () => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ""]
    }));
  };

  const removeIngredient = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index, value) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }));
  };

  const addStep = () => {
    setNewRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, ""]
    }));
  };

  const removeStep = (index) => {
    setNewRecipe(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const updateStep = (index, value) => {
    setNewRecipe(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => i === index ? value : step)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => navigate("/rooms")}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Rooms
        </button>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {message && <div className="text-green-600 mb-4">{message}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : room ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Room: {room.name}</h1>
            <div className="mb-4 text-sm text-gray-600">Room ID: {room._id}</div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold flex items-center">
                  <Users size={20} className="mr-2" />
                  Members
                </h2>
                <button
                  onClick={createInvite}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
                >
                  <Mail size={16} className="mr-1" />
                  Invite
                </button>
              </div>
              <ul className="flex flex-wrap gap-2">
                {room.members && room.members.length > 0 ? (
                  room.members.map((member, index) => (
                    <li key={member._id} className="bg-gray-100 px-3 py-1 rounded text-gray-800 text-sm flex items-center">
                      <span>{member.name || member.email || member._id}</span>
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-green-500 text-white px-1 rounded">Admin</span>
                      )}
                      {index !== 0 && room.members[0]?._id === room.members[0]?._id && (
                        <button
                          onClick={() => removeMember(member._id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Remove member"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No members</li>
                )}
              </ul>
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Shared Recipes</h2>
                <button
                  onClick={() => setShowAddRecipeModal(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Recipe
                </button>
              </div>
              {room.recipes && room.recipes.length > 0 ? (
                <ul className="space-y-2">
                  {room.recipes.map((recipe) => (
                    <li key={recipe._id} className="bg-gray-100 px-4 py-2 rounded">
                      <div className="font-medium text-gray-900">{recipe.title}</div>
                      <div className="text-xs text-gray-500">{recipe.description}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">No recipes shared in this room yet.</div>
              )}
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Today's Meal Suggestions</h2>
              {['breakfast', 'lunch', 'snacks', 'dinner'].map((meal) => (
                <div key={meal} className="mb-4">
                  <div className="font-semibold capitalize mb-1">{meal}</div>
                  <div className="flex items-center space-x-2 mb-1">
                    <input
                      type="text"
                      className="border rounded px-3 py-1 flex-1"
                      placeholder={`Suggest a dish for ${meal}`}
                      value={inputs[meal]}
                      onChange={e => handleInputChange(meal, e.target.value)}
                    />
                    <button
                      onClick={() => handleSuggest(meal)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      disabled={!inputs[meal]}
                    >
                      Suggest
                    </button>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {suggestions[meal] && suggestions[meal].length > 0 ? (
                      suggestions[meal].map((s, idx) => (
                        <li key={idx} className="bg-green-100 px-2 py-1 rounded text-green-800 text-xs">
                          {s.dish} {s.user && s.user.name ? `by ${s.user.name}` : ""}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 text-xs">No suggestions yet.</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Invite People</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invite Code
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inviteCode}
                    readOnly
                    className="border rounded px-3 py-2 flex-1 bg-gray-50"
                  />
                  <button
                    onClick={() => copyToClipboard(inviteCode, 'code')}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center cursor-pointer"
                    title="Copy code"
                  >
                    <Copy size={16} />
                    {copiedField === 'code' && <span className="ml-2 text-xs text-white">Copied!</span>}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invite Link
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inviteUrl}
                    readOnly
                    className="border rounded px-3 py-2 flex-1 bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(inviteUrl, 'link')}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center cursor-pointer"
                    title="Copy link"
                  >
                    <Copy size={16} />
                    {copiedField === 'link' && <span className="ml-2 text-xs text-white">Copied!</span>}
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                Share this code or link with others to invite them to your room. 
                The invite expires in 7 days.
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Recipe Modal */}
        {showAddRecipeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Recipe to Room</h3>
                <button
                  onClick={() => setShowAddRecipeModal(false)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={addRecipeToRoom}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    value={newRecipe.title}
                    onChange={(e) => setNewRecipe(prev => ({ ...prev, title: e.target.value }))}
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe(prev => ({ ...prev, description: e.target.value }))}
                    className="border rounded px-3 py-2 w-full h-20"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={newRecipe.image}
                    onChange={(e) => setNewRecipe(prev => ({ ...prev, image: e.target.value }))}
                    className="border rounded px-3 py-2 w-full"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Ingredients
                    </label>
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        className="border rounded px-3 py-2 flex-1"
                        placeholder={`Ingredient ${index + 1}`}
                        required
                      />
                      {newRecipe.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Steps
                    </label>
                    <button
                      type="button"
                      onClick={addStep}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      + Add Step
                    </button>
                  </div>
                  {newRecipe.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                      <span className="text-sm text-gray-500 mt-2">{index + 1}.</span>
                      <textarea
                        value={step}
                        onChange={(e) => updateStep(index, e.target.value)}
                        className="border rounded px-3 py-2 flex-1"
                        placeholder={`Step ${index + 1}`}
                        required
                      />
                      {newRecipe.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddRecipeModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 