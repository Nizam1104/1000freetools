"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BabyAgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<{
    weeks: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);
  const [milestones, setMilestones] = useState<Array<{ name: string; date: string; daysUntil: number }>>([]);

  useEffect(() => {
    if (!birthDate) {
      setAge(null);
      setMilestones([]);
      return;
    }

    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) {
      setAge(null);
      setMilestones([]);
      return;
    }

    // Calculate age
    const diffTime = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    
    // Calculate months more accurately
    let months = (now.getFullYear() - birth.getFullYear()) * 12;
    months -= birth.getMonth();
    months += now.getMonth();
    
    // Adjust if current day is before birth day
    if (now.getDate() < birth.getDate()) {
      months--;
    }

    // Calculate remaining days after full months
    const birthDateAdjusted = new Date(birth);
    birthDateAdjusted.setMonth(birth.getMonth() + months);
    const remainingDays = Math.floor((now.getTime() - birthDateAdjusted.getTime()) / (1000 * 60 * 60 * 24));

    setAge({
      weeks,
      months: Math.abs(months),
      days: remainingDays >= 0 ? remainingDays : totalDays % 7,
      totalDays,
    });

    // Calculate upcoming milestones
    const milestoneList = [
      { name: "1 Month", months: 1 },
      { name: "2 Months", months: 2 },
      { name: "3 Months", months: 3 },
      { name: "6 Months", months: 6 },
      { name: "9 Months", months: 9 },
      { name: "1 Year", months: 12 },
      { name: "18 Months", months: 18 },
      { name: "2 Years", months: 24 },
      { name: "2.5 Years", months: 30 },
      { name: "3 Years", months: 36 },
    ];

    const upcomingMilestones = milestoneList
      .map((m) => {
        const milestoneDate = new Date(birth);
        milestoneDate.setMonth(birth.getMonth() + m.months);
        const daysUntil = Math.ceil((milestoneDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return {
          name: m.name,
          date: milestoneDate.toLocaleDateString("en-US", { 
            year: "numeric", 
            month: "long", 
            day: "numeric",
            weekday: "long"
          }),
          daysUntil,
        };
      })
      .filter((m) => m.daysUntil > 0)
      .slice(0, 5);

    setMilestones(upcomingMilestones);
  }, [birthDate]);

  const reset = () => {
    setBirthDate("");
    setAge(null);
    setMilestones([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Baby Age Calculator – Free Infant Age Calculator in Weeks and Months</CardTitle>
          <CardDescription>
            Calculate your baby's exact age in weeks, months, and days. Track upcoming developmental milestones and never miss an important date in your baby's growth journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="birthDate">Baby's Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {age && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Age</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{age.months}</p>
                      <p className="text-xs text-muted-foreground">Months</p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{age.weeks}</p>
                      <p className="text-xs text-muted-foreground">Weeks</p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{age.days}</p>
                      <p className="text-xs text-muted-foreground">Days</p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{age.totalDays}</p>
                      <p className="text-xs text-muted-foreground">Total Days</p>
                    </div>
                  </div>
                </div>

                {milestones.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">Upcoming Milestones</p>
                    <div className="space-y-2">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="p-3 bg-background rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{milestone.name}</p>
                              <p className="text-xs text-muted-foreground">{milestone.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-primary">
                                {milestone.daysUntil === 1 ? "Tomorrow" : `in ${milestone.daysUntil} days`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {milestones.length === 0 && (
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground">
                      All listed milestones have passed! Your baby is doing great!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Sections */}
      <div className="max-w-4xl mx-auto mt-8 space-y-8 px-4">
        
        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use This Baby Age Calculator</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-1">Enter Your Baby's Birth Date</h3>
                <p className="text-muted-foreground">Select the exact date your baby was born using the date picker above. Make sure to use the actual birth date, not the due date.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-1">View Instant Results</h3>
                <p className="text-muted-foreground">The calculator immediately shows your baby's current age in months, weeks, days, and total days since birth.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-1">Track Upcoming Milestones</h3>
                <p className="text-muted-foreground">See the next five developmental milestones with exact dates and countdown days, so you know what to expect and when.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Baby Age Milestones */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding Baby Age Milestones</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Why Tracking Baby Age Matters</h3>
              <p className="text-muted-foreground">
                The first year of life is the most rapid period of development your child will ever experience. Tracking your baby's age accurately helps you monitor developmental milestones, schedule appropriate pediatric checkups, and understand what behaviors and skills to expect at each stage. Pediatricians use precise age tracking to assess whether your baby is meeting key developmental markers and to identify any potential concerns early.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Age in Weeks vs Months During the First Year</h3>
              <p className="text-muted-foreground">
                In the early months, doctors often track age in weeks because development happens so quickly. A four-week-old baby is noticeably different from an eight-week-old. After about three months, the focus shifts to months because the pace of change, while still rapid, becomes slightly more predictable. By the time babies reach their first birthday, tracking by months becomes less critical for day-to-day development.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Corrected Age for Premature Babies</h3>
              <p className="text-muted-foreground">
                Babies born before 37 weeks of gestation need special consideration when tracking age. Corrected age (also called adjusted age) accounts for the time the baby would have spent in the womb. This gives a more accurate picture of where the baby should be developmentally compared to full-term infants.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why Doctors Track Differently</h3>
              <p className="text-muted-foreground">
                Healthcare providers use different tracking methods based on the baby's age and health status. During well-baby visits, doctors may reference both chronological age (actual time since birth) and corrected age (for premature babies). This dual tracking ensures appropriate expectations for feeding, sleep, motor skills, and cognitive development.
              </p>
            </div>
          </div>
        </section>

        {/* Baby Development Milestone Table */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Baby Development Milestones by Age</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Age</th>
                  <th className="text-left p-3 font-semibold">Key Milestones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">1 Month</td>
                  <td className="p-3">Lifts head briefly, focuses on faces</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">2 Months</td>
                  <td className="p-3">Social smile, coos, tracks objects</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">4 Months</td>
                  <td className="p-3">Rolls over, laughs, reaches for toys</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">6 Months</td>
                  <td className="p-3">Sits with support, babbles, eats solids</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">9 Months</td>
                  <td className="p-3">Crawls, says "mama/dada", pincer grasp</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">12 Months</td>
                  <td className="p-3">First steps, first words, waves bye-bye</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Note: Every baby develops at their own pace. These milestones represent typical development, but some variation is completely normal. Always discuss concerns with your pediatrician.
          </p>
        </section>

        {/* Age Tracking by Unit */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Age Tracking by Unit: What to Use When</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">0-3 Months: Track in Weeks</h3>
              <p className="text-sm text-muted-foreground">
                Weekly tracking matters most during this period. Rapid changes in feeding patterns, sleep cycles, and early motor development make week-by-week monitoring valuable for parents and doctors.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">3-12 Months: Track in Months</h3>
              <p className="text-sm text-muted-foreground">
                Monthly tracking becomes the standard as development stabilizes somewhat. Most milestone checklists and pediatric assessments use monthly intervals during this period.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">1-2 Years: Track in Months</h3>
              <p className="text-sm text-muted-foreground">
                Continue monthly tracking through the second year. Language explosion, walking, and increasing independence make month-by-month tracking useful for monitoring progress.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">2+ Years: Track in Years</h3>
              <p className="text-sm text-muted-foreground">
                After age two, development slows relative to infancy. Annual tracking becomes sufficient for most purposes, though some parents continue monthly tracking until age three.
              </p>
            </div>
          </div>
        </section>

        {/* Premature Baby Considerations */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Premature Baby Considerations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What Is Corrected Age?</h3>
              <p className="text-muted-foreground">
                Corrected age (or adjusted age) is your baby's age calculated from the due date rather than the actual birth date. It accounts for the weeks of pregnancy that were missed due to early birth. This adjustment helps parents and doctors set appropriate expectations for development.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How to Calculate Corrected Age</h3>
              <p className="text-muted-foreground mb-2">
                To find your premature baby's corrected age:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Determine how many weeks early the baby was born (40 weeks minus gestational age at birth)</li>
                <li>Subtract those weeks from the baby's chronological age (actual time since birth)</li>
                <li>The result is the corrected age</li>
              </ol>
              <p className="text-muted-foreground mt-2">
                Example: A baby born at 32 weeks (8 weeks early) who is now 16 weeks old chronologically would have a corrected age of 8 weeks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When to Use Corrected Age</h3>
              <p className="text-muted-foreground">
                Use corrected age when assessing developmental milestones, introducing solid foods, evaluating growth charts, and discussing expectations with healthcare providers. Most doctors recommend using corrected age until at least 2 years old, though some children may benefit from adjustment until age 3.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When Do Premature Babies "Catch Up"?</h3>
              <p className="text-muted-foreground">
                Many premature babies catch up to their full-term peers by age 2, though this varies significantly based on how early they were born and individual factors. Some children, especially those born very prematurely, may continue to show differences in development through school age. Regular monitoring with healthcare providers ensures appropriate support throughout childhood.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How do I calculate my baby's age in months?</h3>
              <p className="text-muted-foreground">
                Count the number of full months from the birth date to today. If your baby was born on January 15th and today is March 20th, your baby is 2 months old. The calculator above does this automatically and also shows the remaining days beyond the full months.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why track baby age in weeks?</h3>
              <p className="text-muted-foreground">
                During the first three months, babies change dramatically week to week. Weekly tracking helps parents notice important developments in feeding, sleeping, alertness, and early motor skills. It also helps pediatricians identify any concerns during the critical early period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is corrected age for premature babies?</h3>
              <p className="text-muted-foreground">
                Corrected age adjusts for premature birth by calculating age from the original due date rather than the actual birth date. This gives a more accurate picture of where a premature baby should be developmentally and helps set realistic expectations for milestones.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When do babies reach milestones?</h3>
              <p className="text-muted-foreground">
                Milestone timing varies widely between babies. The ranges provided in medical guidelines represent when most babies achieve certain skills, but individual variation is normal. Some babies roll over at 3 months, others at 5 months. Both can be completely typical. Discuss any concerns with your pediatrician rather than comparing to other babies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my baby developing normally?</h3>
              <p className="text-muted-foreground">
                This question worries every parent. Normal development covers a wide range. What matters most is steady progress over time, not hitting exact dates on a chart. Your pediatrician monitors development at regular checkups and can address specific concerns. Trust your instincts if something feels off, but also remember that babies develop at their own individual pace.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <a href="/calculators/baby-feeding-chart-calculator" className="p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors block">
              <h3 className="font-semibold mb-1">Baby Feeding Chart Calculator</h3>
              <p className="text-sm text-muted-foreground">Track feeding schedules and amounts for breastfed and formula-fed babies.</p>
            </a>
            <a href="/calculators/baby-sleep-schedule-calculator" className="p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors block">
              <h3 className="font-semibold mb-1">Baby Sleep Schedule Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate optimal nap times and bedtime based on your baby's age and wake windows.</p>
            </a>
            <a href="/calculators/pregnancy-due-date-calculator" className="p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors block">
              <h3 className="font-semibold mb-1">Pregnancy Due Date Calculator</h3>
              <p className="text-sm text-muted-foreground">Estimate your baby's arrival date based on your last menstrual period or conception date.</p>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
