import { Heart, Users, Church, BookOpen, Calendar, Phone, Mail, CheckCircle, ArrowRight, Star, Cross } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Heart,
    title: "Marriage",
    titleHindi: "विवाह संस्कार",
    description: "We perform Christian wedding ceremonies with proper counseling and preparation for couples, blessing their union in the presence of God.",
    features: [
      "Pre-marital counseling sessions",
      "Wedding ceremony planning",
      "Marriage registration assistance",
      "Couple's prayer and blessing",
      "Post-wedding guidance"
    ],
    duration: "3-6 months process",
    contact: "pastor@church.com",
    highlight: true,
    color: "from-pink-900/20 to-pink-800/10"
  },
  {
    icon: Church,
    title: "Baptism",
    titleHindi: "बपतिस्मा",
    description: "Baptism is an important step of faith. We offer water baptism for new believers as a public declaration of their faith in Jesus Christ.",
    features: [
      "Baptism preparation classes",
      "Water baptism ceremony",
      "Official certificate provided",
      "Welcome into church family",
      "Follow-up discipleship"
    ],
    duration: "4-week preparation",
    contact: "baptism@church.com",
    highlight: false,
    color: "from-blue-900/20 to-blue-800/10"
  },
  {
    icon: Users,
    title: "Help & Support",
    titleHindi: "सहायता एवं समर्थन",
    description: "We are here to help you in times of need - providing spiritual, emotional, and practical support through our dedicated ministry teams.",
    features: [
      "Professional counseling services",
      "Hospital and home visits",
      "Community support programs",
      "Emergency assistance",
      "Prayer support network"
    ],
    duration: "Available 24/7",
    contact: "support@church.com",
    highlight: true,
    color: "from-amber-900/20 to-amber-800/10"
  },
  {
    icon: BookOpen,
    title: "Dedication",
    titleHindi: "बाल समर्पण",
    description: "Child dedication ceremony where parents commit to raise their children in faith, seeking God's blessing and guidance for their family.",
    features: [
      "Baby dedication ceremony",
      "Parental commitment blessing",
      "Special prayer for child",
      "Certificate of dedication",
      "Family photo session"
    ],
    duration: "1-2 month notice",
    contact: "family@church.com",
    highlight: false,
    color: "from-purple-900/20 to-purple-800/10"
  },
  {
    icon: Cross,
    title: "Funeral",
    titleHindi: "अंतिम संस्कार",
    description: "Providing compassionate funeral services and spiritual support during times of loss, honoring the departed with dignity and faith.",
    features: [
      "Funeral service arrangement",
      "Grief counseling support",
      "Memorial service planning",
      "Prayer and comfort",
      "Aftercare support"
    ],
    duration: "Immediate assistance",
    contact: "care@church.com",
    highlight: true,
    color: "from-gray-900/20 to-gray-800/10"
  },
  {
    icon: Star,
    title: "Communion",
    titleHindi: "परमप्रसाद",
    description: "Holy Communion services where we remember the sacrifice of Jesus Christ and celebrate our unity as believers in His body.",
    features: [
      "Monthly communion service",
      "Special Easter communion",
      "Home communion for elderly",
      "Communion instruction",
      "Family communion guidance"
    ],
    duration: "Monthly services",
    contact: "communion@church.com",
    highlight: false,
    color: "from-red-900/20 to-red-800/10"
  },
];

