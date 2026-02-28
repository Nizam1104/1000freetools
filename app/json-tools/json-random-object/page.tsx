"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";

export default function JsonRandomObjectGeneratorPage() {
  const [count, setCount] = useState(1);
  const [includeFields, setIncludeFields] = useState({
    id: true,
    name: true,
    email: true,
    phone: true,
    address: true,
    company: true,
    date: true,
    avatar: true
  });
  const [result, setResult] = useState<string | null>(null);

  const generateRandomObject = useCallback(() => {
    const objects = Array.from({ length }, (_, i) => {
      const obj: any = {};
      if (includeFields.id) obj.id = i + 1;
      if (includeFields.name) obj.name = faker.person.fullName();
      if (includeFields.email) obj.email = faker.internet.email();
      if (includeFields.phone) obj.phone = faker.phone.number();
      if (includeFields.address) {
        obj.address = {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          country: faker.location.country()
        };
      }
      if (includeFields.company) obj.company = faker.company.name();
      if (includeFields.date) obj.date = faker.date.past().toISOString();
      if (includeFields.avatar) obj.avatar = faker.image.avatar();
      return obj;
    });

    const output = count === 1 ? objects[0] : objects;
    setResult(JSON.stringify(output, null, 2));
    toast.success(`Generated ${count} random object(s)`);
  }, [count, includeFields]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Generated JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "random-data.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Generated JSON downloaded");
    }
  };

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Random JSON Object Generator Online</h1>
          <p className="text-muted-foreground">
            Generate random JSON objects for testing, prototyping, and demos in seconds. Our free JSON Random Object Generator lets you customize fields, types, and nesting depth.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="count" className="text-sm whitespace-nowrap">Count:</Label>
                  <Input
                    id="count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    min={1}
                    max={100}
                    className="w-20 h-9"
                  />
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
                <Button onClick={generateRandomObject}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Field Options */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">
              Include Fields
            </Label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(includeFields).map(([field, enabled]) => (
                <div key={field} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={field}
                    checked={enabled}
                    onChange={() => toggleField(field as keyof typeof includeFields)}
                    className="rounded border-input"
                  />
                  <Label htmlFor={field} className="text-sm cursor-pointer capitalize">
                    {field}
                  </Label>
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
                Generated Data
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
