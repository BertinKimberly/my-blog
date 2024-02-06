"use client";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { CiLink } from "react-icons/ci";
import { FormEvent, useEffect, useState } from "react";
import { TComment } from "@/app/types";
import { IoMdSend } from "react-icons/io";

interface PostDetailsProps {
   post: {
      id: string;
      author: string;
      createdAt: string;
      imageUrl?: string;
      authorEmail?: string;
      title: string;
      content: string;
      links?: string[];
      category?: string;
   };
   isEditable?: boolean;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, isEditable }) => {
   const dateObject = post.createdAt ? new Date(post.createdAt) : null;
   const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
   };
   const formattedDate = dateObject.toLocaleDateString("en-US", options);

   //comments

   const [commentText, setCommentText] = useState<string>("");
   const [comments, setComments] = useState<TComment[]>([]);

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const response = await fetch(`/api/comments?postId=${post.id}`);
            const data = await response.json();
            setComments(data);
         } catch (error) {
            console.error("Error fetching comments", error);
         }
      };
      fetchComments();
   }, []);

   const handleCommentSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               postId: post.id,
               content: commentText,
            }),
         });

         const newComment = await response.json();
         setComments([...comments, newComment]);
      } catch (error) {
         console.error("Error submitting comment", error);
      }
   };

   return (
      <div className='my-4  py-8'>
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
         <h2 className='mt-6  py-4'>{post.title}</h2>
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
         <h1>Comments</h1>

         {/* Comment form */}
         <form
            className='flex p-1 mt-10 '
            onSubmit={handleCommentSubmit}
         >
            <input
               type='text'
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
               placeholder='that was awesome'
               className='w-[400px] text-sm p-2 border border-border rounded text-black dark:text-white  bg-transparent'
            />
            <button
               type='submit'
               className='p-2 border border-border rounded bg-black dark:bg-main text-white dark:text-black -ml-2'
            >
               <IoMdSend />
            </button>
         </form>

         {/* Display comments */}
         {comments.map((comment) => (
            <div
               className=' gap-3 flex flex-col p-4 min-w-max'
               key={comment.id}
            >
               <h5 className='text-black/40 dark:text-white/50'>
                  {comment.user.name}
               </h5>
               <p className='ml-3 border-l-4 rounded p-4 pl-10'>
                  {comment.content}
               </p>
            </div>
         ))}
      </div>
   );
};

export default PostDetails;
