"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Download, Trash2, Upload, RefreshCw } from "lucide-react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine } from "recharts"

interface StockData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface TechnicalIndicator {
  show: boolean
  type: 'sma' | 'ema' | 'rsi' | 'macd'
  period: number
  color: string
}

export default function StockChartGenerator() {
  const [chartType, setChartType] = useState<'candlestick' | 'ohlc' | 'line'>('candlestick')
  const [dataInput, setDataInput] = useState(`2024-01-02, 100, 105, 98, 103, 1000000
2024-01-03, 103, 108, 101, 106, 1200000
2024-01-04, 106, 110, 104, 108, 900000
2024-01-05, 108, 112, 106, 110, 1100000
2024-01-08, 110, 115, 108, 112, 1300000
2024-01-09, 112, 118, 110, 115, 1500000
2024-01-10, 115, 120, 112, 118, 1400000
2024-01-11, 118, 122, 115, 120, 1200000
2024-01-12, 120, 125, 118, 122, 1100000
2024-01-15, 122, 128, 120, 125, 1600000`)
  const [symbol, setSymbol] = useState("AAPL")
  const [chartTitle, setChartTitle] = useState("Stock Price Chart")
  const [showVolume, setShowVolume] = useState(true)
  const [showSMA, setShowSMA] = useState(true)
  const [smaPeriod, setSmaPeriod] = useState(5)
  const [showEMA, setShowEMA] = useState(false)
  const [emaPeriod, setEmaPeriod] = useState(12)
  const [copied, setCopied] = useState<string | null>(null)

  const stockData = useMemo((): StockData[] => {
    const lines = dataInput.split("\n").filter((line) => line.trim())
    return lines.map((line) => {
      const parts = line.split(",").map(p => parseFloat(p.trim()) || 0)
      return {
        date: parts[0]?.toString() || "",
        open: parts[1] || 0,
        high: parts[2] || 0,
        low: parts[3] || 0,
        close: parts[4] || 0,
        volume: parts[5] || 0
      }
    }).filter((d) => d.date && d.open > 0)
  }, [dataInput])

  const smaData = useMemo(() => {
    if (!showSMA || stockData.length < smaPeriod) return []
    
    return stockData.map((d, idx) => {
      if (idx < smaPeriod - 1) return { ...d, sma: null }
      const slice = stockData.slice(idx - smaPeriod + 1, idx + 1)
      const sma = slice.reduce((sum, item) => sum + item.close, 0) / smaPeriod
      return { ...d, sma }
    })
  }, [stockData, showSMA, smaPeriod])

  const emaData = useMemo(() => {
    if (!showEMA || stockData.length < emaPeriod) return []
    
    const multiplier = 2 / (emaPeriod + 1)
    let ema = stockData.slice(0, emaPeriod).reduce((sum, d) => sum + d.close, 0) / emaPeriod
    
    return stockData.map((d, idx) => {
      if (idx < emaPeriod - 1) return { ...d, ema: null }
      ema = (d.close - ema) * multiplier + ema
      return { ...d, ema }
    })
  }, [stockData, showEMA, emaPeriod])

  const rsiData = useMemo(() => {
    const period = 14
    if (stockData.length < period + 1) return []
    
    const gains: number[] = []
    const losses: number[] = []
    
    for (let i = 1; i < stockData.length; i++) {
      const change = stockData[i].close - stockData[i - 1].close
      gains.push(Math.max(0, change))
      losses.push(Math.max(0, -change))
    }
    
    const rsiValues: (number | null)[] = []
    for (let i = 0; i < period - 1; i++) {
      rsiValues.push(null)
    }
    
    let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period
    
    for (let i = period - 1; i < gains.length; i++) {
      if (i === period - 1) {
        avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period
        avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period
      } else {
        avgGain = (avgGain * (period - 1) + gains[i]) / period
        avgLoss = (avgLoss * (period - 1) + losses[i]) / period
      }
      
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss
      const rsi = 100 - (100 / (1 + rs))
      rsiValues.push(rsi)
    }
    
    return stockData.map((d, idx) => ({ ...d, rsi: rsiValues[idx] || null }))
  }, [stockData])

  const copyToClipboard = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const downloadChart = useCallback(() => {
    alert("Download functionality would export the chart as PNG/SVG")
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setDataInput(content)
    }
    reader.readAsText(file)
  }, [])

  const fetchSampleData = useCallback(() => {
    const basePrice = 100 + Math.random() * 50
    const volatility = 0.03
    let price = basePrice
    
    const newData: string[] = []
    const startDate = new Date(2024, 0, 2)
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      
      const change = (Math.random() - 0.5) * 2 * volatility
      const open = price
      const close = price * (1 + change)
      const high = Math.max(open, close) * (1 + Math.random() * 0.02)
      const low = Math.min(open, close) * (1 - Math.random() * 0.02)
      const volume = Math.floor(800000 + Math.random() * 1000000)
      
      newData.push(`${dateStr}, ${open.toFixed(2)}, ${high.toFixed(2)}, ${low.toFixed(2)}, ${close.toFixed(2)}, ${volume}`)
      price = close
    }
    
    setDataInput(newData.join("\n"))
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-background p-3 shadow-lg">
          <p className="font-medium mb-2">{data.date}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Open:</span>
            <span className="text-right">${data.open?.toFixed(2)}</span>
            <span className="text-muted-foreground">High:</span>
            <span className="text-right text-green-600">${data.high?.toFixed(2)}</span>
            <span className="text-muted-foreground">Low:</span>
            <span className="text-right text-red-600">${data.low?.toFixed(2)}</span>
            <span className="text-muted-foreground">Close:</span>
            <span className="text-right">${data.close?.toFixed(2)}</span>
            <span className="text-muted-foreground">Volume:</span>
            <span className="text-right">{data.volume?.toLocaleString()}</span>
          </div>
        </div>
      )
    }
    return null
  }

  const statistics = useMemo(() => {
    if (stockData.length === 0) return null

    const closes = stockData.map(d => d.close)
    const highs = stockData.map(d => d.high)
    const lows = stockData.map(d => d.low)
    const volumes = stockData.map(d => d.volume)

    const priceChange = closes[closes.length - 1] - closes[0]
    const priceChangePercent = (priceChange / closes[0]) * 100

    return {
      current: closes[closes.length - 1].toFixed(2),
      change: priceChange.toFixed(2),
      changePercent: priceChangePercent.toFixed(2),
      high: Math.max(...highs).toFixed(2),
      low: Math.min(...lows).toFixed(2),
      avgVolume: (volumes.reduce((a, b) => a + b, 0) / volumes.length).toLocaleString(),
    }
  }, [stockData])

  // Custom candlestick rendering
  const renderCandlesticks = () => {
    return stockData.map((d, idx) => {
      const isGreen = d.close >= d.open
      const color = isGreen ? '#22c55e' : '#ef4444'
      const x = idx * (100 / stockData.length)
      const barWidth = 100 / stockData.length / 2

      return (
        <g key={idx}>
          {/* Wick */}
          <line
            x1={`${x + barWidth / 2}%`}
            y1={`${100 - (d.high / 150) * 100}%`}
            x2={`${x + barWidth / 2}%`}
            y2={`${100 - (d.low / 150) * 100}%`}
            stroke={color}
            strokeWidth={1}
          />
          {/* Body */}
          <rect
            x={`${x + barWidth * 0.2}%`}
            y={`${100 - (Math.max(d.open, d.close) / 150) * 100}%`}
            width={`${barWidth * 0.6}%`}
            height={`${Math.abs(d.close - d.open) / 150 * 100}%`}
            fill={color}
          />
        </g>
      )
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="symbol" className="text-base font-medium">Stock Chart</Label>
            <div className="flex items-center gap-2">
              <Input
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="Symbol"
                className="w-24 font-mono"
              />
              <Input
                id="chart-title"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                placeholder="Chart title"
                className="max-w-md"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchSampleData}>
              <RefreshCw className="size-4 mr-1" />
              Generate Sample
            </Button>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="size-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </section>

      {/* Data Input */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="data-input" className="text-base font-medium">
            Stock Data (Date, Open, High, Low, Close, Volume)
          </Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="ghost" size="xs" onClick={() => document.getElementById('file-upload')?.click()} className="h-7">
              <Upload className="size-3.5 mr-1" />
              <span className="text-xs">Import</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => copyToClipboard(dataInput, "input")} className="h-7">
              {copied === "input" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="xs" onClick={() => setDataInput("")} className="h-7">
              <Trash2 className="size-3.5" />
              <span className="text-xs">Clear</span>
            </Button>
          </div>
        </div>
        <Textarea
          id="data-input"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          className="font-mono text-sm min-h-[150px]"
          placeholder="2024-01-02, 100, 105, 98, 103, 1000000"
        />
      </section>

      {/* Options */}
      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chart-type" className="text-sm">Chart Type</Label>
            <Select value={chartType} onValueChange={(v) => setChartType(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candlestick">Candlestick</SelectItem>
                <SelectItem value="ohlc">OHLC Bars</SelectItem>
                <SelectItem value="line">Line</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-volume"
              checked={showVolume}
              onCheckedChange={setShowVolume}
            />
            <Label htmlFor="show-volume" className="text-sm cursor-pointer">Show Volume</Label>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-sma"
              checked={showSMA}
              onCheckedChange={setShowSMA}
            />
            <Label htmlFor="show-sma" className="text-sm cursor-pointer">SMA</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sma-period" className="text-sm">SMA Period: {smaPeriod}</Label>
            <Slider
              id="sma-period"
              value={[smaPeriod]}
              onValueChange={(v) => setSmaPeriod(v[0])}
              min={2}
              max={50}
              step={1}
              disabled={!showSMA}
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch
              id="show-ema"
              checked={showEMA}
              onCheckedChange={setShowEMA}
            />
            <Label htmlFor="show-ema" className="text-sm cursor-pointer">EMA</Label>
          </div>
        </div>

        {showEMA && (
          <div className="space-y-2">
            <Label htmlFor="ema-period" className="text-sm">EMA Period: {emaPeriod}</Label>
            <Slider
              id="ema-period"
              value={[emaPeriod]}
              onValueChange={(v) => setEmaPeriod(v[0])}
              min={2}
              max={50}
              step={1}
            />
          </div>
        )}
      </section>

      {/* Price Stats */}
      {statistics && (
        <section className="space-y-3">
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-2xl font-semibold">${statistics.current}</p>
            </div>
            <div className={`rounded-lg border bg-background p-4 ${parseFloat(statistics.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <p className="text-sm text-muted-foreground">Change</p>
              <p className="text-2xl font-semibold">
                {parseFloat(statistics.change) >= 0 ? '+' : ''}{statistics.change} ({statistics.changePercent}%)
              </p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">High</p>
              <p className="text-2xl font-semibold">${statistics.high}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Low</p>
              <p className="text-2xl font-semibold">${statistics.low}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Avg Volume</p>
              <p className="text-2xl font-semibold">{statistics.avgVolume}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-2xl font-semibold">{stockData.length}</p>
            </div>
          </div>
        </section>
      )}

      {/* Chart Preview */}
      <section className="space-y-3">
        <Label className="text-base font-medium">Chart Preview</Label>
        <div className="rounded-lg border bg-background p-6">
          <h3 className="text-lg font-semibold text-center mb-4">{chartTitle}</h3>
          <div className="h-[400px]">
            {stockData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={smaData.length > 0 ? smaData : emaData.length > 0 ? emaData : stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickFormatter={(v) => v.slice(5)}
                  />
                  <YAxis 
                    yAxisId="price"
                    domain={['auto', 'auto']}
                    tickFormatter={(v) => `$${v}`}
                  />
                  {showVolume && (
                    <YAxis 
                      yAxisId="volume"
                      orientation="right"
                      tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                    />
                  )}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {chartType === 'line' && (
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="close"
                      stroke="#0088FE"
                      strokeWidth={2}
                      dot={false}
                    />
                  )}
                  
                  {showSMA && (
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="sma"
                      stroke="#FF8042"
                      strokeWidth={2}
                      dot={false}
                      name={`SMA(${smaPeriod})`}
                    />
                  )}
                  
                  {showEMA && (
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="ema"
                      stroke="#8884D8"
                      strokeWidth={2}
                      dot={false}
                      name={`EMA(${emaPeriod})`}
                    />
                  )}
                  
                  {showVolume && (
                    <Bar
                      yAxisId="volume"
                      dataKey="volume"
                      name="Volume"
                      fill="#8884d8"
                      opacity={0.3}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Enter stock data to see the chart
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Data Table */}
      {stockData.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">OHLC Data</h3>
          <div className="rounded-lg border bg-background overflow-hidden max-h-[300px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-right font-medium">Open</th>
                  <th className="p-3 text-right font-medium">High</th>
                  <th className="p-3 text-right font-medium">Low</th>
                  <th className="p-3 text-right font-medium">Close</th>
                  <th className="p-3 text-right font-medium">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stockData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{item.date}</td>
                    <td className="p-3 text-right">${item.open.toFixed(2)}</td>
                    <td className="p-3 text-right text-green-600">${item.high.toFixed(2)}</td>
                    <td className="p-3 text-right text-red-600">${item.low.toFixed(2)}</td>
                    <td className={`p-3 text-right ${item.close >= item.open ? 'text-green-600' : 'text-red-600'}`}>
                      ${item.close.toFixed(2)}
                    </td>
                    <td className="p-3 text-right">{item.volume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
