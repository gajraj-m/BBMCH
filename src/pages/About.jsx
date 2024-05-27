import React from 'react'
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative h-screen flex items-center justify-center">
        <div className="mt-4 rounded-lg" data-aos="zoom-out">
          <img
            // src={HeroImage}
            alt=""
            className="w-full rounded-lg opacity-60"
          />
        </div>
        <div className="absolute text-white text-center">
          <button className="text-xl hover:text-primary hover:scale-105 md:text-5xl font-bold w-2/3 mx-auto md:leading-normal tracking-wide mb-2 sm:mb-4 duration-200">
            STUDENTS&apos; ASSOCIATION BBMCH
          </button>
          <p className="text-lg">Balangir, Odisha</p>
        </div>
        <Button className="mt-8 text-gray-700 font-semibold hover:scale-105">
          Read More
        </Button>
      </div>
    </div>
  );
}

export default About