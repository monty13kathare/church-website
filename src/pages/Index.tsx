import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeaderShipSection";
import MembersSection from "@/components/MembersSection";
import MinistriesSection from "@/components/MinistriesSection";
import PrayerRequestSection from "@/components/PrayerRequestSection";
import ServicesSection from "@/components/ServiceSection";


const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <LeadershipSection />
      <MinistriesSection />
      <ServicesSection />
      <EventsSection />
      <PrayerRequestSection />
      <MembersSection />
      {/* <VideoUploadForm/> */}
      {/* <VideoManagement/> */}
      <ContactSection />
    </div>
  );
};

export default Index;