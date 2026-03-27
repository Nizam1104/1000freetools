"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FlaskConical, Timer } from "lucide-react";
import Faqs from "@/components/utils/Faqs";


interface RateConstantResult {
  rateConstant: number;
  unit: string;
  order: number;
  halfLife: number;
  description: string;
}

export default function ReactionRateConstantCalculatorPage() {
  const [concentration, setConcentration] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [order, setOrder] = useState<"0" | "1" | "2">("1");
  const [concentrationUnit, setConcentrationUnit] = useState<"M" | "mM">("M");
  const [result, setResult] = useState<RateConstantResult | null>(null);

  const calculateRateConstant = () => {
    const conc = parseFloat(concentration);
    const r = parseFloat(rate);

    if (isNaN(conc) || isNaN(r) || conc <= 0 || r <= 0) {
      setResult(null);
      return;
    }

    let k = 0;
    let halfLife = 0;
    let unit = "";

    const orderNum = parseInt(order);

    if (orderNum === 0) {
      k = r;
      halfLife = conc / (2 * k);
      unit = "M/s";
    } else if (orderNum === 1) {
      k = r / conc;
      halfLife = Math.log(2) / k;
      unit = "s⁻¹";
    } else {
      k = r / (conc * conc);
      halfLife = 1 / (k * conc);
      unit = "M⁻¹s⁻¹";
    }

    let description = "";
    if (orderNum === 0) description = "Zero order: Rate independent of concentration";
    else if (orderNum === 1) description = "First order: Rate proportional to concentration";
    else description = "Second order: Rate proportional to concentration squared";

    setResult({
      rateConstant: Math.round(k * 1000000) / 1000000,
      unit,
      order: orderNum,
      halfLife: Math.round(halfLife * 100) / 100,
      description,
    });
  };

  const reset = () => {
    setConcentration("");
    setRate("");
    setResult(null);
  };

  useEffect(() => {
    calculateRateConstant();
  }, [concentration, rate, order, concentrationUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Reaction Rate Constant Calculator – Calculate k from Rate and Concentration</h1>
          <p className="text-muted-foreground">
            Calculate the rate constant (k) for chemical reactions from rate and concentration data. This chemistry calculator supports zero, first, and second order reactions with half-life calculations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Reaction Data</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="concentration">Concentration</Label>
                    <div className="flex gap-2">
                      <Input
                        id="concentration"
                        type="number"
                        placeholder="e.g., 0.1"
                        value={concentration}
                        onChange={(e) => setConcentration(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={concentrationUnit}
                        onChange={(e) => setConcentrationUnit(e.target.value as any)}
                        className="w-20 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="M">M</option>
                        <option value="mM">mM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate">Reaction Rate</Label>
                    <Input
                      id="rate"
                      type="number"
                      placeholder="e.g., 0.001"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="order">Reaction Order</Label>
                    <select
                      id="order"
                      value={order}
                      onChange={(e) => setOrder(e.target.value as any)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="0">Zero Order (0)</option>
                      <option value="1">First Order (1)</option>
                      <option value="2">Second Order (2)</option>
                    </select>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Rate = k × [A]ⁿ where n is the reaction order. Enter rate in M/s (mol/L·s).
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRateConstant} className="flex-1">
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
              <h3 className="text-lg font-semibold mb-4">Rate Constant Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Rate Constant (k)</p>
                    <p className="text-2xl font-bold text-primary">{result.rateConstant} {result.unit}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Half-life</p>
                      <p className="text-lg font-semibold">{result.halfLife} s</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Order</p>
                      <p className="text-lg font-semibold">{result.order}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Rate Law</p>
                    <p className="font-semibold font-mono text-sm">
                      {result.order === 0 && "Rate = k"}
                      {result.order === 1 && "Rate = k[A]"}
                      {result.order === 2 && "Rate = k[A]²"}
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p>{result.description}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FlaskConical className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Enter reaction data to calculate rate constant</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Reaction Order Characteristics</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Zero Order</h4>
                <ul className="space-y-1">
                  <li>Rate = k</li>
                  <li>Units: M/s</li>
                  <li>t½ = [A]₀/2k</li>
                  <li>Rate independent of [A]</li>
                </ul>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">First Order</h4>
                <ul className="space-y-1">
                  <li>Rate = k[A]</li>
                  <li>Units: s⁻¹</li>
                  <li>t½ = ln(2)/k</li>
                  <li>Half-life is constant</li>
                </ul>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Second Order</h4>
                <ul className="space-y-1">
                  <li>Rate = k[A]²</li>
                  <li>Units: M⁻¹s⁻¹</li>
                  <li>t½ = 1/(k[A]₀)</li>
                  <li>Half-life depends on [A]₀</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the rate constant k?",
    answer: "The rate constant k is a proportionality factor in the rate law that relates reaction rate to reactant concentrations. It's specific to each reaction and temperature.",
  },
{
    question: "How do I determine reaction order?",
    answer: "Reaction order is determined experimentally by measuring how rate changes with concentration. Plot concentration vs time data or use the method of initial rates.",
  },
{
    question: "What affects the rate constant?",
    answer: "Temperature (Arrhenius equation), catalysts, and activation energy affect k. Concentration does NOT affect the rate constant itself, only the rate.",
  },
{
    question: "What is half-life?",
    answer: "Half-life is the time for reactant concentration to decrease by half. For first-order reactions, it's constant. For other orders, it depends on initial concentration.",
  },
{
    question: "What are the units of k?",
    answer: "Units depend on order: zero order (M/s), first order (s⁻¹), second order (M⁻¹s⁻¹). General formula: M^(1-n)/s where n is the order.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
