import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Time Converter",
  description: "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/time",
  },
};

const tools = [
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
    "name": "Age Calculator",
    "description": "Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date.",
    "href": "/unit-converters/age-calculator"
  },
  {
    "name": "Date Difference Calculator",
    "description": "Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator for deadlines, anniversaries, and event planning.",
    "href": "/unit-converters/date-difference-calculator"
  },
  {
    "name": "Speed Converter",
    "description": "Convert speed units — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.",
    "href": "/unit-converters/speed"
  },
  {
    "name": "Angular Velocity Converter",
    "description": "Convert angular velocity units — radians/second, degrees/second, RPM, and more. Free online converter for physics and mechanical engineering.",
    "href": "/unit-converters/velocity-angular"
  },
  {
    "name": "Frequency Converter",
    "description": "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics and audio engineering.",
    "href": "/unit-converters/frequency"
  },
  {
    "name": "Video Frame Rate Converter",
    "description": "Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.",
    "href": "/unit-converters/video-frame-rate-converter"
  },
  {
    "name": "Acceleration Converter",
    "description": "Convert acceleration units — m/s², g-force, ft/s², Gal, and more. Accurate online converter for physics, aerospace, and mechanical engineering.",
    "href": "/unit-converters/acceleration"
  },
  {
    "name": "Angular Acceleration Converter",
    "description": "Convert angular acceleration units — rad/s², deg/s², rev/min², and more. Free online converter for rotational dynamics and engineering.",
    "href": "/unit-converters/acceleration-angular"
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
    "name": "Frequency to Musical Note Converter",
    "description": "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
    "href": "/unit-converters/frequency-to-musical-note-converter"
  },
  {
    "name": "Running Pace to Speed Converter",
    "description": "Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking.",
    "href": "/unit-converters/running-pace-to-speed-converter"
  },
  {
    "name": "Audio Bitrate Converter",
    "description": "Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization.",
    "href": "/unit-converters/audio-bitrate-converter"
  },
  {
    "name": "Fuel Consumption Converter",
    "description": "Convert fuel consumption units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.",
    "href": "/unit-converters/fuel-consumption"
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
    "name": "Molar Flow Rate Converter",
    "description": "Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering and process design.",
    "href": "/unit-converters/flow-molar"
  },
  {
    "name": "Fuel Efficiency by Volume Converter",
    "description": "Convert volumetric fuel efficiency — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles and fleet management.",
    "href": "/unit-converters/fuel-efficiency-volume"
  },
  {
    "name": "Calorie Burn Rate Calculator",
    "description": "Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.",
    "href": "/unit-converters/calorie-burn-rate-converter"
  },
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
    "name": "Temperature Converter",
    "description": "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine. Free online temperature converter for weather, cooking, and science.",
    "href": "/unit-converters/temperature"
  },
  {
    "name": "Area Converter",
    "description": "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
    "href": "/unit-converters/area"
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
    "name": "Angle Converter",
    "description": "Convert angle units — degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry and engineering.",
    "href": "/unit-converters/angle"
  },
  {
    "name": "Density Converter",
    "description": "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
    "href": "/unit-converters/density"
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
