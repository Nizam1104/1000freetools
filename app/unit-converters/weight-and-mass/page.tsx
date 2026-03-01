"use client";

import { UnitConverterBase } from "@/components/unit-converters/unit-converter-base";
import { converterMappings } from "@/components/unit-converters/converter-mappings";

export default function WeightandMassPage() {
  const config = converterMappings["Weight and Mass"];
  
  if (!config) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <p className="text-destructive">Converter configuration not found for "Weight and Mass"</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Weight and Mass Converter</h1>
        <p className="text-muted-foreground">Convert weight and mass units instantly — kilograms, pounds, grams, ounces, tons, and more. Accurate and easy-to-use online weight converter for cooking, shipping, and science.</p>
      </div>
      <UnitConverterBase
        title="Weight and Mass Converter"
        description="Convert weight and mass units instantly — kilograms, pounds, grams, ounces, tons, and more. Accurate and easy-to-use online weight converter for cooking, shipping, and science."
        units={config.units}
        convert={config.convertFn}
        defaultValue={config.defaultValue}
        defaultFromUnit={config.defaultFrom}
        defaultToUnit={config.defaultTo}
      />
    </div>
  );
}
