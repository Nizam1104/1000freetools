'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Copy, Download, RotateCcw, Check, Search } from 'lucide-react'
import { toast } from 'sonner'

export default function MaterialDesignIconFinder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<'filled' | 'outlined' | 'rounded' | 'sharp'>('filled')
  const [selectedIcons, setSelectedIcons] = useState<string[]>([])
  const [downloadColor, setDownloadColor] = useState('#000000')
  const [downloadSize, setDownloadSize] = useState(24)

  const materialIcons = [
    'home', 'search', 'settings', 'account_circle', 'favorite', 'star', 'shopping_cart',
    'menu', 'close', 'add', 'remove', 'check', 'cancel', 'edit', 'delete', 'visibility',
    'visibility_off', 'lock', 'lock_open', 'email', 'phone', 'message', 'notifications',
    'person', 'people', 'place', 'location_on', 'directions', 'flight', 'hotel',
    'restaurant', 'local_cafe', 'directions_car', 'directions_walk', 'directions_bike',
    'calendar_today', 'event', 'schedule', 'access_time', 'alarm', 'timer',
    'folder', 'folder_open', 'description', 'insert_drive_file', 'attach_file',
    'cloud', 'cloud_download', 'cloud_upload', 'download', 'upload', 'file_download',
    'image', 'photo', 'picture_as_pdf', 'video_library', 'music_note', 'headset',
    'play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous', 'volume_up',
    'wifi', 'bluetooth', 'usb', 'power', 'battery_full', 'battery_std',
    'lightbulb', 'brightness_high', 'brightness_low', 'dark_mode', 'light_mode',
    'thumb_up', 'thumb_down', 'share', 'bookmark', 'bookmark_border', 'flag',
    'help', 'info', 'warning', 'error', 'report', 'bug_report', 'feedback',
    'send', 'inbox', 'drafts', 'archive', 'delete_sweep', 'clear_all',
    'refresh', 'sync', 'cached', 'update', 'history', 'restore', 'undo', 'redo',
  ]

  const filteredIcons = materialIcons.filter(icon =>
    icon.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleIcon = (icon: string) => {
    if (selectedIcons.includes(icon)) {
      setSelectedIcons(selectedIcons.filter(i => i !== icon))
    } else {
      setSelectedIcons([...selectedIcons, icon])
    }
  }

  const handleDownload = () => {
    if (selectedIcons.length === 0) {
      toast.error('Please select at least one icon')
      return
    }

    // Generate SVG for selected icons
    const svgContent = selectedIcons.map(icon => 
      `<svg xmlns="http://www.w3.org/2000/svg" width="${downloadSize}" height="${downloadSize}" viewBox="0 0 24 24" fill="${downloadColor}">
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16">${icon}</text>
</svg>`
    ).join('\n')

    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'icons.svg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${selectedIcons.length} icons`)
  }

  const handleCopyHtml = async () => {
    if (selectedIcons.length === 0) return

    const html = `<!-- Material Icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Usage -->
${selectedIcons.map(icon => `<span class="material-icons">${icon}</span>`).join('\n')}`

    try {
      await navigator.clipboard.writeText(html)
      toast.success('HTML code copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleClear = () => {
    setSelectedIcons([])
    setSearchQuery('')
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Find & Download Material Design Icons</h2>
        <p className="text-muted-foreground mt-2">
          Browse the official Material Design icon library. Filter by style and download in SVG or PNG.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label className="mb-2 block">Search Icons:</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search icons..."
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Style:</Label>
              <div className="flex gap-2">
                {['filled', 'outlined', 'rounded', 'sharp'].map((style) => (
                  <Button
                    key={style}
                    variant={selectedStyle === style ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedStyle(style as any)}
                    className="capitalize"
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredIcons.length} icons {selectedIcons.length > 0 && `(${selectedIcons.length} selected)`}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Selection
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {filteredIcons.map((icon) => (
              <button
                key={icon}
                onClick={() => toggleIcon(icon)}
                className={`
                  aspect-square flex flex-col items-center justify-center rounded-lg border-2 transition-all
                  ${selectedIcons.includes(icon)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted'}
                `}
                title={icon}
              >
                <span className="material-icons text-2xl mb-1">{icon}</span>
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">{icon}</span>
              </button>
            ))}
          </div>
        </Card>

        {selectedIcons.length > 0 && (
          <Card className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <Label className="mb-1 block">Color:</Label>
                  <Input
                    type="color"
                    value={downloadColor}
                    onChange={(e) => setDownloadColor(e.target.value)}
                    className="w-16 h-8"
                  />
                </div>
                <div>
                  <Label className="mb-1 block">Size:</Label>
                  <Input
                    type="number"
                    value={downloadSize}
                    onChange={(e) => setDownloadSize(parseInt(e.target.value) || 24)}
                    className="w-20"
                    min="16"
                    max="512"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopyHtml}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy HTML
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download {selectedIcons.length} Icons
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 bg-muted">
          <h3 className="font-semibold mb-2">Using Material Icons</h3>
          <pre className="text-xs font-mono overflow-x-auto">
{`<!-- Add to your HTML head -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Use in your HTML -->
<span class="material-icons">home</span>
<span class="material-icons-outlined">star</span>
<span class="material-icons-round">favorite</span>
<span class="material-icons-sharp">search</span>`}
          </pre>
        </Card>
      </div>

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </div>
  )
}
