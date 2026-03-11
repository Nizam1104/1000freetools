"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Copy, Check, Trash2, Download } from "lucide-react"

export function HtmlImageMapGenerator() {
  const [imageUrl, setImageUrl] = useState("")
  const [imageWidth, setImageWidth] = useState(800)
  const [imageHeight, setImageHeight] = useState(600)
  const [areas, setAreas] = useState<Array<{ shape: string; coords: string; href: string; alt: string }>>([])
  const [currentShape, setCurrentShape] = useState<"rect" | "circle" | "poly">("rect")
  const [currentCoords, setCurrentCoords] = useState("")
  const [currentHref, setCurrentHref] = useState("")
  const [currentAlt, setCurrentAlt] = useState("")
  const [copied, setCopied] = useState(false)

  const addArea = useCallback(() => {
    if (!currentCoords) return
    setAreas(prev => [...prev, {
      shape: currentShape,
      coords: currentCoords,
      href: currentHref || "#",
      alt: currentAlt || "Link"
    }])
    setCurrentCoords("")
    setCurrentHref("")
    setCurrentAlt("")
  }, [currentShape, currentCoords, currentHref, currentAlt])

  const removeArea = useCallback((index: number) => {
    setAreas(prev => prev.filter((_, i) => i !== index))
  }, [])

  const generateCode = useCallback(() => {
    let html = `<img src="${imageUrl || 'image.jpg'}" usemap="#imagemap" width="${imageWidth}" height="${imageHeight}" alt="Image Map">\n\n`
    html += `<map name="imagemap">\n`
    
    areas.forEach(area => {
      html += `  <area shape="${area.shape}" coords="${area.coords}" href="${area.href}" alt="${area.alt}">\n`
    })
    
    html += `</map>`
    return html
  }, [imageUrl, imageWidth, imageHeight, areas])

  const handleCopy = useCallback(async () => {
    const code = generateCode()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [generateCode])

  const handleClear = useCallback(() => {
    setAreas([])
    setCurrentCoords("")
    setCurrentHref("")
    setCurrentAlt("")
  }, [])

  const output = generateCode()

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">HTML Image Map Generator</h2>
            <p className="text-sm text-muted-foreground">
              Create clickable image maps with multiple link areas
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-4">
            <Label>Add Clickable Area</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant={currentShape === "rect" ? "default" : "outline"}
                onClick={() => setCurrentShape("rect")}
              >
                Rectangle
              </Button>
              <Button
                variant={currentShape === "circle" ? "default" : "outline"}
                onClick={() => setCurrentShape("circle")}
              >
                Circle
              </Button>
              <Button
                variant={currentShape === "poly" ? "default" : "outline"}
                onClick={() => setCurrentShape("poly")}
              >
                Polygon
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coords">Coordinates</Label>
              <Input
                id="coords"
                value={currentCoords}
                onChange={(e) => setCurrentCoords(e.target.value)}
                placeholder={
                  currentShape === "rect" ? "x1,y1,x2,y2 (e.g., 10,10,100,100)" :
                  currentShape === "circle" ? "x,y,radius (e.g., 50,50,30)" :
                  "x1,y1,x2,y2,x3,y3... (e.g., 10,10,50,10,30,50)"
                }
              />
              <p className="text-xs text-muted-foreground">
                {currentShape === "rect" && "Format: left,top,right,bottom"}
                {currentShape === "circle" && "Format: center_x,center_y,radius"}
                {currentShape === "poly" && "Format: x1,y1,x2,y2,x3,y3,... (at least 3 points)"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="href">Link URL</Label>
                <Input
                  id="href"
                  value={currentHref}
                  onChange={(e) => setCurrentHref(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={currentAlt}
                  onChange={(e) => setCurrentAlt(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>

            <Button onClick={addArea} disabled={!currentCoords} className="w-full">
              Add Area
            </Button>
          </div>

          {areas.length > 0 && (
            <div className="space-y-2">
              <Label>Defined Areas ({areas.length})</Label>
              <div className="border rounded-lg overflow-auto max-h-[200px]">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Shape</th>
                      <th className="p-2 text-left">Coords</th>
                      <th className="p-2 text-left">Link</th>
                      <th className="p-2 text-left">Alt</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {areas.map((area, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{area.shape}</td>
                        <td className="p-2 font-mono text-xs">{area.coords}</td>
                        <td className="p-2 text-blue-600 truncate max-w-[150px]">{area.href}</td>
                        <td className="p-2">{area.alt}</td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm" onClick={() => removeArea(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label htmlFor="output">Generated HTML</Label>
          <Textarea
            id="output"
            value={output}
            readOnly
            placeholder="Generated code will appear here..."
            className="min-h-[500px] font-mono text-sm bg-muted"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleCopy} disabled={!areas.length} className="flex-1">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-medium text-sm">Shape Examples</h3>
            <div className="text-xs space-y-2 text-muted-foreground">
              <div>
                <strong>Rectangle:</strong> x1,y1,x2,y2<br/>
                <code className="bg-background px-1 rounded">10,10,100,100</code>
              </div>
              <div>
                <strong>Circle:</strong> center_x,center_y,radius<br/>
                <code className="bg-background px-1 rounded">50,50,30</code>
              </div>
              <div>
                <strong>Polygon:</strong> x1,y1,x2,y2,x3,y3,...<br/>
                <code className="bg-background px-1 rounded">10,10,50,10,30,50</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Input = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    className={`w-full px-3 py-2 border rounded-md bg-background text-sm ${className || ""}`}
    {...props}
  />
)
