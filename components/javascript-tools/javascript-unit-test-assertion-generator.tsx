"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code, Check } from "lucide-react";

const JavascriptUnitTestAssertionGenerator: React.FC = () => {
  const [testFramework, setTestFramework] = useState<"jest" | "vitest" | "chai" | "assert">("jest");
  const [assertionType, setAssertionType] = useState("equality");
  const [actualValue, setActualValue] = useState("");
  const [expectedValue, setExpectedValue] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [negate, setNegate] = useState(false);
  const [generated, setGenerated] = useState("");

  const assertionTypes = [
    { value: "equality", label: "Equality (toBe/toEqual)" },
    { value: "truthy", label: "Truthy/Falsy" },
    { value: "null", label: "Null/Undefined" },
    { value: "type", label: "Type Check" },
    { value: "contains", label: "Contains/Includes" },
    { value: "throws", label: "Throws Error" },
    { value: "matches", label: "Regex Match" },
    { value: "range", label: "Range Check" },
    { value: "length", label: "Length Check" },
    { value: "property", label: "Property Check" },
  ];

  const generateAssertion = useCallback(() => {
    let assertion = "";
    const msg = customMessage ? `, '${customMessage}'` : "";

    switch (testFramework) {
      case "jest":
      case "vitest":
        const not = negate ? ".not" : "";
        switch (assertionType) {
          case "equality":
            assertion = `expect(${actualValue || "actual"})${not}.toEqual(${expectedValue || "expected"}${msg});`;
            break;
          case "truthy":
            assertion = `expect(${actualValue || "value"})${not}.toBeTruthy${msg}();`;
            break;
          case "null":
            assertion = `expect(${actualValue || "value"})${not}.toBeNull${msg}();`;
            break;
          case "type":
            assertion = `expect(${actualValue || "value"})${not}.toBe${negate ? "" : "InstanceOf"}(${expectedValue || "Type"}${msg});`;
            break;
          case "contains":
            assertion = `expect(${actualValue || "array"})${not}.toContain(${expectedValue || "item"}${msg});`;
            break;
          case "throws":
            assertion = `expect(() => ${actualValue || "function"}())${not}.toThrow(${expectedValue || "'error'"}${msg});`;
            break;
          case "matches":
            assertion = `expect(${actualValue || "string"})${not}.toMatch(/${expectedValue || "pattern"}/${msg});`;
            break;
          case "range":
            assertion = `expect(${actualValue || "value"}).toBeGreater${negate ? "" : "Than"}(${expectedValue || "0"}${msg});`;
            break;
          case "length":
            assertion = `expect(${actualValue || "array"}).${negate ? "not." : ""}toHaveLength(${expectedValue || "0"}${msg});`;
            break;
          case "property":
            assertion = `expect(${actualValue || "object"}).${negate ? "not." : ""}toHaveProperty('${expectedValue || "property"}'${msg});`;
            break;
        }
        break;

      case "chai":
        const notChai = negate ? ".not" : "";
        switch (assertionType) {
          case "equality":
            assertion = `expect(${actualValue || "actual"}).${notChai}.to.equal(${expectedValue || "expected"}${msg});`;
            break;
          case "truthy":
            assertion = `expect(${actualValue || "value"}).${notChai}.to.be.ok${msg};`;
            break;
          case "null":
            assertion = `expect(${actualValue || "value"}).${notChai}.to.be.null${msg};`;
            break;
          case "contains":
            assertion = `expect(${actualValue || "array"}).${notChai}.to.include(${expectedValue || "item"}${msg});`;
            break;
          case "throws":
            assertion = `expect(() => ${actualValue || "function"}()).${notChai}.to.throw(${expectedValue || "'error'"}${msg});`;
            break;
          case "matches":
            assertion = `expect(${actualValue || "string"}).${notChai}.to.match(/${expectedValue || "pattern"}/${msg});`;
            break;
          case "length":
            assertion = `expect(${actualValue || "array"}).${notChai}.to.have.lengthOf(${expectedValue || "0"}${msg});`;
            break;
          case "property":
            assertion = `expect(${actualValue || "object"}).${notChai}.to.have.property('${expectedValue || "property"}'${msg});`;
            break;
          default:
            assertion = `expect(${actualValue || "actual"}).${notChai}.to.equal(${expectedValue || "expected"}${msg});`;
        }
        break;

      case "assert":
        switch (assertionType) {
          case "equality":
            assertion = `assert.${negate ? "not" : ""}strictEqual(${actualValue || "actual"}, ${expectedValue || "expected"}${customMessage ? `, '${customMessage}'` : ""});`;
            break;
          case "truthy":
            assertion = `assert.${negate ? "" : ""}ok(${actualValue || "value"}${customMessage ? `, '${customMessage}'` : ""});`;
            break;
          case "null":
            assertion = `assert.${negate ? "" : ""}strictEqual(${actualValue || "value"}, null${customMessage ? `, '${customMessage}'` : ""});`;
            break;
          default:
            assertion = `assert.${negate ? "not" : ""}strictEqual(${actualValue || "actual"}, ${expectedValue || "expected"}${customMessage ? `, '${customMessage}'` : ""});`;
        }
        break;
    }

    setGenerated(assertion);
  }, [testFramework, assertionType, actualValue, expectedValue, customMessage, negate]);

  const handleClear = useCallback(() => {
    setActualValue("");
    setExpectedValue("");
    setCustomMessage("");
    setNegate(false);
    setGenerated("");
  }, []);

  const handleCopy = useCallback(() => {
    if (generated) {
      navigator.clipboard.writeText(generated);
    }
  }, [generated]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            JavaScript Unit Test Assertion Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Test Framework</Label>
              <div className="flex gap-2">
                {["jest", "vitest", "chai", "assert"].map((fw) => (
                  <Button
                    key={fw}
                    variant={testFramework === fw ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTestFramework(fw as typeof testFramework)}
                  >
                    {fw.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assertionType">Assertion Type</Label>
              <select
                id="assertionType"
                value={assertionType}
                onChange={(e) => setAssertionType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {assertionTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualValue">Actual Value/Expression</Label>
              <Input
                id="actualValue"
                value={actualValue}
                onChange={(e) => setActualValue(e.target.value)}
                placeholder="result, getValue(), etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedValue">Expected Value</Label>
              <Input
                id="expectedValue"
                value={expectedValue}
                onChange={(e) => setExpectedValue(e.target.value)}
                placeholder="expected, 42, 'string', etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customMessage">Custom Message (Optional)</Label>
              <Input
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Assertion failed message"
              />
            </div>

            <div className="space-y-2">
              <Label>Negate Assertion</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="negate"
                  checked={negate}
                  onChange={(e) => setNegate(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="negate" className="font-normal">
                  Add .not (expect value NOT to match)
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateAssertion}>
              <Code className="w-4 h-4 mr-2" />
              Generate Assertion
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Generated Assertion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm font-mono">
                    {generated}
                  </pre>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Example Test:</p>
                <pre className="text-xs bg-white p-3 rounded overflow-auto">
{`test('should ${negate ? "not " : ""}${assertionType} correctly', () => {
  ${generated}
});`}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JavascriptUnitTestAssertionGenerator;
