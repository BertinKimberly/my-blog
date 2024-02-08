import React from "react";
import AboutImg from "../../../public/images/about.jpg";
import Image from "next/image";

export const metadata = {
   title: "About ",
   description: `Here are some details about Glog`,
};
const About = () => {
   return (
      <div className='min-height-screen container mx-auto px-2 my-6'>
         <div className='xl:py-20 py-10 px-4'>
            <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
               <div>
                  <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                     Welcome Glog
                  </h3>
               </div>
               <div className='mt-3 text-sm leading-8 text-text'>
                  <p>
                     Glog, your gateway to the world of inspirational
                     information! I&apos;m thrilled to introduce you to our
                     one-of-a-kind application that&apos;s designed to uplift
                     your spirit and fill your heart with the joy .
                  </p>
                  <p>
                     This Blog is not just an app; it&apos;s a platform that
                     brings the power of gospel stories to your fingertips. With
                     a vast library of handpicked, faith-based stories, we aim
                     to inspire, entertain, and strengthen your connection with
                     your beliefs.
                  </p>
               </div>
               <div className='grid md:grid-cols-2 gap-6 mt-8'>
                  <div className='p-8 bg-dry rounded-lg'>
                     <span className='text-3xl block font-extrabold  dark:bg-main w-max p-3 rounded-md border bg-transparent'>
                        0.5K
                     </span>
                     <h4 className='text-lg font-semibold my-2'>Users</h4>
                     <p className='mb-0 text-text leading-7 text-sm'>
                        These movies will help you know more about gospel
                     </p>
                  </div>
                  <div className='p-8 bg-dry rounded-lg'>
                     <span className='text-3xl block font-extrabold dark:bg-main w-max p-3 rounded-md border bg-transparent'>
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
                     src={AboutImg}
                     alt='about Glog'
                     className='w-full xl:block hidden h-header rounded-lg object-cover'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default About;
