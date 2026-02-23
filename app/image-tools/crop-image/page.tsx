import CropImage from "@/components/image-tools/crop-image/CropImage";
import Faqs from "@/components/utils/Faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Cropper Tool - Crop Photos Online ",
  description:
    "Crop your images online quickly and perfectly. Our free photo cropper helps you reframe pictures, remove borders, and focus on the main subject.",
  keywords:
    "crop image, photo cropper online, free image cropper, resize image, trim photo, frame image, remove borders",
  openGraph: {
    title: "Free Image Cropper Tool - Crop Photos Online",
    description:
      "Crop your images online quickly and perfectly. Our free photo cropper helps you reframe pictures and remove borders.",
    type: "website",
    url: "https://1000freetools.com/image-tools/crop-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/crop-image",
  },
};

export default function CropImagePage() {
  const faqs = [
    {
      question:
        "Does the tool reduce my image quality when I crop image online?",
      answer:
        "No. The cropped area retains its exact original resolution and detail. Unlike some tools that compress the file during saving, our cropper strictly removes the unwanted outer pixels and saves the remaining area at its highest possible quality.",
    },
    {
      question:
        "Are my private photos uploaded to your servers for processing?",
      answer:
        "No. All cropping mechanics take place locally within your own web browser. Your personal images, documents, and graphics never leave your device, ensuring maximum security and privacy from the moment you upload to the final download.",
    },
    {
      question: "What image formats can I upload into the cropping tool?",
      answer:
        "You can upload and crop all major web image formats, including JPG, JPEG, PNG, and WebP. The application processes these files smoothly inside the browser window and will output an optimized file ready for immediate use.",
    },
    {
      question: "Can I perfectly center the crop box over my subject?",
      answer:
        "Yes, you can manually drag the entire crop box across the image canvas after setting the general size. This allows you to position the frame perfectly over the exact center of your subject before finalizing the cut.",
    },
    {
      question: "Will this tool let me crop a picture into a perfect circle?",
      answer:
        "Currently, the tool strictly supports rectangular and square cropping boundaries, which represents standard image file geometry. If you need a circular graphic, we recommend cropping the image to a perfect 1:1 square first before applying a circular mask in your website's CSS.",
    },
    {
      question: "Is there a cost to crop multiple images every day?",
      answer:
        "There are no costs, subscriptions, or restrictive limits applied to our platform. You can use the free image cropper tool to edit as many photographs as you need throughout the day without encountering annoying paywalls or forced watermarks.",
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
          Free Online Image Cropper
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Reframe your photos instantly directly in your browser. Remove
          unwanted edges, focus on specific subjects, and compose perfect images
          without complicated software.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <CropImage />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Photos rarely have perfect framing out of the camera. If you capture
            too much background or unwanted objects on the edges, you need to
            crop image online to fix the composition. This browser-based tool
            lets you instantly reframe pictures, remove borders, and focus
            entirely on your main subject. It processes everything locally on
            your device without uploading files to a server, ensuring your
            private photos remain secure while keeping the cropped area at its
            maximum original resolution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Load your image securely</strong>
            <br />
            Click the upload block or drag your photo directly into the browser
            window. The file imports instantly from your local storage,
            supporting all common formats like JPG, PNG, and WebP natively.
          </p>
          <p className="mb-4">
            <strong>2. Set your crop boundaries</strong>
            <br />
            Click and drag the highlighted box corners to establish new image
            borders. You can adjust the frame freely or lock the dimensions to
            standard aspect ratios tailored for specific social media platforms.
          </p>
          <p className="mb-4">
            <strong>3. Confirm and download</strong>
            <br />
            Once your subject is perfectly framed and the dark outer edges show
            what will be removed, apply the crop. Click the download button to
            instantly save the newly formatted image straight to your computer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Fixing composition in social media portraits</strong>
            <br />
            When you take a portrait shot, there is often too much headroom or
            empty sky above the subject. Cropping the image tighter draws the
            viewer's eye directly to the person's face for a more impactful
            profile picture.
          </p>
          <p className="mb-4">
            <strong>Removing watermarks or unwanted borders</strong>
            <br />
            Sometimes downloaded stock photos or scanned documents have messy
            white borders or small corner watermarks. You can simply drag the
            crop boundary slightly inward to cut out these distracting edges
            completely.
          </p>
          <p className="mb-4">
            <strong>Optimizing banners for website headers</strong>
            <br />
            Website builders require very specific wide aspect ratios for header
            graphics. Using the manual crop tool allows you to isolate a
            panoramic slice of a standard photograph that fits perfectly into
            your site layout.
          </p>
          <p className="mb-4">
            <strong>Zooming in on distant wildlife photography</strong>
            <br />
            If your camera lens wasn't long enough to capture a bird or animal
            up close, the subject may look tiny in the center of the frame.
            Cropping heavily into the center effectively zooms in on the animal,
            improving the final focus.
          </p>
          <p className="mb-4">
            <strong>Preparing square thumbnail images</strong>
            <br />
            E-commerce stores and podcast directories usually require perfectly
            square imagery. You can use the 1:1 aspect ratio preset to guarantee
            your rectangular product photo is cut into an exact square without
            stretching.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Freeform Cropping</strong>
            <br />
            This default mode allows you to drag all four corners independently
            without any mathematical restrictions. It is ideal for general
            editing when you simply want to remove distracting elements from the
            edges based on visual feel alone.
          </p>
          <p className="mb-4">
            <strong>Aspect Ratio Presets (1:1, 16:9, 4:3)</strong>
            <br />
            These pre-configured options lock the proportion of the crop box so
            it maintains a specific shape as you resize it. Use 1:1 for social
            thumbnails, 16:9 for video thumbnails, and 4:3 for standard
            photography prints.
          </p>
          <p className="mb-4">
            <strong>Zoom and Pan Controls</strong>
            <br />
            When working with very high-resolution images, you can zoom into the
            canvas to see pixel-level details. Panning allows you to move the
            enlarged image around the workspace to ensure your crop lines
            perfectly intersect the desired boundaries.
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
