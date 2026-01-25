import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Building, Users, Calendar, MessageSquare, Globe } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactMethod: "email"
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", contactMethod: "email" });
    }, 3000);
  };

  const contactMethods = [
    { value: "email", label: "Email", icon: Mail, color: "from-blue-600/20 to-blue-500/10" },
    { value: "phone", label: "Phone Call", icon: Phone, color: "from-green-600/20 to-green-500/10" },
    { value: "visit", label: "In-Person Visit", icon: Building, color: "from-amber-600/20 to-amber-500/10" },
  ];

  const departments = [
    { name: "General Inquiries", email: "info@smurnabhawan.org", phone: "+91 98765 43210", icon: MessageSquare },
    { name: "Pastoral Care", email: "pastor@smurnabhawan.org", phone: "+91 11 2345 6789", icon: Users },
    { name: "Events & Programs", email: "events@smurnabhawan.org", phone: "+91 98765 43211", icon: Calendar },
    { name: "Ministry Support", email: "ministry@smurnabhawan.org", phone: "+91 11 2345 6790", icon: Globe },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-linear-to-b from-black via-gray-950 to-black overflow-hidden">
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
        
        {/* Floating Icons */}
        {/* {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-amber-500/10 ${i % 2 === 0 ? 'text-8xl' : 'text-6xl'} animate-float-slow`}
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            {i % 2 === 0 ? '✉️' : '📱'}
          </div>
        ))} */}
        
        {/* linear Orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-linear-to-br from-amber-600/10 to-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-linear-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Get in Touch With Us
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">संपर्क</span> करें
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We're here to help and connect with you. Reach out anytime - we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                  <Building className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Contact Information
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-900/20 to-blue-800/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Church Address</h4>
                    <p className="text-gray-300">
                      123, Church Road, Near City Center
                      <br />
                      New Delhi - 110001, India
                    </p>
                    <button className="mt-2 text-amber-300 text-sm font-medium hover:text-amber-200 transition-colors">
                      Get Directions →
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-green-900/20 to-green-800/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone Numbers</h4>
                    <p className="text-gray-300">
                      <a href="tel:+919876543210" className="hover:text-amber-300 transition-colors">
                        +91 98765 43210 (24/7 Helpline)
                      </a>
                      <br />
                      <a href="tel:+911123456789" className="hover:text-amber-300 transition-colors">
                        +91 11 2345 6789 (Office)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-red-900/20 to-red-800/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email Addresses</h4>
                    <p className="text-gray-300">
                      <a href="mailto:info@smurnabhawan.org" className="hover:text-amber-300 transition-colors">
                        info@smurnabhawan.org
                      </a>
                      <br />
                      <a href="mailto:pastor@smurnabhawan.org" className="hover:text-amber-300 transition-colors">
                        pastor@smurnabhawan.org
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-900/20 to-purple-800/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Office Hours</h4>
                    <p className="text-gray-300">
                      Monday - Saturday: 9:00 AM - 6:00 PM
                      <br />
                      Sunday: Church Services Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 p-6 md:p-8">
              <h3 className="text-xl font-serif font-bold text-white mb-6">Department Contacts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <div key={dept.name} className="p-4 rounded-xl bg-linear-to-r from-amber-900/5 to-amber-800/5 border border-amber-800/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                        <dept.icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <h4 className="font-bold text-white text-sm">{dept.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <a href={`mailto:${dept.email}`} className="block text-gray-300 text-sm hover:text-amber-300 transition-colors truncate">
                        {dept.email}
                      </a>
                      <a href={`tel:${dept.phone}`} className="block text-gray-300 text-sm hover:text-amber-300 transition-colors">
                        {dept.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="relative backdrop-blur-md rounded-2xl overflow-hidden border border-amber-900/30">
              <div className="h-48 bg-linear-to-br from-gray-900/40 to-gray-900/20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-amber-400" />
                </div>
                <p className="text-white font-medium mb-2">Our Location</p>
                <p className="text-gray-400 text-sm">New Delhi, India</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <button className="px-4 py-2 bg-linear-to-r from-amber-600 to-amber-700 text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform">
                  Open in Maps
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-900/30 to-green-800/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <div className="inline-flex items-center gap-2 text-green-300 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Confirmation email sent
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">
                        Send us a Message
                      </h3>
                      <p className="text-gray-400 text-sm">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-3">
                        {contactMethods.map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, contactMethod: method.value })}
                            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                              formData.contactMethod === method.value
                                ? `bg-linear-to-br ${method.color} border-amber-500`
                                : 'bg-gray-900/50 border-amber-900/30 hover:border-amber-500'
                            }`}
                          >
                            <method.icon className={`w-4 h-4 ${
                              formData.contactMethod === method.value ? 'text-amber-400' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.contactMethod === method.value ? 'text-white' : 'text-gray-300'
                            }`}>
                              {method.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                        placeholder="Please share your message, prayer request, or inquiry here..."
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-800/20">
                      <div className="w-5 h-5 rounded border border-amber-500/50 bg-gray-900/50 mt-0.5" />
                      <p className="text-gray-300 text-sm">
                        By submitting this form, you agree to our privacy policy and consent to being contacted by our team.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full group relative py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Social Media/Connect */}
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 p-6 md:p-8">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Connect With Us</h3>
              <p className="text-gray-300 mb-6">Follow us on social media for updates and inspiration</p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Facebook", color: "from-blue-600/20 to-blue-500/10", icon: "f" },
                  { name: "YouTube", color: "from-red-600/20 to-red-500/10", icon: "▶" },
                  { name: "Instagram", color: "from-pink-600/20 to-pink-500/10", icon: "📸" },
                ].map((social) => (
                  <button
                    key={social.name}
                    className={`aspect-square rounded-xl bg-linear-to-br ${social.color} border border-amber-900/30 flex flex-col items-center justify-center hover:scale-105 transition-transform`}
                  >
                    <span className="text-white text-2xl mb-2">{social.icon}</span>
                    <span className="text-gray-300 text-xs">{social.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;