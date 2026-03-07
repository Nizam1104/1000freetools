"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import convertersData from "./all.json";

export default function UnitConvertersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group converters by category
  const categories: Record<string, typeof convertersData> = {
    Common: [],
    "Physics & Engineering": [],
    "Electrical & Magnetic": [],
    "Thermodynamics & Heat": [],
    "Fluid Mechanics": [],
    Chemistry: [],
    "Light & Optics": [],
    "Construction & Building": [],
    "Cooking & Baking": [],
    "Finance & Business": [],
    "Media & Design": [],
    "Time & Date": [],
    "Astronomy & Space": [],
    "Health & Fitness": [],
    "Weather & Environment": [],
    "Textiles & Clothing": [],
    Other: [],
  };

  // Categorize converters
  convertersData.forEach((converter) => {
    const name = converter.converterUnit;

    if (
      [
        "Length",
        "Weight and Mass",
        "Volume",
        "Temperature",
        "Area",
        "Pressure",
        "Energy",
        "Power",
        "Force",
        "Time",
        "Speed",
        "Angle",
      ].includes(name)
    ) {
      categories["Common"].push(converter);
    } else if (
      [
        "Acceleration",
        "Acceleration - Angular",
        "Density",
        "Specific Volume",
        "Moment of Inertia",
        "Moment of Force",
        "Torque",
        "Fuel Consumption",
        "Fuel Efficiency - Mass",
        "Fuel Efficiency - Volume",
      ].includes(name)
    ) {
      categories["Physics & Engineering"].push(converter);
    } else if (
      [
        "Charge",
        "Current",
        "Electric Potential",
        "Electric Resistance",
        "Electric Resistivity",
        "Electric Conductance",
        "Electric Conductivity",
        "Electric Field Strength",
        "Linear Charge Density",
        "Surface Charge Density",
        "Volume Charge Density",
        "Linear Current Density",
        "Surface Current Density",
        "Electrostatic Capacitance",
        "Inductance",
        "Magnetomotive Force",
        "Magnetic Field Strength",
        "Magnetic Flux",
        "Magnetic Flux Density",
      ].includes(name)
    ) {
      categories["Electrical & Magnetic"].push(converter);
    } else if (
      [
        "Specific Heat Capacity",
        "Thermal Conductivity",
        "Thermal Resistance",
        "Thermal Expansion",
        "Temperature Interval",
        "Heat Density",
        "Heat Flux Density",
        "Heat Transfer Coefficient",
      ].includes(name)
    ) {
      categories["Thermodynamics & Heat"].push(converter);
    } else if (
      [
        "Flow",
        "Flow - Mass",
        "Flow - Molar",
        "Mass Flux Density",
        "Viscosity - Dynamic",
        "Viscosity - Kinematic",
        "Surface Tension",
        "Permeability",
      ].includes(name)
    ) {
      categories["Fluid Mechanics"].push(converter);
    } else if (
      [
        "Concentration - Molar",
        "Concentration - Solution",
        "Radiation Dose",
        "Radioactivity",
        "Exposure Dose Converter",
      ].includes(name)
    ) {
      categories["Chemistry"].push(converter);
    } else if (
      [
        "Luminance",
        "Luminous Intensity",
        "Illumination",
        "Wavelength",
        "Digital Image Resolution",
      ].includes(name)
    ) {
      categories["Light & Optics"].push(converter);
    } else if (
      [
        "Rebar Weight Calculator",
        "Concrete Volume Converter",
        "Concrete Mix Ratio Converter",
        "Brick Calculator",
        "Tile Calculator",
        "Cement-Sand-Aggregate Converter",
        "Lumber Board Feet Converter",
        "Floor Area Converter",
        "Roofing Sheet Coverage Converter",
      ].includes(name)
    ) {
      categories["Construction & Building"].push(converter);
    } else if (
      [
        "Cups to Grams",
        "Cups to ml",
        "Oven Temperature Converter",
        "Baking Pan Size Converter",
        "Ingredient Density Converter",
        "Sourdough Hydration Converter",
      ].includes(name)
    ) {
      categories["Cooking & Baking"].push(converter);
    } else if (
      [
        "Image DPI Converter",
        "Video Frame Rate Converter",
        "Audio Bitrate Converter",
        "Unix Timestamp Converter",
        "Frequency to Musical Note Converter",
      ].includes(name)
    ) {
      categories["Media & Design"].push(converter);
    } else if (
      [
        "Time Duration Calculator",
        "Age Calculator",
        "Date Difference Calculator",
      ].includes(name)
    ) {
      categories["Time & Date"].push(converter);
    } else if (
      [
        "Light Years to Parsecs",
        "Astronomical Unit Converter",
        "Apparent Magnitude Converter",
        "Planet Weight Converter",
      ].includes(name)
    ) {
      categories["Astronomy & Space"].push(converter);
    } else if (
      [
        "BMI Calculator",
        "Calorie Burn Rate Converter",
        "Running Pace to Speed Converter",
        "Height Converter",
        "Shoe Size Converter",
        "Ring Size Converter",
      ].includes(name)
    ) {
      categories["Health & Fitness"].push(converter);
    } else if (
      [
        "Wind Speed Converter",
        "Rainfall Converter",
        "Humidity Ratio Converter",
        "Dew Point Calculator",
      ].includes(name)
    ) {
      categories["Weather & Environment"].push(converter);
    } else if (
      [
        "Fabric GSM Converter",
        "Thread Count Converter",
        "Clothing Size Converter",
      ].includes(name)
    ) {
      categories["Textiles & Clothing"].push(converter);
    } else {
      categories["Other"].push(converter);
    }
  });

  // Filter and search converters
  const filteredCategories = useMemo(() => {
    const result: Record<string, typeof convertersData> = {};

    for (const [category, items] of Object.entries(categories)) {
      const filteredItems = items.filter((converter) => {
        const matchesSearch =
          searchQuery === "" ||
          converter.converterUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
          converter.h1.toLowerCase().includes(searchQuery.toLowerCase()) ||
          converter.p.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategory || category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      if (filteredItems.length > 0) {
        result[category] = filteredItems;
      }
    }

    return result;
  }, [categories, searchQuery, selectedCategory]);

  function getSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const categoryList = Object.keys(categories).filter(
    (cat) => categories[cat].length > 0
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-3">Unit Converters</h1>
        <p className="text-muted-foreground text-lg">
          Free online unit converters for every need — length, weight,
          temperature, currency, and 100+ more.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search converters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(filteredCategories).map(([category, items]) => {
        if (items.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((converter) => {
                const slug = getSlug(converter.converterUnit);
                return (
                  <Link
                    key={converter.converterUnit}
                    href={`/unit-converters/${slug}`}
                  >
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {converter.h1}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {converter.p}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
