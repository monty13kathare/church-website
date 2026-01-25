import pastorImage from "@/assets/pastor.png";
import { Users, Music, BookOpen, Heart, Mail, Phone, Calendar, ArrowRight, School, PlugZap, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const pastor = {
  name: "Pastor Ramesh Manikpuri",
  title: "Senior Pastor",
  image: pastorImage,
  description: "25+ वर्षों से परमेश्वर की सेवा में। उनका जुनून है लोगों को मसीह की ओर लाना और उन्हें शिष्य बनाना।",
  // verse: "यहेजकेल 34:11",
  contact: {
    email: "pastor@smurnabhawan.com",
    phone: "(123) 456-7891",
    available: "Tuesday - Thursday, 2:00 PM - 5:00 PM"
  }
};

const teamLeaders = [
  {
    name: "Kritesh Manikpuri",
    role: "Associate Pastor",
    icon: BookOpen,
    years: "15+ years",
    specialty: "Bible Teaching"
  },
  {
    name: "Ranjita Manikpuri",
    role: "Women's Ministry Lead",
    icon: Heart,
    years: "18+ years",
    specialty: "Counseling"
  },
  {
    name: "David Wilson",
    role: "Youth Pastor",
    icon: Users,
    years: "8+ years",
    specialty: "Youth Outreach"
  },
  {
    name: "Sarah Thomas",
    role: "Children's Ministry",
    icon: Heart,
    years: "10+ years",
    specialty: "Early Education"
  },
];

const worshipTeam = [
  { name: "Shashi Baghel", role: "Worship Leader", instrument: "🎤 Vocals" },
  { name: "Bhupat Sahu", role: "Worship Leader", instrument: "🎤 Vocals" },
  { name: "Raaj Sonwani", role: "Worship Leader", instrument: "🎹 Keys 🎤 Vocals " },
  { name: "Sunita yadav", role: "Vocalist", instrument: "🎤 Vocals" },
  { name: "Bharti Sahu", role: "Vocalist", instrument: " 🎤 Vocals" },
  { name: "Pooja Sahu", role: "Vocalist", instrument: " 🎤 Vocals" },
  { name: "Resham Sonwani", role: "Vocalist", instrument: "🎤 Vocals" },
  { name: "Alka Manikpuri", role: "Worship Leader", instrument: "🎤 Vocals" },
  { name: "Payal Sahu", role: "Vocalist", instrument: "🎸 Acoustic" },
  { name: "Bhavesh Ghritlahre", role: "Vocalist", instrument: "Clap Box" },
  { name: "Sukhsagar Pankaj", role: "Vocalist", instrument: "🎤 Vocals" },
  { name: "Satish Kaithel", role: "Vocalist", instrument: "🎹 Keys 🎸 Acoustic 🥁 Drums 🎤 Vocals" },
  { name: "Sukhsagar Pankaj", role: "Vocalist", instrument: "🎤 Vocals" },
];

const sundaySchoolTeam = [
  { name: "Anjali Kathare", role: "Teacher"},
  { name: "Alka Manikpuri", role: "Teacher" },
  { name: "Pooja Sahu", role: "Teacher" },
  { name: "Devika Sahu", role: "Teacher" },
];

const technicalTeam = [
  { name: "Devendra Sahu", role: "Sound Operator"},
  { name: "Vicky Manikpuri", role: "Sound Operator"},
  { name: "Jitendra Baghel", role: "Sound Operator"},
  { name: "Satish Kaithel", role: "Sound Operator" },
];

const volenteerTeam = [
  { name: "Anjal Kathare", role: "Volenteer"},
  { name: "Savita Ghritlahre", role: "Volenteer"},
  { name: "Ulfi Pankaj", role: "Volenteer"},
  { name: "Kajal Bharti", role: "Volenteer"},
  { name: "Kirti Bansare", role: "Volenteer"},
  { name: "Madhuri Sahu", role: "Volenteer"},
];

const LeadershipSection = () => {
  const [inView, setInView] = useState(false);
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
      id="leadership" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-linear-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* linear Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/3 rounded-full blur-3xl" />
        
        {/* Cross Patterns */}
        {/* <div className="absolute top-40 right-40 text-amber-500/10 text-8xl">✝</div>
        <div className="absolute bottom-40 left-40 text-amber-500/10 text-6xl">✝</div> */}
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
              Our Spiritual Leaders
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
            हमारी <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">टीम</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated servants leading our church family with passion and purpose
          </p>
        </div>

        {/* Senior Pastor Card */}
        <div 
          className={`max-w-6xl mx-auto mb-20 md:mb-32 transition-all duration-1000 delay-300 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/10 to-amber-900/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/50 overflow-hidden border border-amber-900/30 group-hover:border-amber-700/40 transition-all duration-500">
              <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent lg:bg-linear-to-r" />
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay linear */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Verse Badge */}
                  {/* <div className="absolute top-6 right-6">
                    <div className="bg-linear-to-br from-amber-900/80 to-amber-800/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-amber-600/30">
                      <p className="text-amber-200 text-sm font-medium">{pastor.verse}</p>
                    </div>
                  </div> */}
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-10 flex flex-col justify-center bg-linear-to-br from-gray-900/60 to-gray-900/40">
                  {/* Title Badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">
                      {pastor.title}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                    {pastor.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    {pastor.description}
                  </p>

                  {/* Contact Information */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-colors">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${pastor.contact.email}`} className="text-sm">
                        {pastor.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-colors">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${pastor.contact.phone}`} className="text-sm">
                        {pastor.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{pastor.contact.available}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#contact"
                      className="group relative px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        Schedule Meeting
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                    
                    <a
                      href="#prayer-request"
                      className="px-6 py-3 border border-amber-500/50 text-amber-100 rounded-lg font-medium backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5"
                    >
                      Prayer Request
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Leaders */}
        <div 
          className={`mb-20 md:mb-32 transition-all duration-1000 delay-500 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-linear-to-r from-transparent to-amber-500/50" />
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                Ministry <span className="text-amber-300">Leaders</span>
              </h3>
              <div className="w-8 h-px bg-linear-to-l from-transparent to-amber-500/50" />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dedicated leaders serving in various ministries with passion and commitment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamLeaders.map((leader) => (
              <div
                key={leader.name}
                className="group relative"
              >
                {/* Hover Glow */}
                <div className="absolute -inset-2 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-amber-600/10 to-amber-400/10" />
                
                <div className="relative h-full backdrop-blur-md rounded-2xl p-6 md:p-8 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 hover:scale-105">
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center mb-6 group-hover:from-amber-800/40 group-hover:to-amber-700/30 transition-all duration-500">
                    <leader.icon className="w-8 h-8 text-amber-400" />
                  </div>

                  {/* Name */}
                  <h4 className="font-serif font-bold text-xl text-white mb-2">
                    {leader.name}
                  </h4>

                  {/* Role */}
                  <p className="text-amber-300 font-medium text-sm mb-3">
                    {leader.role}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500/50" />
                      {leader.years} of service
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500/50" />
                      {leader.specialty}
                    </p>
                  </div>

                  {/* Contact Button */}
                  <button className="w-full py-2.5 border border-amber-500/30 text-amber-100 rounded-lg text-sm font-medium hover:border-amber-400 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worship Team */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10">
                  <Music className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                  Worship <span className="text-amber-300">Team</span>
                </h3>
              </div>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Talented musicians and vocalists who lead us into God's presence through worship
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {worshipTeam.map((member) => (
              <div
                key={member.name}
                className="group relative"
              >
                <div className="relative backdrop-blur-md rounded-xl p-4 md:p-6 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 hover:scale-105">
                  {/* Initial Avatar */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-amber-800/40 to-amber-600/30 flex items-center justify-center mx-auto mb-3 group-hover:from-amber-700/50 group-hover:to-amber-500/40 transition-all duration-500">
                    <span className="text-amber-200 font-bold text-lg md:text-xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name */}
                  <h5 className="font-medium text-white text-sm md:text-base text-center mb-1">
                    {member.name}
                  </h5>

                  {/* Role */}
                  <p className="text-amber-300 text-xs md:text-sm text-center font-medium mb-2">
                    {member.role}
                  </p>

                  {/* Instrument */}
                  <p className="text-gray-400 text-xs text-center">
                    {member.instrument}
                  </p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Join Team CTA */}
          <div className="mt-12 mb-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 hover:scale-105"
            >
              <span>Join Worship Ministry</span>
              <Music className="w-5 h-5" />
            </a>
          </div>
        </div>

         {/* Sunday School Teacher */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10">
                  <School className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                  Sunday School <span className="text-amber-300">Teacher</span>
                </h3>
              </div>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Talented musicians and vocalists who lead us into God's presence through worship
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center items-center">
            {sundaySchoolTeam.map((member) => (
              <div
                key={member.name}
                className="group relative"
              >
                <div className="relative backdrop-blur-md rounded-xl p-4 md:p-6 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 hover:scale-105">
                  {/* Initial Avatar */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-amber-800/40 to-amber-600/30 flex items-center justify-center mx-auto mb-3 group-hover:from-amber-700/50 group-hover:to-amber-500/40 transition-all duration-500">
                    <span className="text-amber-200 font-bold text-lg md:text-xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name */}
                  <h5 className="font-medium text-white text-sm md:text-base text-center mb-1">
                    {member.name}
                  </h5>

                  {/* Role */}
                  <p className="text-amber-300 text-xs md:text-sm text-center font-medium mb-2">
                    {member.role}
                  </p>

                  {/* Instrument */}
                  {/* <p className="text-gray-400 text-xs text-center">
                    {member.instrument}
                  </p> */}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
 {/* Join Team CTA */}
          <div className="mt-12 mb-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 hover:scale-105"
            >
              <span>Join Sunday School Team</span>
              <School className="w-5 h-5" />
            </a>
          </div>
         
        </div>

         {/* Technical Team */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12 mt-12">
            <div className="inline-flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10">
                  <PlugZap className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                  Technical <span className="text-amber-300">Team</span>
                </h3>
              </div>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Talented musicians and vocalists who lead us into God's presence through worship
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center items-center">
            {technicalTeam.map((member) => (
              <div
                key={member.name}
                className="group relative"
              >
                <div className="relative backdrop-blur-md rounded-xl p-4 md:p-6 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 hover:scale-105">
                  {/* Initial Avatar */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-amber-800/40 to-amber-600/30 flex items-center justify-center mx-auto mb-3 group-hover:from-amber-700/50 group-hover:to-amber-500/40 transition-all duration-500">
                    <span className="text-amber-200 font-bold text-lg md:text-xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name */}
                  <h5 className="font-medium text-white text-sm md:text-base text-center mb-1">
                    {member.name}
                  </h5>

                  {/* Role */}
                  <p className="text-amber-300 text-xs md:text-sm text-center font-medium mb-2">
                    {member.role}
                  </p>

                  {/* Instrument */}
                  {/* <p className="text-gray-400 text-xs text-center">
                    {member.instrument}
                  </p> */}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Join Team CTA */}
          <div className="mt-12 mb-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 hover:scale-105"
            >
              <span>Join Technical Team</span>
              <PlugZap className="w-5 h-5" />
            </a>
          </div>
        </div>

          {/* Technical Team */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12 mt-12">
            <div className="inline-flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10">
                  <User className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                  Volenteer <span className="text-amber-300">Team</span>
                </h3>
              </div>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Talented musicians and vocalists who lead us into God's presence through worship
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-center items-center">
            {volenteerTeam.map((member) => (
              <div
                key={member.name}
                className="group relative"
              >
                <div className="relative backdrop-blur-md rounded-xl p-4 md:p-6 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 hover:scale-105">
                  {/* Initial Avatar */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-amber-800/40 to-amber-600/30 flex items-center justify-center mx-auto mb-3 group-hover:from-amber-700/50 group-hover:to-amber-500/40 transition-all duration-500">
                    <span className="text-amber-200 font-bold text-lg md:text-xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name */}
                  <h5 className="font-medium text-white text-sm md:text-base text-center mb-1">
                    {member.name}
                  </h5>

                  {/* Role */}
                  <p className="text-amber-300 text-xs md:text-sm text-center font-medium mb-2">
                    {member.role}
                  </p>

                  {/* Instrument */}
                  {/* <p className="text-gray-400 text-xs text-center">
                    {member.instrument}
                  </p> */}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Join Team CTA */}
          <div className="mt-12 mb-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 hover:scale-105"
            >
              <span>Join Volenteer Team</span>
              <User className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className={`mt-20 md:mt-32 text-center transition-all duration-1000 delay-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/10 via-transparent to-amber-900/10 rounded-2xl blur-xl" />
            <div className="relative bg-linear-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-md border border-amber-900/30 rounded-2xl p-8 md:p-12">
              <p className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                "एक दूसरे को सिखाओ और चिताओ, भजनों और स्तुतियों, और आत्मिक गीतों से परमेश्वर का धन्यवाद करते रहो।"
              </p>
              <p className="text-amber-300 font-medium">कुलुस्सियों 3:16</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;