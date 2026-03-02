"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function KidneyFunctionEgfrCalculator() {
  const [creatinine, setCreatinine] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [race, setRace] = useState<string>("non-black");
  const [egfr, setEgfr] = useState<number | null>(null);
  const [stage, setStage] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const calculate = () => {
    const creat = parseFloat(creatinine);
    const ageValue = parseFloat(age);

    if (isNaN(creat) || isNaN(ageValue) || creat <= 0 || ageValue <= 0 || !gender) return;

    // CKD-EPI Formula (2009)
    let calculatedEgfr: number;
    const isFemale = gender === "female";
    const isBlack = race === "black";

    // Base multiplier for race
    const raceMultiplier = isBlack ? 1.159 : 1;

    if (isFemale) {
      if (creat <= 0.7) {
        calculatedEgfr = 144 * Math.pow(creat / 0.7, -0.329) * Math.pow(0.993, ageValue) * raceMultiplier;
      } else {
        calculatedEgfr = 144 * Math.pow(creat / 0.7, -1.209) * Math.pow(0.993, ageValue) * raceMultiplier;
      }
    } else {
      if (creat <= 0.9) {
        calculatedEgfr = 141 * Math.pow(creat / 0.9, -0.411) * Math.pow(0.993, ageValue) * raceMultiplier;
      } else {
        calculatedEgfr = 141 * Math.pow(creat / 0.9, -1.209) * Math.pow(0.993, ageValue) * raceMultiplier;
      }
    }

    const roundedEgfr = Math.round(calculatedEgfr);
    setEgfr(roundedEgfr);

    // Determine CKD stage
    let stageValue: string;
    let stageDescription: string;

    if (roundedEgfr >= 90) {
      stageValue = "Stage 1";
      stageDescription = "Normal kidney function with normal or high eGFR";
    } else if (roundedEgfr >= 60) {
      stageValue = "Stage 2";
      stageDescription = "Mildly decreased kidney function";
    } else if (roundedEgfr >= 45) {
      stageValue = "Stage 3a";
      stageDescription = "Mild to moderately decreased kidney function";
    } else if (roundedEgfr >= 30) {
      stageValue = "Stage 3b";
      stageDescription = "Moderately to severely decreased kidney function";
    } else if (roundedEgfr >= 15) {
      stageValue = "Stage 4";
      stageDescription = "Severely decreased kidney function";
    } else {
      stageValue = "Stage 5";
      stageDescription = "Kidney failure - dialysis or transplant may be needed";
    }

    setStage(stageValue);
    setDescription(stageDescription);
  };

  const reset = () => {
    setCreatinine("");
    setAge("");
    setGender("");
    setRace("non-black");
    setEgfr(null);
    setStage("");
    setDescription("");
  };

  const getStageColor = (stageValue: string) => {
    if (stageValue.includes("1")) return "text-green-600";
    if (stageValue.includes("2")) return "text-blue-600";
    if (stageValue.includes("3")) return "text-yellow-600";
    if (stageValue.includes("4")) return "text-orange-600";
    if (stageValue.includes("5")) return "text-red-600";
    return "text-foreground";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Kidney Function eGFR Calculator – Free CKD-EPI Calculator</CardTitle>
          <CardDescription>
            Calculate your estimated Glomerular Filtration Rate (eGFR) using the CKD-EPI formula. Enter serum creatinine, age, gender, and race to assess kidney function and determine CKD stage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="creatinine">Serum Creatinine (mg/dL)</Label>
              <Input
                id="creatinine"
                type="number"
                step="0.1"
                placeholder="e.g., 1.0"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 45"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Race (Optional)</Label>
              <Select value={race} onValueChange={setRace}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="non-black">Non-Black</SelectItem>
                  <SelectItem value="black">Black/African American</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate eGFR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {egfr !== null && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">eGFR</p>
                  <p className="text-4xl font-bold mt-1">{egfr} mL/min/1.73m²</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground">Kidney Disease Stage</p>
                  <p className={`text-2xl font-bold mt-1 ${getStageColor(stage)}`}>{stage}</p>
                  <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">CKD Stages Reference</p>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div className="flex justify-between py-1 border-b">
                      <span>Stage 1:</span>
                      <span>eGFR ≥ 90 (Normal)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span>Stage 2:</span>
                      <span>eGFR 60-89 (Mild)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span>Stage 3a:</span>
                      <span>eGFR 45-59 (Mild-Mod)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span>Stage 3b:</span>
                      <span>eGFR 30-44 (Mod-Severe)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span>Stage 4:</span>
                      <span>eGFR 15-29 (Severe)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Stage 5:</span>
                      <span>eGFR &lt; 15 (Kidney Failure)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  The CKD-EPI formula is more accurate than MDRD, especially at higher eGFR values. This calculator provides an estimate. Consult your healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
