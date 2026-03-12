import type { Metadata } from "next";
import LoremIpsumGenerator from "@/components/text-tools/LoremIpsumGenerator";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Placeholder Text in Seconds",
  description:
    "Free online Lorem Ipsum generator. Generate placeholder text by words, sentences, or paragraphs with HTML output option.",
  openGraph: {
    title: "Lorem Ipsum Generator — Placeholder Text in Seconds",
    description:
      "Free online Lorem Ipsum generator. Generate placeholder text by words, sentences, or paragraphs with HTML output option.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/lorem-ipsum-generator",
  },
};

const faqsData = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is dummy text used by designers and developers to fill space in mockups and prototypes. It has been the industry standard placeholder text since the 1500s.",
  },
  {
    question: "Can I generate HTML output?",
    answer:
      "Yes. Enable the 'Wrap in HTML <p> tags' option to get your Lorem Ipsum text wrapped in paragraph tags, ready to paste into your HTML.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. This Lorem Ipsum generator is completely free with no registration required.",
  },
  {
    question: "Where does Lorem Ipsum come from?",
    answer:
      "Lorem Ipsum comes from Cicero's 'De Finibus Bonorum et Malorum' (The Ends of Good and Evil), written in 45 BC. The text is scrambled Latin from sections 1.10.32 and 1.10.33.",
  },
  {
    question: "Why use Lorem Ipsum instead of real text?",
    answer:
      "Placeholder text prevents viewers from being distracted by readable content when reviewing designs. It lets you focus on layout, typography, and visual hierarchy.",
  },
  {
    question: "Can I generate exactly 100 words?",
    answer:
      "Yes. Select 'By word count' and enter any number. The generator will produce Lorem Ipsum text as close to that exact word count as possible.",
  },
];

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-2 md:px-4">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/text-tools">Text Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/text-tools/lorem-ipsum-generator">
                Lorem Ipsum Generator
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Lorem Ipsum Generator</h1>
        <p className="text-xl text-muted-foreground">
          Generate exactly the amount of dummy text you need — by word, sentence, or paragraph count — with options for classic Latin, HTML output, or randomized variation. Designers and devs, this one's for you.
        </p>
      </header>

      <LoremIpsumGenerator />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Lorem Ipsum Generator Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This generator creates placeholder text entirely in your browser. Choose your output format (words, sentences, or paragraphs), set the quantity, and click generate.
            </p>
            <p>
              The classic Lorem Ipsum text comes from a standard Latin passage. The generator can also produce randomized Latin-like text or HTML-wrapped output for direct use in web projects.
            </p>
            <p>
              A copy button lets you grab the generated text and paste it directly into your design mockup, wireframe, or code.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">When to Use Lorem Ipsum</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Website mockups:</strong> Fill content areas in Figma, Sketch, or Adobe XD designs before real copy is written.
            </p>
            <p>
              <strong>Print layouts:</strong> Test typography and column widths in brochures, magazines, and posters.
            </p>
            <p>
              <strong>Web development:</strong> Populate templates and components during development when content isn't ready.
            </p>
            <p>
              <strong>Email templates:</strong> Preview how email clients render different text lengths and line breaks.
            </p>
            <p>
              <strong>App prototypes:</strong> Fill UI elements like cards, lists, and detail views in mobile app mockups.
            </p>
            <p>
              <strong>CMS testing:</strong> Test how content management systems handle varying text lengths and formatting.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Lorem Ipsum Alternatives</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Cupcake Ipsum:</strong> Sweet-themed placeholder text with words like "cupcake," "chocolate," and "donut."
            </p>
            <p>
              <strong>Hipster Ipsum:</strong> Uses Brooklyn-centric vocabulary like "artisan," "locavore," and "single-origin."
            </p>
            <p>
              <strong>Corporate Ipsum:</strong> Business jargon placeholder text with words like "synergy," "deliverables," and "paradigm."
            </p>
            <p>
              <strong>Bacon Ipsum:</strong> Meat-themed placeholder text for when you want something different from standard Latin.
            </p>
            <p>
              <strong>Plain English:</strong> Some designers prefer readable English to better estimate how real content will flow.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Word counts are approximate:</strong> The generator gets as close as possible to your requested count, but exact word counts may vary slightly due to sentence structure.
            </p>
            <p>
              <strong>HTML output wraps in paragraph tags:</strong> Each paragraph gets its own &lt;p&gt; tag. This is ready for direct use in HTML but may need adjustment for other contexts.
            </p>
            <p>
              <strong>Classic Lorem Ipsum repeats:</strong> The standard text is finite and will repeat if you generate large amounts. Use the random option for more variation.
            </p>
            <p>
              <strong>Not for final content:</strong> Always replace Lorem Ipsum with real content before launch. Designs often need adjustment once real copy is inserted.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Faqs faqs={faqsData} />
        </div>
      </section>
    </div>
  );
}
