import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ cmp }) => {
  return (
    <div className='w-full flex gap-4 items-center justify-between bg-white border border-zinc-150 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 group'>
      <div className='w-3/4 md:w-2/4 flex gap-4 items-center'>
        <Link to={`/company-profile/${cmp?._id}`}>
          <img
            src={cmp?.profileUrl}
            alt={cmp?.name}
            className='w-10 md:w-12 h-10 md:h-12 rounded-xl object-cover border border-zinc-100'
          />
        </Link>
        <div className='flex flex-col'>
          <Link
            to={`/company-profile/${cmp?._id}`}
            className='text-sm md:text-base font-bold text-zinc-800 hover:text-indigo-600 transition-colors truncate'
          >
            {cmp?.name}
          </Link>
          <span className='text-xs text-zinc-400 font-medium mt-0.5'>{cmp?.email}</span>
        </div>
      </div>

      <div className='hidden w-1/4 md:flex items-center'>
        <p className='text-sm text-zinc-500 font-medium'>{cmp?.location}</p>
      </div>

      <div className='w-1/4 flex flex-col items-center justify-center border-l border-zinc-100 pl-4'>
        <p className='text-sm font-extrabold text-indigo-600'>{cmp?.jobPosts?.length}</p>
        <span className='text-[10px] md:text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-0.5'>
          Jobs Posted
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
