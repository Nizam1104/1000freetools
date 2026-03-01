"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function WavelengthPage() {
  const config = converterMappings["Wavelength"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Wavelength"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Wavelength Converter</h1>
        <p className="text-muted-foreground">Convert wavelength units and calculate frequency across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online wavelength converter for optics and physics.</p>
      </div>
      <UnitConverterBase
        title="Wavelength Converter"
        description="Convert wavelength units and calculate frequency across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online wavelength converter for optics and physics."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Wavelength</h2>
          <p className="text-muted-foreground mb-4">
            Wavelength measures the distance between consecutive peaks of a wave. You express wavelength in meters or subunits like nanometers for light. Wavelength determines the color of visible light and the energy of photons.
          </p>
          <p className="text-muted-foreground mb-4">
            Wavelength and frequency are inversely related. Shorter wavelength means higher frequency and higher photon energy. The electromagnetic spectrum spans from radio waves (kilometers) to gamma rays (picometers).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Wavelength Formulas</h2>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">λ = c / f</p>
            <p className="text-muted-foreground text-sm">
              Wavelength-frequency relationship: Wavelength equals speed of light divided by frequency. c = 299,792,458 m/s in vacuum.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">E = h × c / λ</p>
            <p className="text-muted-foreground text-sm">
              Photon energy: Energy equals Planck constant times speed of light divided by wavelength. E in joules or electronvolts.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm mb-2">λ = λ₀ / n</p>
            <p className="text-muted-foreground text-sm">
              Wavelength in medium: Wavelength in material equals vacuum wavelength divided by refractive index.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: Green light at 550 nm has frequency f = 299,792,458 / 550 × 10⁻⁹ = 545 THz and photon energy E = 2.25 eV.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Wavelength Conversions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Meters (m)</th>
                  <th className="border border-border p-2 text-left">Nanometers (nm)</th>
                  <th className="border border-border p-2 text-left">Micrometers (μm)</th>
                  <th className="border border-border p-2 text-left">Angstroms (Å)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻¹⁰</td>
                  <td className="border border-border p-2">0.1</td>
                  <td className="border border-border p-2">0.0001</td>
                  <td className="border border-border p-2">1</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁹</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">0.001</td>
                  <td className="border border-border p-2">10</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻⁶</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">10,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1 × 10⁻³</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">1,000</td>
                  <td className="border border-border p-2">10,000,000</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">1</td>
                  <td className="border border-border p-2">1 × 10⁹</td>
                  <td className="border border-border p-2">1,000,000</td>
                  <td className="border border-border p-2">10,000,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Electromagnetic Spectrum Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Region</th>
                  <th className="border border-border p-2 text-left">Wavelength Range</th>
                  <th className="border border-border p-2 text-left">Frequency Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Radio Waves</td>
                  <td className="border border-border p-2">1 mm - 100 km</td>
                  <td className="border border-border p-2">3 kHz - 300 GHz</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Microwave</td>
                  <td className="border border-border p-2">1 mm - 1 m</td>
                  <td className="border border-border p-2">300 MHz - 300 GHz</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Infrared</td>
                  <td className="border border-border p-2">700 nm - 1 mm</td>
                  <td className="border border-border p-2">300 GHz - 430 THz</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Visible Light</td>
                  <td className="border border-border p-2">380-750 nm</td>
                  <td className="border border-border p-2">400-790 THz</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Ultraviolet</td>
                  <td className="border border-border p-2">10-380 nm</td>
                  <td className="border border-border p-2">790 THz - 30 PHz</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">X-rays</td>
                  <td className="border border-border p-2">0.01-10 nm</td>
                  <td className="border border-border p-2">30 PHz - 30 EHz</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Gamma Rays</td>
                  <td className="border border-border p-2">&lt;0.01 nm</td>
                  <td className="border border-border p-2">&gt;30 EHz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Visible Light Wavelengths</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Color</th>
                  <th className="border border-border p-2 text-left">Wavelength (nm)</th>
                  <th className="border border-border p-2 text-left">Frequency (THz)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Violet</td>
                  <td className="border border-border p-2">380-450</td>
                  <td className="border border-border p-2">670-790</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Blue</td>
                  <td className="border border-border p-2">450-495</td>
                  <td className="border border-border p-2">606-670</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Green</td>
                  <td className="border border-border p-2">495-570</td>
                  <td className="border border-border p-2">526-606</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Yellow</td>
                  <td className="border border-border p-2">570-590</td>
                  <td className="border border-border p-2">508-526</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Orange</td>
                  <td className="border border-border p-2">590-620</td>
                  <td className="border border-border p-2">484-508</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Red</td>
                  <td className="border border-border p-2">620-750</td>
                  <td className="border border-border p-2">400-484</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Fiber Optic Communications</h3>
              <p className="text-muted-foreground text-sm">
                Telecommunications use 1,310 nm and 1,550 nm wavelengths. These wavelengths minimize fiber attenuation. Dense wavelength division multiplexing carries multiple channels.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Spectroscopy</h3>
              <p className="text-muted-foreground text-sm">
                Chemical analysis uses absorption at specific wavelengths. UV-Vis spectroscopy covers 190-1,100 nm. Infrared spectroscopy identifies molecular bonds.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Laser Applications</h3>
              <p className="text-muted-foreground text-sm">
                Different wavelengths suit different applications. CO2 lasers at 10.6 μm cut materials. Argon lasers at 488/514 nm suit fluorescence. Diode lasers span visible to infrared.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Remote Sensing</h3>
              <p className="text-muted-foreground text-sm">
                Satellite sensors measure reflected wavelengths. Vegetation reflects strongly at 800 nm. Water absorbs infrared, appearing dark in those bands.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do you convert wavelength to frequency?</h3>
              <p className="text-muted-foreground text-sm">
                Use f = c/λ where c is the speed of light (299,792,458 m/s). For wavelength in nanometers, f(Hz) = 299,792,458 × 10⁹ / λ(nm).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is an angstrom?</h3>
              <p className="text-muted-foreground text-sm">
                Angstrom equals 10⁻¹⁰ meters or 0.1 nanometers. Named after physicist Anders Ångström. Common in atomic physics and crystallography.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why is the sky blue?</h3>
              <p className="text-muted-foreground text-sm">
                Rayleigh scattering affects shorter wavelengths more strongly. Blue light (450 nm) scatters about 4 times more than red light (650 nm). This scattered blue light reaches your eyes from all directions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does wavelength affect photon energy?</h3>
              <p className="text-muted-foreground text-sm">
                Energy is inversely proportional to wavelength. E = hc/λ. Violet photons (400 nm) have about twice the energy of infrared photons (800 nm).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
