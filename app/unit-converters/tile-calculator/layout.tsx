import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Tile Calculator",
  description: "Calculate how many tiles you need for any floor or wall area. Enter room and tile dimensions to get an accurate tile count with waste factor included. Free online tile quantity calculator.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/tile-calculator",
  },
};

const tools = [
  {
    "name": "Brick Calculator",
    "description": "Calculate how many bricks you need for any wall or project. Enter wall dimensions and brick size to get an accurate brick count with mortar allowance. Free online brick quantity estimator.",
    "href": "/unit-converters/brick-calculator"
  },
  {
    "name": "Floor Area Converter",
    "description": "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
    "href": "/unit-converters/floor-area-converter"
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
    "name": "Weight and Mass Converter",
    "description": "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
    "href": "/unit-converters/weight-and-mass"
  },
  {
    "name": "Concrete Volume Calculator & Converter",
    "description": "Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects.",
    "href": "/unit-converters/concrete-volume-converter"
  },
  {
    "name": "Concrete Mix Ratio Calculator",
    "description": "Convert concrete mix ratios and calculate exact cement, sand, and aggregate quantities for any volume. Free online concrete mix calculator for M10, M15, M20, M25, and custom mix designs.",
    "href": "/unit-converters/concrete-mix-ratio-converter"
  },
  {
    "name": "Cement, Sand & Aggregate Calculator",
    "description": "Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator.",
    "href": "/unit-converters/cement-sand-aggregate-converter"
  },
  {
    "name": "Rebar Weight Calculator",
    "description": "Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator.",
    "href": "/unit-converters/rebar-weight-calculator"
  },
  {
    "name": "Lumber Board Feet Calculator",
    "description": "Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry.",
    "href": "/unit-converters/lumber-board-feet-converter"
  },
  {
    "name": "Roofing Sheet Coverage Calculator",
    "description": "Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator.",
    "href": "/unit-converters/roofing-sheet-coverage-converter"
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
    "name": "Pressure Converter",
    "description": "Convert pressure units — pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering and science.",
    "href": "/unit-converters/pressure"
  },
  {
    "name": "Power Converter",
    "description": "Convert power units — watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for engineering calculations.",
    "href": "/unit-converters/power"
  },
  {
    "name": "Force Converter",
    "description": "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
    "href": "/unit-converters/force"
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
    "name": "Acceleration Converter",
    "description": "Convert acceleration units — m/s², g-force, ft/s², Gal, and more. Accurate online converter for physics, aerospace, and mechanical engineering.",
    "href": "/unit-converters/acceleration"
  },
  {
    "name": "Thermal Expansion Converter",
    "description": "Convert thermal expansion coefficients — per Kelvin, per Celsius, per Fahrenheit, and more. Free online converter for materials science and engineering.",
    "href": "/unit-converters/thermal-expansion"
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
    "name": "Specific Heat Capacity Converter",
    "description": "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online converter for thermodynamics and chemistry.",
    "href": "/unit-converters/specific-heat-capacity"
  },
  {
    "name": "Surface Tension Converter",
    "description": "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
    "href": "/unit-converters/surface-tension"
  },
  {
    "name": "Permeability Converter",
    "description": "Convert permeability units — darcy, millidarcy, m², and more. Free online permeability converter for petroleum engineering and hydrogeology.",
    "href": "/unit-converters/permeability"
  },
  {
    "name": "Specific Volume Converter",
    "description": "Convert specific volume units — m³/kg, L/kg, ft³/lb, and more. Accurate online converter for thermodynamics and fluid mechanics.",
    "href": "/unit-converters/specific-volume"
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
