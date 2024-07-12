import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
    console.log("here");
  // Get the store slug from the URL
  const { slug } = params;
  if (!slug) {
    return NextResponse.json(
      { error: "Store ID not provided" },
      { status: 400 }
    );
  }
  //const filePath = __dirname + "../../public/carousel/" + String(slug);
  const filePath = path.resolve('./public/carousel',String(slug))
  const filenames = fs.readdirSync(filePath);

//   filenames.forEach(file => { 
//        console.log(file); 
//      })
  return NextResponse.json({images: filenames});
}