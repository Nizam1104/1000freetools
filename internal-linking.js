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

// Data from pasted_text_1.txt
const converters = {
  length: { id: 1 },
  "weight-and-mass": { id: 2 },
  volume: { id: 3 },
  temperature: { id: 4 },
  area: { id: 5 },
  pressure: { id: 6 },
  energy: { id: 7 },
  power: { id: 8 },
  force: { id: 9 },
  time: { id: 10 },
  speed: { id: 11 },
  angle: { id: 12 },
  "fuel-consumption": { id: 13 },
  "data-storage": { id: 14 },
  "volume-dry": { id: 15 },
  "velocity-angular": { id: 16 },
  acceleration: { id: 17 },
  "acceleration-angular": { id: 18 },
  density: { id: 19 },
  "specific-volume": { id: 20 },
  "moment-of-inertia": { id: 21 },
  "moment-of-force": { id: 22 },
  torque: { id: 23 },
  "fuel-efficiency-mass": { id: 24 },
  "fuel-efficiency-volume": { id: 25 },
  "temperature-interval": { id: 26 },
  "thermal-expansion": { id: 27 },
  "thermal-resistance": { id: 28 },
  "thermal-conductivity": { id: 29 },
  "specific-heat-capacity": { id: 30 },
  "heat-density": { id: 31 },
  "heat-flux-density": { id: 32 },
  "heat-transfer-coefficient": { id: 33 },
  flow: { id: 34 },
  "flow-mass": { id: 35 },
  "flow-molar": { id: 36 },
  "mass-flux-density": { id: 37 },
  "concentration-molar": { id: 38 },
  "concentration-solution": { id: 39 },
  "viscosity-dynamic": { id: 40 },
  "viscosity-kinematic": { id: 41 },
  "surface-tension": { id: 42 },
  permeability: { id: 43 },
  luminance: { id: 44 },
  "luminous-intensity": { id: 45 },
  illumination: { id: 46 },
  "digital-image-resolution": { id: 47 },
  frequency: { id: 48 },
  wavelength: { id: 49 },
  charge: { id: 50 },
  "linear-charge-density": { id: 51 },
  "surface-charge-density": { id: 52 },
  "volume-charge-density": { id: 53 },
  current: { id: 54 },
  "linear-current-density": { id: 55 },
  "surface-current-density": { id: 56 },
  "electric-field-strength": { id: 57 },
  "electric-potential": { id: 58 },
  "electric-resistance": { id: 59 },
  "electric-resistivity": { id: 60 },
  "electric-conductance": { id: 61 },
  "electric-conductivity": { id: 62 },
  "electrostatic-capacitance": { id: 63 },
  inductance: { id: 64 },
  "magnetomotive-force": { id: 65 },
  "magnetic-field-strength": { id: 66 },
  "magnetic-flux": { id: 67 },
  "magnetic-flux-density": { id: 68 },
  "rebar-weight-calculator": { id: 69 },
  "concrete-volume-converter": { id: 70 },
  "concrete-mix-ratio-converter": { id: 71 },
  "brick-calculator": { id: 72 },
  "tile-calculator": { id: 73 },
  "cement-sand-aggregate-converter": { id: 74 },
  "lumber-board-feet-converter": { id: 75 },
  "floor-area-converter": { id: 76 },
  "roofing-sheet-coverage-converter": { id: 77 },
  "cups-to-grams": { id: 78 },
  "cups-to-ml": { id: 79 },
  "oven-temperature-converter": { id: 80 },
  "baking-pan-size-converter": { id: 81 },
  "ingredient-density-converter": { id: 82 },
  "sourdough-hydration-converter": { id: 83 },
  "image-dpi-converter": { id: 84 },
  "video-frame-rate-converter": { id: 85 },
  "audio-bitrate-converter": { id: 86 },
  "unix-timestamp-converter": { id: 87 },
  "time-duration-calculator": { id: 88 },
  "age-calculator": { id: 89 },
  "date-difference-calculator": { id: 90 },
  "light-years-to-parsecs": { id: 91 },
  "astronomical-unit-converter": { id: 92 },
  "apparent-magnitude-converter": { id: 93 },
  "planet-weight-converter": { id: 94 },
  "radiation-dose-converter": { id: 95 },
  "radioactivity-converter": { id: 96 },
  "exposure-dose-converter": { id: 97 },
  "sound-pressure-pa-to-db": { id: 98 },
  "frequency-to-musical-note-converter": { id: 99 },
  "wind-speed-converter": { id: 100 },
  "rainfall-converter": { id: 101 },
  "humidity-ratio-converter": { id: 102 },
  "dew-point-calculator": { id: 103 },
  "fabric-gsm-converter": { id: 104 },
  "thread-count-converter": { id: 105 },
  "clothing-size-converter": { id: 106 },
  "bmi-calculator": { id: 107 },
  "calorie-burn-rate-converter": { id: 108 },
  "running-pace-to-speed-converter": { id: 109 },
  "height-converter": { id: 110 },
  "shoe-size-converter": { id: 111 },
  "ring-size-converter": { id: 112 },
  "horsepower-to-animals-converter": { id: 113 },
};

