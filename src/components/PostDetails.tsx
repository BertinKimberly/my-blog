"use client";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { CiLink } from "react-icons/ci";
import { useSession } from "next-auth/react";
import CommentsSection from "./CommentsSection";

interface PostDetailsProps {
   post: {
      id: string;
      author: {
         name: string;
      };
      createdAt: string;
      imageUrl?: string;
      authorEmail?: string;
      title: string;
      content: string;
      links?: null | string[];
      category?: string;
   };
   isEditable?: boolean;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, isEditable }) => {
   const { data: session } = useSession();
   const dateObject = post.createdAt ? new Date(post.createdAt) : null;
   const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
   };
   const formattedDate = dateObject
      ? dateObject.toLocaleDateString("en-US", options)
      : "";

   //comments

   return (
      <div className='my-4  py-8'>
         <div className='mb-4'>
            {post.author ? (
               <>
                  Posted by:{" "}
                  <span className='font-bold'>{post.author.name}</span> on{" "}
                  {formattedDate}
               </>
            ) : (
               <>Posted on {formattedDate}</>
            )}
         </div>
         <h2 className='mt-6  py-4 text-lg font-bold'>{post.title}</h2>
         <div className='w-full  min-h-[400px] relative py-20'>
            {post.imageUrl ? (
               <Image
                  src={post.imageUrl}
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
         {/* 
         {post.category && (
            <Link
               className=' text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block'
               href={`categories/${post.category}`}
            >
               {post.category}
            </Link>
         )} */}
         <div
            className='pt-20 prose sm:prose-base md:prose-lg max-w-max
    prose-blockquote:bg-accent/20 
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-li:marker:text-accent

    dark:prose-invert
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20
    dark:prose-li:marker:text-accentDark

    first-letter:text-3xl
    sm:first-letter:text-5xl'
         >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
         </div>
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
            <div className='flex gap-5 font-bold py-2 px-4 rounded-md  w-fit mb-10'>
               <Link
                  href={`/edit-post/${post.id}`}
                  className='bg-main p-2 rounded text-white'
               >
                  Edit
               </Link>
               <DeleteButton id={post.id} />
            </div>
         )}
         //comments section
         <CommentsSection postId={post.id} />
      </div>
   );
};

export default PostDetails;
