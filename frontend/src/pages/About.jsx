import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-16 px-4 md:px-6 bg-zinc-50/10'>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-8 bg-white border border-zinc-200 rounded-3xl shadow-sm'>
        <div className='w-full md:w-2/3 2xl:w-2/4'>
          <h1 className='text-3xl text-zinc-900 font-extrabold mb-5'>About the Creator</h1>
          <p className='text-justify leading-7 text-zinc-600 text-sm'>
            Krish Gaur is an aspiring DevOps and Web Developer with expertise in Java, JavaScript, Bash, HTML, CSS, Python, MySQL, and C++. Active participant in open-source programs like Hacktoberfest '22, SWoC '23, and KWoC '23. Committed to continuous learning for professional growth in the dynamic field of technology.
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[250px] rounded-2xl object-cover border border-zinc-100 shadow-sm' />
      </div>
    </div>
  );
};

export default About;
