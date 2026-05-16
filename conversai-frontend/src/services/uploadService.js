const BASE_URL = "https://conversai-insights.onrender.com"; // your FastAPI backend

export async function uploadChatFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload_data`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return await response.json();
}