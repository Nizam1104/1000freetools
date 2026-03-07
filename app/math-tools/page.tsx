"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Calculator,
  Percent,
  Variable,
  Triangle,
  Hash,
  BarChart,
  TrendingUp,
  List,
  Circle,
  LogIn,
  DollarSign,
  RefreshCw,
  GitMerge,
  Zap,
  Wrench,
  MoreHorizontal,
  ArrowRight,
  Shield,
  Copy,
  Check,
  AlertTriangle,
  Search,
} from "lucide-react";

import mathToolsData from "@/json-assets/math-tools-links.json";

interface Tool {
  name: string;
  description: string;
  href: string;
  category: string;
}

interface Category {
  name: string;
  icon: string;
}

const iconMap: Record<string, React.ElementType> = {
  Calculator: Calculator,
  Percent: Percent,
  Variable: Variable,
  Triangle: Triangle,
  Hash: Hash,
  BarChart: BarChart,
  TrendingUp: TrendingUp,
  List: List,
  Circle: Circle,
  LogIn: LogIn,
  DollarSign: DollarSign,
  RefreshCw: RefreshCw,
  GitMerge: GitMerge,
  Zap: Zap,
  Wrench: Wrench,
  MoreHorizontal: MoreHorizontal,
};

// Map category slugs back to display names
const categoryDisplayNames: Record<string, string> = {
  'basic-calculators': 'Basic Calculators',
  'fractions-percentages': 'Fractions & Percentages',
  'algebra': 'Algebra',
  'geometry': 'Geometry',
  'number-theory': 'Number Theory',
  'statistics-data-visualization': 'Statistics & Data Visualization',
  'calculus': 'Calculus',
  'sequences-series': 'Sequences & Series',
  'trigonometry': 'Trigonometry',
  'logarithms': 'Logarithms',
  'financial-mathematics': 'Financial Mathematics',
  'unit-converters': 'Unit Converters',
  'logic-set-theory': 'Logic & Set Theory',
  'roots-powers': 'Roots & Powers',
  'other-calculators': 'Other Calculators',
  'other-tools': 'Other Tools'
};

// Map category display names to slugs
const categorySlugMap: Record<string, string> = {
  'Basic Calculators': 'basic-calculators',
  'Fractions & Percentages': 'fractions-percentages',
  'Algebra': 'algebra',
  'Geometry': 'geometry',
  'Number Theory': 'number-theory',
  'Statistics & Data Visualization': 'statistics-data-visualization',
  'Calculus': 'calculus',
  'Sequences & Series': 'sequences-series',
  'Trigonometry': 'trigonometry',
  'Logarithms': 'logarithms',
  'Financial Mathematics': 'financial-mathematics',
  'Unit Converters': 'unit-converters',
  'Logic & Set Theory': 'logic-set-theory',
  'Roots & Powers': 'roots-powers',
  'Other Calculators': 'other-calculators',
  'Other Tools': 'other-tools'
};

export default function MathToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = mathToolsData.categories;

  const allTools: Tool[] = mathToolsData.tools;

  const filteredTools = useMemo(() => {
    let result = allTools;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(tool => tool.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        tool =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery, allTools]);

  const totalTools = allTools.length;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Math Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {totalTools}+ free online math tools and calculators. Solve
            equations, convert units, visualize data, and explore mathematics –
            all in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#tools"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md"
            >
              Browse Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Use Our Math Tools?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get calculations and solutions immediately in your browser
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Free</h3>
              <p className="text-muted-foreground">
                All tools are completely free with no registration required
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Copy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step-by-Step</h3>
              <p className="text-muted-foreground">
                Many tools show detailed solutions and explanations
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate</h3>
              <p className="text-muted-foreground">
                Precise calculations verified for mathematical correctness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">
              All Math Tools
            </h1>
            <p className="text-muted-foreground">
              A comprehensive collection of {totalTools} math tools and
              calculators organized by category
            </p>
          </div>

          <div className="relative flex-1 max-w-md my-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            )}
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
              >
                All Tools
              </button>
              {categories.map((category) => {
                const slug = categorySlugMap[category.name];
                const isActive = selectedCategory === slug;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery ? "No matching tools found" : "No tools found"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? `No tools match your search "${searchQuery}". Try a different term or clear the search.`
                  : "No tools available in this category"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 text-sm font-medium text-primary hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                return (
                  <Link key={tool.name} href={tool.href}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-primary">Open Tool →</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">
                Homework & Study
              </h3>
              <p className="text-muted-foreground text-sm">
                Solve math problems step-by-step and understand concepts better
                with detailed explanations.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Engineering</h3>
              <p className="text-muted-foreground text-sm">
                Perform complex calculations for physics, mechanics, and
                electrical engineering problems.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Finance</h3>
              <p className="text-muted-foreground text-sm">
                Calculate loans, investments, interest rates, and other
                financial metrics accurately.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Create charts, graphs, and visualizations to understand data
                patterns and trends.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Unit Conversion</h3>
              <p className="text-muted-foreground text-sm">
                Convert between different measurement systems for science,
                cooking, and travel.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Professional Work</h3>
              <p className="text-muted-foreground text-sm">
                Quick calculations and conversions for architects, contractors,
                and analysts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
