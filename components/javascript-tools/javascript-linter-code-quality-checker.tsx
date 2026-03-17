"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";

const JavascriptLinterCodeQualityChecker: React.FC = () => {
  const [codeInput, setCodeInput] = useState("");
  const [issues, setIssues] = useState<{ line: number; column: number; message: string; severity: "error" | "warning" }[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(100);
  const [selectedRules, setSelectedRules] = useState<string[]>(["all"]);

  const rules = [
    { id: "all", name: "All Rules" },
    { id: "nocomsole", name: "No console.log" },
    { id: "novar", name: "No var (use let/const)" },
    { id: "semicolons", name: "Missing semicolons" },
    { id: "quotes", name: "Inconsistent quotes" },
    { id: "spacing", name: "Spacing issues" },
    { id: "unused", name: "Potential unused vars" },
    { id: "length", name: "Long lines" },
    { id: "todos", name: "TODO/FIXME comments" },
  ];

  const sampleCode = `function processData(data) {
  var result = []
  console.log("Processing data")
  
  for(let i=0;i<data.length;i++){
    if(data[i]!=null){
      result.push(data[i])
    }
  }
  
  // TODO: optimize this
  return result
}`;

  const toggleRule = (ruleId: string) => {
    if (ruleId === "all") {
      setSelectedRules(["all"]);
    } else {
      setSelectedRules(prev => {
        const withoutAll = prev.filter(r => r !== "all");
        if (withoutAll.includes(ruleId)) {
          return withoutAll.filter(r => r !== ruleId);
        }
        return [...withoutAll, ruleId];
      });
    }
  };

  const checkCode = useCallback(() => {
    if (!codeInput.trim()) return;

    const foundIssues: { line: number; column: number; message: string; severity: "error" | "warning" }[] = [];
    const lines = codeInput.split("\n");

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // No console.log
      if (selectedRules.includes("all") || selectedRules.includes("nocomsole")) {
        const consoleMatch = line.match(/console\.(log|warn|error|info|debug)/);
        if (consoleMatch) {
          foundIssues.push({
            line: lineNum,
            column: line.indexOf(consoleMatch[0]) + 1,
            message: "Avoid using console statements in production code",
            severity: "warning",
          });
        }
      }

      // No var
      if (selectedRules.includes("all") || selectedRules.includes("novar")) {
        const varMatch = line.match(/\bvar\s+\w+/);
        if (varMatch) {
          foundIssues.push({
            line: lineNum,
            column: line.indexOf("var") + 1,
            message: "Use 'let' or 'const' instead of 'var'",
            severity: "error",
          });
        }
      }

      // Missing semicolons
      if (selectedRules.includes("all") || selectedRules.includes("semicolons")) {
        const trimmed = line.trim();
        if (trimmed && 
            !trimmed.endsWith(";") && 
            !trimmed.endsWith("{") && 
            !trimmed.endsWith("}") &&
            !trimmed.endsWith(",") &&
            !trimmed.startsWith("//") &&
            !trimmed.startsWith("/*") &&
            !trimmed.startsWith("*") &&
            !trimmed.startsWith("import ") &&
            !trimmed.startsWith("export ") &&
            !trimmed.startsWith("function ") &&
            !trimmed.startsWith("class ") &&
            !trimmed.startsWith("if ") &&
            !trimmed.startsWith("for ") &&
            !trimmed.startsWith("while ") &&
            !trimmed.startsWith("switch ") &&
            !trimmed.startsWith("case ") &&
            !trimmed.startsWith("return ") &&
            !trimmed.startsWith("try ") &&
            !trimmed.startsWith("catch ") &&
            !trimmed.startsWith("else")) {
          foundIssues.push({
            line: lineNum,
            column: trimmed.length,
            message: "Missing semicolon at end of statement",
            severity: "warning",
          });
        }
      }

      // Inconsistent quotes
      if (selectedRules.includes("all") || selectedRules.includes("quotes")) {
        const singleQuotes = (line.match(/'[^']*'/g) || []).length;
        const doubleQuotes = (line.match(/"[^"]*"/g) || []).length;
        const backticks = (line.match(/`[^`]*`/g) || []).length;
        const totalQuotes = singleQuotes + doubleQuotes + backticks;
        if (totalQuotes > 1 && (singleQuotes > 0 && doubleQuotes > 0)) {
          foundIssues.push({
            line: lineNum,
            column: 1,
            message: "Inconsistent quote usage (mix of single and double quotes)",
            severity: "warning",
          });
        }
      }

      // Spacing issues
      if (selectedRules.includes("all") || selectedRules.includes("spacing")) {
        if (line.match(/[=<>!+\-*/&|]=\S/) || line.match(/\S[=<>!+\-*/&|]/)) {
          foundIssues.push({
            line: lineNum,
            column: 1,
            message: "Consider adding spaces around operators",
            severity: "warning",
          });
        }
      }

      // Long lines
      if (selectedRules.includes("all") || selectedRules.includes("length")) {
        if (line.length > 100) {
          foundIssues.push({
            line: lineNum,
            column: 101,
            message: `Line exceeds 100 characters (${line.length} characters)`,
            severity: "warning",
          });
        }
      }

      // TODO/FIXME comments
      if (selectedRules.includes("all") || selectedRules.includes("todos")) {
        const todoMatch = line.match(/\/\/.*\b(TODO|FIXME|XXX|HACK|BUG)\b/i);
        if (todoMatch) {
          foundIssues.push({
            line: lineNum,
            column: line.indexOf(todoMatch[0]) + 1,
            message: `Found ${todoMatch[1].toUpperCase()} comment - address this issue`,
            severity: "warning",
          });
        }
      }
    });

    setIssues(foundIssues);
    setChecked(true);
    
    // Calculate score
    const errorCount = foundIssues.filter(i => i.severity === "error").length;
    const warningCount = foundIssues.filter(i => i.severity === "warning").length;
    const calculatedScore = Math.max(0, 100 - (errorCount * 10) - (warningCount * 2));
    setScore(calculatedScore);
  }, [codeInput, selectedRules]);

  const handleClear = useCallback(() => {
    setCodeInput("");
    setIssues([]);
    setChecked(false);
    setScore(100);
  }, []);

  const handleCopy = useCallback(() => {
    if (issues.length > 0) {
      const report = issues.map(i => `Line ${i.line}:${i.column} [${i.severity.toUpperCase()}] ${i.message}`).join("\n");
      navigator.clipboard.writeText(report);
    }
  }, [issues]);

  const getScoreColor = () => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            JavaScript Linter & Code Quality Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="codeInput">JavaScript Code</Label>
              <Textarea
                id="codeInput"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Paste your JavaScript code here..."
                rows={15}
                className="font-mono text-sm"
              />
              <Button 
                onClick={() => setCodeInput(sampleCode)} 
                variant="outline" 
                size="sm"
              >
                Load Sample Code
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Rules to Check</Label>
              <div className="space-y-2">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={rule.id}
                      checked={selectedRules.includes(rule.id)}
                      onChange={() => toggleRule(rule.id)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor={rule.id} className="font-normal text-sm">
                      {rule.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={checkCode} disabled={!codeInput.trim()}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Code
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!checked}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Report
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {checked && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`text-4xl font-bold ${getScoreColor()}`}>{score}</div>
                <div>
                  <p className="font-semibold">Code Quality Score</p>
                  <p className="text-sm text-gray-500">
                    {issues.filter(i => i.severity === "error").length} errors, {issues.filter(i => i.severity === "warning").length} warnings
                  </p>
                </div>
              </div>

              {issues.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Issues Found ({issues.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-auto">
                      {issues.map((issue, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded text-sm ${
                            issue.severity === "error" 
                              ? "bg-red-50 text-red-700" 
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          <span className="font-mono">Line {issue.line}:{issue.column}</span>
                          <span className="ml-2">[{issue.severity.toUpperCase()}]</span>
                          <span className="ml-2">{issue.message}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="p-4 border rounded-lg bg-green-50 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                  <p className="text-green-700 font-semibold">No issues found! Great job!</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JavascriptLinterCodeQualityChecker;
