import Link from "next/link";
import React from "react";

const Navbar = () => {
   return (
      <nav className='container h-[100px] mx-auto flex items-center'>
         <div>
            <Link href='/'>BERTIN</Link>
         </div>
      </nav>
   );
};

export default Navbar;
