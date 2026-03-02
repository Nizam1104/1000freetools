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
    </div>
  );
}
