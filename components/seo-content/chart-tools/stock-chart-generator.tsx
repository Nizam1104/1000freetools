import React from "react"

export default function StockChartGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter stock price data with date, open, high, low, and close values. The tool creates candlestick or line charts showing price movement over time. Volume bars can be added below.
          </p>
          <p>
            Candlestick charts show the trading range (high-low) as a vertical line, with the body showing open-close. Green/white candles indicate price increases, red/black indicate decreases.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Data format:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Date, Open, High, Low, Close, Volume
2024-01-02, 150.25, 152.50, 149.80, 151.75, 1250000
2024-01-03, 151.80, 153.20, 150.90, 152.40, 1180000</pre>
          </div>
          <p>
            Interactive tooltips show OHLC values for each day. Zoom and pan to examine different time periods. Technical indicators can be overlaid for analysis.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Stock price analysis</h3>
            <p className="text-sm text-muted-foreground">
              Track individual stock performance over time. Identify trends, support/resistance levels. Investors make informed buy/sell decisions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Portfolio performance tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor portfolio value over time. Compare against benchmarks. Investors assess strategy effectiveness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Market research reports</h3>
            <p className="text-sm text-muted-foreground">
              Include price charts in analyst reports. Visual evidence supports recommendations. Clients understand analysis better.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Trading strategy backtesting</h3>
            <p className="text-sm text-muted-foreground">
              Visualize how strategies would have performed. Entry and exit points marked on charts. Traders refine approaches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Financial education</h3>
            <p className="text-sm text-muted-foreground">
              Teach chart patterns and technical analysis. Students learn from real examples. Pattern recognition develops with practice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Earnings presentation visuals</h3>
            <p className="text-sm text-muted-foreground">
              Show stock performance in investor presentations. Context for company announcements. Shareholders see long-term value.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Adjusted prices account for splits/dividends.</strong>
              Use adjusted close for accurate return calculations. Raw prices show gaps at splits. Adjusted prices show true performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Time scale affects pattern visibility.</strong>
              Daily charts show short-term moves. Weekly/monthly show long-term trends. Choose scale matching your investment horizon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Volume confirms price moves.</strong>
              High volume moves are more significant. Low volume moves may reverse. Always consider volume with price.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Past performance doesn't guarantee future results.</strong>
              Charts show history, not predictions. Use charts for context, not crystal balls. Fundamental analysis matters too.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Add moving averages (50-day, 200-day) to identify trends. Price above moving average = uptrend. Below = downtrend.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference from line charts?</h3>
            <p className="text-sm text-muted-foreground">
              Line charts show closing prices only. Candlesticks show full OHLC range. Candlesticks reveal intraday volatility and sentiment.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I read candlestick patterns?</h3>
            <p className="text-sm text-muted-foreground">
              Long green candles = strong buying. Long red = strong selling. Small bodies = indecision. Wicks show rejected prices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What data sources work?</h3>
            <p className="text-sm text-muted-foreground">
              Yahoo Finance, Alpha Vantage, and broker exports work. Ensure OHLCV format. Free sources have delayed data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add technical indicators?</h3>
            <p className="text-sm text-muted-foreground">
              Basic indicators like moving averages can be overlaid. For advanced indicators (RSI, MACD), use dedicated charting platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle stock splits?</h3>
            <p className="text-sm text-muted-foreground">
              Use adjusted prices which account for splits automatically. Raw prices show artificial gaps. Adjusted prices show continuous performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about after-hours trading?</h3>
            <p className="text-sm text-muted-foreground">
              Standard charts show regular trading hours only. After-hours requires separate data. Most analysis focuses on regular session.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I compare multiple stocks?</h3>
            <p className="text-sm text-muted-foreground">
              Overlay multiple stocks for relative performance. Or use ratio charts. Normalized charts (starting at 100) enable fair comparison.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
