"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Faqs from "@/components/utils/Faqs";


export default function NPSScoreCalculatorPage() {
  const [promoters, setPromoters] = useState<string>("");
  const [passives, setPassives] = useState<string>("");
  const [detractors, setDetractors] = useState<string>("");
  const [result, setResult] = useState<{
    nps: number;
    totalResponses: number;
    promoterPercent: number;
    passivePercent: number;
    detractorPercent: number;
    rating: string;
    interpretation: string;
  } | null>(null);

  const calculate = () => {
    const prom = parseInt(promoters) || 0;
    const pass = parseInt(passives) || 0;
    const det = parseInt(detractors) || 0;

    const total = prom + pass + det;
    if (total === 0) return;

    const promoterPercent = (prom / total) * 100;
    const passivePercent = (pass / total) * 100;
    const detractorPercent = (det / total) * 100;

    // NPS = % Promoters - % Detractors
    const nps = Math.round(promoterPercent - detractorPercent);

    // Determine rating
    let rating: string;
    let interpretation: string;

    if (nps >= 75) {
      rating = "World Class";
      interpretation = "Exceptional customer loyalty! Your customers are highly likely to recommend your brand.";
    } else if (nps >= 50) {
      rating = "Excellent";
      interpretation = "Strong customer loyalty with great advocacy. Keep up the excellent work!";
    } else if (nps >= 30) {
      rating = "Good";
      interpretation = "Above average loyalty. Most customers are satisfied but there's room for improvement.";
    } else if (nps >= 0) {
      rating = "Average";
      interpretation = "Neutral sentiment. Focus on converting passives and reducing detractors.";
    } else if (nps >= -30) {
      rating = "Poor";
      interpretation = "Below average loyalty. Significant work needed to improve customer experience.";
    } else {
      rating = "Critical";
      interpretation = "Serious customer satisfaction issues. Immediate action required to address customer concerns.";
    }

    setResult({
      nps,
      totalResponses: total,
      promoterPercent: Math.round(promoterPercent * 10) / 10,
      passivePercent: Math.round(passivePercent * 10) / 10,
      detractorPercent: Math.round(detractorPercent * 10) / 10,
      rating,
      interpretation
    });
  };

  const reset = () => {
    setPromoters("");
    setPassives("");
    setDetractors("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">NPS Score Calculator – Calculate Your Net Promoter Score from Survey Results</h1>
          <p className="text-muted-foreground">
            Measure customer loyalty in seconds with our NPS Score Calculator. Enter the number of Promoters, Passives, and Detractors from your survey to calculate your Net Promoter Score — the gold standard for measuring customer satisfaction and brand advocacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="promoters">Promoters (Score 9-10)</Label>
                <Input
                  id="promoters"
                  type="number"
                  placeholder="e.g., 50"
                  value={promoters}
                  onChange={(e) => setPromoters(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Loyal enthusiasts who keep buying and refer others</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passives">Passives (Score 7-8)</Label>
                <Input
                  id="passives"
                  type="number"
                  placeholder="e.g., 30"
                  value={passives}
                  onChange={(e) => setPassives(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Satisfied but unenthusiastic customers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detractors">Detractors (Score 0-6)</Label>
                <Input
                  id="detractors"
                  type="number"
                  placeholder="e.g., 20"
                  value={detractors}
                  onChange={(e) => setDetractors(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Unhappy customers who can damage your brand</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate NPS
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
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Net Promoter Score</p>
                    <p className={`text-5xl font-bold ${result.nps >= 50 ? "text-green-500" :
                        result.nps >= 30 ? "text-blue-500" :
                          result.nps >= 0 ? "text-yellow-500" : "text-red-500"
                      }`}>{result.nps}</p>
                    <p className="text-sm mt-2 font-semibold">{result.rating}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Promoters</span>
                      <span className="text-sm font-semibold">{result.promoterPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${result.promoterPercent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Passives</span>
                      <span className="text-sm font-semibold">{result.passivePercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: `${result.passivePercent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Detractors</span>
                      <span className="text-sm font-semibold">{result.detractorPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: `${result.detractorPercent}%` }} />
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{result.interpretation}</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-1">NPS Scale:</p>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• 75-100: World Class</li>
                      <li>• 50-74: Excellent</li>
                      <li>• 30-49: Good</li>
                      <li>• 0-29: Average</li>
                      <li>• Below 0: Needs Improvement</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter survey responses and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                How to Use This NPS Score Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Count your survey responses</p>
                    <p>Tally how many customers gave scores of 9-10 (Promoters), 7-8 (Passives), and 0-6 (Detractors).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter the counts</p>
                    <p>Input the number of respondents in each category. The calculator handles the percentages automatically.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculate and interpret results</p>
                    <p>Click Calculate to see your NPS score and rating. Use the interpretation to understand what it means.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                NPS Benchmarks by Industry
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Industry</th>
                      <th className="text-right py-3 px-2 font-semibold">Average NPS</th>
                      <th className="text-left py-3 px-2 font-semibold">Top Performers</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">Internet Software & Services</td>
                      <td className="text-right py-3 px-2">30-40</td>
                      <td className="py-3 px-2">50+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Retail Banking</td>
                      <td className="text-right py-3 px-2">25-35</td>
                      <td className="py-3 px-2">45+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">E-commerce</td>
                      <td className="text-right py-3 px-2">30-40</td>
                      <td className="py-3 px-2">50+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Restaurants</td>
                      <td className="text-right py-3 px-2">35-45</td>
                      <td className="py-3 px-2">60+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">Healthcare</td>
                      <td className="text-right py-3 px-2">20-30</td>
                      <td className="py-3 px-2">40+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Telecommunications</td>
                      <td className="text-right py-3 px-2">10-20</td>
                      <td className="py-3 px-2">30+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Benchmarks vary by region and survey methodology. Compare to similar companies in your market.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Net Promoter Score
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">What Is NPS?</h4>
                  <p>
                    Net Promoter Score measures customer loyalty by asking one simple question: "How likely
                    are you to recommend our company/product/service to a friend or colleague?" Respondents
                    rate 0-10. The score ranges from -100 to +100 and predicts business growth better than
                    satisfaction metrics alone.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How NPS Is Calculated</h4>
                  <p>
                    NPS = % Promoters - % Detractors. Passives count toward total respondents but do not
                    affect the score. For example, if 60% are Promoters and 20% are Detractors, NPS = 60 - 20 = 40.
                    The score ignores Passives because they are satisfied but not enthusiastic enough to drive growth.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Why NPS Matters</h4>
                  <p>
                    Promoters buy more, stay longer, and refer new customers. Detractors spread negative
                    word-of-mouth and can damage your brand. Tracking NPS over time reveals whether customer
                    experience improvements are working. High NPS correlates with organic growth and lower
                    customer acquisition costs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Tips for Improving Your NPS
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Follow up with Detractors immediately</p>
                    <p>Contact unhappy customers within 24 hours. Listen to their concerns and fix what went wrong.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Ask Promoters for referrals</p>
                    <p>Happy customers are your best salespeople. Make it easy for them to refer friends with incentives.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Close the loop on feedback</p>
                    <p>Act on what customers tell you. Share insights across teams and track improvements over time.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Survey at the right moment</p>
                    <p>Ask after key interactions (purchase, support call, onboarding). Timing affects response quality.</p>
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
    question: "What is a good NPS score?",
    answer: "Scores above 0 are positive (more Promoters than Detractors). 30-50 is good, 50-70 is excellent, and above 70 is world-class. However, context matters — compare to your industry average. Some industries naturally have lower NPS due to customer expectations.",
  },
{
    question: "How often should I measure NPS?",
    answer: "Survey quarterly for trend tracking. Some companies survey continuously and report rolling averages. Avoid surveying the same customers too frequently — wait at least 90 days between surveys to the same person to prevent survey fatigue.",
  },
{
    question: "Should I track NPS by customer segment?",
    answer: "Yes. Overall NPS can hide important differences. Segment by product line, customer tenure, geography, or account size. You might discover that new customers love you while long-term customers are becoming Detractors — critical insight for retention.",
  },
{
    question: "What is the difference between NPS and CSAT?",
    answer: "CSAT (Customer Satisfaction) measures satisfaction with a specific interaction. NPS measures overall loyalty and likelihood to recommend. CSAT is transactional; NPS is relational. Both are useful — CSAT for operational improvements, NPS for strategic health.",
  },
{
    question: "Can NPS be negative?",
    answer: "Yes. Negative NPS means you have more Detractors than Promoters. This is a warning sign that requires immediate attention. Focus on understanding why customers are unhappy and fixing root causes before trying to acquire new customers.",
  }
  ]} />
</section>

        </div>
      </div>
    </div>
  );
}
