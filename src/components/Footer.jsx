// import React from 'react';

// const tags = [
//   'COMFORT FOOD', 'DAIRY-FREE', 'DESSERTS', 'GLUTEN-FREE', 'HEALTHY', 'HIGH-PROTEIN', 'HOLIDAY', 'KID-FRIENDLY',
//   'LOW-CARB', 'MEAL PREP', 'MEAT', 'ONE-POT', 'QUICK MEALS', 'SPICY', 'VEGETARIAN', 'VIDEO RECIPE'
// ];

// const navLinks = [
//   'All Recipes', 'Video Recipes', 'A-Z Recipes', 'Refund Policy', 'Terms and Conditions', 'Contact Us'
// ];

// const socialIcons = [
//   {
//     name: 'Instagram',
//     svg: (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
//     )
//   },
//   {
//     name: 'X',
//     svg: (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
//     )
//   },
//   {
//     name: 'YouTube',
//     svg: (
//       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.752 2.752 0 0 0-1.936-1.947C18.2 6 12 6 12 6s-6.2 0-7.864.054A2.752 2.752 0 0 0 2.2 8.001C2 9.664 2 12 2 12s0 2.336.2 3.999a2.752 2.752 0 0 0 1.936 1.947C5.8 18 12 18 12 18s6.2 0 7.864-.054A2.752 2.752 0 0 0 21.8 15.999C22 14.336 22 12 22 12s0-2.336-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
//     )
//   },
//   {
//     name: 'Pinterest',
//     svg: (
//       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.084 2.438 7.563 6.188 8.938-.086-.76-.163-1.926.034-2.755.178-.76 1.145-4.84 1.145-4.84s-.292-.584-.292-1.447c0-1.355.786-2.368 1.765-2.368.832 0 1.234.624 1.234 1.372 0 .836-.532 2.086-.807 3.25-.23.97.487 1.76 1.444 1.76 1.733 0 2.899-2.227 2.899-4.86 0-2.01-1.357-3.513-3.83-3.513-2.788 0-4.522 2.09-4.522 4.42 0 .836.32 1.734.72 2.222.08.098.09.184.066.282-.072.29-.234.97-.266 1.104-.04.17-.13.207-.302.125-1.13-.526-1.836-2.176-1.836-3.502 0-2.857 2.41-6.285 7.18-6.285 3.84 0 6.37 2.783 6.37 5.775 0 3.95-2.195 6.89-5.45 6.89-1.09 0-2.116-.59-2.465-1.26l-.67 2.55c-.19.74-.56 1.67-.84 2.24.63.194 1.3.3 2 .3 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
//     )
//   }
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-gray-50 pt-22 pb-0">
//       {/* Popular Tags Section */}
//       <div className="max-w-5xl mx-auto text-center mb-20">
//         <h2 className="text-4xl font-bold mb-4 text-black">Explore Popular Tags</h2>
//         <p className="text-gray-500 text-semibold text-md mb-8 tracking-tight">From quick meals to healthy dishes, our popular tags make it easy to explore delicious options with one click.</p>
//         <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
//           {tags.map(tag => (
//             <span key={tag} className="bg-white text-xs text-black font-bold rounded-full px-4 py-[10px] text-base mb-2 inline-block">
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//       {/* Footer Navigation and Socials */}
//       <div className="bg-white pt-10 pb-4">
//         <div className="max-w-5xl mx-auto flex gap-18 items-center">
//           {/* Social Icons */}
//           <div className="flex space-x-1 mb-4">
//             {socialIcons.map(icon => (
//               <span key={icon.name} className="bg-gray-200 text-gray-800 text-bold rounded-full p-3 flex items-center justify-center hover:bg-gray-300 transition">
//                 {icon.svg}
//               </span>
//             ))}
//           </div>
//           {/* Navigation Links */}
//           <div className="flex flex-wrap justify-center gap-x-12 gap-y-2 mb-4 font-semibold text-black text-sm">
//             {navLinks.map(link => (
//               <a key={link} href="#" className="hover:underline">
//                 {link}
//               </a>
//             ))}
//           </div>
//           </div>
//           {/* Copyright and Logo */}
//           <div className="w-full border-t border-gray-200 mt-6 pt-6 text-center">
//             <p className="text-gray-500 mb-3 text-sm">
//               Platea offers a world of delicious recipes, cooking inspiration, and culinary tips. Explore new flavors, master techniques, and bring your passion for cooking to life.
//             </p>
//             <p className="text-black text-semibold tracking-tighter text-sm mb-3">© 2025 Platea. All rights reserved. Designed by <a href="#" className=" hover:text-red-500">Gloria Themes</a>.</p>
//             <div className="flex justify-center items-center mt-2">
//               <svg className="w-8 h-8 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
//               <span className="text-lg font-bold text-red-500">Platea</span>
//             </div>
//           </div>
        
