// Import necessary modules
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostDetails from "@/components/PostDetails";
import { TPost } from "@/app/types";


const getPostById = async (id: string) => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
         cache: "no-store",
      });

      if (!res.ok) {
         console.error("Error: Post not found");
      } else {
   
         console.log("HOW GREAT IS OUR GOD", res);

         return res.json();
      }
   } catch (error) {
      console.error("Error fetching post:", error);
   }
};


export default async function Page({ params }: { params: { id: string } }) {
   try {
      console.log("Fetching post details for id:", params.id);

     
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
      console.error("Error in PostDetailsPage:", error);
      return <div>Error in fetching post details</div>;
   }
}
