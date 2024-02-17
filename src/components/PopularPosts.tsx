import React from "react";
import Post from "./Post";
import { TPost } from "@/app/types";
import Header from "./Header";
import { FaUsers } from "react-icons/fa";

interface PopularPostsProps {
   posts: TPost[] | null;
}

const PopularPosts: React.FC<PopularPostsProps> = ({ posts }) => {
   return (
      <div className=' p-2 flex flex-col gap-4 w-full'>
         <Header
            icon={<FaUsers />}
            title='Popular Posts'
         />
         <div className=' grid sm:mt-12 mt-8 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-10 pb-10'>
            {posts && posts.length > 0 ? (
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
            )}
         </div>
      </div>
   );
};

export default PopularPosts;
