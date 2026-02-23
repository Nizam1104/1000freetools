import ChangeImageDimensions from "@/components/image-tools/change-image-dimensions/ChangeImageDimensions";
import Faqs from "@/components/utils/Faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Resizer - Resize Image Dimensions Online ",
  description:
    "Resize image dimensions quickly and easily online. Change image width and height without losing quality. Free tool with no registration required.",
  keywords:
    "resize image, change image dimensions, image resizer online, scale photo, change width and height, free photo resizer, image scalar",
  openGraph: {
    title: "Free Image Resizer - Resize Image Dimensions Online",
    description:
      "Resize image dimensions quickly and easily online. Change image width and height securely in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/resize-image-dimensions",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/resize-image-dimensions",
  },
};

export default function ChangeImageDimensionsPage() {
  const faqs = [
    {
      question:
        "Is this photo dimension resizer completely free to use without watermarks?",
      answer:
        "Yes, our robust image resizing tool is entirely free for limitless use. You encounter literally no hidden fees, mandatory registrations, or ugly promotional watermarks forcefully applied to your final downloaded graphics.",
    },
    {
      question:
        "Will the photograph drastically distort when I change the dimensions?",
      answer:
        "You easily avoid all visual distortion by keeping the aspect ratio lock engaged. If you explicitly unlock the ratio sequence and type forcefully disproportionate width and height numbers, the image will stretch awkwardly.",
    },
    {
      question:
        "What specific digital image formats are accepted by the resizer?",
      answer:
        "The application natively handles standard graphic formats including high-resolution JPG, transparent PNG, and modern WebP. You execute dimensional processing on these distinct file extensions seamlessly.",
    },
    {
      question:
        "Does the dimension modifier tool forcibly upload my images to a server?",
      answer:
        "No. The dedicated application processes your heavy files entirely locally within your active web browser memory. Your highly private photography remains completely secure and isolated on your personal hard drive.",
    },
    {
      question:
        "Can I artificially increase the physical size of a tiny thumbnail image?",
      answer:
        "Yes, you can aggressively scale small images upward. However, increasing the raw pixel dimensions drastically beyond the source file's original mathematical limits will inherently result in a softer or noticeably pixelated final appearance.",
    },
    {
      question:
        "Is there a strict limit on how many images I can resize consecutively?",
      answer:
        "There are zero artificial usage caps programmed into the platform. Because the dimensional calculations occur purely on your local machine, you can freely resize hundreds of completely separate files continuously all day.",
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
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Online Image Resizer
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Change the width and height of your photos instantly. Scale image
          dimensions directly in your browser while maintaining optimal quality
          and complete privacy.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <ChangeImageDimensions />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Uploading an oversized photograph to a professional portfolio often
            breaks the entire website layout or drastically tanks the loading
            speed. This fast utility allows you to confidently resize image
            dimensions directly within your internet browser. It calculates and
            redraws the exact pixel width and height of any JPG, PNG, or WebP
            file instantaneously. By leveraging secure, client-side math, it
            guarantees perfect aspect ratios and zero distortion without ever
            uploading your private pictures to a remote processing server.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Select your target image</strong>
            <br />
            Simply pull a massive photograph directly from your desktop and drop
            it into the designated canvas box. The underlying software instantly
            maps the file locally, displaying your original massive pixel width
            and height clearly on the interactive dashboard.
          </p>
          <p className="mb-4">
            <strong>2. Define exact new dimensions</strong>
            <br />
            Navigate to the prominent input boxes and type your desired new
            width. If the aspect ratio lock remains secured, the application
            automatically computes the mathematically perfect height to prevent
            your subjects from stretching or looking horribly squished.
          </p>
          <p className="mb-4">
            <strong>3. Download the optimized sizing</strong>
            <br />
            Verify the updated dimensions on the live preview screen, then
            simply touch the prominent download button. The scripting engine
            builds the correctly sized file dynamically and saves the flawlessly
            proportioned result directly into your local downloads folder.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>
              Prepping massive hero images for fast website loading
            </strong>
            <br />
            Inserting a 6000-pixel digital camera shot directly into a website
            header destroys your crucial SEO speed metrics. Forcing the picture
            down to a manageable 1920-pixel width permanently fixes the loading
            bottleneck while remaining beautifully crisp on standard user
            monitors.
          </p>
          <p className="mb-4">
            <strong>
              Meeting strict passport and visa portal requirements
            </strong>
            <br />
            Government immigration portals frequently reject user uploads
            aggressively if the uploaded headshot exceeds highly specific pixel
            dimensions. Constraining the physical width and height precisely to
            their mandated limits guarantees your application submission
            processes without triggering frustrating generic software errors.
          </p>
          <p className="mb-4">
            <strong>
              Scaling digital artwork for uniform social media feeds
            </strong>
            <br />
            Instagram aggressively crops unpredictable rectangular artwork,
            utterly ruining carefully composed borders. Resizing your distinct
            illustrations beforehand into strict 1080x1080 or 1080x1350 pixel
            squares forces the social platform to display the entire piece
            exactly as the artist intended initially.
          </p>
          <p className="mb-4">
            <strong>
              Reducing physical footprint for basic email attachments
            </strong>
            <br />
            Attempting to attach four original smartphone photographs frequently
            bounces the email entirely due to massive server limitations.
            Shrinking the overall dimensions significantly chops away
            unnecessary raw data, allowing the entire album to fly through the
            corporate email firewall cleanly and effortlessly.
          </p>
          <p className="mb-4">
            <strong>
              Fitting custom wallpapers to obscure dual-monitor setups
            </strong>
            <br />
            Downloading a standard wallpaper rarely fits correctly across two
            different sized screens running simultaneously. Unlocking the aspect
            ratio and forcefully typing the exact combined width of both
            monitors produces a perfect, uninterrupted background graphic
            spanning the entire complex workspace setup.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Width and Height Inputs</strong>
            <br />
            These are the absolute pixel values denoting how much physical
            screen real estate the digital file commands. Smaller numbers equal
            a lighter, faster-loading file, while larger numbers retain critical
            microscopic details suitable for high-end professional printing
            operations.
          </p>
          <p className="mb-4">
            <strong>Aspect Ratio Lock Toggle</strong>
            <br />
            This critical safety switch mathematically links the width and
            height together flawlessly. Disabling it allows you to stretch a
            square into a long rectangle, which frequently distorts recognizable
            human faces or bends perfectly straight architectural lines
            unnaturally.
          </p>
          <p className="mb-4">
            <strong>Live Visual Preview</strong>
            <br />
            This reactive area updates the perceived sharpness and framing
            immediately based directly upon the numbers you type. It serves as
            your primary defense against accidentally creating a heavily
            pixelated, unusable mess before committing to the final local
            download.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqs} />
        </section>
      </div>
    </div>
  );
}
