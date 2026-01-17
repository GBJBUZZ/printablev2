import Hero from "./sections/Hero";
import WhyPartner from "./sections/WhyPartner";
import IntegrationPartners from "./sections/IntegrationPartners";
import BrandPartners from "./sections/BrandPartners";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Footer from "@/components/Footer/page";

export default function PartnerPage() {
  return (
    <main>
      <Hero />
      <WhyPartner />
      <IntegrationPartners />
      <BrandPartners />
      <Testimonials />
      <CTA />
      <Footer/>

    </main>
  );
}
