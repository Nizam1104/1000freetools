"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Share2, Palette } from "lucide-react";

const SocialMediaIconPackGenerator: React.FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [primaryColor, setPrimaryColor] = useState("#1DA1F2");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [iconStyle, setIconStyle] = useState("filled");
  const [size, setSize] = useState(64);
  const [generated, setGenerated] = useState(false);
  const [includeNames, setIncludeNames] = useState(false);

  const platforms = [
    { id: "facebook", name: "Facebook", color: "#1877F2" },
    { id: "twitter", name: "Twitter/X", color: "#000000" },
    { id: "instagram", name: "Instagram", color: "#E4405F" },
    { id: "linkedin", name: "LinkedIn", color: "#0A66C2" },
    { id: "youtube", name: "YouTube", color: "#FF0000" },
    { id: "tiktok", name: "TikTok", color: "#000000" },
    { id: "pinterest", name: "Pinterest", color: "#E60023" },
    { id: "snapchat", name: "Snapchat", color: "#FFFC00" },
    { id: "whatsapp", name: "WhatsApp", color: "#25D366" },
    { id: "telegram", name: "Telegram", color: "#0088CC" },
    { id: "discord", name: "Discord", color: "#5865F2" },
    { id: "reddit", name: "Reddit", color: "#FF4500" },
    { id: "github", name: "GitHub", color: "#181717" },
    { id: "dribbble", name: "Dribbble", color: "#EA4C89" },
    { id: "behance", name: "Behance", color: "#1769FF" },
  ];

  const iconStyles = [
    { value: "filled", label: "Filled" },
    { value: "outline", label: "Outline" },
    { value: "rounded", label: "Rounded" },
    { value: "square", label: "Square" },
    { value: "circle", label: "Circle" },
  ];

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = useCallback(() => {
    if (selectedPlatforms.length === 0) return;
    setGenerated(true);
  }, [selectedPlatforms]);

  const handleClear = useCallback(() => {
    setSelectedPlatforms([]);
    setGenerated(false);
  }, []);

  const handleDownload = useCallback(() => {
    selectedPlatforms.forEach(platformId => {
      const platform = platforms.find(p => p.id === platformId);
      if (!platform) return;

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Background
        ctx.fillStyle = iconStyle === "outline" ? secondaryColor : primaryColor;
        
        if (iconStyle === "circle") {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (iconStyle === "rounded") {
          const radius = size * 0.2;
          ctx.beginPath();
          ctx.roundRect(0, 0, size, size, radius);
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, size, size);
        }

        // Icon placeholder (letter)
        ctx.fillStyle = iconStyle === "outline" ? primaryColor : secondaryColor;
        ctx.font = `bold ${size * 0.5}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(platform.name[0], size / 2, size / 2);
      }

      const link = document.createElement("a");
      link.download = `${platformId}-icon-${size}x${size}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }, [selectedPlatforms, primaryColor, secondaryColor, iconStyle, size]);

  const handleCopyCode = useCallback(() => {
    let html = `<div class="social-icons">\n`;
    selectedPlatforms.forEach(platformId => {
      const platform = platforms.find(p => p.id === platformId);
      if (platform) {
        html += `  <a href="#" class="social-icon ${platformId}" style="background-color: ${primaryColor}; color: ${secondaryColor};">${platform.name}</a>\n`;
      }
    });
    html += `</div>`;

    let css = `.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${size}px;
  height: ${size}px;
  border-radius: ${iconStyle === "circle" ? "50%" : iconStyle === "rounded" ? "8px" : "0"};
  background-color: ${primaryColor};
  color: ${secondaryColor};
  text-decoration: none;
  transition: opacity 0.3s;
}

.social-icon:hover {
  opacity: 0.8;
}`;

    const code = `HTML:\n${html}\n\nCSS:\n${css}`;
    navigator.clipboard.writeText(code);
  }, [selectedPlatforms, primaryColor, secondaryColor, iconStyle, size]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Social Media Icon Pack Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  className={`p-2 border-2 rounded-lg text-center transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <div
                    className="w-8 h-8 mx-auto mb-1 rounded flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name[0]}
                  </div>
                  <p className="text-xs truncate">{platform.name}</p>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {selectedPlatforms.length} platform(s) selected
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="iconStyle">Icon Style</Label>
              <select
                id="iconStyle"
                value={iconStyle}
                onChange={(e) => setIconStyle(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {iconStyles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Icon Size (px)</Label>
              <Input
                id="size"
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min={16}
                max={512}
              />
            </div>

            <div className="space-y-2">
              <Label>Include Names</Label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeNames"
                  checked={includeNames}
                  onChange={(e) => setIncludeNames(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="includeNames" className="font-normal">
                  Add platform names
                </Label>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={selectedPlatforms.length === 0}>
              <Palette className="w-4 h-4 mr-2" />
              Generate Icons
            </Button>
            <Button onClick={handleCopyCode} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy HTML/CSS
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generated Icons Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {selectedPlatforms.map((platformId) => {
                      const platform = platforms.find(p => p.id === platformId);
                      if (!platform) return null;
                      
                      return (
                        <div key={platformId} className="text-center">
                          <div
                            className={`flex items-center justify-center text-white font-bold ${
                              iconStyle === "circle" ? "rounded-full" :
                              iconStyle === "rounded" ? "rounded-lg" : ""
                            }`}
                            style={{
                              width: size,
                              height: size,
                              backgroundColor: primaryColor,
                              fontSize: size * 0.5,
                            }}
                          >
                            {platform.name[0]}
                          </div>
                          {includeNames && (
                            <p className="text-xs mt-1">{platform.name}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm font-semibold mb-2">Pack Summary:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Platforms: {selectedPlatforms.length}</li>
                  <li>• Style: {iconStyles.find(s => s.value === iconStyle)?.label}</li>
                  <li>• Size: {size}x{size}px</li>
                  <li>• Primary Color: {primaryColor}</li>
                  <li>• Secondary Color: {secondaryColor}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaIconPackGenerator;
