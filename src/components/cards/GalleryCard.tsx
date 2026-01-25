// components/GalleryCard.tsx
import { Heart, Eye, Tag } from "lucide-react";
import type { GalleryImage } from "@/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
  onImageClick: (image: GalleryImage) => void;
  onLike: (id: number) => void;
  isLiked: boolean;
  viewMode?: "grid" | "list";
}

const GalleryCard = ({ image, onImageClick, onLike, isLiked, viewMode = "grid" }: GalleryCardProps) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(image.id);
  };

  if (viewMode === "list") {
    return (
      <div 
        className="group relative overflow-hidden bg-linear-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
        onClick={() => onImageClick(image)}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3 relative overflow-hidden">
            <div className="relative w-full h-48 md:h-full">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent md:bg-linear-to-t" />
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 rounded-full bg-linear-to-r from-amber-900/80 to-amber-700/80 backdrop-blur-sm text-amber-100 text-xs font-semibold border border-amber-700/30">
                  {image.category}
                </span>
              </div>

              {/* Overlay Stats */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 text-white hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="text-sm font-bold">
                    {image.likes + (isLiked ? 1 : 0)}
                  </span>
                </button>
                
                <div className="flex items-center gap-2 text-white">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-bold">{image.views}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-2/3 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-3">
                  {image.description}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-800">
                <div className="space-y-2">
                  <div className="text-xs text-gray-400">Date</div>
                  <div className="text-sm font-medium text-white">{image.date}</div>
                </div>
                {image.location && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="text-sm font-medium text-white line-clamp-1">{image.location}</div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {image.tags.length > 0 && (
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-gray-300">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-linear-to-r from-gray-800 to-gray-900 text-gray-300 text-xs font-medium border border-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                    {image.tags.length > 4 && (
                      <span className="px-3 py-1.5 rounded-lg bg-linear-to-r from-amber-900/20 to-amber-700/20 text-amber-300 text-xs font-medium border border-amber-900/30">
                        +{image.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div 
      className="group relative overflow-hidden bg-linear-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => onImageClick(image)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="relative w-full h-56 sm:h-64 md:h-72">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full bg-linear-to-r from-amber-900/80 to-amber-700/80 backdrop-blur-sm text-amber-100 text-xs font-semibold border border-amber-700/30">
              {image.category}
            </span>
          </div>

          {/* Overlay Stats */}
          <div className="absolute bottom-4 left-4 flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-white hover:scale-110 transition-transform"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-sm font-bold">
                {image.likes + (isLiked ? 1 : 0)}
              </span>
            </button>
            
            <div className="flex items-center gap-2 text-white">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-bold">{image.views}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors line-clamp-1">
              {image.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2">
              {image.description}
            </p>
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="text-sm text-gray-400">
              {image.date}
            </div>
            {image.location && (
              <div className="text-sm text-gray-300 font-medium line-clamp-1 max-w-[50%]">
                {image.location}
              </div>
            )}
          </div>

          {/* Tags */}
          {image.tags.length > 0 && (
            <div className="pt-4 border-t border-gray-800">
              <div className="flex flex-wrap gap-2">
                {image.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-linear-to-r from-gray-800 to-gray-900 text-gray-300 text-xs font-medium border border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
                {image.tags.length > 3 && (
                  <span className="px-3 py-1 rounded-lg bg-linear-to-r from-amber-900/20 to-amber-700/20 text-amber-300 text-xs font-medium border border-amber-900/30">
                    +{image.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;