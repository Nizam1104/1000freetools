"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <CardHeader>
          <CardTitle>Ovulation Calculator – Find Your Most Fertile Days</CardTitle>
          <CardDescription>
            Maximize your chances of conception with our ovulation calculator. Get your predicted ovulation date and full fertile window based on your cycle length and last period.
          </CardDescription>
        </CardHeader>
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
    </div>
  );
}
