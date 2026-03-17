"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Trash2, Download, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QrCodeFeedbackForm() {
  const [formTitle, setFormTitle] = useState("")
  const [formUrl, setFormUrl] = useState("")
  const [questions, setQuestions] = useState<string[]>(["How was your experience?"])
  const [qrData, setQrData] = useState("")
  const [copied, setCopied] = useState(false)

  const addQuestion = useCallback(() => {
    setQuestions([...questions, ""])
  }, [questions])

  const removeQuestion = useCallback((index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }, [questions])

  const updateQuestion = useCallback((index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }, [questions])

  const generateQR = useCallback(() => {
    const data = {
      type: "feedback_form",
      title: formTitle,
      url: formUrl,
      questions: questions.filter(q => q.trim())
    }
    setQrData(JSON.stringify(data, null, 2))
  }, [formTitle, formUrl, questions])

  const handleCopy = useCallback(async () => {
    if (qrData) {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }, [qrData])

  const handleClear = useCallback(() => {
    setFormTitle("")
    setFormUrl("")
    setQuestions(["How was your experience?"])
    setQrData("")
  }, [])

  const handleDownload = useCallback(() => {
    if (qrData) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="60" text-anchor="middle" font-size="32" fill="#22c55e">😊</text>
        <text x="100" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">${formTitle || "Feedback"}</text>
        <text x="100" y="130" text-anchor="middle" font-size="10" fill="#6b7280">Scan to Share</text>
        <text x="100" y="150" text-anchor="middle" font-size="10" fill="#6b7280">Your Opinion</text>
      </svg>`
      const blob = new Blob([svg], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "feedback-qr.svg"
      a.click()
      URL.revokeObjectURL(url)
    }
  }, [qrData, formTitle])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">QR Code for Feedback Form</h2>
            <p className="text-sm text-muted-foreground">
              Create QR codes linking to customer feedback forms
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="formTitle">Form Title</Label>
            <Input
              id="formTitle"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Customer Satisfaction Survey"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="formUrl">Form URL</Label>
            <Input
              id="formUrl"
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              placeholder="https://forms.example.com/feedback"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Sample Questions</Label>
              <Button variant="outline" size="sm" onClick={addQuestion}>
                Add Question
              </Button>
            </div>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={question}
                    onChange={(e) => updateQuestion(index, e.target.value)}
                    placeholder="Enter question..."
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                    disabled={questions.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={generateQR} className="flex-1" disabled={!formTitle || !formUrl}>
              <ThumbsUp className="h-4 w-4 mr-2" />
              Generate Feedback QR
            </Button>
            <Button variant="outline" onClick={handleClear} title="Clear">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QR Code Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrData ? (
              <>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <ThumbsUp className="h-16 w-16 mx-auto mb-4 text-green-600" />
                    <p className="font-medium">{formTitle}</p>
                    <p className="text-sm text-muted-foreground">{questions.length} questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleCopy} className="flex-1" variant="outline">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy Data"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </>
            ) : (
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Enter form details to generate QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
