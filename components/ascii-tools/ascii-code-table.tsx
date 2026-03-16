"use client"

import * as React from "react"
import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Check, Search } from "lucide-react"

interface AsciiChar {
  dec: number
  hex: string
  oct: string
  bin: string
  char: string
  name: string
}

export default function AsciiCodeTable() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [copied, setCopied] = useState<string | null>(null)

  const asciiTable = useMemo<AsciiChar[]>(() => {
    const controlChars: Record<number, string> = {
      0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK", 7: "BEL",
      8: "BS", 9: "HT", 10: "LF", 11: "VT", 12: "FF", 13: "CR", 14: "SO", 15: "SI",
      16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN", 23: "ETB",
      24: "CAN", 25: "EM", 26: "SUB", 27: "ESC", 28: "FS", 29: "GS", 30: "RS", 31: "US",
      127: "DEL",
    }

    const table: AsciiChar[] = []
    for (let i = 0; i <= 127; i++) {
      const isControl = i < 32 || i === 127
      table.push({
        dec: i,
        hex: i.toString(16).toUpperCase().padStart(2, "0"),
        oct: i.toString(8).padStart(3, "0"),
        bin: i.toString(2).padStart(7, "0"),
        char: isControl ? controlChars[i] || "?" : String.fromCharCode(i),
        name: isControl ? controlChars[i] || "Control" : `Printable`,
      })
    }
    return table
  }, [])

  const filteredTable = useMemo(() => {
    if (!searchTerm) return asciiTable
    
    const term = searchTerm.toLowerCase()
    return asciiTable.filter((item) =>
      item.dec.toString().includes(term) ||
      item.hex.toLowerCase().includes(term) ||
      item.char.toLowerCase().includes(term) ||
      item.name.toLowerCase().includes(term)
    )
  }, [asciiTable, searchTerm])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Search Section */}
      <section className="space-y-3">
        <Label htmlFor="search" className="text-base font-medium">
          Search ASCII Table
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by character, decimal, hex, or name..."
            className="pl-10"
          />
        </div>
      </section>

      {/* Table Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">
            ASCII Character Table (0-127)
            {searchTerm && ` (${filteredTable.length} results)`}
          </h3>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Dec</TableHead>
                  <TableHead className="w-16">Hex</TableHead>
                  <TableHead className="w-16">Oct</TableHead>
                  <TableHead className="w-24">Binary</TableHead>
                  <TableHead className="w-20">Char</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-20">Copy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTable.map((item) => (
                  <TableRow key={item.dec}>
                    <TableCell className="font-mono">{item.dec}</TableCell>
                    <TableCell className="font-mono">{item.hex}</TableCell>
                    <TableCell className="font-mono">{item.oct}</TableCell>
                    <TableCell className="font-mono">{item.bin}</TableCell>
                    <TableCell className="font-mono font-semibold">
                      {item.dec < 32 || item.dec === 127 ? (
                        <span className="text-muted-foreground">{item.char}</span>
                      ) : (
                        item.char
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(String.fromCharCode(item.dec), `char-${item.dec}`)}
                        disabled={item.dec < 32 || item.dec === 127}
                      >
                        {copied === `char-${item.dec}` ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="space-y-2">
        <h3 className="text-base font-semibold">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="space-y-1">
            <p className="font-medium">Dec</p>
            <p className="text-muted-foreground">Decimal (base-10)</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Hex</p>
            <p className="text-muted-foreground">Hexadecimal (base-16)</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Oct</p>
            <p className="text-muted-foreground">Octal (base-8)</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium">Binary</p>
            <p className="text-muted-foreground">Binary (base-2)</p>
          </div>
        </div>
      </section>
    </div>
  )
}
