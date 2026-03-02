import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Image DPI Converter",
  description: "Convert image DPI and calculate print size from pixel dimensions. Free online image DPI converter for photographers, designers, and print-ready file preparation.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/image-dpi-converter",
  },
};

const tools = [
  {
    "name": "Digital Image Resolution Converter",
    "description": "Convert digital image resolution units — DPI, PPI, dots/cm, pixels/mm, and more. Free online resolution converter for photography and printing.",
    "href": "/unit-converters/digital-image-resolution"
  },
  {
    "name": "Video Frame Rate Converter",
    "description": "Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.",
    "href": "/unit-converters/video-frame-rate-converter"
  },
  {
    "name": "Audio Bitrate Converter",
    "description": "Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization.",
    "href": "/unit-converters/audio-bitrate-converter"
  },
  {
    "name": "Data Storage Converter",
    "description": "Convert digital storage units — bytes, KB, MB, GB, TB, and more. Free online data storage converter for computing and IT professionals.",
    "href": "/unit-converters/data-storage"
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
    "name": "Frequency Converter",
    "description": "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics and audio engineering.",
    "href": "/unit-converters/frequency"
  },
  {
    "name": "Wavelength Converter",
    "description": "Convert wavelength units across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online converter for optics and physics.",
    "href": "/unit-converters/wavelength"
  },
  {
    "name": "Time Converter",
    "description": "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
    "href": "/unit-converters/time"
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
    "name": "Angle Converter",
    "description": "Convert angle units — degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry and engineering.",
    "href": "/unit-converters/angle"
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
    "name": "Unix Timestamp Converter",
    "description": "Convert Unix timestamps to readable dates and times — and back again. Free online epoch time converter for developers, database administrators, and system engineers.",
    "href": "/unit-converters/unix-timestamp-converter"
  },
  {
    "name": "Time Duration Calculator",
    "description": "Calculate the exact duration between two times or add and subtract time intervals easily. Free online time duration calculator for work hours, project planning, and scheduling.",
    "href": "/unit-converters/time-duration-calculator"
  },
  {
    "name": "Electric Potential Converter",
    "description": "Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics and power systems.",
    "href": "/unit-converters/electric-potential"
  },
  {
    "name": "Electric Resistance Converter",
    "description": "Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design and electronics.",
    "href": "/unit-converters/electric-resistance"
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
    "name": "Frequency to Musical Note Converter",
    "description": "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
    "href": "/unit-converters/frequency-to-musical-note-converter"
  },
  {
    "name": "Sound Pressure Converter — Pa to dB",
    "description": "Convert sound pressure between pascals and decibels (dB SPL) instantly. Free online sound pressure converter for acoustics, audio engineering, and noise measurement.",
    "href": "/unit-converters/sound-pressure-pa-to-db"
  },
  {
    "name": "Density Converter",
    "description": "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
    "href": "/unit-converters/density"
  },
  {
    "name": "Surface Tension Converter",
    "description": "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
    "href": "/unit-converters/surface-tension"
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
  },
  {
    "name": "Heat Flux Density Converter",
    "description": "Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online converter for thermal engineering and solar energy.",
    "href": "/unit-converters/heat-flux-density"
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
