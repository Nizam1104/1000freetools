"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [result, setResult] = useState<{businessDays: number, totalDays: number} | null>(null);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    let businessDays = 0;
    const current = new Date(start);

    while (current <= end) {
      if (!isWeekend(current)) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    setResult({
      businessDays,
      totalDays
    });
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Days Between Dates</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-3xl font-bold">{result.businessDays}</p>
                    <p className="text-sm text-muted-foreground">Business Days</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{result.totalDays}</p>
                    <p className="text-sm text-muted-foreground">Total Days</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Excludes weekends (Saturday and Sunday). Does not account for holidays.
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
              How to Use This Business Days Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your start date</p>
                  <p>Choose the beginning date of your period. This can be today, a project start date, or any date in the past or future.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your end date</p>
                  <p>Choose the ending date. The calculator counts all business days from start through end, inclusive of both dates.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View business days and total days</p>
                  <p>The result shows business days (Monday-Friday) and total calendar days. Use this for project timelines, delivery estimates, and deadline planning.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Business Days Reference Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Period</th>
                    <th className="text-left py-3 px-2 font-semibold">Total Days</th>
                    <th className="text-left py-3 px-2 font-semibold">Business Days</th>
                    <th className="text-left py-3 px-2 font-semibold">Weekend Days</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1 Week</td>
                    <td className="py-3 px-2">7 days</td>
                    <td className="py-3 px-2">5 days</td>
                    <td className="py-3 px-2">2 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2 Weeks</td>
                    <td className="py-3 px-2">14 days</td>
                    <td className="py-3 px-2">10 days</td>
                    <td className="py-3 px-2">4 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 Month (avg)</td>
                    <td className="py-3 px-2">30 days</td>
                    <td className="py-3 px-2">21-22 days</td>
                    <td className="py-3 px-2">8-9 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 Quarter</td>
                    <td className="py-3 px-2">90 days</td>
                    <td className="py-3 px-2">64-65 days</td>
                    <td className="py-3 px-2">25-26 days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">1 Year</td>
                    <td className="py-3 px-2">365 days</td>
                    <td className="py-3 px-2">260-261 days</td>
                    <td className="py-3 px-2">104-105 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Business days exclude Saturdays and Sundays only. Actual working days may be fewer due to public holidays. A typical year has 260-261 weekdays.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Business Days
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What Counts as a Business Day?</h4>
                <p>
                  Business days are Monday through Friday, excluding weekends. In most countries, these are the standard working days when banks, government offices, and businesses operate. Saturday and Sunday are not business days in most of the world.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Business Days Matter for Deadlines</h4>
                <p>
                  Many contracts and agreements specify business days, not calendar days. A 10 business-day deadline gives you two full weeks. A 10 calendar-day deadline could include two weekends, giving only 6-7 actual working days. Always clarify which type of days apply.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Holidays Are Not Automatically Excluded</h4>
                <p>
                  This calculator counts only weekends, not public holidays. For precise project planning, manually subtract holidays that fall within your period. Different countries and regions have different holiday schedules.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">International Considerations</h4>
                <p>
                  Weekend days vary by country. Most Muslim-majority countries use Friday-Saturday or just Friday as weekend days. Israel uses Saturday (Sabbath) as the primary non-working day. Adjust your calculations for local customs when working internationally.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Project Planning
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Always Specify Business Days in Contracts</p>
                  <p>When setting deadlines, use business days to avoid ambiguity. "15 business days" is clearer than "3 weeks" and accounts for varying month lengths.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Account for Holiday Seasons</p>
                  <p>December and other holiday periods have multiple non-working days. A 2-week deadline spanning Christmas may effectively become 3-4 weeks. Build buffer time around major holidays.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Consider Time Zones for International Work</p>
                  <p>A deadline of "end of business day" means different times across time zones. Specify the time zone or use UTC to avoid confusion when working with international teams.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use Business Days for Shipping Estimates</p>
                  <p>Most carriers ship only on business days. A "3-day shipping" service typically means 3 business days. Order before the weekend to avoid unexpected delays.</p>
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
                <h4 className="font-medium text-foreground mb-2">Does this calculator include holidays?</h4>
                <p>
                  No, this calculator only excludes weekends (Saturday and Sunday). Public holidays vary by country, state, and even city. For accurate planning, manually subtract holidays that fall within your date range.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Are both start and end dates included?</h4>
                <p>
                  Yes, the calculator includes both the start date and end date in the count. If you start on Monday and end on Friday of the same week, that's 5 business days, not 4.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How many business days are in a year?</h4>
                <p>
                  A typical year has 260-261 business days (52 weeks x 5 days). Leap years and the day of the week January 1st falls on can shift this by one day. Subtract holidays for actual working days.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What if my weekend is different?</h4>
                <p>
                  This calculator uses the standard Monday-Friday workweek. If your region uses a different weekend (like Friday-Saturday in some Middle Eastern countries), you'll need to adjust the results accordingly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I calculate business days in the past?</h4>
                <p>
                  Yes, the calculator works for any date range, past or future. This is useful for calculating how many business days elapsed between two historical dates or for timesheet purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
