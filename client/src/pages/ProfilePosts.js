import React from 'react'
import img from "../components/img.jpg"

const ProfilePosts = () => {
  return (
   
    <div className="w-full flex mt-8 space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={img} className="h-full w-full object-cover"></img>
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          my name is wasim khan
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between">
          <p>@wasimDev</p>
          <div className="flex space-x-2">
            <p>18/09/23</p>
            <p>16:25</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          my name is wasim khanmy name is wasim khanmy name is wasim khanmy name
          is wasim khanmy name is wasim khanmy name is wasim khanmy name is
          wasim khanmy name is wasim khan  is wasim khanmy name is wasim khanmy name is wasim khanmy name is
          wasim khanmy name is wasim khan
        </p>
      </div>
    </div>
  )
}

export default ProfilePosts