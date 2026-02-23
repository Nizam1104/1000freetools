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
      question: "Is this image cropper tool free to use?",
      answer:
        "Yes. Our cropping tool is completely free. You do not need to register an account or pay any fees to crop your photos.",
    },
    {
      question: "Does the tool reduce my image quality?",
      answer:
        "No. The cropped area retains its exact original resolution and detail. We do not compress or downgrade your image quality during the cropping process.",
    },
    {
      question: "Are my photos uploaded to the internet?",
      answer:
        "No. The tool processes your image entirely within your browser on your own device. Your files remain completely secure and private.",
    },
    {
      question: "What image formats can I crop?",
      answer:
        "You can load all common image formats including JPG, PNG, and WebP. The tool handles them smoothly directly within your browser window.",
    },
    {
      question: "Can I use specific aspect ratios?",
      answer:
        "Yes. The interface provides standard aspect ratio presets. You also have the freedom to manually drag the corners for a completely freeform custom crop.",
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
          <h2 className="text-2xl font-bold mb-4">
            Improve Your Visual Composition
          </h2>
          <p className="mb-4">
            Framing forms the foundation of all good photography and graphic
            design. Whether you take a quick snapshot on your phone or manage a
            folder of professional photographs, you frequently capture extra
            background details that you do not need. Cropping provides the
            simplest method to fix these compositional errors. Removing empty
            space or distracting objects from the edges of your photo instantly
            directs the attention of the viewer to your main subject.
          </p>
          <p className="mb-4">
            Different platforms require different image dimensions. Social media
            sites demand square formats, panoramic banners, or vertical portrait
            layouts. A single unedited photo rarely fits all these requirements
            perfectly. By utilizing an accurate cropping tool, you generate
            optimized versions of the same original file for every distinct
            network. Our software provides the precise controls necessary to
            resize the visible framing of your graphics specifically for these
            unique publishing standards.
          </p>
          <p className="mb-4">
            Security and privacy represent core benefits of our platform. We
            built this utility to run entirely locally on your machine. When you
            drop a file onto our page, your browser reads the data directly
            without transmitting a single byte across the internet. You process
            deeply personal photos, confidential business documents, or
            proprietary artwork securely. You avoid the risks associated with
            cloud storage providers entirely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            We designed the interface to minimize friction and maximize speed.
            To start, you click the upload area or simply drag a file from your
            computer desktop directly onto the web page. Your browser loads the
            image and immediately presents a visual cropping boundary overlaid
            on top of your photo. The platform supports all standard formats
            including JPG, PNG, and WebP natively.
          </p>
          <p className="mb-4">
            Controlling the crop boundary feels intuitive. You click and drag
            the corners or edges of the highlighted box to adjust the framing.
            As you move your mouse, the unselected outer regions darken to
            provide a clear preview of your final result. If you need a specific
            proportion naturally suited for professional printing or social
            media, you select one of the provided aspect ratio presets. This
            locks the proportions dynamically as you scale the box.
          </p>
          <p className="mb-4">
            Once you secure the perfect composition, you finalize your work with
            a single confirmation click. The application restructures the image
            data based on your specific boundary limits. You then click the
            download button located actively on the screen. The browser
            instantly saves the newly cropped file directly into your local
            download directory, maintaining your original image resolution
            perfectly within the selected frame.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            Our specialized application delivers precise pixel-level control
            across all your reframing tasks. The underlying engine relies
            entirely on your local browser capabilities, bypassing slow external
            servers. The primary function focuses strictly on truncating
            unwanted margins and establishing new boundaries for your
            photographs. The tool does not alter your underlying pixel data
            through unwanted compression algorithms or quality reduction
            filters.
          </p>
          <p className="mb-4">
            A prominent feature includes the responsive drag-and-drop workspace.
            The application handles massive megapixel images effortlessly. You
            zoom into detailed areas and execute accurate cuts without
            experiencing lag. The tool also provides fixed ratio grids. This
            guarantees your final output strictly obeys predefined mathematical
            proportions required by modern digital displays.
          </p>
          <p className="mb-4">
            Furthermore, the platform provides an entirely non-destructive
            temporary workspace. Up until the exact moment you hit the download
            button, your original file remains untouched safely on your hard
            drive. You test multiple different cropping variations rapidly. We
            deliver a high-performance utility that handles your daily image
            formatting routines efficiently entirely for free. You process an
            unlimited number of files without encountering restrictive paywalls.
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
