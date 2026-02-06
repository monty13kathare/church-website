// sections/MarriageSection.tsx
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Shield,
  Mail,
  Phone,

  Church,

  Star,
  Target,
  X,
  Search,
  
  Share2
} from "lucide-react";
import { DEFAULT_FILTERS, type Biodata } from "@/types/marriage";
import { biodataSamples } from "@/data/biodata-samples";
import BiodataCard from "@/components/cards/BiodataCard";
import BiodataFilters from "@/components/BiodataFilters";

const MarriageSection = () => {
  const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | 'All'>('Male');
  const [selectedBiodata, setSelectedBiodata] = useState<Biodata | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [shortlisted, setShortlisted] = useState<Set<number>>(new Set());

  // Filter biodatas
  const filteredBiodatas = useMemo(() => {
    let filtered = biodataSamples.filter(biodata => 
      biodata.gender === selectedGender && biodata.isActive
    );

    // Apply filters
    if (filters.gender !== 'All') {
      filtered = filtered.filter(b => b.gender === filters.gender);
    }

    if (filters.ageRange) {
      filtered = filtered.filter(b => 
        b.age >= filters.ageRange[0] && b.age <= filters.ageRange[1]
      );
    }

    if (filters.heightRange) {
      filtered = filtered.filter(b => 
        b.height >= filters.heightRange[0] && b.height <= filters.heightRange[1]
      );
    }

    if (filters.education.length > 0) {
      filtered = filtered.filter(b => filters.education.includes(b.education));
    }

    if (filters.profession.length > 0) {
      filtered = filtered.filter(b => filters.profession.includes(b.profession));
    }

    if (filters.location.length > 0) {
      filtered = filtered.filter(b => 
        filters.location.some(loc => 
          b.currentCity.toLowerCase().includes(loc.toLowerCase()) ||
          b.nativePlace.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    if (filters.maritalStatus.length > 0) {
      filtered = filtered.filter(b => filters.maritalStatus.includes(b.maritalStatus));
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b => 
        b.fullName.toLowerCase().includes(query) ||
        b.profession.toLowerCase().includes(query) ||
        b.education.toLowerCase().includes(query) ||
        b.currentCity.toLowerCase().includes(query) ||
        b.aboutMe.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedGender, filters, searchQuery]);

  const handleShortlist = (id: number) => {
    const newShortlisted = new Set(shortlisted);
    if (newShortlisted.has(id)) {
      newShortlisted.delete(id);
    } else {
      newShortlisted.add(id);
    }
    setShortlisted(newShortlisted);
  };

  const stats = useMemo(() => {
    const total = biodataSamples.length;
    const male = biodataSamples.filter(b => b.gender === 'Male').length;
    const female = biodataSamples.filter(b => b.gender === 'Female').length;
    const verified = biodataSamples.filter(b => b.isVerified).length;
    
    return { total, male, female, verified };
  }, []);

  return (
    <section id="matrimony" className="relative py-20 md:py-32 bg-linear-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-br from-amber-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-linear-to-tr from-rose-500/5 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">
              Christian Matrimony
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-amber-500/50" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-linear-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              शादी
            </span> संबंध सेवा
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Find your life partner through our trusted Christian matrimony service. 
            Verified profiles from faithful families.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Profiles</div>
          </div>
          <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.male}</div>
            <div className="text-gray-400 text-sm">Grooms</div>
          </div>
          <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-pink-900/30 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.female}</div>
            <div className="text-gray-400 text-sm">Brides</div>
          </div>
          <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-emerald-900/30 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.verified}</div>
            <div className="text-gray-400 text-sm">Verified</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-linear-to-br from-gray-900/30 to-gray-900/10  backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6 md:p-8">
          {/* Tabs */}
          <Tabs defaultValue="Female" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8 bg-gray-900/50 ">
              {/* <TabsTrigger 
                value="All" 
                className="text-gray-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700"
                onClick={() => setSelectedGender('All')}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  All ({stats.total})
                </span>
              </TabsTrigger> */}
              <TabsTrigger 
                value="Male" 
                className="text-gray-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700"
                onClick={() => setSelectedGender('Male')}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Grooms ({stats.male})
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="Female"
                className="text-gray-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-pink-600 data-[state=active]:to-pink-700"
                onClick={() => setSelectedGender('Female')}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Brides ({stats.female})
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search by name, profession, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-gray-500 hover:text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <BiodataFilters onFilterChange={setFilters} />

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6 mt-8">
              <div className="text-white">
                Showing <span className="font-bold">{filteredBiodatas.length}</span> profiles
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  // Download results functionality
                }}
              >
                <Heart className={`w-4 h-4 ${shortlisted.size > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                Shortlisted ({shortlisted.size})
              </Button>
            </div>

            {/* Biodata Grid */}
            <TabsContent value={selectedGender} className="mt-0">
              {filteredBiodatas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBiodatas.map((biodata) => (
                    <BiodataCard
                      key={biodata.id}
                      biodata={biodata}
                      onViewDetails={setSelectedBiodata}
                      onContact={(b) => {
                        // Contact functionality
                        alert(`Contact ${b.contactPerson} at ${b.contactNumber}`);
                      }}
                      onShortlist={handleShortlist}
                      isShortlisted={shortlisted.has(biodata.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-900/50 to-gray-900/20 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">No profiles found</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSearchQuery("");
                      setFilters(DEFAULT_FILTERS);
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-4 bg-linear-to-r from-amber-900/20 via-amber-900/10 to-amber-900/20 rounded-3xl blur-xl" />
            <div className="relative backdrop-blur-md rounded-2xl border border-amber-900/30 bg-linear-to-br from-gray-900/40 to-gray-900/20 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Register Your Profile
              </h3>
              <p className="text-gray-300 text-center max-w-lg mx-auto mb-8">
                Join our trusted Christian matrimony service. Get verified profile and find your perfect match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gap-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                  <Star className="w-4 h-4" />
                  Register Free
                </Button>
                <Button variant="outline" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Learn About Verification
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biodata Detail Modal */}
      {/* Biodata Detail Modal */}
{selectedBiodata && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/95 transition-all duration-300">
    <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50">
      {/* Close Button */}
      <button
        onClick={() => setSelectedBiodata(null)}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:bg-gray-800 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Scrollable Content */}
      <div className="max-h-200 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-linear-to-b from-gray-950 to-gray-950/95 backdrop-blur-sm p-6 pb-4 border-b border-gray-800">
          <div className="flex items-start justify-between">
            <div className="pr-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {selectedBiodata.fullName}
              </h2>
              <p className="text-gray-400 text-sm">{selectedBiodata.registrationNo}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {selectedBiodata.isVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm border border-emerald-500/30">
                  <Shield className="w-3 h-3" />
                  Verified
                </span>
              )}
              <button
                onClick={() => handleShortlist(selectedBiodata.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800 transition-colors"
              >
                <Heart className={`w-4 h-4 ${shortlisted.has(selectedBiodata.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="text-sm">
                  {shortlisted.has(selectedBiodata.id) ? 'Shortlisted' : 'Shortlist'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Photo & Contact */}
            <div className="space-y-6">
              {/* Photo */}
              <div className="relative">
                <img
                  src={selectedBiodata.photoUrl}
                  alt={selectedBiodata.fullName}
                  className="w-full h-64 lg:h-80 object-cover rounded-xl border border-gray-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x320/1a1a2e/cccccc?text=${encodeURIComponent(selectedBiodata.fullName.charAt(0))}`;
                  }}
                />
                <div className="absolute -bottom-3 left-4">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    selectedBiodata.age <= 25 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    selectedBiodata.age <= 30 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    selectedBiodata.age <= 35 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {selectedBiodata.age} Years
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
                <h4 className="text-white font-semibold mb-4 text-lg">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="break-all">{selectedBiodata.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{selectedBiodata.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Contact: {selectedBiodata.contactPerson}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-1">Height</div>
                  <div className="text-white font-semibold text-lg">
                    {Math.floor(selectedBiodata.height / 30.48)}'
                    {Math.round((selectedBiodata.height % 30.48) / 2.54)}"
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-1">Education</div>
                  <div className="text-white font-semibold text-lg">{selectedBiodata.education}</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-1">Profession</div>
                  <div className="text-white font-semibold text-lg">{selectedBiodata.profession}</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-1">Income</div>
                  <div className="text-white font-semibold text-lg">{selectedBiodata.monthlyIncome || 'Not specified'}</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-1">Location</div>
                  <div className="text-white font-semibold text-lg">{selectedBiodata.currentCity}</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-1">Diet</div>
                  <div className="text-white font-semibold text-lg">{selectedBiodata.diet}</div>
                </div>
              </div>

              {/* About Me */}
              <div className="bg-gray-900/30 rounded-xl p-5 border border-gray-800">
                <h4 className="text-white font-semibold mb-3 text-lg">About Me</h4>
                <p className="text-gray-300 leading-relaxed">{selectedBiodata.aboutMe}</p>
              </div>

              {/* Family Details */}
              <div className="bg-gray-900/30 rounded-xl p-5 border border-gray-800">
                <h4 className="text-white font-semibold mb-4 text-lg">Family Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Father</div>
                    <div className="text-white font-medium">{selectedBiodata.family.fatherName}</div>
                    {selectedBiodata.family.fatherOccupation && (
                      <div className="text-gray-400 text-xs mt-1">
                        {selectedBiodata.family.fatherOccupation}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Mother</div>
                    <div className="text-white font-medium">{selectedBiodata.family.motherName}</div>
                    {selectedBiodata.family.motherOccupation && (
                      <div className="text-gray-400 text-xs mt-1">
                        {selectedBiodata.family.motherOccupation}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Siblings</div>
                    <div className="text-white font-medium">{selectedBiodata.family.siblings}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Family Type</div>
                    <div className="text-white font-medium">{selectedBiodata.family.familyType}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spiritual Life */}
          <div className="bg-linear-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-800/30">
            <h4 className="text-white font-semibold mb-4 text-lg flex items-center gap-3">
              <Church className="w-5 h-5 text-blue-400" />
              Spiritual Life
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <div className="text-gray-300 mb-2">Church & Denomination</div>
                <div className="text-white font-medium text-lg">
                  {selectedBiodata.churchName} • {selectedBiodata.denomination}
                </div>
              </div>
              <div>
                <div className="text-gray-300 mb-2">Service in Church</div>
                <div className="flex flex-wrap gap-2">
                  {selectedBiodata.serviceInChurch.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white text-sm border border-white/20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{selectedBiodata.spiritualLife}</p>
          </div>

          {/* Partner Preference */}
          <div className="bg-linear-to-r from-amber-900/20 to-rose-900/20 rounded-xl p-6 border border-amber-800/30">
            <h4 className="text-white font-semibold mb-4 text-lg flex items-center gap-3">
              <Target className="w-5 h-5 text-amber-400" />
              Partner Preference
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Age</div>
                <div className="text-white font-medium">
                  {selectedBiodata.partnerPreference.ageRange[0]} - {selectedBiodata.partnerPreference.ageRange[1]} yrs
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Height</div>
                <div className="text-white font-medium">
                  {selectedBiodata.partnerPreference.heightRange[0]} - {selectedBiodata.partnerPreference.heightRange[1]} cm
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Education</div>
                <div className="text-white font-medium">
                  {selectedBiodata.partnerPreference.education.join(', ')}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Profession</div>
                <div className="text-white font-medium">
                  {selectedBiodata.partnerPreference.profession.join(', ')}
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-300 mb-2">Religious Commitment</div>
              <p className="text-white leading-relaxed">{selectedBiodata.partnerPreference.religiousCommitment}</p>
            </div>
          </div>

          {/* Hobbies & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/30 rounded-xl p-5 border border-gray-800">
              <h4 className="text-white font-semibold mb-3 text-lg">Hobbies & Interests</h4>
              <div className="flex flex-wrap gap-2">
                {selectedBiodata.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 text-sm border border-gray-700"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/30 rounded-xl p-5 border border-gray-800">
              <h4 className="text-white font-semibold mb-3 text-lg">Languages Known</h4>
              <div className="flex flex-wrap gap-2">
                {selectedBiodata.languages.map((language) => (
                  <span
                    key={language}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-900/20 text-amber-300 text-sm border border-amber-500/30"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-linear-to-t from-gray-950 to-transparent pt-6 pb-4 border-t border-gray-800 mt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  // Send interest functionality
                  window.location.href = `mailto:${selectedBiodata.contactEmail}?subject=Matrimonial Interest - ${selectedBiodata.fullName}`;
                }}
                className="flex-1 py-3 px-6 rounded-xl bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Send Interest
              </button>
              <button
                onClick={() => {
                  // Contact family functionality
                  window.location.href = `tel:${selectedBiodata.contactNumber}`;
                }}
                className="flex-1 py-3 px-6 rounded-xl border border-amber-500/30 text-amber-100 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Contact Family
              </button>
              <button
                onClick={() => {
                  // Share functionality
                  navigator.clipboard.writeText(window.location.href);
                  alert("Profile link copied to clipboard!");
                }}
                className="py-3 px-6 rounded-xl border border-gray-700 text-gray-300 bg-gray-900/50 hover:bg-gray-800 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default MarriageSection;