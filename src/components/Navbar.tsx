import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Church, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "about" },
  { name: "Leadership", href: "leadership" },
  { 
    name: "Ministries", 
    href: "ministries",
    // submenu: [
    //   { name: "Youth Ministry", href: "#youth" },
    //   { name: "Children's Church", href: "#children" },
    //   { name: "Women's Fellowship", href: "#women" },
    //   { name: "Men's Group", href: "#men" },
    //   { name: "Outreach", href: "#outreach" }
    // ]
  },
   { name: "Matrimony", href: "matrimony" },
  { 
    name: "Gallery",
     href: "images",
      submenu: [
      { name: "Videos", href: "videos" },
      { name: "Images", href: "images" },
    ]
     },
  { name: "Events", href: "events" },

  { name: "Contact", href: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-linear-to-r from-amber-900/90 to-amber-950/90 text-amber-100 text-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Phone size={14} />
                <span>(123) 456-7890</span>
              </a>
              <a href="mailto:info@smurnabhawan.com" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Mail size={14} />
                <span>info@smurnabhawan.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span>Sunday Service: 10:00 AM</span>
              <div className="h-4 w-px bg-amber-600/50"></div>
              <Church size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`
         fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-2' 
          : 'bg-linear-to-b from-gray-900 to-gray-900/95 backdrop-blur-sm py-3'
        }
      `}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-amber-600 to-amber-400 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <Church size={24} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">
                  Smurna Bhawan
                </span>
                <span className="text-xs text-amber-300/80 font-medium tracking-wider">
                  CHURCH & PRAYER CENTER
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-amber-400 transition-all duration-200 hover:bg-white/5 rounded-lg group"
                  >
                    {link.name}
                    {link.submenu && (
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    )}
                  </a>
                  
                  {/* Dropdown Menu */}
                  {link.submenu && (
                    <div className={`
                      absolute left-0 top-full pt-2 min-w-55
                      transition-all duration-300 transform origin-top
                      ${activeDropdown === link.name 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }
                    `}>
                      <div className="bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 border border-gray-700/50 overflow-hidden">
                        <div className="p-2">
                          {link.submenu.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-center px-4 py-3 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-all duration-200 group/subitem"
                            >
                              <span>{item.name}</span>
                              <div className="ml-auto w-2 h-2 rounded-full bg-amber-500/20 group-hover/subitem:bg-amber-500/40 transition-colors"></div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Prayer Request Button */}
              <a 
                href="prayer-request" 
                className="ml-4 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">Prayer Request</span>
                <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
               <a 
                href="admin" 
                className="ml-4 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">Admin</span>
                <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              {isOpen ? (
                <X size={28} className="text-amber-400" />
              ) : (
                <Menu size={28} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          lg:hidden fixed inset-x-0 bg-linear-to-b from-gray-900 to-gray-950 backdrop-blur-xl
          border-t border-gray-800/50 shadow-2xl shadow-black/50
          transition-all duration-500 ease-in-out transform origin-top
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }
        `}
        >
          <div className=" container mx-auto px-4 py-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => !link.submenu && setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-4 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all duration-200 group"
                  >
                    <span>{link.name}</span>
                    {link.submenu && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(link.name);
                        }}
                        className="p-1"
                      >
                        <ChevronDown size={20} className={`transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </a>
                  
                  {/* Mobile Submenu */}
                  {link.submenu && activeDropdown === link.name && (
                    <div className="ml-4 pl-4 border-l-2 border-amber-600/30 space-y-1 mb-2">
                      {link.submenu.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-gray-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Prayer Request Button */}
              <a
                href="#prayer-request"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-medium rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Prayer Request
              </a>
               <a
                href="admin"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-medium rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Admin
              </a>
              
              {/* Mobile Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-800/50">
                <div className="space-y-4">
                  <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors">
                    <Phone size={18} />
                    <span>(123) 456-7890</span>
                  </a>
                  <a href="mailto:info@smurnabhawan.com" className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors">
                    <Mail size={18} />
                    <span>info@smurnabhawan.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Church size={18} />
                    <span>Sunday Service: 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;