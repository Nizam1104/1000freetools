"use client";

import RemoveImageBackground from "@/components/image-tools/remove-background/RemoveImageBackground";
import Image from "next/image";
import Faqs from "@/components/utils/Faqs";

export default function BackgroundRemover() {
  const faqs = [
    {
      question: "Is this background remover free?",
      answer:
        "Yes. Our background remover tool is entirely free to use with no hidden costs or subscriptions required.",
    },
    {
      question: "Will I lose image quality after removing the background?",
      answer:
        "No. The tool processes your image and removes the background while maintaining your original subject resolution and clarity.",
    },
    {
      question: "What types of images work best?",
      answer:
        "Images with clear contrast between the subject foreground and the background backdrop yield the best accuracy. Crisp edges make detection simple.",
    },
    {
      question: "Can I process multiple images at once?",
      answer:
        "Yes. You have the ability to upload up to 25 images simultaneously for bulk background removal processing directly in your browser.",
    },
    {
      question: "Are my photos uploaded to a public server?",
      answer:
        "No. All image processing takes place locally within your web browser. Your sensitive files remain strictly on your own device.",
    },
    {
      question: "What image formats do you support?",
      answer:
        "We support major formats like JPG, JPEG, PNG, and WebP for input. The final downloaded file with the transparent background is saved as a PNG.",
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

      {/* 1. SEO Introduction - FIRST ELEMENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Remove Image Backgrounds Online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Bad backgrounds hurt your images and waste your time editing. This
          free AI tool removes backgrounds instantly from multiple images at
          once running securely in your browser.
        </p>
      </div>

      {/* 2. Tool Interface - SECOND ELEMENT */}
      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <RemoveImageBackground />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
          Before and After
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <span className="text-lg font-semibold">Original Image:</span>
            <Image
              src="https://static-assets.indeetools.com/images/img-bg-remove-tool-before.jpeg"
              alt="Before background removal with noisy surroundings"
              width={500}
              height={500}
              className="rounded shadow"
            />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <span className="text-lg font-semibold">
              Background Removed Image:
            </span>
            <Image
              src="https://static-assets.indeetools.com/images/img-bg-remove-tool-after.jpeg"
              alt="After background removal with transparent background"
              width={500}
              height={500}
              className="rounded shadow bg-grid-pattern"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Professional Image Transparency
          </h2>
          <p className="mb-4">
            Achieving clean image extractions is a critical step for modern
            graphic design. When you sell products online or create professional
            presentations, a cluttered background distracts viewers from your
            main subject. A transparent background gives you the flexibility to
            place your product over any color, texture, or scene. Our free tool
            provides a fast and reliable way to remove these unwanted elements
            entirely in your browser.
          </p>
          <p className="mb-4">
            You no longer need to spend hours manually tracing subjects with a
            digital pen or lasso tool in expensive editing software. Automated
            intelligent edge detection handles the heavy lifting for you. We
            evaluate the contrast between the primary object and the distant
            background, selecting the precise boundary. This saves you
            significant time and effort when you have tight deadlines for visual
            projects.
          </p>
          <p className="mb-4">
            Security remains a top priority during this process. Because all
            computations occur within your local browser environment, your
            personal photos never leave your device. You maintain full ownership
            and privacy over every file you upload. This local processing model
            also eliminates slow upload times associated with traditional web
            services, allowing you to get your transparent PNG files instantly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            We designed the interface to be entirely straightforward and
            accessible. To begin, you locate the file upload section on the
            page. You select the files directly from your computer using the
            file browser or simply drag and drop the photos onto the designated
            drop zone. Our tool immediately reads the image data into memory and
            begins analyzing the distinct visual layers.
          </p>
          <p className="mb-4">
            Once you provide the input file, the automated process takes over.
            You do not need to highlight edges or specify colors. The
            application identifies human figures, products, text, or graphic
            elements as the foreground subject. It then separates this subject
            from the background pixels. You watch as the original backdrop drops
            away, replaced by a checkerboard pattern indicating transparency.
          </p>
          <p className="mb-4">
            After the extraction completes, you examine the resulting image
            inside the preview window. If you uploaded multiple photos
            simultaneously, you review all of them in the provided list view.
            You then click the download button right next to each image. The
            browser saves the new file directly to your local storage drive as a
            high-quality PNG image, ensuring the transparency channel is
            perfectly intact for your future design needs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This tool specializes in rapid background elimination without the
            complexity of traditional graphic design applications. The primary
            function relies on robust client-side algorithms that differentiate
            subjects from their surroundings. You process standard formats such
            as JPG, WebP, and PNG directly. The system converts the final image
            into a PNG format to preserve the empty pixel data.
          </p>
          <p className="mb-4">
            Bulk processing represents a major advantage of our platform. You
            select up to 25 distinct images at a single time for removal. The
            browser processes them back-to-back automatically. This batch
            capability makes the tool ideal for e-commerce store owners who need
            to standardize product catalogs or photographers managing large
            volumes of portrait shots.
          </p>
          <p className="mb-4">
            Our application provides accurate outcomes even on complex edges
            like hair or fur. It handles high-resolution images well, utilizing
            the memory and processing power of your own machine. We ensure the
            software operates cleanly across all modern web browsers without
            installing distinct applications or plugins. You gain a highly
            capable visual extraction utility accessible from anywhere without a
            mandatory subscription or account.
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
