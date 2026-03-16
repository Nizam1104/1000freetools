"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberPalindromChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ isPalindrome: boolean; steps?: number; sequence?: number[] } | null>(null);
  const [showReverseAdd, setShowReverseAdd] = useState(false);

  const isPalindrome = (n: number) => {
    const str = n.toString();
    return str === str.split("").reverse().join("");
  };

  const reverseNumber = (n: number) => {
    return parseInt(n.toString().split("").reverse().join(""));
  };

  const reverseAndAdd = (n: number, maxSteps = 100) => {
    const sequence = [n];
    let current = n;
    
    for (let i = 0; i < maxSteps; i++) {
      if (isPalindrome(current)) {
        return { isPalindrome: true, steps: i, sequence };
      }
      current = current + reverseNumber(current);
      sequence.push(current);
    }
    
    return { isPalindrome: false, steps: maxSteps, sequence };
  };

  const handleCheck = () => {
    const num = parseInt(input);
    
    if (isNaN(num) || num < 0) {
      setResult(null);
      return;
    }

    const palindromeCheck = isPalindrome(num);
    
    if (showReverseAdd && !palindromeCheck) {
      const reverseAddResult = reverseAndAdd(num);
      setResult(reverseAddResult);
    } else {
      setResult({ isPalindrome: palindromeCheck });
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Palindrome Checker</h2>
        <p className="text-sm text-muted-foreground">
          Check if a number reads the same forwards and backwards
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showReverseAdd"
            checked={showReverseAdd}
            onChange={(e) => setShowReverseAdd(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="showReverseAdd" className="text-sm">
            Show reverse-and-add process for non-palindromes
          </Label>
        </div>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="input">Number</Label>
        <Input
          id="input"
          type="number"
          min="0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="12321"
          className="font-mono"
        />
        <div className="flex gap-2">
          <Button onClick={handleCheck} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Check
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result && (
        <Card className={`p-4 ${result.isPalindrome ? "border-green-500" : "border-yellow-500"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${result.isPalindrome ? "bg-green-500" : "bg-yellow-500"}`} />
            <div>
              <div className="font-semibold">
                {result.isPalindrome ? "Is a Palindrome!" : "Not a Palindrome"}
              </div>
              {result.steps !== undefined && result.steps > 0 && (
                <div className="text-sm text-muted-foreground">
                  Becomes palindrome after {result.steps} reverse-and-add step(s)
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {result?.sequence && result.sequence.length > 1 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Reverse-and-Add Sequence</h3>
          <div className="space-y-2 font-mono text-sm overflow-x-auto">
            {result.sequence.map((num, i) => {
              const isPalin = isPalindrome(num);
              return (
                <div key={i} className={`flex items-center gap-2 ${isPalin ? "text-green-600 font-bold" : ""}`}>
                  <span className="text-muted-foreground w-8">{i === 0 ? "Start:" : i === result.sequence!.length - 1 ? "Result:" : `Step ${i}:`}</span>
                  <span>{num.toLocaleString()}</span>
                  {i > 0 && (
                    <span className="text-muted-foreground">
                      (prev + reverse = {result.sequence![i - 1]} + {reverseNumber(result.sequence![i - 1])})
                    </span>
                  )}
                  {isPalin && <span className="text-green-600">✓</span>}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Palindrome Examples</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
            <div className="font-bold text-green-700 dark:text-green-300">Palindromes</div>
            <div className="font-mono text-sm">121, 12321, 1001, 7</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded">
            <div className="font-bold text-yellow-700 dark:text-yellow-300">Not Palindromes</div>
            <div className="font-mono text-sm">123, 1234, 10, 56</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <div className="font-bold text-blue-700 dark:text-blue-300">Lychrel Candidates</div>
            <div className="font-mono text-sm">196, 295, 394</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
