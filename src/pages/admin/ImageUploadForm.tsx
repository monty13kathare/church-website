// components/admin/ImageUploadForm.tsx
import { useState, useRef } from "react";
import { Upload, X, Loader2, Check, AlertCircle, Image, Calendar, MapPin, User, Camera, Link } from "lucide-react";

type Category = "All" | "Worship" | "Events" | "Ministry" | "Community" | "Special Services";

interface ImageFormData {
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  imageFile: File | null;
  date: string;
  location: string;
  photographer: string;
  tags: string[];
  isUploading: boolean;
}

interface UploadProgress {
  progress: number;
  status: 'uploading' | 'success' | 'error';
  message?: string;
}

const ImageUploadForm = () => {
  const [formData, setFormData] = useState<ImageFormData>({
    title: "",
    description: "",
    category: "Events",
    imageUrl: "",
    imageFile: null,
    date: new Date().toISOString().split('T')[0],
    location: "",
    photographer: "",
    tags: [],
    isUploading: false
  });

  const [currentTag, setCurrentTag] = useState("");
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: Category[] = ["Worship", "Events", "Ministry", "Community", "Special Services"];

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, WebP, GIF)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    setFormData(prev => ({ ...prev, imageFile: file, imageUrl: "" }));
    setError("");
    
    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  // Handle URL input
  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, imageUrl: url, imageFile: null }));
    setPreviewUrl(url);
    setError("");
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

  // Simulate upload progress (replace with actual API call)
  const simulateUpload = async (): Promise<string> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress({
          progress,
          status: 'uploading',
          message: 'Uploading image...'
        });

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            resolve(`https://your-cdn.com/uploads/${Date.now()}.jpg`);
          }, 500);
        }
      }, 200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.imageFile && !formData.imageUrl) {
      setError("Please upload an image or provide an image URL");
      return;
    }

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.date) {
      setError("Date is required");
      return;
    }

    setFormData(prev => ({ ...prev, isUploading: true }));
    
    try {
      let finalImageUrl = formData.imageUrl;

      // If file is selected, upload it
      if (formData.imageFile) {
        finalImageUrl = await simulateUpload();
        
        // In production, replace with actual upload:
        // const formData = new FormData();
        // formData.append('image', formData.imageFile);
        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData
        // });
        // const data = await response.json();
        // finalImageUrl = data.url;
      }

      // Prepare image data
      const imageData = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        imageUrl: finalImageUrl,
        date: formData.date,
        location: formData.location,
        photographer: formData.photographer,
        tags: formData.tags,
        likes: 0,
        views: 0,
        uploadedAt: new Date().toISOString(),
        status: 'published' as const
      };

      // Save to backend (simulated)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production: await fetch('/api/images', { method: 'POST', body: JSON.stringify(imageData) })
      console.log("Image data to save:", imageData);
      
      setUploadProgress({
        progress: 100,
        status: 'success',
        message: 'Image uploaded successfully!'
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        resetForm();
      }, 3000);
      
    } catch (err) {
      setUploadProgress({
        progress: 0,
        status: 'error',
        message: 'Upload failed. Please try again.'
      });
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setFormData(prev => ({ ...prev, isUploading: false }));
      setTimeout(() => setUploadProgress(null), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Events",
      imageUrl: "",
      imageFile: null,
      date: new Date().toISOString().split('T')[0],
      location: "",
      photographer: "",
      tags: [],
      isUploading: false
    });
    setCurrentTag("");
    setPreviewUrl("");
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const categoryColors = {
  //   "Worship": "bg-purple-900/20 text-purple-300",
  //   "Events": "bg-red-900/20 text-red-300",
  //   "Ministry": "bg-blue-900/20 text-blue-300",
  //   "Community": "bg-green-900/20 text-green-300",
  //   "Special Services": "bg-amber-900/20 text-amber-300"
  // };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl border border-amber-900/30 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-amber-900/30 bg-linear-to-r from-gray-900/80 to-black/80">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-linear-to-r from-amber-900/30 to-amber-700/30">
              <Image className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Upload New Image</h2>
              <p className="text-gray-400">Add photos from worship services, events, and ministries</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="m-6 p-4 rounded-xl bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-700/30">
            <div className="flex items-center gap-3 text-green-300">
              <Check className="w-5 h-5" />
              <span>Image uploaded successfully! It will appear in the gallery shortly.</span>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress && (
          <div className={`m-6 p-4 rounded-xl border ${
            uploadProgress.status === 'success' 
              ? 'bg-linear-to-r from-green-900/20 to-green-800/10 border-green-700/30' 
              : uploadProgress.status === 'error'
              ? 'bg-linear-to-r from-red-900/20 to-red-800/10 border-red-700/30'
              : 'bg-linear-to-r from-blue-900/20 to-blue-800/10 border-blue-700/30'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${
                uploadProgress.status === 'success' ? 'text-green-300' :
                uploadProgress.status === 'error' ? 'text-red-300' :
                'text-blue-300'
              }`}>
                {uploadProgress.message}
              </span>
              {uploadProgress.status === 'uploading' && (
                <span className="text-gray-400">{uploadProgress.progress}%</span>
              )}
            </div>
            {uploadProgress.status === 'uploading' && (
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-amber-600 to-amber-700 transition-all duration-300"
                  style={{ width: `${uploadProgress.progress}%` }}
                />
              </div>
            )}
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
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-white">
              Upload Image
              <span className="text-red-400 ml-1">*</span>
            </label>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload */}
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-amber-500 ${
                    formData.imageFile 
                      ? 'border-green-500 bg-green-900/10' 
                      : 'border-amber-900/30 bg-gray-900/30'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-r from-amber-900/20 to-amber-800/10 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">
                        {formData.imageFile ? formData.imageFile.name : 'Click to upload'}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formData.imageFile 
                          ? `${(formData.imageFile.size / 1024 / 1024).toFixed(2)} MB` 
                          : 'Supports JPG, PNG, WebP, GIF (Max 10MB)'}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">OR</p>
              </div>

              {/* URL Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Enter Image URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Preview */}
                {(previewUrl || formData.imageUrl) && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-white mb-2">
                      Preview
                    </label>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/50">
                      <img
                        src={previewUrl || formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setError('Failed to load image. Please check the URL.')}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl("");
                          setFormData(prev => ({ ...prev, imageUrl: "", imageFile: null }));
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Title */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white">
                Image Title
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="Enter image title"
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

            {/* Location */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Church Hall, Auditorium, etc."
                  className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Photographer */}
            <div className="space-y-3 col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-white">
                Photographer/Credit
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.photographer}
                  onChange={(e) => setFormData(prev => ({ ...prev, photographer: e.target.value }))}
                  placeholder="Name of photographer or ministry"
                  className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Describe this image, event, or moment..."
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
              disabled={formData.isUploading}
              className="flex-1 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {formData.isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Image
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              disabled={formData.isUploading}
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

export default ImageUploadForm;