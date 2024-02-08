import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
   const Links = [
      {
         title: "Company",
         links: [
            {
               name: "Home",
               link: "/",
            },
            {
               name: "About",
               link: "/about",
            },
            {
               name: "Posts",
               link: "/posts",
            },
         ],
      },
      {
         title: "Categories",
         links: [
            {
               name: "Heroes Of The Bible",
               link: "/categories/Heroes Of The Bible",
            },
            {
               name: "Faith",
               link: "/categories/Faith",
            },
            {
               name: "Prayer",
               link: "/categories/Prayer",
            },
            {
               name: "Christian Living",
               link: "/categories/Christian Living",
            },
            {
               name: "Christian music and art",
               link: "/categories/Christian music and art",
            },
         ],
      },
      {
         title: "Me",
         links: [
            {
               name: "Dashboard",
               link: "/dashboard",
            },

            {
               name: "Create New Post",
               link: "/create-post",
            },
         ],
      },
   ];
   return (
      <div className='bg-dry py-4 border-t-2 border-gray-400 pb-[5rem]'>
         <div className='container mx-auto px-2'>
            <div className='grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between'>
               {Links.map((link, index) => (
                  <div
                     key={index}
                     className='col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0'
                  >
                     <h3 className='text-xl lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5 text-white'>
                        {link.title}
                     </h3>
                     <ul className='text-sm flex flex-col space-y-3'>
                        {link.links.map((text, index) => (
                           <li
                              key={index}
                              className='flex items-baseline'
                           >
                              <Link
                                 href={text.link}
                                 className='inline-block w-full hover:underline transition duration-300 ease-in'
                              >
                                 {text.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
               <div className='pb-3 5 sm:pb-0 col-span-2 lg:col-span-3'>
                  <Link
                     href='/'
                     className=''
                  >
                     Glog
                  </Link>
                  <p className='leading-7 text-sm mt-3'>
                     <span>Know More About Gospel </span>
                     <br />
                     <span>Kigali-Rwanda</span>
                     <br />
                     <span>Email: iradukundabertin082@gmail.com</span>
                     <br />
                  </p>
               </div>
            </div>
         </div>
         <div className='flex w-full items-center justify-center flex-col'>
            <p className='flex text-center items-center justify-center p-3 gap-4'>
               <Link href=''>
                  <FaFacebook />
               </Link>
               <Link href=''>
                  <FaLinkedin />
               </Link>
               <Link href=''>
                  <FaInstagram />
               </Link>
            </p>
            <hr className='w-3/4 ' />
         </div>

         <p className='text-center text-border my-3'>
            &copy;<span className='mx-2'>2023</span>BERTIN
         </p>
      </div>
   );
};

export default Footer;
