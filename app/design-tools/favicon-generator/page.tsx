import type { Metadata } from "next";
import FaviconGeneratorComponent from "@/components/design-tools/favicon/FaviconGenerator";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Image from "next/image";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

// more tools
const tools = [
  {
    name: "Image Compressor",
    description: "Compress images to reduce file size",
    href: "/image-tools/image-compressor",
  },
  {
    name: "Video Compressor",
    description: "Compress videos on your browser with no file size limit",
    href: "/video-tools/video-compressor",
  },
];

export const metadata: Metadata = {
  title: "Favicon Generator - Create .ICO and PNG Icons from Text, Images or Emoji",
  description:
    "Generate favicons in multiple sizes (16x16 to 512x512) from text, uploaded images, or emoji. Download as ZIP with .ICO and PNG files. No signup required.",
  openGraph: {
    title: "Favicon Generator - Create .ICO and PNG Icons Online",
    description:
      "Create custom favicons from text, images, or emoji. Get .ICO for browsers and PNG for iOS/Android. Free, no upload required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator - Create .ICO and PNG Icons Online",
    description:
      "Generate favicons from text, images, or emoji. Download .ICO and PNG files instantly. No signup, no upload.",
  },
  alternates: {
    canonical: "https://1000freetools.com/design-tools/favicon-generator",
  },
};

