import { PDFDocument, rgb } from "pdf-lib";
import * as htmlToImage from "html-to-image";
function hexToRgb(hex: string) {
  const sanitized = hex.replace("#", "");
  const bigint = Number.parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return rgb(r / 255, g / 255, b / 255);
}
export interface SignData {
  type: "sign" | "text" | "date" | "checkbox" | "initials" | "documentId";
  signUrl?: string;
  value?: string | boolean;
  checked?: boolean;
  fontSize?: number;
  color?: string;
  signSize: { width: number; height: number };
  position: { x: number; y: number; pageIndex: number | null };
}

export const drawSignatureOnPdf = async (
  pdfData: ArrayBuffer,
  signs: SignData[],
  signId?: string
) => {
  const pdfDoc = await PDFDocument.load(pdfData);
  let i = -1;

  for (const sign of signs) {
    i++;
    const page = pdfDoc.getPage(sign.position.pageIndex || 0);
    const { height } = page.getSize();

    if (sign.type === "sign" && sign.signUrl) {
      const isPng = sign.signUrl.startsWith("data:image/png");
      const img = isPng
        ? await pdfDoc.embedPng(sign.signUrl)
        : await pdfDoc.embedJpg(sign.signUrl);

      page.drawImage(img, {
        x: sign.position.x,
        y: height - sign.position.y - sign.signSize.height,
        width: sign.signSize.width,
        height: sign.signSize.height,
      });
      if (signId) {
        page.drawText(signId, {
          x: sign.position.x,
          y: height - sign.position.y,
          size: 10,
          color: hexToRgb("#80919E"),
        });
      }
    } else if (
      sign.type === "text" ||
      sign.type === "date" ||
      sign.type === "initials" ||
      sign.type === "documentId"
    ) {
      const fontSize = sign.fontSize || 12;
      const baselineOffset = fontSize * 1.2;
      const yPosition = height - sign.position.y - baselineOffset;

      // Convert boolean value to string
      const textValue = typeof sign.value === "boolean" ? String(sign.value) : sign.value || "";

      page.drawText(textValue, {
        x: sign.position.x,
        y: yPosition,
        size: fontSize,
        color: hexToRgb(sign.color || "#000"),
      });
    } else if (sign.type === "checkbox") {
      const element = document.getElementById(`check-${i}`) as HTMLInputElement;

      if (element && sign.type === "checkbox") {
        if (!!sign.value) {
          element.setAttribute("checked", "true");
        }

        try {
          const dataUrl = await htmlToImage.toPng(element);
          const embeddedCheckbox = await pdfDoc.embedPng(dataUrl);
          page.drawImage(embeddedCheckbox, {
            x: sign.position.x,
            y: (height - sign.position.y - sign.signSize.height) * 1.25, // adjusted y for exact positioning
            width: sign.signSize.width,
            height: sign.signSize.height,
          });
        } catch (error) {
          console.error("Failed to render checkbox image:", error);
        }
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  return blob;
};


