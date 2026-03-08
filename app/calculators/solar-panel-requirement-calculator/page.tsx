"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function SolarPanelRequirementCalculator() {
  const [dailyConsumption, setDailyConsumption] = useState<string>("");
  const [sunHours, setSunHours] = useState<string>("");
  const [panelWattage, setPanelWattage] = useState<string>("");
  const [systemLoss, setSystemLoss] = useState<string>("20");
  const [results, setResults] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  const calculate = () => {
    const consumption = parseFloat(dailyConsumption);
    const sunHoursVal = parseFloat(sunHours);
    const panelW = parseFloat(panelWattage);
    const loss = parseFloat(systemLoss) / 100;

    if (consumption > 0 && sunHoursVal > 0) {
      const adjustedConsumption = consumption / (1 - loss);
      const requiredWatts = adjustedConsumption / sunHoursVal;
      const numPanels = panelW > 0 ? Math.ceil(requiredWatts / panelW) : 0;
      const batteryCapacity = (consumption / 12) * 1.5;
      const dailyProduction = panelW > 0 ? Math.round(numPanels * panelW * sunHoursVal * (1 - loss)) : 0;

      setResults({
        requiredWatts: Math.round(requiredWatts),
        numPanels: numPanels,
        batteryAh: Math.round(batteryCapacity),
        dailyProduction: dailyProduction,
      });

      const panelOptions = [200, 300, 400, 500, 600];
      const barData = panelOptions.map(wattage => ({
        wattage: `${wattage}W`,
        panels: Math.ceil(requiredWatts / wattage),
        totalWatts: Math.ceil(requiredWatts / wattage) * wattage,
      }));
      setChartData(barData);

      setPieData([
        { name: "Home Consumption", value: consumption, color: "#3b82f6" },
        { name: "System Losses", value: Math.round(consumption * loss / (1 - loss)), color: "#ef4444" },
      ]);
    }
  };

  const reset = () => {
    setDailyConsumption(""); setSunHours(""); setPanelWattage(""); setSystemLoss("20"); setResults(null);
    setChartData([]);
    setPieData([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Daily Energy Consumption (Wh)</Label><Input value={dailyConsumption} onChange={e => setDailyConsumption(e.target.value)} placeholder="e.g., 30000" /></div>
              <div><Label>Peak Sun Hours/day</Label><Input value={sunHours} onChange={e => setSunHours(e.target.value)} placeholder="e.g., 5" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Panel Wattage (W)</Label><Input value={panelWattage} onChange={e => setPanelWattage(e.target.value)} placeholder="e.g., 400" /></div>
              <div><Label>System Losses (%)</Label><Input value={systemLoss} onChange={e => setSystemLoss(e.target.value)} /></div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Requirements</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Required System Size</p>
                    <p className="text-3xl font-bold">{results.requiredWatts} W</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Number of Panels</p>
                    <p className="text-4xl font-bold">{results.numPanels}</p>
                    <p className="text-xs text-muted-foreground">@ {panelWattage}W each</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Battery Capacity (12V)</p>
                    <p className="text-2xl font-bold">{results.batteryAh} Ah</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Production</p>
                    <p className="text-2xl font-bold">{results.dailyProduction} Wh</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Panel Count by Wattage Option</CardTitle>
            <CardDescription>
              Compare how many panels you need at different wattages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="wattage" />
                <YAxis label={{ value: "Number of Panels", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="panels" fill="#3b82f6" name="Panels Needed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {pieData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Energy Distribution</CardTitle>
            <CardDescription>
              Usable energy vs system losses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Size Your Solar System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Sizing a solar system starts with one number: how much energy you use daily. Check your electric bill for monthly kWh, divide by 30, multiply by 1,000 to get watt-hours. That's your daily consumption.</p>
          
          <p>Next, figure out your peak sun hours. This isn't just daylight hours—it's the equivalent hours of full 1,000 W/m² sunlight. Arizona gets 6-7 hours; Seattle gets 3-4 in winter. Your location matters.</p>

          <h3 className="text-xl font-semibold mt-6">Solar Panel Calculation Formula</h3>
          <div className="p-4 bg-muted rounded-md font-mono text-sm space-y-2">
            <div>Adjusted Consumption = Daily Consumption / (1 - Loss Factor)</div>
            <div>Required System Size (W) = Adjusted Consumption / Peak Sun Hours</div>
            <div>Number of Panels = Required System Size / Panel Wattage</div>
          </div>
          <p>Example: 30,000 Wh daily, 5 sun hours, 20% losses, 400W panels</p>
          <p>Adjusted: 30,000 / 0.8 = 37,500 Wh</p>
          <p>System: 37,500 / 5 = 7,500W</p>
          <p>Panels: 7,500 / 400 = 19 panels</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peak Sun Hours by US Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Region</th>
                  <th className="p-3 text-left">Summer Average</th>
                  <th className="p-3 text-left">Winter Average</th>
                  <th className="p-3 text-left">Year-Round Average</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Southwest (AZ, NV, SoCal)</td>
                  <td className="p-3">7-8 hours</td>
                  <td className="p-3">5-6 hours</td>
                  <td className="p-3">6.5 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Southeast (FL, TX, GA)</td>
                  <td className="p-3">6-7 hours</td>
                  <td className="p-3">4-5 hours</td>
                  <td className="p-3">5.5 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">West Coast (NorCal, OR, WA)</td>
                  <td className="p-3">6-7 hours</td>
                  <td className="p-3">2-3 hours</td>
                  <td className="p-3">4.5 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Midwest (IL, OH, MI)</td>
                  <td className="p-3">5-6 hours</td>
                  <td className="p-3">2-3 hours</td>
                  <td className="p-3">4 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Northeast (NY, MA, PA)</td>
                  <td className="p-3">5-6 hours</td>
                  <td className="p-3">2-3 hours</td>
                  <td className="p-3">4 hours</td>
                </tr>
                <tr>
                  <td className="p-3">Mountain (CO, UT, MT)</td>
                  <td className="p-3">6-7 hours</td>
                  <td className="p-3">4-5 hours</td>
                  <td className="p-3">5.5 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Source: NREL solar resource data. Actual values vary by specific location and weather patterns.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding System Losses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Not all the energy your panels produce makes it to your appliances. System losses eat 15-25% typically. Here's where it goes:</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Inverter Losses (3-5%)</h4>
              <p className="text-sm text-muted-foreground mt-1">Inverters convert DC to AC. No inverter is 100% efficient. Modern units run 95-97% efficiency, but that 3-5% loss is unavoidable.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Wiring Losses (2-3%)</h4>
              <p className="text-sm text-muted-foreground mt-1">Resistance in cables causes voltage drop. Proper wire sizing minimizes this, but some loss happens over any distance.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Temperature Losses (10-15%)</h4>
              <p className="text-sm text-muted-foreground mt-1">Panels lose efficiency as they heat up. A panel rated at 400W at 25°C might produce 340W at 65°C. This is the biggest loss factor.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-semibold mb-2">Soiling & Shading (2-5%)</h4>
              <p className="text-sm text-muted-foreground mt-1">Dust, leaves, bird droppings, and partial shading all reduce output. Clean panels in open sun perform best.</p>
            </div>
          </div>

          <p className="mt-4">Default system loss assumption is 20%, which is realistic for most residential installations. Well-designed systems with microinverters and clean panels might see 15%. Older or poorly maintained systems can lose 25% or more.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solar Panel Wattage Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Panel wattage determines how many you need. Higher wattage means fewer panels but each panel is larger and heavier. Here's what's available:</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Panel Type</th>
                  <th className="p-3 text-left">Wattage Range</th>
                  <th className="p-3 text-left">Dimensions (approx)</th>
                  <th className="p-3 text-left">Weight</th>
                  <th className="p-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Small residential</td>
                  <td className="p-3">200-300W</td>
                  <td className="p-3">65" × 39"</td>
                  <td className="p-3">35-40 lbs</td>
                  <td className="p-3">Limited roof space, DIY installs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Standard residential</td>
                  <td className="p-3">350-450W</td>
                  <td className="p-3">70" × 40"</td>
                  <td className="p-3">45-50 lbs</td>
                  <td className="p-3">Most homes, best value</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Large residential</td>
                  <td className="p-3">450-550W</td>
                  <td className="p-3">75" × 45"</td>
                  <td className="p-3">55-60 lbs</td>
                  <td className="p-3">Large roofs, new construction</td>
                </tr>
                <tr>
                  <td className="p-3">Commercial</td>
                  <td className="p-3">550-700W</td>
                  <td className="p-3">85" × 50"</td>
                  <td className="p-3">65-75 lbs</td>
                  <td className="p-3">Commercial buildings, ground mounts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Battery Sizing for Off-Grid Systems</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>If you're going off-grid or want backup power, you need batteries. The calculator assumes a 12V system with 50% depth of discharge (DoD)—meaning you only use half the battery capacity to preserve lifespan.</p>

          <div className="p-4 bg-muted rounded-md font-mono text-sm">
            Battery Ah = (Daily Consumption / 12V) × 1.5
          </div>

          <p>The 1.5 multiplier accounts for inefficiency and ensures you don't drain batteries below 50%. For example, 30,000 Wh daily needs:</p>
          <p>(30,000 / 12) × 1.5 = 3,750 Ah at 12V</p>

          <p className="mt-4">That's a lot of batteries. In practice, off-grid systems use 24V or 48V to reduce amp-hour requirements. A 48V system would need about 940 Ah—much more manageable with modern lithium batteries.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">How do I find my daily energy consumption?</h4>
            <p className="text-sm text-muted-foreground mt-1">Check your electric bill for monthly kWh usage. Divide by 30 for daily average. Multiply by 1,000 to convert to watt-hours. For example, 900 kWh/month = 30 kWh/day = 30,000 Wh/day.</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I install solar panels myself?</h4>
            <p className="text-sm text-muted-foreground mt-1">Technically yes, but it's not recommended unless you have electrical experience. Grid-tied systems require permits, inspections, and utility approval. Off-grid is more DIY-friendly but still requires proper wiring and safety equipment.</p>
          </div>
          <div>
            <h4 className="font-semibold">How much does a solar panel system cost?</h4>
            <p className="text-sm text-muted-foreground mt-1">Residential systems average $2.50-3.50 per watt before incentives. A 7,500W (7.5 kW) system costs $18,750-26,250 installed. The federal tax credit covers 30%, bringing net cost to $13,000-18,000.</p>
          </div>
          <div>
            <h4 className="font-semibold">Do solar panels work in winter?</h4>
            <p className="text-sm text-muted-foreground mt-1">Yes, but production drops 30-50% depending on location. Shorter days and lower sun angle reduce output. Snow coverage stops production entirely until it melts or slides off. Cold temperatures actually improve panel efficiency.</p>
          </div>
          <div>
            <h4 className="font-semibold">How long do solar panels last?</h4>
            <p className="text-sm text-muted-foreground mt-1">Most panels come with 25-30 year warranties guaranteeing 80-85% of original output. They don't suddenly stop working—they gradually degrade about 0.5-1% per year. Panels from the 1980s are still producing at reduced capacity today.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
