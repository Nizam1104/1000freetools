"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// --- BigInt Collatz ---
function computeCollatz(n: bigint): bigint[] {
  const sequence: bigint[] = [n];
  let current = n;
  while (current !== BigInt(1)) {
    if (current % BigInt(2) === BigInt(0)) {
      current = current / BigInt(2);
    } else {
      current = BigInt(3) * current + BigInt(1);
    }
    sequence.push(current);
    if (sequence.length > 1_000_000) break; // safety cap
  }
  return sequence;
}

function formatBig(n: bigint): string {
  const s = n.toString();
  if (s.length <= 15) return s;
  return s.slice(0, 6) + "…" + s.slice(-6) + ` (${s.length} digits)`;
}

// For the chart, we downsample to at most 2000 points
function toChartData(
  seq: bigint[],
): { step: number; value: number; exact: string }[] {
  const maxPoints = 2000;
  const step = Math.max(1, Math.floor(seq.length / maxPoints));
  const data: { step: number; value: number; exact: string }[] = [];
  for (let i = 0; i < seq.length; i += step) {
    const v = seq[i];
    // For chart display, clamp to Number.MAX_SAFE_INTEGER safely
    const num =
      v > BigInt(Number.MAX_SAFE_INTEGER) ? Number.MAX_SAFE_INTEGER : Number(v);
    data.push({ step: i + 1, value: num, exact: v.toString() });
  }
  // always include last
  const last = seq[seq.length - 1];
  const lastNum =
    last > BigInt(Number.MAX_SAFE_INTEGER)
      ? Number.MAX_SAFE_INTEGER
      : Number(last);
  data.push({ step: seq.length, value: lastNum, exact: last.toString() });
  return data;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="collatz-tooltip">
        <p className="tooltip-step">Step {d.step}</p>
        <p className="tooltip-val">
          {Number(d.exact).toLocaleString() === "NaN"
            ? d.exact
            : Number(d.exact) > 1e15
              ? d.exact
              : Number(d.exact).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function CollatzPage() {
  const [input, setInput] = useState("");
  const [sequence, setSequence] = useState<bigint[] | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [highlightStep, setHighlightStep] = useState<number | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    setError("");
    setSequence(null);
    setChartData([]);
    setShowAll(false);

    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please enter a number.");
      return;
    }
    if (!/^\d+$/.test(trimmed)) {
      setError("Only positive integers allowed.");
      return;
    }

    let n: bigint;
    try {
      n = BigInt(trimmed);
    } catch {
      setError("Invalid number.");
      return;
    }
    if (n < BigInt(1)) {
      setError("Enter a number greater than 0.");
      return;
    }

    setLoading(true);
    // Use setTimeout so UI can update before heavy computation
    setTimeout(() => {
      const seq = computeCollatz(n);
      setSequence(seq);
      setChartData(toChartData(seq));
      setLoading(false);
    }, 10);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  };

  const maxVal = sequence
    ? sequence.reduce((a, b) => (b > a ? b : a), BigInt(0))
    : BigInt(0);
  const maxStep = sequence ? sequence.findIndex((v) => v === maxVal) + 1 : 0;
  const stepsCount = sequence ? sequence.length : 0;

  const STEP_PREVIEW = 80;
  const stepsToShow = showAll
    ? (sequence ?? [])
    : (sequence ?? []).slice(0, STEP_PREVIEW);

  useEffect(() => {
    if (highlightStep !== null && stepsRef.current) {
      const el = stepsRef.current.querySelector(
        `[data-step="${highlightStep}"]`,
      );
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightStep]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #07080d;
          color: #e8eaf0;
          font-family: 'Space Mono', monospace;
          min-height: 100vh;
        }

        .collatz-root {
          min-height: 100vh;
          background: #07080d;
          background-image:
            radial-gradient(ellipse 80% 40% at 50% -10%, rgba(56, 189, 248, 0.07) 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.018) 80px);
          padding: 0 0 80px;
        }

        .header {
          text-align: center;
          padding: 64px 24px 48px;
          position: relative;
        }

        .header-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 16px;
          opacity: 0.85;
        }

        .header-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(36px, 7vw, 72px);
          line-height: 1;
          background: linear-gradient(135deg, #e2e8f0 0%, #38bdf8 50%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .header-sub {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #64748b;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .header-sub em {
          color: #94a3b8;
          font-style: italic;
        }

        .main-card {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* INPUT */
        .input-section {
          background: rgba(15,20,35,0.9);
          border: 1px solid rgba(56,189,248,0.15);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .input-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 14px;
          display: block;
        }

        .input-row {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }

        .number-input {
          flex: 1;
          background: rgba(7,8,13,0.9);
          border: 1px solid rgba(100,116,139,0.3);
          border-radius: 10px;
          color: #e2e8f0;
          font-family: 'Space Mono', monospace;
          font-size: 18px;
          padding: 14px 18px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          min-width: 0;
        }

        .number-input::placeholder { color: #334155; }
        .number-input:focus {
          border-color: rgba(56,189,248,0.5);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08), inset 0 0 20px rgba(56,189,248,0.03);
        }

        .calc-btn {
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border: none;
          border-radius: 10px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.08em;
          padding: 14px 28px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        .calc-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(14,165,233,0.3);
        }

        .calc-btn:active:not(:disabled) { transform: translateY(0); }
        .calc-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .error-msg {
          margin-top: 10px;
          color: #f87171;
          font-size: 12px;
          font-family: 'Space Mono', monospace;
        }

        /* QUICK PICKS */
        .quick-picks {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
          align-items: center;
        }

        .quick-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #475569;
          margin-right: 4px;
        }

        .quick-btn {
          background: rgba(30,40,60,0.7);
          border: 1px solid rgba(100,116,139,0.2);
          border-radius: 6px;
          color: #94a3b8;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          padding: 5px 12px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .quick-btn:hover {
          border-color: rgba(56,189,248,0.4);
          color: #38bdf8;
          background: rgba(56,189,248,0.06);
        }

        /* STATS */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-card {
          background: rgba(15,20,35,0.9);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 12px;
          padding: 18px 20px;
          transition: border-color 0.2s;
        }

        .stat-card:hover { border-color: rgba(56,189,248,0.3); }

        .stat-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 8px;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #38bdf8;
          word-break: break-all;
        }

        .stat-value.accent { color: #a78bfa; }
        .stat-value.warm { color: #fb923c; }

        /* CHART */
        .chart-section {
          background: rgba(15,20,35,0.9);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 16px;
          padding: 28px 24px;
          margin-bottom: 24px;
          animation: fadeUp 0.5s ease;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(100,116,139,0.15);
        }

        .chart-container {
          width: 100%;
          height: 260px;
        }

        .collatz-tooltip {
          background: rgba(7,8,13,0.95);
          border: 1px solid rgba(56,189,248,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-family: 'Space Mono', monospace;
        }

        .tooltip-step { font-size: 10px; color: #64748b; margin-bottom: 4px; }
        .tooltip-val { font-size: 13px; color: #38bdf8; word-break: break-all; max-width: 200px; }

        /* STEPS */
        .steps-section {
          background: rgba(15,20,35,0.9);
          border: 1px solid rgba(56,189,248,0.1);
          border-radius: 16px;
          padding: 28px 24px;
          animation: fadeUp 0.6s ease;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 6px;
          max-height: 480px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(56,189,248,0.2) transparent;
        }

        .steps-grid::-webkit-scrollbar { width: 4px; }
        .steps-grid::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 2px; }

        .step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 7px;
          background: rgba(7,8,13,0.6);
          border: 1px solid rgba(100,116,139,0.08);
          transition: border-color 0.15s, background 0.15s;
          cursor: default;
        }

        .step-item:hover {
          border-color: rgba(56,189,248,0.2);
          background: rgba(56,189,248,0.04);
        }

        .step-item.is-peak {
          border-color: rgba(251,146,60,0.4);
          background: rgba(251,146,60,0.06);
        }

        .step-item.is-peak .step-num { color: #fb923c; }
        .step-item.is-peak .step-val { color: #fed7aa; }

        .step-num {
          font-size: 10px;
          color: #475569;
          min-width: 32px;
          text-align: right;
          flex-shrink: 0;
        }

        .step-op {
          font-size: 11px;
          width: 14px;
          text-align: center;
          flex-shrink: 0;
        }

        .step-op.even { color: #38bdf8; }
        .step-op.odd { color: #a78bfa; }

        .step-val {
          font-size: 12px;
          color: #cbd5e1;
          word-break: break-all;
          font-family: 'Space Mono', monospace;
          flex: 1;
          min-width: 0;
        }

        .show-more-btn {
          display: block;
          width: 100%;
          margin-top: 14px;
          background: rgba(30,40,60,0.7);
          border: 1px solid rgba(100,116,139,0.2);
          border-radius: 8px;
          color: #64748b;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
        }

        .show-more-btn:hover {
          border-color: rgba(56,189,248,0.3);
          color: #38bdf8;
        }

        /* LOADING */
        .loading-state {
          text-align: center;
          padding: 60px;
          color: #38bdf8;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(56,189,248,0.1);
          border-top-color: #38bdf8;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* CONJECTURE INFO */
        .formula-bar {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          flex-wrap: wrap;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #475569;
        }

        .formula-chip {
          background: rgba(15,20,35,0.8);
          border: 1px solid rgba(100,116,139,0.15);
          border-radius: 8px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .formula-chip .rule-even { color: #38bdf8; }
        .formula-chip .rule-odd { color: #a78bfa; }

        @media (max-width: 640px) {
          .input-row { flex-direction: column; }
          .steps-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="collatz-root">
        {/* HEADER */}
        <div className="header">
          <p className="header-eyebrow">Mathematical Exploration</p>
          <h1 className="header-title">Collatz Conjecture</h1>
          <p className="header-sub">
            Pick any positive integer. If even, divide by 2. If odd, multiply by
            3 and add 1.
            <br />
            <em>Will it always reach 1? Nobody knows for certain.</em>
          </p>
          <div className="formula-bar">
            <div className="formula-chip">
              <span className="rule-even">n / 2</span>
              <span style={{ color: "#334155" }}>if n is even</span>
            </div>
            <span style={{ color: "#1e293b", fontSize: "18px" }}>·</span>
            <div className="formula-chip">
              <span className="rule-odd">3n + 1</span>
              <span style={{ color: "#334155" }}>if n is odd</span>
            </div>
          </div>
        </div>

        <div className="main-card">
          {/* INPUT */}
          <div className="input-section">
            <label className="input-label">Enter a positive integer</label>
            <div className="input-row">
              <input
                className="number-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g. 27 or 999999999999999999"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value.replace(/[^0-9]/g, ""))
                }
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                className="calc-btn"
                onClick={handleCalculate}
                disabled={loading}
              >
                {loading ? "Computing…" : "Calculate →"}
              </button>
            </div>
            {error && <p className="error-msg">⚠ {error}</p>}
            <div className="quick-picks">
              <span className="quick-label">Try:</span>
              {[
                "27",
                "871",
                "6171",
                "77031",
                "9780657631",
                "99999999999999999999",
              ].map((v) => (
                <button
                  key={v}
                  className="quick-btn"
                  onClick={() => {
                    setInput(v);
                  }}
                >
                  {v.length > 10 ? v.slice(0, 8) + "…" : v}
                </button>
              ))}
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              Computing sequence…
            </div>
          )}

          {/* RESULTS */}
          {!loading && sequence && (
            <>
              {/* STATS */}
              <div className="stats-row">
                <div className="stat-card">
                  <p className="stat-label">Total Steps</p>
                  <p className="stat-value">{stepsCount - 1}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Peak Value</p>
                  <p
                    className="stat-value accent"
                    style={{
                      fontSize:
                        maxVal.toString().length > 14 ? "14px" : undefined,
                    }}
                  >
                    {formatBig(maxVal)}
                  </p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Peak at Step</p>
                  <p className="stat-value warm">{maxStep}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Sequence Length</p>
                  <p className="stat-value">{stepsCount.toLocaleString()}</p>
                </div>
              </div>

              {/* CHART */}
              <div className="chart-section">
                <p className="section-title">Sequence Graph</p>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="step"
                        tick={{
                          fill: "#475569",
                          fontSize: 10,
                          fontFamily: "Space Mono",
                        }}
                        tickLine={false}
                        axisLine={{ stroke: "rgba(100,116,139,0.15)" }}
                        label={{
                          value: "Step",
                          position: "insideBottomRight",
                          offset: -4,
                          fill: "#334155",
                          fontSize: 10,
                        }}
                      />
                      <YAxis
                        tick={{
                          fill: "#475569",
                          fontSize: 10,
                          fontFamily: "Space Mono",
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) =>
                          v >= 1e12
                            ? (v / 1e12).toFixed(1) + "T"
                            : v >= 1e9
                              ? (v / 1e9).toFixed(1) + "B"
                              : v >= 1e6
                                ? (v / 1e6).toFixed(1) + "M"
                                : v >= 1e3
                                  ? (v / 1e3).toFixed(1) + "K"
                                  : String(v)
                        }
                        width={56}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine
                        y={1}
                        stroke="rgba(56,189,248,0.15)"
                        strokeDasharray="4 4"
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="url(#lineGrad)"
                        strokeWidth={1.5}
                        dot={false}
                        activeDot={{ r: 4, fill: "#38bdf8", strokeWidth: 0 }}
                      />
                      <defs>
                        <linearGradient
                          id="lineGrad"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="50%" stopColor="#a78bfa" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {sequence.length > 2000 && (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "10px",
                      color: "#334155",
                      marginTop: "10px",
                      fontFamily: "Space Mono",
                    }}
                  >
                    Chart shows ~2000 sampled points from{" "}
                    {sequence.length.toLocaleString()} total steps
                  </p>
                )}
              </div>

              {/* STEPS */}
              <div className="steps-section">
                <p className="section-title">Step-by-Step Sequence</p>
                <div className="steps-grid" ref={stepsRef}>
                  {stepsToShow.map((val, i) => {
                    const isPeak = val === maxVal;
                    const op =
                      i === 0
                        ? null
                        : stepsToShow[i - 1] % BigInt(2) === BigInt(0)
                          ? "÷2"
                          : "×3+1";
                    return (
                      <div
                        key={i}
                        className={`step-item${isPeak ? " is-peak" : ""}`}
                        data-step={i + 1}
                        title={val.toString()}
                      >
                        <span className="step-num">#{i + 1}</span>
                        {op && (
                          <span
                            className={`step-op ${stepsToShow[i - 1] % BigInt(2) === BigInt(0) ? "even" : "odd"}`}
                          >
                            {stepsToShow[i - 1] % BigInt(2) === BigInt(0)
                              ? "÷"
                              : "*"}
                          </span>
                        )}
                        {!op && <span className="step-op" />}
                        <span className="step-val">
                          {formatBig(val)}
                          {isPeak && (
                            <span
                              style={{
                                marginLeft: 4,
                                fontSize: 9,
                                color: "#fb923c",
                              }}
                            >
                              ↑ peak
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {!showAll && sequence.length > STEP_PREVIEW && (
                  <button
                    className="show-more-btn"
                    onClick={() => setShowAll(true)}
                  >
                    Show all {sequence.length.toLocaleString()} steps ↓
                  </button>
                )}
                {showAll && sequence.length > STEP_PREVIEW && (
                  <button
                    className="show-more-btn"
                    onClick={() => setShowAll(false)}
                  >
                    Collapse ↑
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
