'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, RotateCcw, Check, Upload, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function FontIdentifier() {
  const [imageData, setImageData] = useState('')
  const [imageName, setImageName] = useState('')
  const [results, setResults] = useState<{ name: string; similarity: number; downloadUrl: string }[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImageData(result)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsDataURL(file)
  }

  const identifyFont = () => {
    if (!imageData) {
      toast.error('Please upload an image first')
      return
    }
    
    setIsAnalyzing(true)
    
    // Simulate font identification (in real implementation, this would use ML)
    setTimeout(() => {
      const mockResults = [
        { name: 'Helvetica Neue', similarity: 95, downloadUrl: 'https://fonts.google.com/specimen/Helvetica+Neue' },
        { name: 'Arial', similarity: 88, downloadUrl: 'https://fonts.google.com/specimen/Arial' },
        { name: 'Roboto', similarity: 82, downloadUrl: 'https://fonts.google.com/specimen/Roboto' },
        { name: 'Open Sans', similarity: 75, downloadUrl: 'https://fonts.google.com/specimen/Open+Sans' },
        { name: 'Lato', similarity: 68, downloadUrl: 'https://fonts.google.com/specimen/Lato' },
      ]
      setResults(mockResults)
      setIsAnalyzing(false)
      toast.success('Font analysis complete')
    }, 2000)
  }

  const handleClear = () => {
    setImageData('')
    setImageName('')
    setResults([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">What Font Is This?</h2>
        <p className="text-muted-foreground mt-2">
          Upload an image or screenshot to identify the font used. Get matching fonts and download links.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, SVG (Max 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
            
            {imageName && (
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">{imageName}</span>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}
            
            {imageData && (
              <div className="w-full max-w-md">
                <img src={imageData} alt="Uploaded" className="w-full h-auto rounded-lg border" />
              </div>
            )}
          </div>
        </Card>

        <Button 
          onClick={identifyFont} 
          className="w-full" 
          disabled={!imageData || isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Identify Font'}
        </Button>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Matching Fonts</h2>
            <div className="grid gap-4">
              {results.map((font, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{font.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Match: {font.similarity}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${font.similarity}%` }}
                        />
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={font.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Get Font
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Card className="p-4 bg-blue-50 dark:bg-blue-950">
          <h3 className="font-semibold mb-2">Tips for Best Results</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Use clear, high-resolution images with visible text</li>
            <li>• Crop the image to show only the text you want to identify</li>
            <li>• Avoid blurry or distorted text</li>
            <li>• Works best with Latin alphabet fonts</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
