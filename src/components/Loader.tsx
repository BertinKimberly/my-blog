"use client";
import { GridLoader } from "react-spinners";

function Loader() {
   const checkTheme = (): string => {
      const theme = localStorage.getItem("theme");
      return theme === "light" ? "#161b22" : "#fff";
   };

   return (
      <div className='w-full  flex flex-col justify-center items-center'>
         <GridLoader color={checkTheme()} />
      </div>
   );
}

export default Loader;
