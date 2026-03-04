"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface MaskRule {
  id: string;
  field: string;
  maskChar: string;
  showLast?: number;
}

export default function JsonSensitiveDataMaserPage() {
  const [input, setInput] = useState("");
  const [rules, setRules] = useState<MaskRule[]>([
    { id: "1", field: "password", maskChar: "*", showLast: 0 },
    { id: "2", field: "token", maskChar: "*", showLast: 0 },
    { id: "3", field: "secret", maskChar: "*", showLast: 0 }
  ]);
  const [maskEmail, setMaskEmail] = useState(true);
  const [maskPhone, setMaskPhone] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const maskValue = (value: string, maskChar: string, showLast: number): string => {
    if (value.length <= showLast) {
      return maskChar.repeat(value.length);
    }
    return maskChar.repeat(value.length - showLast) + value.slice(-showLast);
  };

  const formatMaskedEmail = (email: string): string => {
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    const [local, domain] = parts;
    if (local.length <= 2) {
      return `**@${domain}`;
    }
    return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
  };

  const formatMaskedPhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 4) return "*".repeat(phone.length);
    return "*".repeat(digits.length - 4) + digits.slice(-4);
  };

  const maskSensitiveData = useCallback((obj: any, rulesMap: Map<string, MaskRule>, doMaskEmail: boolean, doMaskPhone: boolean): any => {
    if (obj === null || typeof obj !== "object") {
      if (typeof obj === "string") {
        // Check for email pattern
        if (doMaskEmail && obj.includes("@") && obj.includes(".")) {
          return formatMaskedEmail(obj);
        }
        // Check for phone pattern (simple heuristic)
        if (doMaskPhone && obj.match(/^[\d\s\-\+\(\)]{10,}$/)) {
          return formatMaskedPhone(obj);
        }
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => maskSensitiveData(item, rulesMap, doMaskEmail, doMaskPhone));
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const rule = rulesMap.get(lowerKey);

      if (rule && typeof value === "string") {
        result[key] = maskValue(value, rule.maskChar, rule.showLast || 0);
      } else {
        result[key] = maskSensitiveData(value, rulesMap, doMaskEmail, doMaskPhone);
      }
    }
    return result;
  }, []);

  const maskJson = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const rulesMap = new Map(rules.filter(r => r.field.trim()).map(r => [r.field.toLowerCase(), r]));
    const masked = maskSensitiveData(obj, rulesMap, maskEmail, maskPhone);

    setResult(JSON.stringify(masked, null, 2));
    toast.success("Sensitive data masked successfully");
  }, [input, rules, maskEmail, maskPhone, maskSensitiveData]);

  const addRule = () => {
    setRules([...rules, { id: Date.now().toString(), field: "", maskChar: "*", showLast: 0 }]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: keyof MaskRule, value: any) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "supersecret123",
        phone: "+1-555-123-4567",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      },
      api: {
        key: "sk-1234567890abcdef",
        secret: "very_secret_value"
      }
    }, null, 2));
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Masked JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "masked.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Masked JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Sensitive Data Masker – Mask JSON Fields</h1>
          <p className="text-muted-foreground">
            Mask sensitive fields like emails, passwords, and API tokens in JSON data. Our free JSON Sensitive Data Masker makes it safe to share logs and API responses without exposing private information.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="maskEmail"
                    checked={maskEmail}
                    onCheckedChange={(checked) => setMaskEmail(checked as boolean)}
                  />
                  <Label htmlFor="maskEmail" className="text-sm cursor-pointer">Mask Emails</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="maskPhone"
                    checked={maskPhone}
                    onCheckedChange={(checked) => setMaskPhone(checked as boolean)}
                  />
                  <Label htmlFor="maskPhone" className="text-sm cursor-pointer">Mask Phones</Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={maskJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Mask
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"user": {"password": "secret", "email": "john@example.com"}}'
              className="min-h-[150px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Mask Rules */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-muted-foreground">
                Field Masking Rules
              </Label>
              <Button variant="outline" size="sm" onClick={addRule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <div className="space-y-3">
              {rules.map((rule, index) => (
                <div key={rule.id} className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                  <Input
                    value={rule.field}
                    onChange={(e) => updateRule(rule.id, "field", e.target.value.toLowerCase())}
                    placeholder="Field name (e.g., password)"
                    className="flex-1 font-mono text-sm h-9"
                  />
                  <Input
                    type="number"
                    value={rule.showLast}
                    onChange={(e) => updateRule(rule.id, "showLast", parseInt(e.target.value) || 0)}
                    placeholder="Show last N"
                    className="w-24 font-mono text-sm h-9"
                    min={0}
                    max={10}
                  />
                  <Input
                    value={rule.maskChar}
                    onChange={(e) => updateRule(rule.id, "maskChar", e.target.value.charAt(0))}
                    placeholder="*"
                    className="w-16 font-mono text-sm h-9"
                    maxLength={1}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(rule.id)}
                    disabled={rules.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Masked Result
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
