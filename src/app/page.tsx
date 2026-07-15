import { Navbar } from "@/components/nav/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { ProfilesSection } from "@/components/profiles/ProfilesSection";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { SkyBackground } from "@/components/ui/SkyBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden min-h-screen">
      {/* Global Background Elements */}
      <SkyBackground />

      <div className="relative z-10">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ProfilesSection />
        <TimelineSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
