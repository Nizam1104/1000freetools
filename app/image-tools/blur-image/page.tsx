import { BlurImage } from "@/components/image-tools/blur-image/BlurImage";
import Faqs from "@/components/utils/Faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Image Blur Tool - Blur Photos Instantly ",
  description:
    "Our free image blur tool helps you quickly blur parts of your photos online. Perfect for privacy protection, artistic effects, and focusing attention.",
  keywords:
    "blur image online, free photo blur, blur picture, gaussian blur, pixelate image, protect privacy online, blur faces",
  openGraph: {
    title: "Free Online Image Blur Tool - Blur Photos Instantly",
    description:
      "Our free image blur tool helps you quickly blur parts of your photos online. Perfect for privacy protection.",
    type: "website",
    url: "https://1000freetools.com/image-tools/blur-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/blur-image",
  },
};

export default function BlurImagePage() {
  const faqs = [
    {
      question:
        "Is it safe to blur image online if it contains sensitive banking details?",
      answer:
        "Yes, it is entirely safe because our tool operates 100% locally within your device's web browser. None of your sensitive documents, screenshots, or added blur settings are ever transmitted to or stored on our external servers, guaranteeing total data privacy.",
    },
    {
      question: "Will using the blur effect lower my overall photo quality?",
      answer:
        "Applying the blur effect strictly targets the selected areas without compressing the rest of your file. The unaffected portions of your final downloaded picture will maintain the exact original dimensions, sharpness, and high graphical quality of your initial upload.",
    },
    {
      question: "How do I know how much blur intensity to apply?",
      answer:
        "We recommend starting with a low intensity and gradually moving the slider up while checking the live preview screen. For obscuring text, increase the strength just until the letters become completely unreadable. For artistic purposes, lower intensities usually yield the most natural results.",
    },
    {
      question: "Can I undo a blur if I make a mistake?",
      answer:
        "Because the edits take place live in your browser, you can easily adjust the intensity back to zero or reposition the affected zone before saving. The original file on your computer remains completely untouched until you explicitly click the download button to generate a new copy.",
    },
    {
      question: "What image formats can I upload into the blurring tool?",
      answer:
        "Our web application supports all common image formats, including JPG, PNG, and WebP files. It smoothly imports these formats directly from your local storage and outputs a compatible, flattened image ready to be shared or uploaded elsewhere.",
    },
    {
      question:
        "Is there a limit or cost for processing large, high-resolution photos?",
      answer:
        "Our image blur tool is completely free to use without any hidden paywalls, subscription fees, or restrictive image size limits. You can process heavy, high-resolution photographs directly using your own hardware's processing power as often as you need.",
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Online Image Blur Tool
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Obscure sensitive data and add beautiful artistic effects directly in
          your web browser. Protect your privacy instantly without installing
          software.
        </p>
      </div>

      {/* Tool Interface */}
      <div className="container mx-auto py-8 w-full">
        <BlurImage />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            When you share screenshots or photos, they often contain sensitive
            information you need to hide. This tool lets you protect your
            privacy and blur image online directly from your browser. It applies
            smooth obscuring effects over specific areas or entire pictures
            without uploading any files to remote servers. You easily protect
            personal data or add artistic focus to your photography instantly,
            keeping your original high-quality resolution intact.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Upload your picture securely</strong>
            <br />
            Click the upload area to select your file, or drag and drop a JPG,
            PNG, or WebP photo straight onto the canvas. The browser processes
            your image locally so you skip the frustrating wait times associated
            with uploading large files.
          </p>
          <p className="mb-4">
            <strong>2. Apply the blur effect</strong>
            <br />
            Select the specific area on your photo that you want to obscure or
            choose to affect the entire canvas. You can pick standard blurring
            for a smooth artistic look, or use a pixelate option for a more
            rigid, traditional censorship style.
          </p>
          <p className="mb-4">
            <strong>3. Adjust settings and download</strong>
            <br />
            Use the intensity slider to control how strong the effect appears,
            watching the preview update automatically in real-time. Once the
            sensitive information is completely hidden or the desired aesthetic
            is met, click download to save instantly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>
              Hiding private details in troubleshooting screenshots
            </strong>
            <br />
            When asking for tech support online, screenshots often capture
            private email addresses or browser tabs. You drag the effect over
            these specific text lines to obscure them before sharing the image
            on public help forums.
          </p>
          <p className="mb-4">
            <strong>Obscuring faces to protect minor privacy</strong>
            <br />
            Teachers and parents frequently post group event photos to social
            media networks. Blurring out the faces of certain children ensures
            you respect their privacy and safety while still sharing the overall
            memory.
          </p>
          <p className="mb-4">
            <strong>Censoring license plates in car photography</strong>
            <br />
            Automotive enthusiasts who upload pictures of their vehicles often
            forget about their registration details. Quickly applying a
            pixelated block over the license plate prevents malicious tracking
            or identity scraping from web crawlers.
          </p>
          <p className="mb-4">
            <strong>Creating artistic blurred photographic backgrounds</strong>
            <br />
            Sometimes a great portrait is competing with a heavily distracted or
            messy background environment. Applying a global blur outside of the
            main subject simulates an expensive camera lens depth of field
            effect.
          </p>
          <p className="mb-4">
            <strong>Anonymizing financial documents before sending</strong>
            <br />
            You occasionally need to send bank statements or tax forms as visual
            proofs. Blurring out account numbers and exact balances ensures only
            the necessary header information is shared with the viewing party.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Blur Intensity Slider</strong>
            <br />
            This primary control dictates the mathematical standard deviation of
            the blur algorithm. Lower values create a subtle softness ideal for
            artistic backgrounds, while higher values completely scramble text
            and faces for strong privacy protection.
          </p>
          <p className="mb-4">
            <strong>Shape Selection (if applicable)</strong>
            <br />
            This toggle lets you choose whether the affected area is a strict
            rectangle or a smoother circle. Rectangles are perfectly suited for
            blocking out lines of text, while circles work better for isolating
            faces or natural subjects.
          </p>
          <p className="mb-4">
            <strong>Effect Type Selector</strong>
            <br />
            This setting switches between a standard smooth Gaussian blur and a
            blocky pixelation effect. Pixelation is often preferred for
            censoring official documents as it provides a distinct visual
            indicator that information was intentionally removed.
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
