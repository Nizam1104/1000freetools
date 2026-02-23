import ImageToGif from "@/components/image-tools/image-to-gif/ImageToGif";
import Faqs from "@/components/utils/Faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to GIF Online Free | Animated GIF Maker Tool",
  description:
    "Create animated GIFs from multiple images instantly. Free online GIF converter with customizable speed, dimensions, and quality. 100% browser-based processing.",
  authors: [{ name: "1000freetools" }],
  creator: "1000freetools",
  publisher: "1000freetools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://1000freetools.com"),
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-to-gif",
  },
  openGraph: {
    title: "Convert Images to GIF Online Free | Animated GIF Maker",
    description:
      "Create animated GIFs from multiple images instantly. Free online GIF converter with customizable speed, dimensions, and quality.",
    url: "https://1000freetools.com/image-tools/image-to-gif",
    siteName: "1000freetools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image-to-gif.jpg",
        width: 1200,
        height: 630,
        alt: "Convert Images to GIF Online Free Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Images to GIF Online Free | Animated GIF Maker",
    description:
      "Create animated GIFs from multiple images instantly. Free online GIF converter with customizable speed, dimensions, and quality.",
    images: ["/og-image-to-gif.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ImageToGifPage() {
  const faqs = [
    {
      question: "Is this image to GIF maker completely free to use?",
      answer:
        "Yes. Our animated GIF generator is entirely free. You process as many images as you need without encountering watermarks or hidden payment requests.",
    },
    {
      question: "How many images can I combine into a single GIF?",
      answer:
        "You can load up to 50 distinct images into the timeline simultaneously. We recommend utilizing between 15 and 30 frames for the most fluid playback experience.",
    },
    {
      question: "Are my private pictures uploaded to a remote server?",
      answer:
        "No. The conversion algorithms run locally using your device resources. Your photos never leave your active web browser protecting your complete privacy.",
    },
    {
      question: "What image file types does the converter support?",
      answer:
        "The tool recognizes standard formats including JPG, PNG, and WebP natively. You mix and match these varied formats directly within the same animation timeline securely.",
    },
    {
      question: "Can I adjust how fast the animation plays?",
      answer:
        "Yes. You control the specific delay duration between frames directly. You test different timing parameters using the live visual preview before initiating the final download.",
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
          Convert Images to GIF Online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Transform multiple static photos into engaging animated sequences
          instantly. Build custom GIFs entirely in your browser without
          compromising your digital privacy.
        </p>
      </div>

      <div className="container mx-auto py-6 w-full">
        <ImageToGif />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Engage Your Audience with Movement
          </h2>
          <p className="mb-4">
            Movement captures human attention significantly faster than static
            content. When you present products online, demonstrating features
            through a short animation provides immediate clarity for your
            potential customers. A well-constructed GIF illustrates step-by-step
            processes concisely, effectively replacing lengthy paragraphs of
            descriptive text. You enhance educational materials, software
            tutorials, and marketing emails rapidly by converting your sequence
            of instructional screenshots into a universally supported moving
            image.
          </p>
          <p className="mb-4">
            Video files often present compatibility issues across different
            digital ecosystems. Certain email clients block embedded videos
            automatically. Social media platforms frequently struggle processing
            heavy video formats optimally. A standard animated GIF sidesteps
            these technical obstacles reliably. They function natively across
            almost every digital communication platform available today. Your
            animations play instantly on smartphones, tablets, and legacy
            desktops alike without requiring supplementary media players.
          </p>
          <p className="mb-4">
            Processing multiple images into an animation traditionally
            necessitated installing heavy, complex desktop applications. These
            programs frequently feature steep learning curves and significant
            hardware requirements. Our modern web-based approach mitigates these
            barriers effectively. We provide explicit timeline controls right
            inside your browser window. You construct dynamic visual content
            securely utilizing your existing personal libraries. Because
            everything evaluates locally, your sensitive graphical assets remain
            completely private on your host machine.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            Initiating your animation project requires only your base images.
            You drag matching photos directly from your file manager onto our
            clearly defined drop zone. The system detects standard file
            extensions like JPG, PNG, and WebP automatically. The interface then
            arrays all uploaded visual assets onto an interactive graphical
            timeline. You reorganize the exact playing order instantly simply by
            dragging the preview tiles into new positions.
          </p>
          <p className="mb-4">
            Fine tuning the visual playback serves as the core step for premium
            results. You examine the provided settings panel to adjust the frame
            delay interval. This determines the specific duration each distinct
            image remains visible before transitioning. You click the preview
            button frequently to observe the impact of your modifications.
            Adjusting the target width and height constraints controls the
            overall physical footprint of the final file. You select lower
            scaling parameters specifically when generating animations for
            restrictive email marketing campaigns.
          </p>
          <p className="mb-4">
            Finalizing your production takes only a single action. When the
            preview loop accurately reflects your intentions, you press the
            convert button. The client-side engine rapidly stitches the
            individual frames together employing standard graphical encoding
            routines. A download dialog appears immediately upon completion. You
            save the finalized animated sequence directly to your local file
            system, ready for immediate digital distribution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This specialized assembly application functions primarily as a frame
            sequence engine. It ingests independent, differently formatted
            visual data points and homogenizes them into a single, standardized
            moving container. The native JavaScript operations manage the
            complexity of matching color palettes and timing metadata
            exclusively utilizing your device processor. This direct approach
            yields exceptionally fast rendering times, avoiding the network
            latency inherent in cloud-based conversion platforms entirely.
          </p>
          <p className="mb-4">
            The platform grants granular control concerning repetition
            parameters. You instruct the finalized animation to loop
            continuously or configure it to pause after a predetermined number
            of cycles. Accommodating varied image resolutions seamlessly
            presents another core functionality. The engine automatically scales
            differently sized uploads onto a uniform canvas background,
            guaranteeing a stable, non-stuttering viewing experience for your
            final audience. You never crop photos identically prior to
            uploading.
          </p>
          <p className="mb-4">
            Optimized memory management enables extensive project capabilities.
            You process up to fifty individual frames efficiently without
            locking your active browser sessions. We developed this utility
            specifically for robust productivity environments, completely
            removing unnecessary cosmetic functions that dilute processing
            speeds. You generate lightweight, communicative graphical animations
            perpetually free of imposed limitations or forced subscription
            models.
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
