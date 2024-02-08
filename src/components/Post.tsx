import Image from "next/image";
import Link from "next/link";
import { CiLink } from "react-icons/ci";
import { FaThumbsUp } from "react-icons/fa";

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
   return (
      <div className='h-[500px]  flex flex-col gap-3 p-2 rounded dark:bg-subMain border  hover:scale-95 transition duration-300 ease-in'>
         <h1 className='text-bl'>{title} </h1>
         <div className='border border-border p-1 relative  transition rounded overflow-hidden  h-[300px] '>
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
            <div className='flex absolute justify-center gap-2 bottom-0 right-0 bg-white text-white  left-0 dark:bg-subMain bg-opacity-60 dark:text-white px-4 py-3 '>
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
         {links && (
            <div className='my-4 flex flex-col gap-3'>
               {links.slice(0, 2).map((link, i) => (
                  <div
                     key={i}
                     className='flex gap-2 items-center'
                  >
                     <CiLink />
                     <Link
                        className='link'
                        href={link}
                     >
                        {link}
                     </Link>
                  </div>
               ))}
            </div>
         )}
         <p className='text-dark dark:text-white'>By {author}</p>
      </div>
   );
}
