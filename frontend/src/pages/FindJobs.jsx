import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../components/Header";
import { experience, jobTypes, jobs } from "../utils/data";
import { CustomButton, JobCard, ListBox } from "../components";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = async (e) => {
    setFilterExp(e);
  };

  return (
    <div>
      <Header
        title='Find Your Dream Job with Ease'
        type='home'
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className='container mx-auto flex gap-8 px-4 md:px-6 py-6 md:py-10 bg-zinc-50/10'>
        <div className='hidden md:flex flex-col w-1/4 h-fit bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm sticky top-24'>
          <p className='text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-6'>Filter Search</p>

          <div className='pb-4 border-b border-zinc-100'>
            <div className='flex justify-between items-center mb-4'>
              <p className='flex items-center gap-2 text-sm font-bold text-zinc-800'>
                <BiBriefcaseAlt2 className='text-indigo-600 text-lg' />
                Job Type
              </p>

              <button className='text-zinc-400 hover:text-zinc-600 transition-colors'>
                <MdOutlineKeyboardArrowDown className='text-lg' />
              </button>
            </div>

            <div className='flex flex-col gap-3'>
              {jobTypes.map((jtype, index) => (
                <label key={index} className='flex items-center gap-3 text-xs md:text-sm font-medium text-zinc-600 hover:text-zinc-955 transition-colors cursor-pointer'>
                  <input
                    type='checkbox'
                    value={jtype}
                    className='rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300 w-4 h-4 cursor-pointer transition-all'
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='pt-6'>
            <div className='flex justify-between items-center mb-4'>
              <p className='flex items-center gap-2 text-sm font-bold text-zinc-800'>
                <BsStars className='text-indigo-600 text-lg' />
                Experience
              </p>

              <button className='text-zinc-400 hover:text-zinc-600 transition-colors'>
                <MdOutlineKeyboardArrowDown className='text-lg' />
              </button>
            </div>

            <div className='flex flex-col gap-3'>
              {experience.map((exp) => (
                <label key={exp.title} className='flex items-center gap-3 text-xs md:text-sm font-medium text-zinc-600 hover:text-zinc-955 transition-colors cursor-pointer'>
                  <input
                    type='checkbox'
                    value={exp?.value}
                    className='rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300 w-4 h-4 cursor-pointer transition-all'
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full md:w-3/4'>
          <div className='flex items-center justify-between mb-6 pb-4 border-b border-zinc-150'>
            <p className='text-xs md:text-sm text-zinc-500 font-medium'>
              Showing: <span className='font-bold text-zinc-800'>1,902</span> Jobs Available
            </p>

            <div className='flex items-center gap-3'>
              <span className='text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-400'>Sort By:</span>
              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {jobs.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>

          {numPage > page && !isFetching && (
            <div className='w-full flex items-center justify-center pt-16'>
              <CustomButton
                title='Load More'
                containerStyles={`bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm focus:outline-none`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
