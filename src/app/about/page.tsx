import React from "react";
import Me from "../../../public/images/bertin.png";
import Image from "next/image";
import Layout from "@/components/Layout";
const About = () => {
   return (
      <div className='min-height-screen container mx-auto px-2 my-6'>
         <div className='xl:py-20 py-10 px-4'>
            <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
               <div>
                  <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                     Welcome To My Blog
                  </h3>
               </div>
               <div className='mt-3 text-sm leading-8 text-text'>
                  <p>
                     Welcome to Bert's Blog, your gateway to the world of
                     inspirational information! I'm thrilled to introduce you to
                     our one-of-a-kind application that's designed to uplift
                     your spirit and fill your heart with the joy .
                  </p>
                  <p>
                     This Blog is not just an app; it's a platform that brings
                     the power of gospel stories to your fingertips. With a vast
                     library of handpicked, faith-based stories, we aim to
                     inspire, entertain, and strengthen your connection with
                     your beliefs.
                  </p>
               </div>
               <div className='grid md:grid-cols-2 gap-6 mt-8'>
                  <div className='p-8 bg-dry rounded-lg'>
                     <span className='text-3xl block font-extrabold  bg-main w-max p-3 rounded-md'>
                        0.5K
                     </span>
                     <h4 className='text-lg font-semibold my-2'>Users</h4>
                     <p className='mb-0 text-text leading-7 text-sm'>
                        These movies will help you know more about gospel
                     </p>
                  </div>
                  <div className='p-8 bg-dry rounded-lg'>
                     <span className='text-3xl block font-extrabold bg-main w-max p-3 rounded-md'>
                        1K +
                     </span>
                     <h4 className='text-lg font-semibold my-2'>Articles</h4>
                     <p className='mb-0 text-text leading-7 text-sm'>
                        It is a preasure to have you
                     </p>
                  </div>
               </div>
               <div className='mt-10 lg:mt-0'>
                  <Image
                     src={Me}
                     alt='aboutme'
                     className='w-full xl:block hidden h-header rounded-lg object-cover'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default About;
