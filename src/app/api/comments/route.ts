import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prismadb";
import { authOptions } from "../../../../lib/authOptions";
import { NextApiRequest, NextApiResponse } from "next";

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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required.' });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId.toString(), 
      },
      cacheStrategy: { ttl: 60, swr: 10 },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong!', error });
  }
}