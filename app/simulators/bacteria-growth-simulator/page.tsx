// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type SpeciesKey = "ecoli" | "staph" | "bacillus" | "streptococcus";
// type EnvironmentKey = "optimal" | "warm" | "cool" | "acidic";
// type PhaseKey = "lag" | "exponential" | "stationary" | "decline";
// type ShapeType = "rod" | "coccus" | "chain";

// interface SpeciesConfig {
//   label: string;
//   color: string;
//   glowColor: string;
//   doublingTime: number;
//   maxPop: number;
//   shape: ShapeType;
//   description: string;
// }

// interface EnvironmentConfig {
//   label: string;
//   multiplier: number;
//   icon: string;
// }

// interface ChartPoint {
//   time: number;
//   population: number;
//   nutrients: number;
// }

// // ─── Species & Environment configs ───────────────────────────────────────────
// const SPECIES: Record<SpeciesKey, SpeciesConfig> = {
//   ecoli: {
//     label: "E. coli",
//     color: "#00ff88",
//     glowColor: "rgba(0,255,136,0.6)",
//     doublingTime: 20,
//     maxPop: 800,
//     shape: "rod",
//     description: "Fast-dividing gram-negative rod",
//   },
//   staph: {
//     label: "S. aureus",
//     color: "#ffbb00",
//     glowColor: "rgba(255,187,0,0.6)",
//     doublingTime: 30,
//     maxPop: 600,
//     shape: "coccus",
//     description: "Spherical clusters, gram-positive",
//   },
//   bacillus: {
//     label: "B. subtilis",
//     color: "#00aaff",
//     glowColor: "rgba(0,170,255,0.6)",
//     doublingTime: 45,
//     maxPop: 500,
//     shape: "rod",
//     description: "Spore-forming rod bacterium",
//   },
//   streptococcus: {
//     label: "Streptococcus",
//     color: "#ff6699",
//     glowColor: "rgba(255,102,153,0.6)",
//     doublingTime: 25,
//     maxPop: 700,
//     shape: "chain",
//     description: "Chain-forming spherical bacteria",
//   },
// };

// const ENVIRONMENTS: Record<EnvironmentKey, EnvironmentConfig> = {
//   optimal: { label: "Optimal (37°C)", multiplier: 1.0, icon: "🌡️" },
//   warm: { label: "Warm (42°C)", multiplier: 0.7, icon: "🔥" },
//   cool: { label: "Cool (25°C)", multiplier: 0.4, icon: "❄️" },
//   acidic: { label: "Acidic (pH 5)", multiplier: 0.3, icon: "⚗️" },
// };

// // ─── Particle class (pure JS for canvas perf) ────────────────────────────────
// class BacteriaParticle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   species: SpeciesConfig;
//   angle: number;
//   angleV: number;
//   size: number;
//   canvasW: number;
//   canvasH: number;
//   pulse: number;
//   dividing: boolean;
//   divProgress: number;

//   constructor(
//     x: number,
//     y: number,
//     species: SpeciesConfig,
//     canvasW: number,
//     canvasH: number,
//   ) {
//     this.x = x;
//     this.y = y;
//     this.vx = (Math.random() - 0.5) * 0.5;
//     this.vy = (Math.random() - 0.5) * 0.5;
//     this.species = species;
//     this.angle = Math.random() * Math.PI * 2;
//     this.angleV = (Math.random() - 0.5) * 0.04;
//     this.size = species.shape === "coccus" || species.shape === "chain" ? 4 : 3;
//     this.canvasW = canvasW;
//     this.canvasH = canvasH;
//     this.pulse = Math.random() * Math.PI * 2;
//     this.dividing = false;
//     this.divProgress = 0;
//   }

//   update(speed: number) {
//     this.pulse += 0.05 * speed;
//     this.x += this.vx * speed;
//     this.y += this.vy * speed;
//     this.angle += this.angleV * speed;
//     if (this.x < 0 || this.x > this.canvasW) this.vx *= -1;
//     if (this.y < 0 || this.y > this.canvasH) this.vy *= -1;
//     this.x = Math.max(0, Math.min(this.canvasW, this.x));
//     this.y = Math.max(0, Math.min(this.canvasH, this.y));
//     if (this.dividing) {
//       this.divProgress = Math.min(1, this.divProgress + 0.03 * speed);
//       if (this.divProgress >= 1) this.dividing = false;
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     const sp = this.species;
//     const ps = 1 + Math.sin(this.pulse) * 0.15;
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(this.angle);

//     ctx.shadowColor = sp.glowColor;
//     ctx.shadowBlur = 8;
//     ctx.fillStyle = sp.color;
//     ctx.strokeStyle = sp.color;
//     ctx.lineWidth = 1;

//     if (sp.shape === "coccus" || sp.shape === "chain") {
//       const r = this.size * ps;
//       if (this.dividing) {
//         const sep = r * this.divProgress * 1.8;
//         ctx.beginPath();
//         ctx.arc(-sep / 2, 0, r * 0.95, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(sep / 2, 0, r * 0.95, 0, Math.PI * 2);
//         ctx.fill();
//       } else {
//         ctx.beginPath();
//         ctx.arc(0, 0, r, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     } else {
//       // rod shape
//       const w = this.size * ps;
//       const h = this.size * 2.8 * ps;
//       const rx = w * 0.8;
//       ctx.beginPath();
//       ctx.moveTo(-w + rx, -h);
//       ctx.lineTo(w - rx, -h);
//       ctx.quadraticCurveTo(w, -h, w, -h + rx);
//       ctx.lineTo(w, h - rx);
//       ctx.quadraticCurveTo(w, h, w - rx, h);
//       ctx.lineTo(-w + rx, h);
//       ctx.quadraticCurveTo(-w, h, -w, h - rx);
//       ctx.lineTo(-w, -h + rx);
//       ctx.quadraticCurveTo(-w, -h, -w + rx, -h);
//       ctx.closePath();
//       ctx.fill();
//       if (this.dividing) {
//         ctx.shadowBlur = 0;
//         ctx.strokeStyle = "rgba(255,255,255,0.6)";
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(-w, 0);
//         ctx.lineTo(w, 0);
//         ctx.stroke();
//       }
//     }
//     ctx.restore();
//   }
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// function getPhase(
//   pop: number,
//   maxPop: number,
//   elapsedMin: number,
//   doublingTime: number,
// ): PhaseKey {
//   if (elapsedMin < doublingTime * 0.3) return "lag";
//   if (pop < maxPop * 0.75) return "exponential";
//   if (pop < maxPop * 0.95) return "stationary";
//   return "decline";
// }

// function spawnParticle(
//   particles: BacteriaParticle[],
//   sp: SpeciesConfig,
//   canvasW: number,
//   canvasH: number,
// ): BacteriaParticle {
//   const parent =
//     particles.length > 0
//       ? particles[Math.floor(Math.random() * particles.length)]
//       : null;
//   const x = parent
//     ? Math.max(0, Math.min(canvasW, parent.x + (Math.random() - 0.5) * 20))
//     : Math.random() * canvasW;
//   const y = parent
//     ? Math.max(0, Math.min(canvasH, parent.y + (Math.random() - 0.5) * 20))
//     : Math.random() * canvasH;
//   return new BacteriaParticle(x, y, sp, canvasW, canvasH);
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function BacteriaSimulator() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef = useRef<number>(0);
//   const particlesRef = useRef<BacteriaParticle[]>([]);

//   // All simulation state kept in refs so the RAF loop reads latest values
//   const runningRef = useRef(false);
//   const speciesRef = useRef<SpeciesKey>("ecoli");
//   const environmentRef = useRef<EnvironmentKey>("optimal");
//   const speedRef = useRef(1);
//   const antibioticsRef = useRef(false);
//   const nutrientsRef = useRef(100);
//   const elapsedRef = useRef(0); // simulated minutes
//   const realPopRef = useRef(1); // continuous population model (fractional)
//   const tickRef = useRef(0); // raw frame counter
//   const lastChartTickRef = useRef(0);
//   const chartDataRef = useRef<ChartPoint[]>([]);

//   // React state for UI re-renders (updated ~every 60 frames)
//   const [running, setRunning] = useState(false);
//   const [species, setSpecies] = useState<SpeciesKey>("ecoli");
//   const [environment, setEnvironment] = useState<EnvironmentKey>("optimal");
//   const [speed, setSpeed] = useState(1);
//   const [antibiotics, setAntibiotics] = useState(false);
//   const [nutrients, setNutrients] = useState(100);
//   const [population, setPopulation] = useState(0);
//   const [phase, setPhase] = useState<PhaseKey>("lag");
//   const [chartData, setChartData] = useState<ChartPoint[]>([]);
//   const [elapsedMin, setElapsedMin] = useState(0);

//   // Sync react state → refs
//   useEffect(() => {
//     runningRef.current = running;
//   }, [running]);
//   useEffect(() => {
//     speciesRef.current = species;
//   }, [species]);
//   useEffect(() => {
//     environmentRef.current = environment;
//   }, [environment]);
//   useEffect(() => {
//     speedRef.current = speed;
//   }, [speed]);
//   useEffect(() => {
//     antibioticsRef.current = antibiotics;
//   }, [antibiotics]);

