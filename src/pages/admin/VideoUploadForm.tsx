// components/admin/VideoUploadForm.tsx
import { useState} from "react";
import { Upload, X, Loader2, Check, AlertCircle, Video, Calendar, Clock, User, Book } from "lucide-react";

type Category = "Sermons" | "Worship" | "Testimonies" | "Events" | "Bible Study";

interface VideoFormData {
    title: string;
    description: string;
    category: Category;
    youtubeUrl: string;
    duration: string;
    date: string;
    speaker: string;
    scripture: string;
    tags: string[];
}

interface YouTubeMetadata {
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
}

const VideoUploadForm = () => {
    const [formData, setFormData] = useState<VideoFormData>({
        title: "",
        description: "",
        category: "Sermons",
        youtubeUrl: "",
        duration: "",
        date: new Date().toISOString().split('T')[0],
        speaker: "",
        scripture: "",
        tags: []
    });

    const [currentTag, setCurrentTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState<YouTubeMetadata | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    // const fileInputRef = useRef<HTMLInputElement>(null);

    const categories: Category[] = ["Sermons", "Worship", "Testimonies", "Events", "Bible Study"];

    // Extract YouTube ID from URL
    const extractYouTubeId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/v\/([^&\n?#]+)/,
            /youtube\.com\/user\/[^\/]+\/?#!\/[^\/]+\/[^\/]+\/([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match?.[1]) {
                return match[1];
            }
        }
        return null;
    };

    // Fetch YouTube metadata
    const fetchYouTubeMetadata = async (youtubeId: string) => {
        try {
            setLoading(true);
            // Note: For production, you'll need a backend proxy due to CORS
            // const response = await fetch(`/api/youtube-metadata?id=${youtubeId}`);
            // const data = await response.json();

            // For demo purposes, we'll simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock response - replace with actual API call
            const mockData: YouTubeMetadata = {
                title: "Fetched from YouTube: " + youtubeId,
                description: "Video description automatically fetched from YouTube.",
                duration: "45:30",
                thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
            };

            setPreviewData(mockData);
            setFormData(prev => ({
                ...prev,
                title: mockData.title,
                description: mockData.description,
                duration: mockData.duration
            }));
        } catch (err) {
            setError("Failed to fetch YouTube metadata");
        } finally {
            setLoading(false);
        }
    };

    const handleYouTubeUrlChange = (url: string) => {
        setFormData(prev => ({ ...prev, youtubeUrl: url }));
        setError("");

        const youtubeId = extractYouTubeId(url);
        if (youtubeId) {
            fetchYouTubeMetadata(youtubeId);
        }
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Here you would typically send to your backend
            const youtubeId = extractYouTubeId(formData.youtubeUrl);
            if (!youtubeId) {
                throw new Error("Invalid YouTube URL");
            }

            const videoData = {
                ...formData,
                youtubeId,
                thumbnail: previewData?.thumbnail || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
                views: "0",
                likes: "0",
                uploadedAt: new Date().toISOString(),
                status: "published" as const
            };

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Video data to save:", videoData);

            // In production: await fetch('/api/videos', { method: 'POST', body: JSON.stringify(videoData) })

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                resetForm();
            }, 3000);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to upload video");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "Sermons",
            youtubeUrl: "",
            duration: "",
            date: new Date().toISOString().split('T')[0],
            speaker: "",
            scripture: "",
            tags: []
        });
        setPreviewData(null);
        setCurrentTag("");
    };

    // const categoryColors = {
    //     "Sermons": "bg-blue-900/20 text-blue-300 border-blue-700/30",
    //     "Worship": "bg-purple-900/20 text-purple-300 border-purple-700/30",
    //     "Testimonies": "bg-amber-900/20 text-amber-300 border-amber-700/30",
    //     "Events": "bg-red-900/20 text-red-300 border-red-700/30",
    //     "Bible Study": "bg-green-900/20 text-green-300 border-green-700/30"
    // };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl border border-amber-900/30 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-amber-900/30 bg-linear-to-r from-gray-900/80 to-black/80">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-linear-to-r from-amber-900/30 to-amber-700/30">
                            <Video className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Upload New Video</h2>
                            <p className="text-gray-400">Add sermons, worship sessions, and testimonies to your website</p>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="m-6 p-4 rounded-xl bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-700/30">
                        <div className="flex items-center gap-3 text-green-300">
                            <Check className="w-5 h-5" />
                            <span>Video uploaded successfully! It will appear on the website shortly.</span>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="m-6 p-4 rounded-xl bg-linear-to-r from-red-900/20 to-red-800/10 border border-red-700/30">
                        <div className="flex items-center gap-3 text-red-300">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                    {/* YouTube URL */}
                    <div className="space-y-4">
                        <label className="block text-lg font-semibold text-white">
                            YouTube Video URL
                            <span className="text-red-400 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                value={formData.youtubeUrl}
                                onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                required
                                className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                            <Video className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-400">
                            Paste the full YouTube URL. We'll automatically fetch the video details.
                        </p>
                    </div>

                    {/* Preview Section */}
                    {previewData && (
                        <div className="p-6 rounded-xl bg-linear-to-br from-gray-900/40 to-gray-900/20 border border-amber-900/30">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-400" />
                                YouTube Video Detected
                            </h3>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <img
                                            src={previewData.thumbnail}
                                            alt="YouTube thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                            {formData.duration}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-2/3 space-y-3">
                                    <div>
                                        <div className="text-sm text-gray-400">Title</div>
                                        <div className="text-white font-medium">{previewData.title}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Description</div>
                                        <div className="text-gray-300 text-sm line-clamp-3">{previewData.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Video Title */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">
                                Video Title
                                <span className="text-red-400 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                required
                                placeholder="Enter video title"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">
                                Category
                                <span className="text-red-400 ml-1">*</span>
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                                required
                                className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">
                                Date
                                <span className="text-red-400 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                    required
                                    className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">
                                Duration (HH:MM:SS)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.duration}
                                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                    placeholder="45:30"
                                    className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        {/* Speaker */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">
                                Speaker/Preacher
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.speaker}
                                    onChange={(e) => setFormData(prev => ({ ...prev, speaker: e.target.value }))}
                                    placeholder="Pastor John Samuel"
                                    className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        {/* Scripture */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">
                                Scripture Reference
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.scripture}
                                    onChange={(e) => setFormData(prev => ({ ...prev, scripture: e.target.value }))}
                                    placeholder="John 3:16"
                                    className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                                <Book className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-white">
                            Description
                            <span className="text-red-400 ml-1">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            required
                            rows={4}
                            placeholder="Enter video description..."
                            className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-white">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-900/20 to-amber-800/10 text-amber-300 text-sm border border-amber-700/30"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:text-white"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                placeholder="Add a tag and press Enter"
                                className="flex-1 px-4 py-2 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-4 py-2 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-amber-900/30">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Upload Video
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={loading}
                            className="px-8 py-3 border border-amber-900/30 text-amber-300 rounded-xl hover:bg-amber-900/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoUploadForm;