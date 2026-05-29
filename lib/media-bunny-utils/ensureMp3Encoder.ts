"use client";

// Idempotent registration of the MP3 encoder extension for mediabunny
// Many audio tools output MP3. The encoder must be registered exactly once
// in the browser. Duplicate registration can break encoding, so we guard it
// with a global flag on window/globalThis.

let mp3Registered = false;

export async function ensureMp3EncoderRegistered() {
  // Server-side render has no window; skip
  if (typeof window === "undefined") return;

  // Use a global flag to prevent duplicate registration across modules
  const g: any = globalThis as any;
  if (g.__MB_MP3_REGISTERED__ || mp3Registered) return;

  try {
    const mod = await import("@mediabunny/mp3-encoder");
    if (typeof mod.registerMp3Encoder === "function") {
      try {
        mod.registerMp3Encoder();
      } catch (_) {
        // Some bundlers/extensions warn if already registered. Ignore.
      }
      g.__MB_MP3_REGISTERED__ = true;
      mp3Registered = true;
    }
  } catch (e) {
    // If the extension isn't available, let the calling tool surface a clear error later
    // Do not throw here to avoid breaking non-MP3 flows
    console.warn("@mediabunny/mp3-encoder could not be loaded", e);
  }
}
