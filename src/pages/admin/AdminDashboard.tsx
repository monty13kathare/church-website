// pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Video, 
  Eye, 
  ThumbsUp, 
  Users, 
  TrendingUp, 
  Calendar, 
  BarChart,
  Image as ImageIcon,
  MessageCircle,
  Download,
  Upload,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  UserPlus,
  DollarSign,
  Globe,
  Smartphone,
  Activity,
  Target,
  PieChart,
  Bell,
  Zap,
  Star,
  Award
} from "lucide-react";
import DashboardChart from "./DashboardChart";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    videos: 0,
    views: 0,
    likes: 0,
    subscribers: 0,
    images: 0,
    members: 0,
    comments: 0,
    revenue: 0
  });

  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on time range
        const mockData = {
          videos: 156 + Math.floor(Math.random() * 20),
          views: 1250000 + Math.floor(Math.random() * 100000),
          likes: 45800 + Math.floor(Math.random() * 5000),
          subscribers: 10500 + Math.floor(Math.random() * 1000),
          images: 89 + Math.floor(Math.random() * 10),
          members: 456 + Math.floor(Math.random() * 50),
          comments: 2340 + Math.floor(Math.random() * 200),
          revenue: 1245 + Math.floor(Math.random() * 100)
        };
        
        setStats(mockData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const statCards = [
    { 
      icon: Video, 
      label: "Total Videos", 
      value: stats.videos.toLocaleString(), 
      change: "+12%", 
      color: "from-amber-600 to-amber-700",
      trend: "up",
      description: "Across all categories"
    },
    { 
      icon: Eye, 
      label: "Total Views", 
      value: stats.views.toLocaleString(), 
      change: "+24%", 
      color: "from-blue-600 to-blue-700",
      trend: "up",
      description: "Last 30 days"
    },
    { 
      icon: ThumbsUp, 
      label: "Total Likes", 
      value: stats.likes.toLocaleString(), 
      change: "+18%", 
      color: "from-green-600 to-green-700",
      trend: "up",
      description: "Engagement rate: 4.2%"
    },
    { 
      icon: Users, 
      label: "Subscribers", 
      value: stats.subscribers.toLocaleString(), 
      change: "+8%", 
      color: "from-purple-600 to-purple-700",
      trend: "up",
      description: "YouTube channel"
    },
    { 
      icon: ImageIcon, 
      label: "Gallery Images", 
      value: stats.images.toLocaleString(), 
      change: "+15%", 
      color: "from-pink-600 to-pink-700",
      trend: "up",
      description: "Across all categories"
    },
    { 
      icon: UserPlus, 
      label: "Active Members", 
      value: stats.members.toLocaleString(), 
      change: "+5%", 
      color: "from-indigo-600 to-indigo-700",
      trend: "steady",
      description: "Registered users"
    },
    { 
      icon: MessageCircle, 
      label: "Comments", 
      value: stats.comments.toLocaleString(), 
      change: "+32%", 
      color: "from-cyan-600 to-cyan-700",
      trend: "up",
      description: "User engagement"
    },
    { 
      icon: DollarSign, 
      label: "Revenue", 
      value: `$${stats.revenue.toLocaleString()}`, 
      change: "+28%", 
      color: "from-emerald-600 to-emerald-700",
      trend: "up",
      description: "Monthly donations"
    },
  ];

  const recentActivities = [
    { action: "New video uploaded", user: "Pastor John", time: "2 hours ago", type: "upload", priority: "high" },
    { action: "Video published", user: "Admin", time: "5 hours ago", type: "publish", priority: "medium" },
    { action: "New member registered", user: "newuser@church.com", time: "1 day ago", type: "user", priority: "high" },
    { action: "Settings updated", user: "Admin", time: "2 days ago", type: "settings", priority: "low" },
    { action: "Image gallery updated", user: "Media Team", time: "3 days ago", type: "gallery", priority: "medium" },
    { action: "Donation received", user: "Anonymous", time: "3 days ago", type: "donation", priority: "high" },
    { action: "New comment on sermon", user: "Church Member", time: "4 days ago", type: "comment", priority: "low" },
  ];

  const popularContent = [
    { title: "Sunday Service - Jan 15", views: "15.2K", likes: "1.2K", category: "Sermons", type: "video", trend: "up", duration: "45:30" },
    { title: "Youth Worship Night", views: "12.8K", likes: "980", category: "Worship", type: "video", trend: "up", duration: "28:15" },
    { title: "Christmas Celebration Gallery", views: "8.5K", likes: "750", category: "Events", type: "gallery", trend: "steady", items: "45" },
    { title: "Bible Study Series", views: "9.5K", likes: "820", category: "Bible Study", type: "video", trend: "up", duration: "35:20" },
  ];

  const systemAlerts = [
    { type: "success", message: "Backup completed successfully", time: "Just now" },
    { type: "warning", message: "Storage at 85% capacity", time: "2 hours ago" },
    { type: "info", message: "New version available (v2.1.0)", time: "1 day ago" },
    { type: "error", message: "YouTube API quota near limit", time: "2 days ago" },
  ];

  const quickActions = [
    { icon: Upload, label: "Upload Video", path: "/admin/upload", color: "from-amber-600 to-amber-700", description: "Add new sermon or worship video" },
    { icon: ImageIcon, label: "Upload Image", path: "/admin/upload-image", color: "from-blue-600 to-blue-700", description: "Add to photo gallery" },
    { icon: Video, label: "Manage Videos", path: "/admin/videos", color: "from-green-600 to-green-700", description: "Edit or delete videos" },
    { icon: ImageIcon, label: "Manage Gallery", path: "/admin/gallery", color: "from-purple-600 to-purple-700", description: "Organize images" },
    { icon: Users, label: "User Management", path: "/admin/users", color: "from-pink-600 to-pink-700", description: "Manage members" },
    { icon: BarChart, label: "Analytics", path: "/admin/analytics", color: "from-indigo-600 to-indigo-700", description: "Detailed reports" },
  ];

  const platformStats = [
    { platform: "YouTube", value: "10.5K", change: "+8%", icon: Video, color: "text-red-400" },
    { platform: "Website", value: "4.2K", change: "+15%", icon: Globe, color: "text-blue-400" },
    { platform: "Mobile App", value: "2.8K", change: "+22%", icon: Smartphone, color: "text-green-400" },
    { platform: "Social Media", value: "18.7K", change: "+12%", icon: Users, color: "text-purple-400" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-900/20 border-red-700/30 text-red-300';
      case 'medium': return 'bg-yellow-900/20 border-yellow-700/30 text-yellow-300';
      case 'low': return 'bg-blue-900/20 border-blue-700/30 text-blue-300';
      default: return 'bg-gray-900/20 border-gray-700/30 text-gray-300';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-900/20 border-green-700/30 text-green-300';
      case 'warning': return 'bg-yellow-900/20 border-yellow-700/30 text-yellow-300';
      case 'error': return 'bg-red-900/20 border-red-700/30 text-red-300';
      case 'info': return 'bg-blue-900/20 border-blue-700/30 text-blue-300';
      default: return 'bg-gray-900/20 border-gray-700/30 text-gray-300';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'info': return <Bell className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  // const formatNumber = (num: number) => {
  //   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  //   if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  //   return num.toString();
  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400">Real-time insights and analytics for your church content</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg bg-gray-900/50 border border-amber-900/30 p-1">
            {(['7d', '30d', '90d', 'ytd'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm ${
                  timeRange === range
                    ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Days' : 
                 range === '30d' ? '30 Days' : 
                 range === '90d' ? '90 Days' : 'Year'}
              </button>
            ))}
          </div>
          
          <button className="p-2 rounded-lg border border-amber-900/30 text-amber-300 hover:bg-amber-900/10 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Welcome Banner with User Stats */}
      <div className="bg-linear-to-r from-amber-900/20 via-amber-900/10 to-transparent rounded-2xl border border-amber-900/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-amber-400">Admin</span>
            </h2>
            <p className="text-gray-300 max-w-2xl">
              Your ministry is making an impact! Here's what's happening with your church content today.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-green-400">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Live Analytics Active</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Last updated: Just now</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="group bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-5 md:p-6 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 
                stat.trend === 'down' ? 'text-red-400' : 
                'text-yellow-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-amber-900/20">
              <div className="text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Real-time data
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Performance Chart */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Performance Overview</h3>
              <p className="text-gray-400 text-sm">Views, engagement, and growth trends</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Target className="w-5 h-5" />
              <span className="font-medium">On Track</span>
            </div>
          </div>
          
          <div className="h-64">
            <DashboardChart timeRange={timeRange} />
          </div>
          
          <div className="mt-6 pt-6 border-t border-amber-900/30">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-gray-400 text-sm">Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.2%</div>
                <div className="text-gray-400 text-sm">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12.5s</div>
                <div className="text-gray-400 text-sm">Avg. Watch Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Platform Distribution</h3>
              <p className="text-gray-400 text-sm">Audience across different platforms</p>
            </div>
            <PieChart className="w-6 h-6 text-amber-400" />
          </div>
          
          <div className="space-y-4">
            {platformStats.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${platform.color.replace('text-', 'bg-')} bg-opacity-10`}>
                    <platform.icon className={`w-5 h-5 ${platform.color}`} />
                  </div>
                  <div>
                    <div className="text-white font-medium">{platform.platform}</div>
                    <div className="text-gray-400 text-sm">{platform.value} followers</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  platform.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {platform.change}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-900/20">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-amber-300 font-medium">Top Platform: YouTube</div>
                <div className="text-gray-400 text-sm">Generating 68% of total engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Popular Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Activity with Priority */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm">Today</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-gray-800/30 ${
                  activity.priority === 'high' ? 'border-l-4 border-red-500' :
                  activity.priority === 'medium' ? 'border-l-4 border-yellow-500' :
                  'border-l-4 border-blue-500'
                }`}
              >
                <div className={`p-2 rounded-lg ${getPriorityColor(activity.priority)}`}>
                  {activity.type === 'upload' && <Upload className="w-4 h-4" />}
                  {activity.type === 'publish' && <Eye className="w-4 h-4" />}
                  {activity.type === 'user' && <UserPlus className="w-4 h-4" />}
                  {activity.type === 'settings' && <BarChart className="w-4 h-4" />}
                  {activity.type === 'gallery' && <ImageIcon className="w-4 h-4" />}
                  {activity.type === 'donation' && <DollarSign className="w-4 h-4" />}
                  {activity.type === 'comment' && <MessageCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{activity.action}</div>
                  <div className="text-sm text-gray-400 truncate">{activity.user}</div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/admin/activity" 
            className="mt-6 flex items-center justify-center gap-2 p-3 rounded-lg border border-amber-900/30 text-amber-300 hover:bg-amber-900/10 transition-colors"
          >
            View All Activity
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Popular Content */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Popular Content</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {popularContent.map((content, index) => (
              <div 
                key={index} 
                className="group p-4 rounded-xl bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {content.type === 'video' ? (
                        <Video className="w-4 h-4 text-red-400" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-sm font-medium px-2 py-1 rounded bg-linear-to-r from-amber-900/20 to-amber-800/10 text-amber-300 border border-amber-700/30">
                        {content.category}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold truncate group-hover:text-amber-300 transition-colors">
                      {content.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {content.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {content.likes}
                      </span>
                      {content.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {content.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    content.trend === 'up' ? 'text-green-400' : 
                    content.trend === 'down' ? 'text-red-400' : 
                    'text-yellow-400'
                  }`}>
                    <Star className="w-4 h-4" />
                    <span className="text-xs font-medium">Top {index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & System Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Quick Actions Grid */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="group p-4 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/30 border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="space-y-3">
                  <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${action.color}`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium group-hover:text-amber-300 transition-colors">
                      {action.label}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{action.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">System Alerts</h3>
            <AlertCircle className="w-6 h-6 text-amber-400" />
          </div>
          
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 p-3 rounded-xl ${getAlertColor(alert.type)}`}
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="font-medium">{alert.message}</div>
                </div>
                <div className="text-sm opacity-75">{alert.time}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-linear-to-r from-blue-900/10 to-blue-800/5 border border-blue-900/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-r from-blue-900/20 to-blue-800/10">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-blue-300 font-medium">System Status: Operational</div>
                <div className="text-gray-400 text-sm">All services running normally</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/30">
            <div className="text-4xl font-bold text-white mb-2">98.7%</div>
            <div className="text-gray-400">Uptime</div>
            <div className="text-green-400 text-sm mt-2">✓ Excellent</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/30">
            <div className="text-4xl font-bold text-white mb-2">1.2s</div>
            <div className="text-gray-400">Avg. Response Time</div>
            <div className="text-green-400 text-sm mt-2">✓ Fast</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/30">
            <div className="text-4xl font-bold text-white mb-2">0</div>
            <div className="text-gray-400">Active Issues</div>
            <div className="text-green-400 text-sm mt-2">✓ Resolved</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/30">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
            <div className="text-blue-400 text-sm mt-2">ⓘ Available</div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="text-center py-6 border-t border-amber-900/30">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <span>Last refreshed: {new Date().toLocaleTimeString()}</span>
          <span className="hidden md:block">•</span>
          <span>Data updates every 30 seconds</span>
          <span className="hidden md:block">•</span>
          <span>Powered by Church CMS v2.1.0</span>
        </div>
        <div className="mt-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-900/30 text-amber-300 hover:bg-amber-900/10 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export Dashboard Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;