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
        <CardHeader>
          <CardTitle>Pregnancy Due Date Calculator – When Is My Baby Due?</CardTitle>
          <CardDescription>
            Find your estimated due date instantly with our pregnancy calculator. Enter the date of your last period or conception date to get a personalized birth timeline and week-by-week breakdown.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}
