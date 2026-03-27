"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function FreelanceEffectiveHourlyRateCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("");
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [businessExpenses, setBusinessExpenses] = useState<string>("");
  const [result, setResult] = useState<{
    grossWeeklyIncome: number;
    netWeeklyIncome: number;
    effectiveHourlyRate: number;
  } | null>(null);

  const calculateEffectiveRate = () => {
    const rate = parseFloat(hourlyRate);
    const totalHours = parseFloat(hoursPerWeek);
    const billableHours = parseFloat(billableHoursPerWeek);
    const tax = parseFloat(taxRate) / 100;
    const expenses = parseFloat(businessExpenses);

    if (isNaN(rate) || isNaN(totalHours) || isNaN(billableHours) || isNaN(tax) || isNaN(expenses)) {
      return;
    }

    const grossWeeklyIncome = rate * billableHours;
    const afterTaxIncome = grossWeeklyIncome * (1 - tax);
    const netWeeklyIncome = afterTaxIncome - expenses;
    const effectiveHourlyRate = netWeeklyIncome / totalHours;

    setResult({ grossWeeklyIncome, netWeeklyIncome, effectiveHourlyRate });
  };

  const reset = () => {
    setHourlyRate("");
    setHoursPerWeek("");
    setBillableHoursPerWeek("");
    setTaxRate("");
    setBusinessExpenses("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Freelance Effective Hourly Rate Calculator</h1>
          <p className="text-muted-foreground">
            Know what you actually earn per hour. Calculate your real effective rate after non-billable hours, taxes, and business expenses are factored in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="Enter your hourly rate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Total Hours Worked Per Week</Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  placeholder="Enter total hours worked"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billableHoursPerWeek">Billable Hours Per Week</Label>
                <Input
                  id="billableHoursPerWeek"
                  type="number"
                  placeholder="Enter billable hours"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="Enter tax rate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessExpenses">Weekly Business Expenses ($)</Label>
                <Input
                  id="businessExpenses"
                  type="number"
                  placeholder="Enter weekly expenses"
                  value={businessExpenses}
                  onChange={(e) => setBusinessExpenses(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEffectiveRate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Effective Hourly Rate</p>
                    <p className="text-3xl font-bold text-primary">${result.effectiveHourlyRate.toFixed(2)}/hr</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Weekly Income</p>
                      <p className="text-lg font-bold">${result.grossWeeklyIncome.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Weekly Income</p>
                      <p className="text-lg font-bold">${result.netWeeklyIncome.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {billableHoursPerWeek} billable hours out of {hoursPerWeek} total hours worked</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This Freelance Effective Hourly Rate Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter your billing rate and hours</p>
                    <p>Input your hourly rate, total hours worked per week, and how many of those hours are actually billable to clients. Most freelancers bill 20-30 hours in a 40-hour work week.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Add taxes and business expenses</p>
                    <p>Enter your estimated tax rate (typically 25-35% for self-employed) and weekly business expenses like software, equipment, home office, and insurance.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review your effective rate</p>
                    <p>The calculator shows what you actually earn per hour after accounting for non-billable time, taxes, and expenses. Use this to evaluate if your rates are sustainable.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Freelance Billable Hour Benchmarks
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Profession</th>
                      <th className="text-left py-3 px-2 font-semibold">Typical Billable %</th>
                      <th className="text-left py-3 px-2 font-semibold">Billable Hours/Week</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Software Developer</td>
                      <td className="py-3 px-2">60-75%</td>
                      <td className="py-3 px-2">24-30 hrs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Graphic Designer</td>
                      <td className="py-3 px-2">50-65%</td>
                      <td className="py-3 px-2">20-26 hrs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Writer/Content Creator</td>
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">16-24 hrs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Consultant</td>
                      <td className="py-3 px-2">70-80%</td>
                      <td className="py-3 px-2">28-32 hrs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Virtual Assistant</td>
                      <td className="py-3 px-2">75-85%</td>
                      <td className="py-3 px-2">30-34 hrs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Billable percentage varies by experience, client type, and how much time you spend on marketing and admin tasks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Effective Hourly Rate
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Your Effective Rate Differs from Your Billing Rate</h4>
                  <p>
                    Your billing rate is what clients pay. Your effective rate is what you keep per hour worked.
                    The gap comes from three sources: non-billable time (marketing, admin, learning), taxes
                    (self-employment tax plus income tax), and business expenses (software, equipment, insurance).
                    A $100/hour billing rate often becomes $40-60/hour effective rate.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">The Billable Hours Reality</h4>
                  <p>
                    Few freelancers bill 40 hours per week. Time goes to client communication, proposals,
                    invoicing, professional development, and finding new clients. Industry data shows
                    independent freelancers average 20-25 billable hours in a 40-hour work week. Agency
                    contractors may reach 30-35 billable hours but have less schedule flexibility.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Self-Employment Tax Impact</h4>
                  <p>
                    Employees split payroll taxes with their employer. Freelancers pay both halves: 15.3%
                    for Social Security and Medicare, plus income tax. A 30% tax rate is a reasonable
                    estimate for many freelancers. This alone reduces a $50/hour rate to $35/hour before
                    expenses and non-billable time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Improving Your Effective Rate
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Raise your rates strategically</p>
                    <p>Increasing rates by 10-20% often loses few clients but directly boosts effective rate. Test with new clients first, then roll out to existing clients at renewal time.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Productize your services</p>
                    <p>Package work into fixed-price offerings based on value delivered, not hours spent. A website audit sold for $500 might take 2 hours, yielding $250/hour effective rate.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce non-billable time</p>
                    <p>Use templates for proposals and contracts. Automate invoicing with tools like FreshBooks or Wave. Batch administrative tasks into specific time blocks instead of letting them fragment your day.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Track your time honestly</p>
                    <p>Use a time tracker like Toggl or Clockify for two weeks. Most freelancers discover they bill far fewer hours than estimated. This data helps set realistic rates and identify time drains.</p>
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
    question: "What is a good effective hourly rate for freelancers?",
    answer: "It depends on your field and location, but $40-75/hour effective rate is common for skilled freelancers in developed countries. Junior freelancers may start at $20-35/hour. Specialized consultants in high-demand fields can reach $100-200/hour effective rate. Compare against local employee salaries plus 30% for benefits and overhead.",
  },
{
    question: "How many billable hours should I expect per week?",
    answer: "Most independent freelancers bill 20-25 hours per week in a 40-hour work week. The rest goes to marketing, admin, client communication, and skill development. If you consistently bill under 15 hours, either raise rates significantly or investigate why client work is scarce. Over 35 billable hours weekly suggests you are undercharging.",
  },
{
    question: "What expenses can freelancers deduct?",
    answer: "Common deductions include home office (portion of rent/utilities), software subscriptions, equipment and supplies, professional development, marketing costs, business insurance, and a portion of phone/internet. Self-employment tax and health insurance premiums may also be deductible. Consult a tax professional for your situation.",
  },
{
    question: "Should I charge hourly or project-based?",
    answer: "Project pricing often yields higher effective rates because you capture value rather than time. However, hourly works well for ongoing support or uncertain scopes. Many freelancers use both: project pricing for defined deliverables, hourly for maintenance or discovery work. Always calculate the implied hourly rate before accepting fixed-price work.",
  },
{
    question: "How often should I raise my freelance rates?",
    answer: "Annual increases of 5-10% keep pace with inflation and growing experience. Raise rates more aggressively (15-25%) when changing specialties, adding certifications, or if you are consistently booked solid. New clients should always get current rates; grandfather existing clients only if strategically valuable.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
