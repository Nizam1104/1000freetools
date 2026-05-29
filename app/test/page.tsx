// // // components/GlassmorphismGenerator.tsx
// // "use client"
// // import React, { useState, useMemo } from 'react';

// // // Helper function to convert hex color to RGBA with a given alpha
// // const hexToRgba = (hex: string, alpha: number): string => {
// //   const r = parseInt(hex.slice(1, 3), 16);
// //   const g = parseInt(hex.slice(3, 5), 16);
// //   const b = parseInt(hex.slice(5, 7), 16);
// //   return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
// // };

// // const GlassmorphismGenerator: React.FC = () => {
// //   // State for Glassmorphism properties
// //   const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
// //   const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0.15);
// //   const [blurAmount, setBlurAmount] = useState<number>(10);
// //   const [borderRadius, setBorderRadius] = useState<number>(10);
// //   const [borderWidth, setBorderWidth] = useState<number>(1);
// //   const [borderColor, setBorderColor] = useState<string>('#ffffff');
// //   const [borderOpacity, setBorderOpacity] = useState<number>(0.2);
// //   const [shadowX, setShadowX] = useState<number>(0);
// //   const [shadowY, setShadowY] = useState<number>(4);
// //   const [shadowBlur, setShadowBlur] = useState<number>(30);
// //   const [shadowSpread, setShadowSpread] = useState<number>(0);
// //   const [shadowColor, setShadowColor] = useState<string>('#000000');
// //   const [shadowOpacity, setShadowOpacity] = useState<number>(0.1);

// //   // Generate CSS string based on current state
// //   const generatedCss = useMemo(() => {
// //     const bgColorRgba = hexToRgba(backgroundColor, backgroundOpacity);
// //     const borderColorRgba = hexToRgba(borderColor, borderOpacity);
// //     const shadowColorRgba = hexToRgba(shadowColor, shadowOpacity);

// //     return `
// // .glass-effect {
// //   background: ${bgColorRgba};
// //   border-radius: ${borderRadius}px;
// //   border: ${borderWidth}px solid ${borderColorRgba};
// //   box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorRgba};
// //   backdrop-filter: blur(${blurAmount}px);
// //   -webkit-backdrop-filter: blur(${blurAmount}px); /* For Safari */
// // }
// //     `.trim();
// //   }, [
// //     backgroundColor, backgroundOpacity, blurAmount, borderRadius,
// //     borderWidth, borderColor, borderOpacity,
// //     shadowX, shadowY, shadowBlur, shadowSpread, shadowColor, shadowOpacity
// //   ]);

// //   // Styles for the preview box
// //   const previewStyles: React.CSSProperties = useMemo(() => {
// //     const bgColorRgba = hexToRgba(backgroundColor, backgroundOpacity);
// //     const borderColorRgba = hexToRgba(borderColor, borderOpacity);
// //     const shadowColorRgba = hexToRgba(shadowColor, shadowOpacity);

// //     return {
// //       background: bgColorRgba,
// //       borderRadius: `${borderRadius}px`,
// //       border: `${borderWidth}px solid ${borderColorRgba}`,
// //       boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColorRgba}`,
// //       backdropFilter: `blur(${blurAmount}px)`,
// //       WebkitBackdropFilter: `blur(${blurAmount}px)`, // For Safari
// //       width: '250px', // Increased size for better visibility
// //       height: '180px',
// //       display: 'flex',
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       color: '#333',
// //       fontSize: '1.2em',
// //       fontWeight: 'bold',
// //       textAlign: 'center',
// //       position: 'relative',
// //       zIndex: 1, // Ensure it's above the background gradient
// //       overflow: 'hidden', // In case content overflows
// //     };
// //   }, [
// //     backgroundColor, backgroundOpacity, blurAmount, borderRadius,
// //     borderWidth, borderColor, borderOpacity,
// //     shadowX, shadowY, shadowBlur, shadowSpread, shadowColor, shadowOpacity
// //   ]);

// //   const handleCopyCss = () => {
// //     navigator.clipboard.writeText(generatedCss)
// //       .then(() => alert('CSS copied to clipboard!'))
// //       .catch((err) => console.error('Failed to copy CSS:', err));
// //   };

// //   return (
// //     <div style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f0f2f5', minHeight: '100vh', boxSizing: 'border-box' }}>
// //       <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>CSS Glassmorphism Generator</h1>

