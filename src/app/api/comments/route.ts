import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prismadb";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);


  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }


  try {
    const { postId, content } = await req.json();
    const userEmail = session?.user?.email as string;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "Post ID and content are required." },
        { status: 500 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        postId,
        userEmail,
        content,
      },
    });


    return NextResponse.json({message:"Comment Created",newComment});
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET(req:Request) {
   const {postId}=await req.json();
   
   if (!postId ) {
    return NextResponse.json(
      { error: "Post ID is required." },
      { status: 500 }
    );
  }
  try {
     const response=await prisma.comment.findMany({
       where: {
          postId,
       },
       include: {
          user: true,
       },
    });
return NextResponse.json(response)
}catch(error){
  return NextResponse.json(
    { message: "Something went wrong!" },
    { status: 500 }
  );
  }
}