const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URL}`;
export const GetFiles = async (fileId: string, userId: string) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/esign/sign-document/${fileId}/${userId}`
    );
    const data = await res.json();
    if (data.success) return data.response;
    return null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
export const SaveSignDocument = async (formData: any) => {
  return await fetch(`${API_BASE_URL}/api/esign/updateFile`, {
    method: "POST",
    body: formData,
  });
};
export const SubmitSign = async (formData: any) => {
  return await fetch(`${API_BASE_URL}/api/esign/submitSignature`, {
    method: "POST",
    body: formData,
  });
};
export const UploadDocument = async (formData: any) => {
  return await fetch(`${API_BASE_URL}/api/esign/upload-document`, {
    method: "POST",
    body: formData,
  });
};
export const GetDocumentSignRecord = async (userId: string) => {
  return await fetch(
    `${API_BASE_URL}/api/esign/getRecords?ownerId=${userId}`,
    { cache: "no-store" } // disables cache
  );
};
export const sendSignRequestEmail = async (payload: any) => {
  return await fetch(`${API_BASE_URL}/api/esign/signRequest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
export const deleteFile = async (payload: any) => {
  return await fetch(`${API_BASE_URL}/api/esign/deleteFile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
