"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
   const router = useRouter();
   const deleteImage = async (publicId: string) => {
      await fetch("/api/removeImage", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ publicId }),
      });
   };

   const handleDelete = async () => {
      const confirmed = window.confirm(
         "Are you sure you want to delete this post?"
      );

      if (confirmed) {
         try {
            const res = await fetch(`/api/posts/${id}`, {
               method: "DELETE",
               headers: {
                  "Content-type": "application/json",
               },
            });

            if (res.ok) {
               const post = await res.json();
               const { publicId } = post;
               await deleteImage(publicId);

               toast.success("Post deleted successfully");
               router.push("/dashboard");
            }
         } catch (error) {
            toast.error("Something went wrong");
         }
      }
   };

   return (
      <button
         onClick={handleDelete}
         className='text-red-600 bg-transparent border border-main p-2 rounded '
      >
         Delete
      </button>
   );
}
