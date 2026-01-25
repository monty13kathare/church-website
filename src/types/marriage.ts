// types/marriage.ts
export type Gender = 'Male' | 'Female' | 'All';
export type MaritalStatus = 'Never Married' | 'Divorced' | 'Widowed';
export type EducationLevel = 'High School' | 'Graduate' | 'Post Graduate' | 'Doctorate';
export type Profession = 'Student' | 'Employed' | 'Business' | 'Professional' | 'Ministry';
export type Diet = 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian';

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation?: string;
  motherName: string;
  motherOccupation?: string;
  siblings: number;
  familyType: 'Joint' | 'Nuclear' | 'Extended';
  familyValues: string[];
}

export interface PartnerPreference {
  ageRange: [number, number];
  heightRange: [number, number];
  education: EducationLevel[];
  profession: Profession[];
  location?: string[];
  religiousCommitment: string;
}

export interface Filters {
  gender: Gender;
  ageRange: [number, number];
  heightRange: [number, number];
  education: string[];
  profession: string[];
  location: string[]; // ❗ remove null
  maritalStatus: string[];
  denomination: string[];
  incomeRange: [number, number];
  isVerified: boolean;
  hasPhoto: boolean;
}


export const DEFAULT_FILTERS: Filters = {
  gender: "All", 
  ageRange: [22, 40],
  heightRange: [150, 190],
  education: [],
  profession: [],
  location: [],
  maritalStatus: [],
  denomination: [],
  incomeRange: [0, 500000],
  isVerified: false,
  hasPhoto: false,
};


export interface Biodata {
  id: number;
  registrationNo: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  age: number;
  height: number; // in cm
  maritalStatus: MaritalStatus;
  education: EducationLevel;
  profession: Profession;
  jobTitle?: string;
  company?: string;
  monthlyIncome?: string;
  nativePlace: string;
  currentCity: string;
  contactPerson: string;
  contactNumber: string;
  contactEmail: string;
  churchName: string;
  denomination: string;
  baptismDate?: string;
  spiritualLife: string;
  serviceInChurch: string[];
  diet: Diet;
  hobbies: string[];
  languages: string[];
  aboutMe: string;
  family: FamilyDetails;
  partnerPreference: PartnerPreference;
  photoUrl: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export const AGE_RANGE_OPTIONS: { label: string; value: [number, number] }[] = [
  { label: "18 - 22 Years", value: [18, 22] },
  { label: "23 - 27 Years", value: [23, 27] },
  { label: "28 - 32 Years", value: [28, 32] },
  { label: "33 - 37 Years", value: [33, 37] },
  { label: "38 - 45 Years", value: [38, 45] },
  { label: "All Ages", value: [18, 50] },
];

export const HEIGHT_RANGE_OPTIONS: { label: string; value: [number, number] }[] = [
  { label: "4'6\" - 5'0\"", value: [140, 152] },
  { label: "5'0\" - 5'4\"", value: [152, 163] },
  { label: "5'4\" - 5'8\"", value: [163, 173] },
  { label: "5'8\" - 6'0\"", value: [173, 183] },
  { label: "6'0\"+", value: [183, 200] },
  { label: "All Heights", value: [140, 200] },
];
