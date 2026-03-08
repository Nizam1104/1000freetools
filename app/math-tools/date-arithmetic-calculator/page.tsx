"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DateArithmeticCalculator() {
  const [startDate, setStartDate] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [value, setValue] = useState<number>(0);
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [result, setResult] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const calculateDate = () => {
    if (!startDate) {
      setError("Please enter a start date");
      setResult(null);
      return;
    }

    try {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const resultDate = new Date(start);
      const multiplier = operation === "add" ? 1 : -1;

      switch (unit) {
        case "days":
          resultDate.setDate(resultDate.getDate() + (value * multiplier));
          break;
        case "weeks":
          resultDate.setDate(resultDate.getDate() + (value * 7 * multiplier));
          break;
        case "months":
          resultDate.setMonth(resultDate.getMonth() + (value * multiplier));
          break;
        case "years":
          resultDate.setFullYear(resultDate.getFullYear() + (value * multiplier));
          break;
      }

      setResult(resultDate);
      setError("");
    } catch (e) {
      setError("Error calculating date. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setStartDate("");
    setValue(0);
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    setValue(30);
    setOperation("add");
    setUnit("days");
    setResult(null);
  };

  const loadBusinessDays = () => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    setValue(90);
    setOperation("add");
    setUnit("days");
    setResult(null);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getDayDifference = (): number => {
    if (!result) return 0;
    const start = new Date(startDate);
    const diffTime = result.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Date Arithmetic Calculator – Add or Subtract Days, Weeks, Months, Years</h1>
        <p className="text-muted-foreground">
          Add or subtract time from any date with our free online date arithmetic calculator. Calculate future or past dates by adding/subtracting days, weeks, months, or years.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
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
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value) || 0)}
              min="0"
              placeholder="Enter number"
            />
          </div>
          <div>
            <Label>Unit</Label>
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
          <Button onClick={calculateDate}>Calculate Date</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>+30 Days</Button>
          <Button variant="outline" onClick={loadBusinessDays}>+90 Days</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Result Date
              </p>
              <p className="text-3xl font-bold text-primary">{formatDate(result)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.toISOString().split("T")[0]}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{getDayDifference()}</p>
                <p className="text-sm text-muted-foreground">Days Difference</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{Math.floor(Math.abs(getDayDifference()) / 7)}</p>
                <p className="text-sm text-muted-foreground">Weeks Difference</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{result.toLocaleDateString("en-US", { weekday: "long" })}</p>
                <p className="text-sm text-muted-foreground">Day of Week</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Summary</h4>
              <p className="text-sm text-muted-foreground">
                {operation === "add" ? "Added" : "Subtracted"} {value} {unit} {operation === "add" ? "to" : "from"} {new Date(startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
