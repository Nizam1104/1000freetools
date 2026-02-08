import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";

// Image tools available
const imageTools = [
  {
    toolName: "Image Compressor",
    toolDescription:
      "Compress images online with advanced algorithms - reduce file size up to 80% without losing quality",
    toolLink: "/image-tools/image-compressor",
  },
];

export const metadata: Metadata = {
  title: "Free Image Tools Online - Compress, Optimize & Convert Images",
  description:
    "Professional image tools for web optimization. Compress, convert etc images for web - absolutely free. Support for JPEG, PNG, WebP, AVIF and more.",
  keywords: [
    "free image tools",
    "image compressor online",
    "compress images free",
    "image optimizer",
    "photo compression tool",
    "bulk image compressor",
    "image converter online",
    "optimize images for web",
    "reduce image size",
    "free image editing tools",
    "batch image processor",
    "webp converter",
    "avif compressor",
  ],
  openGraph: {
    title: "Free Image Tools Online - Compress, Optimize & Convert Images",
    description:
      "Professional image optimization tools for web designers and developers. Compress images, convert formats, and optimize photos - all free with unlimited usage.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Tools Online - Compress, Optimize & Convert Images",
    description:
      "Professional image optimization tools for web designers and developers. Compress images, convert formats, and optimize photos - all free with unlimited usage.",
  },
  alternates: {
    canonical: "https://www.1000freetools.com/image-tools",
  },
};

