import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductShowcase from "@/components/ProductShowcase";
import Editorial from "@/components/Editorial";
import CategoryGrid from "@/components/CategoryGrid";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-foreground selection:bg-black selection:text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <ProductShowcase />
      <Editorial />
      <CategoryGrid />
      <BrandStory />
      <Newsletter />
      <Footer />
    </main>
  );
}
