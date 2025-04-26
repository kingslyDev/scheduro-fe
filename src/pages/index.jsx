import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Landing/HeroSection";
import AboutSection from "../components/Landing/AboutSection";
import FeatureSection from "@/components/Landing/FeatureSection";
import FAQSection from "@/components/Landing/FAQSection";
import CTASection from "@/components/Landing/CTASection";
import Footer from "@/components/Landing/Footer";

const ScheduloWebsite = () => {
  return (
    <div className="font-poppins bg-gray-50">
      {/* Navigation */}
      <Navbar />
      <main></main>
      {/* Hero Section */}
      <HeroSection />
      {/* About Section */}
      <AboutSection />
      {/* Feature Section */}
      <FeatureSection />
      {/* FAQ Section */}
      <FAQSection />
      {/* CTA Section */}
      <CTASection />
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

ScheduloWebsite.getLayout = (page) => page;

export default ScheduloWebsite;
