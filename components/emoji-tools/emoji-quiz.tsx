"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, RotateCcw, Trophy, Star, HelpCircle, Check, X, Sparkles, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: number
  type: "movie" | "phrase" | "celebrity" | "country" | "song"
  emojis: string
  answer: string
  hint: string
  difficulty: "easy" | "medium" | "hard"
  options?: string[]
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Movies
  { id: 1, type: "movie", emojis: "🚢🧊💔", answer: "Titanic", hint: "A love story on a sinking ship", difficulty: "easy", options: ["Titanic", "The Perfect Storm", "Poseidon", "Ice Age"] },
  { id: 2, type: "movie", emojis: "🦁👑", answer: "The Lion King", hint: "Disney animated classic about a lion prince", difficulty: "easy", options: ["The Lion King", "Madagascar", "Ice Age", "Zootopia"] },
  { id: 3, type: "movie", emojis: "🕷️👨", answer: "Spider-Man", hint: "Friendly neighborhood superhero", difficulty: "easy", options: ["Spider-Man", "Batman", "Superman", "Iron Man"] },
  { id: 4, type: "movie", emojis: "👻🚫", answer: "Ghostbusters", hint: "Who you gonna call?", difficulty: "medium", options: ["Ghostbusters", "The Haunting", "Poltergeist", "Beetlejuice"] },
  { id: 5, type: "movie", emojis: "🦖🏞️", answer: "Jurassic Park", hint: "Dinosaurs come back to life", difficulty: "medium", options: ["Jurassic Park", "King Kong", "Godzilla", "The Lost World"] },
  { id: 6, type: "movie", emojis: "🎭🃏", answer: "The Dark Knight", hint: "Heath Ledger's iconic role", difficulty: "hard", options: ["The Dark Knight", "Joker", "Batman Begins", "Suicide Squad"] },
  
  // Phrases
  { id: 7, type: "phrase", emojis: "💑🏰✨", answer: "Happily Ever After", hint: "Fairy tale ending", difficulty: "easy", options: ["Happily Ever After", "True Love", "Dream Come True", "Magic Moment"] },
  { id: 8, type: "phrase", emojis: "🌧️🐱🐶", answer: "Raining Cats and Dogs", hint: "Heavy rain idiom", difficulty: "medium", options: ["Raining Cats and Dogs", "Stormy Weather", "Bad Day", "Crazy Weather"] },
  { id: 9, type: "phrase", emojis: "🔥💨", answer: "On Fire", hint: "Doing extremely well", difficulty: "easy", options: ["On Fire", "Hot Stuff", "Burning Up", "Lit"] },
  { id: 10, type: "phrase", emojis: "💡💭", answer: "Bright Idea", hint: "Having a good thought", difficulty: "easy", options: ["Bright Idea", "Smart Thinking", "Good Plan", "Clever Move"] },
  { id: 11, type: "phrase", emojis: "🙏🤞", answer: "Hope and Pray", hint: "Wishing for the best", difficulty: "medium", options: ["Hope and Pray", "Fingers Crossed", "Best Wishes", "Good Luck"] },
  { id: 12, type: "phrase", emojis: "⏰🐦", answer: "Early Bird", hint: "Waking up early", difficulty: "medium", options: ["Early Bird", "Morning Person", "Rise and Shine", "First One Up"] },

  // Celebrities
  { id: 13, type: "celebrity", emojis: "🎤👑", answer: "Beyoncé", hint: "Queen Bey", difficulty: "easy", options: ["Beyoncé", "Rihanna", "Ariana Grande", "Taylor Swift"] },
  { id: 14, type: "celebrity", emojis: "🏀👑", answer: "LeBron James", hint: "NBA King", difficulty: "easy", options: ["LeBron James", "Michael Jordan", "Kobe Bryant", "Stephen Curry"] },
  { id: 15, type: "celebrity", emojis: "🎬🎭", answer: "Leonardo DiCaprio", hint: "Titanic star, Oscar winner", difficulty: "medium", options: ["Leonardo DiCaprio", "Brad Pitt", "Tom Hanks", "Johnny Depp"] },
  { id: 16, type: "celebrity", emojis: "🎵🌟", answer: "Taylor Swift", hint: "Pop superstar with many hits", difficulty: "easy", options: ["Taylor Swift", "Adele", "Katy Perry", "Lady Gaga"] },

  // Countries
  { id: 17, type: "country", emojis: "🗽🍔", answer: "USA", hint: "Land of the free", difficulty: "easy", options: ["USA", "Canada", "UK", "Australia"] },
  { id: 18, type: "country", emojis: "🗼🥐", answer: "France", hint: "Eiffel Tower home", difficulty: "easy", options: ["France", "Italy", "Spain", "Germany"] },
  { id: 19, type: "country", emojis: "🍕🍝", answer: "Italy", hint: "Pizza and pasta origin", difficulty: "easy", options: ["Italy", "France", "Greece", "Spain"] },
  { id: 20, type: "country", emojis: "🍣🌸", answer: "Japan", hint: "Land of the rising sun", difficulty: "easy", options: ["Japan", "China", "Korea", "Thailand"] },
  { id: 21, type: "country", emojis: "🐘🍛", answer: "India", hint: "Taj Mahal location", difficulty: "medium", options: ["India", "Thailand", "Nepal", "Pakistan"] },
  { id: 22, type: "country", emojis: "🦘🐨", answer: "Australia", hint: "Down under", difficulty: "easy", options: ["Australia", "New Zealand", "South Africa", "Brazil"] },

  // Songs
  { id: 23, type: "song", emojis: "👋🌊", answer: "Bye Bye Bye", hint: "NSYNC hit", difficulty: "medium", options: ["Bye Bye Bye", "Goodbye", "See You Later", "Farewell"] },
  { id: 24, type: "song", emojis: "🔥🌧️", answer: "Firework", hint: "Katy Perry anthem", difficulty: "medium", options: ["Firework", "Roar", "Dark Horse", "California Gurls"] },
  { id: 25, type: "song", emojis: "💃👑", answer: "Dancing Queen", hint: "ABBA classic", difficulty: "easy", options: ["Dancing Queen", "Mamma Mia", "Waterloo", "Fernando"] },
]

