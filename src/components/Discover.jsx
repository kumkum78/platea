import React from 'react';
import { Star } from 'lucide-react';

export default function Discover() {
  return (
    <div className="min-h-screen relative w-[86%] rounded-3xl m-auto overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('../../images/section-bg.jpg')`
        }}
      ></div>
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center min-h-screen px-8 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-center lg:justify-end">
            
            
            {/* Right Side - Text Content */}
            <div className="max-w-xl space-y-8">
              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm text-gray-900">5.0</span>
                </div>
                <span className="text-gray-900 font-semibold text-md">score from 10,000 rating</span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  Discover fresh and easy recipes to inspire your meals every day.
                </h1>
              </div>
              
              {/* Description */}
              <div className="space-y-6">
                <p className="text-md text-black leading-relaxed max-w-xl">
                  Discover fresh and easy recipes for every meal. From quick breakfasts and light lunches to hearty dinners and indulgent desserts, find endless inspiration to make cooking simple, fun, and enjoyable for any occasion or gathering!
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="pt-4">
                <button className="bg-white hover:bg-gray-50 text-black font-semibold px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
                  View Recipes
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}