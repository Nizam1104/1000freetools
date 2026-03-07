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

      {/* How It Works Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">How to Calculate Training Volume</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold mb-2">Add Your Exercises</h3>
              <p className="text-sm text-muted-foreground">Enter each exercise from your workout with sets, reps, and weight used.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold mb-2">Select Weight Unit</h3>
              <p className="text-sm text-muted-foreground">Choose kilograms or pounds for your training volume calculation.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold mb-2">Get Total Volume</h3>
              <p className="text-sm text-muted-foreground">See your total training volume for tracking progressive overload.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Why Track Training Volume</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Progressive Overload Tracking</h3>
            <p className="text-sm text-muted-foreground">Monitor volume increases over time to ensure you're progressively challenging your muscles for growth.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Workout Comparison</h3>
            <p className="text-sm text-muted-foreground">Compare volume between sessions to identify which workouts provide the best stimulus.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Volume Landmarking</h3>
            <p className="text-sm text-muted-foreground">Establish baseline volumes for each muscle group to optimize your training programming.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Recovery Management</h3>
            <p className="text-sm text-muted-foreground">Track weekly volume to avoid overtraining and ensure adequate recovery between sessions.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold mb-3">Recommended Weekly Volume by Muscle Group</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Muscle Group</th>
                <th className="text-left py-2">Beginner</th>
                <th className="text-left py-2">Intermediate</th>
                <th className="text-left py-2">Advanced</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Chest</td>
                <td className="py-2">6-10 sets</td>
                <td className="py-2">10-16 sets</td>
                <td className="py-2">16-22 sets</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Back</td>
                <td className="py-2">8-12 sets</td>
                <td className="py-2">12-20 sets</td>
                <td className="py-2">18-25 sets</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Shoulders</td>
                <td className="py-2">6-10 sets</td>
                <td className="py-2">10-16 sets</td>
                <td className="py-2">14-20 sets</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Quads</td>
                <td className="py-2">6-10 sets</td>
                <td className="py-2">10-16 sets</td>
                <td className="py-2">14-22 sets</td>
              </tr>
              <tr>
                <td className="py-2">Hamstrings</td>
                <td className="py-2">4-8 sets</td>
                <td className="py-2">8-14 sets</td>
                <td className="py-2">12-18 sets</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">What is training volume?</h3>
            <p className="text-sm text-muted-foreground">Training volume is the total amount of work done in a workout, calculated as Sets × Reps × Weight. It's the primary driver of muscle growth and a key metric for tracking progressive overload.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How much volume do I need for muscle growth?</h3>
            <p className="text-sm text-muted-foreground">Research suggests 10-20 hard sets per muscle group per week for most lifters. Beginners need less (6-10 sets), while advanced lifters may need 16-22+ sets for continued growth.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Should I track volume per workout or per week?</h3>
            <p className="text-sm text-muted-foreground">Track both. Per-workout volume helps balance individual sessions. Weekly volume ensures you're hitting optimal totals for each muscle group across your training split.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is more volume always better?</h3>
            <p className="text-sm text-muted-foreground">No. There's a point of diminishing returns where extra volume provides no additional benefit and may impair recovery. Most people maximize growth at 10-20 sets per muscle per week.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How do I increase training volume safely?</h3>
            <p className="text-sm text-muted-foreground">Add volume gradually—5-10% per week maximum. Add a set to an exercise, increase reps, or add a new exercise. Monitor recovery and reduce volume if performance declines.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
    </div>
  );
}
