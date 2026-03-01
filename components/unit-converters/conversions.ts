// // Conversion utilities for all unit types

// export interface UnitOption {
//   value: string;
//   label: string;
//   factor?: number;
// }

// // Length units (base: meter)
// export const lengthUnits: UnitOption[] = [
//   { value: "m", label: "Meter (m)" },
//   { value: "km", label: "Kilometer (km)" },
//   { value: "cm", label: "Centimeter (cm)" },
//   { value: "mm", label: "Millimeter (mm)" },
//   { value: "μm", label: "Micrometer (μm)" },
//   { value: "nm", label: "Nanometer (nm)" },
//   { value: "mi", label: "Mile (mi)" },
//   { value: "yd", label: "Yard (yd)" },
//   { value: "ft", label: "Foot (ft)" },
//   { value: "in", label: "Inch (in)" },
//   { value: "nmi", label: "Nautical Mile (nmi)" },
// ];

// export function convertLength(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     m: 1,
//     km: 1000,
//     cm: 0.01,
//     mm: 0.001,
//     μm: 1e-6,
//     nm: 1e-9,
//     mi: 1609.344,
//     yd: 0.9144,
//     ft: 0.3048,
//     in: 0.0254,
//     nmi: 1852,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Weight/Mass units (base: kilogram)
// export const weightUnits: UnitOption[] = [
//   { value: "kg", label: "Kilogram (kg)" },
//   { value: "g", label: "Gram (g)" },
//   { value: "mg", label: "Milligram (mg)" },
//   { value: "μg", label: "Microgram (μg)" },
//   { value: "t", label: "Metric Ton (t)" },
//   { value: "lb", label: "Pound (lb)" },
//   { value: "oz", label: "Ounce (oz)" },
//   { value: "st", label: "Stone (st)" },
//   { value: "ton", label: "US Ton" },
//   { value: "long ton", label: "Long Ton (UK)" },
// ];

// export function convertWeight(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     kg: 1,
//     g: 0.001,
//     mg: 1e-6,
//     μg: 1e-9,
//     t: 1000,
//     lb: 0.45359237,
//     oz: 0.02834952,
//     st: 6.35029318,
//     ton: 907.18474,
//     "long ton": 1016.0469088,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Volume units (base: liter)
// export const volumeUnits: UnitOption[] = [
//   { value: "L", label: "Liter (L)" },
//   { value: "mL", label: "Milliliter (mL)" },
//   { value: "m³", label: "Cubic Meter (m³)" },
//   { value: "cm³", label: "Cubic Centimeter (cm³)" },
//   { value: "gal", label: "Gallon (US)" },
//   { value: "qt", label: "Quart (US)" },
//   { value: "pt", label: "Pint (US)" },
//   { value: "cup", label: "Cup (US)" },
//   { value: "fl oz", label: "Fluid Ounce (US)" },
//   { value: "tbsp", label: "Tablespoon" },
//   { value: "tsp", label: "Teaspoon" },
//   { value: "ft³", label: "Cubic Foot" },
//   { value: "in³", label: "Cubic Inch" },
// ];

// export function convertVolume(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     L: 1,
//     mL: 0.001,
//     "m³": 1000,
//     "cm³": 0.001,
//     gal: 3.785411784,
//     qt: 0.946352946,
//     pt: 0.473176473,
//     cup: 0.236588236,
//     "fl oz": 0.0295735296,
//     tbsp: 0.0147867648,
//     tsp: 0.00492892159,
//     "ft³": 28.3168466,
//     "in³": 0.016387064,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Temperature conversion (special formulas)
// export const temperatureUnits: UnitOption[] = [
//   { value: "C", label: "Celsius (°C)" },
//   { value: "F", label: "Fahrenheit (°F)" },
//   { value: "K", label: "Kelvin (K)" },
//   { value: "R", label: "Rankine (°R)" },
// ];

// export function convertTemperature(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   let celsius: number;
//   switch (from) {
//     case "C":
//       celsius = value;
//       break;
//     case "F":
//       celsius = ((value - 32) * 5) / 9;
//       break;
//     case "K":
//       celsius = value - 273.15;
//       break;
//     case "R":
//       celsius = ((value - 491.67) * 5) / 9;
//       break;
//     default:
//       celsius = value;
//   }
//   switch (to) {
//     case "C":
//       return celsius;
//     case "F":
//       return (celsius * 9) / 5 + 32;
//     case "K":
//       return celsius + 273.15;
//     case "R":
//       return (celsius * 9) / 5 + 491.67;
//     default:
//       return celsius;
//   }
// }

// // Area units (base: square meter)
// export const areaUnits: UnitOption[] = [
//   { value: "m²", label: "Square Meter (m²)" },
//   { value: "km²", label: "Square Kilometer (km²)" },
//   { value: "cm²", label: "Square Centimeter (cm²)" },
//   { value: "mm²", label: "Square Millimeter (mm²)" },
//   { value: "ha", label: "Hectare (ha)" },
//   { value: "ac", label: "Acre (ac)" },
//   { value: "mi²", label: "Square Mile" },
//   { value: "yd²", label: "Square Yard" },
//   { value: "ft²", label: "Square Foot" },
//   { value: "in²", label: "Square Inch" },
// ];

// export function convertArea(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     "m²": 1,
//     "km²": 1e6,
//     "cm²": 0.0001,
//     "mm²": 1e-6,
//     ha: 10000,
//     ac: 4046.8564224,
//     "mi²": 2.58998811e6,
//     "yd²": 0.83612736,
//     "ft²": 0.09290304,
//     "in²": 0.00064516,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Pressure units (base: pascal)
// export const pressureUnits: UnitOption[] = [
//   { value: "Pa", label: "Pascal (Pa)" },
//   { value: "kPa", label: "Kilopascal (kPa)" },
//   { value: "MPa", label: "Megapascal (MPa)" },
//   { value: "bar", label: "Bar" },
//   { value: "psi", label: "PSI" },
//   { value: "atm", label: "Atmosphere (atm)" },
//   { value: "Torr", label: "Torr" },
//   { value: "mmHg", label: "mmHg" },
// ];

// export function convertPressure(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     Pa: 1,
//     kPa: 1000,
//     MPa: 1e6,
//     bar: 100000,
//     psi: 6894.757293168,
//     atm: 101325,
//     Torr: 133.322368421,
//     mmHg: 133.322387415,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Energy units (base: joule)
// export const energyUnits: UnitOption[] = [
//   { value: "J", label: "Joule (J)" },
//   { value: "kJ", label: "Kilojoule (kJ)" },
//   { value: "cal", label: "Calorie (cal)" },
//   { value: "kcal", label: "Kilocalorie (kcal)" },
//   { value: "Wh", label: "Watt-hour (Wh)" },
//   { value: "kWh", label: "Kilowatt-hour (kWh)" },
//   { value: "BTU", label: "BTU" },
//   { value: "eV", label: "Electronvolt (eV)" },
// ];

// export function convertEnergy(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     J: 1,
//     kJ: 1000,
//     cal: 4.184,
//     kcal: 4184,
//     Wh: 3600,
//     kWh: 3.6e6,
//     BTU: 1055.05585262,
//     eV: 1.602176634e-19,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Power units (base: watt)
// export const powerUnits: UnitOption[] = [
//   { value: "W", label: "Watt (W)" },
//   { value: "kW", label: "Kilowatt (kW)" },
//   { value: "MW", label: "Megawatt (MW)" },
//   { value: "hp", label: "Horsepower (hp)" },
//   { value: "metric hp", label: "Metric Horsepower" },
// ];

// export function convertPower(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     W: 1,
//     kW: 1000,
//     MW: 1e6,
//     hp: 745.699871582,
//     "metric hp": 735.49875,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Force units (base: newton)
// export const forceUnits: UnitOption[] = [
//   { value: "N", label: "Newton (N)" },
//   { value: "kN", label: "Kilonewton (kN)" },
//   { value: "lbf", label: "Pound-force (lbf)" },
//   { value: "kgf", label: "Kilogram-force (kgf)" },
//   { value: "dyn", label: "Dyne" },
// ];

// export function convertForce(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     N: 1,
//     kN: 1000,
//     lbf: 4.4482216152605,
//     kgf: 9.80665,
//     dyn: 1e-5,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Time units (base: second)
// export const timeUnits: UnitOption[] = [
//   { value: "s", label: "Second (s)" },
//   { value: "ms", label: "Millisecond (ms)" },
//   { value: "μs", label: "Microsecond (μs)" },
//   { value: "ns", label: "Nanosecond (ns)" },
//   { value: "min", label: "Minute" },
//   { value: "h", label: "Hour" },
//   { value: "d", label: "Day" },
//   { value: "wk", label: "Week" },
//   { value: "mo", label: "Month (avg)" },
//   { value: "y", label: "Year (avg)" },
// ];

// export function convertTime(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     s: 1,
//     ms: 0.001,
//     μs: 1e-6,
//     ns: 1e-9,
//     min: 60,
//     h: 3600,
//     d: 86400,
//     wk: 604800,
//     mo: 2.628e6,
//     y: 3.154e7,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Speed units (base: m/s)
// export const speedUnits: UnitOption[] = [
//   { value: "m/s", label: "Meter/second (m/s)" },
//   { value: "km/h", label: "Kilometer/hour (km/h)" },
//   { value: "mph", label: "Mile/hour (mph)" },
//   { value: "kn", label: "Knot (kn)" },
//   { value: "ft/s", label: "Foot/second (ft/s)" },
// ];

// export function convertSpeed(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     "m/s": 1,
//     "km/h": 0.277777778,
//     mph: 0.44704,
//     kn: 0.514444444,
//     "ft/s": 0.3048,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Angle units (base: degree)
// export const angleUnits: UnitOption[] = [
//   { value: "deg", label: "Degree (°)" },
//   { value: "rad", label: "Radian (rad)" },
//   { value: "grad", label: "Gradian (gon)" },
//   { value: "arcmin", label: "Arcminute" },
//   { value: "arcsec", label: "Arcsecond" },
// ];

// export function convertAngle(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     deg: 1,
//     rad: 57.2957795131,
//     grad: 0.9,
//     arcmin: 1 / 60,
//     arcsec: 1 / 3600,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Fuel Consumption units
// export const fuelConsumptionUnits: UnitOption[] = [
//   { value: "mpg", label: "MPG (US)" },
//   { value: "mpg-uk", label: "MPG (UK)" },
//   { value: "L/100km", label: "L/100km" },
//   { value: "km/L", label: "km/L" },
//   { value: "mi/L", label: "mi/L" },
// ];

// export function convertFuelConsumption(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   let lPer100km: number;
//   switch (from) {
//     case "mpg":
//       lPer100km = 235.214583 / value;
//       break;
//     case "mpg-uk":
//       lPer100km = 282.480936 / value;
//       break;
//     case "L/100km":
//       lPer100km = value;
//       break;
//     case "km/L":
//       lPer100km = 100 / value;
//       break;
//     case "mi/L":
//       lPer100km = 235.214583 / (value * 1.609344);
//       break;
//     default:
//       lPer100km = value;
//   }
//   switch (to) {
//     case "mpg":
//       return 235.214583 / lPer100km;
//     case "mpg-uk":
//       return 282.480936 / lPer100km;
//     case "L/100km":
//       return lPer100km;
//     case "km/L":
//       return 100 / lPer100km;
//     case "mi/L":
//       return 235.214583 / (lPer100km * 1.609344);
//     default:
//       return lPer100km;
//   }
// }

// // Data Storage units (base: byte)
// export const dataStorageUnits: UnitOption[] = [
//   { value: "B", label: "Byte (B)" },
//   { value: "KB", label: "Kilobyte (KB)" },
//   { value: "MB", label: "Megabyte (MB)" },
//   { value: "GB", label: "Gigabyte (GB)" },
//   { value: "TB", label: "Terabyte (TB)" },
//   { value: "PB", label: "Petabyte (PB)" },
//   { value: "KiB", label: "Kibibyte (KiB)" },
//   { value: "MiB", label: "Mebibyte (MiB)" },
//   { value: "GiB", label: "Gibibyte (GiB)" },
//   { value: "TiB", label: "Tebibyte (TiB)" },
//   { value: "bit", label: "Bit" },
// ];

// export function convertDataStorage(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     B: 1,
//     KB: 1000,
//     MB: 1e6,
//     GB: 1e9,
//     TB: 1e12,
//     PB: 1e15,
//     KiB: 1024,
//     MiB: 1048576,
//     GiB: 1073741824,
//     TiB: 1099511627776,
//     bit: 0.125,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Frequency units (base: hertz)
// export const frequencyUnits: UnitOption[] = [
//   { value: "Hz", label: "Hertz (Hz)" },
//   { value: "kHz", label: "Kilohertz (kHz)" },
//   { value: "MHz", label: "Megahertz (MHz)" },
//   { value: "GHz", label: "Gigahertz (GHz)" },
//   { value: "THz", label: "Terahertz (THz)" },
//   { value: "RPM", label: "RPM" },
// ];

// export function convertFrequency(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     Hz: 1,
//     kHz: 1000,
//     MHz: 1e6,
//     GHz: 1e9,
//     THz: 1e12,
//     RPM: 1 / 60,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Digital Image Resolution
// export const resolutionUnits: UnitOption[] = [
//   { value: "dpi", label: "DPI (dots/inch)" },
//   { value: "dpcm", label: "DPCM (dots/cm)" },
//   { value: "ppi", label: "PPI (pixels/inch)" },
//   { value: "px/cm", label: "Pixels/cm" },
// ];

// export function convertResolution(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     dpi: 1,
//     dpcm: 2.54,
//     ppi: 1,
//     "px/cm": 2.54,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Wavelength
// export const wavelengthUnits: UnitOption[] = [
//   { value: "m", label: "Meter (m)" },
//   { value: "cm", label: "Centimeter (cm)" },
//   { value: "mm", label: "Millimeter (mm)" },
//   { value: "μm", label: "Micrometer (μm)" },
//   { value: "nm", label: "Nanometer (nm)" },
//   { value: "Hz", label: "Hertz (Hz)" },
//   { value: "kHz", label: "Kilohertz (kHz)" },
//   { value: "MHz", label: "Megahertz (MHz)" },
//   { value: "GHz", label: "Gigahertz (GHz)" },
// ];

// export function convertWavelength(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const c = 299792458;
//   const lengthFactors: Record<string, number> = {
//     m: 1,
//     cm: 0.01,
//     mm: 0.001,
//     μm: 1e-6,
//     nm: 1e-9,
//   };
//   const freqFactors: Record<string, number> = {
//     Hz: 1,
//     kHz: 1000,
//     MHz: 1e6,
//     GHz: 1e9,
//   };
//   const isLengthFrom = from in lengthFactors;
//   const isLengthTo = to in lengthFactors;
//   if (isLengthFrom && isLengthTo)
//     return (value * lengthFactors[from]) / lengthFactors[to];
//   if (!isLengthFrom && !isLengthTo)
//     return (value * freqFactors[from]) / freqFactors[to];
//   if (isLengthFrom) {
//     const wavelengthM = value * lengthFactors[from];
//     const freqHz = c / wavelengthM;
//     return freqHz / freqFactors[to];
//   } else {
//     const freqHz = value * freqFactors[from];
//     const wavelengthM = c / freqHz;
//     return wavelengthM / lengthFactors[to];
//   }
// }

// // Charge units (base: coulomb)
// export const chargeUnits: UnitOption[] = [
//   { value: "C", label: "Coulomb (C)" },
//   { value: "mC", label: "Millicoulomb (mC)" },
//   { value: "μC", label: "Microcoulomb (μC)" },
//   { value: "nC", label: "Nanocoulomb (nC)" },
//   { value: "Ah", label: "Ampere-hour (Ah)" },
//   { value: "mAh", label: "Milliampere-hour (mAh)" },
// ];

// export function convertCharge(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     C: 1,
//     mC: 0.001,
//     μC: 1e-6,
//     nC: 1e-9,
//     Ah: 3600,
//     mAh: 3.6,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Current units (base: ampere)
// export const currentUnits: UnitOption[] = [
//   { value: "A", label: "Ampere (A)" },
//   { value: "mA", label: "Milliampere (mA)" },
//   { value: "μA", label: "Microampere (μA)" },
//   { value: "kA", label: "Kiloampere (kA)" },
// ];

// export function convertCurrent(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     A: 1,
//     mA: 0.001,
//     μA: 1e-6,
//     kA: 1000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Voltage units (base: volt)
// export const voltageUnits: UnitOption[] = [
//   { value: "V", label: "Volt (V)" },
//   { value: "mV", label: "Millivolt (mV)" },
//   { value: "kV", label: "Kilovolt (kV)" },
//   { value: "MV", label: "Megavolt (MV)" },
// ];

// export function convertVoltage(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     V: 1,
//     mV: 0.001,
//     kV: 1000,
//     MV: 1e6,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Resistance units (base: ohm)
// export const resistanceUnits: UnitOption[] = [
//   { value: "Ω", label: "Ohm (Ω)" },
//   { value: "mΩ", label: "Milliohm (mΩ)" },
//   { value: "kΩ", label: "Kiloohm (kΩ)" },
//   { value: "MΩ", label: "Megaohm (MΩ)" },
// ];

// export function convertResistance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     Ω: 1,
//     mΩ: 0.001,
//     kΩ: 1000,
//     MΩ: 1e6,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Capacitance units (base: farad)
// export const capacitanceUnits: UnitOption[] = [
//   { value: "F", label: "Farad (F)" },
//   { value: "mF", label: "Millifarad (mF)" },
//   { value: "μF", label: "Microfarad (μF)" },
//   { value: "nF", label: "Nanofarad (nF)" },
//   { value: "pF", label: "Picofarad (pF)" },
// ];

// export function convertCapacitance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     F: 1,
//     mF: 0.001,
//     μF: 1e-6,
//     nF: 1e-9,
//     pF: 1e-12,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Inductance units (base: henry)
// export const inductanceUnits: UnitOption[] = [
//   { value: "H", label: "Henry (H)" },
//   { value: "mH", label: "Millihenry (mH)" },
//   { value: "μH", label: "Microhenry (μH)" },
//   { value: "nH", label: "Nanohenry (nH)" },
// ];

// export function convertInductance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     H: 1,
//     mH: 0.001,
//     μH: 1e-6,
//     nH: 1e-9,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Conductance units (base: siemens)
// export const conductanceUnits: UnitOption[] = [
//   { value: "S", label: "Siemens (S)" },
//   { value: "mS", label: "Millisiemens (mS)" },
//   { value: "μS", label: "Microsiemens (μS)" },
// ];

// export function convertConductance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = { S: 1, mS: 0.001, μS: 1e-6 };
//   return (value * factors[from]) / factors[to];
// }

// // Magnetic Flux units (base: weber)
// export const magneticFluxUnits: UnitOption[] = [
//   { value: "Wb", label: "Weber (Wb)" },
//   { value: "mWb", label: "Milliweber (mWb)" },
//   { value: "Mx", label: "Maxwell (Mx)" },
// ];

// export function convertMagneticFlux(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = { Wb: 1, mWb: 0.001, Mx: 1e-8 };
//   return (value * factors[from]) / factors[to];
// }

// // Magnetic Flux Density units (base: tesla)
// export const magneticFluxDensityUnits: UnitOption[] = [
//   { value: "T", label: "Tesla (T)" },
//   { value: "mT", label: "Millitesla (mT)" },
//   { value: "G", label: "Gauss (G)" },
//   { value: "μT", label: "Microtesla (μT)" },
// ];

// export function convertMagneticFluxDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     T: 1,
//     mT: 0.001,
//     G: 0.0001,
//     μT: 1e-6,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Luminance units
// export const luminanceUnits: UnitOption[] = [
//   { value: "cd/m²", label: "cd/m² (nit)" },
//   { value: "cd/ft²", label: "cd/ft²" },
//   { value: "fL", label: "Foot-lambert (fL)" },
// ];

