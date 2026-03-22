"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
type SpeciesKey = "ecoli" | "staph" | "bacillus" | "streptococcus";
type EnvironmentKey = "optimal" | "warm" | "cool" | "acidic";
type PhaseKey = "lag" | "exponential" | "stationary" | "decline";
type ShapeType = "rod" | "coccus" | "chain";

interface SpeciesConfig {
  label: string;
  color: string;
  glowColor: string;
  doublingTime: number;
  maxPop: number;
  shape: ShapeType;
  description: string;
}

interface EnvironmentConfig {
  label: string;
  multiplier: number;
  icon: string;
}

interface ChartPoint {
  time: number;
  population: number;
  nutrients: number;
}

// ─── Species & Environment configs ───────────────────────────────────────────
const SPECIES: Record<SpeciesKey, SpeciesConfig> = {
  ecoli: {
    label: "E. coli",
    color: "#00ff88",
    glowColor: "rgba(0,255,136,0.6)",
    doublingTime: 20,
    maxPop: 800,
    shape: "rod",
    description: "Fast-dividing gram-negative rod",
  },
  staph: {
    label: "S. aureus",
    color: "#ffbb00",
    glowColor: "rgba(255,187,0,0.6)",
    doublingTime: 30,
    maxPop: 600,
    shape: "coccus",
    description: "Spherical clusters, gram-positive",
  },
  bacillus: {
    label: "B. subtilis",
    color: "#00aaff",
    glowColor: "rgba(0,170,255,0.6)",
    doublingTime: 45,
    maxPop: 500,
    shape: "rod",
    description: "Spore-forming rod bacterium",
  },
  streptococcus: {
    label: "Streptococcus",
    color: "#ff6699",
    glowColor: "rgba(255,102,153,0.6)",
    doublingTime: 25,
    maxPop: 700,
    shape: "chain",
    description: "Chain-forming spherical bacteria",
  },
};

const ENVIRONMENTS: Record<EnvironmentKey, EnvironmentConfig> = {
  optimal: { label: "Optimal (37°C)", multiplier: 1.0, icon: "🌡️" },
  warm: { label: "Warm (42°C)", multiplier: 0.7, icon: "🔥" },
  cool: { label: "Cool (25°C)", multiplier: 0.4, icon: "❄️" },
  acidic: { label: "Acidic (pH 5)", multiplier: 0.3, icon: "⚗️" },
};

