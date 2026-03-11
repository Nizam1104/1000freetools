"use client";

import { useState, useRef, useCallback, ChangeEvent, PointerEvent, useEffect } from "react";

const PRESETS = [8, 16, 20, 24, 32, 48, 64];
const PALETTE = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#64748b",
  "#a16207",
  "#166534",
  "#1e40af",
  "#6d28d9",
];

type Cells = Record<string, string>;
type SymmetryMode = "none" | "horizontal" | "vertical" | "both" | "radial";
type DrawMode = "draw" | "erase" | "fill";

interface CellPosition {
  row: number;
  col: number;
}

function buildSVG(
  cells: Cells,
  gridSize: number,
  cellSizePx: number,
  bgColor: string,
  strokeColor: string,
  showGrid: boolean,
): string {
  const size = gridSize * cellSizePx;
  const rects: string[] = [];

  for (const [key, color] of Object.entries(cells)) {
    const [r, c] = key.split("-").map(Number);
    rects.push(
      `<rect x="${c * cellSizePx}" y="${r * cellSizePx}" width="${cellSizePx}" height="${cellSizePx}" fill="${color}" />`,
    );
  }

  const gridLines: string[] = [];
  if (showGrid) {
    for (let i = 0; i <= gridSize; i++) {
      gridLines.push(
        `<line x1="${i * cellSizePx}" y1="0" x2="${i * cellSizePx}" y2="${size}" stroke="${strokeColor}" stroke-width="0.5" />`,
      );
      gridLines.push(
        `<line x1="0" y1="${i * cellSizePx}" x2="${size}" y2="${i * cellSizePx}" stroke="${strokeColor}" stroke-width="0.5" />`,
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bgColor}" />
  ${rects.join("\n  ")}
  ${gridLines.join("\n  ")}
</svg>`;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="border-b border-gray-800 p-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

interface SavedSVG {
  id: string;
  name: string;
  cells: Cells;
  gridSize: number;
  bgColor: string;
  strokeColor: string;
  showGrid: boolean;
  symmetry: SymmetryMode;
  timestamp: number;
}

const MAX_SAVED_SVGS = 20;
const STORAGE_KEY = "svgMakerSavedSVGs";

export default function SVGGridMaker() {
  const [gridSize, setGridSize] = useState<number>(16);
  const [cells, setCells] = useState<Cells>({});
  const [mode, setMode] = useState<DrawMode>("draw");
  const [activeColor, setActiveColor] = useState<string>("#000000");
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [strokeColor, setStrokeColor] = useState<string>("#cccccc");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [svgOutput, setSvgOutput] = useState<string>("");
  const [exported, setExported] = useState<boolean>(false);
  const [symmetry, setSymmetry] = useState<SymmetryMode>("none");
  const [history, setHistory] = useState<Cells[]>([{}]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [savedSVGs, setSavedSVGs] = useState<SavedSVG[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.sort((a: SavedSVG, b: SavedSVG) => b.timestamp - a.timestamp);
      } catch (e) {
        console.error("Failed to load saved SVGs:", e);
      }
    }
    return [];
  });
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [svgName, setSvgName] = useState<string>("");
  const [showSavedList, setShowSavedList] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const cellSizePx = Math.max(4, Math.floor(600 / gridSize));
  const canvasSize = gridSize * cellSizePx;

  // Persist saved SVGs whenever they change
  const persistSavedSVGs = useCallback((svgs: SavedSVG[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(svgs));
    setSavedSVGs(svgs);
  }, []);

  const commitHistory = useCallback(
    (newCells: Cells) => {
      setHistory((prev) => {
        const trimmed = prev.slice(0, historyIndex + 1);
        return [...trimmed, { ...newCells }];
      });
      setHistoryIndex((prev) => prev + 1);
      setIsSaved(false);
    },
    [historyIndex],
  );

  const undo = () => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      setCells({ ...history[idx] });
      setHistoryIndex(idx);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      setCells({ ...history[idx] });
      setHistoryIndex(idx);
    }
  };

  const getSymmetricCells = useCallback(
    (row: number, col: number): number[][] => {
      const positions: number[][] = [[row, col]];
      const max = gridSize - 1;
      if (symmetry === "horizontal" || symmetry === "both")
        positions.push([max - row, col]);
      if (symmetry === "vertical" || symmetry === "both")
        positions.push([row, max - col]);
      if (symmetry === "both") positions.push([max - row, max - col]);
      if (symmetry === "radial") {
        positions.push([col, max - row]);
        positions.push([max - row, max - col]);
        positions.push([max - col, row]);
      }
      return positions;
    },
    [gridSize, symmetry],
  );

  const paintCell = useCallback(
    (
      row: number,
      col: number,
      currentCells: Cells,
    ): Cells => {
      if (row < 0 || row >= gridSize || col < 0 || col >= gridSize)
        return currentCells;
      const updated = { ...currentCells };
      const positions = getSymmetricCells(row, col);
      for (const [r, c] of positions) {
        if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
          const key = `${r}-${c}`;
          if (mode === "erase") {
            delete updated[key];
          } else {
            updated[key] = activeColor;
          }
        }
      }
      return updated;
    },
    [mode, activeColor, gridSize, getSymmetricCells],
  );

  const floodFill = useCallback(
    (startRow: number, startCol: number) => {
      const key = `${startRow}-${startCol}`;
      const targetColor = cells[key] || null;
      if (targetColor === activeColor) return;

      const updated = { ...cells };
      const queue: number[][] = [[startRow, startCol]];
      const visited = new Set<string>();

      while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        const k = `${r}-${c}`;
        if (visited.has(k)) continue;
        if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) continue;
        const cellColor = updated[k] || null;
        if (cellColor !== targetColor) continue;
        visited.add(k);
        updated[k] = activeColor;
        queue.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      }

      setCells(updated);
      commitHistory(updated);
    },
    [cells, activeColor, gridSize, commitHistory],
  );

  const getCellFromEvent = (
    e: PointerEvent<HTMLDivElement>,
  ): CellPosition | null => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const col = Math.floor((e.clientX - rect.left) / cellSizePx);
    const row = Math.floor((e.clientY - rect.top) / cellSizePx);
    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return null;
    return { row, col };
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsPointerDown(true);
    const pos = getCellFromEvent(e);
    if (!pos) return;
    if (mode === "fill") {
      floodFill(pos.row, pos.col);
      return;
    }
    setCells((prev) => {
      const updated = paintCell(pos.row, pos.col, prev);
      return updated;
    });
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown || mode === "fill") return;
    const pos = getCellFromEvent(e);
    if (!pos) return;
    setCells((prev) => paintCell(pos.row, pos.col, prev));
  };

  const handlePointerUp = () => {
    if (isPointerDown) {
      commitHistory(cells);
    }
    setIsPointerDown(false);
  };

  const clearAll = () => {
    setCells({});
    commitHistory({});
    setIsSaved(false);
  };

  const saveDrawing = () => {
    setShowSaveModal(true);
    setSvgName(`SVG_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}`);
  };

  const confirmSaveDrawing = () => {
    if (!svgName.trim()) {
      alert("Please enter a name for your SVG");
      return;
    }

    const newSVG: SavedSVG = {
      id: crypto.randomUUID(),
      name: svgName.trim(),
      cells: { ...cells },
      gridSize,
      bgColor,
      strokeColor,
      showGrid,
      symmetry,
      timestamp: Date.now(),
    };

    const updatedSVGs = [...savedSVGs];
    
    // Check if we're updating an existing SVG with the same name
    const existingIndex = updatedSVGs.findIndex(
      (svg) => svg.name === svgName.trim()
    );

    if (existingIndex !== -1) {
      // Update existing
      updatedSVGs[existingIndex] = { ...newSVG, id: updatedSVGs[existingIndex].id };
    } else {
      // Add new
      if (updatedSVGs.length >= MAX_SAVED_SVGS) {
        // Remove oldest
        updatedSVGs.pop();
      }
      updatedSVGs.unshift(newSVG);
    }

    persistSavedSVGs(updatedSVGs);
    setIsSaved(true);
    setShowSaveModal(false);
    setSvgName("");
  };

  const loadDrawing = (savedSVG?: SavedSVG) => {
    if (savedSVG) {
      // Load specific saved SVG
      setCells(savedSVG.cells || {});
      setGridSize(savedSVG.gridSize || 16);
      setBgColor(savedSVG.bgColor || "#ffffff");
      setStrokeColor(savedSVG.strokeColor || "#cccccc");
      setShowGrid(savedSVG.showGrid ?? true);
      setSymmetry(savedSVG.symmetry || "none");
      commitHistory(savedSVG.cells || {});
      setIsSaved(true);
      setShowSavedList(false);
    } else {
      // Legacy load (kept for backward compatibility)
      const saved = localStorage.getItem("svgMakerDrawing");
      if (saved) {
        const data = JSON.parse(saved);
        setCells(data.cells || {});
        setGridSize(data.gridSize || 16);
        setBgColor(data.bgColor || "#ffffff");
        setStrokeColor(data.strokeColor || "#cccccc");
        setShowGrid(data.showGrid ?? true);
        setSymmetry(data.symmetry || "none");
        commitHistory(data.cells || {});
        setIsSaved(true);
      }
    }
  };

  const deleteSavedSVG = (id: string) => {
    const updated = savedSVGs.filter((svg) => svg.id !== id);
    persistSavedSVGs(updated);
  };

  const exportSVG = () => {
    const svg = buildSVG(
      cells,
      gridSize,
      cellSizePx,
      bgColor,
      strokeColor,
      false,
    );
    setSvgOutput(svg);
    setExported(true);
  };

  const downloadSVG = () => {
    const svg = buildSVG(
      cells,
      gridSize,
      cellSizePx,
      bgColor,
      strokeColor,
      false,
    );
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Use the most recent saved name or default
    const fileName = savedSVGs.length > 0 && savedSVGs[0].name
      ? `${savedSVGs[0].name.replace(/[^a-z0-9]/gi, "_")}.svg`
      : "icon.svg";
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySVG = () => {
    const svg = buildSVG(
      cells,
      gridSize,
      cellSizePx,
      bgColor,
      strokeColor,
      false,
    );
    navigator.clipboard.writeText(svg);
  };

  const changeGridSize = (newSize: number) => {
    if (!isSaved && Object.keys(cells).length > 0) {
      const confirmChange = window.confirm(
        "You have unsaved changes. Would you like to save before changing the grid size?",
      );
      if (confirmChange) {
        saveDrawing();
      }
    }
    setGridSize(newSize);
    setCells({});
    setHistory([{}]);
    setHistoryIndex(0);
    setIsSaved(false);
  };

  // Mark as unsaved when any canvas setting changes
  const handleBgColorChange = (color: string) => {
    setBgColor(color);
    setIsSaved(false);
  };

  const handleStrokeColorChange = (color: string) => {
    setStrokeColor(color);
    setIsSaved(false);
  };

  const handleShowGridChange = () => {
    setShowGrid((v) => !v);
    setIsSaved(false);
  };

  const filledCount = Object.keys(cells).length;
  const totalCells = gridSize * gridSize;

  return (
    <div className="flex w-full min-h-screen bg-gray-950 text-gray-100 font-mono">
      {/* Grid Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto">
        <div className="mb-4 flex items-center gap-3 text-xs text-gray-400">
          <span>
            {gridSize} × {gridSize}
          </span>
          <span>·</span>
          <span>
            {filledCount} / {totalCells} cells
          </span>
          <span>·</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
              mode === "draw"
                ? "bg-blue-600 text-white"
                : mode === "erase"
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
            }`}
          >
            {mode}
          </span>
          <span>·</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
              isSaved
                ? "bg-green-600 text-white"
                : "bg-orange-600 text-white"
            }`}
          >
            {isSaved ? "Saved" : "Unsaved"}
          </span>
        </div>

        <div
          ref={gridRef}
          className="border border-gray-700 cursor-crosshair select-none"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, ${cellSizePx}px)`,
            gridTemplateRows: `repeat(${gridSize}, ${cellSizePx}px)`,
            width: canvasSize,
            height: canvasSize,
            backgroundColor: bgColor,
            touchAction: "none",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {Array.from({ length: gridSize * gridSize }, (_, i) => {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const key = `${row}-${col}`;
            const color = cells[key];
            return (
              <div
                key={key}
                style={{
                  width: cellSizePx,
                  height: cellSizePx,
                  backgroundColor: color || "transparent",
                  boxSizing: "border-box",
                  border: showGrid ? `0.5px solid ${strokeColor}` : "none",
                }}
              />
            );
          })}
        </div>

        {/* Undo/Redo under canvas */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={undo}
            disabled={historyIndex === 0}
            className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-30 rounded border border-gray-700"
          >
            ↩ Undo
          </button>
          <button
            onClick={redo}
            disabled={historyIndex === history.length - 1}
            className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 disabled:opacity-30 rounded border border-gray-700"
          >
            Redo ↪
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col overflow-y-auto">
        {/* Tools */}
        <Section title="Tools">
          <div className="flex gap-2">
            {[
              { id: "draw" as DrawMode, label: "✏ Draw" },
              { id: "erase" as DrawMode, label: "⌫ Erase" },
              { id: "fill" as DrawMode, label: "⬛ Fill" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`flex-1 py-1.5 text-xs rounded border transition-colors ${
                  mode === id
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Section>

        {/* Active Color */}
        <Section title="Active Color">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded border border-gray-600 flex-shrink-0"
              style={{ backgroundColor: activeColor }}
            />
            <input
              type="color"
              value={activeColor}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setActiveColor(e.target.value)
              }
              className="w-full h-8 cursor-pointer bg-transparent border border-gray-700 rounded"
            />
          </div>
          <div className="grid grid-cols-8 gap-1">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setActiveColor(c)}
                className={`w-6 h-6 rounded border-2 transition-transform hover:scale-110 ${
                  activeColor === c
                    ? "border-white scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <input
              type="text"
              value={customColor}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomColor(e.target.value)
              }
              placeholder="#hex or rgb()"
              className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200 placeholder-gray-500"
            />
            <button
              onClick={() => setActiveColor(customColor)}
              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded border border-gray-600"
            >
              Set
            </button>
          </div>
        </Section>

        {/* Grid Settings */}
        <Section title="Grid Size">
          <div className="flex flex-wrap gap-1 mb-2">
            {PRESETS.map((s) => (
              <button
                key={s}
                onClick={() => changeGridSize(s)}
                className={`px-2 py-1 text-xs rounded border ${
                  gridSize === s
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {s}×{s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 w-16">Custom:</label>
            <input
              type="number"
              min={4}
              max={100}
              value={gridSize}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const val = Number(e.target.value);
                if (val >= 4 && val <= 100) {
                  changeGridSize(val);
                }
              }}
              className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200"
            />
            <span className="text-xs text-gray-400">× </span>
            <input
              type="number"
              min={4}
              max={100}
              value={gridSize}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const val = Number(e.target.value);
                if (val >= 4 && val <= 100) {
                  changeGridSize(val);
                }
              }}
              className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-200"
            />
          </div>
        </Section>

        {/* Canvas Options */}
        <Section title="Canvas">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400 w-20">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleBgColorChange(e.target.value)
                }
                className="flex-1 h-7 cursor-pointer bg-transparent border border-gray-700 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400 w-20">Grid lines</label>
              <input
                type="color"
                value={strokeColor}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleStrokeColorChange(e.target.value)
                }
                className="flex-1 h-7 cursor-pointer bg-transparent border border-gray-700 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400 w-20">Show grid</label>
              <button
                onClick={handleShowGridChange}
                className={`px-3 py-1 text-xs rounded border ${
                  showGrid
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400"
                }`}
              >
                {showGrid ? "On" : "Off"}
              </button>
            </div>
          </div>
        </Section>

        {/* Symmetry */}
        <Section title="Symmetry">
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: "none" as SymmetryMode, label: "None" },
              { id: "horizontal" as SymmetryMode, label: "H-Mirror" },
              { id: "vertical" as SymmetryMode, label: "V-Mirror" },
              { id: "both" as SymmetryMode, label: "4-way" },
              { id: "radial" as SymmetryMode, label: "Radial" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSymmetry(id)}
                className={`py-1 text-xs rounded border ${
                  symmetry === id
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Section>

        {/* Actions */}
        <Section title="Actions">
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                onClick={saveDrawing}
                className={`flex-1 py-1.5 text-xs rounded border font-bold ${
                  isSaved
                    ? "bg-green-700 hover:bg-green-600 border-green-600 text-white"
                    : "bg-blue-700 hover:bg-blue-600 border-blue-600 text-white"
                }`}
              >
                {isSaved ? "✓ Saved" : "💾 Save"}
              </button>
              <button
                onClick={() => setShowSavedList(!showSavedList)}
                className={`flex-1 py-1.5 text-xs rounded border font-bold ${
                  showSavedList
                    ? "bg-purple-700 hover:bg-purple-600 border-purple-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                }`}
              >
                📂 Saved ({savedSVGs.length}/{MAX_SAVED_SVGS})
              </button>
            </div>
            <button
              onClick={clearAll}
              className="w-full py-1.5 text-xs bg-red-900 hover:bg-red-800 border border-red-700 rounded text-red-200"
            >
              🗑 Clear Canvas
            </button>
            <button
              onClick={exportSVG}
              className="w-full py-1.5 text-xs bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded"
            >
              👁 Preview SVG
            </button>
            <button
              onClick={copySVG}
              className="w-full py-1.5 text-xs bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded"
            >
              📋 Copy SVG Code
            </button>
            <button
              onClick={downloadSVG}
              className="w-full py-1.5 text-xs bg-blue-700 hover:bg-blue-600 border border-blue-600 rounded font-bold"
            >
              ⬇ Download SVG
            </button>
          </div>
        </Section>

        {/* SVG Preview */}
        {exported && svgOutput && (
          <Section title="SVG Preview">
            <div
              className="w-full aspect-square border border-gray-700 rounded bg-gray-800 flex items-center justify-center overflow-hidden"
              dangerouslySetInnerHTML={{ __html: svgOutput }}
            />
            <details className="mt-2">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-300">
                View code
              </summary>
              <pre className="mt-1 text-xs text-gray-400 bg-gray-950 rounded p-2 overflow-x-auto max-h-40 whitespace-pre-wrap break-all">
                {svgOutput}
              </pre>
            </details>
          </Section>
        )}

        {/* Saved SVGs List */}
        {showSavedList && (
          <Section title="Saved SVGs">
            {savedSVGs.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-2">
                No saved SVGs yet. Create and save your first design!
              </p>
            ) : (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {savedSVGs.map((svg) => (
                  <div
                    key={svg.id}
                    className="flex items-center justify-between gap-2 p-2 bg-gray-800 rounded border border-gray-700 hover:border-gray-600"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-200 font-medium truncate">
                        {svg.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {svg.gridSize}×{svg.gridSize} • {Object.keys(svg.cells).length} cells
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => loadDrawing(svg)}
                        className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-500 rounded border border-blue-500 text-white"
                        title="Load"
                      >
                        📂
                      </button>
                      <button
                        onClick={() => deleteSavedSVG(svg.id)}
                        className="px-2 py-1 text-xs bg-red-600 hover:bg-red-500 rounded border border-red-500 text-white"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-100 mb-4">Save SVG</h2>
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-2">
                SVG Name
              </label>
              <input
                type="text"
                value={svgName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSvgName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Enter a name for your SVG"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    confirmSaveDrawing();
                  } else if (e.key === "Escape") {
                    setShowSaveModal(false);
                  }
                }}
              />
              {savedSVGs.some((s) => s.name === svgName.trim()) && svgName.trim() && (
                <p className="text-xs text-amber-500 mt-1">
                  ⚠ This will overwrite the existing SVG with this name
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={confirmSaveDrawing}
                className="flex-1 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded border border-blue-500 text-white font-medium"
              >
                💾 Save
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 text-gray-200"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Maximum {MAX_SAVED_SVGS} SVGs can be saved. Oldest will be removed when limit is reached.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
