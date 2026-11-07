import React from 'react';
import { FaRocket, FaUsers, FaAward, FaLightbulb } from 'react-icons/fa';

// Register ScrollTrigger plugin

const AboutUs = () => {

  const stats = [
    { icon: <FaRocket className="w-6 h-6" />, value: "100+", label: "Projects Delivered" },
    { icon: <FaUsers className="w-6 h-6" />, value: "50+", label: "Happy Clients" },
    { icon: <FaAward className="w-6 h-6" />, value: "5+", label: "Years Experience" },
    { icon: <FaLightbulb className="w-6 h-6" />, value: "24/7", label: "Support Available" }
  ];

  const services = [
    {
      title: "Custom Web Development",
      description: "Tailored web applications built with modern technologies to meet your specific business needs."
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with functionality for optimal user experience."
    },
    {
      title: "Web Strategy & Consulting",
      description: "Expert guidance to help you make informed decisions about your digital presence and online strategy."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your goals, audience, and requirements to create a strategic plan."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes and prototypes to visualize the final product before development begins."
    },
    {
      step: "03",
      title: "Development",
      description: "Building your solution with clean, efficient code using the latest technologies and best practices."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Deploying your project and providing ongoing support to ensure optimal performance."
    }
  ];

  return (
    <div className="min-h-screen">

      {/* HERO SECTION - Same as Hero.jsx */}
      <div className="ct-page-header">
        <section className="ct-container">
          <div className="w-full">
            <div className="about-header flex flex-col items-start text-left">

              <h1 className="ct-page-heading
                text-white font-bold leading-tight
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                mb-6
              ">
                Building Digital Excellence
              </h1>

              <p className="
                text-white/70
                text-base sm:text-lg md:text-xl
                leading-relaxed max-w-3xl mb-12
              ">
                We are a passionate team of web developers and designers dedicated to creating
                exceptional digital experiences. Based in Lagos, Nigeria, we serve clients
                worldwide with cutting-edge web solutions.
              </p>

              {/* STATS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-card"
                  >
                    <div className="
                      backdrop-blur-xl bg-white/5
                      border border-white/10
                      rounded-xl
                      p-6
                      text-center
                      transition-all duration-300
                      hover:bg-white/10
                    ">
                      <div className="
                        w-12 h-12
                        bg-white
                        rounded-xl
                        flex items-center justify-center
                        mx-auto mb-4
                      ">
                        <div className="text-black">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-white text-2xl font-bold">
                        {stat.value}
                      </div>
                      <div className="text-muted text-sm mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* REST OF THE CONTENT - Full width */}
      <div className="ct-container">

        {/* OUR APPROACH SECTION */}
        <section className="mb-16 md:mb-24">
          <div className="mb-8">
            <h2 className="
              text-white
              text-2xl sm:text-3xl md:text-4xl font-bold
              mb-4
            ">
              Our Approach
            </h2>
            <p className="
              text-white/70
              text-base sm:text-lg
              max-w-3xl
            ">
              We follow a structured process to ensure every project meets the highest standards of quality and delivers real value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((item, index) => (
              <div
                key={index}
                className="
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  rounded-xl
                  p-6
                  transition-all duration-300
                  hover:bg-white/10
                "
              >
                <div className="
                  text-white text-3xl font-bold
                  mb-4
                  opacity-60
                ">
                  {item.step}
                </div>
                <h3 className="
                  text-white
                  text-xl font-bold
                  mb-3
                ">
                  {item.title}
                </h3>
                <p className="
                  text-muted
                  text-sm leading-relaxed
                ">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="mb-16 md:mb-24">
          <div className="mb-8">
            <h2 className="
              text-white
              text-2xl sm:text-3xl md:text-4xl font-bold
              mb-4
            ">
              What We Offer
            </h2>
            <p className="
              text-white/70
              text-base sm:text-lg
              max-w-3xl
            ">
              Comprehensive web solutions tailored to your business objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  rounded-xl
                  p-6
                  transition-all duration-300
                  hover:bg-white/10
                "
              >
                <h3 className="
                  text-white
                  text-xl font-bold
                  mb-4
                ">
                  {service.title}
                </h3>
                <p className="
                  text-muted
                  text-sm leading-relaxed
                ">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="mb-16 md:mb-24">
          <div className="
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl
            p-6 sm:p-8 md:p-12
          ">
            <div className="flex items-center gap-4 mb-6">
              <div className="
                w-12 h-12
                bg-white
                rounded-lg
                flex items-center justify-center
              ">
                <FaLightbulb className="w-6 h-6 text-black" />
              </div>
              <h2 className="
                text-white
                text-2xl sm:text-3xl font-bold
              ">
                Why Choose CrownTech
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="
                  text-white/70
                  text-base sm:text-lg
                  leading-relaxed mb-6
                ">
                  We combine technical expertise with creative thinking to deliver solutions that not only look great but perform exceptionally. Every project is treated as a partnership, with clear communication and transparent processes from start to finish.
                </p>

                <p className="
                  text-white/70
                  text-base sm:text-lg
                  leading-relaxed
                ">
                  Our commitment to quality and attention to detail ensures that we deliver solutions that are scalable, maintainable, and aligned with your long-term business goals.
                </p>
              </div>

              <div className="space-y-4">
                <div className="
                  p-4
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  rounded-xl
                ">
                  <h4 className="text-white font-bold mb-2">Technical Excellence</h4>
                  <p className="text-muted text-sm">
                    Clean code, modern frameworks, and scalable architecture
                  </p>
                </div>

                <div className="
                  p-4
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  rounded-xl
                ">
                  <h4 className="text-white font-bold mb-2">Client-Focused</h4>
                  <p className="text-muted text-sm">
                    Your goals are our priority, with regular updates and collaboration
                  </p>
                </div>

                <div className="
                  p-4
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  rounded-xl
                ">
                  <h4 className="text-white font-bold mb-2">Quality Assurance</h4>
                  <p className="text-muted text-sm">
                    Rigorous testing and quality checks at every stage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