//   const reset = useCallback(() => {
//     setRunning(false);
//     runningRef.current = false;
//     particlesRef.current = [];
//     tickRef.current = 0;
//     lastChartTickRef.current = 0;
//     elapsedRef.current = 0;
//     realPopRef.current = 1;
//     nutrientsRef.current = 100;
//     chartDataRef.current = [];
//     setPopulation(0);
//     setPhase("lag");
//     setChartData([]);
//     setElapsedMin(0);
//     setNutrients(100);
//   }, []);

//   // ─── Animation loop ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     // Seed 3 display particles before start
//     const seedDisplay = () => {
//       const sp = SPECIES[speciesRef.current];
//       particlesRef.current = Array.from(
//         { length: 3 },
//         () =>
//           new BacteriaParticle(
//             Math.random() * canvas.width,
//             Math.random() * canvas.height,
//             sp,
//             canvas.width,
//             canvas.height,
//           ),
//       );
//     };
//     seedDisplay();

//     const loop = () => {
//       animRef.current = requestAnimationFrame(loop);
//       const spKey = speciesRef.current;
//       const envKey = environmentRef.current;
//       const sp = SPECIES[spKey];
//       const env = ENVIRONMENTS[envKey];
//       const spd = speedRef.current;
//       const isRunning = runningRef.current;

//       // ── Background ──────────────────────────────────────────────────────────
//       ctx.fillStyle = "rgba(3, 10, 18, 0.20)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Grid
//       ctx.strokeStyle = "rgba(0,200,100,0.04)";
//       ctx.lineWidth = 1;
//       for (let x = 0; x < canvas.width; x += 30) {
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, canvas.height);
//         ctx.stroke();
//       }
//       for (let y = 0; y < canvas.height; y += 30) {
//         ctx.beginPath();
//         ctx.moveTo(0, y);
//         ctx.lineTo(canvas.width, y);
//         ctx.stroke();
//       }

//       if (isRunning) {
//         tickRef.current += 1;

//         // Each frame = (0.05 * spd * envMultiplier) simulated minutes
//         const dtMin = 0.05 * spd * env.multiplier;
//         elapsedRef.current += dtMin;

//         const nutr = nutrientsRef.current;
//         const maxPop = sp.maxPop * Math.max(0.01, nutr / 100);
//         const elapsed = elapsedRef.current;
//         const doublingTime = sp.doublingTime;

//         // ── Continuous logistic growth model ───────────────────────────────
//         // r = ln(2) / doublingTime  (per minute)
//         // dN/dt = r * N * (1 - N/K)
//         // We track realPopRef as the true continuous value, then
//         // sync particle count to floor(realPop).

//         if (
//           !antibioticsRef.current &&
//           nutr > 2 &&
//           elapsed > doublingTime * 0.25
//         ) {
//           const r = Math.log(2) / doublingTime; // per minute
//           const N = realPopRef.current;
//           const K = maxPop;
//           const dN = r * N * (1 - N / K) * dtMin;
//           realPopRef.current = Math.max(1, Math.min(K, N + dN));
//         }

//         // Antibiotics: exponential kill
//         if (antibioticsRef.current) {
//           const killRate = 0.08 * spd; // per frame
//           realPopRef.current = Math.max(0, realPopRef.current * (1 - killRate));
//         }

//         // Nutrient depletion proportional to population
//         if (realPopRef.current > 5) {
//           nutrientsRef.current = Math.max(
//             0,
//             nutrientsRef.current -
//               0.003 * spd * (realPopRef.current / sp.maxPop),
//           );
//         }

//         // ── Sync particle count to realPop ────────────────────────────────
//         const targetParticles = Math.min(
//           sp.maxPop,
//           Math.max(0, Math.round(realPopRef.current)),
//         );
//         const currentCount = particlesRef.current.length;

//         if (targetParticles > currentCount) {
//           // Spawn new particles
//           const toAdd = Math.min(targetParticles - currentCount, 20); // cap per frame
//           for (let i = 0; i < toAdd; i++) {
//             const p = spawnParticle(
//               particlesRef.current,
//               sp,
//               canvas.width,
//               canvas.height,
//             );
//             // Mark as dividing for visual effect
//             p.dividing = true;
//             p.divProgress = 0;
//             particlesRef.current.push(p);
//           }
//         } else if (targetParticles < currentCount) {
//           // Remove excess (antibiotics kill)
//           const toRemove = currentCount - targetParticles;
//           particlesRef.current.splice(
//             Math.floor(Math.random() * particlesRef.current.length),
//             Math.min(toRemove, 10),
//           );
//         }

//         // Chart update every ~60 ticks
//         if (
//           tickRef.current - lastChartTickRef.current >=
//           Math.max(1, Math.floor(60 / spd))
//         ) {
//           lastChartTickRef.current = tickRef.current;
//           const pop = particlesRef.current.length;
//           const newPoint: ChartPoint = {
//             time: Math.round(elapsedRef.current),
//             population: pop,
//             nutrients: Math.round(nutrientsRef.current),
//           };
//           chartDataRef.current = [...chartDataRef.current.slice(-80), newPoint];
//           const ph = getPhase(pop, maxPop, elapsed, doublingTime);
//           setPopulation(pop);
//           setPhase(ph);
//           setChartData([...chartDataRef.current]);
//           setElapsedMin(Math.round(elapsedRef.current));
//           setNutrients(Math.round(nutrientsRef.current));
//         }
//       }

//       // Keep species in sync on all particles
//       particlesRef.current.forEach((p) => {
//         p.species = SPECIES[speciesRef.current];
//       });

//       // Draw particles
//       const drawSpeed = isRunning ? spd : 0.3;
//       particlesRef.current.forEach((p) => {
//         p.update(drawSpeed);
//         p.draw(ctx);
//       });

//       // Scanline overlay
//       ctx.fillStyle = "rgba(0,0,0,0.025)";
//       for (let y = 0; y < canvas.height; y += 4) {
//         ctx.fillRect(0, y, canvas.width, 2);
//       }
//     };

//     loop();
//     return () => cancelAnimationFrame(animRef.current);
//   }, []);

//   // ─── Derived UI values ───────────────────────────────────────────────────────
//   const sp = SPECIES[species];

//   const phaseColors: Record<PhaseKey, string> = {
//     lag: "#888",
//     exponential: "#00ff88",
//     stationary: "#ffbb00",
//     decline: "#ff4466",
//   };
//   const phaseLabels: Record<PhaseKey, string> = {
//     lag: "LAG PHASE",
//     exponential: "EXPONENTIAL",
//     stationary: "STATIONARY",
//     decline: "DECLINE",
//   };

//   // ─── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <div
//       style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
//       className="min-h-screen bg-[#030a12] text-green-400 p-4 md:p-6"
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=Space+Grotesk:wght@500;700&display=swap');
//         .glow-green { text-shadow: 0 0 8px rgba(0,255,136,0.7); }
//         .panel { background: rgba(0,20,10,0.7); border: 1px solid rgba(0,200,80,0.15); border-radius: 8px; }
//         .btn-active { background: rgba(0,255,136,0.15); border-color: rgba(0,255,136,0.6) !important; color: #00ff88; }
//         .badge { display:inline-block; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:600; letter-spacing:1px; }
//         .slider::-webkit-slider-thumb { appearance:none; width:14px; height:14px; border-radius:50%; background:#00ff88; cursor:pointer; box-shadow:0 0 6px rgba(0,255,136,0.8); }
//         .slider::-webkit-slider-runnable-track { background:rgba(0,255,136,0.15); border-radius:4px; height:4px; }
//         .recharts-cartesian-grid-horizontal line,
//         .recharts-cartesian-grid-vertical line { stroke: rgba(0,200,80,0.1) !important; }
//       `}</style>

//       {/* Header */}
//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//         <div>
//           <h1
//             className="text-2xl md:text-3xl font-bold glow-green tracking-widest uppercase"
//             style={{
//               fontFamily: "'Space Grotesk', sans-serif",
//               color: "#00ff88",
//             }}
//           >
//             ⬡ BioSim
//           </h1>
//           <p className="text-xs text-green-700 tracking-widest mt-0.5">
//             BACTERIAL GROWTH SIMULATOR v3.0
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <span
//             className="badge"
//             style={{
//               background: "rgba(0,255,136,0.1)",
//               border: "1px solid rgba(0,255,136,0.3)",
//               color: phaseColors[phase],
//             }}
//           >
//             {phaseLabels[phase]}
//           </span>
//           <span className="text-xs text-green-700">
//             {elapsedMin} min elapsed
//           </span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
//         {/* Left column */}
//         <div className="flex flex-col gap-4">
//           {/* Canvas */}
//           <div
//             className="panel relative overflow-hidden"
//             style={{ minHeight: 320 }}
//           >
//             <div className="absolute top-2 left-3 text-[10px] text-green-700 tracking-widest z-10">
//               PETRI DISH VIEW
//             </div>
//             <div
//               className="absolute top-2 right-3 text-[10px] z-10"
//               style={{ color: sp.color }}
//             >
//               ● {sp.label}
//             </div>
//             <canvas
//               ref={canvasRef}
//               width={700}
//               height={340}
//               className="w-full h-full"
//               style={{ display: "block", maxHeight: 340 }}
//             />
//             <div className="absolute bottom-3 left-3 text-[10px] text-green-700">
//               CELLS:{" "}
//               <span
//                 className="glow-green"
//                 style={{ color: sp.color, fontSize: 13, fontWeight: 600 }}
//               >
//                 {population.toLocaleString()}
//               </span>
//             </div>
//             <div className="absolute bottom-3 right-3 text-[10px] text-green-700">
//               NUTRIENTS:{" "}
//               <span
//                 style={{
//                   color:
//                     nutrients > 50
//                       ? "#00ff88"
//                       : nutrients > 20
//                         ? "#ffbb00"
//                         : "#ff4466",
//                 }}
//               >
//                 {nutrients}%
//               </span>
//             </div>
//           </div>

