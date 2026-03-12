"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function FrequencyPage() {
  const config = converterMappings["Frequency"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Frequency"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Frequency Converter</h1>
        <p className="text-muted-foreground">Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics, audio engineering, and signal processing.</p>
      </div>
      <UnitConverterBase
        title="Frequency Converter"
        description="Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics, audio engineering, and signal processing."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Frequency</h2>
          <p className="text-muted-foreground mb-4">
            Frequency measures how often a periodic event repeats per unit time. In physics and engineering, frequency describes oscillations, waves, and rotations. The hertz (Hz) is the SI unit, equal to one cycle per second. Frequency is fundamental to audio, radio, computing, and many other technologies.
          </p>
          <p className="text-muted-foreground">
            Frequency and period are inverses: higher frequency means shorter period. A 100 Hz signal completes 100 cycles each second, with each cycle lasting 0.01 seconds (10 milliseconds).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequency and Period Relationship</h2>
          <p className="text-muted-foreground mb-4">
            Frequency equals the reciprocal of period:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">f = 1 / T</p>
            <p className="text-sm text-muted-foreground mt-2">where f = frequency (Hz), T = period (seconds)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: AC power at 60 Hz has a period of:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">T = 1 / 60 = 0.0167 seconds = 16.7 milliseconds</p>
          </div>
          <p className="text-muted-foreground">
            Example: A CPU clock with 2 ns (nanosecond) period operates at:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">f = 1 / (2 × 10⁻⁹) = 500,000,000 Hz = 500 MHz</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequency and Wavelength</h2>
          <p className="text-muted-foreground mb-4">
            For electromagnetic waves, frequency relates to wavelength through the speed of light:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">c = f × λ</p>
            <p className="font-mono text-sm">f = c / λ</p>
            <p className="text-sm text-muted-foreground mt-2">where c = speed of light (299,792,458 m/s), f = frequency (Hz), λ = wavelength (m)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: FM radio at 100 MHz has a wavelength of:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">λ = 299,792,458 / 100,000,000 = 2.998 meters</p>
          </div>
          <p className="text-muted-foreground">
            Example: WiFi at 2.4 GHz has a wavelength of:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">λ = 299,792,458 / 2,400,000,000 = 0.125 meters = 12.5 cm</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Angular Frequency</h2>
          <p className="text-muted-foreground mb-4">
            Angular frequency (ω) measures rotation rate in radians per second:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">ω = 2π × f</p>
            <p className="font-mono text-sm">f = ω / (2π)</p>
            <p className="text-sm text-muted-foreground mt-2">where ω = angular frequency (rad/s), f = frequency (Hz)</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Example: 60 Hz AC power has angular frequency of:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-mono text-sm">ω = 2π × 60 = 377 rad/s</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Audio Frequency Spectrum</h2>
          <p className="text-muted-foreground mb-4">
            Human hearing spans approximately 20 Hz to 20,000 Hz (20 kHz):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Frequency Range</th>
                  <th className="border border-border p-3 text-left">Description</th>
                  <th className="border border-border p-3 text-left">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">20 to 60 Hz</td>
                  <td className="border border-border p-3">Sub-bass</td>
                  <td className="border border-border p-3">Earthquake rumble, kick drum fundamental</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">60 to 250 Hz</td>
                  <td className="border border-border p-3">Bass</td>
                  <td className="border border-border p-3">Bass guitar, male voice fundamental</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">250 to 500 Hz</td>
                  <td className="border border-border p-3">Low midrange</td>
                  <td className="border border-border p-3">Lower harmonics of most instruments</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">500 Hz to 2 kHz</td>
                  <td className="border border-border p-3">Midrange</td>
                  <td className="border border-border p-3">Human speech intelligibility</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">2 to 4 kHz</td>
                  <td className="border border-border p-3">High midrange</td>
                  <td className="border border-border p-3">Human ear sensitivity peak</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">4 to 6 kHz</td>
                  <td className="border border-border p-3">Presence</td>
                  <td className="border border-border p-3">Speech consonants, instrument attack</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">6 to 20 kHz</td>
                  <td className="border border-border p-3">Brilliance</td>
                  <td className="border border-border p-3">Cymbals, air, sparkle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Radio Frequency Bands</h2>
          <p className="text-muted-foreground mb-4">
            The electromagnetic spectrum is divided into bands for different applications:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Band</th>
                  <th className="border border-border p-3 text-left">Frequency Range</th>
                  <th className="border border-border p-3 text-left">Wavelength</th>
                  <th className="border border-border p-3 text-left">Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">VLF</td>
                  <td className="border border-border p-3">3 to 30 kHz</td>
                  <td className="border border-border p-3">100 to 10 km</td>
                  <td className="border border-border p-3">Submarine communication</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">LF</td>
                  <td className="border border-border p-3">30 to 300 kHz</td>
                  <td className="border border-border p-3">10 to 1 km</td>
                  <td className="border border-border p-3">Navigation, time signals</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">MF</td>
                  <td className="border border-border p-3">300 kHz to 3 MHz</td>
                  <td className="border border-border p-3">1 km to 100 m</td>
                  <td className="border border-border p-3">AM radio broadcasting</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">HF</td>
                  <td className="border border-border p-3">3 to 30 MHz</td>
                  <td className="border border-border p-3">100 to 10 m</td>
                  <td className="border border-border p-3">Shortwave radio, amateur radio</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">VHF</td>
                  <td className="border border-border p-3">30 to 300 MHz</td>
                  <td className="border border-border p-3">10 to 1 m</td>
                  <td className="border border-border p-3">FM radio, TV, aviation</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">UHF</td>
                  <td className="border border-border p-3">300 MHz to 3 GHz</td>
                  <td className="border border-border p-3">1 m to 10 cm</td>
                  <td className="border border-border p-3">TV, mobile phones, GPS, WiFi</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">SHF</td>
                  <td className="border border-border p-3">3 to 30 GHz</td>
                  <td className="border border-border p-3">10 to 1 cm</td>
                  <td className="border border-border p-3">Microwave, radar, satellite, 5G</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">EHF</td>
                  <td className="border border-border p-3">30 to 300 GHz</td>
                  <td className="border border-border p-3">1 cm to 1 mm</td>
                  <td className="border border-border p-3">Millimeter wave, radio astronomy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Frequency References</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Source</th>
                  <th className="border border-border p-3 text-left">Frequency</th>
                  <th className="border border-border p-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">AC power (North America)</td>
                  <td className="border border-border p-3">60 Hz</td>
                  <td className="border border-border p-3">50 Hz in Europe and most of world</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Human hearing range</td>
                  <td className="border border-border p-3">20 Hz to 20 kHz</td>
                  <td className="border border-border p-3">Decreases with age</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Musical note A4</td>
                  <td className="border border-border p-3">440 Hz</td>
                  <td className="border border-border p-3">Standard tuning pitch</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">Middle C (C4)</td>
                  <td className="border border-border p-3">261.63 Hz</td>
                  <td className="border border-border p-3">Piano middle C</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">AM radio band</td>
                  <td className="border border-border p-3">530 to 1700 kHz</td>
                  <td className="border border-border p-3">10 kHz channel spacing</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">FM radio band</td>
                  <td className="border border-border p-3">88 to 108 MHz</td>
                  <td className="border border-border p-3">200 kHz channel spacing</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">WiFi 2.4 GHz</td>
                  <td className="border border-border p-3">2.4 to 2.5 GHz</td>
                  <td className="border border-border p-3">Channels 1 to 14</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">WiFi 5 GHz</td>
                  <td className="border border-border p-3">5.15 to 5.85 GHz</td>
                  <td className="border border-border p-3">More channels, less range</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Bluetooth</td>
                  <td className="border border-border p-3">2.4 to 2.4835 GHz</td>
                  <td className="border border-border p-3">Frequency hopping</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">GPS L1</td>
                  <td className="border border-border p-3">1575.42 MHz</td>
                  <td className="border border-border p-3">Civilian GPS signal</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">CPU clock (typical)</td>
                  <td className="border border-border p-3">2 to 5 GHz</td>
                  <td className="border border-border p-3">Modern processors</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">DDR4 RAM</td>
                  <td className="border border-border p-3">1.6 to 3.2 GHz</td>
                  <td className="border border-border p-3">Data rate up to 6400 MT/s</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Microwave oven</td>
                  <td className="border border-border p-3">2.45 GHz</td>
                  <td className="border border-border p-3">Water molecule resonance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">RPM to Hz Conversion</h2>
          <p className="text-muted-foreground mb-4">
            Rotational speed in RPM (revolutions per minute) converts to Hz:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-mono text-sm">f (Hz) = RPM / 60</p>
            <p className="font-mono text-sm">RPM = f (Hz) × 60</p>
          </div>
          <p className="text-muted-foreground mb-4">
            Common conversions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">RPM</th>
                  <th className="border border-border p-3 text-left">Hz</th>
                  <th className="border border-border p-3 text-left">Application</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">1</td>
                  <td className="border border-border p-3">1 revolution per second</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">300</td>
                  <td className="border border-border p-3">5</td>
                  <td className="border border-border p-3">Slow motor</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">1800</td>
                  <td className="border border-border p-3">30</td>
                  <td className="border border-border p-3">4-pole AC motor (60 Hz)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">3600</td>
                  <td className="border border-border p-3">60</td>
                  <td className="border border-border p-3">2-pole AC motor (60 Hz)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">5400</td>
                  <td className="border border-border p-3">90</td>
                  <td className="border border-border p-3">Hard drive spindle</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">7200</td>
                  <td className="border border-border p-3">120</td>
                  <td className="border border-border p-3">Hard drive spindle</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">10000</td>
                  <td className="border border-border p-3">166.7</td>
                  <td className="border border-border p-3">High-speed hard drive</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-3">15000</td>
                  <td className="border border-border p-3">250</td>
                  <td className="border border-border p-3">Enterprise hard drive</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">72000</td>
                  <td className="border border-border p-3">1200</td>
                  <td className="border border-border p-3">High-end CPU fan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Conversions</h2>
          <p className="text-muted-foreground mb-4">
            Convert between frequency units:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>1 Hz = 1 cycle per second</li>
            <li>1 kHz = 1,000 Hz</li>
            <li>1 MHz = 1,000 kHz = 1,000,000 Hz</li>
            <li>1 GHz = 1,000 MHz = 1,000,000,000 Hz</li>
            <li>1 THz = 1,000 GHz = 10¹² Hz</li>
            <li>1 RPM = 1/60 Hz = 0.01667 Hz</li>
            <li>1 RPS (revolution per second) = 1 Hz</li>
            <li>1 rad/s = 0.15915 Hz (divide by 2π)</li>
            <li>1 cycle/day = 1.157 × 10⁻⁵ Hz</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Applications of Frequency</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Audio engineering and music production</li>
            <li>Radio and television broadcasting</li>
            <li>Wireless communication (WiFi, Bluetooth, cellular)</li>
            <li>Clock generation in digital electronics</li>
            <li>Motor speed control and monitoring</li>
            <li>Vibration analysis and condition monitoring</li>
            <li>Medical imaging (MRI, ultrasound)</li>
            <li>Spectroscopy and scientific instrumentation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What is the difference between Hz and kHz?</h3>
            <p className="text-muted-foreground">
              Hertz (Hz) measures cycles per second. Kilohertz (kHz) equals 1,000 Hz. Audio frequencies are typically expressed in Hz (20 to 20,000 Hz) or kHz (0.02 to 20 kHz). Radio frequencies use MHz and GHz. The prefix simply scales the number for convenience.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">How do I convert RPM to Hz?</h3>
            <p className="text-muted-foreground">
              Divide RPM by 60 to get Hz. A motor spinning at 3000 RPM operates at 3000 / 60 = 50 Hz. This conversion works because RPM counts revolutions per minute and Hz counts cycles per second, with 60 seconds in a minute.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">What frequency is middle C?</h3>
            <p className="text-muted-foreground">
              Middle C (C4) has a frequency of 261.63 Hz in equal temperament tuning with A4 = 440 Hz. Each semitone increases frequency by the twelfth root of 2 (approximately 1.0595). The next C (C5) is exactly double at 523.25 Hz.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Why is 50 Hz used in some countries and 60 Hz in others?</h3>
            <p className="text-muted-foreground">
              The 50 Hz vs 60 Hz split is historical. Early US companies adopted 60 Hz (Westinghouse, Tesla), while European companies chose 50 Hz (AEG). Both work equally well. 60 Hz allows slightly smaller transformers and motors. 50 Hz has slightly lower transmission losses. Equipment must match the local standard.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
