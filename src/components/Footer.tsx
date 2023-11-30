import React from "react";
import Link from "next/link";

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
               name: "About Us",
               link: "/about",
            },
            {
               name: "Contact ",
               link: "/contact",
            },
            {
               name: "Posts",
               link: "/posts",
            },
         ],
      },
      {
         title: "Popular Posts",
         links: [
            {
               name: "New Testament",
               link: "/movies?category=New Testament",
            },
            {
               name: "Old Testament",
               link: "/movies?category=Old Testament",
            },
         ],
      },
      {
         title: "My Account",
         links: [
            {
               name: "Dashboard",
               link: "/dashboard",
            },
            {
               name: "My Favorite",
               link: "/favorite",
            },
            {
               name: "Profile",
               link: "/profile",
            },
            {
               name: "Change Password",
               link: "/password",
            },
         ],
      },
   ];
   return (
      <div className='bg-dry py-4 border-t-2 border-black pb-[5rem]'>
         <div className='container mx-auto px-2'>
            <div className='grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between'>
               {Links.map((link, index) => (
                  <div
                     key={index}
                     className='col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0'
                  >
                     <h3 className='text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5 text-border'>
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
                                 className='inline-block w-full hover:text-subMain'
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
                     className='text-border'
                  >
                     BERTIN
                  </Link>
                  <p className='leading-7 text-sm mt-3'>
                     <span>The gospel video streaming app</span>
                     <br />
                     <span>Kigali-Rwanda</span>
                     <br />
                     <span>Email: reviveg100@gmail.com</span>
                     <br />
                  </p>
               </div>
            </div>
         </div>
         <div className='flex w-full items-center justify-center'>
            <hr className='w-3/4 ' />
         </div>

         <p className='text-center text-border my-3'>
            &copy;<span className='mx-2'>2023</span>BERTIN
         </p>
      </div>
   );
};

export default Footer;
