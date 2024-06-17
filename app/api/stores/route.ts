import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const stores = await prisma.coffeeStore.findMany();
    
    return NextResponse.json(stores);
}