import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Forward request to backend
  const backendResponse = await fetch("http://localhost:8080/api/v1/general/split-pages", {
    method: "POST",
    body: formData,
  });

  // Handle error response
  if (!backendResponse.ok) {
    const errorText = await backendResponse.text();
    return new NextResponse(`Error: ${errorText}`, {
      status: backendResponse.status,
    });
  }

  // Get blob from backend response
  const zipBlob = await backendResponse.blob();
  const contentType = backendResponse.headers.get("Content-Type") || "application/zip";

  // Try to extract filename from Content-Disposition
  const contentDisposition = backendResponse.headers.get("Content-Disposition");
  let filename = "split-pages.zip"; // default name

  if (contentDisposition) {
    const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i);
    if (match && match[1]) {
      filename = decodeURIComponent(match[1]);
    }
  }

  // Return the zip file to client
  return new NextResponse(zipBlob, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
