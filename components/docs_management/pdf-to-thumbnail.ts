import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

export interface PdfThumbnailResult {
  success: boolean;
  imageUrl: string | null;
  error?: string;
  pdfDocument?: pdfjsLib.PDFDocumentProxy;
}

export async function convertPdfToImage(
  pdfUrl: string,
  scale = 3
): Promise<PdfThumbnailResult> {
  try {
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;

    // Get the first page
    const page = await pdfDocument.getPage(1);

    // Set up the viewport
    const viewport = page.getViewport({ scale });

    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Get the rendering context
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get canvas context");
    }

    // Render the PDF page to the canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Convert the canvas to a data URL (PNG image)
    const imageUrl = canvas.toDataURL("image/png");

    return {
      success: true,
      imageUrl,
      pdfDocument, // Return the PDF document for potential reuse
    };
  } catch (error) {
    console.error("Error converting PDF to image:", error);
    return {
      success: false,
      imageUrl: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function renderPdfPageToCanvas(
  pdfDocument: pdfjsLib.PDFDocumentProxy,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  scale = 1.5
): Promise<void> {
  try {
    // Get the page
    const page = await pdfDocument.getPage(pageNumber);

    // Set up the viewport
    const viewport = page.getViewport({ scale });

    // Set canvas dimensions to match the viewport
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Get the rendering context
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get canvas context");
    }

    // Render the PDF page to the canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
  } catch (error) {
    console.error(`Error rendering PDF page ${pageNumber}:`, error);
    throw error;
  }
}
