import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Voices from "@/components/Voices";
import Approach from "@/components/Approach";
import Manifesto from "@/components/Manifesto";
import Words from "@/components/Words";
import Principles from "@/components/Principles";
import Closing from "@/components/Closing";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Voices />
        <Approach />
        <Manifesto />
        <Words />
        <Principles />
        <Closing />
      </main>
    </LenisProvider>
  );
}
