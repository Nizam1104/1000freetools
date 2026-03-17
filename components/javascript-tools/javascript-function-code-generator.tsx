"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code, Wand2 } from "lucide-react";

const JavascriptFunctionCodeGenerator: React.FC = () => {
  const [functionType, setFunctionType] = useState("utility");
  const [functionName, setFunctionName] = useState("myFunction");
  const [parameters, setParameters] = useState("input");
  const [description, setDescription] = useState("Description of what the function does");
  const [returnType, setReturnType] = useState("any");
  const [includeJSDoc, setIncludeJSDoc] = useState(true);
  const [includeTypes, setIncludeTypes] = useState(true);
  const [asyncFunction, setAsyncFunction] = useState(false);
  const [generated, setGenerated] = useState("");

  const functionTypes = [
    { value: "utility", label: "Utility Function" },
    { value: "validator", label: "Validator" },
    { value: "transformer", label: "Data Transformer" },
    { value: "calculator", label: "Calculator" },
    { value: "formatter", label: "Formatter" },
    { value: "parser", label: "Parser" },
    { value: "generator", label: "Generator" },
    { value: "custom", label: "Custom" },
  ];

  const templates: { [key: string]: string } = {
    utility: `function FUNCTION_NAME(PARAMS) {
  // TODO: Implement functionality
  return result;
}`,
    validator: `function FUNCTION_NAME(PARAMS) {
  if (!PARAMS) {
    return false;
  }
  // Add validation logic
  return true;
}`,
    transformer: `function FUNCTION_NAME(PARAMS) {
  // Transform input data
  const transformed = PARAMS;
  return transformed;
}`,
    calculator: `function FUNCTION_NAME(PARAMS) {
  // Perform calculation
  const result = PARAMS;
  return result;
}`,
    formatter: `function FUNCTION_NAME(PARAMS) {
  // Format the input
  const formatted = String(PARAMS);
  return formatted;
}`,
    parser: `function FUNCTION_NAME(PARAMS) {
  // Parse input string
  const parsed = PARAMS;
  return parsed;
}`,
    generator: `function* FUNCTION_NAME(PARAMS) {
  // Generator function
  yield PARAMS;
}`,
    custom: `function FUNCTION_NAME(PARAMS) {
  // Your implementation here
  return null;
}`,
  };

  const generateFunction = useCallback(() => {
    let output = "";

    if (includeJSDoc) {
      output += `/**\n`;
      output += ` * ${description}\n`;
      output += ` * @param {${returnType}} ${parameters.split(",")[0].trim()} - Input parameter\n`;
      output += ` * @returns {${returnType}} The result\n`;
      if (asyncFunction) {
        output += ` * @async\n`;
      }
      output += ` */\n`;
    }

    const template = templates[functionType] || templates.custom;
    let code = template
      .replace(/FUNCTION_NAME/g, functionName)
      .replace(/PARAMS/g, parameters);

    if (asyncFunction) {
      code = code.replace("function ", "async function ");
    }

    if (includeTypes) {
      // Add TypeScript version
      output += `\n// TypeScript version:\n`;
      output += `export ${asyncFunction ? "async " : ""}function ${functionName}(${parameters}: ${returnType}): ${asyncFunction ? `Promise<${returnType}>` : returnType} {\n`;
      output += `  // Implementation\n`;
      output += `  return ${asyncFunction ? "Promise.resolve(" : ""}null${asyncFunction ? ")" : ""};\n`;
      output += `}\n\n`;
    }

    output += `\n// JavaScript version:\n`;
    output += code;

    setGenerated(output);
  }, [functionType, functionName, parameters, description, returnType, includeJSDoc, includeTypes, asyncFunction]);

  const handleClear = useCallback(() => {
    setFunctionName("myFunction");
    setParameters("input");
    setDescription("Description of what the function does");
    setReturnType("any");
    setGenerated("");
  }, []);

  const handleCopy = useCallback(() => {
    if (generated) {
      navigator.clipboard.writeText(generated);
    }
  }, [generated]);

  const handleDownload = useCallback(() => {
    if (!generated) return;
    
    const blob = new Blob([generated], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${functionName}.js`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [generated, functionName]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            JavaScript Function Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="functionType">Function Type</Label>
              <select
                id="functionType"
                value={functionType}
                onChange={(e) => setFunctionType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {functionTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="functionName">Function Name</Label>
              <Input
                id="functionName"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                placeholder="myFunction"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parameters">Parameters</Label>
              <Input
                id="parameters"
                value={parameters}
                onChange={(e) => setParameters(e.target.value)}
                placeholder="input, options, callback"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnType">Return Type</Label>
              <Input
                id="returnType"
                value={returnType}
                onChange={(e) => setReturnType(e.target.value)}
                placeholder="string, number, boolean, any"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this function do?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeJSDoc"
                    checked={includeJSDoc}
                    onChange={(e) => setIncludeJSDoc(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="includeJSDoc" className="font-normal text-sm">
                    Include JSDoc
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeTypes"
                    checked={includeTypes}
                    onChange={(e) => setIncludeTypes(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="includeTypes" className="font-normal text-sm">
                    Include TypeScript
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="asyncFunction"
                    checked={asyncFunction}
                    onChange={(e) => setAsyncFunction(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="asyncFunction" className="font-normal text-sm">
                    Async function
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateFunction}>
              <Code className="w-4 h-4 mr-2" />
              Generate Function
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generated Code</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm font-mono max-h-96">
                  {generated}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JavascriptFunctionCodeGenerator;
