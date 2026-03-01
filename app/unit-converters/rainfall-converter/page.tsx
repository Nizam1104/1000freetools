"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function RainfallConverterPage() {
  const config = converterMappings["Rainfall Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Rainfall Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Rainfall Converter</h1>
        <p className="text-muted-foreground">Convert rainfall measurements between millimeters, inches, liters per square meter, and more. Free online precipitation converter for meteorology, hydrology, and agriculture.</p>
      </div>
      <UnitConverterBase
        title="Rainfall Converter"
        description="Convert rainfall measurements between millimeters, inches, liters per square meter, and more. Free online precipitation converter for meteorology, hydrology, and agriculture."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Rainfall Measurements</h2>
          <p className="text-muted-foreground mb-4">Rainfall measures precipitation depth over a specific period. Measurements use millimeters or inches. One millimeter of rain equals one liter per square meter. Rainfall data helps with flood prediction, agriculture planning, and water resource management.</p>
          <p className="text-muted-foreground mb-4">Rain gauges collect and measure precipitation. Standard gauges measure depth directly. Tipping bucket gauges count tips to calculate volume. Weather radar estimates rainfall over large areas.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rainfall Intensity Classifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Intensity</th>
                  <th className="text-left py-3 px-4 font-medium">mm/hour</th>
                  <th className="text-left py-3 px-4 font-medium">inches/hour</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Very Light</td>
                  <td className="py-3 px-4">Less than 0.25</td>
                  <td className="py-3 px-4">Less than 0.01</td>
                  <td className="py-3 px-4">Barely perceptible</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Light</td>
                  <td className="py-3 px-4">0.25 - 1.0</td>
                  <td className="py-3 px-4">0.01 - 0.04</td>
                  <td className="py-3 px-4">Gentle rain</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Moderate</td>
                  <td className="py-3 px-4">1.0 - 4.0</td>
                  <td className="py-3 px-4">0.04 - 0.16</td>
                  <td className="py-3 px-4">Steady rain</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Heavy</td>
                  <td className="py-3 px-4">4.0 - 16.0</td>
                  <td className="py-3 px-4">0.16 - 0.63</td>
                  <td className="py-3 px-4">Downpour</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Very Heavy</td>
                  <td className="py-3 px-4">16.0 - 50.0</td>
                  <td className="py-3 px-4">0.63 - 1.97</td>
                  <td className="py-3 px-4">Torrential rain</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Extreme</td>
                  <td className="py-3 px-4">More than 50.0</td>
                  <td className="py-3 px-4">More than 1.97</td>
                  <td className="py-3 px-4">Flash flood risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Rainfall Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Convert between rainfall units using these formulas.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>mm = inches × 25.4</div>
            <div>inches = mm ÷ 25.4</div>
            <div>liters/m² = mm (1:1 ratio)</div>
            <div>gallons/ft² = inches × 0.623</div>
            <div>liters/m² = inches × 25.4</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 2 inches of rainfall to millimeters and liters per square meter</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            2 inches × 25.4 = 50.8 mm
            50.8 mm = 50.8 liters/m²
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Annual Rainfall Averages by Region</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Annual Rainfall (mm)</th>
                  <th className="text-left py-3 px-4 font-medium">Annual Rainfall (inches)</th>
                  <th className="text-left py-3 px-4 font-medium">Climate Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Mawsynram, India</td>
                  <td className="py-3 px-4">11,871</td>
                  <td className="py-3 px-4">467</td>
                  <td className="py-3 px-4">Tropical monsoon</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Singapore</td>
                  <td className="py-3 px-4">2,345</td>
                  <td className="py-3 px-4">92</td>
                  <td className="py-3 px-4">Tropical rainforest</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">London, UK</td>
                  <td className="py-3 px-4">601</td>
                  <td className="py-3 px-4">24</td>
                  <td className="py-3 px-4">Temperate oceanic</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">New York, USA</td>
                  <td className="py-3 px-4">1,268</td>
                  <td className="py-3 px-4">50</td>
                  <td className="py-3 px-4">Humid subtropical</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Sydney, Australia</td>
                  <td className="py-3 px-4">1,213</td>
                  <td className="py-3 px-4">48</td>
                  <td className="py-3 px-4">Humid subtropical</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cairo, Egypt</td>
                  <td className="py-3 px-4">25</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Desert</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Seattle, USA</td>
                  <td className="py-3 px-4">952</td>
                  <td className="py-3 px-4">37</td>
                  <td className="py-3 px-4">Oceanic</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Tokyo, Japan</td>
                  <td className="py-3 px-4">1,530</td>
                  <td className="py-3 px-4">60</td>
                  <td className="py-3 px-4">Humid subtropical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Water Volume from Rainfall</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>1 mm of rain on 1 hectare = 10,000 liters of water</li>
            <li>1 inch of rain on 1 acre = 27,154 gallons of water</li>
            <li>1 mm of rain on 1 m² = 1 liter of water</li>
            <li>1 inch of rain on 1,000 ft² = 623 gallons of water</li>
            <li>Rainwater harvesting potential depends on roof area and local rainfall</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What does 1 mm of rain mean?</h3>
              <p className="text-muted-foreground">One millimeter of rain means water would cover a flat surface to a depth of 1 mm if none drained away. This equals 1 liter of water per square meter of ground area.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How is rainfall measured?</h3>
              <p className="text-muted-foreground">Rain gauges collect precipitation in a calibrated cylinder. Manual gauges require reading after each event. Automatic gauges transmit data continuously. Weather radar estimates rainfall over wide areas.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is considered heavy rainfall?</h3>
              <p className="text-muted-foreground">Rainfall exceeding 4 mm per hour qualifies as heavy. Rainfall over 16 mm per hour indicates very heavy rain with flash flood potential. Intensity matters more than total accumulation for flooding.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I calculate rainwater collection from my roof?</h3>
              <p className="text-muted-foreground">Multiply roof area in square meters by rainfall in millimeters. Result equals liters of collectable water. For a 100 m² roof with 50 mm rain: 100 × 50 = 5,000 liters potential collection.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
