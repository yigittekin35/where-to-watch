import { NextResponse } from 'next/server';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // Get region from Vercel header, fallback to fetching from an IP API for local dev
    let region = request.headers.get('x-vercel-ip-country');
    
    if (!region) {
      try {
        const ipRes = await axios.get('http://ip-api.com/json/');
        region = ipRes.data.countryCode;
      } catch (e) {
        region = 'US'; // Final fallback
      }
    }

    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    if (!TMDB_API_KEY) {
      return NextResponse.json({ error: 'TMDB API Key is not configured' }, { status: 500 });
    }

    // 1. Search for the movie or TV show
    const searchResponse = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: {
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false,
      },
    });

    const results = searchResponse.data.results.filter(
      (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
    );

    if (results.length === 0) {
      return NextResponse.json({ error: 'No results found' }, { status: 404 });
    }

    const topResults = results.slice(0, 5);
    const safeRegion = region ? region.toUpperCase() : 'US';

    // 2. Fetch watch providers for the specific media and region concurrently
    const payloads = await Promise.all(
      topResults.map(async (result: any) => {
        const mediaType = result.media_type;
        const mediaId = result.id;
        
        try {
          const providersResponse = await axios.get(
            `${TMDB_BASE_URL}/${mediaType}/${mediaId}/watch/providers`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
              },
            }
          );

          const regionalProviders = providersResponse.data.results[safeRegion] || null;

          return {
            id: mediaId,
            type: mediaType,
            title: mediaType === 'movie' ? result.title : result.name,
            overview: result.overview,
            poster_path: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : null,
            backdrop_path: result.backdrop_path ? `https://image.tmdb.org/t/p/w1280${result.backdrop_path}` : null,
            rating: result.vote_average,
            release_date: mediaType === 'movie' ? result.release_date : result.first_air_date,
            region: safeRegion,
            providers: regionalProviders ? {
              flatrate: regionalProviders.flatrate || [],
              rent: regionalProviders.rent || [],
              buy: regionalProviders.buy || [],
              link: regionalProviders.link,
            } : null,
          };
        } catch (e) {
          // If providers fetch fails for a single item, return it without providers instead of failing the whole request
          return {
            id: mediaId,
            type: mediaType,
            title: mediaType === 'movie' ? result.title : result.name,
            overview: result.overview,
            poster_path: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : null,
            backdrop_path: result.backdrop_path ? `https://image.tmdb.org/t/p/w1280${result.backdrop_path}` : null,
            rating: result.vote_average,
            release_date: mediaType === 'movie' ? result.release_date : result.first_air_date,
            region: safeRegion,
            providers: null,
          };
        }
      })
    );

    return NextResponse.json(payloads);

  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
