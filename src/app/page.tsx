import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { TPost } from "./types";
import PopularPosts from "@/components/PopularPosts";

const getPosts = async (): Promise<TPost[] | null> => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
         cache: "no-store",
      });

      if (res.ok) {
         const posts = await res.json();
         return posts;
      }
   } catch (error) {
      console.log(error);
   }

   return null;
};

export default async function Home() {
   const posts = await getPosts();
   return (
      <>
         <h1>Welcome to This blog . Enjoy accordingly</h1>
         <PopularPosts posts={posts} />
      </>
   );
}
