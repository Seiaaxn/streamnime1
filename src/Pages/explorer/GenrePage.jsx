// pages/explorer/GenrePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Star, Loader2,
    Wand2, Sword, Heart, Zap, Ghost, Laugh, Drama, Rocket,
    Target, Music, School, Skull, Coffee, Brain, Baby, Eye, Tv, Sparkles
} from 'lucide-react';
import axios from 'axios';

const API_BASE = 'https://anime-api-iota-beryl.vercel.app/api';

// Daftar genre lengkap
const GENRE_LIST = [
    { name: 'Fantasy', value: 'fantasy' },
    { name: 'Action', value: 'action' },
    { name: 'Adventure', value: 'adventure' },
    { name: 'Comedy', value: 'comedy' },
    { name: 'Romance', value: 'romance' },
    { name: 'Drama', value: 'drama' },
    { name: 'Shounen', value: 'shounen' },
    { name: 'School', value: 'school' },
    { name: 'Supernatural', value: 'supernatural' },
    { name: 'Isekai', value: 'isekai' },
    { name: 'Sci-Fi', value: 'sci-fi' },
    { name: 'Seinen', value: 'seinen' },
    { name: 'Reincarnation', value: 'reincarnation' },
    { name: 'Super Power', value: 'super-power' },
    { name: 'Historical', value: 'historical' },
    { name: 'Mystery', value: 'mystery' },
    { name: 'Harem', value: 'harem' },
    { name: 'Ecchi', value: 'ecchi' },
    { name: 'Slice of Life', value: 'slice-of-life' },
    { name: 'Sports', value: 'sports' },
    { name: 'Horror', value: 'horror' },
    { name: 'Mecha', value: 'mecha' },
    { name: 'Psychological', value: 'psychological' },
    { name: 'Thriller', value: 'thriller' },
    { name: 'Military', value: 'military' },
    { name: 'Music', value: 'music' },
    { name: 'Martial Arts', value: 'martial-arts' },
    { name: 'Magic', value: 'magic' },
    { name: 'Vampire', value: 'vampire' },
    { name: 'Demons', value: 'demons' },
];

const getGenreColor = (genreName) => {
    const colorMap = {
        'Fantasy': 'from-violet-500 to-purple-500',
        'Action': 'from-red-500 to-orange-500',
        'Adventure': 'from-blue-500 to-cyan-500',
        'Comedy': 'from-yellow-500 to-amber-500',
        'Romance': 'from-rose-500 to-pink-500',
        'Drama': 'from-pink-500 to-rose-500',
        'Shounen': 'from-orange-500 to-yellow-500',
        'School': 'from-blue-400 to-cyan-400',
        'Supernatural': 'from-violet-600 to-purple-600',
        'Isekai': 'from-cyan-400 to-blue-500',
        'Sci-Fi': 'from-cyan-500 to-blue-600',
        'Seinen': 'from-gray-600 to-gray-700',
        'Reincarnation': 'from-purple-400 to-pink-400',
        'Super Power': 'from-yellow-400 to-orange-400',
        'Historical': 'from-amber-600 to-yellow-600',
        'Mystery': 'from-purple-700 to-indigo-700',
        'Harem': 'from-rose-400 to-pink-500',
        'Ecchi': 'from-pink-400 to-rose-400',
        'Slice of Life': 'from-green-400 to-emerald-400',
        'Sports': 'from-orange-400 to-red-400',
        'Horror': 'from-red-800 to-gray-900',
        'Mecha': 'from-gray-500 to-zinc-600',
        'Psychological': 'from-indigo-600 to-purple-800',
        'Thriller': 'from-slate-600 to-gray-800',
        'Military': 'from-green-700 to-lime-800',
        'Music': 'from-teal-400 to-cyan-500',
        'Martial Arts': 'from-red-600 to-yellow-600',
        'Magic': 'from-fuchsia-500 to-violet-600',
        'Vampire': 'from-red-900 to-purple-900',
        'Demons': 'from-orange-800 to-red-900',
    };
    return colorMap[genreName] || 'from-primary-400 to-primary-500';
};

