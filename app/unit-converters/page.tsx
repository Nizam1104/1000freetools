import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import convertersData from "./all.json";

export default function UnitConvertersPage() {
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

  function getSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-3">Unit Converters</h1>
        <p className="text-muted-foreground text-lg">
          Free online unit converters for every need — length, weight,
          temperature, currency, and 100+ more.
        </p>
      </div>

      {Object.entries(categories).map(([category, items]) => {
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
