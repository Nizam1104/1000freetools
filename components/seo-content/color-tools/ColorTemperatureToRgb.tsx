import React from "react";

export function ColorTemperatureToRgbSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is Color Temperature?
        </h2>
        <p className="text-muted-foreground">
          Color temperature measures the "warmth" or "coolness" of light, expressed in Kelvin (K). Lower temperatures (1000K-3000K) appear warm/yellow like candlelight or incandescent bulbs. Higher temperatures (5000K-15000K) appear cool/blue like daylight or overcast sky.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool uses Planck's law approximations to convert Kelvin temperature to RGB values. The algorithm calculates the red, green, and blue components based on the black body radiation curve at that temperature.
        </p>
        <p className="text-muted-foreground">
          For example, 6500K (standard daylight) converts to approximately RGB(255, 250, 240) — a slightly warm white. 3000K (warm light) converts to RGB(255, 200, 150) — an orange-tinted white.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Common Color Temperature Reference Points
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex justify-between p-2 rounded border">
            <span>1500K - Candlelight</span>
            <code className="font-mono">#FF9900</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>2700K - Incandescent bulb</span>
            <code className="font-mono">#FFB86E</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>3000K - Warm white LED</span>
            <code className="font-mono">#FFC48C</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>4000K - Cool white</span>
            <code className="font-mono">#FFE4C4</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>5500K - Noon sunlight</span>
            <code className="font-mono">#FFF8DC</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>6500K - Standard daylight (D65)</span>
            <code className="font-mono">#FFF8F0</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>7500K - Overcast sky</span>
            <code className="font-mono">#F0F4FF</code>
          </div>
          <div className="flex justify-between p-2 rounded border">
            <span>10000K - Clear blue sky</span>
            <code className="font-mono">#E0E8FF</code>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Uses Color Temperature
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Lighting Designers</h3>
            <p className="text-sm text-muted-foreground">
              Specify color temperature for architectural lighting. A restaurant might use 2700K for warm ambiance, while a hospital uses 4000K for alertness.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Photographers</h3>
            <p className="text-sm text-muted-foreground">
              Set white balance based on lighting conditions. Understanding color temperature helps correct color casts in post-processing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Display Calibration</h3>
            <p className="text-sm text-muted-foreground">
              Calibrate monitors to standard color temperatures (usually 6500K). Ensures consistent color reproduction across devices.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">3D Rendering</h3>
            <p className="text-sm text-muted-foreground">
              Set realistic lighting in 3D scenes. A sunset scene uses 2000K lights, while an office scene uses 4000K fluorescent simulation.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why does higher Kelvin mean cooler colors?</h3>
            <p className="text-sm text-muted-foreground">
              Counterintuitively, higher temperatures produce bluer light because hotter black bodies emit more short-wavelength (blue) radiation. Think of a flame: the hottest parts are blue, cooler parts are orange.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the standard for web design?</h3>
            <p className="text-sm text-muted-foreground">
              6500K (D65) is the standard white point for sRGB, the web's color space. Most monitors are calibrated to this temperature.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, copy the RGB or hex output and use it in CSS. For example, a warm background: {`background-color: #FFB86E;`} (2700K).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why are some temperatures not pure white?</h3>
            <p className="text-sm text-muted-foreground">
              Black body radiation at different temperatures produces different colors. Only around 6500K appears neutral white to human eyes. Lower temperatures look yellow/orange, higher look blue.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and Warm/Cool Color Detector?</h3>
            <p className="text-sm text-muted-foreground">
              That tool classifies existing colors as warm or cool based on hue. This tool generates colors from physical temperature values (Kelvin).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is the conversion exact?</h3>
            <p className="text-sm text-muted-foreground">
              The conversion uses approximations of Planck's law. Results are accurate enough for design work but may vary slightly from scientific calculations.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Using Color Temperature
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Match the context.</strong> Use warm temperatures (2700K-3000K) for cozy, intimate designs. Use cool temperatures (5000K+) for clean, professional looks.
          </p>
          <p>
            <strong>Consider time of day.</strong> Morning/evening scenes benefit from warmer light. Midday scenes use neutral to cool light.
          </p>
          <p>
            <strong>Layer temperatures.</strong> Mix warm and cool lights in a scene for visual interest. A warm subject against a cool background creates separation.
          </p>
          <p>
            <strong>Test on your display.</strong> Monitor calibration affects how temperature colors appear. What looks neutral on one screen might look blue on another.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorTemperatureToRgbSEO;
