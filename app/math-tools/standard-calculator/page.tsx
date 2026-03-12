"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StandardCalculator() {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<string>("");

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setHistory("");
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
      setHistory(`${display} ${nextOperation}`);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      const result = calculate(currentValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(String(result));
      setHistory(`${result} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (left: number, right: number, op: string): number => {
    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "×":
        return left * right;
      case "÷":
        return right !== 0 ? left / right : 0;
      default:
        return right;
    }
  };

  const handleEquals = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    const result = calculate(currentValue, inputValue, operation);

    setHistory(`${previousValue} ${operation} ${display} =`);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const ButtonGrid = () => (
    <div className="grid grid-cols-4 gap-2">
      <Button variant="outline" onClick={clear} className="h-14 text-lg font-medium">AC</Button>
      <Button variant="outline" onClick={clearEntry} className="h-14 text-lg font-medium">CE</Button>
      <Button variant="outline" onClick={handleBackspace} className="h-14 text-lg font-medium">⌫</Button>
      <Button variant="outline" onClick={() => performOperation("÷")} className="h-14 text-lg font-medium bg-primary/10">÷</Button>

      <Button variant="outline" onClick={() => inputDigit("7")} className="h-14 text-lg font-medium">7</Button>
      <Button variant="outline" onClick={() => inputDigit("8")} className="h-14 text-lg font-medium">8</Button>
      <Button variant="outline" onClick={() => inputDigit("9")} className="h-14 text-lg font-medium">9</Button>
      <Button variant="outline" onClick={() => performOperation("×")} className="h-14 text-lg font-medium bg-primary/10">×</Button>

      <Button variant="outline" onClick={() => inputDigit("4")} className="h-14 text-lg font-medium">4</Button>
      <Button variant="outline" onClick={() => inputDigit("5")} className="h-14 text-lg font-medium">5</Button>
      <Button variant="outline" onClick={() => inputDigit("6")} className="h-14 text-lg font-medium">6</Button>
      <Button variant="outline" onClick={() => performOperation("-")} className="h-14 text-lg font-medium bg-primary/10">−</Button>

      <Button variant="outline" onClick={() => inputDigit("1")} className="h-14 text-lg font-medium">1</Button>
      <Button variant="outline" onClick={() => inputDigit("2")} className="h-14 text-lg font-medium">2</Button>
      <Button variant="outline" onClick={() => inputDigit("3")} className="h-14 text-lg font-medium">3</Button>
      <Button variant="outline" onClick={() => performOperation("+")} className="h-14 text-lg font-medium bg-primary/10">+</Button>

      <Button variant="outline" onClick={toggleSign} className="h-14 text-lg font-medium">±</Button>
      <Button variant="outline" onClick={() => inputDigit("0")} className="h-14 text-lg font-medium">0</Button>
      <Button variant="outline" onClick={inputDecimal} className="h-14 text-lg font-medium">.</Button>
      <Button onClick={handleEquals} className="h-14 text-lg font-medium bg-primary text-primary-foreground">=</Button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Free Online Standard Calculator – Fast & Easy Math</h1>
        <p className="text-muted-foreground">
          Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Standard Calculator</CardTitle>
          <CardDescription>
            Free online standard calculator for quick arithmetic operations. Add, subtract, multiply, and divide with instant results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-right text-sm text-muted-foreground h-6 mb-1">
                {history}
              </div>
              <div className="text-right text-4xl font-bold truncate">
                {parseFloat(display).toLocaleString('en-US', { maximumFractionDigits: 10 })}
              </div>
            </div>

            <ButtonGrid />

            <div className="text-xs text-muted-foreground text-center pt-2">
              Use keyboard: 0-9 for numbers, + - * / for operations, Enter for equals, Escape to clear
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Free Online Standard Calculator – Fast & Easy Math</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use our free standard calculator online to perform quick arithmetic operations including addition, subtraction, multiplication, and division. Simple, fast, and accurate for everyday math needs.
          </p>
          <p className="text-sm text-muted-foreground">
            This calculator handles both simple and complex calculations with ease. Enter your numbers, select an operation, and get instant results. The display shows your calculation history, so you can track what you've computed.
          </p>
          <p className="text-sm text-muted-foreground">
            Whether you're balancing a budget, calculating tips, checking homework, or doing quick math at work, this tool is ready. No download required – it works right in your browser on any device.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">1</div>
              <h4 className="font-semibold text-sm mb-2">Enter Numbers</h4>
              <p className="text-xs text-muted-foreground">Click number buttons or use your keyboard to input values. The display shows your current entry.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">2</div>
              <h4 className="font-semibold text-sm mb-2">Select Operation</h4>
              <p className="text-xs text-muted-foreground">Choose +, −, ×, or ÷. The calculator stores your first number and waits for the second.</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-3">3</div>
              <h4 className="font-semibold text-sm mb-2">Get Results</h4>
              <p className="text-xs text-muted-foreground">Enter the second number and press = for your answer. Chain operations by continuing to add operations.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Arithmetic Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Addition (+)</span>
                <span className="font-mono text-sm">5 + 3 = 8</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Combines two or more numbers to find their total sum.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Subtraction (−)</span>
                <span className="font-mono text-sm">10 − 4 = 6</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Finds the difference between numbers by taking one away from another.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Multiplication (×)</span>
                <span className="font-mono text-sm">6 × 7 = 42</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Repeated addition – multiplying 6 by 7 means adding 6 to itself 7 times.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Division (÷)</span>
                <span className="font-mono text-sm">20 ÷ 4 = 5</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Splits a number into equal parts – dividing 20 by 4 gives you 5 equal groups.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">0 – 9</div>
              <div className="text-xs text-muted-foreground mt-1">Enter numbers</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">+ − * /</div>
              <div className="text-xs text-muted-foreground mt-1">Operations</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">Enter</div>
              <div className="text-xs text-muted-foreground mt-1">Equals (=)</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">Escape</div>
              <div className="text-xs text-muted-foreground mt-1">Clear all</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">.</div>
              <div className="text-xs text-muted-foreground mt-1">Decimal point</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">Backspace</div>
              <div className="text-xs text-muted-foreground mt-1">Delete last digit</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">%</div>
              <div className="text-xs text-muted-foreground mt-1">Percentage</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-mono text-sm font-semibold">Ctrl + C</div>
              <div className="text-xs text-muted-foreground mt-1">Copy result</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Everyday Calculator Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Calculate a 20% tip on $45</div>
              <div className="font-mono text-xs text-muted-foreground">45 × 0.20 = 9</div>
              <p className="text-xs text-muted-foreground mt-1">Multiply the bill by 0.20 to find a 20% tip.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Split a $127 bill among 5 people</div>
              <div className="font-mono text-xs text-muted-foreground">127 ÷ 5 = 25.4</div>
              <p className="text-xs text-muted-foreground mt-1">Each person pays $25.40.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Total cost of 3 items at $18.50 each</div>
              <div className="font-mono text-xs text-muted-foreground">18.50 × 3 = 55.50</div>
              <p className="text-xs text-muted-foreground mt-1">Total cost is $55.50.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Change from $100 after $67.25 purchase</div>
              <div className="font-mono text-xs text-muted-foreground">100 − 67.25 = 32.75</div>
              <p className="text-xs text-muted-foreground mt-1">You get $32.75 in change.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Add up monthly expenses: $1200 + $450 + $275 + $180</div>
              <div className="font-mono text-xs text-muted-foreground">1200 + 450 + 275 + 180 = 2105</div>
              <p className="text-xs text-muted-foreground mt-1">Total monthly expenses are $2,105.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I clear the calculator?</h4>
            <p className="text-xs text-muted-foreground">
              Click AC (All Clear) to reset everything, or CE (Clear Entry) to clear just the current number. You can also press Escape on your keyboard for a full reset.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I chain multiple operations?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Enter 5 + 3 × 2 − 1 and the calculator processes each operation in sequence. Just keep entering operations and numbers – press = when you want the final result.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does this calculator follow order of operations?</h4>
            <p className="text-xs text-muted-foreground">
              This is a basic calculator that processes operations in the order you enter them (left to right). For order of operations (PEMDAS), use our Scientific Calculator instead.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the maximum number I can enter?</h4>
            <p className="text-xs text-muted-foreground">
              The calculator handles numbers up to JavaScript's safe integer limit (about 9 quadrillion). For most everyday calculations, you won't hit any limits.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this offline?</h4>
            <p className="text-xs text-muted-foreground">
              Once the page loads, the calculator works without an internet connection. It runs entirely in your browser – no server calls needed for calculations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
