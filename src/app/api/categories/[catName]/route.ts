import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { catName: string } }
) {
  try {
    const catName = params.catName;
    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
      cacheStrategy: { ttl: 60,swr:10 },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Could not fetch post" });
  }
}