//           {/* Chart */}
//           <div className="panel p-4">
//             <div className="text-[10px] text-green-700 tracking-widest mb-3">
//               GROWTH KINETICS
//             </div>
//             <ResponsiveContainer width="100%" height={180}>
//               <LineChart
//                 data={chartData}
//                 margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="time"
//                   tick={{ fill: "rgba(0,200,80,0.5)", fontSize: 9 }}
//                   tickLine={false}
//                   label={{
//                     value: "min",
//                     position: "insideBottomRight",
//                     offset: 0,
//                     fill: "rgba(0,200,80,0.4)",
//                     fontSize: 9,
//                   }}
//                 />
//                 <YAxis
//                   yAxisId="pop"
//                   tick={{ fill: "rgba(0,200,80,0.5)", fontSize: 9 }}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   yAxisId="nutr"
//                   orientation="right"
//                   tick={{ fill: "rgba(255,187,0,0.5)", fontSize: 9 }}
//                   tickLine={false}
//                   domain={[0, 100]}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     background: "#030a12",
//                     border: "1px solid rgba(0,200,80,0.3)",
//                     borderRadius: 6,
//                     fontSize: 10,
//                     color: "#00ff88",
//                   }}
//                   labelStyle={{ color: "rgba(0,200,80,0.6)" }}
//                 />
//                 <Legend
//                   wrapperStyle={{ fontSize: 10, color: "rgba(0,200,80,0.6)" }}
//                 />
//                 <Line
//                   yAxisId="pop"
//                   type="monotone"
//                   dataKey="population"
//                   stroke={sp.color}
//                   dot={false}
//                   strokeWidth={2}
//                   name="Cells"
//                   isAnimationActive={false}
//                 />
//                 <Line
//                   yAxisId="nutr"
//                   type="monotone"
//                   dataKey="nutrients"
//                   stroke="#ffbb00"
//                   dot={false}
//                   strokeWidth={1.5}
//                   strokeDasharray="4 2"
//                   name="Nutrients %"
//                   isAnimationActive={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Right column — controls */}
//         <div className="flex flex-col gap-3">
//           {/* Species */}
//           <div className="panel p-4">
//             <div className="text-[10px] text-green-700 tracking-widest mb-3">
//               SPECIES SELECT
//             </div>
//             <div className="flex flex-col gap-2">
//               {(Object.entries(SPECIES) as [SpeciesKey, SpeciesConfig][]).map(
//                 ([key, val]) => (
//                   <button
//                     key={key}
//                     onClick={() => {
//                       setSpecies(key);
//                       reset();
//                     }}
//                     className={`text-left px-3 py-2 rounded border text-xs transition-all duration-150 ${
//                       species === key
//                         ? "btn-active"
//                         : "border-green-900 text-green-700 hover:border-green-600"
//                     }`}
//                   >
//                     <span style={{ color: val.color }}>■</span>
//                     <span className="ml-2 font-semibold">{val.label}</span>
//                     <span className="ml-2 text-green-800 text-[10px]">
//                       {val.description}
//                     </span>
//                   </button>
//                 ),
//               )}
//             </div>
//           </div>

//           {/* Environment */}
//           <div className="panel p-4">
//             <div className="text-[10px] text-green-700 tracking-widest mb-3">
//               ENVIRONMENT
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//               {(
//                 Object.entries(ENVIRONMENTS) as [
//                   EnvironmentKey,
//                   EnvironmentConfig,
//                 ][]
//               ).map(([key, val]) => (
//                 <button
//                   key={key}
//                   onClick={() => setEnvironment(key)}
//                   className={`px-2 py-2 rounded border text-[10px] transition-all duration-150 ${
//                     environment === key
//                       ? "btn-active"
//                       : "border-green-900 text-green-700 hover:border-green-600"
//                   }`}
//                 >
//                   <div>{val.icon}</div>
//                   <div className="mt-0.5">{val.label}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Speed */}
//           <div className="panel p-4">
//             <div className="text-[10px] text-green-700 tracking-widest mb-3">
//               SIMULATION SPEED —{" "}
//               <span className="glow-green" style={{ color: "#00ff88" }}>
//                 {speed}x
//               </span>
//             </div>
//             <input
//               type="range"
//               min={0.5}
//               max={5}
//               step={0.5}
//               value={speed}
//               onChange={(e) => setSpeed(Number(e.target.value))}
//               className="slider w-full appearance-none h-1 rounded outline-none"
//             />
//             <div className="flex justify-between text-[9px] text-green-800 mt-1">
//               <span>0.5x</span>
//               <span>slow</span>
//               <span>fast</span>
//               <span>5x</span>
//             </div>
//           </div>

//           {/* Antibiotics toggle */}
//           <div className="panel p-4">
//             <div className="text-[10px] text-green-700 tracking-widest mb-3">
//               INTERVENTIONS
//             </div>
//             <button
//               onClick={() => setAntibiotics((a) => !a)}
//               className={`w-full py-2 rounded border text-xs font-semibold tracking-widest transition-all duration-200 ${
//                 antibiotics
//                   ? "border-red-500 text-red-400 bg-red-500/10"
//                   : "border-green-900 text-green-700 hover:border-green-600"
//               }`}
//             >
//               {antibiotics ? "⚠ ANTIBIOTICS: ON" : "ANTIBIOTICS: OFF"}
//             </button>
//             <p className="text-[9px] text-green-800 mt-1.5">
//               {antibiotics
//                 ? "Bactericidal agent active — cells dying"
//                 : "No antibiotic treatment"}
//             </p>
//           </div>

//           {/* Live stats */}
//           <div className="panel p-4">
//             <div className="text-[10px] text-green-700 tracking-widest mb-3">
//               LIVE STATS
//             </div>
//             {(
//               [
//                 ["Species", sp.label],
//                 ["Doubling Time", `${sp.doublingTime} min`],
//                 ["Env. Multiplier", `${ENVIRONMENTS[environment].multiplier}x`],
//                 ["Elapsed", `${elapsedMin} min`],
//                 ["Population", population.toLocaleString()],
//                 ["Nutrients", `${nutrients}%`],
//                 ["Phase", phaseLabels[phase]],
//               ] as [string, string][]
//             ).map(([k, v]) => (
//               <div
//                 key={k}
//                 className="flex justify-between text-[10px] py-0.5 border-b border-green-900/30"
//               >
//                 <span className="text-green-800">{k}</span>
//                 <span
//                   style={{
//                     color: k === "Phase" ? phaseColors[phase] : undefined,
//                   }}
//                 >
//                   {v}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Start / Reset */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => setRunning((r) => !r)}
//               className={`flex-1 py-2.5 rounded text-xs font-bold tracking-widest border transition-all duration-150 ${
//                 running
//                   ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
//                   : "border-green-500 text-green-400 bg-green-500/10 glow-green"
//               }`}
//             >
//               {running ? "⏸ PAUSE" : "▶ START"}
//             </button>
//             <button
//               onClick={reset}
//               className="flex-1 py-2.5 rounded text-xs font-bold tracking-widest border border-green-900 text-green-700 hover:border-green-600 transition-all"
//             >
//               ↺ RESET
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type SpeciesKey = "ecoli" | "staph" | "bacillus" | "streptococcus";
// type EnvironmentKey = "optimal" | "warm" | "cool" | "acidic";
// type PhaseKey = "lag" | "exponential" | "stationary" | "decline";
// type ShapeType = "rod" | "coccus" | "chain";

// interface SpeciesConfig {
//   label: string;
//   color: string;
//   glowColor: string;
//   doublingTime: number;
//   maxPop: number;
//   shape: ShapeType;
//   description: string;
// }

// interface EnvironmentConfig {
//   label: string;
//   multiplier: number;
//   icon: string;
// }

// interface ChartPoint {
//   time: number;
//   population: number;
//   nutrients: number;
// }

