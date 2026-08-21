"use client";

import { useState } from 'react';
import axios from 'axios';
import { Search, Loader2, Star, MonitorPlay, Film, Tv } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Movie or TV show not found. Please try another search.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 px-4 relative overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Stream</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
          Discover exactly which platforms hold the keys to your favorite movies and series, tailored perfectly to your region.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl relative z-10 mb-16 px-2 md:px-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative glass-panel rounded-2xl flex items-center p-1.5 md:p-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-400 ml-2 md:ml-3 mr-1 md:mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Inception, Breaking Bad..."
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-base md:text-lg px-2 py-2 md:py-3 text-white placeholder:text-gray-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shrink-0 text-sm md:text-base"
            >
              {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="glass-panel text-red-400 px-6 py-4 rounded-xl mb-8 relative z-10 border-red-500/20 bg-red-500/10">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="w-full max-w-4xl flex flex-col gap-8 relative z-10">
          {results.map((result, index) => (
            <div key={`${result.id}-${result.type}`} className="w-full glass-panel rounded-3xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
              <div className="flex flex-col md:flex-row">
                {/* Poster */}
                {result.poster_path ? (
                  <div className="md:w-1/3 relative shrink-0 md:self-start">
                    <img 
                      src={result.poster_path} 
                      alt={result.title} 
                      className="w-full aspect-[2/3] object-cover object-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden rounded-t-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 hidden md:block rounded-l-3xl pointer-events-none" />
                  </div>
                ) : (
                  <div className="md:w-1/3 aspect-[2/3] bg-surface flex items-center justify-center shrink-0 border-r border-white/5">
                    {result.type === 'movie' ? <Film className="w-16 h-16 text-gray-600" /> : <Tv className="w-16 h-16 text-gray-600" />}
                  </div>
                )}

                {/* Content */}
                <div className="md:w-2/3 p-8 flex flex-col w-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{result.title}</h2>
                      <div className="flex items-center gap-4 text-gray-400 text-sm font-medium flex-wrap">
                        {result.release_date && <span>{result.release_date.substring(0, 4)}</span>}
                        <span className="flex items-center gap-1 bg-surface/80 px-2 py-1 rounded-md border border-white/5">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-white">{result.rating ? result.rating.toFixed(1) : 'N/A'}</span>
                        </span>
                        <span className="uppercase text-xs tracking-wider bg-primary/20 text-primary px-2 py-1 rounded-md font-bold">
                          {result.type === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base transition-all duration-300">
                      {result.overview 
                        ? (result.overview.length > 250 && !expandedIds.has(`${result.id}-${result.type}`)
                            ? `${result.overview.substring(0, 250)}...`
                            : result.overview)
                        : 'No overview available for this title.'}
                    </p>
                    {result.overview && result.overview.length > 250 && (
                      <button 
                        onClick={() => toggleExpand(`${result.id}-${result.type}`)}
                        className="text-primary hover:text-primary-400 text-sm font-medium mt-1 focus:outline-none transition-colors"
                      >
                        {expandedIds.has(`${result.id}-${result.type}`) ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Streaming Platforms */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                      <MonitorPlay className="w-5 h-5 text-secondary" />
                      <h3 className="text-lg font-semibold">Available on <span className="text-gray-500 text-sm font-normal">({result.region})</span></h3>
                    </div>

                    {result.providers && (result.providers.flatrate?.length > 0 || result.providers.rent?.length > 0 || result.providers.buy?.length > 0) ? (
                      <div className="space-y-4">
                        {/* Streaming (Flatrate) */}
                        {result.providers.flatrate?.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Stream (Subscription)</p>
                            <div className="flex flex-wrap gap-2">
                              {result.providers.flatrate.map((provider: any) => (
                                <div key={provider.provider_id} className="group relative">
                                  <img 
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-10 h-10 rounded-lg shadow-lg border border-white/10 group-hover:scale-110 transition-transform cursor-pointer"
                                    title={provider.provider_name}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Rent/Buy */}
                        {(!result.providers.flatrate || result.providers.flatrate.length === 0) && (result.providers.rent?.length > 0 || result.providers.buy?.length > 0) && (
                          <div>
                            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Rent / Buy</p>
                            <div className="flex flex-wrap gap-2">
                              {Array.from(new Map([...(result.providers.rent || []), ...(result.providers.buy || [])].map(item => [item.provider_id, item])).values()).map((provider: any) => (
                                <img 
                                  key={provider.provider_id}
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  className="w-8 h-8 rounded-md shadow-lg border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                                  title={provider.provider_name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-surface/30 rounded-lg p-3 border border-white/5 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">No streaming platforms found for this region.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
