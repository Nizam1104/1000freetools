"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AnniversaryCalculator() {
  const [anniversaryDate, setAnniversaryDate] = useState<string>("");
  const [anniversaryType, setAnniversaryType] = useState<string>("wedding");
  const [results, setResults] = useState<{
    yearsSince: number;
    monthsSince: number;
    daysSince: number;
    totalDays: number;
    nextAnniversary: string;
    daysUntilNext: number;
    nextAnniversaryDay: string;
    nextAnniversaryYear: number;
  } | null>(null);

  useEffect(() => {
    if (!anniversaryDate) {
      setResults(null);
      return;
    }

    const anniversary = new Date(anniversaryDate);
    const now = new Date();

    // Calculate time since anniversary
    const diffTime = now.getTime() - anniversary.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years, months, days
    let yearsSince = now.getFullYear() - anniversary.getFullYear();
    let monthsSince = now.getMonth() - anniversary.getMonth();
    let daysSince = now.getDate() - anniversary.getDate();

    if (daysSince < 0) {
      monthsSince--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      daysSince += lastMonth.getDate();
    }

    if (monthsSince < 0) {
      yearsSince--;
      monthsSince += 12;
    }

    // If anniversary is in the future
    if (totalDays < 0) {
      setResults(null);
      return;
    }

    // Calculate next anniversary
    let nextAnniversaryYear = now.getFullYear();
    let nextAnniversary = new Date(anniversary);
    nextAnniversary.setFullYear(nextAnniversaryYear);

    // If this year's anniversary has passed, calculate next year's
    if (now > nextAnniversary) {
      nextAnniversaryYear = now.getFullYear() + 1;
      nextAnniversary = new Date(anniversary);
      nextAnniversary.setFullYear(nextAnniversaryYear);
    }

    const daysUntilNext = Math.ceil((nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const nextAnniversaryDay = nextAnniversary.toLocaleDateString("en-US", { weekday: "long" });

    setResults({
      yearsSince,
      monthsSince,
      daysSince,
      totalDays,
      nextAnniversary: nextAnniversary.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric"
      }),
      daysUntilNext,
      nextAnniversaryDay,
      nextAnniversaryYear,
    });
  }, [anniversaryDate]);

  const reset = () => {
    setAnniversaryDate("");
    setAnniversaryType("wedding");
    setResults(null);
  };

  const getAnniversaryName = (years: number): string => {
    const names: { [key: number]: string } = {
      1: "Paper",
      2: "Cotton",
      3: "Leather",
      4: "Fruit/Flowers",
      5: "Wood",
      6: "Iron",
      7: "Wool/Copper",
      8: "Bronze",
      9: "Pottery",
      10: "Tin/Aluminum",
      11: "Steel",
      12: "Silk",
      13: "Lace",
      14: "Ivory",
      15: "Crystal",
      20: "China",
      25: "Silver",
      30: "Pearl",
      35: "Coral",
      40: "Ruby",
      45: "Sapphire",
      50: "Gold",
      55: "Emerald",
      60: "Diamond",
    };
    return names[years] || "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="anniversaryDate">Anniversary Date</Label>
              <Input
                id="anniversaryDate"
                type="date"
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
              />
            </div>

            <div>
              <Label>Anniversary Type</Label>
              <Select value={anniversaryType} onValueChange={setAnniversaryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding Anniversary</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="relationship">Relationship</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Time Since Your {anniversaryType === "wedding" ? "Wedding" : anniversaryType.charAt(0).toUpperCase() + anniversaryType.slice(1)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.yearsSince}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.yearsSince === 1 ? "Year" : "Years"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.monthsSince}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.monthsSince === 1 ? "Month" : "Months"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.daysSince}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.daysSince === 1 ? "Day" : "Days"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.totalDays}</p>
                      <p className="text-xs text-muted-foreground">Total Days</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Next Anniversary</p>
                  <div className="p-4 bg-background rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{results.daysUntilNext}</p>
                      <p className="text-sm text-muted-foreground">
                        {results.daysUntilNext === 1 ? "day until" : "days until"}
                      </p>
                      <p className="font-medium mt-2">{results.nextAnniversary}</p>
                      <p className="text-sm text-muted-foreground">
                        {results.nextAnniversaryDay}
                        {results.yearsSince + 1 <= 60 && getAnniversaryName(results.yearsSince + 1) && (
                          <span> • {getAnniversaryName(results.yearsSince + 1)} Anniversary</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Anniversary Gift Guide</p>
                  <div className="text-xs grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[1, 5, 10, 15, 20, 25, 30, 40, 50].map((year) => (
                      <div key={year} className="p-2 bg-background rounded">
                        <span className="font-medium">{year}yr:</span> {getAnniversaryName(year)}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  Traditional anniversary gift names are shown for wedding anniversaries. Celebrate every moment!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto mt-12 space-y-12">
        
        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">How to Use This Anniversary Calculator</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-1">Enter Your Anniversary Date</h3>
                <p className="text-muted-foreground">Select the date of your wedding, relationship start, or any special occasion you want to track from the date picker.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-1">Choose the Anniversary Type</h3>
                <p className="text-muted-foreground">Pick whether this is a wedding anniversary, birthday, relationship milestone, engagement, or another special date.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-1">View Your Results</h3>
                <p className="text-muted-foreground">Instantly see how many years, months, and days have passed, plus when your next anniversary falls and what traditional gift corresponds to that year.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Anniversary Milestones */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Understanding Anniversary Milestones</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Anniversaries mark the passage of time in our most important relationships. They give us a chance to pause, reflect on what we have built together, and celebrate the commitment we have made to one another.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Why We Celebrate Anniversaries</h3>
            <p className="text-muted-foreground mb-4">
              Celebrating anniversaries is about more than just marking another year on the calendar. These milestones help couples acknowledge their growth, remember the challenges they have overcome, and renew their commitment to the future. Research shows that couples who celebrate milestones together report higher relationship satisfaction.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Traditional Milestone Years</h3>
            <p className="text-muted-foreground mb-4">
              Certain anniversary years have special significance in Western culture. The first anniversary marks surviving that challenging first year of marriage. The fifth anniversary shows you have built something stable. The tenth represents a full decade together. The 25th and 50th anniversaries are considered the most significant, representing a quarter-century and half-century of commitment respectively.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Modern Anniversary Gift Lists</h3>
            <p className="text-muted-foreground mb-4">
              Alongside traditional gifts, modern anniversary gift lists were created to offer more contemporary options. These lists include items like clocks, silverware, and diamond jewelry that better reflect modern lifestyles while still honoring the spirit of the tradition.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Cultural Variations in Anniversary Traditions</h3>
            <p className="text-muted-foreground mb-4">
              Different cultures celebrate anniversaries in unique ways. In some Asian cultures, certain milestone birthdays and anniversaries are celebrated with large family gatherings. In Latin American cultures, the 15th birthday (quinceañera) is a major milestone. German couples sometimes receive a new wedding ring for significant anniversaries. The specific materials associated with each year also vary between countries and traditions.
            </p>
          </div>
        </section>

        {/* Traditional Anniversary Gifts Table */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Traditional Anniversary Gifts by Year</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Anniversary Year</th>
                  <th className="text-left py-3 px-4 font-semibold">Traditional Gift</th>
                  <th className="text-left py-3 px-4 font-semibold">Symbolism</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">1st Anniversary</td>
                  <td className="py-3 px-4">Paper</td>
                  <td className="py-3 px-4">A blank page for your new life together</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">5th Anniversary</td>
                  <td className="py-3 px-4">Wood</td>
                  <td className="py-3 px-4">Strong roots and growing strength</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">10th Anniversary</td>
                  <td className="py-3 px-4">Tin/Aluminum</td>
                  <td className="py-3 px-4">Durability and flexibility in your relationship</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">15th Anniversary</td>
                  <td className="py-3 px-4">Crystal</td>
                  <td className="py-3 px-4">Clear, sparkling love that reflects light</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">20th Anniversary</td>
                  <td className="py-3 px-4">China</td>
                  <td className="py-3 px-4">Elegant and refined, yet requires care</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">25th Anniversary</td>
                  <td className="py-3 px-4">Silver</td>
                  <td className="py-3 px-4">Radiant and precious, a quarter-century milestone</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">30th Anniversary</td>
                  <td className="py-3 px-4">Pearl</td>
                  <td className="py-3 px-4">Beauty formed over time through patience</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">40th Anniversary</td>
                  <td className="py-3 px-4">Ruby</td>
                  <td className="py-3 px-4">Passionate, enduring love</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">50th Anniversary</td>
                  <td className="py-3 px-4">Gold</td>
                  <td className="py-3 px-4">Precious, rare, and timeless</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">60th Anniversary</td>
                  <td className="py-3 px-4">Diamond</td>
                  <td className="py-3 px-4">Unbreakable bond, the hardest substance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Modern Anniversary Gift Alternatives */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Modern Anniversary Gift Alternatives</h2>
          <p className="text-muted-foreground mb-6">
            Modern gift lists offer contemporary alternatives to traditional materials. These options often work better for couples who prefer practical or experience-based gifts.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-1">1st Anniversary</h3>
              <p className="text-muted-foreground">Clocks – Symbolizing the time you have spent together and the time ahead</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-1">5th Anniversary</h3>
              <p className="text-muted-foreground">Silverware – Representing the shared meals and home you have built</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-1">10th Anniversary</h3>
              <p className="text-muted-foreground">Diamond jewelry – A lasting symbol of your decade together</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-1">15th Anniversary</h3>
              <p className="text-muted-foreground">Watches – Marking the precious time you continue to share</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-1">20th Anniversary</h3>
              <p className="text-muted-foreground">Platinum – Strong, rare, and naturally white, like enduring love</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-1">25th Anniversary</h3>
              <p className="text-muted-foreground">Silver holloware – Elegant serving pieces for celebrating together</p>
            </div>
          </div>
        </section>

        {/* Planning Anniversary Celebrations */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Planning Anniversary Celebrations</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Small Gestures for Early Years</h3>
              <p className="text-muted-foreground mb-3">
                The first few anniversaries do not need grand gestures. A handwritten letter, recreating your first date, or a simple dinner at home can be just as meaningful. Many couples find that these intimate celebrations become cherished traditions. Focus on creating memories rather than spending money.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Bigger Celebrations for Milestones</h3>
              <p className="text-muted-foreground mb-3">
                Milestone anniversaries like the 10th, 25th, or 50th often call for something more significant. This might mean renewing vows, taking a dream vacation, hosting a party with family and friends, or investing in a meaningful piece of jewelry. These celebrations mark not just your relationship, but the life you have built together.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Renewing Vows at 25 and 50 Years</h3>
              <p className="text-muted-foreground mb-3">
                Vow renewals have become increasingly popular for milestone anniversaries. They give couples a chance to reaffirm their commitment after years of growth and change. Some couples renew vows privately, while others host ceremonies with the family they have raised together. There are no rules – make it meaningful for you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Experience Gifts vs Traditional Gifts</h3>
              <p className="text-muted-foreground mb-3">
                Many modern couples prefer experiences over physical gifts. A cooking class, weekend getaway, concert tickets, or adventure activity creates memories you share together. That said, traditional gifts have their place – they serve as tangible reminders of your milestone that you can keep and display for years.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What are the traditional anniversary gifts by year?</h3>
              <p className="text-muted-foreground">
                Traditional anniversary gifts follow a specific list: 1st year is paper, 5th is wood, 10th is tin or aluminum, 15th is crystal, 20th is china, 25th is silver, 30th is pearl, 40th is ruby, 50th is gold, and 60th is diamond. Each material symbolizes different aspects of a growing relationship.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Why is the 25th anniversary called "silver"?</h3>
              <p className="text-muted-foreground">
                Silver has long been associated with value, brilliance, and endurance. Reaching 25 years of marriage was historically rare, so it deserved a precious metal. Silver represents the radiance and clarity that comes with a quarter-century of commitment, while also being valuable enough to mark such an important milestone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the most important anniversary milestone?</h3>
              <p className="text-muted-foreground">
                The 50th anniversary (golden anniversary) is generally considered the most significant milestone, representing half a century together. The 25th (silver) is also highly celebrated. However, many couples find the 10th anniversary particularly meaningful as it marks surviving the first decade and building a stable foundation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Are there anniversary gifts for every year?</h3>
              <p className="text-muted-foreground">
                Yes, traditional and modern gift lists exist for every anniversary year from 1 through 25, then every 5 years after that. Some lists even include gifts for each year up to 60+. The early years have more variety, while later milestones focus on precious metals and gemstones.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What do different anniversary symbols mean?</h3>
              <p className="text-muted-foreground">
                Each anniversary symbol reflects the stage of your relationship. Early years use fragile materials like paper and cotton, representing new beginnings. Middle years feature stronger materials like wood and iron, showing growing stability. Later years use precious metals and gems, symbolizing the rare value of long-lasting love.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <a href="/calculators/date-difference-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block">
              <h3 className="font-semibold mb-1">Date Difference Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the exact time between any two dates</p>
            </a>
            <a href="/calculators/age-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block">
              <h3 className="font-semibold mb-1">Age Calculator</h3>
              <p className="text-sm text-muted-foreground">Find out your exact age in years, months, and days</p>
            </a>
            <a href="/calculators/countdown-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors block">
              <h3 className="font-semibold mb-1">Countdown Calculator</h3>
              <p className="text-sm text-muted-foreground">Count down days until any special event or date</p>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