const DIFFICULTY_POINTS = {
  easy: 10,
  medium: 20,
  hard: 30,
}

export default function EmojiQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all")
  const [selectedCategory, setSelectedCategory] = useState<"all" | QuizQuestion["type"]>("all")
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [customQuestion, setCustomQuestion] = useState({ emojis: "", answer: "", hint: "" })

  const filteredQuestions = React.useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const matchesDifficulty = selectedDifficulty === "all" || q.difficulty === selectedDifficulty
      const matchesCategory = selectedCategory === "all" || q.type === selectedCategory
      return matchesDifficulty && matchesCategory
    })
  }, [selectedDifficulty, selectedCategory])

  const currentQ = filteredQuestions[currentQuestion]

  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer.toLowerCase() === currentQ.answer.toLowerCase()
    
    if (isCorrect) {
      setScore((prev) => prev + DIFFICULTY_POINTS[currentQ.difficulty])
      setStreak((prev) => prev + 1)
    } else {
      setStreak(0)
    }
    
    setShowResult(true)
  }, [currentQ, selectedAnswer])

  const nextQuestion = useCallback(() => {
    if (currentQuestion >= filteredQuestions.length - 1) {
      setGameOver(true)
      if (score > highScore) {
        setHighScore(score)
      }
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }, [currentQuestion, filteredQuestions.length, score, highScore])

  const restartGame = useCallback(() => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameOver(false)
    setStreak(0)
  }, [])

  const createCustomQuiz = useCallback(() => {
    if (customQuestion.emojis && customQuestion.answer) {
      // In a real app, you'd save this to state or localStorage
      alert(`Custom quiz created: ${customQuestion.emojis} = ${customQuestion.answer}`)
      setCustomQuestion({ emojis: "", answer: "", hint: "" })
    }
  }, [customQuestion])

  const categories: { id: QuizQuestion["type"] | "all"; name: string; icon: string }[] = [
    { id: "all", name: "All", icon: "🎯" },
    { id: "movie", name: "Movies", icon: "🎬" },
    { id: "phrase", name: "Phrases", icon: "💬" },
    { id: "celebrity", name: "Celebrities", icon: "⭐" },
    { id: "country", name: "Countries", icon: "🌍" },
    { id: "song", name: "Songs", icon: "🎵" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Tabs defaultValue="play" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="play" className="text-sm px-4 py-2">
            <Play className="size-4 mr-2" />
            Play Quiz
          </TabsTrigger>
          <TabsTrigger value="create" className="text-sm px-4 py-2">
            <Sparkles className="size-4 mr-2" />
            Create Quiz
          </TabsTrigger>
          <TabsTrigger value="help" className="text-sm px-4 py-2">
            <HelpCircle className="size-4 mr-2" />
            How to Play
          </TabsTrigger>
        </TabsList>

        <TabsContent value="play" className="space-y-6 mt-4">
          {/* Score Display */}
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="size-5 text-yellow-500" />
                <span className="font-medium">Score: {score}</span>
              </div>
              {streak > 1 && (
                <div className="flex items-center gap-1 text-orange-500">
                  <Star className="size-4" />
                  <span className="text-sm">{streak} streak!</span>
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </div>
          </section>

          {/* Filters */}
          {!gameOver && (
            <section className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setCurrentQuestion(0)
                      setScore(0)
                      setStreak(0)
                      setSelectedAnswer(null)
                      setShowResult(false)
                      setGameOver(false)
                    }}
                  >
                    {cat.icon} {cat.name}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["all", "easy", "medium", "hard"].map((diff) => (
                  <Button
                    key={diff}
                    variant={selectedDifficulty === diff ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedDifficulty(diff as typeof selectedDifficulty)
                      setCurrentQuestion(0)
                      setScore(0)
                      setStreak(0)
                      setSelectedAnswer(null)
                      setShowResult(false)
                      setGameOver(false)
                    }}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </Button>
                ))}
              </div>
            </section>
          )}

          {/* Game Over */}
          {gameOver && (
            <Card>
              <CardHeader className="text-center">
                <Trophy className="size-16 mx-auto text-yellow-500 mb-2" />
                <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                <CardDescription>Your final score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-6xl font-bold">{score}</p>
                  <p className="text-muted-foreground">points</p>
                </div>
                {score >= highScore && score > 0 && (
                  <div className="text-center text-green-500">
                    <Star className="size-6 mx-auto mb-1" />
                    <p className="font-medium">New High Score!</p>
                  </div>
                )}
                <div className="flex justify-center gap-2">
                  <Button onClick={restartGame}>
                    <RotateCcw className="size-4 mr-2" />
                    Play Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question Card */}
          {!gameOver && currentQ && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs",
                      currentQ.difficulty === "easy" && "bg-green-500/20 text-green-500",
                      currentQ.difficulty === "medium" && "bg-yellow-500/20 text-yellow-500",
                      currentQ.difficulty === "hard" && "bg-red-500/20 text-red-500"
                    )}>
                      {currentQ.difficulty.toUpperCase()}
                    </span>
                    <span className="capitalize">{currentQ.type}</span>
                  </CardDescription>
                  <span className="text-sm text-muted-foreground">
                    +{DIFFICULTY_POINTS[currentQ.difficulty]} points
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Emoji Display */}
                <div className="text-center py-8">
                  <p className="text-6xl mb-4">{currentQ.emojis}</p>
                  <p className="text-sm text-muted-foreground">Guess the {currentQ.type}!</p>
                </div>

                {/* Options */}
                {currentQ.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((option, idx) => {
                      const isSelected = selectedAnswer === option
                      const isCorrect = option.toLowerCase() === currentQ.answer.toLowerCase()
                      
                      return (
                        <Button
                          key={idx}
                          variant={isSelected ? (isCorrect ? "default" : "destructive") : "outline"}
                          className={cn(
                            "h-auto py-4 text-lg justify-start",
                            showResult && isCorrect && "bg-green-500 hover:bg-green-600",
                            showResult && isSelected && !isCorrect && "bg-red-500 hover:bg-red-600"
                          )}
                          onClick={() => handleAnswer(option)}
                          disabled={showResult}
                        >
                          {option}
                          {showResult && isCorrect && <Check className="size-5 ml-auto text-green-500" />}
                          {showResult && isSelected && !isCorrect && <X className="size-5 ml-auto" />}
                        </Button>
                      )
                    })}
                  </div>
                )}

                {/* Hint */}
                {!showResult && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Need a hint?</p>
                    <p className="text-sm italic">{currentQ.hint}</p>
                  </div>
                )}

                {/* Next Button */}
                {showResult && (
                  <div className="flex justify-center">
                    <Button onClick={nextQuestion} size="lg">
                      {currentQuestion >= filteredQuestions.length - 1 ? "See Results" : "Next Question"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* High Score */}
          {highScore > 0 && (
            <div className="text-center text-muted-foreground">
              <p className="text-sm">High Score: {highScore}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Own Quiz</CardTitle>
              <CardDescription>Make custom emoji quizzes to challenge your friends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-emojis">Emojis</Label>
                <Input
                  id="custom-emojis"
                  value={customQuestion.emojis}
                  onChange={(e) => setCustomQuestion({ ...customQuestion, emojis: e.target.value })}
                  placeholder="e.g., 🚢🧊💔"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-answer">Answer</Label>
                <Input
                  id="custom-answer"
                  value={customQuestion.answer}
                  onChange={(e) => setCustomQuestion({ ...customQuestion, answer: e.target.value })}
                  placeholder="e.g., Titanic"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-hint">Hint (optional)</Label>
                <Input
                  id="custom-hint"
                  value={customQuestion.hint}
                  onChange={(e) => setCustomQuestion({ ...customQuestion, hint: e.target.value })}
                  placeholder="e.g., A love story on a sinking ship"
                />
              </div>
              <Button onClick={createCustomQuiz}>
                <Sparkles className="size-4 mr-2" />
                Create Quiz Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>How to Play Emoji Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <div>
                    <p className="font-medium">Look at the emojis</p>
                    <p className="text-sm text-muted-foreground">Each question shows a combination of emojis that represent something</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold">2</div>
                  <div>
                    <p className="font-medium">Choose your answer</p>
                    <p className="text-sm text-muted-foreground">Select from the multiple choice options what you think the emojis represent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold">3</div>
                  <div>
                    <p className="font-medium">Earn points</p>
                    <p className="text-sm text-muted-foreground">Easy = 10 pts, Medium = 20 pts, Hard = 30 pts. Build streaks for bonus!</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="font-medium mb-2">Example:</p>
                <p className="text-3xl text-center mb-2">🚢🧊💔</p>
                <p className="text-center text-muted-foreground">Answer: Titanic (ship + ice + broken heart)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
