"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Type, Package } from "lucide-react";

const IconFontGeneratorFromSvg: React.FC = () => {
  const [svgContent, setSvgContent] = useState("");
  const [fontName, setFontName] = useState("my-icon-font");
  const [glyphName, setGlyphName] = useState("icon");
  const [unicode, setUnicode] = useState("E001");
  const [icons, setIcons] = useState<{ name: string; unicode: string; svg: string }[]>([]);
  const [generated, setGenerated] = useState(false);

  const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>`;

  const handleAddIcon = useCallback(() => {
    if (!svgContent.trim()) return;
    
    setIcons(prev => [...prev, {
      name: glyphName,
      unicode: unicode,
      svg: svgContent,
    }]);
    
    setSvgContent("");
    setGlyphName(`icon${icons.length + 1}`);
    setUnicode(`E00${(parseInt(unicode, 16) + 1).toString(16).toUpperCase()}`);
  }, [svgContent, glyphName, unicode, icons.length]);

  const handleGenerateFont = useCallback(() => {
    if (icons.length === 0) return;
    setGenerated(true);
  }, [icons.length]);

  const handleClear = useCallback(() => {
    setSvgContent("");
    setFontName("my-icon-font");
    setGlyphName("icon");
    setUnicode("E001");
    setIcons([]);
    setGenerated(false);
  }, []);

  const handleDownloadCss = useCallback(() => {
    let css = `@font-face {
  font-family: '${fontName}';
  src: url('${fontName}.woff2') format('woff2'),
       url('${fontName}.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.${fontName} {
  display: inline-block;
  font-family: '${fontName}';
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

`;

    icons.forEach((icon, i) => {
      css += `.${fontName}-${icon.name}::before {
  content: "\\${icon.unicode}";
}

`;
    });

    const blob = new Blob([css], { type: "text/css" });
    const link = document.createElement("a");
    link.download = `${fontName}.css`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [fontName, icons]);

  const handleDownloadHtml = useCallback(() => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <title>${fontName} Preview</title>
  <style>
    @font-face {
      font-family: '${fontName}';
      src: local('${fontName}');
    }
    .icon { font-family: '${fontName}'; font-size: 32px; margin: 10px; }
    .grid { display: flex; flex-wrap: wrap; }
    .item { text-align: center; margin: 20px; }
  </style>
</head>
<body>
  <h1>${fontName}</h1>
  <div class="grid">
`;

    icons.forEach(icon => {
      html += `    <div class="item">
      <div class="icon">&#x${icon.unicode};</div>
      <div>${icon.name}</div>
      <div>\\${icon.unicode}</div>
    </div>
`;
    });

    html += `  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");
    link.download = `${fontName}-preview.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [fontName, icons]);

  const handleCopyUsage = useCallback(() => {
    const usage = `<!-- HTML Usage -->
<span class="${fontName} ${fontName}-${icons[0]?.name}"></span>

/* CSS Usage */
.${fontName}-${icons[0]?.name}::before {
  content: "\\${icons[0]?.unicode}";
}

/* Unicode: \\${icons[0]?.unicode} */`;

    navigator.clipboard.writeText(usage);
  }, [fontName, icons]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-5 h-5" />
            Icon Font Generator from SVG
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fontName">Font Name</Label>
              <Input
                id="fontName"
                value={fontName}
                onChange={(e) => setFontName(e.target.value)}
                placeholder="my-icon-font"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glyphName">Glyph Name</Label>
              <Input
                id="glyphName"
                value={glyphName}
                onChange={(e) => setGlyphName(e.target.value)}
                placeholder="icon-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unicode">Unicode (Hex)</Label>
              <Input
                id="unicode"
                value={unicode}
                onChange={(e) => setUnicode(e.target.value.toUpperCase())}
                placeholder="E001"
              />
            </div>

            <div className="space-y-2">
              <Label>Actions</Label>
              <Button onClick={handleAddIcon} disabled={!svgContent.trim()} className="w-full">
                Add Icon to Font
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="svgContent">SVG Path/Content</Label>
            <Textarea
              id="svgContent"
              value={svgContent}
              onChange={(e) => setSvgContent(e.target.value)}
              placeholder="Paste SVG content here..."
              rows={6}
            />
            <Button 
              onClick={() => setSvgContent(sampleSvg)} 
              variant="outline" 
              size="sm"
            >
              Load Sample SVG
            </Button>
          </div>

          {icons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Icons in Font ({icons.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {icons.map((icon, i) => (
                    <div key={i} className="text-center p-2 border rounded">
                      <div className="w-12 h-12 mx-auto mb-1 bg-gray-100 flex items-center justify-center">
                        <div dangerouslySetInnerHTML={{ __html: icon.svg }} className="w-8 h-8" />
                      </div>
                      <p className="text-xs truncate">{icon.name}</p>
                      <p className="text-xs text-gray-500">\\{icon.unicode}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <Button onClick={handleGenerateFont} disabled={icons.length === 0}>
              <Type className="w-4 h-4 mr-2" />
              Generate Font Files
            </Button>
            <Button onClick={handleDownloadCss} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download CSS
            </Button>
            <Button onClick={handleDownloadHtml} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download Preview
            </Button>
            <Button onClick={handleCopyUsage} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Usage
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <p className="text-sm font-semibold mb-2">Font Generation Complete!</p>
                <p className="text-sm text-gray-600">
                  Downloaded CSS file contains @font-face declaration and icon classes.
                  For actual font files (WOFF, WOFF2, TTF), use a dedicated font generation tool
                  like FontForge, IcoMoon, or Fontello with the exported SVG.
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Font Summary:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Font Name: {fontName}</li>
                  <li>• Total Icons: {icons.length}</li>
                  <li>• Unicode Range: {icons[0]?.unicode} - {icons[icons.length - 1]?.unicode}</li>
                </ul>
              </div>
            </div>
          )}

          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-semibold mb-2">How to Use:</p>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Paste or load an SVG icon</li>
              <li>Give it a name and unicode value</li>
              <li>Click "Add Icon to Font"</li>
              <li>Repeat for all icons</li>
              <li>Generate and download CSS/preview files</li>
              <li>Use a font tool to create actual font files</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconFontGeneratorFromSvg;
