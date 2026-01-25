// components/admin/ImageManagement.tsx
import { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Search, Heart, Image as ImageIcon, CheckCircle, Clock, AlertCircle, X, Download, ExternalLink, User, Upload } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  location?: string;
  photographer?: string;
  tags: string[];
  likes: number;
  views: number;
  status: 'published' | 'draft' | 'archived';
  uploadedAt: string;
  description: string;
}

const ImageManagement = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch images (simulated API call)
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockImages: GalleryImage[] = [
          {
            id: '1',
            title: 'Sunday Worship Service',
            category: 'Worship',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
            date: '2024-01-15',
            location: 'Main Auditorium',
            photographer: 'John Doe',
            tags: ['worship', 'praise', 'congregation'],
            likes: 45,
            views: 320,
            status: 'published',
            uploadedAt: '2024-01-15T10:30:00Z',
            description: 'Sunday morning worship service with full congregation'
          },
          {
            id: '2',
            title: 'Youth Ministry Event',
            category: 'Ministry',
            imageUrl: 'https://images.unsplash.com/photo-1530099486328-0215777825c4?w-400&h=300&fit=crop',
            date: '2024-01-12',
            location: 'Youth Hall',
            photographer: 'Sarah Johnson',
            tags: ['youth', 'fellowship', 'ministry'],
            likes: 78,
            views: 450,
            status: 'published',
            uploadedAt: '2024-01-12T15:45:00Z',
            description: 'Youth ministry gathering and fellowship'
          },
          // Add more mock images...
        ];
        setImages(mockImages);
        setFilteredImages(mockImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filter images
  useEffect(() => {
    let filtered = images;

    if (searchQuery) {
      filtered = filtered.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        image.photographer?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(image => image.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(image => image.category === categoryFilter);
    }

    setFilteredImages(filtered);
  }, [searchQuery, statusFilter, categoryFilter, images]);

  const handleDelete = async (imageId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        // API call to delete
        setImages(prev => prev.filter(img => img.id !== imageId));
      } catch (error) {
        console.error('Failed to delete image:', error);
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedImages.length === 0) return;
    
    if (window.confirm(`Delete ${selectedImages.length} selected images?`)) {
      setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const handleBulkStatusChange = (status: GalleryImage['status']) => {
    setImages(prev => prev.map(image =>
      selectedImages.includes(image.id) ? { ...image, status } : image
    ));
    setSelectedImages([]);
  };

  const getStatusColor = (status: GalleryImage['status']) => {
    switch (status) {
      case 'published': return 'bg-green-900/20 text-green-300 border-green-700/30';
      case 'draft': return 'bg-yellow-900/20 text-yellow-300 border-yellow-700/30';
      case 'archived': return 'bg-gray-900/20 text-gray-300 border-gray-700/30';
    }
  };

  const getStatusIcon = (status: GalleryImage['status']) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'archived': return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Get unique categories
  const categories = Array.from(new Set(images.map(img => img.category)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/70 rounded-full hover:bg-black/90"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Image Gallery Management</h1>
        <p className="text-gray-400">Manage and organize your church's photo gallery</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">{images.length}</div>
          <div className="text-gray-400">Total Images</div>
        </div>
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">
            {images.filter(img => img.status === 'published').length}
          </div>
          <div className="text-gray-400">Published</div>
        </div>
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">
            {images.reduce((sum, img) => sum + img.views, 0).toLocaleString()}
          </div>
          <div className="text-gray-400">Total Views</div>
        </div>
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">
            {images.reduce((sum, img) => sum + img.likes, 0).toLocaleString()}
          </div>
          <div className="text-gray-400">Total Likes</div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search images by title, tags, or photographer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* Filters and Bulk Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <div className="inline-flex rounded-lg bg-gray-900/50 border border-amber-900/30 p-1">
              {(['all', 'published', 'draft', 'archived'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-md text-sm capitalize ${
                    statusFilter === status
                      ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Bulk Actions */}
          {selectedImages.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusChange('published')}
                className="px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl text-sm hover:opacity-90"
              >
                Publish Selected
              </button>
              <button
                onClick={() => handleBulkStatusChange('archived')}
                className="px-4 py-2 bg-linear-to-r from-gray-600 to-gray-700 text-white rounded-xl text-sm hover:opacity-90"
              >
                Archive Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl text-sm hover:opacity-90"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedImages([])}
                className="px-4 py-2 border border-amber-900/30 text-amber-300 rounded-xl text-sm hover:bg-amber-900/10"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 ${
              selectedImages.includes(image.id)
                ? 'border-amber-500 ring-2 ring-amber-500/20'
                : 'border-amber-900/30 hover:border-amber-500/50'
            }`}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-4 left-4 z-10">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedImages(prev => [...prev, image.id]);
                  } else {
                    setSelectedImages(prev => prev.filter(id => id !== image.id));
                  }
                }}
                className="w-5 h-5 rounded border-gray-600 bg-gray-800 checked:bg-amber-500"
              />
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(image.status)}`}>
                {getStatusIcon(image.status)}
                {image.status.charAt(0).toUpperCase() + image.status.slice(1)}
              </div>
            </div>

            {/* Image */}
            <div 
              className="relative aspect-video cursor-pointer"
              onClick={() => setPreviewImage(image.imageUrl)}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Quick Stats */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(image.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(image.views)}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-linear-to-br from-gray-900/40 to-gray-900/20">
              <div className="mb-3">
                <h3 className="text-white font-semibold line-clamp-1 mb-1">{image.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{image.description}</p>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-amber-900/20 to-amber-800/10 text-amber-300 border border-amber-700/30">
                  {image.category}
                </span>
                <div className="text-gray-400 text-sm">{formatDate(image.date)}</div>
              </div>

              {/* Tags */}
              {image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {image.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs bg-gray-800/50 text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                  {image.tags.length > 3 && (
                    <span className="px-2 py-1 rounded text-xs bg-gray-800/50 text-gray-300">
                      +{image.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-amber-900/30">
                <div className="text-sm text-gray-400">
                  {image.photographer && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {image.photographer}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    // onClick={() => setEditingImage(image)}
                    className="p-2 rounded-lg bg-linear-to-r from-blue-900/20 to-blue-800/10 text-blue-300 hover:text-white hover:bg-blue-900/30 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="p-2 rounded-lg bg-linear-to-r from-red-900/20 to-red-800/10 text-red-300 hover:text-white hover:bg-red-900/30 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-gray-900/50 to-gray-900/20 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No images found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters to find what you\'re looking for.'
              : 'No images have been uploaded yet. Start by uploading your first image.'}
          </p>
        </div>
      )}

      {/* Export/Import Section */}
      <div className="mt-8 p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
        <h3 className="text-lg font-semibold text-white mb-4">Bulk Operations</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:opacity-90 transition-opacity">
            <Download className="w-5 h-5" />
            Export Gallery (CSV)
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-amber-900/30 text-amber-300 rounded-xl hover:bg-amber-900/10 transition-colors">
            <Upload className="w-5 h-5" />
            Bulk Upload Images
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:opacity-90 transition-opacity">
            <ImageIcon className="w-5 h-5" />
            Generate Gallery Report
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-2xl font-bold text-white mb-2">Most Popular Category</div>
          <div className="text-amber-300 font-semibold text-lg">
            {categories.length > 0 
              ? categories.reduce((a, b) => 
                  images.filter(img => img.category === a).length > 
                  images.filter(img => img.category === b).length ? a : b
                )
              : 'N/A'
            }
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-2xl font-bold text-white mb-2">Total Tags</div>
          <div className="text-amber-300 font-semibold text-lg">
            {Array.from(new Set(images.flatMap(img => img.tags))).length}
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-2xl font-bold text-white mb-2">Avg. Views per Image</div>
          <div className="text-amber-300 font-semibold text-lg">
            {images.length > 0 
              ? Math.round(images.reduce((sum, img) => sum + img.views, 0) / images.length)
              : 0
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageManagement;