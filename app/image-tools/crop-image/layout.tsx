import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Image Cropper Tool | Crop Images Online Free",
  description:
    "Professional online image cropping tool. Crop images for free with rectangle or freehand selection. No download required, instant results, supports all image formats including JPG, PNG, WebP.",
  authors: [{ name: "1000freetools" }],
  creator: "1000freetools",
  publisher: "1000freetools",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Free Online Image Cropper | Crop Images Instantly",
    description:
      "Crop images online for free with professional precision. Support for JPG, PNG, WebP. Rectangle and freehand selection tools available.",
    url: "/image-tools/crop-image",
    siteName: "1000freetools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/crop-image-tool-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Image Cropper Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Cropper | Crop Images Instantly",
    description:
      "Professional image cropping tool online. No download required. Support for all image formats.",
    images: ["/images/crop-image-tool-twitter.jpg"],
    creator: "@1000freetools",
  },
  alternates: {
    canonical: "/image-tools/crop-image",
  },
  other: {
    "theme-color": "#3b82f6",
    "msapplication-TileColor": "#3b82f6",
  },
};

// SEO data that can be used within the page component
export const seoData = {
  heading: {
    h1: "Free Online Image Cropper - Crop Images Instantly",
    h2: "Professional Photo Cropping Tool | No Download Required",
  },
  description: {
    main: "The best free online image cropper that lets you crop photos instantly without any software download. Our professional cropping tool supports rectangle and freehand selection for precise image editing.",
    features: [
      "Crop images online for free with no registration required",
      "Support for all major image formats (JPG, PNG, WebP, GIF, BMP)",
      "Rectangle and freehand selection tools for precise cropping",
      "Instant results with high-quality output preservation",
      "No watermarks - download your cropped images in original quality",
      "Works directly in your browser with secure local processing",
      "Mobile-responsive design for cropping images on any device",
      "Advanced features like aspect ratio preservation and custom dimensions",
    ],
  },
  faq: [
    {
      question: "How do I crop an image online for free?",
      answer:
        'Simply upload your image to our free online cropper, select the area you want to crop using either rectangle or freehand selection, and click "Crop Image" to get your result instantly.',
    },
    {
      question: "What image formats are supported for cropping?",
      answer:
        "Our cropping tool supports all major image formats including JPG, JPEG, PNG, WebP, GIF, BMP, and TIFF. You can upload any standard image format for cropping.",
    },
    {
      question: "Is the image cropper really free with no watermarks?",
      answer:
        "Yes! Our image cropper is completely free with no registration required. We don't add any watermarks to your cropped images, and you can download them in their original quality.",
    },
    {
      question: "Can I crop images with specific dimensions or aspect ratios?",
      answer:
        "Absolutely! Use our rectangle selection tool to crop images with precise dimensions. You can create custom-sized crops or maintain specific aspect ratios for social media, web, or print requirements.",
    },
    {
      question:
        "What's the difference between rectangle and freehand cropping?",
      answer:
        "Rectangle cropping creates perfect rectangular selections with adjustable corners and edges, ideal for standard crops. Freehand cropping lets you draw custom shapes for creative or irregular selections.",
    },
    {
      question: "Is my image data secure when using this online cropper?",
      answer:
        "Yes, all image processing happens locally in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security for your photos.",
    },
  ],
  benefits: [
    {
      title: "Instant Processing",
      description:
        "Crop images instantly without waiting. Our efficient tool delivers results in seconds.",
    },
    {
      title: "High Quality Output",
      description:
        "Maintain original image quality. No compression or quality loss during the cropping process.",
    },
    {
      title: "No Installation Required",
      description:
        "Works directly in your browser. No software download or installation needed.",
    },
    {
      title: "Professional Tools",
      description:
        "Advanced cropping features including resize handles, drag-to-move, and precise selection.",
    },
    {
      title: "Mobile Friendly",
      description:
        "Crop images on any device. Our responsive design works perfectly on mobile and tablet.",
    },
    {
      title: "Privacy First",
      description:
        "All processing happens locally. Your images never leave your device.",
    },
  ],
  useCases: [
    "Social media profile pictures and cover photos",
    "Product images for e-commerce websites",
    "Thumbnail creation for videos and articles",
    "Remove unwanted elements from photos",
    "Create focused compositions from larger images",
    "Prepare images for presentations and documents",
    "Resize images for specific display requirements",
    "Create banners and header images",
    "Extract specific portions from screenshots",
    "Prepare images for print media with precise dimensions",
  ],
  relatedTools: [
    "Image Resizer",
    "Image Compressor",
    "Format Converter",
    "Background Remover",
    "Image Editor",
    "Watermark Remover",
  ],
};

export default function CropImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="crop-image-layout">
      {children}

      {/* Hidden SEO content for search engines */}
      <div className="sr-only">
        <h2>Professional Image Cropping Features</h2>
        <p>
          Our advanced image cropper offers professional-grade features
          including: precise pixel-perfect cropping, multiple selection tools,
          instant preview, high-quality output, and support for all image
          formats. Perfect for social media, e-commerce, web design, and
          professional photo editing.
        </p>

        <h3>Why Choose Our Online Image Cropper?</h3>
        <p>
          Free forever, no watermarks, secure local processing, no registration
          required, instant results, mobile-friendly, professional tools, and
          excellent customer support.
        </p>

        <h3>How to Crop Images Online</h3>
        <ol>
          <li>Upload your image by clicking the file input</li>
          <li>Choose rectangle or freehand selection tool</li>
          <li>Select the area you want to crop</li>
          <li>Adjust selection using handles or drag to reposition</li>
          <li>Click "Crop Image" to process</li>
          <li>Download your cropped image instantly</li>
        </ol>
      </div>
    </div>
  );
}
