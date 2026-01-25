// sections/VideosSection.tsx
import { useMemo, useState, useEffect } from "react";
import { X, Youtube, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import VideoCard from "./cards/VideoCard";

/* ------------------ Types ------------------ */
type Category = "All" | "Sermons" | "Worship" | "Testimonies" | "Events" | "Bible Study";

interface Video {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  youtubeId: string;
  duration: string;
  date: string;
  description: string;
  views: string;
  likes: string;
  speaker?: string;
  scripture?: string;
}

/* ------------------ Data ------------------ */
const categories: Category[] = [
  "All",
  "Sermons",
  "Worship",
  "Testimonies",
  "Events",
  "Bible Study",
];

const videos: Video[] = [
  {
    id: 1,
    title: "The Power of Faith - Overcoming Life's Challenges",
    category: "Sermons",
    youtubeId: "S-jCrDjjYxA",
    duration: "45:30",
    date: "Jan 15, 2026",
    description: "Learn how to strengthen your faith in difficult times through God's promises.",
    views: "2.5K",
    likes: "240",
    speaker: "Pastor John Samuel",
    scripture: "Hebrews 11:1"
  },
  {
    id: 2,
    title: "Live Worship Night - Heaven Meets Earth",
    category: "Worship",
    youtubeId: "RTq5tqDxSN0",
    duration: "28:15",
    date: "Jan 12, 2026",
    description: "Powerful worship session with our choir and worship team.",
    views: "1.8K",
    likes: "198",
    speaker: "Worship Team"
  },
  {
    id: 3,
    title: "Miraculous Healing Testimony - From Pain to Praise",
    category: "Testimonies",
    youtubeId: "YJrmeOGITvE",
    duration: "12:45",
    date: "Jan 10, 2026",
    description: "Brother Rajesh shares his testimony of God's healing power.",
    views: "3.2K",
    likes: "315",
    speaker: "Brother Rajesh"
  },
  {
    id: 4,
    title: "Christmas Celebration 2025 - Joy to the World",
    category: "Events",
    youtubeId: "STYGqbpjI9E",
    duration: "1:20:00",
    date: "Dec 25, 2025",
    description: "Complete Christmas service with carols, message, and celebrations.",
    views: "5.4K",
    likes: "421",
    scripture: "Luke 2:10-11"
  },
  {
    id: 5,
    title: "Book of Romans - Chapter 1 Study",
    category: "Bible Study",
    youtubeId: "8JPPG0v8WHo",
    duration: "35:20",
    date: "Jan 8, 2026",
    description: "Deep dive into the Book of Romans with Pastor David.",
    views: "1.2K",
    likes: "156",
    speaker: "Pastor David Wilson",
    scripture: "Romans 1"
  },
  {
    id: 6,
    title: "New Year's Eve Service - Welcome 2026",
    category: "Events",
    youtubeId: "EUBeeLU-5jQ",
    duration: "58:45",
    date: "Dec 31, 2025",
    description: "Special prayer service to welcome the new year in faith.",
    views: "2.8K",
    likes: "267",
    scripture: "Isaiah 43:18-19"
  },
  {
    id: 7,
    title: "Understanding God's Grace - Ephesians Study",
    category: "Sermons",
    youtubeId: "pftZUG-EGTQ",
    duration: "52:10",
    date: "Jan 5, 2026",
    description: "Exploring the depth of God's grace through Ephesians.",
    views: "1.9K",
    likes: "210",
    speaker: "Pastor John Samuel",
    scripture: "Ephesians 2:8-9"
  },
  {
    id: 8,
    title: "Worship Practice Session - Behind the Scenes",
    category: "Worship",
    youtubeId: "mY20mzQp9G8",
    duration: "18:30",
    date: "Jan 3, 2026",
    description: "Inside look at our worship team's practice session.",
    views: "1.1K",
    likes: "132",
    speaker: "Music Ministry"
  },
  {
    id: 9,
    title: "Salvation Testimony - From Darkness to Light",
    category: "Testimonies",
    youtubeId: "F2kn1BHXdRw",
    duration: "14:20",
    date: "Dec 28, 2025",
    description: "Sister Priya shares her journey to salvation.",
    views: "2.3K",
    likes: "289",
    speaker: "Sister Priya"
  },
];

/* ------------------ Component ------------------ */
const VideosSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") return videos;
    return videos.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  const handleCloseModal = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'unset';
  };

  const handleNextVideo = () => {
    if (!activeVideo) return;
    const currentIndex = filteredVideos.findIndex(v => v.youtubeId === activeVideo);
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setActiveVideo(filteredVideos[nextIndex].youtubeId);
    setCurrentVideoIndex(nextIndex);
  };

  const handlePrevVideo = () => {
    if (!activeVideo) return;
    const currentIndex = filteredVideos.findIndex(v => v.youtubeId === activeVideo);
    const prevIndex = (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setActiveVideo(filteredVideos[prevIndex].youtubeId);
    setCurrentVideoIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVideo) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      }
      if (e.key === 'ArrowRight') {
        handleNextVideo();
      }
      if (e.key === 'ArrowLeft') {
        handlePrevVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeVideo]);

  const activeVideoData = activeVideo ? videos.find(v => v.youtubeId === activeVideo) : null;

  return (
    <section id="videos" className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-bl from-red-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Media Gallery & Sermons
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              वीडियो
            </span> गैलरी
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Watch sermons, worship sessions, testimonies, and special events to grow in your faith journey
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 space-y-6">
          {/* View Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-xl bg-gray-900/50 backdrop-blur-sm border border-amber-900/30 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-linear-to-r from-amber-600 to-amber-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-linear-to-r from-amber-600 to-amber-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                List View
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="text-center">
           
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-500/20"
                      : "bg-linear-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-sm border border-amber-900/30 text-gray-300 hover:border-amber-500 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category}
                    {category !== "All" && activeCategory === category && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className={`mb-12 transition-all duration-500 ${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            : "space-y-4 md:space-y-6 max-w-6xl mx-auto"
        }`}>
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={setActiveVideo}
              isHovered={hoveredVideo === video.id}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-900/50 to-gray-900/20 flex items-center justify-center">
              <Eye className="w-10 h-10 md:w-12 md:h-12 text-gray-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">No videos found</h3>
            <p className="text-gray-400 max-w-md mx-auto px-4">
              Try selecting a different category to find what you're looking for.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 md:p-8 max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {videos.length}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Total Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {videos.reduce((sum, v) => sum + parseInt(v.views), 0).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {videos.reduce((sum, v) => sum + parseInt(v.likes), 0).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Total Likes</div>
            </div>
          </div>
        </div>

        {/* YouTube CTA */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-4 bg-linear-to-r from-red-900/20 via-red-900/10 to-red-900/20 rounded-3xl blur-xl" />
          <div className="relative backdrop-blur-md rounded-2xl border border-red-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-8 md:p-12">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-red-600 to-red-500 rounded-full blur-lg" />
                <div className="relative w-20 h-20 rounded-full bg-linear-to-r from-red-600 to-red-500 flex items-center justify-center">
                  <Youtube className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Subscribe to Our YouTube Channel
                </h3>
                <p className="text-gray-300 max-w-lg mx-auto text-lg">
                  Never miss an update! Get notified about new sermons, worship sessions, and testimonies.
                </p>
              </div>
              
              <a
                href="https://www.youtube.com/@FILADELFIASMURANABHAWAN"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
              >
                <span>Subscribe Now</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>New videos uploaded weekly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-2 md:p-4">
            <div className="relative w-full max-w-6xl bg-linear-to-br from-gray-900 to-black rounded-2xl md:rounded-3xl overflow-hidden border border-amber-900/30 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-amber-900/30 bg-linear-to-r from-gray-900/80 to-black/80">
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-300" />
                  </button>
                  <span className="text-white font-semibold text-sm md:text-base">
                    Video {currentVideoIndex + 1} of {filteredVideos.length}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={handlePrevVideo}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-300" />
                  </button>
                  <button
                    onClick={handleNextVideo}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="p-4 bg-black">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&color=white&controls=1&showinfo=0`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video Details */}
              {activeVideoData && (
                <div className="p-6 border-t border-amber-900/30">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-linear-to-r from-amber-900/30 to-amber-700/30 text-amber-300 border border-amber-700/30">
                          {activeVideoData.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Clock className="w-4 h-4" />
                          {activeVideoData.duration}
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {activeVideoData.title}
                      </h3>
                      
                      <p className="text-gray-300">
                        {activeVideoData.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">Date</div>
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-4 h-4 text-amber-400" />
                          {activeVideoData.date}
                        </div>
                      </div>
                      
                      {activeVideoData.speaker && (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Speaker</div>
                          <div className="text-white">{activeVideoData.speaker}</div>
                        </div>
                      )}
                      
                      {activeVideoData.scripture && (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">Scripture</div>
                          <div className="text-amber-300 font-medium">{activeVideoData.scripture}</div>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Eye className="w-5 h-5 text-amber-400" />
                        <span className="font-medium">{activeVideoData.views} views</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span className="font-medium">{activeVideoData.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideosSection;