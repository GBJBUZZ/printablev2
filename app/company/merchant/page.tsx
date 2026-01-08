import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Benefits from "./sections/Benefits";
import Dashboard from "./sections/Dashboard";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Footer from "@/components/Footer/page"

export default function BecomeMerchantPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Dashboard />
      <Testimonials />
      <CTA />
      <Footer/>
    </main>
  );
}