// ─── Particle class (pure JS for canvas perf) ────────────────────────────────
class BacteriaParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  species: SpeciesConfig;
  angle: number;
  angleV: number;
  size: number;
  canvasW: number;
  canvasH: number;
  pulse: number;
  dividing: boolean;
  divProgress: number;

  constructor(
    x: number,
    y: number,
    species: SpeciesConfig,
    canvasW: number,
    canvasH: number,
  ) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.species = species;
    this.angle = Math.random() * Math.PI * 2;
    this.angleV = (Math.random() - 0.5) * 0.04;
    this.size = species.shape === "coccus" || species.shape === "chain" ? 4 : 3;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.pulse = Math.random() * Math.PI * 2;
    this.dividing = false;
    this.divProgress = 0;
  }

  update(speed: number) {
    this.pulse += 0.05 * speed;
    this.x += this.vx * speed;
    this.y += this.vy * speed;
    this.angle += this.angleV * speed;
    if (this.x < 0 || this.x > this.canvasW) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvasH) this.vy *= -1;
    this.x = Math.max(0, Math.min(this.canvasW, this.x));
    this.y = Math.max(0, Math.min(this.canvasH, this.y));
    if (this.dividing) {
      this.divProgress = Math.min(1, this.divProgress + 0.03 * speed);
      if (this.divProgress >= 1) this.dividing = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const sp = this.species;
    const ps = 1 + Math.sin(this.pulse) * 0.15;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.shadowColor = sp.glowColor;
    ctx.shadowBlur = 8;
    ctx.fillStyle = sp.color;
    ctx.strokeStyle = sp.color;
    ctx.lineWidth = 1;

    if (sp.shape === "coccus" || sp.shape === "chain") {
      const r = this.size * ps;
      if (this.dividing) {
        const sep = r * this.divProgress * 1.8;
        ctx.beginPath();
        ctx.arc(-sep / 2, 0, r * 0.95, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sep / 2, 0, r * 0.95, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // rod shape
      const w = this.size * ps;
      const h = this.size * 2.8 * ps;
      const rx = w * 0.8;
      ctx.beginPath();
      ctx.moveTo(-w + rx, -h);
      ctx.lineTo(w - rx, -h);
      ctx.quadraticCurveTo(w, -h, w, -h + rx);
      ctx.lineTo(w, h - rx);
      ctx.quadraticCurveTo(w, h, w - rx, h);
      ctx.lineTo(-w + rx, h);
      ctx.quadraticCurveTo(-w, h, -w, h - rx);
      ctx.lineTo(-w, -h + rx);
      ctx.quadraticCurveTo(-w, -h, -w + rx, -h);
      ctx.closePath();
      ctx.fill();
      if (this.dividing) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-w, 0);
        ctx.lineTo(w, 0);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getPhase(
  pop: number,
  maxPop: number,
  elapsedMin: number,
  doublingTime: number,
): PhaseKey {
  if (elapsedMin < doublingTime * 0.3) return "lag";
  if (pop < maxPop * 0.75) return "exponential";
  if (pop < maxPop * 0.95) return "stationary";
  return "decline";
}

function spawnParticle(
  particles: BacteriaParticle[],
  sp: SpeciesConfig,
  canvasW: number,
  canvasH: number,
): BacteriaParticle {
  const parent =
    particles.length > 0
      ? particles[Math.floor(Math.random() * particles.length)]
      : null;
  const x = parent
    ? Math.max(0, Math.min(canvasW, parent.x + (Math.random() - 0.5) * 20))
    : Math.random() * canvasW;
  const y = parent
    ? Math.max(0, Math.min(canvasH, parent.y + (Math.random() - 0.5) * 20))
    : Math.random() * canvasH;
  return new BacteriaParticle(x, y, sp, canvasW, canvasH);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BacteriaSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<BacteriaParticle[]>([]);

  // All simulation state kept in refs so the RAF loop reads latest values
  const runningRef = useRef(false);
  const speciesRef = useRef<SpeciesKey>("ecoli");
  const environmentRef = useRef<EnvironmentKey>("optimal");
  const speedRef = useRef(1);
  const antibioticsRef = useRef(false);
  const nutrientsRef = useRef(100);
  const elapsedRef = useRef(0); // simulated minutes
  const realPopRef = useRef(1); // continuous population model (fractional)
  const tickRef = useRef(0); // raw frame counter
  const lastChartTickRef = useRef(0);
  const chartDataRef = useRef<ChartPoint[]>([]);

  // React state for UI re-renders (updated ~every 60 frames)
  const [running, setRunning] = useState(false);
  const [species, setSpecies] = useState<SpeciesKey>("ecoli");
  const [environment, setEnvironment] = useState<EnvironmentKey>("optimal");
  const [speed, setSpeed] = useState(1);
  const [antibiotics, setAntibiotics] = useState(false);
  const [nutrients, setNutrients] = useState(100);
  const [population, setPopulation] = useState(0);
  const [phase, setPhase] = useState<PhaseKey>("lag");
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [elapsedMin, setElapsedMin] = useState(0);

  // Sync react state → refs
  useEffect(() => {
    runningRef.current = running;
  }, [running]);
  useEffect(() => {
    speciesRef.current = species;
  }, [species]);
  useEffect(() => {
    environmentRef.current = environment;
  }, [environment]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    antibioticsRef.current = antibiotics;
  }, [antibiotics]);

  const reset = useCallback(() => {
    setRunning(false);
    runningRef.current = false;
    particlesRef.current = [];
    tickRef.current = 0;
    lastChartTickRef.current = 0;
    elapsedRef.current = 0;
    realPopRef.current = 1;
    nutrientsRef.current = 100;
    chartDataRef.current = [];
    setPopulation(0);
    setPhase("lag");
    setChartData([]);
    setElapsedMin(0);
    setNutrients(100);
  }, []);

  // ─── Animation loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Seed 3 display particles before start
    const seedDisplay = () => {
      const sp = SPECIES[speciesRef.current];
      particlesRef.current = Array.from(
        { length: 3 },
        () =>
          new BacteriaParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            sp,
            canvas.width,
            canvas.height,
          ),
      );
    };
    seedDisplay();

    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      const spKey = speciesRef.current;
      const envKey = environmentRef.current;
      const sp = SPECIES[spKey];
      const env = ENVIRONMENTS[envKey];
      const spd = speedRef.current;
      const isRunning = runningRef.current;

      // ── Background ──────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(3, 10, 18, 0.20)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(0,200,100,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (isRunning) {
        tickRef.current += 1;

        // Each frame = (0.05 * spd * envMultiplier) simulated minutes
        const dtMin = 0.05 * spd * env.multiplier;
        elapsedRef.current += dtMin;

        const nutr = nutrientsRef.current;
        const maxPop = sp.maxPop * Math.max(0.01, nutr / 100);
        const elapsed = elapsedRef.current;
        const doublingTime = sp.doublingTime;

        // ── Continuous logistic growth model ───────────────────────────────
        // r = ln(2) / doublingTime  (per minute)
        // dN/dt = r * N * (1 - N/K)
        // We track realPopRef as the true continuous value, then
        // sync particle count to floor(realPop).

        if (
          !antibioticsRef.current &&
          nutr > 2 &&
          elapsed > doublingTime * 0.25
        ) {
          const r = Math.log(2) / doublingTime; // per minute
          const N = realPopRef.current;
          const K = maxPop;
          const dN = r * N * (1 - N / K) * dtMin;
          realPopRef.current = Math.max(1, Math.min(K, N + dN));
        }

        // Antibiotics: exponential kill
        if (antibioticsRef.current) {
          const killRate = 0.08 * spd; // per frame
          realPopRef.current = Math.max(0, realPopRef.current * (1 - killRate));
        }

        // Nutrient depletion proportional to population
        if (realPopRef.current > 5) {
          nutrientsRef.current = Math.max(
            0,
            nutrientsRef.current -
              0.003 * spd * (realPopRef.current / sp.maxPop),
          );
        }

        // ── Sync particle count to realPop ────────────────────────────────
        const targetParticles = Math.min(
          sp.maxPop,
          Math.max(0, Math.round(realPopRef.current)),
        );
        const currentCount = particlesRef.current.length;

        if (targetParticles > currentCount) {
          // Spawn new particles
          const toAdd = Math.min(targetParticles - currentCount, 20); // cap per frame
          for (let i = 0; i < toAdd; i++) {
            const p = spawnParticle(
              particlesRef.current,
              sp,
              canvas.width,
              canvas.height,
            );
            // Mark as dividing for visual effect
            p.dividing = true;
            p.divProgress = 0;
            particlesRef.current.push(p);
          }
        } else if (targetParticles < currentCount) {
          // Remove excess (antibiotics kill)
          const toRemove = currentCount - targetParticles;
          particlesRef.current.splice(
            Math.floor(Math.random() * particlesRef.current.length),
            Math.min(toRemove, 10),
          );
        }

        // Chart update every ~60 ticks
        if (
          tickRef.current - lastChartTickRef.current >=
          Math.max(1, Math.floor(60 / spd))
        ) {
          lastChartTickRef.current = tickRef.current;
          const pop = particlesRef.current.length;
          const newPoint: ChartPoint = {
            time: Math.round(elapsedRef.current),
            population: pop,
            nutrients: Math.round(nutrientsRef.current),
          };
          chartDataRef.current = [...chartDataRef.current.slice(-80), newPoint];
          const ph = getPhase(pop, maxPop, elapsed, doublingTime);
          setPopulation(pop);
          setPhase(ph);
          setChartData([...chartDataRef.current]);
          setElapsedMin(Math.round(elapsedRef.current));
          setNutrients(Math.round(nutrientsRef.current));
        }
      }

      // Keep species in sync on all particles
      particlesRef.current.forEach((p) => {
        p.species = SPECIES[speciesRef.current];
      });

      // Draw particles
      const drawSpeed = isRunning ? spd : 0.3;
      particlesRef.current.forEach((p) => {
        p.update(drawSpeed);
        p.draw(ctx);
      });

      // Scanline overlay
      ctx.fillStyle = "rgba(0,0,0,0.025)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }
    };

    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // ─── Derived UI values ───────────────────────────────────────────────────────
  const sp = SPECIES[species];

  const phaseColors: Record<PhaseKey, string> = {
    lag: "#888",
    exponential: "#00ff88",
    stationary: "#ffbb00",
    decline: "#ff4466",
  };
  const phaseLabels: Record<PhaseKey, string> = {
    lag: "LAG PHASE",
    exponential: "EXPONENTIAL",
    stationary: "STATIONARY",
    decline: "DECLINE",
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
      className="min-h-screen bg-[#030a12] text-green-400 p-4 md:p-6"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap');
        .glow-green { text-shadow: 0 0 8px rgba(0,255,136,0.7); }
        .panel { background: rgba(0,20,10,0.7); border: 1px solid rgba(0,200,80,0.15); border-radius: 8px; }
        .btn-active { background: rgba(0,255,136,0.15); border-color: rgba(0,255,136,0.6) !important; color: #00ff88; }
        .badge { display:inline-block; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:600; letter-spacing:1px; }
        .slider::-webkit-slider-thumb { appearance:none; width:14px; height:14px; border-radius:50%; background:#00ff88; cursor:pointer; box-shadow:0 0 6px rgba(0,255,136,0.8); }
        .slider::-webkit-slider-runnable-track { background:rgba(0,255,136,0.15); border-radius:4px; height:4px; }
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line { stroke: rgba(0,200,80,0.1) !important; }
      `}</style>

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold glow-green tracking-widest uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#00ff88",
            }}
          >
            ⬡ BioSim
          </h1>
          <p className="text-xs text-green-700 tracking-widest mt-0.5">
            BACTERIAL GROWTH SIMULATOR v3.0
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="badge"
            style={{
              background: "rgba(0,255,136,0.1)",
              border: "1px solid rgba(0,255,136,0.3)",
              color: phaseColors[phase],
            }}
          >
            {phaseLabels[phase]}
          </span>
          <span className="text-xs text-green-700">
            {elapsedMin} min elapsed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Canvas */}
          <div
            className="panel relative overflow-hidden"
            style={{ minHeight: 320 }}
          >
            <div className="absolute top-2 left-3 text-[10px] text-green-700 tracking-widest z-10">
              PETRI DISH VIEW
            </div>
            <div
              className="absolute top-2 right-3 text-[10px] z-10"
              style={{ color: sp.color }}
            >
              ● {sp.label}
            </div>
            <canvas
              ref={canvasRef}
              width={700}
              height={340}
              className="w-full h-full"
              style={{ display: "block", maxHeight: 340 }}
            />
            <div className="absolute bottom-3 left-3 text-[10px] text-green-700">
              CELLS:{" "}
              <span
                className="glow-green"
                style={{ color: sp.color, fontSize: 13, fontWeight: 600 }}
              >
                {population.toLocaleString()}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 text-[10px] text-green-700">
              NUTRIENTS:{" "}
              <span
                style={{
                  color:
                    nutrients > 50
                      ? "#00ff88"
                      : nutrients > 20
                        ? "#ffbb00"
                        : "#ff4466",
                }}
              >
                {nutrients}%
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="panel p-4">
            <div className="text-[10px] text-green-700 tracking-widest mb-3">
              GROWTH KINETICS
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={chartData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "rgba(0,200,80,0.5)", fontSize: 9 }}
                  tickLine={false}
                  label={{
                    value: "min",
                    position: "insideBottomRight",
                    offset: 0,
                    fill: "rgba(0,200,80,0.4)",
                    fontSize: 9,
                  }}
                />
                <YAxis
                  yAxisId="pop"
                  tick={{ fill: "rgba(0,200,80,0.5)", fontSize: 9 }}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="nutr"
                  orientation="right"
                  tick={{ fill: "rgba(255,187,0,0.5)", fontSize: 9 }}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#030a12",
                    border: "1px solid rgba(0,200,80,0.3)",
                    borderRadius: 6,
                    fontSize: 10,
                    color: "#00ff88",
                  }}
                  labelStyle={{ color: "rgba(0,200,80,0.6)" }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 10, color: "rgba(0,200,80,0.6)" }}
                />
                <Line
                  yAxisId="pop"
                  type="monotone"
                  dataKey="population"
                  stroke={sp.color}
                  dot={false}
                  strokeWidth={2}
                  name="Cells"
                  isAnimationActive={false}
                />
                <Line
                  yAxisId="nutr"
                  type="monotone"
                  dataKey="nutrients"
                  stroke="#ffbb00"
                  dot={false}
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  name="Nutrients %"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column — controls */}
        <div className="flex flex-col gap-3">
          {/* Species */}
          <div className="panel p-4">
            <div className="text-[10px] text-green-700 tracking-widest mb-3">
              SPECIES SELECT
            </div>
            <div className="flex flex-col gap-2">
              {(Object.entries(SPECIES) as [SpeciesKey, SpeciesConfig][]).map(
                ([key, val]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSpecies(key);
                      reset();
                    }}
                    className={`text-left px-3 py-2 rounded border text-xs transition-all duration-150 ${
                      species === key
                        ? "btn-active"
                        : "border-green-900 text-green-700 hover:border-green-600"
                    }`}
                  >
                    <span style={{ color: val.color }}>■</span>
                    <span className="ml-2 font-semibold">{val.label}</span>
                    <span className="ml-2 text-green-800 text-[10px]">
                      {val.description}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Environment */}
          <div className="panel p-4">
            <div className="text-[10px] text-green-700 tracking-widest mb-3">
              ENVIRONMENT
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                Object.entries(ENVIRONMENTS) as [
                  EnvironmentKey,
                  EnvironmentConfig,
                ][]
              ).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setEnvironment(key)}
                  className={`px-2 py-2 rounded border text-[10px] transition-all duration-150 ${
                    environment === key
                      ? "btn-active"
                      : "border-green-900 text-green-700 hover:border-green-600"
                  }`}
                >
                  <div>{val.icon}</div>
                  <div className="mt-0.5">{val.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Speed */}
          <div className="panel p-4">
            <div className="text-[10px] text-green-700 tracking-widest mb-3">
              SIMULATION SPEED —{" "}
              <span className="glow-green" style={{ color: "#00ff88" }}>
                {speed}x
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="slider w-full appearance-none h-1 rounded outline-none"
            />
            <div className="flex justify-between text-[9px] text-green-800 mt-1">
              <span>0.5x</span>
              <span>slow</span>
              <span>fast</span>
              <span>5x</span>
            </div>
          </div>

          {/* Antibiotics toggle */}
          <div className="panel p-4">
            <div className="text-[10px] text-green-700 tracking-widest mb-3">
              INTERVENTIONS
            </div>
            <button
              onClick={() => setAntibiotics((a) => !a)}
              className={`w-full py-2 rounded border text-xs font-semibold tracking-widest transition-all duration-200 ${
                antibiotics
                  ? "border-red-500 text-red-400 bg-red-500/10"
                  : "border-green-900 text-green-700 hover:border-green-600"
              }`}
            >
              {antibiotics ? "⚠ ANTIBIOTICS: ON" : "ANTIBIOTICS: OFF"}
            </button>
            <p className="text-[9px] text-green-800 mt-1.5">
              {antibiotics
                ? "Bactericidal agent active — cells dying"
                : "No antibiotic treatment"}
            </p>
          </div>

          {/* Live stats */}
          <div className="panel p-4">
            <div className="text-[10px] text-green-700 tracking-widest mb-3">
              LIVE STATS
            </div>
            {(
              [
                ["Species", sp.label],
                ["Doubling Time", `${sp.doublingTime} min`],
                ["Env. Multiplier", `${ENVIRONMENTS[environment].multiplier}x`],
                ["Elapsed", `${elapsedMin} min`],
                ["Population", population.toLocaleString()],
                ["Nutrients", `${nutrients}%`],
                ["Phase", phaseLabels[phase]],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between text-[10px] py-0.5 border-b border-green-900/30"
              >
                <span className="text-green-800">{k}</span>
                <span
                  style={{
                    color: k === "Phase" ? phaseColors[phase] : undefined,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Start / Reset */}
          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className={`flex-1 py-2.5 rounded text-xs font-bold tracking-widest border transition-all duration-150 ${
                running
                  ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                  : "border-green-500 text-green-400 bg-green-500/10 glow-green"
              }`}
            >
              {running ? "⏸ PAUSE" : "▶ START"}
            </button>
            <button
              onClick={reset}
              className="flex-1 py-2.5 rounded text-xs font-bold tracking-widest border border-green-900 text-green-700 hover:border-green-600 transition-all"
            >
              ↺ RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
