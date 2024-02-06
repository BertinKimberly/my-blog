import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/Providers";
import Layout from "@/components/Layout";
import Script from "next/script";
import { cx } from "@/utils";
import { Toaster } from "react-hot-toast";

const inter = Inter({
   subsets: ["latin"],
   display: "swap",
   variable: "--font-in",
});

const manrope = Manrope({
   subsets: ["latin"],
   display: "swap",
   variable: "--font-mr",
});

export const metadata: Metadata = {
   title: "Bertin's blog",
   description: "Created by Bertin",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body
            className={cx(
               inter.variable,
               manrope.variable,
               "font-mr bg-light dark:bg-black dark:text-white"
            )}
         >
            <Script
               id='theme-switcher'
               strategy='beforeInteractive'
            >
               {`
   if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
     document.documentElement.classList.add('dark')
   } else {
     document.documentElement.classList.remove('dark')
   }
   `}
            </Script>

            <NextAuthProvider>
               <Layout>
                  <main className='mx-auto container min-h-[80vh] '>
                     {children}
                  </main>
                  <Toaster position='bottom-right' />
               </Layout>
            </NextAuthProvider>
         </body>
      </html>
   );
}
