import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <>
         <Navbar />
         {children}
         <Footer />
      </>
   );
};

export default Layout;
