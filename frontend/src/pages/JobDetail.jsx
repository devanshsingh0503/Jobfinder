import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard } from "../components";

const JobDetail = () => {
  const params = useParams();
  const id = parseInt(params.id) - 1;
  const [job, setJob] = useState(jobs[0]);
  const [selected, setSelected] = useState("0");

  useEffect(() => {
    setJob(jobs[id ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className='container mx-auto px-4 md:px-6 py-8 md:py-12 bg-zinc-50/10'>
      <div className='w-full flex flex-col lg:flex-row gap-8 items-start'>
        {/* LEFT SIDE */}
        <div className='w-full h-fit lg:w-2/3 bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm'>
          <div className='w-full flex items-center justify-between border-b border-zinc-100 pb-6'>
            <div className='w-full flex gap-4 items-start'>
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className='w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-zinc-150 shadow-sm'
              />

              <div className='flex flex-col ml-1'>
                <h2 className='text-xl md:text-2xl font-extrabold text-zinc-900 leading-tight'>
                  {job?.jobTitle}
                </h2>

                <span className='text-xs md:text-sm text-zinc-500 font-semibold mt-1'>{job?.location}</span>

                <span className='text-xs md:text-sm text-indigo-600 font-bold hover:underline mt-1 cursor-pointer'>
                  {job?.company?.name}
                </span>

                <span className='text-zinc-400 text-xs font-semibold mt-2'>
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className='hidden md:block'>
              <AiOutlineSafetyCertificate className='text-4xl text-indigo-600' />
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 my-8'>
            <div className='bg-emerald-50/40 border border-emerald-100/60 p-4 rounded-2xl flex flex-col items-center justify-center text-center'>
              <span className='text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 mb-1'>Salary</span>
              <p className='text-base font-extrabold text-zinc-800'>
                $ {job?.salary}
              </p>
            </div>

            <div className='bg-indigo-50/40 border border-indigo-100/60 p-4 rounded-2xl flex flex-col items-center justify-center text-center'>
              <span className='text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 mb-1'>Job Type</span>
              <p className='text-base font-extrabold text-zinc-800'>
                {job?.jobType}
              </p>
            </div>

            <div className='bg-amber-50/40 border border-amber-100/60 p-4 rounded-2xl flex flex-col items-center justify-center text-center'>
              <span className='text-[10px] uppercase tracking-wider font-extrabold text-amber-600 mb-1'>Applicants</span>
              <p className='text-base font-extrabold text-zinc-800'>
                {job?.applicants?.length}K
              </p>
            </div>

            <div className='bg-violet-50/40 border border-violet-100/60 p-4 rounded-2xl flex flex-col items-center justify-center text-center'>
              <span className='text-[10px] uppercase tracking-wider font-extrabold text-violet-600 mb-1'>Vacancies</span>
              <p className='text-base font-extrabold text-zinc-800'>
                {job?.vacancies}
              </p>
            </div>
          </div>

          <div className='w-full flex gap-3 pb-6 border-b border-zinc-100'>
            <CustomButton
              onClick={() => setSelected("0")}
              title='Job Description'
              containerStyles={`w-1/2 flex items-center justify-center py-2.5 px-4 outline-none rounded-xl text-xs font-bold transition-all ${
                selected === "0"
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            />

            <CustomButton
              onClick={() => setSelected("1")}
              title='Company Details'
              containerStyles={`w-1/2 flex items-center justify-center py-2.5 px-4 outline-none rounded-xl text-xs font-bold transition-all ${
                selected === "1"
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            />
          </div>

          <div className='my-6 leading-relaxed text-sm text-zinc-600 space-y-4'>
            {selected === "0" ? (
              <div className='space-y-6'>
                <div>
                  <h3 className='text-base font-extrabold text-zinc-850 mb-2'>Job Description</h3>
                  <p className='text-zinc-600 leading-relaxed'>{job?.detail?.[0]?.desc}</p>
                </div>

                {job?.detail?.[0]?.requirement && (
                  <div>
                    <h3 className='text-base font-extrabold text-zinc-850 mb-2'>Requirements & Responsibilities</h3>
                    <p className='text-zinc-600 leading-relaxed'>{job?.detail?.[0]?.requirement}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className='space-y-6'>
                <div className='pb-4 border-b border-zinc-100'>
                  <h3 className='text-lg font-extrabold text-zinc-850'>{job?.company?.name}</h3>
                  <p className='text-xs text-zinc-500 font-semibold mt-1'>{job?.company?.location}</p>
                  <p className='text-xs text-indigo-650 font-bold mt-0.5'>{job?.company?.email}</p>
                </div>

                <div>
                  <h3 className='text-base font-extrabold text-zinc-850 mb-2'>About Company</h3>
                  <p className='text-zinc-600 leading-relaxed'>{job?.company?.about}</p>
                </div>
              </div>
            )}
          </div>

          <div className='w-full pt-4 border-t border-zinc-100 mt-6'>
            <CustomButton
              title='Apply Now'
              containerStyles={`w-full flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 py-3.5 px-6 outline-none rounded-xl text-base font-bold shadow-sm transition-all`}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='w-full lg:w-1/3 p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm sticky top-24'>
          <h3 className='text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-6'>Similar Job Posts</h3>

          <div className='flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1'>
            {jobs?.slice(0, 4).map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
