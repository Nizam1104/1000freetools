"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [isDegree, setIsDegree] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string>("");
  const [showSecondFunction, setShowSecondFunction] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      if (e.key === ".") inputDecimal();
      if (e.key === "+") performOperation("+");
      if (e.key === "-") performOperation("-");
      if (e.key === "*" || e.key === "x") performOperation("×");
      if (e.key === "/") performOperation("÷");
      if (e.key === "Enter" || e.key === "=") handleEquals();
      if (e.key === "Escape") clear();
      if (e.key === "Backspace") handleBackspace();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, previousValue, operation, waitingForOperand]);

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
    } else if (!display.includes(".")) {
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

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
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
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      const result = calculate(currentValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(String(result));
    }
    setWaitingForOperand(true);
    setOperation(nextOperation);
    setHistory(`${display} ${nextOperation}`);
  };

  const calculate = (left: number, right: number, op: string): number => {
    switch (op) {
      case "+": return left + right;
      case "-": return left - right;
      case "×": return left * right;
      case "÷": return right !== 0 ? left / right : 0;
      case "^": return Math.pow(left, right);
      default: return right;
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

  const performScientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result = 0;
    let funcName = func;

    switch (func) {
      case "sin":
        result = isDegree ? Math.sin(value * Math.PI / 180) : Math.sin(value);
        funcName = `sin(${value})`;
        break;
      case "cos":
        result = isDegree ? Math.cos(value * Math.PI / 180) : Math.cos(value);
        funcName = `cos(${value})`;
        break;
      case "tan":
        result = isDegree ? Math.tan(value * Math.PI / 180) : Math.tan(value);
        funcName = `tan(${value})`;
        break;
      case "asin":
        result = isDegree ? Math.asin(value) * 180 / Math.PI : Math.asin(value);
        funcName = `asin(${value})`;
        break;
      case "acos":
        result = isDegree ? Math.acos(value) * 180 / Math.PI : Math.acos(value);
        funcName = `acos(${value})`;
        break;
      case "atan":
        result = isDegree ? Math.atan(value) * 180 / Math.PI : Math.atan(value);
        funcName = `atan(${value})`;
        break;
      case "log":
        result = Math.log10(value);
        funcName = `log(${value})`;
        break;
      case "ln":
        result = Math.log(value);
        funcName = `ln(${value})`;
        break;
      case "log10":
        result = Math.log10(value);
        funcName = `log10(${value})`;
        break;
      case "sqrt":
        result = Math.sqrt(value);
        funcName = `√(${value})`;
        break;
      case "cbrt":
        result = Math.cbrt(value);
        funcName = `∛(${value})`;
        break;
      case "x²":
        result = Math.pow(value, 2);
        funcName = `${value}²`;
        break;
      case "x³":
        result = Math.pow(value, 3);
        funcName = `${value}³`;
        break;
      case "1/x":
        result = 1 / value;
        funcName = `1/${value}`;
        break;
      case "e^x":
        result = Math.exp(value);
        funcName = `e^${value}`;
        break;
      case "10^x":
        result = Math.pow(10, value);
        funcName = `10^${value}`;
        break;
      case "n!":
        result = factorial(value);
        funcName = `${value}!`;
        break;
      case "exp":
        result = Math.exp(value);
        funcName = `exp(${value})`;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setHistory(`${funcName} =`);
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const memoryClear = () => setMemory(0);
  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };
  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
    setWaitingForOperand(true);
  };
  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
    setWaitingForOperand(true);
  };
  const memoryStore = () => {
    setMemory(parseFloat(display));
    setWaitingForOperand(true);
  };

  const ScientificButton = ({ onClick, label, secondLabel, className = "" }: any) => (
    <Button
      variant="outline"
      onClick={onClick}
      className={`h-12 text-sm font-medium ${className}`}
    >
      {showSecondFunction && secondLabel ? secondLabel : label}
    </Button>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Free Online Scientific Calculator – Advanced Math Functions</h1>
        <p className="text-muted-foreground">
          Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Scientific Calculator</CardTitle>
          <CardDescription>
            Advanced scientific calculator with trigonometric functions, logarithms, exponents, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Switch checked={isDegree} onCheckedChange={setIsDegree} id="deg-mode" />
                <Label htmlFor="deg-mode" className="text-sm">DEG</Label>
                <span className="text-xs text-muted-foreground ml-2">
                  {isDegree ? "Degrees" : "Radians"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showSecondFunction} onCheckedChange={setShowSecondFunction} id="2nd-func" />
                <Label htmlFor="2nd-func" className="text-sm">2nd</Label>
                <span className="text-xs text-muted-foreground ml-2">Secondary functions</span>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-right text-sm text-muted-foreground h-6 mb-1 truncate">
                {history}
              </div>
              <div className="text-right text-3xl font-bold truncate">
                {parseFloat(display).toPrecision(12).replace(/\.?0+$/, "")}
              </div>
              {memory !== 0 && (
                <div className="text-right text-xs text-muted-foreground mt-1">
                  M = {memory}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2">
                <ScientificButton onClick={memoryClear} label="MC" className="bg-muted" />
                <ScientificButton onClick={memoryRecall} label="MR" className="bg-muted" />
                <ScientificButton onClick={memoryAdd} label="M+" className="bg-muted" />
                <ScientificButton onClick={memorySubtract} label="M−" className="bg-muted" />
                <ScientificButton onClick={memoryStore} label="MS" className="bg-muted" />
              </div>

              <div className="grid grid-cols-5 gap-2">
                <ScientificButton onClick={() => performScientificFunction(showSecondFunction ? "asin" : "sin")} label="sin" secondLabel="sin⁻¹" />
                <ScientificButton onClick={() => performScientificFunction(showSecondFunction ? "acos" : "cos")} label="cos" secondLabel="cos⁻¹" />
                <ScientificButton onClick={() => performScientificFunction(showSecondFunction ? "atan" : "tan")} label="tan" secondLabel="tan⁻¹" />
                <ScientificButton onClick={() => performOperation("^")} label="x^y" />
                <ScientificButton onClick={() => performScientificFunction(showSecondFunction ? "cbrt" : "sqrt")} label="√" secondLabel="∛" />
              </div>

              <div className="grid grid-cols-5 gap-2">
                <ScientificButton onClick={() => performScientificFunction("log")} label="log" />
                <ScientificButton onClick={() => performScientificFunction("ln")} label="ln" />
                <ScientificButton onClick={() => performScientificFunction("e^x")} label="eˣ" />
                <ScientificButton onClick={() => performScientificFunction(showSecondFunction ? "10^x" : "log10")} label="10ˣ" secondLabel="log₂" />
                <ScientificButton onClick={() => performScientificFunction("n!")} label="n!" />
              </div>

              <div className="grid grid-cols-5 gap-2">
                <ScientificButton onClick={() => performScientificFunction("x²")} label="x²" />
                <ScientificButton onClick={() => performScientificFunction("x³")} label="x³" />
                <ScientificButton onClick={() => performScientificFunction("1/x")} label="1/x" />
                <ScientificButton onClick={() => performScientificFunction("exp")} label="EXP" />
                <Button variant="outline" onClick={handleBackspace} className="h-12 text-sm font-medium">⌫</Button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                <Button variant="outline" onClick={clear} className="h-12 text-sm font-medium">AC</Button>
                <Button variant="outline" onClick={toggleSign} className="h-12 text-sm font-medium">±</Button>
                <Button variant="outline" onClick={inputPercent} className="h-12 text-sm font-medium">%</Button>
                <Button variant="outline" onClick={() => performOperation("÷")} className="h-12 text-sm font-medium bg-primary/10">÷</Button>
                <Button variant="outline" onClick={() => inputDigit("7")} className="h-12 text-sm font-medium">7</Button>

                <Button variant="outline" onClick={() => inputDigit("8")} className="h-12 text-sm font-medium">8</Button>
                <Button variant="outline" onClick={() => inputDigit("9")} className="h-12 text-sm font-medium">9</Button>
                <Button variant="outline" onClick={() => performOperation("×")} className="h-12 text-sm font-medium bg-primary/10">×</Button>
                <Button variant="outline" onClick={() => inputDigit("4")} className="h-12 text-sm font-medium">4</Button>

                <Button variant="outline" onClick={() => inputDigit("5")} className="h-12 text-sm font-medium">5</Button>
                <Button variant="outline" onClick={() => inputDigit("6")} className="h-12 text-sm font-medium">6</Button>
                <Button variant="outline" onClick={() => performOperation("-")} className="h-12 text-sm font-medium bg-primary/10">−</Button>
                <Button variant="outline" onClick={() => inputDigit("1")} className="h-12 text-sm font-medium">1</Button>

                <Button variant="outline" onClick={() => inputDigit("2")} className="h-12 text-sm font-medium">2</Button>
                <Button variant="outline" onClick={() => inputDigit("3")} className="h-12 text-sm font-medium">3</Button>
                <Button variant="outline" onClick={() => performOperation("+")} className="h-12 text-sm font-medium bg-primary/10">+</Button>
                <Button variant="outline" onClick={inputDecimal} className="h-12 text-sm font-medium">.</Button>

                <Button variant="outline" onClick={() => inputDigit("0")} className="h-12 text-sm font-medium">0</Button>
                <Button onClick={handleEquals} className="h-12 text-sm font-medium bg-primary text-primary-foreground col-span-2">=</Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-2">
              Keyboard: 0-9 numbers, + - * / operations, Enter = equals, Escape = clear
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Free Online Scientific Calculator – Advanced Math Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.
          </p>
          <p className="text-sm text-muted-foreground">
            Switch between degrees and radians for trig functions. Use memory functions to store and recall values. The 2nd function toggle gives you access to inverse trig functions and additional operations.
          </p>
          <p className="text-sm text-muted-foreground">
            Engineering students, physics researchers, and anyone working with advanced math can rely on this calculator. It handles everything from basic arithmetic to complex exponential and logarithmic calculations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scientific Functions Explained</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Trigonometric Functions</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">sin/cos/tan:</strong> Calculate sine, cosine, and tangent of angles</div>
                <div><strong className="text-foreground">sin⁻¹/cos⁻¹/tan⁻¹:</strong> Inverse functions – find angle from ratio</div>
                <div><strong className="text-foreground">DEG/RAD:</strong> Toggle between degrees and radians mode</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Logarithmic Functions</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">log:</strong> Base-10 logarithm</div>
                <div><strong className="text-foreground">ln:</strong> Natural logarithm (base e)</div>
                <div><strong className="text-foreground">10ˣ / eˣ:</strong> Antilog – inverse of log functions</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Exponential & Powers</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">x² / x³:</strong> Square and cube a number</div>
                <div><strong className="text-foreground">x^y:</strong> Raise x to any power y</div>
                <div><strong className="text-foreground">√ / ∛:</strong> Square root and cube root</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Other Functions</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">n!:</strong> Factorial – product of all integers up to n</div>
                <div><strong className="text-foreground">1/x:</strong> Reciprocal of x</div>
                <div><strong className="text-foreground">EXP:</strong> Scientific notation exponent entry</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memory Functions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-5 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">MS</div>
              <div className="text-xs text-muted-foreground">Store current display value in memory</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">MR</div>
              <div className="text-xs text-muted-foreground">Recall value from memory to display</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">M+</div>
              <div className="text-xs text-muted-foreground">Add current value to memory</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">M−</div>
              <div className="text-xs text-muted-foreground">Subtract current value from memory</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-1">MC</div>
              <div className="text-xs text-muted-foreground">Clear memory to zero</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Scientific Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Find sin(30°)</div>
              <div className="font-mono text-xs text-muted-foreground">sin(30) = 0.5</div>
              <p className="text-xs text-muted-foreground mt-1">Make sure DEG mode is selected for degree calculations.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Calculate log₁₀(1000)</div>
              <div className="font-mono text-xs text-muted-foreground">log(1000) = 3</div>
              <p className="text-xs text-muted-foreground mt-1">10 raised to what power equals 1000? Answer: 3.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Compute 5 factorial</div>
              <div className="font-mono text-xs text-muted-foreground">5! = 5 × 4 × 3 × 2 × 1 = 120</div>
              <p className="text-xs text-muted-foreground mt-1">Factorials grow very quickly – useful in probability.</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Square root of 144</div>
              <div className="font-mono text-xs text-muted-foreground">√144 = 12</div>
              <p className="text-xs text-muted-foreground mt-1">What number times itself equals 144?</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Calculate 2⁵</div>
              <div className="font-mono text-xs text-muted-foreground">2 ^ 5 = 32</div>
              <p className="text-xs text-muted-foreground mt-1">Use x^y button: enter 2, press x^y, enter 5, press =</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Natural log of e (2.718...)</div>
              <div className="font-mono text-xs text-muted-foreground">ln(e) = 1</div>
              <p className="text-xs text-muted-foreground mt-1">The natural log of Euler's number e is exactly 1.</p>
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
            <h4 className="font-semibold text-sm mb-2">What's the difference between DEG and RAD mode?</h4>
            <p className="text-xs text-muted-foreground">
              DEG (degrees) divides a circle into 360°. RAD (radians) uses the radius – a full circle is 2π radians. Use DEG for basic geometry and navigation. Use RAD for calculus and advanced physics.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate cube roots?</h4>
            <p className="text-xs text-muted-foreground">
              Press the 2nd toggle to access the cube root (∛) function, or use x^y with 1/3 as the exponent. For example, ∛27 = 3 because 3³ = 27.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does the EXP button do?</h4>
            <p className="text-xs text-muted-foreground">
              EXP lets you enter numbers in scientific notation. To enter 6.02 × 10²³ (Avogadro's number), type 6.02, press EXP, then 23. The display shows it as 6.02e+23.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate negative exponents?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. Use the ± button to make the exponent negative. For example, 2^(-3) = 1/8 = 0.125. Enter 2, press x^y, enter 3, press ±, then =
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why am I getting unexpected trig results?</h4>
            <p className="text-xs text-muted-foreground">
              Check your angle mode. sin(30) in DEG mode gives 0.5, but sin(30) in RAD mode gives -0.988. Make sure you're in the right mode for your problem.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Standard Calculator</p>
              <p className="text-xs text-muted-foreground">Basic arithmetic operations</p>
            </a>
            <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Fraction Calculator</p>
              <p className="text-xs text-muted-foreground">Work with fractions</p>
            </a>
            <a href="/math-tools/logarithm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Logarithm Calculator</p>
              <p className="text-xs text-muted-foreground">Dedicated log calculations</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
