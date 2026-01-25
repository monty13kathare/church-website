// components/BiodataFilters.tsx
import { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Ruler,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  Heart,
  Globe,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Check,
  Star,
  Church,
  DollarSign,
  Eye
} from "lucide-react";
import { AGE_RANGE_OPTIONS, HEIGHT_RANGE_OPTIONS } from "@/types/marriage";

interface Filters {
  gender: 'Male' | 'Female' | 'All';
  ageRange: [number, number];
  heightRange: [number, number];
  education: string[];
  profession: string[];
  location: string[];
  maritalStatus: string[];
  denomination: string[];
  incomeRange: [number, number];
  isVerified: boolean;
  hasPhoto: boolean;
}

interface BiodataFiltersProps {
  onFilterChange: (filters: Filters) => void;
  showReset?: boolean;
  onReset?: () => void;
}

const BiodataFilters = ({ onReset }: BiodataFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    gender: 'All',
    ageRange: [22, 40],
    heightRange: [150, 190],
    education: [],
    profession: [],
    location: [],
    maritalStatus: [],
    denomination: [],
    incomeRange: [0, 500000],
    isVerified: false,
    hasPhoto: false
  });

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.gender !== 'All') count++;
    if (filters.ageRange[0] !== 22 || filters.ageRange[1] !== 40) count++;
    if (filters.heightRange[0] !== 150 || filters.heightRange[1] !== 190) count++;
    if (filters.education.length > 0) count++;
    if (filters.profession.length > 0) count++;
    if (filters.location.length > 0) count++;
    if (filters.maritalStatus.length > 0) count++;
    if (filters.denomination.length > 0) count++;
    if (filters.incomeRange[0] !== 0 || filters.incomeRange[1] !== 500000) count++;
    if (filters.isVerified) count++;
    if (filters.hasPhoto) count++;
    setActiveFilters(count);
  }, [filters]);

  // Debounced filter change handler
  // const debouncedFilterChange = useCallback(
  //   debounce((newFilters: Filters) => {
  //     onFilterChange(newFilters);
  //   }, 300),
  //   []
  // );

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    // debouncedFilterChange(newFilters);
  };

  const resetFilters = () => {
    // const reset = {
    //   gender: 'All',
    //   ageRange: [22, 40],
    //   heightRange: [150, 190],
    //   education: [],
    //   profession: [],
    //   location: [],
    //   maritalStatus: [],
    //   denomination: [],
    //   incomeRange: [0, 500000],
    //   isVerified: false,
    //   hasPhoto: false
    // };
    // setFilters(reset);
    // onFilterChange(reset);
    if (onReset) onReset();
  };

  const educationOptions = [
    'High School', 'Graduate', 'Post Graduate', 'Doctorate', 'MBA', 'Engineering',
    'Medical', 'CA', 'Law', 'Arts', 'Science', 'Commerce'
  ];

  const professionOptions = [
    'Student', 'Employed', 'Business', 'Professional', 'Ministry', 'Doctor',
    'Engineer', 'Teacher', 'Government', 'Private Sector', 'Self Employed', 'Freelancer'
  ];

  const locationOptions = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Goa'
  ];

  const maritalStatusOptions = ['Never Married', 'Divorced', 'Widowed'];

  const denominationOptions = [
    'Catholic', 'Protestant', 'Orthodox', 'Pentecostal', 'Evangelical',
    'Baptist', 'Methodist', 'Lutheran', 'Presbyterian', 'Other'
  ];

  const incomeOptions = [
    { label: 'Any', min: 0, max: 500000 },
    { label: 'Up to ₹3 LPA', min: 0, max: 300000 },
    { label: '₹3-6 LPA', min: 300000, max: 600000 },
    { label: '₹6-10 LPA', min: 600000, max: 1000000 },
    { label: '₹10+ LPA', min: 1000000, max: 5000000 }
  ];

  const FilterSection = ({
    title,
    icon: Icon,
    children
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-xl border border-gray-800/50 p-4 hover:border-amber-500/30 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800/50">
        <div className="p-2 rounded-lg bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700">
          <Icon className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-white font-medium text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Active Filters Badge */}
      {activeFilters > 0 && (
        <div className="flex items-center justify-between p-3 bg-linear-to-r from-amber-900/20 to-amber-900/10 rounded-lg border border-amber-900/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-linear-to-br from-amber-500 to-amber-600">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">
                {activeFilters} active filter{activeFilters !== 1 ? 's' : ''}
              </div>
              <div className="text-gray-400 text-xs">
                Refine your search to find perfect matches
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}

      {/* Quick Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gender Filter */}
        <FilterSection title="Looking For" icon={Users}>
          <Select
            value={filters.gender}
            onValueChange={(value: any) => handleFilterChange('gender', value)}
          >
            <SelectTrigger className="text-gray-300 bg-gray-900/50 border-gray-700 hover:border-amber-500/50 transition-colors">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-gray-300 ">
              <SelectItem value="All" className="hover:bg-gray-800 focus:bg-gray-800 ">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>All Profiles</span>
                </div>
              </SelectItem>
              <SelectItem value="Male" className="hover:bg-gray-800 focus:bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Grooms Only</span>
                </div>
              </SelectItem>
              <SelectItem value="Female" className="hover:bg-gray-800 focus:bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Brides Only</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>

        {/* Age Range */}
        <FilterSection title="Age Range" icon={Calendar}>
          <Select
            value={`${filters.ageRange[0]}-${filters.ageRange[1]}`}
            onValueChange={(value) => {
              const [min, max] = value.split("-").map(Number);
              handleFilterChange("ageRange", [min, max]);
            }}
          >
            <SelectTrigger className="bg-gray-900/50 border-gray-700 hover:border-amber-500/50">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {AGE_RANGE_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.label}
                  value={`${opt.value[0]}-${opt.value[1]}`}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>


        {/* Height Range */}
        <FilterSection title="Height Range" icon={Ruler}>
          <Select
            value={`${filters.heightRange[0]}-${filters.heightRange[1]}`}
            onValueChange={(value) => {
              const [min, max] = value.split("-").map(Number);
              handleFilterChange("heightRange", [min, max]);
            }}
          >
            <SelectTrigger className="bg-gray-900/50 border-gray-700 hover:border-amber-500/50">
              <SelectValue placeholder="Select height range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {HEIGHT_RANGE_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.label}
                  value={`${opt.value[0]}-${opt.value[1]}`}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>


        {/* Location */}
        <FilterSection title="Location" icon={MapPin}>
          <Select
            value={filters.location[0] || ""}
            onValueChange={(value) => {
              if (value === "any") {
                handleFilterChange('location', []);
              } else {
                handleFilterChange('location', [value]);
              }
            }}
          >
            <SelectTrigger className="bg-gray-900/50 border-gray-700 hover:border-amber-500/50 transition-colors">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 max-h-60">
              <SelectItem value="any" className="hover:bg-gray-800 focus:bg-gray-800">
                Any location
              </SelectItem>
              {locationOptions.map((loc) => (
                <SelectItem
                  key={loc}
                  value={loc}
                  className="hover:bg-gray-800 focus:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <span>{loc}</span>
                    <Badge variant="outline" className="ml-2 text-xs bg-gray-800">
                      12
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>
      </div>

      {/* Advanced Filters Toggle */}
      <Button
        variant="outline"
        className="w-full justify-between bg-gray-900/30 border-gray-700 hover:bg-gray-800 hover:border-amber-500/50 transition-all duration-300 group"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-linear-to-br from-gray-800 to-gray-900 group-hover:from-amber-900/30 group-hover:to-amber-900/10 transition-all duration-300">
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-amber-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-amber-400" />
            )}
          </div>
          <div className="text-left">
            <div className="text-white font-medium">Advanced Filters</div>
            <div className="text-xs text-gray-400">
              Education, Profession, Denomination & more
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-linear-to-r from-amber-500/20 to-amber-600/20 text-amber-300">
          {showAdvanced ? 'Hide' : 'Show'}
        </Badge>
      </Button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 p-4 bg-linear-to-br from-gray-900/30 to-gray-900/10 backdrop-blur-sm rounded-xl border border-amber-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Education */}
            <FilterSection title="Education" icon={GraduationCap}>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {educationOptions.map((edu) => (
                  <label key={edu} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${filters.education.includes(edu)
                          ? 'bg-linear-to-br from-amber-500 to-amber-600 border-amber-500'
                          : 'border-gray-600 bg-gray-800'
                        }`}>
                        {filters.education.includes(edu) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300">{edu}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-gray-800/50">
                      8
                    </Badge>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Profession */}
            <FilterSection title="Profession" icon={Briefcase}>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {professionOptions.map((prof) => (
                  <label key={prof} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${filters.profession.includes(prof)
                          ? 'bg-linear-to-br from-blue-500 to-blue-600 border-blue-500'
                          : 'border-gray-600 bg-gray-800'
                        }`}>
                        {filters.profession.includes(prof) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300">{prof}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-gray-800/50">
                      15
                    </Badge>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Denomination */}
            <FilterSection title="Denomination" icon={Church}>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {denominationOptions.map((denom) => (
                  <label key={denom} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${filters.denomination.includes(denom)
                          ? 'bg-linear-to-br from-purple-500 to-purple-600 border-purple-500'
                          : 'border-gray-600 bg-gray-800'
                        }`}>
                        {filters.denomination.includes(denom) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300">{denom}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-gray-800/50">
                      6
                    </Badge>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Marital Status */}
            <FilterSection title="Marital Status" icon={Heart}>
              <div className="space-y-2">
                {maritalStatusOptions.map((status) => (
                  <label key={status} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${filters.maritalStatus.includes(status)
                          ? 'bg-linear-to-br from-rose-500 to-rose-600 border-rose-500'
                          : 'border-gray-600 bg-gray-800'
                        }`}>
                        {filters.maritalStatus.includes(status) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300">{status}</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-gray-800/50">
                      4
                    </Badge>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Income Range */}
            <FilterSection title="Annual Income" icon={DollarSign}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">
                    ₹{filters.incomeRange[0].toLocaleString()} - ₹{filters.incomeRange[1].toLocaleString()}
                  </span>
                  <Badge variant="outline" className="text-xs bg-gray-800/50">
                    LPA
                  </Badge>
                </div>
                <Slider
                  value={filters.incomeRange}
                  min={0}
                  max={5000000}
                  step={50000}
                  onValueChange={(value) => handleFilterChange('incomeRange', value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  {incomeOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleFilterChange('incomeRange', [option.min, option.max])}
                      className={`p-2 rounded text-xs transition-all duration-200 ${filters.incomeRange[0] === option.min && filters.incomeRange[1] === option.max
                          ? 'bg-linear-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/30'
                          : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 border border-gray-700'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </FilterSection>

            {/* Quick Toggles */}
            <FilterSection title="Quick Filters" icon={Star}>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-linear-to-br from-emerald-500/20 to-emerald-600/20">
                      <Eye className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white">Verified Only</div>
                      <div className="text-xs text-gray-400">Show verified profiles</div>
                    </div>
                  </div>
                  <Switch
                    checked={filters.isVerified}
                    onCheckedChange={(checked) => handleFilterChange('isVerified', checked)}
                    className="data-[state=checked]:bg-linear-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-emerald-600"
                  />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-linear-to-br from-blue-500/20 to-blue-600/20">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white">With Photo</div>
                      <div className="text-xs text-gray-400">Show profiles with photo</div>
                    </div>
                  </div>
                  <Switch
                    checked={filters.hasPhoto}
                    onCheckedChange={(checked) => handleFilterChange('hasPhoto', checked)}
                    className="data-[state=checked]:bg-linear-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600"
                  />
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4 border-t border-gray-800/50">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="gap-2 border-gray-700 hover:border-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10"
            >
              <RefreshCw className="w-4 h-4" />
              Reset All Filters
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="gap-2 border-gray-700 hover:border-amber-500/50"
                onClick={() => setShowAdvanced(false)}
              >
                <ChevronUp className="w-4 h-4" />
                Hide Filters
              </Button>
              <Button
                className="gap-2 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
              >
                <Filter className="w-4 h-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataFilters;