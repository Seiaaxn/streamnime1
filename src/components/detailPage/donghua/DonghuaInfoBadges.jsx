import { Activity, Tv, Hash, Calendar, Clock, Globe, Heart } from 'lucide-react';

const statusColor = (status) => {
    if (!status) return 'text-gray-400 bg-gray-400/10 border-gray-700';
    const s = status.toLowerCase();
    if (s.includes('ongoing')) return 'text-green-400 bg-green-400/10 border-green-500/30';
    if (s.includes('completed')) return 'text-blue-400 bg-blue-400/10 border-blue-500/30';
    return 'text-yellow-400 bg-yellow-400/10 border-yellow-500/30';
};

const DonghuaInfoBadges = ({
    status,
    type,
    totalEpisodes,
    duration,
    released,
    country,
    followers
}) => {
    const items = [
        status && { icon: Activity, label: 'Status', value: status, color: statusColor(status) },
        type && { icon: Tv, label: 'Type', value: type, color: 'text-purple-400 bg-purple-400/10 border-purple-500/30' },
        totalEpisodes > 0 && { icon: Hash, label: 'Episodes', value: `${totalEpisodes} Eps`, color: 'text-primary-400 bg-primary-400/10 border-primary-400/30' },
        released && { icon: Calendar, label: 'Released', value: released, color: 'text-orange-400 bg-orange-400/10 border-orange-500/30' },
        duration && { icon: Clock, label: 'Duration', value: duration, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-500/30' },
        country && country !== 'China' && { icon: Globe, label: 'Country', value: country, color: 'text-teal-400 bg-teal-400/10 border-teal-500/30' },
    ].filter(Boolean);

    return (
        <div className="grid grid-cols-2 gap-2 mb-5">
            {items.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${item.color}`}>
                        <Icon size={12} className="flex-shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[10px] text-gray-500 leading-none mb-0.5">{item.label}</p>
                            <p className="text-xs font-semibold truncate">{item.value}</p>
                        </div>
                    </div>
                );
            })}
            {followers > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-red-400 bg-red-400/10 border-red-500/30">
                    <Heart size={12} className="flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 leading-none mb-0.5">Followers</p>
                        <p className="text-xs font-semibold truncate">{followers}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonghuaInfoBadges;
