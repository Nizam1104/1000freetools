import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Temperature Converter",
  description: "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine. Free online temperature converter for weather, cooking, and science.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/temperature",
  },
};

const tools = [
  {
    "name": "Temperature Interval Converter",
    "description": "Convert temperature difference units between Celsius, Fahrenheit, Kelvin, and Rankine. Free online converter for thermodynamics and HVAC.",
    "href": "/unit-converters/temperature-interval"
  },
  {
    "name": "Oven Temperature Converter",
    "description": "Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country.",
    "href": "/unit-converters/oven-temperature-converter"
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
    "name": "Pressure Converter",
    "description": "Convert pressure units — pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering and science.",
    "href": "/unit-converters/pressure"
  },
  {
    "name": "Energy Converter",
    "description": "Convert energy units — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Free energy converter for physics and engineering.",
    "href": "/unit-converters/energy"
  },
  {
    "name": "Time Converter",
    "description": "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
    "href": "/unit-converters/time"
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
    "name": "Volume Converter",
    "description": "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
    "href": "/unit-converters/volume"
  },
  {
    "name": "Heat Density Converter",
    "description": "Convert heat density units — J/m³, BTU/ft³, cal/cm³, and more. Free online converter for combustion engineering and fuel analysis.",
    "href": "/unit-converters/heat-density"
  },
  {
    "name": "Radiation Dose Converter",
    "description": "Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics.",
    "href": "/unit-converters/radiation-dose-converter"
  },
  {
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/unit-converters/area"
  },
  {
    "name": "Fuel Efficiency by Volume Converter",
    "description": "Convert volumetric fuel efficiency — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles and fleet management.",
    "href": "/unit-converters/fuel-efficiency-volume"
  },
  {
    "name": "Fuel Consumption Converter",
    "description": "Convert fuel consumption units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.",
    "href": "/unit-converters/fuel-consumption"
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
    "name": "Density Converter",
    "description": "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
    "href": "/unit-converters/density"
  },
  {
    "name": "Force Converter",
    "description": "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
    "href": "/unit-converters/force"
  },
  {
    "name": "Speed Converter",
    "description": "Convert speed units — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.",
    "href": "/unit-converters/speed"
  },
  {
    "name": "Moment of Force Converter",
    "description": "Convert moment of force units — N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering.",
    "href": "/unit-converters/moment-of-force"
  },
  {
    "name": "Volumetric Flow Rate Converter",
    "description": "Convert volumetric flow rate units — m³/s, liters/min, gallons/min, CFM, and more. Free online flow rate converter for plumbing and HVAC.",
    "href": "/unit-converters/flow"
  },
  {
    "name": "Power Converter",
    "description": "Convert power units — watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for engineering calculations.",
    "href": "/unit-converters/power"
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