// //       <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
// //         {/* Controls Section */}
// //         <div style={{ flex: '1 1 350px', minWidth: '300px', border: '1px solid #ddd', padding: '25px', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
// //           <h2 style={{ marginTop: '0', marginBottom: '25px', fontSize: '1.6em', color: '#333' }}>Adjust Properties</h2>

// //           {/* Background */}
// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Background Color & Opacity:</label>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
// //               <input type="range" min="0" max="1" step="0.01" value={backgroundOpacity} onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))} style={{ flexGrow: 1, height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //               <span style={{ minWidth: '40px', textAlign: 'right', color: '#666' }}>{(backgroundOpacity * 100).toFixed(0)}%</span>
// //             </div>
// //           </div>

// //           {/* Blur */}
// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Blur Amount (px):</label>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <input type="range" min="0" max="50" value={blurAmount} onChange={(e) => setBlurAmount(parseInt(e.target.value))} style={{ flexGrow: 1, height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //               <span style={{ minWidth: '40px', textAlign: 'right', color: '#666' }}>{blurAmount}px</span>
// //             </div>
// //           </div>

// //           {/* Border Radius */}
// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Border Radius (px):</label>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value))} style={{ flexGrow: 1, height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //               <span style={{ minWidth: '40px', textAlign: 'right', color: '#666' }}>{borderRadius}px</span>
// //             </div>
// //           </div>

// //           {/* Border */}
// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Border (Width, Color, Opacity):</label>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
// //               <input type="range" min="0" max="10" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value))} style={{ width: '80px', height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //               <span style={{ minWidth: '30px', color: '#666' }}>{borderWidth}px</span>
// //               <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
// //               <input type="range" min="0" max="1" step="0.01" value={borderOpacity} onChange={(e) => setBorderOpacity(parseFloat(e.target.value))} style={{ flexGrow: 1, height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //               <span style={{ minWidth: '40px', textAlign: 'right', color: '#666' }}>{(borderOpacity * 100).toFixed(0)}%</span>
// //             </div>
// //           </div>

// //           {/* Box Shadow */}
// //           <div style={{ marginBottom: '20px' }}>
// //             <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Box Shadow:</label>
// //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 10px', marginBottom: '15px' }}>
// //               <div>
// //                 <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: '#666' }}>X Offset (px):</label>
// //                 <input type="range" min="-50" max="50" value={shadowX} onChange={(e) => setShadowX(parseInt(e.target.value))} style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //                 <span style={{ display: 'block', textAlign: 'center', marginTop: '5px', color: '#666' }}>{shadowX}px</span>
// //               </div>
// //               <div>
// //                 <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: '#666' }}>Y Offset (px):</label>
// //                 <input type="range" min="-50" max="50" value={shadowY} onChange={(e) => setShadowY(parseInt(e.target.value))} style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //                 <span style={{ display: 'block', textAlign: 'center', marginTop: '5px', color: '#666' }}>{shadowY}px</span>
// //               </div>
// //               <div>
// //                 <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: '#666' }}>Blur (px):</label>
// //                 <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(parseInt(e.target.value))} style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //                 <span style={{ display: 'block', textAlign: 'center', marginTop: '5px', color: '#666' }}>{shadowBlur}px</span>
// //               </div>
// //               <div>
// //                 <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: '#666' }}>Spread (px):</label>
// //                 <input type="range" min="-50" max="50" value={shadowSpread} onChange={(e) => setShadowSpread(parseInt(e.target.value))} style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //                 <span style={{ display: 'block', textAlign: 'center', marginTop: '5px', color: '#666' }}>{shadowSpread}px</span>
// //               </div>
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
// //               <label style={{ fontSize: '0.9em', color: '#666' }}>Color:</label>
// //               <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
// //               <input type="range" min="0" max="1" step="0.01" value={shadowOpacity} onChange={(e) => setShadowOpacity(parseFloat(e.target.value))} style={{ flexGrow: 1, height: '8px', borderRadius: '4px', background: '#e0e0e0', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
// //               <span style={{ minWidth: '40px', textAlign: 'right', color: '#666' }}>{(shadowOpacity * 100).toFixed(0)}%</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Preview and Code Section */}
// //         <div style={{ flex: '1 1 450px', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
// //           {/* Preview */}
// //           <div style={{ border: '1px solid #ddd', padding: '25px', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', position: 'relative', overflow: 'hidden' }}>
// //             <h2 style={{ marginTop: '0', marginBottom: '25px', fontSize: '1.6em', color: '#333' }}>Live Preview</h2>
// //             {/* Background for the glass effect - this is what gets blurred */}
// //             <div style={{
// //               position: 'absolute',
// //               top: 0,
// //               left: 0,
// //               width: '100%',
// //               height: '100%',
// //               backgroundImage: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // A nice light blue gradient
// //               zIndex: 0,
// //             }}></div>
// //             <div style={previewStyles}>
// //               Glass Effect
// //             </div>
// //           </div>

