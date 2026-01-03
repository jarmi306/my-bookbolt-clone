import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  // Your ScraperAPI Key
  const SCRAPER_API_KEY = "cc5da39af369b6feb2a070eb16dbc724";

  if (!query) return NextResponse.json([]);

  try {
    const amazonUrl = `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}`;
    
    // We add &render=true to make ScraperAPI use a real headless browser. 
    // This is much harder for Amazon to block.
    const scraperUrl = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(amazonUrl)}&render=true`;

    const response = await fetch(scraperUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store' // Ensure we get fresh results for debugging
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("ScraperAPI Error Details:", errorText);
      throw new Error(`Proxy Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data[1] || []);
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}