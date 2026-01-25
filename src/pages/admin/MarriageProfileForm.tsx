// components/matrimony/MarriageProfileForm.tsx
import { useState, useRef } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Ruler, 
  Users, 
  Home, 
  Church, 
  Heart, 
  Calendar, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Shield,
  Star
} from "lucide-react";

interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
}

interface PartnerPreference {
  ageRange: [number, number];
  heightRange: [number, number];
  education: string[];
  profession: string[];
  religiousCommitment: string;
}

interface ProfileFormData {
  // Personal Information
  fullName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  age: number;
  height: number;
  maritalStatus: 'Never Married' | 'Divorced' | 'Widowed' | 'Awaiting Divorce';
  diet: 'Vegetarian' | 'Non-Vegetarian' | 'Eggitarian' | 'Vegan';
  
  // Contact Information
  contactEmail: string;
  contactNumber: string;
  whatsappNumber: string;
  contactPerson: string;
  relationship: string;
  
  // Education & Career
  education: string;
  profession: string;
  monthlyIncome: string;
  companyName: string;
  workLocation: string;
  
  // Location
  currentCity: string;
  nativePlace: string;
  state: string;
  country: string;
  
  // Family Details
  family: FamilyDetails;
  
  // Spiritual Life
  churchName: string;
  denomination: string;
  serviceInChurch: string[];
  spiritualLife: string;
  worshipStyle: 'Traditional' | 'Contemporary' | 'Mixed';
  
  // Hobbies & Languages
  hobbies: string[];
  languages: string[];
  
  // About Me
  aboutMe: string;
  personalityTraits: string[];
  
  // Partner Preference
  partnerPreference: PartnerPreference;
  
  // Photo Upload
  photos: File[];
  photoUrls: string[];
  
  // Terms
  acceptTerms: boolean;
  isVerified: boolean;
}

