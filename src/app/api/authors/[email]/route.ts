import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;
    const posts = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
      cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Could not fetch post" });
  }
}
