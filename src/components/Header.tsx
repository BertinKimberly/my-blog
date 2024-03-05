import React from "react";

const Header = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
   return (
      <div className='flex flex-col gap-3 w-full justify-center items-center z-20 text-2xl'>
         <span>{icon}</span>
         <h5>{title}</h5>
      </div>
   );
};

export default Header;
