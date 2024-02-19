import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { TPost } from "../types";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export const metadata = {
   title: "All Posts ",
   description: `All posts are available here`,
};
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
      console.error("Something went wrong");
   }

   return null;
};

export default async function Page() {
   const posts = await getPosts();
   return (
      <>
         <CategoriesList />
         <Suspense fallback={<Loader />}>
            <div className='grid sm:mt-12 mt-6 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10 py-6 mb-20'>
               {posts && posts?.length > 0 ? (
                  posts?.map((post: TPost) => (
                     <Post
                        key={post.id}
                        id={post.id}
                        author={post.author.name}
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
                  <div className='py-6'>No posts to display</div>
               )}
            </div>
         </Suspense>
      </>
   );
}
