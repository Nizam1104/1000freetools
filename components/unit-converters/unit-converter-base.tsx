"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import type { UnitOption } from "./conversions";

interface UnitConverterBaseProps {
  title: string;
  description: string;
  units: UnitOption[];
  convert: (value: number, fromUnit: string, toUnit: string) => number;
  defaultValue?: number;
  defaultFromUnit?: string;
  defaultToUnit?: string;
}

export function UnitConverterBase({
  title,
  description,
  units,
  convert,
  defaultValue = 1,
  defaultFromUnit,
  defaultToUnit,
}: UnitConverterBaseProps) {
  const [value, setValue] = useState<string>(defaultValue.toString());
  const [fromUnit, setFromUnit] = useState<string>(
    defaultFromUnit || units[0]?.value || "",
  );
  const [toUnit, setToUnit] = useState<string>(
    defaultToUnit || units[1]?.value || units[0]?.value || "",
  );
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && fromUnit && toUnit) {
      setResult(convert(numValue, fromUnit, toUnit));
    } else {
      setResult(null);
    }
  }, [value, fromUnit, toUnit, convert]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setValue(result !== null ? result.toString() : value);
  };

  const handleReset = () => {
    setValue(defaultValue.toString());
    setFromUnit(defaultFromUnit || units[0]?.value || "");
    setToUnit(defaultToUnit || units[1]?.value || units[0]?.value || "");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Value
              </label>
              <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  From
                </label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwap}
                className="mb-[1px]"
                aria-label="Swap units"
              >
                <ArrowLeftRight className="size-4" />
              </Button>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  To
                </label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">
                  {Number.isInteger(result)
                    ? result
                    : result.toFixed(6).replace(/\.?0+$/, "")}{" "}
                  {toUnit}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
