"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, Search, Download } from "lucide-react"

interface IconData {
  name: string
  svg: string
  category: string
  tags: string[]
}

const ICONS: IconData[] = [
  { name: "Home", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', category: "Navigation", tags: ["house", "building", "main"] },
  { name: "User", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', category: "Users", tags: ["person", "account", "profile"] },
  { name: "Settings", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>', category: "Actions", tags: ["gear", "cog", "config"] },
  { name: "Search", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>', category: "Actions", tags: ["find", "lookup", "magnify"] },
  { name: "Heart", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>', category: "Shapes", tags: ["love", "like", "favorite"] },
  { name: "Star", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', category: "Shapes", tags: ["favorite", "rating", "bookmark"] },
  { name: "Bell", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>', category: "Actions", tags: ["notification", "alert", "alarm"] },
  { name: "Mail", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>', category: "Communication", tags: ["email", "message", "envelope"] },
  { name: "Calendar", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>', category: "Time", tags: ["date", "schedule", "event"] },
  { name: "Clock", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', category: "Time", tags: ["time", "watch", "hour"] },
  { name: "Check", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>', category: "Actions", tags: ["done", "confirm", "success"] },
  { name: "X", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>', category: "Actions", tags: ["close", "cancel", "delete"] },
  { name: "Plus", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>', category: "Actions", tags: ["add", "create", "new"] },
  { name: "Minus", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>', category: "Actions", tags: ["subtract", "remove", "reduce"] },
  { name: "Arrow Right", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>', category: "Navigation", tags: ["next", "forward", "direction"] },
  { name: "Arrow Left", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>', category: "Navigation", tags: ["previous", "back", "direction"] },
  { name: "Download", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>', category: "Actions", tags: ["save", "export", "get"] },
  { name: "Upload", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>', category: "Actions", tags: ["import", "send", "put"] },
  { name: "Trash", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>', category: "Actions", tags: ["delete", "remove", "garbage"] },
  { name: "Edit", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>', category: "Actions", tags: ["pencil", "write", "modify"] },
  { name: "Copy", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>', category: "Actions", tags: ["duplicate", "clone", "paste"] },
  { name: "Link", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>', category: "Actions", tags: ["url", "chain", "connect"] },
  { name: "External Link", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>', category: "Actions", tags: ["open", "new window", "outbound"] },
  { name: "Lock", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', category: "Security", tags: ["password", "secure", "private"] },
  { name: "Unlock", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>', category: "Security", tags: ["unlocked", "open", "public"] },
]

const CATEGORIES = ["All", ...Array.from(new Set(ICONS.map((i) => i.category)))]

export default function IconPicker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [iconSize, setIconSize] = useState(24)
  const [iconColor, setIconColor] = useState("currentColor")
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const filteredIcons = useMemo(() => {
    return ICONS.filter((icon) => {
      const matchesSearch =
        searchQuery === "" ||
        icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const getSvgWithProps = (svg: string, size: number, color: string) => {
    return svg
      .replace('width="24"', `width="${size}"`)
      .replace('height="24"', `height="${size}"`)
      .replace('stroke="currentColor"', `stroke="${color}"`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Search */}
      <section className="space-y-3">
        <Label htmlFor="icon-search" className="text-base font-medium">
          Search Icons
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="icon-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            placeholder="Search icons by name or tags..."
          />
        </div>
      </section>

      {/* Category & Options */}
      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="icon-size" className="text-sm">Icon Size</Label>
            <Input
              id="icon-size"
              type="number"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              min={12}
              max={64}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon-color" className="text-sm">Icon Color</Label>
            <Input
              id="icon-color"
              type="color"
              value={iconColor === "currentColor" ? "#000000" : iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
        </div>
      </section>

      {/* Icon Grid */}
      <section className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""} found
        </p>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {filteredIcons.map((icon) => (
            <button
              key={icon.name}
              onClick={() => setSelectedIcon(icon)}
              className={`aspect-square flex items-center justify-center hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                selectedIcon?.name === icon.name ? "bg-muted border-primary" : ""
              }`}
              title={icon.name}
              dangerouslySetInnerHTML={{
                __html: getSvgWithProps(icon.svg, 24, "currentColor"),
              }}
            />
          ))}
        </div>
      </section>

      {/* Selected Icon Details */}
      {selectedIcon && (
        <section className="space-y-4 rounded-lg border bg-background p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: getSvgWithProps(selectedIcon.svg, iconSize, iconColor),
                }}
              />
              <div>
                <h3 className="text-xl font-semibold">{selectedIcon.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedIcon.category}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-medium">SVG Code</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(getSvgWithProps(selectedIcon.svg, iconSize, iconColor), "svg")}
              >
                {copied === "svg" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy SVG
              </Button>
            </div>
            <Textarea
              value={getSvgWithProps(selectedIcon.svg, iconSize, iconColor)}
              readOnly
              className="font-mono text-sm min-h-[100px]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(selectedIcon.name.toLowerCase().replace(/\s+/g, "-"), "name")}
            >
              {copied === "name" ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              Copy Name
            </Button>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-1" />
              Download SVG
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
