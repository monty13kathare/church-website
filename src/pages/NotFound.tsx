// pages/NotFound.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Search,
  Compass,
  AlertCircle,
  Church,
  Heart,
  BookOpen,
  Users,
  Calendar,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Shield,
  Star
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on mount
    setIsVisible(true);

    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Popular pages for suggestion
  const popularPages = [
    { path: "/", label: "Home", icon: Home, description: "Return to main page" },
    { path: "/videos", label: "Videos & Sermons", icon: BookOpen, description: "Watch our latest sermons" },
    { path: "/gallery", label: "Photo Gallery", icon: Heart, description: "Browse event photos" },
    { path: "/matrimony", label: "Matrimony", icon: Users, description: "Christian matrimonial service" },
    { path: "/events", label: "Events", icon: Calendar, description: "Upcoming church events" },
    { path: "/contact", label: "Contact Us", icon: Phone, description: "Get in touch with us" },
  ];

  const churchInfo = {
    name: "Grace Community Church",
    address: "123 Faith Avenue, City, State 12345",
    phone: "(555) 123-4567",
    email: "info@gracechurch.com",
    serviceTimes: "Sundays: 9:00 AM & 11:00 AM",
    pastor: "Pastor John Samuel"
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating crosses */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-500/5 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          >
            ✝
          </div>
        ))}

        {/* linear orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-br from-amber-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-linear-to-tr from-blue-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-linear-to-r from-purple-500/2 to-transparent rounded-full blur-3xl" />

        {/* Animated particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-amber-900/20 to-amber-800/10 mb-6 border border-amber-900/30">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-700 rounded-full blur-lg" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 bg-linear-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tighter">
              <span className="bg-linear-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                404
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Page <span className="text-amber-400">Not Found</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved.
              <br />
              <span className="text-amber-300 font-medium">
                "{location.pathname}"
              </span>
            </p>

            {/* Auto-redirect countdown */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 mb-8">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300">
                Redirecting to home in <span className="font-bold text-white">{countdown}s</span>
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Help & Navigation */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Compass className="w-6 h-6 text-amber-400" />
                  Quick Navigation
                </h3>

                <div className="space-y-4">
                  <Link
                    to="/"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-900/20 hover:border-amber-500/50 hover:bg-amber-900/20 transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-linear-to-r from-amber-900/20 to-amber-800/10 group-hover:from-amber-600 group-hover:to-amber-700 transition-all">
                      <ArrowLeft className="w-5 h-5 text-amber-400 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold group-hover:text-amber-300 transition-colors">
                        Go Back Home
                      </div>
                      <div className="text-gray-400 text-sm">
                        Return to the main homepage
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transform group-hover:-translate-x-1 transition-all" />
                  </Link>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search our website..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Popular Pages */}
              <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-400" />
                  Popular Pages
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {popularPages.map((page, index) => (
                    <Link
                      key={index}
                      to={page.path}
                      className="group p-4 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/30 border border-amber-900/30 hover:border-amber-500/50 hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-linear-to-r from-amber-900/20 to-amber-800/10 group-hover:from-amber-600 group-hover:to-amber-700 transition-all">
                          <page.icon className="w-4 h-4 text-amber-400 group-hover:text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover:text-amber-300 transition-colors">
                            {page.label}
                          </div>
                          <div className="text-gray-400 text-xs mt-1">
                            {page.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Church Info & Help */}
            <div className="space-y-8">
              {/* Church Information */}
              <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-linear-to-r from-amber-900/30 to-amber-700/20">
                    <Church className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{churchInfo.name}</h3>
                    <p className="text-gray-400 text-sm">Where faith meets community</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/30">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-white font-medium">Location</div>
                      <div className="text-gray-300 text-sm">{churchInfo.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/30">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-white font-medium">Service Times</div>
                      <div className="text-gray-300 text-sm">{churchInfo.serviceTimes}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/30">
                    <Phone className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-white font-medium">Contact</div>
                      <div className="text-gray-300 text-sm">{churchInfo.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/30">
                    <Mail className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-white font-medium">Email</div>
                      <div className="text-gray-300 text-sm">{churchInfo.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-linear-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  Need Help?
                </h3>

                <p className="text-gray-300 mb-6">
                  If you're having trouble finding what you need or believe this is an error, our team is here to help.
                </p>

                <div className="space-y-4">
                  <a
                    href={`mailto:${churchInfo.email}?subject=Website Assistance Needed&body=Hello, I need help with: ${location.pathname}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-blue-900/20 to-blue-800/10 border border-blue-700/30 hover:border-blue-500 hover:bg-blue-900/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Email Support</div>
                        <div className="text-gray-400 text-sm">Get help via email</div>
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-500 transform -rotate-180 group-hover:text-blue-400" />
                  </a>

                  <a
                    href={`tel:${churchInfo.phone.replace(/\D/g, '')}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-700/30 hover:border-green-500 hover:bg-green-900/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white font-medium">Call Us</div>
                        <div className="text-gray-400 text-sm">Speak with someone</div>
                      </div>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-500 transform -rotate-180 group-hover:text-green-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bible Verse */}
          <div className="mt-12 md:mt-20 text-center">
            <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-linear-to-r from-amber-900/10 via-amber-900/5 to-transparent border border-amber-900/30">
              <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <blockquote className="text-xl md:text-2xl text-white font-serif italic mb-4">
                "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
              </blockquote>
              <cite className="text-amber-300 font-medium">— Jeremiah 29:11</cite>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-amber-900/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-white font-bold text-lg mb-2">Grace Community Church</div>
                <div className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} All rights reserved
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Users className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Calendar className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default NotFound;