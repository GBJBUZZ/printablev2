import Hero from "./sections/Hero";
import CoreValues from "./sections/CoreValues";
import Journey from "./sections/Journey";
import Team from "./sections/Team";
import Press from "./sections/Press";
import CTA from "./sections/CTA";
import Footer from "@/components/Footer/page"

export default function AboutPrintablePage() {
  return (
    <main className="w-full">
      <Hero />
      <CoreValues />
      <Journey />
      <Team />
      <Press />
      <CTA />
      <Footer/>
    </main>
  );
}
