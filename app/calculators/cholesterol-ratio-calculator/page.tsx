"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CholesterolRatioCalculator() {
  const [totalCholesterol, setTotalCholesterol] = useState<string>("");
  const [hdl, setHdl] = useState<string>("");
  const [ldl, setLdl] = useState<string>("");
  const [triglycerides, setTriglycerides] = useState<string>("");
  const [results, setResults] = useState<{
    totalHdlRatio: number;
    ldlHdlRatio: number;
    totalHdlRisk: string;
    ldlHdlRisk: string;
  } | null>(null);

  const calculate = () => {
    const total = parseFloat(totalCholesterol);
    const hdlValue = parseFloat(hdl);
    const ldlValue = parseFloat(ldl);
    const trigs = parseFloat(triglycerides);

    if (isNaN(total) || isNaN(hdlValue) || isNaN(ldlValue) || isNaN(trigs) || 
        total <= 0 || hdlValue <= 0 || ldlValue <= 0 || trigs <= 0) return;

    // Calculate ratios
    const totalHdlRatio = total / hdlValue;
    const ldlHdlRatio = ldlValue / hdlValue;

    // Risk assessment for Total/HDL ratio
    let totalHdlRisk: string;
    if (totalHdlRatio < 3.5) {
      totalHdlRisk = "Optimal";
    } else if (totalHdlRatio < 5) {
      totalHdlRisk = "Good";
    } else if (totalHdlRatio < 7) {
      totalHdlRisk = "Average";
    } else {
      totalHdlRisk = "High Risk";
    }

    // Risk assessment for LDL/HDL ratio
    let ldlHdlRisk: string;
    if (ldlHdlRatio < 2) {
      ldlHdlRisk = "Optimal";
    } else if (ldlHdlRatio < 3) {
      ldlHdlRisk = "Good";
    } else if (ldlHdlRatio < 4) {
      ldlHdlRisk = "Average";
    } else {
      ldlHdlRisk = "High Risk";
    }

    setResults({
      totalHdlRatio: Math.round(totalHdlRatio * 10) / 10,
      ldlHdlRatio: Math.round(ldlHdlRatio * 10) / 10,
      totalHdlRisk,
      ldlHdlRisk,
    });
  };

  const reset = () => {
    setTotalCholesterol("");
    setHdl("");
    setLdl("");
    setTriglycerides("");
    setResults(null);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Optimal":
        return "text-green-600";
      case "Good":
        return "text-blue-600";
      case "Average":
        return "text-yellow-600";
      case "High Risk":
        return "text-red-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="totalCholesterol">Total Cholesterol (mg/dL)</Label>
              <Input
                id="totalCholesterol"
                type="number"
                placeholder="e.g., 200"
                value={totalCholesterol}
                onChange={(e) => setTotalCholesterol(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="hdl">HDL (Good) Cholesterol (mg/dL)</Label>
              <Input
                id="hdl"
                type="number"
                placeholder="e.g., 50"
                value={hdl}
                onChange={(e) => setHdl(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="ldl">LDL (Bad) Cholesterol (mg/dL)</Label>
              <Input
                id="ldl"
                type="number"
                placeholder="e.g., 100"
                value={ldl}
                onChange={(e) => setLdl(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
              <Input
                id="triglycerides"
                type="number"
                placeholder="e.g., 150"
                value={triglycerides}
                onChange={(e) => setTriglycerides(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Ratios</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Total/HDL Ratio</p>
                    <p className="text-3xl font-bold mt-1">{results.totalHdlRatio}</p>
                    <p className={`text-sm font-medium mt-1 ${getRiskColor(results.totalHdlRisk)}`}>
                      {results.totalHdlRisk}
                    </p>
                  </div>

                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">LDL/HDL Ratio</p>
                    <p className="text-3xl font-bold mt-1">{results.ldlHdlRatio}</p>
                    <p className={`text-sm font-medium mt-1 ${getRiskColor(results.ldlHdlRisk)}`}>
                      {results.ldlHdlRisk}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Risk Assessment Guide</p>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p><span className="text-green-600 font-medium">Optimal:</span> Total/HDL &lt; 3.5, LDL/HDL &lt; 2</p>
                    <p><span className="text-blue-600 font-medium">Good:</span> Total/HDL 3.5-5, LDL/HDL 2-3</p>
                    <p><span className="text-yellow-600 font-medium">Average:</span> Total/HDL 5-7, LDL/HDL 3-4</p>
                    <p><span className="text-red-600 font-medium">High Risk:</span> Total/HDL &gt; 7, LDL/HDL &gt; 4</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  These ratios help assess cardiovascular disease risk. Lower ratios indicate better heart health. Consult your healthcare provider for personalized interpretation.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Cholesterol Ratio Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your lipid panel results</p>
                  <p>Input your total cholesterol, HDL, LDL, and triglycerides from your blood test. Values are typically measured in mg/dL in the United States.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate Ratios</p>
                  <p>The calculator computes your Total/HDL and LDL/HDL ratios automatically. These ratios are better predictors of heart disease risk than individual cholesterol numbers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Review your risk assessment</p>
                  <p>Results show color-coded risk levels. Lower ratios indicate better cardiovascular health. Share results with your healthcare provider for personalized guidance.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Cholesterol Ratio Risk Categories
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Risk Level</th>
                    <th className="text-left py-3 px-2 font-semibold">Total/HDL Ratio</th>
                    <th className="text-left py-3 px-2 font-semibold">LDL/HDL Ratio</th>
                    <th className="text-left py-3 px-2 font-semibold">Heart Disease Risk</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2"><span className="text-green-600 font-medium">Optimal</span></td>
                    <td className="py-3 px-2">Below 3.5</td>
                    <td className="py-3 px-2">Below 2.0</td>
                    <td className="py-3 px-2">Very low risk</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2"><span className="text-blue-600 font-medium">Good</span></td>
                    <td className="py-3 px-2">3.5 to 5.0</td>
                    <td className="py-3 px-2">2.0 to 3.0</td>
                    <td className="py-3 px-2">Below average risk</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2"><span className="text-yellow-600 font-medium">Average</span></td>
                    <td className="py-3 px-2">5.0 to 7.0</td>
                    <td className="py-3 px-2">3.0 to 4.0</td>
                    <td className="py-3 px-2">Average risk</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2"><span className="text-red-600 font-medium">High Risk</span></td>
                    <td className="py-3 px-2">Above 7.0</td>
                    <td className="py-3 px-2">Above 4.0</td>
                    <td className="py-3 px-2">Significantly elevated risk</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: These ranges are general guidelines. Individual risk depends on other factors like age, blood pressure, smoking status, and family history.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Cholesterol Ratios
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Ratios Matter More Than Individual Numbers</h4>
                <p>
                  The Framingham Heart Study found that cholesterol ratios predict cardiovascular disease better than total cholesterol or LDL alone. A person with total cholesterol of 240 and HDL of 80 has a ratio of 3.0, which is excellent. Another person with total cholesterol of 200 and HDL of 30 has a ratio of 6.7, which indicates higher risk despite lower total cholesterol.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What the Total/HDL Ratio Tells You</h4>
                <p>
                  This ratio compares all cholesterol in your blood to the protective HDL cholesterol. HDL removes excess cholesterol from arteries and carries it to the liver for disposal. A lower ratio means you have more protective HDL relative to total cholesterol. The average adult has a ratio around 5.0.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The LDL/HDL Ratio and Plaque Formation</h4>
                <p>
                  LDL particles deposit cholesterol in artery walls, forming plaque. HDL particles remove it. The LDL/HDL ratio reflects the balance between these opposing processes. Research suggests this ratio may be especially useful for assessing risk in people with metabolic syndrome or diabetes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Improve Your Cholesterol Ratios
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Increase HDL through exercise</p>
                  <p>Aerobic exercise raises HDL cholesterol. Aim for 150 minutes of moderate activity per week. Resistance training also helps. Even small HDL increases improve your ratio significantly.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Reduce LDL with diet changes</p>
                  <p>Replace saturated fats with unsaturated fats. Eat more soluble fiber from oats, beans, and fruits. Limit trans fats completely. Plant sterols and stanols can lower LDL by 5-15 percent.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Lower triglycerides</p>
                  <p>Reduce refined carbohydrates and added sugars. Limit alcohol intake. Lose excess weight. Omega-3 fatty acids from fish or supplements can lower triglycerides by 20-50 percent.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider medication if needed</p>
                  <p>Statins lower LDL and modestly raise HDL. They&apos;re recommended for people with high cardiovascular risk. Other medications like ezetimibe or PCSK9 inhibitors may be added if statins alone aren&apos;t enough.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is a good cholesterol ratio?</h4>
                <p>
                  A Total/HDL ratio below 5.0 is considered good, with below 3.5 being optimal. The average American has a ratio around 5.0. For LDL/HDL ratio, below 3.0 is good and below 2.0 is optimal. Lower ratios always indicate lower cardiovascular risk.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is my cholesterol ratio more important than LDL?</h4>
                <p>
                  Both matter, but ratios often predict risk better. LDL tells you how much &quot;bad&quot; cholesterol you have. Ratios show the balance between harmful and protective cholesterol. Many cardiologists now consider ratios alongside absolute LDL values when assessing risk and treatment decisions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How often should I check my cholesterol?</h4>
                <p>
                  Adults over 20 should have cholesterol checked every 4-6 years if results are normal and risk is low. People with high cholesterol, heart disease, or diabetes need more frequent testing, often annually. Those starting cholesterol medication should be rechecked within 3 months.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can high triglycerides affect my ratios?</h4>
                <p>
                  High triglycerides don&apos;t directly change the Total/HDL or LDL/HDL ratios, but they often accompany low HDL and small, dense LDL particles, which increase risk. The combination of high triglycerides and low HDL is particularly concerning and may warrant more aggressive treatment.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if my ratios are high but my LDL is normal?</h4>
                <p>
                  This usually means your HDL is low. Focus on raising HDL through exercise, weight loss, and possibly medication. Niacin can raise HDL but hasn&apos;t consistently reduced cardiovascular events in trials. Lifestyle changes remain the first-line approach for improving ratios.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
