import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";




export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return console.log('Hi');
    
  }

  const body = await request.json();
  const { 
    name,
    description,
    imageSrc
   } = body;



  const listing = await prisma.listing.create({
    data: {
      name,
      imageSrc,
      description,
      userId:currentUser.id

    }
  });

  return NextResponse.json(listing);
}