// //           {/* Generated CSS */}
// //           <div style={{}}>
// //             <h2 style={{ marginTop: '0', marginBottom: '25px', fontSize: '1.6em', color: '#333' }}>Generated CSS</h2>
// //             <pre style={{ backgroundColor: '#eef4f8', padding: '18px', borderRadius: '8px', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.95em', lineHeight: '1.5', color: '#333', border: '1px solid #e0e0e0' }}>
// //               <code>{generatedCss}</code>
// //             </pre>
// //             <button
// //               onClick={handleCopyCss}
// //               style={{
// //                 marginTop: '20px',
// //                 padding: '12px 25px',
// //                 backgroundColor: '#007bff',
// //                 color: 'white',
// //                 border: 'none',
// //                 borderRadius: '6px',
// //                 cursor: 'pointer',
// //                 fontSize: '1em',
// //                 fontWeight: 'bold',
// //                 transition: 'background-color 0.2s ease',
// //               }}
// //               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
// //               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
// //             >
// //               Copy CSS
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GlassmorphismGenerator;

// "use client";

// import { useState } from "react";

// export default function GlassmorphismGenerator() {
//   const [blur, setBlur] = useState(10);
//   const [opacity, setOpacity] = useState(0.2);
//   const [radius, setRadius] = useState(16);
//   const [borderOpacity, setBorderOpacity] = useState(0.3);
//   const [shadow, setShadow] = useState(20);

//   const glassStyle = {
//     backdropFilter: `blur(${blur}px)`,
//     WebkitBackdropFilter: `blur(${blur}px)`,
//     background: `rgba(255, 255, 255, ${opacity})`,
//     borderRadius: `${radius}px`,
//     border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
//     boxShadow: `0 4px ${shadow}px rgba(0,0,0,0.1)`,
//   };

//   const cssCode = `
// backdrop-filter: blur(${blur}px);
// -webkit-backdrop-filter: blur(${blur}px);
// background: rgba(255, 255, 255, ${opacity});
// border-radius: ${radius}px;
// border: 1px solid rgba(255, 255, 255, ${borderOpacity});
// box-shadow: 0 4px ${shadow}px rgba(0,0,0,0.1);
//   `.trim();

//   const copyToClipboard = async () => {
//     await navigator.clipboard.writeText(cssCode);
//     alert("Copied!");
//   };

//   return (
//     <div style={{ padding: 20, fontFamily: "sans-serif" }}>
//       <h1>CSS Glassmorphism Generator</h1>

//       {/* Controls */}
//       <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>
//         <label>
//           Blur: {blur}px
//           <input
//             type="range"
//             min="0"
//             max="50"
//             value={blur}
//             onChange={(e) => setBlur(Number(e.target.value))}
//           />
//         </label>

//         <label>
//           Background Opacity: {opacity}
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={opacity}
//             onChange={(e) => setOpacity(Number(e.target.value))}
//           />
//         </label>

//         <label>
//           Border Radius: {radius}px
//           <input
//             type="range"
//             min="0"
//             max="50"
//             value={radius}
//             onChange={(e) => setRadius(Number(e.target.value))}
//           />
//         </label>

//         <label>
//           Border Opacity: {borderOpacity}
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={borderOpacity}
//             onChange={(e) => setBorderOpacity(Number(e.target.value))}
//           />
//         </label>

//         <label>
//           Shadow: {shadow}px
//           <input
//             type="range"
//             min="0"
//             max="50"
//             value={shadow}
//             onChange={(e) => setShadow(Number(e.target.value))}
//           />
//         </label>
//       </div>

