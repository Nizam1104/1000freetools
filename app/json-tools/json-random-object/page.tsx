"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* The Problem */}
        <div className="mb-6">
          <div className="bg-card border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-3">Why Generate Random JSON?</h2>
            <p className="text-muted-foreground mb-4">
              You're building a feature but the API isn't ready yet. You need sample JSON data to test with, but typing out fake records gets old fast. Random JSON generators exist but they don't let you control the structure. This tool creates random JSON with your specified fields and realistic fake data.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-muted-foreground">Test frontend components without backend</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-muted-foreground">Create mock API responses for demos</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-muted-foreground">Generate test data for load testing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-muted-foreground">Prototype with realistic data structures</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="space-y-3">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm">1</span>
              <div>
                <h3 className="font-medium">Select Fields</h3>
                <p className="text-sm text-muted-foreground">Choose which fields to include: name, email, phone, address, company, date, avatar</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm">2</span>
              <div>
                <h3 className="font-medium">Set Count</h3>
                <p className="text-sm text-muted-foreground">Specify how many objects to generate (1-100)</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm">3</span>
              <div>
                <h3 className="font-medium">Generate</h3>
                <p className="text-sm text-muted-foreground">Click generate and get random JSON with realistic fake data</p>
              </div>
            </li>
          </ol>
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

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About Random JSON Object Generator</h2>
        <p className="text-muted-foreground mb-6">
          Building frontend features without a backend means you need fake data. This generator creates random JSON objects with realistic fake names, emails, addresses, and more. Choose which fields to include and generate single objects or arrays of test data.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the generator works</h3>
        <p className="text-muted-foreground mb-2">
          Check the fields you want to include: id, name, email, phone, address, company, date, avatar. Set the count to generate multiple objects. Click Generate and the tool uses the Faker library to create realistic fake data for each field.
        </p>
        <p className="text-muted-foreground mb-8">
          Each field generates appropriate fake data. Names come from person name generators, emails are formatted correctly, addresses include street, city, and country. Dates are in ISO format. Avatars are URLs to placeholder images.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're building a user list component but the API isn't ready. Or you need sample data for a demo or presentation. This tool also helps when load testing and you need many records to work with.
        </p>
        <p className="text-muted-foreground mb-8">
          The generated data is fake and should not be used in production. It's designed for development, testing, and prototyping. For production test data, consider using seeded generators for reproducibility.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Is the data truly random?</p>
            <p className="text-muted-foreground">The data comes from the Faker library which generates realistic fake data. It's not cryptographically random but works well for testing purposes.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I generate more than 100 objects?</p>
            <p className="text-muted-foreground">The count input limits to 100 for performance. For larger datasets, run the generator multiple times or use a script with the Faker library directly.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Are the email addresses real?</p>
            <p className="text-muted-foreground">No, the emails are randomly generated and should not belong to real people. Never use this data for actual email testing.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I add custom fields?</p>
            <p className="text-muted-foreground">Not in this version. The available fields are fixed. For custom schemas, consider using the Faker library directly in your code.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How do I get consistent data for tests?</p>
            <p className="text-muted-foreground">This tool generates different data each time. For reproducible tests, use Faker with a fixed seed in your test code instead.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-array-generator" className="text-primary hover:underline">JSON Array Generator</a> – Generate JSON arrays with custom structures
          </li>
          <li>
            <a href="/json-tools/json-datetime-generator" className="text-primary hover:underline">JSON Datetime Generator</a> – Generate date and time values for JSON
          </li>
          <li>
            <a href="/json-tools/json-playground" className="text-primary hover:underline">JSON Playground</a> – Experiment with JSON data interactively
          </li>
        </ul>
      </div>
    </div>
  );
}
