import Image from "next/image";
import gallaryOne from "@/images/gallary_1.jpg";
import gallaryTwo from "@/images/gallary_2.jpg";
import gallaryThree from "@/images/gallary_3.jpg";
import gallaryFour from "@/images/gallary_4.jpg";
import gallaryFive from "@/images/gallary_5.jpg";
import gallarySix from "@/images/gallary_6.jpg";
import hero from "@/images/hero.jpg";

const galleryImages = [
  { src: gallaryOne, alt: "Birthday celebration in Friends Den", aiHint: "birthday party" },
  { src: gallaryTwo, alt: "Birthday celebration in Friends Den", aiHint: "romantic date" },
  { src: gallaryThree, alt: "Birthday celebration in Friends Den", aiHint: "family gathering" },
  { src: gallaryFour, alt: "Birthday celebration in Friends Den", aiHint: "friends gaming" },
  { src: gallaryFive, alt: "Birthday celebration in Friends Den", aiHint: "marriage proposal" },
  { src: gallarySix, alt: "Birthday celebration in Friends Den", aiHint: "kids party" },
  { src: hero, alt: "Elegant private theater screening", aiHint: "private theater" },
];

export function Gallery() {
  return (
    <section id="gallery" className="max-w-7xl mx-auto py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Gallery of Moments</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A glimpse into the beautiful celebrations and cherished memories created at Sangama Celebrations.
            </p>
          </div>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-3 gap-4 mt-12 space-y-4">
            {galleryImages.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-lg group relative break-inside-avoid">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={image.aiHint}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
