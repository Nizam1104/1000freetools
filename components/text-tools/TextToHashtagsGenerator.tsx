"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function TextToHashtagsGenerator() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [activePlatform, setActivePlatform] = useState("all");

  const hashtags = useMemo(() => {
    if (!text.trim()) return [];

    const words = text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
    
    const importantWords = words.filter(word => 
      word.length > 3 && 
      !['this', 'that', 'with', 'have', 'from', 'they', 'will', 'would', 'there', 'their', 'about'].includes(word)
    );

    const unique = Array.from(new Set(importantWords));
    
    return unique.slice(0, 30).map(word => `#${word}`);
  }, [text]);

  const platformHashtags = useMemo(() => {
    const limits: Record<string, number> = {
      instagram: 2200,
      twitter: 280,
      linkedin: 300,
      tiktok: 2200
    };

    const result: Record<string, string[]> = {
      instagram: [],
      twitter: [],
      linkedin: [],
      tiktok: []
    };

    let currentLength: Record<string, number> = {
      instagram: 0,
      twitter: 0,
      linkedin: 0,
      tiktok: 0
    };

    for (const tag of hashtags) {
      (Object.keys(result) as Array<keyof typeof result>).forEach(platform => {
        const newLength = currentLength[platform] + tag.length + 1;
        if (newLength <= limits[platform]) {
          result[platform].push(tag);
          currentLength[platform] = newLength;
        }
      });
    }

    return result;
  }, [hashtags]);

  const handleCopy = (tags: string[]) => {
    navigator.clipboard.writeText(tags.join(" "));
    setCopied(true);
    toast.success("Hashtags copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopied(true);
    toast.success("All hashtags copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Label htmlFor="text-input" className="text-base font-medium block mb-2">
          Enter your text or topic
        </Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your post content, topic, or paste your caption..."
          className="min-h-[120px] font-mono text-sm"
        />
      </div>

      {hashtags.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Generated {hashtags.length} hashtags
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAll}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy All"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </div>

          <Tabs value={activePlatform} onValueChange={setActivePlatform}>
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="twitter">Twitter/X</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="border rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, i) => (
                    <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            {(Object.keys(platformHashtags) as Array<keyof typeof platformHashtags>).map((platform) => (
              <TabsContent key={platform} value={platform} className="mt-4">
                <div className="border rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {platformHashtags[platform].map((tag, i) => (
                      <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(platformHashtags[platform])}
                    >
                      <Copy className="h-4 w-4" />
                      Copy {platform.charAt(0).toUpperCase() + platform.slice(1)} Tags
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}

      {!hashtags.length && (
        <div className="text-center text-muted-foreground py-8">
          Enter some text to generate hashtags
        </div>
      )}
    </div>
  );
}
