import { TPost } from "./types";
import PopularPosts from "@/components/PopularPosts";
import Image from "next/image";
import Bible from "../../public/images/bible.png";
import FeaturedPosts from "@/components/FeaturedPosts";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export const runtime = "edge";

const getPosts = async (): Promise<TPost[] | null> => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
         cache: "no-store",
      });

      if (res.ok) {
         const posts = await res.json();
         return posts;
      }
   } catch (error) {
      console.error("Error in fetching posts");
   }

   return null;
};

export default async function Page() {
   const posts = await getPosts();
   return (
      <>
         <h1 className='text-3xl mt-10'>Welcome to Glog . Enjoy accordingly</h1>
         <div className='my-20 py-10 md:px-4  bg-dry '>
            <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center '>
               <div className='flex lg:gap-10 gap-6 flex-col'>
                  <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium   xl:leading-loose'>
                     Read As Many Blogs As You Want . No Limitations.
                  </h1>
                  <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
                     Welcome to our Gospel Blog, where inspiration meets
                     revelation! Dive into the uplifting messages of faith,
                     hope, and love that resonate with the core of Gospel
                     teachings. Explore a journey of spiritual growth and
                     enlightenment with our diverse content. Join our community
                     as we share the timeless wisdom that guides us through
                     life&#39;s challenges. Let the power of gospel illuminate
                     your path. Blessings await!
                  </p>
               </div>
               <div className='hidden lg:flex items-center justify-center p-2 '>
                  <Image
                     src={Bible}
                     alt={"Bible"}
                     className='w-1/2 object-contain'
                  />
               </div>
            </div>
         </div>
         <Suspense fallback={<Loader />}>
            <PopularPosts posts={posts} />
         </Suspense>
         <Suspense fallback={<Loader />}>
            <FeaturedPosts posts={posts} />
         </Suspense>
      </>
   );
}
