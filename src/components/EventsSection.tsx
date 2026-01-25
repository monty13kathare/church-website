import { Calendar, Clock, MapPin, ArrowRight, Star, Users, Music, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const events = [
  {
    title: "Christmas Celebration",
    date: "December 25, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Main Sanctuary",
    description: "क्रिसमस का विशेष कार्यक्रम - आराधना, नाटक और भोजन सहभागिता",
    featured: true,
    icon: Star,
    attendees: "250+",
    type: "Worship",
    color: "from-red-900/20 to-red-800/10"
  },
  {
    title: "New Year Prayer Meet",
    date: "January 1, 2026",
    time: "11:00 PM - 12:30 AM",
    location: "Church Hall",
    description: "नए साल का स्वागत प्रार्थना और आराधना के साथ",
    featured: true,
    icon: Heart,
    attendees: "180+",
    type: "Prayer",
    color: "from-blue-900/20 to-blue-800/10"
  },
  {
    title: "Youth Camp 2026",
    date: "February 15-17, 2026",
    time: "Full Day Event",
    location: "Hilltop Retreat Center",
    description: "युवाओं के लिए 3 दिवसीय आध्यात्मिक शिविर",
    featured: false,
    icon: Users,
    attendees: "120",
    type: "Camp",
    color: "from-green-900/20 to-green-800/10"
  },
  {
    title: "Women's Conference",
    date: "March 8, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Church Hall",
    description: "महिलाओं के लिए विशेष सम्मेलन - प्रेरणादायक संदेश",
    featured: false,
    icon: Music,
    attendees: "150+",
    type: "Conference",
    color: "from-purple-900/20 to-purple-800/10"
  },
  {
    title: "Easter Sunday Service",
    date: "April 20, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "पुनरुत्थान रविवार की विशेष आराधना",
    featured: true,
    icon: Heart,
    attendees: "300+",
    type: "Worship",
    color: "from-yellow-900/20 to-yellow-800/10"
  },
  {
    title: "Baptism Service",
    date: "May 10, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Baptism Pool",
    description: "नए विश्वासियों का बपतिस्मा समारोह",
    featured: false,
    icon: Users,
    attendees: "25",
    type: "Baptism",
    color: "from-cyan-900/20 to-cyan-800/10"
  },
];

const EventsSection = () => {
  const [inView, setInView] = useState(false);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="events" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        {/* <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-linear(to right, #f59e0b 1px, transparent 1px),
                                linear-linear(to bottom, #f59e0b 1px, transparent 1px)`,
              backgroundSize: '70px 70px',
            }} 
          />
        </div> */}
        
        {/* Floating Calendar Icons */}
        {/* {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-amber-500/10 ${
              i === 0 ? 'text-8xl' : i === 1 ? 'text-7xl' : 'text-6xl'
            } animate-float-slow`}
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            📅
          </div>
        ))} */}
        
        {/* linear Orbs */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-linear-to-br from-amber-600/5 to-amber-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-linear-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Upcoming Events & Programs
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
            आने वाले <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">कार्यक्रम</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay connected with our church community events and spiritual gatherings
          </p>
        </div>

        {/* Events Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 transition-all duration-1000 delay-300 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {events.map((event) => (
            <div
              key={event.title}
              className="group relative"
              onMouseEnter={() => setActiveEvent(event.title)}
              onMouseLeave={() => setActiveEvent(null)}
            >
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="relative group/featured">
                    <div className="absolute -inset-1 bg-linear-to-r from-amber-600/40 to-amber-400/40 rounded-full blur-sm" />
                    {/* <div className="relative bg-linear-to-r from-amber-600 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                      <Star className="w-3 h-3" />
                      Featured Event
                    </div> */}
                  </div>
                </div>
              )}
              
              {/* Event Card */}
              <div className="relative h-full backdrop-blur-md rounded-2xl overflow-hidden border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 hover:scale-105 group-hover:shadow-lg">
                {/* Top Color Bar */}
                <div className={`h-2 w-full bg-linear-to-r ${event.color}`} />
                
                <div className="p-6 md:p-8">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${event.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <event.icon className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl text-white mb-1 line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="inline-flex items-center gap-2">
                        <span className="text-amber-300 text-sm font-medium">{event.type}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.attendees}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
                    {event.description}
                  </p>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Date</p>
                          <p className="text-gray-400 text-xs">{event.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Time</p>
                          <p className="text-gray-400 text-xs">{event.time}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Location</p>
                          <p className="text-gray-400 text-xs">{event.location}</p>
                        </div>
                      </div>
                      
                      <div className="h-8 flex items-center justify-center rounded-lg bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-800/20">
                        <span className="text-amber-300 text-xs font-medium">Open to All</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full py-3 rounded-xl bg-linear-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30 text-amber-100 font-medium text-sm transition-all duration-300 hover:border-amber-600 hover:bg-linear-to-r hover:from-amber-800/30 hover:to-amber-700/20 hover:text-white group/btn">
                    <span className="flex items-center justify-center gap-2">
                      Register Now
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
                
                {/* Active Event Indicator */}
                {activeEvent === event.title && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-amber-400 to-amber-300 animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Section */}
        <div 
          className={`text-center transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/10 to-amber-900/20 rounded-3xl blur-xl" />
            <div className="relative bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-amber-900/30">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Don't Miss Any Event!
              </h3>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                Subscribe to our newsletter and get regular updates about all upcoming events, programs, and spiritual gatherings.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#calendar"
                  className="group relative px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    View Full Calendar
                    <Calendar className="w-5 h-5" />
                  </span>
                </a>
                
                <a
                  href="#newsletter"
                  className="group px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    Subscribe to Updates
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Highlights */}
        <div 
          className={`mt-16 md:mt-24 transition-all duration-1000 delay-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-8">
            <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
              This Month's <span className="text-amber-300">Highlights</span>
            </h4>
            <p className="text-gray-400">Special events and services for the current month</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              { day: "Every Sunday", event: "Main Worship Service", time: "10:00 AM" },
              { day: "Every Wednesday", event: "Bible Study", time: "7:00 PM" },
              { day: "Every Friday", event: "Prayer Meeting", time: "6:30 PM" },
              { day: "Every Saturday", event: "Youth Fellowship", time: "5:00 PM" },
            ].map((highlight, index) => (
              <div
                key={index}
                className="flex-1 min-w-50 max-w-75 backdrop-blur-md rounded-xl p-4 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 transition-colors"
              >
                <p className="text-amber-300 text-sm font-medium mb-1">{highlight.day}</p>
                <p className="text-white font-medium mb-1">{highlight.event}</p>
                <p className="text-gray-400 text-sm">{highlight.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;