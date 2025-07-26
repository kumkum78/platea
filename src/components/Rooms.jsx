import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createName, setCreateName] = useState("");
  const [joinId, setJoinId] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/users/profile");
      setRooms(res.data.rooms || []);
    } catch (err) {
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await API.post("/rooms", { name: createName });
      setMessage("Room created!");
      setCreateName("");
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await API.post(`/rooms/join/${joinId}`);
      setMessage("Joined room!");
      setJoinId("");
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join room");
    }
  };

  const handleJoinByInvite = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await API.post(`/rooms/join/invite/${inviteCode}`);
      setMessage("Joined room via invite!");
      setInviteCode("");
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join room via invite");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Private Rooms</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {message && <div className="text-green-600 mb-4">{message}</div>}

        {/* Create Room */}
        <form onSubmit={handleCreateRoom} className="mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="border rounded px-3 py-2 flex-1"
              placeholder="Room name"
              value={createName}
              onChange={e => setCreateName(e.target.value)}
              required
            />
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Create Room
            </button>
          </div>
        </form>

        {/* Join Room */}
        <form onSubmit={handleJoinRoom} className="mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="border rounded px-3 py-2 flex-1"
              placeholder="Room ID"
              value={joinId}
              onChange={e => setJoinId(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Join Room
            </button>
          </div>
        </form>

        {/* Join by Invite Code */}
        <form onSubmit={handleJoinByInvite} className="mb-8">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="border rounded px-3 py-2 flex-1"
              placeholder="Invite Code (e.g., A1B2C3D4)"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
              required
            />
            <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Join by Invite
            </button>
          </div>
        </form>

        {/* List of Rooms */}
        <h2 className="text-lg font-semibold mb-3">Your Rooms</h2>
        {loading ? (
          <div>Loading...</div>
        ) : rooms.length === 0 ? (
          <div className="text-gray-500">You are not a member of any rooms yet.</div>
        ) : (
          <ul className="space-y-3">
            {rooms.map(room => (
              <li key={room._id} className="flex items-center justify-between bg-gray-100 rounded px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900">{room.name || "(No name)"}</div>
                  <div className="text-xs text-gray-500">Room ID: {room._id}</div>
                </div>
                <button
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Enter Room
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 