import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "../../../../../lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: { select: { name: true } } },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments);
  } catch (error) {

    return NextResponse.json({ message: "Could not fetch comments" });
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

  const commentId = params.id;
  try {
    const comment = await prisma.comment.delete({ where: { id: commentId } });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ message: "Error deleting the comment" });
  }
}
