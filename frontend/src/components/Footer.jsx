import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../utils/data";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className='text-zinc-500 bg-white border-t border-zinc-150 mt-20'>
      <div className='container px-6 py-16 mx-auto'>
        <div className='w-full flex flex-wrap gap-10 justify-between -mb-10'>
          <div className='w-full md:w-1/4 mb-10 md:mb-0'>
            <Link to='/' className='text-zinc-900 font-extrabold text-2xl tracking-tight'>
              Job<span className='text-indigo-600'>Finder</span>
            </Link>
            <p className='text-xs text-zinc-400 mt-3 leading-relaxed max-w-xs font-semibold'>
              Discover your next career move. Premium job search platform for seekers and top hiring companies.
            </p>
          </div>

          {footerLinks.map(({ id, title, links }) => (
            <div className='w-auto min-w-[120px] mb-10' key={id + title}>
              <h2 className='font-bold text-zinc-850 text-xs tracking-wider uppercase mb-4'>
                {title}
              </h2>

              <div className='flex flex-col gap-2.5'>
                {links.map((link, index) => (
                  <Link
                    key={link + index}
                    to='/'
                    className='text-xs text-zinc-500 hover:text-indigo-600 transition-colors font-medium'
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-zinc-50/50 border-t border-zinc-100 py-6'>
        <div className='container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-zinc-450'>
          <p className='text-center sm:text-left'>
            &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
          </p>

          <span className='text-center sm:text-right'>
            Hiring platform powered by modern design systems.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
