// components/BiodataCard.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  Share2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  Calendar,
  Ruler,
  ShieldCheck,
  Church,
  User
} from "lucide-react";
import type { Biodata } from "@/types/marriage";

interface BiodataCardProps {
  biodata: Biodata;
  onViewDetails: (biodata: Biodata) => void;
  onContact: (biodata: Biodata) => void;
  onShortlist: (id: number) => void;
  isShortlisted: boolean;
}

const BiodataCard = ({
  biodata,
  onViewDetails,
  onContact,
  onShortlist,
  isShortlisted
}: BiodataCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

 

  const getHeightText = (height: number) => {
    const feet = Math.floor(height / 30.48);
    const inches = Math.round((height % 30.48) / 2.54);
    return `${feet}'${inches}"`;
  };

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-gray-900/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]">
      {/* Verification Badge */}
      {biodata.isVerified && (
        <div className="absolute top-4 right-4 z-20">
           <button
                onClick={() => onShortlist(biodata.id)}
                className="p-2 rounded-full hover:bg-rose-500/10 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isShortlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
              </button>
        </div>
      )}

     

      <CardContent className="p-6">
        {/* Header with Photo and Basic Info */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="w-32 h-32 border-2 border-amber-500/30">
              <AvatarImage src={biodata.photoUrl} alt={biodata.fullName} className="object-top object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 text-amber-300">
                {getInitials(biodata.fullName)}
              </AvatarFallback>
            </Avatar>
           
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-100 transition-colors">
                  {biodata.fullName}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">
                    {biodata.currentCity} • {biodata.nativePlace}
                  </span>
                </div>
              </div>
              
            
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm">{getHeightText(biodata.height)}</span>
              </div>
               <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">{biodata.age} yrs</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">{biodata.education}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm">{biodata.profession}</span>
              </div>
              <div className="flex items-center gap-2">
                <Church className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm">{biodata.denomination}</span>
              </div>
            </div>
          </div>
        </div>

       
      </CardContent>

      <CardFooter className="px-6  pt-0 border-t border-gray-800/50">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => onViewDetails(biodata)}
          >
            View Profile
          </Button>
          <Button
            className="flex-1 gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            onClick={() => onContact(biodata)}
          >
            <Mail className="w-4 h-4" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BiodataCard;