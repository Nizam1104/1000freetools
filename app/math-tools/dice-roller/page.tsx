"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(2);
  const [numSides, setNumSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const roll = () => {
    setIsRolling(true);
    setResults([]);

    // Animation effect
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
        setIsRolling(false);
      }
    }, 100);
  };

  const reset = () => {
    setResults([]);
  };

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Dice Roller Simulator</h1>
        <p className="text-muted-foreground">
          Roll any number of dice with any number of sides using our free online dice roller. Perfect for board games, D&D, and probability experiments with animated rolling effects.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Number of Dice:</Label>
            <Select value={String(numDice)} onValueChange={(v) => {
              setNumDice(parseInt(v));
              setResults([]);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Die</SelectItem>
                <SelectItem value="2">2 Dice</SelectItem>
                <SelectItem value="3">3 Dice</SelectItem>
                <SelectItem value="4">4 Dice</SelectItem>
                <SelectItem value="5">5 Dice</SelectItem>
                <SelectItem value="6">6 Dice</SelectItem>
                <SelectItem value="8">8 Dice</SelectItem>
                <SelectItem value="10">10 Dice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Die Type (Sides):</Label>
            <Select value={String(numSides)} onValueChange={(v) => {
              setNumSides(parseInt(v));
              setResults([]);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">D4 (4 sides)</SelectItem>
                <SelectItem value="6">D6 (6 sides)</SelectItem>
                <SelectItem value="8">D8 (8 sides)</SelectItem>
                <SelectItem value="10">D10 (10 sides)</SelectItem>
                <SelectItem value="12">D12 (12 sides)</SelectItem>
                <SelectItem value="20">D20 (20 sides)</SelectItem>
                <SelectItem value="100">D100 (100 sides)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={roll} disabled={isRolling} className="text-lg px-8">
            {isRolling ? 'Rolling...' : `Roll ${numDice}D${numSides}`}
          </Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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
                  Average: {(total / results.length).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Roll Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {results.map((result, i) => (
                  <div key={i} className="p-2 bg-muted rounded text-center">
                    <p className="text-xs text-muted-foreground">Die {i + 1}</p>
                    <p className="text-lg font-bold">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">About Dice Rolling</h2>
        <p className="text-muted-foreground">
          Dice have been used for games and gambling for thousands of years. Modern tabletop games use various polyhedral dice, with the 6-sided die being most common. Role-playing games like D&D use dice of many different sizes.
        </p>
        <p className="text-muted-foreground">
          The notation "XdY" means "roll X dice with Y sides each." For example, 2d6 means roll two 6-sided dice and add the results.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Dice Combinations</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">2d6</h3>
            <p className="text-sm text-muted-foreground mb-2">Most common board game roll</p>
            <p className="text-xs font-mono">Range: 2-12, Average: 7</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">1d20</h3>
            <p className="text-sm text-muted-foreground mb-2">D&D attack rolls and saves</p>
            <p className="text-xs font-mono">Range: 1-20, Average: 10.5</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">4d6 drop lowest</h3>
            <p className="text-sm text-muted-foreground mb-2">D&D ability score generation</p>
            <p className="text-xs font-mono">Range: 3-18, Average: 12.2</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Probability Facts</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Single Die Probabilities</h3>
            <ul className="space-y-1 text-sm">
              <li>• D6: Each number has 16.67% chance</li>
              <li>• D20: Each number has 5% chance</li>
              <li>• D100: Each number has 1% chance</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">2d6 Probabilities</h3>
            <ul className="space-y-1 text-sm">
              <li>• Rolling 7: 16.67% (most likely)</li>
              <li>• Rolling 2 or 12: 2.78% (least likely)</li>
              <li>• Rolling 11+: 25% chance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is this truly random?</h3>
            <p className="text-sm text-muted-foreground">
              This uses JavaScript's pseudo-random number generator, which is random enough for games but not cryptographically secure. For serious gambling, use physical dice.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does "drop lowest" mean?</h3>
            <p className="text-sm text-muted-foreground">
              "Drop lowest" means roll the specified number of dice and ignore the lowest result. For example, 4d6 drop lowest means roll 4 dice and add only the highest 3.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I use this for D&D?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely! This roller supports all standard D&D dice types (D4, D6, D8, D10, D12, D20). Roll multiple dice at once for damage rolls.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/random-number-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Random Number Generator</p>
            <p className="text-xs text-muted-foreground">Generate random numbers</p>
          </a>
          <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Probability Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate odds</p>
          </a>
          <a href="/math-tools/combinations-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combinations</p>
            <p className="text-xs text-muted-foreground">nCr calculator</p>
          </a>
        </div>
      </section>
    </div>
  );
}
