import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import MissionSection from "@/components/MissionSection";
import TeamSection from "@/components/TeamSection";
import TestimonialSection from "@/components/TestimonialSection";
import InstagramSection from "@/components/InstagramSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <NavBar />
      <main>
        <Hero />
        <ProblemSection />
        <MissionSection />
        <TeamSection />
        <TestimonialSection />
        <InstagramSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
