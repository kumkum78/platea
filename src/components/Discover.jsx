import React from 'react';
import { Star } from 'lucide-react';

export default function Discover({ id }) {
  return (
    <div id={id} className="relative w-full sm:w-[90%] lg:w-[86%] rounded-none sm:rounded-2xl lg:rounded-3xl lg:mt-4 lg:mb-8 m-auto overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/section-bg.jpg')`
        }}
      ></div>
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xl space-y-6 sm:space-y-7 lg:space-y-8 text-center lg:text-left">
              
              {/* Rating Section */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-1 bg-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-xs sm:text-sm text-gray-900">5.0</span>
                </div>
                <span className="text-gray-900 font-semibold text-sm sm:text-md">score from 10,000 rating</span>
              </div>
              
              {/* Title Section */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight">
                  Discover fresh and easy recipes to inspire your meals every day.
                </h1>
              </div>
              
              {/* Description Section */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                <p className="text-sm sm:text-md text-black leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Discover fresh and easy recipes for every meal. From quick breakfasts and light lunches to hearty dinners and indulgent desserts, find endless inspiration to make cooking simple, fun, and enjoyable for any occasion or gathering!
                </p>
              </div>
              
              {/* Button Section */}
              <div className="pt-2 sm:pt-3 lg:pt-4 flex justify-center lg:justify-start">
                <button className="bg-white hover:bg-gray-50 text-black font-semibold px-6 py-3 sm:px-7 lg:px-8 rounded-lg tracking-tighter text-sm sm:text-base hover:cursor-pointer hover:bg-red-500 hover:text-white">
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