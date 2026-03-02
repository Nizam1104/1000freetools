import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Apparent Magnitude Converter",
  description: "Convert between apparent magnitude, absolute magnitude, and stellar luminosity. Free online magnitude converter for amateur astronomers, astrophysics students, and stargazers.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/apparent-magnitude-converter",
  },
};

const tools = [
  {
    "name": "Light-Years to Parsecs Converter",
    "description": "Convert astronomical distances between light-years, parsecs, astronomical units, and kilometers. Free online space distance converter for astronomy, astrophysics, and science education.",
    "href": "/unit-converters/light-years-to-parsecs"
  },
  {
    "name": "Astronomical Unit (AU) Converter",
    "description": "Convert astronomical units to light-years, parsecs, kilometers, miles, and more. Free online AU converter for planetary science, astronomy, and space exploration calculations.",
    "href": "/unit-converters/astronomical-unit-converter"
  },
  {
    "name": "Planet Weight Calculator",
    "description": "Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education.",
    "href": "/unit-converters/planet-weight-converter"
  },
  {
    "name": "Luminance Converter",
    "description": "Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology and photography.",
    "href": "/unit-converters/luminance"
  },
  {
    "name": "Luminous Intensity Converter",
    "description": "Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online converter for photometry and LED design.",
    "href": "/unit-converters/luminous-intensity"
  },
  {
    "name": "Illuminance Converter",
    "description": "Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design and photography.",
    "href": "/unit-converters/illumination"
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
    "name": "Acceleration Converter",
    "description": "Convert acceleration units — m/s², g-force, ft/s², Gal, and more. Accurate online converter for physics, aerospace, and mechanical engineering.",
    "href": "/unit-converters/acceleration"
  },
  {
    "name": "Time Converter",
    "description": "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
    "href": "/unit-converters/time"
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
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/unit-converters/area"
  },
  {
    "name": "Angle Converter",
    "description": "Convert angle units — degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry and engineering.",
    "href": "/unit-converters/angle"
  },
  {
    "name": "Angular Velocity Converter",
    "description": "Convert angular velocity units — radians/second, degrees/second, RPM, and more. Free online converter for physics and mechanical engineering.",
    "href": "/unit-converters/velocity-angular"
  },
  {
    "name": "Angular Acceleration Converter",
    "description": "Convert angular acceleration units — rad/s², deg/s², rev/min², and more. Free online converter for rotational dynamics and engineering.",
    "href": "/unit-converters/acceleration-angular"
  },
  {
    "name": "Force Converter",
    "description": "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
    "href": "/unit-converters/force"
  },
  {
    "name": "Wavelength Converter",
    "description": "Convert wavelength units across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online converter for optics and physics.",
    "href": "/unit-converters/wavelength"
  },
  {
    "name": "Frequency Converter",
    "description": "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics and audio engineering.",
    "href": "/unit-converters/frequency"
  },
  {
    "name": "Frequency to Musical Note Converter",
    "description": "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
    "href": "/unit-converters/frequency-to-musical-note-converter"
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
    "name": "Linear Current Density Converter",
    "description": "Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online converter for electromagnetics and electrical engineering.",
    "href": "/unit-converters/linear-current-density"
  },
  {
    "name": "Electric Field Strength Converter",
    "description": "Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics and antenna design.",
    "href": "/unit-converters/electric-field-strength"
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
