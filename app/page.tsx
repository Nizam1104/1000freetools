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
  const toolsByCategory = [
    {
      categoryName: "Image Tools",
      tools: [
        {
          name: "Image Compressor",
          description:
            "Compress images online - reduce file size while maintaining quality",
          href: "/image-tools/image-compressor",
        },
        {
          name: "Image Editor",
          description: "Edit images online with powerful editing tools",
          href: "/image-tools/image-editor",
        },
        {
          name: "Pick Color Code from Image",
          description:
            "Extract color codes from images - get HEX, RGB, HSL values",
          href: "/image-tools/pick-color-code-from-image",
        },
        {
          name: "Image Format Conversions",
          description:
            "Convert images between different formats - JPEG, PNG, WebP, AVIF and more",
          href: "/image-tools/image-format-conversions",
        },
        {
          name: "Background Remover",
          description: "Remove background from images automatically",
          href: "/image-tools/background-remover",
        },
        {
          name: "Image to GIF",
          description: "Convert images to animated GIF format",
          href: "/image-tools/image-to-gif",
        },
        {
          name: "Image Filters",
          description: "Apply beautiful filters and effects to your images",
          href: "/image-tools/image-filters",
        },
        {
          name: "Crop Image",
          description: "Crop images to your desired size and aspect ratio",
          href: "/image-tools/crop-image",
        },
        {
          name: "Sharpen Image",
          description: "Enhance image sharpness and clarity online",
          href: "/image-tools/sharpen-image",
        },
        {
          name: "Resize Image Dimensions",
          description: "Resize images by changing width and height dimensions",
          href: "/image-tools/resize-image-dimensions",
        },
        {
          name: "Image to PDF",
          description: "Convert images to PDF documents",
          href: "/image-tools/image-to-pdf",
        },
        {
          name: "Add Watermark on Image",
          description: "Add text or image watermarks to protect your photos",
          href: "/image-tools/add-watermark-on-image",
        },
        {
          name: "Blur Image",
          description: "Apply blur effect to images or specific areas",
          href: "/image-tools/blur-image",
        },
      ],
    },
    {
      categoryName: "Design Tools",
      tools: [
        {
          name: "Favicon Generator",
          description:
            "Create Professional Looking Favicon for Free, supports text, image, and emojis",
          href: "/design-tools/favicon-generator",
        },
      ],
    },
    {
      categoryName: "Developer Tools",
      tools: [
        {
          name: "Mock Data Generator",
          description:
            "Generate realistic test data for your applications to speed up development and testing.",
          href: "/developer-tools/mock-data-generator",
        },
      ],
    },
    {
      categoryName: "Video Tools",
      tools: [
        {
          name: "Video Compressor",
          description:
            "Compress videos online - reduce file size, No size limit",
          href: "/video-tools/video-compressor",
        },
        {
          name: "Video MetaData Viewer",
          description: "See Video or Audio files metadata",
          href: "/video-tools/video-metadata-viewer",
        },
        {
          name: "Video Player",
          description:
            "Play any video file format instantly, Supports subtitles",
          href: "/video-tools/video-player",
        },
        {
          name: "Video Format Converter",
          description:
            "Convert between video formats, Supports wide range of video formats",
          href: "/video-tools/video-format-converter",
        },
        {
          name: "Change Video FPS",
          description:
            "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
          href: "/video-tools/change-video-fps",
        },
        {
          name: "Crop Video",
          description: "Crop videos online - remove unwanted edges and reframe",
          href: "/video-tools/crop-video",
        },
        {
          name: "Enhance Video Quality",
          description: "Upscale, sharpen, denoise and improve video quality",
          href: "/video-tools/enhance-video-quality",
        },
        {
          name: "Extract Audio from Video",
          description:
            "Extract audio from video files - save as MP3, AAC, or WAV",
          href: "/video-tools/extract-audio-from-video",
        },
        {
          name: "Resize Video Dimensions",
          description: "Resize video to 4K, 1080p, 720p or custom dimensions",
          href: "/video-tools/resize-video-dimensions",
        },
        {
          name: "Rotate Video",
          description: "Rotate videos 90°, 180° or 270° - fix orientation",
          href: "/video-tools/rotate-video",
        },
        {
          name: "Video Color Space Transformation",
          description: "Adjust brightness, contrast, saturation, hue and more",
          href: "/video-tools/video-color-space-transformation",
        },
        {
          name: "Video Grayscale",
          description: "Convert videos to black and white instantly",
          href: "/video-tools/video-grayscale",
        },
        {
          name: "Video Overlays",
          description: "Add watermarks, logos or image overlays to videos",
          href: "/video-tools/video-overlays",
        },
        {
          name: "Video Transparency Maker",
          description:
            "Adjust video opacity and transparency with custom background",
          href: "/video-tools/video-transparency-maker",
        },
      ],
    },
  ];

  const tools = [
    {
      name: "Image Compressor",
      description:
        "Compress images without losing quality. Supports JPEG, PNG, WebP, AVIF, and more formats.",
      href: "/image-tools/image-compressor",
    },
    {
      name: "Favicon Generator",
      description:
        "Create Professional Looking Favicon for Free, supports text, image, and emojis",
      href: "/design-tools/favicon-generator",
    },
    {
      name: "Mock Data Generator",
      description:
        "Generate mock data for testing and development. Supports JSON, CSV, and more formats.",
      href: "/developer-tools/mock-data-generator",
    },
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video MetaData Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly, Supports subtitles",
      href: "/video-tools/video-player",
    },
    {
      name: "Video Format Converter",
      description:
        "Convert between video formats, Supports wide range of video formats",
      href: "/video-tools/video-format-converter",
    },
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
          {/* <div className="flex space-x-4">
            <div className="max-w-6xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link
                    href={tool.href}
                    key={tool.name}
                    className="block p-6 border border-border rounded-lg bg-card hover:border-primary hover:shadow-md transition-colors duration-200"
                  >
                    <h4 className="text-xl font-semibold mb-2">{tool.name}</h4>
                    <p className="text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <span className="text-primary font-medium inline-flex items-center">
                      Try it now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

          {toolsByCategory.map((category, categoryIndex) => (
            <section
              key={categoryIndex}
              className="container mx-auto px-4 py-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                {category.categoryName}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 sm:gap-y-4 md:gap-y-6 gap-x-2 sm:gap-x-4 md:gap-x-6">
                {category.tools.map((tool, toolIndex) => (
                  <Link
                    href={tool.href}
                    key={toolIndex}
                    className="bg-card rounded-lg p-4 hover:shadow-xl border transition-shadow duration-300"
                  >
                    <h3 className="text-primary text-base md:text-xl font-semibold">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

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
