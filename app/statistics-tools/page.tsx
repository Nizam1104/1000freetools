import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Sigma, ArrowRight } from "lucide-react";

const statisticsTools = [
  {
    name: "A/B Test Significance Calculator",
    description: "Calculate statistical significance for A/B tests",
    href: "/statistics-tools/ab-test-significance-calculator",
  },
  {
    name: "ANOVA Calculator",
    description: "Perform Analysis of Variance (ANOVA) tests",
    href: "/statistics-tools/anova-calculator",
  },
  {
    name: "Binomial Distribution Calculator",
    description: "Calculate binomial probabilities and distributions",
    href: "/statistics-tools/binomial-distribution-calculator",
  },
  {
    name: "Box Plot Generator",
    description: "Create box-and-whisker plots from data",
    href: "/statistics-tools/box-plot-generator",
  },
  {
    name: "Chi-Square Test Calculator",
    description: "Perform chi-square tests for independence",
    href: "/statistics-tools/chi-square-test-calculator",
  },
  {
    name: "Confidence Interval Calculator",
    description: "Calculate confidence intervals for means and proportions",
    href: "/statistics-tools/confidence-interval-calculator",
  },
  {
    name: "Correlation Calculator",
    description: "Calculate Pearson and Spearman correlation coefficients",
    href: "/statistics-tools/correlation-calculator",
  },
  {
    name: "Descriptive Statistics Calculator",
    description: "Calculate mean, median, mode, standard deviation, and more",
    href: "/statistics-tools/descriptive-statistics-calculator",
  },
  {
    name: "Histogram Maker",
    description: "Create histograms from data distributions",
    href: "/statistics-tools/histogram-maker",
  },
  {
    name: "Linear Regression Calculator",
    description: "Perform linear regression analysis",
    href: "/statistics-tools/linear-regression-calculator",
  },
  {
    name: "Normal Distribution Calculator",
    description: "Calculate probabilities for normal distributions",
    href: "/statistics-tools/normal-distribution-calculator",
  },
  {
    name: "Outlier Detector",
    description: "Identify outliers using IQR and Z-score methods",
    href: "/statistics-tools/outlier-detector",
  },
  {
    name: "P-Value Calculator",
    description: "Calculate p-values for various test statistics",
    href: "/statistics-tools/p-value-calculator",
  },
  {
    name: "Permutation & Combination Calculator",
    description: "Calculate permutations and combinations",
    href: "/statistics-tools/permutation-combination-calculator",
  },
  {
    name: "Probability Calculator",
    description: "Calculate probabilities for various distributions",
    href: "/statistics-tools/probability-calculator",
  },
  {
    name: "Random Number Generator",
    description: "Generate random numbers with various distributions",
    href: "/statistics-tools/random-number-generator",
  },
  {
    name: "Sample Size Calculator (Surveys)",
    description: "Calculate required sample size for surveys",
    href: "/statistics-tools/sample-size-calculator-surveys",
  },
  {
    name: "Standard Deviation Calculator",
    description: "Calculate standard deviation and variance",
    href: "/statistics-tools/standard-deviation-calculator",
  },
  {
    name: "Statistical Power Calculator",
    description: "Calculate statistical power for hypothesis tests",
    href: "/statistics-tools/statistical-power-calculator",
  },
  {
    name: "T-Test Calculator",
    description: "Perform one-sample, two-sample, and paired t-tests",
    href: "/statistics-tools/t-test-calculator",
  },
  {
    name: "Z-Score Calculator",
    description: "Calculate Z-scores and percentile ranks",
    href: "/statistics-tools/z-score-calculator",
  },
];

export const metadata: Metadata = {
  title: "Free Statistics Tools Online - 21 Statistical Calculators",
  description:
    "Free online statistics tools for calculating descriptive stats, hypothesis tests, distributions, and regression. A/B test calculator, t-test, ANOVA, chi-square. All tools run in your browser.",
  openGraph: {
    title: "Free Statistics Tools Online - 21 Statistical Calculators",
    description:
      "Free online statistics tools for calculating descriptive stats, hypothesis tests, distributions, and regression. A/B test calculator, t-test, ANOVA, chi-square. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/statistics-tools",
  },
};

