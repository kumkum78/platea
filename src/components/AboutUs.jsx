import React from 'react';
import { Star, Pizza, Cake, Martini, HeartPulse, Drumstick, Leaf, Fish, Soup, Sprout } from 'lucide-react';

const categories = [
  { icon: <Pizza className="w-7 h-7" />, label: 'Appetizers', count: 2 },
  { icon: <Cake className="w-7 h-7" />, label: 'Desserts', count: 4 },
  { icon: <Martini className="w-7 h-7" />, label: 'Drinks', count: 3 },
  { icon: <HeartPulse className="w-7 h-7" />, label: 'Healthy', count: 3 },
  { icon: <Drumstick className="w-7 h-7" />, label: 'Meat', count: 5 },
  { icon: <Leaf className="w-7 h-7" />, label: 'Salads', count: 3 },
  { icon: <Fish className="w-7 h-7" />, label: 'Seafood', count: 4 },
  { icon: <Soup className="w-7 h-7" />, label: 'Soups', count: 4 },
  { icon: <Sprout className="w-7 h-7" />, label: 'Vegan', count: 4 },
];

const AboutUs=() => {
  return (
    <div className="max-w-[88%] mx-auto px-4 py-12">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Card */}
        <div className="pl-2 rounded-xl overflow-hidden shadow bg-black relative flex flex-col justify-between min-h-[700px]">
          {/* Background image */}
          <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-70" style={{backgroundImage: "url('/images/section-bg-02.jpg')"}} />
          <div className="relative z-10 flex flex-col h-full justify-between p-8">
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-14">
              <span className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full shadow text-sm font-semibold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-gray-900">5.0</span>
              </span>
              <span className="text-white font-semibold text-sm">score from 10,000 rating</span>
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-14 pr-18">Learn from the best and create culinary magic at home.</h2>
              <p className="text-white text-md pr-16 mb-22 max-w-md">Get inspired by expert tips and techniques to perfect your skills. Explore recipes that help you master new dishes, adding confidence and creativity to your home cooking experience.</p>
              <button className="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition w-fit">View Recipes</button>
            </div>
          </div>
        </div>
        {/* Right Card */}
        <div className="rounded-xl overflow-hidden shadow bg-black relative flex flex-col justify-between min-h-[700px]">
          {/* Chef image as background */}
          <div className="absolute right-0 bottom-0 h-full w-full bg-cover bg-center rounded-r-xl  md:block" style={{backgroundImage: "url('/images/section-bg-03.jpg')", objectPosition: 'right'}} />
          <div className="relative z-10 flex flex-col h-full justify-between p-8">
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-14">
              <span className="flex items-center space-x-1 bg-white px-3 py-1.5 rounded-full shadow text-sm font-semibold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-gray-900">5.0</span>
              </span>
              <span className="text-gray-900 font-semibold text-sm">score from 10,000 rating</span>
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col ">
              <h2 className="text-2xl tracking-tight md:text-4xl font-bold text-black mb-12 pr-40">Add flavor, flair, and a touch of creativity to your meals.</h2>
              <p className="text-black  text-semibold text-md  mb-8 max-w-md pr-12 mb-22">Elevate your dishes with bold flavors and creative twists. From vibrant ingredients to expert techniques, discover recipes that transform your everyday cooking into something extraordinary.</p>
              <button className="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition w-fit">View Recipes</button>
            </div>
          </div>
        </div>
      </div>
      {/* Category Row */}
      <div className="flex flex-wrap justify-center gap-[21px]">
        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col items-center bg-white border border-gray-200 rounded-xl px-8 py-6 min-w-[120px] ">
            <div className="mb-2 text-gray-900">{cat.icon}</div>
            <div className="font-semibold text-base text-gray-900 mb-1">{cat.label}</div>
            <div className="text-gray-400 text-sm">{cat.count} Recipes</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;