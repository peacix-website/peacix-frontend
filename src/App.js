import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WhyTrustUs from "@/components/WhyTrustUs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BookingForm from "@/components/BookingForm";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import TherapistsPage from "@/pages/TherapistsPage";
import TherapistDetailPage from "@/pages/TherapistDetailPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import QuizPage from "@/pages/QuizPage";
import AdminPage from "@/pages/AdminPage";

const LandingPage = () => (
  <div className="min-h-screen bg-[#FAFAF9]">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Services />
    <WhyTrustUs />
    <Pricing />
    <Testimonials />
    <FAQ />
    <BookingForm />
    <Newsletter />
    <Footer />
    <WhatsAppButton />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/therapists" element={<TherapistsPage />} />
            <Route path="/therapists/:id" element={<TherapistDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
