import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?.id}`}>
      <div
        className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between border border-zinc-150 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 rounded-2xl p-5 group'
      >
        <div className='flex gap-4 items-start'>
          <img
            src={job?.company?.profileUrl || job?.profileUrl}
            alt={job?.company?.name || job?.name}
            className='w-12 h-12 rounded-xl object-cover border border-zinc-100'
          />

          <div className='overflow-hidden'>
            <p className='text-sm font-bold text-zinc-800 truncate group-hover:text-indigo-600 transition-colors'>{job?.jobTitle}</p>
            <span className='flex gap-1.5 items-center text-xs text-zinc-500 mt-1 font-medium'>
              <GoLocation className='text-zinc-400 text-xs' />
              {job?.location}
            </span>
          </div>
        </div>

        <div className='py-2 overflow-hidden flex-grow'>
          <p className='text-xs text-zinc-500 leading-relaxed line-clamp-4'>
            {job?.detail?.[0]?.desc}
          </p>
        </div>

        <div className='flex items-center justify-between pt-3 border-t border-zinc-100 mt-auto'>
          <span className='bg-indigo-50 text-indigo-600 py-1 px-3 rounded-full font-bold text-xs tracking-wide'>
            {job?.jobType}
          </span>
          <span className='text-zinc-400 text-xs font-medium'>
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
