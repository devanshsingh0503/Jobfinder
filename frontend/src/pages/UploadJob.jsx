import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomButton, JobCard, JobTypes, TextInput } from "../components";
import { jobs } from "../utils/data";
import { apiRequest } from "../utils";

const UploadJob = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { user } = useSelector((state) => state.user);

  const [errMsg, setErrMsg] = useState("");
  const [jobTitle, setJobTitle] = useState("Full-Time");

  if (user?.accountType === "seeker") {
    window.location.replace("/");
    return null;
  }

  const onSubmit = async (data) => {
    setErrMsg("");
    try {
      const newData = {
        ...data,
        jobType: jobTitle,
        requirements: data.resposibilities || data.desc,
      };
      
      const res = await apiRequest({
        url: "/jobs/upload-job",
        token: user?.token,
        data: newData,
        method: "POST",
      });

      if (res?.success) {
        window.location.replace("/company-profile");
      } else {
        setErrMsg(res?.message || "Failed to post job");
      }
    } catch (error) {
      console.log(error);
      setErrMsg("Failed to post job");
    }
  };

  return (
    <div className='container mx-auto flex flex-col lg:flex-row gap-8 px-4 md:px-6 py-10 bg-zinc-50/10'>
      <div className='w-full h-fit lg:w-2/3 bg-white border border-zinc-200 p-6 md:p-10 shadow-sm rounded-3xl'>
        <div>
          <h2 className='text-zinc-900 font-extrabold text-2xl pb-4 border-b border-zinc-150 mb-6'>Post a New Job</h2>

          <form
            className='w-full flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='jobTitle'
              label='Job Title'
              placeholder='eg. Software Engineer'
              type='text'
              required={true}
              register={register("jobTitle", {
                required: "Job Title is required",
              })}
              error={errors.jobTitle ? errors.jobTitle?.message : ""}
            />

            <div className='w-full flex gap-4'>
              <div className={`w-1/2 flex flex-col mt-2.5`}>
                <label className='text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2'>Job Type</label>
                <JobTypes jobTitle={jobTitle} setJobTitle={setJobTitle} />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='salary'
                  label='Salary (USD)'
                  placeholder='eg. 1500'
                  type='number'
                  register={register("salary", {
                    required: "Salary is required",
                  })}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <TextInput
                  name='vacancies'
                  label='No. of Vacancies'
                  placeholder='vacancies'
                  type='number'
                  register={register("vacancies", {
                    required: "Vacancies is required!",
                  })}
                  error={errors.vacancies ? errors.vacancies?.message : ""}
                />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='experience'
                  label='Years of Experience'
                  placeholder='experience'
                  type='number'
                  register={register("experience", {
                    required: "Experience is required",
                  })}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>
            </div>

            <TextInput
              name='location'
              label='Job Location'
              placeholder='eg. New York'
              type='text'
              register={register("location", {
                required: "Job Location is required",
              })}
              error={errors.location ? errors.location?.message : ""}
            />
            <div className='flex flex-col mt-2'>
              <label className='text-zinc-550 text-xs font-bold uppercase tracking-wider mb-2'>
                Job Description
              </label>
              <textarea
                className='block w-full rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 transition-all duration-200 resize-none'
                rows={4}
                cols={6}
                {...register("desc", {
                  required: "Job Description is required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
              {errors.desc && (
                <span role='alert' className='text-xs text-rose-500 mt-1.5 font-bold'>
                  {errors.desc?.message}
                </span>
              )}
            </div>

            <div className='flex flex-col mt-2'>
              <label className='text-zinc-550 text-xs font-bold uppercase tracking-wider mb-2'>
                Core Responsibilities
              </label>
              <textarea
                className='block w-full rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 transition-all duration-200 resize-none'
                rows={4}
                cols={6}
                {...register("resposibilities")}
              ></textarea>
            </div>

            {errMsg && (
              <span role='alert' className='text-xs text-rose-500 mt-1 font-bold'>
                {errMsg}
              </span>
            )}
            <div className='mt-4'>
              <CustomButton
                type='submit'
                containerStyles='inline-flex justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 text-sm font-bold shadow-sm transition-all focus:outline-none'
                title='Submit'
              />
            </div>
          </form>
        </div>
      </div>
      <div className='w-full lg:w-1/3 p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm sticky top-24'>
        <p className='text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-6'>Recent Job Posts</p>

        <div className='flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1'>
          {jobs.slice(0, 4).map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadJob;
