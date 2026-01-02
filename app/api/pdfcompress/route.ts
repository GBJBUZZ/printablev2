import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fileEntry = formData.get("file");

    // Ensure that fileEntry is not null and is a File.
    if (!fileEntry || !(fileEntry instanceof File)) {
      return new NextResponse("No file provided", { status: 400 });
    }

    // Now, TypeScript knows that fileEntry is of type File.
    const file = fileEntry;

    // Create new FormData with all required parameters.
    // Note the key change from "file" to "fileInput".
    const backendFormData = new FormData();
    backendFormData.append("fileInput", file, file.name);
    backendFormData.append("optimizeLevel", "5");
    backendFormData.append("expectedOutputSize", "");
    backendFormData.append("linearize", "false");
    backendFormData.append("normalize", "false");
    backendFormData.append("grayscale", "false");

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STIRLING_ROOT_URL}/api/v1/misc/compress-pdf`,
      {
        method: "POST",
        body: backendFormData,
        headers: {
          Accept: "application/pdf",
        },
      },
    );

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend compression failed:", errorText);
      return new NextResponse(`Compression failed: ${errorText}`, {
        status: backendResponse.status,
      });
    }

    const compressedPdf = await backendResponse.blob();

    if (!compressedPdf.size) {
      throw new Error("Received empty PDF from backend");
    }

    return new NextResponse(compressedPdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="compressed-${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Compression error:", error);
    return new NextResponse(
      `Error processing PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 },
    );
  }
}
