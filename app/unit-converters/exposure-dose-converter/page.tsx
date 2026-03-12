"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function ExposureDoseConverterPage() {
  const config = converterMappings["Exposure Dose Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Exposure Dose Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Radiation Exposure Dose Converter</h1>
        <p className="text-muted-foreground">Convert radiation exposure dose units — roentgens, coulombs/kg, milliroentgens, and more. Free online exposure dose converter for radiology, health physics, and radiation protection.</p>
      </div>
      <UnitConverterBase
        title="Radiation Exposure Dose Converter"
        description="Convert radiation exposure dose units — roentgens, coulombs/kg, milliroentgens, and more. Free online exposure dose converter for radiology, health physics, and radiation protection."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Radiation Exposure</h2>
          <p className="text-muted-foreground mb-4">
            Radiation exposure measures the ionization produced in air by X-rays or gamma rays. Unlike absorbed dose (which measures energy deposited in tissue), exposure quantifies the radiation field itself. Exposure applies only to photons (X-rays and gamma rays) in air, not to particles or other materials.
          </p>
          <p className="text-muted-foreground">
            The roentgen (R) is the traditional unit, defined as the amount of radiation that produces one electrostatic unit of charge per cubic centimeter of dry air. The SI unit is coulomb per kilogram (C/kg), which directly measures the charge produced per mass of air.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Exposure Definition and Formula</h2>
          <p className="text-muted-foreground mb-4">
            Exposure is defined as charge produced per unit mass of air:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">X = Q / m</p>
            <p className="text-sm text-muted-foreground mt-2">where X = exposure (C/kg), Q = total charge of ions (C), m = mass of air (kg)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Unit relationship:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">1 R = 2.58 × 10⁻⁴ C/kg</p>
            <p className="font-mono text-sm">1 C/kg = 3,876 R</p>
          </div>
          <p className="text-muted-foreground">
            The exact conversion factor 2.58 × 10⁻⁴ C/kg per roentgen comes from the definition: 1 R produces 1 esu/cm³ of air, and air density at STP is 0.001293 g/cm³.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Exposure Rate</h2>
          <p className="text-muted-foreground mb-4">
            Exposure rate measures exposure per unit time, important for radiation safety:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Ẋ = X / t</p>
            <p className="text-sm text-muted-foreground mt-2">where Ẋ = exposure rate (R/h or C/kg·s), X = exposure, t = time</p>
          </div>
          <p className="text-muted-foreground mb-4">
            For a point source, exposure rate follows the inverse square law:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">Ẋ = Γ × A / d²</p>
            <p className="text-sm text-muted-foreground mt-2">where Γ = specific gamma ray constant, A = source activity, d = distance from source</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: A 1 Ci Co-60 source (Γ = 1.32 R·m²/h·Ci) at 1 meter:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">Ẋ = 1.32 × 1 / 1² = 1.32 R/h</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Exposure to Dose Conversion</h2>
          <p className="text-muted-foreground mb-4">
            Convert exposure in air to absorbed dose in tissue using f-factors:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">D = X × f</p>
            <p className="text-sm text-muted-foreground mt-2">where D = absorbed dose (rad or Gy), X = exposure (R), f = conversion factor</p>
          </div>
          <p className="text-muted-foreground mb-4">
            F-factors for common materials (rad per R):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Material</th>
                  <th className="border border-border p-3 text-left">f-factor (rad/R)</th>
                  <th className="border border-border p-3 text-left">f-factor (Gy/C·kg⁻¹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Air</td>
                  <td className="border border-border p-3">0.876</td>
                  <td className="border border-border p-3">33.97</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Soft tissue (muscle)</td>
                  <td className="border border-border p-3">0.96</td>
                  <td className="border border-border p-3">37.2</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Bone (cortical)</td>
                  <td className="border border-border p-3">1.7 to 4.0</td>
                  <td className="border border-border p-3">65 to 155</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Fat</td>
                  <td className="border border-border p-3">0.92</td>
                  <td className="border border-border p-3">35.6</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Water</td>
                  <td className="border border-border p-3">0.97</td>
                  <td className="border border-border p-3">37.6</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4">
            Example: 100 R exposure to soft tissue:
          </p>
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="font-mono text-sm">D = 100 R × 0.96 rad/R = 96 rad = 0.96 Gy</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Typical Exposure Levels</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Source/Situation</th>
                  <th className="border border-border p-3 text-left">Exposure (mR)</th>
                  <th className="border border-border p-3 text-left">Exposure (μC/kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Natural background (annual, US)</td>
                  <td className="border border-border p-3">310 mR (3.1 mSv equivalent)</td>
                  <td className="border border-border p-3">80</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Chest X-ray (PA view)</td>
                  <td className="border border-border p-3">10 to 30</td>
                  <td className="border border-border p-3">2.6 to 7.7</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Dental X-ray (periapical)</td>
                  <td className="border border-border p-3">50 to 100</td>
                  <td className="border border-border p-3">13 to 26</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Mammography (per view)</td>
                  <td className="border border-border p-3">300 to 600</td>
                  <td className="border border-border p-3">77 to 155</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">CT head (axial)</td>
                  <td className="border border-border p-3">2,000 to 4,000</td>
                  <td className="border border-border p-3">516 to 1,032</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">CT abdomen</td>
                  <td className="border border-border p-3">3,000 to 8,000</td>
                  <td className="border border-border p-3">774 to 2,064</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Fluoroscopy (per minute)</td>
                  <td className="border border-border p-3">20 to 50</td>
                  <td className="border border-border p-3">5.2 to 13</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Transatlantic flight</td>
                  <td className="border border-border p-3">3 to 5</td>
                  <td className="border border-border p-3">0.8 to 1.3</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Nuclear medicine (Tc-99m bone scan)</td>
                  <td className="border border-border p-3">Internal dose, not exposure</td>
                  <td className="border border-border p-3">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Radiation Protection Limits</h2>
          <p className="text-muted-foreground mb-4">
            Regulatory exposure limits for radiation workers and public:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Category</th>
                  <th className="border border-border p-3 text-left">Annual Limit (R)</th>
                  <th className="border border-border p-3 text-left">Annual Limit (C/kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Occupational (whole body)</td>
                  <td className="border border-border p-3">5 R (5 rem equivalent)</td>
                  <td className="border border-border p-3">1.29 × 10⁻³</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Occupational (lens of eye)</td>
                  <td className="border border-border p-3">15 R</td>
                  <td className="border border-border p-3">3.87 × 10⁻³</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Occupational (skin, extremities)</td>
                  <td className="border border-border p-3">50 R</td>
                  <td className="border border-border p-3">1.29 × 10⁻²</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Public (continuous)</td>
                  <td className="border border-border p-3">0.1 R (100 mR)</td>
                  <td className="border border-border p-3">2.58 × 10⁻⁵</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Public (infrequent)</td>
                  <td className="border border-border p-3">0.5 R (500 mR)</td>
                  <td className="border border-border p-3">1.29 × 10⁻⁴</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between exposure units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 R = 2.58 × 10⁻⁴ C/kg = 258 μC/kg</li>
            <li>1 C/kg = 3,876 R</li>
            <li>1 mR = 0.258 μC/kg</li>
            <li>1 μR = 2.58 × 10⁻¹⁰ C/kg</li>
            <li>1 kR = 0.258 C/kg</li>
            <li>1 μC/kg = 3.876 mR</li>
            <li>1 mC/kg = 3.876 R</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            Exposure to absorbed dose in air:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 R = 0.876 rad in air = 8.76 mGy in air</li>
            <li>1 C/kg = 33.97 Gy in air</li>
          </ul>
          <p className="text-muted-foreground">
            Exposure to equivalent dose in soft tissue (approximate for gamma rays):
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>1 R ≈ 0.96 rem ≈ 9.6 mSv in soft tissue</li>
            <li>1 mR ≈ 0.01 mSv ≈ 10 μSv</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Measurement Instruments</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li><strong>Ionization chambers:</strong> Direct exposure measurement, used for calibration and area monitoring</li>
            <li><strong>Geiger-Mueller counters:</strong> Detect radiation, calibrated to read exposure rate</li>
            <li><strong>Electrometers:</strong> Measure charge collected in ionization chambers</li>
            <li><strong>Free-air chambers:</strong> Primary standard for roentgen realization</li>
            <li><strong>Thermoluminescent dosimeters (TLD):</strong> Measure cumulative exposure</li>
            <li><strong>Optically stimulated luminescence (OSL):</strong> Personal dosimetry</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Exposure Measurement</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Diagnostic radiology quality assurance</li>
            <li>Radiation therapy beam calibration</li>
            <li>Area monitoring in nuclear facilities</li>
            <li>Environmental radiation surveillance</li>
            <li>X-ray equipment performance testing</li>
            <li>Radiation protection surveys</li>
            <li>Calibration of radiation detectors</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between exposure and dose?</h3>
            <p className="text-muted-foreground">
              Exposure measures ionization in air produced by X-rays or gamma rays. Dose measures energy absorbed in tissue. Exposure describes the radiation field; dose describes the effect on material. For gamma rays in soft tissue, 1 R exposure produces approximately 0.96 rad (9.6 mGy) absorbed dose.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is the roentgen still used?</h3>
            <p className="text-muted-foreground">
              The roentgen was the first radiation unit (1928) and remains in use for X-ray and gamma ray measurements. Many survey meters and dosimeters are calibrated in roentgens. While SI units (C/kg) are preferred, the roentgen provides convenient numbers for typical radiation levels. One mR approximates 10 μSv equivalent dose, making risk estimation straightforward.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Can exposure be measured for beta or neutron radiation?</h3>
            <p className="text-muted-foreground">
              No. Exposure is defined only for X-rays and gamma rays in air. Beta particles and neutrons do not produce the same ionization pattern in air. For these radiations, use absorbed dose (Gy or rad) or equivalent dose (Sv or rem) measured with appropriate detectors like tissue-equivalent proportional counters or neutron rem meters.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I convert mR to mSv?</h3>
            <p className="text-muted-foreground">
              For gamma rays and X-rays, 1 mR exposure produces approximately 0.01 mSv (10 μSv) equivalent dose in soft tissue. This approximation works because the radiation weighting factor is 1 for photons, and the f-factor for tissue is close to 1. Example: 50 mR exposure equals approximately 0.5 mSv equivalent dose.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
