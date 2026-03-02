import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Angular Acceleration Converter",
  description: "Convert angular acceleration units — rad/s², deg/s², rev/min², and more. Free online converter for rotational dynamics and engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/acceleration-angular",
  },
};

const tools = [
  {
    "name": "Angular Velocity Converter",
    "description": "Convert angular velocity units — radians/second, degrees/second, RPM, and more. Free online converter for physics and mechanical engineering.",
    "href": "/unit-converters/velocity-angular"
  },
  {
    "name": "Angle Converter",
    "description": "Convert angle units — degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry and engineering.",
    "href": "/unit-converters/angle"
  },
  {
    "name": "Acceleration Converter",
    "description": "Convert acceleration units — m/s², g-force, ft/s², Gal, and more. Accurate online converter for physics, aerospace, and mechanical engineering.",
    "href": "/unit-converters/acceleration"
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
    "name": "Moment of Inertia Converter",
    "description": "Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online converter for mechanical engineering and rotational dynamics.",
    "href": "/unit-converters/moment-of-inertia"
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
    "name": "Length Converter",
    "description": "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
    "href": "/unit-converters/length"
  },
  {
    "name": "Power Converter",
    "description": "Convert power units — watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for engineering calculations.",
    "href": "/unit-converters/power"
  },
  {
    "name": "Frequency Converter",
    "description": "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics and audio engineering.",
    "href": "/unit-converters/frequency"
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
    "name": "Surface Tension Converter",
    "description": "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
    "href": "/unit-converters/surface-tension"
  },
  {
    "name": "Kinematic Viscosity Converter",
    "description": "Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online converter for fluid dynamics and oil analysis.",
    "href": "/unit-converters/viscosity-kinematic"
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
    "name": "Video Frame Rate Converter",
    "description": "Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.",
    "href": "/unit-converters/video-frame-rate-converter"
  },
  {
    "name": "Frequency to Musical Note Converter",
    "description": "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
    "href": "/unit-converters/frequency-to-musical-note-converter"
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
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/unit-converters/area"
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
    "name": "Weight and Mass Converter",
    "description": "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
    "href": "/unit-converters/weight-and-mass"
  },
  {
    "name": "Volume Converter",
    "description": "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
    "href": "/unit-converters/volume"
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
