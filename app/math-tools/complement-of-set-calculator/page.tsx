"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ComplementOfSetCalculator() {
  const [universalSet, setUniversalSet] = useState("");
  const [subsetA, setSubsetA] = useState("");
  const [result, setResult] = useState<(number | string)[] | null>(null);
  const [error, setError] = useState("");

  const parseSet = (input: string): (number | string)[] => {
    if (!input.trim()) return [];
    return input
      .split(/[,\s]+/)
      .filter(item => item.trim() !== "")
      .map(item => {
        const num = parseFloat(item.trim());
        return isNaN(num) ? item.trim() : num;
      });
  };

  const calculateComplement = () => {
    try {
      const U = parseSet(universalSet);
      const A = parseSet(subsetA);

      if (U.length === 0) {
        setError("Please enter the universal set");
        setResult(null);
        return;
      }

      if (U.length > 500 || A.length > 500) {
        setError("For performance reasons, please limit sets to 500 elements each");
        setResult(null);
        return;
      }

      const complement = U.filter(element => {
        return !A.some(a => {
          if (typeof element === "number" && typeof a === "number") {
            return element === a;
          }
          return String(element) === String(a);
        });
      });

      complement.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(complement);
      setError("");
    } catch (e) {
      setError("Error parsing sets. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setUniversalSet("");
    setSubsetA("");
    setResult(null);
    setError("");
  };

  const loadExample = (type: string) => {
    const examples: Record<string, { u: string; a: string }> = {
      numbers: { u: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10", a: "2, 4, 6, 8, 10" },
      letters: { u: "a, b, c, d, e, f, g, h", a: "a, e, i, o, u" },
      primes: { u: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12", a: "2, 3, 5, 7, 11" },
      evens: { u: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15", a: "2, 4, 6, 8, 10, 12, 14" },
      mixed: { u: "1, 2, 3, apple, banana, 4, 5, orange", a: "apple, banana, orange" },
      squares: { u: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16", a: "1, 4, 9, 16" },
      week: { u: "Mon, Tue, Wed, Thu, Fri, Sat, Sun", a: "Sat, Sun" }
    };
    const ex = examples[type] || examples.numbers;
    setUniversalSet(ex.u);
    setSubsetA(ex.a);
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Complement of a Set Calculator – Find A′ Online</h1>
        <p className="text-muted-foreground">
          Calculate the complement of any set with our free online complement calculator. Given a universal set U and subset A, find all elements in U that are not in A with clear set notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Universal Set U (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
              value={universalSet}
              onChange={(e) => setUniversalSet(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Subset A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 2, 4, 6, 8, 10"
              value={subsetA}
              onChange={(e) => setSubsetA(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateComplement}>Calculate Complement</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Load example:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("numbers")}>Numbers</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("letters")}>Letters</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("primes")}>Primes</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("evens")}>Even Numbers</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("mixed")}>Mixed</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("squares")}>Perfect Squares</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("week")}>Days of Week</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && result.length >= 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                A′ (Complement of A)
              </p>
              <p className="text-lg font-mono">
                {"{"}{result.map(formatElement).join(", ")}{"}"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total elements in complement: {result.length}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The complement A′ contains all elements that are in the universal set U but <strong>not</strong> in set A.
                Together, A and A′ make up the entire universal set. A ∪ A′ = U and A ∩ A′ = ∅.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Set Complements</h2>
        <p className="text-muted-foreground">
          The complement of a set is like taking the opposite or the "everything else." If your universal set is all students in a school, and set A is the students who play soccer, then the complement of A is everyone who doesn't play soccer. It's the flip side of the coin.
        </p>
        <p className="text-muted-foreground">
          The universal set matters. The complement of {"{2, 4, 6}"} is different depending on whether your universal set is {"{1, 2, 3, 4, 5, 6}"} (complement would be {"{1, 3, 5}"}) or {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"} (complement would be {"{1, 3, 5, 7, 8, 9, 10}"}). Always know your universe.
        </p>
        <p className="text-muted-foreground">
          Complements are fundamental to logic and probability. "Not A" in logic is the complement of A. The probability of something not happening is 1 minus the probability of it happening – that's complement thinking. In database queries, "WHERE NOT condition" finds the complement of records matching that condition.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Set Complement Notation and Formulas</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-4">
            A′ = {"{"}x ∈ U | x ∉ A{"}"}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Read this as: "A complement equals the set of all x in U such that x is not in A."
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold mb-2">Alternative Notations</div>
              <div className="space-y-1 text-muted-foreground">
                <div>A′ (A prime)</div>
                <div>A<sup>c</sup> (A complement)</div>
                <div>Ā (A bar)</div>
                <div>U \ A (U minus A)</div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold mb-2">Key Properties</div>
              <div className="space-y-1 text-muted-foreground">
                <div>A ∪ A′ = U (union is universal)</div>
                <div>A ∩ A′ = ∅ (intersection is empty)</div>
                <div>(A′)′ = A (double complement)</div>
                <div>|A| + |A′| = |U| (sizes add up)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Even and Odd Numbers</h3>
            <p className="text-sm text-muted-foreground mb-3">Find the complement of even numbers in the universal set U = {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"}</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Universal Set U:</strong> {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"}</div>
              <div><strong>Set A (evens):</strong> {"{2, 4, 6, 8, 10}"}</div>
              <div><strong>Complement A′:</strong> All elements in U not in A</div>
              <div className="pt-2 border-t font-mono">
                A′ = {"{1, 3, 5, 7, 9}"}
              </div>
              <div className="text-muted-foreground">
                The complement of even numbers is the odd numbers. Together they make up all integers 1-10.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Prime Numbers</h3>
            <p className="text-sm text-muted-foreground mb-3">Find the complement of prime numbers in U = {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}"}</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Universal Set U:</strong> {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}"}</div>
              <div><strong>Set A (primes):</strong> {"{2, 3, 5, 7, 11}"}</div>
              <div><strong>Complement A′:</strong> All non-prime numbers in U</div>
              <div className="pt-2 border-t font-mono">
                A′ = {"{1, 4, 6, 8, 9, 10, 12}"}
              </div>
              <div className="text-muted-foreground">
                Note: 1 is neither prime nor composite, but it's in the complement because it's not prime.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Vowels and Consonants</h3>
            <p className="text-sm text-muted-foreground mb-3">Find the complement of vowels in U = {"{a, b, c, d, e, f, g, h}"} </p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Universal Set U:</strong> {"{a, b, c, d, e, f, g, h}"}</div>
              <div><strong>Set A (vowels):</strong> {"{a, e}"}</div>
              <div><strong>Complement A′:</strong> All consonants in U</div>
              <div className="pt-2 border-t font-mono">
                A′ = {"{b, c, d, f, g, h}"}
              </div>
              <div className="text-muted-foreground">
                The complement of vowels gives us the consonants. If the universal set included all 26 letters, the complement would have 21 elements.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Perfect Squares</h3>
            <p className="text-sm text-muted-foreground mb-3">Find the complement of perfect squares in U = {"{1, 2, 3, ..., 20}"}</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Universal Set U:</strong> {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20}"}</div>
              <div><strong>Set A (perfect squares):</strong> {"{1, 4, 9, 16}"} (since 1²=1, 2²=4, 3²=9, 4²=16)</div>
              <div><strong>Complement A′:</strong> All non-perfect-squares in U</div>
              <div className="pt-2 border-t font-mono">
                A′ = {"{2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20}"}
              </div>
              <div className="text-muted-foreground">
                Out of 20 numbers, only 4 are perfect squares. The complement has 16 elements.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 5: Weekend and Weekdays</h3>
            <p className="text-sm text-muted-foreground mb-3">Find the complement of weekend days in the set of all days of the week.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Universal Set U:</strong> {"{Mon, Tue, Wed, Thu, Fri, Sat, Sun}"}</div>
              <div><strong>Set A (weekend):</strong> {"{Sat, Sun}"}</div>
              <div><strong>Complement A′:</strong> All weekdays</div>
              <div className="pt-2 border-t font-mono">
                A′ = {"{Mon, Tue, Wed, Thu, Fri}"}
              </div>
              <div className="text-muted-foreground">
                The complement of weekend days is the set of weekdays – the 5 days most people work.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>Georg Cantor</strong> (1845-1918), the founder of set theory, developed the concept of complements as part of his revolutionary work on infinity. Cantor showed that infinite sets can have different sizes – the set of natural numbers is "smaller" than the set of real numbers, even though both are infinite. His work was so radical that many mathematicians of his time rejected it. David Hilbert later defended Cantor, saying, "No one shall expel us from the paradise that Cantor has created." Set complements are now fundamental to mathematics, logic, and computer science.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What is a universal set?</h3>
            <p className="text-sm text-muted-foreground">
              The universal set is the "everything" for your particular problem – the complete collection of elements you're considering. It defines the boundaries of your discussion. Without a universal set, the complement is undefined because "everything not in A" could mean anything in existence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can the complement be empty?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if A equals the universal set U, then A′ is empty. For example, if U = {"{1, 2, 3}"} and A = {"{1, 2, 3}"}, then A′ = ∅. There's nothing left outside of A because A already contains everything.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is the complement of the empty set?</h3>
            <p className="text-sm text-muted-foreground">
              The complement of the empty set is the universal set itself. If A = ∅, then A′ = U. Nothing is in the empty set, so everything in U is "not in A." This is why ∅′ = U.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What does (A′)′ mean?</h3>
            <p className="text-sm text-muted-foreground">
              That's the complement of the complement – "the opposite of the opposite." It brings you back to the original set: (A′)′ = A. If A is "students who play soccer," A′ is "students who don't play soccer," and (A′)′ is "students who don't (not play soccer)" = "students who play soccer."
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How is complement used in probability?</h3>
            <p className="text-sm text-muted-foreground">
              The probability of an event not happening is the complement of the probability of it happening: P(not A) = 1 - P(A). This is often easier to calculate. For example, the probability of rolling at least one 6 in four dice rolls is 1 - P(no 6s) = 1 - (5/6)⁴ ≈ 0.52.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is De Morgan's Law?</h3>
            <p className="text-sm text-muted-foreground">
              De Morgan's Laws relate complements of unions and intersections: (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′. In words: "not (A or B)" equals "not A and not B," and "not (A and B)" equals "not A or not B." These are fundamental to logic and Boolean algebra.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can sets contain both numbers and text?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Sets can contain any distinct elements – numbers, letters, words, objects, even other sets. This calculator handles mixed types. For example, U = {"{1, 2, apple, banana}"} is perfectly valid, and if A = {"{1, apple}"}, then A′ = {"{2, banana}"}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
