import { Preloader } from "@/components/preloader";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Skiper46 } from "@/components/ui/skiper-ui/skiper46";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <Skiper46 fixed position="bottom-left" />
    </>
  );
}
