import Link from "next/link";
import { Metadata } from "next";
import {
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
  FileText,
  FileImage,
  Video,
  Palette,
  FileJson,
  Calculator,
  RefreshCw,
  FileSpreadsheet,
  Code2,
  type LucideIcon,
} from "lucide-react";
import toolsByCategory from "@/json-assets/index-page-links.json";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  FileImage,
  Video,
  Palette,
  FileJson,
  Calculator,
  RefreshCw,
  FileSpreadsheet,
  Code2,
};

export const metadata: Metadata = {
  title: "1000 Free Tools - Free Online Web Tools & Utilities",
  description:
    "Free online tools. Fast, secure, and privacy-focused web utilities that work directly in your browser — no uploads, no registration, no limits. | 1000freetools.com",
  openGraph: {
    title: "1000 Free Tools - Free Online Web Tools & Utilities",
    description:
      "Access 1000+ free online tools for image processing, video editing, file conversion, data processing, and more.",
    type: "website",
  },
};


const features = [
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Everything runs in your browser. No servers, no waiting.",
  },
  {
    icon: Shield,
    title: "Zero-Upload Privacy",
    description: "Your files never leave your device. Guaranteed.",
  },
  {
    icon: Globe,
    title: "Works Offline",
    description: "Most tools run without any internet after first load.",
  },
  {
    icon: CheckCircle2,
    title: "Always Free",
    description: "No paywalls, no subscriptions, no tricks.",
  },
];

