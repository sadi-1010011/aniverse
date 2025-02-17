import Featured from "@/components/Featured/Featured";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 text-black">
      <Header />
      <Featured />
      <Hero />
      <Footer />
    </div>
  );
}
