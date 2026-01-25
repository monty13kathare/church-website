import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VideosSection from "./components/VideoSection";
import GallerySection from "./components/GallerySection";
import MarriageSection from "./pages/sections/MarriageSection";
import MainLayout from "./layout/MianLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ImageUploadForm from "./pages/admin/ImageUploadForm";
import ImageManagement from "./pages/admin/ImageManagement";
import VideoManagement from "./pages/admin/VideoManagement";
import VideoUploadForm from "./pages/admin/VideoUploadForm";
import AdminLogin from "./pages/admin/AdminLogin";
import MarriageProfileForm from "./pages/admin/MarriageProfileForm";
import LeadershipSection from "./components/LeaderShipSection";
import AboutSection from "./components/AboutSection";
import MinistriesSection from "./components/MinistriesSection";
import EventsSection from "./components/EventsSection";
import ContactSection from "./components/ContactSection";
import PrayerRequestSection from "./components/PrayerRequestSection";

const queryClient = new QueryClient();

const isAuthenticated = true;

const App = () => (

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Layout Route */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/videos" element={<VideosSection />} />
            <Route path="/images" element={<GallerySection />} />
            <Route path="/leadership" element={<LeadershipSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/ministries" element={<MinistriesSection />} />
            <Route path="/events" element={<EventsSection />} />
            <Route path="/contact" element={<ContactSection />} />

            <Route path="/prayer-request" element={<PrayerRequestSection />} />





            <Route path="/matrimony" element={<MarriageSection />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

         



          {/* Admin Routes */}
          <Route path="/admin" element={
            isAuthenticated ? (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            ) : <Navigate to="/login" />
          } />

            <Route path="/admin/upload-image" element={
            isAuthenticated ? (
              <AdminLayout>
                <ImageUploadForm />
              </AdminLayout>
            ) : <Navigate to="/login" />
          } />
           <Route path="/admin/upload-videos" element={
            isAuthenticated ? (
              <AdminLayout>
                <VideoUploadForm />
              </AdminLayout>
            ) : <Navigate to="/login" />
          } />
           <Route path="/admin/video-management" element={
            isAuthenticated ? (
              <AdminLayout>
                <VideoManagement />
              </AdminLayout>
            ) : <Navigate to="/login" />
          } />
           <Route path="/admin/gallery-management" element={
            isAuthenticated ? (
              <AdminLayout>
                <ImageManagement />
              </AdminLayout>
            ) : <Navigate to="/login" />
          } />

           <Route path="/admin/upload-marriage-profile" element={
            isAuthenticated ? (
              <AdminLayout>
                <MarriageProfileForm />
              </AdminLayout>
            ) : <Navigate to="/login" />
          } />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;