import React from "react";
import { FaFacebookMessenger, FaMailBulk, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
const Contact = () => {
   return (
      <Layout>
         <div className='py-12 mb-12 flex items-center justify-center flex-col gap-3'>
            <h1> 🌟 Get in Touch! 🌟</h1>
            <p className='text-center'>
               Have questions, feedback, or just want to say hello? I'd love to
               hear from you!
            </p>
            <p className='text-center'>
               Feel free to use the contact form on this page or any of the
               methods above to reach out. Your questions and messages are
               always welcome!
            </p>
            <h3>Looking forward to hearing from you soon!</h3>
         </div>
         <div className='flex flex-col items-start justify-start gap-5 md:flex-row md:justify-between'>
            <div className='flex flex-row md:flex-col py-6 gap-6 md:w-1/2 w-full flex-wrap'>
               <div className='border border-gray-500 p-2 rounded flex flex-col gap-2 items-center justify-center w-[200px]'>
                  <span>
                     <FaMailBulk />
                  </span>
                  <p>Email</p>
                  <p>bertin082@gmail.com</p>
                  <small>
                     <Link href=''>Send A Message</Link>
                  </small>
               </div>
               <div className='border border-gray-500 p-2 rounded flex flex-col gap-2 items-center justify-center w-[200px]'>
                  <span>
                     <FaFacebookMessenger />
                  </span>
                  <p>Messenger</p>
                  <p className='flex flex-wrap'>bertin Iradukunda</p>
                  <small>
                     <Link href=''>Send A Message</Link>
                  </small>
               </div>
               <div className='border border-gray-500 p-2 rounded flex flex-col gap-2 items-center justify-center w-[200px] '>
                  <span>
                     <FaWhatsapp />
                  </span>
                  <p>Whatsapp</p>
                  <p className='flex flex-wrap'>077777777</p>
                  <small>
                     <Link href=''>Send A Message</Link>
                  </small>
               </div>
            </div>
            <div className=' w-full md:p-2 mt-4'>
               <form className='flex flex-col gap-3 p-1 md:p-3'>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='name'>Name</label>
                     <input
                        type='text'
                        placeholder='Your Full Name'
                        className='border border-gray-500 p-2 rounded w-full md:w-3/4'
                     />
                  </div>
                  <div className='flex flex-col gap-1'>
                     <label htmlFor='email'>Email</label>
                     <input
                        type='text'
                        placeholder='Your Email Address'
                        className='border border-gray-500 p-2 rounded w-full md:w-3/4'
                     />
                  </div>
                  <div className='flex flex-col gap-1 w-full md:w-3/4'>
                     <label htmlFor='message'>Message</label>
                     <textarea
                        name='message'
                        id='message'
                        placeholder='Your Message'
                        className='border border-gray-500 p-2 rounded h-[150px]'
                     ></textarea>
                  </div>
                  <div>
                     <button className='border border-gray-500 p-2 rounded'>
                        Send A Message
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </Layout>
   );
};

export default Contact;
