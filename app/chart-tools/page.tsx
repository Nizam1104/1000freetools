import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";

const chartTools = [
  {
    name: "Bar Graph Generator",
    description: "Create vertical or horizontal bar charts from data",
    href: "/chart-tools/bar-graph-generator",
  },
  {
    name: "Box Plot Maker",
    description: "Generate box-and-whisker plots for statistical data",
    href: "/chart-tools/box-plot-maker",
  },
  {
    name: "Bubble Chart Creator",
    description: "Create bubble charts with three-dimensional data",
    href: "/chart-tools/bubble-chart-creator",
  },
  {
    name: "Flowchart Creator",
    description: "Design flowcharts and process diagrams online",
    href: "/chart-tools/flowchart-creator",
  },
  {
    name: "Gantt Chart Maker",
    description: "Create project timeline Gantt charts",
    href: "/chart-tools/gantt-chart-maker",
  },
  {
    name: "Gauge Chart Generator",
    description: "Generate gauge and dial charts for metrics",
    href: "/chart-tools/gauge-chart-generator",
  },
  {
    name: "Heat Map Generator",
    description: "Create heat maps for density and correlation data",
    href: "/chart-tools/heat-map-generator",
  },
  {
    name: "Line Chart Creator",
    description: "Plot line graphs for time series and trends",
    href: "/chart-tools/line-chart-creator",
  },
  {
    name: "Org Chart Maker",
    description: "Design organizational hierarchy charts",
    href: "/chart-tools/org-chart-maker",
  },
  {
    name: "Pareto Chart Maker",
    description: "Create Pareto charts combining bars and cumulative lines",
    href: "/chart-tools/pareto-chart-maker",
  },
  {
    name: "Pie Chart Maker",
    description: "Generate pie and donut charts for proportions",
    href: "/chart-tools/pie-chart-maker",
  },
  {
    name: "Radar Chart Generator",
    description: "Create radar/spider charts for multivariate data",
    href: "/chart-tools/radar-chart-generator",
  },
  {
    name: "Sankey Diagram Generator",
    description: "Visualize flow and transfer data with Sankey diagrams",
    href: "/chart-tools/sankey-diagram-generator",
  },
  {
    name: "Scatter Plot Tool",
    description: "Plot scatter graphs for correlation analysis",
    href: "/chart-tools/scatter-plot-tool",
  },
  {
    name: "Stock Chart Generator",
    description: "Create candlestick and OHLC stock charts",
    href: "/chart-tools/stock-chart-generator",
  },
  {
    name: "Sunburst Chart Creator",
    description: "Generate hierarchical sunburst charts",
    href: "/chart-tools/sunburst-chart-creator",
  },
  {
    name: "Timeline Maker",
    description: "Design horizontal timeline visualizations",
    href: "/chart-tools/timeline-maker",
  },
  {
    name: "Venn Diagram Maker",
    description: "Create Venn diagrams for set relationships",
    href: "/chart-tools/venn-diagram-maker",
  },
  {
    name: "Word Cloud Generator",
    description: "Generate word clouds from text frequency data",
    href: "/chart-tools/word-cloud-generator",
  },
];

export const metadata: Metadata = {
  title: "Free Chart Tools Online - 19 Chart & Graph Makers",
  description:
    "Free online chart tools for creating graphs, diagrams, and data visualizations. Bar charts, pie charts, Gantt charts, flowcharts, and more. All tools run in your browser.",
  openGraph: {
    title: "Free Chart Tools Online - 19 Chart & Graph Makers",
    description:
      "Free online chart tools for creating graphs, diagrams, and data visualizations. Bar charts, pie charts, Gantt charts, flowcharts, and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/chart-tools",
  },
};

