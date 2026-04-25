import React from "react";
import { HiArrowRight, HiCalendar, HiClock } from "react-icons/hi";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt: "Explore the latest trends and technologies shaping the future of web development, from AI integration to advanced frameworks.",
      category: "Technology",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },

  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 sm:mb-16 text-center">
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
          Insights & Updates
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Latest articles on web development, design trends, and technology insights.
        </p>
      </header>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="bg-gray-800/30 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/50">
          <div className="flex flex-col lg:flex-row">
            {/* Featured Image */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
              <span className="text-gray-500 text-sm">Featured Article Preview</span>
            </div>
            
            {/* Featured Content */}
            <div className="lg:w-1/2 p-6 sm:p-8 md:p-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium">
                  Featured
                </span>
                <span className="text-gray-400 text-sm">Latest Update</span>
              </div>
              
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                The Complete Guide to Modern Web Architecture
              </h2>
              
              <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Learn how to structure modern web applications for scalability, performance, and maintainability. 
                This guide covers everything from microservices to serverless architecture.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-4 h-4" />
                    <span>Mar 20, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiClock className="w-4 h-4" />
                    <span>10 min read</span>
                  </div>
                </div>
                
                <button className="
                  flex items-center gap-2
                  px-4 py-2
                  bg-gray-800
                  text-white
                  rounded-lg
                  hover:bg-gray-700
                  transition-colors
                  group
                ">
                  <span>Read Article</span>
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="
                bg-gray-800/30
                rounded-xl sm:rounded-2xl
                border border-gray-700/50
                overflow-hidden
                hover:border-gray-600
                hover:bg-gray-800/40
                transition-all duration-300
                group
              "
            >
              {/* Post Image */}
              <div className="h-48 sm:h-56 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Article Preview</span>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="
                    px-3 py-1
                    bg-gray-900/80 backdrop-blur-sm
                    text-gray-300
                    rounded-full
                    text-xs font-medium
                  ">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-5 sm:p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="
                  text-white
                  text-lg sm:text-xl
                  font-semibold
                  mb-2 sm:mb-3
                  line-clamp-2
                  group-hover:text-yellow-400
                  transition-colors
                ">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="
                  text-gray-400
                  text-sm sm:text-base
                  mb-6
                  line-clamp-3
                  leading-relaxed
                ">
                  {post.excerpt}
                </p>

                {/* Read More Button */}
                <button className="
                  w-full
                  flex items-center justify-center gap-2
                  py-2
                  border border-gray-600
                  text-gray-300
                  rounded-lg
                  text-sm font-medium
                  hover:border-yellow-400
                  hover:text-yellow-400
                  transition-colors
                  group-hover:bg-gray-800/50
                ">
                  <span>Read More</span>
                  <HiArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="
            inline-flex items-center gap-3
            px-8 sm:px-10
            py-3 sm:py-4
            bg-gray-800
            border border-gray-700
            text-white
            rounded-full
            hover:bg-gray-700
            hover:border-gray-600
            transition-all duration-300
            group
          ">
            <span className="font-medium text-sm sm:text-base">View All Articles</span>
            <HiArrowRight className="
              w-4 h-4
              group-hover:translate-x-1
              transition-transform
            " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;