import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Fuel Efficiency by Volume Converter",
  description: "Convert volumetric fuel efficiency — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles and fleet management.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/fuel-efficiency-volume",
  },
};

const tools = [
  {
    "name": "Fuel Consumption Converter",
    "description": "Convert fuel consumption units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.",
    "href": "/unit-converters/fuel-consumption"
  },
  {
    "name": "Fuel Efficiency by Mass Converter",
    "description": "Convert fuel efficiency by mass — km/kg, miles/lb, and more. Free online converter for rocket propulsion and alternative fuel vehicles.",
    "href": "/unit-converters/fuel-efficiency-mass"
  },
  {
    "name": "Volume Converter",
    "description": "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
    "href": "/unit-converters/volume"
  },
  {
    "name": "Length Converter",
    "description": "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
    "href": "/unit-converters/length"
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
    "name": "Power Converter",
    "description": "Convert power units — watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for engineering calculations.",
    "href": "/unit-converters/power"
  },
  {
    "name": "Energy Converter",
    "description": "Convert energy units — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Free energy converter for physics and engineering.",
    "href": "/unit-converters/energy"
  },
  {
    "name": "Pressure Converter",
    "description": "Convert pressure units — pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering and science.",
    "href": "/unit-converters/pressure"
  },
  {
    "name": "Weight and Mass Converter",
    "description": "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
    "href": "/unit-converters/weight-and-mass"
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
    "name": "Moment of Force Converter",
    "description": "Convert moment of force units — N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering.",
    "href": "/unit-converters/moment-of-force"
  },
  {
    "name": "Torque Converter",
    "description": "Convert torque units — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online converter for automotive and mechanical engineering.",
    "href": "/unit-converters/torque"
  },
  {
    "name": "Wind Speed Converter",
    "description": "Convert wind speed between km/h, mph, knots, m/s, and Beaufort scale. Free online wind speed converter for meteorology, sailing, aviation, and weather analysis.",
    "href": "/unit-converters/wind-speed-converter"
  },
  {
    "name": "Running Pace to Speed Converter",
    "description": "Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking.",
    "href": "/unit-converters/running-pace-to-speed-converter"
  },
  {
    "name": "Molar Flow Rate Converter",
    "description": "Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering and process design.",
    "href": "/unit-converters/flow-molar"
  },
  {
    "name": "Specific Volume Converter",
    "description": "Convert specific volume units — m³/kg, L/kg, ft³/lb, and more. Accurate online converter for thermodynamics and fluid mechanics.",
    "href": "/unit-converters/specific-volume"
  },
  {
    "name": "Heat Density Converter",
    "description": "Convert heat density units — J/m³, BTU/ft³, cal/cm³, and more. Free online converter for combustion engineering and fuel analysis.",
    "href": "/unit-converters/heat-density"
  },
  {
    "name": "Force Converter",
    "description": "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
    "href": "/unit-converters/force"
  },
  {
    "name": "Ingredient Density Converter",
    "description": "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
    "href": "/unit-converters/ingredient-density-converter"
  },
  {
    "name": "Concrete Volume Calculator & Converter",
    "description": "Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects.",
    "href": "/unit-converters/concrete-volume-converter"
  },
  {
    "name": "Floor Area Converter",
    "description": "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
    "href": "/unit-converters/floor-area-converter"
  },
  {
    "name": "Solution Concentration Converter",
    "description": "Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online converter for chemistry and water treatment.",
    "href": "/unit-converters/concentration-solution"
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
