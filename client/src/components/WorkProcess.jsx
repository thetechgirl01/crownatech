import React from "react";

const steps = [
  {
    title: "Idea & Research",
    description: "Understand client needs, research the market, and plan a strategy for success.",
  },
  {
    title: "Design & Prototype",
    description: "Create wireframes, UI/UX designs, and interactive prototypes for approval.",
  },
  {
    title: "Development",
    description: "Code the project using modern, scalable technologies with clean architecture.",
  },
  {
    title: "Launch & Support",
    description: "Deploy the project, monitor performance, and provide ongoing support.",
  },
];

const Workprocess = () => {
  return (
    <div className="min-h-fit  py-12 sm:py-16 md:py-20 px-auto ">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 sm:mb-16 text-center">
        <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
          Our Work Process
        </h1>
        <p className="text-black text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A clear and simple 4-step process to ensure every project is delivered efficiently and with excellence.
        </p>
      </header>

      {/* Steps Container */}
      <div className="max-w-6xl mx-auto px-auto">
        {/* Desktop Layout */}
        <div className="hidden sm:flex items-start justify-between relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative w-1/4 px-2">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-3/4 w-1/2 h-0.5 bg-gray-700"></div>
              )}

              {/* Step Number */}
              <div className="
                w-10 h-10 md:w-12 md:h-12
                bg-gray-800
                border border-gray-700
                rounded-lg
                flex items-center justify-center
                mb-4 sm:mb-6
                relative z-10
              ">
                <span className="text-white font-medium text-sm md:text-base">{index + 1}</span>
              </div>

              {/* Title */}
              <h3 className="text-blue-400 font-semibold text-lg md:text-xl mb-2 sm:mb-3 text-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-black text-sm md:text-base text-center leading-relaxed px-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden">
          {steps.map((step, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex items-start gap-4">
                {/* Step Number */}
                <div className="
                  w-10 h-10
                  bg-gray-800
                  border border-gray-700
                  rounded-lg
                  flex items-center justify-center
                  flex-shrink-0
                ">
                  <span className="text font-medium text-sm">{index + 1}</span>
                </div>
                

                {/* Content */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {step.title}
                  </h3>
                  

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Mobile divider */}
              {index < steps.length - 1 && (
                <div className="w-0.5 h-4 bg-gray-700 ml-5 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Stats Section */}
    
    </div>
  );
};

export default Workprocess;