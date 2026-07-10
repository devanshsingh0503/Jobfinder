import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { popularSearch } from "../utils/data";
import { HeroImage } from "../assets";

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full items-center gap-2 ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type='text'
        className='w-full p-2.5 text-sm bg-transparent outline-none text-zinc-750 placeholder-zinc-400 font-medium'
        placeholder={placeholder}
      />

      {value && (
        <AiOutlineCloseCircle
          className='hidden md:flex text-zinc-400 hover:text-zinc-600 text-lg cursor-pointer transition-colors mr-2'
          onClick={clearInput}
        />
      )}
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/60 via-zinc-50/50 to-white border-b border-zinc-100'>
      <div
        className={`container mx-auto px-5 ${
          type ? "h-[520px]" : "h-[360px]"
        } flex items-center relative`}
      >
        <div className='w-full lg:w-2/3 z-10'>
          <div className='mb-8 max-w-2xl'>
            <h1 className='text-zinc-900 font-extrabold text-4xl md:text-5xl tracking-tight leading-tight md:leading-none'>
              {title}
            </h1>
          </div>

          <div className='w-full flex items-center justify-between bg-white border border-zinc-200 p-2 shadow-lg rounded-2xl md:rounded-3xl gap-2 md:gap-4'>
            <SearchInput
              placeholder='Job Title or Keywords'
              icon={<AiOutlineSearch className='text-zinc-400 text-xl ml-2' />}
              value={searchQuery}
              setValue={setSearchQuery}
              styles='flex-1'
            />
            <div className='h-8 w-[1px] bg-zinc-200 hidden md:block'></div>
            <SearchInput
              placeholder='Add Country or City'
              icon={<CiLocationOn className='text-zinc-400 text-xl ml-2' />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex flex-1"}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title='Search'
                containerStyles={
                  "text-white font-bold py-2.5 md:py-3.5 px-6 md:px-10 focus:outline-none bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl md:rounded-2xl text-sm md:text-base shadow-sm"
                }
              />
            </div>
          </div>

          {type && (
            <div className='w-full flex flex-wrap gap-2 md:gap-3 py-8 md:py-10 items-center'>
              <span className='text-xs text-zinc-400 font-semibold uppercase tracking-wider mr-2'>Popular:</span>
              {popularSearch.map((search, index) => (
                <span
                  key={index}
                  className='bg-indigo-50/60 hover:bg-indigo-55 text-indigo-600 py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer'
                >
                  {search}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='hidden lg:block w-1/3 h-[90%] absolute bottom-0 right-16 2xl:right-[18rem]'>
          <img src={HeroImage} className='w-full h-full object-contain' />
        </div>
      </div>
    </div>
  );
};

export default Header;
