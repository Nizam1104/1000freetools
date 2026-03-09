"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Trash2, Download, Plus, X } from "lucide-react";

const PROFILE_COLORS = [
  "#25D366",
  "#34B7F1",
  "#877DD3",
  "#F5688D",
  "#F8A61B",
  "#4A90E2",
  "#BD10E0",
  "#50E3C2",
];

const THEME_COLORS = {
  default: { bg: "#EFE5CE", header: "#075E54", accent: "#25D366" },
  blue: { bg: "#E3F2FD", header: "#1565C0", accent: "#1976D2" },
  green: { bg: "#E8F5E9", header: "#2E7D32", accent: "#43A047" },
  purple: { bg: "#F3E5F5", header: "#6A1B9A", accent: "#8E24AA" },
  orange: { bg: "#FFF3E0", header: "#E65100", accent: "#F57C00" },
};

interface Message {
  id: string;
  text: string;
  isSender: boolean;
  time: string;
  delivered: boolean;
}

interface ChatInfo {
  contactName: string;
  phoneNumber: string;
  profileColor: string;
  themeColor: keyof typeof THEME_COLORS;
  time: string;
  batteryLevel: number;
  wifiSignal: boolean;
}

interface Bubble extends Message {
  lines: string[];
  bubbleH: number;
  sameLine: boolean;
  timeW: number;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function buildCanvas(messages: Message[], chatInfo: ChatInfo) {
  const scale = 2;
  const W = 390;
  const theme = THEME_COLORS[chatInfo.themeColor];

  // --- measure pass ---
  const offscreen = document.createElement("canvas");
  offscreen.width = W * scale;
  offscreen.height = 100 * scale;
  const mctx = offscreen.getContext("2d");
  if (!mctx) throw new Error("Could not get canvas context");
  mctx.scale(scale, scale);

  const PADDING = 12;
  const MAX_BUBBLE = W * 0.72;
  const FONT_MSG = "14px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  const FONT_TIME = "11px -apple-system, BlinkMacSystemFont, Arial, sans-serif";

  mctx.font = FONT_MSG;

  // compute bubble heights
  const bubbles = messages.map((msg) => {
    const lines = wrapText(mctx, msg.text, MAX_BUBBLE - 24);
    mctx.font = FONT_TIME;
    const timeW = mctx.measureText(
      msg.time + (msg.isSender ? "  ✓✓" : ""),
    ).width;
    mctx.font = FONT_MSG;
    // last line + time fit on same row?
    const lastLineW = mctx.measureText(lines[lines.length - 1]).width;
    const sameLine = lastLineW + timeW + 8 <= MAX_BUBBLE - 24;
    const bubbleH = lines.length * 20 + (sameLine ? 0 : 18) + 20;
    return { ...msg, lines, bubbleH, sameLine, timeW };
  });

  const STATUS_H = 28;
  const HEADER_H = 60;
  const INPUT_H = 60;
  const MSG_PAD_V = 6;
  const msgAreaH =
    bubbles.reduce((acc, b) => acc + b.bubbleH + MSG_PAD_V, 0) + 16;
  const totalH = STATUS_H + HEADER_H + Math.max(msgAreaH, 300) + INPUT_H;

  // --- draw pass ---
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = totalH * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.scale(scale, scale);

  // Status bar
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, W, STATUS_H);
  ctx.fillStyle = "#111";
  ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.fillText(chatInfo.time, 16, 18);
  // battery
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 1;
  ctx.strokeRect(W - 36, 10, 20, 10);
  ctx.fillStyle = "#111";
  ctx.fillRect(W - 35, 11, (chatInfo.batteryLevel / 100) * 18, 8);
  // wifi
  ctx.fillStyle = "#111";
  ctx.font = "12px -apple-system";
  ctx.fillText("WiFi", W - 62, 19);

  // Header
  ctx.fillStyle = theme.header;
  ctx.fillRect(0, STATUS_H, W, HEADER_H);
  // avatar circle
  ctx.beginPath();
  ctx.arc(38, STATUS_H + 30, 20, 0, Math.PI * 2);
  ctx.fillStyle = chatInfo.profileColor;
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(getInitials(chatInfo.contactName), 38, STATUS_H + 35);
  ctx.textAlign = "left";
  // name + phone
  ctx.fillStyle = "#fff";
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.fillText(chatInfo.contactName, 68, STATUS_H + 26);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "12px -apple-system, BlinkMacSystemFont, Arial, sans-serif";
  ctx.fillText(chatInfo.phoneNumber, 68, STATUS_H + 44);

