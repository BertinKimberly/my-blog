import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
   authorEmail,
   title,
   content,
   links,
   category,
}: PostProps) {
   const session = await getServerSession(authOptions);

   const isEditable = session && session?.user?.email === authorEmail;

   const dateObject = new Date(date);
   const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
   };

   const formattedDate = dateObject.toLocaleDateString("en-US", options);

   return (
      <div className='my-4 border-b border-b-300 py-8'>
         <div className='mb-4'>
            {author ? (
               <>
                  Posted by: <span className='font-bold'>{author}</span> on{" "}
                  {formattedDate}
               </>
            ) : (
               <>Posted on {formattedDate}</>
            )}
         </div>
         <h2>{title}</h2>
         <div className='w-full  min-h-[400px] relative'>
            {thumbnail ? (
               <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className='object-cover rounded-md object-center'
               />
            ) : (
               <Image
                  src={"/thumbnail-placeholder.png"}
                  alt={title}
                  fill
                  className='object-cover rounded-md object-center'
               />
            )}
         </div>

         {category && (
            <Link
               className='bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block'
               href={`categories/${category}`}
            >
               {category}
            </Link>
         )}

         <div dangerouslySetInnerHTML={{ __html: content }} />

         {links && (
            <div className='my-4 flex flex-col gap-3'>
               {links.map((link, i) => (
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

         {isEditable && (
            <div className='flex gap-5 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit'>
               <Link href={`/edit-post/${id}`}>Edit</Link>
               <DeleteButton id={id} />
            </div>
         )}
      </div>
   );
}
