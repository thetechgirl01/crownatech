import React from 'react'
import AboutPic from '../assets/director.jpg'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="px-auto  py-16 sm:py-24 max-w-7xl mx-auto">
      
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-20 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="
            text-black font-bold uppercase leading-tight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl h1
          ">
            Behind <br className="hidden lg:block" /> The Pixels
          </h1>

          <p className="
            mt-4 sm:mt-6
            text-gray-600
            max-w-md
            text-sm sm:text-base md:text-lg
            leading-relaxed
          ">
            “Excellence is not an act, but a habit. It is achieved through discipline,
            precision, and a commitment to doing things right even when no one is watching.
            That is why we focus on delivering quality, performance, and reliability in
            every line of code we write.”
            <span className="block mt-3 text-gray-400 text-xs sm:text-sm">
              — Inspired by Aristotle
            </span>
          </p>

          {/* BUTTON */}
          <Link to="/about">
          <a
            href="#"
            className="
              group
              mt-6 sm:mt-10
              inline-flex items-center justify-between gap-3
              border border-black
              rounded-full
              px-4 sm:px-6 py-2 sm:py-3
              text-sm sm:text-base
              hover:bg-black/5
              transition
            "
          >
            <span className="text-black font-medium">
              There's more to us
            </span>

            <span className="
              w-8 h-8 sm:w-9 sm:h-9
              bg-yellow-400
              rounded-full
              flex items-center justify-center
              group-hover:translate-x-1
              transition
            ">
              <HiArrowRight className="text-black w-4 h-4 sm:w-5 sm:h-5 -rotate-45" />
            </span>
          </a>
          
          </Link>
        </div>

        {/* RIGHT IMAGE SLICES */}
        <div className="flex justify-center lg:justify-end gap-4 sm:gap-6">
          
          {/* Slice 1 */}
          <div
            className="
              rounded-2xl sm:rounded-3xl
              w-[120px] h-[260px]
              sm:w-[180px] sm:h-[380px]
              lg:w-[210px] lg:h-[420px]
              bg-cover bg-no-repeat
            "
            style={{
              backgroundImage: `url(${AboutPic})`,
              backgroundSize: '300% 100%',
              backgroundPosition: 'left center',
            }}
          />

          {/* Slice 2 */}
          <div
            className="
              rounded-2xl sm:rounded-3xl
              w-[140px] h-[300px]
              sm:w-[210px] sm:h-[430px]
              lg:w-[240px] lg:h-[480px]
              bg-cover bg-no-repeat
            "
            style={{
              backgroundImage: `url(${AboutPic})`,
              backgroundSize: '300% 100%',
              backgroundPosition: 'center center',
            }}
          />

          {/* Slice 3 */}
          <div
            className="
              rounded-2xl sm:rounded-3xl
              w-[110px] h-[240px]
              sm:w-[160px] sm:h-[340px]
              lg:w-[190px] lg:h-[400px]
              bg-cover bg-no-repeat
            "
            style={{
              backgroundImage: `url(${AboutPic})`,
              backgroundSize: '300% 100%',
              backgroundPosition: 'right center',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default About
