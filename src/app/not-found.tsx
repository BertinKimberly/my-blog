import Link from "next/link";


export const metadata = {
   title: "404 Error ",
   description: `Page not found`,
};

export default function NotFound() {
   return (
      <section className='my-32 w-full  flex justify-center '>
         <div className='relative flex flex-col items-center justify-center'>
            <h1
               className={`inline-block 
      text-6xl font-bold w-full capitalize xl:text-8xl text-center`}
            >
               Oops
            </h1>
            <h2
               className={`inline-block 
      text-5xl font-bold w-full capitalize xl:text-6xl text-center mt-4 tracking-wide leading-snug`}
            >
               Page Not Found!
            </h2>
            <Link
               href='/'
               className='self-center mt-8 inline-block rounded-lg border-2 border-solid bg-dark px-4 py-2
        font-semibold text-light hover:border-dark hover:bg-light hover:text-dark 
        dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
        '
            >
               Go To Home
            </Link>
         </div>
      </section>
   );
}
