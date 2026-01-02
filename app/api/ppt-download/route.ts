import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

export async function POST(req: Request) {
  const { slides, theme, authorName } = await req.json();
  const pptx = new PptxGenJS();

  for (const slide of slides) {
    const slideObj = pptx.addSlide();
    slideObj.addText(slide.content.title, { x: 1, y: 1, fontSize: 24 });
    slideObj.addText(slide.content.body, { x: 1, y: 2, fontSize: 16 });
    // Add more slide content here based on your structure
  }

  const base64 = await pptx.write({ outputType: "base64" });

  return NextResponse.json({ base64 });
}