const MarriageProfileForm = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    // Personal Information
    fullName: "",
    gender: "Male",
    dateOfBirth: "",
    age: 0,
    height: 160,
    maritalStatus: "Never Married",
    diet: "Vegetarian",
    
    // Contact Information
    contactEmail: "",
    contactNumber: "",
    whatsappNumber: "",
    contactPerson: "",
    relationship: "Parent",
    
    // Education & Career
    education: "",
    profession: "",
    monthlyIncome: "",
    companyName: "",
    workLocation: "",
    
    // Location
    currentCity: "",
    nativePlace: "",
    state: "",
    country: "India",
    
    // Family Details
    family: {
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      siblings: "0",
      familyType: "Joint Family"
    },
    
    // Spiritual Life
    churchName: "",
    denomination: "Protestant",
    serviceInChurch: [],
    spiritualLife: "",
    worshipStyle: "Mixed",
    
    // Hobbies & Languages
    hobbies: [],
    languages: [],
    
    // About Me
    aboutMe: "",
    personalityTraits: [],
    
    // Partner Preference
    partnerPreference: {
      ageRange: [25, 30],
      heightRange: [150, 170],
      education: [],
      profession: [],
      religiousCommitment: ""
    },
    
    // Photo Upload
    photos: [],
    photoUrls: [],
    
    // Terms
    acceptTerms: false,
    isVerified: false
  });

  const [currentHobby, setCurrentHobby] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentService, setCurrentService] = useState("");
  const [currentTrait, setCurrentTrait] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 6;

  // Education Options
  const educationOptions = [
    "High School",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate/PhD",
    "Professional Degree",
    "Diploma",
    "Other"
  ];

  // Profession Options
  const professionOptions = [
    "Doctor",
    "Engineer",
    "Teacher",
    "Software Professional",
    "Business Owner",
    "Government Employee",
    "Private Sector",
    "Student",
    "Homemaker",
    "Other"
  ];

  // Service Options
  const serviceOptions = [
    "Worship Team",
    "Sunday School",
    "Youth Ministry",
    "Women's Ministry",
    "Men's Ministry",
    "Prayer Group",
    "Choir",
    "Usher",
    "Technical Team",
    "Evangelism",
    "Missions",
    "Other"
  ];

  // Personality Traits
  const traitOptions = [
    "Adventurous",
    "Ambitious",
    "Creative",
    "Compassionate",
    "Confident",
    "Easy-going",
    "Family-oriented",
    "God-fearing",
    "Humble",
    "Independent",
    "Loving",
    "Patient",
    "Responsible",
    "Spiritual",
    "Traditional"
  ];

  // Add Item to Array
  const addToArray = (field: keyof ProfileFormData, value: string) => {
    if (value.trim() && !(formData[field] as string[]).includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  // Remove Item from Array
  const removeFromArray = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    
    // Validate file types and size
    const validFiles = newFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        setError(`Invalid file type: ${file.name}. Only JPG, PNG, WebP allowed.`);
        return false;
      }
      
      if (!isValidSize) {
        setError(`File too large: ${file.name}. Maximum size is 5MB.`);
        return false;
      }
      
      return true;
    });

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles]
    }));

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photoUrls: [...prev.photoUrls, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove Photo
  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
      photoUrls: prev.photoUrls.filter((_, i) => i !== index)
    }));
  };

  // Calculate Age from DOB
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handle DOB Change
  const handleDateOfBirthChange = (dob: string) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: dob,
      age: calculateAge(dob)
    }));
  };

  // Validation
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.dateOfBirth && formData.contactEmail && formData.contactNumber);
      case 2:
        return !!(formData.education && formData.profession && formData.currentCity);
      case 3:
        return !!(formData.family.fatherName && formData.family.motherName);
      case 4:
        return !!(formData.churchName && formData.denomination);
      case 5:
        return formData.photos.length > 0 && formData.aboutMe.length > 50;
      case 6:
        return formData.acceptTerms;
      default:
        return true;
    }
  };

  // Handle Next Step
  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      setError("Please fill all required fields in this section.");
    }
  };

  // Handle Previous Step
  const handlePrevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(6)) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Generate profile ID
          const profileId = `CHURCH-${Date.now().toString().slice(-6)}`;
          
          // Create final profile data
          const profileData = {
            ...formData,
            registrationNo: profileId,
            registrationDate: new Date().toISOString(),
            status: 'pending',
            isActive: true,
            isVerified: false
          };

          console.log("Profile Data:", profileData);
          
          // In production: await fetch('/api/matrimony/profiles', { method: 'POST', body: JSON.stringify(profileData) })
          
          setSuccess(true);
          setTimeout(() => {
            resetForm();
            setActiveStep(1);
          }, 3000);
        }
      }, 200);

    } catch (err) {
      setError("Failed to submit profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      fullName: "",
      gender: "Male",
      dateOfBirth: "",
      age: 0,
      height: 160,
      maritalStatus: "Never Married",
      diet: "Vegetarian",
      contactEmail: "",
      contactNumber: "",
      whatsappNumber: "",
      contactPerson: "",
      relationship: "Parent",
      education: "",
      profession: "",
      monthlyIncome: "",
      companyName: "",
      workLocation: "",
      currentCity: "",
      nativePlace: "",
      state: "",
      country: "India",
      family: {
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        siblings: "0",
        familyType: "Joint Family"
      },
      churchName: "",
      denomination: "Protestant",
      serviceInChurch: [],
      spiritualLife: "",
      worshipStyle: "Mixed",
      hobbies: [],
      languages: [],
      aboutMe: "",
      personalityTraits: [],
      partnerPreference: {
        ageRange: [25, 30],
        heightRange: [150, 170],
        education: [],
        profession: [],
        religiousCommitment: ""
      },
      photos: [],
      photoUrls: [],
      acceptTerms: false,
      isVerified: false
    });
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Progress Steps
  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education & Career", icon: GraduationCap },
    { number: 3, title: "Family Details", icon: Users },
    { number: 4, title: "Spiritual Life", icon: Church },
    { number: 5, title: "Photos & About", icon: Heart },
    { number: 6, title: "Review & Submit", icon: Shield }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl border border-amber-900/30 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-amber-900/30 bg-linear-to-r from-gray-900/80 to-black/80">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-linear-to-r from-amber-900/30 to-amber-700/30">
              <Heart className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Register Marriage Profile</h2>
              <p className="text-gray-400">Create your Christian matrimony profile in 6 simple steps</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="m-6 p-4 rounded-xl bg-linear-to-r from-green-900/20 to-green-800/10 border border-green-700/30">
            <div className="flex items-center gap-3 text-green-300">
              <CheckCircle className="w-5 h-5" />
              <div>
                <div className="font-semibold">Profile submitted successfully!</div>
                <div className="text-sm text-green-400">Your profile will be verified within 24 hours.</div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="m-6 p-4 rounded-xl bg-linear-to-r from-red-900/20 to-red-800/10 border border-red-700/30">
            <div className="flex items-center gap-3 text-red-300">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="p-6 border-b border-amber-900/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 min-w-max ${
                    activeStep >= step.number
                      ? "bg-linear-to-r from-amber-900/30 to-amber-800/20 border border-amber-700/30"
                      : "opacity-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep >= step.number
                      ? "bg-linear-to-r from-amber-600 to-amber-700 text-white"
                      : "bg-gray-800 text-gray-500"
                  }`}>
                    {activeStep > step.number ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm text-gray-400">Step {step.number}</div>
                    <div className={`font-medium ${
                      activeStep >= step.number ? "text-white" : "text-gray-500"
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-400">
              Step {activeStep} of {totalSteps}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Step 1: Personal Information */}
          {activeStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Personal Information</h3>
                <p className="text-gray-400">Tell us about yourself</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Male', 'Female'] as const).map(gender => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, gender }))}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          formData.gender === gender
                            ? 'bg-linear-to-r from-amber-600 to-amber-700 border-amber-500 text-white'
                            : 'bg-gray-900/50 border-amber-900/30 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <User className="w-4 h-4" />
                          {gender}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleDateOfBirthChange(e.target.value)}
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                  {formData.age > 0 && (
                    <div className="text-amber-400 text-sm">
                      Age: {formData.age} years
                    </div>
                  )}
                </div>

                {/* Height */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Height (cm) *
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="140"
                      max="210"
                      step="1"
                      value={formData.height}
                      onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>140cm</span>
                      <span className="text-white font-bold">
                        {formData.height}cm ({Math.floor(formData.height / 30.48)}'
                        {Math.round((formData.height % 30.48) / 2.54)}")
                      </span>
                      <span>210cm</span>
                    </div>
                    <Ruler className="absolute left-4 top-8 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Marital Status */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Marital Status *
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: e.target.value as any }))}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                  </select>
                </div>

                {/* Diet */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Dietary Preference *
                  </label>
                  <select
                    value={formData.diet}
                    onChange={(e) => setFormData(prev => ({ ...prev, diet: e.target.value as any }))}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Eggitarian">Eggitarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white border-b border-amber-900/30 pb-3">
                  Contact Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                        placeholder="+91 9876543210"
                        required
                        className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white">
                      Contact Person Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                        placeholder="Parent's name"
                        required
                        className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white">
                      Relationship *
                    </label>
                    <select
                      value={formData.relationship}
                      onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Self">Self</option>
                      <option value="Relative">Relative</option>
                      <option value="Friend">Friend</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education & Career */}
          {activeStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Education & Career</h3>
                <p className="text-gray-400">Tell us about your education and professional life</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Highest Education *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select Education</option>
                      {educationOptions.map(edu => (
                        <option key={edu} value={edu}>{edu}</option>
                      ))}
                    </select>
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Profession */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Profession *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.profession}
                      onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select Profession</option>
                      {professionOptions.map(prof => (
                        <option key={prof} value={prof}>{prof}</option>
                      ))}
                    </select>
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Monthly Income */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Monthly Income (₹)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                      placeholder="e.g., 50000"
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Current workplace"
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Work Location */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Work Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.workLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, workLocation: e.target.value }))}
                      placeholder="City, State"
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Current City */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Current City *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.currentCity}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentCity: e.target.value }))}
                      placeholder="e.g., Mumbai"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Native Place */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Native Place / Hometown
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.nativePlace}
                      onChange={(e) => setFormData(prev => ({ ...prev, nativePlace: e.target.value }))}
                      placeholder="Native village/city"
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* State & Country */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="State"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Family Details */}
          {activeStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Family Details</h3>
                <p className="text-gray-400">Tell us about your family background</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father's Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.family.fatherName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      family: { ...prev.family, fatherName: e.target.value }
                    }))}
                    placeholder="Father's full name"
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Father's Occupation */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.family.fatherOccupation}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      family: { ...prev.family, fatherOccupation: e.target.value }
                    }))}
                    placeholder="Occupation"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Mother's Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.family.motherName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      family: { ...prev.family, motherName: e.target.value }
                    }))}
                    placeholder="Mother's full name"
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Mother's Occupation */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.family.motherOccupation}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      family: { ...prev.family, motherOccupation: e.target.value }
                    }))}
                    placeholder="Occupation"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Number of Siblings */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Number of Siblings
                  </label>
                  <select
                    value={formData.family.siblings}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      family: { ...prev.family, siblings: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="0">0 (Only Child)</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>

                {/* Family Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Family Type
                  </label>
                  <select
                    value={formData.family.familyType}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      family: { ...prev.family, familyType: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Joint Family">Joint Family</option>
                    <option value="Nuclear Family">Nuclear Family</option>
                    <option value="Extended Family">Extended Family</option>
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-linear-to-r from-amber-900/10 to-amber-800/5 border border-amber-900/20">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-amber-400" />
                  <h4 className="text-white font-semibold">Additional Family Information</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Your family details will be kept confidential and only shared with serious matches.
                  Please ensure all information is accurate.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Spiritual Life */}
          {activeStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Spiritual Life</h3>
                <p className="text-gray-400">Tell us about your faith journey and church involvement</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Church Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Church Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.churchName}
                      onChange={(e) => setFormData(prev => ({ ...prev, churchName: e.target.value }))}
                      placeholder="e.g., Grace Community Church"
                      required
                      className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <Church className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Denomination */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Denomination *
                  </label>
                  <select
                    value={formData.denomination}
                    onChange={(e) => setFormData(prev => ({ ...prev, denomination: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Protestant">Protestant</option>
                    <option value="Catholic">Catholic</option>
                    <option value="Orthodox">Orthodox</option>
                    <option value="Pentecostal">Pentecostal</option>
                    <option value="Baptist">Baptist</option>
                    <option value="Methodist">Methodist</option>
                    <option value="Non-denominational">Non-denominational</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Worship Style */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Preferred Worship Style
                  </label>
                  <select
                    value={formData.worshipStyle}
                    onChange={(e) => setFormData(prev => ({ ...prev, worshipStyle: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>

              {/* Service in Church */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  Service in Church
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.serviceInChurch.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-900/20 to-blue-800/10 text-blue-300 text-sm border border-blue-700/30"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeFromArray('serviceInChurch', service)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select
                    value={currentService}
                    onChange={(e) => setCurrentService(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select Service Area</option>
                    {serviceOptions.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentService) {
                        addToArray('serviceInChurch', currentService);
                        setCurrentService("");
                      }
                    }}
                    className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Spiritual Life Description */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  Tell us about your spiritual journey *
                </label>
                <textarea
                  value={formData.spiritualLife}
                  onChange={(e) => setFormData(prev => ({ ...prev, spiritualLife: e.target.value }))}
                  rows={4}
                  placeholder="Share about your faith, prayer life, Bible study habits, and how God is working in your life..."
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Partner Preference - Religious Commitment */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  What are you looking for in a partner's spiritual life? *
                </label>
                <textarea
                  value={formData.partnerPreference.religiousCommitment}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    partnerPreference: { ...prev.partnerPreference, religiousCommitment: e.target.value }
                  }))}
                  rows={3}
                  placeholder="Describe the spiritual qualities you're seeking in a life partner..."
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 5: Photos & About Me */}
          {activeStep === 5 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Photos & About Me</h3>
                <p className="text-gray-400">Upload photos and tell us about yourself</p>
              </div>

              {/* Photo Upload */}
              <div className="space-y-6">
                <label className="block text-lg font-semibold text-white">
                  Upload Photos *
                </label>
                <p className="text-gray-400 text-sm">
                  Upload at least 1 clear photo. Maximum 5 photos, 5MB each. JPG, PNG, WebP formats only.
                </p>

                {/* Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-amber-500 ${
                    formData.photos.length > 0 
                      ? 'border-green-500 bg-green-900/10' 
                      : 'border-amber-900/30 bg-gray-900/30'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-r from-amber-900/20 to-amber-800/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">
                        {formData.photos.length > 0 
                          ? `${formData.photos.length} photo${formData.photos.length > 1 ? 's' : ''} uploaded` 
                          : 'Click to upload photos'}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Drag & drop or click to browse
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Previews */}
                {formData.photoUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.photoUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-xl border border-amber-900/30"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Photo {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-amber-600 to-amber-700 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* About Me */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  About Me *
                  <span className="text-gray-500 text-sm ml-2">
                    (Minimum 50 characters)
                  </span>
                </label>
                <textarea
                  value={formData.aboutMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, aboutMe: e.target.value }))}
                  rows={5}
                  placeholder="Tell us about yourself - your personality, values, interests, what makes you unique, and what you're looking for in a life partner..."
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
                <div className={`text-sm ${
                  formData.aboutMe.length >= 50 ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {formData.aboutMe.length} characters
                </div>
              </div>

              {/* Personality Traits */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  Personality Traits
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.personalityTraits.map((trait) => (
                    <span
                      key={trait}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-purple-900/20 to-purple-800/10 text-purple-300 text-sm border border-purple-700/30"
                    >
                      {trait}
                      <button
                        type="button"
                        onClick={() => removeFromArray('personalityTraits', trait)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select
                    value={currentTrait}
                    onChange={(e) => setCurrentTrait(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select Personality Trait</option>
                    {traitOptions.map(trait => (
                      <option key={trait} value={trait}>{trait}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (currentTrait) {
                        addToArray('personalityTraits', currentTrait);
                        setCurrentTrait("");
                      }
                    }}
                    className="px-4 py-2 bg-linear-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Hobbies & Interests */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  Hobbies & Interests
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-900/20 to-amber-800/10 text-amber-300 text-sm border border-amber-700/30"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={() => removeFromArray('hobbies', hobby)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentHobby}
                    onChange={(e) => setCurrentHobby(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('hobbies', currentHobby), setCurrentHobby(""))}
                    placeholder="Add a hobby (press Enter)"
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (currentHobby.trim()) {
                        addToArray('hobbies', currentHobby);
                        setCurrentHobby("");
                      }
                    }}
                    className="px-4 py-2 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Languages Known */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white">
                  Languages Known
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.languages.map((language) => (
                    <span
                      key={language}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-900/20 to-blue-800/10 text-blue-300 text-sm border border-blue-700/30"
                    >
                      {language}
                      <button
                        type="button"
                        onClick={() => removeFromArray('languages', language)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('languages', currentLanguage), setCurrentLanguage(""))}
                    placeholder="Add a language (press Enter)"
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-amber-900/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (currentLanguage.trim()) {
                        addToArray('languages', currentLanguage);
                        setCurrentLanguage("");
                      }
                    }}
                    className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {activeStep === 6 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Review & Submit</h3>
                <p className="text-gray-400">Review your information before submitting</p>
              </div>

              {/* Profile Summary */}
              <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-amber-900/30 p-6">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400" />
                  Profile Summary
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Name</div>
                    <div className="text-white font-medium">{formData.fullName || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Age</div>
                    <div className="text-white font-medium">{formData.age || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Gender</div>
                    <div className="text-white font-medium">{formData.gender}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Education</div>
                    <div className="text-white font-medium">{formData.education || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Profession</div>
                    <div className="text-white font-medium">{formData.profession || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Location</div>
                    <div className="text-white font-medium">{formData.currentCity || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Church</div>
                    <div className="text-white font-medium">{formData.churchName || "Not provided"}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Photos</div>
                    <div className="text-white font-medium">{formData.photos.length} uploaded</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Profile Status</div>
                    <div className="text-amber-400 font-medium">Ready for submission</div>
                  </div>
                </div>

                {/* About Me Preview */}
                {formData.aboutMe && (
                  <div className="mt-6 pt-6 border-t border-amber-900/30">
                    <div className="text-gray-400 text-sm mb-2">About Me Preview</div>
                    <div className="text-gray-300 text-sm line-clamp-3">{formData.aboutMe}</div>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="bg-linear-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm rounded-2xl border border-blue-900/30 p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Terms & Conditions
                </h4>

                <div className="space-y-4 text-gray-300 text-sm">
                  <p>
                    By submitting this profile, you agree to our terms of service and privacy policy.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                      <span>All information provided must be accurate and truthful.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                      <span>Profile will be verified before being published.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                      <span>You understand that this is a Christian matrimonial service.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                      <span>Personal information will be kept confidential.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                      <span>You agree to conduct yourself respectfully with other members.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-linear-to-r checked:from-amber-600 checked:to-amber-700"
                    required
                  />
                  <label htmlFor="acceptTerms" className="text-white text-sm cursor-pointer">
                    I have read and agree to the terms and conditions *
                  </label>
                </div>
              </div>

              {/* Verification Note */}
              <div className="p-4 rounded-xl bg-linear-to-r from-emerald-900/10 to-emerald-800/5 border border-emerald-700/30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-emerald-300 font-medium">Verification Process</div>
                    <div className="text-gray-400 text-sm">
                      Your profile will be verified within 24-48 hours. You'll receive an email once approved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-amber-900/30">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={loading}
                className="px-8 py-3 border border-amber-900/30 text-amber-300 rounded-xl hover:bg-amber-900/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Step
              </button>
            )}
            
            <div className="flex-1" />
            
            {activeStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={loading}
                className="px-8 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.acceptTerms}
                className="px-8 py-3 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Profile
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarriageProfileForm;