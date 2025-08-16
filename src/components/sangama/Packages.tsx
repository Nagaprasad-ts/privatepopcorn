import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Heart, Film } from "lucide-react";

import CoupleNest from "@/images/gallary_3.jpg";
import gallaryThree from "@/images/gallary_2.jpg";
import hero from "@/images/hero.jpg";

const packages = [
  {
    name: "Couple Nest",
    icon: Heart,
    description: "An intimate, romantic setting perfect for anniversaries, proposals, or a special date night.",
    image: CoupleNest,
    aiHint: "romantic couple",
    features: ["Private theater for two", "Gourmet snacks & drinks", "Personalized movie selection"],
  },
  {
    name: "Friends Den",
    icon: Users,
    description: "The ultimate hangout for birthdays, reunions, or a fun get-together with your squad.",
    image: gallaryThree,
    aiHint: "friends laughing",
    features: ["Spacious theater for groups", "Gaming console access", "Extensive snack bar"],
  },
  {
    name: "Fam Jam",
    icon: Film,
    description: "Create lasting memories with loved ones in a comfortable, family-friendly environment.",
    image: hero,
    aiHint: "family movie",
    features: ["Family-friendly movie library", "Comfortable lounge seating", "Popcorn and candy for all"],
  },
];

export function Packages() {
  return (
    <section id="packages" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-red-200 px-3 py-1 text-md text-red-600/90 font-semibold">Our Packages</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-600">Tailored for Your Moments</h2>
            <p className="max-w-[900px] text-black/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect space for your celebration. Each package is designed to provide a unique and unforgettable experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
                <Card key={pkg.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-card">
                    <CardHeader className="flex-row items-center gap-4 p-6">
                        <div className="bg-accent/10 p-3 rounded-full">
                          <Icon className="h-6 w-6 text-red-600/90" />
                        </div>
                        <div>
                          <CardTitle className="text-red-500">{pkg.name}</CardTitle>
                          <CardDescription>{pkg.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <div className="relative h-72 w-full">
                            <Image src={pkg.image} alt={pkg.name} fill className="object-cover" data-ai-hint={pkg.aiHint} />
                        </div>
                        <ul className="p-6 space-y-2 text-sm text-foreground/80">
                          {pkg.features.map(feature => (
                            <li key={feature} className="flex items-center gap-2">
                              <span className="text-red-600/90 font-bold">◆</span> {feature}
                            </li>
                          ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="p-6 mt-auto">
                        <Button asChild className="w-full">
                           <Link href="#book">Book {pkg.name}</Link>
                        </Button>
                    </CardFooter>
                </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
