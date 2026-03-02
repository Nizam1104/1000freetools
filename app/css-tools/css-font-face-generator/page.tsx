"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Upload, X } from "lucide-react";

export default function CssFontFaceGeneratorPage() {
  const [fontName, setFontName] = useState("MyCustomFont");
  const [fontFiles, setFontFiles] = useState<{ type: string; name: string; url: string }[]>([]);
  const [fontWeights, setFontWeights] = useState("400");
  const [fontStyle, setFontStyle] = useState("normal");
  const [fontDisplay, setFontDisplay] = useState("swap");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const extension = file.name.split(".").pop()?.toLowerCase();
      let type = "";
      
      switch (extension) {
        case "woff2":
          type = "woff2";
          break;
        case "woff":
          type = "woff";
          break;
        case "ttf":
          type = "truetype";
          break;
        case "otf":
          type = "opentype";
          break;
        case "eot":
          type = "embedded-opentype";
          break;
        case "svg":
          type = "svg";
          break;
        default:
          type = extension || "";
      }

      setFontFiles((prev) => [...prev, { type, name: file.name, url }]);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFontFile = (index: number) => {
    setFontFiles(fontFiles.filter((_, i) => i !== index));
  };

  const generateFontFaceCSS = () => {
    const sources = fontFiles.map((file) => {
      const url = file.url || `path/to/${file.name}`;
      return `    url('${url}') format('${file.type}')`;
    }).join(",\n");

    if (!sources) return "";

    return `@font-face {
  font-family: '${fontName}';
  src: 
${sources};
  font-weight: ${fontWeights};
  font-style: ${fontStyle};
  font-display: ${fontDisplay};
}`;
  };

  const generateHTML = () => {
    const fontUrl = fontFiles.length > 0 ? fontFiles[0].url || `path/to/${fontFiles[0].name}` : "";
    return `<!-- Add to your HTML <head> -->
<link rel="preload" href="${fontUrl}" as="font" type="font/${fontFiles[0]?.type || "woff2"}" crossorigin>

<!-- Use in your CSS -->
<style>
  body {
    font-family: '${fontName}', system-ui, sans-serif;
  }
</style>`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const fontFaceCSS = generateFontFaceCSS();
  const htmlCode = generateHTML();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS @font-face Generator</h1>
        <p className="text-muted-foreground">
          Upload your custom fonts and generate ready-to-use @font-face CSS declarations with optimal settings.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Font Family Name</Label>
                <Input
                  value={fontName}
                  onChange={(e) => setFontName(e.target.value)}
                  placeholder="MyCustomFont"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Font Weight</Label>
                <Select value={fontWeights} onValueChange={setFontWeights}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">Thin (100)</SelectItem>
                    <SelectItem value="200">Extra Light (200)</SelectItem>
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="400">Normal (400)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi Bold (600)</SelectItem>
                    <SelectItem value="700">Bold (700)</SelectItem>
                    <SelectItem value="800">Extra Bold (800)</SelectItem>
                    <SelectItem value="900">Black (900)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Font Style</Label>
                <Select value={fontStyle} onValueChange={setFontStyle}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="italic">Italic</SelectItem>
                    <SelectItem value="oblique">Oblique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Font Display</Label>
                <Select value={fontDisplay} onValueChange={setFontDisplay}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">auto</SelectItem>
                    <SelectItem value="block">block</SelectItem>
                    <SelectItem value="swap">swap (Recommended)</SelectItem>
                    <SelectItem value="fallback">fallback</SelectItem>
                    <SelectItem value="optional">optional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Font Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Supported Formats</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  WOFF2 (recommended), WOFF, TTF, OTF, EOT, SVG
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".woff2,.woff,.ttf,.otf,.eot,.svg"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="font-upload"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Font Files
              </Button>
              {fontFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  {fontFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.type}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFontFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {fontFiles.length > 0 ? (
                <div
                  className="p-6 bg-muted/50 rounded-lg text-center"
                  style={{
                    fontFamily: fontName,
                    fontSize: "32px",
                  }}
                >
                  <p>Aa Bb Cc 123</p>
                  <p className="text-lg mt-2">The quick brown fox jumps over the lazy dog</p>
                </div>
              ) : (
                <div className="p-6 bg-muted/50 rounded-lg text-center text-muted-foreground">
                  <p>Upload a font file to preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>@font-face Declaration</Label>
                <div className="flex gap-2 mt-2">
                  <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                    {fontFaceCSS || "/* Upload font files to generate CSS */"}
                  </pre>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(fontFaceCSS, "@font-face CSS")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {fontFaceCSS && (
                <>
                  <div>
                    <Label>HTML Usage</Label>
                    <div className="flex gap-2 mt-2">
                      <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                        {htmlCode}
                      </pre>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(htmlCode, "HTML Code")}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Usage Example</Label>
                    <div className="flex gap-2 mt-2">
                      <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                        {`.element { font-family: '${fontName}', sans-serif; }`}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`.element { font-family: '${fontName}', sans-serif; }`, "Usage CSS")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => copyToClipboard(fontFaceCSS, "@font-face CSS")}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy @font-face CSS
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Use WOFF2:</strong> Best compression and browser support
              </div>
              <div>
                <strong className="text-foreground">font-display: swap:</strong> Prevents invisible text during loading
              </div>
              <div>
                <strong className="text-foreground">Preload critical fonts:</strong> Add &lt;link rel="preload"&gt; for above-the-fold text
              </div>
              <div>
                <strong className="text-foreground">Subset fonts:</strong> Remove unused characters to reduce file size
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About @font-face</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              The CSS <code>@font-face</code> rule allows you to use custom fonts on your website by specifying the 
              font family name and the location of the font file. This gives you complete control over typography 
              beyond standard web-safe fonts.
            </p>
            <p>
              Modern web fonts support multiple formats for cross-browser compatibility. WOFF2 offers the best 
              compression and is supported by all modern browsers. Include multiple formats as fallbacks for 
              older browser support.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Font File Formats</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WOFF2</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Best compression (30% smaller than WOFF). Supported by all modern browsers. Use as your primary format.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WOFF</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Good compression, widely supported. Use as a fallback for older browsers that don't support WOFF2.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">TTF/OTF</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Desktop font formats. Larger file sizes but good fallback options for older browsers.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">EOT/SVG</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Legacy formats for IE8 and below (EOT) or old iOS (SVG). Rarely needed for modern web development.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
