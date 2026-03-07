import type { Metadata } from "next";
import WordFrequencyCounter from "@/components/text-tools/WordFrequencyCounter";
import Faqs from "@/components/utils/Faqs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Word Frequency Counter — See Which Words Dominate Your Text",
  description:
    "Free online word frequency counter. Analyze text and see which words appear most with percentage breakdown and CSV export.",
  openGraph: {
    title: "Word Frequency Counter — See Which Words Dominate Your Text",
    description:
      "Free online word frequency counter. Analyze text and see which words appear most with percentage breakdown and CSV export.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/text-tools/word-frequency-counter",
  },
};

const faqsData = [
  {
    question: "What are stop words?",
    answer:
      "Stop words are common words like 'the', 'a', 'is' that are often filtered out in text analysis because they appear frequently but carry less meaning.",
  },
  {
    question: "Can I export the results?",
    answer:
      "Yes. You can export the word frequency data as a CSV file or copy it to your clipboard for use in spreadsheets.",
  },
  {
    question: "Is my text data private?",
    answer:
      "Yes. All text processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "How is word frequency percentage calculated?",
    answer:
      "Each word's percentage is calculated by dividing its count by the total word count. If 'the' appears 50 times in 1000 words, its frequency is 5%.",
  },
  {
    question: "Can I analyze multiple words at once?",
    answer:
      "The tool analyzes all unique words in your text. You can then sort, filter, or search the results to find specific words.",
  },
  {
    question: "What is keyword density?",
    answer:
      "Keyword density is the percentage of times a specific word or phrase appears in your text compared to the total word count. SEO writers often aim for 1-2% density on target keywords.",
  },
];

export default function WordFrequencyCounterPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
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
              <BreadcrumbLink href="/text-tools/word-frequency-counter">
                Word Frequency Counter
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Word Frequency Counter</h1>
        <p className="text-xl text-muted-foreground">
          Find out exactly which words are overused, underused, or absent from your content. Paste in any text and get a ranked frequency table — sortable, filterable, and exportable to CSV.
        </p>
      </header>

      <WordFrequencyCounter />

      <section className="mt-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How the Word Frequency Counter Works</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              This tool analyzes text entirely in your browser. It splits your text into individual words, counts occurrences of each unique word, and calculates frequency percentages.
            </p>
            <p>
              The results appear in a sortable table showing each word, its count, and what percentage of total words it represents. You can sort by count or alphabetically, and filter out common stop words.
            </p>
            <p>
              Export options let you download the data as CSV for further analysis in Excel, Google Sheets, or data visualization tools.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Who Uses Word Frequency Analysis</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>SEO content writers:</strong> Check keyword density to ensure target terms appear frequently enough without triggering keyword stuffing filters.
            </p>
            <p>
              <strong>Editors and proofreaders:</strong> Identify overused words and repetitive phrasing in manuscripts, articles, or marketing copy.
            </p>
            <p>
              <strong>Researchers:</strong> Analyze interview transcripts, survey responses, or academic papers for recurring themes and terminology.
            </p>
            <p>
              <strong>Students:</strong> Review essays for word variety and check if key concepts are adequately emphasized.
            </p>
            <p>
              <strong>Data analysts:</strong> Perform basic text mining on customer feedback, reviews, or social media comments.
            </p>
            <p>
              <strong>Language learners:</strong> Identify the most common words in a text to focus vocabulary study.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Understanding Word Frequency Data</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>High frequency words:</strong> Words appearing 3% or more of the time dominate your text. In normal writing, these are usually stop words. In SEO content, one should be your target keyword.
            </p>
            <p>
              <strong>Medium frequency words:</strong> Words at 1-3% frequency are your core content words. These typically include your main topics and supporting concepts.
            </p>
            <p>
              <strong>Low frequency words:</strong> Words under 1% make up the long tail of your vocabulary. These add specificity and detail.
            </p>
            <p>
              <strong>Zipf's Law:</strong> In any text, the most common word appears roughly twice as often as the second most common, three times as often as the third, and so on. This pattern holds across languages and text types.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">What to Know Before Using This Tool</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              <strong>Stop words skew results:</strong> Without filtering, "the", "a", and "and" will dominate your frequency list. Enable stop word filtering to see meaningful content words.
            </p>
            <p>
              <strong>Word forms are counted separately:</strong> "Run", "runs", and "running" are counted as different words. For stem-based analysis, you'd need more advanced NLP tools.
            </p>
            <p>
              <strong>Case sensitivity:</strong> By default, "The" and "the" are counted together. The tool normalizes to lowercase for accurate frequency counts.
            </p>
            <p>
              <strong>Large texts work fine:</strong> The tool handles books and long documents, but very large texts (100,000+ words) may take a moment to process.
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
