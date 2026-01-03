import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return NextResponse.json([]);

  // List of different Amazon endpoints to try
  const endpoints = [
    `https://completion.amazon.com/api/2017/suggestions?session-id=123-1234567-1234567&customer-id=&request-id=123&page-type=Gateway&suggestion-type=KEYWORD&suggestion-type=WIDGET&search-alias=aps&client-info=amazon-search-ui&term=${encodeURIComponent(query)}&mid=ATVPDKIKX0DER&alias=aps&ks=85`,
    `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${encodeURIComponent(query)}`
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!response.ok) continue;

      const data = await response.json();
      
      // Handle Endpoint 1 Format (Object with suggestions array)
      if (data.suggestions) {
        return NextResponse.json(data.suggestions.map((s: any) => s.value));
      }
      
      // Handle Endpoint 2 Format (Standard Array)
      if (Array.isArray(data) && data[1]) {
        return NextResponse.json(data[1]);
      }
    } catch (err) {
      console.error("Endpoint failed, trying next...");
    }
  }

  return NextResponse.json(["Try: coloring book", "Try: journal for", "Try: logbook"]);
}