"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(2);
  const [numSides, setNumSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<{ dice: number[]; total: number; timestamp: Date }[]>([]);

  const roll = () => {
    setIsRolling(true);
    setResults([]);

    let rolls = 0;
    const maxRolls = 10;
    const interval = setInterval(() => {
      rolls++;
      const tempResults = Array.from({ length: numDice }, () =>
        Math.floor(Math.random() * numSides) + 1
      );
      setResults(tempResults);

      if (rolls >= maxRolls) {
        clearInterval(interval);
        const finalResults = Array.from({ length: numDice }, () =>
          Math.floor(Math.random() * numSides) + 1
        );
        setResults(finalResults);
        setRollHistory(prev => [{ dice: finalResults, total: finalResults.reduce((a, b) => a + b, 0), timestamp: new Date() }, ...prev].slice(0, 10));
        setIsRolling(false);
      }
    }, 100);
  };

  const reset = () => {
    setResults([]);
    setRollHistory([]);
  };

  const total = results.reduce((a, b) => a + b, 0);
  const average = results.length > 0 ? (total / results.length).toFixed(2) : "0";

  const loadPreset = (dice: number, sides: number) => {
    setNumDice(dice);
    setNumSides(sides);
    setResults([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dice Roller Simulator – Roll Any Dice Online</h1>
        <p className="text-muted-foreground">
          Roll any number of dice with any number of sides using our free online dice roller. Perfect for board games, D&D, and probability experiments with animated rolling effects and roll history tracking.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number of Dice:</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                min="1"
                max="100"
                value={numDice}
                onChange={(e) => setNumDice(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground self-center">dice (1-100)</span>
            </div>
          </div>
          <div>
            <Label>Die Type (Sides):</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                min="2"
                max="1000"
                value={numSides}
                onChange={(e) => setNumSides(Math.max(2, Math.min(1000, parseInt(e.target.value) || 6)))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground self-center">sides (2-1000)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={roll} disabled={isRolling} className="text-lg px-8">
            {isRolling ? 'Rolling...' : `Roll ${numDice}D${numSides}`}
          </Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground self-center">Quick presets:</span>
          <Button variant="outline" size="sm" onClick={() => loadPreset(1, 6)}>1D6</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(2, 6)}>2D6</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(3, 6)}>3D6</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(4, 6)}>4D6</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(1, 20)}>1D20</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(2, 10)}>2D10</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(5, 12)}>5D12</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset(10, 100)}>10D100</Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {results.map((result, i) => (
                  <div
                    key={i}
                    className={`w-20 h-20 flex items-center justify-center rounded-xl text-3xl font-bold shadow-lg transition-all ${
                      numSides === 20 ? 'bg-purple-500' :
                      numSides === 12 ? 'bg-blue-500' :
                      numSides === 10 ? 'bg-indigo-500' :
                      numSides === 8 ? 'bg-green-500' :
                      numSides === 6 ? 'bg-red-500' :
                      'bg-orange-500'
                    } text-white`}
                  >
                    {result}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold">Total: {total}</p>
                <p className="text-sm text-muted-foreground">
                  Average: {average} | Min: {Math.min(...results)} | Max: {Math.max(...results)}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Roll Details</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {results.map((result, i) => (
                  <div key={i} className="p-2 bg-muted rounded text-center">
                    <p className="text-xs text-muted-foreground">Die {i + 1}</p>
                    <p className="text-lg font-bold">{result}</p>
                  </div>
                ))}
              </div>
            </div>

            {rollHistory.length > 1 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Roll History (Last 10)</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {rollHistory.slice(1).map((roll, i) => (
                    <div key={i} className="flex justify-between text-sm p-2 bg-muted rounded">
                      <span className="font-mono">{roll.dice.join(', ')}</span>
                      <span className="font-semibold">= {roll.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Dice Rolling and Probability</h2>
        <p className="text-muted-foreground">
          Dice have been used for games and decision-making for thousands of years. The most common die is the six-sided cube (D6), but role-playing games introduced many other shapes. Each die type serves different purposes – D20 for attack rolls in D&D, D6 for damage, D100 for percentile checks.
        </p>
        <p className="text-muted-foreground">
          When you roll multiple dice, the results form a probability distribution. Rolling 1D20 gives each number a 5% chance. But rolling 2D6 creates a bell curve – 7 is most likely (16.7% chance), while 2 and 12 are least likely (2.8% each). This is why game designers choose specific dice combinations for different mechanics.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Dice Notation</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Basic Notation</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono">1D6</span>
                <span className="text-muted-foreground">One six-sided die</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">2D6</span>
                <span className="text-muted-foreground">Two six-sided dice</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">3D8 + 5</span>
                <span className="text-muted-foreground">Three eight-sided dice plus 5</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">4D6 drop lowest</span>
                <span className="text-muted-foreground">Roll 4D6, remove lowest die</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">RPG Dice Types</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono">D4</span>
                <span className="text-muted-foreground">Tetrahedron (1-4)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">D6</span>
                <span className="text-muted-foreground">Cube (1-6)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">D8</span>
                <span className="text-muted-foreground">Octahedron (1-8)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">D10</span>
                <span className="text-muted-foreground">Pentagonal trapezohedron (0-9)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">D12</span>
                <span className="text-muted-foreground">Dodecahedron (1-12)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">D20</span>
                <span className="text-muted-foreground">Icosahedron (1-20)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Rolling 2D6 (Common Damage Roll)</h4>
            <div className="text-sm space-y-2">
              <p>Dice: 2 six-sided dice</p>
              <p>Possible range: 2 to 12</p>
              <p>Most likely result: 7 (16.7% probability)</p>
              <p>Least likely: 2 or 12 (2.8% each)</p>
              <p className="text-muted-foreground">2D6 creates a bell curve. Average damage is 7, making it predictable for game balance.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Rolling 1D20 (D&D Attack Roll)</h4>
            <div className="text-sm space-y-2">
              <p>Dice: 1 twenty-sided die</p>
              <p>Possible range: 1 to 20</p>
              <p>Each result: 5% probability</p>
              <p>Natural 20: Critical hit</p>
              <p className="text-muted-foreground">The D20 gives a flat distribution – every number equally likely. This creates dramatic swinginess in combat.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Rolling 4D6 Drop Lowest (Character Stats)</h4>
            <div className="text-sm space-y-2">
              <p>Dice: 4 six-sided dice, remove lowest</p>
              <p>Possible range: 3 to 18</p>
              <p>Average result: ~12.24</p>
              <p className="text-muted-foreground">This method generates D&D character ability scores. Dropping the lowest die skews results higher than 3D6.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Rolling 2D10 (Percentile Tens)</h4>
            <div className="text-sm space-y-2">
              <p>Dice: 2 ten-sided dice (one for tens, one for ones)</p>
              <p>Possible range: 00 to 99 (or 1-100)</p>
              <p>Each result: 1% probability</p>
              <p className="text-muted-foreground">Percentile rolls determine success against percentage-based skills. Roll 00 and 0 = 100 (critical success).</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Rolling 10D6 (Fireball Damage)</h4>
            <div className="text-sm space-y-2">
              <p>Dice: 10 six-sided dice</p>
              <p>Possible range: 10 to 60</p>
              <p>Average: 35</p>
              <p className="text-muted-foreground">Many dice create a tight bell curve. Results cluster around the average. Very unlikely to roll extreme values.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>The oldest known dice were found in Iraq</strong> and date back over 5,000 years. Ancient dice weren't always fair – some archaeological finds show loaded dice with certain numbers appearing more often. The standard cube shape became dominant because it's easy to manufacture and rolls unpredictably. Modern casino dice are precision-machined to within 0.0005 inches for perfect fairness.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does "XdY" mean in dice notation?</h4>
            <p className="text-sm text-muted-foreground">
              X is the number of dice, Y is the number of sides. So 3D8 means "roll three eight-sided dice." You might also see modifiers like 2D6+3 (roll two six-sided dice and add 3).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do D10s have numbers 0-9 instead of 1-10?</h4>
            <p className="text-sm text-muted-foreground">
              The 0 represents 10 on a single D10. When rolling percentile dice (2D10), one die shows tens (00, 10, 20...90) and the other shows ones. A result of 00 + 0 = 100, not zero.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Are digital dice rolls truly random?</h4>
            <p className="text-sm text-muted-foreground">
              Computer dice use pseudo-random number generators (PRNGs). They're not truly random but are statistically random enough for games. The sequence is determined by a seed value, but for gaming purposes, the results are effectively unpredictable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the average roll of a die?</h4>
            <p className="text-sm text-muted-foreground">
              For a single die, average = (1 + max) / 2. So D6 averages 3.5, D20 averages 10.5. For multiple dice, multiply: 2D6 averages 7, 3D8 averages 13.5.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for actual board games?</h4>
            <p className="text-sm text-muted-foreground">
              Absolutely. Many online board game groups use digital rollers when playing remotely. Just agree with your group that everyone trusts the roller – there's no physical verification possible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens if I roll 100 dice?</h4>
            <p className="text-sm text-muted-foreground">
              The calculator supports up to 100 dice. With that many dice, results cluster tightly around the average due to the law of large numbers. Rolling 100D6 will almost always give a result between 300-400 (average 350).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Probability Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate odds and chances</p>
          </a>
          <a href="/math-tools/random-number-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Random Number Generator</p>
            <p className="text-xs text-muted-foreground">Generate random numbers</p>
          </a>
          <a href="/math-tools/combinations-permutations" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combinations & Permutations</p>
            <p className="text-xs text-muted-foreground">Counting principles</p>
          </a>
        </div>
      </section>
    </div>
  );
}
