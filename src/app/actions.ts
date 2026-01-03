"use client"; // We will remove this for actions, use the code below:

export async function getAmazonSuggestions(query: string) {
  try {
    const response = await fetch(
      `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}`,
      { method: 'GET' }
    );
    const data = await response.json();
    return data[1] || []; // Returns the array of suggestions
  } catch (error) {
    console.error("Server Action Error:", error);
    return [];
  }
}