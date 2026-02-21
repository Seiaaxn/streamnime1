// pages/explorer/AllAnimePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Loader2, Tv } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'https://anime-api-iota-beryl.vercel.app/api';

const AllAnimePage = ({ onAnimeSelect }) => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/anime/list?page=1`);
                setAnimeList(res.data.anime || []);
                setHasMore(res.data.nextPage !== null);
            } catch (error) {
                console.error('Error fetching anime:', error);
                setAnimeList([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAnime();
    }, []);

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        try {
            const res = await axios.get(`${API_BASE}/anime/list?page=${nextPage}`);
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
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center">
                    <Tv size={18} className="text-black" />
                </div>
                <div>
                    <h2 className="text-base font-bold text-white">All Anime</h2>
                    <p className="text-xs text-gray-500">Browse all anime series</p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="aspect-[3/4] rounded-[7px] bg-dark-card animate-pulse" />
                            <div className="h-3 w-3/4 bg-dark-card rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            ) : (
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
                            {loadingMore ? <><Loader2 size={16} className="animate-spin" /><span>Loading...</span></> : <span>Load More</span>}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default AllAnimePage;

          