// // ─── Species & Environment configs ───────────────────────────────────────────
// const SPECIES: Record<SpeciesKey, SpeciesConfig> = {
//   ecoli: {
//     label: "E. coli",
//     color: "#22c55e",
//     glowColor: "rgba(34,197,94,0.6)",
//     doublingTime: 20,
//     maxPop: 800,
//     shape: "rod",
//     description: "Fast-dividing gram-negative rod",
//   },
//   staph: {
//     label: "S. aureus",
//     color: "#f59e0b",
//     glowColor: "rgba(245,158,11,0.6)",
//     doublingTime: 30,
//     maxPop: 600,
//     shape: "coccus",
//     description: "Spherical clusters, gram-positive",
//   },
//   bacillus: {
//     label: "B. subtilis",
//     color: "#3b82f6",
//     glowColor: "rgba(59,130,246,0.6)",
//     doublingTime: 45,
//     maxPop: 500,
//     shape: "rod",
//     description: "Spore-forming rod bacterium",
//   },
//   streptococcus: {
//     label: "Streptococcus",
//     color: "#ec4899",
//     glowColor: "rgba(236,72,153,0.6)",
//     doublingTime: 25,
//     maxPop: 700,
//     shape: "chain",
//     description: "Chain-forming spherical bacteria",
//   },
// };

// const ENVIRONMENTS: Record<EnvironmentKey, EnvironmentConfig> = {
//   optimal: { label: "Optimal (37°C)", multiplier: 1.0, icon: "🌡️" },
//   warm: { label: "Warm (42°C)", multiplier: 0.7, icon: "🔥" },
//   cool: { label: "Cool (25°C)", multiplier: 0.4, icon: "❄️" },
//   acidic: { label: "Acidic (pH 5)", multiplier: 0.3, icon: "⚗️" },
// };

// // ─── Particle class (pure JS for canvas perf) ────────────────────────────────
// class BacteriaParticle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   species: SpeciesConfig;
//   angle: number;
//   angleV: number;
//   size: number;
//   canvasW: number;
//   canvasH: number;
//   pulse: number;
//   dividing: boolean;
//   divProgress: number;

//   constructor(
//     x: number,
//     y: number,
//     species: SpeciesConfig,
//     canvasW: number,
//     canvasH: number,
//   ) {
//     this.x = x;
//     this.y = y;
//     this.vx = (Math.random() - 0.5) * 0.5;
//     this.vy = (Math.random() - 0.5) * 0.5;
//     this.species = species;
//     this.angle = Math.random() * Math.PI * 2;
//     this.angleV = (Math.random() - 0.5) * 0.04;
//     this.size = species.shape === "coccus" || species.shape === "chain" ? 4 : 3;
//     this.canvasW = canvasW;
//     this.canvasH = canvasH;
//     this.pulse = Math.random() * Math.PI * 2;
//     this.dividing = false;
//     this.divProgress = 0;
//   }

//   update(speed: number) {
//     this.pulse += 0.05 * speed;
//     this.x += this.vx * speed;
//     this.y += this.vy * speed;
//     this.angle += this.angleV * speed;
//     if (this.x < 0 || this.x > this.canvasW) this.vx *= -1;
//     if (this.y < 0 || this.y > this.canvasH) this.vy *= -1;
//     this.x = Math.max(0, Math.min(this.canvasW, this.x));
//     this.y = Math.max(0, Math.min(this.canvasH, this.y));
//     if (this.dividing) {
//       this.divProgress = Math.min(1, this.divProgress + 0.03 * speed);
//       if (this.divProgress >= 1) this.dividing = false;
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     const sp = this.species;
//     const ps = 1 + Math.sin(this.pulse) * 0.15;
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(this.angle);

//     ctx.shadowColor = sp.glowColor;
//     ctx.shadowBlur = 8;
//     ctx.fillStyle = sp.color;
//     ctx.strokeStyle = sp.color;
//     ctx.lineWidth = 1;

//     if (sp.shape === "coccus" || sp.shape === "chain") {
//       const r = this.size * ps;
//       if (this.dividing) {
//         const sep = r * this.divProgress * 1.8;
//         ctx.beginPath();
//         ctx.arc(-sep / 2, 0, r * 0.95, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(sep / 2, 0, r * 0.95, 0, Math.PI * 2);
//         ctx.fill();
//       } else {
//         ctx.beginPath();
//         ctx.arc(0, 0, r, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     } else {
//       const w = this.size * ps;
//       const h = this.size * 2.8 * ps;
//       const rx = w * 0.8;
//       ctx.beginPath();
//       ctx.moveTo(-w + rx, -h);
//       ctx.lineTo(w - rx, -h);
//       ctx.quadraticCurveTo(w, -h, w, -h + rx);
//       ctx.lineTo(w, h - rx);
//       ctx.quadraticCurveTo(w, h, w - rx, h);
//       ctx.lineTo(-w + rx, h);
//       ctx.quadraticCurveTo(-w, h, -w, h - rx);
//       ctx.lineTo(-w, -h + rx);
//       ctx.quadraticCurveTo(-w, -h, -w + rx, -h);
//       ctx.closePath();
//       ctx.fill();
//       if (this.dividing) {
//         ctx.shadowBlur = 0;
//         ctx.strokeStyle = "rgba(255,255,255,0.6)";
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(-w, 0);
//         ctx.lineTo(w, 0);
//         ctx.stroke();
//       }
//     }
//     ctx.restore();
//   }
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// function getPhase(
//   pop: number,
//   maxPop: number,
//   elapsedMin: number,
//   doublingTime: number,
// ): PhaseKey {
//   if (elapsedMin < doublingTime * 0.3) return "lag";
//   if (pop < maxPop * 0.75) return "exponential";
//   if (pop < maxPop * 0.95) return "stationary";
//   return "decline";
// }

// function spawnParticle(
//   particles: BacteriaParticle[],
//   sp: SpeciesConfig,
//   canvasW: number,
//   canvasH: number,
// ): BacteriaParticle {
//   const parent =
//     particles.length > 0
//       ? particles[Math.floor(Math.random() * particles.length)]
//       : null;
//   const x = parent
//     ? Math.max(0, Math.min(canvasW, parent.x + (Math.random() - 0.5) * 20))
//     : Math.random() * canvasW;
//   const y = parent
//     ? Math.max(0, Math.min(canvasH, parent.y + (Math.random() - 0.5) * 20))
//     : Math.random() * canvasH;
//   return new BacteriaParticle(x, y, sp, canvasW, canvasH);
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function BacteriaSimulator() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef = useRef<number>(0);
//   const particlesRef = useRef<BacteriaParticle[]>([]);

//   const runningRef = useRef(false);
//   const speciesRef = useRef<SpeciesKey>("ecoli");
//   const environmentRef = useRef<EnvironmentKey>("optimal");
//   const speedRef = useRef(1);
//   const antibioticsRef = useRef(false);
//   const nutrientsRef = useRef(100);
//   const elapsedRef = useRef(0);
//   const realPopRef = useRef(1);
//   const tickRef = useRef(0);
//   const lastChartTickRef = useRef(0);
//   const chartDataRef = useRef<ChartPoint[]>([]);

//   const [running, setRunning] = useState(false);
//   const [species, setSpecies] = useState<SpeciesKey>("ecoli");
//   const [environment, setEnvironment] = useState<EnvironmentKey>("optimal");
//   const [speed, setSpeed] = useState(1);
//   const [antibiotics, setAntibiotics] = useState(false);
//   const [nutrients, setNutrients] = useState(100);
//   const [population, setPopulation] = useState(0);
//   const [phase, setPhase] = useState<PhaseKey>("lag");
//   const [chartData, setChartData] = useState<ChartPoint[]>([]);
//   const [elapsedMin, setElapsedMin] = useState(0);

//   useEffect(() => {
//     runningRef.current = running;
//   }, [running]);
//   useEffect(() => {
//     speciesRef.current = species;
//   }, [species]);
//   useEffect(() => {
//     environmentRef.current = environment;
//   }, [environment]);
//   useEffect(() => {
//     speedRef.current = speed;
//   }, [speed]);
//   useEffect(() => {
//     antibioticsRef.current = antibiotics;
//   }, [antibiotics]);

//   const reset = useCallback(() => {
//     setRunning(false);
//     runningRef.current = false;
//     particlesRef.current = [];
//     tickRef.current = 0;
//     lastChartTickRef.current = 0;
//     elapsedRef.current = 0;
//     realPopRef.current = 1;
//     nutrientsRef.current = 100;
//     chartDataRef.current = [];
//     setPopulation(0);
//     setPhase("lag");
//     setChartData([]);
//     setElapsedMin(0);
//     setNutrients(100);
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     const seedDisplay = () => {
//       const sp = SPECIES[speciesRef.current];
//       particlesRef.current = Array.from(
//         { length: 3 },
//         () =>
//           new BacteriaParticle(
//             Math.random() * canvas.width,
//             Math.random() * canvas.height,
//             sp,
//             canvas.width,
//             canvas.height,
//           ),
//       );
//     };
//     seedDisplay();

//     const loop = () => {
//       animRef.current = requestAnimationFrame(loop);
//       const spKey = speciesRef.current;
//       const envKey = environmentRef.current;
//       const sp = SPECIES[spKey];
//       const env = ENVIRONMENTS[envKey];
//       const spd = speedRef.current;
//       const isRunning = runningRef.current;

//       ctx.fillStyle = "hsl(var(--background))";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.strokeStyle = "hsl(var(--border))";
//       ctx.lineWidth = 1;
//       ctx.globalAlpha = 0.1;
//       for (let x = 0; x < canvas.width; x += 30) {
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, canvas.height);
//         ctx.stroke();
//       }
//       for (let y = 0; y < canvas.height; y += 30) {
//         ctx.beginPath();
//         ctx.moveTo(0, y);
//         ctx.lineTo(canvas.width, y);
//         ctx.stroke();
//       }
//       ctx.globalAlpha = 1;

