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
    <main className="min-h-screen flex flex-col items-center pt-20 pb-12 px-4 relative overflow-x-hidden">
      {/* Background decorations - Theater Curtain Velvet & Stage Spotlight Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Overhead Stage Spotlight */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-primary/25 blur-[160px] rounded-full" />
        {/* Warm Stage Gold Glow */}
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[45%] h-[30%] bg-secondary/15 blur-[130px] rounded-full" />
        {/* Deep Velvet Drapery Shadows */}
        <div className="absolute top-0 left-[-15%] w-[40%] h-[90%] bg-curtain-900/70 blur-[130px] rounded-full" />
        <div className="absolute top-0 right-[-15%] w-[40%] h-[90%] bg-curtain-900/70 blur-[130px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-10 relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-curtain-800/80 border border-primary/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-5 shadow-lg shadow-black/50">
          <Film className="w-3.5 h-3.5 text-amber-400" />
          <span>Theatrical Streaming Guide</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-stone-100">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">Stream</span>
        </h1>
        <p className="text-stone-300 text-lg md:text-xl leading-relaxed">
          Discover exactly which platforms hold the keys to your favorite movies and series, tailored perfectly to your region.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl relative z-10 mb-14 px-2 md:px-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-rose-700 to-secondary rounded-2xl blur opacity-35 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative glass-panel-curtain rounded-2xl flex items-center p-1.5 md:p-2 focus-within:ring-2 focus-within:ring-secondary/60 transition-all border border-rose-900/50">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-amber-400/80 ml-2 md:ml-3 mr-1 md:mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Inception, Breaking Bad, The Godfather..."
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-base md:text-lg px-2 py-2 md:py-3 text-stone-100 placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary via-rose-700 to-secondary hover:from-primary-light hover:to-gold-light text-white px-5 md:px-7 py-2.5 md:py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shrink-0 text-sm md:text-base border border-amber-400/20"
            >
              {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="glass-panel-curtain text-rose-300 px-6 py-4 rounded-xl mb-8 relative z-10 border border-rose-700/40 bg-curtain-900/80 shadow-xl max-w-xl text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="w-full max-w-4xl flex flex-col gap-8 relative z-10">
          {results.map((result, index) => (
            <div key={`${result.id}-${result.type}`} className="w-full glass-panel-curtain rounded-3xl overflow-hidden relative border border-rose-900/40 hover:border-secondary/40 transition-all duration-300 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
              <div className="flex flex-col md:flex-row">
                {/* Poster */}
                {result.poster_path ? (
                  <div className="md:w-1/3 relative shrink-0 md:self-start">
                    <img 
                      src={result.poster_path} 
                      alt={result.title} 
                      className="w-full aspect-[2/3] object-cover object-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140407] to-transparent md:hidden rounded-t-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#140407]/90 hidden md:block rounded-l-3xl pointer-events-none" />
                  </div>
                ) : (
                  <div className="md:w-1/3 aspect-[2/3] bg-curtain-900 flex items-center justify-center shrink-0 border-r border-rose-950">
                    {result.type === 'movie' ? <Film className="w-16 h-16 text-rose-800" /> : <Tv className="w-16 h-16 text-rose-800" />}
                  </div>
                )}

                {/* Content */}
                <div className="md:w-2/3 p-8 flex flex-col w-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-stone-100">{result.title}</h2>
                      <div className="flex items-center gap-3 text-stone-400 text-sm font-medium flex-wrap">
                        {result.release_date && <span>{result.release_date.substring(0, 4)}</span>}
                        <span className="flex items-center gap-1.5 bg-curtain-950/80 px-2.5 py-1 rounded-md border border-secondary/30">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-amber-300 font-bold">{result.rating ? result.rating.toFixed(1) : 'N/A'}</span>
                        </span>
                        <span className="uppercase text-xs tracking-wider bg-curtain-800/90 text-rose-200 border border-primary/40 px-2.5 py-1 rounded-md font-bold">
                          {result.type === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-stone-300 leading-relaxed text-sm md:text-base transition-all duration-300">
                      {result.overview 
                        ? (result.overview.length > 250 && !expandedIds.has(`${result.id}-${result.type}`)
                            ? `${result.overview.substring(0, 250)}...`
                            : result.overview)
                        : 'No overview available for this title.'}
                    </p>
                    {result.overview && result.overview.length > 250 && (
                      <button 
                        onClick={() => toggleExpand(`${result.id}-${result.type}`)}
                        className="text-amber-400 hover:text-amber-300 text-sm font-medium mt-1 focus:outline-none transition-colors"
                      >
                        {expandedIds.has(`${result.id}-${result.type}`) ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Streaming Platforms */}
                  <div className="mt-auto pt-4 border-t border-rose-950">
                    <div className="flex items-center gap-2 mb-4">
                      <MonitorPlay className="w-5 h-5 text-amber-400" />
                      <h3 className="text-lg font-semibold text-stone-100">Available on <span className="text-amber-400/80 text-sm font-normal">({result.region})</span></h3>
                    </div>

                    {result.providers && (result.providers.flatrate?.length > 0 || result.providers.rent?.length > 0 || result.providers.buy?.length > 0) ? (
                      <div className="space-y-4">
                        {/* Streaming (Flatrate) */}
                        {result.providers.flatrate?.length > 0 && (
                          <div>
                            <p className="text-xs text-amber-200/70 mb-2 uppercase tracking-wider font-semibold">Stream (Subscription)</p>
                            <div className="flex flex-wrap gap-2.5">
                              {result.providers.flatrate.map((provider: any) => (
                                <div key={provider.provider_id} className="group relative">
                                  <img 
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-10 h-10 rounded-xl shadow-lg border border-rose-900/50 group-hover:border-amber-400/70 group-hover:scale-110 transition-all duration-300 cursor-pointer"
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
                            <p className="text-xs text-amber-200/70 mb-2 uppercase tracking-wider font-semibold">Rent / Buy</p>
                            <div className="flex flex-wrap gap-2.5">
                              {Array.from(new Map([...(result.providers.rent || []), ...(result.providers.buy || [])].map(item => [item.provider_id, item])).values()).map((provider: any) => (
                                <img 
                                  key={provider.provider_id}
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  className="w-8 h-8 rounded-lg shadow-lg border border-rose-900/50 opacity-80 group-hover:opacity-100 group-hover:border-amber-400/70 transition-all duration-300 cursor-pointer"
                                  title={provider.provider_name}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-curtain-950/60 rounded-xl p-3.5 border border-rose-950/80 flex items-center justify-center">
                        <p className="text-stone-400 text-sm">No streaming platforms found for this region.</p>
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
      <footer className="mt-auto pt-16 pb-6 text-center text-sm text-stone-500 relative z-10 w-full">
        <p>Where to Watch &copy; {new Date().getFullYear()} — Powered by TMDB data.</p>
      </footer>
    </main>
  );
}
