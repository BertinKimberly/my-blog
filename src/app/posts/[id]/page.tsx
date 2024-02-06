// Import necessary modules
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostDetails from "@/components/PostDetails";
import { TPost } from "@/app/types";
import toast from "react-hot-toast";

const getPostById = async (id: string) => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
         cache: "no-store",
      });

      if (!res.ok) {
         toast.error("Post not found");
      } else {
         return res.json();
      }
   } catch (error) {
      toast.error("Error fetching post");
   }
};

export default async function Page({ params }: { params: { id: string } }) {
   try {
      const post: TPost | null = await getPostById(params.id);

      const session = await getServerSession(authOptions);

      const isEditable = session?.user?.email === post?.authorEmail;

      if (!post) {
         return <div>Error: Post not found</div>;
      }

      return (
         <PostDetails
            post={post}
            isEditable={isEditable}
         />
      );
   } catch (error) {
      toast.error("Error");
      return <div>Error in fetching post details</div>;
   }
}
