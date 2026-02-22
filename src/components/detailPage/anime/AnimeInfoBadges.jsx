import { Activity, Tv, Hash, Calendar } from 'lucide-react';

const statusColor = (status) => {
    if (!status) return 'text-gray-400 bg-gray-400/10 border-gray-700';
    const s = status.toLowerCase();
    if (s.includes('ongoing')) return 'text-green-400 bg-green-400/10 border-green-500/30';
    if (s.includes('completed')) return 'text-blue-400 bg-blue-400/10 border-blue-500/30';
    return 'text-yellow-400 bg-yellow-400/10 border-yellow-500/30';
};

const AnimeInfoBadges = ({ status, type, totalEpisodes, released }) => {
    return (
        <div className="grid grid-cols-2 gap-2 mb-5">
            {status && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${statusColor(status)}`}>
                    <Activity size={12} className="flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 leading-none mb-0.5">Status</p>
                        <p className="text-xs font-semibold truncate">{status}</p>
                    </div>
                </div>
            )}
            {type && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-purple-400 bg-purple-400/10 border-purple-500/30">
                    <Tv size={12} className="flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 leading-none mb-0.5">Type</p>
                        <p className="text-xs font-semibold truncate">{type}</p>
                    </div>
                </div>
            )}
            {totalEpisodes > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-primary-400 bg-primary-400/10 border-primary-400/30">
                    <Hash size={12} className="flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 leading-none mb-0.5">Episodes</p>
                        <p className="text-xs font-semibold truncate">{totalEpisodes} Eps</p>
                    </div>
                </div>
            )}
            {released && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-orange-400 bg-orange-400/10 border-orange-500/30">
                    <Calendar size={12} className="flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 leading-none mb-0.5">Released</p>
                        <p className="text-xs font-semibold truncate">{released}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimeInfoBadges;