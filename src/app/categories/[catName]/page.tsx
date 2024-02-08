import { TPost } from "@/app/types";
import Post from "@/components/Post";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const getPosts = async (catName: string): Promise<TPost[] | null> => {
   try {
      const res = await fetch(
         `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
         { cache: "no-store" }
      );

      if (res.ok) {
         const categories = await res.json();
         const posts = categories.posts;
         return posts;
      }
   } catch (error) {
      toast.error("Error in fetching posts");
   }

   return null;
};

export default async function CategoryPosts({
   params,
}: {
   params: { catName: string };
}) {
   const category = params.catName;
   const posts = await getPosts(category);

   return (
      <>
         <h1>
            <span className='font-normal'>Category: </span>{" "}
            {decodeURIComponent(category) || <Skeleton />}
         </h1>
         <div className='grid sm:mt-12 mt-6 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10'>
            {posts && posts.length > 0 ? (
               posts.map((post: TPost) => (
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
      </>
   );
}
