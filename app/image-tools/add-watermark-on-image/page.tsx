import { Metadata } from "next";
import AddWatermarkOnImage from "@/components/image-tools/add-watermark-on-image/AddWatermarkOnImage";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Free Image Watermark Tool - Add Watermark to Images Online ",
  description:
    "Add text or image watermarks to your photos instantly. Protect your images with customizable watermarks. Free online tool with no registration required.",
  keywords:
    "watermark images, add watermark to photos, image watermark tool, text watermark, logo watermark, copyright watermark, protect images, free watermark tool",
  openGraph: {
    title: "Free Image Watermark Tool - Add Watermark to Images Online",
    description:
      "Add text or image watermarks to your photos instantly. Protect your images with customizable watermarks.",
    type: "website",
    url: "https://1000freetools.com/image-tools/add-watermark-on-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/add-watermark-on-image",
  },
};

const relatedTools = [
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
    description: "Extract color codes from images - get HEX, RGB, HSL values",
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
    name: "Blur Image",
    description: "Apply blur effect to images or specific areas",
    href: "/image-tools/blur-image",
  },
];
export default function AddWaterMarkOnImagePage() {
  const faqs = [
    {
      question:
        "How do I add watermark to image online without losing quality?",
      answer:
        "Our tool processes your files locally within your browser, which means it relies on your own device to render the final image. Because no servers compress the files in transit, your final downloaded photo retains the exact dimensions and high resolution of your original upload. You simply adjust the opacity and position, and the output matches your initial quality.",
    },
    {
      question: "Does this tool store my photos on a server?",
      answer:
        "No. All processing happens entirely within the memory of your local web browser. We never upload your sensitive files or the applied watermarks to our servers, ensuring complete privacy from start to finish. Once you close the tab, the image data is completely cleared from your active session.",
    },
    {
      question: "Can I use both a text and a logo on the same image?",
      answer:
        "Currently, the tool supports adding either a custom text string or a single uploaded logo graphic per session. If you need both, we recommend uploading a pre-designed transparent logo file that already includes your desired text. This ensures perfect alignment between your brand mark and your copyright notice.",
    },
    {
      question: "What image formats can I upload to be watermarked?",
      answer:
        "You can upload all standard web and photography formats, including JPG, PNG, and WebP. The application will read these files normally and output a flattened, protected image that is ready for online distribution. The formatting remains consistent so you don't face compatibility issues.",
    },
    {
      question: "How do I make the watermark less distracting?",
      answer:
        "The best way to reduce distraction is by using the opacity slider located in the settings panel. By lowering the opacity to around 30 percent, the watermark becomes semi-transparent. This allows the essential details of your photograph to show through clearly while still providing noticeable copyright protection.",
    },
    {
      question: "Is there a limit to how many photos I can process?",
      answer:
        "There are no usage limits or restrictions on the number of images you can protect using this platform. You can process as many photos as you need, one after another, completely free of charge. We do not enforce any artificial paywalls or demand account registration to unlock continuous usage.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Image Watermarking tool online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Protect your creative work instantly. Apply customizable text and logo
          watermarks directly in your browser without losing quality or
          compromising privacy.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <AddWatermarkOnImage />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            When you share photos or graphics online, they often get downloaded
            or reused without credit. You need a fast way to protect your work
            before uploading it. This tool lets you add watermark to image
            online directly in your browser. It overlays your custom text or
            logo onto your picture without sending anything to a server. You
            maintain full quality of your original file, ensuring your branding
            is secure and your photography stays protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Upload your image locally</strong>
            <br />
            Select the photo you want to protect by clicking the upload area or
            dragging it onto the screen. The image loads securely into your
            browser memory, so there are no slow upload times or privacy
            concerns.
          </p>
          <p className="mb-4">
            <strong>2. Configure your watermark</strong>
            <br />
            Choose to add a text layer or upload a secondary logo image with a
            transparent background. You will see precise controls to adjust the
            font size, pick a contrasting color, and set the opacity slider so
            the mark blends perfectly.
          </p>
          <p className="mb-4">
            <strong>3. Position and download</strong>
            <br />
            Drag your custom text or logo to the exact spot on the canvas, such
            as a corner or directly over the main subject. The live preview
            shows exactly how it will look, and clicking download instantly
            saves the protected file.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Protecting professional photography client proofs</strong>
            <br />
            When sending unedited or draft photos to a client for review, you
            want to prevent unauthorized printing. Adding a semi-transparent
            text watermark across the center ensures they can evaluate the
            composition while preserving your copyright.
          </p>
          <p className="mb-4">
            <strong>Branding e-commerce product images</strong>
            <br />
            Store owners need to stop competitors from stealing their product
            photography. Placing a subtle logo watermark in the bottom corner of
            your catalog shots keeps your brand visible on every listing.
          </p>
          <p className="mb-4">
            <strong>Securing digital art before social media posting</strong>
            <br />
            Artists often struggle with uncredited reposts on platforms like
            Instagram and Twitter. Applying a customized signature watermark
            online guarantees your artwork is permanently tied to your name.
          </p>
          <p className="mb-4">
            <strong>Watermarking real estate listing photos</strong>
            <br />
            Agents invest money in high-quality property pictures that are
            frequently scraped by housing aggregators. Adding your agency logo
            to these real estate photos protects your investment and drives
            leads back to your firm.
          </p>
          <p className="mb-4">
            <strong>Creating meme templates with creator credit</strong>
            <br />
            Content creators who design viral templates want recognition as
            their work spreads. Quickly adding a small social media handle
            watermark ensures you get credit as the image gets shared across
            networks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Text or Logo Toggle</strong>
            <br />
            This switches between typing a custom text string and uploading a
            separate image file to use as the mark. Use text for simple
            copyright notices, and use a logo if you have an established brand
            graphic.
          </p>
          <p className="mb-4">
            <strong>Opacity Slider</strong>
            <br />
            This controls how transparent the watermark appears over your main
            image. Lower settings (around 30-40%) are recommended for center
            placement so the underlying details remain visible.
          </p>
          <p className="mb-4">
            <strong>Color and Font Size</strong>
            <br />
            These options adjust the styling of text watermarks to ensure they
            are readable. Choose a color that contrasts sharply with the area
            behind the text, and scale the font size so it is noticeable but not
            overwhelming.
          </p>
          <p className="mb-4">
            <strong>Drag Positioning</strong>
            <br />
            This allows you to move the overlay anywhere on the image canvas
            freely. Corner placement works best for subtle branding, while
            center placement is ideal for strict copy protection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqs} />
        </section>

        <ToolLinkCards tools={relatedTools} />
      </div>
    </div>
  );
}
