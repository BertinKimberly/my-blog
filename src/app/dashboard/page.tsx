import Post from "@/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { TPost } from "../types";
import { authOptions } from "../../../lib/authOptions";

export const metadata = {
   title: "Dashboard ",
   description: `User's Dashboard`,
};
const getPosts = async (email: string) => {
   try {
      const res = await fetch(
         `${process.env.NEXTAUTH_URL}/api/authors/${email}`
      );
      const { posts } = await res.json();
      return posts;
   } catch (error) {
      return null;
   }
};

export default async function Dashboard() {
   const session = await getServerSession(authOptions);
   const email = session?.user?.email;

   let posts = [];

   if (!session) {
      redirect("/sign-in");
   }

   if (email) {
      posts = await getPosts(email);
   }

   return (
      <div>
         <h1>My Posts</h1>
         <div className=' grid sm:mt-12 mt-8 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10 pb-10'>
            {posts && posts.length > 0 ? (
               posts.map((post: TPost) => (
                  <Post
                     key={post.id}
                     id={post.id}
                     author={session?.user?.name as string}
                     authorEmail={post.authorEmail}
                     date={post.createdAt}
                     thumbnail={post.imageUrl}
                     category={post.catName}
                     title={post.title}
                     content={post.content}
                     links={post.links || []}
                  />
               ))
            ) : (
               <div className='py-6'>
                  No posts created yet.{" "}
                  <Link
                     className='underline'
                     href={"/create-post"}
                  >
                     Create New
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
}
