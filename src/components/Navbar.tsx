import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
   return (
      <nav className='container h-[100px] mx-auto flex items-center justify-between'>
         <div>
            <Link href='/'>BERTIN</Link>
         </div>
         <div>
            <form className='flex'>
               <button className='w-[30px] h-[30px] border border-gray-600 flex items-center justify-center rounded-full z-10'>
                  <FaSearch />
               </button>
               <input
                  type='text'
                  className='w-[200px] border-t border-r border-b rounded-full border-gray-600 -ml-7 pl-8'
               />
            </form>
         </div>
         <div className='flex gap-5'>
            <Link href='/'>Home</Link>
            <Link href='/'>About</Link>
            <Link href='/'>Contact</Link>
            <Link href='/'>Posts</Link>
         </div>
      </nav>
   );
};

export default Navbar;
