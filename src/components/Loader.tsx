"use client";
import { useState, useEffect } from "react";
import { GridLoader } from "react-spinners";

function Loader() {
   const [color, setColor] = useState("#161b22");

   useEffect(() => {
      const theme = window.localStorage.getItem("theme");
      const color = theme === "light" ? "#5B56F421" : "#fff";
      setColor(color);
   }, []);

   return (
      <div className='w-full flex flex-col justify-center items-center'>
         <GridLoader color={color} />
      </div>
   );
}

export default Loader;
