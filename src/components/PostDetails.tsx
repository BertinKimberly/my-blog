// components/PostDetails.tsx (or the path where you store your components)

import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { CiLink } from "react-icons/ci";

interface PostDetailsProps {
   post: {
      id: string;
      author: string;
      date: string;
      thumbnail?: string;
      authorEmail?: string;
      title: string;
      content: string;
      links?: string[];
      category?: string;
   };
   isEditable: boolean;
   formattedDate: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({
   post,
   isEditable,
   formattedDate,
}) => {
   // ... (rest of your component code)

   return (
      <div className='my-4 border-b border-b-300 py-8'>
         <div className='mb-4'>
            {post.author ? (
               <>
                  Posted by: <span className='font-bold'>{post.author}</span> on{" "}
                  {formattedDate}
               </>
            ) : (
               <>Posted on {formattedDate}</>
            )}
         </div>
         <h2>{post.title}</h2>
         <div className='w-full  min-h-[400px] relative'>
            {post.thumbnail ? (
               <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className='object-cover rounded-md object-center'
               />
            ) : (
               <Image
                  src={"/thumbnail-placeholder.png"}
                  alt={post.title}
                  fill
                  className='object-cover rounded-md object-center'
               />
            )}
         </div>

         {post.category && (
            <Link
               className='bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block'
               href={`categories/${post.category}`}
            >
               {post.category}
            </Link>
         )}

         <div dangerouslySetInnerHTML={{ __html: post.content }} />

         {post.links && (
            <div className='my-4 flex flex-col gap-3'>
               {post.links.map((link, i) => (
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
               <Link href={`/edit-post/${post.id}`}>Edit</Link>
               <DeleteButton id={post.id} />
            </div>
         )}
      </div>
   );
};

export default PostDetails;
