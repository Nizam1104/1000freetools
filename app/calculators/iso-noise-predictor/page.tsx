"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ISONoisePredictorPage() {
  const [iso, setIso] = useState<string>("800");
  const [sensorSize, setSensorSize] = useState<string>("fullframe");
  const [result, setResult] = useState<{
    noiseLevel: number;
    noiseCategory: string;
    qualityAssessment: string;
    recommendations: string[];
  } | null>(null);

  const calculate = () => {
    const isoValue = parseFloat(iso);
    if (isNaN(isoValue)) return;

    // Sensor size multipliers (smaller sensors = more noise)
    const sensorMultipliers: { [key: string]: number } = {
      "fullframe": 1,
      "aps-c": 1.8,
      "m43": 2.5,
      "1-inch": 4,
      "smartphone": 8
    };

    const multiplier = sensorMultipliers[sensorSize] || 1;

    // Calculate noise level (0-100 scale)
    // Base noise increases logarithmically with ISO
    const baseNoise = Math.log2(isoValue / 100) * 15;
    const noiseLevel = Math.min(baseNoise * multiplier, 100);

    // Determine noise category
    let noiseCategory: string;
    let qualityAssessment: string;
    let recommendations: string[] = [];

    if (noiseLevel < 20) {
      noiseCategory = "Very Low Noise";
      qualityAssessment = "Excellent image quality with minimal visible noise";
      recommendations = ["Perfect for large prints", "No noise reduction needed"];
    } else if (noiseLevel < 40) {
      noiseCategory = "Low Noise";
      qualityAssessment = "Good image quality with slight noise in shadows";
      recommendations = ["Minor noise reduction in post", "Fine for web and small prints"];
    } else if (noiseLevel < 60) {
      noiseCategory = "Moderate Noise";
      qualityAssessment = "Acceptable quality with visible noise";
      recommendations = ["Apply noise reduction in post-processing", "Avoid heavy cropping", "Consider using a tripod for lower ISO"];
    } else if (noiseLevel < 80) {
      noiseCategory = "High Noise";
      qualityAssessment = "Significant noise affecting image quality";
      recommendations = ["Strong noise reduction required", "Best for web use only", "Consider using a faster lens instead"];
    } else {
      noiseCategory = "Very High Noise";
      qualityAssessment = "Severe noise, image quality heavily compromised";
      recommendations = ["Use only in emergencies", "Heavy noise reduction will soften details", "Consider alternative lighting or equipment"];
    }

    setResult({
      noiseLevel: Math.round(noiseLevel * 10) / 10,
      noiseCategory,
      qualityAssessment,
      recommendations
    });
  };

  const reset = () => {
    setIso("800");
    setSensorSize("fullframe");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">ISO Noise Predictor – Estimate Image Noise Level for Any Camera ISO Setting</h1>
          <p className="text-muted-foreground">
            Avoid grainy photos by knowing your camera's ISO limits with our ISO Noise Predictor. Enter your camera model's sensor size and ISO value to predict the expected noise level — helping photographers choose the best ISO for any lighting condition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="iso">ISO Value</Label>
                <Input
                  id="iso"
                  type="number"
                  placeholder="e.g., 800"
                  value={iso}
                  onChange={(e) => setIso(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Common values: 100, 400, 800, 1600, 3200, 6400</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sensor">Sensor Size</Label>
                <Select value={sensorSize} onValueChange={setSensorSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullframe">Full Frame (35mm)</SelectItem>
                    <SelectItem value="aps-c">APS-C</SelectItem>
                    <SelectItem value="m43">Micro Four Thirds</SelectItem>
                    <SelectItem value="1-inch">1-inch Sensor</SelectItem>
                    <SelectItem value="smartphone">Smartphone Sensor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Predict Noise
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Predicted Noise Level</p>
                    <p className={`text-3xl font-bold ${result.noiseLevel < 40 ? "text-green-500" :
                        result.noiseLevel < 60 ? "text-yellow-500" :
                          result.noiseLevel < 80 ? "text-orange-500" : "text-red-500"
                      }`}>{result.noiseCategory}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${result.noiseLevel < 40 ? "bg-green-500" :
                            result.noiseLevel < 60 ? "bg-yellow-500" :
                              result.noiseLevel < 80 ? "bg-orange-500" : "bg-red-500"
                          }`}
                        style={{ width: `${result.noiseLevel}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Score: {result.noiseLevel}/100</p>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Quality Assessment</p>
                    <p className="text-base font-medium mt-1">{result.qualityAssessment}</p>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-semibold text-primary mb-2">Recommendations:</p>
                    <ul className="text-sm space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter ISO and sensor size to predict noise level</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
