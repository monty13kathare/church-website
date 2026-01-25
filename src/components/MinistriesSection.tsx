import {
  Heart,
  Users,
  Baby,
  BookOpen,
  Music,
  HandHeart,
  Church,
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ServicesSection from "./ServiceSection";

const ministries = [
  {
    icon: Church,
    name: "Sunday Worship",
    description: "हर रविवार सुबह 10 बजे मुख्य आराधना सभा",
    time: "Sunday 10:00 AM",
    duration: "2 hours",
    location: "Main Sanctuary",
    highlight: true,
  },
  {
    icon: BookOpen,
    name: "Bible Study",
    description: "गहन वचन अध्ययन हर बुधवार शाम",
    time: "Wednesday 7:00 PM",
    duration: "1.5 hours",
    location: "Fellowship Hall",
    highlight: false,
  },
  {
    icon: Users,
    name: "Youth Ministry",
    description: "युवाओं के लिए विशेष सभा और गतिविधियाँ",
    time: "Saturday 5:00 PM",
    duration: "2 hours",
    location: "Youth Center",
    highlight: true,
  },
  {
    icon: Baby,
    name: "Children's Church",
    description: "बच्चों के लिए मजेदार और शिक्षाप्रद कार्यक्रम",
    time: "Sunday 10:00 AM",
    duration: "2 hours",
    location: "Kids Zone",
    highlight: false,
  },
  {
    icon: Heart,
    name: "Women's Fellowship",
    description: "महिलाओं की प्रार्थना और संगति सभा",
    time: "Tuesday 4:00 PM",
    duration: "2 hours",
    location: "Prayer Room",
    highlight: false,
  },
  {
    icon: Music,
    name: "Choir Practice",
    description: "गायन मंडली का अभ्यास और प्रशिक्षण",
    time: "Friday 5:00 PM",
    duration: "1.5 hours",
    location: "Music Room",
    highlight: true,
  },
  {
    icon: HandHeart,
    name: "Community Service",
    description: "जरूरतमंदों की सेवा और सहायता कार्यक्रम",
    time: "As Scheduled",
    duration: "Varies",
    location: "Various Locations",
    highlight: false,
  },
  {
    icon: GraduationCap,
    name: "Discipleship",
    description: "नए विश्वासियों के लिए शिष्यत्व प्रशिक्षण",
    time: "Monthly Sessions",
    duration: "2 hours",
    location: "Classroom 1",
    highlight: true,
  },
];

const MinistriesSection = () => {
  const [inView, setInView] = useState(false);
  const [activeMinistry, setActiveMinistry] = useState<string | null>(null);
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
    <>
     <section 
      id="ministries" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        {/* <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-linear(to right, #f59e0b 1px, transparent 1px),
                                linear-linear(to bottom, #f59e0b 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }} 
          />
        </div> */}
        
        {/* Floating Crosses */}
        {/* {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-amber-500/10 text-7xl md:text-8xl animate-float-slow`}
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + i * 15}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            ✝
          </div>
        ))} */}
        
        {/* linear Orbs */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-linear-to-br from-amber-600/5 to-amber-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-linear-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl" />
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
              Get Involved & Serve
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
            हमारी <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">सेवाएं</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join us in various ministries and grow together in faith, fellowship, and service
          </p>
        </div>

        {/* Ministries Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-all duration-1000 delay-300 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {ministries.map((ministry) => (
            <div
              key={ministry.name}
              className="group relative"
              onMouseEnter={() => setActiveMinistry(ministry.name)}
              onMouseLeave={() => setActiveMinistry(null)}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute -inset-2 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                ministry.highlight 
                  ? 'bg-linear-to-r from-amber-600/20 to-amber-400/20' 
                  : 'bg-linear-to-r from-amber-500/10 to-amber-400/10'
              }`} />
              
              <div className={`relative h-full backdrop-blur-md rounded-2xl p-6 md:p-8 border transition-all duration-500 overflow-hidden ${
                ministry.highlight
                  ? 'bg-linear-to-b from-amber-900/20 to-amber-900/10 border-amber-600/30 hover:border-amber-500'
                  : 'bg-linear-to-b from-gray-900/40 to-gray-900/20 border-amber-900/30 hover:border-amber-600/50'
              } hover:scale-105 hover:shadow-2xl hover:shadow-amber-900/20`}>
                
                {/* Top Decorative Element */}
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-8 translate-x-8 transition-all duration-700 group-hover:scale-150 ${
                  ministry.highlight
                    ? 'bg-linear-to-bl from-amber-600/20 to-transparent'
                    : 'bg-linear-to-bl from-amber-500/10 to-transparent'
                }`} />
                
                {/* Icon Container */}
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  ministry.highlight
                    ? 'bg-linear-to-br from-amber-800/30 to-amber-700/20'
                    : 'bg-linear-to-br from-amber-900/30 to-amber-800/20'
                } group-hover:scale-110 group-hover:rotate-3`}>
                  <div className={`absolute inset-0 rounded-2xl ${
                    ministry.highlight
                      ? 'bg-linear-to-br from-amber-600/40 to-transparent opacity-0 group-hover:opacity-100'
                      : 'bg-linear-to-br from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-500`} />
                  <ministry.icon className={`w-8 h-8 relative z-10 ${
                    ministry.highlight ? 'text-amber-400' : 'text-amber-300'
                  }`} />
                </div>

                {/* Ministry Name */}
                <h4 className={`font-serif font-bold text-xl mb-3 ${
                  ministry.highlight ? 'text-white' : 'text-gray-200'
                }`}>
                  {ministry.name}
                </h4>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {ministry.description}
                </p>

                {/* Details Section */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400/70" />
                    <div>
                      <p className="text-amber-300 font-medium text-sm">{ministry.time}</p>
                      <p className="text-gray-500 text-xs">Duration: {ministry.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400/70" />
                    <p className="text-gray-400 text-sm">{ministry.location}</p>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full py-3 rounded-lg bg-linear-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30 text-amber-100 font-medium text-sm transition-all duration-300 hover:border-amber-600 hover:bg-linear-to-r hover:from-amber-800/30 hover:to-amber-700/20 hover:text-white group/btn">
                  <span className="flex items-center justify-center gap-2">
                    Join Ministry
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>

                {/* Active Indicator */}
                {activeMinistry === ministry.name && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-linear-to-r from-amber-500 to-amber-300 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div 
          className={`mt-20 md:mt-32 transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/10 to-amber-900/20 rounded-3xl blur-xl" />
            
            <div className="relative bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-amber-900/30 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                    Ready to <span className="text-amber-300">Serve?</span>
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Find your place in ministry and discover the joy of serving together with our church family.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <span>Orientation: First Sunday of every month</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span>Meet with Ministry Leaders for guidance</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center md:text-right">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Schedule Ministry Meeting</span>
                    <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-gray-400 text-sm mt-4">
                    Contact our ministry coordinator for more information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scripture Verse */}
        <div 
          className={`mt-16 md:mt-24 text-center transition-all duration-1000 delay-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="w-8 h-px bg-linear-to-r from-transparent to-amber-500/30" />
            <p className="text-lg italic">
              "प्रत्येक एक को परमेश्वर का अनुग्रह देखने के अनुसार एक दूसरे की सेवा करनी चाहिए"
            </p>
            <div className="w-8 h-px bg-linear-to-l from-transparent to-amber-500/30" />
          </div>
          <p className="text-amber-300 font-medium mt-2">1 पतरस 4:10</p>
        </div>
      </div>
    </section>
    <ServicesSection/>
    </>
   
  );
};

export default MinistriesSection;