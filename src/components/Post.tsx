import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
   authorEmail,
   title,
   links,
}: PostProps) {
   const session = await getServerSession(authOptions);

   const dateObject = new Date(date);
   const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
   };

   return (
      <div className='h-[500px] bg-blue-600 flex flex-col gap-3 p-1 rounded'>
         <h1>{title}</h1>
         <div className='border border-border p-1 relative  transition rounded overflow-hidden bg-green-600 h-[300px]'>
            <Link
               href={`/posts/${id}`}
               className='w-full h-[300px] bg-blue-500'
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
            <div className='flex absolute justify-between gap-2 bottom-0 right-0 left-0 bg-red-600 bg-opacity-60 text-white px-4 py-3 '>
               <button>
                  <Link href={`/posts/${id}`}>Read More</Link>
               </button>
               <Link href={`/posts/${id}`}>
                  <FaThumbsUp />
               </Link>
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
         <p>By {author}</p>
      </div>
   );
}
