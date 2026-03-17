"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Copy, Check, Trash2, Info, Gamepad2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PasswordGame() {
  const [targetPassword, setTargetPassword] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing")
  const [maxAttempts, setMaxAttempts] = useState(10)
  const [hint, setHint] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const generateTargetPassword = useCallback(() => {
    const length = Math.floor(Math.random() * 4) + 6
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setTargetPassword(password)
    setGuesses([])
    setCurrentGuess("")
    setGameState("playing")
    setHint(`Password is ${length} characters long`)
  }, [])

  const checkGuess = useCallback(() => {
    if (!currentGuess || gameState !== "playing") return

    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)

    if (currentGuess === targetPassword) {
      setGameState("won")
    } else if (newGuesses.length >= maxAttempts) {
      setGameState("lost")
    }

    setCurrentGuess("")
    
    // Generate hint
    let newHint = ""
    const correctPositions = currentGuess.split("").filter((c, i) => c === targetPassword[i]).length
    const correctChars = currentGuess.split("").filter((c) => targetPassword.includes(c)).length
    
    if (correctPositions > 0) {
      newHint += `${correctPositions} character(s) in correct position. `
    }
    if (correctChars > correctPositions) {
      newHint += `${correctChars - correctPositions} correct character(s) in wrong position.`
    }
    if (!newHint) {
      newHint = "No matching characters. Try different letters."
    }
    setHint(newHint)
  }, [currentGuess, guesses, gameState, maxAttempts, targetPassword])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkGuess()
    }
  }, [checkGuess])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const handleClear = useCallback(() => {
    setTargetPassword("")
    setGuesses([])
    setCurrentGuess("")
    setGameState("playing")
    setHint("")
  }, [])

  const progress = useMemo(() => {
    return (guesses.length / maxAttempts) * 100
  }, [guesses.length, maxAttempts])

  const maskPassword = (password: string) => {
    return "•".repeat(password.length)
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Game Header */}
      <section className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Gamepad2 className="size-8" />
          <h2 className="text-2xl font-bold">Password Guessing Game</h2>
        </div>
        <p className="text-muted-foreground">
          Guess the randomly generated password within {maxAttempts} attempts!
        </p>
      </section>

      {/* Game Controls */}
      <section className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={generateTargetPassword} className="flex-1">
            <RefreshCw className="size-4 mr-2" />
            {targetPassword ? "New Game" : "Start Game"}
          </Button>
          <Button variant="ghost" onClick={handleClear} disabled={!targetPassword}>
            <Trash2 className="size-4" />
          </Button>
        </div>

        {targetPassword && (
          <>
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Attempts: {guesses.length} / {maxAttempts}</span>
                <span>{(100 - progress).toFixed(0)}% remaining</span>
              </div>
              <Progress value={progress} className={cn(
                progress > 80 ? "[&>div]:bg-destructive" :
                progress > 50 ? "[&>div]:bg-yellow-500" :
                "[&>div]:bg-green-500"
              )} />
            </div>

            {/* Hint */}
            {hint && (
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-sm"><span className="font-medium">Hint:</span> {hint}</p>
              </div>
            )}

            {/* Guess Input */}
            {gameState === "playing" && (
              <div className="flex gap-2">
                <Input
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your guess..."
                  className="flex-1"
                  disabled={gameState !== "playing"}
                />
                <Button onClick={checkGuess} disabled={!currentGuess}>
                  Guess
                </Button>
              </div>
            )}

            {/* Game Result */}
            {gameState !== "playing" && (
              <div className={cn(
                "rounded-lg border p-6 text-center",
                gameState === "won" ? "border-green-500 bg-green-50 dark:bg-green-900/20" :
                "border-destructive bg-destructive/10"
              )}>
                <p className={cn(
                  "text-2xl font-bold",
                  gameState === "won" ? "text-green-600" : "text-destructive"
                )}>
                  {gameState === "won" ? "🎉 You Won!" : "😔 Game Over"}
                </p>
                <p className="mt-2 text-muted-foreground">
                  {gameState === "won" 
                    ? `You guessed the password in ${guesses.length} attempt(s)!`
                    : `The password was: ${targetPassword}`
                  }
                </p>
                {gameState === "lost" && (
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(targetPassword, "password")}
                    >
                      {copied === "password" ? <Check className="size-4" /> : <Copy className="size-4" />}
                      <span className="ml-1">Copy Password</span>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Guess History */}
            {guesses.length > 0 && (
              <div className="space-y-2">
                <Label>Guess History</Label>
                <div className="rounded-lg border bg-background divide-y">
                  {guesses.map((guess, idx) => {
                    const isCorrect = guess === targetPassword
                    const correctPositions = guess.split("").filter((c, i) => c === targetPassword[i]).length
                    return (
                      <div key={idx} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-6">#{idx + 1}</span>
                          <span className="font-mono">{guess}</span>
                          {isCorrect && <span className="text-green-500">✓</span>}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {correctPositions} correct position(s)
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Difficulty */}
      <section className="space-y-2">
        <Label htmlFor="max-attempts">Difficulty (Attempts)</Label>
        <div className="flex gap-2">
          {[5, 10, 15, 20].map((attempts) => (
            <Button
              key={attempts}
              variant={maxAttempts === attempts ? "default" : "outline"}
              size="sm"
              onClick={() => setMaxAttempts(attempts)}
              disabled={!!targetPassword}
            >
              {attempts}
            </Button>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-muted-foreground mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">How to Play</h4>
            <p className="text-sm text-muted-foreground">
              A random password is generated. Guess it within the allowed attempts!
              After each guess, you'll get hints about correct characters and positions.
              Use the feedback to refine your next guess. Great for learning about
              password complexity and brute-force concepts.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
