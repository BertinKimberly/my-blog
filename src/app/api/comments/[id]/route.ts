import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../../lib/prismadb";
import { authOptions } from "../../../../../lib/authOptions";



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
