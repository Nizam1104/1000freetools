"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NumberToWordsConverter() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const ones: string[] = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens: string[] = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens: string[] = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const convertHundreds = (num: number): string => {
    if (num === 0) return "";
    
    let result = "";
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " hundred";
      num %= 100;
      if (num > 0) result += " ";
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      if (num % 10 > 0) result += "-" + ones[num % 10];
    } else if (num >= 10) {
      result += teens[num - 10];
    } else if (num > 0) {
      result += ones[num];
    }
    
    return result;
  };

  const calculate = () => {
    const num = parseInt(number);
    
    if (!isNaN(num) && num >= 0 && num <= 999999999999) {
      if (num === 0) {
        setResult("zero");
        return;
      }
      
      let result = "";
      const billions = Math.floor(num / 1000000000);
      const millions = Math.floor((num % 1000000000) / 1000000);
      const thousands = Math.floor((num % 1000000) / 1000);
      const remainder = num % 1000;
      
      if (billions > 0) {
        result += convertHundreds(billions) + " billion";
      }
      if (millions > 0) {
        if (result) result += ", ";
        result += convertHundreds(millions) + " million";
      }
      if (thousands > 0) {
        if (result) result += ", ";
        result += convertHundreds(thousands) + " thousand";
      }
      if (remainder > 0) {
        if (result) result += ", ";
        result += convertHundreds(remainder);
      }
      
      setResult(result);
    }
  };

  const reset = () => {
    setNumber("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 1234"
                min="0"
                max="999999999999"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Words</p>
                <p className="text-xl font-semibold capitalize">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Number to Words Converter
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your number</p>
                  <p>Type any whole number from 0 to 999,999,999,999 in the input field.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Convert</p>
                  <p>The converter instantly transforms digits into written English words.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Copy the result</p>
                  <p>Use the written form for checks, legal documents, or formal writing.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Number Conversion Examples
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Number</th>
                    <th className="text-left py-3 px-2 font-semibold">Words</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">42</td>
                    <td className="py-3 px-2">forty-two</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">100</td>
                    <td className="py-3 px-2">one hundred</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1,000</td>
                    <td className="py-3 px-2">one thousand</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10,542</td>
                    <td className="py-3 px-2">ten thousand, five hundred forty-two</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1,000,000</td>
                    <td className="py-3 px-2">one million</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">999,999,999,999</td>
                    <td className="py-3 px-2">nine hundred ninety-nine billion, nine hundred ninety-nine million, nine hundred ninety-nine thousand, nine hundred ninety-nine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Number Names
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Place Value System</h4>
                <p>
                  English uses groups of three digits (ones, thousands, millions, billions). Each group
                  follows the same pattern: hundreds, tens, and ones. Commas separate these groups in
                  writing. Understanding place value helps you read and write any number correctly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Hyphen Rules</h4>
                <p>
                  Compound numbers from 21 to 99 use hyphens: twenty-one, thirty-five, ninety-nine.
                  Numbers ending in zero do not: twenty, thirty, one hundred. This rule applies within
                  each group — two hundred thirty-four, not two hundred thirty four.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When to Use "And"</h4>
                <p>
                  In American English, "and" is typically omitted in whole numbers. British English
                  often includes it: "one hundred and twenty-three" vs "one hundred twenty-three".
                  For checks and formal documents, follow your region's convention or the form's requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Writing Numbers
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Write both forms on checks</p>
                  <p>Always write the amount in words and numbers. Words prevent alteration fraud.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Use words for small numbers in prose</p>
                  <p>Style guides recommend spelling out numbers zero through ninety-nine in formal writing.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Capitalize only when starting sentences</p>
                  <p>Do not capitalize number words mid-sentence unless they begin a sentence or are part of a title.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Be consistent within documents</p>
                  <p>Choose a style and apply it throughout. Mixing formats looks unprofessional.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How do you write large numbers in words?</h4>
                <p>
                  Break the number into groups of three digits from right to left. Name each group
                  (ones, thousands, millions, billions) and combine them. For example, 1,234,567 is
                  "one million, two hundred thirty-four thousand, five hundred sixty-seven".
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Do you use "and" when writing numbers?</h4>
                <p>
                  In American English, "and" is usually reserved for decimal points (two and a half).
                  British English commonly uses "and" after hundreds (one hundred and twenty-three).
                  For checks, follow your bank's requirements or local convention.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the largest number this converter handles?</h4>
                <p>
                  This converter handles numbers up to 999,999,999,999 (just under one trillion).
                  For larger numbers, the pattern continues with trillions, quadrillions, and so on,
                  but these are rarely needed in everyday use.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do you write decimal numbers in words?</h4>
                <p>
                  Write the whole number part, then "and" or "point", then each decimal digit
                  individually. For money, use dollars and cents: $12.34 is "twelve dollars and
                  thirty-four cents" or "twelve and 34/100 dollars".
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Why are number words important for checks?</h4>
                <p>
                  Writing amounts in words prevents fraud. Numbers can be altered easily (100 to 1000),
                  but words are harder to modify without detection. Banks verify both match before
                  processing. Always write words close to the left edge to prevent additions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
