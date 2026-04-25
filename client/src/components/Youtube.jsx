import React from 'react';
import { MdPlayArrow, MdChevronRight } from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';

const YoutubeSection = () => {
  const youtubeVideos = [
    {
      id: 1,
      title: "Building a Modern Dashboard with React & Tailwind CSS",
      description: "Learn how to create a responsive admin dashboard with modern UI patterns.",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "15:24",
      uploadDate: "2 days ago"
    },
    {
      id: 2,
      title: "Performance Optimization Techniques for Web Apps",
      description: "Advanced techniques to improve your web application's performance.",
      thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "22:18",
      uploadDate: "1 week ago"
    },
    {
      id: 3,
      title: "Modern Animations with Framer Motion & GSAP",
      description: "Create stunning animations and micro-interactions for your React applications.",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "18:45",
      uploadDate: "2 weeks ago"
    }
  ];

  return (
    <div className="py-10 sm:py-16">
      
      {/* HERO HEADER */}
      <header className="px-4 sm:px-6 max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="
                w-12 h-12
                bg-gradient-to-br from-red-500 to-red-700
                rounded-xl
                flex items-center justify-center
              ">
                <FaYoutube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white/70 text-sm font-medium uppercase tracking-wider">
                  Also on YouTube
                </h2>
                <h1 className="
                  text-white font-bold leading-tight
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  mt-1
                ">
                  Video Tutorials & Guides
                </h1>
              </div>
            </div>
            
            <p className="
              text-white/70
              text-base sm:text-lg md:text-xl
              leading-relaxed mt-4
            ">
              Check out our YouTube channel for web development tutorials, tech insights, 
              and behind-the-scenes content from CrownaTech.
            </p>
          </div>

          {/* FEATURED VIDEO */}
          <div className="
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl
            overflow-hidden
            max-w-2xl lg:max-w-md
            w-full
            hover:border-white/20
            transition-all duration-300
          ">
            <div className="relative">
              {/* Thumbnail */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Featured Video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Play Button */}
                <button className="
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  w-14 h-14
                  bg-red-600
                  rounded-full
                  flex items-center justify-center
                  hover:bg-red-700
                  hover:scale-110
                  transition-all duration-300
                ">
                  <MdPlayArrow className="w-7 h-7 text-white ml-1" />
                </button>

                {/* Duration */}
                <div className="
                  absolute bottom-4 right-4
                  px-2 py-1
                  bg-black/80 backdrop-blur-sm
                  rounded
                  text-white text-sm font-medium
                ">
                  42:18
                </div>
              </div>

              {/* Featured Content */}
              <div className="p-5">
                <h3 className="
                  text-white
                  text-lg font-bold
                  mb-2
                  line-clamp-2
                  hover:text-red-300
                  transition-colors
                ">
                  Complete Web Development Roadmap 2024
                </h3>

                <p className="
                  text-gray-300
                  text-sm
                  mb-4
                  line-clamp-2
                ">
                  Learn the exact path to become a full-stack developer with modern technologies.
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-white/50 text-xs">
                    3 days ago
                  </div>
                  <button className="
                    inline-flex items-center gap-1
                    text-red-400 text-sm font-medium
                    hover:text-red-300
                    transition-colors
                  ">
                    Watch Now
                    <MdChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* VIDEO GRID */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="
                group
                backdrop-blur-xl bg-white/5
                border border-white/10
                rounded-2xl
                overflow-hidden
                hover:bg-white/10
                hover:border-white/20
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Duration Overlay */}
                <div className="
                  absolute bottom-3 right-3
                  px-2 py-1
                  bg-black/80 backdrop-blur-sm
                  rounded
                  text-white text-xs font-medium
                ">
                  {video.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="
                  absolute inset-0
                  bg-black/40
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  flex items-center justify-center
                ">
                  <div className="
                    w-12 h-12
                    bg-red-600
                    rounded-full
                    flex items-center justify-center
                    transform scale-90 group-hover:scale-100
                    transition-transform duration-300
                  ">
                    <MdPlayArrow className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5">
                <h4 className="
                  text-white
                  text-lg font-bold
                  mb-2
                  line-clamp-2
                  group-hover:text-red-300
                  transition-colors
                ">
                  {video.title}
                </h4>

                <p className="
                  text-gray-300
                  text-sm
                  mb-4
                  line-clamp-2
                ">
                  {video.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-white/50 text-xs">
                    {video.uploadDate}
                  </div>
                  <button className="
                    inline-flex items-center gap-1
                    text-red-400 text-sm font-medium
                    hover:text-red-300
                    transition-colors
                  ">
                    Watch
                    <MdChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="mt-12 text-center">
          <a
            href="https://youtube.com/@crownatech"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex items-center gap-3
              px-8 py-4
              backdrop-blur-xl bg-white/5
              border border-white/10
              rounded-xl
              text-white font-semibold
              hover:bg-white/10
              hover:border-white/20
              hover:scale-105
              transition-all
            "
          >
            <FaYoutube className="w-6 h-6" />
            Visit CrownaTech on YouTube
            <MdChevronRight className="
              w-5 h-5
              group-hover:translate-x-1
              transition-transform
            " />
          </a>
        </div>
      </section>
    </div>
  );
};

export default YoutubeSection;