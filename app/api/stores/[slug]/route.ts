import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  // Get the store slug from the URL
  const { slug } = params;
  if (!slug) {
    return NextResponse.json(
      { error: "Store ID not provided" },
      { status: 400 }
    );
  }

  const store = await prisma.coffeeStore.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!store) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  return NextResponse.json(store);
}
