import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - 1000 Free Tools",
  description: "Free online tools with no sign-ups or paywalls. Privacy-first utilities that run in your browser.",
  keywords: ["free online tools", "web utilities", "no signup tools", "privacy-first tools"],
  alternates: {
    canonical: "https://1000freetools.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About 1000FreeTools</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          We got tired of "free" tools that ask for your email after two clicks.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why we built this</h2>
          <p>
            You know the drill: find a tool that looks promising, upload your file, 
            and then hit a paywall or sign-up form. We built 1000FreeTools because 
            simple utilities should just work. No accounts. No credit cards. No tricks.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <ul className="space-y-2">
            <li>No sign-ups — pick a tool and use it</li>
            <li>No usage limits — compress ten images or ten thousand</li>
            <li>Your files stay on your device — most tools run entirely in your browser</li>
            <li>Fast — no waiting on servers for most operations</li>
            <li>Works on phones and desktops</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What's here</h2>
          <p>
            Image tools like compression and background removal, text utilities, 
            developer helpers, calculators, and misc productivity stuff. We add new 
            tools when we find gaps. We'd rather ship five good ones than fifty 
            mediocre ones.
          </p>
          <p className="mt-4">
            <Link href="/explore-all-tools" className="text-blue-600 hover:underline">
              See all tools →
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our approach</h2>
          <p>
            Each tool does one thing. If it needs your data, it stays on your device 
            unless we say otherwise. We're building this slowly and fixing things as we go.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Are these tools really free?</h3>
              <p>Yes. There's no premium tier. There's no plan to add one.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Do I need to create an account?</h3>
              <p>No. You land on the page and the tool is there.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data safe?</h3>
              <p>
                Most tools process everything in your browser — your files don't get 
                uploaded anywhere. If a tool needs server processing, we say so upfront.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Found a bug or have a tool request? Email us at{" "}
            <a href="mailto:contact@1000freetools.com" className="text-blue-600 hover:underline">
              contact@1000freetools.com
            </a>
          </p>
        </section>

        <div className="bg-gray-50 p-6 rounded-lg mt-12">
          <p className="text-center text-gray-700">
            <a href="/" className="text-blue-600 font-semibold hover:underline">
              Go to the tools →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
