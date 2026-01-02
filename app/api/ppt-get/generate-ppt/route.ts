// app/api/ppt-get/generate-preview/route.ts
import { NextRequest, NextResponse } from "next/server";
import pptxgen from "pptxgenjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slides } = body;

    const pptx = new pptxgen();
    slides.forEach((slideData: any) => {
      const slide = pptx.addSlide();
      slide.addText(slideData.title, { x: 1, y: 1, fontSize: 24 });
      slide.addText(slideData.content, { x: 1, y: 1.5, fontSize: 18 });
    });

    // Instead of generating a download file, just return slide data as preview
    const previewSlides = slides.map((s: any) => ({
      title: s.title,
      content: s.content,
    }));

    return NextResponse.json({ slides: previewSlides });
  } catch (error) {
    console.error("Preview generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
