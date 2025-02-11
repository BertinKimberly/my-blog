import Link from "next/link";
import { TCategory } from "@/app/types";
import { Suspense } from "react";

const getCategories = async (): Promise<TCategory[] | null> => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);

      if (res.ok) {
         const categories = await res.json();
         return categories;
      }
   } catch (error) {
      console.log(error);
   }
   return null;
};

export default async function CategoriesList() {
   const categories = await getCategories();
   if (!Array.isArray(categories)) {
      console.error("Categories is not an array:", categories);
      return null; // or return some default content or handle the error
   }
   return (
      <Suspense fallback={<p className='text-center'>Loading...</p>}>
         <div className='flex gap-2 text-sm flex-wrap mt-8'>
            {categories &&
               categories?.map((category) => (
                  <Link
                     key={category.id}
                     className='px-4 py-1 rounded-md bg-[#5B56F421] text-black dark:text-white cursor-pointer'
                     href={`/categories/${category.catName}`}
                  >
                     {category.catName}
                  </Link>
               ))}
         </div>
      </Suspense>
   );
}
