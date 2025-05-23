
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar scrollToSection={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section with ID for navigation */}
        <section id="services-section" className="py-16 bg-slate-50">
          <ServicesSection />
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
