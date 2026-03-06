import React from "react";

export function HslToHsvConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          HSL vs. HSV: What's the Difference?
        </h2>
        <p className="text-muted-foreground">
          Both models describe colors using hue and saturation, but they differ in how they represent brightness. HSL uses "lightness" (average of the max and min color channels). HSV uses "value" (just the max channel). This affects how saturation and brightness interact.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          Hue stays the same in both models. The conversion only affects saturation and the brightness component. Value is simply the maximum of the RGB channels. HSV saturation is calculated differently — it's based on how far the color is from white, not from gray.
        </p>
        <p className="text-muted-foreground">
          For hsl(217, 91%, 60%): The equivalent is hsv(217, 76%, 96%). Notice hue is unchanged, but saturation and brightness values differ significantly.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need HSV Instead of HSL
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Color Picker UI Components</h3>
            <p className="text-sm text-muted-foreground">
              Many color picker libraries use HSV internally because it maps more naturally to a 2D picker (saturation on X, value on Y) with a separate hue slider.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Image Processing Libraries</h3>
            <p className="text-sm text-muted-foreground">
              OpenCV and some computer vision tools use HSV for color-based segmentation. Converting from HSL lets you work with these libraries.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Game Development</h3>
            <p className="text-sm text-muted-foreground">
              Unity and Unreal Engine color pickers often use HSV. When porting colors between web (HSL) and game engines, conversion is necessary.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Understanding Color Theory</h3>
            <p className="text-sm text-muted-foreground">
              Comparing how the same color represents in HSL vs. HSV helps you understand what each model emphasizes — lightness vs. brightness, gray-based vs. white-based saturation.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Key Differences Between HSL and HSV
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Lightness vs. Value:</strong> Lightness of 50% is the "pure" color. Value of 100% is the brightest version (which might be white if saturation is 0%).
          </p>
          <p>
            <strong>Saturation behavior:</strong> In HSL, 100% saturation means "no gray mixed in." In HSV, 100% saturation means "no white mixed in." This makes HSV saturation feel more intense at high values.
          </p>
          <p>
            <strong>Full color range:</strong> HSL goes from black (0% lightness) through the color (50%) to white (100%). HSV goes from black (0% value) directly to the full-intensity color (100% value, 100% saturation).
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Side-by-Side Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Color</th>
                <th className="text-left p-2">HSL</th>
                <th className="text-left p-2">HSV</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono">#FF0000</td>
                <td className="p-2">hsl(0, 100%, 50%)</td>
                <td className="p-2">hsv(0, 100%, 100%)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">#00FF00</td>
                <td className="p-2">hsl(120, 100%, 50%)</td>
                <td className="p-2">hsv(120, 100%, 100%)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">#0000FF</td>
                <td className="p-2">hsl(240, 100%, 50%)</td>
                <td className="p-2">hsv(240, 100%, 100%)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">#808080</td>
                <td className="p-2">hsl(0, 0%, 50%)</td>
                <td className="p-2">hsv(0, 0%, 50%)</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">#FFFFFF</td>
                <td className="p-2">hsl(0, 0%, 100%)</td>
                <td className="p-2">hsv(0, 0%, 100%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why is HSV saturation different from HSL saturation?</h3>
            <p className="text-sm text-muted-foreground">
              HSL saturation measures distance from gray. HSV saturation measures distance from white. A color at hsl(217, 50%, 50%) and hsv(217, 50%, 50%) will look noticeably different.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Which model should I use for CSS?</h3>
            <p className="text-sm text-muted-foreground">
              CSS supports HSL natively, not HSV. Use HSL for web development. Convert to HSV only when working with tools or libraries that require it.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert HSV back to HSL?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the conversion is reversible. Use our HSV to HSL Converter tool to go the other direction.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does hue stay the same?</h3>
            <p className="text-sm text-muted-foreground">
              Hue represents the actual color (red, green, blue, etc.) and is calculated the same way in both models. Only the brightness and saturation components differ.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's HSB?</h3>
            <p className="text-sm text-muted-foreground">
              HSB is the same as HSV — "B" stands for brightness instead of "V" for value. Different software uses different names for the same model.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">When would I choose HSL over HSV?</h3>
            <p className="text-sm text-muted-foreground">
              HSL is better for CSS and web work, and when you want symmetric lightness (equal distance to black and white). HSV is better for color pickers and when you want to think in terms of "how much white is mixed in."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HslToHsvConverterSEO;
