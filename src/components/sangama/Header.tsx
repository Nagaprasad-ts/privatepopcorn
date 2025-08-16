"use client";

import { Crown, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import PrivatePopcorn from "@/images/privatepopcorn.png";

export function Header() {
  const navLinks = [
    { href: "#packages", label: "Packages" },
    { href: "#gallery", label: "Gallery" },
    { href: "#recommender", label: "AI Planner" },
  ];

  return (
    <header className="sticky top-0 z-50 pt-2 w-full border-b border-border/40 bg-white md:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-md font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-black/80 transition-colors hover:text-black font-semibold tracking-tight hover:underline decoration-2 decoration-red-500/50 hover:decoration-red-600/80"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-red-500 hover:bg-red-600/90 text-accent-foreground shadow transition-all hover:scale-105 font-semibold tacking0-stretch"
          >
            <Link href="#book">Book Now</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
              <div className="flex flex-col h-full">
                <div className="border-b pb-4">
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
                </div>
                <nav className="flex flex-col gap-4 py-4 flex-grow">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-black transition-colors hover:text-black/80"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto">
                  <SheetClose asChild>
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-red-500 hover:bg-red-500/80 font-medium text-md text-white"
                    >
                      <Link href="#book">Book Now</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
