"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Fonts & Base Styles ──────────────────────────────────────────────────────
const CALC_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  .calc-wrap {
    --calc-bg:       #0d0d0f;
    --calc-surface:  #16161a;
    --calc-surface2: #1e1e24;
    --calc-border:   #2a2a35;
    --calc-accent:   #00e5a0;
    --calc-accent2:  #7c5cfc;
    --calc-warn:     #ff6b6b;
    --calc-text:     #f0f0f5;
    --calc-muted:    #6b6b80;
    --calc-btn-num:  #1a1a20;
    --calc-btn-op:   #1e1a2e;
    --calc-btn-fn:   #131820;
    --calc-btn-eq:   #00e5a0;
    --calc-glow:     0 0 20px rgba(0,229,160,0.15);
    --calc-shadow:   0 8px 32px rgba(0,0,0,0.5);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 20px;
  }

  .calc-wrap *, .calc-wrap *::before, .calc-wrap *::after {
    box-sizing: border-box;
  }

  .calc-wrap .calc {
    width: 420px;
    background: var(--calc-surface);
    border-radius: 24px;
    border: 1px solid var(--calc-border);
    box-shadow: var(--calc-shadow), inset 0 1px 0 rgba(255,255,255,0.05);
    overflow: hidden;
    position: relative;
  }

  .calc-wrap .calc::before {
    content: '';
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 200px; height: 2px;
    background: linear-gradient(90deg, transparent, var(--calc-accent), transparent);
    border-radius: 0 0 4px 4px;
  }

  /* ── Header ── */
  .calc-wrap .calc-header {
    padding: 16px 20px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--calc-border);
  }
  .calc-wrap .calc-title {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--calc-accent);
    text-transform: uppercase;
  }
  .calc-wrap .mode-pills {
    display: flex;
    gap: 4px;
    background: var(--calc-bg);
    padding: 3px;
    border-radius: 8px;
  }
  .calc-wrap .mode-pill {
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    transition: all 0.15s;
    color: var(--calc-muted);
    background: transparent;
  }
  .calc-wrap .mode-pill.active {
    background: var(--calc-accent);
    color: #000;
  }

  /* ── Display ── */
  .calc-wrap .display {
    padding: 16px 20px 12px;
    background: var(--calc-bg);
    border-bottom: 1px solid var(--calc-border);
    min-height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
  }
  .calc-wrap .display-history {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--calc-muted);
    text-align: right;
    min-height: 18px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .calc-wrap .display-expr {
    font-family: 'Space Mono', monospace;
    font-size: 15px;
    color: var(--calc-muted);
    text-align: right;
    min-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
  }
  .calc-wrap .display-main {
    font-family: 'Space Mono', monospace;
    font-size: 36px;
    font-weight: 700;
    color: var(--calc-text);
    text-align: right;
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.15s;
  }
  .calc-wrap .display-main.error { color: var(--calc-warn); font-size: 22px; }
  .calc-wrap .display-cursor {
    display: inline-block;
    width: 2px; height: 1em;
    background: var(--calc-accent);
    margin-left: 2px;
    vertical-align: middle;
    animation: calc-blink 1s step-end infinite;
  }
  @keyframes calc-blink { 50% { opacity: 0; } }
  .calc-wrap .memory-badge {
    position: absolute;
    top: 12px; left: 20px;
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    color: var(--calc-accent2);
    background: rgba(124,92,252,0.15);
    border: 1px solid rgba(124,92,252,0.3);
    padding: 2px 7px;
    border-radius: 4px;
  }

  /* ── Buttons ── */
  .calc-wrap .btn-grid {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .calc-wrap .btn-row {
    display: grid;
    gap: 6px;
  }

  .calc-wrap .btn {
    height: 52px;
    border-radius: 12px;
    border: 1px solid var(--calc-border);
    cursor: pointer;
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    transition: all 0.1s;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1px;
    color: var(--calc-text);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .calc-wrap .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    background: rgba(255,255,255,0.08);
    transition: opacity 0.1s;
  }
  .calc-wrap .btn:hover::after { opacity: 1; }
  .calc-wrap .btn:active { transform: scale(0.94); }
  .calc-wrap .btn:active::after { opacity: 0.15; }

  .calc-wrap .btn-sub {
    font-size: 9px;
    font-family: 'DM Sans', sans-serif;
    color: var(--calc-muted);
    font-weight: 400;
    line-height: 1;
  }

  /* variants */
  .calc-wrap .btn-num  { background: var(--calc-btn-num); }
  .calc-wrap .btn-op   { background: var(--calc-btn-op); color: var(--calc-accent2); border-color: rgba(124,92,252,0.2); }
  .calc-wrap .btn-fn   { background: var(--calc-btn-fn); color: #9be0ff; border-color: rgba(155,224,255,0.12); }
  .calc-wrap .btn-fn2  { background: var(--calc-btn-fn); color: #ffb86c; border-color: rgba(255,184,108,0.15); }
  .calc-wrap .btn-mem  { background: var(--calc-btn-fn); color: var(--calc-muted); font-size: 11px; }
  .calc-wrap .btn-util { background: var(--calc-surface2); color: var(--calc-muted); }
  .calc-wrap .btn-clear { background: rgba(255,107,107,0.1); color: var(--calc-warn); border-color: rgba(255,107,107,0.2); }
  .calc-wrap .btn-eq {
    background: var(--calc-accent);
    color: #000;
    border-color: var(--calc-accent);
    box-shadow: 0 4px 16px rgba(0,229,160,0.25);
    font-size: 20px;
  }
  .calc-wrap .btn-eq:hover::after { opacity: 0.2; }
  .calc-wrap .btn-zero { grid-column: span 2; }
  .calc-wrap .btn-2nd-active { background: rgba(255,184,108,0.1); color: #ffb86c; border-color: rgba(255,184,108,0.3); }

  /* press ripple */
  .calc-wrap .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: calc-ripple-anim 0.4s linear;
    background: rgba(255,255,255,0.12);
    pointer-events: none;
  }
  @keyframes calc-ripple-anim {
    to { transform: scale(4); opacity: 0; }
  }

  /* scrollbar — scoped to the calculator only */
  .calc-wrap ::-webkit-scrollbar { display: none; }
`;

// ── Math Engine ──────────────────────────────────────────────────────────────

// Simpler, safer evaluator using function-based approach
function safeEval(expr: string, isDeg: boolean): number | string {
  try {
    // Degree/radian conversion helpers
    const toRad = (x: number): number => isDeg ? x * Math.PI / 180 : x;
    const fromRad = (x: number): number => isDeg ? x * 180 / Math.PI : x;

    // Degree-aware trig functions
    const __sin__ = (x: number): number => Math.sin(toRad(x));
    const __cos__ = (x: number): number => Math.cos(toRad(x));
    const __tan__ = (x: number): number => Math.tan(toRad(x));
    const __asin__ = (x: number): number => fromRad(Math.asin(x));
    const __acos__ = (x: number): number => fromRad(Math.acos(x));
    const __atan__ = (x: number): number => fromRad(Math.atan(x));
    const __sinh__ = (x: number): number => Math.sinh(x);
    const __cosh__ = (x: number): number => Math.cosh(x);
    const __tanh__ = (x: number): number => Math.tanh(x);

    let e = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/π/g, "(Math.PI)")
      .replace(/\be\b/g, "(Math.E)")
      .replace(/sin⁻¹\(/g, "__asin__(")
      .replace(/cos⁻¹\(/g, "__acos__(")
      .replace(/tan⁻¹\(/g, "__atan__(")
      .replace(/sinh\(/g, "__sinh__(")
      .replace(/cosh\(/g, "__cosh__(")
      .replace(/tanh\(/g, "__tanh__(")
      .replace(/sin\(/g, "__sin__(")
      .replace(/cos\(/g, "__cos__(")
      .replace(/tan\(/g, "__tan__(")
      .replace(/log₂\(/g, "(Math.log2(")
      .replace(/log\(/g, "(Math.log10(")
      .replace(/ln\(/g, "(Math.log(")
      .replace(/√\(/g, "(Math.sqrt(")
      .replace(/∛\(/g, "(Math.cbrt(")
      .replace(/abs\(/g, "(Math.abs(")
      .replace(/\^/g, "**");

    // Handle implicit multiplication: 2π → 2*(Math.PI), 2(3) → 2*(3)
    e = e.replace(/(\d)\s*\(/g, "$1*(");

    // Create function with helpers in scope
    // eslint-disable-next-line no-new-func
    const result = Function(
      "__sin__", "__cos__", "__tan__",
      "__asin__", "__acos__", "__atan__",
      "__sinh__", "__cosh__", "__tanh__",
      `"use strict"; return (${e})`
    )(
      __sin__, __cos__, __tan__,
      __asin__, __acos__, __atan__,
      __sinh__, __cosh__, __tanh__
    ) as number;
    if (!isFinite(result)) return "Infinity";
    if (isNaN(result)) return "Error";
    return result;
  } catch {
    return "Error";
  }
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function formatResult(val: number | string): string {
  if (typeof val === "string") return val;
  if (!isFinite(val)) return val > 0 ? "∞" : "-∞";
  if (isNaN(val)) return "Error";
  // Avoid floating point ugliness
  const s = parseFloat(val.toPrecision(12));
  return String(s);
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");           // expression being built
  const [result, setResult] = useState("0");      // live preview result
  const [history, setHistory] = useState("");     // last completed expression
  const [isDeg, setIsDeg] = useState(true);
  const [is2nd, setIs2nd] = useState(false);
  const [memory, setMemory] = useState(0);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [error, setError] = useState(false);
  const [openParens, setOpenParens] = useState(0); // track unmatched (

  // Live preview
  useEffect(() => {
    if (!expr) { setResult("0"); setError(false); return; }
    const val = safeEval(expr, isDeg);
    if (val === "Error") {
      setError(false); // don't show red until equals is pressed
    } else {
      setResult(formatResult(val));
      setError(false);
    }
  }, [expr, isDeg]);

  const addToExpr = useCallback((token: string) => {
    setExpr(prev => {
      if (justEvaluated) {
        // If last action was '=', start fresh unless it's an operator
        const isOp = ["+", "−", "×", "÷", "^"].includes(token);
        const newExpr = isOp ? result + token : token;
        setJustEvaluated(false);
        return newExpr;
      }
      return prev + token;
    });
  }, [justEvaluated, result]);

  const handleDigit = (d: string): void => {
    setJustEvaluated(false);
    setExpr(prev => {
      if (justEvaluated && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(d)) {
        return result + d;
      }
      if (justEvaluated) { setJustEvaluated(false); return d; }
      return prev + d;
    });
  };

  const handleOperator = (op: string): void => {
    if (expr === "" && result !== "0") {
      setExpr(result + op);
      setJustEvaluated(false);
      return;
    }
    // Replace last operator if expr ends with one
    setExpr(prev => {
      const ops = ["+", "−", "×", "÷"];
      if (prev.length > 0 && ops.includes(prev[prev.length - 1])) {
        return prev.slice(0, -1) + op;
      }
      if (justEvaluated) { setJustEvaluated(false); return result + op; }
      return prev + op;
    });
    setJustEvaluated(false);
  };

  const handleFunction = (fn: string): void => {
    // Functions append "fn(" so user types argument then closes
    setJustEvaluated(false);
    setExpr(prev => {
      if (justEvaluated) return fn + "(";
      return prev + fn + "(";
    });
    setOpenParens(p => p + 1);
  };

  const handleEquals = () => {
    const evalExpr = expr || result;
    if (!evalExpr) return;
    const val = safeEval(evalExpr, isDeg);
    const isErr = val === "Error";
    setHistory(evalExpr + " =");
    setResult(isErr ? "Error" : formatResult(val));
    setError(isErr);
    setExpr("");
    setJustEvaluated(true);
    setOpenParens(0);
  };

  const handleClear = () => {
    setExpr(""); setResult("0"); setHistory(""); setError(false);
    setJustEvaluated(false); setOpenParens(0);
  };

  const handleBackspace = () => {
    if (justEvaluated) { setExpr(""); setResult("0"); setJustEvaluated(false); return; }
    setExpr(prev => {
      if (!prev) return prev;
      // Remove multi-char tokens
      const multiTokens = ["sin⁻¹(", "cos⁻¹(", "tan⁻¹(", "sinh(", "cosh(", "tanh(", "sin(", "cos(", "tan(", "log₂(", "log(", "ln(", "√(", "∛(", "abs("];
      for (const t of multiTokens) {
        if (prev.endsWith(t)) {
          setOpenParens(p => Math.max(0, p - 1));
          return prev.slice(0, -t.length);
        }
      }
      const lastChar = prev[prev.length - 1];
      if (lastChar === "(") setOpenParens(p => Math.max(0, p - 1));
      if (lastChar === ")") setOpenParens(p => p + 1);
      return prev.slice(0, -1);
    });
  };

  const handleParen = () => {
    if (openParens > 0) {
      setExpr(prev => prev + ")");
      setOpenParens(p => p - 1);
    } else {
      setExpr(prev => prev + "(");
      setOpenParens(p => p + 1);
    }
  };

  const handlePercent = () => {
    // Convert last number in expr to percentage
    setExpr(prev => {
      const num = parseFloat(prev);
      if (!isNaN(num) && String(num) === prev) return String(num / 100);
      return prev + "/100";
    });
  };

  const handleToggleSign = () => {
    setExpr(prev => {
      if (!prev) return "-";
      if (prev.startsWith("-")) return prev.slice(1);
      return "(-" + prev + ")";
    });
  };

  const handleConstant = (c: string): void => {
    setJustEvaluated(false);
    setExpr(prev => {
      if (justEvaluated) return c;
      return prev + c;
    });
  };

  // Factorial: apply to current expression result
  const handleFactorial = () => {
    const val = expr ? safeEval(expr, isDeg) : parseFloat(result);
    const n = typeof val === "string" ? parseFloat(val) : val;
    const r = factorial(n);
    setHistory((expr || result) + "! =");
    setResult(formatResult(r));
    setExpr("");
    setJustEvaluated(true);
  };

  // Power of y
  const handlePower = () => handleOperator("^");

  // Memory
  const curVal = () => {
    if (expr) {
      const v = safeEval(expr, isDeg);
      return typeof v === "number" ? v : parseFloat(result);
    }
    return parseFloat(result) || 0;
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLElement && e.target.tagName === "INPUT") return;
      const k = e.key;
      if (k >= "0" && k <= "9") { e.preventDefault(); handleDigit(k); }
      else if (k === ".") { e.preventDefault(); handleDigit("."); }
      else if (k === "+") { e.preventDefault(); handleOperator("+"); }
      else if (k === "-") { e.preventDefault(); handleOperator("−"); }
      else if (k === "*") { e.preventDefault(); handleOperator("×"); }
      else if (k === "/") { e.preventDefault(); handleOperator("÷"); }
      else if (k === "^") { e.preventDefault(); handleOperator("^"); }
      else if (k === "(") { e.preventDefault(); setExpr(p => p + "("); setOpenParens(p => p + 1); }
      else if (k === ")") { e.preventDefault(); setExpr(p => p + ")"); setOpenParens(p => Math.max(0, p - 1)); }
      else if (k === "Enter" || k === "=") { e.preventDefault(); handleEquals(); }
      else if (k === "Backspace") { e.preventDefault(); handleBackspace(); }
      else if (k === "Escape") { e.preventDefault(); handleClear(); }
      else if (k === "%") { e.preventDefault(); handlePercent(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Ripple effect
  const ripple = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");
    btn.querySelector(".ripple")?.remove();
    btn.appendChild(circle);
  };

  // Display value
  const displayVal = justEvaluated ? result : (
    result !== "0" && expr === "" ? result :
      result === "0" && expr === "" ? "0" :
        expr ? (error ? "Error" : result) : result
  );
  const displayExpr = justEvaluated ? "" : expr;

  // ── Render ──
  interface BtnProps {
    label: string;
    sub?: string;
    variant?: string;
    onClick: () => void;
    wide?: boolean;
    style?: React.CSSProperties;
  }

  const Btn = ({ label, sub, variant = "btn-num", onClick, wide, style }: BtnProps) => (
    <button
      className={`btn ${variant} ${wide ? "btn-zero" : ""}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => { ripple(e); onClick(); }}
      style={style}
    >
      <span>{label}</span>
      {sub && <span className="btn-sub">{sub}</span>}
    </button>
  );

  const fnLabel = (primary: string, secondary: string): string => is2nd ? secondary : primary;
  const fnAct = (primary: string, secondary: string): string => is2nd ? secondary : primary;

  return (
    <>
      <style>{CALC_STYLE}</style>
      <div className="calc-wrap flex flex-col">
        <div className="calc">
          {/* Header */}
          <div className="calc-header">
            <span className="calc-title">CALC — SCI</span>
            <div className="mode-pills">
              <button className={`mode-pill ${isDeg ? "active" : ""}`} onClick={() => setIsDeg(true)}>DEG</button>
              <button className={`mode-pill ${!isDeg ? "active" : ""}`} onClick={() => setIsDeg(false)}>RAD</button>
            </div>
          </div>

          {/* Display */}
          <div className="display">
            {memory !== 0 && <span className="memory-badge">M: {formatResult(memory)}</span>}
            <div className="display-history">{history}</div>
            <div className="display-expr">
              {displayExpr}
              {openParens > 0 && <span style={{ color: "var(--accent2)" }}>{")".repeat(0)}</span>}
            </div>
            <div className={`display-main ${error ? "error" : ""}`}>
              {error ? "Error" : displayVal}
              {!justEvaluated && <span className="display-cursor" />}
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-grid">
            {/* Memory row */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              <Btn label="MC" variant="btn-mem" onClick={() => setMemory(0)} />
              <Btn label="MR" variant="btn-mem" onClick={() => { setExpr(p => p + String(memory)); setJustEvaluated(false); }} />
              <Btn label="M+" variant="btn-mem" onClick={() => setMemory(m => m + curVal())} />
              <Btn label="M−" variant="btn-mem" onClick={() => setMemory(m => m - curVal())} />
              <Btn label="MS" variant="btn-mem" onClick={() => setMemory(curVal())} />
            </div>

            {/* 2nd + trig row */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              <Btn
                label="2nd"
                variant={is2nd ? "btn-2nd-active" : "btn-util"}
                onClick={() => setIs2nd(f => !f)}
              />
              <Btn
                label={fnLabel("sin", "sin⁻¹")}
                sub={fnLabel("", "sin")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("sin", "sin⁻¹"))}
              />
              <Btn
                label={fnLabel("cos", "cos⁻¹")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("cos", "cos⁻¹"))}
              />
              <Btn
                label={fnLabel("tan", "tan⁻¹")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("tan", "tan⁻¹"))}
              />
              <Btn
                label={fnLabel("√(", "∛(")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("√", "∛"))}
              />
            </div>

            {/* Hyp + log row */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              <Btn
                label={fnLabel("sinh", "asinh")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("sinh", "asinh"))}
              />
              <Btn
                label={fnLabel("cosh", "acosh")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("cosh", "acosh"))}
              />
              <Btn
                label={fnLabel("tanh", "atanh")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("tanh", "atanh"))}
              />
              <Btn
                label={fnLabel("log", "log₂")}
                variant="btn-fn"
                onClick={() => handleFunction(fnAct("log", "log₂"))}
              />
              <Btn label="ln" variant="btn-fn" onClick={() => handleFunction("ln")} />
            </div>

            {/* Power + constants */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              <Btn label="x²" variant="btn-fn" onClick={() => { addToExpr("^2"); }} />
              <Btn label="xʸ" variant="btn-fn" onClick={() => handleOperator("^")} />
              <Btn label="n!" variant="btn-fn" onClick={handleFactorial} />
              <Btn label="π" variant="btn-fn" onClick={() => handleConstant("π")} />
              <Btn label="e" variant="btn-fn" onClick={() => handleConstant("e")} />
            </div>

            {/* Row: AC ± % ( ) ÷ */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
              <Btn label="AC" variant="btn-clear" onClick={handleClear} />
              <Btn label="±" variant="btn-util" onClick={handleToggleSign} />
              <Btn label="%" variant="btn-util" onClick={handlePercent} />
              <Btn
                label={openParens > 0 ? ")" : "("}
                sub={openParens > 0 ? `${openParens} open` : ""}
                variant="btn-util"
                onClick={handleParen}
              />
              <Btn label="÷" variant="btn-op" onClick={() => handleOperator("÷")} />
            </div>

            {/* 7 8 9 × */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              <Btn label="7" onClick={() => handleDigit("7")} />
              <Btn label="8" onClick={() => handleDigit("8")} />
              <Btn label="9" onClick={() => handleDigit("9")} />
              <Btn label="×" variant="btn-op" onClick={() => handleOperator("×")} />
            </div>

            {/* 4 5 6 − */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              <Btn label="4" onClick={() => handleDigit("4")} />
              <Btn label="5" onClick={() => handleDigit("5")} />
              <Btn label="6" onClick={() => handleDigit("6")} />
              <Btn label="−" variant="btn-op" onClick={() => handleOperator("−")} />
            </div>

            {/* 1 2 3 + */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              <Btn label="1" onClick={() => handleDigit("1")} />
              <Btn label="2" onClick={() => handleDigit("2")} />
              <Btn label="3" onClick={() => handleDigit("3")} />
              <Btn label="+" variant="btn-op" onClick={() => handleOperator("+")} />
            </div>

            {/* 0 . ⌫ = */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              <Btn label="0" wide onClick={() => handleDigit("0")} />
              <Btn label="." onClick={() => handleDigit(".")} />
              <Btn label="⌫" variant="btn-util" onClick={handleBackspace} />
              <Btn label="=" variant="btn-eq" onClick={handleEquals} />
            </div>
          </div>

          {/* Footer hint */}
          <div style={{ textAlign: "center", padding: "8px 0 14px", fontSize: "10px", fontFamily: "Space Mono, monospace", color: "var(--muted)", letterSpacing: "0.1em" }}>
            KEYBOARD SUPPORTED · {openParens > 0 ? `${openParens} UNCLOSED PAREN${openParens > 1 ? "S" : ""}` : "ALL SYSTEMS GO"}
          </div>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <Card>
            <CardHeader>
              <CardTitle>Free Online Scientific Calculator – Advanced Math Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.
              </p>
              <p className="text-sm text-muted-foreground">
                Switch between degrees and radians for trig functions. Use memory functions to store and recall values. The 2nd function toggle gives you access to inverse trig functions and additional operations.
              </p>
              <p className="text-sm text-muted-foreground">
                Engineering students, physics researchers, and anyone working with advanced math can rely on this calculator. It handles everything from basic arithmetic to complex exponential and logarithmic calculations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scientific Functions Explained</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Trigonometric Functions</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div><strong className="text-foreground">sin/cos/tan:</strong> Calculate sine, cosine, and tangent of angles</div>
                    <div><strong className="text-foreground">sin⁻¹/cos⁻¹/tan⁻¹:</strong> Inverse functions – find angle from ratio</div>
                    <div><strong className="text-foreground">DEG/RAD:</strong> Toggle between degrees and radians mode</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Logarithmic Functions</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div><strong className="text-foreground">log:</strong> Base-10 logarithm</div>
                    <div><strong className="text-foreground">ln:</strong> Natural logarithm (base e)</div>
                    <div><strong className="text-foreground">10ˣ / eˣ:</strong> Antilog – inverse of log functions</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Exponential & Powers</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div><strong className="text-foreground">x² / x³:</strong> Square and cube a number</div>
                    <div><strong className="text-foreground">x^y:</strong> Raise x to any power y</div>
                    <div><strong className="text-foreground">√ / ∛:</strong> Square root and cube root</div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Other Functions</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div><strong className="text-foreground">n!:</strong> Factorial – product of all integers up to n</div>
                    <div><strong className="text-foreground">1/x:</strong> Reciprocal of x</div>
                    <div><strong className="text-foreground">EXP:</strong> Scientific notation exponent entry</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memory Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-5 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">MS</div>
                  <div className="text-xs text-muted-foreground">Store current display value in memory</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">MR</div>
                  <div className="text-xs text-muted-foreground">Recall value from memory to display</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">M+</div>
                  <div className="text-xs text-muted-foreground">Add current value to memory</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">M−</div>
                  <div className="text-xs text-muted-foreground">Subtract current value from memory</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">MC</div>
                  <div className="text-xs text-muted-foreground">Clear memory to zero</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Scientific Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold text-sm mb-1">Find sin(30°)</div>
                  <div className="font-mono text-xs text-muted-foreground">sin(30) = 0.5</div>
                  <p className="text-xs text-muted-foreground mt-1">Make sure DEG mode is selected for degree calculations.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold text-sm mb-1">Calculate log₁₀(1000)</div>
                  <div className="font-mono text-xs text-muted-foreground">log(1000) = 3</div>
                  <p className="text-xs text-muted-foreground mt-1">10 raised to what power equals 1000? Answer: 3.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold text-sm mb-1">Compute 5 factorial</div>
                  <div className="font-mono text-xs text-muted-foreground">5! = 5 × 4 × 3 × 2 × 1 = 120</div>
                  <p className="text-xs text-muted-foreground mt-1">Factorials grow very quickly – useful in probability.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold text-sm mb-1">Square root of 144</div>
                  <div className="font-mono text-xs text-muted-foreground">√144 = 12</div>
                  <p className="text-xs text-muted-foreground mt-1">What number times itself equals 144?</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold text-sm mb-1">Calculate 2⁵</div>
                  <div className="font-mono text-xs text-muted-foreground">2 ^ 5 = 32</div>
                  <p className="text-xs text-muted-foreground mt-1">Use x^y button: enter 2, press x^y, enter 5, press =</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-semibold text-sm mb-1">Natural log of e (2.718...)</div>
                  <div className="font-mono text-xs text-muted-foreground">ln(e) = 1</div>
                  <p className="text-xs text-muted-foreground mt-1">The natural log of Euler's number e is exactly 1.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-2">What's the difference between DEG and RAD mode?</h4>
                <p className="text-xs text-muted-foreground">
                  DEG (degrees) divides a circle into 360°. RAD (radians) uses the radius – a full circle is 2π radians. Use DEG for basic geometry and navigation. Use RAD for calculus and advanced physics.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">How do I calculate cube roots?</h4>
                <p className="text-xs text-muted-foreground">
                  Press the 2nd toggle to access the cube root (∛) function, or use x^y with 1/3 as the exponent. For example, ∛27 = 3 because 3³ = 27.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">What does the EXP button do?</h4>
                <p className="text-xs text-muted-foreground">
                  EXP lets you enter numbers in scientific notation. To enter 6.02 × 10²³ (Avogadro's number), type 6.02, press EXP, then 23. The display shows it as 6.02e+23.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Can I calculate negative exponents?</h4>
                <p className="text-xs text-muted-foreground">
                  Yes. Use the ± button to make the exponent negative. For example, 2^(-3) = 1/8 = 0.125. Enter 2, press x^y, enter 3, press ±, then =
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Why am I getting unexpected trig results?</h4>
                <p className="text-xs text-muted-foreground">
                  Check your angle mode. sin(30) in DEG mode gives 0.5, but sin(30) in RAD mode gives -0.988. Make sure you're in the right mode for your problem.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Math Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Standard Calculator</p>
                  <p className="text-xs text-muted-foreground">Basic arithmetic operations</p>
                </a>
                <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Fraction Calculator</p>
                  <p className="text-xs text-muted-foreground">Work with fractions</p>
                </a>
                <a href="/math-tools/logarithm-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-semibold text-sm">Logarithm Calculator</p>
                  <p className="text-xs text-muted-foreground">Dedicated log calculations</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
