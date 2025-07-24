import React, { useState } from 'react';
import { X } from 'lucide-react';

const Login = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    onClose(); // Close modal after submission
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: '',
      email: '',
      password: '',
      rememberMe: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="flex h-full">
          {/* Left Side - Food Background */}
          <div 
            className="w-1/2 bg-cover bg-center relative"
            style={{
              backgroundImage: "url('/images/logbg.webp')",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-4xl font-bold mb-4">
                  {isSignUp ? 'Already have an account?' : 'Create an account?'}
                </h2>
                <button
                  onClick={switchMode}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded transition-colors duration-200"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {isSignUp ? 'Create Account' : 'Sign in to Platea'}
            </h2>

            <div className="space-y-6">
              {isSignUp && (
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={isSignUp ? "Email Address" : "Username or Email Address"}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="mr-3 w-4 h-4"
                  />
                  <label htmlFor="rememberMe" className="text-gray-600">
                    Remember Me
                  </label>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
              >
                {isSignUp ? 'Sign Up' : 'Sign in'}
              </button>

              <div className="text-center space-x-4">
                {!isSignUp && (
                  <button
                    type="button"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                  >
                    Lost Your Password?
                  </button>
                )}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  {isSignUp ? 'Have an Account?' : 'Create Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;