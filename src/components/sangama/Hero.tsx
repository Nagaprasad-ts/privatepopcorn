import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "@/images/hero.jpg";

export function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src={HeroImage}
          alt="Elegant private theater screening"
          fill
          className="absolute inset-0 z-0 object-cover opacity-20"
          data-ai-hint="private theater"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background z-10"></div>
        <div className="container relative z-20 px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-600 sm:text-5xl md:text-6xl lg:text-7xl">
                A Space for every 
                <br />
                <span className="text-red-500 italic">kind of moment.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
                Experience unparalleled luxury and create timeless memories at Sangama Celebrations. Your exclusive event starts here.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                <Button asChild size="lg" className="w-full sm:w-auto bg-red-500 hover:bg-red-600/90 text-white font-medium text-md shadow-lg shadow-accent/20 transition-all hover:scale-105">
                    <Link href="#book">Book Your Moment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-black/50 text-black hover:bg-black/5 hover:text-black transition-all hover:scale-105 font-medium text-md">
                    <Link href="#packages">View Packages</Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
