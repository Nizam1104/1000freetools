"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function BloodSugarConverter() {
  const [mgdl, setMgdl] = useState<string>("");
  const [mmol, setMmol] = useState<string>("");

  // Convert mg/dL to mmol/L when mg/dL changes
  const handleMgdlChange = (value: string) => {
    setMgdl(value);
    const mgValue = parseFloat(value);
    if (!isNaN(mgValue) && mgValue > 0) {
      const mmolValue = mgValue / 18;
      setMmol(mmolValue.toFixed(2));
    } else {
      setMmol("");
    }
  };

  // Convert mmol/L to mg/dL when mmol/L changes
  const handleMmolChange = (value: string) => {
    setMmol(value);
    const mmolValue = parseFloat(value);
    if (!isNaN(mmolValue) && mmolValue > 0) {
      const mgValue = mmolValue * 18;
      setMgdl(Math.round(mgValue).toString());
    } else {
      setMgdl("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="mgdl">Blood Glucose (mg/dL)</Label>
              <Input
                id="mgdl"
                type="number"
                placeholder="e.g., 100"
                value={mgdl}
                onChange={(e) => handleMgdlChange(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-[200px] h-px bg-border" />
              <span className="px-4 text-muted-foreground text-sm">↔</span>
              <div className="w-full max-w-[200px] h-px bg-border" />
            </div>

            <div>
              <Label htmlFor="mmol">Blood Glucose (mmol/L)</Label>
              <Input
                id="mmol"
                type="number"
                placeholder="e.g., 5.6"
                value={mmol}
                onChange={(e) => handleMmolChange(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Conversion Formula</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>mmol/L = mg/dL ÷ 18</p>
                <p>mg/dL = mmol/L × 18</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Blood Sugar Reference Ranges</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <div className="flex justify-between py-1 border-b">
                  <span>Fasting (normal):</span>
                  <span>70-100 mg/dL (3.9-5.6 mmol/L)</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span>Prediabetes:</span>
                  <span>100-125 mg/dL (5.6-6.9 mmol/L)</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span>Diabetes:</span>
                  <span>≥126 mg/dL (≥7.0 mmol/L)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>2hr after meal (normal):</span>
                  <span>&lt;140 mg/dL (&lt;7.8 mmol/L)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Blood Sugar Converter
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your blood glucose value</p>
                  <p>Type your reading in either the mg/dL or mmol/L field — conversion happens automatically.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">View the converted value instantly</p>
                  <p>The other field updates in real-time with the converted measurement.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Compare with reference ranges</p>
                  <p>Use the reference table to understand where your reading falls within normal, prediabetes, or diabetes ranges.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Blood Glucose Reference Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Condition</th>
                    <th className="text-left py-3 px-2 font-semibold">mg/dL</th>
                    <th className="text-left py-3 px-2 font-semibold">mmol/L</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Hypoglycemia (Low)</td>
                    <td className="py-3 px-2">&lt;70</td>
                    <td className="py-3 px-2">&lt;3.9</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Normal Fasting</td>
                    <td className="py-3 px-2">70-100</td>
                    <td className="py-3 px-2">3.9-5.6</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Prediabetes (Fasting)</td>
                    <td className="py-3 px-2">100-125</td>
                    <td className="py-3 px-2">5.6-6.9</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Diabetes (Fasting)</td>
                    <td className="py-3 px-2">≥126</td>
                    <td className="py-3 px-2">≥7.0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Normal (2hr after meal)</td>
                    <td className="py-3 px-2">&lt;140</td>
                    <td className="py-3 px-2">&lt;7.8</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Prediabetes (2hr after meal)</td>
                    <td className="py-3 px-2">140-199</td>
                    <td className="py-3 px-2">7.8-11.0</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Diabetes (2hr after meal)</td>
                    <td className="py-3 px-2">≥200</td>
                    <td className="py-3 px-2">≥11.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Source: American Diabetes Association guidelines. Values may vary by laboratory and individual health status.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Blood Glucose Units
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Two Different Units?</h4>
                <p>
                  Blood glucose is measured in mg/dL (milligrams per deciliter) in the United States, Japan, India,
                  and France. Most other countries use mmol/L (millimoles per liter). The difference is historical —
                  mg/dL measures mass concentration, while mmol/L measures molar concentration.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">The Conversion Factor</h4>
                <p>
                  Glucose has a molecular weight of 180 g/mol. To convert mg/dL to mmol/L, divide by 18. To convert
                  mmol/L to mg/dL, multiply by 18. This simple factor works because 1 mmol of glucose weighs 180 mg,
                  and there are 10 deciliters in a liter.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When You Need to Convert</h4>
                <p>
                  Conversion is useful when traveling abroad, reading international research, using imported glucose
                  meters, or communicating with healthcare providers from different countries. Many modern glucose
                  meters allow you to switch between units in the settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Blood Sugar Monitoring
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Test at consistent times</p>
                  <p>Check fasting levels at the same time each morning. Test 2 hours after meals for postprandial readings.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Keep a log of your readings</p>
                  <p>Track your numbers along with meals, activity, and medication. Patterns help your doctor adjust treatment.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Wash hands before testing</p>
                  <p>Food residue on fingers can give falsely high readings. Use soap and water, then dry thoroughly.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Store test strips properly</p>
                  <p>Keep strips in their original container, away from heat and humidity. Expired strips give inaccurate results.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is a normal blood sugar level?",
    answer: "For people without diabetes, normal fasting blood sugar is 70-100 mg/dL (3.9-5.6 mmol/L). Two hours after eating, normal is below 140 mg/dL (7.8 mmol/L). Targets may differ for people with diabetes based on age, health status, and other factors.",
  },
{
    question: "When should I test my blood sugar?",
    answer: "Common testing times include: first thing in the morning (fasting), before meals, 2 hours after meals, before exercise, before driving, and at bedtime. Your doctor will recommend a testing schedule based on your treatment plan.",
  },
{
    question: "What causes high blood sugar?",
    answer: "High blood sugar (hyperglycemia) can result from eating too many carbohydrates, insufficient insulin or medication, illness, stress, lack of physical activity, or certain medications like steroids.",
  },
{
    question: "What is considered low blood sugar?",
    answer: "Blood sugar below 70 mg/dL (3.9 mmol/L) is considered low (hypoglycemia). Symptoms include shakiness, sweating, confusion, and irritability. Treat with 15 grams of fast-acting carbohydrate and recheck in 15 minutes.",
  },
{
    question: "Can I convert HbA1c to blood glucose?",
    answer: "HbA1c reflects average blood sugar over 2-3 months and uses different units (percentage). There are conversion formulas to estimate average glucose from HbA1c, but they provide approximations, not exact equivalents to fingerstick readings.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
