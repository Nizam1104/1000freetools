"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PasswordStrengthScorerPage() {
  const [password, setPassword] = useState<string>("");
  const [result, setResult] = useState<{
    score: number;
    strength: string;
    entropy: number;
    crackTime: string;
    issues: string[];
    suggestions: string[];
  } | null>(null);

  const calculate = () => {
    if (!password) return;

    const issues: string[] = [];
    const suggestions: string[] = [];

    // Calculate entropy
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32;

    const entropy = Math.log2(Math.pow(charset, password.length));

    // Check for common issues
    if (password.length < 8) {
      issues.push("Password is too short (minimum 8 characters recommended)");
      suggestions.push("Use at least 8 characters, preferably 12+");
    }
    if (!/[A-Z]/.test(password)) {
      issues.push("Missing uppercase letters");
      suggestions.push("Add uppercase letters (A-Z)");
    }
    if (!/[a-z]/.test(password)) {
      issues.push("Missing lowercase letters");
      suggestions.push("Add lowercase letters (a-z)");
    }
    if (!/[0-9]/.test(password)) {
      issues.push("Missing numbers");
      suggestions.push("Add numbers (0-9)");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      issues.push("Missing special characters");
      suggestions.push("Add special characters (! @#$%^&*)");
    }
    if (/(.)\1{2,}/.test(password)) {
      issues.push("Contains repeated characters");
      suggestions.push("Avoid repeating characters");
    }
    if (/^(?:123|abc|qwerty|password|admin|letmein|welcome|monkey|dragon|1234567890)/i.test(password)) {
      issues.push("Contains common patterns");
      suggestions.push("Avoid common passwords and patterns");
    }

    // Calculate score (0-100)
    let score = 0;
    score += Math.min(password.length * 5, 30); // Length score
    score += entropy > 50 ? 30 : entropy > 35 ? 20 : entropy > 25 ? 10 : 0; // Entropy score
    score += (/[A-Z]/.test(password) ? 1 : 0) + (/[a-z]/.test(password) ? 1 : 0) + 
             (/[0-9]/.test(password) ? 1 : 0) + (/[^a-zA-Z0-9]/.test(password) ? 1 : 0); // Variety score
    score = Math.min(score * 2.5, 100);

    // Determine strength
    let strength: string;
    if (score >= 80) strength = "Very Strong";
    else if (score >= 60) strength = "Strong";
    else if (score >= 40) strength = "Moderate";
    else if (score >= 20) strength = "Weak";
    else strength = "Very Weak";

    // Estimate crack time
    const guessesPerSecond = 1e12; // 1 trillion guesses per second
    const secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;
    let crackTime: string;
    if (secondsToCrack < 1) crackTime = "Instantly";
    else if (secondsToCrack < 60) crackTime = `${Math.round(secondsToCrack)} seconds`;
    else if (secondsToCrack < 3600) crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
    else if (secondsToCrack < 86400) crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
    else if (secondsToCrack < 31536000) crackTime = `${Math.round(secondsToCrack / 86400)} days`;
    else if (secondsToCrack < 31536000000) crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
    else crackTime = "Centuries";

    setResult({
      score: Math.round(score),
      strength,
      entropy: Math.round(entropy * 10) / 10,
      crackTime,
      issues,
      suggestions
    });
  };

  const reset = () => {
    setPassword("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Password Strength Checker – Test How Strong & Secure Your Password Is</h1>
          <p className="text-muted-foreground">
            Check your password security instantly with our Password Strength Scorer. Evaluate entropy, length, character variety, and pattern vulnerabilities to see how strong your password is and get recommendations for creating uncrackable passwords.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Check Strength
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Strength</p>
                    <p className="text-3xl font-bold text-primary">{result.strength}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          result.score >= 80 ? 'bg-green-500' :
                          result.score >= 60 ? 'bg-blue-500' :
                          result.score >= 40 ? 'bg-yellow-500' :
                          result.score >= 20 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <p className="text-sm mt-1">Score: {result.score}/100</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Entropy</p>
                      <p className="text-lg font-semibold">{result.entropy} bits</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Crack Time</p>
                      <p className="text-lg font-semibold">{result.crackTime}</p>
                    </div>
                  </div>

                  {result.issues.length > 0 && (
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <p className="text-sm font-semibold text-destructive mb-2">Issues Found:</p>
                      <ul className="text-sm space-y-1">
                        {result.issues.map((issue, i) => (
                          <li key={i}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.suggestions.length > 0 && (
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm font-semibold text-primary mb-2">Suggestions:</p>
                      <ul className="text-sm space-y-1">
                        {result.suggestions.map((suggestion, i) => (
                          <li key={i}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter a password and click Check Strength to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
