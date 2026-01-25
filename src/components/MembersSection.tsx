import { Users, Heart, Award, Sparkles, Home, Church, Calendar, ArrowRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: Users, value: "500+", label: "Active Members", change: "+15%", color: "from-blue-900/30 to-blue-800/20" },
  { icon: Heart, value: "50+", label: "Families Served", change: "+8%", color: "from-red-900/30 to-red-800/20" },
  { icon: Award, value: "25+", label: "Years of Ministry", change: null, color: "from-amber-900/30 to-amber-800/20" },
  { icon: Church, value: "10+", label: "Ministries", change: "+2", color: "from-purple-900/30 to-purple-800/20" },
];

const memberTestimonials = [
  {
    name: "Priya Verma",
    role: "Member since 2015",
    quote: "Smurna Bhawan ने मेरी जिंदगी बदल दी। यहाँ मुझे सच्चा परिवार मिला और परमेश्वर का प्रेम अनुभव किया।",
    avatar: "PV",
    highlight: true,
    joinYear: "2015"
  },
  {
    name: "Rahul Singh",
    role: "Youth Leader",
    quote: "यहाँ युवाओं के लिए बहुत अचचे अवसर हैं। मेरा विश्वास यहाँ बढ़ा और जीवन में नई दिशा मिली।",
    avatar: "RS",
    highlight: false,
    ministry: "Youth Ministry"
  },
  {
    name: "Mary Thomas",
    role: "Women's Ministry Leader",
    quote: "महिला सभा में भाग लेना मेरे लिए आशीष है। परमेश्वर की उपस्थिति यहाँ गहराई से महसूस होती है।",
    avatar: "MT",
    highlight: true,
    ministry: "Women's Fellowship"
  },
];

const familyHighlights = [
  { icon: Home, label: "Family Events", value: "Monthly" },
  { icon: Heart, label: "Couples Ministry", value: "Active" },
  { icon: Users, label: "Senior Support", value: "Weekly" },
  { icon: Sparkles, label: "Children Programs", value: "Sunday School" },
];

const MembersSection = () => {
  const [inView, setInView] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
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
      id="members" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Family Pattern */}
        {/* <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 20L50 40H70L55 60L60 70L40 55L20 70L25 60L10 40H30L40 20Z' fill='%23f59e0b'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px',
            }} 
          />
        </div> */}
         {/* <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-linear(to right, #f59e0b 1px, transparent 1px),
                              linear-linear(to bottom, #f59e0b 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div> */}
        
        {/* Floating Icons */}
        {/* {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-amber-500/10 ${i % 2 === 0 ? 'text-7xl' : 'text-9xl'} animate-float-slow`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {i % 2 === 0 ? '👨‍👩‍👧‍👦' : '❤️'}
          </div>
        ))} */}
        
        {/* linear Orbs */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-linear-to-br from-amber-600/10 to-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-linear-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div 
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24 transition-all duration-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative"
            >
              <div className="relative backdrop-blur-md rounded-2xl p-6 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 hover:scale-105">
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-7 h-7 text-amber-400" />
                </div>
                
                <p className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">
                  {stat.value}
                </p>
                
                <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
                
                {stat.change && (
                  <div className="inline-flex items-center gap-1 bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-800/30 px-2 py-1 rounded-lg">
                    <span className="text-green-300 text-xs font-medium">{stat.change}</span>
                    <span className="text-green-400 text-xs">this year</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div 
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 delay-300 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Our Church Family
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
            हमारा <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">समुदाय</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Meet our growing family of believers and hear what God is doing in their lives
          </p>
        </div>

        {/* Family Highlights */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 transition-all duration-1000 delay-500 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {familyHighlights.map((highlight) => (
            <div
              key={highlight.label}
              className="backdrop-blur-md rounded-xl p-4 md:p-6 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 text-center hover:border-amber-600/50 transition-colors"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center mx-auto mb-3">
                <highlight.icon className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </div>
              <p className="text-white font-medium text-sm md:text-base mb-1">{highlight.label}</p>
              <p className="text-amber-300 text-xs md:text-sm">{highlight.value}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div 
          className={`mb-16 md:mb-24 transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Quote className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                Member <span className="text-amber-300">Testimonies</span>
              </h3>
              <Quote className="w-6 h-6 text-amber-400 transform rotate-180" />
            </div>
            <p className="text-gray-400">Hear what our church family has to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {memberTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="group relative"
                onMouseEnter={() => setActiveTestimonial(index)}
                onMouseLeave={() => setActiveTestimonial(null)}
              >
                {/* Hover Glow Effect */}
                <div className={`absolute -inset-3 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  testimonial.highlight 
                    ? 'bg-linear-to-r from-amber-600/20 to-amber-400/20' 
                    : 'bg-linear-to-r from-amber-500/10 to-amber-400/10'
                }`} />
                
                <div className={`relative backdrop-blur-md rounded-2xl p-6 md:p-8 border transition-all duration-500 ${
                  testimonial.highlight
                    ? 'border-amber-600/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-500'
                    : 'border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50'
                } hover:shadow-2xl hover:shadow-amber-900/20`}>
                  
                  {/* Top Decoration */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-12 h-12" />
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                    testimonial.highlight
                      ? 'bg-linear-to-br from-amber-800/40 to-amber-600/30'
                      : 'bg-linear-to-br from-amber-900/40 to-amber-800/30'
                  } group-hover:scale-110`}>
                    <span className="text-amber-200 font-bold text-xl">
                      {testimonial.avatar}
                    </span>
                  </div>
                  
                  {/* Quote */}
                  <div className="relative">
                    <Quote className="w-5 h-5 text-amber-400/50 absolute -top-2 -left-2" />
                    <p className="text-gray-300 italic leading-relaxed mb-6 text-lg">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  {/* Member Info */}
                  <div className="pt-6 border-t border-amber-900/20">
                    <p className="font-serif font-bold text-white text-lg mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-amber-300 text-sm font-medium mb-2">
                      {testimonial.role}
                    </p>
                    
                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {testimonial.joinYear && (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-linear-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30">
                          <Calendar className="w-3 h-3" />
                          Joined {testimonial.joinYear}
                        </span>
                      )}
                      {testimonial.ministry && (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-linear-to-r from-blue-900/20 to-blue-800/10 border border-blue-800/30">
                          <Church className="w-3 h-3" />
                          {testimonial.ministry}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeTestimonial === index && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-linear-to-r from-amber-500 to-amber-300 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div 
          className={`transition-all duration-1000 delay-1000 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/10 to-amber-900/20 rounded-3xl blur-xl" />
            
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-8 md:p-12 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                      <Home className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                        Join Our <span className="text-amber-300">Church Family</span>
                      </h3>
                      <p className="text-amber-300 text-sm">स्वागत है आपका!</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    हम आपका हार्दिक स्वागत करते हैं! आइए और हमारे परिवार का हिस्सा बनें, जहाँ आप परमेश्वर की आशीष और प्रेम का अनुभव करेंगे।
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      "Weekly newcomer orientation",
                      "Personal spiritual guidance",
                      "Ministry placement assistance",
                      "Family integration programs"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Content */}
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium">Next New Member Class</p>
                        <p className="text-amber-100">First Sunday of Every Month</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300">
                      <Users className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium">Available Mentors</p>
                        <p className="text-amber-100">25+ Experienced Leaders</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300">
                      <Heart className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium">Family Integration</p>
                        <p className="text-amber-100">Personalized Support</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                      href="#contact"
                      className="group relative px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Become a Member
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </a>
                    
                    <a
                      href="#about"
                      className="group px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Learn More
                        <Sparkles className="w-5 h-5" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;