// export function convertLuminance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "cd/m²": 1,
//     "cd/ft²": 10.7639104,
//     fL: 3.4262591,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Illuminance units (base: lux)
// export const illuminanceUnits: UnitOption[] = [
//   { value: "lx", label: "Lux (lx)" },
//   { value: "fc", label: "Foot-candle (fc)" },
//   { value: "ph", label: "Phot (ph)" },
// ];

// export function convertIlluminance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = { lx: 1, fc: 10.7639104, ph: 10000 };
//   return (value * factors[from]) / factors[to];
// }

// // Luminous Intensity units (base: candela)
// export const luminousIntensityUnits: UnitOption[] = [
//   { value: "cd", label: "Candela (cd)" },
//   { value: "mcd", label: "Millicandela (mcd)" },
// ];

// export function convertLuminousIntensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = { cd: 1, mcd: 0.001 };
//   return (value * factors[from]) / factors[to];
// }

// // Acceleration units (base: m/s²)
// export const accelerationUnits: UnitOption[] = [
//   { value: "m/s²", label: "m/s²" },
//   { value: "ft/s²", label: "ft/s²" },
//   { value: "g", label: "G-force (g)" },
//   { value: "Gal", label: "Gal" },
// ];

// export function convertAcceleration(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "m/s²": 1,
//     "ft/s²": 0.3048,
//     g: 9.80665,
//     Gal: 0.01,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Angular Velocity units
// export const angularVelocityUnits: UnitOption[] = [
//   { value: "rad/s", label: "rad/s" },
//   { value: "deg/s", label: "deg/s" },
//   { value: "RPM", label: "RPM" },
//   { value: "rad/min", label: "rad/min" },
// ];

// export function convertAngularVelocity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "rad/s": 1,
//     "deg/s": 0.0174532925,
//     RPM: 0.104719755,
//     "rad/min": 1 / 60,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Angular Acceleration units
// export const angularAccelerationUnits: UnitOption[] = [
//   { value: "rad/s²", label: "rad/s²" },
//   { value: "deg/s²", label: "deg/s²" },
//   { value: "rev/min²", label: "rev/min²" },
// ];

// export function convertAngularAcceleration(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "rad/s²": 1,
//     "deg/s²": 0.0174532925,
//     "rev/min²": 0.0000290888,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Density units (base: kg/m³)
// export const densityUnits: UnitOption[] = [
//   { value: "kg/m³", label: "kg/m³" },
//   { value: "g/cm³", label: "g/cm³" },
//   { value: "g/mL", label: "g/mL" },
//   { value: "lb/ft³", label: "lb/ft³" },
//   { value: "lb/in³", label: "lb/in³" },
// ];

// export function convertDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "kg/m³": 1,
//     "g/cm³": 1000,
//     "g/mL": 1000,
//     "lb/ft³": 16.0184634,
//     "lb/in³": 27679.9047,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Specific Volume units
// export const specificVolumeUnits: UnitOption[] = [
//   { value: "m³/kg", label: "m³/kg" },
//   { value: "L/kg", label: "L/kg" },
//   { value: "ft³/lb", label: "ft³/lb" },
//   { value: "ft³/slug", label: "ft³/slug" },
// ];

// export function convertSpecificVolume(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "m³/kg": 1,
//     "L/kg": 0.001,
//     "ft³/lb": 0.0624279606,
//     "ft³/slug": 1.94032033,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Moment of Inertia units
// export const momentOfInertiaUnits: UnitOption[] = [
//   { value: "kg·m²", label: "kg·m²" },
//   { value: "g·cm²", label: "g·cm²" },
//   { value: "lb·ft²", label: "lb·ft²" },
//   { value: "lb·in²", label: "lb·in²" },
// ];

// export function convertMomentOfInertia(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "kg·m²": 1,
//     "g·cm²": 1e-7,
//     "lb·ft²": 0.0421401101,
//     "lb·in²": 0.0002926397,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Torque units (base: N·m)
// export const torqueUnits: UnitOption[] = [
//   { value: "N·m", label: "N·m" },
//   { value: "lbf·ft", label: "lbf·ft" },
//   { value: "lbf·in", label: "lbf·in" },
//   { value: "kgf·m", label: "kgf·m" },
//   { value: "kgf·cm", label: "kgf·cm" },
// ];

// export function convertTorque(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     "N·m": 1,
//     "lbf·ft": 1.35581795,
//     "lbf·in": 0.112984829,
//     "kgf·m": 9.80665,
//     "kgf·cm": 0.0980665,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Moment of Force units (same as torque)
// export const momentOfForceUnits: UnitOption[] = [
//   { value: "N·m", label: "N·m" },
//   { value: "lbf·ft", label: "lbf·ft" },
//   { value: "kgf·m", label: "kgf·m" },
// ];

// export function convertMomentOfForce(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   return convertTorque(value, from, to);
// }

// // Specific Heat Capacity units
// export const specificHeatCapacityUnits: UnitOption[] = [
//   { value: "J/(kg·K)", label: "J/(kg·K)" },
//   { value: "J/(g·K)", label: "J/(g·K)" },
//   { value: "cal/(g·°C)", label: "cal/(g·°C)" },
//   { value: "BTU/(lb·°F)", label: "BTU/(lb·°F)" },
//   { value: "kJ/(kg·K)", label: "kJ/(kg·K)" },
// ];

// export function convertSpecificHeatCapacity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "J/(kg·K)": 1,
//     "J/(g·K)": 1000,
//     "cal/(g·°C)": 4184,
//     "BTU/(lb·°F)": 4186.8,
//     "kJ/(kg·K)": 1000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Thermal Conductivity units
// export const thermalConductivityUnits: UnitOption[] = [
//   { value: "W/(m·K)", label: "W/(m·K)" },
//   { value: "W/(cm·K)", label: "W/(cm·K)" },
//   { value: "BTU/(h·ft·°F)", label: "BTU/(h·ft·°F)" },
//   { value: "cal/(s·cm·°C)", label: "cal/(s·cm·°C)" },
//   { value: "kcal/(h·m·K)", label: "kcal/(h·m·K)" },
// ];

// export function convertThermalConductivity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "W/(m·K)": 1,
//     "W/(cm·K)": 100,
//     "BTU/(h·ft·°F)": 1.73073467,
//     "cal/(s·cm·°C)": 418.4,
//     "kcal/(h·m·K)": 1.163,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Thermal Resistance units
// export const thermalResistanceUnits: UnitOption[] = [
//   { value: "K/W", label: "K/W" },
//   { value: "°C/W", label: "°C/W" },
//   { value: "°F·h/BTU", label: "°F·h/BTU" },
// ];

// export function convertThermalResistance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "K/W": 1,
//     "°C/W": 1,
//     "°F·h/BTU": 0.527527926,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Thermal Expansion units
// export const thermalExpansionUnits: UnitOption[] = [
//   { value: "1/K", label: "1/K" },
//   { value: "1/°C", label: "1/°C" },
//   { value: "1/°F", label: "1/°F" },
// ];

// export function convertThermalExpansion(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = { "1/K": 1, "1/°C": 1, "1/°F": 1.8 };
//   return (value * factors[from]) / factors[to];
// }

// // Temperature Interval
// export const temperatureIntervalUnits: UnitOption[] = [
//   { value: "K", label: "Kelvin (K)" },
//   { value: "°C", label: "Celsius (°C)" },
//   { value: "°F", label: "Fahrenheit (°F)" },
//   { value: "°R", label: "Rankine (°R)" },
// ];

// export function convertTemperatureInterval(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     K: 1,
//     "°C": 1,
//     "°F": 5 / 9,
//     "°R": 5 / 9,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Heat Density units
// export const heatDensityUnits: UnitOption[] = [
//   { value: "J/m³", label: "J/m³" },
//   { value: "J/L", label: "J/L" },
//   { value: "BTU/ft³", label: "BTU/ft³" },
//   { value: "cal/cm³", label: "cal/cm³" },
// ];

// export function convertHeatDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "J/m³": 1,
//     "J/L": 1000,
//     "BTU/ft³": 37258.9458,
//     "cal/cm³": 4184000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Heat Flux Density units
// export const heatFluxDensityUnits: UnitOption[] = [
//   { value: "W/m²", label: "W/m²" },
//   { value: "W/cm²", label: "W/cm²" },
//   { value: "BTU/(h·ft²)", label: "BTU/(h·ft²)" },
//   { value: "cal/(s·cm²)", label: "cal/(s·cm²)" },
// ];

// export function convertHeatFluxDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "W/m²": 1,
//     "W/cm²": 10000,
//     "BTU/(h·ft²)": 3.15459074,
//     "cal/(s·cm²)": 41840,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Heat Transfer Coefficient units
// export const heatTransferCoefficientUnits: UnitOption[] = [
//   { value: "W/(m²·K)", label: "W/(m²·K)" },
//   { value: "W/(m²·°C)", label: "W/(m²·°C)" },
//   { value: "BTU/(h·ft²·°F)", label: "BTU/(h·ft²·°F)" },
//   { value: "cal/(s·cm²·°C)", label: "cal/(s·cm²·°C)" },
// ];

// export function convertHeatTransferCoefficient(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "W/(m²·K)": 1,
//     "W/(m²·°C)": 1,
//     "BTU/(h·ft²·°F)": 5.67826334,
//     "cal/(s·cm²·°C)": 41840,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Volumetric Flow Rate units
// export const flowUnits: UnitOption[] = [
//   { value: "m³/s", label: "m³/s" },
//   { value: "m³/h", label: "m³/h" },
//   { value: "L/s", label: "L/s" },
//   { value: "L/min", label: "L/min" },
//   { value: "gal/min", label: "GPM (US)" },
//   { value: "ft³/s", label: "ft³/s" },
//   { value: "ft³/min", label: "CFM" },
// ];

// export function convertFlow(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     "m³/s": 1,
//     "m³/h": 1 / 3600,
//     "L/s": 0.001,
//     "L/min": 1 / 60000,
//     "gal/min": 0.0000630902,
//     "ft³/s": 0.0283168466,
//     "ft³/min": 0.0004719474,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Mass Flow Rate units
// export const massFlowUnits: UnitOption[] = [
//   { value: "kg/s", label: "kg/s" },
//   { value: "kg/min", label: "kg/min" },
//   { value: "kg/h", label: "kg/h" },
//   { value: "g/s", label: "g/s" },
//   { value: "lb/s", label: "lb/s" },
//   { value: "lb/min", label: "lb/min" },
// ];

// export function convertMassFlow(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "kg/s": 1,
//     "kg/min": 1 / 60,
//     "kg/h": 1 / 3600,
//     "g/s": 0.001,
//     "lb/s": 0.45359237,
//     "lb/min": 0.0075598728,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Molar Flow Rate units
// export const molarFlowUnits: UnitOption[] = [
//   { value: "mol/s", label: "mol/s" },
//   { value: "mol/min", label: "mol/min" },
//   { value: "kmol/h", label: "kmol/h" },
//   { value: "lbmol/min", label: "lbmol/min" },
// ];

// export function convertMolarFlow(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "mol/s": 1,
//     "mol/min": 1 / 60,
//     "kmol/h": 1 / 3.6,
//     "lbmol/min": 7.5598728,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Mass Flux Density units
// export const massFluxDensityUnits: UnitOption[] = [
//   { value: "kg/(m²·s)", label: "kg/(m²·s)" },
//   { value: "g/(cm²·s)", label: "g/(cm²·s)" },
//   { value: "lb/(ft²·s)", label: "lb/(ft²·s)" },
// ];

// export function convertMassFluxDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "kg/(m²·s)": 1,
//     "g/(cm²·s)": 10,
//     "lb/(ft²·s)": 4.88242764,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Molar Concentration units
// export const molarConcentrationUnits: UnitOption[] = [
//   { value: "mol/L", label: "mol/L (M)" },
//   { value: "mmol/L", label: "mmol/L" },
//   { value: "mol/m³", label: "mol/m³" },
//   { value: "kmol/m³", label: "kmol/m³" },
// ];

// export function convertMolarConcentration(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "mol/L": 1,
//     "mmol/L": 0.001,
//     "mol/m³": 0.001,
//     "kmol/m³": 1,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Solution Concentration units
// export const solutionConcentrationUnits: UnitOption[] = [
//   { value: "ppm", label: "ppm" },
//   { value: "ppb", label: "ppb" },
//   { value: "mg/L", label: "mg/L" },
//   { value: "g/L", label: "g/L" },
//   { value: "%", label: "Percent (%)" },
// ];

// export function convertSolutionConcentration(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     ppm: 1,
//     ppb: 0.001,
//     "mg/L": 1,
//     "g/L": 1000,
//     "%": 10000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Dynamic Viscosity units
// export const dynamicViscosityUnits: UnitOption[] = [
//   { value: "Pa·s", label: "Pa·s" },
//   { value: "mPa·s", label: "mPa·s" },
//   { value: "cP", label: "Centipoise (cP)" },
//   { value: "P", label: "Poise (P)" },
//   { value: "lb/(ft·s)", label: "lb/(ft·s)" },
// ];

// export function convertDynamicViscosity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "Pa·s": 1,
//     "mPa·s": 0.001,
//     cP: 0.001,
//     P: 0.1,
//     "lb/(ft·s)": 1.48816394,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Kinematic Viscosity units
// export const kinematicViscosityUnits: UnitOption[] = [
//   { value: "m²/s", label: "m²/s" },
//   { value: "cm²/s", label: "cm²/s" },
//   { value: "cSt", label: "Centistokes (cSt)" },
//   { value: "St", label: "Stokes (St)" },
//   { value: "ft²/s", label: "ft²/s" },
// ];

// export function convertKinematicViscosity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "m²/s": 1,
//     "cm²/s": 0.0001,
//     cSt: 1e-6,
//     St: 0.0001,
//     "ft²/s": 0.09290304,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Surface Tension units
// export const surfaceTensionUnits: UnitOption[] = [
//   { value: "N/m", label: "N/m" },
//   { value: "mN/m", label: "mN/m" },
//   { value: "dyn/cm", label: "dyn/cm" },
//   { value: "lbf/ft", label: "lbf/ft" },
// ];

// export function convertSurfaceTension(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "N/m": 1,
//     "mN/m": 0.001,
//     "dyn/cm": 0.001,
//     "lbf/ft": 14.5939029,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Permeability units
// export const permeabilityUnits: UnitOption[] = [
//   { value: "D", label: "Darcy (D)" },
//   { value: "mD", label: "Millidarcy (mD)" },
//   { value: "m²", label: "m²" },
//   { value: "cm²", label: "cm²" },
// ];

// export function convertPermeability(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     D: 9.869233e-13,
//     mD: 9.869233e-16,
//     "m²": 1,
//     "cm²": 1e-4,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Electric Field Strength units
// export const electricFieldStrengthUnits: UnitOption[] = [
//   { value: "V/m", label: "V/m" },
//   { value: "kV/m", label: "kV/m" },
//   { value: "V/cm", label: "V/cm" },
//   { value: "N/C", label: "N/C" },
// ];

// export function convertElectricFieldStrength(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "V/m": 1,
//     "kV/m": 1000,
//     "V/cm": 100,
//     "N/C": 1,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Electric Resistivity units
// export const electricResistivityUnits: UnitOption[] = [
//   { value: "Ω·m", label: "Ω·m" },
//   { value: "Ω·cm", label: "Ω·cm" },
//   { value: "μΩ·cm", label: "μΩ·cm" },
// ];

// export function convertElectricResistivity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "Ω·m": 1,
//     "Ω·cm": 0.01,
//     "μΩ·cm": 1e-8,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Electric Conductivity units
// export const electricConductivityUnits: UnitOption[] = [
//   { value: "S/m", label: "S/m" },
//   { value: "mS/cm", label: "mS/cm" },
//   { value: "μS/cm", label: "μS/cm" },
// ];

// export function convertElectricConductivity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "S/m": 1,
//     "mS/cm": 0.1,
//     "μS/cm": 0.0001,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Linear Charge Density units
// export const linearChargeDensityUnits: UnitOption[] = [
//   { value: "C/m", label: "C/m" },
//   { value: "mC/mm", label: "mC/mm" },
//   { value: "μC/cm", label: "μC/cm" },
// ];

// export function convertLinearChargeDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "C/m": 1,
//     "mC/mm": 1,
//     "μC/cm": 0.0001,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Surface Charge Density units
// export const surfaceChargeDensityUnits: UnitOption[] = [
//   { value: "C/m²", label: "C/m²" },
//   { value: "mC/cm²", label: "mC/cm²" },
//   { value: "μC/mm²", label: "μC/mm²" },
// ];

// export function convertSurfaceChargeDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "C/m²": 1,
//     "mC/cm²": 10,
//     "μC/mm²": 0.001,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Volume Charge Density units
// export const volumeChargeDensityUnits: UnitOption[] = [
//   { value: "C/m³", label: "C/m³" },
//   { value: "mC/cm³", label: "mC/cm³" },
//   { value: "μC/mm³", label: "μC/mm³" },
// ];

// export function convertVolumeChargeDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "C/m³": 1,
//     "mC/cm³": 1000,
//     "μC/mm³": 0.001,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Linear Current Density units
// export const linearCurrentDensityUnits: UnitOption[] = [
//   { value: "A/m", label: "A/m" },
//   { value: "mA/cm", label: "mA/cm" },
//   { value: "kA/m", label: "kA/m" },
// ];

// export function convertLinearCurrentDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "A/m": 1,
//     "mA/cm": 0.1,
//     "kA/m": 1000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Surface Current Density units
// export const surfaceCurrentDensityUnits: UnitOption[] = [
//   { value: "A/m²", label: "A/m²" },
//   { value: "mA/cm²", label: "mA/cm²" },
//   { value: "kA/m²", label: "kA/m²" },
// ];

// export function convertSurfaceCurrentDensity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "A/m²": 1,
//     "mA/cm²": 10,
//     "kA/m²": 1000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Magnetomotive Force units
// export const magnetomotiveForceUnits: UnitOption[] = [
//   { value: "A·t", label: "Ampere-turn (A·t)" },
//   { value: "kA·t", label: "kA·t" },
//   { value: "Gi", label: "Gilbert (Gi)" },
// ];

// export function convertMagnetomotiveForce(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "A·t": 1,
//     "kA·t": 1000,
//     Gi: 0.795774715,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Magnetic Field Strength units
// export const magneticFieldStrengthUnits: UnitOption[] = [
//   { value: "A/m", label: "A/m" },
//   { value: "kA/m", label: "kA/m" },
//   { value: "Oe", label: "Oersted (Oe)" },
// ];

// export function convertMagneticFieldStrength(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     "A/m": 1,
//     "kA/m": 1000,
//     Oe: 79.5774715,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Radiation Dose units
// export const radiationDoseUnits: UnitOption[] = [
//   { value: "Gy", label: "Gray (Gy)" },
//   { value: "mGy", label: "mGy" },
//   { value: "rad", label: "Rad" },
//   { value: "Sv", label: "Sievert (Sv)" },
//   { value: "mSv", label: "mSv" },
//   { value: "rem", label: "Rem" },
// ];

// export function convertRadiationDose(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     Gy: 1,
//     mGy: 0.001,
//     rad: 0.01,
//     Sv: 1,
//     mSv: 0.001,
//     rem: 0.01,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Radioactivity units
// export const radioactivityUnits: UnitOption[] = [
//   { value: "Bq", label: "Becquerel (Bq)" },
//   { value: "kBq", label: "kBq" },
//   { value: "MBq", label: "MBq" },
//   { value: "GBq", label: "GBq" },
//   { value: "Ci", label: "Curie (Ci)" },
//   { value: "mCi", label: "mCi" },
//   { value: "μCi", label: "μCi" },
// ];

