"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Faqs from "@/components/utils/Faqs";


export default function OvulationCalculator() {
  const [lmpDate, setLmpDate] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<string>("28");
  const [ovulationDate, setOvulationDate] = useState<Date | null>(null);
  const [fertileWindowStart, setFertileWindowStart] = useState<Date | null>(null);
  const [fertileWindowEnd, setFertileWindowEnd] = useState<Date | null>(null);
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null);

  const calculate = () => {
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    const cycle = parseInt(cycleLength);

    // Ovulation = LMP + (cycleLength - 14) days
    const ovulationDay = cycle - 14;
    const ovulation = new Date(lmp);
    ovulation.setDate(ovulation.getDate() + ovulationDay);

    // Fertile window = ovulation - 5 days to ovulation + 1 day
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Next period date
    const nextPeriod = new Date(lmp);
    nextPeriod.setDate(nextPeriod.getDate() + cycle);

    setOvulationDate(ovulation);
    setFertileWindowStart(fertileStart);
    setFertileWindowEnd(fertileEnd);
    setNextPeriodDate(nextPeriod);
  };

  const reset = () => {
    setLmpDate("");
    setCycleLength("28");
    setOvulationDate(null);
    setFertileWindowStart(null);
    setFertileWindowEnd(null);
    setNextPeriodDate(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const formatDateShort = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="lmpDate">First Day of Last Period</Label>
              <Input
                id="lmpDate"
                type="date"
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
              <Select value={cycleLength} onValueChange={setCycleLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="21">21 days</SelectItem>
                  <SelectItem value="22">22 days</SelectItem>
                  <SelectItem value="23">23 days</SelectItem>
                  <SelectItem value="24">24 days</SelectItem>
                  <SelectItem value="25">25 days</SelectItem>
                  <SelectItem value="26">26 days</SelectItem>
                  <SelectItem value="27">27 days</SelectItem>
                  <SelectItem value="28">28 days (average)</SelectItem>
                  <SelectItem value="29">29 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="31">31 days</SelectItem>
                  <SelectItem value="32">32 days</SelectItem>
                  <SelectItem value="33">33 days</SelectItem>
                  <SelectItem value="34">34 days</SelectItem>
                  <SelectItem value="35">35 days</SelectItem>
                  <SelectItem value="36">36 days</SelectItem>
                  <SelectItem value="37">37 days</SelectItem>
                  <SelectItem value="38">38 days</SelectItem>
                  <SelectItem value="39">39 days</SelectItem>
                  <SelectItem value="40">40 days</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                A typical cycle ranges from 21 to 35 days, with 28 days being average.
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Ovulation</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {ovulationDate && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Ovulation Date</p>
                  <p className="text-4xl font-bold mt-1">{formatDate(ovulationDate)}</p>
                </div>

                <div className="p-3 bg-background rounded-md border border-border">
                  <p className="text-sm font-medium text-primary">Fertile Window</p>
                  <p className="text-lg font-semibold mt-1">
                    {formatDateShort(fertileWindowStart)} - {formatDateShort(fertileWindowEnd)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your most fertile days are the 5 days before ovulation and the day of ovulation.
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Fertile Window Opens:</span>
                    <span className="font-medium">{formatDateShort(fertileWindowStart)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Peak Fertility:</span>
                    <span className="font-medium">{formatDateShort(ovulationDate)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Fertile Window Closes:</span>
                    <span className="font-medium">{formatDateShort(fertileWindowEnd)}</span>
                  </div>
                  {nextPeriodDate && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Next Expected Period:</span>
                      <span className="font-medium">{formatDateShort(nextPeriodDate)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Tip:</span> For best chances of conception, have intercourse every other day during your fertile window, especially on the 2-3 days leading up to ovulation.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground">
                  Note: This calculator provides estimates based on average cycle patterns. Actual ovulation may vary due to stress, illness, lifestyle changes, and other factors.
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
              How to Use This Ovulation Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your last period date</p>
                  <p>Select the first day of your last menstrual period (LMP) from the date picker.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your cycle length</p>
                  <p>Choose your average cycle length. If unsure, 28 days is the statistical average.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Calculate your fertile window</p>
                  <p>Click Calculate Ovulation to see your predicted ovulation date and 6-day fertile window.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Fertile Window by Cycle Length
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Cycle Length</th>
                    <th className="text-left py-3 px-2 font-semibold">Ovulation Day</th>
                    <th className="text-left py-3 px-2 font-semibold">Fertile Window</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">21 days</td>
                    <td className="py-3 px-2">Day 7</td>
                    <td className="py-3 px-2">Days 2-8</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">24 days</td>
                    <td className="py-3 px-2">Day 10</td>
                    <td className="py-3 px-2">Days 5-11</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">28 days</td>
                    <td className="py-3 px-2">Day 14</td>
                    <td className="py-3 px-2">Days 9-15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">30 days</td>
                    <td className="py-3 px-2">Day 16</td>
                    <td className="py-3 px-2">Days 11-17</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">32 days</td>
                    <td className="py-3 px-2">Day 18</td>
                    <td className="py-3 px-2">Days 13-19</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">35 days</td>
                    <td className="py-3 px-2">Day 21</td>
                    <td className="py-3 px-2">Days 16-22</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Day 1 is the first day of your period. Ovulation occurs about 14 days before the next period.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Ovulation and Fertility
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">When Does Ovulation Occur?</h4>
                <p>
                  Ovulation typically happens 14 days before your next period starts — not 14 days after
                  your last period. This is why women with shorter cycles ovulate earlier and those with
                  longer cycles ovulate later. The luteal phase (after ovulation) is relatively fixed at
                  12-16 days for most women.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What Is the Fertile Window?</h4>
                <p>
                  The fertile window spans 6 days: the 5 days before ovulation plus ovulation day itself.
                  Sperm can survive up to 5 days in fertile cervical mucus. The egg lives only 12-24 hours
                  after release. Peak fertility is the 2-3 days immediately before ovulation.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Signs of Ovulation</h4>
                <p>
                  Physical signs include clear, stretchy cervical mucus (like egg whites), slight rise in
                  basal body temperature after ovulation, mild pelvic pain (mittelschmerz), and increased
                  libido. Ovulation predictor kits detect the LH surge that triggers ovulation 24-36 hours
                  before release.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Conception
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Time intercourse correctly</p>
                  <p>Have sex every 1-2 days during your fertile window, especially the 2 days before ovulation.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Track your cycles</p>
                  <p>Use a calendar or app to record period dates. After 3-6 months, you will see your personal pattern.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Take prenatal vitamins</p>
                  <p>Start folic acid (400-800 mcg daily) before conception to reduce neural tube defect risk.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Maintain healthy lifestyle</p>
                  <p>Aim for healthy weight, limit caffeine and alcohol, avoid smoking, and manage stress levels.</p>
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
    question: "How accurate is this ovulation calculator?",
    answer: "For women with regular cycles, predictions are reasonably accurate. However, ovulation can vary by a few days month to month due to stress, illness, or lifestyle changes. Use this as a guide, not a guarantee. Combine with ovulation tests for better accuracy.",
  },
{
    question: "Can I get pregnant outside my fertile window?",
    answer: "It is unlikely but not impossible. Sperm survival is typically 3-5 days maximum. The egg survives only 12-24 hours. Pregnancy outside the calculated window usually means ovulation occurred earlier or later than predicted — cycles are not always perfectly regular.",
  },
{
    question: "What if my cycles are irregular?",
    answer: "Irregular cycles make prediction harder. Track for several months to find your range. Consider ovulation predictor kits, basal body temperature charting, or cervical mucus monitoring. If cycles are consistently irregular, consult a healthcare provider.",
  },
{
    question: "How long does it take to conceive?",
    answer: "For healthy couples in their 20s having regular unprotected sex, about 80% conceive within 6 months and 90% within a year. Fertility declines with age, especially after 35. Seek evaluation if not pregnant after 12 months (or 6 months if over 35).",
  },
{
    question: "Can stress affect ovulation?",
    answer: "Yes. Significant stress can delay or prevent ovulation by affecting hormone signals from the brain. This is why ovulation may shift during stressful periods. Managing stress through exercise, sleep, and relaxation techniques may help regulate cycles.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
