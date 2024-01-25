// Import necessary modules
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostDetails from "@/components/PostDetails";
import { TPost } from "@/app/types";

// Function to fetch post by ID
const getPostById = async (id: string) => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
         cache: "no-store",
      });

      if (!res.ok) {
         console.error("Error: Post not found");
      } else {
         // Make sure to remove the console.log statement before return
         console.log("HOW GREAT IS OUR GOD", res);

         return res.json();
      }
   } catch (error) {
      console.error("Error fetching post:", error);
   }
};

// Main component
export default async function Page({ params }: { params: { id: string } }) {
   try {
      console.log("This is id", params.id);

      // Fetch post by ID
      const post : TPost= await getPostById(params.id);

      // Get server session
      const session = await getServerSession(authOptions);

      // Check if the user is the author of the post
      const isEditable = session?.user?.email === post?.authorEmail;

      if (!post) {
         return <div>Error: Post not found</div>;
      }

      // Format the date
      const dateObject = new Date(post.date);
      const options: Intl.DateTimeFormatOptions = {
         month: "short",
         day: "numeric",
         year: "numeric",
      };
      const formattedDate = dateObject.toLocaleDateString("en-US", options);

      // Render the PostDetails component
      return (
         <PostDetails
            post={post}
            isEditable={isEditable}
            formattedDate={formattedDate}
         />
      );
   } catch (error) {
      console.error("Error in PostDetailsPage:", error);
      return <div>Error in fetching post details</div>;
   }
}
