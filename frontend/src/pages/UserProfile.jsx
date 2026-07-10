import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { CustomButton, TextInput } from "../components";
import { apiRequest, handleFileUpload } from "../utils";
import { Login } from "../redux/userSlice";

const UserForm = ({ open, setOpen }) => {
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
      const cvUri = uploadCv && (await handleFileUpload(uploadCv));

      const newData = uri || cvUri 
        ? {
            ...data,
            profileUrl: uri ? uri : user?.profileUrl,
            cvUrl: cvUri ? cvUri : user?.cvUrl,
          }
        : data;

      const res = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: newData,
        method: "PUT",
      });

      if (res) {
        const newUser = { token: user?.token, ...res?.user };
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
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className='w-full mt-4 flex flex-col gap-4'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className='w-full flex gap-3'>
                      <div className='w-1/2'>
                        <TextInput
                          name='firstName'
                          label='First Name'
                          placeholder='James'
                          type='text'
                          register={register("firstName", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstName ? errors.firstName?.message : ""
                          }
                        />
                      </div>
                      <div className='w-1/2'>
                        <TextInput
                          name='lastName'
                          label='Last Name'
                          placeholder='Wagonner'
                          type='text'
                          register={register("lastName", {
                            required: "Last Name is required",
                          })}
                          error={
                            errors.lastName ? errors.lastName?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <div className='w-full flex gap-3'>
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

                      <div className='w-1/2'>
                        <TextInput
                          name='location'
                          label='Location'
                          placeholder='Location'
                          type='text'
                          register={register("location", {
                            required: "Location is required",
                          })}
                          error={
                            errors.location ? errors.location?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <TextInput
                      name='jobTitle'
                      label='Job Title'
                      placeholder='Software Engineer'
                      type='text'
                      register={register("jobTitle", {
                        required: "Job Title is required",
                      })}
                      error={errors.jobTitle ? errors.jobTitle?.message : ""}
                    />
                    <div className='w-full flex gap-3 text-xs mt-2'>
                      <div className='w-1/2 flex flex-col'>
                        <label className='text-zinc-500 font-bold uppercase tracking-wider mb-2'>
                          Profile Picture
                        </label>
                        <input
                          type='file'
                          className='text-xs text-zinc-550 file:mr-2 file:py-1 px-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer file:cursor-pointer'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>

                      <div className='w-1/2 flex flex-col'>
                        <label className='text-zinc-500 font-bold uppercase tracking-wider mb-2'>
                          Resume
                        </label>
                        <input
                          type='file'
                          className='text-xs text-zinc-550 file:mr-2 file:py-1 px-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer file:cursor-pointer'
                          onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className='flex flex-col mt-2'>
                      <label className='text-zinc-550 text-xs font-bold uppercase tracking-wider mb-2'>
                        About
                      </label>
                      <textarea
                        className='block w-full rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 transition-all duration-200 resize-none'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "Write a little bit about yourself and your projects",
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

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userInfo = user;

  return (
    <div className='container mx-auto flex items-center justify-center py-12 px-4 md:px-6 bg-zinc-50/10'>
      <div className='w-full md:w-[700px] bg-white border border-zinc-200 p-8 md:p-12 rounded-3xl shadow-sm'>
        <div className='flex flex-col items-center justify-center text-center pb-8 border-b border-zinc-150'>
          <img
            src={userInfo?.profileUrl}
            alt={userInfo?.firstName}
            className='w-32 h-32 object-cover rounded-2xl border-4 border-zinc-50 shadow-md mb-6'
          />

          <h1 className='text-2xl md:text-3xl font-extrabold text-zinc-900'>
            {userInfo?.firstName + " " + userInfo?.lastName}
          </h1>

          <h5 className='text-indigo-600 text-xs font-bold uppercase tracking-wider mt-3 bg-indigo-50 px-4 py-1.5 rounded-full'>
            {userInfo?.jobTitle || "Add Job Title"}
          </h5>

          <div className='w-full flex flex-wrap justify-center gap-3 mt-6 text-xs font-medium'>
            <p className='flex gap-1.5 items-center px-4 py-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200/50 rounded-full'>
              <HiLocationMarker className='text-zinc-400 text-sm' /> {userInfo?.location ?? "No Location"}
            </p>
            <p className='flex gap-1.5 items-center px-4 py-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200/50 rounded-full'>
              <AiOutlineMail className='text-zinc-400 text-sm' /> {userInfo?.email ?? "No Email"}
            </p>
            <p className='flex gap-1.5 items-center px-4 py-1.5 text-zinc-500 bg-zinc-50 border border-zinc-200/50 rounded-full'>
              <FiPhoneCall className='text-zinc-400 text-sm' /> {userInfo?.contact ?? "No Contact"}
            </p>
          </div>
        </div>

        <div className='w-full pt-8'>
          <div className='flex flex-col gap-6 text-left'>
            <div>
              <p className='text-zinc-400 font-extrabold text-xs uppercase tracking-wider mb-2.5'>About</p>
              <span className='text-sm text-zinc-650 leading-relaxed block whitespace-pre-line'>
                {userInfo?.about ?? "No About Found"}
              </span>
            </div>

            <div className='pt-6 border-t border-zinc-150 flex flex-col md:flex-row gap-4 justify-between items-center'>
              <div className='flex flex-col'>
                <span className='text-zinc-400 text-xs font-bold uppercase tracking-wider'>Uploaded Resume</span>
                <span className='text-zinc-700 text-xs font-bold truncate mt-1.5 max-w-[250px]'>
                  {userInfo?.cvUrl ? "Resume.pdf" : "No Resume Uploaded"}
                </span>
              </div>
              <button
                className='w-full md:w-auto bg-zinc-950 text-white hover:bg-zinc-800 transition-colors px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-sm'
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserProfile;