// export function convertRadioactivity(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     Bq: 1,
//     kBq: 1000,
//     MBq: 1e6,
//     GBq: 1e9,
//     Ci: 3.7e10,
//     mCi: 3.7e7,
//     μCi: 3.7e4,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Exposure Dose units
// export const exposureDoseUnits: UnitOption[] = [
//   { value: "R", label: "Roentgen (R)" },
//   { value: "mR", label: "mR" },
//   { value: "C/kg", label: "C/kg" },
// ];

// export function convertExposureDose(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     R: 0.000258,
//     mR: 2.58e-7,
//     "C/kg": 1,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Sound Pressure units
// export const soundPressureUnits: UnitOption[] = [
//   { value: "Pa", label: "Pascal (Pa)" },
//   { value: "μPa", label: "Micropascal (μPa)" },
//   { value: "dB", label: "Decibel (dB SPL)" },
// ];

// export function convertSoundPressure(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const p0 = 20e-6;
//   if (from === "dB") {
//     const pa = p0 * Math.pow(10, value / 20);
//     if (to === "dB") return value;
//     if (to === "μPa") return pa * 1e6;
//     return pa;
//   }
//   let pa: number;
//   if (from === "μPa") pa = value * 1e-6;
//   else pa = value;
//   if (to === "dB") return 20 * Math.log10(pa / p0);
//   if (to === "μPa") return pa * 1e6;
//   return pa;
// }

// // Wind Speed units
// export const windSpeedUnits: UnitOption[] = [
//   { value: "m/s", label: "m/s" },
//   { value: "km/h", label: "km/h" },
//   { value: "mph", label: "mph" },
//   { value: "kn", label: "Knot (kn)" },
//   { value: "Bft", label: "Beaufort" },
// ];

// export function convertWindSpeed(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   if (from === "Bft" || to === "Bft") {
//     const beaufortToMs: Record<number, number> = {
//       0: 0.3,
//       1: 1.3,
//       2: 2.3,
//       3: 4.1,
//       4: 6.2,
//       5: 9.0,
//       6: 12.0,
//       7: 15.5,
//       8: 19.3,
//       9: 23.3,
//       10: 27.5,
//       11: 31.7,
//       12: 35.0,
//     };
//     if (from === "Bft") {
//       const ms = beaufortToMs[Math.round(value)] || 0;
//       return convertSpeed(ms, "m/s", to);
//     }
//     if (to === "Bft") {
//       const ms = convertSpeed(value, from, "m/s");
//       const thresholds = [
//         0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7,
//       ];
//       for (let i = thresholds.length - 1; i >= 0; i--) {
//         if (ms >= thresholds[i]) return i + 1;
//       }
//       return 0;
//     }
//   }
//   return convertSpeed(value, from, to);
// }

// // Rainfall units
// export const rainfallUnits: UnitOption[] = [
//   { value: "mm", label: "Millimeter (mm)" },
//   { value: "cm", label: "Centimeter (cm)" },
//   { value: "in", label: "Inch (in)" },
//   { value: "L/m²", label: "L/m²" },
// ];

// export function convertRainfall(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     mm: 1,
//     cm: 10,
//     in: 25.4,
//     "L/m²": 1,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Humidity units
// export const humidityUnits: UnitOption[] = [
//   { value: "RH%", label: "Relative Humidity (%)" },
//   { value: "AH g/m³", label: "Absolute Humidity (g/m³)" },
//   { value: "SH g/kg", label: "Specific Humidity (g/kg)" },
// ];

// export function convertHumidity(
//   value: number,
//   from: string,
//   to: string,
//   temperatureC: number = 20,
// ): number {
//   const saturationVaporDensity = 17.3;
//   if (from === "RH%") {
//     const rh = value / 100;
//     if (to === "AH g/m³") return rh * saturationVaporDensity;
//     if (to === "SH g/kg") return (rh * saturationVaporDensity) / 1.2;
//     return value;
//   }
//   if (from === "AH g/m³") {
//     if (to === "RH%") return (value / saturationVaporDensity) * 100;
//     if (to === "SH g/kg") return value / 1.2;
//     return value;
//   }
//   if (from === "SH g/kg") {
//     if (to === "RH%") return ((value * 1.2) / saturationVaporDensity) * 100;
//     if (to === "AH g/m³") return value * 1.2;
//     return value;
//   }
//   return value;
// }

// // Dew Point calculation
// export function calculateDewPoint(
//   temperatureC: number,
//   relativeHumidity: number,
// ): number {
//   const a = 17.27;
//   const b = 237.7;
//   const alpha =
//     (a * temperatureC) / (b + temperatureC) + Math.log(relativeHumidity / 100);
//   return (b * alpha) / (a - alpha);
// }

// // Fabric GSM units
// export const fabricGsmUnits: UnitOption[] = [
//   { value: "gsm", label: "GSM (g/m²)" },
//   { value: "oz/yd²", label: "oz/yd²" },
//   { value: "g/cm²", label: "g/cm²" },
// ];

// export function convertFabricGsm(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     gsm: 1,
//     "oz/yd²": 33.9057474,
//     "g/cm²": 10000,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Thread Count
// export const threadCountUnits: UnitOption[] = [
//   { value: "TC", label: "Thread Count (per in²)" },
//   { value: "TC/cm²", label: "Thread Count (per cm²)" },
// ];

// export function convertThreadCount(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = { TC: 1, "TC/cm²": 6.4516 };
//   return (value * factors[from]) / factors[to];
// }

// // Height units
// export const heightUnits: UnitOption[] = [
//   { value: "cm", label: "Centimeter (cm)" },
//   { value: "m", label: "Meter (m)" },
//   { value: "ft", label: "Foot (ft)" },
//   { value: "in", label: "Inch (in)" },
// ];

// export function convertHeight(value: number, from: string, to: string): number {
//   const factors: Record<string, number> = {
//     cm: 1,
//     m: 100,
//     ft: 30.48,
//     in: 2.54,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // BMI calculation
// export function calculateBMI(
//   weight: number,
//   height: number,
//   weightUnit: string,
//   heightUnit: string,
// ): number {
//   let weightKg = weight;
//   let heightM = height;
//   if (weightUnit === "lb") weightKg = weight * 0.45359237;
//   if (heightUnit === "cm") heightM = height / 100;
//   if (heightUnit === "ft") heightM = height * 0.3048;
//   if (heightUnit === "in") heightM = height * 0.0254;
//   return weightKg / (heightM * heightM);
// }

// // Running Pace conversion
// export function convertRunningPace(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   let minPerKm: number;
//   switch (from) {
//     case "min/km":
//       minPerKm = value;
//       break;
//     case "min/mi":
//       minPerKm = value * 0.621371;
//       break;
//     case "km/h":
//       minPerKm = 60 / value;
//       break;
//     case "mph":
//       minPerKm = 60 / (value * 1.609344);
//       break;
//     default:
//       minPerKm = value;
//   }
//   switch (to) {
//     case "min/km":
//       return minPerKm;
//     case "min/mi":
//       return minPerKm / 0.621371;
//     case "km/h":
//       return 60 / minPerKm;
//     case "mph":
//       return 60 / minPerKm / 1.609344;
//     default:
//       return minPerKm;
//   }
// }

// // Calorie Burn Rate (MET-based)
// export function calculateCalorieBurn(
//   weight: number,
//   met: number,
//   durationMin: number,
// ): number {
//   return met * weight * (durationMin / 60);
// }

// export const metValues: Record<string, number> = {
//   Sitting: 1,
//   "Walking (3 mph)": 3.5,
//   "Running (6 mph)": 9.8,
//   "Cycling (12-14 mph)": 8,
//   "Swimming (moderate)": 6,
//   Yoga: 2.5,
//   "Weight lifting": 3,
//   Dancing: 5,
// };

// // Color conversion
// export function hexToRgb(
//   hex: string,
// ): { r: number; g: number; b: number } | null {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16),
//       }
//     : null;
// }

// export function rgbToHex(r: number, g: number, b: number): string {
//   return (
//     "#" +
//     [r, g, b]
//       .map((x) => {
//         const hex = x.toString(16);
//         return hex.length === 1 ? "0" + hex : hex;
//       })
//       .join("")
//   );
// }

// export function rgbToHsl(
//   r: number,
//   g: number,
//   b: number,
// ): { h: number; s: number; l: number } {
//   r /= 255;
//   g /= 255;
//   b /= 255;
//   const max = Math.max(r, g, b),
//     min = Math.min(r, g, b);
//   let h = 0,
//     s,
//     l = (max + min) / 2;
//   if (max !== min) {
//     const d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//     switch (max) {
//       case r:
//         h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
//         break;
//       case g:
//         h = ((b - r) / d + 2) / 6;
//         break;
//       case b:
//         h = ((r - g) / d + 4) / 6;
//         break;
//     }
//   }
//   return { h: h * 360, s: (s || 0) * 100, l: (l || 0) * 100 };
// }

// export function hslToRgb(
//   h: number,
//   s: number,
//   l: number,
// ): { r: number; g: number; b: number } {
//   h /= 360;
//   s /= 100;
//   l /= 100;
//   let r, g, b;
//   if (s === 0) {
//     r = g = b = l;
//   } else {
//     const hue2rgb = (p: number, q: number, t: number) => {
//       if (t < 0) t += 1;
//       if (t > 1) t -= 1;
//       if (t < 1 / 6) return p + (q - p) * 6 * t;
//       if (t < 1 / 2) return q;
//       if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//       return p;
//     };
//     const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//     const p = 2 * l - q;
//     r = hue2rgb(p, q, h + 1 / 3);
//     g = hue2rgb(p, q, h);
//     b = hue2rgb(p, q, h - 1 / 3);
//   }
//   return {
//     r: Math.round(r * 255),
//     g: Math.round(g * 255),
//     b: Math.round(b * 255),
//   };
// }

// // Unix Timestamp conversion
// export function unixTimestampToDate(timestamp: number | string): Date {
//   const ts = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
//   return new Date(ts * 1000);
// }

// export function dateToUnixTimestamp(date: Date): number {
//   return Math.floor(date.getTime() / 1000);
// }

// // Time Duration calculation
// export function calculateTimeDuration(
//   start: Date,
//   end: Date,
// ): { days: number; hours: number; minutes: number; seconds: number } {
//   const diff = Math.abs(end.getTime() - start.getTime());
//   return {
//     days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//     hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//     minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
//     seconds: Math.floor((diff % (1000 * 60)) / 1000),
//   };
// }

// // Age calculation
// export function calculateAge(
//   birthDate: Date,
//   targetDate: Date = new Date(),
// ): { years: number; months: number; days: number } {
//   let years = targetDate.getFullYear() - birthDate.getFullYear();
//   let months = targetDate.getMonth() - birthDate.getMonth();
//   let days = targetDate.getDate() - birthDate.getDate();
//   if (days < 0) {
//     months--;
//     const prevMonth = new Date(
//       targetDate.getFullYear(),
//       targetDate.getMonth(),
//       0,
//     );
//     days += prevMonth.getDate();
//   }
//   if (months < 0) {
//     years--;
//     months += 12;
//   }
//   return { years, months, days };
// }

// // Image DPI calculation
// export function calculatePrintSize(pixels: number, dpi: number): number {
//   return pixels / dpi;
// }

// export function calculatePixels(size: number, dpi: number): number {
//   return size * dpi;
// }

// // Video frame calculation
// export function calculateTotalFrames(
//   durationSeconds: number,
//   fps: number,
// ): number {
//   return Math.round(durationSeconds * fps);
// }

// // Audio bitrate calculation
// export function calculateAudioFileSize(
//   bitrate: number,
//   durationSeconds: number,
// ): number {
//   return (bitrate * durationSeconds) / 8;
// }

// // Astronomical conversions
// export const astronomicalDistanceUnits: UnitOption[] = [
//   { value: "ly", label: "Light-year (ly)" },
//   { value: "pc", label: "Parsec (pc)" },
//   { value: "AU", label: "Astronomical Unit (AU)" },
//   { value: "km", label: "Kilometer (km)" },
//   { value: "mi", label: "Mile (mi)" },
// ];

// export function convertAstronomicalDistance(
//   value: number,
//   from: string,
//   to: string,
// ): number {
//   const factors: Record<string, number> = {
//     ly: 9.4607e12,
//     pc: 3.0857e13,
//     AU: 1.496e8,
//     km: 1,
//     mi: 1.609344,
//   };
//   return (value * factors[from]) / factors[to];
// }

// // Apparent Magnitude conversion
// export function magnitudeToLuminosity(
//   apparentMag: number,
//   distancePc: number,
// ): number {
//   const absoluteMag = apparentMag - 5 * Math.log10(distancePc) + 5;
//   return Math.pow(10, (4.83 - absoluteMag) / 2.5);
// }

// // Planet weight calculation
// export const planetGravities: Record<string, number> = {
//   Earth: 9.807,
//   Moon: 1.62,
//   Mars: 3.721,
//   Venus: 8.87,
//   Jupiter: 24.79,
//   Saturn: 10.44,
//   Uranus: 8.69,
//   Neptune: 11.15,
//   Mercury: 3.7,
//   Pluto: 0.62,
// };

// export function calculatePlanetWeight(
//   weight: number,
//   fromPlanet: string,
//   toPlanet: string,
// ): number {
//   const mass = weight / planetGravities[fromPlanet];
//   return mass * planetGravities[toPlanet];
// }

// // Concrete Volume calculation
// export function calculateConcreteVolume(
//   length: number,
//   width: number,
//   depth: number,
//   unit: string,
// ): number {
//   return length * width * depth;
// }

// // Brick calculation
// export function calculateBricksNeeded(
//   wallArea: number,
//   brickLength: number,
//   brickHeight: number,
//   mortarThickness: number = 10,
// ): number {
//   const brickArea =
//     (brickLength + mortarThickness) * (brickHeight + mortarThickness);
//   return Math.ceil((wallArea * 1e6) / brickArea);
// }

// // Tile calculation
// export function calculateTilesNeeded(
//   roomArea: number,
//   tileLength: number,
//   tileWidth: number,
//   wasteFactor: number = 10,
// ): number {
//   const tileArea = tileLength * tileWidth;
//   const tilesNeeded = (roomArea * 1e4) / tileArea;
//   return Math.ceil(tilesNeeded * (1 + wasteFactor / 100));
// }

// // Board Feet calculation
// export function calculateBoardFeet(
//   thickness: number,
//   width: number,
//   length: number,
// ): number {
//   return (thickness * width * length) / 144;
// }

// // Cups to Grams conversion
// export const ingredientDensities: Record<string, number> = {
//   "Flour (all-purpose)": 125,
//   "Sugar (white)": 200,
//   "Sugar (brown)": 220,
//   Butter: 227,
//   "Rice (uncooked)": 185,
//   Oats: 90,
//   "Cocoa Powder": 85,
//   Honey: 340,
//   Milk: 245,
//   Water: 240,
// };

// export function cupsToGrams(cups: number, ingredient: string): number {
//   const density = ingredientDensities[ingredient] || 200;
//   return cups * density;
// }

// // Sourdough Hydration calculation
// export function calculateHydration(flour: number, water: number): number {
//   return (water / flour) * 100;
// }

// // Frequency to Musical Note
// const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// export function frequencyToNote(frequency: number): {
//   note: string;
//   octave: number;
//   cents: number;
// } {
//   const A4 = 440;
//   const semitones = 12 * Math.log2(frequency / A4);
//   const noteIndex = Math.round(semitones) % 12;
//   const octave = Math.floor(semitones / 12) + 4;
//   const cents = Math.round((semitones - Math.round(semitones)) * 100);
//   return { note: notes[(noteIndex + 12) % 12], octave, cents };
// }

// // Horsepower to Animals
// export const animalPower: Record<string, number> = {
//   Horse: 1,
//   Hamster: 0.00015,
//   "Human (avg)": 0.15,
//   Elephant: 8,
//   Dog: 0.1,
//   Cat: 0.03,
//   Chicken: 0.002,
// };

// export function horsepowerToAnimals(hp: number, animal: string): number {
//   return hp / animalPower[animal];
// }

// Conversion utilities for all unit types — expanded to match unitconverters.net breadth

