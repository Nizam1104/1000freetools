"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WorkoutVolumeCalculator() {
  const [exercises, setExercises] = useState<{name: string, sets: number, reps: number, weight: number}[]>([
    { name: "", sets: 0, reps: 0, weight: 0 }
  ]);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [totalVolume, setTotalVolume] = useState<number>(0);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, reps: 0, weight: 0 }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const updated = [...exercises];
    updated[index] = {
      ...updated[index],
      [field]: field === "name" ? value : parseFloat(value) || 0
    };
    setExercises(updated);
  };

  const calculate = () => {
    const volume = exercises.reduce((acc, ex) => {
      return acc + (ex.sets * ex.reps * ex.weight);
    }, 0);
    setTotalVolume(volume);
  };

  const reset = () => {
    setExercises([{ name: "", sets: 0, reps: 0, weight: 0 }]);
    setTotalVolume(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Workout Volume Calculator – Track Your Total Training Volume</CardTitle>
          <CardDescription>
            Monitor your workout progress with our training volume calculator. Calculate total sets, reps, and weight lifted to ensure progressive overload and consistent gains.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as "kg" | "lbs")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className="p-4 border rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Exercise {index + 1}</Label>
                  {exercises.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Exercise name (e.g., Bench Press)"
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, "name", e.target.value)}
                />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Sets</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={exercise.sets || ""}
                      onChange={(e) => updateExercise(index, "sets", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Reps</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={exercise.reps || ""}
                      onChange={(e) => updateExercise(index, "reps", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Weight ({unit})</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={exercise.weight || ""}
                      onChange={(e) => updateExercise(index, "weight", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={addExercise}>
                Add Exercise
              </Button>
              <Button onClick={calculate}>Calculate Volume</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {totalVolume > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Total Training Volume</p>
                <p className="text-4xl font-bold mt-1">{totalVolume.toLocaleString()} {unit}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Volume = Sets × Reps × Weight
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
