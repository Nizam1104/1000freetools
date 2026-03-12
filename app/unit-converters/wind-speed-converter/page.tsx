"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function WindSpeedConverterPage() {
  const config = converterMappings["Wind Speed Converter"];

  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Wind Speed Converter"</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Wind Speed Converter</h1>
        <p className="text-muted-foreground">Convert wind speed between km/h, mph, knots, m/s, and Beaufort scale. Free online wind speed converter for meteorology, sailing, aviation, and weather analysis.</p>
      </div>
      <UnitConverterBase
        title="Wind Speed Converter"
        description="Convert wind speed between km/h, mph, knots, m/s, and Beaufort scale. Free online wind speed converter for meteorology, sailing, aviation, and weather analysis."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Wind Speed Measurements</h2>
          <p className="text-muted-foreground mb-4">Wind speed measures how fast air moves horizontally. Different industries use different units. Meteorologists use meters per second. Aviation uses knots. Public forecasts use miles per hour or kilometers per hour.</p>
          <p className="text-muted-foreground mb-4">The Beaufort scale describes wind effects on land and sea. Force 0 means calm conditions. Force 12 indicates hurricane strength. This scale helps visualize wind impact without instruments.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Beaufort Wind Scale</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Force</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                  <th className="text-left py-3 px-4 font-medium">mph</th>
                  <th className="text-left py-3 px-4 font-medium">km/h</th>
                  <th className="text-left py-3 px-4 font-medium">Knots</th>
                  <th className="text-left py-3 px-4 font-medium">Sea Conditions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">Calm</td>
                  <td className="py-3 px-4">Less than 1</td>
                  <td className="py-3 px-4">Less than 1</td>
                  <td className="py-3 px-4">Less than 1</td>
                  <td className="py-3 px-4">Glassy, mirror-like</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Light Air</td>
                  <td className="py-3 px-4">1-3</td>
                  <td className="py-3 px-4">1-5</td>
                  <td className="py-3 px-4">1-3</td>
                  <td className="py-3 px-4">Ripples without crests</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">Light Breeze</td>
                  <td className="py-3 px-4">4-7</td>
                  <td className="py-3 px-4">6-11</td>
                  <td className="py-3 px-4">4-6</td>
                  <td className="py-3 px-4">Small wavelets</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">Gentle Breeze</td>
                  <td className="py-3 px-4">8-12</td>
                  <td className="py-3 px-4">12-19</td>
                  <td className="py-3 px-4">7-10</td>
                  <td className="py-3 px-4">Large wavelets, scattered whitecaps</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">Moderate Breeze</td>
                  <td className="py-3 px-4">13-18</td>
                  <td className="py-3 px-4">20-28</td>
                  <td className="py-3 px-4">11-16</td>
                  <td className="py-3 px-4">Small waves, numerous whitecaps</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5</td>
                  <td className="py-3 px-4">Fresh Breeze</td>
                  <td className="py-3 px-4">19-24</td>
                  <td className="py-3 px-4">29-38</td>
                  <td className="py-3 px-4">17-21</td>
                  <td className="py-3 px-4">Moderate waves, many whitecaps</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">6</td>
                  <td className="py-3 px-4">Strong Breeze</td>
                  <td className="py-3 px-4">25-31</td>
                  <td className="py-3 px-4">39-49</td>
                  <td className="py-3 px-4">22-27</td>
                  <td className="py-3 px-4">Large waves, foam streaks</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">7</td>
                  <td className="py-3 px-4">High Wind</td>
                  <td className="py-3 px-4">32-38</td>
                  <td className="py-3 px-4">50-61</td>
                  <td className="py-3 px-4">28-33</td>
                  <td className="py-3 px-4">Sea heaps up, breaking waves</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">8</td>
                  <td className="py-3 px-4">Gale</td>
                  <td className="py-3 px-4">39-46</td>
                  <td className="py-3 px-4">62-74</td>
                  <td className="py-3 px-4">34-40</td>
                  <td className="py-3 px-4">Moderately high waves, spindrift</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">9</td>
                  <td className="py-3 px-4">Strong Gale</td>
                  <td className="py-3 px-4">47-54</td>
                  <td className="py-3 px-4">75-88</td>
                  <td className="py-3 px-4">41-47</td>
                  <td className="py-3 px-4">High waves, dense foam</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10</td>
                  <td className="py-3 px-4">Storm</td>
                  <td className="py-3 px-4">55-63</td>
                  <td className="py-3 px-4">89-102</td>
                  <td className="py-3 px-4">48-55</td>
                  <td className="py-3 px-4">Very high waves, reduced visibility</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">11</td>
                  <td className="py-3 px-4">Violent Storm</td>
                  <td className="py-3 px-4">64-72</td>
                  <td className="py-3 px-4">103-117</td>
                  <td className="py-3 px-4">56-63</td>
                  <td className="py-3 px-4">Exceptionally high waves</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">12</td>
                  <td className="py-3 px-4">Hurricane</td>
                  <td className="py-3 px-4">73+</td>
                  <td className="py-3 px-4">118+</td>
                  <td className="py-3 px-4">64+</td>
                  <td className="py-3 px-4">Air filled with foam, white sea</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Wind Speed Conversion Formulas</h2>
          <p className="text-muted-foreground mb-4">Convert between wind speed units using these formulas.</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2 mb-4">
            <div>mph = km/h × 0.621371</div>
            <div>km/h = mph × 1.60934</div>
            <div>knots = mph × 0.868976</div>
            <div>m/s = km/h ÷ 3.6</div>
            <div>mph = m/s × 2.23694</div>
          </div>
          <p className="text-muted-foreground mb-4">Example: Converting 50 km/h to mph and knots</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            50 km/h × 0.621371 = 31.07 mph
            50 km/h ÷ 1.852 = 27 knots
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Wind Speed by Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Activity</th>
                  <th className="text-left py-3 px-4 font-medium">Ideal Wind Speed</th>
                  <th className="text-left py-3 px-4 font-medium">Maximum Safe Wind</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Sailing (recreational)</td>
                  <td className="py-3 px-4">10-20 knots</td>
                  <td className="py-3 px-4">30 knots</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Windsurfing</td>
                  <td className="py-3 px-4">15-25 knots</td>
                  <td className="py-3 px-4">35 knots</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Kitesurfing</td>
                  <td className="py-3 px-4">12-25 knots</td>
                  <td className="py-3 px-4">35 knots</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Paragliding</td>
                  <td className="py-3 px-4">5-15 mph</td>
                  <td className="py-3 px-4">25 mph</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Cycling</td>
                  <td className="py-3 px-4">Less than 10 mph</td>
                  <td className="py-3 px-4">30 mph</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Golf</td>
                  <td className="py-3 px-4">Less than 15 mph</td>
                  <td className="py-3 px-4">40 mph</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Drone flying</td>
                  <td className="py-3 px-4">Less than 10 mph</td>
                  <td className="py-3 px-4">25 mph</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Wind Safety Guidelines</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Secure loose objects when winds exceed 25 mph</li>
            <li>Avoid boating when small craft advisories are issued</li>
            <li>Stay indoors during high wind warnings (58+ mph)</li>
            <li>Hurricane force winds (74+ mph) cause structural damage</li>
            <li>Wind chill increases risk of frostbite in cold weather</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">What wind speed is considered windy?</h3>
              <p className="text-muted-foreground">Winds of 20-30 mph feel noticeably windy. Winds above 35 mph make outdoor activities difficult. Winds above 50 mph can cause damage to structures and trees.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Why do sailors use knots instead of mph?</h3>
              <p className="text-muted-foreground">Knots measure nautical miles per hour. One nautical mile equals one minute of latitude. This unit simplifies navigation calculations at sea where distances use nautical miles.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How is wind speed measured?</h3>
              <p className="text-muted-foreground">Anemometers measure wind speed mechanically or electronically. Cup anemometers spin faster in stronger winds. Ultrasonic anemometers measure sound wave travel time. Weather stations report average and gust speeds.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">What is the difference between wind gust and sustained wind?</h3>
              <p className="text-muted-foreground">Sustained wind averages speed over 1-10 minutes. Gusts are brief increases lasting seconds. Gusts typically exceed sustained winds by 30-50 percent. Weather reports list both values.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
