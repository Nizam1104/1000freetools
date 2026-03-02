"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DateAddSubtractCalculator() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [value, setValue] = useState<string>("");
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [result, setResult] = useState<string>("");

  const calculate = () => {
    if (!startDate || !value) return;

    const val = parseInt(value);
    if (isNaN(val) || val <= 0) return;

    const date = new Date(startDate);
    const multiplier = operation === "add" ? 1 : -1;

    switch (unit) {
      case "days":
        date.setDate(date.getDate() + (val * multiplier));
        break;
      case "weeks":
        date.setDate(date.getDate() + (val * 7 * multiplier));
        break;
      case "months":
        date.setMonth(date.getMonth() + (val * multiplier));
        break;
      case "years":
        date.setFullYear(date.getFullYear() + (val * multiplier));
        break;
    }

    setResult(date.toISOString().split("T")[0]);
  };

  const reset = () => {
    setStartDate(new Date().toISOString().split("T")[0]);
    setValue("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Date Calculator – Add or Subtract Days, Weeks & Months from a Date</CardTitle>
          <CardDescription>
            Find past or future dates instantly by adding or subtracting time from any date. Works with days, weeks, months, and years for deadlines, events, and planning.
          </CardDescription>
        </CardHeader>
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
              <Label>Operation</Label>
              <Select value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add</SelectItem>
                  <SelectItem value="subtract">Subtract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Amount</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="e.g., 30"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as "days" | "weeks" | "months" | "years")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result Date</p>
                <p className="text-4xl font-bold mt-1">{result}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {operation === "add" ? "Added" : "Subtracted"} {value} {unit} {operation === "add" ? "to" : "from"} {startDate}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
