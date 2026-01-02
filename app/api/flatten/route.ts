import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const backendResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STIRLING_ROOT_URL}/api/v1/misc/flatten`,
    {
      method: "POST",
      body: formData,
    },
  );

  const pdfBlob = await backendResponse.blob();

  return new NextResponse(pdfBlob, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="converted.pdf"',
    },
  });
}