  // Messages area
  const msgsTop = STATUS_H + HEADER_H;
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, msgsTop, W, totalH - STATUS_H - HEADER_H - INPUT_H);

  let cy = msgsTop + 12;
  for (const b of bubbles) {
    const bubbleW = Math.min(
      Math.max(
        ...b.lines.map((l) => {
          ctx.font = FONT_MSG;
          return ctx.measureText(l).width;
        }),
        b.timeW,
      ) + 28,
      MAX_BUBBLE,
    );
    const bx = b.isSender ? W - PADDING - bubbleW : PADDING;

    // bubble bg
    roundRect(ctx, bx, cy, bubbleW, b.bubbleH, 10);
    ctx.fillStyle = b.isSender ? "#DCF8C6" : "#FFFFFF";
    ctx.fill();

    // text lines
    ctx.fillStyle = "#111";
    ctx.font = FONT_MSG;
    b.lines.forEach((line, i) => {
      ctx.fillText(line, bx + 12, cy + 16 + i * 20);
    });

    // time + ticks
    const timeY = b.sameLine
      ? cy + 12 + (b.lines.length - 1) * 20 + 4
      : cy + b.bubbleH - 6;
    ctx.font = FONT_TIME;
    ctx.fillStyle = b.isSender ? "#4CAF50" : "#999";
    const timeX = bx + bubbleW - b.timeW - 10;
    ctx.fillText(b.time, timeX, timeY);
    if (b.isSender) {
      ctx.fillText("✓✓", timeX + b.timeW + 2, timeY);
    }

    cy += b.bubbleH + MSG_PAD_V;
  }

  // Input bar
  const inputY = totalH - INPUT_H;
  ctx.fillStyle = "#F5F5F5";
  ctx.fillRect(0, inputY, W, INPUT_H);
  // mic icon circle
  ctx.beginPath();
  ctx.arc(28, inputY + 30, 16, 0, Math.PI * 2);
  ctx.fillStyle = "#E0E0E0";
  ctx.fill();
  // input field pill
  roundRect(ctx, 52, inputY + 12, W - 110, 36, 18);
  ctx.fillStyle = "#fff";
  ctx.fill();
  // send button
  ctx.beginPath();
  ctx.arc(W - 24, inputY + 30, 18, 0, Math.PI * 2);
  ctx.fillStyle = "#25D366";
  ctx.fill();

  return canvas;
}