//       {/* Preview */}
//       <div
//         style={{
//           marginTop: 40,
//           padding: 40,
//           background:
//             "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') center/cover",
//         }}
//       >
//         <div
//           style={{
//             ...glassStyle,
//             width: 250,
//             height: 150,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           Glass Effect
//         </div>
//       </div>

//       {/* CSS Output */}
//       <div style={{}}>
//         <h3>CSS Code</h3>
//         <pre
//           style={{
//             background: "#111",
//             color: "#0f0",
//             padding: 10,
//             overflow: "auto",
//           }}
//         >
//           {cssCode}
//         </pre>
//         <button onClick={copyToClipboard}>Copy CSS</button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import { Slider } from "@/components/ui/slider";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Download,
//   RefreshCw,
//   PenLine,
//   Shuffle,
//   Moon,
//   FileImage,
//   Eraser,
// } from "lucide-react";

// // ─── Handwriting font definitions ────────────────────────────────────────────
// const FONTS: { label: string; value: string; url: string }[] = [
//   {
//     label: "Caveat",
//     value: "Caveat",
//     url: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap",
//   },
//   {
//     label: "Dancing Script",
//     value: "Dancing Script",
//     url: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap",
//   },
//   {
//     label: "Pacifico",
//     value: "Pacifico",
//     url: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
//   },
//   {
//     label: "Shadows Into Light",
//     value: "Shadows Into Light",
//     url: "https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap",
//   },
//   {
//     label: "Kalam",
//     value: "Kalam",
//     url: "https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap",
//   },
//   {
//     label: "Indie Flower",
//     value: "Indie Flower",
//     url: "https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap",
//   },
//   {
//     label: "Patrick Hand",
//     value: "Patrick Hand",
//     url: "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap",
//   },
//   {
//     label: "Permanent Marker",
//     value: "Permanent Marker",
//     url: "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap",
//   },
// ];

// const PAPER_STYLES = [
//   { label: "Plain White", value: "plain-white" },
//   { label: "Ruled Lines", value: "ruled" },
//   { label: "Graph Paper", value: "graph" },
//   { label: "Aged Parchment", value: "parchment" },
//   { label: "Dark Mode", value: "dark" },
// ];

// const INK_COLORS = [
//   { label: "Midnight Blue", value: "#1a237e" },
//   { label: "Pen Black", value: "#1a1a1a" },
//   { label: "Crimson Red", value: "#b71c1c" },
//   { label: "Forest Green", value: "#1b5e20" },
//   { label: "Royal Purple", value: "#4a148c" },
//   { label: "Warm Brown", value: "#4e342e" },
//   { label: "Teal Ink", value: "#004d40" },
//   { label: "White Chalk", value: "#f5f5f5" },
// ];

// // ─── Paper backgrounds ────────────────────────────────────────────────────────
// function getPaperStyle(paper: string): React.CSSProperties {
//   switch (paper) {
//     case "ruled":
//       return {
//         background:
//           "repeating-linear-gradient(transparent, transparent 31px, #b0c4de 31px, #b0c4de 32px), #fefef9",
//       };
//     case "graph":
//       return {
//         background:
//           "repeating-linear-gradient(#cce0ff 0, #cce0ff 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #cce0ff 0, #cce0ff 1px, transparent 1px, transparent 32px), #fefef9",
//       };
//     case "parchment":
//       return {
//         background:
//           "radial-gradient(ellipse at top left, #f5deb3 0%, #deb887 40%, #c8a870 100%)",
//         filter: "sepia(0.1)",
//       };
//     case "dark":
//       return { background: "#1a1a2e" };
//     default:
//       return { background: "#fefef9" };
//   }
// }

// function getTextShadow(paper: string): string {
//   if (paper === "dark") return "0 0 8px rgba(255,255,255,0.15)";
//   return "1px 2px 4px rgba(0,0,0,0.08)";
// }

// // ─── Utility: jitter a character for handwritten feel ────────────────────────
// function JitteredChar({
//   char,
//   font,
//   size,
//   color,
//   jitter,
//   paper,
//   bold,
//   italic,
//   weight,
// }: {
//   char: string;
//   font: string;
//   size: number;
//   color: string;
//   jitter: number;
//   paper: string;
//   bold: boolean;
//   italic: boolean;
//   weight: number;
// }) {
//   const rotate = (Math.random() - 0.5) * jitter * 3;
//   const translateY = (Math.random() - 0.5) * jitter * 1.5;
//   const scale = 1 + (Math.random() - 0.5) * jitter * 0.02;