const links = {
  // 1: Length
  1: [
    2, 5, 11, 17, 110, 76, 91, 92, 47, 84, 49, 12, 3, 10, 13, 25, 69, 70, 75,
    109, 94, 16, 18, 22, 23, 37, 55, 51, 32, 57,
  ],
  // 2: Weight and Mass
  2: [
    1, 19, 20, 37, 35, 107, 110, 78, 82, 69, 74, 94, 108, 24, 104, 31, 30, 3, 5,
    17, 42, 40, 41, 27, 9, 23, 36, 39, 95, 113,
  ],
  // 3: Volume
  3: [
    2, 15, 34, 1, 78, 79, 82, 19, 20, 70, 71, 74, 5, 81, 35, 36, 39, 40, 41, 83,
    25, 13, 31, 53, 76, 101, 102, 17, 30, 38,
  ],
  // 4: Temperature
  4: [
    26, 80, 29, 28, 30, 27, 33, 32, 103, 102, 6, 7, 10, 1, 2, 3, 31, 95, 5, 25,
    13, 40, 41, 42, 19, 9, 11, 22, 34, 8,
  ],
  // 5: Area
  5: [
    1, 76, 3, 73, 72, 70, 77, 2, 47, 84, 75, 69, 74, 32, 37, 52, 56, 104, 19,
    20, 17, 12, 101, 11, 10, 91, 92, 43, 55, 31,
  ],
  // 6: Pressure
  6: [
    9, 7, 8, 4, 17, 40, 41, 42, 43, 33, 32, 34, 35, 36, 1, 2, 3, 11, 22, 23, 57,
    58, 59, 19, 28, 29, 30, 31, 37, 5,
  ],
  // 7: Energy
  7: [
    8, 6, 9, 4, 17, 30, 31, 32, 29, 28, 95, 96, 97, 11, 2, 1, 3, 22, 23, 33, 10,
    5, 108, 113, 58, 57, 48, 49, 98, 27,
  ],
  // 8: Power
  8: [
    7, 6, 9, 17, 11, 34, 35, 22, 23, 32, 33, 29, 31, 4, 2, 1, 3, 58, 57, 48,
    113, 108, 10, 5, 30, 40, 41, 19, 28, 27,
  ],
  // 9: Force
  9: [
    6, 8, 7, 22, 23, 17, 1, 2, 11, 4, 16, 18, 21, 42, 19, 37, 32, 35, 40, 41, 3,
    5, 57, 55, 28, 29, 30, 27, 34, 113,
  ],
  // 10: Time
  10: [
    87, 88, 89, 90, 11, 16, 48, 85, 17, 18, 1, 2, 3, 99, 109, 86, 13, 34, 35,
    36, 25, 108, 91, 92, 4, 5, 7, 8, 12, 19,
  ],
  // 11: Speed
  11: [
    1, 10, 17, 16, 109, 100, 13, 25, 91, 92, 94, 12, 2, 5, 3, 18, 22, 23, 34,
    35, 48, 85, 108, 9, 6, 19, 40, 41, 37, 4,
  ],
  // 12: Angle
  12: [
    16, 18, 1, 11, 17, 9, 22, 23, 21, 48, 99, 5, 49, 47, 84, 10, 2, 3, 91, 92,
    93, 19, 42, 55, 56, 57, 65, 66, 85, 13,
  ],
  // 13: Fuel Consumption
  13: [
    25, 24, 11, 1, 2, 3, 10, 5, 17, 8, 7, 34, 35, 19, 40, 41, 22, 23, 100, 109,
    6, 9, 113, 76, 70, 75, 4, 20, 31, 36,
  ],
  // 14: Data Storage
  14: [
    47, 84, 85, 86, 48, 87, 88, 10, 1, 2, 3, 5, 7, 8, 58, 59, 60, 61, 62, 63,
    64, 54, 50, 11, 17, 19, 34, 35, 99, 36,
  ],
  // 15: Dry Volume
  15: [
    3, 2, 1, 78, 82, 79, 5, 19, 34, 35, 81, 83, 70, 71, 74, 39, 38, 36, 40, 41,
    20, 31, 101, 104, 10, 17, 42, 30, 25, 13,
  ],
  // 16: Angular Velocity
  16: [
    18, 12, 11, 17, 9, 22, 23, 21, 48, 10, 1, 2, 8, 65, 66, 67, 68, 41, 42, 55,
    56, 57, 85, 99, 34, 35, 5, 3, 19, 40,
  ],
  // 17: Acceleration
  17: [
    11, 16, 18, 9, 1, 2, 10, 12, 22, 23, 6, 7, 8, 94, 35, 34, 5, 3, 21, 41, 40,
    42, 19, 37, 55, 57, 49, 91, 92, 113,
  ],
  // 18: Angular Acceleration
  18: [
    16, 12, 17, 9, 22, 23, 21, 11, 10, 1, 8, 48, 65, 66, 67, 68, 42, 41, 55, 56,
    57, 85, 99, 34, 35, 5, 19, 40, 2, 3,
  ],
  // 19: Density
  19: [
    2, 20, 3, 1, 5, 40, 41, 42, 43, 39, 38, 35, 37, 34, 30, 31, 29, 28, 27, 22,
    9, 6, 7, 17, 82, 104, 55, 56, 52, 53,
  ],
  // 20: Specific Volume
  20: [
    19, 3, 2, 40, 41, 30, 29, 28, 27, 34, 35, 36, 6, 7, 4, 33, 32, 31, 42, 43,
    1, 5, 17, 22, 9, 37, 55, 82, 39, 38,
  ],
  // 21: Moment of Inertia
  21: [
    22, 23, 9, 16, 18, 17, 12, 8, 7, 6, 1, 2, 5, 11, 10, 42, 40, 41, 19, 37, 55,
    65, 66, 67, 68, 34, 35, 57, 58, 113,
  ],
  // 22: Moment of Force
  22: [
    23, 9, 21, 17, 16, 18, 8, 7, 6, 12, 1, 2, 5, 11, 10, 42, 40, 41, 19, 37, 55,
    65, 66, 35, 34, 57, 58, 113, 3, 4,
  ],
  // 23: Torque
  23: [
    22, 9, 21, 17, 16, 18, 8, 7, 6, 12, 1, 2, 5, 11, 10, 42, 40, 41, 19, 37, 55,
    65, 66, 35, 34, 57, 58, 113, 3, 4,
  ],
  // 24: Fuel Efficiency Mass
  24: [
    25, 13, 2, 1, 11, 10, 35, 34, 19, 40, 41, 8, 7, 6, 3, 5, 17, 22, 23, 100,
    109, 36, 20, 31, 9, 82, 78, 70, 76, 113,
  ],
  // 25: Fuel Efficiency Volume
  25: [
    13, 24, 3, 1, 11, 10, 34, 35, 19, 40, 41, 8, 7, 6, 2, 5, 17, 22, 23, 100,
    109, 36, 20, 31, 9, 82, 70, 76, 39, 113,
  ],
  // 26: Temperature Interval
  26: [
    4, 28, 29, 30, 27, 33, 32, 31, 103, 102, 80, 7, 6, 8, 1, 2, 3, 5, 10, 19,
    40, 41, 9, 22, 34, 35, 36, 38, 42, 95,
  ],
  // 27: Thermal Expansion
  27: [
    28, 29, 30, 26, 4, 33, 32, 31, 19, 42, 40, 41, 6, 7, 8, 9, 1, 2, 3, 5, 17,
    22, 23, 35, 34, 43, 55, 57, 95, 103,
  ],
  // 28: Thermal Resistance
  28: [
    29, 30, 26, 27, 4, 33, 32, 31, 7, 8, 6, 19, 42, 40, 41, 1, 2, 3, 5, 17, 22,
    23, 35, 34, 43, 55, 57, 63, 64, 103,
  ],
  // 29: Thermal Conductivity
  29: [
    28, 30, 26, 27, 4, 33, 32, 31, 7, 8, 6, 19, 42, 40, 41, 1, 2, 3, 5, 17, 22,
    23, 35, 34, 43, 55, 57, 63, 64, 103,
  ],
  // 30: Specific Heat Capacity
  30: [
    29, 28, 26, 27, 4, 33, 32, 31, 7, 8, 6, 19, 42, 40, 41, 2, 38, 39, 3, 5, 35,
    34, 36, 20, 82, 78, 103, 95, 55, 17,
  ],
  // 31: Heat Density
  31: [
    32, 33, 29, 28, 30, 26, 27, 4, 7, 8, 6, 19, 3, 34, 35, 36, 2, 42, 40, 41, 1,
    5, 13, 25, 24, 95, 82, 20, 38, 39,
  ],
  // 32: Heat Flux Density
  32: [
    31, 33, 29, 28, 30, 26, 27, 4, 7, 8, 6, 19, 5, 34, 35, 37, 2, 42, 40, 41, 1,
    3, 52, 56, 57, 55, 95, 20, 101, 103,
  ],
  // 33: Heat Transfer Coefficient
  33: [
    32, 31, 29, 28, 30, 26, 27, 4, 7, 8, 6, 19, 5, 34, 35, 37, 2, 42, 40, 41, 1,
    3, 52, 56, 57, 55, 95, 102, 103, 20,
  ],
  // 34: Volumetric Flow Rate
  34: [
    35, 36, 37, 3, 11, 17, 1, 2, 5, 40, 41, 42, 43, 19, 20, 6, 8, 9, 22, 23, 13,
    25, 24, 32, 33, 55, 56, 57, 101, 102,
  ],
  // 35: Mass Flow Rate
  35: [
    34, 36, 37, 2, 11, 17, 1, 3, 5, 40, 41, 42, 43, 19, 20, 6, 8, 9, 22, 23, 13,
    25, 24, 32, 33, 55, 56, 57, 38, 39,
  ],
  // 36: Molar Flow Rate
  36: [
    35, 34, 37, 38, 39, 3, 2, 11, 17, 1, 5, 40, 41, 42, 43, 19, 20, 6, 8, 9, 30,
    32, 33, 55, 56, 57, 24, 25, 13, 15,
  ],
  // 37: Mass Flux Density
  37: [
    35, 34, 36, 32, 33, 2, 19, 40, 41, 42, 43, 5, 1, 3, 11, 17, 6, 8, 9, 22, 23,
    52, 56, 57, 55, 20, 30, 38, 39, 31,
  ],
  // 38: Molar Concentration
  38: [
    39, 36, 30, 19, 3, 2, 40, 41, 42, 34, 35, 37, 20, 5, 1, 6, 7, 8, 9, 17, 31,
    32, 33, 55, 56, 57, 52, 53, 95, 96,
  ],
  // 39: Solution Concentration
  39: [
    38, 36, 30, 19, 3, 2, 40, 41, 42, 34, 35, 37, 20, 5, 1, 6, 7, 8, 9, 17, 31,
    32, 33, 102, 103, 101, 52, 53, 95, 96,
  ],
  // 40: Dynamic Viscosity
  40: [
    41, 19, 20, 42, 43, 34, 35, 37, 6, 3, 2, 1, 5, 11, 17, 9, 8, 22, 23, 30, 29,
    28, 31, 32, 33, 36, 38, 39, 55, 57,
  ],
  // 41: Kinematic Viscosity
  41: [
    40, 19, 20, 42, 43, 34, 35, 37, 6, 3, 2, 1, 5, 11, 17, 9, 8, 22, 23, 30, 29,
    28, 31, 32, 33, 36, 38, 39, 55, 57,
  ],
  // 42: Surface Tension
  42: [
    40, 41, 19, 6, 9, 22, 23, 32, 33, 34, 35, 3, 2, 1, 5, 17, 43, 20, 37, 30,
    29, 28, 31, 38, 39, 55, 57, 27, 11, 8,
  ],
  // 43: Permeability
  43: [
    40, 41, 19, 3, 34, 35, 5, 6, 42, 37, 20, 1, 2, 17, 9, 22, 23, 31, 32, 33,
    38, 39, 29, 28, 30, 55, 57, 36, 11, 8,
  ],
  // 44: Luminance
  44: [
    45, 46, 47, 84, 5, 48, 49, 1, 2, 3, 10, 17, 11, 85, 12, 19, 42, 57, 58, 59,
    60, 61, 62, 63, 64, 98, 99, 32, 33, 55,
  ],
  // 45: Luminous Intensity
  45: [
    44, 46, 47, 84, 5, 48, 49, 1, 2, 3, 10, 17, 11, 85, 12, 19, 42, 57, 58, 59,
    60, 61, 62, 63, 64, 98, 99, 32, 33, 55,
  ],
  // 46: Illuminance
  46: [
    44, 45, 47, 84, 5, 48, 49, 1, 2, 3, 10, 17, 11, 85, 12, 19, 42, 57, 58, 59,
    60, 61, 62, 63, 64, 98, 99, 32, 33, 55,
  ],
  // 47: Digital Image Resolution
  47: [
    84, 85, 86, 14, 5, 1, 44, 45, 46, 48, 49, 10, 17, 11, 12, 2, 3, 87, 88, 58,
    59, 63, 64, 99, 98, 19, 42, 55, 57, 32,
  ],
  // 48: Frequency
  48: [
    49, 99, 16, 12, 98, 86, 85, 47, 10, 1, 2, 3, 5, 17, 11, 8, 7, 58, 59, 60,
    61, 62, 63, 64, 57, 55, 44, 45, 46, 87,
  ],
  // 49: Wavelength
  49: [
    48, 99, 16, 12, 98, 86, 85, 47, 10, 1, 2, 3, 5, 17, 11, 8, 7, 58, 59, 60,
    61, 62, 63, 64, 57, 55, 44, 45, 46, 91,
  ],
  // 50: Electric Charge
  50: [
    54, 58, 59, 60, 61, 62, 63, 64, 51, 52, 53, 57, 55, 56, 65, 66, 67, 68, 48,
    7, 8, 6, 10, 1, 2, 3, 17, 11, 96, 95,
  ],
  // 51: Linear Charge Density
  51: [
    50, 52, 53, 54, 57, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 42, 37,
  ],
  // 52: Surface Charge Density
  52: [
    50, 51, 53, 54, 57, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 5, 2, 1, 17, 37, 32, 42, 10,
  ],
  // 53: Volume Charge Density
  53: [
    50, 51, 52, 54, 57, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 3, 19, 38, 17, 10, 34, 35, 42,
  ],
  // 54: Electric Current
  54: [
    58, 59, 60, 61, 62, 63, 64, 50, 55, 56, 57, 65, 66, 67, 68, 48, 7, 8, 6, 10,
    1, 2, 3, 17, 11, 96, 95, 32, 33, 42,
  ],
  // 55: Linear Current Density
  55: [
    54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 37, 42,
  ],
  // 56: Surface Current Density
  56: [
    54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 5, 2, 1, 17, 32, 37, 42, 10,
  ],
  // 57: Electric Field Strength
  57: [
    58, 59, 60, 61, 62, 54, 55, 56, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    6, 7, 8, 1, 2, 5, 17, 11, 10, 9, 42,
  ],
  // 58: Electric Potential
  58: [
    59, 60, 61, 62, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 9, 42,
  ],
  // 59: Electric Resistance
  59: [
    60, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 9, 42,
  ],
  // 60: Electric Resistivity
  60: [
    59, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 19, 27, 29, 5, 1, 2, 17, 42,
  ],
  // 61: Electric Conductance
  61: [
    62, 59, 60, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 39, 42,
  ],
  // 62: Electric Conductivity
  62: [
    61, 59, 60, 58, 54, 55, 56, 57, 50, 51, 52, 53, 63, 64, 65, 66, 67, 68, 48,
    7, 8, 6, 19, 39, 29, 5, 1, 2, 17, 42,
  ],
  // 63: Capacitance
  63: [
    64, 59, 60, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 42, 28,
  ],
  // 64: Inductance
  64: [
    63, 59, 60, 61, 62, 58, 54, 55, 56, 57, 50, 51, 52, 53, 65, 66, 67, 68, 48,
    7, 8, 6, 1, 2, 5, 17, 11, 10, 42, 28,
  ],
  // 65: Magnetomotive Force
  65: [
    66, 67, 68, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 1, 2, 5, 17,
  ],
  // 66: Magnetic Field Strength
  66: [
    67, 68, 65, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 1, 2, 5, 17,
  ],
  // 67: Magnetic Flux
  67: [
    68, 66, 65, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 5, 1, 2, 17,
  ],
  // 68: Magnetic Flux Density
  68: [
    67, 66, 65, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 50, 51, 52, 53, 48,
    7, 8, 6, 16, 18, 21, 9, 5, 1, 2, 17,
  ],
  // 69: Rebar Weight Calculator
  69: [
    2, 1, 70, 71, 72, 73, 74, 75, 76, 77, 5, 3, 9, 22, 23, 17, 19, 40, 41, 42,
    43, 6, 8, 7, 27, 29, 28, 30, 34, 35,
  ],
  // 70: Concrete Volume
  70: [
    71, 74, 72, 73, 69, 75, 76, 77, 3, 5, 1, 2, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 71: Concrete Mix Ratio
  71: [
    70, 74, 72, 73, 69, 75, 76, 77, 3, 5, 1, 2, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 30, 38, 39, 27, 29, 28, 42,
  ],
  // 72: Brick Calculator
  72: [
    73, 70, 71, 74, 69, 75, 76, 77, 5, 1, 2, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 73: Tile Calculator
  73: [
    72, 76, 5, 1, 2, 70, 71, 74, 69, 75, 77, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 74: Cement Sand Aggregate
  74: [
    71, 70, 72, 73, 69, 75, 76, 77, 3, 5, 1, 2, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 30, 38, 39, 27, 29, 28, 42,
  ],
  // 75: Lumber Board Feet
  75: [
    1, 5, 76, 77, 69, 70, 71, 72, 73, 74, 2, 3, 9, 22, 23, 17, 19, 40, 41, 42,
    43, 6, 8, 7, 27, 29, 28, 30, 34, 35,
  ],
  // 76: Floor Area
  76: [
    5, 73, 72, 1, 70, 71, 74, 69, 75, 77, 2, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 77: Roofing Sheet Coverage
  77: [
    5, 76, 72, 73, 70, 71, 74, 69, 75, 1, 2, 3, 19, 40, 41, 34, 35, 6, 8, 9, 22,
    23, 17, 27, 29, 28, 30, 42, 43, 20,
  ],
  // 78: Cups to Grams
  78: [
    79, 82, 83, 80, 81, 2, 3, 15, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 36,
    40, 41, 20, 35, 108, 107, 74, 71, 70, 25,
  ],
  // 79: Cups to ml
  79: [
    78, 82, 83, 80, 81, 3, 15, 2, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 36,
    40, 41, 20, 108, 107, 74, 71, 70, 25, 101,
  ],
  // 80: Oven Temperature
  80: [
    4, 26, 78, 79, 82, 83, 81, 2, 3, 15, 19, 30, 38, 39, 5, 1, 10, 34, 35, 29,
    28, 27, 33, 32, 31, 108, 107, 103, 102, 40,
  ],
  // 81: Baking Pan Size
  81: [
    78, 79, 80, 82, 83, 5, 3, 2, 15, 19, 30, 38, 39, 4, 26, 1, 10, 34, 35, 40,
    41, 20, 76, 70, 73, 72, 108, 107, 25, 101,
  ],
  // 82: Ingredient Density
  82: [
    78, 79, 80, 81, 83, 2, 3, 15, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 40,
    41, 20, 108, 107, 25, 101, 74, 71, 70, 36,
  ],
  // 83: Sourdough Hydration
  83: [
    78, 79, 80, 81, 82, 2, 3, 15, 19, 30, 38, 39, 4, 26, 5, 1, 10, 34, 35, 40,
    41, 20, 108, 107, 25, 101, 74, 71, 70, 36,
  ],
  // 84: Image DPI
  84: [
    47, 85, 86, 14, 5, 1, 44, 45, 46, 48, 49, 10, 17, 11, 12, 2, 3, 87, 88, 58,
    59, 63, 64, 99, 98, 19, 42, 55, 57, 32,
  ],
  // 85: Video Frame Rate
  85: [
    86, 84, 47, 14, 48, 49, 10, 87, 88, 99, 98, 1, 2, 3, 5, 17, 11, 12, 58, 59,
    63, 64, 44, 45, 46, 19, 42, 55, 57, 32,
  ],
  // 86: Audio Bitrate
  86: [
    85, 84, 47, 14, 48, 49, 10, 87, 88, 99, 98, 1, 2, 3, 5, 17, 11, 12, 58, 59,
    63, 64, 44, 45, 46, 19, 42, 55, 57, 32,
  ],
  // 87: Unix Timestamp
  87: [
    88, 89, 90, 10, 48, 85, 86, 14, 1, 2, 3, 5, 17, 11, 12, 84, 47, 58, 59, 63,
    64, 99, 98, 44, 45, 46, 19, 42, 55, 57,
  ],
  // 88: Time Duration Calculator
  88: [
    87, 89, 90, 10, 48, 85, 86, 14, 1, 2, 3, 5, 17, 11, 12, 84, 47, 58, 59, 63,
    64, 99, 98, 44, 45, 46, 19, 42, 55, 57,
  ],
  // 89: Age Calculator
  89: [
    88, 90, 87, 10, 107, 110, 2, 1, 3, 5, 17, 11, 12, 48, 85, 84, 86, 58, 59,
    63, 64, 99, 98, 44, 45, 46, 19, 42, 55, 57,
  ],
  // 90: Date Difference Calculator
  90: [
    88, 89, 87, 10, 1, 2, 3, 5, 17, 11, 12, 48, 85, 84, 86, 58, 59, 63, 64, 99,
    98, 44, 45, 46, 107, 110, 19, 42, 55, 57,
  ],
  // 91: Light-Years to Parsecs
  91: [
    92, 93, 94, 1, 11, 17, 10, 2, 3, 5, 12, 16, 18, 9, 49, 48, 99, 8, 7, 6, 19,
    40, 41, 42, 37, 55, 57, 65, 67, 68,
  ],
  // 92: Astronomical Unit Converter
  92: [
    91, 93, 94, 1, 11, 17, 10, 2, 3, 5, 12, 16, 18, 9, 49, 48, 99, 8, 7, 6, 19,
    40, 41, 42, 37, 55, 57, 65, 67, 68,
  ],
  // 93: Apparent Magnitude
  93: [
    91, 92, 94, 44, 45, 46, 1, 11, 17, 10, 2, 3, 5, 12, 16, 18, 9, 49, 48, 99,
    8, 7, 6, 19, 40, 41, 42, 37, 55, 57,
  ],
  // 94: Planet Weight Calculator
  94: [
    91, 92, 93, 2, 1, 17, 11, 10, 9, 6, 7, 8, 3, 5, 12, 16, 18, 42, 19, 40, 41,
    37, 55, 57, 107, 110, 65, 67, 68, 22,
  ],
  // 95: Radiation Dose
  95: [
    96, 97, 7, 8, 6, 4, 26, 2, 1, 3, 5, 17, 11, 10, 50, 54, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 19, 42, 40,
  ],
  // 96: Radioactivity
  96: [
    95, 97, 7, 8, 6, 4, 26, 2, 1, 3, 5, 17, 11, 10, 50, 54, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 19, 42, 40,
  ],
  // 97: Exposure Dose
  97: [
    95, 96, 7, 8, 6, 4, 26, 2, 1, 3, 5, 17, 11, 10, 50, 54, 58, 59, 60, 61, 62,
    63, 64, 65, 66, 67, 68, 19, 42, 40,
  ],
  // 98: Sound Pressure Pa to dB
  98: [
    99, 48, 49, 86, 85, 44, 45, 46, 47, 84, 6, 7, 8, 1, 2, 3, 5, 17, 11, 10, 12,
    16, 18, 55, 56, 57, 58, 59, 63, 64,
  ],
  // 99: Frequency to Musical Note
  99: [
    48, 49, 98, 86, 85, 44, 45, 46, 47, 84, 7, 8, 6, 1, 2, 3, 5, 17, 11, 10, 12,
    16, 18, 55, 56, 57, 58, 59, 63, 64,
  ],
  // 100: Wind Speed
  100: [
    11, 1, 17, 101, 102, 103, 10, 2, 3, 5, 12, 16, 18, 9, 13, 25, 6, 7, 8, 19,
    40, 41, 42, 37, 55, 57, 91, 92, 109, 113,
  ],
  // 101: Rainfall
  101: [
    100, 102, 103, 1, 5, 3, 2, 11, 17, 10, 12, 16, 18, 9, 6, 7, 8, 19, 40, 41,
    42, 37, 55, 57, 34, 35, 34, 39, 36, 82,
  ],
  // 102: Humidity Ratio
  102: [
    103, 100, 101, 4, 26, 29, 28, 27, 33, 32, 31, 1, 5, 3, 2, 11, 17, 10, 6, 7,
    8, 19, 40, 41, 42, 37, 55, 39, 38, 82,
  ],
  // 103: Dew Point Calculator
  103: [
    102, 100, 101, 4, 26, 29, 28, 27, 33, 32, 31, 1, 5, 3, 2, 11, 17, 10, 6, 7,
    8, 19, 40, 41, 42, 37, 55, 39, 38, 82,
  ],
  // 104: Fabric GSM
  104: [
    105, 106, 2, 5, 1, 3, 19, 40, 41, 42, 37, 32, 33, 55, 56, 57, 20, 30, 29,
    28, 17, 11, 10, 75, 76, 77, 82, 78, 79, 27,
  ],
  // 105: Thread Count
  105: [
    104, 106, 2, 5, 1, 3, 19, 40, 41, 42, 37, 32, 33, 55, 56, 57, 20, 30, 29,
    28, 17, 11, 10, 75, 76, 77, 82, 78, 79, 27,
  ],
  // 106: Clothing Size
  106: [
    111, 112, 110, 104, 105, 107, 2, 1, 5, 17, 11, 10, 3, 19, 40, 41, 42, 37,
    32, 33, 55, 56, 57, 20, 30, 29, 28, 75, 76, 82,
  ],
  // 107: BMI Calculator
  107: [
    110, 108, 109, 2, 1, 4, 26, 17, 11, 10, 5, 3, 19, 40, 41, 42, 37, 32, 33,
    55, 56, 57, 20, 30, 29, 28, 106, 111, 78, 82,
  ],
  // 108: Calorie Burn Rate
  108: [
    107, 109, 110, 2, 1, 4, 26, 17, 11, 10, 5, 3, 19, 40, 41, 42, 37, 32, 33,
    55, 56, 57, 20, 30, 78, 82, 106, 111, 83, 25,
  ],
  // 109: Running Pace to Speed
  109: [
    11, 108, 107, 110, 17, 1, 2, 10, 5, 3, 12, 16, 18, 13, 25, 100, 91, 92, 19,
    40, 41, 42, 37, 32, 33, 55, 57, 94, 22, 23,
  ],
  // 110: Height Converter
  110: [
    1, 107, 106, 111, 112, 2, 5, 17, 11, 10, 3, 12, 16, 18, 13, 94, 19, 40, 41,
    42, 37, 32, 33, 55, 57, 91, 92, 22, 23, 108,
  ],
  // 111: Shoe Size
  111: [
    106, 112, 110, 107, 1, 2, 5, 17, 11, 10, 3, 12, 16, 18, 13, 94, 19, 40, 41,
    42, 37, 32, 33, 55, 57, 104, 105, 22, 23, 108,
  ],
  // 112: Ring Size
  112: [
    111, 106, 110, 107, 1, 2, 5, 17, 11, 10, 3, 12, 16, 18, 13, 94, 19, 40, 41,
    42, 37, 32, 33, 55, 57, 104, 105, 22, 23, 108,
  ],
  // 113: Horsepower to Animals
  113: [
    8, 9, 22, 23, 7, 6, 17, 16, 18, 11, 1, 2, 10, 5, 3, 12, 21, 94, 91, 92, 40,
    41, 42, 19, 37, 32, 33, 55, 57, 35,
  ],
};

// Create a reverse mapping from ID to slug for easy lookup
const idToSlug = {};
for (const slug in converters) {
  idToSlug[converters[slug].id] = slug;
}

const generateLayout = (toolName, { h1, p }) => {
  const canonical = `https://1000freetools.com/unit-converters/${toolName}`;

  // Get the ID of the current tool
  const currentToolId = converters[toolName]?.id;

  let linkedToolSlugs = [];
  if (currentToolId && links[currentToolId]) {
    // Map the linked IDs to their corresponding slugs
    linkedToolSlugs = links[currentToolId]
      .map((id) => idToSlug[id])
      .filter(Boolean); // Filter out any undefined slugs if an ID is missing from converters
  }

  // Generate tools array for ToolLinkCards based on the mapping
  const otherTools = linkedToolSlugs.map((slug) => ({
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

// The rest of the file generation loop remains the same
for (const [toolName, meta] of Object.entries(toolMetadata)) {
  const dir = path.join("app", "unit-converters", toolName);
  const filePath = path.join(dir, "layout.tsx");

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateLayout(toolName, meta), "utf-8");

  console.log(`✅ Created: ${filePath}`);
}

console.log("\nDone! All layout files generated.");
