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
    description: "Compress videos online - reduce file size, No size limit",
    href: "/video-tools/video-compressor",
  },
];

export default function ImageCompressorPage() {
  const faqsData = [
    {
      question:
        "Will using a tool to compress images online ruin my photo quality?",
      answer:
        "It depends entirely on the settings you choose. If you select lossless compression, the quality remains mathematically identical to the original. For standard lossy compression at 80-90% quality, the visual difference is virtually unnoticeable to the human eye, but the file size reduction is massive.",
    },
    {
      question: "Are my personal pictures uploaded to a remote server?",
      answer:
        "No, all compression tasks happen directly within your own web browser using your device's memory. Your personal photos are never uploaded or stored on an external database, which guarantees absolute privacy for your sensitive or proprietary images.",
    },
    {
      question: "How many images can I compress at the same time?",
      answer:
        "You can securely upload and process up to 50 images simultaneously using our bulk processing feature. The tool will process them in a queue using your local hardware, and you can download them all at once in a single, organized ZIP file.",
    },
    {
      question: "Which image format will give me the smallest file size?",
      answer:
        "AVIF and WebP generally offer the best compression ratios for modern web use, creating significantly smaller files than traditional formats. However, if you need guaranteed compatibility across very old systems or specific offline software, standard JPEG is still highly recommended.",
    },
    {
      question: "Can I also change the image dimensions while compressing?",
      answer:
        "Yes, the advanced settings panel includes a resizing feature. You can input a maximum width or height, and the software will proportionally scale down the image resolution before applying the final compression algorithm.",
    },
    {
      question: "Is there a maximum file size limit for uploads?",
      answer:
        "Because the application runs on your local client-side hardware rather than our servers, we do not enforce any strict file size limits. You can process heavy, high-megapixel files as long as your computer has enough available RAM to load them.",
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

        <section>
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Huge raw photos take up too much storage space and make websites
            load incredibly slowly. This tool allows you to compress images
            online directly within your web browser without relying on cloud
            processing. It dramatically reduces your file sizes while
            maintaining excellent visual quality so you can email attachments
            easily and hit necessary upload limits. The local processor supports
            bulk compression of up to 50 files simultaneously in formats like
            JPEG, PNG, WebP, and AVIF.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Upload single or multiple files</strong>
            <br />
            Select files from your computer or drag an entire folder of up to 50
            images into the drop zone. The system imports them instantly into
            your browser memory, bypassing slow internet upload speeds
            completely.
          </p>
          <p className="mb-4">
            <strong>2. Adjust the compression strength</strong>
            <br />
            Use the quality slider to find the perfect balance between file size
            and visualization. A setting around 80-85% usually drops the file
            size massively while keeping the image crisp enough for web display.
          </p>
          <p className="mb-4">
            <strong>3. Compare and download</strong>
            <br />
            Review the live preview showing the original vs compressed version
            and check the final estimated file size. Once satisfied, click
            download to save the optimized file, or hit download all to get a
            ZIP folder in bulk mode.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Speeding up WordPress website loading times</strong>
            <br />
            Heavy hero graphics block the browser from rendering your content
            quickly, hurting your SEO rankings. Compressing these large banners
            into modern WebP formats ensures your webpage passes technical speed
            audits without looking blurry.
          </p>
          <p className="mb-4">
            <strong>Bypassing email attachment size limits</strong>
            <br />
            Standard email clients restrict attachments to 25MB, which prevents
            you from sending multiple raw event photos. Running the batch
            through this optimizer drastically shrinks the footprint, letting
            you attach entire albums to a single email.
          </p>
          <p className="mb-4">
            <strong>Saving smartphone and hard drive storage</strong>
            <br />
            Photographers frequently run out of local disk space due to massive
            high-resolution catalogs. Archiving older portfolios using subtle
            lossy compression frees up gigabytes of drive space without
            destroying the historical visual record.
          </p>
          <p className="mb-4">
            <strong>Optimizing app assets for faster downloads</strong>
            <br />
            Mobile developers need their application bundles to be as small as
            possible to encourage user downloads. You use this tool to crunch
            heavy UI graphics and background elements down to their minimum
            viable size using AVIF encoding.
          </p>
          <p className="mb-4">
            <strong>Meeting strict document portal requirements</strong>
            <br />
            Government or immigration portals consistently reject passport scans
            or ID photos that exceed 2MB. Dragging the scan into the interface
            allows you to dial the quality slider down until it perfectly meets
            the strict size requirement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Quality Slider (0-100)</strong>
            <br />
            This dictates how aggressively the algorithm removes data from your
            picture. A value of 100 applies zero lossy compression, while values
            below 70 will introduce noticeable pixelation. 85 is the recommended
            value for most standard web applications.
          </p>
          <p className="mb-4">
            <strong>Output Format Selector</strong>
            <br />
            This dropdown changes the file type of your final downloaded
            graphic. Stick with JPEG for standard compatibility, switch to PNG
            if you need to preserve transparent backgrounds, or choose WebP for
            the best size-to-quality ratio on modern browsers.
          </p>
          <p className="mb-4">
            <strong>Resize Dimensions (Advanced)</strong>
            <br />
            This allows you to scale down the actual pixel width and height of
            the image before compressing it. Halving the dimensions of a massive
            4K photo will result in an astronomically smaller text file size
            than compression alone.
          </p>
          <p className="mb-4">
            <strong>Bulk Mode Toggle</strong>
            <br />
            This switches the interface from a detailed single-image preview
            into a list-based queue manager. Use this when you have an entire
            folder of graphics that all need the exact same optimization
            settings applied simultaneously.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>

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
