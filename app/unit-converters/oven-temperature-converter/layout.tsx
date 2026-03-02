import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Oven Temperature Converter",
  description: "Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/oven-temperature-converter",
  },
};

const tools = [
  {
    "name": "Temperature Converter",
    "description": "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine. Free online temperature converter for weather, cooking, and science.",
    "href": "/unit-converters/temperature"
  },
  {
    "name": "Temperature Interval Converter",
    "description": "Convert temperature difference units between Celsius, Fahrenheit, Kelvin, and Rankine. Free online converter for thermodynamics and HVAC.",
    "href": "/unit-converters/temperature-interval"
  },
  {
    "name": "Cups to Grams Converter",
    "description": "Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter.",
    "href": "/unit-converters/cups-to-grams"
  },
  {
    "name": "Cups to ml Converter",
    "description": "Convert cups to milliliters, tablespoons, fluid ounces, and liters instantly. Free online cups to ml converter for accurate liquid measurements in any recipe or cooking project.",
    "href": "/unit-converters/cups-to-ml"
  },
  {
    "name": "Ingredient Density Converter",
    "description": "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
    "href": "/unit-converters/ingredient-density-converter"
  },
  {
    "name": "Sourdough Hydration Calculator",
    "description": "Calculate sourdough hydration percentage and convert between flour and water ratios instantly. Free online sourdough hydration converter for perfect bread dough consistency every time.",
    "href": "/unit-converters/sourdough-hydration-converter"
  },
  {
    "name": "Baking Pan Size Converter",
    "description": "Convert between baking pan sizes and find equivalent pan volumes to scale any recipe. Free online baking pan converter for round, square, rectangular, and springform tins.",
    "href": "/unit-converters/baking-pan-size-converter"
  },
  {
    "name": "Weight and Mass Converter",
    "description": "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
    "href": "/unit-converters/weight-and-mass"
  },
  {
    "name": "Volume Converter",
    "description": "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
    "href": "/unit-converters/volume"
  },
  {
    "name": "Dry Volume Converter",
    "description": "Convert dry volume units — dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture and cooking.",
    "href": "/unit-converters/volume-dry"
  },
  {
    "name": "Density Converter",
    "description": "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
    "href": "/unit-converters/density"
  },
  {
    "name": "Specific Heat Capacity Converter",
    "description": "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online converter for thermodynamics and chemistry.",
    "href": "/unit-converters/specific-heat-capacity"
  },
  {
    "name": "Molar Concentration Converter",
    "description": "Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry and biochemistry.",
    "href": "/unit-converters/concentration-molar"
  },
  {
    "name": "Solution Concentration Converter",
    "description": "Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online converter for chemistry and water treatment.",
    "href": "/unit-converters/concentration-solution"
  },
  {
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/unit-converters/area"
  },
  {
    "name": "Length Converter",
    "description": "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
    "href": "/unit-converters/length"
  },
  {
    "name": "Time Converter",
    "description": "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
    "href": "/unit-converters/time"
  },
  {
    "name": "Volumetric Flow Rate Converter",
    "description": "Convert volumetric flow rate units — m³/s, liters/min, gallons/min, CFM, and more. Free online flow rate converter for plumbing and HVAC.",
    "href": "/unit-converters/flow"
  },
  {
    "name": "Mass Flow Rate Converter",
    "description": "Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing and aerospace.",
    "href": "/unit-converters/flow-mass"
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
    "name": "Thermal Expansion Converter",
    "description": "Convert thermal expansion coefficients — per Kelvin, per Celsius, per Fahrenheit, and more. Free online converter for materials science and engineering.",
    "href": "/unit-converters/thermal-expansion"
  },
  {
    "name": "Heat Transfer Coefficient Converter",
    "description": "Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection and HVAC engineering.",
    "href": "/unit-converters/heat-transfer-coefficient"
  },
  {
    "name": "Heat Flux Density Converter",
    "description": "Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online converter for thermal engineering and solar energy.",
    "href": "/unit-converters/heat-flux-density"
  },
  {
    "name": "Heat Density Converter",
    "description": "Convert heat density units — J/m³, BTU/ft³, cal/cm³, and more. Free online converter for combustion engineering and fuel analysis.",
    "href": "/unit-converters/heat-density"
  },
  {
    "name": "Calorie Burn Rate Calculator",
    "description": "Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.",
    "href": "/unit-converters/calorie-burn-rate-converter"
  },
  {
    "name": "BMI Calculator — Body Mass Index",
    "description": "Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.",
    "href": "/unit-converters/bmi-calculator"
  },
  {
    "name": "Dew Point Calculator",
    "description": "Calculate dew point temperature from relative humidity and air temperature instantly. Free online dew point calculator for weather forecasting, HVAC design, and condensation analysis.",
    "href": "/unit-converters/dew-point-calculator"
  },
  {
    "name": "Humidity Ratio Converter",
    "description": "Convert between relative humidity, absolute humidity, specific humidity, and humidity ratio. Free online humidity converter for HVAC, meteorology, and building climate control.",
    "href": "/unit-converters/humidity-ratio-converter"
  },
  {
    "name": "Dynamic Viscosity Converter",
    "description": "Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online converter for fluid mechanics and chemical engineering.",
    "href": "/unit-converters/viscosity-dynamic"
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
