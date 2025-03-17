import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Landing/HeroSection";
import AboutSection from "../components/Landing/AboutSection";
import GradientDivider from "../components/Landing/GradientDivider";
import FeatureSection from "@/components/Landing/FeatureSection";
import Footer from "@/components/Landing/Footer";

const ScheduloWebsite = () => {
  return (
    <div className="font-poppins bg-gray-50">
      {/* Navigation */}
      <Navbar />
      <main className="pt-20"></main>
      {/* Hero Section */}
      <HeroSection />
      {/* Gradient Divider */}
      <GradientDivider />
      {/* About Section */}
      <AboutSection />
      {/* Feature Section */}
      <FeatureSection />
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

ScheduloWebsite.getLayout = (page) => page;

export default ScheduloWebsite;