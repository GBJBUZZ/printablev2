import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Send the file to backend to convert
  const backendResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STIRLING_ROOT_URL}/api/v1/convert/file/pdf`,
    {
      method: "POST",
      body: formData,
    },
  );

  // Check if backend returned a successful response
  if (!backendResponse.ok) {
    return new Response("Conversion failed", { status: 500 });
  }

  // Pass the readable stream directly to the response
  const stream = backendResponse.body;

  if (!stream) {
    return new Response("Failed to get response body from backend", {
      status: 500,
    });
  }

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="converted.pdf"',
    },
  });
}