//   return (
//     <span
//       style={{
//         display: "inline-block",
//         transform: `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`,
//         color,
//         fontFamily: `'${font}', cursive`,
//         fontSize: size,
//         fontWeight: bold ? weight : 400,
//         fontStyle: italic ? "italic" : "normal",
//         textShadow: getTextShadow(paper),
//         letterSpacing: "0.01em",
//         whiteSpace: "pre",
//         lineHeight: 1.85,
//       }}
//     >
//       {char}
//     </span>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function TextToHandwriting() {
//   const [text, setText] = useState(
//     "The quick brown fox jumps over the lazy dog.\nHandwriting is a beautiful art form that carries personality and emotion in every stroke."
//   );
//   const [font, setFont] = useState(FONTS[0].value);
//   const [fontSize, setFontSize] = useState(28);
//   const [inkColor, setInkColor] = useState(INK_COLORS[0].value);
//   const [paperStyle, setPaperStyle] = useState("ruled");
//   const [jitter, setJitter] = useState(3);
//   const [bold, setBold] = useState(false);
//   const [italic, setItalic] = useState(false);
//   const [fontWeight, setFontWeight] = useState(600);
//   const [lineHeight] = useState(1.85);
//   const [randomSeed, setRandomSeed] = useState(0);
//   const [padding, setPadding] = useState(48);
//   const previewRef = useRef<HTMLDivElement>(null);

//   // Load Google Fonts dynamically
//   useEffect(() => {
//     const fontDef = FONTS.find((f) => f.value === font);
//     if (!fontDef) return;
//     const id = `gfont-${font.replace(/\s/g, "-")}`;
//     if (!document.getElementById(id)) {
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = "stylesheet";
//       link.href = fontDef.url;
//       document.head.appendChild(link);
//     }
//   }, [font]);

//   // Re-randomise jitter seed
//   const reshuffleJitter = useCallback(() => {
//     setRandomSeed((s) => s + 1);
//   }, []);

//   // Download as PNG via html2canvas (loaded from CDN)
//   const downloadPNG = useCallback(async () => {
//     if (!previewRef.current) return;
//     // Dynamically load html2canvas
//     if (!(window as any).html2canvas) {
//       await new Promise<void>((resolve, reject) => {
//         const s = document.createElement("script");
//         s.src =
//           "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
//         s.onload = () => resolve();
//         s.onerror = () => reject();
//         document.head.appendChild(s);
//       });
//     }
//     const canvas = await (window as any).html2canvas(previewRef.current, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: null,
//     });
//     const link = document.createElement("a");
//     link.download = "handwriting.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   }, []);

//   // Split text preserving newlines
//   const lines = text.split("\n");

//   const paperBg = getPaperStyle(paperStyle);
//   const isDark = paperStyle === "dark";

//   // For re-render on seed change, we use seed in key
//   const seedKey = `${randomSeed}-${jitter}-${text}-${font}-${fontSize}-${inkColor}-${bold}-${italic}`;

//   return (
//     <TooltipProvider>
//       <div className="min-h-screen bg-background text-foreground">
//         {/* Header */}
//         <div className="border-b bg-card">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-primary/10">
//               <PenLine className="h-5 w-5 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-xl font-semibold tracking-tight">
//                 Text to Handwriting
//               </h1>
//               <p className="text-xs text-muted-foreground">
//                 Convert your text into beautiful handwritten style
//               </p>
//             </div>
//             <Badge variant="secondary" className="ml-auto">
//               {FONTS.find((f) => f.value === font)?.label}
//             </Badge>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
//           {/* ── Controls Panel ── */}
//           <aside className="space-y-5">
//             {/* Text input */}
//             <div className="bg-card border rounded-xl p-4 space-y-3">
//               <Label className="text-sm font-semibold flex items-center gap-2">
//                 <span>Your Text</span>
//                 <Badge variant="outline" className="text-xs font-normal">
//                   {text.length} chars
//                 </Badge>
//               </Label>
//               <Textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Type something to convert to handwriting..."
//                 className="min-h-[120px] resize-none text-sm font-mono"
//               />
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-xs text-muted-foreground gap-1.5"
//                 onClick={() => setText("")}
//               >
//                 <Eraser className="h-3 w-3" />
//                 Clear
//               </Button>
//             </div>

