import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/Providers";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

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
         <body className={inter.className}>
            <NextAuthProvider>
               <Layout>
                  <main className='container min-h-[80vh]'>{children}</main>
               </Layout>
            </NextAuthProvider>
         </body>
      </html>
   );
}
