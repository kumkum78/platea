// import React from 'react';
// import { MessageCircle, Clock } from 'lucide-react';

// const posts = [
//   {
//     id: 1,
//     category: 'HEALTH',
//     categoryColor: 'bg-red-500',
//     image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
//     title: 'Power Up Your Mornings: 5 Quick and Healthy Breakfast Ideas',
//     author: 'Olivia Thompson',
//     date: '7 months Ago',
//     comments: 4,
//     readTime: '5 Min Read',
//   },
//   {
//     id: 2,
//     category: 'SPOTLIGHTS',
//     categoryColor: 'bg-red-500',
//     image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
//     title: 'Master Knife Skills for Effortless Cooking Prep',
//     author: 'Olivia Thompson',
//     date: '7 months Ago',
//     comments: 4,
//     readTime: '5 Min Read',
//   },
//   {
//     id: 3,
//     category: 'COLLECTIONS',
//     categoryColor: 'bg-red-500',
//     image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
//     title: 'Savor Every Bite: A Celebration of Pizza Moments',
//     author: 'Olivia Thompson',
//     date: '7 months Ago',
//     comments: 4,
//     readTime: '5 Min Read',
//   },
// ];

// export default function OurJournal() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-16">
//       {/* Heading and subtitle */}
//       <div className="flex flex-col items-center mb-12">
//         <h2 className="text-4xl font-bold text-center mb-2">Our Journal</h2>
//         <p className="text-lg text-gray-600 text-center max-w-2xl">
//           Discover stories, tips, and trends to inspire your culinary journey and creativity!
//         </p>
//       </div>
//       {/* Blog Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {posts.map((post) => (
//           <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
//             {/* Image and badge */}
//             <div className="relative">
//               <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-t-2xl" />
//               <span className={`absolute top-4 left-4 px-4 py-1 rounded-lg text-xs font-bold text-white ${post.categoryColor}`}>{post.category}</span>
//             </div>
//             {/* Content */}
//             <div className="p-6 pb-4">
//               <h3 className="text-xl font-bold mb-4 leading-snug">{post.title}</h3>
//               <div className="flex items-center text-gray-500 text-sm flex-wrap gap-x-2 gap-y-1">
//                 <span>by <span className="font-bold text-black">{post.author}</span></span>
//                 <span className="mx-1">•</span>
//                 <span>{post.date}</span>
//                 <span className="mx-1">•</span>
//                 <MessageCircle className="inline w-4 h-4 mr-1" />
//                 <span>{post.comments}</span>
//               </div>
//               <div className="text-gray-400 text-xs mt-2 flex items-center gap-2">
//                 <Clock className="w-4 h-4" />
//                 <span>{post.readTime}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }














import { MessageCircle, Clock } from 'lucide-react';

export default function OurJournal() {
  const articles = [
    {
      id: 1,
      category: 'HEALTH',
      categoryColor: 'bg-red-500',
      title: 'Power Up Your Mornings: 5 Quick and Healthy Breakfast Ideas',
      author: 'Olivia Thompson',
      timeAgo: '7 months Ago',
      date: '7 months Ago',
      readTime: '5 Min Read',
      comments: '4',
      image: '/images/post-1-800x520.jpg'
    },
    {
      id: 2,
      category: 'SPOTLIGHTS',
      categoryColor: 'bg-red-500',
      title: 'Master Knife Skills for Effortless Cooking Prep',
      author: 'Olivia Thompson',
      timeAgo: '7 months Ago',
      date: '7 months Ago',
      readTime: '5 Min Read',
      comments: '4',
      image: '/images/post-2-800x520.jpg'
    },
    {
      id: 3,
      category: 'COLLECTIONS',
      categoryColor: 'bg-red-500',
      title: 'Savor Every Bite: A Celebration of Pizza Moments',
      author: 'Olivia Thompson',
      timeAgo: '7 months Ago',
      date: '7 months Ago',
      readTime: '5 Min Read',
      comments: '4',
      image: '/images/post-5-800x520.jpg'
    }
  ];

  return (
    <div className="max-w-[88%] mx-auto px-4 py-20 min-h-screen">
      {/* Header Section */}
      <div className="relative flex flex-col items-center text-center mb-18">
        <span className="absolute text-[8rem] opacity-15 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">🍴</span>
        <h2 className="text-5xl font-semibold tracking-tighter text-gray-900 z-10 mb-4">Our Journal</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto tracking-tighter">
          Discover stories, tips, and trends to inspire your culinary journey and creativity!
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white overflow-hidden">
            {/* Article Image */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover rounded-lg hover:cursor-pointer"
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4 hover:cursor-pointer">
                <span className={`${article.categoryColor} text-white text-xs font-bold px-3 py-2 rounded-md`}>
                  {article.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 pb-4">
              <h3 className="text-xl tracking-tighter font-bold mb-4 leading-snug text-black hover:text-red-500 hover:cursor-pointer">{article.title}</h3>
              <div className="flex items-center justify-between text-black text-sm  gap-y-1">
                <span>by <span className="font-bold text-black hover:text-red-500 hover:cursor-pointer">{article.author}</span></span>
                {/* <span className="mx-1">•</span> */}
                <div className='flex items-center text-sm text-semibold gap-x-1 text-gray-500 tracking-tighter'>
                <Clock className="w-4 h-4" />
                <span>{article.date}</span>
                </div>
                {/* <span className="mx-1">•</span> */}
                <div className='flex items-center text-xs text-gray-500 tracking-tighter'>
                <MessageCircle className="inline w-4 h-4 mr-1" />
                <span>{article.comments}</span>
                </div>
              </div>
              <div className="text-gray-500 text-bold text-xs mt-2 flex items-center gap-2">
                {/* <Clock className="w-4 h-4" /> */}
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}