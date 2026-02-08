import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";

// Design tools available
const designTools = [
  {
    toolName: "Favicon Generator",
    toolDescription:
      "Create professional favicons from text, images, or emojis with custom colors and fonts",
    toolLink: "/design-tools/favicon-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Design Tools - Professional Web Design Utilities",
  description:
    "Access free online design tools for web designers and developers, enhance your web design workflow with our utilities.",
  keywords: [
    "free design tools",
    "online design tools",
    "web design tools free",
    "favicon generator",
    "graphic design tools online",
    "free design utilities",
    "web designer tools",
    "online design software free",
    "design tools for developers",
    "free web design resources",
  ],
  openGraph: {
    title: "Free Design Tools Online - Professional Web Design Utilities",
    description:
      "Professional design tools for web designers and developers. Create favicons, optimize graphics, and streamline your design workflow - all free.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Design Tools Online - Professional Web Design Utilities",
    description:
      "Professional design tools for web designers and developers. Create favicons, optimize graphics, and streamline your design workflow - all free.",
  },
  alternates: {
    canonical: "https://www.1000freetools.com/design-tools",
  },
};

export default function DesignToolsPage() {
  const faqsData = [
    {
      question: "What design tools are available on this platform?",
      answer:
        "We offer a growing collection of free online design tools including our popular Favicon Generator. Our tools are designed to help web designers and developers create professional graphics, optimize visual assets, and streamline their design workflow without expensive software subscriptions.",
    },
    {
      question: "Are these design tools really free to use?",
      answer:
        "Yes! All our design tools are completely free with no hidden costs, subscriptions, or watermarks. You can use them for personal projects, commercial work, or client projects without any limitations. We believe professional design tools should be accessible to everyone.",
    },
    {
      question: "Do I need to install any software to use these tools?",
      answer:
        "No installation required! All our design tools work directly in your web browser. Whether you're on Windows, Mac, Linux, or even a mobile device, you can access our tools instantly without downloading or installing anything. Just open your browser and start creating.",
    },
    {
      question: "Can I use these tools for commercial projects?",
      answer:
        "Absolutely! Our free design tools are available for both personal and commercial use. Whether you're designing for your own website, creating assets for clients, or working on commercial projects, you're free to use our tools without attribution or licensing fees.",
    },
    {
      question:
        "What makes your design tools different from other online tools?",
      answer:
        "Our design tools prioritize simplicity, speed, and professional results. We focus on creating intuitive interfaces that don't require tutorials, fast processing that happens in your browser, and output quality that matches expensive desktop software. Plus, everything is completely free with no file limits or usage restrictions.",
    },
    {
      question: "Are my design files stored on your servers?",
      answer:
        "No. All processing happens directly in your browser for maximum privacy and security. Your images, designs, and creative work never leave your device. Once you close the browser tab, all data is immediately deleted. We don't store, track, or have access to any of your files.",
    },
    {
      question: "What design tools are you planning to add next?",
      answer:
        "We're constantly expanding our collection based on user feedback. Upcoming tools include logo makers, color palette generators, gradient creators, icon generators, mockup tools, and more. Each tool is carefully designed to solve real design challenges faced by web designers and developers.",
    },
    {
      question: "Can I suggest a new design tool?",
      answer:
        "We'd love to hear your suggestions! If there's a design tool you need or a feature you'd like to see, please reach out through our contact page. We prioritize building tools that our community actually needs and will use regularly.",
    },
  ];

  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Free Design Tools for Web Designers
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Professional online design tools that help you create stunning web
            graphics, optimize visual assets, and streamline your design
            workflow. No software installation, no subscriptions, completely
            free.
          </p>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          Available Design Tools
        </h2>
        <ToolLinkCards tools={designTools} />
      </section>

      {/* Why Choose Our Tools Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Why Choose Our Design Tools?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">🎨</span>
              Professional Quality
            </h3>
            <p className="text-muted-foreground">
              Create professional-grade designs that match the quality of
              expensive desktop software. Our tools use advanced algorithms to
              ensure your output looks stunning on any device.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">⚡</span>
              Lightning Fast
            </h3>
            <p className="text-muted-foreground">
              All processing happens directly in your browser for instant
              results. No uploading, no waiting for server processing, no
              delays. Create and download your designs in seconds.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">🔒</span>
              100% Private
            </h3>
            <p className="text-muted-foreground">
              Your designs never leave your device. All tools work offline in
              your browser, ensuring complete privacy and security for your
              creative work and client projects.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">💰</span>
              Completely Free
            </h3>
            <p className="text-muted-foreground">
              No subscriptions, no hidden fees, no watermarks. Use all our
              design tools unlimited times for personal and commercial projects
              without spending a penny.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">🎯</span>
              Easy to Use
            </h3>
            <p className="text-muted-foreground">
              Intuitive interfaces designed for both beginners and
              professionals. No tutorials needed - just open the tool and start
              creating beautiful designs immediately.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">🌐</span>
              Works Everywhere
            </h3>
            <p className="text-muted-foreground">
              Access from any device with a web browser - Windows, Mac, Linux,
              tablets, or smartphones. No installation, no compatibility issues,
              always available.
            </p>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          How to Use Our Design Tools
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 1: Choose Your Tool
            </h3>
            <p className="text-muted-foreground">
              Browse our collection of free design tools and select the one that
              fits your needs. Each tool is specialized for specific design
              tasks, from creating favicons to optimizing graphics.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 2: Customize Your Design
            </h3>
            <p className="text-muted-foreground">
              Use the intuitive controls to customize your design. Adjust
              colors, fonts, sizes, and other parameters to match your brand or
              project requirements. See real-time previews as you work.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 3: Download Your Creation
            </h3>
            <p className="text-muted-foreground">
              Once you're satisfied with your design, download it in the format
              you need. Our tools automatically generate all necessary file
              formats and sizes for maximum compatibility.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 4: Implement on Your Project
            </h3>
            <p className="text-muted-foreground">
              Use your downloaded designs in your websites, applications, or
              other projects. Each tool provides implementation guidance and
              best practices to ensure optimal results.
            </p>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Who Can Benefit from These Tools?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Web Designers</h3>
            <p className="text-muted-foreground">
              Create professional graphics and visual assets for client projects
              without expensive software subscriptions. Perfect for freelancers
              and design agencies.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Web Developers</h3>
            <p className="text-muted-foreground">
              Quickly generate design assets needed for web development
              projects. No need to wait for designers or learn complex design
              software.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Small Business Owners</h3>
            <p className="text-muted-foreground">
              Create professional branding materials for your website and online
              presence without hiring expensive designers or buying costly
              software.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">
              Bloggers & Content Creators
            </h3>
            <p className="text-muted-foreground">
              Design custom graphics and visual elements to enhance your content
              and make your blog or website stand out from the competition.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Students & Educators</h3>
            <p className="text-muted-foreground">
              Learn web design principles and create projects without expensive
              software licenses. Perfect for educational environments and
              personal learning.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Marketing Professionals</h3>
            <p className="text-muted-foreground">
              Create branded visual assets for digital marketing campaigns,
              social media, and web properties quickly and efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>
        <Faqs faqs={faqsData} />
      </section>
    </div>
  );
}
