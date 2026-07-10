import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { users } from "../utils/data";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";

function MenuList({ user, onClick }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };

  return (
    <div>
      <Menu as='div' className='inline-block text-left relative'>
        <div className='flex'>
          <Menu.Button className='inline-flex items-center gap-3 w-full rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 border border-zinc-150 transition-all shadow-sm'>
            <img
              src={user?.profileUrl}
              alt='user profile'
              className='w-8 h-8 rounded-full object-cover border border-zinc-100'
            />
            <div className='leading-none flex flex-col items-start text-left'>
              <p className='text-xs font-bold text-zinc-800'>
                {user?.firstName ?? user?.name}
              </p>
              <span className='text-[10px] text-zinc-400 font-medium mt-0.5'>
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            <BiChevronDown
              className='h-4 w-4 text-zinc-400'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-50 right-0 mt-2.5 w-52 origin-top-right divide-y divide-zinc-100 rounded-xl bg-white border border-zinc-100 shadow-xl focus:outline-none p-1'>
            <div className='space-y-0.5'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? "user-profile" : "company-profile"
                    }`}
                    className={`${
                      active ? "bg-indigo-50 text-indigo-600" : "text-zinc-700"
                    } group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-indigo-600" : "text-zinc-400"
                      } mr-2.5 h-4 w-4 transition-colors`}
                      aria-hidden='true'
                    />
                    {user?.accountType ? "My Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-rose-50 text-rose-600" : "text-zinc-700"
                    } group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-rose-600" : "text-zinc-400"
                      } mr-2.5 h-4 w-4 transition-colors`}
                      aria-hidden='true'
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-150'>
        <nav className='container mx-auto flex items-center justify-between p-4 md:px-6'>
          <div>
            <Link to='/' className='text-zinc-900 font-extrabold text-xl tracking-tight'>
              Job<span className='text-indigo-600'>Finder</span>
            </Link>
          </div>

          <ul className='hidden lg:flex text-zinc-600 gap-8 text-sm font-semibold'>
            {(user?.accountType === "seeker" || !user?.token) && (
              <li>
                <Link to='/' className='hover:text-indigo-600 transition-colors'>Find Job</Link>
              </li>
            )}
            <li>
              <Link to='/companies' className='hover:text-indigo-600 transition-colors'>Companies</Link>
            </li>
            {user?.token && user?.accountType !== "seeker" && (
              <li>
                <Link to='/upload-job' className='hover:text-indigo-600 transition-colors'>Upload Job</Link>
              </li>
            )}
            <li>
              <Link to='/about-us' className='hover:text-indigo-600 transition-colors'>About</Link>
            </li>
          </ul>

          <div className='hidden lg:block'>
            {!user?.token ? (
              <Link to='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles='text-indigo-600 py-2 px-5 hover:bg-indigo-50 hover:border-indigo-200 rounded-xl text-sm font-bold border border-zinc-200 transition-all'
                />
              </Link>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>

          <button
            className='block lg:hidden text-zinc-800'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-white/95 backdrop-blur-md border-b border-zinc-150 " : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-4 py-6 shadow-lg`}
        >
          {(user?.accountType === "seeker" || !user?.token) && (
            <Link to='/' onClick={handleCloseNavbar} className='text-zinc-600 font-bold hover:text-indigo-600 transition-colors'>
              Find Job
            </Link>
          )}
          <Link to='/companies' onClick={handleCloseNavbar} className='text-zinc-600 font-bold hover:text-indigo-600 transition-colors'>
            Companies
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={
              user?.accountType === "seeker" ? "applly-gistory" : "upload-job"
            }
            className='text-zinc-600 font-bold hover:text-indigo-600 transition-colors'
          >
            {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar} className='text-zinc-600 font-bold hover:text-indigo-600 transition-colors'>
            About
          </Link>

          <div className='w-full py-4 border-t border-zinc-100 mt-2'>
            {!user?.token ? (
              <a href='/user-auth'>
                <CustomButton
                  title='Sign In'
                  containerStyles={`text-indigo-600 py-2 px-5 hover:bg-indigo-50 rounded-xl text-sm font-bold border border-zinc-200 transition-all`}
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
