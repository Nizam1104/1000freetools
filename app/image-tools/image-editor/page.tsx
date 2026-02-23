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
      question: "Is this online image editor completely free to use?",
      answer:
        "Yes, our comprehensive editing suite is completely free of charge. You get unrestricted access to premium tools including cropping grids, color correction sliders, and custom drawing brushes without signing up or paying mandatory subscription fees.",
    },
    {
      question: "What image formats can I upload and edit?",
      answer:
        "The editor natively supports standard web formats including high-resolution JPGs, transparent PNGs, and highly compressed WebP files. You can safely import these from your desktop or mobile device directly into the workspace canvas.",
    },
    {
      question: "Are my private photos uploaded to a cloud server?",
      answer:
        "No, the entire editing application runs strictly on your local machine using client-side processing. Your pictures remain completely private and secure because no file data is ever transmitted to our external databases or cloud storage.",
    },
    {
      question: "Can I easily undo mistakes while editing?",
      answer:
        "Yes, the interface provides robust undo and redo controls built right into the top toolbar. You can safely experiment with radical filters or dramatic crop boundaries knowing you can instantly revert any unwanted changes with a single click.",
    },
    {
      question: "Will the final exported image have a watermark?",
      answer:
        "No, we never force our logo or any obstructive watermarks onto your final exported files. You retain full ownership, pristine pixels, and a completely clean visual result when you finish your professional design work.",
    },
    {
      question: "Does the editor work offline once the page loads?",
      answer:
        "Yes, because all the heavy computational lifting happens directly within your local browser's memory. Once the initial tool layout has successfully loaded onto your screen, you can continue applying complex effects and formatting even if your internet connection temporarily drops.",
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
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Sometimes a great photo looks too dull or needs structural
            adjustments before you can post it. You rarely want to install
            massive professional software just to make a quick fix. This online
            image editor allows you to crop, rotate, filter, and adjust colors
            instantly within your browser. It uses secure local processing to
            apply complex adjustments, add text, and let you draw directly on
            your canvas without creating an account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Load your canvas securely</strong>
            <br />
            Drag your JPG, PNG, or WebP file directly into the editor workspace.
            The application launches entirely in your browser, ensuring no wait
            times or network upload delays constrain your workflow.
          </p>
          <p className="mb-4">
            <strong>2. Apply adjustments or creative tools</strong>
            <br />
            Use the categorized toolbar to fix core issues by clicking the crop
            or brightness sliders first. Once the foundation looks great, switch
            to the text or drawing tools to add creative overlays and
            annotations.
          </p>
          <p className="mb-4">
            <strong>3. Format and save your work</strong>
            <br />
            Monitor your changes using the live preview, clicking the undo
            button if a filter seems too extreme. Hit the save button, pick your
            preferred file format extension, and download the finalized
            masterpiece directly to your hard drive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Fixing dull smartphone photography</strong>
            <br />
            Photos taken on overcast days often lack dynamic range and look
            completely flat. Sliding the contrast and saturation controls upward
            slightly injects necessary life and vibrance into the image before
            you post it to Instagram.
          </p>
          <p className="mb-4">
            <strong>Straightening crooked horizon lines</strong>
            <br />
            Shooting a beach or landscape freehand almost always results in a
            slightly tilted horizon which ruins the composition. Using the
            precise rotation tool allows you to bring the ocean line back into
            perfect structural balance.
          </p>
          <p className="mb-4">
            <strong>Adding instructional text to visual tutorials</strong>
            <br />
            When you create a software guide, a naked screenshot is rarely
            enough to guide the reader. Selecting the text overlay tool lets you
            drop clear headers and explanatory fonts directly onto the interface
            image.
          </p>
          <p className="mb-4">
            <strong>Highlighting details in document scans</strong>
            <br />
            If you need to point out a signature block or specific clause on a
            digitized contract, basic text isn't sufficient. Engaging the
            freehand drawing brush allows you to dynamically circle the exact
            area of importance for the recipient.
          </p>
          <p className="mb-4">
            <strong>Creating uniformly cropped employee directories</strong>
            <br />
            Corporate "meet the team" pages look messy when headshots feature
            different framing sizes. Uploading team photos and using a locked
            1:1 square crop ensures every portrait displays elegantly across the
            company layout.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Color Adjustments (Brightness/Contrast)</strong>
            <br />
            These core sliders modify the mathematical exposure values of the
            pixels. Increase brightness to rescue dark shadows, and boost
            contrast to make blacks deeper and whites crisper, greatly improving
            visual punch.
          </p>
          <p className="mb-4">
            <strong>Filters Panel</strong>
            <br />
            This is a curated collection of pre-configured color grades that
            instantly alter the mood of the photo. Apply these carefully to
            simulate vintage film stocks or to unify a batch of differently shot
            portraits under one consistent aesthetic.
          </p>
          <p className="mb-4">
            <strong>Crop and Rotate Engine</strong>
            <br />
            This structural area lets you drag bounding boxes to remove
            distracting backgrounds entirely. The rotate slider provides
            granular, degree-by-degree tuning to fix slanted framing errors that
            occurred during shooting.
          </p>
          <p className="mb-4">
            <strong>Text and Drawing Tools</strong>
            <br />
            These overlay options sit on top of the original pixel data. You can
            customize the font family, specific hex color size, and line
            thickness of the brush to create memes, sign graphics, or technical
            mockups.
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
