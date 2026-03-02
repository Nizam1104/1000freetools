import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Weight and Mass Converter",
  description: "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/weight-and-mass",
  },
};

const tools = [
  {
    "name": "Length Converter",
    "description": "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
    "href": "/unit-converters/length"
  },
  {
    "name": "Density Converter",
    "description": "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
    "href": "/unit-converters/density"
  },
  {
    "name": "Specific Volume Converter",
    "description": "Convert specific volume units — m³/kg, L/kg, ft³/lb, and more. Accurate online converter for thermodynamics and fluid mechanics.",
    "href": "/unit-converters/specific-volume"
  },
  {
    "name": "Mass Flux Density Converter",
    "description": "Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering and filtration.",
    "href": "/unit-converters/mass-flux-density"
  },
  {
    "name": "Mass Flow Rate Converter",
    "description": "Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing and aerospace.",
    "href": "/unit-converters/flow-mass"
  },
  {
    "name": "BMI Calculator — Body Mass Index",
    "description": "Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.",
    "href": "/unit-converters/bmi-calculator"
  },
  {
    "name": "Height Converter — cm to ft & in",
    "description": "Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness.",
    "href": "/unit-converters/height-converter"
  },
  {
    "name": "Cups to Grams Converter",
    "description": "Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter.",
    "href": "/unit-converters/cups-to-grams"
  },
  {
    "name": "Ingredient Density Converter",
    "description": "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
    "href": "/unit-converters/ingredient-density-converter"
  },
  {
    "name": "Rebar Weight Calculator",
    "description": "Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator.",
    "href": "/unit-converters/rebar-weight-calculator"
  },
  {
    "name": "Cement, Sand & Aggregate Calculator",
    "description": "Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator.",
    "href": "/unit-converters/cement-sand-aggregate-converter"
  },
  {
    "name": "Planet Weight Calculator",
    "description": "Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education.",
    "href": "/unit-converters/planet-weight-converter"
  },
  {
    "name": "Calorie Burn Rate Calculator",
    "description": "Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.",
    "href": "/unit-converters/calorie-burn-rate-converter"
  },
  {
    "name": "Fuel Efficiency by Mass Converter",
    "description": "Convert fuel efficiency by mass — km/kg, miles/lb, and more. Free online converter for rocket propulsion and alternative fuel vehicles.",
    "href": "/unit-converters/fuel-efficiency-mass"
  },
  {
    "name": "Fabric GSM Converter",
    "description": "Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers.",
    "href": "/unit-converters/fabric-gsm-converter"
  },
  {
    "name": "Heat Density Converter",
    "description": "Convert heat density units — J/m³, BTU/ft³, cal/cm³, and more. Free online converter for combustion engineering and fuel analysis.",
    "href": "/unit-converters/heat-density"
  },
  {
    "name": "Specific Heat Capacity Converter",
    "description": "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online converter for thermodynamics and chemistry.",
    "href": "/unit-converters/specific-heat-capacity"
  },
  {
    "name": "Volume Converter",
    "description": "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
    "href": "/unit-converters/volume"
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
    "name": "Surface Tension Converter",
    "description": "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
    "href": "/unit-converters/surface-tension"
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
    "name": "Thermal Expansion Converter",
    "description": "Convert thermal expansion coefficients — per Kelvin, per Celsius, per Fahrenheit, and more. Free online converter for materials science and engineering.",
    "href": "/unit-converters/thermal-expansion"
  },
  {
    "name": "Force Converter",
    "description": "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
    "href": "/unit-converters/force"
  },
  {
    "name": "Torque Converter",
    "description": "Convert torque units — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online converter for automotive and mechanical engineering.",
    "href": "/unit-converters/torque"
  },
  {
    "name": "Molar Flow Rate Converter",
    "description": "Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering and process design.",
    "href": "/unit-converters/flow-molar"
  },
  {
    "name": "Solution Concentration Converter",
    "description": "Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online converter for chemistry and water treatment.",
    "href": "/unit-converters/concentration-solution"
  },
  {
    "name": "Radiation Dose Converter",
    "description": "Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics.",
    "href": "/unit-converters/radiation-dose-converter"
  },
  {
    "name": "Horsepower to Animals Converter",
    "description": "How many horses is your car's engine worth? Convert horsepower to fun animal equivalents — horses, hamsters, elephants, and more. A lighthearted power converter for curious minds.",
    "href": "/unit-converters/horsepower-to-animals-converter"
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