//       </div>
//     </footer>
//   );
// }

import React from 'react';

const tags = [
  'COMFORT FOOD', 'DAIRY-FREE', 'DESSERTS', 'GLUTEN-FREE', 'HEALTHY', 'HIGH-PROTEIN', 'HOLIDAY', 'KID-FRIENDLY',
  'LOW-CARB', 'MEAL PREP', 'MEAT', 'ONE-POT', 'QUICK MEALS', 'SPICY', 'VEGETARIAN', 'VIDEO RECIPE'
];

const navLinks = [
  'All Recipes', 'Video Recipes', 'A-Z Recipes', 'Refund Policy', 'Terms and Conditions', 'Contact Us'
];

const socialIcons = [
  {
    name: 'Instagram',
    svg: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    )
  },
  {
    name: 'X',
    svg: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
    )
  },
  {
    name: 'YouTube',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.752 2.752 0 0 0-1.936-1.947C18.2 6 12 6 12 6s-6.2 0-7.864.054A2.752 2.752 0 0 0 2.2 8.001C2 9.664 2 12 2 12s0 2.336.2 3.999a2.752 2.752 0 0 0 1.936 1.947C5.8 18 12 18 12 18s6.2 0 7.864-.054A2.752 2.752 0 0 0 21.8 15.999C22 14.336 22 12 22 12s0-2.336-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
    )
  },
  {
    name: 'Pinterest',
    svg: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.084 2.438 7.563 6.188 8.938-.086-.76-.163-1.926.034-2.755.178-.76 1.145-4.84 1.145-4.84s-.292-.584-.292-1.447c0-1.355.786-2.368 1.765-2.368.832 0 1.234.624 1.234 1.372 0 .836-.532 2.086-.807 3.25-.23.97.487 1.76 1.444 1.76 1.733 0 2.899-2.227 2.899-4.86 0-2.01-1.357-3.513-3.83-3.513-2.788 0-4.522 2.09-4.522 4.42 0 .836.32 1.734.72 2.222.08.098.09.184.066.282-.072.29-.234.97-.266 1.104-.04.17-.13.207-.302.125-1.13-.526-1.836-2.176-1.836-3.502 0-2.857 2.41-6.285 7.18-6.285 3.84 0 6.37 2.783 6.37 5.775 0 3.95-2.195 6.89-5.45 6.89-1.09 0-2.116-.59-2.465-1.26l-.67 2.55c-.19.74-.56 1.67-.84 2.24.63.194 1.3.3 2 .3 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 pb-0 lg:pt-22">
      {/* Popular Tags Section */}
      <div className="max-w-5xl mx-auto text-center mb-12 px-4 sm:px-6 lg:px-0 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-black">Explore Popular Tags</h2>
        <p className="text-gray-500 text-semibold text-sm lg:text-md mb-6 lg:mb-8 tracking-tight">From quick meals to healthy dishes, our popular tags make it easy to explore delicious options with one click.</p>
        <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 lg:gap-x-4 gap-y-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="bg-white text-xs sm:text-sm lg:text-sm tracking-tighter text-black font-bold rounded-full px-3 sm:px-4 lg:px-4 py-2 lg:py-[10px] mb-2 inline-block whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Footer Navigation and Socials */}
      <div className="bg-white pt-6 lg:pt-10 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row lg:gap-14 lg:items-center gap-6">
            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start space-x-1 lg:mb-4 order-2 lg:order-1">
              {socialIcons.map(icon => (
                <span key={icon.name} className="bg-gray-200 text-gray-800 text-bold rounded-full p-2 lg:p-4 flex items-center justify-center hover:bg-gray-300 transition cursor-pointer">
                  {icon.svg}
                </span>
              ))}
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center lg:justify-center gap-x-4 sm:gap-x-6 lg:gap-x-10 gap-y-2 lg:mb-4 font-bold text-black text-xs sm:text-sm lg:text-sm order-1 lg:order-2">
              {navLinks.map(link => (
                <a key={link} href="#" className="hover:underline whitespace-nowrap">
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          {/* Copyright and Logo */}
          <div className="w-full border-t border-gray-200 mt-6 pt-7 text-center">
            <p className="text-gray-600 mb-4 text-md tracking-tighter lg:text-md text-semibold">
              Platea offers a world of delicious recipes, cooking inspiration, and culinary tips. Explore new flavors, master techniques, and bring your passion for cooking to life.
            </p>
            <p className="text-black text-semibold tracking-tighter text-md lg:text-md mb-4">
              © 2025 Platea. All rights reserved. Designed by <a href="#" className="hover:text-red-500">Gloria Themes</a>.
            </p>
            <div className="flex justify-center items-center mt-2">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-base lg:text-lg font-bold text-red-500">Platea</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}