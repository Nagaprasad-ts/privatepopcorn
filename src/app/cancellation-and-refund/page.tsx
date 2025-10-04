"use client";
import { Footer } from '@/components/sangama/Footer';
import { Header } from '@/components/sangama/Header';
import React, { useState } from 'react';

const App = () => {
  const lastUpdated = "September 24, 2025";
  const faqs = [
    {
    question: "When exactly is the 48-hour cutoff?",
    answer:
    "The cutoff is 48 hours before your booked slot's date and start time. For example, for a booking on Oct 10 at 10:00 AM, you must cancel before Oct 8 at 10:00 AM.",
    },
    {
    question: "How long will the refund take?",
    answer:
    "Refunds are usually processed within 5–7 working days, depending on your payment provider.",
    },
    {
    question: "I booked at the counter — how is my refund issued?",
    answer:
    "For walk-in bookings made at reception, refunds will be issued in cash or via the original transaction method, depending on how the payment was taken.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <div className="p-6 sm:p-10 bg-white rounded-2xl shadow-md">
            <header className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-semibold text-red-500">Cancellation & Refund Policy</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Last updated: <span className="font-medium">{lastUpdated}</span>
                </p>
                <p className="mt-2 text-sm sm:text-base text-gray-600">Clear, fair, and easy to follow — here’s how cancellations and refunds work for your bookings.</p>
            </header>

            <section className="space-y-6">
                <article>
                <h2 className="text-xl font-medium text-gray-800">Cancellations</h2>
                <p className="mt-2 text-gray-600">You may <strong>cancel your booking up to 2 days (48 hours)</strong> before the scheduled booking date. Cancellations must be submitted by contacting our reception team via phone, WhatsApp, or in person at the theater. A cancellation is considered valid only after you receive confirmation from our staff.</p>
                </article>

                <article>
                <h2 className="text-xl font-medium text-gray-800">Refunds</h2>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-2">
                    <li>If you cancel at least 2 days prior to the booking date, you will receive a <strong>full refund</strong> of the amount paid.</li>
                    <li>Refunds are processed to the original payment method within <strong>5–7 working days</strong>. For manual reception bookings, refunds may be issued in cash or via the original transaction method.</li>
                </ul>
                </article>

                <article>
                <h2 className="text-xl font-medium text-gray-800">Late Cancellations & No-Shows</h2>
                <p className="mt-2 text-gray-600">Cancellations made <strong>less than 2 days</strong> before the booking date are <strong>not eligible for a refund</strong>. No-shows (failure to attend without prior cancellation) are not refundable.</p>
                </article>

                <article>
                <h2 className="text-xl font-medium text-gray-800">Theater-Initiated Changes</h2>
                <p className="mt-2 text-gray-600">If we need to cancel your booking due to operational reasons (maintenance, unforeseen closures), you will be offered either a <strong>full refund</strong> or the option to <strong>reschedule</strong> to another available slot.</p>
                </article>

                <article>
                <h2 className="text-xl font-medium text-gray-800">How to Contact Us</h2>
                <p className="mt-2 text-gray-600">To cancel or inquire about refunds, reach out to our support team:</p>

                <div className="mt-3 grid sm:flex sm:items-center gap-3">
                    <a href="tel:+918884447958" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700">Call: +91 88844 47958</a>
                    <a href="mailto:privatepopcorn913@gmail.com" className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 text-sm text-red-700 hover:bg-gray-50">Email: privatepopcorn913@gmail.com</a>
                    <a href="https://wa.me/+918884447958" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-amber-600">WhatsApp</a>
                </div>
                </article>

                <article className="mt-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Frequently Asked Questions
                    </h2>
                    <dl className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg">
                            <dt>
                                <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:bg-gray-50"
                                >
                                {faq.question}
                                    <span className="ml-2 text-gray-500">
                                    {openIndex === index ? "−" : "+"}
                                    </span>
                                </button>
                            </dt>
                            {openIndex === index && (
                                <dd className="px-4 pb-4 text-gray-600 border-t bg-gray-50">
                                {faq.answer}
                                </dd>
                            )}
                        </div>
                    ))}
                    </dl>
                </article>

                <footer className="mt-6 border-t pt-4 text-sm text-gray-500">
                    <p>Please ensure your contact details are correct in the booking. This policy is subject to change; check this page for the latest version.</p>
                </footer>
            </section>
            </div>
          <Footer />
        </div>
  );
};

export default App;
