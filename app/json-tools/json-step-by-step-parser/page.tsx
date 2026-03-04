"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonStepByStepParserPage() {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState<
    Array<{
      step: number;
      token: string;
      type: string;
      position: number;
      state: string;
    }>
  >([]);

  const tokenizeJson = useCallback(() => {
    const tokens: Array<{
      step: number;
      token: string;
      type: string;
      position: number;
      state: string;
    }> = [];

    let i = 0;
    let step = 1;
    let state = "START";
    const states: string[] = [];

    while (i < input.length) {
      const char = input[i];
      let tokenType = "";
      let token = char;

      // Track state
      if (char === "{") {
        state = "OBJECT";
        states.push("OBJECT");
      } else if (char === "[") {
        state = "ARRAY";
        states.push("ARRAY");
      } else if (char === "}" || char === "]") {
        states.pop();
        state = states[states.length - 1] || "START";
      } else if (char === ":") {
        state = "VALUE";
      } else if (char === ",") {
        state = "KEY_OR_END";
      }

      // Determine token type
      if (
        char === "{" ||
        char === "}" ||
        char === "[" ||
        char === "]" ||
        char === ":" ||
        char === ","
      ) {
        tokenType = "PUNCTUATION";
      } else if (char === '"' || char === "'") {
        // Read string
        const quote = char;
        let str = char;
        let j = i + 1;
        while (j < input.length && input[j] !== quote) {
          if (input[j] === "\\") {
            str += input[j] + input[j + 1];
            j += 2;
          } else {
            str += input[j];
            j++;
          }
        }
        str += quote;
        token = str;
        tokenType = "STRING";
        i = j;
      } else if (char === "-" || (char >= "0" && char <= "9")) {
        // Read number
        let num = char;
        let j = i + 1;
        while (
          j < input.length &&
          ((input[j] >= "0" && input[j] <= "9") ||
            input[j] === "." ||
            input[j] === "e" ||
            input[j] === "E" ||
            input[j] === "+" ||
            input[j] === "-")
        ) {
          num += input[j];
          j++;
        }
        token = num;
        tokenType = "NUMBER";
        i = j - 1;
      } else if (input.substring(i, i + 4) === "true") {
        token = "true";
        tokenType = "BOOLEAN";
        i += 3;
      } else if (input.substring(i, i + 5) === "false") {
        token = "false";
        tokenType = "BOOLEAN";
        i += 4;
      } else if (input.substring(i, i + 4) === "null") {
        token = "null";
        tokenType = "NULL";
        i += 3;
      } else if (char.trim() === "") {
        tokenType = "WHITESPACE";
      } else {
        tokenType = "UNKNOWN";
      }

      if (tokenType !== "WHITESPACE") {
        tokens.push({
          step,
          token,
          type: tokenType,
          position: i,
          state,
        });
        step++;
      }

      i++;
    }

    setSteps(tokens);
    toast.success(`Tokenized into ${tokens.length} tokens`);
  }, [input]);

  const clearAll = () => {
    setInput("");
    setSteps([]);
  };

  const loadSample = () => {
    setInput('{"name": "John", "age": 30}');
  };

  const copyResult = () => {
    if (steps.length > 0) {
      navigator.clipboard.writeText(JSON.stringify(steps, null, 2));
      toast.success("Tokens copied to clipboard");
    }
  };

  const getTokenColor = (type: string) => {
    switch (type) {
      case "STRING":
        return "text-red-600 dark:text-red-400";
      case "NUMBER":
        return "text-blue-600 dark:text-blue-400";
      case "BOOLEAN":
        return "text-purple-600 dark:text-purple-400";
      case "NULL":
        return "text-gray-500";
      case "PUNCTUATION":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Step-by-Step Parser – Learn JSON Parsing
          </h1>
          <p className="text-muted-foreground">
            See how JSON is parsed token by token in a visual, step-by-step
            walkthrough. Our free JSON Step by Step Parser is the ideal learning
            tool for understanding JSON structure and syntax.
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

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {steps.length > 0 && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={tokenizeJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Parse Step by Step
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
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="min-h-[200px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
            />
          </CardContent>
        </Card>

        {/* Token Legend */}
        {steps.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                Token Types
              </Label>
              <div className="flex flex-wrap gap-4 text-sm">
                <span>
                  <span className="text-red-600 dark:text-red-400 font-mono">
                    "string"
                  </span>{" "}
                  = String
                </span>
                <span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">
                    123
                  </span>{" "}
                  = Number
                </span>
                <span>
                  <span className="text-purple-600 dark:text-purple-400 font-mono">
                    true/false
                  </span>{" "}
                  = Boolean
                </span>
                <span>
                  <span className="text-gray-500 font-mono">null</span> = Null
                </span>
                <span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-mono">
                    {"{}[]:,"}
                  </span>{" "}
                  = Punctuation
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Steps */}
        {steps.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Parsing Steps ({steps.length} tokens)
              </Label>
              <div className="space-y-2 max-h-[500px] overflow-auto">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-muted rounded-md text-sm"
                  >
                    <span className="text-muted-foreground w-8 font-mono">
                      #{step.step}
                    </span>
                    <span className={`font-mono ${getTokenColor(step.type)}`}>
                      {step.token}
                    </span>
                    <span className="text-muted-foreground w-24">
                      {step.type}
                    </span>
                    <span className="text-muted-foreground">
                      Pos: {step.position}
                    </span>
                    <span className="text-muted-foreground">
                      State: {step.state}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Step-by-Step Parser
          </h2>
          <p className="text-muted-foreground mb-6">
            Understanding how JSON parsing works helps you debug syntax errors
            and learn the structure of complex data. Seeing each token
            identified and categorized makes the parsing process transparent.
            This JSON Step-by-Step Parser breaks down your JSON into individual
            tokens with type and position information.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Enter JSON in the Input area or click Load Sample for a quick
            example. Click Parse Step by Step and the tool scans through your
            JSON character by character, identifying strings, numbers, booleans,
            null values, and punctuation marks.
          </p>
          <p className="text-muted-foreground mb-8">
            Each token displays with its step number, token value, type
            classification, character position, and parser state. The
            color-coded token types make it easy to distinguish strings from
            numbers and punctuation at a glance.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Students learning JSON syntax benefit from seeing how parsers
            identify different token types. Developers debugging tricky parsing
            errors can use this to understand exactly where the parser
            encounters problems in their JSON structure.
          </p>
          <p className="text-muted-foreground mb-8">
            This is an educational tool that shows basic tokenization.
            Real-world JSON parsers handle additional edge cases and Unicode
            escapes. Use this for learning fundamentals, not for production
            parsing logic.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What token types are recognized?
              </p>
              <p className="text-muted-foreground">
                Strings, Numbers, Booleans (true/false), Null, Punctuation
                (brackets, braces, colons, commas), and Unknown for unrecognized
                content.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What does the State column show?
              </p>
              <p className="text-muted-foreground">
                State indicates the current parsing context like OBJECT when
                inside curly braces or ARRAY when inside square brackets.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How are positions counted?</p>
              <p className="text-muted-foreground">
                Position shows the character index in the input string where the
                token begins, starting from 0.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does it handle escaped characters?
              </p>
              <p className="text-muted-foreground">
                Yes. Escaped quotes and backslashes inside strings are
                recognized as part of the string token.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I export the token list?</p>
              <p className="text-muted-foreground">
                Yes. Click the Copy button to copy all tokens as JSON for
                further analysis or documentation.
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
              – Check JSON for syntax errors
            </li>
            <li>
              <a
                href="/json-tools/json-parser"
                className="text-primary hover:underline"
              >
                JSON Parser
              </a>{" "}
              – Parse and analyze JSON structure
            </li>
            <li>
              <a
                href="/json-tools/json-path"
                className="text-primary hover:underline"
              >
                JSON Path Finder
              </a>{" "}
              – Extract values using path expressions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
