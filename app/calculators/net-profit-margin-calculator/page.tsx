"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function NetProfitMarginCalculatorPage() {
  const [revenue, setRevenue] = useState<string>("");
  const [netIncome, setNetIncome] = useState<string>("");
  const [result, setResult] = useState<{
    netProfitMargin: number;
    profitPerDollar: number;
  } | null>(null);

  const calculateNetProfitMargin = () => {
    const rev = parseFloat(revenue);
    const netInc = parseFloat(netIncome);

    if (isNaN(rev) || rev <= 0) {
      return;
    }

    const netProfitMargin = (netInc / rev) * 100;
    const profitPerDollar = netInc / rev;

    setResult({
      netProfitMargin,
      profitPerDollar,
    });
  };

  const reset = () => {
    setRevenue("");
    setNetIncome("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Net Profit Margin Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your overall bottom-line profitability. Find net profit margin percentage from total revenue and net income after all expenses are accounted for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Enter total revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="netIncome">Net Income (Profit)</Label>
                <Input
                  id="netIncome"
                  type="number"
                  placeholder="Enter net income"
                  value={netIncome}
                  onChange={(e) => setNetIncome(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>Net Profit Margin Guidelines:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>&lt; 5%: Low margin</li>
                    <li>5% - 10%: Average margin</li>
                    <li>10% - 20%: Good margin</li>
                    <li>&gt; 20%: Excellent margin</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateNetProfitMargin} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.netProfitMargin >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Net Profit Margin</p>
                    <p className={`text-3xl font-bold ${result.netProfitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.netProfitMargin.toFixed(2)}%
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Profit per Dollar of Revenue</p>
                    <p className="text-lg font-bold">${result.profitPerDollar.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Net Profit Margin = Net Income / Revenue × 100</p>
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
                How to Use This Net Profit Margin Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter total revenue</p>
                    <p>Input your company's total revenue or sales for the period you are analyzing.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Input net income</p>
                    <p>Enter net income (profit after all expenses, taxes, and interest are deducted).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and review results</p>
                    <p>Click Calculate to see your net profit margin percentage and profit per dollar of revenue.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Net Profit Margin by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-right py-3 px-2 font-semibold">Average Margin</th>
                      <th className="text-left py-3 px-2 font-semibold">Classification</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Software/Technology</td>
                      <td className="text-right py-3 px-2">15-25%</td>
                      <td className="py-3 px-2">High margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Healthcare/Pharma</td>
                      <td className="text-right py-3 px-2">10-20%</td>
                      <td className="py-3 px-2">High margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Financial Services</td>
                      <td className="text-right py-3 px-2">15-30%</td>
                      <td className="py-3 px-2">High margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Retail</td>
                      <td className="text-right py-3 px-2">2-5%</td>
                      <td className="py-3 px-2">Low margin</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Restaurants/Food Service</td>
                      <td className="text-right py-3 px-2">3-8%</td>
                      <td className="py-3 px-2">Low margin</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Manufacturing</td>
                      <td className="text-right py-3 px-2">5-12%</td>
                      <td className="py-3 px-2">Moderate margin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Margins vary widely within industries. Compare your business to similar-sized competitors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Net Profit Margin
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is Net Profit Margin?</h4>
                  <p>
                    Net profit margin shows what percentage of revenue becomes actual profit after all expenses.
                    It is the bottom line of your income statement. A 10% margin means you keep $0.10 of every
                    dollar in sales as profit. This metric reveals overall business efficiency and pricing power.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Net Margin vs Gross Margin vs Operating Margin</h4>
                  <p>
                    Gross margin only considers cost of goods sold. Operating margin includes operating expenses
                    but excludes interest and taxes. Net margin includes everything — COGS, operating expenses,
                    interest, taxes, and one-time items. Net margin gives the complete profitability picture.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why Net Profit Margin Matters</h4>
                  <p>
                    Investors use net margin to compare companies across industries. Lenders assess it for
                    loan approval. Business owners track it to spot problems early. A declining margin signals
                    rising costs or pricing pressure even if revenue grows. Healthy margins provide cushion
                    for economic downturns and funds for reinvestment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Improving Net Profit Margin
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Raise prices strategically</p>
                    <p>Even small price increases flow directly to profit. Test price elasticity before broad changes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Reduce cost of goods sold</p>
                    <p>Negotiate with suppliers, find alternative materials, or improve production efficiency to lower COGS.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Cut unnecessary operating expenses</p>
                    <p>Review subscriptions, utilities, and overhead. Automate repetitive tasks to reduce labor costs.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Focus on high-margin products</p>
                    <p>Analyze profit by product line. Promote and expand high-margin offerings. Consider dropping low-margin items.</p>
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
    question: "What is a good net profit margin?",
    answer: "It depends on your industry. Software companies often achieve 20%+ margins while grocery stores operate on 1-3%. As a general rule: below 5% is low, 5-10% is average, 10-20% is good, and above 20% is excellent. Compare your margin to industry benchmarks for context.",
  },
{
    question: "Can net profit margin be negative?",
    answer: "Yes. Negative net margin means the business is losing money — expenses exceed revenue. Startups often have negative margins initially while building scale. Established businesses with sustained negative margins face serious problems and may not survive long-term.",
  },
{
    question: "How is net profit margin different from ROI?",
    answer: "Net profit margin measures profit as a percentage of sales. Return on investment (ROI) measures profit relative to capital invested. A business can have high margins but low ROI if it requires heavy capital investment. Both metrics together give a fuller picture.",
  },
{
    question: "Why did my margin decrease when revenue increased?",
    answer: "This happens when costs grow faster than sales. Common causes include price discounting to drive volume, rising supplier costs, hiring too quickly, or one-time expenses. Analyze each expense category to identify where margins are eroding.",
  },
{
    question: "Should I focus on margin or revenue growth?",
    answer: "Both matter, but the balance depends on your stage. Early-stage companies often prioritize growth over margin to capture market share. Mature businesses should optimize for profitability. Ideally, pursue profitable growth — increasing revenue while maintaining or improving margins.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
