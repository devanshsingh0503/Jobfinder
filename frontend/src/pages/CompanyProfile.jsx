import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { companies, jobs } from "../utils/data";
import { CustomButton, JobCard, Loading, TextInput } from "../components";
import { apiRequest, handleFileUpload } from "../utils";
import { Login } from "../redux/userSlice";

const CompnayForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");

  const onSubmit = async (data) => {
    try {
      const uri = profileImage && (await handleFileUpload(profileImage));

      const newData = uri
        ? {
            ...data,
            profileUrl: uri,
          }
        : data;

      const res = await apiRequest({
        url: "/companies/update-company",
        token: user?.token,
        data: newData,
        method: "PUT",
      });

      if (res) {
        const newUser = { token: user?.token, ...res?.company };
        dispatch(Login(newUser));
        localStorage.setItem("userInfo", JSON.stringify(newUser));
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={opener ?? false} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-3xl bg-white border border-zinc-150 p-8 text-left align-middle shadow-2xl transition-all text-zinc-800'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-extrabold text-zinc-900'
                  >
                    Edit Company Profile
                  </Dialog.Title>

                  <form
                    className='w-full mt-4 flex flex-col gap-4'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name='name'
                      label='Company Name'
                      type='text'
                      register={register("name", {
                        required: "Company Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <TextInput
                      name='location'
                      label='Location/Address'
                      placeholder='eg. California'
                      type='text'
                      register={register("location", {
                        required: "Address is required",
                      })}
                      error={errors.location ? errors.location?.message : ""}
                    />

                    <div className='w-full flex gap-3 items-end'>
                      <div className='w-1/2'>
                        <TextInput
                          name='contact'
                          label='Contact'
                          placeholder='Phone Number'
                          type='text'
                          register={register("contact", {
                            required: "Contact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className='w-1/2 flex flex-col'>
                        <label className='text-zinc-500 font-bold uppercase tracking-wider mb-2'>
                          Company Logo
                        </label>
                        <input
                          type='file'
                          className='text-xs text-zinc-550 file:mr-2 file:py-1 px-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer file:cursor-pointer'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className='flex flex-col mt-2'>
                      <label className='text-zinc-550 text-xs font-bold uppercase tracking-wider mb-2'>
                        About Company
                      </label>
                      <textarea
                        className='block w-full rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 transition-all duration-200 resize-none'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role='alert'
                          className='text-xs text-rose-500 mt-1.5 font-bold'
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <div className='mt-4'>
                      <CustomButton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 text-sm font-bold shadow-sm transition-all focus:outline-none'
                        title={"Submit"}
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const CompanyProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const fetchCompany = async () => {
    setIsLoading(true);
    let id = params?.id;
    let res;
    if (id) {
      res = await apiRequest({
        url: `/companies/get-company/${id}`,
        method: "GET",
      });
      if (res?.success) {
        setInfo(res?.data);
      }
    } else if (user?.token && user?.accountType !== "seeker") {
      res = await apiRequest({
        url: "/companies/get-company-profile",
        token: user?.token,
        method: "POST",
      });
      if (res?.success) {
        setInfo(res?.data);
      }
    } else {
      window.location.replace("/");
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCompany();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [params?.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-4 md:px-6 py-10 md:py-16 bg-zinc-50/10'>
      <div className='w-full bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm flex flex-col gap-6'>
        <div className='w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-zinc-150 pb-6'>
          <div className='flex gap-4 items-center'>
            <img
              src={info?.profileUrl}
              alt={info?.name}
              className='w-16 h-16 rounded-2xl object-cover border border-zinc-150 shadow-sm'
            />
            <div>
              <h2 className='text-2xl md:text-3xl font-extrabold text-zinc-900'>
                {info?.name}
              </h2>
              <p className='text-xs text-zinc-400 font-semibold mt-1 uppercase tracking-wider'>Company Profile</p>
            </div>
          </div>

          {user?.accountType === undefined && info?._id === user?._id && (
            <div className='flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0'>
              <CustomButton
                onClick={() => setOpenForm(true)}
                iconRight={<FiEdit3 className='text-sm' />}
                containerStyles={`p-2.5 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors rounded-xl text-sm font-bold border border-zinc-200 shadow-sm`}
              />

              <Link to='/upload-job' className='flex-1 md:flex-none'>
                <CustomButton
                  title='Upload Job'
                  iconRight={<FiUpload className='text-sm' />}
                  containerStyles={`w-full justify-center gap-2 border border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm`}
                />
              </Link>
            </div>
          )}
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-2'>
          <div className='w-full flex flex-wrap gap-3 text-xs font-semibold'>
            <p className='flex gap-1.5 items-center px-4 py-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200/50 rounded-full'>
              <HiLocationMarker className='text-zinc-400 text-sm' /> {info?.location ?? "No Location"}
            </p>
            <p className='flex gap-1.5 items-center px-4 py-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200/50 rounded-full'>
              <AiOutlineMail className='text-zinc-400 text-sm' /> {info?.email ?? "No Email"}
            </p>
            <p className='flex gap-1.5 items-center px-4 py-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200/50 rounded-full'>
              <FiPhoneCall className='text-zinc-400 text-sm' /> {info?.contact ?? "No Contact"}
            </p>
          </div>

          <div className='flex flex-col items-center justify-center border border-indigo-100 rounded-2xl bg-indigo-50/40 px-6 py-3 text-center min-w-[120px] self-start md:self-auto'>
            <span className='text-2xl font-extrabold text-indigo-600 leading-none'>{info?.jobPosts?.length}</span>
            <p className='text-[10px] uppercase font-bold text-zinc-400 tracking-wider mt-1.5'>Jobs Posted</p>
          </div>
        </div>

        {info?.about && (
          <div className='border-t border-zinc-150 pt-6 mt-4'>
            <p className='text-zinc-400 font-extrabold text-xs uppercase tracking-wider mb-2.5'>About Company</p>
            <p className='text-zinc-650 text-sm leading-relaxed whitespace-pre-line'>{info?.about}</p>
          </div>
        )}
      </div>

      <div className='w-full mt-12'>
        <h3 className='text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-6'>Jobs Posted</h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
          {info?.jobPosts?.map((job, index) => {
            const data = {
              name: info?.name,
              email: info?.email,
              profileUrl: info?.profileUrl,
              ...job,
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>

      <CompnayForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
