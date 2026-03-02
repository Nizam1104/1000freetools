"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssShapeGeneratorPage() {
  const [shapeType, setShapeType] = useState<"triangle" | "arrow" | "speech-bubble" | "circle" | "ellipse" | "heart" | "star">("triangle");
  const [size, setSize] = useState(100);
  const [color, setColor] = useState("#6366f1");
  const [triangleDirection, setTriangleDirection] = useState<"up" | "down" | "left" | "right">("up");
  const [arrowDirection, setArrowDirection] = useState<"up" | "down" | "left" | "right">("right");
  const [bubbleTailPosition, setBubbleTailPosition] = useState<"left" | "right" | "top" | "bottom">("bottom");
  const [borderRadius, setBorderRadius] = useState(0);

  const generateShapeCSS = () => {
    switch (shapeType) {
      case "triangle":
        if (triangleDirection === "up") {
          return `width: 0;
height: 0;
border-left: ${size / 2}px solid transparent;
border-right: ${size / 2}px solid transparent;
border-bottom: ${size}px solid ${color};`;
        } else if (triangleDirection === "down") {
          return `width: 0;
height: 0;
border-left: ${size / 2}px solid transparent;
border-right: ${size / 2}px solid transparent;
border-top: ${size}px solid ${color};`;
        } else if (triangleDirection === "left") {
          return `width: 0;
height: 0;
border-top: ${size / 2}px solid transparent;
border-bottom: ${size / 2}px solid transparent;
border-right: ${size}px solid ${color};`;
        } else {
          return `width: 0;
height: 0;
border-top: ${size / 2}px solid transparent;
border-bottom: ${size / 2}px solid transparent;
border-left: ${size}px solid ${color};`;
        }

      case "arrow":
        if (arrowDirection === "right") {
          return `width: 0;
height: 0;
border-top: ${size / 3}px solid transparent;
border-bottom: ${size / 3}px solid transparent;
border-left: ${size}px solid ${color};`;
        } else if (arrowDirection === "left") {
          return `width: 0;
height: 0;
border-top: ${size / 3}px solid transparent;
border-bottom: ${size / 3}px solid transparent;
border-right: ${size}px solid ${color};`;
        } else if (arrowDirection === "up") {
          return `width: 0;
height: 0;
border-left: ${size / 3}px solid transparent;
border-right: ${size / 3}px solid transparent;
border-bottom: ${size}px solid ${color};`;
        } else {
          return `width: 0;
height: 0;
border-left: ${size / 3}px solid transparent;
border-right: ${size / 3}px solid transparent;
border-top: ${size}px solid ${color};`;
        }

      case "speech-bubble":
        const tailSize = size / 4;
        if (bubbleTailPosition === "bottom") {
          return `width: ${size}px;
height: ${size * 0.75}px;
background: ${color};
border-radius: ${size / 10}px;
position: relative;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: -${tailSize}px;
  left: 50%;
  transform: translateX(-50%);
  border-width: ${tailSize}px ${tailSize}px 0;
  border-style: solid;
  border-color: ${color} transparent transparent;
}`;
        } else if (bubbleTailPosition === "top") {
          return `width: ${size}px;
height: ${size * 0.75}px;
background: ${color};
border-radius: ${size / 10}px;
position: relative;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  top: -${tailSize}px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 ${tailSize}px ${tailSize}px;
  border-style: solid;
  border-color: transparent transparent ${color};
}`;
        } else if (bubbleTailPosition === "left") {
          return `width: ${size}px;
height: ${size * 0.75}px;
background: ${color};
border-radius: ${size / 10}px;
position: relative;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  left: -${tailSize}px;
  top: 50%;
  transform: translateY(-50%);
  border-width: ${tailSize}px ${tailSize}px ${tailSize}px 0;
  border-style: solid;
  border-color: transparent ${color} transparent transparent;
}`;
        } else {
          return `width: ${size}px;
height: ${size * 0.75}px;
background: ${color};
border-radius: ${size / 10}px;
position: relative;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  right: -${tailSize}px;
  top: 50%;
  transform: translateY(-50%);
  border-width: ${tailSize}px 0 ${tailSize}px ${tailSize}px;
  border-style: solid;
  border-color: transparent transparent transparent ${color};
}`;
        }

      case "circle":
        return `width: ${size}px;
height: ${size}px;
background: ${color};
border-radius: 50%;`;

      case "ellipse":
        return `width: ${size * 1.5}px;
height: ${size * 0.75}px;
background: ${color};
border-radius: 50%;`;

      case "heart":
        return `width: ${size}px;
height: ${size}px;
background: ${color};
position: relative;
transform: rotate(-45deg);
}

.heart::before,
.heart::after {
  content: "";
  width: ${size}px;
  height: ${size}px;
  background: ${color};
  border-radius: 50%;
  position: absolute;
}

.heart::before {
  top: -${size / 2}px;
  left: 0;
}

.heart::after {
  top: 0;
  left: ${size / 2}px;
}`;

      case "star":
        return `width: ${size}px;
height: ${size}px;
background: ${color};
clip-path: polygon(
  50% 0%,
  61% 35%,
  98% 35%,
  68% 57%,
  79% 91%,
  50% 70%,
  21% 91%,
  32% 57%,
  2% 35%,
  39% 35%
);`;

      default:
        return "";
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const cssCode = generateShapeCSS();

  const getShapeStyles = () => {
    const base: React.CSSProperties = {};
    
    switch (shapeType) {
      case "triangle":
        base.width = 0;
        base.height = 0;
        if (triangleDirection === "up") {
          base.borderLeft = `${size / 2}px solid transparent`;
          base.borderRight = `${size / 2}px solid transparent`;
          base.borderBottom = `${size}px solid color`;
        } else if (triangleDirection === "down") {
          base.borderLeft = `${size / 2}px solid transparent`;
          base.borderRight = `${size / 2}px solid transparent`;
          base.borderTop = `${size}px solid ${color}`;
        } else if (triangleDirection === "left") {
          base.borderTop = `${size / 2}px solid transparent`;
          base.borderBottom = `${size / 2}px solid transparent`;
          base.borderRight = `${size}px solid ${color}`;
        } else {
          base.borderTop = `${size / 2}px solid transparent`;
          base.borderBottom = `${size / 2}px solid transparent`;
          base.borderLeft = `${size}px solid ${color}`;
        }
        break;
      
      case "circle":
        base.width = `${size}px`;
        base.height = `${size}px`;
        base.backgroundColor = color;
        base.borderRadius = "50%";
        break;
      
      case "ellipse":
        base.width = `${size * 1.5}px`;
        base.height = `${size * 0.75}px`;
        base.backgroundColor = color;
        base.borderRadius = "50%";
        break;
      
      case "heart":
        base.width = `${size}px`;
        base.height = `${size}px`;
        base.backgroundColor = color;
        base.position = "relative";
        base.transform = "rotate(-45deg)";
        break;
      
      case "star":
        base.width = `${size}px`;
        base.height = `${size}px`;
        base.backgroundColor = color;
        base.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
        break;
      
      case "speech-bubble":
        base.width = `${size}px`;
        base.height = `${size * 0.75}px`;
        base.backgroundColor = color;
        base.borderRadius = `${size / 10}px`;
        base.position = "relative";
        break;
      
      case "arrow":
        base.width = 0;
        base.height = 0;
        if (arrowDirection === "right") {
          base.borderTop = `${size / 3}px solid transparent`;
          base.borderBottom = `${size / 3}px solid transparent`;
          base.borderLeft = `${size}px solid ${color}`;
        } else if (arrowDirection === "left") {
          base.borderTop = `${size / 3}px solid transparent`;
          base.borderBottom = `${size / 3}px solid transparent`;
          base.borderRight = `${size}px solid ${color}`;
        } else if (arrowDirection === "up") {
          base.borderLeft = `${size / 3}px solid transparent`;
          base.borderRight = `${size / 3}px solid transparent`;
          base.borderBottom = `${size}px solid ${color}`;
        } else {
          base.borderLeft = `${size / 3}px solid transparent`;
          base.borderRight = `${size / 3}px solid transparent`;
          base.borderTop = `${size}px solid ${color}`;
        }
        break;
    }
    
    return base;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Shape Generator</h1>
        <p className="text-muted-foreground">
          Create triangles, arrows, speech bubbles, and other shapes using pure CSS. No images or SVG required.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shape Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={shapeType} onValueChange={(v) => setShapeType(v as typeof shapeType)} className="mt-2">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="triangle">Triangle</TabsTrigger>
                  <TabsTrigger value="arrow">Arrow</TabsTrigger>
                  <TabsTrigger value="speech-bubble">Bubble</TabsTrigger>
                  <TabsTrigger value="circle">Circle</TabsTrigger>
                  <TabsTrigger value="ellipse">Ellipse</TabsTrigger>
                  <TabsTrigger value="heart">Heart</TabsTrigger>
                  <TabsTrigger value="star">Star</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shape Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Size: {size}px</Label>
                <Slider value={[size]} onValueChange={([v]) => setSize(v)} min={50} max={200} step={10} className="mt-2" />
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
              
              {shapeType === "triangle" && (
                <div>
                  <Label>Direction</Label>
                  <Select value={triangleDirection} onValueChange={(v) => setTriangleDirection(v as typeof triangleDirection)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up">Up ↑</SelectItem>
                      <SelectItem value="down">Down ↓</SelectItem>
                      <SelectItem value="left">Left ←</SelectItem>
                      <SelectItem value="right">Right →</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {shapeType === "arrow" && (
                <div>
                  <Label>Direction</Label>
                  <Select value={arrowDirection} onValueChange={(v) => setArrowDirection(v as typeof arrowDirection)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up">Up ↑</SelectItem>
                      <SelectItem value="down">Down ↓</SelectItem>
                      <SelectItem value="left">Left ←</SelectItem>
                      <SelectItem value="right">Right →</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {shapeType === "speech-bubble" && (
                <div>
                  <Label>Tail Position</Label>
                  <Select value={bubbleTailPosition} onValueChange={(v) => setBubbleTailPosition(v as typeof bubbleTailPosition)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Shapes</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("triangle");
                  setTriangleDirection("up");
                  setSize(100);
                }}
              >
                Up Triangle
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("arrow");
                  setArrowDirection("right");
                  setSize(100);
                }}
              >
                Right Arrow
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("speech-bubble");
                  setBubbleTailPosition("bottom");
                  setSize(150);
                }}
              >
                Speech Bubble
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("heart");
                  setSize(100);
                }}
              >
                Heart Shape
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 bg-muted/50 rounded-lg min-h-[300px]">
                {shapeType === "speech-bubble" || shapeType === "heart" ? (
                  <div className="relative" style={getShapeStyles()}>
                    {shapeType === "speech-bubble" && bubbleTailPosition === "bottom" && (
                      <div
                        className="absolute"
                        style={{
                          bottom: `-${size / 4}px`,
                          left: "50%",
                          transform: "translateX(-50%)",
                          borderWidth: `${size / 4}px ${size / 4}px 0`,
                          borderStyle: "solid",
                          borderColor: `${color} transparent transparent`,
                        }}
                      />
                    )}
                    {shapeType === "speech-bubble" && bubbleTailPosition === "top" && (
                      <div
                        className="absolute"
                        style={{
                          top: `-${size / 4}px`,
                          left: "50%",
                          transform: "translateX(-50%)",
                          borderWidth: `0 ${size / 4}px ${size / 4}px`,
                          borderStyle: "solid",
                          borderColor: `transparent transparent ${color}`,
                        }}
                      />
                    )}
                    {shapeType === "speech-bubble" && bubbleTailPosition === "left" && (
                      <div
                        className="absolute"
                        style={{
                          left: `-${size / 4}px`,
                          top: "50%",
                          transform: "translateY(-50%)",
                          borderWidth: `${size / 4}px ${size / 4}px ${size / 4}px 0`,
                          borderStyle: "solid",
                          borderColor: `transparent ${color} transparent transparent`,
                        }}
                      />
                    )}
                    {shapeType === "speech-bubble" && bubbleTailPosition === "right" && (
                      <div
                        className="absolute"
                        style={{
                          right: `-${size / 4}px`,
                          top: "50%",
                          transform: "translateY(-50%)",
                          borderWidth: `${size / 4}px 0 ${size / 4}px ${size / 4}px`,
                          borderStyle: "solid",
                          borderColor: `transparent transparent transparent ${color}`,
                        }}
                      />
                    )}
                    {shapeType === "heart" && (
                      <>
                        <div
                          className="absolute"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: color,
                            borderRadius: "50%",
                            top: `-${size / 2}px`,
                            left: 0,
                          }}
                        />
                        <div
                          className="absolute"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: color,
                            borderRadius: "50%",
                            top: 0,
                            left: `${size / 2}px`,
                          }}
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <div style={getShapeStyles()} />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {`.shape {
${cssCode.split("\n").map((l) => "  " + l).join("\n")}
}`}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(`.shape {\n${cssCode.split("\n").map((l) => "  " + l).join("\n")}\n}`, "Shape CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(`.shape {\n${cssCode.split("\n").map((l) => "  " + l).join("\n")}\n}`, "Shape CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Shapes</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS shapes are geometric figures created using CSS properties like borders, border-radius, 
              and clip-path. They're lightweight alternatives to images for common UI elements like 
              arrows, tooltips, and decorative shapes.
            </p>
            <p>
              Different techniques create different shapes: border tricks for triangles and arrows, 
              border-radius for circles and ellipses, pseudo-elements for complex shapes like hearts, 
              and clip-path for polygons like stars.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Shape Techniques</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Border Method</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Triangles and arrows use transparent borders with one colored border. The element has 
                zero width/height, and the borders create the shape.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Border-Radius</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Circles and ellipses use 50% border-radius on square or rectangular elements. Simple 
                and widely supported.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pseudo-elements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Complex shapes like hearts and speech bubbles combine the main element with ::before 
                and ::after pseudo-elements.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clip-path</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stars and polygons use clip-path to cut elements into specific shapes. Modern browsers 
                support this well.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
