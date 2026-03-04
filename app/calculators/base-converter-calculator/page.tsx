"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BaseConverterCalculator() {
  const [value, setValue] = useState<string>("");
  const [fromBase, setFromBase] = useState<string>("10");
  const [toBase, setToBase] = useState<string>("2");
  const [result, setResult] = useState<string>("");

  const calculate = () => {
    const v = value.trim();
    const from = parseInt(fromBase);
    const to = parseInt(toBase);
    
    if (!isNaN(from) && !isNaN(to) && from >= 2 && from <= 36 && to >= 2 && to <= 36) {
      try {
        const decimal = parseInt(v, from);
        if (!isNaN(decimal)) {
          setResult(decimal.toString(to).toUpperCase());
        }
      } catch {
        setResult("Invalid input");
      }
    }
  };

  const reset = () => {
    setValue("");
    setFromBase("10");
    setToBase("2");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Base Converter Calculator</CardTitle>
          <CardDescription>Convert numbers between different bases (2-36)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value</label>
              <Input
                type="text"
                placeholder="e.g., 1010 or A or 255"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">From Base</label>
                <Input
                  type="number"
                  min="2"
                  max="36"
                  value={fromBase}
                  onChange={(e) => setFromBase(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">To Base</label>
                <Input
                  type="number"
                  min="2"
                  max="36"
                  value={toBase}
                  onChange={(e) => setToBase(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result (Base {toBase})</p>
                <p className="text-2xl font-semibold font-mono">{result}</p>
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Common bases: 2 (Binary), 8 (Octal), 10 (Decimal), 16 (Hexadecimal)
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Base Converter Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
            <div>
              <p className="font-medium text-foreground">Enter the number you want to convert</p>
              <p className="text-sm text-muted-foreground">Type any valid number for the source base. For binary use only 0-1, for octal use 0-7, for decimal use 0-9, and for hexadecimal use 0-9 and A-F.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
            <div>
              <p className="font-medium text-foreground">Select the source and target bases</p>
              <p className="text-sm text-muted-foreground">Choose what base your number is in (From Base) and what base you want to convert to (To Base). Supports bases 2 through 36.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
            <div>
              <p className="font-medium text-foreground">Click Convert to see the result</p>
              <p className="text-sm text-muted-foreground">The converted number appears instantly. Copy it for use in programming, math homework, or digital systems work.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number Base Reference Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Decimal</th>
                  <th className="text-left py-3 px-2 font-semibold">Binary (Base 2)</th>
                  <th className="text-left py-3 px-2 font-semibold">Octal (Base 8)</th>
                  <th className="text-left py-3 px-2 font-semibold">Hexadecimal (Base 16)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2">0</td>
                  <td className="py-3 px-2 font-mono">0</td>
                  <td className="py-3 px-2 font-mono">0</td>
                  <td className="py-3 px-2 font-mono">0</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">1</td>
                  <td className="py-3 px-2 font-mono">1</td>
                  <td className="py-3 px-2 font-mono">1</td>
                  <td className="py-3 px-2 font-mono">1</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">2</td>
                  <td className="py-3 px-2 font-mono">10</td>
                  <td className="py-3 px-2 font-mono">2</td>
                  <td className="py-3 px-2 font-mono">2</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">3</td>
                  <td className="py-3 px-2 font-mono">11</td>
                  <td className="py-3 px-2 font-mono">3</td>
                  <td className="py-3 px-2 font-mono">3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">4</td>
                  <td className="py-3 px-2 font-mono">100</td>
                  <td className="py-3 px-2 font-mono">4</td>
                  <td className="py-3 px-2 font-mono">4</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">5</td>
                  <td className="py-3 px-2 font-mono">101</td>
                  <td className="py-3 px-2 font-mono">5</td>
                  <td className="py-3 px-2 font-mono">5</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">6</td>
                  <td className="py-3 px-2 font-mono">110</td>
                  <td className="py-3 px-2 font-mono">6</td>
                  <td className="py-3 px-2 font-mono">6</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">7</td>
                  <td className="py-3 px-2 font-mono">111</td>
                  <td className="py-3 px-2 font-mono">7</td>
                  <td className="py-3 px-2 font-mono">7</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">8</td>
                  <td className="py-3 px-2 font-mono">1000</td>
                  <td className="py-3 px-2 font-mono">10</td>
                  <td className="py-3 px-2 font-mono">8</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">9</td>
                  <td className="py-3 px-2 font-mono">1001</td>
                  <td className="py-3 px-2 font-mono">11</td>
                  <td className="py-3 px-2 font-mono">9</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">10</td>
                  <td className="py-3 px-2 font-mono">1010</td>
                  <td className="py-3 px-2 font-mono">12</td>
                  <td className="py-3 px-2 font-mono">A</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">15</td>
                  <td className="py-3 px-2 font-mono">1111</td>
                  <td className="py-3 px-2 font-mono">17</td>
                  <td className="py-3 px-2 font-mono">F</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">16</td>
                  <td className="py-3 px-2 font-mono">10000</td>
                  <td className="py-3 px-2 font-mono">20</td>
                  <td className="py-3 px-2 font-mono">10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">32</td>
                  <td className="py-3 px-2 font-mono">100000</td>
                  <td className="py-3 px-2 font-mono">40</td>
                  <td className="py-3 px-2 font-mono">20</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">255</td>
                  <td className="py-3 px-2 font-mono">11111111</td>
                  <td className="py-3 px-2 font-mono">377</td>
                  <td className="py-3 px-2 font-mono">FF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Hexadecimal uses letters A-F to represent values 10-15. Base 36 uses all digits 0-9 and letters A-Z.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Number Bases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">What Is a Number Base?</h4>
            <p>
              A number base tells you how many unique digits a system uses. Base 10 (decimal) uses ten digits: 0-9. Base 2 (binary) uses two: 0 and 1. Base 16 (hexadecimal) uses sixteen: 0-9 and A-F. The position of each digit represents a power of the base.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Binary (Base 2)</h4>
            <p>
              Binary is the language of computers. Every piece of data in your device is stored as ones and zeros. Each position represents a power of 2: 1, 2, 4, 8, 16, 32, and so on. The binary number 1011 equals 1×8 + 0×4 + 1×2 + 1×1 = 11 in decimal.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Octal (Base 8)</h4>
            <p>
              Octal was popular in early computing because it compresses binary nicely — each octal digit represents exactly three binary digits. It fell out of favor but still appears in Unix file permissions (like 755 or 644).
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Hexadecimal (Base 16)</h4>
            <p>
              Hex is everywhere in computing. Memory addresses, color codes in CSS (#FF5733), and MAC addresses all use hex. Each hex digit represents four binary digits, making it compact and readable. FF in hex equals 255 in decimal.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Other Bases</h4>
            <p>
              Base 36 uses all 26 letters plus 10 digits, making it useful for short identifiers. Base 64 is used for encoding binary data in text formats. Base 12 (duodecimal) has advocates who argue it divides more cleanly than 10.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Base Conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Know your valid digits</p>
              <p>Each base has a maximum digit. Binary maxes at 1, octal at 7, decimal at 9, hex at F (15). Entering an invalid digit for the source base will cause errors.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Use hex for colors and memory</p>
              <p>Web colors use six hex digits (RRGGBB). Memory addresses are often shown in hex. Learning to read hex quickly helps with debugging and web development.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Group binary for easier reading</p>
              <p>Long binary strings are hard to read. Group them in fours (for hex) or threes (for octal). The binary 11010111 becomes D7 in hex or 327 in octal.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">How do I convert binary to decimal?</h4>
            <p>
              Multiply each binary digit by its place value (powers of 2) and add them up. For 1011: (1×8) + (0×4) + (1×2) + (1×1) = 11. Start from the right with 2⁰=1, then 2¹=2, 2²=4, and so on.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Why does hexadecimal use letters?</h4>
            <p>
              Hex needs 16 unique symbols but only has 10 digits. Letters A through F represent values 10 through 15. So A=10, B=11, C=12, D=13, E=14, F=15. This keeps each hex digit as a single character.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">What is base 36 used for?</h4>
            <p>
              Base 36 uses all 26 letters plus 10 digits, giving 36 unique symbols. It is useful for creating short, human-readable identifiers from large numbers. URL shorteners sometimes use base 36 or base 62.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">How do programmers write different bases?</h4>
            <p>
              Many languages use prefixes: 0b for binary (0b1010), 0o for octal (0o17), and 0x for hex (0xFF). JavaScript, Python, and C all follow this convention. Decimal needs no prefix.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Can this calculator handle negative numbers?</h4>
            <p>
              This calculator works with positive integers. For negative numbers, convert the absolute value and add the minus sign. Note that computers use two's complement for negative binary numbers, which is more complex.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <a
            href="/calculators/binary-calculator"
            className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="font-medium text-foreground">Binary Calculator</span>
            <p className="text-muted-foreground">Perform arithmetic operations on binary numbers</p>
          </a>
          <a
            href="/calculators/hex-calculator"
            className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="font-medium text-foreground">Hex Calculator</span>
            <p className="text-muted-foreground">Add, subtract, multiply, and divide hexadecimal numbers</p>
          </a>
          <a
            href="/calculators/bitwise-calculator"
            className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="font-medium text-foreground">Bitwise Calculator</span>
            <p className="text-muted-foreground">Perform AND, OR, XOR, and shift operations on binary values</p>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
