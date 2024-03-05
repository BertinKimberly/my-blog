import Image from "next/image";
import Link from "next/link";
import { CiLink } from "react-icons/ci";

interface PostProps {
   id: string;
   author: string;
   date: string;
   thumbnail?: string;
   authorEmail?: string;
   title: string;
   content: string;
   links?: string[];
   category?: string;
}

export default async function Post({
   id,
   author,
   date,
   thumbnail,
   title,
   links,
}: PostProps) {
   const postAuthor = author || "Anonymous";
   return (
      <div className='h-[500px]  flex flex-col gap-3 p-2 rounded dark:bg-nav   hover:scale-95 transition duration-300 ease-in shadow-md'>
         <h1 className='text-lg text-[#8D9CEC]'>{title} </h1>
         <div className='border border-nav p-1 relative  transition rounded overflow-hidden  h-[280px] '>
            <Link
               href={`/posts/${id}`}
               className='w-full h-[300px] '
            >
               {thumbnail ? (
                  <Image
                     src={thumbnail}
                     alt={title}
                     fill
                     className='w-full h-[100px] '
                  />
               ) : (
                  <Image
                     src={"/thumbnail-placeholder.png"}
                     alt={title}
                     fill
                     className='w-full h-64 object-cover'
                  />
               )}
            </Link>
            <div className='flex absolute justify-center gap-2 bottom-0 right-0 bg-white text-white  left-0 dark:bg-[#A099CA3B] bg-opacity-60 dark:text-white px-4 py-3 '>
               <button>
                  <Link
                     href={`/posts/${id}`}
                     className='text-black dark:text-white'
                  >
                     Read More
                  </Link>
               </button>
            </div>
         </div>

         <p className='text-dark dark:text-[#A099CA3B]'>By {postAuthor}</p>
      </div>
   );
}
