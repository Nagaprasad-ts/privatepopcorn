import { Header } from "@/components/sangama/Header";
import { Hero } from "@/components/sangama/Hero";
import { Packages } from "@/components/sangama/Packages";
import { Gallery } from "@/components/sangama/Gallery";
import { AiRecommender } from "@/components/sangama/AiRecommender";
import { BookingForm } from "@/components/sangama/BookingForm";
import { Footer } from "@/components/sangama/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Packages />
        <Gallery />
        <AiRecommender />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
