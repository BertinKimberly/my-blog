import React, { Suspense } from "react";
const BackgroundVideo = () => {
   return (
      <div className='relative  w-full h-full z-0 opacity-[0.4]'>
         <video
            className='w-full h-full object-cover'
            autoPlay
            loop
            muted
            src={require("../../public/vid.mp4")}
         />
      </div>
   );
};

export default BackgroundVideo;
