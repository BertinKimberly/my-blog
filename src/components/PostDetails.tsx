"use client";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { CiLink } from "react-icons/ci";
import { FormEvent, useEffect, useState } from "react";
import { TComment } from "@/app/types";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";


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

   const [commentText, setCommentText] = useState<string>("");
   const [comments, setComments] = useState<TComment[]>([]);

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const response = await fetch(`/api/comments?postId=${post.id}`);
            const data = await response.json();
            setComments(data);
         } catch (error) {
            toast.error("Error fetching comments");
         }
      };
      fetchComments();
   }, []);
   const isAuthenticated = async () => {
      try {
         const session = await getServerSession(authOptions);
         return !!session;
      } catch (error) {
         console.error("Error checking authentication:", error);
         return false;
      }
   };

   const handleCommentSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!commentText.trim()) {
         toast.error("Comment cannot be empty");
         return;
      }

      const isLoggedIn = await isAuthenticated();

      if (!isLoggedIn) {
         toast.error("You need to be logged in to comment");
         return;
      }
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
         toast.error("Error submitting comment");
      }
   };

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
         <div className='mt-5 border-t pt-10'>
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
                  className='w-[400px] text-sm p-2 border border-border rounded text-black dark:text-white  bg-transparent '
               />
               <button
                  type='submit'
                  className='p-2 border border-border rounded bg-black dark:bg-main text-white dark:text-black -ml-8'
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
                     {comment.user && comment.user.name}
                  </h5>
                  <p className='ml-3 border-l-4 rounded p-4 pl-10'>
                     {comment.content}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default PostDetails;
