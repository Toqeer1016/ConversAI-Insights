const BASE_URL = "https://conversai-insights.onrender.com";

export async function getProductivityAnalysis(metrics) {

  const response = await fetch(
    `${BASE_URL}/productivity-analysis`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(metrics)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze productivity");
  }

  return await response.json();
}