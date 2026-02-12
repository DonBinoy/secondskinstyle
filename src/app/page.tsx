import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductShowcase from "@/components/ProductShowcase";
import NewArrivals from "@/components/NewArrivals";
import MediaGrid from "@/components/MediaGrid";
import Scene3D from "@/components/Scene3D";
import CategoryGrid from "@/components/CategoryGrid";
import Testimonials from "@/components/Testimonials";
import BrandStory from "@/components/BrandStory"; // Keep imported even if commented out in JSX
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-foreground selection:bg-black selection:text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <NewArrivals />
      <Scene3D />
      <MediaGrid />
      {/* <ProductShowcase /> */}
      <CategoryGrid />
      <Testimonials />
      {/* <BrandStory /> */}
      <Newsletter />
      <Footer />
    </main>
  );
}
