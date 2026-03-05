"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import calculators from "@/json-assets/calculators-links.json";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

const categories = [
  { id: "all", name: "All" },
  { id: "health", name: "Health & Fitness" },
  { id: "date", name: "Date & Time" },
  { id: "physics", name: "Physics" },
  { id: "electrical", name: "Electrical" },
  { id: "engineering", name: "Engineering" },
  { id: "construction", name: "Construction" },
  { id: "hvac", name: "HVAC & Fluid" },
  { id: "math", name: "Math" },
  { id: "geometry", name: "Geometry" },
  { id: "finance", name: "Finance" },

  { id: "automotive", name: "Automotive" },
  { id: "business", name: "Business" },
  { id: "home", name: "Home & Garden" },
  { id: "education", name: "Education" },
  { id: "agriculture", name: "Agriculture" },
  { id: "weather", name: "Weather" },
  { id: "security", name: "Security" },
  { id: "food", name: "Food & Cooking" },
  { id: "gaming", name: "Gaming & Sports" },
  { id: "music", name: "Music & Audio" },
  { id: "design", name: "Design" },
  { id: "outdoor", name: "Outdoor" },
  { id: "pets", name: "Pets" },
  { id: "parenting", name: "Parenting" },
  { id: "science", name: "Science" },
  { id: "shipping", name: "Shipping" },
  { id: "photography", name: "Photography" },
  { id: "lifestyle", name: "Lifestyle" },
];

export default function CalculatorsLandingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch =
      calc.name.toLowerCase().includes(search.toLowerCase()) ||
      calc.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || calc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Free Online Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access {calculators.length}+ free calculators for health, finance,
            math, physics, engineering, and more. Fast, accurate, and easy to
            use.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <Input
            placeholder="Search calculators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-8"
        >
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className=" mt-[100px]">
          <ToolLinkCards tools={filteredCalculators} />
        </div>

        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No calculators found matching your search.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Total: {filteredCalculators.length} calculator
            {filteredCalculators.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>
    </div>
  );
}
