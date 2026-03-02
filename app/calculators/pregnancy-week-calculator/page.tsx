"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PregnancyWeekCalculator() {
  const [inputMethod, setInputMethod] = useState<"lmp" | "due">("lmp");
  const [lmpDate, setLmpDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [results, setResults] = useState<{
    currentWeek: number;
    currentDay: number;
    trimester: string;
    daysRemaining: number;
    dueDate: string;
    conceptionDate: string;
    lmpDate: string;
  } | null>(null);

  useEffect(() => {
    if (!lmpDate && !dueDate) {
      setResults(null);
      return;
    }

    const now = new Date();
    let calculatedLmp: Date;
    let calculatedDue: Date;

    if (inputMethod === "lmp" && lmpDate) {
      calculatedLmp = new Date(lmpDate);
      // Due date is approximately 280 days (40 weeks) from LMP
      calculatedDue = new Date(calculatedLmp);
      calculatedDue.setDate(calculatedDue.getDate() + 280);
    } else if (inputMethod === "due" && dueDate) {
      calculatedDue = new Date(dueDate);
      // LMP is approximately 280 days before due date
      calculatedLmp = new Date(calculatedDue);
      calculatedLmp.setDate(calculatedLmp.getDate() - 280);
    } else {
      return;
    }

    // Don't calculate if LMP is in the future
    if (calculatedLmp > now) {
      setResults(null);
      return;
    }

    // Calculate pregnancy progress
    const diffTime = now.getTime() - calculatedLmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const currentWeek = Math.floor(diffDays / 7);
    const currentDay = diffDays % 7;

    // Calculate days remaining
    const daysRemaining = Math.ceil((calculatedDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Determine trimester
    let trimester: string;
    if (currentWeek < 13) {
      trimester = "First Trimester";
    } else if (currentWeek < 27) {
      trimester = "Second Trimester";
    } else {
      trimester = "Third Trimester";
    }

    // Calculate estimated conception date (approximately 14 days after LMP)
    const conceptionDate = new Date(calculatedLmp);
    conceptionDate.setDate(conceptionDate.getDate() + 14);

    setResults({
      currentWeek,
      currentDay,
      trimester,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      dueDate: calculatedDue.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric",
        weekday: "long"
      }),
      conceptionDate: conceptionDate.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric"
      }),
      lmpDate: calculatedLmp.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric"
      }),
    });
  }, [lmpDate, dueDate, inputMethod]);

  const reset = () => {
    setLmpDate("");
    setDueDate("");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Pregnancy Week Calculator – Free Due Date & Pregnancy Tracker</CardTitle>
          <CardDescription>
            Calculate your current pregnancy week and due date. Enter your last menstrual period (LMP) or due date to track your pregnancy progress, trimester, and estimated conception date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as "lmp" | "due")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lmp">By LMP</TabsTrigger>
                <TabsTrigger value="due">By Due Date</TabsTrigger>
              </TabsList>
              <TabsContent value="lmp" className="mt-4">
                <div>
                  <Label htmlFor="lmpDate">First Day of Last Menstrual Period</Label>
                  <Input
                    id="lmpDate"
                    type="date"
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="due" className="mt-4">
                <div>
                  <Label htmlFor="dueDate">Estimated Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div className="text-center p-4 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground">Current Pregnancy</p>
                  <p className="text-4xl font-bold mt-2">
                    Week {results.currentWeek}<span className="text-lg">, Day {results.currentDay}</span>
                  </p>
                  <p className="text-lg font-medium mt-2 text-primary">{results.trimester}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium mt-1">{results.dueDate}</p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Days Remaining</p>
                    <p className="font-medium mt-1">
                      {results.daysRemaining > 0 ? `${results.daysRemaining} days` : "Due any day now!"}
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Last Menstrual Period</p>
                    <p className="font-medium mt-1">{results.lmpDate}</p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <p className="text-sm text-muted-foreground">Estimated Conception</p>
                    <p className="font-medium mt-1">{results.conceptionDate}</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Pregnancy Timeline</p>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div className="flex justify-between py-1 border-b">
                      <span>First Trimester:</span>
                      <span>Weeks 1-12</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span>Second Trimester:</span>
                      <span>Weeks 13-26</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span>Third Trimester:</span>
                      <span>Weeks 27-40</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Full Term:</span>
                      <span>Weeks 37-42</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  This calculator uses the standard 28-day cycle assumption. Actual due dates may vary. Always consult your healthcare provider for accurate pregnancy dating.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
