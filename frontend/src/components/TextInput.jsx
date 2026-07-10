import React from "react";

const TextInput = React.forwardRef(
  ({ type, placeholder, styles, label, register, name, error }, ref) => {
    return (
      <div className='flex flex-col mt-2.5'>
        <label className='text-zinc-550 text-xs font-bold uppercase tracking-wider mb-2'>{label}</label>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className={`block w-full rounded-xl border border-zinc-200 bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-2.5 transition-all duration-200 ${styles}`}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />
        {error && <span className='text-xs text-rose-550 mt-1.5 font-bold'>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
