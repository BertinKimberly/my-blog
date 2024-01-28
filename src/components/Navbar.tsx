"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaPlus, FaTimes } from "react-icons/fa";

export default function Navbar() {
   const { status, data: session } = useSession();
   const [isPopupVisible, setIsPopupVisible] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);
   const popupRef = useRef<HTMLDivElement | null>(null);

   const handleMenu = () => setToggleMenu((prev) => !prev);
   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setIsPopupVisible(false);
         }
      };

      document.addEventListener("click", handleClickOutside);

      if (!isPopupVisible) {
         document.removeEventListener("click", handleClickOutside);
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isPopupVisible]);

   return (
      <div className='flex justify-between pb-4 mb-4 relative container h-[100px] items-center mx-auto border-b'>
         <div>
            <Link
               href={"/"}
               onClick={() => setToggleMenu(true)}
            >
               <h1 className='text-dark text-2xl font-bold tracking-tighter'>
                  BERTIN
               </h1>
            </Link>
         </div>
         <div
            className={` flex items-center gap-4 ${
               toggleMenu
                  ? "hidden"
                  : "flex-col absolute top-[100px] right-4 p-2 z-50 bg-white md:flex-row md:static "
            }`}
         >
            <Link
               href={"/posts"}
               onClick={handleMenu}
            >
               Posts
            </Link>
            <Link
               href={"/about"}
               onClick={handleMenu}
            >
               About
            </Link>
            {status === "authenticated" ? (
               <>
                  <div
                     ref={popupRef}
                     className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-left min-w-[160px] ${
                        isPopupVisible ? "flex" : "hidden"
                     }`}
                  >
                     <div className='font-bold'>{session?.user?.name}</div>
                     <div>{session?.user?.email}</div>
                     <Link
                        onClick={() => setIsPopupVisible(false)}
                        className='hover:underline'
                        href={"/dashboard"}
                     >
                        Dashboard
                     </Link>
                     <Link
                        onClick={() => setIsPopupVisible(false)}
                        className='hover:underline'
                        href={"/create-post"}
                     >
                        Create Post
                     </Link>
                     <button
                        onClick={() => signOut()}
                        className='hover:bg-gray-800 text-left hover:text-white w-[100px] p-1 rounded transition-all'
                     >
                        Sign Out
                     </button>
                  </div>

                  <div className='flex gap-2 items-center'>
                     <Link
                        className='hidden md:flex gap-2 items-center mr-6'
                        href={"/create-post"}
                     >
                        <FaPlus />
                        <span>Create new</span>
                     </Link>
                     <Image
                        src={session?.user?.image || ""}
                        width={36}
                        height={36}
                        alt='Profile Image'
                        className='rounded-full cursor-pointer'
                        onClick={() => setIsPopupVisible((prev) => !prev)}
                     />
                  </div>
               </>
            ) : (
               <div className='flex items-center'>
                  <Link
                     className='btn'
                     href={"/sign-in"}
                     onClick={handleMenu}
                  >
                     Sign In
                  </Link>
               </div>
            )}
         </div>
         <div
            className='md:hidden'
            onClick={handleMenu}
         >
            {toggleMenu ? <FaBars /> : <FaTimes />}
         </div>
      </div>
   );
}
