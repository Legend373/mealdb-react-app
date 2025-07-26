import React from 'react'
import hero from '../assets/hero.jpg'


const Hero = () => {
    return (
        <div
            className="relative w-full h-80 sm:h-[22rem] bg-cover bg-center"
            style={{ backgroundImage: `url(${hero})` }}
        >

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>


            <div className="absolute inset-0 flex items-center justify-center z-10 text-center text-white p-4">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-bold">Welcome to Meal Explorer</h1>
                    <p className="text-sm sm:text-lg mt-2">Find your favorite meals from around the world</p>
                </div>
            </div>
        </div>


    )
}

export default Hero
