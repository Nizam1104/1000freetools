import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - 1000 Free Tools",
  description: "Truly free online tools with no sign-ups, no limits, and no paywalls. Fast, privacy-first utilities that actually work.",
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
          Free online tools that actually work—no sign-ups, no limits, no paywalls.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            We built 1000FreeTools because too many "free" online tools come with hidden costs,
            annoying sign-up walls, and feature limitations. We believe powerful utilities should
            be accessible to everyone—instantly and completely free.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What Makes Us Different</h2>
          <ul className="space-y-2">
            <li>✅ <strong>No sign-ups required</strong> — Use tools instantly</li>
            <li>✅ <strong>No hidden limits</strong> — Full functionality, always free</li>
            <li>✅ <strong>Privacy-first</strong> — Your data stays on your device</li>
            <li>✅ <strong>Lightning fast</strong> — Optimized for performance</li>
            <li>✅ <strong>Mobile-friendly</strong> — Works on any device</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Available Tools</h2>
          <p>
            Our collection includes image tools (compressor, background remover), text utilities,
            developer tools, calculators, and productivity helpers. We're adding new tools regularly,
            focusing on quality over quantity.
          </p>
          <p className="mt-4">
            <Link href="/explore-all-tools" className="text-blue-600 hover:underline">
              Browse all free tools →
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
          <p>
            We build tools people actually need for everyday tasks. Each utility is designed to
            do one job exceptionally well—no bloat, no complexity. We're starting small and growing
            thoughtfully, ensuring every tool we release is genuinely useful and well-crafted.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Are these tools really free?</h3>
              <p>Yes. All tools are completely free with no hidden charges or premium tiers.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Do I need to create an account?</h3>
              <p>No sign-up required. Just visit and use any tool instantly.</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Is my data safe?</h3>
              <p>
                Yes. Most tools process data directly in your browser. We don't upload or store
                your files unless explicitly stated.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p>
            Have a tool suggestion or found an issue? Contact us at{" "}
            <a href="mailto:contact@1000freetools.com" className="text-blue-600 hover:underline">
              contact@1000freetools.com
            </a>
          </p>
        </section>

        <div className="bg-gray-50 p-6 rounded-lg mt-12">
          <p className="text-center text-gray-700">
            Join thousands using 1000FreeTools for their daily online needs.{" "}
            <a href="/" className="text-blue-600 font-semibold hover:underline">
              Start using our free tools →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
