"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState<"lmp" | "conception">("lmp");
  const [lmpDate, setLmpDate] = useState<string>("");
  const [conceptionDate, setConceptionDate] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<string>("28");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState<string>("");
  const [conception, setConception] = useState<Date | null>(null);
  const [firstTrimesterEnd, setFirstTrimesterEnd] = useState<Date | null>(null);
  const [secondTrimesterEnd, setSecondTrimesterEnd] = useState<Date | null>(null);

  const calculate = () => {
    let lmp: Date | null = null;
    let conception: Date | null = null;

    if (method === "lmp" && lmpDate) {
      lmp = new Date(lmpDate);
      // Conception typically occurs around day 14 of a 28-day cycle
      const ovulationDay = parseInt(cycleLength) - 14;
      conception = new Date(lmp);
      conception.setDate(conception.getDate() + ovulationDay);
    } else if (method === "conception" && conceptionDate) {
      conception = new Date(conceptionDate);
      // LMP is approximately 14 days before conception
      lmp = new Date(conception);
      lmp.setDate(lmp.getDate() - 14);
    }

    if (!lmp && !conception) return;

    // Due date = LMP + 280 days (40 weeks) or conception + 266 days
    let due: Date;
    if (lmp) {
      due = new Date(lmp);
      due.setDate(due.getDate() + 280);
    } else {
      due = new Date(conception!);
      due.setDate(due.getDate() + 266);
    }

    // Calculate current pregnancy week
    const today = new Date();
    const referenceDate = lmp || conception!;
    let daysPregnant: number;
    
    if (lmp) {
      daysPregnant = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      // If conception date is used, add 14 days to get equivalent LMP-based pregnancy duration
      daysPregnant = Math.floor((today.getTime() - conception!.getTime()) / (1000 * 60 * 60 * 24)) + 14;
    }

    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;
    let weekString = "";
    
    if (daysPregnant > 0 && daysPregnant <= 280) {
      weekString = `${weeks} weeks and ${days} days`;
    } else if (daysPregnant > 280) {
      weekString = `Past due date by ${daysPregnant - 280} days`;
    } else {
      weekString = "Not yet pregnant (future date)";
    }

    // Trimester end dates
    const firstTrimester = new Date(lmp || conception!);
    firstTrimester.setDate(firstTrimester.getDate() + 91); // 13 weeks
    
    const secondTrimester = new Date(lmp || conception!);
    secondTrimester.setDate(secondTrimester.getDate() + 182); // 26 weeks

    setDueDate(due);
    setConception(conception);
    setCurrentWeek(weekString);
    setFirstTrimesterEnd(firstTrimester);
    setSecondTrimesterEnd(secondTrimester);
  };

  const reset = () => {
    setLmpDate("");
    setConceptionDate("");
    setCycleLength("28");
    setDueDate(null);
    setCurrentWeek("");
    setConception(null);
    setFirstTrimesterEnd(null);
    setSecondTrimesterEnd(null);
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Calculation Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as "lmp" | "conception")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lmp">Last Menstrual Period (LMP)</SelectItem>
                  <SelectItem value="conception">Conception Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {method === "lmp" ? (
              <div>
                <Label htmlFor="lmpDate">First Day of Last Period</Label>
                <Input
                  id="lmpDate"
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="conceptionDate">Conception Date</Label>
                <Input
                  id="conceptionDate"
                  type="date"
                  value={conceptionDate}
                  onChange={(e) => setConceptionDate(e.target.value)}
                />
              </div>
            )}

            {method === "lmp" && (
              <div>
                <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                <Select value={cycleLength} onValueChange={setCycleLength}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Due Date</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {dueDate && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Due Date</p>
                  <p className="text-4xl font-bold mt-1">{formatDate(dueDate)}</p>
                </div>
                
                {conception && (
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Conception Date</p>
                    <p className="text-lg font-medium">{formatDate(conception)}</p>
                  </div>
                )}
                
                {currentWeek && (
                  <div>
                    <p className="text-sm text-muted-foreground">Current Pregnancy Progress</p>
                    <p className="text-lg font-medium">{currentWeek}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-border">
                  <p className="text-sm font-medium mb-2">Trimester Timeline</p>
                  <div className="space-y-1 text-sm">
                    {firstTrimesterEnd && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">First Trimester Ends:</span> {formatDate(firstTrimesterEnd)} (13 weeks)
                      </p>
                    )}
                    {secondTrimesterEnd && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">Second Trimester Ends:</span> {formatDate(secondTrimesterEnd)} (26 weeks)
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      <span className="font-medium">Third Trimester:</span> Week 27 until birth
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground pt-2">
                  Note: Only about 5% of babies are born on their exact due date. Most babies arrive within 2 weeks before or after this date.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Calculate Your Due Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <p className="font-semibold mb-1">Choose your calculation method</p>
              <p className="text-sm text-muted-foreground">Select either last menstrual period (LMP) or conception date as your starting point.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <p className="font-semibold mb-1">Enter the date and cycle length</p>
              <p className="text-sm text-muted-foreground">Input your LMP or conception date. For LMP, also select your average cycle length.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <p className="font-semibold mb-1">Get your due date and timeline</p>
              <p className="text-sm text-muted-foreground">Receive estimated due date, conception date, current week, and trimester breakdown.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Why Track Your Due Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Prenatal care planning</p>
              <p className="text-sm text-muted-foreground">Schedule important screenings and appointments at the right times.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Monitor baby's development</p>
              <p className="text-sm text-muted-foreground">Track weekly milestones and growth expectations throughout pregnancy.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Prepare for arrival</p>
              <p className="text-sm text-muted-foreground">Plan maternity leave, nursery setup, and baby preparations on schedule.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Cycle adjustment</p>
              <p className="text-sm text-muted-foreground">Accounts for cycles longer or shorter than the standard 28 days.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Trimester awareness</p>
              <p className="text-sm text-muted-foreground">Know which trimester you're in for symptom and milestone tracking.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">How is due date calculated from LMP?</p>
              <p className="text-sm text-muted-foreground">Add 280 days (40 weeks) to the first day of your last period. This is Naegele's rule, the standard method used by healthcare providers.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Can I calculate due date from conception?</p>
              <p className="text-sm text-muted-foreground">Yes, add 266 days (38 weeks) to the conception date. This is more accurate if you know when ovulation occurred.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">How accurate are due dates?</p>
              <p className="text-sm text-muted-foreground">Only 5% of babies arrive on their due date. Most are born within 2 weeks before or after. Ultrasound dating is most accurate in first trimester.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Does cycle length affect due date?</p>
              <p className="text-sm text-muted-foreground">Yes, longer cycles mean later ovulation and a later due date. This calculator adjusts for cycles from 24-35 days.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">When should I take a pregnancy test?</p>
              <p className="text-sm text-muted-foreground">Test about 14 days after conception or when your period is late. First morning urine gives the most accurate result.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Related Pregnancy Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Try our other pregnancy calculators: the <a href="/calculators/pregnancy-week-calculator" className="text-primary hover:underline">pregnancy week calculator</a> to track current progress, the <a href="/calculators/pregnancy-weight-gain-calculator" className="text-primary hover:underline">pregnancy weight gain calculator</a> for healthy guidelines, and the <a href="/calculators/ovulation-calculator" className="text-primary hover:underline">ovulation calculator</a> for conception planning.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
