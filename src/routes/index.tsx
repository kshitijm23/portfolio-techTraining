import { createFileRoute } from "@tanstack/react-router";
import { LensProvider } from "@/components/portfolio/lens";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { RoleLensSection } from "@/components/portfolio/RoleLensSection";
import { Experience } from "@/components/portfolio/Experience";
import { Prompt2Print } from "@/components/portfolio/Prompt2Print";
import { HowITeach } from "@/components/portfolio/HowITeach";
import { Skills } from "@/components/portfolio/Skills";
import { PortfolioShowcase } from "@/components/portfolio/showcase/PortfolioShowcase";
import { Education } from "@/components/portfolio/Education";
import { Beyond } from "@/components/portfolio/Beyond";
import { Contact } from "@/components/portfolio/Contact";
import { TechBackdrop } from "@/components/portfolio/TechBackdrop";

const description =
  "Technical educator and builder with an M.S. in Computer Science. I design training, measure what sticks, and build AI tools that help it scale.";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Kshitij Mahajan | Technical Educator & Builder" },
      { name: "description", content: description },
      { property: "og:title", content: "Kshitij Mahajan | Technical Educator & Builder" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LensProvider>
      <TechBackdrop />
      <div className="portfolio-content relative z-10">
        <Nav />
        <main>
        <Hero />
        <Stats />
        <RoleLensSection />
        <Experience />
        <Prompt2Print />
        <HowITeach />
        <Skills />
        <PortfolioShowcase />
        <Education />
        <Beyond />
        <Contact />
        </main>
      </div>
    </LensProvider>
  );
}