const faqs = [
  {
    q: "Are these tools really free?",
    a: "Yes, all tools on 1000 Free Tools are completely free — no hidden costs, no subscriptions, no registration required.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. All processing happens directly in your browser. Your files never leave your device, ensuring complete privacy and security.",
  },
  {
    q: "Do I need to install anything?",
    a: "No installation needed. All tools run directly in your web browser on any device — desktop, tablet, or mobile.",
  },
  {
    q: "What file formats are supported?",
    a: "Our tools support a wide range of formats. For images: JPEG, PNG, WebP, AVIF, and more. Each tool page lists its specific supported formats.",
  },
  {
    q: "Can I use these tools offline?",
    a: "Once loaded in your browser, most tools function without an active internet connection, thanks to browser-based processing.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ── Schema.org Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "1000 Free Tools",
            url: "https://1000freetools.com",
            description:
              "A comprehensive suite of free online tools for image processing, video editing, file conversion, data processing, and more.",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            featureList: [
              "Image Compression",
              "Video Editing",
              "File Conversion",
              "Data Processing",
              "Privacy-Focused",
              "No Registration Required",
            ],
          }),
        }}
      />

      {/* ── FAQ JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background mesh gradient - improved visibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.27 287 / 0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, oklch(0.62 0.23 292 / 0.10) 0%, transparent 60%)",
          }}
        />
        {/* Floating orbs - improved opacity for light mode */}
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute left-[8%] top-[18%] h-48 w-48 rounded-full opacity-30 dark:opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.60 0.25 290 / 0.6), transparent)",
            animationDelay: "0s",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute right-[10%] top-[35%] h-64 w-64 rounded-full opacity-25 dark:opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.22 310 / 0.5), transparent)",
            animationDelay: "2s",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-float pointer-events-none absolute bottom-[15%] left-[30%] h-56 w-56 rounded-full opacity-20 dark:opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.20 260 / 0.4), transparent)",
            animationDelay: "4s",
          }}
        />

        {/* Foreground content */}
        <div className="container mx-auto text-center relative z-10">
          {/* Eyebrow tag - improved contrast */}
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 dark:bg-primary/15 px-4 py-2 text-sm font-medium text-primary cursor-default">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            100% free — no registration needed
          </div>

          {/* H1 - improved line-height */}
          <h1
            className="animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{ animationFillMode: "both" }}
          >
            <span className="text-foreground">Every tool</span>
            <br />
            <span
              className="animate-gradient bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.60 0.27 287), oklch(0.68 0.20 310), oklch(0.55 0.24 260))",
                backgroundSize: "200% auto",
              }}
            >
              you will ever need.
            </span>
          </h1>

          {/* Subtitle - improved line-height and font size */}
          <p
            className="animate-fade-in-up delay-200 mx-auto max-w-2xl text-base md:text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed"
            style={{ animationFillMode: "both" }}
          >
            Image tools, video editors, design generators, developer utilities —
            all running directly in your browser. No uploads. No limits. No
            cost.
          </p>

          {/* CTAs - improved touch targets and cursor */}
          <div
            className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animationFillMode: "both" }}
          >
            <Link
              href="/explore-all-tools"
              id="hero-browse-tools"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 cursor-pointer min-h-[48px]"
            >
              Browse All Tools
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              id="hero-learn-more"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:bg-card hover:border-primary/40 hover:scale-[1.02] cursor-pointer min-h-[48px]"
            >
              Learn More
            </Link>
          </div>

          {/* Stats strip - improved spacing */}
          <div
            className="animate-fade-in-up delay-500 mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-14"
            style={{ animationFillMode: "both" }}
          >
            {[
              { label: "Tools Available", value: "1000+" },
              { label: "Files Processed", value: "Private" },
              { label: "Registration Required", value: "None" },
              { label: "Cost", value: "$0.00" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade - improved gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--background))",
          }}
        />
      </section>

      {/* ══════════════════════════════
          FEATURES STRIP
      ══════════════════════════════ */}
      <section className="py-20 border-y border-border/60 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="animate-fade-in-up group flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-transparent hover:border-border hover:bg-card/80 dark:hover:bg-card transition-all duration-300 cursor-default"
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <f.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TOOLS BY CATEGORY
      ══════════════════════════════ */}
      <section id="tools" className="py-24">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              The Full Collection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              All tools, organized
              <br />
              <span className="text-muted-foreground font-normal">
                by what you need.
              </span>
            </h2>
          </div>

          <div className="space-y-20">
            {toolsByCategory.map((category, ci) => {
              const IconComponent = iconMap[category.icon] || Palette;
              return (
                <div key={ci}>
                  {/* Category label */}
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}
                      aria-hidden="true"
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {category.categoryName}
                    </h2>
                    <span className="ml-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {category.tools.length}
                    </span>
                    {category.categoryHref && (
                      <Link
                        href={category.categoryHref}
                        className="ml-auto text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        View all
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>

                  {/* Tools grid - improved cards with better accessibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.tools.map((tool, ti) => (
                      <Link
                        key={ti}
                        href={tool.href}
                        className="group relative flex flex-col gap-2 rounded-xl border border-border bg-card/80 dark:bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background"
                        style={
                          {
                            "--tool-accent": category.accent,
                          } as React.CSSProperties
                        }
                      >
                        {/* Hover accent line */}
                        <div
                          className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: category.accent }}
                          aria-hidden="true"
                        />
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 text-sm md:text-base leading-snug">
                          {tool.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1">
                          {tool.description}
                        </p>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                          Open tool{" "}
                          <ChevronRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming soon block - improved visibility */}
          <div className="mt-20 rounded-2xl border border-dashed border-border p-12 text-center bg-muted/30 dark:bg-muted/20">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
              aria-hidden="true"
            >
              <Layers className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">More Tools on the Way</h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              PDF utilities, text processing tools, data converters, and many
              more categories are actively in development. Check back soon.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FAQ SECTION
      ══════════════════════════════ */}
      <section className="py-24 bg-muted/30 border-t border-border/60">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                FAQ
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-px rounded-2xl overflow-hidden border border-border">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group bg-card/80 dark:bg-card px-6 py-5 hover:bg-muted/40 transition-colors duration-200"
                >
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 flex items-start gap-2">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CLOSING CTA BANNER
      ══════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        {/* Background - improved visibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, oklch(0.55 0.27 287 / 0.08) 0%, transparent 80%)",
          }}
        />
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Start using your tools — <br />
            <span
              className="animate-gradient bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.60 0.27 287), oklch(0.68 0.20 310), oklch(0.55 0.24 260))",
                backgroundSize: "200% auto",
              }}
            >
              right now, for free.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            No sign-up. No credit card. No file uploads to servers. Just open a
            tool and get to work.
          </p>
          <Link
            href="/explore-all-tools"
            id="footer-browse-tools"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-primary/30 cursor-pointer min-h-[48px]"
          >
            Explore All Tools
            <ArrowRight
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
