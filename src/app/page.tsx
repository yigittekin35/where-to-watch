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
    <main className="min-h-screen flex flex-col items-center pt-20 pb-16 px-4 relative overflow-x-hidden">
      {/* Background Subtle Ambient Lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-cinema-red/[0.07] blur-[160px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-indigo-950/20 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-10 relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-stone-300 text-xs font-medium tracking-wide mb-4 shadow-sm">
          <Film className="w-3.5 h-3.5 text-cinema-red" />
          <span>Streaming Availability Guide</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight text-white">
          Where to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-stone-400">Watch</span>
        </h1>
        <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Find which streaming services host your favorite movies and shows in your region.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl relative z-10 mb-12 px-2 md:px-0">
        <div className="cinema-input-wrapper rounded-2xl flex items-center p-1.5 md:p-2">
          <Search className="w-5 h-5 text-stone-400 ml-2 md:ml-3 mr-1 md:mr-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movie or TV show (e.g. Inception, Breaking Bad)..."
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-base md:text-lg px-2 py-2 md:py-2.5 text-white placeholder:text-stone-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cinema-red hover:bg-rose-600 text-white px-5 md:px-7 py-2.5 md:py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-cinema-red/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0 text-sm md:text-base"
          >
            {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : 'Search'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3.5 rounded-xl mb-8 relative z-10 max-w-xl text-center text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="w-full max-w-4xl flex flex-col gap-6 relative z-10">
          {results.map((result, index) => (
            <div key={`${result.id}-${result.type}`} className="w-full cinema-card rounded-2xl overflow-hidden relative animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>
              <div className="flex flex-col md:flex-row">
                {/* Poster */}
                {result.poster_path ? (
                  <div className="md:w-1/3 relative shrink-0 md:self-start">
                    <img 
                      src={result.poster_path} 
                      alt={result.title} 
                      className="w-full aspect-[2/3] object-cover object-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141f] to-transparent md:hidden rounded-t-2xl" />
                  </div>
                ) : (
                  <div className="md:w-1/3 aspect-[2/3] bg-surface flex items-center justify-center shrink-0 border-r border-white/[0.06]">
                    {result.type === 'movie' ? <Film className="w-14 h-14 text-stone-600" /> : <Tv className="w-14 h-14 text-stone-600" />}
                  </div>
                )}

                {/* Content */}
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col w-full">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{result.title}</h2>
                      <div className="flex items-center gap-2.5 text-stone-400 text-sm font-medium flex-wrap">
                        {result.release_date && <span>{result.release_date.substring(0, 4)}</span>}
                        <span className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-yellow-400" />
                          <span>{result.rating ? result.rating.toFixed(1) : 'N/A'}</span>
                        </span>
                        <span className="uppercase text-xs tracking-wider bg-white/[0.06] text-stone-300 border border-white/[0.08] px-2.5 py-0.5 rounded-md font-medium">
                          {result.type === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-stone-300 leading-relaxed text-sm md:text-base">
                      {result.overview 
                        ? (result.overview.length > 250 && !expandedIds.has(`${result.id}-${result.type}`)
                            ? `${result.overview.substring(0, 250)}...`
                            : result.overview)
                        : 'No overview available for this title.'}
                    </p>
                    {result.overview && result.overview.length > 250 && (
                      <button 
                        onClick={() => toggleExpand(`${result.id}-${result.type}`)}
                        className="text-stone-400 hover:text-white text-xs font-medium mt-1.5 focus:outline-none transition-colors underline"
                      >
                        {expandedIds.has(`${result.id}-${result.type}`) ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Streaming Platforms */}
                  <div className="mt-auto pt-4 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2 mb-3.5">
                      <MonitorPlay className="w-4 h-4 text-cinema-red" />
                      <h3 className="text-sm md:text-base font-semibold text-white">Available in <span className="text-stone-400 font-normal">({result.region})</span></h3>
                    </div>

                    {result.providers && (result.providers.flatrate?.length > 0 || result.providers.rent?.length > 0 || result.providers.buy?.length > 0) ? (
                      <div className="space-y-3.5">
                        {/* Streaming (Flatrate) */}
                        {result.providers.flatrate?.length > 0 && (
                          <div>
                            <p className="text-[11px] text-stone-400 mb-2 uppercase tracking-wider font-semibold">Stream</p>
                            <div className="flex flex-wrap gap-2.5">
                              {result.providers.flatrate.map((provider: any) => (
                                <div key={provider.provider_id} className="group relative">
                                  <img 
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-10 h-10 rounded-xl shadow border border-white/[0.08] group-hover:border-white/[0.25] group-hover:scale-105 transition-all duration-200 cursor-pointer"
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
                            <p className="text-[11px] text-stone-400 mb-2 uppercase tracking-wider font-semibold">Rent / Buy</p>
                            <div className="flex flex-wrap gap-2">
                              {Array.from(new Map([...(result.providers.rent || []), ...(result.providers.buy || [])].map(item => [item.provider_id, item])).values()).map((provider: any) => (
                                <img 
                                  key={provider.provider_id}
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  className="w-8 h-8 rounded-lg shadow border border-white/[0.08] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200 cursor-pointer"
                                  title={provider.provider_name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05] flex items-center justify-center">
                        <p className="text-stone-400 text-xs">No streaming platforms currently listed for this region.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto pt-16 pb-6 text-center text-xs text-stone-500 relative z-10 w-full flex flex-col items-center gap-1.5">
        <p>Where to Watch &copy; {new Date().getFullYear()} — Powered by TMDB data.</p>
        <a 
          href="https://watch.yigittekin.nl/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-white transition-colors"
        >
          watch.yigittekin.nl
        </a>
      </footer>
    </main>
  );
}