//       if (isRunning) {
//         tickRef.current += 1;
//         const dtMin = 0.05 * spd * env.multiplier;
//         elapsedRef.current += dtMin;

//         const nutr = nutrientsRef.current;
//         const maxPop = sp.maxPop * Math.max(0.01, nutr / 100);
//         const elapsed = elapsedRef.current;
//         const doublingTime = sp.doublingTime;

//         if (
//           !antibioticsRef.current &&
//           nutr > 2 &&
//           elapsed > doublingTime * 0.25
//         ) {
//           const r = Math.log(2) / doublingTime;
//           const N = realPopRef.current;
//           const K = maxPop;
//           const dN = r * N * (1 - N / K) * dtMin;
//           realPopRef.current = Math.max(1, Math.min(K, N + dN));
//         }

//         if (antibioticsRef.current) {
//           const killRate = 0.08 * spd;
//           realPopRef.current = Math.max(0, realPopRef.current * (1 - killRate));
//         }

//         if (realPopRef.current > 5) {
//           nutrientsRef.current = Math.max(
//             0,
//             nutrientsRef.current -
//               0.003 * spd * (realPopRef.current / sp.maxPop),
//           );
//         }

//         const targetParticles = Math.min(
//           sp.maxPop,
//           Math.max(0, Math.round(realPopRef.current)),
//         );
//         const currentCount = particlesRef.current.length;

//         if (targetParticles > currentCount) {
//           const toAdd = Math.min(targetParticles - currentCount, 20);
//           for (let i = 0; i < toAdd; i++) {
//             const p = spawnParticle(
//               particlesRef.current,
//               sp,
//               canvas.width,
//               canvas.height,
//             );
//             p.dividing = true;
//             p.divProgress = 0;
//             particlesRef.current.push(p);
//           }
//         } else if (targetParticles < currentCount) {
//           const toRemove = currentCount - targetParticles;
//           particlesRef.current.splice(
//             Math.floor(Math.random() * particlesRef.current.length),
//             Math.min(toRemove, 10),
//           );
//         }

//         if (
//           tickRef.current - lastChartTickRef.current >=
//           Math.max(1, Math.floor(60 / spd))
//         ) {
//           lastChartTickRef.current = tickRef.current;
//           const pop = particlesRef.current.length;
//           const newPoint: ChartPoint = {
//             time: Math.round(elapsedRef.current),
//             population: pop,
//             nutrients: Math.round(nutrientsRef.current),
//           };
//           chartDataRef.current = [...chartDataRef.current.slice(-80), newPoint];
//           const ph = getPhase(pop, maxPop, elapsed, doublingTime);
//           setPopulation(pop);
//           setPhase(ph);
//           setChartData([...chartDataRef.current]);
//           setElapsedMin(Math.round(elapsedRef.current));
//           setNutrients(Math.round(nutrientsRef.current));
//         }
//       }

//       particlesRef.current.forEach((p) => {
//         p.species = SPECIES[speciesRef.current];
//       });

//       const drawSpeed = isRunning ? spd : 0.3;
//       particlesRef.current.forEach((p) => {
//         p.update(drawSpeed);
//         p.draw(ctx);
//       });
//     };

//     loop();
//     return () => cancelAnimationFrame(animRef.current);
//   }, []);

//   const sp = SPECIES[species];

//   const phaseColors: Record<PhaseKey, string> = {
//     lag: "text-muted-foreground",
//     exponential: "text-primary",
//     stationary: "text-amber-500",
//     decline: "text-destructive",
//   };

//   const phaseLabels: Record<PhaseKey, string> = {
//     lag: "Lag",
//     exponential: "Exponential",
//     stationary: "Stationary",
//     decline: "Decline",
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground font-mono">
//       {/* Header */}
//       <header className="border-b border-border py-4 px-4 md:px-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//           <div>
//             <h1 className="text-xl md:text-2xl font-bold tracking-tight">
//               BioSim
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Bacterial Growth Simulator
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <span
//               className={`text-xs font-medium px-2 py-1 rounded ${phaseColors[phase]} bg-muted`}
//             >
//               {phaseLabels[phase]}
//             </span>
//             <span className="text-xs text-muted-foreground">
//               {elapsedMin} min elapsed
//             </span>
//           </div>
//         </div>
//       </header>

//       <main className="grid md:grid-cols-[1fr_320px] gap-6 p-4 md:p-6">
//         {/* Visualization Column */}
//         <section className="space-y-6">
//           {/* Canvas Container */}
//           <div className="border border-border rounded-lg overflow-hidden">
//             <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
//               <span className="text-xs text-muted-foreground">
//                 Petri Dish View
//               </span>
//               <span className="text-xs font-medium" style={{ color: sp.color }}>
//                 ● {sp.label}
//               </span>
//             </div>
//             <div className="relative">
//               <canvas
//                 ref={canvasRef}
//                 width={700}
//                 height={340}
//                 className="w-full h-auto block"
//                 style={{ maxHeight: 340 }}
//                 aria-label="Bacterial growth visualization"
//               />
//               {/* Inline stats overlay */}
//               <div className="absolute bottom-2 left-3 right-3 flex justify-between text-xs">
//                 <span className="text-muted-foreground">
//                   Cells:{" "}
//                   <span className="font-medium" style={{ color: sp.color }}>
//                     {population.toLocaleString()}
//                   </span>
//                 </span>
//                 <span className="text-muted-foreground">
//                   Nutrients:{" "}
//                   <span
//                     className={`font-medium ${
//                       nutrients > 50
//                         ? "text-primary"
//                         : nutrients > 20
//                           ? "text-amber-500"
//                           : "text-destructive"
//                     }`}
//                   >
//                     {nutrients}%
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Growth Chart */}
//           <section className="border-t border-border pt-4">
//             <h2 className="text-sm font-medium mb-3">Growth Kinetics</h2>
//             <ResponsiveContainer width="100%" height={180}>
//               <LineChart
//                 data={chartData}
//                 margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
//               >
//                 <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="time"
//                   tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
//                   tickLine={false}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                   label={{
//                     value: "min",
//                     position: "insideBottomRight",
//                     offset: 0,
//                     fill: "hsl(var(--muted-foreground))",
//                     fontSize: 9,
//                   }}
//                 />
//                 <YAxis
//                   yAxisId="pop"
//                   tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
//                   tickLine={false}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                 />
//                 <YAxis
//                   yAxisId="nutr"
//                   orientation="right"
//                   tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
//                   tickLine={false}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                   domain={[0, 100]}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     background: "hsl(var(--background))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: 6,
//                     fontSize: 11,
//                     color: "hsl(var(--foreground))",
//                   }}
//                   labelStyle={{ color: "hsl(var(--muted-foreground))" }}
//                 />
//                 <Legend
//                   wrapperStyle={{
//                     fontSize: 10,
//                     color: "hsl(var(--muted-foreground))",
//                   }}
//                 />
//                 <Line
//                   yAxisId="pop"
//                   type="monotone"
//                   dataKey="population"
//                   stroke={sp.color}
//                   dot={false}
//                   strokeWidth={2}
//                   name="Cells"
//                   isAnimationActive={false}
//                 />
//                 <Line
//                   yAxisId="nutr"
//                   type="monotone"
//                   dataKey="nutrients"
//                   stroke="hsl(var(--muted-foreground))"
//                   dot={false}
//                   strokeWidth={1.5}
//                   strokeDasharray="4 2"
//                   name="Nutrients %"
//                   isAnimationActive={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </section>
//         </section>

//         {/* Controls Sidebar */}
//         <aside className="space-y-6">
//           {/* Species Selection */}
//           <section className="space-y-3">
//             <Label className="text-sm font-medium">Species</Label>
//             <Select
//               value={species}
//               onValueChange={(value: SpeciesKey) => {
//                 setSpecies(value);
//                 reset();
//               }}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select species" />
//               </SelectTrigger>
//               <SelectContent>
//                 {(Object.entries(SPECIES) as [SpeciesKey, SpeciesConfig][]).map(
//                   ([key, val]) => (
//                     <SelectItem key={key} value={key}>
//                       <span className="flex items-center gap-2">
//                         <span
//                           className="inline-block w-2 h-2 rounded-full"
//                           style={{ backgroundColor: val.color }}
//                         />
//                         {val.label}
//                       </span>
//                     </SelectItem>
//                   ),
//                 )}
//               </SelectContent>
//             </Select>
//             <p className="text-xs text-muted-foreground">
//               {SPECIES[species].description}
//             </p>
//           </section>

