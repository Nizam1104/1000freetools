import { ImageEditor } from "@/components/image-tools/image-editor/ImageEditor";
import Faqs from "@/components/utils/Faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Image Editor - Edit Photos & Images in Browser ",
  description:
    "Edit images online with powerful filters, adjustments, and drawing tools. Crop, rotate, apply effects, add text, and enhance photos directly in your browser.",
  keywords:
    "image editor, online image editor, photo editor, free image editor, image editing tools, crop image, rotate image, image filters, photo enhancer, browser image editor",
  openGraph: {
    title: "Free Online Image Editor - Edit Photos & Images",
    description:
      "Edit images online with powerful filters, adjustments, and drawing tools. Crop, rotate, apply effects, and enhance photos directly in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/image-editor",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-editor",
  },
};

export default function ImageEditorPage() {
  const faqs = [
    {
      question: "Is this online image editor completely free?",
      answer:
        "Yes. Accessing all editing tools including cropping, color adjustments, and drawing features costs nothing. You do not need an account or subscription.",
    },
    {
      question: "What image formats can I edit?",
      answer:
        "The editor supports standard formats like JPG, PNG, and WebP. You process these files seamlessly directly within your browser window.",
    },
    {
      question: "Are my photos uploaded to your server?",
      answer:
        "No. The entire editing application runs locally on your device. Your pictures remain completely private and secure on your own machine.",
    },
    {
      question: "Can I undo mistakes while editing?",
      answer:
        "Yes. The editor provides undo and redo controls. You revert unwanted changes easily without losing your previous progress.",
    },
    {
      question: "Will the final image have a watermark?",
      answer:
        "No. We never force watermarks onto your exported files. You retain full ownership and clean visual results for your downloaded images.",
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
          Free Online Image Editor
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Modify your photos professionally directly in your browser. Apply
          custom filters, accurate crops, and vibrant color adjustments
          instantly without downloading complicated desktop software.
        </p>
      </div>

      <div className="w-full">
        <div className="w-[85%] mx-auto py-6 sm:py-8">
          <ImageEditor />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Professional Editing Accessible to Everyone
          </h2>
          <p className="mb-4">
            Creating impressive visual content frequently demands expensive
            programs and powerful computer hardware. When you need to prepare an
            image rapidly for a presentation or social media post, navigating a
            complex software suite wastes valuable time. A robust web-based
            editor solves this problem immediately. Our platform grants you
            access to industry-standard editing capabilities directly through
            your internet browser.
          </p>
          <p className="mb-4">
            The foundation of good photography relies heavily on precise
            adjustments. Straightening a crooked horizon line or trimming
            distracting edges improves the immediate impact of your picture.
            Furthermore, raw photos captured on smartphones often appear flat or
            dull. Modifying contrast limits, increasing color saturation, and
            balancing shadow exposure transforms ordinary snapshots into
            engaging digital assets. You access all these critical controls
            through an interface designed entirely for speed.
          </p>
          <p className="mb-4">
            Security concerns often prevent individuals from using external web
            tools for sensitive document editing. We specifically built this
            platform to process your files locally. When you apply a filter or
            crop a frame, the calculations happen on your machine processor
            rather than a remote cloud server. This provides total privacy for
            family photos and confidential corporate documents alike while
            ensuring incredibly fast response times.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            Initializing your project takes only a few seconds. You click the
            prominent upload box or drag a file from your desktop directly onto
            the main canvas. The system supports common formats like JPG, PNG,
            and WebP natively. Immediately after the file loads, the primary
            workspace populates with your image alongside organized toolbars.
          </p>
          <p className="mb-4">
            You select specific functions from the clearly labeled menus. If you
            need structural changes, you activate the crop and rotate features
            to establish new boundaries. For color correction, you select the
            adjustments panel. Here, you slide simple controls to modify
            brightness, contrast, and color balance in real-time. If you want
            creative results rapidly, you click through the dedicated filters
            section to apply instant atmospheric styling to your picture.
          </p>
          <p className="mb-4">
            As you make overlapping adjustments, the visual canvas updates
            immediately. You experiment freely knowing the robust undo tracking
            system lets you revert mistakes instantly. Once the final
            composition meets your standards, you locate the save function. You
            designate the output format and click download. The browser
            generates the optimized file directly to your local drive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This comprehensive editing suite combines structural formatting
            tools with advanced aesthetic controls. The core canvas engine
            handles high-resolution images smoothly without stuttering or
            crashing your browser tab. The application interprets pixel data
            directly, allowing you to execute sharp crops and precise rotations
            simultaneously. You also add custom text overlays and utilize
            freehand drawing brushes to annotate documents or personalize
            photos.
          </p>
          <p className="mb-4">
            The adjustment algorithm operates with exceptional accuracy. Instead
            of applying basic dull overlays, the engine manipulates distinct
            color channels. This provides professional-grade control over
            exposure levels and tonal balance. The curated filter library offers
            one-click visual transformations matching popular modern photography
            styles. You combine these dynamic filters with manual adjustments to
            produce highly specific, unique aesthetic results.
          </p>
          <p className="mb-4">
            We prioritize continuous performance and platform stability above
            all else. Because you process files locally, you remain entirely
            unaffected by server outages or slow internet connections. The
            interface scales elegantly across different screen sizes, giving you
            a functional workspace on both large monitors and compact laptops.
            You access premium editing power constantly completely free of
            mandatory subscriptions.
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
