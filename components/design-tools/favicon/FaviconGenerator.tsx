"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Type, Upload } from "lucide-react";
import { toast } from "sonner";
import JSZip from "jszip";
import FaviconPreview from "./FaviconPreview";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";
import { EmojiPicker } from "@/components/utils/EmojiPicker";

import GOOGLE_FONTS from "./google-fonts.json";

import { generateFaviconBundle, FaviconBundle } from "./faviconBundler";
import { loadFont } from "@/utils/loadFonts";

// Expanded Google Fonts list - 250+ popular and aesthetically pleasing fonts for favicons

const SHAPES = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
];

export default function FaviconGeneratorComponent() {
  const [contentType, setContentType] = useState<"text" | "image" | "emoji">(
    "text",
  );
  const [text, setText] = useState("A");
  // Change imageUrl to imageFile for file upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Also maintain a URL for preview purposes
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [emoji, setEmoji] = useState("😀");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSizePercentage, setFontSizePercentage] = useState(70); // percentage-based sizing
  const [fontWeight, setFontWeight] = useState("400");
  const [shape, setShape] = useState("square");
  const [faviconBundle, setFaviconBundle] = useState<FaviconBundle | null>(
    null,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [fontLoadKey, setFontLoadKey] = useState(0); // Key to force regeneration when fonts change
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(true);

  // Color picker hooks
  const [backgroundColor, setBackgroundColor] = useColor("#000000");
  const [fontColor, setFontColor] = useColor("#FFFFFF");

  // Function to handle image file selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      // Set the file
      setImageFile(file);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      // Clean up the previous preview URL when component unmounts or image changes
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  // Calculate font size based on percentage and canvas size
  const calculateFontSize = useCallback(
    (canvasSize: number): number => {
      return Math.round((canvasSize * fontSizePercentage) / 100);
    },
    [fontSizePercentage],
  );

  // Direct favicon generation function
  const generateFavicons = useCallback(async () => {
    // Validate inputs based on content type
    if (contentType === "text" && (!text || text.trim() === "")) {
      toast.error("Please enter some text for your favicon");
      throw new Error("Text is required");
    } else if (contentType === "image" && !imageFile) {
      toast.error("Please upload an image for your favicon");
      throw new Error("Image file is required");
    } else if (contentType === "emoji" && !emoji) {
      toast.error("Please select an emoji for your favicon");
      throw new Error("Emoji is required");
    }

    try {
      setIsGenerating(true);

      // Convert image file to data URL if image content type is selected
      let imageUrlForProcessing = "";
      if (contentType === "image" && imageFile) {
        const reader = new FileReader();
        imageUrlForProcessing = await new Promise((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(reader.error);
          reader.readAsDataURL(imageFile);
        });
      }

      const bundle = await generateFaviconBundle({
        contentType,
        text: text.trim(),
        imageUrl: imageUrlForProcessing, // Use processed image URL
        emoji,
        backgroundColor: backgroundColor.hex,
        fontColor: fontColor.hex,
        fontFamily,
        fontSize: calculateFontSize(512), // Base font size on 512px canvas
        fontWeight,
        shape: shape as "square" | "circle" | "rounded",
        canvasSize: 512,
      });

      setFaviconBundle(bundle);
      return bundle;
    } catch (error) {
      console.error("Error generating favicon:", error);
      toast.error("Failed to generate favicon. Please try different settings.");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [
    contentType,
    text,
    imageFile, // Changed from imageUrl to imageFile
    emoji,
    backgroundColor.hex,
    fontColor.hex,
    fontFamily,
    fontWeight,
    shape,
    calculateFontSize,
  ]);

  // Clean up image preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  // Load Google Fonts and handle font changes
  useEffect(() => {
    const loadSelectedFont = async () => {
      setIsFontLoading(true);
      setFontLoaded(false);

      try {
        const isLoaded = await loadFont(fontFamily, GOOGLE_FONTS);

        setFontLoaded(true);
        setIsFontLoading(false);

        // Force regeneration by incrementing a key to trigger useEffect
        // This will cause the main favicon generation useEffect to run again
        setFontLoadKey((prev) => prev + 1);
      } catch (error) {
        console.error("Error loading font:", error);
        setFontLoaded(true);
        setIsFontLoading(false);
        setFontLoadKey((prev) => prev + 1);
      }
    };

    loadSelectedFont();
  }, [fontFamily]); // Depend on fontFamily to reload when it changes

  const downloadAll = async () => {
    try {
      // Generate favicons on-demand when download is clicked
      const bundle = await generateFavicons();
      if (!bundle) return;

      // Create a zip file
      const zip = new JSZip();

      // Add all favicon files to the zip
      for (const [size, dataUrl] of Object.entries(bundle)) {
        const extension = size.startsWith("png") ? "png" : "ico";
        const filename =
          size === "ico" ? "favicon.ico" : `favicon-${size}.${extension}`;

        try {
          // Convert dataUrl to binary data properly
          const response = await fetch(dataUrl);
          const blob = await response.blob();

          // Convert blob to Uint8Array for zip
          const arrayBuffer = await blob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          zip.file(filename, uint8Array);
        } catch (error) {
          console.error(`Error processing ${filename}:`, error);
          // Skip this file but continue with others
          continue;
        }
      }

      // Add README file
      const readmeContent = `# Favicon Files

These favicon files were generated using the Favicon Generator tool.

## Files Included:
- favicon.ico - Multi-size ICO file for browsers
- favicon-16.png - 16x16 pixels (Tab icons)
- favicon-32.png - 32x32 pixels (Taskbar icons)
- favicon-64.png - 64x64 pixels (High-resolution icons)
- favicon-150.png - 150x150 pixels (Windows tiles)
- favicon-180.png - 180x180 pixels (iOS touch icons)
- favicon-192.png - 192x192 pixels (Android icons)
- favicon-512.png - 512x512 pixels (High-resolution icons)

## HTML Code:
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-16.png" type="image/png">
<link rel="icon" href="/favicon-32.png" type="image/png">
<link rel="icon" href="/favicon-64.png" type="image/png">
<link rel="apple-touch-icon" href="/favicon-180.png">
<link rel="manifest" href="/sitemap.xml">
`;

      zip.file("README.txt", readmeContent);

      // Generate and download the zip file
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "favicon-files.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke the object URL after a short delay to ensure the download starts
      setTimeout(() => URL.revokeObjectURL(link.href), 100);

      toast.success("Downloaded favicon files as ZIP");
    } catch (error) {
      console.error("Error generating favicons:", error);
      toast.error("Failed to generate or download favicon files.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Favicon Generator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Create professional favicons from text. Customize colors, fonts, and
          shapes to generate perfect icons for your website.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column - Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Combined Design Controls */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Favicon Design
              </CardTitle>
              <CardDescription>
                Customize text, typography, colors, and shape
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content Type Selection */}
              <div className="space-y-2">
                <Label>Content Type</Label>
                <Tabs
                  value={contentType}
                  onValueChange={(value: string) =>
                    setContentType(value as "text" | "image" | "emoji")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="emoji">Emoji</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Text Input (shown only when text is selected) */}
              {contentType === "text" && (
                <div className="space-y-2">
                  <Label htmlFor="favicon-text">Text Content</Label>
                  <Input
                    id="favicon-text"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, 3))}
                    placeholder=""
                    maxLength={3}
                    className="text-lg font-semibold"
                  />
                  <div className="text-xs text-muted-foreground">
                    Enter 1-3 characters
                  </div>
                </div>
              )}

              {/* Image Upload (shown only when image is selected) */}
              {contentType === "image" && (
                <div className="space-y-2">
                  <Label htmlFor="favicon-image-upload">Upload Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="favicon-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-sm"
                    />
                    {imagePreviewUrl && (
                      <div className="relative w-16 h-16 border rounded overflow-hidden">
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Upload an image file (JPG, PNG, GIF, etc.)
                  </div>
                </div>
              )}

              {/* Emoji Selector (shown only when emoji is selected) */}
              {contentType === "emoji" && (
                <div className="space-y-2">
                  <Label htmlFor="favicon-emoji">Emoji</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="favicon-emoji"
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                      placeholder="Select an emoji..."
                      className="text-2xl text-center"
                      maxLength={5}
                    />
                    <EmojiPicker onEmojiSelect={setEmoji}>
                      <Button variant="outline" size="sm" type="button">
                        <span className="text-xl">{emoji}</span>
                      </Button>
                    </EmojiPicker>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Select an emoji
                  </div>
                </div>
              )}

              {/* Colors */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Colors</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="bg-color" className="text-xs">
                      Background
                    </Label>
                    <ColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                      height={100}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      {backgroundColor.hex}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-color" className="text-xs">
                      Text
                    </Label>
                    <ColorPicker
                      color={fontColor}
                      onChange={setFontColor}
                      height={100}
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      {fontColor.hex}
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Settings (shown only for text content type) */}
              {contentType === "text" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Typography</Label>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="font-family" className="text-xs">
                        Font Family
                      </Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          {GOOGLE_FONTS.map((font, index) => (
                            <SelectItem
                              key={`${font.value}-${index}`}
                              value={font.value}
                            >
                              {font.name}
                              {font.google && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs"
                                >
                                  G
                                </Badge>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="font-weight" className="text-xs">
                          Weight
                        </Label>
                        <Select
                          value={fontWeight}
                          onValueChange={setFontWeight}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100">Thin</SelectItem>
                            <SelectItem value="300">Light</SelectItem>
                            <SelectItem value="400">Normal</SelectItem>
                            <SelectItem value="500">Medium</SelectItem>
                            <SelectItem value="600">Semi Bold</SelectItem>
                            <SelectItem value="700">Bold</SelectItem>
                            <SelectItem value="900">Black</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="font-size" className="text-xs">
                          Size: {fontSizePercentage}%
                        </Label>
                        <Input
                          id="font-size"
                          type="range"
                          min="10"
                          max="150"
                          value={fontSizePercentage}
                          onChange={(e) =>
                            setFontSizePercentage(Number(e.target.value))
                          }
                          className="w-full h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Shape */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Shape</Label>
                <div className="grid grid-cols-3 gap-2">
                  {SHAPES.map((shapeOption) => (
                    <Button
                      key={shapeOption.value}
                      variant={
                        shape === shapeOption.value ? "default" : "outline"
                      }
                      onClick={() => setShape(shapeOption.value)}
                      className="h-8 text-sm"
                    >
                      {shapeOption.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview and Downloads */}
        <div className="lg:col-span-4 space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live preview of your favicon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview for different sizes */}
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">16×16</div>
                  <div className="flex justify-center items-center bg-muted/50 rounded-lg p-3">
                    <div className="border border-border rounded shadow-lg ">
                      <FaviconPreview
                        contentType={contentType}
                        text={text}
                        imageUrl={imagePreviewUrl} // Use preview URL for previews
                        emoji={emoji}
                        backgroundColor={backgroundColor.hex}
                        fontColor={fontColor.hex}
                        fontFamily={fontFamily}
                        fontSize={calculateFontSize(16)}
                        fontWeight={fontWeight}
                        shape={shape}
                        size={16}
                        isFontReady={fontLoaded && !isFontLoading}
                        isFontLoading={isFontLoading}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Tab icon</div>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">32×32</div>
                  <div className="flex justify-center items-center bg-muted/50 rounded-lg p-3">
                    <div className="border border-border rounded shadow-lg ">
                      <FaviconPreview
                        contentType={contentType}
                        text={text}
                        imageUrl={imagePreviewUrl} // Use preview URL for previews
                        emoji={emoji}
                        backgroundColor={backgroundColor.hex}
                        fontColor={fontColor.hex}
                        fontFamily={fontFamily}
                        fontSize={calculateFontSize(32)}
                        fontWeight={fontWeight}
                        shape={shape}
                        size={32}
                        isFontReady={fontLoaded && !isFontLoading}
                        isFontLoading={isFontLoading}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Taskbar</div>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-sm font-medium">64×64</div>
                  <div className="flex justify-center items-center bg-muted/50 rounded-lg p-3">
                    <div className="border border-border rounded shadow-lg ">
                      <FaviconPreview
                        contentType={contentType}
                        text={text}
                        imageUrl={imagePreviewUrl} // Use preview URL for previews
                        emoji={emoji}
                        backgroundColor={backgroundColor.hex}
                        fontColor={fontColor.hex}
                        fontFamily={fontFamily}
                        fontSize={calculateFontSize(64)}
                        fontWeight={fontWeight}
                        shape={shape}
                        size={64}
                        isFontReady={fontLoaded && !isFontLoading}
                        isFontLoading={isFontLoading}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    High resolution
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Downloads */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download
              </CardTitle>
              <CardDescription>
                Download your favicon in multiple formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={downloadAll}
                className="w-full"
                size="lg"
                disabled={isGenerating}
              >
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Download All as ZIP"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How to Use Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>
            Simple steps to create and implement your favicon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            <li>
              <strong>1. Enter your text:</strong> Add 1-3 characters that
              represent your brand
            </li>
            <li>
              <strong>2. Customize appearance:</strong> Choose colors, fonts,
              and shapes that match your brand
            </li>
            <li>
              <strong>3. Download files:</strong> Get all the necessary formats
              for different devices and browsers
            </li>
            <li>
              <strong>4. Upload to your website:</strong> Place the files in
              your website&apos;s root directory
            </li>
            <li>
              <strong>5. Add HTML code:</strong> Include the provided HTML code
              in your website&apos;s head section
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
