"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function HtmlEmailTemplateBuilder() {
  const [blocks, setBlocks] = useState<Array<{
    id: number;
    type: "header" | "text" | "button" | "image" | "divider" | "footer";
    content: string;
    styles: Record<string, string>;
  }>>([]);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [preview, setPreview] = useState("");

  const addBlock = (type: "header" | "text" | "button" | "image" | "divider" | "footer") => {
    const defaultContent: Record<string, string> = {
      header: "Welcome to Our Newsletter",
      text: "This is a text block. Add your content here.",
      button: "Click Here",
      image: "https://via.placeholder.com/600x200",
      divider: "",
      footer: "© 2024 Company Name. All rights reserved.",
    };
    
    const newBlock = {
      id: Date.now(),
      type,
      content: defaultContent[type] || "",
      styles: {},
    };
    
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock.id);
  };

  const updateBlock = (id: number, content: string) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedBlock === id) setSelectedBlock(null);
  };

  const moveBlock = (id: number, direction: "up" | "down") => {
    const index = blocks.findIndex((b) => b.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    ) {
      return;
    }
    
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    newBlocks[index] = newBlocks[swapIndex];
    newBlocks[swapIndex] = temp;
    setBlocks(newBlocks);
  };

  const generateHtml = () => {
    const blockHtml = blocks.map((block) => {
      switch (block.type) {
        case "header":
          return `<tr><td align="center" style="padding: 20px; background-color: #333333;"><h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">${block.content}</h1></td></tr>`;
        case "text":
          return `<tr><td align="left" style="padding: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333;">${block.content}</td></tr>`;
        case "button":
          return `<tr><td align="center" style="padding: 20px;"><a href="#" style="background-color: #007bff; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif; display: inline-block;">${block.content}</a></td></tr>`;
        case "image":
          return `<tr><td align="center" style="padding: 20px;"><img src="${block.content}" alt="" style="max-width: 100%; height: auto; border: 0;" /></td></tr>`;
        case "divider":
          return `<tr><td style="padding: 0 20px;"><hr style="border: 0; border-top: 1px solid #eeeeee;" /></td></tr>`;
        case "footer":
          return `<tr><td align="center" style="padding: 20px; background-color: #f8f8f8; font-family: Arial, sans-serif; font-size: 14px; color: #666666;">${block.content}</td></tr>`;
        default:
          return "";
      }
    }).join("\n");

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff;">
          ${blockHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  const handlePreview = () => {
    setPreview(generateHtml());
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateHtml());
  };

  const handleDownload = () => {
    const blob = new Blob([generateHtml()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-template.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">HTML Email Template Builder</h2>
        <p className="text-sm text-muted-foreground">
          Build responsive HTML email templates with drag-and-drop blocks
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Add Blocks</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["header", "text", "button", "image", "divider", "footer"] as const).map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  onClick={() => addBlock(type)}
                  className="capitalize"
                >
                  + {type}
                </Button>
              ))}
            </div>
          </Card>

          {blocks.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Blocks</h3>
              <div className="space-y-2">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className={`p-2 rounded border cursor-pointer ${
                      selectedBlock === block.id
                        ? "border-primary bg-primary/10"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedBlock(block.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="capitalize text-sm font-medium">{block.type}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(block.id, "up");
                          }}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(block.id, "down");
                          }}
                          disabled={index === blocks.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBlock(block.id);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selectedBlock !== null && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Edit Block</h3>
              {blocks
                .filter((b) => b.id === selectedBlock)
                .map((block) => (
                  <div key={block.id} className="space-y-2">
                    <Label>Content</Label>
                    {block.type === "text" ? (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className="w-full min-h-[100px] p-2 rounded-md border border-input"
                      />
                    ) : (
                      <Input
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
            </Card>
          )}

          <Card className="p-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={handlePreview} className="flex-1">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Generate HTML
              </Button>
              <Button variant="outline" onClick={handleCopy} disabled={!preview}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={!preview}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {preview ? (
              <div>
                <Label className="mb-2 block">Preview</Label>
                <iframe
                  srcDoc={preview}
                  className="w-full h-[400px] border rounded-md"
                  title="Email Preview"
                />
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Add blocks and click Generate HTML to preview
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
