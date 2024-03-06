import React from "react";
import Post from "./Post";
import { TPost } from "@/app/types";
import Header from "./Header";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import Loader from "./Loader";

interface FeaturedPostsProps {
   posts: TPost[] | null;
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
   return (
      <div className=' p-2 flex flex-col gap-4 w-full relative'>
         <div className='h-[200px] bg-[#A099CA3B] absolute -left-10 -right-20 -top-12 transform -rotate-6 z-0 '></div>
         <Header
            icon={<MdOutlineFeaturedPlayList />}
            title='Also Check On these posts'
         />
         <div className=' grid sm:mt-12 mt-8 xl:grid-cols-3 lg:grid-cols-2   mx-4 md:mx-12 sm:grid-cols-1 grid-cols-1 gap-10 pb-10 z-20'>
            {posts ? (
               posts.length > 0 ? (
                  posts.slice(0, 6).map((post: TPost) => (
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
                  <div className='py-6 text-center'>No posts to display</div>
               )
            ) : (
               <Loader />
            )}
         </div>
      </div>
   );
};

export default FeaturedPosts;
