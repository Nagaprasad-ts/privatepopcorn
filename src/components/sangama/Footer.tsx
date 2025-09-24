import { Mail, MapPin, Phone, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PrivatePopcorn from "@/images/privatepopcorn.png";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
           <Link href="/" className="flex items-center gap-2">
          <Image
            src={PrivatePopcorn}
            alt="Private Popcorn"
            width={100}
            height={100}
          />
          <span className="font-headline text-xl font-bold text-red-500 tracking-tight">
            Private Popcorn
          </span>
        </Link>
            <p className="mt-4 text-sm text-foreground/80">
              Crafting unforgettable memories in our exclusive private theaters.
            </p>
          </div>
          
          <div className="md:justify-self-center">
            <h3 className="font-headline text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="mt-4 space-x-8 text-sm flex flex-row items-start justify-center">
              <div>
                <li><Link href="#packages" className="text-foreground/80 hover:text-foreground">Packages</Link></li>
                <li><Link href="#gallery" className="text-foreground/80 hover:text-foreground">Gallery</Link></li>
                <li><Link href="#book" className="text-foreground/80 hover:text-foreground">Booking</Link></li>
              </div>
              <div>
                <li><Link href="/privacy-policy" className="text-foreground/80 hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-foreground/80 hover:text-foreground">Terms & Conditions</Link></li>
              </div>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <h3 className="font-headline text-lg font-semibold text-primary">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-foreground/80">8884447958</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-foreground/80">celebrationssangama@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-foreground/80">3rd Floor, #25, 60 Feet Road, Main Road, near Soda Factory, <br /> Jnana Juothi Nagar, Railway Layout, Ullal, Bangalore</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-primary/10 pt-4 text-center text-md text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Private Popcorn. All rights reserved. <span className="italic">Designed & Developed by <Link href='https://nagaprasad-ts.github.io/portfolio/' target="_blank" rel="noopener noreferrer" className="underline decoration-blue-500 text-blue-500 font-semibold">Nagaprasad T S</Link></span></p>
        </div>
      </div>
    </footer>
  );
}
