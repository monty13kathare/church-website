import { Facebook, Youtube, Instagram, Twitter, Heart, Church, MapPin, Phone, Calendar, ArrowRight } from "lucide-react";

const quickLinks = [
  { name: "About Us", href: "#about", icon: Church },
  { name: "Our Team", href: "#leadership", icon: Church },
  { name: "Ministries", href: "#ministries", icon: Church },
  { name: "Events", href: "#events", icon: Calendar },
  { name: "Videos", href: "#videos", icon: Youtube },
  { name: "Contact", href: "#contact", icon: Phone },
];

const services = [
  { name: "Marriage Ceremony", href: "#services" },
  { name: "Water Baptism", href: "#services" },
  { name: "Child Dedication", href: "#services" },
  { name: "Prayer Support", href: "#prayer-request" },
  { name: "Counseling", href: "#services" },
  { name: "Funeral Services", href: "#services" },
];

const serviceTimes = [
  { day: "Sunday", time: "10:00 AM", service: "Main Worship Service" },
  { day: "Wednesday", time: "7:00 PM", service: "Bible Study & Prayer" },
  { day: "Friday", time: "6:30 PM", service: "Prayer Meeting" },
  { day: "Saturday", time: "5:00 PM", service: "Youth Fellowship" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "from-blue-600 to-blue-500", bg: "bg-blue-900/20" },
  { icon: Youtube, href: "#", label: "YouTube", color: "from-red-600 to-red-500", bg: "bg-red-900/20" },
  { icon: Instagram, href: "#", label: "Instagram", color: "from-pink-600 to-pink-500", bg: "bg-pink-900/20" },
  { icon: Twitter, href: "#", label: "Twitter", color: "from-sky-600 to-sky-500", bg: "bg-sky-900/20" },
];

const Footer = () => {
  return (
    <footer className="relative bg-linear-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Pattern */}
        {/* <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 30H55L40 45L45 55L30 40L15 55L20 45L5 30H25L30 5Z' fill='%23f59e0b'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
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
        
        {/* linear Orbs */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-amber-600/5 to-amber-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-linear-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Church Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                <Church className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                  Smurna Bhawan
                </h3>
                <p className="text-amber-300 text-sm font-medium">Church & Prayer Center</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              एक ऐसी जगह जहाँ परमेश्वर का प्रेम और आशीष है। आइए हमारे साथ आराधना
              करें और परमेश्वर के परिवार का हिस्सा बनें। Where God's love and blessings overflow.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300 group">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm">123 Church Road, New Delhi</p>
                  <p className="text-xs text-gray-400">Delhi 110001, India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300 group">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-900/20 to-amber-800/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm">+91 98765 43210</p>
                  <p className="text-xs text-gray-400">24/7 Prayer Helpline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-white relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-linear-to-r from-amber-500 to-amber-300 rounded-full" />
            </h4>
            
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-amber-400/60 group-hover:text-amber-400" />
                    <span className="text-sm flex-1">{link.name}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-white relative inline-block">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-linear-to-r from-amber-500 to-amber-300 rounded-full" />
            </h4>
            
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="group flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500/50 group-hover:bg-amber-400" />
                    <span className="text-sm flex-1">{service.name}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Media */}
            <div className="pt-6">
              <h5 className="text-gray-400 text-sm font-medium mb-4">Connect With Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`group relative w-10 h-10 rounded-xl ${social.bg} border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    <div className={`absolute inset-0 rounded-xl bg-linear-to-r ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-white relative inline-block">
              Service Times
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-linear-to-r from-amber-500 to-amber-300 rounded-full" />
            </h4>
            
            <ul className="space-y-4">
              {serviceTimes.map((time) => (
                <li key={time.day} className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-linear-to-r from-gray-900/30 to-gray-900/10 border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300 group-hover:scale-105">
                    <Calendar className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{time.day}</span>
                        <span className="text-amber-300 font-bold">{time.time}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{time.service}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Newsletter */}
            <div className="pt-6">
              <h5 className="text-gray-400 text-sm font-medium mb-4">Stay Updated</h5>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
                <button className="absolute right-2 top-2 px-4 py-1.5 bg-linear-to-r from-amber-600 to-amber-700 text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/50">
        {/* Top linear */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 Smurna Bhawan Church. All rights reserved.
              <span className="block md:inline md:ml-2 text-gray-500">
                A registered religious organization.
              </span>
            </p>
            
            {/* Privacy Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-amber-300 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-300 text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
          
          {/* Made With Love */}
          <div className="mt-6 pt-6 border-t border-gray-800/30 text-center">
            <p className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              Made with
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              for God's Glory
              <span className="text-amber-400/70 mx-2">|</span>
              Psalms 115:1
            </p>
          </div>
          
          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-linear-to-br from-amber-900/40 to-amber-800/30 border border-amber-800/50 flex items-center justify-center text-amber-400 hover:scale-110 transition-transform backdrop-blur-sm"
            aria-label="Back to top"
          >
            <ArrowRight className="w-5 h-5 transform -rotate-90" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;