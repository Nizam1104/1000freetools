import { Metadata } from "next";
import AddWatermarkOnImage from "@/components/image-tools/add-watermark-on-image/AddWatermarkOnImage";
import Faqs from "@/components/utils/Faqs";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Free Image Watermark Tool - Add Watermark to Images Online ",
  description:
    "Add text or image watermarks to your photos instantly. Protect your images with customizable watermarks. Free online tool with no registration required.",
  keywords:
    "watermark images, add watermark to photos, image watermark tool, text watermark, logo watermark, copyright watermark, protect images, free watermark tool",
  openGraph: {
    title: "Free Image Watermark Tool - Add Watermark to Images Online",
    description:
      "Add text or image watermarks to your photos instantly. Protect your images with customizable watermarks.",
    type: "website",
    url: "https://1000freetools.com/image-tools/add-watermark-on-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/add-watermark-on-image",
  },
};

const relatedTools = [
  {
    name: "Image Compressor",
    description:
      "Compress images online - reduce file size while maintaining quality",
    href: "/image-tools/image-compressor",
  },
  {
    name: "Image Editor",
    description: "Edit images online with powerful editing tools",
    href: "/image-tools/image-editor",
  },
  {
    name: "Pick Color Code from Image",
    description: "Extract color codes from images - get HEX, RGB, HSL values",
    href: "/image-tools/pick-color-code-from-image",
  },
  {
    name: "Image Format Conversions",
    description:
      "Convert images between different formats - JPEG, PNG, WebP, AVIF and more",
    href: "/image-tools/image-format-conversions",
  },
  {
    name: "Background Remover",
    description: "Remove background from images automatically",
    href: "/image-tools/background-remover",
  },
  {
    name: "Image to GIF",
    description: "Convert images to animated GIF format",
    href: "/image-tools/image-to-gif",
  },
  {
    name: "Image Filters",
    description: "Apply beautiful filters and effects to your images",
    href: "/image-tools/image-filters",
  },
  {
    name: "Crop Image",
    description: "Crop images to your desired size and aspect ratio",
    href: "/image-tools/crop-image",
  },
  {
    name: "Sharpen Image",
    description: "Enhance image sharpness and clarity online",
    href: "/image-tools/sharpen-image",
  },
  {
    name: "Resize Image Dimensions",
    description: "Resize images by changing width and height dimensions",
    href: "/image-tools/resize-image-dimensions",
  },
  {
    name: "Image to PDF",
    description: "Convert images to PDF documents",
    href: "/image-tools/image-to-pdf",
  },
  {
    name: "Blur Image",
    description: "Apply blur effect to images or specific areas",
    href: "/image-tools/blur-image",
  },
];
export default function AddWaterMarkOnImagePage() {
  const faqs = [
    {
      question: "Is this image watermark tool free to use?",
      answer:
        "Yes. Our tool is entirely free to use and does not require any payment or registration. You get full access to all customizable watermark features immediately.",
    },
    {
      question: "What image formats are supported for uploading?",
      answer:
        "We support common formats including JPG, PNG, and WebP. You upload these formats seamlessly directly within your browser for fast processing.",
    },
    {
      question: "Does the tool store my images on any server?",
      answer:
        "No. All processing happens entirely within your browser. We never upload your images to our servers ensuring maximum privacy and security for your files.",
    },
    {
      question: "Can I use both text and logos as a watermark?",
      answer:
        "Yes. You have the flexibility to type out text for a copyright notice or upload a separate logo image. You apply whichever format best suits your branding needs.",
    },
    {
      question: "How do I make the watermark transparent?",
      answer:
        "Settings allow you to adjust the opacity slider. By lowering the opacity setting, you create a subtle watermark that protects your content while keeping the underlying image visible.",
    },
    {
      question: "Is there a limit to how many images I process?",
      answer:
        "There are no strict usage limits. You process as many photos as you need without restriction or watermarked constraints applied natively by our tool.",
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Free Image Watermarking tool online
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-4xl text-muted-foreground">
          Protect your creative work instantly. Apply customizable text and logo
          watermarks directly in your browser without losing quality or
          compromising privacy.
        </p>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 w-full">
        <AddWatermarkOnImage />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 text-foreground prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Protect Your Visual Content
          </h2>
          <p className="mb-4">
            Protecting your original photos and graphics is essential for
            safeguarding your hard work. When you share images online, people
            easily download and reuse them without giving proper credit.
            Applying a watermark adds a clear layer of protection that
            identifies you as the creator. Our online tool provides a reliable
            way to brand your visual assets before you publish them to the web.
          </p>
          <p className="mb-4">
            A watermark acts as a deterrent against unauthorized use. Whether
            you are a professional photographer looking to secure client proofs
            or a small business owner sharing product images on social media,
            adding your logo or a copyright text string keeps your brand
            visible. Doing this establishes ownership. Our free web application
            brings this capability directly to your screen without requiring
            complex image editing software installations.
          </p>
          <p className="mb-4">
            Every file you process remains on your local device. We never
            transfer your sensitive images to cloud servers. The entire
            watermarking process takes place in your web browser. This means you
            experience faster processing times while eliminating entirely the
            security risks associated with uploading confidential files to third
            party storage systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the Tool</h2>
          <p className="mb-4">
            Our interface is built for speed and simplicity. You add a watermark
            to your photos by following a direct, organized workflow. First, you
            click the upload area or drag and drop your target image directly
            into the workspace. The tool immediately reads your file and
            prepares it for editing. We support all common formats such as JPG,
            PNG, and WebP for full flexibility.
          </p>
          <p className="mb-4">
            Once your image appears on the screen, you choose the type of
            watermark you wish to apply. If you select text, you type your name
            or copyright notice into the provided input field. You then
            customize the font size, pick a color that contrasts well with your
            image, and adjust the exact position. If you prefer to use a logo,
            you upload an image file with a transparent background. You scale
            this logo and move it to the perfect spot on your main image.
          </p>
          <p className="mb-4">
            The opacity setting gives you final control over how the watermark
            appears. You adjust the slider to make your text or logo more
            transparent. A semi-transparent watermark allows your main image to
            remain clearly visible while still providing solid protection. After
            you configure all settings to your liking, you verify the live
            preview shown on your screen. You click the download button to save
            the updated image directly to your computer. The entire process
            takes less than a minute.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            What the Tool Does and Features
          </h2>
          <p className="mb-4">
            This application simplifies the task of branding and securing your
            image files. It handles both minimal text overlays and custom
            uploaded logos. We developed this platform specifically to give you
            the exact tools you need for image protection without cluttering
            your screen with unnecessary features. The processing algorithm
            applies your modifications instantly.
          </p>
          <p className="mb-4">
            A core feature of our platform is the precise positioning system.
            You drag your text or logo to any corner or center it directly over
            the subject of your photo. The live preview updates immediately as
            you make changes. You see exactly what the final output will look
            like before you execute the download. You avoid the trial and error
            associated with slower server-side processing tools.
          </p>
          <p className="mb-4">
            Furthermore, the opacity control ensures your watermarks are
            professional and unobtrusive. Heavy, solid colors often ruin the
            aesthetic of a beautiful photograph. By lowering the opacity, you
            blend your logo into the picture naturally. You also gain access to
            standard typography controls for text watermarks. You select fonts,
            assign solid colors, and modify spacing to match your established
            brand guidelines. All these features work seamlessly together to
            deliver a polished final product.
          </p>
          <p>
            Because we process everything on your client machine, the tool
            scales effortlessly. You process heavy high-resolution images
            rapidly. Your browser utilizes your local device resources to render
            the final output. The resulting downloaded file maintains the high
            quality dimensions of your original upload alongside your newly
            applied protective branding.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqs} />
        </section>

        <ToolLinkCards tools={relatedTools} />
      </div>
    </div>
  );
}
