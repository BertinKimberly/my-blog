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

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      include: { user: { select: { name: true } } },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { message: "Some error occurred while fetching comments" },
      { status: 500 }
    );
  }
}
