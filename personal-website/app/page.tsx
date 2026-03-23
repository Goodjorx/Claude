import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Press from "@/components/Press";
import Events from "@/components/Events";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Press />
      <Events />
      <SocialProof />
      <Contact />
      <Footer />
    </main>
  );
}
