"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function HumidityRatioConverterPage() {
  const config = converterMappings["Humidity Ratio Converter"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Humidity Ratio Converter"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Humidity Ratio Converter</h1>
        <p className="text-muted-foreground">Convert between relative humidity, absolute humidity, specific humidity, and humidity ratio. Free online humidity converter for HVAC, meteorology, and building climate control.</p>
      </div>
      <UnitConverterBase
        title="Humidity Ratio Converter"
        description="Convert between relative humidity, absolute humidity, specific humidity, and humidity ratio. Free online humidity converter for HVAC, meteorology, and building climate control."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Humidity Measurements</h2>
          <p className="text-muted-foreground mb-4">Humidity measures water vapor content in air. Different metrics serve different purposes. Relative humidity shows saturation percentage. Absolute humidity measures actual water mass. Specific humidity and humidity ratio help with HVAC calculations.</p>
          <p className="text-muted-foreground mb-4">Temperature affects humidity readings. Warm air holds more moisture than cold air. Relative humidity changes with temperature even if water content stays constant. This explains why indoor air feels dry in winter.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Humidity Measurement Types</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Unit</th>
                  <th className="text-left py-3 px-4 font-medium">Definition</th>
                  <th className="text-left py-3 px-4 font-medium">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Relative Humidity</td>
                  <td className="py-3 px-4">Percent (%)</td>
                  <td className="py-3 px-4">Water vapor vs saturation point</td>
                  <td className="py-3 px-4">Weather reports, comfort</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Absolute Humidity</td>
                  <td className="py-3 px-4">g/m³</td>
                  <td className="py-3 px-4">Mass of water per air volume</td>
                  <td className="py-3 px-4">Scientific measurements</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Specific Humidity</td>
                  <td className="py-3 px-4">g/kg</td>
                  <td className="py-3 px-4">Mass of water per total air mass</td>
                  <td className="py-3 px-4">Meteorology</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Humidity Ratio</td>
                  <td className="py-3 px-4">g/kg or lb/lb</td>
                  <td className="py-3 px-4">Mass of water per dry air mass</td>
                  <td className="py-3 px-4">HVAC engineering</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Dew Point</td>
                  <td className="py-3 px-4">°C or °F</td>
                  <td className="py-3 px-4">Temperature where condensation forms</td>
                  <td className="py-3 px-4">Comfort, weather</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Comfort Levels by Relative Humidity</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">RH Range</th>
                  <th className="text-left py-3 px-4 font-medium">Comfort Level</th>
                  <th className="text-left py-3 px-4 font-medium">Effects</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Less than 20%</td>
                  <td className="py-3 px-4">Very Dry</td>
                  <td className="py-3 px-4">Dry skin, static electricity, respiratory irritation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">20-30%</td>
                  <td className="py-3 px-4">Dry</td>
                  <td className="py-3 px-4">Acceptable for winter, may need humidifier</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">30-50%</td>
                  <td className="py-3 px-4">Comfortable</td>
                  <td className="py-3 px-4">Ideal indoor range, good for health</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">50-60%</td>
                  <td className="py-3 px-4">Slightly Humid</td>
                  <td className="py-3 px-4">Acceptable, slight stuffiness possible</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">60-70%</td>
                  <td className="py-3 px-4">Humid</td>
                  <td className="py-3 px-4">Uncomfortable, mold growth risk</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">More than 70%</td>
                  <td className="py-3 px-4">Very Humid</td>
                  <td className="py-3 px-4">Unhealthy, dust mites, mold, structural damage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Psychrometric Calculations</h2>
          <p className="text-muted-foreground mb-4">Calculate humidity ratio from relative humidity and temperature.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>P_sat = 0.6108 × exp((17.27 × T) ÷ (T + 237.3))</div>
            <div>P_v = RH × P_sat</div>
            <div>Humidity Ratio = 0.622 × P_v ÷ (P - P_v)</div>
          </div>
          <p className="text-muted-foreground mb-4">Where T = temperature in °C, RH = relative humidity (decimal), P = atmospheric pressure (kPa), P_sat = saturation vapor pressure, P_v = partial vapor pressure</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Maximum Water Vapor by Temperature</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Temperature</th>
                  <th className="text-left py-3 px-4 font-medium">Max Absolute Humidity</th>
                  <th className="text-left py-3 px-4 font-medium">Max Water Content</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">0°C (32°F)</td>
                  <td className="py-3 px-4">4.8 g/m³</td>
                  <td className="py-3 px-4">4.8 g/kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10°C (50°F)</td>
                  <td className="py-3 px-4">9.4 g/m³</td>
                  <td className="py-3 px-4">9.4 g/kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">20°C (68°F)</td>
                  <td className="py-3 px-4">17.3 g/m³</td>
                  <td className="py-3 px-4">17.3 g/kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">25°C (77°F)</td>
                  <td className="py-3 px-4">23.0 g/m³</td>
                  <td className="py-3 px-4">23.0 g/kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">30°C (86°F)</td>
                  <td className="py-3 px-4">30.4 g/m³</td>
                  <td className="py-3 px-4">30.4 g/kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">35°C (95°F)</td>
                  <td className="py-3 px-4">39.6 g/m³</td>
                  <td className="py-3 px-4">39.6 g/kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">40°C (104°F)</td>
                  <td className="py-3 px-4">51.1 g/m³</td>
                  <td className="py-3 px-4">51.1 g/kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What is the ideal indoor humidity level?</h3>
              <p className="text-muted-foreground">Maintain 30-50 percent relative humidity indoors. This range prevents mold growth while avoiding dry air problems. Winter levels may drop to 20-30 percent without humidification.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why does relative humidity change with temperature?</h3>
              <p className="text-muted-foreground">Warm air holds more water vapor than cold air. Heating cold outdoor air reduces relative humidity even though water content stays the same. This explains dry indoor air in heated buildings during winter.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is the difference between humidity ratio and relative humidity?</h3>
              <p className="text-muted-foreground">Relative humidity shows saturation percentage at current temperature. Humidity ratio measures actual water mass per dry air mass. Humidity ratio stays constant with temperature changes. Relative humidity changes with temperature.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How do I calculate dew point?</h3>
              <p className="text-muted-foreground">Dew point requires temperature and relative humidity. Use the Magnus formula or psychrometric charts. Online calculators provide quick results. Dew point indicates actual moisture content regardless of temperature.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