//           {/* Environment Selection */}
//           <section className="space-y-3 border-t border-border pt-4">
//             <Label className="text-sm font-medium">Environment</Label>
//             <div className="grid grid-cols-2 gap-2">
//               {(
//                 Object.entries(ENVIRONMENTS) as [
//                   EnvironmentKey,
//                   EnvironmentConfig,
//                 ][]
//               ).map(([key, val]) => (
//                 <Button
//                   key={key}
//                   variant={environment === key ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setEnvironment(key)}
//                   className="justify-start h-auto py-2 px-3 text-xs"
//                 >
//                   <span className="mr-1.5">{val.icon}</span>
//                   {val.label.split(" ")[0]}
//                 </Button>
//               ))}
//             </div>
//           </section>

//           {/* Speed Control */}
//           <section className="space-y-3 border-t border-border pt-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="speed" className="text-sm font-medium">
//                 Simulation Speed
//               </Label>
//               <span className="text-xs text-muted-foreground">{speed}x</span>
//             </div>
//             <input
//               id="speed"
//               type="range"
//               min={0.5}
//               max={5}
//               step={0.5}
//               value={speed}
//               onChange={(e) => setSpeed(Number(e.target.value))}
//               className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
//               aria-label="Simulation speed"
//             />
//             <div className="flex justify-between text-[10px] text-muted-foreground">
//               <span>0.5x</span>
//               <span>5x</span>
//             </div>
//           </section>

