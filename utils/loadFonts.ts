// Import type for font data
interface FontOption {
  name: string;
  value: string;
  google: boolean;
}

/**
 * Utility function to load Google fonts dynamically using WebFont loader
 * @param fontFamily - The font family to load
 * @param fontData - Array of font options including google flag
 * @returns Promise that resolves when font is loaded (or fails to load)
 */
export async function loadFont(fontFamily: string, fontData: FontOption[]): Promise<boolean> {
  return new Promise((resolve) => {
    // Only load the WebFont script once
    if (!document.querySelector('script[src*="webfont.js"]')) {
      const script = document.createElement("script");
      script.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const loadFontHandler = () => {
      // @ts-expect-error WebFont is loaded from external script
      if (window.WebFont) {
        // Check if the selected font is a Google font
        const selectedFont = fontData.find((f) => f.value === fontFamily);

        if (selectedFont?.google) {
          // @ts-expect-error WebFont API is not typed
          window.WebFont.load({
            google: {
              families: [fontFamily],
            },
            active: () => {
              // Font loaded successfully
              resolve(true);
            },
            inactive: () => {
              console.warn(`Font ${fontFamily} failed to load`);
              // Resolve as false to indicate failure
              resolve(false);
            },
            timeout: 5000, // 5 second timeout
          });
        } else {
          // System font, no loading needed - resolve immediately as success
          resolve(true);
        }
      } else {
        console.warn("WebFont not available");
        // If WebFont is not available, check if it's a system font and resolve accordingly
        const selectedFont = fontData.find((f) => f.value === fontFamily);
        if (!selectedFont?.google) {
          resolve(true); // System font - considered loaded
        } else {
          resolve(false); // Google font but WebFont unavailable
        }
      }
    };

    // Wait a bit for the WebFont script to load, then try to load the font
    setTimeout(loadFontHandler, 100);
  });
}

/**
 * Legacy function kept for compatibility - loads font and returns a promise
 * @deprecated Use loadFont instead
 */
export default async function loadFonts(fontFamily: string, fontData: FontOption[]): Promise<boolean> {
  return loadFont(fontFamily, fontData);
}