//             {/* Font & Style */}
//             <div className="bg-card border rounded-xl p-4 space-y-4">
//               <Label className="text-sm font-semibold">Font & Style</Label>

//               <div className="space-y-1.5">
//                 <Label className="text-xs text-muted-foreground">
//                   Handwriting Font
//                 </Label>
//                 <Select value={font} onValueChange={setFont}>
//                   <SelectTrigger className="h-9">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {FONTS.map((f) => (
//                       <SelectItem key={f.value} value={f.value}>
//                         <span style={{ fontFamily: `'${f.value}', cursive` }}>
//                           {f.label}
//                         </span>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <Label className="text-xs text-muted-foreground">
//                     Font Size
//                   </Label>
//                   <span className="text-xs font-mono text-muted-foreground">
//                     {fontSize}px
//                   </span>
//                 </div>
//                 <Slider
//                   value={[fontSize]}
//                   onValueChange={([v]) => setFontSize(v)}
//                   min={16}
//                   max={56}
//                   step={1}
//                 />
//               </div>

//               {bold && (
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <Label className="text-xs text-muted-foreground">
//                       Weight
//                     </Label>
//                     <span className="text-xs font-mono text-muted-foreground">
//                       {fontWeight}
//                     </span>
//                   </div>
//                   <Slider
//                     value={[fontWeight]}
//                     onValueChange={([v]) => setFontWeight(v)}
//                     min={400}
//                     max={800}
//                     step={100}
//                   />
//                 </div>
//               )}

//               <div className="flex gap-4">
//                 <div className="flex items-center gap-2">
//                   <Switch
//                     id="bold"
//                     checked={bold}
//                     onCheckedChange={setBold}
//                   />
//                   <Label htmlFor="bold" className="text-xs cursor-pointer">
//                     Bold
//                   </Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Switch
//                     id="italic"
//                     checked={italic}
//                     onCheckedChange={setItalic}
//                   />
//                   <Label htmlFor="italic" className="text-xs cursor-pointer">
//                     Italic
//                   </Label>
//                 </div>
//               </div>
//             </div>

//             {/* Ink Color */}
//             <div className="bg-card border rounded-xl p-4 space-y-3">
//               <Label className="text-sm font-semibold">Ink Color</Label>
//               <div className="grid grid-cols-4 gap-2">
//                 {INK_COLORS.map((c) => (
//                   <Tooltip key={c.value}>
//                     <TooltipTrigger asChild>
//                       <button
//                         onClick={() => setInkColor(c.value)}
//                         className="h-9 w-full rounded-lg border-2 transition-all hover:scale-105"
//                         style={{
//                           backgroundColor: c.value,
//                           borderColor:
//                             inkColor === c.value
//                               ? "hsl(var(--primary))"
//                               : "transparent",
//                           boxShadow:
//                             inkColor === c.value
//                               ? "0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary))"
//                               : "none",
//                         }}
//                         aria-label={c.label}
//                       />
//                     </TooltipTrigger>
//                     <TooltipContent side="bottom">
//                       <p className="text-xs">{c.label}</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 ))}
//               </div>

//               {/* Custom color picker */}
//               <div className="flex items-center gap-2 mt-1">
//                 <label className="text-xs text-muted-foreground">Custom:</label>
//                 <input
//                   type="color"
//                   value={inkColor}
//                   onChange={(e) => setInkColor(e.target.value)}
//                   className="h-8 w-16 rounded cursor-pointer border border-input bg-transparent"
//                 />
//                 <span className="text-xs font-mono text-muted-foreground">
//                   {inkColor}
//                 </span>
//               </div>
//             </div>

//             {/* Paper & Effects */}
//             <div className="bg-card border rounded-xl p-4 space-y-4">
//               <Label className="text-sm font-semibold">Paper & Effects</Label>