export default function WhatsAppScreenshotMaker() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How's it going?",
      isSender: false,
      time: "10:30 AM",
      delivered: true,
    },
    {
      id: "2",
      text: "Pretty good! Just working on some memes 😄",
      isSender: true,
      time: "10:31 AM",
      delivered: true,
    },
  ]);
  const [chatInfo, setChatInfo] = useState<ChatInfo>({
    contactName: "John Doe",
    phoneNumber: "+1 234 567 8900",
    profileColor: PROFILE_COLORS[0],
    themeColor: "default",
    time: "10:30",
    batteryLevel: 85,
    wifiSignal: true,
  });
  const [newMessage, setNewMessage] = useState("");
  const [newMessageIsSender, setNewMessageIsSender] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const addMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: newMessage.trim(),
        isSender: newMessageIsSender,
        time,
        delivered: newMessageIsSender,
      },
    ]);
    setNewMessage("");
  }, [newMessage, newMessageIsSender]);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  const getCanvas = () => buildCanvas(messages, chatInfo);

  const handleDownload = () => {
    try {
      const canvas = getCanvas();
      const link = document.createElement("a");
      link.download = `whatsapp-screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setStatus("Downloaded!");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      setStatus("Download failed: " + (err as Error).message);
    }
  };

  const handleCopy = async () => {
    try {
      const canvas = getCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopied(true);
          setStatus("Copied to clipboard!");
          setTimeout(() => {
            setCopied(false);
            setStatus("");
          }, 2000);
        } catch (e) {
          // Fallback: download instead
          setStatus("Clipboard blocked — downloading instead…");
          const link = document.createElement("a");
          link.download = `whatsapp-screenshot-${Date.now()}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
          setTimeout(() => setStatus(""), 3000);
        }
      }, "image/png");
    } catch (err) {
      setStatus("Error: " + (err as Error).message);
    }
  };

  const theme = THEME_COLORS[chatInfo.themeColor];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Controls */}
      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Chat Information
          </h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Contact Name
              </label>
              <input
                type="text"
                value={chatInfo.contactName}
                onChange={(e) =>
                  setChatInfo((p) => ({ ...p, contactName: e.target.value }))
                }
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="Enter contact name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Phone Number
              </label>
              <input
                type="text"
                value={chatInfo.phoneNumber}
                onChange={(e) =>
                  setChatInfo((p) => ({ ...p, phoneNumber: e.target.value }))
                }
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Profile Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {PROFILE_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setChatInfo((p) => ({ ...p, profileColor: color }))
                    }
                    className={`w-8 h-8 rounded-full border-2 transition ${chatInfo.profileColor === color ? "border-zinc-900 scale-110" : "border-transparent hover:scale-105"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Theme
              </label>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(THEME_COLORS) as Array<keyof typeof THEME_COLORS>).map((key) => (
                  <button
                    key={key}
                    onClick={() =>
                      setChatInfo((p) => ({ ...p, themeColor: key }))
                    }
                    className={`px-4 py-2 text-xs font-medium rounded-md border transition ${chatInfo.themeColor === key ? "bg-zinc-900 text-white border-zinc-900" : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"}`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800" />

        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Add Message
          </h2>
          <div className="flex gap-2">
            {["Received", "Sent"].map((label, i) => (
              <button
                key={label}
                onClick={() => setNewMessageIsSender(i === 1)}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md border transition ${newMessageIsSender === (i === 1) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white dark:bg-zinc-800 text-zinc-700 border-zinc-200 dark:border-zinc-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[80px] px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
            placeholder="Type message… (Enter to add)"
          />
          <button
            onClick={addMessage}
            disabled={!newMessage.trim()}
            className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Message
          </button>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800" />

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Messages ({messages.length})
            </h2>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Clear All
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start justify-between gap-3 p-3 rounded-md border ${msg.isSender ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100" : "bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700"}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold ${msg.isSender ? "text-emerald-700" : "text-zinc-500"}`}
                    >
                      {msg.isSender ? "You" : chatInfo.contactName}
                    </span>
                    <span className="text-xs text-zinc-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100 break-words">
                    {msg.text}
                  </p>
                </div>
                <button
                  onClick={() => removeMessage(msg.id)}
                  className="text-zinc-400 hover:text-red-500 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-zinc-100 dark:border-zinc-800" />

        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Export
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-semibold rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 transition flex items-center justify-center gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Image"}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-md hover:bg-zinc-700 transition flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
          {status && (
            <p className="text-xs text-center text-zinc-500">{status}</p>
          )}
        </section>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Live Preview
        </h2>
        <div
          className="sticky top-4 w-full max-w-md mx-auto overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-700 shadow-lg"
          style={{ backgroundColor: theme.bg }}
        >
          {/* Status Bar */}
          <div
            className="flex items-center justify-between px-4 py-1.5"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          >
            <span className="text-xs font-bold text-black">
              {chatInfo.time}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-black">WiFi</span>
              <div className="flex items-center gap-0.5">
                <div className="w-5 h-2.5 border border-black rounded-sm relative">
                  <div
                    className="absolute inset-0.5 bg-black rounded-sm"
                    style={{ width: `${chatInfo.batteryLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Header */}
          <div
            className="flex items-center gap-3 px-3 py-2.5"
            style={{ backgroundColor: theme.header }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: chatInfo.profileColor }}
            >
              {getInitials(chatInfo.contactName)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate">
                {chatInfo.contactName}
              </h3>
              <p className="text-white/70 text-xs truncate">
                {chatInfo.phoneNumber}
              </p>
            </div>
          </div>
          {/* Messages */}
          <div
            className="p-3 min-h-64 space-y-2"
            style={{ backgroundColor: theme.bg }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[75%] px-3 py-2 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: msg.isSender ? "#DCF8C6" : "#fff",
                    color: "#111",
                  }}
                >
                  <p className="text-sm leading-relaxed break-words">
                    {msg.text}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span
                      className="text-xs"
                      style={{ color: msg.isSender ? "#4CAF50" : "#999" }}
                    >
                      {msg.time}
                    </span>
                    {msg.isSender && (
                      <span className="text-xs" style={{ color: "#4CAF50" }}>
                        ✓✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Input Bar */}
          <div
            className="flex items-center gap-3 px-3 py-3"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <div className="w-9 h-9 rounded-full bg-zinc-200 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-zinc-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
              </svg>
            </div>
            <div className="flex-1 rounded-full px-4 py-2.5 bg-white">
              <div className="h-3 bg-zinc-200 rounded-full w-24" />
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-xs text-zinc-400 text-center mt-2">
          Export renders directly via Canvas — no external library required
        </p>
      </div>
    </div>
  );
}