export default function ChartToolsPage() {
  const faqsData = [
    {
      question: "Are these chart tools really free?",
      answer:
        "Yes. All 19 chart tools are completely free — no registration, no paywalls, no watermarks. Create and download as many charts as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What formats can I export charts as?",
      answer:
        "Charts can be downloaded as PNG, SVG, or PDF formats. SVG is best for editing in design software. PDF works well for print and presentations.",
    },
    {
      question: "Can I use these charts in presentations and reports?",
      answer:
        "Yes. All charts are free to use in personal and commercial projects including presentations, reports, websites, and publications. No attribution required.",
    },
    {
      question: "Do these tools work offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
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
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Chart Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online chart tools for creating graphs, diagrams, and data visualizations.
              Bar charts, pie charts, Gantt charts, flowcharts — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={chartTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Visualization Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our statistics tools for data analysis, or explore all available tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/statistics-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Statistics Tools
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
              What These Chart Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 19 free chart tools that run entirely in your browser. No software installation, no subscriptions, no watermarks. You enter data, customize appearance, and download charts instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: creating standard business charts (bar, line, pie, scatter), generating specialized diagrams (Gantt, flowchart, org chart, Sankey), visualizing statistical data (box plots, heat maps, Pareto charts), and producing infographics (word clouds, Venn diagrams, timelines).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your data via spreadsheet input or CSV upload</li>
              <li>Customize colors, labels, fonts, and dimensions</li>
              <li>Preview the chart and adjust as needed</li>
              <li>Download as PNG, SVG, or PDF</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript and canvas/SVG rendering. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Business analysts</strong> create bar charts for quarterly reports, line graphs for trend analysis, or Gantt charts for project timelines.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Researchers and academics</strong> generate box plots for statistical distributions, scatter plots for correlation studies, or heat maps for density visualization.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Marketing teams</strong> design pie charts for market share presentations, word clouds for survey responses, or funnel visualizations for conversion data.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Teachers and students</strong> create Venn diagrams for set theory lessons, timeline visualizations for history projects, or org charts for organizational studies.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Standard Business Charts</h3>
            <p className="text-muted-foreground mb-4">
              Bar Graph Generator creates vertical or horizontal bar charts. Line Chart Creator plots time series and trends. Pie Chart Maker generates pie and donut charts for proportions. Scatter Plot Tool shows correlations between variables.
            </p>

            <h3 className="text-xl font-semibold mb-3">Project Management</h3>
            <p className="text-muted-foreground mb-4">
              Gantt Chart Maker visualizes project schedules with dependencies. Timeline Maker produces horizontal timeline visualizations. Flowchart Creator designs process diagrams and decision trees. Org Chart Maker displays organizational hierarchies.
            </p>

            <h3 className="text-xl font-semibold mb-3">Statistical Visualization</h3>
            <p className="text-muted-foreground mb-4">
              Box Plot Maker generates box-and-whisker plots showing quartiles and outliers. Heat Map Generator displays density matrices. Pareto Chart Maker combines bars with cumulative percentage lines. Bubble Chart Creator plots three-dimensional data with size encoding.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Diagrams</h3>
            <p className="text-muted-foreground mb-4">
              Sankey Diagram Generator visualizes flow quantities and transfers. Radar Chart Generator creates spider charts for multivariate comparison. Sunburst Chart Creator displays hierarchical data as concentric rings. Venn Diagram Maker shows set overlaps. Gauge Chart Generator produces dial-style metric displays. Stock Chart Generator creates candlestick and OHLC financial charts. Word Cloud Generator visualizes text frequency as sized words.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Data size:</strong> Charts work best with up to a few hundred data points. Very large datasets may cause slow rendering or browser memory issues.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Export resolution:</strong> PNG exports use screen resolution. For print-quality images, use SVG or PDF formats and scale in design software.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Font embedding:</strong> Custom fonts may not embed in PNG exports. Use system fonts or SVG/PDF for custom typography.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Color accessibility:</strong> Some chart types rely on color differentiation. Consider patterns or labels for colorblind accessibility.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Chart software often means expensive subscriptions or bloated spreadsheet suites. But sometimes you need a single bar chart for a presentation, a Gantt chart for a project plan, or a word cloud for a workshop. These tools exist because creating a chart shouldn't require a monthly subscription or a statistics degree. Everything runs in your browser — no account, no watermarks, no export limits.
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
