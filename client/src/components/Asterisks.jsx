import React from 'react'

const Asterisks = () => {
  return (
    <div className="px-10">
        <div className="relative flex items-center justify-center w-1 h-6 ">
                  <div className="absolute w-1/2 h-full bg-blue-300">
                    <div className="absolute w-full h-full bg-blue-300 rotate-45"></div>
                    <div className="absolute w-full h-full bg-blue-300 -rotate-45"></div>
                    <div className="absolute w-full h-full bg-blue-300 rotate-90"></div>

                  </div>
              </div>
    </div>
  )
}

export default Asterisks