//               <div className="space-y-1.5">
//                 <Label className="text-xs text-muted-foreground">
//                   Paper Style
//                 </Label>
//                 <Select value={paperStyle} onValueChange={setPaperStyle}>
//                   <SelectTrigger className="h-9">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {PAPER_STYLES.map((p) => (
//                       <SelectItem key={p.value} value={p.value}>
//                         {p.value === "dark" && (
//                           <Moon className="h-3 w-3 inline mr-1.5 opacity-60" />
//                         )}
//                         {p.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <Label className="text-xs text-muted-foreground">
//                     Jitter / Wobble
//                   </Label>
//                   <span className="text-xs font-mono text-muted-foreground">
//                     {jitter}
//                   </span>
//                 </div>
//                 <Slider
//                   value={[jitter]}
//                   onValueChange={([v]) => setJitter(v)}
//                   min={0}
//                   max={8}
//                   step={0.5}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <Label className="text-xs text-muted-foreground">
//                     Padding
//                   </Label>
//                   <span className="text-xs font-mono text-muted-foreground">
//                     {padding}px
//                   </span>
//                 </div>
//                 <Slider
//                   value={[padding]}
//                   onValueChange={([v]) => setPadding(v)}
//                   min={16}
//                   max={96}
//                   step={4}
//                 />
//               </div>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="w-full gap-2"
//                 onClick={reshuffleJitter}
//               >
//                 <Shuffle className="h-3.5 w-3.5" />
//                 Reshuffle Randomness
//               </Button>
//             </div>

//             <Separator />

//             {/* Actions */}
//             <div className="flex gap-2">
//               <Button className="flex-1 gap-2" onClick={downloadPNG}>
//                 <Download className="h-4 w-4" />
//                 Export PNG
//               </Button>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={reshuffleJitter}
//                   >
//                     <RefreshCw className="h-4 w-4" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent>Regenerate</TooltipContent>
//               </Tooltip>
//             </div>
//           </aside>

//           {/* ── Preview Panel ── */}
//           <main className="space-y-3">
//             <div className="flex items-center justify-between">
//               <Label className="text-sm font-semibold text-muted-foreground">
//                 Preview
//               </Label>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <FileImage className="h-3.5 w-3.5" />
//                 <span>2× resolution export</span>
//               </div>
//             </div>

//             {/* Paper */}
//             <div
//               className="rounded-xl overflow-hidden border shadow-md"
//               style={{ minHeight: 400 }}
//             >
//               <div
//                 ref={previewRef}
//                 style={{
//                   ...paperBg,
//                   padding,
//                   minHeight: 400,
//                   position: "relative",
//                 }}
//               >
//                 {/* Red margin line for ruled paper */}
//                 {paperStyle === "ruled" && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       left: padding - 12,
//                       top: 0,
//                       bottom: 0,
//                       width: 2,
//                       background: "rgba(255,100,100,0.35)",
//                     }}
//                   />
//                 )}

