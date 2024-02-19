"use client";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


export default function Navbar() {
   const { status, data: session } = useSession();
   const [isPopupVisible, setIsPopupVisible] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);
   const popupRef = useRef<HTMLDivElement | null>(null);

   //theme


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
      <div className='dark:bg-nav w-full border-b border-nav'>
         <div className='flex justify-between pb-4 mb-4 relative container h-[100px] items-center mx-auto  '>
            <div>
               <Link
                  href={"/"}
                  onClick={() => setToggleMenu(true)}
                  className='flex gap-1 items-center justify-start'
               >
                  <Image
                     src={logo}
                     alt='Glog'
                     className='w-[100px] h-[100px] -ml-6 '
                  />
                  <h1 className='text-dark dark:text-white text-2xl font-bold -ml-8'>
                     Glog
                  </h1>
               </Link>
            </div>
            <div
               className={` flex items-center gap-4 capitalize bg-white p-5 md:p-0 dark:bg-nav md:bg-transparent ${
                  toggleMenu
                     ? "hidden md:flex"
                     : "flex-col absolute top-[100px] right-4 p-2 z-50  md:flex-row md:static "
               }`}
            >
               <Link
                  href={"/posts"}
                  onClick={handleMenu}
               >
                  POSTS
               </Link>
               <Link
                  href={"/about"}
                  onClick={handleMenu}
               >
                  ABOUT
               </Link>
               {status === "authenticated" ? (
                  <>
                     <div
                        ref={popupRef}
                        className={`absolute z-30 right-0 top-[6.5rem]  p-6 shadow-lg border border-nav border-t-0 rounded-md flex-col gap-4 text-left min-w-[180px] bg-white dark:bg-nav ${
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
                           className=' text-left border  p-1 rounded transition-all w-max'
                        >
                           Sign Out
                        </button>
                     </div>

                     <div className='flex gap-2 items-center'>
                        <Link
                           className='hidden md:flex gap-2 items-center mr-6'
                           href={"/create-post"}
                        >
                           <span>CREATE NEW</span>
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
                        SIGN IN
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
      </div>
   );
}
