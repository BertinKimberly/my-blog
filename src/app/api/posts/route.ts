
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prismadb";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  const authorEmail = session?.user?.email as string;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 500 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        catName: selectedCategory,
        authorEmail,
      },
    });

  
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: "Could not create post." });
  }
}

export async function GET() {

  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: { ttl: 60,swr:10 },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 500 }
    );
  }
}
