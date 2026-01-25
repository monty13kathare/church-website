// components/VideoCard.tsx
import { Play, Clock, Calendar, Eye, ThumbsUp, Share2, User, Book } from "lucide-react";

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    category: string;
    youtubeId: string;
    duration: string;
    date: string;
    description: string;
    views: string;
    likes: string;
    speaker?: string;
    scripture?: string;
  };
  onPlay: (youtubeId: string) => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  viewMode?: "grid" | "list";
}

const VideoCard = ({ 
  video, 
  onPlay, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave,
  viewMode = "grid" 
}: VideoCardProps) => {
  const categoryColors: Record<string, string> = {
    "Sermons": "from-blue-900/30 to-blue-800/20",
    "Worship": "from-purple-900/30 to-purple-800/20",
    "Testimonies": "from-amber-900/30 to-amber-800/20",
    "Events": "from-red-900/30 to-red-800/20",
    "Bible Study": "from-green-900/30 to-green-800/20"
  };

  if (viewMode === "list") {
  return (
    <div
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
     
      
      <div className="relative backdrop-blur-md rounded-2xl overflow-hidden border border-amber-900/30 bg-gradient-to-br from-gray-900/40 to-gray-900/20 hover:border-amber-500/50 transition-all duration-500">
        <div className="flex flex-col md:flex-row min-h-[280px]">
          {/* Thumbnail - Fixed height/width */}
          <div className="md:w-2/5 relative">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:bg-gradient-to-t" />
              
              {/* Play Button */}
              <button
                onClick={() => onPlay(video.youtubeId)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur-lg" />
                  <div className="relative w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white ml-1" />
                  </div>
                </div>
              </button>

              {/* Duration */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>

              {/* Category */}
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm bg-black/60 text-white">
                  {video.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content - Fixed with proper spacing */}
          <div className="md:w-3/5 p-4 md:p-6 flex flex-col">
            <div className="flex-1 space-y-3 md:space-y-4">
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                {video.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                {video.description}
              </p>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3 md:py-4 border-t border-amber-900/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">{video.date}</span>
                  </div>
                  
                </div>
                
               
              </div>

              {/* Speaker & Scripture */}
              {(video.speaker || video.scripture) && (
                <div className="flex flex-wrap gap-2 pt-3 md:pt-4 border-t border-amber-900/20">
                  {video.speaker && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-900/20 to-amber-800/10">
                      <User className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                      <span className="text-xs md:text-sm text-amber-300">{video.speaker}</span>
                    </div>
                  )}
                  {video.scripture && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-900/20 to-blue-800/10">
                      <Book className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                      <span className="text-xs md:text-sm text-blue-300">{video.scripture}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons - Always visible but with hover effect */}
            <div className={`pt-3 md:pt-4 border-t border-amber-900/20 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'md:opacity-100 opacity-90'
            }`}>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={() => onPlay(video.youtubeId)}
                  className="flex-1 py-2 md:py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-medium hover:scale-105 transition-transform group/play"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    <span className="hidden md:inline">Play Video</span>
                    <span className="md:hidden">Play</span>
                  </span>
                </button>
                
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  // Grid View (default)
  return (
    <div
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Hover Glow
      <div className={`absolute -inset-2 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        categoryColors[video.category]?.replace('from-', 'bg-gradient-to-r from-')
      }`} /> */}
      
      <div className="relative backdrop-blur-md rounded-2xl overflow-hidden border border-amber-900/30 bg-gradient-to-br from-gray-900/40 to-gray-900/20 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500">
        {/* Category Color Bar */}
        {/* <div className={`h-2 w-full bg-gradient-to-r ${categoryColors[video.category]}`} /> */}
        
        <div className="p-4 md:p-6">
          {/* Thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Play Button */}
            <button
              onClick={() => onPlay(video.youtubeId)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur-lg" />
                <div className="relative w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-white ml-1" />
                </div>
              </div>
            </button>

            {/* Duration */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>

            {/* Category */}
            <div className="absolute top-4 left-4">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm bg-black/60 text-white">
                {video.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
              {video.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm line-clamp-2">
              {video.description}
            </p>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 py-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{video.date}</span>
                </div>
                {video.speaker && (
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <User className="w-4 h-4 text-amber-400" />
                    <span className="truncate">{video.speaker}</span>
                  </div>
                )}
              </div>
              
             
            </div>

            {/* Scripture */}
            {video.scripture && (
              <div className="pt-3 border-t border-amber-900/20">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-900/20 to-blue-800/10 w-fit">
                  <Book className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">{video.scripture}</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className={`pt-4 border-t border-amber-900/20 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <button
                onClick={() => onPlay(video.youtubeId)}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-medium hover:scale-105 transition-transform group/play"
              >
                <span className="flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Now
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;