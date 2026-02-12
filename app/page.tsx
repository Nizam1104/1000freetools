import Link from "next/link";
import { Metadata } from "next";
import {
  FileImage,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "1000 Free Tools - Free Online Web Tools & Utilities",
  description:
    "Free online tools Fast, secure, and privacy-focused web utilities that work directly in your browser. | 1000freetools.com",
  openGraph: {
    title: "1000 Free Tools - Free Online Web Tools & Utilities",
    description:
      "Access 1000+ free online tools for image processing, file conversion, data processing, and more.",
    type: "website",
  },
};

export default function Home() {
  const tools = [
    {
      name: "Image Compressor",
      description: "Compress images without losing quality. Supports JPEG, PNG, WebP, AVIF, and more formats.",
      href: "/image-tools/image-compressor"
    },
    {
      name: "Favicon Generator",
      description: "Create Professional Looking Favicon for Free, supports text, image, and emojis",
      href: "/design-tools/favicon-generator"
    },
    {
      name: "Mock Data Generator",
      description: "Generate mock data for testing and development. Supports JSON, CSV, and more formats.",
      href: "/developer-tools/mock-data-generator"
    }
  ];

  return (
    <main className="min-h-screen relative">
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "1000 Free Tools",
            url: "https://1000freetools.com",
            description:
              "A comprehensive suite of free online tools for file conversion, data processing, image editing, and more.",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Image Compression",
              "File Conversion",
              "Data Processing",
              "Privacy-Focused",
              "No Registration Required",
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            1000 Free Online Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fast, secure, and privacy-focused web utilities. All tools run
            directly in your browser—no uploads, no registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="explore-all-tools"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md"
            >
              Browse Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-foreground bg-secondary rounded-md"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our Tools?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                All processing happens in your browser for instant results
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">
                Your files never leave your device. Complete privacy guaranteed
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
              <p className="text-muted-foreground">
                Once loaded, most tools work without an internet connection
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Free</h3>
              <p className="text-muted-foreground">
                No hidden costs, no subscriptions, no registration needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Available Tools
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our growing collection of free online tools designed to make
            your work easier
          </p>

          {/* Dynamic tools section */}
          <div className="flex space-x-4">
            <div className="max-w-6xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link
                    href={tool.href}
                    key={tool.name}
                    className="block p-6 border border-border rounded-lg bg-card hover:border-primary hover:shadow-md transition-colors duration-200"
                  >
                    <h4 className="text-xl font-semibold mb-2">{tool.name}</h4>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <span className="text-primary font-medium inline-flex items-center">
                      Try it now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* More categories coming soon */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center p-12 border border-dashed border-border rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">More Tools Coming</h3>
              <p className="text-muted-foreground">
                We're constantly adding new tools. Check back soon for PDF
                tools, data converters, text utilities, and more!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              No sign-up required. Just pick a tool and start working.
            </p>
            <Link
              href="#tools"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md"
            >
              Explore All Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* FAQ Section for SEO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Are these tools really free?
              </h3>
              <p className="text-muted-foreground">
                Yes, all tools on 1000 Free Tools are completely free to use
                with no hidden costs, subscriptions, or registration required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Is my data safe and private?
              </h3>
              <p className="text-muted-foreground">
                Absolutely. All processing happens directly in your browser.
                Your files never leave your device, ensuring complete privacy
                and security.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Do I need to install anything?
              </h3>
              <p className="text-muted-foreground">
                No installation needed. All tools work directly in your web
                browser on any device—desktop, tablet, or mobile.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What file formats are supported?
              </h3>
              <p className="text-muted-foreground">
                Our tools support a wide range of formats. For images, we
                support JPEG, PNG, WebP, AVIF, and more. Each tool page lists
                its specific supported formats.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