export default function FaviconGeneratorPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/design-tools">Design Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/design-tools/favicon-generator">
                Favicon Generator
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* SEO-optimized Hero Section */}
      <section className="container mx-auto px-4 py-8 ">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Favicon Generator - Make .ICO and PNG Icons in Seconds
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Turn text, images, or emoji into favicons that work across browsers. 
            Get .ICO files for Chrome and Firefox, plus PNG files for iOS and Android. 
            Everything processes in your browser - nothing gets uploaded.
          </p>
        </div>
      </section>

      {/* Main Tool Component */}
      <FaviconGeneratorComponent />

      <section className="container mx-auto px-1 md:px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Features Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              What You Get
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Text to Favicon
                  </strong>
                  <span className="text-muted-foreground">
                    Type 1-3 characters and pick from 250+ Google Fonts. Adjust 
                    weight, size, and spacing until it looks right.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Image Converter
                  </strong>
                  <span className="text-muted-foreground">
                    Upload PNG, JPG, or SVG files. The tool resizes them to 
                    standard favicon dimensions while keeping edges sharp.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Emoji Support
                  </strong>
                  <span className="text-muted-foreground">
                    Pick any emoji and place it on a colored background. Works 
                    better than copying emoji directly into your HTML.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Complete Package
                  </strong>
                  <span className="text-muted-foreground">
                    Download a ZIP with .ico (16x16, 32x32) and PNG files 
                    (16, 32, 64, 150, 180, 192, 512px) plus HTML code to copy.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Why Choose Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              How This Compares
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    No Upload Required
                  </strong>
                  <span className="text-muted-foreground">
                    The Canvas API renders everything locally. Your logo or 
                    text never leaves your computer.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Multiple Sizes in One Go
                  </strong>
                  <span className="text-muted-foreground">
                    Get 16x16 for browser tabs, 180x180 for iOS home screens, 
                    and 512x512 for Android - all from the same design.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Live Preview
                  </strong>
                  <span className="text-muted-foreground">
                    See your favicon at 16x16, 32x32, and 64x64 before 
                    downloading. What looks good at 512px can disappear at 16px.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <strong className="block text-foreground">
                    Ready-to-Use HTML
                  </strong>
                  <span className="text-muted-foreground">
                    The ZIP includes a README with the exact &lt;link&gt; tags 
                    for your &lt;head&gt; section.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">1. Pick Your Source</h3>
            <p className="text-muted-foreground">
              Choose text (1-3 characters), upload an image, or select an emoji. 
              For text, you get access to Google Fonts with weight and size controls.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Customize the Look</h3>
            <p className="text-muted-foreground">
              Set background and foreground colors. Pick a shape - square, circle, 
              or rounded corners. The preview updates as you change settings.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Download</h3>
            <p className="text-muted-foreground">
              Click "Download All as ZIP" to get favicon.ico and PNG files at 
              16, 32, 64, 150, 180, 192, and 512 pixels. The ZIP includes HTML 
              code for your site.
            </p>
          </div>
        </div>
      </section>

      {/* Real Use Cases Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          When You'd Use This
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Side project landing page</h3>
            <p className="text-muted-foreground">
              You just deployed a Next.js app and need a favicon before sharing 
              it. Type the first letter of your project name, match your brand 
              color, and you're done in two minutes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Client website from scratch</h3>
            <p className="text-muted-foreground">
              The client sent a logo PNG but it's 2000x2000 pixels. Upload it 
              here, get the resized versions, and drop them into the site root.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Internal dashboard or admin panel</h3>
            <p className="text-muted-foreground">
              Your team has six similar dashboards open. A colored emoji favicon 
              makes each tab instantly recognizable without reading the title.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Portfolio or personal site</h3>
            <p className="text-muted-foreground">
              Use your initials in a nice font instead of hunting for the right 
              icon. Adjust the weight until it matches your site's typography.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          What to Know Before Using This
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Text works best at 1-3 characters</h3>
            <p className="text-muted-foreground">
              At 16x16 pixels, anything longer becomes unreadable. If you need 
              more text, consider using the image upload with a pre-made graphic.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Google Fonts need a moment to load</h3>
            <p className="text-muted-foreground">
              When you switch fonts, there's a brief delay while the font loads 
              from Google's servers. The preview won't update until it's ready.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Check the 16x16 preview</h3>
            <p className="text-muted-foreground">
              Designs that look sharp at 512px can turn muddy at tab size. Use 
              the live preview to catch issues before downloading.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">ICO vs PNG - when to use each</h3>
            <p className="text-muted-foreground">
              Modern browsers handle PNG fine, but .ico is still the safest bet 
              for cross-browser compatibility. The ZIP includes both.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto px-4 py-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Faqs
          faqs={[
            {
              question: "What sizes are included in the download?",
              answer:
                "You get .ico files (which contain 16x16 and 32x32) plus individual PNG files at 16, 32, 64, 150, 180, 192, and 512 pixels. That covers browser tabs, taskbar icons, iOS home screens, and Android app icons.",
            },
            {
              question: "How do I add the favicon to my website?",
              answer:
                "Extract the ZIP file and put the images in your website's root folder. Then copy the HTML code from the included README.txt into the <head> section of your pages. For most sites, you need the .ico file and at least the 180x180 PNG for iOS devices.",
            },
            {
              question: "Can I use a multi-color logo as a favicon?",
              answer:
                "Yes, upload it as an image. The tool preserves all colors from your original file. Just keep in mind that fine details may not be visible at 16x16 pixels, so simple logos work better.",
            },
            {
              question: "Why does my text look different than the font preview?",
              answer:
                "Google Fonts load from an external server, so there's a brief delay. Wait for the font to fully load before downloading. If it still looks off, try increasing the font size percentage or switching to a bolder weight.",
            },
            {
              question: "Do I need to include all the generated files?",
              answer:
                "Not necessarily. For a basic setup, just use favicon.ico and the 180x180 PNG for iOS. The other sizes are optional - include them if you want full coverage across all devices and browsers.",
            },
            {
              question: "Is this really free for commercial use?",
              answer:
                "Yes. The generated favicons are yours to use however you want. No attribution required, no usage limits. The Google Fonts used are also free for commercial use under their respective licenses.",
            },
            {
              question: "What happens to my uploaded images?",
              answer:
                "Nothing - they never leave your browser. The tool uses the Canvas API to process everything locally. Close the tab and your images are gone from memory.",
            },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What sizes are included in the download?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You get .ico files (which contain 16x16 and 32x32) plus individual PNG files at 16, 32, 64, 150, 180, 192, and 512 pixels. That covers browser tabs, taskbar icons, iOS home screens, and Android app icons.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I add the favicon to my website?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Extract the ZIP file and put the images in your website's root folder. Then copy the HTML code from the included README.txt into the <head> section of your pages. For most sites, you need the .ico file and at least the 180x180 PNG for iOS devices.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use a multi-color logo as a favicon?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, upload it as an image. The tool preserves all colors from your original file. Just keep in mind that fine details may not be visible at 16x16 pixels, so simple logos work better.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why does my text look different than the font preview?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Google Fonts load from an external server, so there's a brief delay. Wait for the font to fully load before downloading. If it still looks off, try increasing the font size percentage or switching to a bolder weight.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to include all the generated files?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Not necessarily. For a basic setup, just use favicon.ico and the 180x180 PNG for iOS. The other sizes are optional - include them if you want full coverage across all devices and browsers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this really free for commercial use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. The generated favicons are yours to use however you want. No attribution required, no usage limits. The Google Fonts used are also free for commercial use under their respective licenses.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens to my uploaded images?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nothing - they never leave your browser. The tool uses the Canvas API to process everything locally. Close the tab and your images are gone from memory.",
                  },
                },
              ],
            }),
          }}
        />
      </section>

      <section className="px-1 md:px-4">
        <ToolLinkCards tools={tools} />
      </section>
    </div>
  );
}
