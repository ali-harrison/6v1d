import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import InspirationsGrid from "@/components/InspirationsGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <InspirationsGrid />
        <About />
        <Contact />
      </main>
    </LenisProvider>
  );
}
