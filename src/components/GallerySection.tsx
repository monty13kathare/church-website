// sections/GallerySection.tsx
import { useState, useMemo, useEffect } from "react";
import { categories, galleryImages, type Category, type GalleryImage } from "@/types/gallery";
import { 
  Search, 
  X, 
  Heart,
  Calendar,
  MapPin,
  User,
  Eye,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon
} from "lucide-react";
import GalleryCard from "./cards/GalleryCard";

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter images based on category and search
  const filteredImages = useMemo(() => {
    let filtered = galleryImages;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(img => img.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  const handleLike = (id: number) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedImages(newLiked);
  };

  const handleImageSelect = (image: GalleryImage) => {
    setSelectedImage(image);
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-bl from-blue-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Visual Testimonies
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              चित्र
            </span> गैलरी
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore moments of worship, fellowship, and ministry through our visual gallery
          </p>
        </div>

        {/* Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500 z-20" />
            </div>
            <input
              type="text"
              placeholder="Search images, tags, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
              </button>
            )}
          </div>

          {/* Category Filters */}
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

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-gray-900/50 backdrop-blur-sm border border-amber-900/30 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-linear-to-r from-amber-600 to-amber-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-linear-to-r from-amber-600 to-amber-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className={`mb-12 transition-all duration-500 ${
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            : "space-y-4 md:space-y-6 max-w-6xl mx-auto"
        }`}>
          {filteredImages.map((image) => (
            <div key={image.id} className={viewMode === "list" ? "w-full" : ""}>
              <GalleryCard
                image={image}
                onImageClick={handleImageSelect}
                onLike={handleLike}
                isLiked={likedImages.has(image.id)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-900/50 to-gray-900/20 flex items-center justify-center">
              <Search className="w-10 h-10 md:w-12 md:h-12 text-gray-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">No images found</h3>
            <p className="text-gray-400 max-w-md mx-auto px-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {galleryImages.length}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Total Images</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {galleryImages.reduce((sum, img) => sum + img.views, 0).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {likedImages.size}
              </div>
              <div className="text-gray-400 text-sm md:text-base">Liked Images</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {selectedImage && (
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
                    <CloseIcon className="w-5 h-5 text-gray-300" />
                  </button>
                  <span className="text-white font-semibold text-sm md:text-base">
                    {currentIndex + 1} / {filteredImages.length}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-300" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-2/3 p-2 md:p-4 bg-linear-to-br from-gray-950 to-black">
                  <div className="relative w-full h-[50vh] md:h-[70vh] rounded-xl md:rounded-2xl overflow-hidden bg-gray-900">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Details Section */}
                <div className="lg:w-1/3 p-4 md:p-6 bg-linear-to-bl from-gray-900 to-black border-t lg:border-t-0 lg:border-l border-amber-900/30">
                  <div className="space-y-6">
                    {/* Category & Title */}
                    <div>
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-linear-to-r from-amber-900/30 to-amber-700/30 text-amber-300 border border-amber-700/30">
                        {selectedImage.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {selectedImage.title}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {selectedImage.description}
                      </p>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="p-2 rounded-lg bg-gray-800/50">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Date</div>
                          <div className="font-medium">{selectedImage.date}</div>
                        </div>
                      </div>

                      {selectedImage.location && (
                        <div className="flex items-center gap-3 text-gray-300">
                          <div className="p-2 rounded-lg bg-gray-800/50">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Location</div>
                            <div className="font-medium">{selectedImage.location}</div>
                          </div>
                        </div>
                      )}

                      {selectedImage.photographer && (
                        <div className="flex items-center gap-3 text-gray-300">
                          <div className="p-2 rounded-lg bg-gray-800/50">
                            <User className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Photographer</div>
                            <div className="font-medium">{selectedImage.photographer}</div>
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                        <div className="text-center">
                          <button
                            onClick={() => handleLike(selectedImage.id)}
                            className="group flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-700/30 transition-all w-full"
                          >
                            <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                              likedImages.has(selectedImage.id) 
                                ? 'fill-red-500 text-red-500 animate-pulse' 
                                : 'text-gray-400 group-hover:text-red-400'
                            }`} />
                            <span className="text-white font-bold">
                              {selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)}
                            </span>
                          </button>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-800/30">
                            <Eye className="w-5 h-5 text-amber-400" />
                            <span className="text-white font-bold">{selectedImage.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {selectedImage.tags.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-400 mb-3">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-xs md:text-sm rounded-lg bg-linear-to-r from-gray-800 to-gray-900 text-gray-300 border border-gray-700"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="lg:hidden flex items-center justify-between p-4 border-t border-amber-900/30">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300 text-sm">Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-gray-300 text-sm">Next</span>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;