import Link from "next/link";
import {
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Shield,
  Download,
  ArrowRight,
  BarChart3,
  Globe,
  FileText,
} from "lucide-react";

export default function SeoAuditorLandingPage() {
  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Deep Site Crawl",
      description:
        "Crawl up to 10000 pages to identify SEO issues across your entire website structure.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "SEO Score Analysis",
      description:
        "Get a comprehensive SEO score with detailed breakdowns for each page.",
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Issue Detection",
      description:
        "Find broken links, missing meta tags, duplicate content, and more.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Content Analysis",
      description:
        "Analyze headings, word count, keyword density, and content quality.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Link Analysis",
      description:
        "Track internal and external links, identify orphan pages and link opportunities.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Performance Insights",
      description:
        "Monitor page depth, HTTP status codes, and site health metrics.",
    },
  ];

  const benefits = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "All analysis happens in your browser",
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Export Reports",
      description: "Download detailed reports in multiple formats",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Site SEO Auditor
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Audit your site in seconds.
            Free site auditor up to 100000 page crawls per month for absolutely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seo-tools/site-seo-auditor"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start Free Audit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-muted"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Screenshot Preview */}
        <div className="relative max-w-6xl mx-auto mt-12">
          <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground font-medium">
                  SEO Auditor Dashboard
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src="/seo-auditor-screen-shot.png"
                alt="SEO Auditor Dashboard showing site analysis with SEO scores, issues found, broken links, and detailed charts for site health, HTTP status codes, and page depth distribution"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-card border border-border p-8 md:p-12 text-center shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Audit Your Site?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get comprehensive SEO analysis and actionable recommendations.
                Free forever, no signup required.
              </p>
              <Link
                href="/seo-tools/site-seo-auditor"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Free Audit Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
