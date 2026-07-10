import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Office } from "../assets";
import { SignUp } from "../components";

const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";

  if (user?.token) {
    return window.location.replace(from);
  }
  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-zinc-50/30 to-white py-16 px-4'>
      <div className='max-w-md w-full text-center bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm'>
        <h2 className='text-2xl font-extrabold text-zinc-900 tracking-tight'>Welcome to JobFinder</h2>
        <p className='text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1.5'>Authentication Portal</p>
        <p className='text-sm text-zinc-500 mt-4 leading-relaxed'>
          Please sign in or register to browse opportunities, manage listings, and apply to premium roles.
        </p>
        <button
          onClick={() => setOpen(true)}
          className='mt-6 w-full inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3 px-6 rounded-xl text-sm shadow-sm transition-colors focus:outline-none'
        >
          Open Sign In / Register
        </button>
      </div>

      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;
