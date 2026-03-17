"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Shield, CheckCircle } from "lucide-react";

const TomlSchemaGeneratorValidator: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [schemaOutput, setSchemaOutput] = useState("");
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null);
  const [mode, setMode] = useState<"validate" | "generate">("validate");
  const [processed, setProcessed] = useState(false);

  const sampleToml = `title = "My App"
version = "1.0.0"

[database]
host = "localhost"
port = 5432
username = "admin"
password = "secret"

[features]
enabled = true
max_users = 100`;

  const validateToml = (input: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const lines = input.split("\n");
    const sections = new Set<string>();
    let currentSection = "";

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith("#")) return;

      // Check for section headers
      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        const sectionName = sectionMatch[1];
        if (sections.has(sectionName)) {
          errors.push(`Line ${index + 1}: Duplicate section [${sectionName}]`);
        }
        sections.add(sectionName);
        currentSection = sectionName;
        return;
      }

      // Check for key-value pairs
      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (!kvMatch) {
        errors.push(`Line ${index + 1}: Invalid syntax - expected key = value`);
        return;
      }

      const key = kvMatch[1].trim();
      const value = kvMatch[2].trim();

      // Validate key format
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
        errors.push(`Line ${index + 1}: Invalid key format "${key}"`);
      }

      // Basic value validation
      if (value && !value.startsWith('"') && !value.startsWith("'") && 
          !value.startsWith("[") && !value.startsWith("{") &&
          value !== "true" && value !== "false" &&
          !/^-?\d+$/.test(value) && !/^-?\d+\.\d+$/.test(value)) {
        // Could be a bare string or invalid value
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          errors.push(`Line ${index + 1}: Potentially unquoted string value`);
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  const generateSchema = (input: string): string => {
    const lines = input.split("\n");
    const schema: { [key: string]: { type: string; required: boolean } } = {};
    let currentSection = "";

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        
        let type = "string";
        if (value === "true" || value === "false") type = "boolean";
        else if (/^-?\d+$/.test(value)) type = "integer";
        else if (/^-?\d+\.\d+$/.test(value)) type = "float";
        else if (value.startsWith("[") && value.endsWith("]")) type = "array";
        else if (value.startsWith("{") && value.endsWith("}")) type = "object";

        const path = currentSection ? `${currentSection}.${key}` : key;
        schema[path] = { type, required: true };
      }
    });

    let output = "# TOML Schema\n";
    output += "# Generated from TOML content\n\n";
    output += "required = [\n";
    output += Object.keys(schema).map(k => `  "${k}"`).join(",\n");
    output += "\n]\n\n";
    output += "[properties]\n";
    
    Object.entries(schema).forEach(([path, info]) => {
      output += `${path} = { type = "${info.type}", required = ${info.required} }\n`;
    });

    return output;
  };

  const handleProcess = useCallback(() => {
    if (!tomlInput.trim()) return;

    if (mode === "validate") {
      const result = validateToml(tomlInput);
      setValidationResult(result);
      setProcessed(true);
    } else {
      const schema = generateSchema(tomlInput);
      setSchemaOutput(schema);
      setProcessed(true);
    }
  }, [tomlInput, mode]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setSchemaOutput("");
    setValidationResult(null);
    setProcessed(false);
  }, []);

  const handleCopy = useCallback(() => {
    const text = mode === "validate" 
      ? JSON.stringify(validationResult, null, 2)
      : schemaOutput;
    if (text) {
      navigator.clipboard.writeText(text);
    }
  }, [mode, validationResult, schemaOutput]);

  const handleDownload = useCallback(() => {
    const text = mode === "validate" 
      ? JSON.stringify(validationResult, null, 2)
      : schemaOutput;
    if (!text) return;
    
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = mode === "validate" ? "validation-result.json" : "schema.toml";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [mode, validationResult, schemaOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            TOML Schema Generator & Validator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={mode === "validate" ? "default" : "outline"}
              onClick={() => setMode("validate")}
            >
              Validate TOML
            </Button>
            <Button
              variant={mode === "generate" ? "default" : "outline"}
              onClick={() => setMode("generate")}
            >
              Generate Schema
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tomlInput">TOML Input</Label>
              <Textarea
                id="tomlInput"
                value={tomlInput}
                onChange={(e) => setTomlInput(e.target.value)}
                placeholder="Paste TOML content here..."
                rows={15}
              />
              <Button 
                onClick={() => setTomlInput(sampleToml)} 
                variant="outline" 
                size="sm"
              >
                Load Sample TOML
              </Button>
            </div>

            <div className="space-y-2">
              <Label>
                {mode === "validate" ? "Validation Result" : "Generated Schema"}
              </Label>
              <div className={`p-4 border rounded-lg min-h-[300px] ${
                mode === "validate" && validationResult?.valid 
                  ? "bg-green-50 border-green-200" 
                  : "bg-gray-50"
              }`}>
                {mode === "validate" && validationResult ? (
                  validationResult.valid ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">TOML is valid!</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-semibold text-red-700">Validation Errors:</p>
                      <ul className="text-sm text-red-600 space-y-1">
                        {validationResult.errors.map((error, i) => (
                          <li key={i}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )
                ) : (
                  <pre className="text-sm whitespace-pre-wrap">
                    {schemaOutput || "Schema will appear here..."}
                  </pre>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleProcess} disabled={!tomlInput.trim()}>
              {mode === "validate" ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validate
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Generate Schema
                </>
              )}
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!processed}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!processed}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlSchemaGeneratorValidator;
