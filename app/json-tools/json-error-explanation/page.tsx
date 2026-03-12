"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { JsonEditor } from "@/components/utils/json-editor";

export default function JsonErrorExplanationPage() {
  const [input, setInput] = useState("");
  const [errorInfo, setErrorInfo] = useState<{
    error: string;
    position: { line: number; column: number };
    explanation: string;
    fix: string;
  } | null>(null);

  const analyzeError = useCallback(() => {
    try {
      JSON.parse(input);
      toast.success("JSON is valid - no errors to explain");
      setErrorInfo(null);
      return;
    } catch (e) {
      const errorMsg = (e as Error).message;

      // Parse error position
      const positionMatch = errorMsg.match(/position (\d+)/i);
      const position = positionMatch ? parseInt(positionMatch[1]) : 0;

      // Calculate line and column
      const lines = input.substring(0, position).split("\n");
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;

      // Analyze the error type
      let explanation = "";
      let fix = "";
      const lowerMsg = errorMsg.toLowerCase();

      if (lowerMsg.includes("unexpected token")) {
        if (lowerMsg.includes("string")) {
          explanation =
            "The parser found an unexpected string or character. This often happens when there's a missing comma, colon, or quote.";
          fix =
            "Check the character before the error position. Make sure strings are wrapped in double quotes and properties are separated by commas.";
        } else if (lowerMsg.includes("number")) {
          explanation =
            "There's a number format issue. This could be an invalid number like '1.2.3' or a number starting with a decimal point.";
          fix =
            "Ensure numbers are in valid format (e.g., 123, -45.67, 0.5). Numbers cannot start with a decimal point.";
        } else if (lowerMsg.includes("identifier")) {
          explanation =
            "An unquoted property name was found. In JSON, all property names must be strings wrapped in double quotes.";
          fix =
            'Wrap the property name in double quotes. Change {name: "value"} to {"name": "value"}.';
        } else {
          explanation =
            "The parser encountered something it didn't expect at this position in the JSON structure.";
          fix =
            "Check for: missing commas between items, extra commas at the end of arrays/objects, mismatched brackets, or unquoted strings.";
        }
      } else if (lowerMsg.includes("string")) {
        explanation =
          "There's a string syntax error. This usually means a string is not properly closed or contains invalid escape sequences.";
        fix =
          "Make sure all strings use double quotes (\") not single quotes ('). Check for unescaped quotes or backslashes inside strings.";
      } else if (lowerMsg.includes("number")) {
        explanation =
          "The number format is invalid. JSON has strict rules about number formatting.";
        fix =
          "Numbers cannot have leading zeros (except 0 itself), cannot end with a decimal point, and cannot use Infinity or NaN.";
      } else if (lowerMsg.includes("property") || lowerMsg.includes("key")) {
        explanation =
          "There's an issue with an object property. Property names in JSON must be strings.";
        fix =
          'Ensure all property names are wrapped in double quotes. Example: {"name": "value"} not {name: "value"}.';
      } else if (lowerMsg.includes("bracket") || lowerMsg.includes("brace")) {
        explanation =
          "There's a mismatch in brackets or braces. Every opening bracket must have a matching closing bracket.";
        fix =
          "Count your opening and closing brackets. Make sure [ matches ], { matches }, and they're properly nested.";
      } else {
        explanation = `Parser error: ${errorMsg}`;
        fix =
          "Review the JSON syntax carefully. Common issues include missing commas, unquoted strings, or mismatched brackets.";
      }

      // Find the problematic character
      const context = input.substring(
        Math.max(0, position - 20),
        Math.min(input.length, position + 20),
      );
      if (context) {
        fix += `\n\nContext around error: "...${context}..."`;
      }

      setErrorInfo({
        error: errorMsg,
        position: { line, column },
        explanation,
        fix,
      });
      toast.error("Error analyzed");
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setErrorInfo(null);
  };

  const loadInvalidSample = () => {
    setInput(`{
  "name": "John",
  "age": 30,
  "hobbies": ["reading", "coding"
  "city": "NYC"
}`);
  };

  const copyResult = () => {
    if (errorInfo) {
      const text = `Error: ${errorInfo.error}\nPosition: Line ${errorInfo.position.line}, Column ${errorInfo.position.column}\n\nExplanation: ${errorInfo.explanation}\n\nFix: ${errorInfo.fix}`;
      navigator.clipboard.writeText(text);
      toast.success("Error analysis copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Error Explainer – Fix JSON Errors Online
          </h1>
          <p className="text-muted-foreground">
            Get clear, plain-language explanations of JSON parsing errors and
            how to fix them. Our free JSON Error Explanation Tool helps
            developers and beginners debug invalid JSON fast.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadInvalidSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Invalid Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {errorInfo && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={analyzeError}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Analyze Error
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label
              htmlFor="input"
              className="text-sm font-medium text-muted-foreground mb-2 block"
            >
              Input JSON (with errors)
            </Label>
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder="Paste invalid JSON here..."
            />
          </CardContent>
        </Card>

        {/* Result */}
        {errorInfo && (
          <div className="space-y-4">
            <Card className="border-destructive">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-destructive mb-2">
                      Error Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Error:</span>{" "}
                        <code className="bg-muted px-2 py-1 rounded">
                          {errorInfo.error}
                        </code>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Position:</span>{" "}
                        Line {errorInfo.position.line}, Column{" "}
                        {errorInfo.position.column}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Explanation</h3>
                <p className="text-muted-foreground">{errorInfo.explanation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">How to Fix</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {errorInfo.fix}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">
          About JSON Error Explanation Tool
        </h2>
        <p className="text-muted-foreground mb-6">
          JSON syntax errors can be frustrating when the parser message makes no
          sense. This tool takes those cryptic error messages and translates
          them into plain English with specific guidance on how to fix the
          problem. Instead of guessing what "unexpected token" means, you get a
          clear explanation.
        </p>

        <h3 className="text-xl font-semibold mb-3">
          How the error analysis works
        </h3>
        <p className="text-muted-foreground mb-2">
          Paste your broken JSON and click the Analyze Error button. The tool
          attempts to parse your input, catches the error, and extracts the
          position information from the error message. It then calculates the
          exact line and column where the parser failed.
        </p>
        <p className="text-muted-foreground mb-8">
          Based on the error type, the tool provides a tailored explanation and
          fix suggestion. It handles common issues like missing commas, unquoted
          properties, mismatched brackets, and invalid number formats. The
          context around the error is shown to help you locate the problem
          quickly.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You copied JSON from a log file or API response and it won't parse.
          The browser console shows an error but you can't figure out what's
          wrong. This tool is also helpful when learning JSON syntax and you
          want to understand why your input is invalid.
        </p>
        <p className="text-muted-foreground mb-8">
          Keep in mind this tool explains syntax errors only. It won't help with
          semantic issues like wrong data types or missing required fields. For
          those cases, you'd need a JSON Schema validator instead.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">
              What types of errors does this tool explain?
            </p>
            <p className="text-muted-foreground">
              It covers syntax errors like missing commas, unquoted strings,
              mismatched brackets, invalid numbers, and unexpected tokens. Each
              error type gets a specific explanation.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              Can it handle multiple errors at once?
            </p>
            <p className="text-muted-foreground">
              No, JSON parsers stop at the first error they encounter. Fix the
              reported error first, then run the analysis again if there are
              more issues.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              Does it work with JSON5 or relaxed JSON?
            </p>
            <p className="text-muted-foreground">
              No, this tool uses the standard JSON parser which requires strict
              JSON syntax. JSON5 features like comments and trailing commas will
              be flagged as errors.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              How accurate is the error position?
            </p>
            <p className="text-muted-foreground">
              The position points to where the parser detected the problem,
              which is usually right after the actual mistake. Check the
              characters before the reported position.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              Can I use this to learn JSON syntax?
            </p>
            <p className="text-muted-foreground">
              Yes, the explanations teach you what went wrong and why. Over time
              you'll recognize common patterns and fix errors faster on your
              own.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
