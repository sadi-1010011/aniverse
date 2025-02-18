import Featured from "@/components/Featured/Featured";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import RecommendedAnime from "@/components/Recommended/RecommendedAnime";
import NewReleases from "@/components/NewReleases/NewReleases";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 text-black">
      <Header />
      <Featured />
      <RecommendedAnime />
      <NewReleases />
      <Footer />
    </div>
  );
}
