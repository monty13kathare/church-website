import { useState } from "react";
import { Send, Heart, CheckCircle, Star, Cross, Users, Clock, Shield, BookOpen } from "lucide-react";

const PrayerRequestSection = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        prayerType: "personal",
        request: "",
        anonymous: false,
        urgency: "normal",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send the data to a backend
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({
            name: "",
            email: "",
            phone: "",
            prayerType: "personal",
            request: "",
            anonymous: false,
            urgency: "normal",
        });
    };

    const prayerCategories = [
        { value: "personal", label: "Personal Prayer", icon: Heart, color: "from-blue-600/20 to-blue-500/10" },
        { value: "healing", label: "Healing & Health", icon: Heart, color: "from-red-600/20 to-red-500/10" },
        { value: "family", label: "Family & Relationships", icon: Users, color: "from-purple-600/20 to-purple-500/10" },
        { value: "financial", label: "Financial Blessing", icon: Star, color: "from-amber-600/20 to-amber-500/10" },
        { value: "guidance", label: "Guidance & Direction", icon: BookOpen, color: "from-green-600/20 to-green-500/10" },
        { value: "protection", label: "Protection & Safety", icon: Shield, color: "from-gray-600/20 to-gray-500/10" },
        { value: "thanksgiving", label: "Thanksgiving", icon: Heart, color: "from-yellow-600/20 to-yellow-500/10" },
        { value: "spiritual", label: "Spiritual Growth", icon: Cross, color: "from-indigo-600/20 to-indigo-500/10" },
    ];

    const urgencyLevels = [
        { value: "normal", label: "Normal", color: "from-amber-900/20 to-amber-800/10" },
        { value: "urgent", label: "Urgent", color: "from-red-900/30 to-red-800/20" },
        { value: "critical", label: "Critical", color: "from-red-900/40 to-red-800/30" },
    ];

    return (
        <section id="prayer-request" className="relative py-20 md:py-32 bg-linear-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Prayer Pattern */}
                {/* <div className="absolute inset-0 opacity-10">
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

                {/* Floating Crosses */}
                {/* {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute text-amber-500/10 ${i % 2 === 0 ? 'text-8xl' : 'text-6xl'} animate-float-slow`}
                        style={{
                            left: `${10 + i * 20}%`,
                            top: `${15 + i * 15}%`,
                            animationDelay: `${i * 2}s`,
                        }}
                    >
                        ✝
                    </div>
                ))} */}

                {/* linear Orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-amber-600/10 to-amber-400/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-linear-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-20">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
                            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
                                Prayer Ministry
                            </span>
                            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white mb-6">
                            <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">प्रार्थना</span> अनुरोध
                        </h2>

                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Share your prayer request with our dedicated prayer team. We believe in the power of prayer and will intercede for you.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
                        {[
                            { icon: Heart, value: "2,500+", label: "Prayers Answered", color: "from-amber-900/30 to-amber-800/20" },
                            { icon: Users, value: "24/7", label: "Prayer Team", color: "from-blue-900/30 to-blue-800/20" },
                            { icon: Heart, value: "100+", label: "Monthly Requests", color: "from-red-900/30 to-red-800/20" },
                            { icon: Clock, value: "48h", label: "Response Time", color: "from-green-900/30 to-green-800/20" },
                        ].map((stat, index) => (
                            <div key={index} className="backdrop-blur-md rounded-2xl p-4 border border-amber-900/30 bg-linear-to-b from-gray-900/40 to-gray-900/20 text-center">
                                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                                    <stat.icon className="w-6 h-6 text-amber-400" />
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-gray-300 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Form Column */}
                        <div className="lg:col-span-2">
                            {submitted ? (
                                <div className="relative backdrop-blur-md rounded-2xl border border-green-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-8 md:p-12 text-center animate-fade-in">
                                    {/* Success Animation */}
                                    <div className="absolute top-8 right-8 w-4 h-4 bg-green-500 rounded-full animate-ping" />

                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-linear-to-r from-green-900/20 via-transparent to-green-900/20 rounded-2xl blur-xl" />
                                        <div className="relative w-20 h-20 bg-linear-to-br from-green-900/40 to-green-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-400" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                                        Prayer Request Received!
                                    </h3>
                                    <p className="text-gray-300 mb-6">
                                        Thank you for sharing your prayer request. Our prayer team has been notified and will be interceding for you.
                                    </p>
                                    <p className="text-green-300 text-sm font-medium">
                                        You will receive a confirmation email shortly.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-6 md:p-8 space-y-6"
                                >
                                    {/* Form Header */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                                            <Heart className="w-6 h-6 text-amber-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-serif font-bold text-white">Prayer Request Form</h3>
                                            <p className="text-gray-400 text-sm">All fields marked with * are required</p>
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
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
                                                placeholder="Enter your name"
                                            />
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
                                                placeholder="(123) 456-7890"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                                Urgency Level
                                            </label>
                                            <select
                                                value={formData.urgency}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, urgency: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                            >
                                                {urgencyLevels.map((level) => (
                                                    <option key={level.value} value={level.value}>
                                                        {level.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Prayer Category */}
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-3">
                                            Prayer Category *
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {prayerCategories.map((category) => (
                                                <button
                                                    key={category.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, prayerType: category.value })}
                                                    className={`relative p-3 rounded-xl border transition-all duration-300 ${formData.prayerType === category.value
                                                            ? `bg-linear-to-br ${category.color} border-amber-500`
                                                            : 'bg-gray-900/50 border-amber-900/30 hover:border-amber-500'
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-center gap-2">
                                                        <category.icon className={`w-5 h-5 ${formData.prayerType === category.value ? 'text-amber-400' : 'text-gray-400'
                                                            }`} />
                                                        <span className={`text-xs font-medium ${formData.prayerType === category.value ? 'text-white' : 'text-gray-300'
                                                            }`}>
                                                            {category.label}
                                                        </span>
                                                    </div>
                                                    {formData.prayerType === category.value && (
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Prayer Request */}
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">
                                            Your Prayer Request *
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.request}
                                            onChange={(e) =>
                                                setFormData({ ...formData, request: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-amber-900/30 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                                            placeholder="Please share your prayer request in detail. Our prayer team will keep your request confidential and pray specifically for your needs..."
                                        />
                                    </div>

                                    {/* Options */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="anonymous"
                                                checked={formData.anonymous}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, anonymous: e.target.checked })
                                                }
                                                className="w-5 h-5 rounded border-amber-900/30 bg-gray-900/50 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 focus:ring-2 focus:ring-offset-transparent"
                                            />
                                            <label
                                                htmlFor="anonymous"
                                                className="text-gray-300 text-sm cursor-pointer"
                                            >
                                                Keep my request anonymous
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Shield className="w-4 h-4" />
                                            <span>All requests are kept confidential</span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full group relative py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            <Send className="w-5 h-5" />
                                            Submit Prayer Request
                                        </span>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Information Sidebar */}
                        <div className="space-y-6">
                            {/* Prayer Commitment */}
                            <div className="backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h4 className="font-serif font-bold text-lg text-white">Our Prayer Commitment</h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Every request is prayed for by our team",
                                        "Confidentiality guaranteed",
                                        "Weekly follow-up prayer",
                                        "Scripture-based prayers",
                                        "Intercessory prayer covering"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                            <span className="text-gray-300 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div className="backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-6 md:p-8">
                                <h4 className="font-serif font-bold text-lg text-white mb-4">Prayer Ministry Contact</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Users className="w-5 h-5 text-amber-400" />
                                        <div>
                                            <p className="text-sm font-medium">Prayer Team Leader</p>
                                            <p className="text-amber-100">Pastor Priya Sharma</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Clock className="w-5 h-5 text-amber-400" />
                                        <div>
                                            <p className="text-sm font-medium">Prayer Time</p>
                                            <p className="text-amber-100">Friday 6:30 PM</p>
                                        </div>
                                    </div>
                                    <a
                                        href="#contact"
                                        className="inline-block w-full py-3 text-center border border-amber-500/50 text-amber-100 rounded-lg font-medium hover:border-amber-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Contact Prayer Team
                                    </a>
                                </div>
                            </div>

                            {/* Scripture */}
                            <div className="backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-900/30 to-amber-800/20 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-lg text-white">Scripture Promise</h4>
                                        <p className="text-amber-300 text-sm">Philippians 4:6-7</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic text-sm leading-relaxed">
                                    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrayerRequestSection;