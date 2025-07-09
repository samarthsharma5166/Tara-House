import Hero from "@/components/sections/Hero";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Products from "@/components/sections/Products";
import FooterSection from "@/components/sections/FooterSection";


export default function Home() {
  return (
    <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <Testimonials />
        <WhyChooseUs />
        <Products />
        <FooterSection />
    </div>
  );
}
