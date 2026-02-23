"use client";

import RemoveImageBackground from "@/components/image-tools/remove-background/RemoveImageBackground";
import Image from "next/image";
import Faqs from "@/components/utils/Faqs";

export default function BackgroundRemover() {
  const faqs = [
    {
      question:
        "Will I lose image quality when I remove background from image online?",
      answer:
        "No. The tool processes your image while maintaining your original subject resolution and clarity. It strictly removes the unwanted pixels without downscaling the primary foreground object, meaning your final transparent PNG will look just as crisp as the file you uploaded.",
    },
    {
      question: "Does the tool store my uploaded photos on a server?",
      answer:
        "No. All image processing mechanics take place locally within your web browser. Your sensitive files remain strictly on your own device and are never transmitted to cloud storage, guaranteeing complete privacy and security for your personal photography.",
    },
    {
      question: "Can I process multiple images at once?",
      answer:
        "Yes, you have the ability to upload up to 25 images simultaneously for bulk background removal processing. Since the application leverages your local device performance, you can quickly convert entire albums of product photos or portraits in a single run.",
    },
    {
      question: "What types of images yield the best extraction results?",
      answer:
        "Images representing a clear contrast between the subject foreground and the backdrop yield the highest accuracy. While the AI handles complex edges, subjects shot against solid contrasting colors make the automated detection process extraordinarily simple and flawless.",
    },
    {
      question: "What image formats do you support for uploading?",
      answer:
        "The application supports all major input formats including JPG, JPEG, PNG, and WebP. Regardless of what file type you provide initially, the software automatically saves your final isolated image as a transparent PNG so you can use it immediately in design projects.",
    },
    {
      question: "Is this automated background remover truly free to use?",
      answer:
        "Yes, our background remover utility operates entirely free to use with no hidden costs, watermark stamps, or mandatory subscriptions required. You get unlimited access to powerful local AI extraction technology directly from your internet browser.",
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
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="mb-4">
            Bad backgrounds ruin photos and require heavy editing work to fix.
            If you need to remove background from image online, this tool
            automatically detects your main subject and erases the background
            behind it. It uses local browser AI to extract people, products, or
            objects, giving you a clean transparent PNG instantly. You do not
            need to upload any images to an external server, keeping your
            workflow safe and extremely fast.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            <strong>1. Drop your photos</strong>
            <br />
            Simply drag and drop one or multiple images into the designated
            area. The tool instantly loads your files into the browser without
            any waiting time, supporting formats like JPG, PNG, and WebP.
          </p>
          <p className="mb-4">
            <strong>2. Wait for automatic AI extraction</strong>
            <br />
            You do not need to click any buttons or trace edges. The intelligent
            software automatically identifies the foreground subject and
            separates it from the backdrop natively on your device.
          </p>
          <p className="mb-4">
            <strong>3. Review and download</strong>
            <br />
            Check the preview window to see the checkerboard pattern confirming
            transparency. Click the download button next to your desired image
            to instantly save the crisp, background-free PNG directly to your
            computer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
          <p className="mb-4">
            <strong>Creating professional presentations</strong>
            <br />
            Embedding photos with clashing backgrounds makes slides look
            amateurish. You remove the background to smoothly overlay your
            subject onto colored presentation templates or corporate graphics.
          </p>
          <p className="mb-4">
            <strong>Preparing e-commerce product listings</strong>
            <br />
            Online marketplaces like Amazon and Shopify require pure white or
            transparent backdrops. Extracting the product from its natural
            setting ensures your store catalog looks uniform and professional.
          </p>
          <p className="mb-4">
            <strong>Designing social media thumbnail graphics</strong>
            <br />
            Youtubers and creators constantly need cutout portraits for video
            thumbnails. Generating a transparent PNG lets you easily paste
            yourself over bright, eye-catching backgrounds to increase
            engagement.
          </p>
          <p className="mb-4">
            <strong>Making custom digital stickers</strong>
            <br />
            Crafters and chat users love turning photos of pets or friends into
            fun stickers. Removing the busy bedroom or outdoor environment
            leaves just the subject ready for meme creation.
          </p>
          <p className="mb-4">
            <strong>Replacing boring portrait backgrounds</strong>
            <br />
            Sometimes a great headshot is ruined by a messy office wall.
            Eliminating the original backdrop enables you to swap in a clean
            studio gradient or outdoor scene for your LinkedIn profile.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Settings Explained</h2>
          <p className="mb-4">
            <strong>Bulk Upload Support</strong>
            <br />
            This built-in capability lets you select up to 25 distinct files
            simultaneously instead of doing them one by one. The local engine
            queues them up and processes the batch sequentially to save massive
            amounts of time.
          </p>
          <p className="mb-4">
            <strong>Automatic Edge Detection</strong>
            <br />
            There are no sliders for this feature, as the AI dynamically
            analyzes contrast and pixel data on its own. It handles complex
            boundaries like hair and fine edges automatically, taking the
            guesswork out of extraction.
          </p>
          <p className="mb-4">
            <strong>Format Conversion</strong>
            <br />
            When you import formats like JPG which do not support transparency
            natively, the tool processes the image and automatically exports it
            as a PNG file. This ensures the transparent channel data remains
            perfectly intact upon saving.
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
