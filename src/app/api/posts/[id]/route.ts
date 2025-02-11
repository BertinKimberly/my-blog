
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../../lib/prismadb";
import { authOptions } from "../../../../../lib/authOptions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({ where: { id } ,  cacheStrategy: { ttl: 60,swr:10 },});
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Could not fetch post" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  const id = params.id;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId,
      },
      
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Error editing post" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const id = params.id;
  try {
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Error deleting the post" });
  }
}