const ServicesSection = () => {
  const [inView, setInView] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
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
      id="services" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Cross Pattern */}
        {/* <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 30H55L40 45L45 55L30 40L15 55L20 45L5 30H25L30 5Z' fill='%23f59e0b' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }} 
          />
        </div> */}
        
        {/* Floating Elements */}
        {/* {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-amber-500/10 ${
              i % 2 === 0 ? 'text-7xl' : 'text-9xl'
            } animate-float-slow`}
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {i % 2 === 0 ? '✝' : '⛪'}
          </div>
        ))} */}
        
        {/* linear Orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-linear-to-br from-amber-600/5 to-amber-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-linear-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl" />
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
              Church Services & Ceremonies
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
            चर्च <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">सेवाएं</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Special services and ceremonies we offer to our community with love, care, and spiritual guidance
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 transition-all duration-1000 delay-300 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative"
              onMouseEnter={() => setActiveService(service.title)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute -inset-3 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                service.highlight 
                  ? 'bg-linear-to-r from-amber-600/20 to-amber-400/20' 
                  : 'bg-linear-to-r from-amber-500/10 to-amber-400/10'
              }`} />
              
              {/* Service Card */}
              <div className={`relative h-full backdrop-blur-md rounded-2xl overflow-hidden border transition-all duration-500 ${
                service.highlight
                  ? 'border-amber-600/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-500'
                  : 'border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 hover:border-amber-600/50'
              } hover:shadow-2xl hover:shadow-amber-900/20`}>
                
                {/* Top Color Strip */}
                <div className={`h-1.5 w-full bg-linear-to-r ${service.color}`} />
                
                <div className="p-6 md:p-8">
                  {/* Header with Icon and Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 ${
                      service.highlight
                        ? 'bg-linear-to-br from-amber-800/30 to-amber-700/20'
                        : 'bg-linear-to-br from-amber-900/30 to-amber-800/20'
                    }`}>
                      <div className={`absolute inset-0 rounded-2xl ${
                        service.highlight
                          ? 'bg-linear-to-br from-amber-600/40 to-transparent opacity-0 group-hover:opacity-100'
                          : 'bg-linear-to-br from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100'
                      } transition-opacity duration-500`} />
                      <service.icon className="w-7 h-7 text-amber-400 relative z-10" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-serif font-bold text-xl md:text-2xl text-white mb-1">
                            {service.title}
                          </h3>
                          <p className="text-amber-300 font-medium">{service.titleHindi}</p>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-900/20 to-amber-800/10 border border-amber-800/30 rounded-lg px-3 py-1.5">
                          <Calendar className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-100 text-sm">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Contact Information */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-800/20 mb-6">
                    <Mail className="w-5 h-5 text-amber-400" />
                    <a 
                      href={`mailto:${service.contact}`}
                      className="text-amber-100 text-sm hover:text-amber-300 transition-colors"
                    >
                      {service.contact}
                    </a>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-3 rounded-xl bg-linear-to-r from-amber-600 to-amber-700 text-white font-medium text-sm transition-all duration-300 hover:scale-105 group/btn">
                      <span className="flex items-center justify-center gap-2">
                        Schedule Service
                        <Calendar className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    
                    <button className="flex-1 py-3 rounded-xl border border-amber-500/50 text-amber-100 font-medium text-sm transition-all duration-300 hover:border-amber-400 hover:text-white hover:bg-white/5 group/details">
                      <span className="flex items-center justify-center gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4 transform group-hover/details:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Active Service Indicator */}
                {activeService === service.title && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-500 via-amber-400 to-amber-300 animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/10 to-amber-900/20 rounded-3xl blur-xl" />
            
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Process Info */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
                    How to <span className="text-amber-300">Schedule</span> a Service
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { step: "01", title: "Contact Ministry Office", description: "Reach out via phone, email, or in-person visit" },
                      { step: "02", title: "Initial Consultation", description: "Meet with our ministry coordinator for details" },
                      { step: "03", title: "Required Documentation", description: "Submit necessary documents and information" },
                      { step: "04", title: "Service Planning", description: "Work with our team to plan the ceremony" },
                      { step: "05", title: "Final Confirmation", description: "Review and confirm all arrangements" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-linear-to-r from-amber-900/5 to-amber-800/5 border border-amber-800/20">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-800/30 to-amber-700/20 flex items-center justify-center shrink-0">
                          <span className="text-amber-300 font-bold">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Contact CTA */}
                <div className="bg-linear-to-b from-amber-900/20 to-amber-800/10 rounded-2xl p-6 border border-amber-800/30">
                  <h4 className="font-serif font-bold text-xl text-white mb-4">
                    Need Help?
                  </h4>
                  <p className="text-gray-300 mb-6 text-sm">
                    Our ministry office is here to assist you with any questions about church services.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <a href="tel:+1234567890" className="text-amber-100 hover:text-amber-300">
                          (123) 456-7890
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a href="mailto:services@church.com" className="text-amber-100 hover:text-amber-300">
                          services@church.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium">Office Hours</p>
                        <p className="text-amber-100 text-sm">Mon-Fri: 9AM-5PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 rounded-xl bg-linear-to-r from-amber-600 to-amber-700 text-white font-medium text-sm transition-all duration-300 hover:scale-105">
                    Contact Ministry Office
                  </button>
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
          <div className="relative inline-block max-w-3xl">
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/10 via-transparent to-amber-900/10 rounded-2xl blur-xl" />
            <div className="relative bg-linear-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-md border border-amber-900/30 rounded-2xl p-8">
              <p className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                "हमारी सेवा मसीह की ओर से है, जो परमेश्वर की ओर से मनुष्यों के लिए सुलह की सेवा है।"
              </p>
              <p className="text-amber-300 font-medium">2 कुरिन्थियों 5:18</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;