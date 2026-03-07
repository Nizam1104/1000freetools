"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OfficeSpaceResult {
  totalArea: number;
  areaPerEmployee: number;
  maxCapacity: number;
  workspaceBreakdown: {
    workstations: number;
    meetingRooms: number;
    commonAreas: number;
    circulation: number;
  };
  recommendedLayout: string;
  costEstimate: {
    monthlyRent: number;
    perEmployee: number;
  };
  complianceNotes: string[];
}

export default function OfficeSpacePerEmployeeCalculatorPage() {
  const [employeeCount, setEmployeeCount] = useState<string>("");
  const [workspaceType, setWorkspaceType] = useState<string>("hybrid");
  const [totalArea, setTotalArea] = useState<string>("");
  const [areaUnit, setAreaUnit] = useState<string>("sqft");
  const [rentPerSqft, setRentPerSqft] = useState<string>("30");
  const [result, setResult] = useState<OfficeSpaceResult | null>(null);

  const calculate = () => {
    const employees = parseInt(employeeCount) || 0;
    const areaNum = parseFloat(totalArea) || 0;
    const rentNum = parseFloat(rentPerSqft) || 30;

    if (employees === 0) return;

    // Area requirements per employee by workspace type (sq ft)
    const areaRequirements: Record<string, number> = {
      "open": 100,      // Open plan
      "hybrid": 150,    // Hybrid/flexible
      "private": 200,   // Private offices
      "cubicle": 125,   // Traditional cubicles
      "coworking": 80,  // Coworking style
    };

    const areaPerEmployee = areaRequirements[workspaceType] || 150;

    // Calculate total recommended area
    const recommendedArea = employees * areaPerEmployee;

    // If total area provided, calculate capacity
    const actualArea = areaNum > 0 ? (areaUnit === "sqm" ? areaNum * 10.764 : areaNum) : recommendedArea;
    const maxCapacity = Math.floor(actualArea / areaPerEmployee);

    // Workspace breakdown (percentages)
    const breakdown = {
      workstations: 0.45,
      meetingRooms: 0.15,
      commonAreas: 0.20,
      circulation: 0.20,
    };

    // Cost estimates
    const monthlyRent = actualArea * rentNum;
    const perEmployeeCost = monthlyRent / employees;

    // Recommended layout
    let recommendedLayout = "";
    switch (workspaceType) {
      case "open":
        recommendedLayout = "Open floor plan with hot desks, collaboration zones, and phone booths";
        break;
      case "hybrid":
        recommendedLayout = "Mixed layout: 60% assigned desks, 40% hot desks, multiple meeting rooms";
        break;
      case "private":
        recommendedLayout = "Private offices with shared conference rooms and breakout spaces";
        break;
      case "cubicle":
        recommendedLayout = "Traditional cubicle layout with enclosed meeting rooms";
        break;
      case "coworking":
        recommendedLayout = "Flexible seating with variety of work zones and communal areas";
        break;
    }

    // Compliance notes
    const complianceNotes: string[] = [
      "Minimum 50 sq ft per person for fire code compliance",
      "ADA accessibility requirements for pathways and facilities",
      "Minimum ceiling height of 7.5 ft for occupied spaces",
      "HVAC: 20 CFM per person for adequate ventilation",
    ];

    if (areaNum > 0 && areaNum < employees * 50) {
      complianceNotes.unshift("⚠️ WARNING: Space may be below legal occupancy limits!");
    }

    setResult({
      totalArea: parseFloat(actualArea.toFixed(0)),
      areaPerEmployee,
      maxCapacity: areaNum > 0 ? maxCapacity : employees,
      workspaceBreakdown: {
        workstations: Math.round(actualArea * breakdown.workstations),
        meetingRooms: Math.round(actualArea * breakdown.meetingRooms),
        commonAreas: Math.round(actualArea * breakdown.commonAreas),
        circulation: Math.round(actualArea * breakdown.circulation),
      },
      recommendedLayout,
      costEstimate: {
        monthlyRent: Math.round(monthlyRent),
        perEmployee: Math.round(perEmployeeCost),
      },
      complianceNotes,
    });
  };

  const reset = () => {
    setEmployeeCount("");
    setTotalArea("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Office Space Per Employee Calculator – How Much Office Space Do You Need?
          </h1>
          <p className="text-muted-foreground">
            Plan your office space efficiently with our Office Space Calculator.
            Enter your headcount and workspace style to calculate the total square footage
            required per employee — essential for lease planning and workplace design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspace-type">Workspace Type</Label>
                <Select value={workspaceType} onValueChange={setWorkspaceType}>
                  <SelectTrigger id="workspace-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open Plan (100 sq ft/employee)</SelectItem>
                    <SelectItem value="hybrid">Hybrid/Flexible (150 sq ft/employee)</SelectItem>
                    <SelectItem value="private">Private Offices (200 sq ft/employee)</SelectItem>
                    <SelectItem value="cubicle">Cubicles (125 sq ft/employee)</SelectItem>
                    <SelectItem value="coworking">Coworking Style (80 sq ft/employee)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-medium">Optional: Existing Space</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="space-y-1">
                    <Label htmlFor="total-area">Total Area</Label>
                    <Input
                      id="total-area"
                      type="number"
                      value={totalArea}
                      onChange={(e) => setTotalArea(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="area-unit">Unit</Label>
                    <Select value={areaUnit} onValueChange={setAreaUnit}>
                      <SelectTrigger id="area-unit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqft">sq ft</SelectItem>
                        <SelectItem value="sqm">sq meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rent">Estimated Rent ($/sq ft/year)</Label>
                <Input
                  id="rent"
                  type="number"
                  value={rentPerSqft}
                  onChange={(e) => setRentPerSqft(e.target.value)}
                  placeholder="30"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Space Planning Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Recommended Area</p>
                      <p className="text-2xl font-bold text-primary">{result.totalArea.toLocaleString()} sq ft</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Max Capacity</p>
                      <p className="text-2xl font-bold text-primary">{result.maxCapacity}</p>
                      <p className="text-xs text-muted-foreground">employees</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">Area per Employee: {result.areaPerEmployee} sq ft</p>
                    <p className="text-sm text-muted-foreground">{result.recommendedLayout}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Space Allocation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Workstations</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                          </div>
                          <span className="text-sm font-medium w-20 text-right">{result.workspaceBreakdown.workstations.toLocaleString()} sq ft</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Meeting Rooms</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }} />
                          </div>
                          <span className="text-sm font-medium w-20 text-right">{result.workspaceBreakdown.meetingRooms.toLocaleString()} sq ft</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Common Areas</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }} />
                          </div>
                          <span className="text-sm font-medium w-20 text-right">{result.workspaceBreakdown.commonAreas.toLocaleString()} sq ft</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Circulation</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div className="bg-gray-500 h-2 rounded-full" style={{ width: '20%' }} />
                          </div>
                          <span className="text-sm font-medium w-20 text-right">{result.workspaceBreakdown.circulation.toLocaleString()} sq ft</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Estimated Monthly Rent</span>
                      <span className="text-xl font-bold text-green-700 dark:text-green-300">${result.costEstimate.monthlyRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Per Employee</span>
                      <span className="font-medium">${result.costEstimate.perEmployee.toLocaleString()}/month</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Compliance Notes</h4>
                    <ul className="space-y-1">
                      {result.complianceNotes.map((note, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className={note.includes("WARNING") ? "text-red-500" : "text-primary"}>•</span>
                          <span className={note.includes("WARNING") ? "text-red-600 dark:text-red-400" : ""}>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter employee count and click Calculate to see space requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Office Space Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Industry standards for office space allocation:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Open Plan:</strong> 80-120 sq ft per employee
                  </li>
                  <li>
                    <strong>Hybrid:</strong> 125-175 sq ft per employee
                  </li>
                  <li>
                    <strong>Private Offices:</strong> 150-250 sq ft per employee
                  </li>
                  <li>
                    <strong>Cubicles:</strong> 100-150 sq ft per employee
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Post-pandemic trends favor flexible layouts with
                  more collaboration space and fewer assigned desks. Consider 20-30%
                  buffer for growth and hybrid work arrangements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">How to Calculate Office Space Per Employee</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                  <h3 className="font-semibold mb-2">Enter Employee Count</h3>
                  <p className="text-sm text-muted-foreground">Input your current or planned number of employees who will occupy the space.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                  <h3 className="font-semibold mb-2">Choose Workspace Type</h3>
                  <p className="text-sm text-muted-foreground">Select open plan, hybrid, private offices, cubicles, or coworking style layout.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                  <h3 className="font-semibold mb-2">Get Space Requirements</h3>
                  <p className="text-sm text-muted-foreground">View total square footage needed, space breakdown, and estimated monthly rent costs.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Key Features of This Office Space Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Multiple Workspace Types
                  </h3>
                  <p className="text-sm text-muted-foreground">Calculate space for open plan, hybrid, private offices, cubicles, or coworking layouts with industry-standard sq ft per employee.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Space Allocation Breakdown
                  </h3>
                  <p className="text-sm text-muted-foreground">See how your total space divides into workstations, meeting rooms, common areas, and circulation paths.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Cost Estimation
                  </h3>
                  <p className="text-sm text-muted-foreground">Estimate monthly rent costs based on your local rate per square foot and calculate cost per employee.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Compliance Checks
                  </h3>
                  <p className="text-sm text-muted-foreground">Get alerts if your space may be below legal occupancy limits and view fire code requirements.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    Flexible Unit Support
                  </h3>
                  <p className="text-sm text-muted-foreground">Work in square feet or square meters with automatic conversions for international planning.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions About Office Space Planning</h2>
              <div className="space-y-4">
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How much office space do I need per employee?</h3>
                  <p className="text-sm text-muted-foreground">It depends on your workspace type. Open plan needs 80-120 sq ft per person, hybrid layouts need 125-175 sq ft, and private offices require 150-250 sq ft per employee. Include space for desks, meetings, and common areas.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">What is the standard office space allocation?</h3>
                  <p className="text-sm text-muted-foreground">A typical office allocates 45% to workstations, 15% to meeting rooms, 20% to common areas like break rooms and lobbies, and 20% to circulation including hallways and pathways between desks.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How do I calculate office rent per employee?</h3>
                  <p className="text-sm text-muted-foreground">Multiply total square footage by your annual rent per sq ft, divide by 12 for monthly rent, then divide by employee count. For example: 5000 sq ft × $30/sq ft = $150,000/year = $12,500/month = $250/employee/month for 50 employees.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">What is the minimum square footage per person by law?</h3>
                  <p className="text-sm text-muted-foreground">Most building codes require a minimum of 50-100 sq ft per person for office spaces, depending on jurisdiction. This is for fire safety and occupancy limits. Always check your local building codes and ADA accessibility requirements.</p>
                </div>
                <div className="p-5 bg-card rounded-lg border">
                  <h3 className="font-semibold mb-2">How has hybrid work changed office space needs?</h3>
                  <p className="text-sm text-muted-foreground">Hybrid work reduces dedicated desk space by 30-50% but increases collaboration areas. Companies now plan for 60% assigned desks and 40% hot desks, with more meeting rooms and phone booths for remote workers visiting the office.</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
