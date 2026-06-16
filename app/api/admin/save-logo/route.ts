import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    // image is a base64 data URL: "data:image/jpeg;base64,/9j/4AAQSk..."
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    
    // Save to the project root directory
    const filePath = path.join(process.cwd(), "Radharani_Gemstone_Logo.jpg");
    
    fs.writeFileSync(filePath, base64Data, "base64");
    
    return NextResponse.json({ success: true, path: filePath });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save image" }, { status: 500 });
  }
}
