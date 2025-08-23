'use client'
import { TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Hero = () => {
 
  return (
    <>
      <section className="bg-[url('/image.png')] bg-cover bg-center bg-no-repeat   text-center text-white">
        <div className="bg-black/30 p-10 ">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Blog</h2>
          <p className="text-lg">
            Explore the latest posts, stories, and updates from developers and
            writers.
          </p>
        </div>
       
      </section>
    </>
  );
};

export default Hero;
