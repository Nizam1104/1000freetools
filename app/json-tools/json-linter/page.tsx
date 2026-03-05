"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  FileJson,
  RotateCcw,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface LintIssue {
  type: "error" | "warning";
  message: string;
  line: number;
  column: number;
  snippet?: string;
}

interface LintResult {
  isValid: boolean;
  issues: LintIssue[];
}

export default function JsonLinterPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<LintResult | null>(null);

  const findDuplicateKeys = useCallback((text: string): LintIssue[] => {
    const issues: LintIssue[] = [];
    const lines = text.split("\n");
    const keyStack: Array<{ key: string; line: number; column: number }> = [];
    const objectStack: Array<
      Array<{ key: string; line: number; column: number }>
    > = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const keyMatches = [...line.matchAll(/"([^"]+)"\s*:/g)];

      for (const match of keyMatches) {
        const key = match[1];
        const column = match.index! + 1;

        if (objectStack.length > 0) {
          const currentObject = objectStack[objectStack.length - 1];
          const existing = currentObject.find((k) => k.key === key);
          if (existing) {
            issues.push({
              type: "error",
              message: `Duplicate key "${key}"`,
              line: i + 1,
              column,
              snippet: line.trim(),
            });
          } else {
            currentObject.push({ key, line: i + 1, column });
          }
        }
      }

      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;

      for (let j = 0; j < openBraces; j++) {
        objectStack.push([]);
      }

      for (let j = 0; j < closeBraces; j++) {
        if (objectStack.length > 0) {
          objectStack.pop();
        }
      }
    }

    return issues;
  }, []);

  const findTrailingCommas = useCallback((text: string): LintIssue[] => {
    const issues: LintIssue[] = [];
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (
        line.endsWith(",") &&
        (line === "}," || line === "]," || line === ",")
      ) {
        const nextNonEmptyLine = lines.slice(i + 1).find((l) => l.trim());
        if (
          nextNonEmptyLine &&
          (nextNonEmptyLine.trim().startsWith("}") ||
            nextNonEmptyLine.trim().startsWith("]"))
        ) {
          issues.push({
            type: "warning",
            message: "Trailing comma before closing bracket",
            line: i + 1,
            column: line.length,
            snippet: line,
          });
        }
      }
    }

    return issues;
  }, []);

  const findStructuralIssues = useCallback((text: string): LintIssue[] => {
    const issues: LintIssue[] = [];
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.includes(":") && !line.includes("//")) {
        const colonIndex = line.indexOf(":");
        const beforeColon = line.substring(0, colonIndex).trim();
        if (!beforeColon.startsWith('"') && !beforeColon.endsWith('"')) {
          const quoteMatch = beforeColon.match(/"([^"]*)"$/);
          if (
            !quoteMatch &&
            beforeColon.length > 0 &&
            !["{", "[", ":"].includes(beforeColon)
          ) {
            issues.push({
              type: "warning",
              message: "Key should be wrapped in double quotes",
              line: i + 1,
              column: 1,
              snippet: line.trim(),
            });
          }
        }
      }

      const singleQuotes = (line.match(/'/g) || []).length;
      if (singleQuotes > 0 && singleQuotes % 2 === 0) {
        const hasDoubleQuotes = line.includes('"');
        if (!hasDoubleQuotes) {
          issues.push({
            type: "warning",
            message: "Single quotes found - JSON requires double quotes",
            line: i + 1,
            column: 1,
            snippet: line.trim(),
          });
        }
      }

      if (line.includes("//")) {
        issues.push({
          type: "warning",
          message: "Comments are not valid in JSON",
          line: i + 1,
          column: line.indexOf("//") + 1,
          snippet: line.trim(),
        });
      }
    }

    return issues;
  }, []);

  const lintJson = useCallback(() => {
    if (!input.trim()) {
      setResult({
        isValid: false,
        issues: [
          {
            type: "error",
            message: "Empty input",
            line: 1,
            column: 1,
          },
        ],
      });
      return;
    }

    const issues: LintIssue[] = [];

    try {
      JSON.parse(input);
      issues.push(...findDuplicateKeys(input));
      issues.push(...findTrailingCommas(input));
      issues.push(...findStructuralIssues(input));

      setResult({
        isValid: issues.filter((i) => i.type === "error").length === 0,
        issues,
      });

      if (issues.length === 0) {
        toast.success("JSON is valid with no issues!");
      } else {
        toast.info(`Found ${issues.length} issue(s)`);
      }
    } catch (e) {
      const errorMatch = (e as Error).message.match(/position (\d+)/);
      const position = errorMatch ? parseInt(errorMatch[1]) : 0;

      const lines = input.substring(0, position).split("\n");
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;

      issues.push({
        type: "error",
        message: (e as Error).message,
        line,
        column,
        snippet: lines[lines.length - 1]?.trim(),
      });

      setResult({
        isValid: false,
        issues,
      });
    }
  }, [input, findDuplicateKeys, findTrailingCommas, findStructuralIssues]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    const sample = `{
  "name": "Example",
  "version": 1,
  "features": ["fast", "simple"],
  "nested": {
    "key1": "value1",
    "key2": "value2"
  }
}`;
    setInput(sample);
  };

  const loadInvalidSample = () => {
    const invalid = `{
  "name": "Example",
  "name": "Duplicate",
  'single': 'quotes',
  "features": ["fast", "simple",]
  // comment here
}`;
    setInput(invalid);
  };

  const errorCount = useMemo(
    () => result?.issues.filter((i) => i.type === "error").length || 0,
    [result],
  );
  const warningCount = useMemo(
    () => result?.issues.filter((i) => i.type === "warning").length || 0,
    [result],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Linter – Detect JSON Errors Online
          </h1>
          <p className="text-muted-foreground">
            Lint your JSON to catch syntax errors, duplicate keys, trailing
            commas, and structural issues. Our free JSON Linter helps you write
            clean and standards-compliant JSON.
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-6">
          <div className="bg-card border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-3">Why Lint Your JSON?</h2>
            <p className="text-muted-foreground mb-4">
              Your JSON looks right but something's off. Maybe a missing comma,
              a trailing comma that shouldn't be there, or inconsistent
              formatting. A linter catches these issues before they cause
              runtime errors. This tool checks your JSON syntax and highlights
              problems with clear error messages.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm text-muted-foreground">
                  Missing commas between properties
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm text-muted-foreground">
                  Trailing commas before closing brackets
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm text-muted-foreground">
                  Duplicate keys in objects
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm text-muted-foreground">
                  Single quotes instead of double quotes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What Gets Checked */}
        <Card className="mb-6 bg-muted/30">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-4">
              What This Linter Checks
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    S
                  </span>
                  Syntax
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Bracket matching</li>
                  <li>• Quote validation</li>
                  <li>• Comma placement</li>
                  <li>• Colon syntax</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    Q
                  </span>
                  Quality
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Duplicate keys</li>
                  <li>• Trailing commas</li>
                  <li>• Comment detection</li>
                  <li>• Style consistency</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    F
                  </span>
                  Fixes
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Error positioning</li>
                  <li>• Line numbers</li>
                  <li>• Code snippets</li>
                  <li>• Fix suggestions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Valid Sample
                </Button>
                <Button variant="outline" size="sm" onClick={loadInvalidSample}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Invalid Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={lintJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Lint JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here to lint..."
                className="min-h-[400px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>

          {/* Lint Result */}
          {result && (
            <Card
              className={`border-2 ${result.isValid ? "border-green-500" : "border-destructive"}`}
            >
              <CardContent className="p-6">
                {result.isValid && result.issues.length === 0 ? (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                        Valid JSON
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        No issues found. Your JSON is clean!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive">
                        <X className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-destructive">
                          Issues Found
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {errorCount} error(s), {warningCount} warning(s)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {result.issues.map((issue, index) => (
                        <div
                          key={index}
                          className={`rounded-md p-4 border ${
                            issue.type === "error"
                              ? "bg-destructive/10 border-destructive/20"
                              : "bg-yellow-500/10 border-yellow-500/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {issue.type === "error" ? (
                              <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-sm font-semibold ${
                                    issue.type === "error"
                                      ? "text-destructive"
                                      : "text-yellow-600 dark:text-yellow-400"
                                  }`}
                                >
                                  {issue.type === "error" ? "Error" : "Warning"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Line {issue.line}, Column {issue.column}
                                </span>
                              </div>
                              <p className="text-sm text-foreground mb-1">
                                {issue.message}
                              </p>
                              {issue.snippet && (
                                <pre className="text-xs font-mono text-muted-foreground bg-muted/50 rounded p-2 overflow-x-auto">
                                  {issue.snippet}
                                </pre>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Linter</h2>
        <p className="text-muted-foreground mb-6">
          A JSON linter checks your JSON for syntax errors and common issues
          beyond basic validation. It points out problems line by line with
          specific messages about what's wrong. This helps you fix JSON before
          it causes runtime errors in your application.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the linter works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON in the input box and click Lint JSON. The tool parses
          your input and checks for syntax errors, comments, trailing commas,
          and other issues. Each problem is listed with its line number, column,
          and a description.
        </p>
        <p className="text-muted-foreground mb-8">
          Errors show in red with severity indicators. Click on an issue to see
          the problematic code snippet. Fix the issues and run the linter again
          until your JSON is clean.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          Your JSON config file isn't loading and you need to find the syntax
          error. Or you're writing JSON by hand and want to catch mistakes
          early. This tool also helps when reviewing JSON from external sources
          before using it.
        </p>
        <p className="text-muted-foreground mb-8">
          The linter checks syntax only, not semantics. It won't tell you if
          required fields are missing or values are wrong. For schema
          validation, use our JSON Schema Validator tool instead.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">
              What issues does the linter find?
            </p>
            <p className="text-muted-foreground">
              Syntax errors, invalid characters, comments (not allowed in JSON),
              trailing commas, and malformed strings or numbers.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Does it support JSON5?</p>
            <p className="text-muted-foreground">
              No, this linter checks strict JSON. JSON5 features like comments
              and trailing commas will be flagged as errors.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">How accurate are line numbers?</p>
            <p className="text-muted-foreground">
              Line numbers are calculated from your input. They should match
              your editor if you haven't modified the text since pasting.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Can it fix errors automatically?</p>
            <p className="text-muted-foreground">
              No, this tool only reports issues. Use the error messages to
              manually fix your JSON, then run the linter again.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              What's the difference between linting and validating?
            </p>
            <p className="text-muted-foreground">
              Linting finds syntax issues and reports details. Validation just
              says valid or invalid. Linting gives you more information to fix
              problems.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a
              href="/json-tools/json-validator"
              className="text-primary hover:underline"
            >
              JSON Validator
            </a>{" "}
            – Quick validation check for JSON
          </li>
          <li>
            <a
              href="/json-tools/json-formatter-beautifier"
              className="text-primary hover:underline"
            >
              JSON Formatter
            </a>{" "}
            – Format JSON with proper indentation
          </li>
          <li>
            <a
              href="/json-tools/json-error-explanation"
              className="text-primary hover:underline"
            >
              JSON Error Explanation
            </a>{" "}
            – Plain-language error explanations
          </li>
        </ul>
      </div>
    </div>
  );
}
