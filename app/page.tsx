import Link from "next/link";
import { Metadata } from "next";
import {
  FileImage,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle2,
  Layers,
  Cpu,
  Video,
  Palette,
  Code2,
  ChevronRight,
  FileJson,
  Calculator,
  Type,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";

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

const toolsByCategory = [
  {
    categoryName: "Image Tools",
    icon: FileImage,
    color: "from-violet-500 to-indigo-600",
    accent: "#7c3aed",
    categoryHref: "/image-tools",
    tools: [
      {
        name: "Image Compressor",
        description:
          "Compress images without losing quality. Supports JPEG, PNG, WebP, AVIF.",
        href: "/image-tools/image-compressor",
      },
      {
        name: "Image Editor",
        description: "Edit images online with powerful editing tools.",
        href: "/image-tools/image-editor",
      },
      {
        name: "Pick Color Code from Image",
        description: "Extract HEX, RGB, HSL values directly from any image.",
        href: "/image-tools/pick-color-code-from-image",
      },
      {
        name: "Image Format Conversions",
        description: "Convert between JPEG, PNG, WebP, AVIF and more.",
        href: "/image-tools/image-format-conversions",
      },
      {
        name: "Background Remover",
        description: "Remove image backgrounds automatically in seconds.",
        href: "/image-tools/background-remover",
      },
      {
        name: "Image to GIF",
        description: "Turn your images into animated GIF format.",
        href: "/image-tools/image-to-gif",
      },
      {
        name: "Image Filters",
        description: "Apply beautiful filters and effects to your images.",
        href: "/image-tools/image-filters",
      },
      {
        name: "Crop Image",
        description: "Crop to any size or aspect ratio with precision.",
        href: "/image-tools/crop-image",
      },
      {
        name: "Sharpen Image",
        description: "Enhance sharpness and clarity online.",
        href: "/image-tools/sharpen-image",
      },
      {
        name: "Resize Image Dimensions",
        description: "Resize by changing width and height dimensions.",
        href: "/image-tools/resize-image-dimensions",
      },
      {
        name: "Image to PDF",
        description: "Convert images to PDF documents instantly.",
        href: "/image-tools/image-to-pdf",
      },
      {
        name: "Add Watermark on Image",
        description: "Add text or image watermarks to protect your photos.",
        href: "/image-tools/add-watermark-on-image",
      },
      {
        name: "Blur Image",
        description: "Apply blur effect to entire images or specific areas.",
        href: "/image-tools/blur-image",
      },
    ],
  },
  {
    categoryName: "Video Tools",
    icon: Video,
    color: "from-rose-500 to-pink-600",
    accent: "#e11d48",
    categoryHref: "/video-tools",
    tools: [
      {
        name: "Video Compressor",
        description:
          "Compress videos online — reduce file size, no size limit.",
        href: "/video-tools/video-compressor",
      },
      {
        name: "Video MetaData Viewer",
        description: "Inspect video or audio file metadata instantly.",
        href: "/video-tools/video-metadata-viewer",
      },
      {
        name: "Video Player",
        description: "Play any video format instantly. Supports subtitles.",
        href: "/video-tools/video-player",
      },
      {
        name: "Video Format Converter",
        description: "Convert between wide range of video formats.",
        href: "/video-tools/video-format-converter",
      },
      {
        name: "Change Video FPS",
        description: "Change frame rate to 24fps, 30fps, 60fps or custom.",
        href: "/video-tools/change-video-fps",
      },
      {
        name: "Crop Video",
        description: "Remove unwanted edges and reframe your video.",
        href: "/video-tools/crop-video",
      },
      {
        name: "Enhance Video Quality",
        description: "Upscale, sharpen, denoise and improve video quality.",
        href: "/video-tools/enhance-video-quality",
      },
      {
        name: "Extract Audio from Video",
        description: "Save audio as MP3, AAC, or WAV from any video.",
        href: "/video-tools/extract-audio-from-video",
      },
      {
        name: "Resize Video Dimensions",
        description: "Resize to 4K, 1080p, 720p or custom dimensions.",
        href: "/video-tools/resize-video-dimensions",
      },
      {
        name: "Rotate Video",
        description: "Rotate 90°, 180° or 270° — fix orientation fast.",
        href: "/video-tools/rotate-video",
      },
      {
        name: "Video Color Space Transformation",
        description: "Adjust brightness, contrast, saturation, and hue.",
        href: "/video-tools/video-color-space-transformation",
      },
      {
        name: "Video Grayscale",
        description: "Convert videos to black and white instantly.",
        href: "/video-tools/video-grayscale",
      },
      {
        name: "Video Overlays",
        description: "Add watermarks, logos or image overlays to videos.",
        href: "/video-tools/video-overlays",
      },
      {
        name: "Video Transparency Maker",
        description:
          "Adjust video opacity and transparency with custom background.",
        href: "/video-tools/video-transparency-maker",
      },
    ],
  },
  {
    categoryName: "CSS Tools",
    icon: Palette,
    color: "from-amber-500 to-orange-500",
    accent: "#f59e0b",
    categoryHref: "/css-tools",
    tools: [
      {
        name: "Gradient Generator",
        description: "Create linear, radial, and conic gradients with CSS code.",
        href: "/css-tools/gradient-generator",
      },
      {
        name: "Color Palette Generator",
        description: "Extract and generate color harmonies from base colors.",
        href: "/css-tools/color-palette-generator",
      },
      {
        name: "Box Shadow Generator",
        description: "Generate multi-layer CSS box-shadow with live preview.",
        href: "/css-tools/box-shadow-generator",
      },
      {
        name: "Border Radius Generator",
        description: "Create custom rounded corners with CSS border-radius.",
        href: "/css-tools/border-radius-generator",
      },
      {
        name: "CSS Grid Generator",
        description: "Build CSS grid layouts visually with instant code.",
        href: "/css-tools/css-grid-generator",
      },
      {
        name: "Flexbox Playground",
        description: "Interactive flexbox builder with live preview.",
        href: "/css-tools/flexbox-playground",
      },
      {
        name: "Color Contrast Checker",
        description: "Check WCAG compliance for color combinations.",
        href: "/css-tools/color-contrast-checker",
      },
      {
        name: "CSS Animation Generator",
        description: "Build CSS keyframe animations with ease.",
        href: "/css-tools/animation-generator",
      },
      {
        name: "Cubic Bezier Editor",
        description: "Create custom easing functions for animations.",
        href: "/css-tools/cubic-bezier-editor",
      },
      {
        name: "PX to REM Converter",
        description: "Convert between px and rem units for responsive design.",
        href: "/css-tools/px-rem-converter",
      },
    ],
  },
  {
    categoryName: "JSON Tools",
    icon: FileJson,
    color: "from-emerald-500 to-teal-600",
    accent: "#10b981",
    categoryHref: "/json-tools",
    tools: [
      {
        name: "JSON Validator",
        description: "Validate JSON syntax with error highlighting.",
        href: "/json-tools/json-validator",
      },
      {
        name: "JSON Formatter",
        description: "Format and beautify raw JSON for readability.",
        href: "/json-tools/json-formatter-beautifier",
      },
      {
        name: "JSON Minifier",
        description: "Remove whitespace to reduce JSON file size.",
        href: "/json-tools/json-minifier",
      },
      {
        name: "JSON Diff Tool",
        description: "Compare two JSON objects and highlight changes.",
        href: "/json-tools/json-diff",
      },
      {
        name: "JSON to CSV",
        description: "Convert JSON arrays to CSV format.",
        href: "/json-tools/json-to-csv",
      },
      {
        name: "CSV to JSON",
        description: "Parse CSV and convert to JSON format.",
        href: "/json-tools/csv-to-json",
      },
      {
        name: "JSON to TypeScript",
        description: "Generate TypeScript interfaces from JSON.",
        href: "/json-tools/json-to-typescript",
      },
      {
        name: "JSON Viewer",
        description: "View JSON in interactive tree format.",
        href: "/json-tools/json-viewer",
      },
    ],
  },
  {
    categoryName: "Calculators",
    icon: Calculator,
    color: "from-blue-500 to-cyan-600",
    accent: "#3b82f6",
    categoryHref: "/calculators",
    tools: [
      {
        name: "BMI Calculator",
        description: "Calculate Body Mass Index with health category.",
        href: "/calculators/bmi-calculator",
      },
      {
        name: "Age Calculator",
        description: "Calculate your exact age from birth date.",
        href: "/calculators/age-calculator",
      },
      {
        name: "Percentage Calculator",
        description: "Calculate percentages and percentage changes.",
        href: "/calculators/percentage-calculator",
      },
      {
        name: "Loan Calculator",
        description: "Calculate loan payments and interest.",
        href: "/calculators/loan-calculator",
      },
      {
        name: "Tip Calculator",
        description: "Split bills and calculate tips easily.",
        href: "/calculators/tip-calculator",
      },
      {
        name: "Date Difference Calculator",
        description: "Find the difference between two dates.",
        href: "/calculators/date-difference-calculator",
      },
    ],
  },
  {
    categoryName: "Math Tools",
    icon: Calculator,
    color: "from-indigo-500 to-purple-600",
    accent: "#6366f1",
    categoryHref: "/math-tools",
    tools: [
      {
        name: "Scientific Calculator",
        description: "Full-featured scientific calculator online.",
        href: "/math-tools/scientific-calculator",
      },
      {
        name: "Fraction Calculator",
        description: "Add, subtract, multiply, and divide fractions.",
        href: "/math-tools/fraction-calculator",
      },
      {
        name: "Quadratic Equation Solver",
        description: "Solve quadratic equations step by step.",
        href: "/math-tools/quadratic-equation-solver",
      },
      {
        name: "Matrix Calculator",
        description: "Perform matrix operations and calculations.",
        href: "/math-tools/matrix-calculator",
      },
      {
        name: "Standard Deviation Calculator",
        description: "Calculate mean, variance, and standard deviation.",
        href: "/math-tools/standard-deviation-variance-calculator",
      },
      {
        name: "Probability Calculator",
        description: "Calculate probability and statistics.",
        href: "/math-tools/probability-calculator",
      },
    ],
  },
  {
    categoryName: "Unit Converters",
    icon: RefreshCw,
    color: "from-teal-500 to-green-600",
    accent: "#14b8a6",
    categoryHref: "/unit-converters",
    tools: [
      {
        name: "Length Converter",
        description: "Convert between meters, feet, inches, and more.",
        href: "/unit-converters/length-converter",
      },
      {
        name: "Weight Converter",
        description: "Convert between kg, lbs, oz, and other units.",
        href: "/unit-converters/weight-converter",
      },
      {
        name: "Temperature Converter",
        description: "Convert between Celsius, Fahrenheit, and Kelvin.",
        href: "/unit-converters/temperature-converter",
      },
      {
        name: "Volume Converter",
        description: "Convert between liters, gallons, cups, and more.",
        href: "/unit-converters/volume-converter",
      },
      {
        name: "Speed Converter",
        description: "Convert between mph, km/h, m/s, and knots.",
        href: "/unit-converters/speed-converter",
      },
      {
        name: "Area Converter",
        description: "Convert between square meters, feet, acres, and more.",
        href: "/unit-converters/area-converter",
      },
    ],
  },
  {
    categoryName: "Color Tools",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
    accent: "#ec4899",
    categoryHref: "/color-tools",
    tools: [
      {
        name: "Color Picker",
        description: "Pick colors and get HEX, RGB, HSL values.",
        href: "/color-tools/color-picker",
      },
      {
        name: "Color Converter",
        description: "Convert between RGB, HEX, HSL, and HSV formats.",
        href: "/color-tools/color-converter",
      },
      {
        name: "Contrast Checker",
        description: "Check color contrast for WCAG accessibility.",
        href: "/color-tools/contrast-checker",
      },
      {
        name: "Color Palette Generator",
        description: "Generate color harmonies and palettes.",
        href: "/color-tools/color-palette-generator",
      },
      {
        name: "Extract Colors from Image",
        description: "Extract dominant colors from uploaded images.",
        href: "/color-tools/extract-colors-from-image",
      },
    ],
  },
  {
    categoryName: "Text Tools",
    icon: Type,
    color: "from-slate-500 to-gray-600",
    accent: "#64748b",
    categoryHref: "/text-tools",
    tools: [
      {
        name: "Word Counter",
        description: "Count words, characters, and reading time.",
        href: "/text-tools/word-counter",
      },
      {
        name: "Case Converter",
        description: "Convert text between uppercase, lowercase, title case.",
        href: "/text-tools/case-converter",
      },
      {
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text for designs.",
        href: "/text-tools/lorem-ipsum-generator",
      },
      {
        name: "Diff Checker",
        description: "Compare two texts and find differences.",
        href: "/text-tools/diff-checker",
      },
      {
        name: "Random Password Generator",
        description: "Generate strong, secure random passwords.",
        href: "/text-tools/random-password-generator",
      },
      {
        name: "QR Code Generator",
        description: "Create QR codes from URLs, text, and more.",
        href: "/text-tools/qr-code-generator",
      },
    ],
  },
  {
    categoryName: "CSV Tools",
    icon: FileSpreadsheet,
    color: "from-green-500 to-emerald-600",
    accent: "#22c55e",
    categoryHref: "/csv-tools",
    tools: [
      {
        name: "CSV Viewer",
        description: "View and analyze CSV files online.",
        href: "/csv-tools/csv-viewer",
      },
    ],
  },
  {
    categoryName: "Design Tools",
    icon: Palette,
    color: "from-amber-500 to-orange-500",
    accent: "#f59e0b",
    categoryHref: "/design-tools",
    tools: [
      {
        name: "Favicon Generator",
        description:
          "Create professional favicons for free — text, image, or emoji.",
        href: "/design-tools/favicon-generator",
      },
    ],
  },
  {
    categoryName: "Developer Tools",
    icon: Code2,
    color: "from-emerald-500 to-teal-600",
    accent: "#10b981",
    categoryHref: "/developer-tools",
    tools: [
      {
        name: "Mock Data Generator",
        description:
          "Generate realistic test data. Supports JSON, CSV, and more.",
        href: "/developer-tools/mock-data-generator",
      },
    ],
  },
];

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
              { label: "Tools Available", value: "100+" },
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
            {toolsByCategory.map((category, ci) => (
              <div key={ci}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}
                    aria-hidden="true"
                  >
                    <category.icon className="h-5 w-5" />
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
            ))}
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
