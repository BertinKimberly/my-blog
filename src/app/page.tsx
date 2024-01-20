import Image from "next/image";
import React from "react";
import Bible from "../../public/images/bible.png";
import Link from "next/link";

const Home = () => {
   return (
     
         <div className='min-h-screen w-full pt-6'>
            <div className=''>
               <h2 className='text-center py-3'>
                  What is going On in the world
               </h2>
               <p className='text-center'>
                  This blog has various news and concepts well explained in
                  details.I hope you are gonna enjoy.
               </p>
            </div>
            <div className='flex flex-col justify-center gap-5 md:gap-0 md:flex-row md:justify-between items-center py-10 mt-4'>
               <div className='w-1/2 flex items-center justify-center'>
                  <Image
                     src={Bible}
                     alt='bible'
                     className='w-3/4'
                  />
               </div>
               <div className='w-1/2 flex flex-col gap-4'>
                  <h1 className='mb-3'>Know More About The Holy Bible</h1>
                  <div>
                     <ul className='flex flex-col gap-3'>
                        <li>
                           <Link href=''>Origin Of The Bible</Link>
                        </li>
                        <li>
                           <Link href=''>Origin Of The Bible</Link>
                        </li>
                        <li>
                           <Link href=''>Origin Of The Bible</Link>
                        </li>
                        <li>
                           <Link href=''>Origin Of The Bible</Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>

   );
};

export default Home;
