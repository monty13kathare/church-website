// components/admin/VideoManagement.tsx
import { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Search, Calendar, ThumbsUp, CheckCircle, Clock, AlertCircle, Download, Upload } from "lucide-react";

interface Video {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  duration: string;
  date: string;
  views: string;
  likes: string;
  status: 'published' | 'draft' | 'scheduled';
  speaker?: string;
  uploadedAt: string;
  thumbnail: string;
}

const VideoManagement = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  // const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  // Fetch videos (in production, this would be an API call)
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockVideos: Video[] = [
          {
            id: '1',
            title: 'The Power of Faith - Overcoming Challenges',
            category: 'Sermons',
            youtubeId: 'E1Ds00qAHic',
            duration: '45:30',
            date: '2024-01-15',
            views: '2.5K',
            likes: '240',
            status: 'published',
            speaker: 'Pastor John',
            uploadedAt: '2024-01-15T10:30:00Z',
            thumbnail: 'https://img.youtube.com/vi/E1Ds00qAHic/hqdefault.jpg'
          },
          // Add more mock videos...
        ];
        setVideos(mockVideos);
        setFilteredVideos(mockVideos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos
  useEffect(() => {
    let filtered = videos;

    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.speaker?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(video => video.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(video => video.category === categoryFilter);
    }

    setFilteredVideos(filtered);
  }, [searchQuery, statusFilter, categoryFilter, videos]);

  const handleDelete = async (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        // API call to delete
        setVideos(prev => prev.filter(v => v.id !== videoId));
      } catch (error) {
        console.error('Failed to delete video:', error);
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedVideos.length === 0) return;
    
    if (window.confirm(`Delete ${selectedVideos.length} selected videos?`)) {
      setVideos(prev => prev.filter(v => !selectedVideos.includes(v.id)));
      setSelectedVideos([]);
    }
  };

  const handleBulkStatusChange = (status: Video['status']) => {
    setVideos(prev => prev.map(video =>
      selectedVideos.includes(video.id) ? { ...video, status } : video
    ));
    setSelectedVideos([]);
  };

  const getStatusColor = (status: Video['status']) => {
    switch (status) {
      case 'published': return 'bg-green-900/20 text-green-300 border-green-700/30';
      case 'draft': return 'bg-yellow-900/20 text-yellow-300 border-yellow-700/30';
      case 'scheduled': return 'bg-blue-900/20 text-blue-300 border-blue-700/30';
    }
  };

  const getStatusIcon = (status: Video['status']) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Video Management</h1>
        <p className="text-gray-400">Manage and organize your church's video content</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">{videos.length}</div>
          <div className="text-gray-400">Total Videos</div>
        </div>
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">
            {videos.filter(v => v.status === 'published').length}
          </div>
          <div className="text-gray-400">Published</div>
        </div>
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">
            {videos.filter(v => v.status === 'draft').length}
          </div>
          <div className="text-gray-400">Drafts</div>
        </div>
        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
          <div className="text-3xl font-bold text-white mb-2">
            {videos.reduce((sum, v) => sum + parseFloat(v.views), 0).toLocaleString()}
          </div>
          <div className="text-gray-400">Total Views</div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search videos..."
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
              {(['all', 'published', 'draft', 'scheduled'] as const).map(status => (
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
            {Array.from(new Set(videos.map(v => v.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Bulk Actions */}
          {selectedVideos.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusChange('published')}
                className="px-4 py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl text-sm hover:opacity-90"
              >
                Publish Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl text-sm hover:opacity-90"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedVideos([])}
                className="px-4 py-2 border border-amber-900/30 text-amber-300 rounded-xl text-sm hover:bg-amber-900/10"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Videos Table */}
      <div className="rounded-xl border border-amber-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-gray-900/80 to-black/80 border-b border-amber-900/30">
                <th className="py-4 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedVideos.length === filteredVideos.length && filteredVideos.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVideos(filteredVideos.map(v => v.id));
                      } else {
                        setSelectedVideos([]);
                      }
                    }}
                    className="rounded border-gray-600 bg-gray-800"
                  />
                </th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">Video</th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">Category</th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">Status</th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">Views/Likes</th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">Date</th>
                <th className="py-4 px-6 text-left text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/20">
              {filteredVideos.map(video => (
                <tr key={video.id} className="hover:bg-gray-900/30 transition-colors">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedVideos.includes(video.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVideos(prev => [...prev, video.id]);
                        } else {
                          setSelectedVideos(prev => prev.filter(id => id !== video.id));
                        }
                      }}
                      className="rounded border-gray-600 bg-gray-800"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded overflow-hidden shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium truncate max-w-xs">
                          {video.title}
                        </div>
                        {video.speaker && (
                          <div className="text-sm text-gray-400">{video.speaker}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-amber-900/20 to-amber-800/10 text-amber-300 border border-amber-700/30">
                      {video.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(video.status)}`}>
                      {getStatusIcon(video.status)}
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{video.views}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ThumbsUp className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{video.likes}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    {formatDate(video.date)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        // onClick={() => setEditingVideo(video)}
                        className="p-2 rounded-lg bg-linear-to-r from-blue-900/20 to-blue-800/10 text-blue-300 hover:text-white hover:bg-blue-900/30 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-linear-to-r from-green-900/20 to-green-800/10 text-green-300 hover:text-white hover:bg-green-900/30 transition-colors"
                        title="View on YouTube"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="p-2 rounded-lg bg-linear-to-r from-red-900/20 to-red-800/10 text-red-300 hover:text-white hover:bg-red-900/30 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-gray-900/50 to-gray-900/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No videos found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'No videos have been uploaded yet. Start by uploading your first video.'}
            </p>
          </div>
        )}
      </div>

      {/* Export/Import Section */}
      <div className="mt-8 p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
        <h3 className="text-lg font-semibold text-white mb-4">Bulk Operations</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:opacity-90 transition-opacity">
            <Download className="w-5 h-5" />
            Export Videos (CSV)
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-amber-900/30 text-amber-300 rounded-xl hover:bg-amber-900/10 transition-colors">
            <Upload className="w-5 h-5" />
            Import Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoManagement;