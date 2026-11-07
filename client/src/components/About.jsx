import React from 'react'
import AboutPic from '../assets/director.jpg'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const About = () => {

  return (
    <section
      className="ct-container ct-section"
    >
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2
            className="ct-section-title
              text-black font-bold uppercase leading-tight
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl h1
            "
          >
            Behind <br className="hidden lg:block" /> The Pixels
          </h2>

          <p
            className="
              mt-4 sm:mt-6
              text-gray-600
              max-w-md
              text-sm sm:text-base md:text-lg
              leading-relaxed
            "
          >
            “Design is not just what it looks like and feels like. Design is how it works.
            Every pixel placed, every interaction crafted, every line of code optimized —
            we believe that true craftsmanship lives in the details that most people never notice,
            but everyone feels.”
            <span className="block mt-3 text-gray-600 text-xs sm:text-sm">
              — Inspired by Steve Jobs
            </span>
          </p>

          {/* BUTTON */}
          <div>
            <Link
                to="/about"
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

                  transition
                ">
                  <HiArrowRight className="text-black w-4 h-4 sm:w-5 sm:h-5 -rotate-45" />
                </span>
            </Link>
          </div>
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