//                 <div
//                   key={seedKey}
//                   style={{
//                     fontFamily: `'${font}', cursive`,
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {text === "" ? (
//                     <span
//                       style={{
//                         color: isDark
//                           ? "rgba(255,255,255,0.2)"
//                           : "rgba(0,0,0,0.2)",
//                         fontFamily: `'${font}', cursive`,
//                         fontSize,
//                         fontStyle: "italic",
//                         lineHeight,
//                         display: "block",
//                       }}
//                     >
//                       Start typing to see your handwriting...
//                     </span>
//                   ) : (
//                     lines.map((line, li) => (
//                       <div
//                         key={li}
//                         style={{ lineHeight, minHeight: fontSize * lineHeight }}
//                       >
//                         {line === "" ? (
//                           <br />
//                         ) : (
//                           line.split("").map((char, ci) => (
//                             <JitteredChar
//                               key={`${li}-${ci}-${seedKey}`}
//                               char={char}
//                               font={font}
//                               size={fontSize}
//                               color={inkColor}
//                               jitter={jitter}
//                               paper={paperStyle}
//                               bold={bold}
//                               italic={italic}
//                               weight={fontWeight}
//                             />
//                           ))
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Live font preview strip */}
//             <div className="bg-muted/50 border rounded-lg px-4 py-2 overflow-x-auto">
//               <div className="flex gap-6 items-center whitespace-nowrap">
//                 {FONTS.map((f) => (
//                   <button
//                     key={f.value}
//                     onClick={() => setFont(f.value)}
//                     className={`text-sm transition-all hover:opacity-100 ${
//                       font === f.value
//                         ? "opacity-100 underline decoration-primary underline-offset-4"
//                         : "opacity-50"
//                     }`}
//                     style={{
//                       fontFamily: `'${f.value}', cursive`,
//                       color: inkColor,
//                     }}
//                   >
//                     {f.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </TooltipProvider>
//   );
// }

"use client";

import { useState, useCallback, useMemo } from "react";

// Approximate tokenizer heuristic
function countTokens(text: string) {
  if (!text.trim()) {
    return { tokens: 0, chars: 0, words: 0, sentences: 0 };
  }

  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

  let tokenCount = 0;
  const tokens = text.match(/\s*[a-zA-Z']+|\s*\d+|\s*[^\s\w]|\n/g) || [];

  for (const token of tokens) {
    const t = token.trim();
    if (!t) {
      tokenCount += 1;
      continue;
    }
    tokenCount += Math.max(1, Math.ceil(t.length / 3.8));
  }

  return { tokens: tokenCount, chars, words, sentences };
}

export default function TokenCounterPage() {
  const [text, setText] = useState("");
  const [contextLimit, setContextLimit] = useState<string>("");
  const [pricePerMillion, setPricePerMillion] = useState<string>("");

  const stats = useMemo(() => countTokens(text), [text]);

  const percentageUsed = useMemo(() => {
    const limit = parseFloat(contextLimit);
    if (!limit || limit <= 0) return null;
    return Math.min((stats.tokens / limit) * 100, 1000); // capped at 1000% for UI safety
  }, [stats.tokens, contextLimit]);

  const calculatedCost = useMemo(() => {
    const price = parseFloat(pricePerMillion);
    if (!price || price <= 0) return null;
    const cost = (stats.tokens / 1_000_000) * price;
    return cost.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  }, [stats.tokens, pricePerMillion]);

  const handlePaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText(t);
    } catch {
      /* fail silently */
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Token Counter</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Estimate token usage, context window occupancy, and API costs.
          </p>
        </header>

        {/* Inputs Configuration */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Context Window Size (Tokens)
            </label>
            <input
              type="number"
              value={contextLimit}
              onChange={(e) => setContextLimit(e.target.value)}
              placeholder="e.g. 128000"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Price (USD per 1M tokens)
            </label>
            <input
              type="number"
              step="0.01"
              value={pricePerMillion}
              onChange={(e) => setPricePerMillion(e.target.value)}
              placeholder="e.g. 2.50"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          </div>
        </section>

        {/* Text Area */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Input Text
            </label>
            <div className="flex gap-2">
              <button
                onClick={handlePaste}
                className="text-xs font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white rounded transition-colors"
              >
                Paste
              </button>
              <button
                onClick={() => setText("")}
                className="text-xs font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white rounded transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows={10}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none rounded-xl p-4 text-sm resize-none transition-all font-mono"
          />
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Tokens", value: stats.tokens.toLocaleString(), highlight: true },
            { label: "Characters", value: stats.chars.toLocaleString() },
            { label: "Words", value: stats.words.toLocaleString() },
            { label: "Sentences", value: stats.sentences.toLocaleString() },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-xl border ${item.highlight
                  ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                }`}
            >
              <div className={`text-2xl font-bold ${item.highlight ? "text-amber-600" : ""}`}>
                {item.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">
                {item.label}
              </div>
            </div>
          ))}
        </section>

        {/* Dynamic Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {percentageUsed !== null && (
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Context Usage
                </span>
                <span className={`text-lg font-bold ${percentageUsed > 100 ? "text-red-500" : "text-amber-500"}`}>
                  {percentageUsed.toFixed(2)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${percentageUsed > 100 ? "bg-red-500" : "bg-amber-500"
                    }`}
                  style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                />
              </div>
              {percentageUsed > 100 && (
                <p className="text-[10px] text-red-500 mt-2 font-medium">
                  ⚠️ Text exceeds the specified context window.
                </p>
              )}
            </div>
          )}

          {calculatedCost !== null && (
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Estimated Cost
              </span>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mt-1">
                ${calculatedCost}
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                Based on ${pricePerMillion} per 1 million tokens
              </p>
            </div>
          )}
        </div>

        <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            This tool uses a statistical heuristic to estimate token counts. Different models (like GPT, Claude, or Llama)
            use different tokenizers (tiktoken, SentencePiece, etc.), so the actual count may vary slightly.
          </p>
        </footer>
      </div>
    </main>
  );
}
