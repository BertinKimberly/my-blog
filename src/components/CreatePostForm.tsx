"use client";
import { CiLink } from "react-icons/ci";
import { TCategory } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaPlus, FaTimes, FaUpload } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePostForm() {
   const [links, setLinks] = useState<string[]>([]);
   const [linkInput, setLinkInput] = useState("");
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [categories, setCategories] = useState<TCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [imageUrl, setImageUrl] = useState("");
   const [publicId, setPublicId] = useState("");

   const router = useRouter();

   useEffect(() => {
      const fetchAllCategories = async () => {
         const res = await fetch("api/categories");
         const catNames = await res.json();
         setCategories(catNames);
      };

      fetchAllCategories();
   }, []);

   const handleImageUpload = (result: CldUploadWidgetResults) => {
      const info = result.info as object;

      if ("secure_url" in info && "public_id" in info) {
         const url = info.secure_url as string;
         const public_id = info.public_id as string;
         setImageUrl(url);
         setPublicId(public_id);
      }
   };

   const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (linkInput.trim() !== "") {
         setLinks((prev) => [...prev, linkInput]);
         setLinkInput("");
      }
   };

   const deleteLink = (index: number) => {
      setLinks((prev) => prev.filter((_, i) => i !== index));
   };

   const removeImage = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         const res = await fetch("api/removeImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
         });

         if (res.ok) {
            setImageUrl("");
            setPublicId("");
         }
      } catch (error) {
         toast.error("Failed To upload ");
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title || !content) {
         const errorMessage = "Title and content are required";
         toast.error(errorMessage);
         return;
      }

      try {
         const res = await fetch("api/posts/", {
            method: "POST",
            headers: {
               "Content-type": "application/json",
            },
            body: JSON.stringify({
               title,
               content,
               links,
               selectedCategory,
               imageUrl,
               publicId,
            }),
         });

         if (res.ok) {
            toast.success("Post created successfully");
            router.push("/dashboard");
            router.refresh();
         } else {
            toast.error("Something went wrong.");
         }
      } catch (error) {
         toast.error("Something went wrong.");
      }
   };

   return (
      <div>
         <h2 className='mb-2'>Create Post</h2>
         <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 py-10'
         >
            <input
               onChange={(e) => setTitle(e.target.value)}
               type='text'
               placeholder='Title'
               className='w-full text-sm mt-2 p-4 border rounded text-black dark:text-white  bg-transparent'
            />
            <ReactQuill
               onChange={(value) => setContent(value)}
               placeholder='Content'
               className='rounded'
            />

            {links &&
               links.map((link, i) => (
                  <div
                     key={i}
                     className='flex items-center gap-4'
                  >
                     <span>
                        <CiLink />
                     </span>
                     <Link
                        className='link'
                        href={link}
                     >
                        {link}
                     </Link>
                     <span
                        className='cursor-pointer'
                        onClick={() => deleteLink(i)}
                     >
                        <FaTimes />
                     </span>
                  </div>
               ))}

            <div className='flex gap-2'>
               <input
                  className='w-full text-sm mt-2 p-4 border border-border rounded text-black dark:text-white  bg-transparent'
                  type='text'
                  onChange={(e) => setLinkInput(e.target.value)}
                  value={linkInput}
                  placeholder='Paste the link and click on Add'
               />
               <button
                  onClick={addLink}
                  className=' text-sm mt-2 p-4 border border-border rounded text-black dark:text-white'
               >
                  <FaPlus />
               </button>
            </div>

            <CldUploadButton
               uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
               className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-transparent rounded-md relative ${
                  imageUrl && "pointer-events-none"
               }`}
               onUpload={handleImageUpload}
            >
               <div>
                  <FaUpload />
               </div>

               {imageUrl && (
                  <Image
                     src={imageUrl}
                     fill
                     className='absolute object-cover inset-0'
                     alt={title}
                  />
               )}
            </CldUploadButton>

            {publicId && (
               <button
                  onClick={removeImage}
                  className='py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4'
               >
                  Remove Image
               </button>
            )}

            <select
               onChange={(e) => setSelectedCategory(e.target.value)}
               className='w-full mt-2 px-6 py-4 text-text bg-main border rounded text-white'
            >
               <option
                  value=''
                  className='bg-white text-black'
               >
                  Select A Category
               </option>
               {categories &&
                  categories.map((category) => (
                     <option
                        key={category.id}
                        value={category.catName}
                     >
                        {category.catName}
                     </option>
                  ))}
            </select>

            <button
               className='bg-main transition-all hover:bg-transparent hover:text-main flex-rows gap-4 text-white p-4 rounded-lg w-full border border-border my-3'
               type='submit'
            >
               Create Post
            </button>
         </form>
      </div>
   );
}