export default function StatisticsToolsPage() {
  const faqsData = [
    {
      question: "Are these statistics tools really free?",
      answer:
        "Yes. All 21 statistics tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or get uploaded to any server.",
    },
    {
      question: "How accurate are these calculations?",
      answer:
        "Tools use standard statistical formulas and algorithms. Results are suitable for educational and professional use. For critical applications, verify with statistical software.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "What distributions are supported?",
      answer:
        "Tools support normal distribution, t-distribution, chi-square distribution, F-distribution, binomial distribution, and more.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Sigma className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Statistics Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online statistics tools for calculating descriptive stats, hypothesis tests, and distributions.
              T-test, ANOVA, chi-square, regression — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={statisticsTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Math Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our math tools or chart tools for more utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/math-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Math Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These Statistics Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 21 free statistics tools that run entirely in your browser. No software installation, no server uploads, no waiting. You enter data, select a test or calculation, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: calculating descriptive statistics (mean, median, standard deviation, variance), performing hypothesis tests (t-tests, ANOVA, chi-square, A/B tests), working with probability distributions (normal, binomial, Z-scores), and creating statistical visualizations (histograms, box plots).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your data as comma-separated values or upload a file</li>
              <li>Select the statistical test or calculation type</li>
              <li>Adjust settings like confidence level or significance threshold</li>
              <li>View results with interpretations and copy or download</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript statistical libraries. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Students</strong> learn statistics concepts, practice hypothesis testing, calculate descriptive statistics for assignments, or visualize distributions.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Researchers</strong> perform statistical tests for studies, calculate sample sizes for experiments, or analyze survey data.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Data analysts</strong> calculate correlations, detect outliers, run regression analysis, or create statistical summaries for reports.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Product managers</strong> analyze A/B test results, calculate confidence intervals for metrics, or determine statistical significance of changes.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Descriptive Statistics</h3>
            <p className="text-muted-foreground mb-4">
              Descriptive Statistics Calculator computes mean, median, mode, range, variance, standard deviation, skewness, and kurtosis. Standard Deviation Calculator focuses on variability measures.
            </p>

            <h3 className="text-xl font-semibold mb-3">Hypothesis Testing</h3>
            <p className="text-muted-foreground mb-4">
              T-Test Calculator handles one-sample, two-sample, and paired t-tests. ANOVA Calculator performs Analysis of Variance. Chi-Square Test Calculator tests independence. A/B Test Significance Calculator evaluates experiment results. P-Value Calculator computes significance levels.
            </p>

            <h3 className="text-xl font-semibold mb-3">Probability Distributions</h3>
            <p className="text-muted-foreground mb-4">
              Normal Distribution Calculator computes probabilities and percentiles. Binomial Distribution Calculator handles discrete probabilities. Z-Score Calculator standardizes values. Probability Calculator works with multiple distributions.
            </p>

            <h3 className="text-xl font-semibold mb-3">Regression & Correlation</h3>
            <p className="text-muted-foreground mb-4">
              Linear Regression Calculator fits lines to data and computes R-squared. Correlation Calculator computes Pearson and Spearman coefficients.
            </p>

            <h3 className="text-xl font-semibold mb-3">Statistical Planning</h3>
            <p className="text-muted-foreground mb-4">
              Sample Size Calculator determines required participants for surveys. Statistical Power Calculator computes test power. Random Number Generator creates random samples.
            </p>

            <h3 className="text-xl font-semibold mb-3">Data Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Outlier Detector identifies anomalies using IQR and Z-score methods. Box Plot Generator creates visual summaries. Histogram Maker shows distributions.
            </p>

            <h3 className="text-xl font-semibold mb-3">Combinatorics</h3>
            <p className="text-muted-foreground mb-4">
              Permutation & Combination Calculator computes arrangements and selections.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Assumptions:</strong> Statistical tests have assumptions (normality, equal variance, independence). Verify assumptions before interpreting results.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Sample size:</strong> Small samples may not meet test assumptions. Results may be unreliable for n < 30 without normality.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Multiple testing:</strong> Running many tests increases false positive risk. Consider corrections like Bonferroni for multiple comparisons.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Correlation vs causation:</strong> Correlation doesn't imply causation. Statistical relationships don't prove cause-and-effect.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Statistics tools often mean expensive software (SPSS, SAS, Stata), programming in R or Python, or graphing calculators. But sometimes you need to quickly run a t-test, calculate a confidence interval, or check if your A/B test results are significant. These tools exist because statistics shouldn't require a statistics degree or a $1000 license. Everything runs in your browser — no installation, no cost, no barriers to understanding your data.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
