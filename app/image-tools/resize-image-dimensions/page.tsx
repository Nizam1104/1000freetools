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
      question: "Is this image resizer completely free?",
      answer:
        "Yes. Our image resizing tool is entirely free to use. You encounter no hidden fees or mandatory registrations when updating your photos.",
    },
    {
      question: "Will the image distort when I change dimensions?",
      answer:
        "You avoid distortion by keeping the aspect ratio locked. If you explicitly unlock the ratio and type custom disproportionate widths and heights, the image stretches accordingly.",
    },
    {
      question: "What image formats are accepted?",
      answer:
        "We support common formats such as JPG, PNG, and WebP. You process these files seamlessly directly on your device.",
    },
    {
      question: "Does the tool upload my images to a server?",
      answer:
        "No. The application processes your files entirely locally within your web browser. Your private data remains secure on your own machine.",
    },
    {
      question: "Can I increase the size of a small image?",
      answer:
        "Yes, you can scale images up. However, increasing pixel dimensions significantly beyond the original size results in a softer or pixelated final appearance.",
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
          <h2 className="text-2xl font-bold mb-4">
            Control Your Digital Dimensions
          </h2>
          <p className="mb-4">
            Managing the physical width and height of digital images represents
            a constant requirement for modern internet users. When you develop a
            website or post content to social networks, you constantly face
            strict dimension requirements. Uploading a massive original
            photograph often breaks a carefully designed layout or forces the
            platform to heavily compress your file. Modifying the dimensions
            yourself ensures your graphics display perfectly for every specific
            use case.
          </p>
          <p className="mb-4">
            Large image files consume significant amounts of storage space and
            bandwidth. When you insert a huge picture into a presentation
            document or attach it to an email, you run into file size limits
            rapidly. Scaling down the dimensions directly reduces the overall
            data footprint of the image. This optimization leads to faster
            upload times and a smoother experience for the people receiving or
            viewing your content.
          </p>
          <p className="mb-4">
            Our platform provides the exact controls necessary to handle these
            resizing tasks immediately. You manage the precise pixel counts for
            your files without relying on heavy desktop software packages. More
            importantly, you perform all these scaling operations locally. The
            browser engine processes the data on your machine. This local
            architecture guarantees your personal photos never leak onto
            unauthorized remote servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            We built this utility to streamline the resizing process. You start
            by identifying the upload section clearly visible on the screen. You
            click the box to open your system file browser or drag the target
            file directly over the drop zone. The application instantly loads
            your picture and displays its original dimensions on the interface.
          </p>
          <p className="mb-4">
            With the image loaded, you look at the configuration panel. You see
            separate input fields for width and height measured in pixels. You
            type your desired new target numbers into these boxes. By default,
            the interface automatically calculates corresponding values to
            maintain the original aspect ratio. This prevents your photo from
            stretching or squashing unnaturally. If you specifically need
            asymmetrical dimensions, you disable the ratio lock and type your
            independent values.
          </p>
          <p className="mb-4">
            As you update the numbers, the internal engine registers your
            changes. You review the final settings to ensure accuracy. When you
            are satisfied with the new dimensions, you click the bold download
            button. The browser immediately generates the resized file and
            places it directly into your local storage folder. The entire
            operation requires only a few seconds to complete.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This tool excels at fast, client-side dimension modification. The
            core function interpolates image pixels to either increase or
            decrease the physical width and height of a digital file. The web
            application handles standard image formats seamlessly, including
            widespread types like JPG and PNG. The processing logic accurately
            redraws the image based strictly on the numerical pixel values you
            provide.
          </p>
          <p className="mb-4">
            The prominent aspect ratio lock feature prevents common formatting
            errors. Maintaining the ratio guarantees your subjects retain their
            natural appearance regardless of the scale. This feature alone saves
            users significant frustration when preparing images for professional
            profiles or portfolio sites. Additionally, you receive immediate
            feedback on the new file size and dimensions before you even execute
            the download command.
          </p>
          <p className="mb-4">
            Because this application runs natively in your browser environment,
            you skip the mandatory waiting periods associated with cloud
            processing queues. You scale high-resolution assets smoothly
            utilizing your own system memory. The interface remains clean and
            fully focused on the sole task of scaling the canvas correctly. We
            provide a highly efficient utility built for speed and privacy
            entirely free of charge.
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
