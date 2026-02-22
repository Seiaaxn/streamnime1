import { Play, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

const AnimeEpisodesTab = ({ episodes = [], onEpisodeSelect }) => {
    const [sortOrder, setSortOrder] = useState('latest');
    const [viewMode, setViewMode] = useState('horizontal');

    const sortedEpisodes = [...episodes].sort((a, b) => {
        const numA = Number(a.number || a.episode || 0);
        const numB = Number(b.number || b.episode || 0);
        return sortOrder === 'latest' ? numB - numA : numA - numB;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm">
                    {episodes.length || 0} Episodes
                </h3>
                <div className="flex items-center gap-2">
                    {/* Sort */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="bg-dark-surface border border-dark-border rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-primary-400"
                    >
                        <option value="oldest">Oldest First</option>
                        <option value="latest">Latest First</option>
                    </select>
                    {/* View Toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'horizontal' ? 'grid' : 'horizontal')}
                        className="p-1.5 rounded-lg bg-dark-surface border border-dark-border text-gray-400 hover:text-white transition"
                    >
                        {viewMode === 'horizontal' ? <LayoutGrid size={14} /> : <List size={14} />}
                    </button>
                </div>
            </div>

            {/* HORIZONTAL SCROLL MODE */}
            {viewMode === 'horizontal' && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {sortedEpisodes.map((episode, index) => {
                        const episodeNumber = episode.number || episode.episode ||
                            (episode.title?.match(/\d+/) || [index + 1])[0];
                        const episodeDate = episode.date || '';

                        return (
                            <button
                                key={index}
                                onClick={() => onEpisodeSelect(episode)}
                                className="flex-shrink-0 flex flex-col items-center justify-center px-3 py-2 bg-dark-surface rounded-xl border border-dark-border hover:border-primary-400/50 hover:bg-primary-400/5 transition min-w-[72px]"
                            >
                                <div className="w-7 h-7 bg-primary-400/10 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-primary-400 font-bold text-xs">{episodeNumber}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 whitespace-nowrap">Ep {episodeNumber}</p>
                                {episodeDate && (
                                    <p className="text-[9px] text-gray-600 whitespace-nowrap mt-0.5">{episodeDate}</p>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* GRID MODE */}
            {viewMode === 'grid' && (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                    {sortedEpisodes.map((episode, index) => {
                        const episodeNumber = episode.number || episode.episode ||
                            (episode.title?.match(/\d+/) || [index + 1])[0];
                        const episodeTitle = episode.title || `Episode ${episodeNumber}`;
                        const episodeDate = episode.date || '';

                        return (
                            <button
                                key={index}
                                onClick={() => onEpisodeSelect(episode)}
                                className="w-full flex items-center justify-between p-3 bg-dark-surface rounded-lg border border-dark-border hover:border-primary-400/50 transition group"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-8 h-8 bg-primary-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-400 font-semibold text-sm">
                                            {episodeNumber}
                                        </span>
                                    </div>
                                    <div className="text-left flex-1">
                                        <h4 className="text-sm font-medium text-white group-hover:text-primary-400 transition">
                                            {episodeTitle}
                                        </h4>
                                        {episodeDate && (
                                            <p className="text-xs text-gray-500">{episodeDate}</p>
                                        )}
                                    </div>
                                </div>
                                <Play size={16} className="text-gray-500 group-hover:text-primary-400 transition flex-shrink-0" />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AnimeEpisodesTab;
