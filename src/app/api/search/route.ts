import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  // Using your ScraperAPI key to bypass blocks
  const SCRAPER_API_KEY = "cc5da39af369b6feb2a070eb16dbc724";

  if (!query) return NextResponse.json([]);

  try {
    const amazonUrl = `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}`;
    
    // ScraperAPI acts as a proxy to avoid 403 Forbidden errors
    const scraperUrl = `http://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(amazonUrl)}`;

    const response = await fetch(scraperUrl, {
      next: { revalidate: 3600 } // Cache results for 1 hour to save API credits
    });
    
    if (!response.ok) throw new Error("ScraperAPI limit or error");

    const data = await response.json();
    
    // Amazon returns data in format: [query, [suggestions], ...]
    return NextResponse.json(data[1] || []);
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}