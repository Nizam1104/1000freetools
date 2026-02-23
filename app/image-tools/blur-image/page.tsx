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
      question: "Is this image blur tool completely free?",
      answer:
        "Yes. Our image blur tool is completely free to use with no hidden costs, registration, or watermarks placed on your downloaded images.",
    },
    {
      question: "Do you store my images on your servers?",
      answer:
        "No. Our tool processes images locally directly in your browser. We never upload, store, or access your images on our servers.",
    },
    {
      question: "What image formats do you support?",
      answer:
        "Our tool supports common formats including JPG, PNG, and WebP, ensuring compatibility with your standard device photos and screenshots.",
    },
    {
      question: "How do I choose the right blur intensity?",
      answer:
        "Begin with a low intensity and gradually increase the slider until you achieve your desired visual effect. The right amount depends entirely on your specific image and purpose.",
    },
    {
      question: "Will the blur effect reduce my image quality?",
      answer:
        "The blur effect applies smoothly to maintain overall image quality while softening sharp areas. Your downloaded file maintains the exact original resolution.",
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
          <h2 className="text-2xl font-bold mb-4">
            Enhance Privacy and Focus with Image Blurring
          </h2>
          <p className="mb-4">
            Protecting personal information forms a critical part of sharing
            content on the internet today. When you post a screenshot, it often
            contains sensitive data like email addresses, account details, or
            private messages. Blurring these specific areas provides an
            immediate solution. By applying a smooth blur effect over
            confidential information, you prevent unauthorized viewing while
            keeping the rest of the image context completely intact.
          </p>
          <p className="mb-4">
            Our tool addresses these privacy concerns by operating entirely on
            your local machine. Because we process your files directly inside
            your browser, none of your sensitive documents upload to remote
            servers. This method ensures maximum security. You obscure private
            details rapidly and safely without wondering who has access to your
            original, unedited files.
          </p>
          <p className="mb-4">
            Beyond security, blurring acts as a powerful artistic technique.
            Professional photographers consistently use depth of field effects
            to guide the viewer's eye toward the primary subject. By slightly
            blurring a distracting background, you bring immediate focus to the
            objects or people in the foreground. Our application allows you to
            simulate these premium photographic effects instantly regardless of
            the camera you used to capture the shot.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            Operating this tool requires no previous technical experience. You
            begin by selecting your target image. You click the indicated area
            to browse your device files or simply drag and drop your photo into
            the workspace. The image loads securely into your browser memory and
            displays immediately on your screen.
          </p>
          <p className="mb-4">
            Next, you adjust the blur settings. The interface provides a clear
            slider that controls the intensity of the effect. As you drag the
            slider, the image in the preview window updates in real-time. You
            observe exactly how much obscuring takes place. You increase the
            intensity carefully until the sensitive information becomes
            unreadable or the background achieves the exact softness you desire.
          </p>
          <p className="mb-4">
            Once you achieve the perfect result, finishing the job takes only a
            single click. You press the download button located below the
            preview. Your browser generates the finalized file and saves it
            directly to your designated downloads folder. The newly created
            image retains the dimensions of your original upload, securing your
            information without sacrificing overall visual fidelity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This application simplifies complex image manipulation into a
            straightforward web experience. We built the software using modern
            web standards to ensure fast, reliable performance. The tool reads
            standard file types including JPG and PNG formats natively. The
            rendering engine applies mathematical blur algorithms seamlessly to
            every pixel, generating a smooth, natural transition across the
            affected areas.
          </p>
          <p className="mb-4">
            A key feature of our platform revolves around the live feedback
            loop. Every adjustment you make to the intensity scale reflects
            instantly on the screen. You skip the tedious wait times associated
            with uploading large files to cloud processors. This immediate
            response empowers you to experiment with different levels of
            obfuscation until you find the ideal balance between privacy and
            aesthetics.
          </p>
          <p className="mb-4">
            Furthermore, the performance remains high regardless of your
            original file size. Since your own computer hardware handles the
            core processing logic, the tool scales gracefully. You process
            highly detailed images smoothly. We deliver an efficient, accessible
            application that solves everyday picture editing needs securely and
            completely free of charge. You use the platform as often as required
            without hitting any artificial paywalls or download limits.
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
