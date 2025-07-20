// import React from "react";

// const Hero = () => {
//   return (
//     <section
//       className="w-full sm:w-[95%] lg:w-[98%] mx-auto min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-6 py-4 sm:py-6 lg:py-12 rounded-none sm:rounded-2xl lg:rounded-3xl relative"
//       style={{
//         backgroundImage: `url('/images/search-hero-2.jpg')`,
//       }}
//     >
//       {/* Overlay for better text readability */}
//       {/* <div className="absolute inset-0 bg-black/20 rounded-none sm:rounded-2xl lg:rounded-3xl"></div> */}
      
//       <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 relative z-10">
//         {/* Left Section - Text and Search */}
//         <div className="flex-1 text-left">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 lg:mb-6">
//              You don't know how to make
//             <span className="lg:block inline"> the dish you have in mind?</span>
//           </h1>
          
//           <p className="text-sm sm:text-base lg:text-md text-gray-900 leading-relaxed max-w-2xl mb-3 sm:mb-4 lg:mb-6">
//             Feed your imagination and spark your creativity. From cravings to creations, let your ideas flourish and uncover the perfect recipe waiting to be discovered.
//           </p>
          
//           <div className="relative max-w-2xl mb-2 sm:mb-3 lg:mb-4">
//             <div className="flex items-center bg-white rounded-lg sm:rounded-xl lg:rounded-xl shadow-lg border border-gray-200">
//               <div className="flex items-center px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 lg:py-4">
//                 <svg
//                   className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-500"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Find what do you want to cook today"
//                 className="flex-grow px-2 sm:px-3 lg:px-4 py-3 sm:py-3.5 lg:py-4 outline-none text-gray-700 placeholder:text-gray-600 text-sm sm:text-base lg:text-md"
//               />
//               <button className="bg-red-500 text-white p-3 sm:p-3.5 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-xl hover:bg-red-600 transition-colors mr-1">
//                 <svg
//                   className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
          
//           <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl">
//             Type a keyword and discover recipes that turn your cravings into delicious reality!
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React from "react";

const Hero = () => {
  return (
    <section
      className="w-full sm:w-[95%] lg:w-[98%] mx-auto min-h-[50vh] sm:min-h-[60vh] lg:min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-6 py-2 sm:py-3 lg:py-12 rounded-none sm:rounded-2xl lg:rounded-3xl relative"
      style={{
        backgroundImage: `url('/images/search-hero-2.jpg')`,
      }}
    >
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-black/20 rounded-none sm:rounded-2xl lg:rounded-3xl"></div> */}
      
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-4 sm:gap-5 lg:gap-12 relative z-10">
        {/* Left Section - Text and Search */}
        <div className="flex-1 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2 sm:mb-2 lg:mb-6">
             You don't know how to make
            <span className="lg:block inline"> the dish you have in mind?</span>
          </h1>
          
          <p className="text-md sm:text-base lg:text-lg text-black leading-relaxed lg:max-w-2xl max-w-xl mb-2 sm:mb-2 lg:mb-6">
            Feed your imagination and spark your creativity. From cravings to creations, let your ideas flourish and uncover the perfect recipe waiting to be discovered.
          </p>
          
          <div className="relative max-w-2xl mb-1 sm:mb-1 lg:mb-4">
            <div className="flex items-center bg-white rounded-lg sm:rounded-xl lg:rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 lg:py-4">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Find what do you want to cook today"
                className="flex-grow px-2 sm:px-3 lg:px-4 py-3 sm:py-3.5 lg:py-4 outline-none text-gray-700 placeholder:text-gray-600 text-sm sm:text-base lg:text-md"
              />
              <button className="bg-red-500 text-white p-3 sm:p-3.5 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-xl hover:bg-red-600 transition-colors mr-1">
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm lg:text-base tracking-tighter text-gray-600 max-w-2xl">
            Type a keyword and discover recipes that turn your cravings into delicious reality!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;



