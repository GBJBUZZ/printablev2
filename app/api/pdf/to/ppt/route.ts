import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const stirlingFormData = await req.formData();

    // Call Stirling PDF API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STIRLING_ROOT_URL}/api/v1/convert/pdf/presentation`,
      {
        method: "POST",
        body: stirlingFormData,
      },
    );

    const mediaBlob = await response.blob();
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    // Try to extract filename from the Content-Disposition header
    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = "file";

    if (contentDisposition) {
      const match = contentDisposition.match(
        /filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i,
      );
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
      }
    } else {
      // Optional: guess extension from content-type if filename is missing
      const extension = contentType.split("/")[1];
      filename = `file.${extension}`;
    }

    return new NextResponse(mediaBlob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Conversion Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
