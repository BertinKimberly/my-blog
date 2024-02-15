import React, { FC, FormEvent, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { TComment } from "@/app/types";
import prisma from "../../lib/prismadb";

interface CommentsSectionProps {
   postId: string;
}

const CommentsSection: FC<CommentsSectionProps> = ({ postId }) => {
   const { data: session } = useSession();
   const [commentText, setCommentText] = useState<string>("");
   const [comments, setComments] = useState<TComment[]>([]);

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const data = await fetch("/api/comments", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  postId,
               }),
            });

            if (Array.isArray(data)) {
               const transformedData: TComment[] = data.map((comment) => ({
                  id: comment.id,
                  postId: comment.postId,
                  content: comment.content,
                  user: comment.user,
                  createdAt: comment.createdAt,
                  updatedAt: comment.updatedAt,
               }));

               setComments(transformedData);
            }
         } catch (error) {
            toast.error("Error fetching comments");
         }
      };
      fetchComments();
   }, [postId]);

   const handleCommentSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!commentText.trim()) {
         toast.error("Comment cannot be empty");
         return;
      }

      if (!session) {
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
               postId,
               content: commentText,
            }),
         });

         const newComment = await response.json();
         setComments([...comments, newComment]);
         setCommentText("");
         toast.success("comment added");
      } catch (error) {
         toast.error("Error submitting comment");
      }
   };

   return (
      <div className='mt-5 border-t pt-10'>
         <h1>Comments</h1>

         {/* Comment form */}
         <form
            className='flex p-1 mt-10'
            onSubmit={handleCommentSubmit}
         >
            <input
               type='text'
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
               placeholder='Add a comment...'
               className='w-[400px] text-sm p-2 border border-border rounded text-black dark:text-white bg-transparent'
            />
            <button
               type='submit'
               className='p-2 border border-border rounded bg-black dark:bg-main text-white dark:text-black -ml-8'
            >
               <IoMdSend />
            </button>
         </form>

         {/* Display comments */}
         {comments?.length > 0 ? (
            comments.map((comment) => (
               <div
                  className='gap-3 flex flex-col p-4 min-w-max'
                  key={comment.id}
               >
                  <h5 className='text-black/40 dark:text-white/50'>
                     {comment.user && comment.user.name}
                  </h5>
                  <p className='ml-3 border-l-4 rounded p-4 pl-10'>
                     {comment.content}
                  </p>
               </div>
            ))
         ) : (
            <p className='text-sm ml-5 mt-5'>Be the first to comment</p>
         )}
      </div>
   );
};

export default CommentsSection;
