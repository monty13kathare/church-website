import { Church, Heart, Users, BookOpen, Target, Globe, Shield, Sparkles } from "lucide-react";
import crossImage from "@/assets/worship-team.jpeg";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Church,
    title: "Our Mission",
    description: "परमेश्वर के वचन का प्रचार करना और लोगों को मसीह की ओर लाना।",
    highlight: true,
    bgColor: "from-amber-900/20 to-amber-900/5",
    borderColor: "border-amber-600/30"
  },
  {
    icon: Heart,
    title: "Our Vision",
    description: "एक ऐसा समुदाय बनाना जहाँ हर कोई परमेश्वर के प्रेम का अनुभव करे।",
    highlight: false,
    bgColor: "from-gray-800/30 to-gray-900/10",
    borderColor: "border-amber-500/20"
  },
  {
    icon: Users,
    title: "Community",
    description: "हम एक परिवार हैं जो मिलकर आराधना, प्रार्थना और सेवा करते हैं।",
    highlight: false,
    bgColor: "from-gray-800/30 to-gray-900/10",
    borderColor: "border-amber-500/20"
  },
  {
    icon: BookOpen,
    title: "Teaching",
    description: "बाइबल आधारित शिक्षा जो जीवन को बदलती है और आत्मा को पोषित करती है।",
    highlight: false,
    bgColor: "from-gray-800/30 to-gray-900/10",
    borderColor: "border-amber-500/20"
  },
];

const AboutSection = () => {
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
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-linear-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        {/* <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-linear(to right, #f59e0b 1px, transparent 1px),
                              linear-linear(to bottom, #f59e0b 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div> */}

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-400/3 rounded-full blur-3xl" />

        {/* Cross Patterns */}
        {/* <div className="absolute top-20 right-20 text-amber-500/10 text-9xl">✝</div> */}
        {/* <div className="absolute bottom-20 left-20 text-amber-500/10 text-7xl">✝</div> */}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              About Our Church
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
            हमारे <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">बारे में</span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Smurna Bhawan Church - A Place of Faith, Hope & Divine Love
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-32">
          {/* Image Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                <div className="absolute inset-0 bg-linear-to-tr from-amber-900/20 via-transparent to-amber-900/20 z-10" />
                <img
                  src={crossImage}
                  alt="Cross with Divine Light"
                  className="w-full h-64 md:h-96 lg:h-120 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-60" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 md:-right-10 z-20">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-400/30 transition-colors" />
                  <div className="relative bg-linear-to-br from-amber-900/90 to-amber-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-amber-600/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl md:text-4xl font-bold font-serif text-white">25+</p>
                        <p className="text-amber-200/80 text-sm md:text-base">Years of Ministry</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-br from-amber-600/10 to-transparent rounded-full blur-xl" />
            </div>
          </div>

          {/* Text Content */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            <div className="inline-flex items-center gap-2 text-amber-400/80 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wider">OUR JOURNEY</span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Building Faith,
              <span className="block text-amber-300">Transforming Lives</span>
            </h3>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                Smurna Bhawan Church की स्थापना 1999 में हुई थी। हमारा उद्देश्य
                परमेश्वर के राज्य का विस्तार करना और लोगों को यीशु मसीह के प्रेम
                से परिचित कराना है।
              </p>

              <p className="text-gray-300 leading-relaxed text-lg">
                हम विश्वास करते हैं कि चर्च सिर्फ एक इमारत नहीं है, बल्कि यह
                परमेश्वर के लोगों का समुदाय है। यहाँ हर कोई स्वागत है - चाहे आप
                नए हों या लंबे समय से विश्वासी।
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Globe, text: "Global Impact" },
                { icon: Shield, text: "Spiritual Growth" },
                { icon: Users, text: "500+ Members" },
                { icon: Heart, text: "Community Service" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="#leadership"
                className="group relative px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Meet Our Team
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>

              <a
                href="#contact"
                className="group px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:text-white hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-all duration-1000 delay-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative"
            >
              {/* Hover Glow Effect */}
              <div className={`absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.highlight ? 'bg-linear-to-r from-amber-600/20 to-amber-400/20' : 'bg-linear-to-r from-amber-500/10 to-amber-400/10'
                }`} />

              <div className={`relative h-full backdrop-blur-md rounded-2xl p-6 md:p-8 border transition-all duration-500 ${feature.highlight
                  ? `bg-linear-to-b ${feature.bgColor} ${feature.borderColor} hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-900/30`
                  : `bg-linear-to-b ${feature.bgColor} ${feature.borderColor} hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-900/20`
                } hover:scale-105`}>
                {/* Icon Container */}
                <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${feature.highlight
                    ? 'bg-linear-to-br from-amber-600/20 to-amber-400/10'
                    : 'bg-linear-to-br from-amber-900/20 to-amber-800/10'
                  }`}>
                  <div className={`absolute inset-0 rounded-xl ${feature.highlight
                      ? 'bg-linear-to-br from-amber-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'
                      : 'bg-linear-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'
                    }`} />
                  <feature.icon className={`w-7 h-7 relative z-10 ${feature.highlight ? 'text-amber-400' : 'text-amber-300'
                    }`} />
                </div>

                {/* Title */}
                <h4 className={`font-serif font-bold text-xl mb-3 ${feature.highlight ? 'text-white' : 'text-gray-200'
                  }`}>
                  {feature.title}
                </h4>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${feature.highlight ? 'text-gray-300' : 'text-gray-400'
                  }`}>
                  {feature.description}
                </p>

                {/* Bottom Indicator */}
                <div className={`mt-6 pt-4 border-t ${feature.highlight
                    ? 'border-amber-600/30 group-hover:border-amber-500/50'
                    : 'border-amber-500/20 group-hover:border-amber-400/40'
                  } transition-colors`}>
                  <span className={`inline-flex items-center gap-2 text-sm font-medium ${feature.highlight ? 'text-amber-300' : 'text-amber-400/80'
                    }`}>
                    Learn More
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className={`mt-20 md:mt-32 text-center transition-all duration-1000 delay-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/10 via-transparent to-amber-900/10 rounded-2xl blur-xl" />
            <div className="relative bg-linear-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-md border border-amber-900/30 rounded-2xl p-8 md:p-12">
              <p className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                "सच्ची आराधना करने वाले पिता की आराधना आत्मा और सच्चाई से करेंगे,
                क्योंकि पिता ऐसे ही आराधना करने वालों को ढूंढ़ रहा है।"
              </p>
              <p className="text-amber-300 font-medium">यूहन्ना 4:23</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;