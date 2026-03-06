"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PiDigitGenerator() {
  const [digits, setDigits] = useState("");
  const [result, setResult] = useState<{
    numDigits: number;
    piString: string;
    lastDigit: string;
  } | null>(null);
  const [error, setError] = useState("");

  // Pre-computed digits of pi (1000 digits)
  const PI_DIGITS = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

  const generatePiDigits = (n: number) => {
    const piString = "3." + PI_DIGITS.substring(0, n);
    const lastDigit = PI_DIGITS.substring(n - 1, n);
    return { numDigits: n, piString, lastDigit };
  };

  const calculate = () => {
    const num = parseInt(digits.trim());

    if (isNaN(num)) {
      setError("Please enter a valid number of digits");
      setResult(null);
      return;
    }

    if (num < 1 || num > 1000) {
      setError("Please enter a number between 1 and 1000");
      setResult(null);
      return;
    }

    setError("");
    setResult(generatePiDigits(num));
  };

  const reset = () => {
    setDigits("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pi Digit Generator – Explore Digits of π</h1>
        <p className="text-muted-foreground">
          Display the digits of pi (π) to any decimal place up to 1000 digits. Perfect for math projects, memorization practice, and exploring this famous irrational number.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number of Decimal Places</Label>
          <Input
            type="text"
            placeholder="e.g., 50"
            value={digits}
            onChange={(e) => setDigits(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Pi Digits</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                π to {result.numDigits} decimal places
              </p>
              <p className="text-lg font-mono break-all leading-relaxed">
                {result.piString}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Decimal Places Shown</p>
                <p className="text-2xl font-bold">{result.numDigits}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Last Digit</p>
                <p className="text-2xl font-bold">{result.lastDigit}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Characters</p>
                <p className="text-2xl font-bold">{result.piString.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">First 10 Digits</p>
                <p className="text-2xl font-mono">3.141592653...</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Digits in Groups of 10</p>
              <div className="space-y-2 font-mono text-sm overflow-x-auto">
                {Array.from({ length: Math.ceil(result.numDigits / 10) }, (_, i) => {
                  const start = i * 10;
                  const end = Math.min(start + 10, result.numDigits);
                  const group = PI_DIGITS.substring(start, end);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground w-16">
                        {start + 1}-{end}:
                      </span>
                      <span className="bg-background px-3 py-1 rounded">
                        {group.match(/.{1,10}/g)?.join(" ") || group}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Digit Frequency</p>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
                  const count = PI_DIGITS.substring(0, result.numDigits).split("").filter(c => parseInt(c) === d).length;
                  const percentage = ((count / result.numDigits) * 100).toFixed(1);
                  return (
                    <div key={d} className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono font-bold">{d}</span>
                      <div className="flex-1 h-4 bg-background rounded overflow-hidden">
                        <div 
                          className="h-full bg-primary/50 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono w-20 text-right">{count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                In a truly random sequence, each digit would appear about 10% of the time.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is Pi?</h2>
        <p className="text-muted-foreground">
          Pi (π) is the ratio of a circle's circumference to its diameter. No matter the size of the circle, divide the distance around it by the distance across it, and you always get π.
        </p>
        <p className="text-muted-foreground">
          Pi is approximately 3.14159, but its decimal representation goes on forever without repeating. It's an irrational number – you can't write it as a fraction – and it's also transcendental, meaning it's not the solution to any polynomial equation with rational coefficients.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Pi to 100 Decimal Places</h3>
          <p className="text-sm font-mono break-all">
            3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">The Formula</h2>
        <p className="text-muted-foreground">
          The basic definition of pi is simple:
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-2xl font-mono text-center py-4">
            π = C / d
          </p>
          <p className="text-sm text-muted-foreground text-center">
            where C is the circumference and d is the diameter
          </p>
        </div>
        <p className="text-muted-foreground">
          Pi also appears in the formulas for circle area and sphere volume:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Circle Area</h3>
            <p className="text-lg font-mono">A = πr²</p>
            <p className="text-xs text-muted-foreground mt-2">
              Area equals pi times radius squared
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Sphere Volume</h3>
            <p className="text-lg font-mono">V = (4/3)πr³</p>
            <p className="text-xs text-muted-foreground mt-2">
              Volume equals four-thirds pi times radius cubed
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">History of Pi</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Ancient Approximations</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-semibold">Babylonians (1900 BCE):</span> Used 3.125 (25/8)</p>
              <p><span className="font-semibold">Egyptians (1650 BCE):</span> Rhind Papyrus gives ~3.1605</p>
              <p><span className="font-semibold">Archimedes (250 BCE):</span> Proved π is between 223/71 and 22/7 (3.1408 to 3.1429)</p>
              <p><span className="font-semibold">China (263 CE):</span> Liu Hui calculated 3.14159 using a 3072-sided polygon</p>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">The Symbol π</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Welsh mathematician William Jones first used the Greek letter π in 1706. Leonhard Euler popularized it in the 1730s. The symbol comes from the Greek word "periphery."
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Modern Calculations</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><span className="font-semibold">1949:</span> ENIAC computer calculated 2,037 digits in 70 hours</p>
              <p><span className="font-semibold">2021:</span> Swiss researchers computed 62.8 trillion digits</p>
              <p><span className="font-semibold">2024:</span> Over 100 trillion digits have been calculated</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Pi Facts and Records</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Mind-Blowing Facts</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Pi has been calculated to over 100 trillion digits</li>
              <li>• Your birthday probably appears in pi (somewhere in the first million digits)</li>
              <li>• Pi Day is March 14 (3/14) – also Einstein's birthday</li>
              <li>• The record for reciting pi from memory is 70,000+ digits</li>
              <li>• Pi appears in formulas unrelated to circles, like probability</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Pi in Culture</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "Piphilology" is the practice of memorizing pi digits</li>
              <li>• "Poe, E.: Near a Raven" encodes 740 digits of pi</li>
              <li>• Kate Bush's song "Pi" includes 137 digits</li>
              <li>• The movie "Pi" (1998) explores mathematical obsession</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Memorization Tips</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Piems (Pi Poems)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Count the letters in each word to get digits:
            </p>
            <p className="text-sm italic">
              "How I need a drink, alcoholic of course, after the heavy lectures involving quantum mechanics."
            </p>
            <p className="text-xs font-mono mt-2">
              How(3) I(1) need(4) a(1) drink(5) alcoholic(9) of(2) course(6)... = 3.1415926...
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Chunking Method</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Break digits into phone-number-sized chunks:
            </p>
            <p className="text-sm font-mono">
              3.1415 92653 58979 32384 62643...
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Easier to remember five groups of 5 than 25 individual digits.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Pattern Recognition</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Look for patterns and sequences:
            </p>
            <p className="text-sm font-mono">
              ...28841971... has 288, then 4, then 1971 (a year)<br />
              ...123... appears at position 192 (the sequence 123)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">Is pi really infinite?</h3>
          <p className="text-sm text-muted-foreground">
            Pi's decimal representation is infinitely long and never repeats. This is what makes it irrational. But pi itself is a finite number – it's between 3 and 4.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Does pi contain every possible number sequence?</h3>
          <p className="text-sm text-muted-foreground">
            We don't know for sure. Pi is suspected to be "normal" (containing all digit sequences equally), but this hasn't been proven. If true, your phone number, social security number, and every book ever written (encoded as numbers) would appear somewhere in pi.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why do we need so many digits of pi?</h3>
          <p className="text-sm text-muted-foreground">
            For practical purposes, 39 digits of pi can calculate the circumference of the observable universe to within the width of a hydrogen atom. More digits are mainly for testing computers and mathematical algorithms.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the most important use of pi?</h3>
          <p className="text-sm text-muted-foreground">
            Pi is essential in any calculation involving circles, spheres, or waves. This includes engineering, physics, signal processing, and statistics. It appears in formulas for everything from pendulum motion to quantum mechanics.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can pi be expressed as a fraction?</h3>
          <p className="text-sm text-muted-foreground">
            No. Pi is irrational, which means it cannot be written as a ratio of two integers. Common approximations like 22/7 or 355/113 are close but not exact.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/circle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Circle Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate circle properties</p>
          </a>
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate areas of shapes</p>
          </a>
          <a href="/math-tools/scientific-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scientific Calculator</p>
            <p className="text-xs text-muted-foreground">Advanced calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
