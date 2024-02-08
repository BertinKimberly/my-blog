import React from "react";

const Header = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
   return (
      <div className='flex flex-col gap-3 w-full justify-center items-center'>
         <span>{icon}</span>
         <h5 className='text-lg'>{title}</h5>
      </div>
   );
};

export default Header;
