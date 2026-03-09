"use client"
import { useState, useEffect, useRef, useCallback } from "react";

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
    height: 36px;
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

function safeEval(expr: string, isDeg: boolean): number | string {
  try {
    const toRad = (x: number): number => isDeg ? x * Math.PI / 180 : x;
    const fromRad = (x: number): number => isDeg ? x * 180 / Math.PI : x;

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

    e = e.replace(/(\d)\s*\(/g, "$1*(");

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
  const s = parseFloat(val.toPrecision(15));
  return String(s);
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState("");
  const [isDeg, setIsDeg] = useState(true);
  const [is2nd, setIs2nd] = useState(false);
  const [memory, setMemory] = useState(0);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [error, setError] = useState(false);
  const [openParens, setOpenParens] = useState(0);

  useEffect(() => {
    if (!expr) { setResult("0"); setError(false); return; }
    const val = safeEval(expr, isDeg);
    if (val === "Error") {
      setError(false);
    } else {
      setResult(formatResult(val));
      setError(false);
    }
  }, [expr, isDeg]);

  const addToExpr = useCallback((token: string) => {
    setExpr(prev => {
      if (justEvaluated) {
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

  const handleFactorial = () => {
    const val = expr ? safeEval(expr, isDeg) : parseFloat(result);
    const n = typeof val === "string" ? parseFloat(val) : val;
    const r = factorial(n);
    setHistory((expr || result) + "! =");
    setResult(formatResult(r));
    setExpr("");
    setJustEvaluated(true);
  };

  const handlePower = () => handleOperator("^");

  const curVal = () => {
    if (expr) {
      const v = safeEval(expr, isDeg);
      return typeof v === "number" ? v : parseFloat(result);
    }
    return parseFloat(result) || 0;
  };

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

  const displayVal = justEvaluated ? result : (
    result !== "0" && expr === "" ? result :
      result === "0" && expr === "" ? "0" :
        expr ? (error ? "Error" : result) : result
  );
  const displayExpr = justEvaluated ? "" : expr;

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

  const loadExample = (exampleExpr: string) => {
    setExpr(exampleExpr);
    setResult("0");
    setHistory("");
    setJustEvaluated(false);
    setError(false);
  };

  return (
    <>
      <style>{CALC_STYLE}</style>
      <div className="calc-wrap flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Free Online Scientific Calculator – Advanced Math Functions</h1>
          <p className="text-muted-foreground">
            Perform complex scientific calculations online with our free scientific calculator. Supports trigonometry, logarithms, exponents, roots, and more – ideal for students and professionals.
          </p>
        </div>

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

            {/* 0 . = */}
            <div className="btn-row" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
              <Btn label="0" wide onClick={() => handleDigit("0")} />
              <Btn label="." onClick={() => handleDigit(".")} />
              <Btn label="=" variant="btn-eq" onClick={handleEquals} />
            </div>
          </div>
        </div>

        {/* Example buttons */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground self-center">Load Example:</span>
          <button
            className="px-3 py-1.5 text-sm border rounded hover:bg-muted transition-colors"
            onClick={() => loadExample("sin(30) + cos(60)")}
          >
            Trig Example
          </button>
          <button
            className="px-3 py-1.5 text-sm border rounded hover:bg-muted transition-colors"
            onClick={() => loadExample("log(100) + ln(e)")}
          >
            Log Example
          </button>
          <button
            className="px-3 py-1.5 text-sm border rounded hover:bg-muted transition-colors"
            onClick={() => loadExample("√(144) + ∛(27)")}
          >
            Roots Example
          </button>
          <button
            className="px-3 py-1.5 text-sm border rounded hover:bg-muted transition-colors"
            onClick={() => loadExample("2^10 + 5!")}
          >
            Power/Factorial
          </button>
          <button
            className="px-3 py-1.5 text-sm border rounded hover:bg-muted transition-colors"
            onClick={() => loadExample("(3+4) × (5-2)")}
          >
            Parentheses
          </button>
          <button
            className="px-3 py-1.5 text-sm border rounded hover:bg-muted transition-colors"
            onClick={() => loadExample("sinh(1) + cosh(1)")}
          >
            Hyperbolic
          </button>
        </div>

        {/* SEO Content */}
        <section className="border-t pt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Understanding Scientific Calculators</h2>
            <p className="text-muted-foreground">
              A scientific calculator handles far more than basic arithmetic. It computes trigonometric functions like sine, cosine, and tangent for any angle. It calculates logarithms in base 10, base 2, and natural log (base e). It handles exponents, roots, and factorials. Engineers, scientists, and students rely on these tools daily because they turn complex math into simple button presses.
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">
              This calculator works in both degrees and radians. Switch between them with the DEG/RAD toggle. Degrees feel natural for geometry – a right angle is 90°. Radians connect directly to the unit circle – a right angle is π/2 radians. Calculus and higher math almost always use radians.
            </p>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">How to Use This Calculator</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Basic Operations</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Type numbers and operators just like writing on paper. The display shows your expression as you build it. Press equals to see the result.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                12 + 34 × 5 = 182
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Functions</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Press a function button like sin, then type the argument, then close the parenthesis. The calculator evaluates the function when you press equals.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                sin(30) = 0.5 (in degrees)
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Memory Functions</h4>
              <p className="text-sm text-muted-foreground mb-2">
                MS stores the current value. MR recalls it. M+ adds to memory. M− subtracts from memory. MC clears memory completely.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                50 MS, 30 M+, MR shows 80
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Second Functions</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Press 2nd to access inverse functions. sin becomes sin⁻¹ (arcsin). √ becomes ∛. log becomes log₂. Press 2nd again to return to normal.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                2nd, sin, 0.5, ) = 30°
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Worked Examples</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 1: Right Triangle Side Length</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Find the hypotenuse of a right triangle with legs 3 and 4 using the Pythagorean theorem.
              </p>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>Expression: √(3² + 4²)</div>
                <div>Calculation: √(9 + 16) = √25</div>
                <div>Result: 5</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 2: Compound Interest</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Calculate $1000 growing at 5% annual interest for 10 years: A = P(1 + r)^t
              </p>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>Expression: 1000 × (1.05)^10</div>
                <div>Calculation: 1000 × 1.62889...</div>
                <div>Result: $1,628.89</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 3: Trigonometric Identity</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Verify sin²(45°) + cos²(45°) = 1
              </p>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>Expression: sin(45)² + cos(45)²</div>
                <div>Calculation: (0.7071...)² + (0.7071...)²</div>
                <div>Result: 1 (exact)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 4: Logarithm Calculation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Find log₂(1024) – how many times do you multiply 2 to get 1024?
              </p>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>Expression: log₂(1024)</div>
                <div>Press: 2nd, log, 1024, )</div>
                <div>Result: 10 (because 2¹⁰ = 1024)</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 5: Factorial Probability</h4>
              <p className="text-sm text-muted-foreground mb-2">
                How many ways can you arrange 5 books on a shelf? Calculate 5!
              </p>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>Expression: 5!</div>
                <div>Calculation: 5 × 4 × 3 × 2 × 1</div>
                <div>Result: 120 arrangements</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Example 6: Hyperbolic Functions</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Calculate cosh(1) – the hyperbolic cosine appears in catenary curves (hanging cables).
              </p>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>Expression: cosh(1)</div>
                <div>Calculation: (e¹ + e⁻¹) / 2</div>
                <div>Result: 1.5430806...</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The first handheld scientific calculator was the HP-35, introduced in 1972. It cost $395 (about $2,800 today) and could compute any scientific function in seconds – tasks that previously required bulky slide rules or tables. Engineers lined up around the block to buy one. Within a decade, slide rules were obsolete.
            </p>
          </div>
        </section>

        <section className="border-t pt-8 space-y-6">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">What's the difference between DEG and RAD mode?</h4>
              <p className="text-sm text-muted-foreground">
                DEG mode measures angles in degrees (360° in a circle). RAD mode uses radians (2π radians in a circle). Use DEG for geometry and navigation. Use RAD for calculus, physics, and anything involving circular motion or waves.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Why does sin(30) give different answers sometimes?</h4>
              <p className="text-sm text-muted-foreground">
                Check your angle mode. In DEG mode, sin(30) = 0.5. In RAD mode, sin(30) = -0.988... because 30 radians is about 1719°, which lands in a different quadrant. Always verify your mode before trig calculations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">What does the "2nd" button do?</h4>
              <p className="text-sm text-muted-foreground">
                The 2nd button accesses inverse and alternate functions. sin becomes arcsin (sin⁻¹), which finds the angle from a ratio. √ becomes cube root (∛). log becomes log base 2. It's like having two calculators in one.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">How accurate is this calculator?</h4>
              <p className="text-sm text-muted-foreground">
                Results use JavaScript's double-precision floating point, giving about 15-17 significant digits. That's enough for virtually all engineering and scientific work. For extreme precision (100+ digits), you'd need specialized software.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Can I chain multiple operations?</h4>
              <p className="text-sm text-muted-foreground">
                Yes. Type the full expression like you'd write it: 2 + 3 × sin(45) − √(16). The calculator respects order of operations – parentheses first, then exponents, then multiplication/div