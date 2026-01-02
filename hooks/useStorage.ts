import { useOrder, type DocumentItem } from "@/context/orderContext";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}`;

export default function UseStorage() {
  const { order, dispatch } = useOrder();

  const uploadFile = async (file: File): Promise<DocumentItem | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/api/file/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log(data.fileUrl);

      const newDoc: DocumentItem = {
        id: data.fileId,
        fileName: file.name,
        fileUrl: data.fileUrl,
        copies: 1,
        colorType: "black and white",
        paperSize: "A4 (8.27 x 11.69 inches)",
        printType: "front",
        pageDirection: "vertical",
        pagesToPrint: "All",
        size: file.size,
      };

      dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
      return newDoc;
    } catch (err: any) {
      console.error("Upload error:", err);

      const errorDoc: DocumentItem = {
        id: `error-${Date.now()}`,
        fileName: file.name,
        fileUrl: "",
        copies: 1,
        colorType: "black and white",
        paperSize: "A4 (8.27 x 11.69 inches)",
        printType: "front",
        pageDirection: "vertical",
        pagesToPrint: "All",
        size: file.size,
        error: err.message || String(err),
      };

      dispatch({ type: "ADD_DOCUMENT", payload: errorDoc });
      return null;
    }
  };

  const deleteFile = async (
    fileId: string,
    fileName: string,
    index: number,
    setStatusMessage: (
      status: { text: string; isError?: boolean } | null,
    ) => void,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/file/${encodeURIComponent(fileId)}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status} ${response.statusText}`,
        );
      }

      await response.json();
      dispatch({ type: "REMOVE_DOCUMENT", index });
      setStatusMessage({ text: `${fileName} was successfully deleted.` });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      console.error("Delete error:", err);
      setStatusMessage({
        text: `Failed to delete ${fileName}. ${err.message || ""}`.trim(),
        isError: true,
      });
    }
  };

  return {
    uploadFile,
    deleteFile,
  };
}
