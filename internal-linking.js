const fs = require("fs");
const path = require("path");

const toolMetadata = {
  length: {
    h1: "Length Converter",
    p: "Convert length units instantly — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
  },
  "weight-and-mass": {
    h1: "Weight and Mass Converter",
    p: "Convert weight and mass units — kilograms, pounds, grams, ounces, tons, and more. Accurate online weight converter for cooking, shipping, and science.",
  },
  volume: {
    h1: "Volume Converter",
    p: "Convert volume units — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Free online volume converter for cooking and engineering.",
  },
  temperature: {
    h1: "Temperature Converter",
    p: "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine. Free online temperature converter for weather, cooking, and science.",
  },
  area: {
    h1: "Area Converter",
    p: "Convert area units — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate and construction.",
  },
  pressure: {
    h1: "Pressure Converter",
    p: "Convert pressure units — pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering and science.",
  },
  energy: {
    h1: "Energy Converter",
    p: "Convert energy units — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Free energy converter for physics and engineering.",
  },
  power: {
    h1: "Power Converter",
    p: "Convert power units — watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for engineering calculations.",
  },
  force: {
    h1: "Force Converter",
    p: "Convert force units — newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics and engineering.",
  },
  time: {
    h1: "Time Converter",
    p: "Convert time units — seconds, minutes, hours, days, weeks, months, years. Simple online time converter for everyday and scientific use.",
  },
  speed: {
    h1: "Speed Converter",
    p: "Convert speed units — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.",
  },
  angle: {
    h1: "Angle Converter",
    p: "Convert angle units — degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry and engineering.",
  },
  "fuel-consumption": {
    h1: "Fuel Consumption Converter",
    p: "Convert fuel consumption units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.",
  },
  "data-storage": {
    h1: "Data Storage Converter",
    p: "Convert digital storage units — bytes, KB, MB, GB, TB, and more. Free online data storage converter for computing and IT professionals.",
  },
  "volume-dry": {
    h1: "Dry Volume Converter",
    p: "Convert dry volume units — dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture and cooking.",
  },
  "velocity-angular": {
    h1: "Angular Velocity Converter",
    p: "Convert angular velocity units — radians/second, degrees/second, RPM, and more. Free online converter for physics and mechanical engineering.",
  },
  acceleration: {
    h1: "Acceleration Converter",
    p: "Convert acceleration units — m/s², g-force, ft/s², Gal, and more. Accurate online converter for physics, aerospace, and mechanical engineering.",
  },
  "acceleration-angular": {
    h1: "Angular Acceleration Converter",
    p: "Convert angular acceleration units — rad/s², deg/s², rev/min², and more. Free online converter for rotational dynamics and engineering.",
  },
  density: {
    h1: "Density Converter",
    p: "Convert density units — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
  },
  "specific-volume": {
    h1: "Specific Volume Converter",
    p: "Convert specific volume units — m³/kg, L/kg, ft³/lb, and more. Accurate online converter for thermodynamics and fluid mechanics.",
  },
  "moment-of-inertia": {
    h1: "Moment of Inertia Converter",
    p: "Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online converter for mechanical engineering and rotational dynamics.",
  },
  "moment-of-force": {
    h1: "Moment of Force Converter",
    p: "Convert moment of force units — N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering.",
  },
  torque: {
    h1: "Torque Converter",
    p: "Convert torque units — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online converter for automotive and mechanical engineering.",
  },
  "fuel-efficiency-mass": {
    h1: "Fuel Efficiency by Mass Converter",
    p: "Convert fuel efficiency by mass — km/kg, miles/lb, and more. Free online converter for rocket propulsion and alternative fuel vehicles.",
  },
  "fuel-efficiency-volume": {
    h1: "Fuel Efficiency by Volume Converter",
    p: "Convert volumetric fuel efficiency — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles and fleet management.",
  },
  "temperature-interval": {
    h1: "Temperature Interval Converter",
    p: "Convert temperature difference units between Celsius, Fahrenheit, Kelvin, and Rankine. Free online converter for thermodynamics and HVAC.",
  },
  "thermal-expansion": {
    h1: "Thermal Expansion Converter",
    p: "Convert thermal expansion coefficients — per Kelvin, per Celsius, per Fahrenheit, and more. Free online converter for materials science and engineering.",
  },
  "thermal-resistance": {
    h1: "Thermal Resistance Converter",
    p: "Convert thermal resistance units — K/W, °C/W, °F·h/BTU, and more. Accurate online converter for HVAC, insulation, and electronics cooling.",
  },
  "thermal-conductivity": {
    h1: "Thermal Conductivity Converter",
    p: "Convert thermal conductivity units — W/(m·K), BTU/(h·ft·°F), cal/(s·cm·°C), and more. Free online converter for insulation and heat transfer engineering.",
  },
  "specific-heat-capacity": {
    h1: "Specific Heat Capacity Converter",
    p: "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online converter for thermodynamics and chemistry.",
  },
  "heat-density": {
    h1: "Heat Density Converter",
    p: "Convert heat density units — J/m³, BTU/ft³, cal/cm³, and more. Free online converter for combustion engineering and fuel analysis.",
  },
  "heat-flux-density": {
    h1: "Heat Flux Density Converter",
    p: "Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online converter for thermal engineering and solar energy.",
  },
  "heat-transfer-coefficient": {
    h1: "Heat Transfer Coefficient Converter",
    p: "Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection and HVAC engineering.",
  },
  flow: {
    h1: "Volumetric Flow Rate Converter",
    p: "Convert volumetric flow rate units — m³/s, liters/min, gallons/min, CFM, and more. Free online flow rate converter for plumbing and HVAC.",
  },
  "flow-mass": {
    h1: "Mass Flow Rate Converter",
    p: "Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing and aerospace.",
  },
  "flow-molar": {
    h1: "Molar Flow Rate Converter",
    p: "Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering and process design.",
  },
  "mass-flux-density": {
    h1: "Mass Flux Density Converter",
    p: "Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering and filtration.",
  },
  "concentration-molar": {
    h1: "Molar Concentration Converter",
    p: "Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry and biochemistry.",
  },
  "concentration-solution": {
    h1: "Solution Concentration Converter",
    p: "Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online converter for chemistry and water treatment.",
  },
  "viscosity-dynamic": {
    h1: "Dynamic Viscosity Converter",
    p: "Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online converter for fluid mechanics and chemical engineering.",
  },
  "viscosity-kinematic": {
    h1: "Kinematic Viscosity Converter",
    p: "Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online converter for fluid dynamics and oil analysis.",
  },
  "surface-tension": {
    h1: "Surface Tension Converter",
    p: "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online converter for chemistry and materials science.",
  },
  permeability: {
    h1: "Permeability Converter",
    p: "Convert permeability units — darcy, millidarcy, m², and more. Free online permeability converter for petroleum engineering and hydrogeology.",
  },
  luminance: {
    h1: "Luminance Converter",
    p: "Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology and photography.",
  },
  "luminous-intensity": {
    h1: "Luminous Intensity Converter",
    p: "Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online converter for photometry and LED design.",
  },
  illumination: {
    h1: "Illuminance Converter",
    p: "Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design and photography.",
  },
  "digital-image-resolution": {
    h1: "Digital Image Resolution Converter",
    p: "Convert digital image resolution units — DPI, PPI, dots/cm, pixels/mm, and more. Free online resolution converter for photography and printing.",
  },
  frequency: {
    h1: "Frequency Converter",
    p: "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics and audio engineering.",
  },
  wavelength: {
    h1: "Wavelength Converter",
    p: "Convert wavelength units across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online converter for optics and physics.",
  },
  charge: {
    h1: "Electric Charge Converter",
    p: "Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online converter for electronics and electrochemistry.",
  },
  "linear-charge-density": {
    h1: "Linear Charge Density Converter",
    p: "Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online converter for electrostatics and electrical engineering.",
  },
  "surface-charge-density": {
    h1: "Surface Charge Density Converter",
    p: "Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online converter for capacitor design and electrostatics.",
  },
  "volume-charge-density": {
    h1: "Volume Charge Density Converter",
    p: "Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online converter for electrostatics, plasma physics, and electrical engineering.",
  },
  current: {
    h1: "Electric Current Converter",
    p: "Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics and circuit design.",
  },
  "linear-current-density": {
    h1: "Linear Current Density Converter",
    p: "Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online converter for electromagnetics and electrical engineering.",
  },
  "surface-current-density": {
    h1: "Surface Current Density Converter",
    p: "Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online converter for electromagnetic field analysis and power systems.",
  },
  "electric-field-strength": {
    h1: "Electric Field Strength Converter",
    p: "Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics and antenna design.",
  },
  "electric-potential": {
    h1: "Electric Potential Converter",
    p: "Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics and power systems.",
  },
  "electric-resistance": {
    h1: "Electric Resistance Converter",
    p: "Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design and electronics.",
  },
  "electric-resistivity": {
    h1: "Electric Resistivity Converter",
    p: "Convert electrical resistivity units — Ω·m, Ω·cm, μΩ·in, and more. Accurate online resistivity converter for material science and semiconductor design.",
  },
  "electric-conductance": {
    h1: "Electric Conductance Converter",
    p: "Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics and electrochemistry.",
  },
  "electric-conductivity": {
    h1: "Electric Conductivity Converter",
    p: "Convert electrical conductivity units — S/m, mS/cm, μS/cm, and more. Free online conductivity converter for water quality testing and material science.",
  },
  "electrostatic-capacitance": {
    h1: "Capacitance Converter",
    p: "Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics and circuit design.",
  },
  inductance: {
    h1: "Inductance Converter",
    p: "Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics and RF engineering.",
  },
  "magnetomotive-force": {
    h1: "Magnetomotive Force Converter",
    p: "Convert magnetomotive force units — ampere-turns, gilberts, kiloampere-turns, and more. Free online MMF converter for magnetic circuit design.",
  },
  "magnetic-field-strength": {
    h1: "Magnetic Field Strength Converter",
    p: "Convert magnetic field strength units — A/m, oersteds, kA/m, and more. Accurate online H-field converter for electromagnetics and motor design.",
  },
  "magnetic-flux": {
    h1: "Magnetic Flux Converter",
    p: "Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer and motor engineering.",
  },
  "magnetic-flux-density": {
    h1: "Magnetic Flux Density Converter",
    p: "Convert magnetic flux density units — tesla, millitesla, gauss, microtesla, and more. Free online B-field converter for MRI and motor design.",
  },
  "rebar-weight-calculator": {
    h1: "Rebar Weight Calculator",
    p: "Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator.",
  },
  "concrete-volume-converter": {
    h1: "Concrete Volume Calculator & Converter",
    p: "Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects.",
  },
  "concrete-mix-ratio-converter": {
    h1: "Concrete Mix Ratio Calculator",
    p: "Convert concrete mix ratios and calculate exact cement, sand, and aggregate quantities for any volume. Free online concrete mix calculator for M10, M15, M20, M25, and custom mix designs.",
  },
  "brick-calculator": {
    h1: "Brick Calculator",
    p: "Calculate how many bricks you need for any wall or project. Enter wall dimensions and brick size to get an accurate brick count with mortar allowance. Free online brick quantity estimator.",
  },
  "tile-calculator": {
    h1: "Tile Calculator",
    p: "Calculate how many tiles you need for any floor or wall area. Enter room and tile dimensions to get an accurate tile count with waste factor included. Free online tile quantity calculator.",
  },
  "cement-sand-aggregate-converter": {
    h1: "Cement, Sand & Aggregate Calculator",
    p: "Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator.",
  },
  "lumber-board-feet-converter": {
    h1: "Lumber Board Feet Calculator",
    p: "Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry.",
  },
  "floor-area-converter": {
    h1: "Floor Area Converter",
    p: "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
  },
  "roofing-sheet-coverage-converter": {
    h1: "Roofing Sheet Coverage Calculator",
    p: "Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator.",
  },
  "cups-to-grams": {
    h1: "Cups to Grams Converter",
    p: "Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter.",
  },
  "cups-to-ml": {
    h1: "Cups to ml Converter",
    p: "Convert cups to milliliters, tablespoons, fluid ounces, and liters instantly. Free online cups to ml converter for accurate liquid measurements in any recipe or cooking project.",
  },
  "oven-temperature-converter": {
    h1: "Oven Temperature Converter",
    p: "Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country.",
  },
  "baking-pan-size-converter": {
    h1: "Baking Pan Size Converter",
    p: "Convert between baking pan sizes and find equivalent pan volumes to scale any recipe. Free online baking pan converter for round, square, rectangular, and springform tins.",
  },
  "ingredient-density-converter": {
    h1: "Ingredient Density Converter",
    p: "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
  },
  "sourdough-hydration-converter": {
    h1: "Sourdough Hydration Calculator",
    p: "Calculate sourdough hydration percentage and convert between flour and water ratios instantly. Free online sourdough hydration converter for perfect bread dough consistency every time.",
  },
  "image-dpi-converter": {
    h1: "Image DPI Converter",
    p: "Convert image DPI and calculate print size from pixel dimensions. Free online image DPI converter for photographers, designers, and print-ready file preparation.",
  },
  "video-frame-rate-converter": {
    h1: "Video Frame Rate Converter",
    p: "Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.",
  },
  "audio-bitrate-converter": {
    h1: "Audio Bitrate Converter",
    p: "Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization.",
  },
  "unix-timestamp-converter": {
    h1: "Unix Timestamp Converter",
    p: "Convert Unix timestamps to readable dates and times — and back again. Free online epoch time converter for developers, database administrators, and system engineers.",
  },
  "time-duration-calculator": {
    h1: "Time Duration Calculator",
    p: "Calculate the exact duration between two times or add and subtract time intervals easily. Free online time duration calculator for work hours, project planning, and scheduling.",
  },
  "age-calculator": {
    h1: "Age Calculator",
    p: "Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date.",
  },
  "date-difference-calculator": {
    h1: "Date Difference Calculator",
    p: "Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator for deadlines, anniversaries, and event planning.",
  },
  "light-years-to-parsecs": {
    h1: "Light-Years to Parsecs Converter",
    p: "Convert astronomical distances between light-years, parsecs, astronomical units, and kilometers. Free online space distance converter for astronomy, astrophysics, and science education.",
  },
  "astronomical-unit-converter": {
    h1: "Astronomical Unit (AU) Converter",
    p: "Convert astronomical units to light-years, parsecs, kilometers, miles, and more. Free online AU converter for planetary science, astronomy, and space exploration calculations.",
  },
  "apparent-magnitude-converter": {
    h1: "Apparent Magnitude Converter",
    p: "Convert between apparent magnitude, absolute magnitude, and stellar luminosity. Free online magnitude converter for amateur astronomers, astrophysics students, and stargazers.",
  },
  "planet-weight-converter": {
    h1: "Planet Weight Calculator",
    p: "Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education.",
  },
  "radiation-dose-converter": {
    h1: "Radiation Dose Converter",
    p: "Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics.",
  },
  "radioactivity-converter": {
    h1: "Radioactivity Converter",
    p: "Convert radioactivity units — becquerels, curies, millicuries, rutherfords, and more. Free online radioactivity converter for nuclear medicine, radiation safety, and physics.",
  },
  "exposure-dose-converter": {
    h1: "Radiation Exposure Dose Converter",
    p: "Convert radiation exposure dose units — roentgens, coulombs/kg, milliroentgens, and more. Free online exposure dose converter for radiology, health physics, and radiation protection.",
  },
  "sound-pressure-pa-to-db": {
    h1: "Sound Pressure Converter — Pa to dB",
    p: "Convert sound pressure between pascals and decibels (dB SPL) instantly. Free online sound pressure converter for acoustics, audio engineering, and noise measurement.",
  },
  "frequency-to-musical-note-converter": {
    h1: "Frequency to Musical Note Converter",
    p: "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
  },
  "wind-speed-converter": {
    h1: "Wind Speed Converter",
    p: "Convert wind speed between km/h, mph, knots, m/s, and Beaufort scale. Free online wind speed converter for meteorology, sailing, aviation, and weather analysis.",
  },
  "rainfall-converter": {
    h1: "Rainfall Converter",
    p: "Convert rainfall measurements between millimeters, inches, liters per square meter, and more. Free online precipitation converter for meteorology, hydrology, and agriculture.",
  },
  "humidity-ratio-converter": {
    h1: "Humidity Ratio Converter",
    p: "Convert between relative humidity, absolute humidity, specific humidity, and humidity ratio. Free online humidity converter for HVAC, meteorology, and building climate control.",
  },
  "dew-point-calculator": {
    h1: "Dew Point Calculator",
    p: "Calculate dew point temperature from relative humidity and air temperature instantly. Free online dew point calculator for weather forecasting, HVAC design, and condensation analysis.",
  },
  "fabric-gsm-converter": {
    h1: "Fabric GSM Converter",
    p: "Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers.",
  },
  "thread-count-converter": {
    h1: "Thread Count Converter",
    p: "Convert and compare thread count values across different measurement standards for bed sheets and fabrics. Free online thread count converter for textile buyers and bedding shoppers.",
  },
  "clothing-size-converter": {
    h1: "Clothing Size Converter",
    p: "Convert clothing sizes between US, UK, EU, and Asian standards for men, women, and kids. Free online clothes size converter for international shopping and fashion retail.",
  },
  "bmi-calculator": {
    h1: "BMI Calculator — Body Mass Index",
    p: "Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.",
  },
  "calorie-burn-rate-converter": {
    h1: "Calorie Burn Rate Calculator",
    p: "Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.",
  },
  "running-pace-to-speed-converter": {
    h1: "Running Pace to Speed Converter",
    p: "Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking.",
  },
  "height-converter": {
    h1: "Height Converter — cm to ft & in",
    p: "Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness.",
  },
  "shoe-size-converter": {
    h1: "Shoe Size Converter",
    p: "Convert shoe sizes between US, UK, EU, and international standards for men, women, and kids. Free online shoe size converter for global shopping and footwear retail.",
  },
  "ring-size-converter": {
    h1: "Ring Size Converter",
    p: "Convert ring sizes between US, UK, EU, French, Swiss, and Japanese standards. Free online ring size converter for jewelry shopping, gifting, and custom ring orders worldwide.",
  },
  "horsepower-to-animals-converter": {
    h1: "Horsepower to Animals Converter",
    p: "How many horses is your car's engine worth? Convert horsepower to fun animal equivalents — horses, hamsters, elephants, and more. A lighthearted power converter for curious minds.",
  },
};

// Get all tool slugs for generating links
const allToolSlugs = Object.keys(toolMetadata);

const generateLayout = (toolName, { h1, p }) => {
  const canonical = `https://1000freetools.com/unit-converters/${toolName}`;

  // Generate tools array for ToolLinkCards (excluding current tool)
  const otherTools = allToolSlugs
    .filter((slug) => slug !== toolName)
    .map((slug) => ({
      name: toolMetadata[slug].h1,
      description: toolMetadata[slug].p,
      href: `/unit-converters/${slug}`,
    }));

  const toolsJson = JSON.stringify(otherTools, null, 2);

  return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "${h1}",
  description: "${p}",
  alternates: {
    canonical: "${canonical}",
  },
};

const tools = ${toolsJson};

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
`;
};

for (const [toolName, meta] of Object.entries(toolMetadata)) {
  const dir = path.join("app", "unit-converters", toolName);
  const filePath = path.join(dir, "layout.tsx");

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateLayout(toolName, meta), "utf-8");

  console.log(`✅ Created: ${filePath}`);
}

console.log("\nDone! All layout files generated.");
