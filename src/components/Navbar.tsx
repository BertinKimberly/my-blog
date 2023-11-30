"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

const Navbar = () => {
   const [isToggleMenu, setIsToggleMenu] = useState(false);
   const toggleMenu = () => {
      setIsToggleMenu((prev) => !prev);
   };
   return (
      <nav className=' h-[100px] mx-auto flex items-center justify-between relative'>
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
                  className='w-[100px] sm:w-[200px] border-t border-r border-b rounded-full border-gray-600 -ml-7 pl-8'
               />
            </form>
         </div>
         <div
            className={`${
               isToggleMenu
                  ? "flex flex-col gap-3 text-2xl absolute right-2 top-[100px] bg-white z-20"
                  : "hidden"
            }  md:flex gap-5`}
         >
            <Link href='/'>Home</Link>
            <Link href='/'>About</Link>
            <Link href='/'>Contact</Link>
            <Link href='/'>Posts</Link>
         </div>
         <div
            className='md:hidden block'
            onClick={toggleMenu}
         >
            {isToggleMenu ? <FaTimes /> : <FaBars />}
         </div>
      </nav>
   );
};

export default Navbar;
