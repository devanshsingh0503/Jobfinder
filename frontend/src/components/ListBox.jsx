import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const ListBox = ({ sort, setSort }) => {
  return (
    <div className='w-[8rem] md:w-[10rem]'>
      <Listbox value={sort} onChange={setSort}>
        <div className='relative mt-1'>
          <Listbox.Button
            className={
              "relative w-full cursor-default rounded-xl border border-zinc-200 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all duration-200"
            }
          >
            <span className='block truncate text-zinc-800 font-bold'>{sort}</span>

            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronExpand
                className='h-4 w-4 text-zinc-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-zinc-150 bg-white py-1 text-sm shadow-xl focus:outline-none'>
              {options.map((op, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 transition-colors ${
                      active ? "bg-indigo-50 text-indigo-600" : "text-zinc-700"
                    }`
                  }
                  value={op}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold text-indigo-600" : "font-normal"
                        }`}
                      >
                        {op}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600'>
                          <BsCheck2 className='h-4 w-4' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
