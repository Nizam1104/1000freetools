import type { Metadata } from "next";
import JSOnlineCompiler from "@/components/developer-tools/JSOnlineCompiler";
import Script from "next/script";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Free JavaScript Online Compiler – Run JS Code in Browser",
  description:
    "Write and execute JavaScript code instantly with our free online compiler. No setup required. Supports ES6+, async/await, and real-time console output.",
  openGraph: {
    title: "Free JavaScript Online Compiler Tool",
    description:
      "Run JavaScript code directly in your browser. Free online JS editor with live console, no installation needed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JavaScript Online Compiler Tool",
    description:
      "Run JavaScript code directly in your browser. Free online JS editor with live console, no installation needed.",
  },
  alternates: {
    canonical: "https://1000freetools.com/developer-tools/js-online-compiler",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this JavaScript compiler free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this JavaScript online compiler is completely free. No sign-up, no limits, and it runs entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install anything to use this JS editor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No installation required. This online JavaScript compiler runs 100% in your browser using Monaco Editor (the same engine behind VS Code).",
      },
    },
    {
      "@type": "Question",
      name: "Does this support async/await and ES6 features?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the compiler supports modern JavaScript including async/await, arrow functions, destructuring, modules syntax, and all ES6+ features.",
      },
    },
    {
      "@type": "Question",
      name: "Is my code saved or sent to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your code runs locally in your browser and is never sent to any server. You can optionally save snippets to your browser's localStorage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save my JavaScript code for later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can save code snippets directly in the editor. They're stored in your browser's localStorage and persist between sessions.",
      },
    },
  ],
};

export default function JSOnlineCompilerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <div className="mb-2 sm:mb-4 md:-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/developer-tools">
                Developer Tools
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/developer-tools/js-online-compiler">
                JavaScript Online Compiler
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <JSOnlineCompiler />
    </div>
  );
}