const GenrePage = ({ onAnimeSelect }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Fetch anime berdasarkan genre
    const fetchAnimeByGenre = async (genre, resetPage = true) => {
        setLoading(true);
        setSelectedGenre(genre);
        const currentPage = resetPage ? 1 : page;

        try {
            const res = await axios.get(`${API_BASE}/anime/genre/${genre.value}?page=${currentPage}`);
            const newAnime = res.data.anime || [];

            if (resetPage) {
                setAnimeList(newAnime);
                setPage(1);
            } else {
                setAnimeList(prev => [...prev, ...newAnime]);
            }
            setHasMore(res.data.nextPage !== null);
        } catch (error) {
            console.error('Error fetching anime by genre:', error);
            if (resetPage) setAnimeList([]);
        } finally {
            setLoading(false);
        }
    };

    // Load more
    const loadMore = async () => {
        if (loadingMore || !hasMore || !selectedGenre) return;
        setLoadingMore(true);
        const nextPage = page + 1;

        try {
            const res = await axios.get(`${API_BASE}/anime/genre/${selectedGenre.value}?page=${nextPage}`);
            setAnimeList(prev => [...prev, ...(res.data.anime || [])]);
            setHasMore(res.data.nextPage !== null);
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg">
            {selectedGenre ? (
                // ── Genre Result View ──
                <div>
                    <div className="sticky top-0 z-30 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border px-4 py-3 flex items-center gap-3">
                        <button
                            onClick={() => { setSelectedGenre(null); setAnimeList([]); }}
                            className="p-2 rounded-xl bg-dark-surface border border-dark-border text-gray-400 hover:text-white transition"
                        >
                            ←
                        </button>
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${getGenreColor(selectedGenre.name)} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{selectedGenre.name[0]}</span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-sm font-bold text-white">{selectedGenre.name} Anime</h2>
                            <p className="text-xs text-gray-500">{animeList.length} results loaded</p>
                        </div>
                    </div>

                    <div className="p-4">
                        {loading ? (
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {[...Array(18)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="aspect-[3/4] rounded-[7px] bg-dark-card animate-pulse" />
                                        <div className="h-3 w-3/4 bg-dark-card rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        ) : animeList.length > 0 ? (
                            <>
                                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                    {animeList.map((anime, index) => (
                                        <div
                                            key={index}
                                            onClick={() => onAnimeSelect(anime)}
                                            className="group cursor-pointer"
                                        >
                                            <div className="relative aspect-[3/4] rounded-[7px] overflow-hidden mb-2 bg-dark-card">
                                                <img
                                                    src={anime.image || 'https://via.placeholder.com/300x400/1a1a1a/666666?text=No+Image'}
                                                    alt={anime.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                {anime.score && anime.score !== 'N/A' && (
                                                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded">
                                                        <Star size={8} className="text-yellow-400 fill-yellow-400" />
                                                        <span className="text-[10px] font-semibold text-white">{anime.score}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xs font-medium text-white line-clamp-2 group-hover:text-primary-300 transition-colors">
                                                {anime.title}
                                            </h3>
                                            <p className="text-[10px] text-gray-500 mt-0.5">{anime.type || 'TV'}</p>
                                        </div>
                                    ))}
                                </div>

                                {hasMore && (
                                    <button
                                        onClick={loadMore}
                                        disabled={loadingMore}
                                        className="w-full mt-6 py-3 rounded-xl bg-dark-surface border border-dark-border text-sm text-gray-400 hover:text-white hover:border-primary-400/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loadingMore ? (
                                            <><Loader2 size={16} className="animate-spin" /><span>Loading...</span></>
                                        ) : (
                                            <span>Load More</span>
                                        )}
                                    </button>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-sm">No anime found for this genre</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // ── Genre Grid View ──
                <div className="p-4">
                    <h2 className="text-base font-bold text-white mb-1">Browse by Genre</h2>
                    <p className="text-xs text-gray-500 mb-4">Select a genre to explore anime</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {GENRE_LIST.map((genre) => (
                            <button
                                key={genre.value}
                                onClick={() => fetchAnimeByGenre(genre)}
                                className={`relative overflow-hidden rounded-xl h-16 bg-gradient-to-br ${getGenreColor(genre.name)} flex items-center justify-center shadow-lg active:scale-95 transition-transform`}
                            >
                                <div className="absolute inset-0 bg-black/20" />
                                <span className="relative z-10 text-white font-bold text-sm drop-shadow">{genre.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenrePage;
