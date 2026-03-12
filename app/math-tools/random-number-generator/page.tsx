"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    setError("");
    setResults([]);

    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const numCount = parseInt(count);

    if (isNaN(minVal) || isNaN(maxVal)) {
      setError("Please enter valid numbers for min and max");
      return;
    }

    if (minVal >= maxVal) {
      setError("Minimum must be less than maximum");
      return;
    }

    if (isNaN(numCount) || numCount < 1) {
      setError("Please enter at least 1 for count");
      return;
    }

    const range = maxVal - minVal + 1;
    if (!allowDuplicates && numCount > range) {
      setError(`Cannot generate ${numCount} unique numbers from a range of ${range}`);
      return;
    }

    try {
      const generated: number[] = [];

      if (allowDuplicates) {
        for (let i = 0; i < numCount; i++) {
          generated.push(Math.floor(Math.random() * range) + minVal);
        }
      } else {
        const available: number[] = [];
        for (let i = minVal; i <= maxVal; i++) {
          available.push(i);
        }

        for (let i = 0; i < numCount; i++) {
          const randomIndex = Math.floor(Math.random() * available.length);
          generated.push(available[randomIndex]);
          available.splice(randomIndex, 1);
        }
      }

      setResults(generated);
    } catch (e) {
      setError("Unable to generate numbers. Please try again.");
    }
  };

  const reset = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setAllowDuplicates(false);
    setResults([]);
    setError("");
  };

  const loadPreset = (preset: string) => {
    if (preset === "dice") {
      setMin("1");
      setMax("6");
      setCount("1");
    } else if (preset === "coin") {
      setMin("1");
      setMax("2");
      setCount("1");
    } else if (preset === "lottery") {
      setMin("1");
      setMax("49");
      setCount("6");
      setAllowDuplicates(false);
    } else if (preset === "d20") {
      setMin("1");
      setMax("20");
      setCount("1");
    } else if (preset === "percentage") {
      setMin("1");
      setMax("100");
      setCount("1");
    } else if (preset === "raffle") {
      setMin("1");
      setMax("500");
      setCount("3");
      setAllowDuplicates(false);
    }
    setResults([]);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Random Number Generator</h1>
        <p className="text-muted-foreground">
          Generate random numbers within any range with our free online random number generator. Supports unique or duplicate numbers, perfect for games, lotteries, and statistical sampling.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadPreset("dice")}>🎲 Dice (1-6)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("d20")}>🎲 D20 (1-20)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("coin")}>🪙 Coin (1-2)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("lottery")}>🎰 Lottery (1-49)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("raffle")}>🎫 Raffle (1-500)</Button>
          <Button variant="outline" size="sm" onClick={() => loadPreset("percentage")}>% Percentage (1-100)</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Minimum:</Label>
            <Input
              type="number"
              placeholder="1"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div>
            <Label>Maximum:</Label>
            <Input
              type="number"
              placeholder="100"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div>
            <Label>How many numbers:</Label>
            <Input
              type="number"
              placeholder="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="duplicates"
            checked={allowDuplicates}
            onCheckedChange={setAllowDuplicates}
          />
          <Label htmlFor="duplicates">Allow duplicate numbers</Label>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={generate} className="text-lg px-8">Generate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-4 text-center">Generated Numbers</p>
              <div className="flex flex-wrap justify-center gap-3">
                {results.map((num, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-2xl font-bold shadow-md"
                  >
                    {num}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                {results.join(', ')}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Minimum</p>
                  <p className="text-lg font-bold">{Math.min(...results)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Maximum</p>
                  <p className="text-lg font-bold">{Math.max(...results)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Average</p>
                  <p className="text-lg font-bold">{(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Random Number Generation</h2>
        <p className="text-muted-foreground">
          Random number generators (RNGs) produce sequences of numbers that lack any predictable pattern. True randomness comes from physical processes (like radioactive decay), but computers use algorithms to generate "pseudo-random" numbers that are random enough for most purposes.
        </p>
        <p className="text-muted-foreground">
          This tool uses your browser's built-in random number generator, which is suitable for games, simulations, and general purposes. For cryptographic security (passwords, encryption), you'd need a cryptographically secure RNG.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Uses for Random Numbers</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Games & Entertainment</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Dice rolls for board games</li>
              <li>• Card shuffling simulations</li>
              <li>• RPG damage calculations</li>
              <li>• Lottery number selection</li>
              <li>• Random encounters in games</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Practical Applications</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Statistical sampling</li>
              <li>• Raffle and prize drawings</li>
              <li>• Random assignment in experiments</li>
              <li>• Password generation</li>
              <li>• Monte Carlo simulations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simulating a Dice Roll</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Generate a random number from 1 to 6 to simulate rolling a standard die.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Range: 1 to 6</div>
              <div>Count: 1</div>
              <div>Duplicates: Not applicable (single number)</div>
              <div className="text-muted-foreground">Each number (1-6) has equal 16.67% probability</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Lottery Number Selection</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Pick 6 unique numbers from 1 to 49 for a lottery ticket.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Range: 1 to 49</div>
              <div>Count: 6</div>
              <div>Duplicates: No (unique numbers only)</div>
              <div>Available combinations: C(49,6) = 13,983,816</div>
              <div className="text-muted-foreground">Your odds of matching all 6: 1 in ~14 million</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Random Team Assignment</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Assign 25 students to 4 teams by generating random team numbers.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Range: 1 to 4 (team numbers)</div>
              <div>Count: 25 (one per student)</div>
              <div>Duplicates: Yes (multiple students per team)</div>
              <div className="text-muted-foreground">Expected ~6-7 students per team</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: D20 for Tabletop RPGs</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Roll a 20-sided die for Dungeons & Dragons or similar games.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Range: 1 to 20</div>
              <div>Count: 1 (or more for advantage/disadvantage)</div>
              <div>Natural 20 = critical hit!</div>
              <div>Natural 1 = critical miss!</div>
              <div className="text-muted-foreground">Each result has 5% probability</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The first random number table was published in 1927 by L.H.C. Tippett, containing 41,600 digits extracted from census data. During WWII, the RAND Corporation generated a million random digits using an electronic roulette wheel - it took months! Today, random.org uses atmospheric noise (radio static) to generate true random numbers, while most computers use faster pseudo-random algorithms.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Are these numbers truly random?</h4>
            <p className="text-sm text-muted-foreground">
              They're "pseudo-random" - generated by an algorithm that produces sequences appearing random. For games and general use, they're random enough. For cryptography or high-stakes gambling, you'd need hardware-based true random generators that use physical processes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between allowing duplicates or not?</h4>
            <p className="text-sm text-muted-foreground">
              With duplicates: each number is independent (like rolling dice - you can get the same number twice). Without duplicates: once a number is picked, it's removed from the pool (like drawing cards from a deck). Lottery drawings don't allow duplicates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for cryptographic purposes?</h4>
            <p className="text-sm text-muted-foreground">
              No. For passwords, encryption keys, or security tokens, use a cryptographically secure random number generator. Browser's Math.random() is not designed for security and could potentially be predicted by attackers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do I sometimes get similar numbers in a row?</h4>
            <p className="text-sm text-muted-foreground">
              That's actually a sign of good randomness! True randomness includes clusters and streaks. If you never saw consecutive similar numbers, the generator would be biased. Human intuition expects randomness to be more "spread out" than it actually is.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How large can the range be?</h4>
            <p className="text-sm text-muted-foreground">
              Technically, JavaScript can handle integers up to 2^53 - 1 (about 9 quadrillion). However, generating many unique numbers from a huge range may be slow. For practical use, ranges up to a few million work well.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I generate negative random numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Just set the minimum to a negative number. For example, min=-10, max=10 gives you random numbers from -10 to 10, including zero. Useful for random walks, temperature simulations, or game mechanics with positive and negative outcomes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
