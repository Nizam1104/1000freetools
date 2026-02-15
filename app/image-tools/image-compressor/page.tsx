import ImageCompressor from "@/components/image-tools/image-compressor/ImageCompressor";
import Faqs from "@/components/utils/Faqs";
import NextImage from "next/image";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Image Compressor - Reduce File Size Online",
  description:
    "Compress images online while maintaining quality. Supports JPEG, PNG, WebP, and AVIF formats. Process single images or batch compress up to 50 files at once.",
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-compressor",
  },
};

const moreTools = [
  {
    name: "Favicon Generator",
    description: "Create Favicon for your website",
    href: "/design-tools/favicon-generator",
  },
  {
    name: "Video Compressor",
    description: "In browser video compression without limits",
    href: "/video-tools/video-compressor",
  },
];

export default function ImageCompressorPage() {
  const faqsData = [
    {
      question: "How does image compression work?",
      answer:
        "Image compression reduces file size by removing redundant data or optimizing how information is stored. Lossless compression preserves all original data, while lossy compression achieves smaller files by discarding some information that's less noticeable to the human eye.",
    },
    {
      question: "Will compression affect image quality?",
      answer:
        "It depends on your settings. Lossless compression maintains perfect quality. Lossy compression at 80-90% quality typically produces excellent results with significant file size reduction. Lower quality settings will show more visible differences.",
    },
    {
      question: "What formats are supported?",
      answer:
        "We support JPEG, PNG, WebP, AVIF, QOI, JXL, and WebP2. You can also convert between formats - for example, converting a PNG to WebP often results in smaller files.",
    },
    {
      question: "How many images can I process at once?",
      answer:
        "You can compress up to 50 images simultaneously using the bulk processing mode. There are no daily limits or signup requirements.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. All compression happens directly in your browser. Your images are never uploaded to our servers, ensuring complete privacy. When you close the tab, all data is immediately cleared.",
    },
    {
      question: "Which format should I choose?",
      answer:
        "JPEG works well for photos and is universally supported. WebP offers better compression with wide browser support. AVIF provides the best compression but has slightly less browser support. PNG is best for images with transparency or text.",
    },
    {
      question: "Can I resize images while compressing?",
      answer:
        "Yes. In the advanced options, you can set maximum width and height dimensions. The tool will resize images proportionally while maintaining aspect ratio.",
    },
    {
      question: "Why use this over other tools?",
      answer:
        "This tool runs entirely in your browser for privacy, supports modern formats like AVIF and WebP2, offers both single and batch processing, and provides advanced options for fine-tuning compression settings. Plus, it's completely free with no restrictions.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="prose max-w-4xl mx-auto px-4 text-foreground">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-foreground">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/image-tools" className="text-foreground">
                  Image Tools
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/image-tools/image-compressor"
                  className="text-foreground"
                >
                  Image Compressor
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="text-2xl font-semibold mt-4 mb-4 text-foreground">
          Compress Images Online
        </h1>
        <p className="mb-6 text-foreground">
          Reduce image file sizes while maintaining quality. Supports all major
          formats including JPEG, PNG, WebP, and AVIF. Process single images or
          batch compress up to 50 files at once.
        </p>

        <ImageCompressor />

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
          Why Compress Images?
        </h2>
        <p className="mb-4 text-foreground">
          Large image files slow down websites, consume storage space, and take
          longer to upload or share. Compression helps you:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground">
          <li>Improve website loading speed and SEO rankings</li>
          <li>
            Save storage space - reduce file sizes by 50-80% while maintaining
            visual quality
          </li>
          <li>Share files faster via email, messaging, or cloud storage</li>
          <li>Reduce bandwidth usage on mobile devices</li>
        </ul>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
            Before and After Comparison
          </h2>
          <p className="mb-4 text-foreground">
            Here's a real example showing the original 4MB image compared to the
            compressed 700KB version. Notice how visual quality remains high
            while file size drops significantly.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <NextImage
                src="https://cdn.1000freetools.com/static-assets/on-page-images/image-compressor-original-image.png"
                alt="Original 4MB image"
                width={400}
                height={300}
              />
              <p className="text-sm mt-2 text-foreground">Original: 4MB</p>
            </div>
            <div className="flex-1">
              <NextImage
                src="https://cdn.1000freetools.com/static-assets/on-page-images/image-compressor-after-image.png"
                alt="Compressed 700KB image"
                width={400}
                height={300}
              />
              <p className="text-sm mt-2 text-foreground">
                Compressed: 700KB (82% smaller)
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground">
            Photo by{" "}
            <a
              href="https://unsplash.com/@jpsmedia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className="text-primary hover:underline"
            >
              Jack Stapleton
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/photos/two-black-cars-parked-on-a-street-t2BHviYqB1g?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className="text-primary hover:underline"
            >
              Unsplash
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
          How to Use
        </h2>
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground">
          <li>
            Upload your image(s) by dragging and dropping or clicking to browse
          </li>
          <li>
            Adjust the quality slider (80-90% recommended for most uses) and
            select your preferred output format
          </li>
          <li>Click "Compress Image" and download the result</li>
        </ol>
        <p className="mb-6 text-foreground">
          For batch processing, switch to "Bulk Processing" mode to handle
          multiple images at once. You can download files individually or as a
          ZIP archive.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
          Key Features
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground">
          <li>Single or batch processing (up to 50 images)</li>
          <li>Multiple format support: JPEG, PNG, WebP, AVIF, and more</li>
          <li>Adjustable quality settings and advanced options</li>
          <li>Optional image resizing while compressing</li>
          <li>Client-side processing - your images never leave your device</li>
          <li>No file size limits, registration, or usage restrictions</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
          Choosing the Right Format
        </h2>
        <p className="mb-4 text-foreground">
          Different formats work better for different use cases:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground">
          <li>
            <strong className="text-foreground">JPEG</strong> - Best for
            photographs. Universally supported but doesn't handle transparency
          </li>
          <li>
            <strong className="text-foreground">PNG</strong> - Ideal for images
            with transparency, text, or sharp edges. Larger file sizes than JPEG
          </li>
          <li>
            <strong className="text-foreground">WebP</strong> - Modern format
            with excellent compression and quality. Supported by all current
            browsers
          </li>
          <li>
            <strong className="text-foreground">AVIF</strong> - Newest format
            offering superior compression. Growing browser support
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
          Frequently Asked Questions
        </h2>

        <Faqs faqs={faqsData} />

        <section className="mt-8">
          <ToolLinkCards tools={moreTools} />
        </section>

        <div className="mt-8 p-4 rounded-lg text-sm border text-foreground">
          <p>
            <strong>Attribution:</strong> This tool uses compression libraries
            from{" "}
            <a
              href="https://github.com/GoogleChromeLabs/squoosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Squoosh
            </a>
            , an image compression tool developed by Google Chrome Labs.
          </p>
        </div>
      </div>
    </div>
  );
}
