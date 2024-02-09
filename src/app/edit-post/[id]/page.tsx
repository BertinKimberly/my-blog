import { TPost } from "@/app/types";
import EditPostForm from "@/components/EditPostForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { authOptions } from "../../../../lib/authOptions";


export const metadata = {
   title: "Edit Post ",
   description: `Edit A Post`,
 };
const getPost = async (id: string): Promise<TPost | null> => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
         cache: "no-store",
      });

      if (res.ok) {
         const post = await res.json();
         return post;
      }
   } catch (error) {
      toast.error("Post Not found");
   }

   return null;
};

export default async function Page({ params }: { params: { id: string } }) {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/sign-in");
   }

   const id = params.id;
   const post = await getPost(id);

   return <>{post ? <EditPostForm post={post} /> : <div>Invalid Post</div>}</>;
}
