import { Footer } from '@/components/sangama/Footer';
import { Header } from '@/components/sangama/Header';
import React from 'react';

const App = () => {
  const lastUpdated = "September 24, 2025";
  return (
    <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-grow">
            <div className="p-8">
              <article>
                <header className="mb-6">
                  <h1 className="text-3xl text-red-500 font-extrabold">Shipping</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Last updated: <span className="font-medium">{lastUpdated}</span>
                  </p>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    Our Services are provided as a private theater experience and do not involve the shipping of physical goods. Therefore, there are no shipping options, costs, or delivery times associated with our offerings. All bookings and services are to be enjoyed at our venue located in Bangalore.
                  </p>
                </header>

                <footer className="text-xs text-gray-500 dark:text-gray-400 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p>© {new Date().getFullYear()} Private Popcorn. All rights reserved.</p>
                </footer>
              </article>
            </div>
          </main>
          <Footer />
        </div>
  );
};

export default App;
