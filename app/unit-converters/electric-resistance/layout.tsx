import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Electric Resistance Converter",
  description: "Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design and electronics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/electric-resistance",
  },
};

const tools = [
  {
    "name": "Electric Resistivity Converter",
    "description": "Convert electrical resistivity units — Ω·m, Ω·cm, μΩ·in, and more. Accurate online resistivity converter for material science and semiconductor design.",
    "href": "/unit-converters/electric-resistivity"
  },
  {
    "name": "Electric Conductance Converter",
    "description": "Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics and electrochemistry.",
    "href": "/unit-converters/electric-conductance"
  },
  {
    "name": "Electric Conductivity Converter",
    "description": "Convert electrical conductivity units — S/m, mS/cm, μS/cm, and more. Free online conductivity converter for water quality testing and material science.",
    "href": "/unit-converters/electric-conductivity"
  },
  {
    "name": "Electric Potential Converter",
    "description": "Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics and power systems.",
    "href": "/unit-converters/electric-potential"
  },
  {
    "name": "Electric Current Converter",
    "description": "Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics and circuit design.",
    "href": "/unit-converters/current"
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
    "name": "Electric Charge Converter",
    "description": "Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online converter for electronics and electrochemistry.",
    "href": "/unit-converters/charge"
  },
  {
    "name": "Linear Charge Density Converter",
    "description": "Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online converter for electrostatics and electrical engineering.",
    "href": "/unit-converters/linear-charge-density"
  },
  {
    "name": "Surface Charge Density Converter",
    "description": "Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online converter for capacitor design and electrostatics.",
    "href": "/unit-converters/surface-charge-density"
  },
  {
    "name": "Volume Charge Density Converter",
    "description": "Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online converter for electrostatics, plasma physics, and electrical engineering.",
    "href": "/unit-converters/volume-charge-density"
  },
  {
    "name": "Capacitance Converter",
    "description": "Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics and circuit design.",
    "href": "/unit-converters/electrostatic-capacitance"
  },
  {
    "name": "Inductance Converter",
    "description": "Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics and RF engineering.",
    "href": "/unit-converters/inductance"
  },
  {
    "name": "Magnetomotive Force Converter",
    "description": "Convert magnetomotive force units — ampere-turns, gilberts, kiloampere-turns, and more. Free online MMF converter for magnetic circuit design.",
    "href": "/unit-converters/magnetomotive-force"
  },
  {
    "name": "Magnetic Field Strength Converter",
    "description": "Convert magnetic field strength units — A/m, oersteds, kA/m, and more. Accurate online H-field converter for electromagnetics and motor design.",
    "href": "/unit-converters/magnetic-field-strength"
  },
  {
    "name": "Magnetic Flux Converter",
    "description": "Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer and motor engineering.",
    "href": "/unit-converters/magnetic-flux"
  },
  {
    "name": "Magnetic Flux Density Converter",
    "description": "Convert magnetic flux density units — tesla, millitesla, gauss, microtesla, and more. Free online B-field converter for MRI and motor design.",
    "href": "/unit-converters/magnetic-flux-density"
  },
  {
    "name": "Frequency Converter",
    "description": "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics and audio engineering.",
    "href": "/unit-converters/frequency"
  },
  {
    "name": "Energy Converter",
    "description": "Convert energy units — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Free energy converter for physics and engineering.",
    "href": "/unit-converters/energy"
  },
  {
    "name": "Power Converter",
    "description": "Convert power units — watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for engineering calculations.",
    "href": "/unit-converters/power"
  },
  {
    "name": "Pressure Converter",
    "description": "Convert pressure units — pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering and science.",
    "href": "/unit-converters/pressure"
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
    "name": "Force Converter",
    "description": "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
    "href": "/unit-converters/force"
  },
  {
    "name": "Surface Tension Converter",
    "description": "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
    "href": "/unit-converters/surface-tension"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/unit-converters">Unit Converters</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/unit-converters/electric-resistance">Electric Resistance</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
