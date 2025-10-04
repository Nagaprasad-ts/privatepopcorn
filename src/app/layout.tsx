import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image";
import whatsApp from "@/images/whatsapp.png";

export const metadata: Metadata = {
  title: 'Private Popcorn',
  description: 'Premium Private Theater and event services for your special celebrations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-white rounded-full shadow-lg border border-gray-200">
          <Image
            src={whatsApp}
            alt="WhatsApp Contact"
            width={50}
            height={50}
            className="cursor-pointer drop-shadow-lg hover:scale-105 transition-transform duration-200"
          />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
