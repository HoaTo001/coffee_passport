import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const numStore = request.nextUrl.searchParams.get("num");
  console.log(request.nextUrl.searchParams.get("num"));
  if (!numStore) {
    const stores = await prisma.coffeeStore.findMany();
    return NextResponse.json(stores);
  }
  else{
    const stores = await prisma.coffeeStore.findMany({
        take: parseInt(numStore)
    });
    return NextResponse.json(stores);
  }
}