//           {/* Antibiotics Toggle */}
//           <section className="space-y-3 border-t border-border pt-4">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="antibiotics" className="text-sm font-medium">
//                 Antibiotics
//               </Label>
//               <Switch
//                 id="antibiotics"
//                 checked={antibiotics}
//                 onCheckedChange={setAntibiotics}
//               />
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {antibiotics
//                 ? "Bactericidal agent active — cells dying"
//                 : "No antibiotic treatment"}
//             </p>
//           </section>

//           {/* Live Stats */}
//           <section className="border-t border-border pt-4">
//             <h2 className="text-sm font-medium mb-3">Status</h2>
//             <dl className="space-y-2 text-sm">
//               {[
//                 ["Doubling Time", `${sp.doublingTime} min`],
//                 ["Environment", ENVIRONMENTS[environment].label],
//                 ["Elapsed", `${elapsedMin} min`],
//                 ["Population", population.toLocaleString()],
//                 ["Nutrients", `${nutrients}%`],
//                 ["Phase", phaseLabels[phase]],
//               ].map(([label, value]) => (
//                 <div key={label} className="flex justify-between">
//                   <dt className="text-muted-foreground">{label}</dt>
//                   <dd
//                     className={`font-medium ${
//                       label === "Phase" ? phaseColors[phase] : ""
//                     }`}
//                   >
//                     {value}
//                   </dd>
//                 </div>
//               ))}
//             </dl>
//           </section>

//           {/* Primary Actions */}
//           <div className="flex gap-2 pt-2">
//             <Button
//               onClick={() => setRunning((r) => !r)}
//               variant={running ? "secondary" : "default"}
//               className="flex-1 min-h-[44px]"
//             >
//               {running ? "Pause" : "Start"}
//             </Button>
//             <Button
//               variant="outline"
//               onClick={reset}
//               className="flex-1 min-h-[44px]"
//             >
//               Reset
//             </Button>
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   YAxisProps,
// } from "recharts";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type SpeciesKey = "ecoli" | "staph" | "bacillus" | "streptococcus";
// type EnvironmentKey = "optimal" | "warm" | "cool" | "acidic";
// type PhaseKey = "lag" | "exponential" | "stationary" | "decline";
// type ShapeType = "rod" | "coccus" | "chain";

// interface SpeciesConfig {
//   label: string;
//   color: string;
//   doublingTime: number;
//   maxPop: number;
//   shape: ShapeType;
//   description: string;
// }

// interface EnvironmentConfig {
//   label: string;
//   multiplier: number;
// }

// interface ChartPoint {
//   time: number;
//   population: number;
//   nutrients: number;
// }

// // ─── Constants ───────────────────────────────────────────────────────────────
// const SPECIES: Record<SpeciesKey, SpeciesConfig> = {
//   ecoli: {
//     label: "E. coli",
//     color: "#10b981",
//     doublingTime: 20,
//     maxPop: 800,
//     shape: "rod",
//     description: "Fast-dividing gram-negative rod",
//   },
//   staph: {
//     label: "S. aureus",
//     color: "#f59e0b",
//     doublingTime: 30,
//     maxPop: 600,
//     shape: "coccus",
//     description: "Spherical clusters, gram-positive",
//   },
//   bacillus: {
//     label: "B. subtilis",
//     color: "#3b82f6",
//     doublingTime: 45,
//     maxPop: 500,
//     shape: "rod",
//     description: "Spore-forming rod bacterium",
//   },
//   streptococcus: {
//     label: "Streptococcus",
//     color: "#ec4899",
//     doublingTime: 25,
//     maxPop: 700,
//     shape: "chain",
//     description: "Chain-forming spherical bacteria",
//   },
// };

// const ENVIRONMENTS: Record<EnvironmentKey, EnvironmentConfig> = {
//   optimal: { label: "Optimal (37°C)", multiplier: 1.0 },
//   warm: { label: "Warm (42°C)", multiplier: 0.7 },
//   cool: { label: "Cool (25°C)", multiplier: 0.4 },
//   acidic: { label: "Acidic (pH 5)", multiplier: 0.3 },
// };

// // ─── Particle Logic ──────────────────────────────────────────────────────────
// class BacteriaParticle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   species: SpeciesConfig;
//   angle: number;
//   angleV: number;
//   size: number;
//   canvasW: number;
//   canvasH: number;
//   pulse: number;
//   dividing: boolean;
//   divProgress: number;

//   constructor(x: number, y: number, species: SpeciesConfig, canvasW: number, canvasH: number) {
//     this.x = x;
//     this.y = y;
//     this.vx = (Math.random() - 0.5) * 0.5;
//     this.vy = (Math.random() - 0.5) * 0.5;
//     this.species = species;
//     this.angle = Math.random() * Math.PI * 2;
//     this.angleV = (Math.random() - 0.5) * 0.04;
//     this.size = species.shape === "coccus" || species.shape === "chain" ? 4 : 3;
//     this.canvasW = canvasW;
//     this.canvasH = canvasH;
//     this.pulse = Math.random() * Math.PI * 2;
//     this.dividing = false;
//     this.divProgress = 0;
//   }

//   update(speed: number) {
//     this.pulse += 0.05 * speed;
//     this.x += this.vx * speed;
//     this.y += this.vy * speed;
//     this.angle += this.angleV * speed;
//     if (this.x < 0 || this.x > this.canvasW) this.vx *= -1;
//     if (this.y < 0 || this.y > this.canvasH) this.vy *= -1;
//     this.x = Math.max(0, Math.min(this.canvasW, this.x));
//     this.y = Math.max(0, Math.min(this.canvasH, this.y));
//     if (this.dividing) {
//       this.divProgress = Math.min(1, this.divProgress + 0.03 * speed);
//       if (this.divProgress >= 1) this.dividing = false;
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     const sp = this.species;
//     const ps = 1 + Math.sin(this.pulse) * 0.1;
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(this.angle);
//     ctx.fillStyle = sp.color;

//     if (sp.shape === "coccus" || sp.shape === "chain") {
//       const r = this.size * ps;
//       if (this.dividing) {
//         const sep = r * this.divProgress * 1.5;
//         ctx.beginPath();
//         ctx.arc(-sep / 2, 0, r * 0.9, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(sep / 2, 0, r * 0.9, 0, Math.PI * 2);
//         ctx.fill();
//       } else {
//         ctx.beginPath();
//         ctx.arc(0, 0, r, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     } else {
//       const w = this.size * ps;
//       const h = this.size * 2.5 * ps;
//       ctx.beginPath();
//       ctx.roundRect(-w, -h, w * 2, h * 2, 4);
//       ctx.fill();
//       if (this.dividing) {
//         ctx.strokeStyle = "white";
//         ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(-w, 0);
//         ctx.lineTo(w, 0);
//         ctx.stroke();
//       }
//     }
//     ctx.restore();
//   }
// }

// // ─── Main Component ──────────────────────────────────────────────────────────
// export default function BacteriaSimulator() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animRef = useRef<number>(0);
//   const particlesRef = useRef<BacteriaParticle[]>([]);

//   // Simulation Refs
//   const runningRef = useRef(false);
//   const speciesRef = useRef<SpeciesKey>("ecoli");
//   const environmentRef = useRef<EnvironmentKey>("optimal");
//   const speedRef = useRef(1);
//   const antibioticsRef = useRef(false);
//   const nutrientsRef = useRef(100);
//   const elapsedRef = useRef(0);
//   const realPopRef = useRef(1);
//   const tickRef = useRef(0);
//   const lastChartTickRef = useRef(0);
//   const chartDataRef = useRef<ChartPoint[]>([]);

//   // UI State
//   const [running, setRunning] = useState(false);
//   const [species, setSpecies] = useState<SpeciesKey>("ecoli");
//   const [environment, setEnvironment] = useState<EnvironmentKey>("optimal");
//   const [speed, setSpeed] = useState(1);
//   const [antibiotics, setAntibiotics] = useState(false);
//   const [nutrients, setNutrients] = useState(100);
//   const [population, setPopulation] = useState(0);
//   const [phase, setPhase] = useState<PhaseKey>("lag");
//   const [chartData, setChartData] = useState<ChartPoint[]>([]);
//   const [elapsedMin, setElapsedMin] = useState(0);

//   // Sync
//   useEffect(() => { runningRef.current = running; }, [running]);
//   useEffect(() => { speciesRef.current = species; }, [species]);
//   useEffect(() => { environmentRef.current = environment; }, [environment]);
//   useEffect(() => { speedRef.current = speed; }, [speed]);
//   useEffect(() => { antibioticsRef.current = antibiotics; }, [antibiotics]);

//   const reset = useCallback(() => {
//     setRunning(false);
//     runningRef.current = false;
//     particlesRef.current = [];
//     tickRef.current = 0;
//     lastChartTickRef.current = 0;
//     elapsedRef.current = 0;
//     realPopRef.current = 1;
//     nutrientsRef.current = 100;
//     chartDataRef.current = [];
//     setPopulation(0);
//     setPhase("lag");
//     setChartData([]);
//     setElapsedMin(0);
//     setNutrients(100);
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;

//     const loop = () => {
//       animRef.current = requestAnimationFrame(loop);
//       const sp = SPECIES[speciesRef.current];
//       const env = ENVIRONMENTS[environmentRef.current];
//       const isRunning = runningRef.current;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = "#f8fafc"; // bg-slate-50
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       if (isRunning) {
//         tickRef.current += 1;
//         const dtMin = 0.05 * speedRef.current * env.multiplier;
//         elapsedRef.current += dtMin;

//         const nutr = nutrientsRef.current;
//         const maxPop = sp.maxPop * Math.max(0.01, nutr / 100);
        
//         if (!antibioticsRef.current && nutr > 2 && elapsedRef.current > sp.doublingTime * 0.2) {
//           const r = Math.log(2) / sp.doublingTime;
//           const N = realPopRef.current;
//           const dN = r * N * (1 - N / maxPop) * dtMin;
//           realPopRef.current = Math.max(1, Math.min(maxPop, N + dN));
//         }

//         if (antibioticsRef.current) {
//           realPopRef.current *= (1 - 0.05 * speedRef.current);
//         }

//         if (realPopRef.current > 5) {
//           nutrientsRef.current = Math.max(0, nutrientsRef.current - 0.002 * speedRef.current * (realPopRef.current / sp.maxPop));
//         }

//         const target = Math.round(realPopRef.current);
//         while (particlesRef.current.length < target && particlesRef.current.length < sp.maxPop) {
//           const p = new BacteriaParticle(Math.random() * canvas.width, Math.random() * canvas.height, sp, canvas.width, canvas.height);
//           p.dividing = true;
//           particlesRef.current.push(p);
//         }
//         if (particlesRef.current.length > target) {
//           particlesRef.current.splice(0, particlesRef.current.length - target);
//         }

//         if (tickRef.current - lastChartTickRef.current >= 30) {
//           lastChartTickRef.current = tickRef.current;
//           const newPoint = { time: Math.round(elapsedRef.current), population: particlesRef.current.length, nutrients: Math.round(nutrientsRef.current) };
//           chartDataRef.current = [...chartDataRef.current.slice(-100), newPoint];
//           setChartData([...chartDataRef.current]);
//           setPopulation(particlesRef.current.length);
//           setNutrients(Math.round(nutrientsRef.current));
//           setElapsedMin(Math.round(elapsedRef.current));
          
//           if (elapsedRef.current < sp.doublingTime * 0.5) setPhase("lag");
//           else if (particlesRef.current.length < maxPop * 0.8) setPhase("exponential");
//           else if (particlesRef.current.length < maxPop * 0.98) setPhase("stationary");
//           else setPhase("decline");
//         }
//       }

//       particlesRef.current.forEach(p => {
//         p.species = sp;
//         p.update(isRunning ? speedRef.current : 0.2);
//         p.draw(ctx);
//       });
//     };

//     loop();
//     return () => cancelAnimationFrame(animRef.current);
//   }, []);

//   return (
//     <div className="min-h-screen bg-background text-foreground antialiased p-6 md:p-12">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <header className="mb-12 border-b border-border pb-6">
//           <h1 className="text-2xl font-semibold tracking-tight">Bacterial Growth Simulator</h1>
//           <p className="text-muted-foreground text-sm mt-1">Real-time simulation of microbial population dynamics.</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//           {/* Left Column: Controls */}
//           <aside className="lg:col-span-4 space-y-10">
            
//             {/* Species Selection */}
//             <section className="space-y-4">
//               <label className="text-sm font-medium leading-none">Microorganism</label>
//               <div className="grid grid-cols-1 gap-2">
//                 {(Object.entries(SPECIES) as [SpeciesKey, SpeciesConfig][]).map(([key, val]) => (
//                   <button
//                     key={key}
//                     onClick={() => { setSpecies(key); reset(); }}
//                     className={`flex flex-col items-start p-3 text-left border rounded-md transition-sm ${
//                       species === key ? "bg-accent border-primary/50" : "bg-background border-border hover:bg-accent/50"
//                     }`}
//                   >
//                     <span className="text-sm font-medium flex items-center gap-2">
//                       <span className="w-2 h-2 rounded-full" style={{ backgroundColor: val.color }} />
//                       {val.label}
//                     </span>
//                     <span className="text-xs text-muted-foreground mt-1">{val.description}</span>
//                   </button>
//                 ))}
//               </div>
//             </section>

//             {/* Environment */}
//             <section className="space-y-4">
//               <label className="text-sm font-medium leading-none">Environment</label>
//               <select 
//                 value={environment}
//                 onChange={(e) => setEnvironment(e.target.value as EnvironmentKey)}
//                 className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
//               >
//                 {Object.entries(ENVIRONMENTS).map(([key, val]) => (
//                   <option key={key} value={key}>{val.label}</option>
//                 ))}
//               </select>
//             </section>

//             {/* Parameters */}
//             <section className="space-y-6 border-t border-border pt-6">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <label className="text-sm font-medium">Simulation Speed</label>
//                   <span className="text-xs font-mono text-muted-foreground">{speed}x</span>
//                 </div>
//                 <input
//                   type="range" min={0.5} max={5} step={0.5} value={speed}
//                   onChange={(e) => setSpeed(Number(e.target.value))}
//                   className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <label className="text-sm font-medium">Antibiotic Agent</label>
//                   <p className="text-xs text-muted-foreground">Induce bactericidal effects</p>
//                 </div>
//                 <button
//                   onClick={() => setAntibiotics(!antibiotics)}
//                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${antibiotics ? 'bg-destructive' : 'bg-muted'}`}
//                 >
//                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${antibiotics ? 'translate-x-6' : 'translate-x-1'}`} />
//                 </button>
//               </div>
//             </section>

//             {/* Actions */}
//             <div className="flex flex-col gap-3 pt-4">
//               <button
//                 onClick={() => setRunning(!running)}
//                 className={`w-full py-2.5 rounded-md text-sm font-medium transition-colors ${
//                   running ? "bg-muted text-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground hover:bg-primary/90"
//                 }`}
//               >
//                 {running ? "Pause Simulation" : "Start Simulation"}
//               </button>
//               <button
//                 onClick={reset}
//                 className="w-full py-2.5 rounded-md text-sm font-medium border border-border hover:bg-accent transition-colors"
//               >
//                 Reset
//               </button>
//             </div>
//           </aside>

//           {/* Right Column: Visualization */}
//           <main className="lg:col-span-8 space-y-8">
            
//             {/* Petri Dish View */}
//             <div className="space-y-3">
//               <div className="flex justify-between items-end">
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Microscopic View</h3>
//                 <div className="flex gap-4 text-xs font-mono">
//                   <span className="flex items-center gap-1.5">
//                     <span className="text-muted-foreground">Pop:</span> {population.toLocaleString()}
//                   </span>
//                   <span className="flex items-center gap-1.5">
//                     <span className="text-muted-foreground">Nutr:</span> {nutrients}%
//                   </span>
//                 </div>
//               </div>
//               <div className="border border-border rounded-lg overflow-hidden bg-slate-50 aspect-video relative">
//                 <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
//                 {!running && population === 0 && (
//                   <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground bg-background/50 backdrop-blur-[1px]">
//                     Click Start to begin simulation
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Growth Chart */}
//             <div className="space-y-3">
//               <div className="flex justify-between items-end">
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Growth Kinetics</h3>
//                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
//                   phase === 'exponential' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-border bg-muted text-muted-foreground'
//                 }`}>
//                   {phase.toUpperCase()} PHASE
//                 </span>
//               </div>
//               <div className="border border-border rounded-lg p-4 bg-background h-[240px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                     <XAxis dataKey="time" hide />
//                     <YAxis yAxisId="left" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
//                     <YAxis yAxisId="right" orientation="right" domain={[0, 100]} hide />
//                     <Tooltip 
//                       contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
//                     />
//                     <Line
//                       yAxisId="left"
//                       type="monotone"
//                       dataKey="population"
//                       stroke={SPECIES[species].color}
//                       strokeWidth={2}
//                       dot={false}
//                       isAnimationActive={false}
//                       name="Cells"
//                     />
//                     <Line
//                       yAxisId="right"
//                       type="monotone"
//                       dataKey="nutrients"
//                       stroke="#94a3b8"
//                       strokeWidth={1}
//                       strokeDasharray="4 4"
//                       dot={false}
//                       isAnimationActive={false}
//                       name="Nutrients %"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Live Stats Table */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
//               <div className="space-y-1">
//                 <p className="text-[10px] font-medium text-muted-foreground uppercase">Elapsed Time</p>
//                 <p className="text-sm font-mono">{elapsedMin} min</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-[10px] font-medium text-muted-foreground uppercase">Doubling Time</p>
//                 <p className="text-sm font-mono">{SPECIES[species].doublingTime} min</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-[10px] font-medium text-muted-foreground uppercase">Env. Multiplier</p>
//                 <p className="text-sm font-mono">{ENVIRONMENTS[environment].multiplier}x</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-[10px] font-medium text-muted-foreground uppercase">Status</p>
//                 <p className="text-sm font-medium">{running ? "Active" : "Paused"}</p>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    color: "#16a34a",
    glowColor: "rgba(22,163,74,0.4)",
    doublingTime: 20,
    maxPop: 800,
    shape: "rod",
    description: "Fast-dividing gram-negative rod",
  },
  staph: {
    label: "S. aureus",
    color: "#ca8a04",
    glowColor: "rgba(202,138,4,0.4)",
    doublingTime: 30,
    maxPop: 600,
    shape: "coccus",
    description: "Spherical clusters, gram-positive",
  },
  bacillus: {
    label: "B. subtilis",
    color: "#2563eb",
    glowColor: "rgba(37,99,235,0.4)",
    doublingTime: 45,
    maxPop: 500,
    shape: "rod",
    description: "Spore-forming rod bacterium",
  },
  streptococcus: {
    label: "Streptococcus",
    color: "#db2777",
    glowColor: "rgba(219,39,119,0.4)",
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

// ─── Particle class ───────────────────────────────────────────────────────────
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
    canvasH: number
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
    }
    ctx.restore();
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getPhase(
  pop: number,
  maxPop: number,
  elapsedMin: number,
  doublingTime: number
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
  canvasH: number
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

  const runningRef = useRef(false);
  const speciesRef = useRef<SpeciesKey>("ecoli");
  const environmentRef = useRef<EnvironmentKey>("optimal");
  const speedRef = useRef(1);
  const antibioticsRef = useRef(false);
  const nutrientsRef = useRef(100);
  const elapsedRef = useRef(0);
  const realPopRef = useRef(1);
  const tickRef = useRef(0);
  const lastChartTickRef = useRef(0);
  const chartDataRef = useRef<ChartPoint[]>([]);

  const [running, setRunning] = useState(false);
  const [species, setSpecies] = useState<SpeciesKey>("ecoli");
  const [environment, setEnvironment] = useState<EnvironmentKey>("optimal");
  const [speed, setSpeed] = useState(1);
  const [antibiotics, setAntibiotics] = useState(false);
  const [population, setPopulation] = useState(0);
  const [nutrients, setNutrients] = useState(100);
  const [phase, setPhase] = useState<PhaseKey>("lag");
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [elapsedMin, setElapsedMin] = useState(0);

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
    setAntibiotics(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

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
            canvas.height
          )
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

      // Clear canvas cleanly without trails
      ctx.fillStyle = "#f8fafc"; // background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isRunning) {
        tickRef.current += 1;
        const dtMin = 0.05 * spd * env.multiplier;
        elapsedRef.current += dtMin;

        const nutr = nutrientsRef.current;
        const maxPop = sp.maxPop * Math.max(0.01, nutr / 100);
        const elapsed = elapsedRef.current;
        const doublingTime = sp.doublingTime;

        if (
          !antibioticsRef.current &&
          nutr > 2 &&
          elapsed > doublingTime * 0.25
        ) {
          const r = Math.log(2) / doublingTime;
          const N = realPopRef.current;
          const K = maxPop;
          const dN = r * N * (1 - N / K) * dtMin;
          realPopRef.current = Math.max(1, Math.min(K, N + dN));
        }

        if (antibioticsRef.current) {
          const killRate = 0.08 * spd;
          realPopRef.current = Math.max(0, realPopRef.current * (1 - killRate));
        }

        if (realPopRef.current > 5) {
          nutrientsRef.current = Math.max(
            0,
            nutrientsRef.current -
              0.003 * spd * (realPopRef.current / sp.maxPop)
          );
        }

        const targetParticles = Math.min(
          sp.maxPop,
          Math.max(0, Math.round(realPopRef.current))
        );
        const currentCount = particlesRef.current.length;

        if (targetParticles > currentCount) {
          const toAdd = Math.min(targetParticles - currentCount, 20);
          for (let i = 0; i < toAdd; i++) {
            const p = spawnParticle(
              particlesRef.current,
              sp,
              canvas.width,
              canvas.height
            );
            p.dividing = true;
            p.divProgress = 0;
            particlesRef.current.push(p);
          }
        } else if (targetParticles < currentCount) {
          const toRemove = currentCount - targetParticles;
          particlesRef.current.splice(
            Math.floor(Math.random() * particlesRef.current.length),
            Math.min(toRemove, 10)
          );
        }

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

      particlesRef.current.forEach((p) => {
        p.species = SPECIES[speciesRef.current];
        p.update(isRunning ? spd : 0.3);
        p.draw(ctx);
      });
    };

    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const sp = SPECIES[species];

  const phaseColors: Record<PhaseKey, string> = {
    lag: "bg-gray-200 text-gray-600",
    exponential: "bg-green-100 text-green-700 border-green-200",
    stationary: "bg-yellow-100 text-yellow-700 border-yellow-200",
    decline: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              BioSim
            </h1>
            <p className="text-sm text-muted-foreground">
              Bacterial Growth Dynamics
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setRunning((r) => !r)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                running
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Reset
            </button>
          </div>
        </header>

        {/* Main Visualization Area */}
        <section className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Canvas Column */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded border ${phaseColors[phase]}`}>
                  {phase.toUpperCase()}
                </span>
                <span>Population: {population.toLocaleString()}</span>
              </div>
              <span>T: {elapsedMin} min</span>
            </div>
            
            <div className="relative border rounded-md overflow-hidden bg-muted/30 aspect-[2/1]">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-full object-contain"
              />
              {running && nutrients < 20 && (
                <div className="absolute bottom-2 left-2 text-xs text-destructive font-medium bg-destructive/10 px-2 py-1 rounded">
                  Low Nutrients
                </div>
              )}
            </div>
          </div>

          {/* Controls Column */}
          <aside className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Species
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(SPECIES) as [SpeciesKey, SpeciesConfig][]).map(
                  ([key, val]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSpecies(key);
                        reset();
                      }}
                      className={`px-3 py-2 rounded border text-xs text-left transition-colors ${
                        species === key
                          ? "bg-accent border-primary text-accent-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span
                        style={{ color: val.color }}
                        className="font-semibold block"
                      >
                        {val.label}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Environment
              </label>
              <div className="flex flex-wrap gap-1">
                {(
                  Object.entries(ENVIRONMENTS) as [
                    EnvironmentKey,
                    EnvironmentConfig
                  ][]
                ).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setEnvironment(key)}
                    className={`px-2 py-1 rounded border text-xs transition-colors ${
                      environment === key
                        ? "bg-accent border-primary text-accent-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {val.icon} {val.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="speed"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Speed ({speed}x)
                </label>
              </div>
              <input
                id="speed"
                type="range"
                min={0.5}
                max={5}
                step={0.5}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <label
                htmlFor="antibiotics"
                className="text-sm font-medium text-foreground"
              >
                Antibiotics
              </label>
              <button
                id="antibiotics"
                role="switch"
                aria-checked={antibiotics}
                onClick={() => setAntibiotics((a) => !a)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  antibiotics ? "bg-destructive" : "bg-input"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    antibiotics ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-4">
              <div className="flex justify-between">
                <span>Nutrients</span>
                <span
                  className={`font-mono ${
                    nutrients < 20
                      ? "text-destructive"
                      : nutrients < 50
                      ? "text-yellow-600"
                      : "text-foreground"
                  }`}
                >
                  {nutrients}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    nutrients < 20
                      ? "bg-destructive"
                      : nutrients < 50
                      ? "bg-yellow-500"
                      : "bg-primary"
                  }`}
                  style={{ width: `${nutrients}%` }}
                />
              </div>
            </div>
          </aside>
        </section>

        {/* Data Visualization */}
        <section className="border-t border-border pt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
            Growth Kinetics
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  yAxisId="pop"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="nutr"
                  orientation="right"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    fontSize: 11,
                  }}
                />
                <Line
                  yAxisId="pop"
                  type="monotone"
                  dataKey="population"
                  stroke={sp.color}
                  dot={false}
                  strokeWidth={2}
                  name="Cells"
                />
                <Line
                  yAxisId="nutr"
                  type="monotone"
                  dataKey="nutrients"
                  stroke="hsl(var(--muted-foreground))"
                  dot={false}
                  strokeWidth={1}
                  strokeDasharray="4 2"
                  name="Nutrients"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