export default function ImageToolsPage() {
  const faqsData = [
    {
      question: "What image tools are available on this platform?",
      answer:
        "We offer a comprehensive suite of free image tools including our advanced Image Compressor that supports multiple formats (JPEG, PNG, WebP, AVIF, QOI, JXL, WP2). Our tools help you compress images, convert between formats, optimize photos for web, and reduce file sizes - all with professional-grade results.",
    },
    {
      question: "Are these image tools really free with no limits?",
      answer:
        "Yes! All our image tools are completely free with no file size limits, no daily usage caps, and no hidden fees. You can compress 50 images at once, or even more if needed. Process hundreds of images, convert formats, and optimize photos as much as you want - forever free.",
    },
    {
      question: "Can I compress images without losing quality?",
      answer:
        "Absolutely! Our image compressor offers both lossless compression (no quality loss) and lossy compression (smaller files with minimal visible quality reduction). You can compress images to reduce file size by up to 80% while maintaining excellent visual quality. Perfect for web optimization where both quality and performance matter.",
    },
    {
      question: "What image formats do you support?",
      answer:
        "We support all major image formats including JPEG/JPG, PNG, WebP, AVIF, QOI, JXL, and WP2. You can also convert between formats - for example, convert JPG to WebP, compress PNG to AVIF, or optimize images in their original format. Our tools handle transparency, color profiles, and metadata correctly.",
    },
    {
      question: "Can I compress multiple images at once?",
      answer:
        "Yes! Our bulk image compressor lets you process multiple images simultaneously. Simply drag and drop all your files, adjust your settings once, and compress them all together. Download individually or as a convenient ZIP file. Perfect for batch processing photo galleries, product images, or entire website image libraries.",
    },
    {
      question: "Are my images stored on your servers?",
      answer:
        "No. All image processing happens directly in your browser using advanced Web Workers technology. Your photos never leave your device, ensuring complete privacy and security. Once you close the browser tab, all data is immediately deleted. We don't store, track, or have access to any of your images.",
    },
    {
      question: "How does image compression improve website performance?",
      answer:
        "Compressed images load faster, which improves page speed, reduces bandwidth usage, and enhances user experience. Faster loading times also improve SEO rankings and Core Web Vitals scores. By optimizing images for web, you can reduce page load times by 50-80%, leading to better engagement, lower bounce rates, and higher conversion rates.",
    },
    {
      question: "Can I use these tools for commercial projects?",
      answer:
        "Yes! Our image tools are free for both personal and commercial use. Whether you're optimizing images for client websites, preparing product photos for e-commerce, or reducing file sizes for email marketing, you can use our tools without attribution or licensing fees.",
    },
    {
      question: "What's the difference between JPEG, WebP, and AVIF?",
      answer:
        "JPEG is the most widely supported format, great for photos with good compression. WebP offers 25-35% better compression than JPEG with similar quality and works in all modern browsers. AVIF provides even better compression (up to 50% smaller than JPEG) with excellent quality but has slightly less browser support. Our tools let you convert and compare formats to choose the best option for your needs.",
    },
    {
      question: "Can I compress images to a specific file size?",
      answer:
        "Yes! You can adjust quality settings to compress images to specific target sizes. For example, compress PNG to 100KB, reduce images to 20KB for thumbnails, or optimize photos to meet specific platform requirements. Our tools give you precise control over output file size while maintaining the best possible quality.",
    },
    {
      question: "Do you preserve image transparency when compressing?",
      answer:
        "Yes! Our image compressor automatically detects and preserves transparency in PNG, WebP, and other formats that support alpha channels. You can compress transparent images without losing the transparency layer, making it perfect for logos, icons, and graphics with transparent backgrounds.",
    },
    {
      question: "What image tools are you planning to add?",
      answer:
        "We're constantly expanding our image tools collection. Upcoming tools include image resizers, format converters, watermark tools, image editors, background removers, and more. Each tool is designed to solve real challenges faced by web designers, developers, and content creators.",
    },
  ];

  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Free Image Tools | 1000FreeTools
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Professional image optimization tools that help you compress images,
            convert formats, and optimize photos for web performance. Reduce
            file sizes by up to 80% without losing quality - completely free
            with no limits.
          </p>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          Available Image Tools
        </h2>
        <ToolLinkCards tools={imageTools} />
      </section>

      {/* Why Optimize Images Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Why Optimize Your Images?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">⚡</span>
              Faster Page Load Speed
            </h3>
            <p className="text-muted-foreground">
              Optimized images load 3-5x faster than uncompressed ones. Reducing
              image file sizes dramatically improves page speed, leading to
              better user experience and lower bounce rates.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">📈</span>
              Better SEO Rankings
            </h3>
            <p className="text-muted-foreground">
              Google uses page speed as a ranking factor. Compressed images
              improve Core Web Vitals scores, helping your website rank higher
              in search results and attract more organic traffic.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">💾</span>
              Reduced Bandwidth Costs
            </h3>
            <p className="text-muted-foreground">
              Smaller images consume less bandwidth, reducing hosting costs and
              data usage. This is especially important for high-traffic websites
              and users on mobile connections.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">📱</span>
              Better Mobile Experience
            </h3>
            <p className="text-muted-foreground">
              Mobile users benefit most from optimized images. Compressed photos
              load quickly even on slower connections, improving mobile
              engagement and conversion rates.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">💰</span>
              Lower Storage Costs
            </h3>
            <p className="text-muted-foreground">
              Compressed images take up less storage space on servers and in
              backups. Save money on cloud storage and reduce backup times with
              optimized image libraries.
            </p>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <span className="text-primary text-2xl">🎯</span>
              Professional Quality
            </h3>
            <p className="text-muted-foreground">
              Our advanced compression algorithms reduce file size by up to 80%
              while maintaining excellent visual quality. Your images look
              professional on any device.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Powerful Image Optimization Features
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Batch Image Compression
            </h3>
            <p className="text-muted-foreground">
              Process multiple images simultaneously with our bulk image
              compressor. Upload 50+ images at once and compress them all
              together. Perfect for optimizing entire photo galleries, product
              catalogs, or website image libraries in minutes.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Multiple Format Support
            </h3>
            <p className="text-muted-foreground">
              Support for all major image formats including JPEG, PNG, WebP,
              AVIF, QOI, JXL, and WP2. Convert between formats while compressing
              - for example, convert JPG to WebP for better web performance or
              compress PNG to AVIF for maximum efficiency.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Lossless & Lossy Compression
            </h3>
            <p className="text-muted-foreground">
              Choose lossless compression for perfect quality preservation, or
              use lossy compression with adjustable quality settings to achieve
              smaller file sizes. Our advanced algorithms ensure minimal visible
              quality loss even at high compression ratios.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Advanced Compression Engines
            </h3>
            <p className="text-muted-foreground">
              Powered by industry-leading compression libraries including
              MozJPEG for superior JPEG compression, advanced WebP encoding, and
              cutting-edge AVIF compression. Get the best possible file size
              reduction with professional quality results.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Transparency Preservation
            </h3>
            <p className="text-muted-foreground">
              Automatically detect and preserve transparency in PNG, WebP, and
              other formats that support alpha channels. Compress logos, icons,
              and graphics with transparent backgrounds without losing the
              transparency layer.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">No File Size Limits</h3>
            <p className="text-muted-foreground">
              Unlike other services, we don't impose file size or quantity
              limits. Compress large high-resolution photos, process hundreds of
              images in bulk, or optimize entire image libraries - all
              completely free with unlimited usage.
            </p>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          How to Use Our Image Tools
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 1: Upload Your Images
            </h3>
            <p className="text-muted-foreground">
              Drag and drop your images into the upload area, or click to browse
              and select files from your computer. You can upload single images
              or multiple files for batch processing. All processing happens in
              your browser for maximum privacy.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 2: Choose Your Settings
            </h3>
            <p className="text-muted-foreground">
              Select your output format (JPEG, PNG, WebP, AVIF, etc.), choose
              between lossless or lossy compression, and adjust quality settings
              to meet your needs. Preview the results in real-time to find the
              perfect balance between file size and quality.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 3: Compress Your Images
            </h3>
            <p className="text-muted-foreground">
              Click the compress button and watch as our advanced algorithms
              optimize your images. Processing happens instantly in your browser
              using Web Workers, so even large batches complete in seconds
              without uploading to any server.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <h3 className="font-semibold text-xl mb-2">
              Step 4: Download Optimized Images
            </h3>
            <p className="text-muted-foreground">
              Download your compressed images individually or as a convenient
              ZIP file for batch downloads. Use them on your website, in emails,
              on social media, or anywhere you need optimized, fast-loading
              images.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Perfect For Every Use Case
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Web Designers</h3>
            <p className="text-muted-foreground">
              Optimize images for client websites to improve performance and
              SEO. Compress photos, convert formats, and ensure fast page load
              times across all devices.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Web Developers</h3>
            <p className="text-muted-foreground">
              Integrate optimized images into web applications and websites.
              Batch process image libraries and convert to modern formats like
              WebP and AVIF for better performance.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">E-commerce Stores</h3>
            <p className="text-muted-foreground">
              Compress product photos to improve page speed and conversion
              rates. Faster loading product images lead to better user
              experience and higher sales.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Photographers</h3>
            <p className="text-muted-foreground">
              Optimize photos for web galleries and client delivery. Reduce file
              sizes for faster uploads while maintaining professional image
              quality.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">
              Bloggers & Content Creators
            </h3>
            <p className="text-muted-foreground">
              Compress images for blog posts and articles to improve page speed
              and SEO. Smaller images mean faster loading times and better
              search rankings.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Social Media Managers</h3>
            <p className="text-muted-foreground">
              Optimize images for social media platforms. Reduce file sizes to
              meet platform requirements and ensure fast uploads even on mobile
              connections.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Email Marketers</h3>
            <p className="text-muted-foreground">
              Compress images for email campaigns to reduce email size and
              improve deliverability. Smaller images load faster in email
              clients and improve engagement.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">Digital Agencies</h3>
            <p className="text-muted-foreground">
              Batch process client images for multiple projects. Save time and
              improve workflow efficiency with unlimited free image compression.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-xl">App Developers</h3>
            <p className="text-muted-foreground">
              Optimize app assets and images to reduce app size and improve
              performance. Smaller images mean faster app downloads and better
              user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          All Image Formats Supported
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-xl mb-3">JPEG / JPG</h3>
            <p className="text-muted-foreground">
              The most widely used format for photos. Our MozJPEG engine
              provides superior compression with excellent quality. Perfect for
              photographs and images with gradients.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-xl mb-3">PNG</h3>
            <p className="text-muted-foreground">
              Lossless format with transparency support. Ideal for logos, icons,
              and graphics. Our tools preserve transparency while reducing file
              size significantly.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-xl mb-3">WebP</h3>
            <p className="text-muted-foreground">
              Modern format with 25-35% better compression than JPEG. Supported
              by all modern browsers. Great for web optimization with excellent
              quality-to-size ratio.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-xl mb-3">AVIF</h3>
            <p className="text-muted-foreground">
              Next-generation format with up to 50% better compression than
              JPEG. Excellent quality at very small file sizes. Perfect for
              modern web applications.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-xl mb-3">QOI</h3>
            <p className="text-muted-foreground">
              Quite OK Image format - simple, fast, and lossless. Great for
              applications that need quick encoding/decoding with reasonable
              compression.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-xl mb-3">JXL & WP2</h3>
            <p className="text-muted-foreground">
              Emerging formats with advanced compression capabilities. Support
              for both lossy and lossless compression with excellent quality
              preservation.
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
