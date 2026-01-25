import heroImage from "@/assets/hero-church.jpg";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-gray-950 to-black"
    >
      {/* Background Image with linear Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Smurna Bhawan Church Interior"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-linear-to-b from-amber-950/10 via-transparent to-amber-950/20" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Crosses */}
        {/* <div className="absolute top-20 left-10 opacity-5 animate-float-slow">
          <div className="text-8xl">✝</div>
        </div>
        <div className="absolute bottom-40 right-20 opacity-5 animate-float-slower">
          <div className="text-6xl">✝</div>
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-5 animate-float">
          <div className="text-7xl">✝</div>
        </div> */}

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <div className="absolute inset-0 bg-linear-to-r from-amber-600/5 to-amber-400/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64">
          <div className="absolute inset-0 bg-linear-to-br from-amber-500/3 to-amber-300/3 rounded-full blur-3xl animate-pulse-slower" />
        </div>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-amber-300/40 rounded-full ${
              i % 3 === 0 ? 'animate-float-slow' : i % 3 === 1 ? 'animate-float' : 'animate-float-slower'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40">
        <div className="space-y-6 md:space-y-8">
          {/* Welcome Text */}
          <div
            className={`transform transition-all duration-1000 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-flex items-center gap-3 text-amber-300/80 text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase mb-4">
              <div className="w-8 h-px bg-linear-to-r from-transparent to-amber-300/50" />
              Welcome to
              <div className="w-8 h-px bg-linear-to-l from-transparent to-amber-300/50" />
            </div>
          </div>

          {/* Main Title */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent bg-size-200 animate-linear-x">
               SMURNA BHAWAN
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-gray-300 text-xl sm:text-2xl md:text-3xl font-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Church & Prayer Center
            </p>
          </div>

          {/* Scripture Verse */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/5 to-amber-900/20 rounded-2xl blur-xl" />
              <div className="relative bg-linear-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-lg border border-amber-900/30 rounded-xl p-6 md:p-8 shadow-2xl shadow-black/50">
                <p className="text-amber-100 text-lg sm:text-xl md:text-2xl font-serif italic mb-4 leading-relaxed">
                  "जहाँ परमेश्वर का प्रेम और आशीष है"
                </p>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl font-medium">
                  Where God's Love and Blessings Overflow
                </p>
                <div className="absolute top-4 left-4 text-amber-500/20 text-2xl">"</div>
                <div className="absolute bottom-4 right-4 text-amber-500/20 text-2xl rotate-180">"</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-8 transform transition-all duration-1000 delay-900 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <a
              href="#about"
              className="group relative px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-2xl shadow-amber-500/20 overflow-hidden transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105"
            >
              <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Learn More About Us
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href="#services"
              className="group px-8 py-4 border-2 border-amber-500/50 text-amber-100 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:text-white hover:bg-white/5"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Service Times
              </span>
            </a>
          </div>
        </div>

      
      </div>

    
    </section>
  );
};

export default HeroSection;