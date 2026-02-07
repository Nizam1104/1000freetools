import ImageCompressor from "@/components/image-tools/image-compressor/ImageCompressor";

import Faqs from "@/components/utils/Faqs";
import NextImage from "next/image";

export default function ImageCompressorPage() {
  const faqsData = [
    {
      question: "How does image compression work?",
      answer:
        "Image compression reduces file size by removing unnecessary data or optimizing how image information is stored. Our tool offers both lossless compression (no quality loss) and lossy compression (smaller files with minimal visible quality reduction).",
    },
    {
      question: "Can I compress images without losing quality?",
      answer:
        "Yes! Our free online image compressor without losing quality uses lossless compression algorithms that reduce file size while maintaining 100% of the original image quality. Simply select the lossless option before compressing.",
    },
    {
      question: "How many images can I compress at once?",
      answer:
        "You can compress 50 images at once free, and even more if needed. Our bulk image compressor has no strict file limits - it's a truly free image compressor no file limit service. Process hundreds of images in a single batch if required.",
    },
    {
      question: "What image formats do you support?",
      answer:
        "We support all major formats including JPEG, PNG, WebP, AVIF, QOI, JXL, and WP2. You can also convert between formats - for example, convert JPG to WebP with compression or use our AVIF image converter and compressor.",
    },
    {
      question: "Can I compress PNG to a specific file size like 100KB?",
      answer:
        "Yes! You can compress PNG to 100KB or compress images to 20KB by adjusting the quality settings. Our tool gives you precise control over the output file size, making it easy to meet specific requirements for websites, email, or other platforms.",
    },
    {
      question: "Is this really free with no limits?",
      answer:
        "Absolutely! This is a completely free unlimited image compression service with no hidden fees, no signup requirements, and no daily limits. Compress images for website free unlimited, batch compress images online free, or reduce large images for email free - anytime, as much as you need.",
    },
    {
      question: "How do I compress multiple images at once?",
      answer:
        "Simply drag and drop multiple files into the upload area, or click to select multiple images from your computer. Our bulk image compression tool online will process all files simultaneously and let you download them as individual files or as a convenient zip archive.",
    },
    {
      question:
        "What's the difference between JPEG, WebP, and AVIF compression?",
      answer:
        "JPEG is the most widely supported format, great for photos. WebP offers better compression than JPEG with similar quality and works in all modern browsers. AVIF provides even better compression than WebP but has slightly less browser support. Our tool lets you compress JPEG online, use our WebP converter, or convert and compress images to AVIF based on your needs.",
    },
    {
      question: "Will compressing images improve my website's SEO?",
      answer:
        "Yes! Optimizing images for web performance free is crucial for SEO. Smaller image files improve page load speed, which is a ranking factor for search engines. Our best online image optimizer for SEO helps you achieve faster Core Web Vitals scores and better user experience.",
    },
    {
      question: "Can I use this tool for commercial projects?",
      answer:
        "Yes! Our free bulk photo compressor tool is available for both personal and commercial use. Whether you're optimizing images for a client website, preparing product photos for an online store, or reducing photo size for website upload, you can use our tool freely.",
    },
    {
      question: "Are my images stored on your servers?",
      answer:
        "No. All image compression happens directly in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security. Once you close the browser tab, all data is immediately deleted.",
    },
    {
      question: "What's the best compression setting to use?",
      answer:
        "It depends on your needs. For archival or professional photography, use lossless image compression. For web use, a quality setting of 80-90% offers excellent visual quality with significant file size reduction. For email or social media where file size is critical, you can go lower to compress large images for email free while maintaining acceptable quality.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Title and description */}
      <div className="prose max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mt-4 mb-4">
          Compress Images Online - Fast, Free, and Unlimited
        </h1>
        <p className="mb-6">
          Whether you need to compress a single photo or process hundreds of
          images at once, our tool handles it all. We support all popular
          formats including JPEG, PNG, WebP, and AVIF, with no file limits or
          hidden fees.
        </p>

        <ImageCompressor />

        <h2 className="text-2xl font-semibold mt-4 mb-4">
          Why Compress Your Images?
        </h2>
        <p className="mb-4">
          Large image files slow down your website, eat up storage space, and
          take forever to upload. By compressing images, you can:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Speed up your website</strong> - Smaller images mean faster
            page loads and better SEO rankings
          </li>
          <li>
            <strong>Save storage space</strong> - Reduce file sizes by up to 80%
            without noticeable quality loss
          </li>
          <li>
            <strong>Share easily</strong> - Compressed photos upload faster to
            email, social media, and cloud storage
          </li>
          <li>
            <strong>Improve performance</strong> - Optimized images use less
            bandwidth and load instantly on mobile devices
          </li>
        </ul>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Compare before and after
          </h2>
          <p>
            You can compare the original and compressed iamges here side by side
            original image on the left and compressed image on the right
            Original is 4MB and compressed is 700KB You can compress image to
            100KB also for PNG images and 20KB for JPEG images without
            significant quality loss
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <NextImage
              src="https://cdn.1000freetools.com/static-assets/on-page-images/image-compressor-original-image.png"
              alt="Original Image"
              width={400}
              height={300}
            />
            <NextImage
              src="https://cdn.1000freetools.com/static-assets/on-page-images/image-compressor-after-image.png"
              alt="Compressed Image"
              width={400}
              height={300}
            />
          </div>
          <div>
            Photo by{" "}
            <a href="https://unsplash.com/@jpsmedia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Jack Stapleton
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/photos/two-black-cars-parked-on-a-street-t2BHviYqB1g?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use Our Free Image Compressor
        </h2>
        <p className="mb-4">
          Using our online image compressor is incredibly simple, whether you're
          working with a single photo or need to batch compress images:
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            <strong>Upload your images</strong> - Drag and drop your files or
            click to browse. You can compress 50 images at once free, or even
            more if needed
          </li>
          <li>
            <strong>Choose your settings</strong> - Select lossless image
            compression for perfect quality, or adjust the quality slider to
            reduce image size further. You can compress images to 20KB or
            compress PNG to 100KB depending on your needs
          </li>
          <li>
            <strong>Download instantly</strong> - Get your compressed images
            individually or as a convenient zip file for bulk downloads
          </li>
        </ol>
        <p className="mb-6">
          Our bulk image compressor handles multiple files simultaneously,
          making it the perfect choice when you need to compress multiple images
          for website uploads, email attachments, or social media posts.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Powerful Features for Every Need
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>Batch Image Compression</strong> - Our bulk image
            compression tool online lets you compress multiple images
            simultaneously online. Process entire photo galleries in seconds
            with our free unlimited image compression service
          </li>
          <li>
            <strong>Format Conversion & Optimization</strong> - Convert JPG to
            WebP with compression, use our AVIF image converter and compressor,
            or compress JPEG online. We support all modern formats including
            WebP converter, AVIF compressor, and more
          </li>
          <li>
            <strong>Advanced Compression Engines</strong> - Powered by MozJPEG
            compressor online free and WebP2 image compression tool technology
            for superior results. Our algorithms reduce photo size for website
            upload while maintaining exceptional visual quality
          </li>
          <li>
            <strong>Lossless & Lossy Options</strong> - Choose free online image
            compressor without losing quality for perfect preservation, or
            compress images for website free unlimited with adjustable quality
            settings
          </li>
          <li>
            <strong>Flexible File Sizes</strong> - Need to compress PNG to
            smallest size online? Or reduce large images for email free? Set
            your target and compress images to 20KB or any size you need
          </li>
          <li>
            <strong>No File Limits</strong> - Unlike other services, we're a
            free image compressor no file limit tool. Batch convert images to
            WebP free or compress images in bulk for free without restrictions
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Best Online Image Optimizer for SEO and Web Performance
        </h2>
        <p className="mb-6">
          Web designers and developers choose our tool as the best free image
          compressor for web optimization. When you optimize images for web
          performance free, you improve Core Web Vitals scores, boost SEO
          rankings, and create faster user experiences.
        </p>
        <p className="mb-6">
          Our image size reducer online uses industry-leading compression
          technology to deliver the smallest possible file sizes. Whether you
          need to compress JPEG without quality loss online or batch compress
          images online free, our tool maintains visual quality that looks
          stunning on any device.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          All Formats Supported
        </h2>
        <p className="mb-4">
          Our versatile photo compressor works with all popular image formats:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>JPEG/JPG</strong> - Compress JPEG online with our advanced
            MozJPEG engine for maximum efficiency
          </li>
          <li>
            <strong>PNG</strong> - Compress PNG online with transparency
            preservation, or compress PNG to 100KB for specific size
            requirements
          </li>
          <li>
            <strong>WebP</strong> - Convert and compress to WebP format for
            modern web compatibility and smaller file sizes
          </li>
          <li>
            <strong>AVIF</strong> - Use our AVIF compressor to convert and
            compress images to AVIF, the newest high-efficiency format
          </li>
          <li>
            <strong>And more</strong> - Support for QOI, JXL, and other emerging
            formats
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Perfect for Bulk Processing
        </h2>
        <p className="mb-6">
          Need a bulk photo compressor tool? Our batch image compressor is
          designed for efficiency. Compress multiple images simultaneously
          online without waiting for each file to process individually. Whether
          you're preparing images for a website launch, organizing a photo
          library, or optimizing product images for an e-commerce store, our
          bulk compress images online free service handles it all.
        </p>
        <p className="mb-6">
          The best part? It's a completely free unlimited image compression tool
          with no hidden fees, no signup requirements, and no file size or
          quantity restrictions. Just upload, compress, and download.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Free, Unlimited, No Signup Required
        </h2>
        <p className="mb-6">
          Unlike other image compressor online free services that limit your
          uploads or require registration, we provide unlimited free image
          compression service. Process as many photos as you need, whenever you
          need - completely free. Our free bulk photo compressor tool is always
          available, with no daily limits or premium upsells.
        </p>
        <p className="mb-6">
          Ready to reduce image file size without losing quality? Upload your
          first file above and experience the best online image optimizer for
          SEO and web performance. Whether you need to compress large images for
          email free or optimize images for website free unlimited, we've got
          you covered.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Frequently Asked Questions
        </h2>

        <Faqs faqs={faqsData} />
        {/* Attribution */}
        <div className="mt-8 p-4 rounded-lg text-sm">
          <p>
            <strong>Attribution:</strong> This tool uses compression libraries
            from{" "}
            <a
              href="https://github.com/GoogleChromeLabs/squoosh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Squoosh
            </a>
            , an image compression tool developed by Google Chrome Labs.
          </p>
        </div>
      </div>
    </div>
  );
}
