import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Clothing Size Converter",
  description: "Convert clothing sizes between US, UK, EU, and Asian standards for men, women, and kids. Free online clothes size converter for international shopping and fashion retail.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/clothing-size-converter",
  },
};

const tools = [
  {
    "name": "Shoe Size Converter",
    "description": "Convert shoe sizes between US, UK, EU, and international standards for men, women, and kids. Free online shoe size converter for global shopping and footwear retail.",
    "href": "/unit-converters/shoe-size-converter"
  },
  {
    "name": "Ring Size Converter",
    "description": "Convert ring sizes between US, UK, EU, French, Swiss, and Japanese standards. Free online ring size converter for jewelry shopping, gifting, and custom ring orders worldwide.",
    "href": "/unit-converters/ring-size-converter"
  },
  {
    "name": "Height Converter — cm to ft & in",
    "description": "Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness.",
    "href": "/unit-converters/height-converter"
  },
  {
    "name": "Fabric GSM Converter",
    "description": "Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers.",
    "href": "/unit-converters/fabric-gsm-converter"
  },
  {
    "name": "Thread Count Converter",
    "description": "Convert and compare thread count values across different measurement standards for bed sheets and fabrics. Free online thread count converter for textile buyers and bedding shoppers.",
    "href": "/unit-converters/thread-count-converter"
  },
  {
    "name": "BMI Calculator — Body Mass Index",
    "description": "Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.",
    "href": "/unit-converters/bmi-calculator"
  },
  {
    "name": "Weight and Mass Converter",
    "description": "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
    "href": "/unit-converters/weight-and-mass"
  },
  {
    "name": "Length Converter",
    "description": "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
    "href": "/unit-converters/length"
  },
  {
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/unit-converters/area"
  },
  {
    "name": "Acceleration Converter",
    "description": "Convert acceleration units — m/s², g-force, ft/s², Gal, and more. Accurate online converter for physics, aerospace, and mechanical engineering.",
    "href": "/unit-converters/acceleration"
  },
  {
    "name": "Speed Converter",
    "description": "Convert speed units — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.",
    "href": "/unit-converters/speed"
  },
  {
    "name": "Time Converter",
    "description": "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
    "href": "/unit-converters/time"
  },
  {
    "name": "Volume Converter",
    "description": "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
    "href": "/unit-converters/volume"
  },
  {
    "name": "Density Converter",
    "description": "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
    "href": "/unit-converters/density"
  },
  {
    "name": "Dynamic Viscosity Converter",
    "description": "Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online converter for fluid mechanics and chemical engineering.",
    "href": "/unit-converters/viscosity-dynamic"
  },
  {
    "name": "Kinematic Viscosity Converter",
    "description": "Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online converter for fluid dynamics and oil analysis.",
    "href": "/unit-converters/viscosity-kinematic"
  },
  {
    "name": "Surface Tension Converter",
    "description": "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
    "href": "/unit-converters/surface-tension"
  },
  {
    "name": "Mass Flux Density Converter",
    "description": "Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering and filtration.",
    "href": "/unit-converters/mass-flux-density"
  },
  {
    "name": "Heat Flux Density Converter",
    "description": "Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online converter for thermal engineering and solar energy.",
    "href": "/unit-converters/heat-flux-density"
  },
  {
    "name": "Heat Transfer Coefficient Converter",
    "description": "Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection and HVAC engineering.",
    "href": "/unit-converters/heat-transfer-coefficient"
  },
  {
    "name": "Linear Current Density Converter",
    "description": "Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online converter for electromagnetics and electrical engineering.",
    "href": "/unit-converters/linear-current-density"
  },
  {
    "name": "Surface Current Density Converter",
    "description": "Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online converter for electromagnetic field analysis and power systems.",
    "href": "/unit-converters/surface-current-density"
  },
  {
    "name": "Electric Field Strength Converter",
    "description": "Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics and antenna design.",
    "href": "/unit-converters/electric-field-strength"
  },
  {
    "name": "Specific Volume Converter",
    "description": "Convert specific volume units — m³/kg, L/kg, ft³/lb, and more. Accurate online converter for thermodynamics and fluid mechanics.",
    "href": "/unit-converters/specific-volume"
  },
  {
    "name": "Specific Heat Capacity Converter",
    "description": "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online converter for thermodynamics and chemistry.",
    "href": "/unit-converters/specific-heat-capacity"
  },
  {
    "name": "Thermal Conductivity Converter",
    "description": "Convert thermal conductivity units — W/(m·K), BTU/(h·ft·°F), cal/(s·cm·°C), and more. Free online converter for insulation and heat transfer engineering.",
    "href": "/unit-converters/thermal-conductivity"
  },
  {
    "name": "Thermal Resistance Converter",
    "description": "Convert thermal resistance units — K/W, °C/W, °F·h/BTU, and more. Accurate online converter for HVAC, insulation, and electronics cooling.",
    "href": "/unit-converters/thermal-resistance"
  },
  {
    "name": "Lumber Board Feet Calculator",
    "description": "Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry.",
    "href": "/unit-converters/lumber-board-feet-converter"
  },
  {
    "name": "Floor Area Converter",
    "description": "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
    "href": "/unit-converters/floor-area-converter"
  },
  {
    "name": "Ingredient Density Converter",
    "description": "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
    "href": "/unit-converters/ingredient-density-converter"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
