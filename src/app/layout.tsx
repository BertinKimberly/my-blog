import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/Providers";
import Layout from "@/components/Layout";
import Script from "next/script";
import { cx } from "@/utils";
import { siteMetadata } from "@/utils/siteMetadata";
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

export const metadata = {
   metadataBase: new URL(siteMetadata.siteUrl),
   title: {
      template: `%s | ${siteMetadata.title}`,
      default: siteMetadata.title, 
   },
   description: siteMetadata.description,
   openGraph: {
      title: siteMetadata.title,
      description: siteMetadata.description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      images: [siteMetadata.socialBanner],
      locale: "en_US",
      type: "website",
   },
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         noimageindex: true,
         "max-video-preview": -1,
         "max-image-preview": "large",
         "max-snippet": -1,
      },
   },
   twitter: {
      card: "summary_large_image",
      title: siteMetadata.title,
      images: [siteMetadata.socialBanner],
   },
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
               "font-mr bg-white/5 dark:bg-dark dark:text-white"
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
