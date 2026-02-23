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
      question:
        "Is it really possible to convert images to GIF online free without watermarks?",
      answer:
        "Yes, our animated GIF generator is completely free and unmetered. You can process folders of up to 50 images into a dynamic animation without encountering mandatory payments, hidden subscriptions, or forced promotional watermarks on your final file.",
    },
    {
      question: "How many individual photos can I combine into a single GIF?",
      answer:
        "You can securely drag and drop up to 50 distinct images into the timeline simultaneously. For the smoothest and most fluid playback experience, we generally recommend utilizing between 15 and 30 high-quality frames per animation.",
    },
    {
      question:
        "Are my private family pictures uploaded to a remote server for processing?",
      answer:
        "No. All frame sequencing and rendering algorithms run strictly locally using your device's native hardware resources. Your personal photos never leave your active web browser window, guaranteeing complete privacy and security.",
    },
    {
      question: "What image formats can I upload into the animation maker?",
      answer:
        "The timeline natively recognizes and imports standard image formats including JPG, PNG, and WebP flawlessly. You can even mix and match these varied formats directly within the exact same animation sequence without causing playback errors.",
    },
    {
      question: "Can I adjust how fast the customized animation plays?",
      answer:
        "Yes, the interface provides a dedicated millisecond delay slider. You can manually control the specific duration each distinct image remains visible, testing entirely different timing parameters via the live visual preview before initiating your final download.",
    },
    {
      question:
        "Will the final GIF shrink the resolution of my uploaded photos?",
      answer:
        "The software automatically scales differently sized uploads onto a uniform canvas background to prevent stuttering. You have direct control over the target width and height constraints to determine the exact pixel dimensions of the generated file.",
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
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Sometimes explaining a process with static screenshots is confusing,
            but sending a massive video file is impossible due to email limits.
            Our tool allows you to convert images to GIF online free directly
            inside your web browser. It instantly strings up to 50 static JPG,
            PNG, or WebP photos together into a smoothly looping animation.
            Processing happens entirely on your local hardware, granting you
            precise control over frame delays and final dimensions without
            compromising the privacy of your original files.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Upload your image sequence</strong>
            <br />
            Drag a folder containing your sequence of photos directly into the
            designated drop zone on the screen. The interface will instantly
            array all the detected visual assets onto an interactive graphical
            timeline below the preview window.
          </p>
          <p className="mb-4">
            <strong>2. Organize frames and adjust timing</strong>
            <br />
            Reorganize the playing order simply by dragging the preview tiles
            left or right. Use the delay slider to set the exact millisecond
            duration each image should remain on screen, constantly testing the
            flow using the live preview canvas.
          </p>
          <p className="mb-4">
            <strong>3. Set dimensions and download</strong>
            <br />
            Input your desired final width and height for the animation to
            ensure it fits your intended platform perfectly. Once the preview
            loop looks flawless, click the convert button to instantly generate
            and download the completed animated file.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Demonstrating software features in documentation</strong>
            <br />
            When writing a help center article, describing a complex multi-click
            workflow purely with text frustrates users. Combining four or five
            sequential screenshots into a looping animation visually guides the
            reader through the exact interface steps effortlessly.
          </p>
          <p className="mb-4">
            <strong>Showcasing product variations in email marketing</strong>
            <br />
            Ecommerce email campaigns look cluttered when you embed separate
            photos for every color variation of a single product. Stacking the
            red, blue, and green product photos into a snappy, rotating graphic
            showcases the entire inventory compactly within the email body.
          </p>
          <p className="mb-4">
            <strong>Animating rigid architectural or design mockups</strong>
            <br />
            Presenting flat architectural renderings to a client often lacks
            emotional impact. Dropping progressive "before, during construction,
            and after" renderings into the timeline creates a compelling visual
            narrative that reveals the stunning transformation dynamically.
          </p>
          <p className="mb-4">
            <strong>Creating engaging digital banner advertisements</strong>
            <br />
            Static banner ads suffer from terrible click-through rates on modern
            websites. By animating three distinct text graphics that flash a
            promotional message rhythmically, you command the viewer's attention
            and dramatically increase your advertising engagement.
          </p>
          <p className="mb-4">
            <strong>
              Transforming burst photography into living portraits
            </strong>
            <br />
            Smartphones frequently capture a rapid burst of photos to ensure
            subjects aren't blinking. Instead of deleting the extras, compiling
            the burst sequence into an animation brings the candid smiles and
            subtle body movements back to life perfectly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Frame Delay (Speed Controls)</strong>
            <br />
            This millisecond value dictates exactly how long the timeline pauses
            on a specific picture before jumping to the next one. A lower number
            creates rapid, frantic movement, while a higher value (like 1000ms)
            pauses for a full second, which is ideal for readable slideshows.
          </p>
          <p className="mb-4">
            <strong>Canvas Width and Height</strong>
            <br />
            Since uploaded photos might have different shapes, this forces the
            final file into a uniform bounding box mathematically. Establishing
            a strict 500x500 square guarantees the animation will display
            flawlessly regardless of whether you upload portrait or landscape
            source files.
          </p>
          <p className="mb-4">
            <strong>Interactive Frame Timeline</strong>
            <br />
            This visual dashboard represents the exact chronological blueprint
            of your project. You can click the small 'X' icons to instantly
            delete redundant frames or physically drag the thumbnail blocks to
            fix a photo that loaded totally out of sequence.
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
