import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import toast from 'react-hot-toast';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeImage = async (publicId: string) => {
  try {
   await cloudinary.v2.uploader.destroy(publicId);
    toast.success("image removed")
  } catch (error) {
   toast.error("Error in removing an image")
  }
};

export async function POST(req: Request) {
  const { publicId } = await req.json();
  await removeImage(publicId);
  return NextResponse.json({ message: "success" });
}
