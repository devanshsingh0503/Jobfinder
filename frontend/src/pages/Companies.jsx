import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyCard, CustomButton, Header, ListBox } from "../components";
import { companies } from "../utils/data";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState(companies ?? []);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {};
  const handleShowMore = () => {};

  return (
    <div className='w-full'>
      <Header
        title='Find Your Dream Company'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setSearchQuery}
      />

      <div className='container mx-auto flex flex-col gap-6 px-4 md:px-6 py-8 md:py-12 bg-zinc-50/10'>
        <div className='flex items-center justify-between pb-4 border-b border-zinc-150'>
          <p className='text-xs md:text-sm text-zinc-500 font-medium'>
            Showing: <span className='font-bold text-zinc-800'>1,902</span> Companies Available
          </p>

          <div className='flex items-center gap-3'>
            <span className='text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-400'>Sort By:</span>
            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full'>
          {data?.map((cmp, index) => (
            <CompanyCard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className='col-span-full py-10 flex justify-center'>
              <Loading />
            </div>
          )}
        </div>

        <div className='flex justify-between items-center border-t border-zinc-150 pt-6 mt-4'>
          <p className='text-xs font-semibold text-zinc-400'>
            Showing {data?.length} records out of {recordsCount}
          </p>

          {numPage > page && !isFetching && (
            <CustomButton
              onClick={handleShowMore}
              title='Load More'
              containerStyles={`bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm focus:outline-none`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
