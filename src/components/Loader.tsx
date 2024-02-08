"use client";
import { GridLoader } from "react-spinners";

function Loader() {
   return (
      <div className='w-full  flex flex-col justify-center items-center'>
         <GridLoader color='#36d7b7' />
      </div>
   );
}

export default Loader;