export interface UnitOption {
  value: string;
  label: string;
  factor?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// LENGTH (base: meter)
// ─────────────────────────────────────────────────────────────────────────────
export const lengthUnits: UnitOption[] = [
  { value: "m", label: "Meter (m)" },
  { value: "km", label: "Kilometer (km)" },
  { value: "dm", label: "Decimeter (dm)" },
  { value: "cm", label: "Centimeter (cm)" },
  { value: "mm", label: "Millimeter (mm)" },
  { value: "μm", label: "Micrometer (μm)" },
  { value: "nm", label: "Nanometer (nm)" },
  { value: "pm", label: "Picometer (pm)" },
  { value: "fm", label: "Femtometer (fm)" },
  { value: "Å", label: "Angstrom (Å)" },
  { value: "mi", label: "Mile (mi)" },
  { value: "yd", label: "Yard (yd)" },
  { value: "ft", label: "Foot (ft)" },
  { value: "in", label: "Inch (in)" },
  { value: "nmi", label: "Nautical Mile (nmi)" },
  { value: "fur", label: "Furlong (fur)" },
  { value: "ch", label: "Chain (ch)" },
  { value: "rod", label: "Rod (rod)" },
  { value: "fathom", label: "Fathom" },
  { value: "league", label: "League (land)" },
  { value: "thou", label: "Thou (mil)" },
  { value: "ly", label: "Light-year (ly)" },
  { value: "AU", label: "Astronomical Unit (AU)" },
  { value: "pc", label: "Parsec (pc)" },
  { value: "pica", label: "Pica (typography)" },
  { value: "point", label: "Point (typography)" },
  { value: "ell", label: "Ell (UK)" },
  { value: "cubit", label: "Cubit" },
  { value: "hand", label: "Hand" },
  { value: "span", label: "Span" },
];

export function convertLength(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    m: 1,
    km: 1e3,
    dm: 0.1,
    cm: 0.01,
    mm: 1e-3,
    μm: 1e-6,
    nm: 1e-9,
    pm: 1e-12,
    fm: 1e-15,
    Å: 1e-10,
    mi: 1609.344,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
    nmi: 1852,
    fur: 201.168,
    ch: 20.1168,
    rod: 5.0292,
    fathom: 1.8288,
    league: 4828.032,
    thou: 0.0000254,
    ly: 9.4607304725808e15,
    AU: 1.495978707e11,
    pc: 3.085677581e16,
    pica: 0.00423333,
    point: 0.000352778,
    ell: 1.143,
    cubit: 0.4572,
    hand: 0.1016,
    span: 0.2286,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// WEIGHT / MASS (base: kilogram)
// ─────────────────────────────────────────────────────────────────────────────
export const weightUnits: UnitOption[] = [
  { value: "kg", label: "Kilogram (kg)" },
  { value: "g", label: "Gram (g)" },
  { value: "mg", label: "Milligram (mg)" },
  { value: "μg", label: "Microgram (μg)" },
  { value: "ng", label: "Nanogram (ng)" },
  { value: "t", label: "Metric Ton (t)" },
  { value: "lb", label: "Pound (lb)" },
  { value: "oz", label: "Ounce (oz)" },
  { value: "st", label: "Stone (st)" },
  { value: "ton", label: "US Short Ton" },
  { value: "long ton", label: "Long Ton (UK)" },
  { value: "ct", label: "Carat (ct)" },
  { value: "gr", label: "Grain (gr)" },
  { value: "dwt", label: "Pennyweight (dwt)" },
  { value: "ozt", label: "Troy Ounce (ozt)" },
  { value: "lbt", label: "Troy Pound (lbt)" },
  { value: "slug", label: "Slug" },
  { value: "cwt_us", label: "Hundredweight (US)" },
  { value: "cwt_uk", label: "Hundredweight (UK)" },
  { value: "dalton", label: "Dalton (Da)" },
];

export function convertWeight(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    kg: 1,
    g: 1e-3,
    mg: 1e-6,
    μg: 1e-9,
    ng: 1e-12,
    t: 1000,
    lb: 0.45359237,
    oz: 0.028349523125,
    st: 6.35029318,
    ton: 907.18474,
    "long ton": 1016.0469088,
    ct: 0.0002,
    gr: 0.00006479891,
    dwt: 0.0015551738,
    ozt: 0.0311034768,
    lbt: 0.3732417216,
    slug: 14.593903,
    cwt_us: 45.359237,
    cwt_uk: 50.80234544,
    dalton: 1.6605390666e-27,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// VOLUME (base: liter)
// ─────────────────────────────────────────────────────────────────────────────
export const volumeUnits: UnitOption[] = [
  { value: "L", label: "Liter (L)" },
  { value: "mL", label: "Milliliter (mL)" },
  { value: "μL", label: "Microliter (μL)" },
  { value: "m³", label: "Cubic Meter (m³)" },
  { value: "cm³", label: "Cubic Centimeter (cm³)" },
  { value: "mm³", label: "Cubic Millimeter (mm³)" },
  { value: "dm³", label: "Cubic Decimeter (dm³)" },
  { value: "km³", label: "Cubic Kilometer (km³)" },
  { value: "gal", label: "Gallon (US)" },
  { value: "gal_uk", label: "Gallon (UK)" },
  { value: "qt", label: "Quart (US)" },
  { value: "qt_uk", label: "Quart (UK)" },
  { value: "pt", label: "Pint (US)" },
  { value: "pt_uk", label: "Pint (UK)" },
  { value: "cup", label: "Cup (US)" },
  { value: "cup_uk", label: "Cup (UK)" },
  { value: "fl oz", label: "Fluid Ounce (US)" },
  { value: "fl oz_uk", label: "Fluid Ounce (UK)" },
  { value: "tbsp", label: "Tablespoon (US)" },
  { value: "tsp", label: "Teaspoon (US)" },
  { value: "ft³", label: "Cubic Foot" },
  { value: "in³", label: "Cubic Inch" },
  { value: "yd³", label: "Cubic Yard" },
  { value: "mi³", label: "Cubic Mile" },
  { value: "bbl", label: "Oil Barrel (bbl)" },
  { value: "bbl_beer", label: "Beer Barrel (US)" },
  { value: "bu", label: "Bushel (US)" },
  { value: "bu_uk", label: "Bushel (UK)" },
  { value: "pk", label: "Peck (US)" },
  { value: "gill", label: "Gill (US)" },
  { value: "gill_uk", label: "Gill (UK)" },
  { value: "dram", label: "Fluid Dram (US)" },
  { value: "minim", label: "Minim (US)" },
];

export function convertVolume(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    L: 1,
    mL: 0.001,
    μL: 1e-6,
    "m³": 1000,
    "cm³": 0.001,
    "mm³": 1e-6,
    "dm³": 1,
    "km³": 1e12,
    gal: 3.785411784,
    gal_uk: 4.54609,
    qt: 0.946352946,
    qt_uk: 1.1365225,
    pt: 0.473176473,
    pt_uk: 0.56826125,
    cup: 0.2365882365,
    cup_uk: 0.284130625,
    "fl oz": 0.0295735296,
    "fl oz_uk": 0.0284130625,
    tbsp: 0.0147867648,
    tsp: 0.00492892159,
    "ft³": 28.316846592,
    "in³": 0.016387064,
    "yd³": 764.554858,
    "mi³": 4168181825440.58,
    bbl: 158.987295,
    bbl_beer: 117.347765,
    bu: 35.2390704,
    bu_uk: 36.36872,
    pk: 8.80976742,
    gill: 0.11829411825,
    gill_uk: 0.1420653125,
    dram: 0.0036966912,
    minim: 0.0000616115,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPERATURE
// ─────────────────────────────────────────────────────────────────────────────
export const temperatureUnits: UnitOption[] = [
  { value: "C", label: "Celsius (°C)" },
  { value: "F", label: "Fahrenheit (°F)" },
  { value: "K", label: "Kelvin (K)" },
  { value: "R", label: "Rankine (°R)" },
  { value: "Re", label: "Réaumur (°Re)" },
  { value: "N", label: "Newton (°N)" },
  { value: "De", label: "Delisle (°De)" },
  { value: "Ro", label: "Rømer (°Rø)" },
];

export function convertTemperature(
  value: number,
  from: string,
  to: string,
): number {
  // Convert to Celsius first
  let c: number;
  switch (from) {
    case "C":
      c = value;
      break;
    case "F":
      c = ((value - 32) * 5) / 9;
      break;
    case "K":
      c = value - 273.15;
      break;
    case "R":
      c = ((value - 491.67) * 5) / 9;
      break;
    case "Re":
      c = (value * 5) / 4;
      break;
    case "N":
      c = (value * 100) / 33;
      break;
    case "De":
      c = 100 - (value * 2) / 3;
      break;
    case "Ro":
      c = ((value - 7.5) * 40) / 21;
      break;
    default:
      c = value;
  }
  // Convert from Celsius to target
  switch (to) {
    case "C":
      return c;
    case "F":
      return (c * 9) / 5 + 32;
    case "K":
      return c + 273.15;
    case "R":
      return ((c + 273.15) * 9) / 5;
    case "Re":
      return (c * 4) / 5;
    case "N":
      return (c * 33) / 100;
    case "De":
      return ((100 - c) * 3) / 2;
    case "Ro":
      return (c * 21) / 40 + 7.5;
    default:
      return c;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AREA (base: square meter)
// ─────────────────────────────────────────────────────────────────────────────
export const areaUnits: UnitOption[] = [
  { value: "m²", label: "Square Meter (m²)" },
  { value: "km²", label: "Square Kilometer (km²)" },
  { value: "dm²", label: "Square Decimeter (dm²)" },
  { value: "cm²", label: "Square Centimeter (cm²)" },
  { value: "mm²", label: "Square Millimeter (mm²)" },
  { value: "μm²", label: "Square Micrometer (μm²)" },
  { value: "ha", label: "Hectare (ha)" },
  { value: "are", label: "Are (a)" },
  { value: "ac", label: "Acre (ac)" },
  { value: "mi²", label: "Square Mile" },
  { value: "yd²", label: "Square Yard" },
  { value: "ft²", label: "Square Foot" },
  { value: "in²", label: "Square Inch" },
  { value: "rod²", label: "Square Rod" },
  { value: "ch²", label: "Square Chain" },
  { value: "section", label: "Section (US survey)" },
  { value: "township", label: "Township (US survey)" },
  { value: "barn", label: "Barn (nuclear physics)" },
];

export function convertArea(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    "m²": 1,
    "km²": 1e6,
    "dm²": 0.01,
    "cm²": 1e-4,
    "mm²": 1e-6,
    "μm²": 1e-12,
    ha: 10000,
    are: 100,
    ac: 4046.8564224,
    "mi²": 2589988.110336,
    "yd²": 0.83612736,
    "ft²": 0.09290304,
    "in²": 0.00064516,
    "rod²": 25.29285264,
    "ch²": 404.68564224,
    section: 2589988.110336,
    township: 93239571.97,
    barn: 1e-28,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// PRESSURE (base: pascal)
// ─────────────────────────────────────────────────────────────────────────────
export const pressureUnits: UnitOption[] = [
  { value: "Pa", label: "Pascal (Pa)" },
  { value: "hPa", label: "Hectopascal (hPa)" },
  { value: "kPa", label: "Kilopascal (kPa)" },
  { value: "MPa", label: "Megapascal (MPa)" },
  { value: "GPa", label: "Gigapascal (GPa)" },
  { value: "bar", label: "Bar" },
  { value: "mbar", label: "Millibar (mbar)" },
  { value: "psi", label: "PSI (lbf/in²)" },
  { value: "ksi", label: "KSI (kips/in²)" },
  { value: "atm", label: "Atmosphere (atm)" },
  { value: "at", label: "Technical Atmosphere (at)" },
  { value: "Torr", label: "Torr" },
  { value: "mmHg", label: "mmHg" },
  { value: "cmHg", label: "cmHg" },
  { value: "inHg", label: "inHg" },
  { value: "mmH2O", label: "mm Water (mmH₂O)" },
  { value: "cmH2O", label: "cm Water (cmH₂O)" },
  { value: "inH2O", label: "inch Water (inH₂O)" },
  { value: "ftH2O", label: "foot Water (ftH₂O)" },
  { value: "dyn/cm²", label: "Dyne/cm²" },
  { value: "lbf/ft²", label: "lbf/ft² (psf)" },
  { value: "N/m²", label: "N/m²" },
  { value: "kN/m²", label: "kN/m²" },
];

export function convertPressure(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Pa: 1,
    hPa: 100,
    kPa: 1000,
    MPa: 1e6,
    GPa: 1e9,
    bar: 1e5,
    mbar: 100,
    psi: 6894.757293168,
    ksi: 6894757.293168,
    atm: 101325,
    at: 98066.5,
    Torr: 133.32236842,
    mmHg: 133.322387415,
    cmHg: 1333.22387415,
    inHg: 3386.389,
    mmH2O: 9.80638,
    cmH2O: 98.0638,
    inH2O: 249.0889,
    ftH2O: 2988.98,
    "dyn/cm²": 0.1,
    "lbf/ft²": 47.880258888,
    "N/m²": 1,
    "kN/m²": 1000,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ENERGY (base: joule)
// ─────────────────────────────────────────────────────────────────────────────
export const energyUnits: UnitOption[] = [
  { value: "J", label: "Joule (J)" },
  { value: "kJ", label: "Kilojoule (kJ)" },
  { value: "MJ", label: "Megajoule (MJ)" },
  { value: "GJ", label: "Gigajoule (GJ)" },
  { value: "mJ", label: "Millijoule (mJ)" },
  { value: "μJ", label: "Microjoule (μJ)" },
  { value: "nJ", label: "Nanojoule (nJ)" },
  { value: "cal", label: "Calorie (thermochemical)" },
  { value: "cal_IT", label: "Calorie (IT)" },
  { value: "kcal", label: "Kilocalorie (kcal)" },
  { value: "kcal_IT", label: "Kilocalorie (IT)" },
  { value: "Wh", label: "Watt-hour (Wh)" },
  { value: "kWh", label: "Kilowatt-hour (kWh)" },
  { value: "MWh", label: "Megawatt-hour (MWh)" },
  { value: "BTU", label: "BTU (IT)" },
  { value: "BTU_th", label: "BTU (thermochemical)" },
  { value: "therm", label: "Therm (US)" },
  { value: "eV", label: "Electronvolt (eV)" },
  { value: "keV", label: "Kiloelectronvolt (keV)" },
  { value: "MeV", label: "Megaelectronvolt (MeV)" },
  { value: "GeV", label: "Gigaelectronvolt (GeV)" },
  { value: "erg", label: "Erg" },
  { value: "ft·lbf", label: "Foot-pound force" },
  { value: "in·lbf", label: "Inch-pound force" },
  { value: "hp·h", label: "Horsepower-hour" },
  { value: "Nm", label: "Newton-meter (N·m)" },
  { value: "ton_TNT", label: "Ton of TNT" },
  { value: "toe", label: "Ton of Oil Equivalent" },
];

export function convertEnergy(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    J: 1,
    kJ: 1e3,
    MJ: 1e6,
    GJ: 1e9,
    mJ: 1e-3,
    μJ: 1e-6,
    nJ: 1e-9,
    cal: 4.184,
    cal_IT: 4.1868,
    kcal: 4184,
    kcal_IT: 4186.8,
    Wh: 3600,
    kWh: 3.6e6,
    MWh: 3.6e9,
    BTU: 1055.05585262,
    BTU_th: 1054.35026,
    therm: 105480400,
    eV: 1.602176634e-19,
    keV: 1.602176634e-16,
    MeV: 1.602176634e-13,
    GeV: 1.602176634e-10,
    erg: 1e-7,
    "ft·lbf": 1.35581794833,
    "in·lbf": 0.112984829,
    "hp·h": 2684519.537696,
    Nm: 1,
    ton_TNT: 4.184e9,
    toe: 4.1868e10,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// POWER (base: watt)
// ─────────────────────────────────────────────────────────────────────────────
export const powerUnits: UnitOption[] = [
  { value: "W", label: "Watt (W)" },
  { value: "mW", label: "Milliwatt (mW)" },
  { value: "kW", label: "Kilowatt (kW)" },
  { value: "MW", label: "Megawatt (MW)" },
  { value: "GW", label: "Gigawatt (GW)" },
  { value: "TW", label: "Terawatt (TW)" },
  { value: "hp", label: "Horsepower (mechanical)" },
  { value: "hp_e", label: "Horsepower (electrical)" },
  { value: "hp_m", label: "Horsepower (metric)" },
  { value: "hp_b", label: "Horsepower (boiler)" },
  { value: "BTU/h", label: "BTU/hour" },
  { value: "BTU/min", label: "BTU/minute" },
  { value: "BTU/s", label: "BTU/second" },
  { value: "kcal/h", label: "kcal/hour" },
  { value: "kcal/s", label: "kcal/second" },
  { value: "ft·lbf/s", label: "ft·lbf/second" },
  { value: "ft·lbf/min", label: "ft·lbf/minute" },
  { value: "erg/s", label: "Erg/second" },
  { value: "kVA", label: "Kilovolt-ampere (kVA)" },
  { value: "ton_refrig", label: "Ton of Refrigeration" },
];

export function convertPower(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    W: 1,
    mW: 1e-3,
    kW: 1e3,
    MW: 1e6,
    GW: 1e9,
    TW: 1e12,
    hp: 745.69987158,
    hp_e: 746,
    hp_m: 735.49875,
    hp_b: 9812.5,
    "BTU/h": 0.29307107,
    "BTU/min": 17.5842643,
    "BTU/s": 1055.05585,
    "kcal/h": 1.16222222,
    "kcal/s": 4184,
    "ft·lbf/s": 1.35581794,
    "ft·lbf/min": 0.02259696,
    "erg/s": 1e-7,
    kVA: 1000,
    ton_refrig: 3516.8528421,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// FORCE (base: newton)
// ─────────────────────────────────────────────────────────────────────────────
export const forceUnits: UnitOption[] = [
  { value: "N", label: "Newton (N)" },
  { value: "kN", label: "Kilonewton (kN)" },
  { value: "MN", label: "Meganewton (MN)" },
  { value: "mN", label: "Millinewton (mN)" },
  { value: "μN", label: "Micronewton (μN)" },
  { value: "lbf", label: "Pound-force (lbf)" },
  { value: "kip", label: "Kip (1000 lbf)" },
  { value: "kgf", label: "Kilogram-force (kgf)" },
  { value: "gf", label: "Gram-force (gf)" },
  { value: "tf", label: "Ton-force (metric)" },
  { value: "tf_us", label: "Ton-force (US short)" },
  { value: "tf_uk", label: "Ton-force (UK long)" },
  { value: "dyn", label: "Dyne" },
  { value: "pdl", label: "Poundal (pdl)" },
  { value: "ozf", label: "Ounce-force (ozf)" },
];

export function convertForce(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    N: 1,
    kN: 1e3,
    MN: 1e6,
    mN: 1e-3,
    μN: 1e-6,
    lbf: 4.44822161526,
    kip: 4448.22161526,
    kgf: 9.80665,
    gf: 0.00980665,
    tf: 9806.65,
    tf_us: 8896.44323,
    tf_uk: 9964.01641,
    dyn: 1e-5,
    pdl: 0.138254954,
    ozf: 0.278013851,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// TIME (base: second)
// ─────────────────────────────────────────────────────────────────────────────
export const timeUnits: UnitOption[] = [
  { value: "s", label: "Second (s)" },
  { value: "ms", label: "Millisecond (ms)" },
  { value: "μs", label: "Microsecond (μs)" },
  { value: "ns", label: "Nanosecond (ns)" },
  { value: "ps", label: "Picosecond (ps)" },
  { value: "fs", label: "Femtosecond (fs)" },
  { value: "min", label: "Minute" },
  { value: "h", label: "Hour" },
  { value: "d", label: "Day" },
  { value: "wk", label: "Week" },
  { value: "fortnight", label: "Fortnight" },
  { value: "mo", label: "Month (avg 30.44d)" },
  { value: "q", label: "Quarter (avg)" },
  { value: "y", label: "Year (Julian)" },
  { value: "y_tropical", label: "Year (tropical)" },
  { value: "y_greg", label: "Year (Gregorian avg)" },
  { value: "decade", label: "Decade" },
  { value: "century", label: "Century" },
  { value: "millennium", label: "Millennium" },
  { value: "shake", label: "Shake (10 ns)" },
  { value: "jiffy", label: "Jiffy (1/60 s)" },
];

export function convertTime(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    s: 1,
    ms: 1e-3,
    μs: 1e-6,
    ns: 1e-9,
    ps: 1e-12,
    fs: 1e-15,
    min: 60,
    h: 3600,
    d: 86400,
    wk: 604800,
    fortnight: 1209600,
    mo: 2629743.83,
    q: 7889231.49,
    y: 31557600,
    y_tropical: 31556925.445,
    y_greg: 31556952,
    decade: 315576000,
    century: 3155760000,
    millennium: 31557600000,
    shake: 1e-8,
    jiffy: 1 / 60,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// SPEED (base: m/s)
// ─────────────────────────────────────────────────────────────────────────────
export const speedUnits: UnitOption[] = [
  { value: "m/s", label: "Meter/second (m/s)" },
  { value: "km/h", label: "Kilometer/hour (km/h)" },
  { value: "km/s", label: "Kilometer/second (km/s)" },
  { value: "mph", label: "Mile/hour (mph)" },
  { value: "mi/s", label: "Mile/second (mi/s)" },
  { value: "kn", label: "Knot (kn)" },
  { value: "ft/s", label: "Foot/second (ft/s)" },
  { value: "ft/min", label: "Foot/minute (ft/min)" },
  { value: "ft/h", label: "Foot/hour (ft/h)" },
  { value: "in/s", label: "Inch/second (in/s)" },
  { value: "cm/s", label: "Centimeter/second (cm/s)" },
  { value: "mm/s", label: "Millimeter/second (mm/s)" },
  { value: "c", label: "Speed of Light (c)" },
  { value: "Ma", label: "Mach (sea level, 15°C)" },
  { value: "m/min", label: "Meter/minute" },
  { value: "m/h", label: "Meter/hour" },
];

export function convertSpeed(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    "m/s": 1,
    "km/h": 1 / 3.6,
    "km/s": 1000,
    mph: 0.44704,
    "mi/s": 1609.344,
    kn: 0.5144444444,
    "ft/s": 0.3048,
    "ft/min": 0.00508,
    "ft/h": 0.0000846667,
    "in/s": 0.0254,
    "cm/s": 0.01,
    "mm/s": 0.001,
    c: 299792458,
    Ma: 340.29,
    "m/min": 1 / 60,
    "m/h": 1 / 3600,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ANGLE (base: degree)
// ─────────────────────────────────────────────────────────────────────────────
export const angleUnits: UnitOption[] = [
  { value: "deg", label: "Degree (°)" },
  { value: "rad", label: "Radian (rad)" },
  { value: "grad", label: "Gradian / Gon (gon)" },
  { value: "mrad", label: "Milliradian (mrad)" },
  { value: "arcmin", label: "Arcminute (′)" },
  { value: "arcsec", label: "Arcsecond (″)" },
  { value: "turn", label: "Turn (revolution)" },
  { value: "quad", label: "Quadrant" },
  { value: "sextant", label: "Sextant" },
  { value: "sign", label: "Sign (30°)" },
  { value: "mil_nato", label: "Mil (NATO)" },
  { value: "mil_ussr", label: "Mil (Soviet)" },
  { value: "point", label: "Compass Point (1/32)" },
];

export function convertAngle(value: number, from: string, to: string): number {
  // convert to degrees first
  const toDeg: Record<string, number> = {
    deg: 1,
    rad: 180 / Math.PI,
    grad: 0.9,
    mrad: 180 / Math.PI / 1000,
    arcmin: 1 / 60,
    arcsec: 1 / 3600,
    turn: 360,
    quad: 90,
    sextant: 60,
    sign: 30,
    mil_nato: 360 / 6400,
    mil_ussr: 360 / 6000,
    point: 11.25,
  };
  const degrees = value * toDeg[from];
  return degrees / toDeg[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA STORAGE (base: byte)
// ─────────────────────────────────────────────────────────────────────────────
export const dataStorageUnits: UnitOption[] = [
  { value: "bit", label: "Bit (b)" },
  { value: "nibble", label: "Nibble" },
  { value: "B", label: "Byte (B)" },
  { value: "KB", label: "Kilobyte (KB) — 10³" },
  { value: "MB", label: "Megabyte (MB) — 10⁶" },
  { value: "GB", label: "Gigabyte (GB) — 10⁹" },
  { value: "TB", label: "Terabyte (TB) — 10¹²" },
  { value: "PB", label: "Petabyte (PB) — 10¹⁵" },
  { value: "EB", label: "Exabyte (EB) — 10¹⁸" },
  { value: "ZB", label: "Zettabyte (ZB) — 10²¹" },
  { value: "YB", label: "Yottabyte (YB) — 10²⁴" },
  { value: "KiB", label: "Kibibyte (KiB) — 2¹⁰" },
  { value: "MiB", label: "Mebibyte (MiB) — 2²⁰" },
  { value: "GiB", label: "Gibibyte (GiB) — 2³⁰" },
  { value: "TiB", label: "Tebibyte (TiB) — 2⁴⁰" },
  { value: "PiB", label: "Pebibyte (PiB) — 2⁵⁰" },
  { value: "EiB", label: "Exbibyte (EiB) — 2⁶⁰" },
  { value: "Kbit", label: "Kilobit (Kb)" },
  { value: "Mbit", label: "Megabit (Mb)" },
  { value: "Gbit", label: "Gigabit (Gb)" },
  { value: "Tbit", label: "Terabit (Tb)" },
];

export function convertDataStorage(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    bit: 0.125,
    nibble: 0.5,
    B: 1,
    KB: 1e3,
    MB: 1e6,
    GB: 1e9,
    TB: 1e12,
    PB: 1e15,
    EB: 1e18,
    ZB: 1e21,
    YB: 1e24,
    KiB: 1024,
    MiB: 1048576,
    GiB: 1073741824,
    TiB: 1099511627776,
    PiB: 1125899906842624,
    EiB: 1152921504606846976,
    Kbit: 125,
    Mbit: 125000,
    Gbit: 125000000,
    Tbit: 125000000000,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA TRANSFER RATE (base: bit/s)
// ─────────────────────────────────────────────────────────────────────────────
export const dataTransferRateUnits: UnitOption[] = [
  { value: "bps", label: "Bit/second (bps)" },
  { value: "Kbps", label: "Kilobit/second (Kbps)" },
  { value: "Mbps", label: "Megabit/second (Mbps)" },
  { value: "Gbps", label: "Gigabit/second (Gbps)" },
  { value: "Tbps", label: "Terabit/second (Tbps)" },
  { value: "KBps", label: "Kilobyte/second (KBps)" },
  { value: "MBps", label: "Megabyte/second (MBps)" },
  { value: "GBps", label: "Gigabyte/second (GBps)" },
  { value: "TBps", label: "Terabyte/second (TBps)" },
  { value: "Kibps", label: "Kibibit/second (Kibps)" },
  { value: "Mibps", label: "Mebibit/second (Mibps)" },
  { value: "Gibps", label: "Gibibit/second (Gibps)" },
];

export function convertDataTransferRate(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    bps: 1,
    Kbps: 1e3,
    Mbps: 1e6,
    Gbps: 1e9,
    Tbps: 1e12,
    KBps: 8e3,
    MBps: 8e6,
    GBps: 8e9,
    TBps: 8e12,
    Kibps: 1024,
    Mibps: 1048576,
    Gibps: 1073741824,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// FREQUENCY (base: hertz)
// ─────────────────────────────────────────────────────────────────────────────
export const frequencyUnits: UnitOption[] = [
  { value: "Hz", label: "Hertz (Hz)" },
  { value: "mHz", label: "Millihertz (mHz)" },
  { value: "kHz", label: "Kilohertz (kHz)" },
  { value: "MHz", label: "Megahertz (MHz)" },
  { value: "GHz", label: "Gigahertz (GHz)" },
  { value: "THz", label: "Terahertz (THz)" },
  { value: "PHz", label: "Petahertz (PHz)" },
  { value: "rpm", label: "RPM (rev/min)" },
  { value: "rps", label: "RPS (rev/s)" },
  { value: "rad/s", label: "Radian/second (ω)" },
  { value: "cpd", label: "Cycles/day" },
];

export function convertFrequency(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Hz: 1,
    mHz: 1e-3,
    kHz: 1e3,
    MHz: 1e6,
    GHz: 1e9,
    THz: 1e12,
    PHz: 1e15,
    rpm: 1 / 60,
    rps: 1,
    "rad/s": 1 / (2 * Math.PI),
    cpd: 1 / 86400,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// FUEL CONSUMPTION
// ─────────────────────────────────────────────────────────────────────────────
export const fuelConsumptionUnits: UnitOption[] = [
  { value: "L/100km", label: "Liters/100km (L/100km)" },
  { value: "mpg", label: "MPG (US)" },
  { value: "mpg_uk", label: "MPG (UK)" },
  { value: "km/L", label: "km/Liter" },
  { value: "mi/L", label: "mi/Liter" },
  { value: "L/km", label: "L/km" },
  { value: "gal/100mi", label: "US Gallons/100mi" },
];

export function convertFuelConsumption(
  value: number,
  from: string,
  to: string,
): number {
  // normalize to L/100km
  let lPer100km: number;
  switch (from) {
    case "L/100km":
      lPer100km = value;
      break;
    case "mpg":
      lPer100km = 235.214583 / value;
      break;
    case "mpg_uk":
      lPer100km = 282.480936 / value;
      break;
    case "km/L":
      lPer100km = 100 / value;
      break;
    case "mi/L":
      lPer100km = 62.1371192 / value;
      break;
    case "L/km":
      lPer100km = value * 100;
      break;
    case "gal/100mi":
      lPer100km = (value * 3.785411784) / 1.609344;
      break;
    default:
      lPer100km = value;
  }
  switch (to) {
    case "L/100km":
      return lPer100km;
    case "mpg":
      return 235.214583 / lPer100km;
    case "mpg_uk":
      return 282.480936 / lPer100km;
    case "km/L":
      return 100 / lPer100km;
    case "mi/L":
      return 62.1371192 / lPer100km;
    case "L/km":
      return lPer100km / 100;
    case "gal/100mi":
      return (lPer100km * 1.609344) / 3.785411784;
    default:
      return lPer100km;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCELERATION (base: m/s²)
// ─────────────────────────────────────────────────────────────────────────────
export const accelerationUnits: UnitOption[] = [
  { value: "m/s²", label: "m/s²" },
  { value: "km/s²", label: "km/s²" },
  { value: "cm/s²", label: "cm/s² (Gal)" },
  { value: "mm/s²", label: "mm/s²" },
  { value: "ft/s²", label: "ft/s²" },
  { value: "in/s²", label: "in/s²" },
  { value: "g", label: "Standard Gravity (g₀)" },
  { value: "mph/s", label: "mph/second" },
  { value: "km/h/s", label: "km/h per second" },
  { value: "Gal", label: "Gal (galileo)" },
  { value: "mGal", label: "mGal" },
];

export function convertAcceleration(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "m/s²": 1,
    "km/s²": 1000,
    "cm/s²": 0.01,
    "mm/s²": 0.001,
    "ft/s²": 0.3048,
    "in/s²": 0.0254,
    g: 9.80665,
    "mph/s": 0.44704,
    "km/h/s": 1 / 3.6,
    Gal: 0.01,
    mGal: 1e-5,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// DENSITY (base: kg/m³)
// ─────────────────────────────────────────────────────────────────────────────
export const densityUnits: UnitOption[] = [
  { value: "kg/m³", label: "kg/m³" },
  { value: "g/m³", label: "g/m³" },
  { value: "g/cm³", label: "g/cm³" },
  { value: "g/mL", label: "g/mL" },
  { value: "mg/mL", label: "mg/mL" },
  { value: "kg/L", label: "kg/L" },
  { value: "g/L", label: "g/L" },
  { value: "mg/L", label: "mg/L" },
  { value: "lb/ft³", label: "lb/ft³" },
  { value: "lb/in³", label: "lb/in³" },
  { value: "lb/gal", label: "lb/gal (US)" },
  { value: "oz/in³", label: "oz/in³" },
  { value: "oz/ft³", label: "oz/ft³" },
  { value: "oz/gal", label: "oz/gal (US)" },
  { value: "slug/ft³", label: "slug/ft³" },
  { value: "ton/m³", label: "ton/m³ (metric)" },
];

export function convertDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "kg/m³": 1,
    "g/m³": 1e-3,
    "g/cm³": 1000,
    "g/mL": 1000,
    "mg/mL": 1,
    "kg/L": 1000,
    "g/L": 1,
    "mg/L": 1e-3,
    "lb/ft³": 16.018463374,
    "lb/in³": 27679.904709,
    "lb/gal": 119.826427,
    "oz/in³": 1729.9940443,
    "oz/ft³": 1.0011539607,
    "oz/gal": 7.48915,
    "slug/ft³": 515.37882,
    "ton/m³": 1000,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// TORQUE (base: N·m)
// ─────────────────────────────────────────────────────────────────────────────
export const torqueUnits: UnitOption[] = [
  { value: "N·m", label: "Newton-meter (N·m)" },
  { value: "kN·m", label: "Kilonewton-meter (kN·m)" },
  { value: "mN·m", label: "Millinewton-meter (mN·m)" },
  { value: "μN·m", label: "Micronewton-meter" },
  { value: "lbf·ft", label: "Pound-force·foot (lb·ft)" },
  { value: "lbf·in", label: "Pound-force·inch (lb·in)" },
  { value: "ozf·in", label: "Ounce-force·inch" },
  { value: "kgf·m", label: "Kilogram-force·meter" },
  { value: "kgf·cm", label: "Kilogram-force·cm" },
  { value: "kgf·mm", label: "Kilogram-force·mm" },
  { value: "gf·m", label: "Gram-force·meter" },
  { value: "dyn·cm", label: "Dyne·centimeter" },
];

export function convertTorque(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    "N·m": 1,
    "kN·m": 1e3,
    "mN·m": 1e-3,
    "μN·m": 1e-6,
    "lbf·ft": 1.3558179483,
    "lbf·in": 0.11298482902,
    "ozf·in": 0.0070615518,
    "kgf·m": 9.80665,
    "kgf·cm": 0.0980665,
    "kgf·mm": 0.00980665,
    "gf·m": 0.00980665,
    "dyn·cm": 1e-7,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC — CHARGE (base: coulomb)
// ─────────────────────────────────────────────────────────────────────────────
export const chargeUnits: UnitOption[] = [
  { value: "C", label: "Coulomb (C)" },
  { value: "mC", label: "Millicoulomb (mC)" },
  { value: "μC", label: "Microcoulomb (μC)" },
  { value: "nC", label: "Nanocoulomb (nC)" },
  { value: "pC", label: "Picocoulomb (pC)" },
  { value: "Ah", label: "Ampere-hour (Ah)" },
  { value: "mAh", label: "Milliampere-hour (mAh)" },
  { value: "kAh", label: "Kiloampere-hour (kAh)" },
  { value: "faraday", label: "Faraday" },
  { value: "statcoulomb", label: "Statcoulomb (Fr)" },
  { value: "abcoulomb", label: "Abcoulomb (EMU)" },
];

export function convertCharge(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    C: 1,
    mC: 1e-3,
    μC: 1e-6,
    nC: 1e-9,
    pC: 1e-12,
    Ah: 3600,
    mAh: 3.6,
    kAh: 3600000,
    faraday: 96485.33212,
    statcoulomb: 3.335641e-10,
    abcoulomb: 10,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC — CURRENT (base: ampere)
// ─────────────────────────────────────────────────────────────────────────────
export const currentUnits: UnitOption[] = [
  { value: "A", label: "Ampere (A)" },
  { value: "kA", label: "Kiloampere (kA)" },
  { value: "mA", label: "Milliampere (mA)" },
  { value: "μA", label: "Microampere (μA)" },
  { value: "nA", label: "Nanoampere (nA)" },
  { value: "pA", label: "Picoampere (pA)" },
  { value: "abampere", label: "Abampere (Biot)" },
  { value: "statampere", label: "Statampere" },
];

export function convertCurrent(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    A: 1,
    kA: 1e3,
    mA: 1e-3,
    μA: 1e-6,
    nA: 1e-9,
    pA: 1e-12,
    abampere: 10,
    statampere: 3.335641e-10,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC — VOLTAGE (base: volt)
// ─────────────────────────────────────────────────────────────────────────────
export const voltageUnits: UnitOption[] = [
  { value: "V", label: "Volt (V)" },
  { value: "mV", label: "Millivolt (mV)" },
  { value: "μV", label: "Microvolt (μV)" },
  { value: "nV", label: "Nanovolt (nV)" },
  { value: "kV", label: "Kilovolt (kV)" },
  { value: "MV", label: "Megavolt (MV)" },
  { value: "abvolt", label: "Abvolt (EMU)" },
  { value: "statvolt", label: "Statvolt (ESU)" },
];

export function convertVoltage(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    V: 1,
    mV: 1e-3,
    μV: 1e-6,
    nV: 1e-9,
    kV: 1e3,
    MV: 1e6,
    abvolt: 1e-8,
    statvolt: 299.792458,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC — RESISTANCE (base: ohm)
// ─────────────────────────────────────────────────────────────────────────────
export const resistanceUnits: UnitOption[] = [
  { value: "Ω", label: "Ohm (Ω)" },
  { value: "mΩ", label: "Milliohm (mΩ)" },
  { value: "μΩ", label: "Microohm (μΩ)" },
  { value: "kΩ", label: "Kiloohm (kΩ)" },
  { value: "MΩ", label: "Megaohm (MΩ)" },
  { value: "GΩ", label: "Gigaohm (GΩ)" },
  { value: "abohm", label: "Abohm (EMU)" },
  { value: "statohm", label: "Statohm (ESU)" },
];

export function convertResistance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Ω: 1,
    mΩ: 1e-3,
    μΩ: 1e-6,
    kΩ: 1e3,
    MΩ: 1e6,
    GΩ: 1e9,
    abohm: 1e-9,
    statohm: 8.987552e11,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC — CAPACITANCE (base: farad)
// ─────────────────────────────────────────────────────────────────────────────
export const capacitanceUnits: UnitOption[] = [
  { value: "F", label: "Farad (F)" },
  { value: "mF", label: "Millifarad (mF)" },
  { value: "μF", label: "Microfarad (μF)" },
  { value: "nF", label: "Nanofarad (nF)" },
  { value: "pF", label: "Picofarad (pF)" },
  { value: "fF", label: "Femtofarad (fF)" },
  { value: "kF", label: "Kilofarad (kF)" },
  { value: "abfarad", label: "Abfarad (EMU)" },
  { value: "statfarad", label: "Statfarad (ESU)" },
];

export function convertCapacitance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    F: 1,
    mF: 1e-3,
    μF: 1e-6,
    nF: 1e-9,
    pF: 1e-12,
    fF: 1e-15,
    kF: 1e3,
    abfarad: 1e9,
    statfarad: 1.11265e-12,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC — INDUCTANCE (base: henry)
// ─────────────────────────────────────────────────────────────────────────────
export const inductanceUnits: UnitOption[] = [
  { value: "H", label: "Henry (H)" },
  { value: "mH", label: "Millihenry (mH)" },
  { value: "μH", label: "Microhenry (μH)" },
  { value: "nH", label: "Nanohenry (nH)" },
  { value: "pH", label: "Picohenry (pH)" },
  { value: "kH", label: "Kilohenry (kH)" },
  { value: "abhenry", label: "Abhenry (EMU)" },
  { value: "stathenry", label: "Stathenry (ESU)" },
];

export function convertInductance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    H: 1,
    mH: 1e-3,
    μH: 1e-6,
    nH: 1e-9,
    pH: 1e-12,
    kH: 1e3,
    abhenry: 1e-9,
    stathenry: 8.987552e11,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDUCTANCE (base: siemens)
// ─────────────────────────────────────────────────────────────────────────────
export const conductanceUnits: UnitOption[] = [
  { value: "S", label: "Siemens (S)" },
  { value: "mS", label: "Millisiemens (mS)" },
  { value: "μS", label: "Microsiemens (μS)" },
  { value: "nS", label: "Nanosiemens (nS)" },
  { value: "kS", label: "Kilosiemens (kS)" },
  { value: "abmho", label: "Abmho (EMU)" },
  { value: "statmho", label: "Statmho (ESU)" },
  { value: "mho", label: "Mho (℧)" },
];

export function convertConductance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    S: 1,
    mS: 1e-3,
    μS: 1e-6,
    nS: 1e-9,
    kS: 1e3,
    abmho: 1e9,
    statmho: 1.11265e-12,
    mho: 1,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC FLUX (base: weber)
// ─────────────────────────────────────────────────────────────────────────────
export const magneticFluxUnits: UnitOption[] = [
  { value: "Wb", label: "Weber (Wb)" },
  { value: "mWb", label: "Milliweber (mWb)" },
  { value: "μWb", label: "Microweber (μWb)" },
  { value: "V·s", label: "Volt-second (V·s)" },
  { value: "Mx", label: "Maxwell (Mx)" },
  { value: "T·m²", label: "Tesla·m²" },
  { value: "kMx", label: "Kilomaxwell (kMx)" },
];

export function convertMagneticFlux(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Wb: 1,
    mWb: 1e-3,
    μWb: 1e-6,
    "V·s": 1,
    Mx: 1e-8,
    "T·m²": 1,
    kMx: 1e-5,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC FLUX DENSITY (base: tesla)
// ─────────────────────────────────────────────────────────────────────────────
export const magneticFluxDensityUnits: UnitOption[] = [
  { value: "T", label: "Tesla (T)" },
  { value: "mT", label: "Millitesla (mT)" },
  { value: "μT", label: "Microtesla (μT)" },
  { value: "nT", label: "Nanotesla (nT)" },
  { value: "G", label: "Gauss (G)" },
  { value: "mG", label: "Milligauss (mG)" },
  { value: "Wb/m²", label: "Wb/m²" },
  { value: "kG", label: "Kilogauss (kG)" },
  { value: "γ", label: "Gamma (γ) = nT" },
];

export function convertMagneticFluxDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    T: 1,
    mT: 1e-3,
    μT: 1e-6,
    nT: 1e-9,
    G: 1e-4,
    mG: 1e-7,
    "Wb/m²": 1,
    kG: 0.1,
    γ: 1e-9,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC FIELD STRENGTH (base: A/m)
// ─────────────────────────────────────────────────────────────────────────────
export const magneticFieldStrengthUnits: UnitOption[] = [
  { value: "A/m", label: "Ampere/meter (A/m)" },
  { value: "kA/m", label: "Kiloampere/meter (kA/m)" },
  { value: "mA/m", label: "Milliampere/meter (mA/m)" },
  { value: "Oe", label: "Oersted (Oe)" },
  { value: "A·t/m", label: "Ampere-turn/meter" },
];

export function convertMagneticFieldStrength(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "A/m": 1,
    "kA/m": 1e3,
    "mA/m": 1e-3,
    Oe: 79.57747154,
    "A·t/m": 1,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ILLUMINANCE (base: lux)
// ─────────────────────────────────────────────────────────────────────────────
export const illuminanceUnits: UnitOption[] = [
  { value: "lx", label: "Lux (lx)" },
  { value: "mlx", label: "Millilux (mlx)" },
  { value: "klx", label: "Kilolux (klx)" },
  { value: "fc", label: "Foot-candle (fc)" },
  { value: "ph", label: "Phot (ph)" },
  { value: "nx", label: "Nox" },
  { value: "lm/m²", label: "Lumen/m²" },
  { value: "lm/cm²", label: "Lumen/cm²" },
  { value: "lm/ft²", label: "Lumen/ft²" },
];

export function convertIlluminance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    lx: 1,
    mlx: 1e-3,
    klx: 1e3,
    fc: 10.763910417,
    ph: 10000,
    nx: 0.001,
    "lm/m²": 1,
    "lm/cm²": 10000,
    "lm/ft²": 10.763910417,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// LUMINANCE (base: cd/m²)
// ─────────────────────────────────────────────────────────────────────────────
export const luminanceUnits: UnitOption[] = [
  { value: "cd/m²", label: "Candela/m² (nit)" },
  { value: "mcd/m²", label: "Millicandela/m²" },
  { value: "kcd/m²", label: "Kilocandela/m²" },
  { value: "cd/cm²", label: "Stilb (cd/cm²)" },
  { value: "cd/ft²", label: "Candela/ft²" },
  { value: "fL", label: "Foot-lambert (fL)" },
  { value: "L", label: "Lambert (L)" },
  { value: "mL", label: "Millilambert (mL)" },
  { value: "asb", label: "Apostilb (asb)" },
  { value: "sk", label: "Skot (sk)" },
  { value: "blondel", label: "Blondel" },
];

export function convertLuminance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "cd/m²": 1,
    "mcd/m²": 1e-3,
    "kcd/m²": 1e3,
    "cd/cm²": 10000,
    "cd/ft²": 10.7639104,
    fL: 3.4262590996,
    L: 3183.0988618,
    mL: 3.1830988618,
    asb: 0.31830988618,
    sk: 0.31830988618e-3,
    blondel: 0.31830988618,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// LUMINOUS INTENSITY (base: candela)
// ─────────────────────────────────────────────────────────────────────────────
export const luminousIntensityUnits: UnitOption[] = [
  { value: "cd", label: "Candela (cd)" },
  { value: "mcd", label: "Millicandela (mcd)" },
  { value: "kcd", label: "Kilocandela (kcd)" },
  { value: "cp", label: "Candle Power (cp)" },
  { value: "HK", label: "Hefner Kerze (HK)" },
];

export function convertLuminousIntensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    cd: 1,
    mcd: 1e-3,
    kcd: 1e3,
    cp: 0.981,
    HK: 0.903,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// LUMINOUS FLUX (base: lumen)
// ─────────────────────────────────────────────────────────────────────────────
export const luminousFluxUnits: UnitOption[] = [
  { value: "lm", label: "Lumen (lm)" },
  { value: "mlm", label: "Millilumen (mlm)" },
  { value: "klm", label: "Kilolumen (klm)" },
  { value: "clm", label: "Centilumen (clm)" },
];

export function convertLuminousFlux(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    lm: 1,
    mlm: 1e-3,
    klm: 1e3,
    clm: 0.01,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIOACTIVITY (base: becquerel)
// ─────────────────────────────────────────────────────────────────────────────
export const radioactivityUnits: UnitOption[] = [
  { value: "Bq", label: "Becquerel (Bq)" },
  { value: "kBq", label: "Kilobecquerel (kBq)" },
  { value: "MBq", label: "Megabecquerel (MBq)" },
  { value: "GBq", label: "Gigabecquerel (GBq)" },
  { value: "TBq", label: "Terabecquerel (TBq)" },
  { value: "Ci", label: "Curie (Ci)" },
  { value: "mCi", label: "Millicurie (mCi)" },
  { value: "μCi", label: "Microcurie (μCi)" },
  { value: "nCi", label: "Nanocurie (nCi)" },
  { value: "pCi", label: "Picocurie (pCi)" },
  { value: "Rd", label: "Rutherford (Rd)" },
  { value: "dpm", label: "Disintegrations/minute (dpm)" },
  { value: "dps", label: "Disintegrations/second (dps)" },
];

export function convertRadioactivity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Bq: 1,
    kBq: 1e3,
    MBq: 1e6,
    GBq: 1e9,
    TBq: 1e12,
    Ci: 3.7e10,
    mCi: 3.7e7,
    μCi: 3.7e4,
    nCi: 37,
    pCi: 0.037,
    Rd: 1e6,
    dpm: 1 / 60,
    dps: 1,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIATION DOSE — ABSORBED (base: gray)
// ─────────────────────────────────────────────────────────────────────────────
export const radiationAbsorbedDoseUnits: UnitOption[] = [
  { value: "Gy", label: "Gray (Gy)" },
  { value: "mGy", label: "Milligray (mGy)" },
  { value: "μGy", label: "Microgray (μGy)" },
  { value: "kGy", label: "Kilogray (kGy)" },
  { value: "rad", label: "Rad" },
  { value: "mrad", label: "Millirad (mrad)" },
  { value: "J/kg", label: "Joule/kilogram (J/kg)" },
];

export function convertRadiationAbsorbedDose(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Gy: 1,
    mGy: 1e-3,
    μGy: 1e-6,
    kGy: 1e3,
    rad: 0.01,
    mrad: 1e-5,
    "J/kg": 1,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIATION DOSE — EQUIVALENT (base: sievert)
// ─────────────────────────────────────────────────────────────────────────────
export const radiationEquivalentDoseUnits: UnitOption[] = [
  { value: "Sv", label: "Sievert (Sv)" },
  { value: "mSv", label: "Millisievert (mSv)" },
  { value: "μSv", label: "Microsievert (μSv)" },
  { value: "rem", label: "Rem" },
  { value: "mrem", label: "Millirem (mrem)" },
];

export function convertRadiationEquivalentDose(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    Sv: 1,
    mSv: 1e-3,
    μSv: 1e-6,
    rem: 0.01,
    mrem: 1e-5,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPOSURE (RADIATION) (base: C/kg)
// ─────────────────────────────────────────────────────────────────────────────
export const exposureDoseUnits: UnitOption[] = [
  { value: "C/kg", label: "Coulomb/kilogram (C/kg)" },
  { value: "mC/kg", label: "Millicoulomb/kg" },
  { value: "R", label: "Röntgen (R)" },
  { value: "mR", label: "Milliroentgen (mR)" },
  { value: "μR", label: "Microroentgen (μR)" },
  { value: "kR", label: "Kilroentgen (kR)" },
];

export function convertExposureDose(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "C/kg": 1,
    "mC/kg": 1e-3,
    R: 2.58e-4,
    mR: 2.58e-7,
    μR: 2.58e-10,
    kR: 0.258,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// VOLUMETRIC FLOW RATE (base: m³/s)
// ─────────────────────────────────────────────────────────────────────────────
export const flowUnits: UnitOption[] = [
  { value: "m³/s", label: "m³/second" },
  { value: "m³/min", label: "m³/minute" },
  { value: "m³/h", label: "m³/hour" },
  { value: "m³/d", label: "m³/day" },
  { value: "L/s", label: "L/second" },
  { value: "L/min", label: "L/minute" },
  { value: "L/h", label: "L/hour" },
  { value: "mL/s", label: "mL/second" },
  { value: "mL/min", label: "mL/minute" },
  { value: "cm³/s", label: "cm³/second" },
  { value: "ft³/s", label: "ft³/second (cusec)" },
  { value: "ft³/min", label: "ft³/minute (CFM)" },
  { value: "ft³/h", label: "ft³/hour" },
  { value: "gal/s", label: "gal/second (US)" },
  { value: "gal/min", label: "gal/minute (GPM US)" },
  { value: "gal/h", label: "gal/hour (US)" },
  { value: "gal_uk/min", label: "gal/minute (UK)" },
  { value: "in³/s", label: "in³/second" },
  { value: "in³/min", label: "in³/minute" },
  { value: "bbl/d", label: "Oil barrel/day" },
  { value: "bbl/min", label: "Oil barrel/minute" },
];

export function convertFlow(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    "m³/s": 1,
    "m³/min": 1 / 60,
    "m³/h": 1 / 3600,
    "m³/d": 1 / 86400,
    "L/s": 0.001,
    "L/min": 1 / 60000,
    "L/h": 1 / 3600000,
    "mL/s": 1e-6,
    "mL/min": 1e-6 / 60,
    "cm³/s": 1e-6,
    "ft³/s": 0.028316846592,
    "ft³/min": 0.00047194744,
    "ft³/h": 7.865791e-6,
    "gal/s": 0.003785411784,
    "gal/min": 6.30902e-5,
    "gal/h": 1.051503e-6,
    "gal_uk/min": 7.57682e-5,
    "in³/s": 1.6387e-5,
    "in³/min": 2.7311e-7,
    "bbl/d": 0.0018401307,
    "bbl/min": 0.002649788,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MASS FLOW RATE (base: kg/s)
// ─────────────────────────────────────────────────────────────────────────────
export const massFlowUnits: UnitOption[] = [
  { value: "kg/s", label: "kg/second" },
  { value: "kg/min", label: "kg/minute" },
  { value: "kg/h", label: "kg/hour" },
  { value: "g/s", label: "g/second" },
  { value: "g/min", label: "g/minute" },
  { value: "g/h", label: "g/hour" },
  { value: "mg/s", label: "mg/second" },
  { value: "t/h", label: "metric ton/hour" },
  { value: "t/d", label: "metric ton/day" },
  { value: "lb/s", label: "lb/second" },
  { value: "lb/min", label: "lb/minute" },
  { value: "lb/h", label: "lb/hour" },
  { value: "oz/s", label: "oz/second" },
  { value: "ton_us/h", label: "US ton/hour" },
  { value: "ton_uk/h", label: "UK ton/hour" },
];

export function convertMassFlow(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "kg/s": 1,
    "kg/min": 1 / 60,
    "kg/h": 1 / 3600,
    "g/s": 0.001,
    "g/min": 1 / 60000,
    "g/h": 1 / 3600000,
    "mg/s": 1e-6,
    "t/h": 1 / 3.6,
    "t/d": 1 / 86.4,
    "lb/s": 0.45359237,
    "lb/min": 0.45359237 / 60,
    "lb/h": 0.45359237 / 3600,
    "oz/s": 0.028349523,
    "ton_us/h": 252.99575,
    "ton_uk/h": 282.23513,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC VISCOSITY (base: Pa·s)
// ─────────────────────────────────────────────────────────────────────────────
export const dynamicViscosityUnits: UnitOption[] = [
  { value: "Pa·s", label: "Pascal-second (Pa·s)" },
  { value: "mPa·s", label: "Millipascal-second (mPa·s)" },
  { value: "μPa·s", label: "Micropascal-second (μPa·s)" },
  { value: "cP", label: "Centipoise (cP)" },
  { value: "P", label: "Poise (P)" },
  { value: "kgf·s/m²", label: "kgf·s/m²" },
  { value: "lbf·s/ft²", label: "lbf·s/ft²" },
  { value: "lb/(ft·s)", label: "lb/(ft·s)" },
  { value: "lb/(ft·h)", label: "lb/(ft·h)" },
  { value: "slug/(ft·s)", label: "slug/(ft·s)" },
];

export function convertDynamicViscosity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "Pa·s": 1,
    "mPa·s": 1e-3,
    "μPa·s": 1e-6,
    cP: 1e-3,
    P: 0.1,
    "kgf·s/m²": 9.80665,
    "lbf·s/ft²": 47.88026,
    "lb/(ft·s)": 1.48816394,
    "lb/(ft·h)": 4.133789e-4,
    "slug/(ft·s)": 47.88026,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// KINEMATIC VISCOSITY (base: m²/s)
// ─────────────────────────────────────────────────────────────────────────────
export const kinematicViscosityUnits: UnitOption[] = [
  { value: "m²/s", label: "m²/second" },
  { value: "cm²/s", label: "cm²/second (Stokes)" },
  { value: "mm²/s", label: "mm²/second (cSt)" },
  { value: "cSt", label: "Centistokes (cSt)" },
  { value: "St", label: "Stokes (St)" },
  { value: "ft²/s", label: "ft²/second" },
  { value: "ft²/h", label: "ft²/hour" },
  { value: "in²/s", label: "in²/second" },
];

export function convertKinematicViscosity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "m²/s": 1,
    "cm²/s": 1e-4,
    "mm²/s": 1e-6,
    cSt: 1e-6,
    St: 1e-4,
    "ft²/s": 0.09290304,
    "ft²/h": 2.580644e-5,
    "in²/s": 6.4516e-4,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// SURFACE TENSION (base: N/m)
// ─────────────────────────────────────────────────────────────────────────────
export const surfaceTensionUnits: UnitOption[] = [
  { value: "N/m", label: "Newton/meter (N/m)" },
  { value: "mN/m", label: "Millinewton/meter (mN/m)" },
  { value: "μN/m", label: "Micronewton/meter (μN/m)" },
  { value: "dyn/cm", label: "Dyne/centimeter" },
  { value: "lbf/ft", label: "lbf/foot" },
  { value: "lbf/in", label: "lbf/inch" },
  { value: "kgf/m", label: "kgf/meter" },
  { value: "erg/cm²", label: "Erg/cm²" },
];

export function convertSurfaceTension(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "N/m": 1,
    "mN/m": 1e-3,
    "μN/m": 1e-6,
    "dyn/cm": 1e-3,
    "lbf/ft": 14.593903,
    "lbf/in": 175.126835,
    "kgf/m": 9.80665,
    "erg/cm²": 1e-3,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIFIC HEAT CAPACITY (base: J/(kg·K))
// ─────────────────────────────────────────────────────────────────────────────
export const specificHeatCapacityUnits: UnitOption[] = [
  { value: "J/(kg·K)", label: "J/(kg·K)" },
  { value: "kJ/(kg·K)", label: "kJ/(kg·K)" },
  { value: "J/(g·K)", label: "J/(g·K)" },
  { value: "cal/(g·°C)", label: "cal/(g·°C)" },
  { value: "kcal/(kg·K)", label: "kcal/(kg·K)" },
  { value: "BTU/(lb·°F)", label: "BTU/(lb·°F)" },
  { value: "BTU/(lb·°R)", label: "BTU/(lb·°R)" },
  { value: "ft·lbf/(lb·°R)", label: "ft·lbf/(lb·°R)" },
  { value: "CHU/(lb·°C)", label: "CHU/(lb·°C)" },
];

export function convertSpecificHeatCapacity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "J/(kg·K)": 1,
    "kJ/(kg·K)": 1000,
    "J/(g·K)": 1000,
    "cal/(g·°C)": 4184,
    "kcal/(kg·K)": 4184,
    "BTU/(lb·°F)": 4186.8,
    "BTU/(lb·°R)": 4186.8,
    "ft·lbf/(lb·°R)": 5.38032,
    "CHU/(lb·°C)": 4186.8,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// THERMAL CONDUCTIVITY (base: W/(m·K))
// ─────────────────────────────────────────────────────────────────────────────
export const thermalConductivityUnits: UnitOption[] = [
  { value: "W/(m·K)", label: "W/(m·K)" },
  { value: "W/(cm·K)", label: "W/(cm·K)" },
  { value: "kW/(m·K)", label: "kW/(m·K)" },
  { value: "BTU/(h·ft·°F)", label: "BTU/(h·ft·°F)" },
  { value: "BTU/(s·ft·°F)", label: "BTU/(s·ft·°F)" },
  { value: "cal/(s·cm·°C)", label: "cal/(s·cm·°C)" },
  { value: "kcal/(h·m·K)", label: "kcal/(h·m·K)" },
];

export function convertThermalConductivity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "W/(m·K)": 1,
    "W/(cm·K)": 100,
    "kW/(m·K)": 1000,
    "BTU/(h·ft·°F)": 1.730734666,
    "BTU/(s·ft·°F)": 6230.645998,
    "cal/(s·cm·°C)": 418.68,
    "kcal/(h·m·K)": 1.163,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// HEAT FLUX DENSITY (base: W/m²)
// ─────────────────────────────────────────────────────────────────────────────
export const heatFluxDensityUnits: UnitOption[] = [
  { value: "W/m²", label: "W/m²" },
  { value: "kW/m²", label: "kW/m²" },
  { value: "W/cm²", label: "W/cm²" },
  { value: "BTU/(h·ft²)", label: "BTU/(h·ft²)" },
  { value: "BTU/(s·ft²)", label: "BTU/(s·ft²)" },
  { value: "cal/(s·cm²)", label: "cal/(s·cm²)" },
  { value: "kcal/(h·m²)", label: "kcal/(h·m²)" },
  { value: "W/in²", label: "W/in²" },
];

export function convertHeatFluxDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "W/m²": 1,
    "kW/m²": 1000,
    "W/cm²": 10000,
    "BTU/(h·ft²)": 3.154591,
    "BTU/(s·ft²)": 11356.526,
    "cal/(s·cm²)": 41840,
    "kcal/(h·m²)": 1.163,
    "W/in²": 1550.003,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// HEAT TRANSFER COEFFICIENT (base: W/(m²·K))
// ─────────────────────────────────────────────────────────────────────────────
export const heatTransferCoefficientUnits: UnitOption[] = [
  { value: "W/(m²·K)", label: "W/(m²·K)" },
  { value: "W/(m²·°C)", label: "W/(m²·°C)" },
  { value: "kW/(m²·K)", label: "kW/(m²·K)" },
  { value: "BTU/(h·ft²·°F)", label: "BTU/(h·ft²·°F)" },
  { value: "BTU/(s·ft²·°F)", label: "BTU/(s·ft²·°F)" },
  { value: "cal/(s·cm²·°C)", label: "cal/(s·cm²·°C)" },
  { value: "kcal/(h·m²·°C)", label: "kcal/(h·m²·°C)" },
];

export function convertHeatTransferCoefficient(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "W/(m²·K)": 1,
    "W/(m²·°C)": 1,
    "kW/(m²·K)": 1000,
    "BTU/(h·ft²·°F)": 5.678263341,
    "BTU/(s·ft²·°F)": 20441.748,
    "cal/(s·cm²·°C)": 41840,
    "kcal/(h·m²·°C)": 1.163,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ANGULAR VELOCITY (base: rad/s)
// ─────────────────────────────────────────────────────────────────────────────
export const angularVelocityUnits: UnitOption[] = [
  { value: "rad/s", label: "Radian/second" },
  { value: "rad/min", label: "Radian/minute" },
  { value: "rad/h", label: "Radian/hour" },
  { value: "deg/s", label: "Degree/second" },
  { value: "deg/min", label: "Degree/minute" },
  { value: "rpm", label: "RPM" },
  { value: "rps", label: "RPS (rev/s)" },
  { value: "rev/h", label: "Rev/hour" },
];

export function convertAngularVelocity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "rad/s": 1,
    "rad/min": 1 / 60,
    "rad/h": 1 / 3600,
    "deg/s": Math.PI / 180,
    "deg/min": Math.PI / 180 / 60,
    rpm: Math.PI / 30,
    rps: 2 * Math.PI,
    "rev/h": Math.PI / 1800,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MOMENT OF INERTIA (base: kg·m²)
// ─────────────────────────────────────────────────────────────────────────────
export const momentOfInertiaUnits: UnitOption[] = [
  { value: "kg·m²", label: "kg·m²" },
  { value: "kg·cm²", label: "kg·cm²" },
  { value: "g·cm²", label: "g·cm²" },
  { value: "t·m²", label: "t·m² (metric ton)" },
  { value: "lb·ft²", label: "lb·ft²" },
  { value: "lb·in²", label: "lb·in²" },
  { value: "oz·in²", label: "oz·in²" },
  { value: "slug·ft²", label: "slug·ft²" },
];

export function convertMomentOfInertia(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "kg·m²": 1,
    "kg·cm²": 1e-4,
    "g·cm²": 1e-7,
    "t·m²": 1000,
    "lb·ft²": 0.042140110094,
    "lb·in²": 0.00029263965,
    "oz·in²": 0.000018289977,
    "slug·ft²": 1.355817948,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// RESOLUTION (base: dpi)
// ─────────────────────────────────────────────────────────────────────────────
export const resolutionUnits: UnitOption[] = [
  { value: "dpi", label: "DPI (dots/inch)" },
  { value: "dpcm", label: "DPCM (dots/cm)" },
  { value: "dpm", label: "DPM (dots/meter)" },
  { value: "ppi", label: "PPI (pixels/inch)" },
  { value: "px/cm", label: "Pixels/cm" },
  { value: "lpi", label: "LPI (lines/inch)" },
];

export function convertResolution(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    dpi: 1,
    dpcm: 2.54,
    dpm: 0.0254,
    ppi: 1,
    "px/cm": 2.54,
    lpi: 1,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// SOUND PRESSURE (base: pascal)
// ─────────────────────────────────────────────────────────────────────────────
export const soundPressureUnits: UnitOption[] = [
  { value: "Pa", label: "Pascal (Pa)" },
  { value: "kPa", label: "Kilopascal (kPa)" },
  { value: "μPa", label: "Micropascal (μPa)" },
  { value: "dB SPL", label: "Decibel SPL (dB)" },
  { value: "dBA", label: "dB(A) — A-weighted" },
  { value: "bar", label: "Bar" },
  { value: "atm", label: "Atmosphere (atm)" },
];

export function convertSoundPressure(
  value: number,
  from: string,
  to: string,
): number {
  const p0 = 20e-6; // 20 µPa reference
  const toPa = (v: number, u: string): number => {
    switch (u) {
      case "Pa":
        return v;
      case "kPa":
        return v * 1000;
      case "μPa":
        return v * 1e-6;
      case "dB SPL":
      case "dBA":
        return p0 * Math.pow(10, v / 20);
      case "bar":
        return v * 1e5;
      case "atm":
        return v * 101325;
      default:
        return v;
    }
  };
  const fromPa = (pa: number, u: string): number => {
    switch (u) {
      case "Pa":
        return pa;
      case "kPa":
        return pa / 1000;
      case "μPa":
        return pa * 1e6;
      case "dB SPL":
      case "dBA":
        return 20 * Math.log10(pa / p0);
      case "bar":
        return pa / 1e5;
      case "atm":
        return pa / 101325;
      default:
        return pa;
    }
  };
  return fromPa(toPa(value, from), to);
}

// ─────────────────────────────────────────────────────────────────────────────
// WIND SPEED
// ─────────────────────────────────────────────────────────────────────────────
export const windSpeedUnits: UnitOption[] = [
  { value: "m/s", label: "Meter/second (m/s)" },
  { value: "km/h", label: "Kilometer/hour (km/h)" },
  { value: "mph", label: "Miles/hour (mph)" },
  { value: "kn", label: "Knot (kn)" },
  { value: "ft/s", label: "Foot/second (ft/s)" },
  { value: "ft/min", label: "Foot/minute (ft/min)" },
  { value: "Bft", label: "Beaufort Scale" },
];

export function convertWindSpeed(
  value: number,
  from: string,
  to: string,
): number {
  if (from === "Bft" || to === "Bft") {
    const bftToMs: Record<number, number> = {
      0: 0.2,
      1: 0.9,
      2: 2.4,
      3: 4.4,
      4: 6.7,
      5: 9.4,
      6: 12.3,
      7: 15.5,
      8: 18.9,
      9: 22.6,
      10: 26.4,
      11: 30.5,
      12: 35,
    };
    if (from === "Bft") {
      const ms = bftToMs[Math.round(value)] ?? 0;
      return convertSpeed(ms, "m/s", to);
    }
    const ms = convertSpeed(value, from, "m/s");
    const th = [
      0.2, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7,
    ];
    for (let i = th.length - 1; i >= 0; i--) {
      if (ms >= th[i]) return i + 1;
    }
    return 0;
  }
  return convertSpeed(value, from, to);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCENTRATION (base: ppm)
// ─────────────────────────────────────────────────────────────────────────────
export const concentrationUnits: UnitOption[] = [
  { value: "ppm", label: "Parts per million (ppm)" },
  { value: "ppb", label: "Parts per billion (ppb)" },
  { value: "ppt", label: "Parts per trillion (ppt)" },
  { value: "ppq", label: "Parts per quadrillion (ppq)" },
  { value: "%", label: "Percent (%)" },
  { value: "‰", label: "Per mille (‰)" },
  { value: "mg/L", label: "mg/Liter (mg/L)" },
  { value: "g/L", label: "g/Liter (g/L)" },
  { value: "μg/L", label: "μg/Liter (μg/L)" },
  { value: "ng/L", label: "ng/Liter" },
  { value: "mg/kg", label: "mg/kg" },
  { value: "μg/kg", label: "μg/kg" },
];

export function convertConcentration(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    ppm: 1,
    ppb: 1e-3,
    ppt: 1e-6,
    ppq: 1e-9,
    "%": 1e4,
    "‰": 1e3,
    "mg/L": 1, // assumes water density ≈ 1 kg/L
    "g/L": 1e3,
    "μg/L": 1e-3,
    "ng/L": 1e-6,
    "mg/kg": 1,
    "μg/kg": 1e-3,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MOLAR CONCENTRATION (base: mol/m³)
// ─────────────────────────────────────────────────────────────────────────────
export const molarConcentrationUnits: UnitOption[] = [
  { value: "mol/m³", label: "mol/m³" },
  { value: "mol/L", label: "mol/Liter (M)" },
  { value: "mmol/L", label: "mmol/L (mM)" },
  { value: "μmol/L", label: "μmol/L (μM)" },
  { value: "nmol/L", label: "nmol/L (nM)" },
  { value: "kmol/m³", label: "kmol/m³" },
  { value: "mol/cm³", label: "mol/cm³" },
  { value: "lbmol/ft³", label: "lbmol/ft³" },
];

export function convertMolarConcentration(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "mol/m³": 1,
    "mol/L": 1000,
    "mmol/L": 1,
    "μmol/L": 0.001,
    "nmol/L": 1e-6,
    "kmol/m³": 1000,
    "mol/cm³": 1e6,
    "lbmol/ft³": 16018.464,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ASTRONOMICAL DISTANCE (base: km)
// ─────────────────────────────────────────────────────────────────────────────
export const astronomicalDistanceUnits: UnitOption[] = [
  { value: "km", label: "Kilometer (km)" },
  { value: "mi", label: "Mile (mi)" },
  { value: "AU", label: "Astronomical Unit (AU)" },
  { value: "ly", label: "Light-year (ly)" },
  { value: "pc", label: "Parsec (pc)" },
  { value: "kpc", label: "Kiloparsec (kpc)" },
  { value: "Mpc", label: "Megaparsec (Mpc)" },
  { value: "ls", label: "Light-second (ls)" },
  { value: "lm", label: "Light-minute (lm)" },
  { value: "lh", label: "Light-hour (lh)" },
  { value: "ld", label: "Light-day (ld)" },
];

export function convertAstronomicalDistance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    km: 1,
    mi: 1.609344,
    AU: 1.495978707e8,
    ly: 9.4607304725808e12,
    pc: 3.085677581e13,
    kpc: 3.085677581e16,
    Mpc: 3.085677581e19,
    ls: 299792.458,
    lm: 17987547.48,
    lh: 1079252848.8,
    ld: 25902068371.2,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// WAVELENGTH (electromagnetic)
// ─────────────────────────────────────────────────────────────────────────────
export const wavelengthUnits: UnitOption[] = [
  { value: "m", label: "Meter (m)" },
  { value: "cm", label: "Centimeter (cm)" },
  { value: "mm", label: "Millimeter (mm)" },
  { value: "μm", label: "Micrometer (μm)" },
  { value: "nm", label: "Nanometer (nm)" },
  { value: "pm", label: "Picometer (pm)" },
  { value: "fm", label: "Femtometer (fm)" },
  { value: "Å", label: "Angstrom (Å)" },
  { value: "Hz", label: "Hertz (Hz)" },
  { value: "kHz", label: "Kilohertz (kHz)" },
  { value: "MHz", label: "Megahertz (MHz)" },
  { value: "GHz", label: "Gigahertz (GHz)" },
  { value: "THz", label: "Terahertz (THz)" },
];

export function convertWavelength(
  value: number,
  from: string,
  to: string,
): number {
  const c = 299792458; // speed of light m/s
  const lengthFactors: Record<string, number> = {
    m: 1,
    cm: 0.01,
    mm: 1e-3,
    μm: 1e-6,
    nm: 1e-9,
    pm: 1e-12,
    fm: 1e-15,
    Å: 1e-10,
  };
  const freqFactors: Record<string, number> = {
    Hz: 1,
    kHz: 1e3,
    MHz: 1e6,
    GHz: 1e9,
    THz: 1e12,
  };
  const isLenFrom = from in lengthFactors;
  const isLenTo = to in lengthFactors;
  if (isLenFrom && isLenTo)
    return (value * lengthFactors[from]) / lengthFactors[to];
  if (!isLenFrom && !isLenTo)
    return (value * freqFactors[from]) / freqFactors[to];
  if (isLenFrom) {
    const wm = value * lengthFactors[from];
    return c / wm / freqFactors[to];
  } else {
    const fHz = value * freqFactors[from];
    return c / fHz / lengthFactors[to];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC FIELD STRENGTH (base: V/m)
// ─────────────────────────────────────────────────────────────────────────────
export const electricFieldStrengthUnits: UnitOption[] = [
  { value: "V/m", label: "Volt/meter (V/m)" },
  { value: "mV/m", label: "Millivolt/meter (mV/m)" },
  { value: "kV/m", label: "Kilovolt/meter (kV/m)" },
  { value: "MV/m", label: "Megavolt/meter (MV/m)" },
  { value: "V/cm", label: "Volt/centimeter (V/cm)" },
  { value: "V/mm", label: "Volt/millimeter (V/mm)" },
  { value: "V/μm", label: "Volt/micrometer (V/μm)" },
  { value: "N/C", label: "Newton/Coulomb (N/C)" },
  { value: "statV/cm", label: "Statvolt/cm (ESU)" },
];

export function convertElectricFieldStrength(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "V/m": 1,
    "mV/m": 1e-3,
    "kV/m": 1e3,
    "MV/m": 1e6,
    "V/cm": 100,
    "V/mm": 1000,
    "V/μm": 1e6,
    "N/C": 1,
    "statV/cm": 29979.2458,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC RESISTIVITY (base: Ω·m)
// ─────────────────────────────────────────────────────────────────────────────
export const electricResistivityUnits: UnitOption[] = [
  { value: "Ω·m", label: "Ohm-meter (Ω·m)" },
  { value: "Ω·cm", label: "Ohm-centimeter (Ω·cm)" },
  { value: "Ω·mm²/m", label: "Ω·mm²/m" },
  { value: "μΩ·cm", label: "Microohm-centimeter (μΩ·cm)" },
  { value: "μΩ·m", label: "Microohm-meter (μΩ·m)" },
  { value: "nΩ·m", label: "Nanoohm-meter (nΩ·m)" },
  { value: "Ω·in", label: "Ohm-inch" },
  { value: "Ω·ft", label: "Ohm-foot" },
];

export function convertElectricResistivity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "Ω·m": 1,
    "Ω·cm": 0.01,
    "Ω·mm²/m": 1e-6,
    "μΩ·cm": 1e-8,
    "μΩ·m": 1e-6,
    "nΩ·m": 1e-9,
    "Ω·in": 0.0254,
    "Ω·ft": 0.3048,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ELECTRIC CONDUCTIVITY (base: S/m)
// ─────────────────────────────────────────────────────────────────────────────
export const electricConductivityUnits: UnitOption[] = [
  { value: "S/m", label: "Siemens/meter (S/m)" },
  { value: "kS/m", label: "Kilosiemens/meter (kS/m)" },
  { value: "MS/m", label: "Megasiemens/meter (MS/m)" },
  { value: "mS/m", label: "Millisiemens/meter (mS/m)" },
  { value: "μS/m", label: "Microsiemens/meter (μS/m)" },
  { value: "S/cm", label: "Siemens/cm (S/cm)" },
  { value: "mS/cm", label: "Millisiemens/cm (mS/cm)" },
  { value: "μS/cm", label: "Microsiemens/cm (μS/cm)" },
];

export function convertElectricConductivity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "S/m": 1,
    "kS/m": 1e3,
    "MS/m": 1e6,
    "mS/m": 1e-3,
    "μS/m": 1e-6,
    "S/cm": 100,
    "mS/cm": 0.1,
    "μS/cm": 1e-4,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETOMOTIVE FORCE (base: A·t)
// ─────────────────────────────────────────────────────────────────────────────
export const magnetomotiveForceUnits: UnitOption[] = [
  { value: "A·t", label: "Ampere-turn (A·t)" },
  { value: "kA·t", label: "Kiloampere-turn (kA·t)" },
  { value: "mA·t", label: "Milliampere-turn (mA·t)" },
  { value: "Gb", label: "Gilbert (Gb)" },
];

export function convertMagnetomotiveForce(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "A·t": 1,
    "kA·t": 1e3,
    "mA·t": 1e-3,
    Gb: 0.795774715,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIFIC VOLUME (base: m³/kg)
// ─────────────────────────────────────────────────────────────────────────────
export const specificVolumeUnits: UnitOption[] = [
  { value: "m³/kg", label: "m³/kg" },
  { value: "cm³/g", label: "cm³/g" },
  { value: "L/kg", label: "L/kg" },
  { value: "mL/g", label: "mL/g" },
  { value: "ft³/lb", label: "ft³/lb" },
  { value: "ft³/slug", label: "ft³/slug" },
  { value: "in³/lb", label: "in³/lb" },
  { value: "gal/lb", label: "gal/lb (US)" },
];

export function convertSpecificVolume(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "m³/kg": 1,
    "cm³/g": 0.001,
    "L/kg": 0.001,
    "mL/g": 0.001,
    "ft³/lb": 0.0624279606,
    "ft³/slug": 1.94032033,
    "in³/lb": 3.61273e-5,
    "gal/lb": 8.345404e-3,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// RAINFALL (base: mm)
// ─────────────────────────────────────────────────────────────────────────────
export const rainfallUnits: UnitOption[] = [
  { value: "mm", label: "Millimeter (mm)" },
  { value: "cm", label: "Centimeter (cm)" },
  { value: "m", label: "Meter (m)" },
  { value: "in", label: "Inch (in)" },
  { value: "ft", label: "Foot (ft)" },
  { value: "L/m²", label: "Liter/m² (L/m²)" },
];

export function convertRainfall(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    mm: 1,
    cm: 10,
    m: 1000,
    in: 25.4,
    ft: 304.8,
    "L/m²": 1,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// HUMIDITY (approximate, requires context)
// ─────────────────────────────────────────────────────────────────────────────
export const humidityUnits: UnitOption[] = [
  { value: "RH%", label: "Relative Humidity (%RH)" },
  { value: "AH g/m³", label: "Absolute Humidity (g/m³)" },
  { value: "SH g/kg", label: "Specific Humidity (g/kg)" },
  { value: "mixing ratio", label: "Mixing Ratio (g/kg)" },
];

export function convertHumidity(
  value: number,
  from: string,
  to: string,
  temperatureC: number = 20,
): number {
  // Saturation vapor density approximation at temperatureC
  const svd =
    (217 *
      (6.112 * Math.exp((17.67 * temperatureC) / (temperatureC + 243.5)))) /
    (temperatureC + 273.15);
  if (from === to) return value;
  let ahGm3: number;
  switch (from) {
    case "RH%":
      ahGm3 = (value / 100) * svd;
      break;
    case "AH g/m³":
      ahGm3 = value;
      break;
    case "SH g/kg":
    case "mixing ratio":
      ahGm3 = value * 1.2;
      break; // approx at sea level
    default:
      ahGm3 = value;
  }
  switch (to) {
    case "RH%":
      return (ahGm3 / svd) * 100;
    case "AH g/m³":
      return ahGm3;
    case "SH g/kg":
    case "mixing ratio":
      return ahGm3 / 1.2;
    default:
      return ahGm3;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PERMEABILITY (base: m²)
// ─────────────────────────────────────────────────────────────────────────────
export const permeabilityUnits: UnitOption[] = [
  { value: "m²", label: "Square Meter (m²)" },
  { value: "cm²", label: "Square Centimeter (cm²)" },
  { value: "mm²", label: "Square Millimeter (mm²)" },
  { value: "D", label: "Darcy (D)" },
  { value: "mD", label: "Millidarcy (mD)" },
  { value: "μD", label: "Microdarcy (μD)" },
  { value: "ft²", label: "Square Foot (ft²)" },
  { value: "in²", label: "Square Inch (in²)" },
];

export function convertPermeability(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "m²": 1,
    "cm²": 1e-4,
    "mm²": 1e-6,
    D: 9.869233e-13,
    mD: 9.869233e-16,
    μD: 9.869233e-19,
    "ft²": 0.09290304,
    "in²": 6.4516e-4,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// THERMAL RESISTANCE (base: K/W)
// ─────────────────────────────────────────────────────────────────────────────
export const thermalResistanceUnits: UnitOption[] = [
  { value: "K/W", label: "Kelvin/Watt (K/W)" },
  { value: "°C/W", label: "°C/Watt" },
  { value: "°F·h/BTU", label: "°F·h/BTU" },
  { value: "°F·s/BTU", label: "°F·s/BTU" },
  { value: "h·°F/BTU", label: "h·°F/BTU (same)" },
];

export function convertThermalResistance(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "K/W": 1,
    "°C/W": 1,
    "°F·h/BTU": 1.8956342,
    "°F·s/BTU": 5.265e-4,
    "h·°F/BTU": 1.8956342,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPERATURE INTERVAL (base: kelvin interval)
// ─────────────────────────────────────────────────────────────────────────────
export const temperatureIntervalUnits: UnitOption[] = [
  { value: "K", label: "Kelvin (K)" },
  { value: "°C", label: "Celsius (°C)" },
  { value: "°F", label: "Fahrenheit (°F)" },
  { value: "°R", label: "Rankine (°R)" },
  { value: "°Re", label: "Réaumur (°Re)" },
];

export function convertTemperatureInterval(
  value: number,
  from: string,
  to: string,
): number {
  const toK: Record<string, number> = {
    K: 1,
    "°C": 1,
    "°F": 5 / 9,
    "°R": 5 / 9,
    "°Re": 5 / 4,
  };
  const kVal = value * toK[from];
  return kVal / toK[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// SURFACE CHARGE DENSITY (base: C/m²)
// ─────────────────────────────────────────────────────────────────────────────
export const surfaceChargeDensityUnits: UnitOption[] = [
  { value: "C/m²", label: "C/m²" },
  { value: "mC/m²", label: "mC/m²" },
  { value: "μC/m²", label: "μC/m²" },
  { value: "nC/m²", label: "nC/m²" },
  { value: "mC/cm²", label: "mC/cm²" },
  { value: "μC/cm²", label: "μC/cm²" },
  { value: "C/ft²", label: "C/ft²" },
  { value: "C/in²", label: "C/in²" },
];

export function convertSurfaceChargeDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "C/m²": 1,
    "mC/m²": 1e-3,
    "μC/m²": 1e-6,
    "nC/m²": 1e-9,
    "mC/cm²": 10,
    "μC/cm²": 1e-2,
    "C/ft²": 10.7639,
    "C/in²": 1550.003,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// VOLUME CHARGE DENSITY (base: C/m³)
// ─────────────────────────────────────────────────────────────────────────────
export const volumeChargeDensityUnits: UnitOption[] = [
  { value: "C/m³", label: "C/m³" },
  { value: "mC/m³", label: "mC/m³" },
  { value: "μC/m³", label: "μC/m³" },
  { value: "C/cm³", label: "C/cm³" },
  { value: "C/ft³", label: "C/ft³" },
  { value: "C/in³", label: "C/in³" },
];

export function convertVolumeChargeDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "C/m³": 1,
    "mC/m³": 1e-3,
    "μC/m³": 1e-6,
    "C/cm³": 1e6,
    "C/ft³": 35.3147,
    "C/in³": 61023.7,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// LINEAR CHARGE DENSITY (base: C/m)
// ─────────────────────────────────────────────────────────────────────────────
export const linearChargeDensityUnits: UnitOption[] = [
  { value: "C/m", label: "C/m" },
  { value: "mC/m", label: "mC/m" },
  { value: "μC/m", label: "μC/m" },
  { value: "nC/m", label: "nC/m" },
  { value: "C/cm", label: "C/cm" },
  { value: "C/mm", label: "C/mm" },
  { value: "C/in", label: "C/in" },
  { value: "C/ft", label: "C/ft" },
];

export function convertLinearChargeDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "C/m": 1,
    "mC/m": 1e-3,
    "μC/m": 1e-6,
    "nC/m": 1e-9,
    "C/cm": 100,
    "C/mm": 1000,
    "C/in": 39.3701,
    "C/ft": 3.28084,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// CURRENT DENSITY (base: A/m²)
// ─────────────────────────────────────────────────────────────────────────────
export const surfaceCurrentDensityUnits: UnitOption[] = [
  { value: "A/m²", label: "A/m²" },
  { value: "mA/m²", label: "mA/m²" },
  { value: "kA/m²", label: "kA/m²" },
  { value: "A/cm²", label: "A/cm²" },
  { value: "mA/cm²", label: "mA/cm²" },
  { value: "A/in²", label: "A/in²" },
  { value: "A/ft²", label: "A/ft²" },
];

export function convertSurfaceCurrentDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "A/m²": 1,
    "mA/m²": 1e-3,
    "kA/m²": 1e3,
    "A/cm²": 1e4,
    "mA/cm²": 10,
    "A/in²": 1550.003,
    "A/ft²": 10.7639,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// FABRIC / TEXTILE
// ─────────────────────────────────────────────────────────────────────────────
export const fabricGsmUnits: UnitOption[] = [
  { value: "gsm", label: "GSM (g/m²)" },
  { value: "oz/yd²", label: "oz/yard²" },
  { value: "oz/ft²", label: "oz/foot²" },
  { value: "g/cm²", label: "g/cm²" },
  { value: "lb/yd²", label: "lb/yard²" },
];

export function convertFabricGsm(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    gsm: 1,
    "oz/yd²": 33.9057474,
    "oz/ft²": 305.152,
    "g/cm²": 10000,
    "lb/yd²": 542.49,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// HEIGHT / ANTHROPOMETRIC (base: cm)
// ─────────────────────────────────────────────────────────────────────────────
export const heightUnits: UnitOption[] = [
  { value: "cm", label: "Centimeter (cm)" },
  { value: "m", label: "Meter (m)" },
  { value: "mm", label: "Millimeter (mm)" },
  { value: "in", label: "Inch (in)" },
  { value: "ft", label: "Foot (ft)" },
  { value: "ft+in", label: "Feet+Inches (display only)" },
];

export function convertHeight(value: number, from: string, to: string): number {
  const factors: Record<string, number> = {
    cm: 1,
    m: 100,
    mm: 0.1,
    in: 2.54,
    ft: 30.48,
    "ft+in": 30.48, // treat as feet
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MOLAR FLOW RATE (base: mol/s)
// ─────────────────────────────────────────────────────────────────────────────
export const molarFlowUnits: UnitOption[] = [
  { value: "mol/s", label: "mol/second" },
  { value: "mol/min", label: "mol/minute" },
  { value: "mol/h", label: "mol/hour" },
  { value: "mmol/s", label: "mmol/second" },
  { value: "μmol/s", label: "μmol/second" },
  { value: "kmol/s", label: "kmol/second" },
  { value: "kmol/h", label: "kmol/hour" },
  { value: "lbmol/min", label: "lbmol/minute" },
  { value: "lbmol/h", label: "lbmol/hour" },
];

export function convertMolarFlow(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "mol/s": 1,
    "mol/min": 1 / 60,
    "mol/h": 1 / 3600,
    "mmol/s": 1e-3,
    "μmol/s": 1e-6,
    "kmol/s": 1e3,
    "kmol/h": 1 / 3.6,
    "lbmol/min": 7.5598728,
    "lbmol/h": 0.12599788,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// ANGULAR ACCELERATION (base: rad/s²)
// ─────────────────────────────────────────────────────────────────────────────
export const angularAccelerationUnits: UnitOption[] = [
  { value: "rad/s²", label: "rad/s²" },
  { value: "deg/s²", label: "degree/s²" },
  { value: "rev/s²", label: "revolution/s²" },
  { value: "rev/min²", label: "revolution/min²" },
  { value: "rad/min²", label: "rad/min²" },
];

export function convertAngularAcceleration(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "rad/s²": 1,
    "deg/s²": Math.PI / 180,
    "rev/s²": 2 * Math.PI,
    "rev/min²": (2 * Math.PI) / 3600,
    "rad/min²": 1 / 3600,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// HEAT DENSITY (base: J/m³)
// ─────────────────────────────────────────────────────────────────────────────
export const heatDensityUnits: UnitOption[] = [
  { value: "J/m³", label: "J/m³" },
  { value: "kJ/m³", label: "kJ/m³" },
  { value: "MJ/m³", label: "MJ/m³" },
  { value: "J/L", label: "J/Liter" },
  { value: "kJ/L", label: "kJ/Liter" },
  { value: "BTU/ft³", label: "BTU/ft³" },
  { value: "BTU/gal", label: "BTU/gallon (US)" },
  { value: "cal/cm³", label: "cal/cm³" },
  { value: "kcal/m³", label: "kcal/m³" },
];

export function convertHeatDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "J/m³": 1,
    "kJ/m³": 1000,
    "MJ/m³": 1e6,
    "J/L": 1000,
    "kJ/L": 1e6,
    "BTU/ft³": 37258.9458,
    "BTU/gal": 278714.729,
    "cal/cm³": 4184000,
    "kcal/m³": 4184,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// THERMAL EXPANSION (base: 1/K)
// ─────────────────────────────────────────────────────────────────────────────
export const thermalExpansionUnits: UnitOption[] = [
  { value: "1/K", label: "1/Kelvin (1/K)" },
  { value: "1/°C", label: "1/°Celsius (1/°C)" },
  { value: "1/°F", label: "1/°Fahrenheit (1/°F)" },
  { value: "1/°R", label: "1/Rankine (1/°R)" },
  { value: "ppm/K", label: "ppm/K" },
  { value: "ppm/°C", label: "ppm/°C" },
  { value: "ppm/°F", label: "ppm/°F" },
];

export function convertThermalExpansion(
  value: number,
  from: string,
  to: string,
): number {
  const toInvK: Record<string, number> = {
    "1/K": 1,
    "1/°C": 1,
    "1/°F": 1.8,
    "1/°R": 1.8,
    "ppm/K": 1e-6,
    "ppm/°C": 1e-6,
    "ppm/°F": 1.8e-6,
  };
  return (value * toInvK[from]) / toInvK[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// MASS FLUX DENSITY (base: kg/(m²·s))
// ─────────────────────────────────────────────────────────────────────────────
export const massFluxDensityUnits: UnitOption[] = [
  { value: "kg/(m²·s)", label: "kg/(m²·s)" },
  { value: "g/(m²·s)", label: "g/(m²·s)" },
  { value: "g/(cm²·s)", label: "g/(cm²·s)" },
  { value: "lb/(ft²·s)", label: "lb/(ft²·s)" },
  { value: "lb/(ft²·h)", label: "lb/(ft²·h)" },
  { value: "oz/(ft²·h)", label: "oz/(ft²·h)" },
];

export function convertMassFluxDensity(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = {
    "kg/(m²·s)": 1,
    "g/(m²·s)": 1e-3,
    "g/(cm²·s)": 10,
    "lb/(ft²·s)": 4.88242764,
    "lb/(ft²·h)": 1.35623e-3,
    "oz/(ft²·h)": 8.47644e-5,
  };
  return (value * factors[from]) / factors[to];
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER / CALCULATION UTILITIES (preserved + expanded)
// ─────────────────────────────────────────────────────────────────────────────

// Dew Point
export function calculateDewPoint(
  temperatureC: number,
  relativeHumidity: number,
): number {
  const a = 17.27;
  const b = 237.7;
  const alpha =
    (a * temperatureC) / (b + temperatureC) + Math.log(relativeHumidity / 100);
  return (b * alpha) / (a - alpha);
}

// BMI
export function calculateBMI(
  weight: number,
  height: number,
  weightUnit: string,
  heightUnit: string,
): number {
  const toKg: Record<string, number> = {
    kg: 1,
    lb: 0.45359237,
    g: 0.001,
    oz: 0.028349523,
    st: 6.35029318,
  };
  const toM: Record<string, number> = {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    in: 0.0254,
    ft: 0.3048,
  };
  const wKg = weight * (toKg[weightUnit] ?? 1);
  const hM = height * (toM[heightUnit] ?? 1);
  return wKg / (hM * hM);
}

// BMR (Mifflin-St Jeor)
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  sex: "male" | "female",
  weightUnit: string = "kg",
  heightUnit: string = "cm",
): number {
  const toKg: Record<string, number> = { kg: 1, lb: 0.45359237 };
  const toCm: Record<string, number> = { cm: 1, m: 100, in: 2.54, ft: 30.48 };
  const wKg = weight * (toKg[weightUnit] ?? 1);
  const hCm = height * (toCm[heightUnit] ?? 1);
  const base = 10 * wKg + 6.25 * hCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

// Running Pace
export function convertRunningPace(
  value: number,
  from: string,
  to: string,
): number {
  // convert to min/km first
  let minPerKm: number;
  switch (from) {
    case "min/km":
      minPerKm = value;
      break;
    case "min/mi":
      minPerKm = value * 0.6213711922;
      break;
    case "km/h":
      minPerKm = 60 / value;
      break;
    case "mph":
      minPerKm = 60 / (value * 1.609344);
      break;
    case "m/s":
      minPerKm = 1000 / (value * 60);
      break;
    default:
      minPerKm = value;
  }
  switch (to) {
    case "min/km":
      return minPerKm;
    case "min/mi":
      return minPerKm / 0.6213711922;
    case "km/h":
      return 60 / minPerKm;
    case "mph":
      return 60 / minPerKm / 1.609344;
    case "m/s":
      return 1000 / (minPerKm * 60);
    default:
      return minPerKm;
  }
}

// Planet weight
export const planetGravities: Record<string, number> = {
  Earth: 9.807,
  Moon: 1.62,
  Mars: 3.721,
  Venus: 8.87,
  Jupiter: 24.79,
  Saturn: 10.44,
  Uranus: 8.69,
  Neptune: 11.15,
  Mercury: 3.7,
  Pluto: 0.62,
  Sun: 274,
};

export function calculatePlanetWeight(
  weight: number,
  fromPlanet: string,
  toPlanet: string,
): number {
  return (weight / planetGravities[fromPlanet]) * planetGravities[toPlanet];
}

// Age calculation
export function calculateAge(
  birthDate: Date,
  targetDate: Date = new Date(),
): { years: number; months: number; days: number } {
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();
  if (days < 0) {
    months--;
    days += new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      0,
    ).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

// Time Duration
export function calculateTimeDuration(
  start: Date,
  end: Date,
): { days: number; hours: number; minutes: number; seconds: number } {
  const diff = Math.abs(end.getTime() - start.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

// Unix Timestamp
export function unixTimestampToDate(timestamp: number | string): Date {
  const ts = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
  return new Date(ts * 1000);
}
export function dateToUnixTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

// Calorie Burn (MET-based)
export function calculateCalorieBurn(
  weightKg: number,
  met: number,
  durationMin: number,
): number {
  return met * weightKg * (durationMin / 60);
}
export const metValues: Record<string, number> = {
  "Sitting (rest)": 1,
  Standing: 1.3,
  "Walking (2 mph)": 2.5,
  "Walking (3 mph)": 3.5,
  "Walking (4 mph)": 5,
  "Running (5 mph)": 8,
  "Running (6 mph)": 9.8,
  "Running (7.5 mph)": 11,
  "Running (9 mph)": 13,
  "Cycling (light)": 6,
  "Cycling (12–14 mph)": 8,
  "Cycling (vigorous)": 12,
  "Swimming (moderate)": 6,
  "Swimming (vigorous)": 10,
  Yoga: 2.5,
  Pilates: 3,
  "Weight lifting (light)": 3,
  "Weight lifting (vigorous)": 6,
  HIIT: 8,
  "Dancing (aerobic)": 5,
  Hiking: 6,
  "Rock climbing": 8,
  "Jump rope": 10,
  "Rowing (vigorous)": 8.5,
};

// Color Conversions
export function hexToRgb(
  hex: string,
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
export function rgbToCmyk(
  r: number,
  g: number,
  b: number,
): { c: number; m: number; y: number; k: number } {
  const rp = r / 255,
    gp = g / 255,
    bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rp - k) / (1 - k)) * 100),
    m: Math.round(((1 - gp - k) / (1 - k)) * 100),
    y: Math.round(((1 - bp - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}
export function cmykToRgb(
  c: number,
  m: number,
  y: number,
  k: number,
): { r: number; g: number; b: number } {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}
export function rgbToHsv(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, v: v * 100 };
}

// Frequency → Musical Note
const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
export function frequencyToNote(frequency: number): {
  note: string;
  octave: number;
  cents: number;
} {
  const A4 = 440;
  const semitones = 12 * Math.log2(frequency / A4);
  const rounded = Math.round(semitones);
  const noteIndex = ((rounded % 12) + 12) % 12;
  const octave = Math.floor((rounded + 9) / 12) + 4;
  const cents = Math.round((semitones - rounded) * 100);
  return { note: noteNames[noteIndex], octave, cents };
}
export function noteToFrequency(note: string, octave: number): number {
  const idx = noteNames.indexOf(note);
  const semitones = (octave - 4) * 12 + idx - 9;
  return 440 * Math.pow(2, semitones / 12);
}

// Image/Print utilities
export function calculatePrintSize(pixels: number, dpi: number): number {
  return pixels / dpi;
}
export function calculatePixels(sizeInch: number, dpi: number): number {
  return sizeInch * dpi;
}

// Audio
export function calculateAudioFileSize(
  bitrateKbps: number,
  durationSeconds: number,
): number {
  return (bitrateKbps * 1000 * durationSeconds) / 8;
}

// Video
export function calculateTotalFrames(
  durationSeconds: number,
  fps: number,
): number {
  return Math.round(durationSeconds * fps);
}

// Cooking
export const ingredientDensities: Record<string, number> = {
  "Flour (all-purpose)": 125,
  "Flour (bread)": 130,
  "Flour (cake)": 114,
  "Flour (whole wheat)": 120,
  "Sugar (white, granulated)": 200,
  "Sugar (powdered)": 120,
  "Sugar (brown, packed)": 220,
  "Salt (table)": 292,
  "Salt (kosher)": 144,
  Butter: 227,
  Shortening: 190,
  "Oil (vegetable)": 218,
  Honey: 340,
  "Maple Syrup": 322,
  "Milk (whole)": 245,
  "Milk (skim)": 245,
  Water: 237,
  "Cream (heavy)": 238,
  Yogurt: 245,
  "Rice (uncooked, white)": 185,
  "Rice (uncooked, brown)": 185,
  "Oats (rolled)": 90,
  "Oats (quick)": 85,
  "Cocoa Powder": 85,
  "Baking Powder": 192,
  "Baking Soda": 220,
  Cornstarch: 128,
  "Breadcrumbs (dry)": 108,
  "Almond Flour": 96,
  "Coconut Flour": 112,
  "Protein Powder": 88,
};
export function cupsToGrams(cups: number, ingredient: string): number {
  return cups * (ingredientDensities[ingredient] ?? 200);
}
export function calculateHydration(flour: number, water: number): number {
  return (water / flour) * 100;
}

// Numeral system conversion
export function decimalToBinary(n: number): string {
  return (n >>> 0).toString(2);
}
export function decimalToOctal(n: number): string {
  return (n >>> 0).toString(8);
}
export function decimalToHex(n: number): string {
  return (n >>> 0).toString(16).toUpperCase();
}
export function binaryToDecimal(s: string): number {
  return parseInt(s, 2);
}
export function octalToDecimal(s: string): number {
  return parseInt(s, 8);
}
export function hexToDecimal(s: string): number {
  return parseInt(s, 16);
}

// Apparent Magnitude
export function magnitudeToLuminosity(
  apparentMag: number,
  distancePc: number,
): number {
  const absoluteMag = apparentMag - 5 * Math.log10(distancePc / 10);
  return Math.pow(10, (4.83 - absoluteMag) / 2.5);
}

// Concrete Volume (slab)
export function calculateConcreteVolume(
  length: number,
  width: number,
  depth: number,
): number {
  return length * width * depth;
}

// Bricks
export function calculateBricksNeeded(
  wallArea: number,
  brickLength: number,
  brickHeight: number,
  mortarThickness: number = 10,
  wastePct: number = 5,
): number {
  const brickArea =
    (brickLength + mortarThickness) * (brickHeight + mortarThickness);
  return Math.ceil(((wallArea * 1e6) / brickArea) * (1 + wastePct / 100));
}

// Tiles
export function calculateTilesNeeded(
  roomArea: number,
  tileLength: number,
  tileWidth: number,
  wastePct: number = 10,
): number {
  const tileArea = tileLength * tileWidth;
  return Math.ceil(((roomArea * 1e4) / tileArea) * (1 + wastePct / 100));
}

// Board feet
export function calculateBoardFeet(
  thickness: number,
  width: number,
  length: number,
): number {
  return (thickness * width * length) / 144;
}

// Horsepower to animal comparison
export const animalPower: Record<string, number> = {
  Horse: 1,
  "Human (average)": 0.15,
  "Human (peak)": 0.6,
  Elephant: 8,
  Dog: 0.1,
  Cat: 0.03,
  Hamster: 0.00015,
  Chicken: 0.002,
  Bee: 0.000001,
  Ant: 0.000000015,
};
export function horsepowerToAnimals(hp: number, animal: string): number {
  return hp / (animalPower[animal] ?? 1);
}

// Sourdough / baker's percentage
export function bakerPercentage(
  ingredientGrams: number,
  flourGrams: number,
): number {
  return (ingredientGrams / flourGrams) * 100;
}

// Thread Count
export const threadCountUnits: UnitOption[] = [
  { value: "TC", label: "Thread Count (per in²)" },
  { value: "TC/cm²", label: "Thread Count (per cm²)" },
];

export function convertThreadCount(
  value: number,
  from: string,
  to: string,
): number {
  const factors: Record<string, number> = { TC: 1, "TC/cm²": 6.4516 };
  return (value * factors[from]) / factors[to];
}
