import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore All Tools - 1000 Free Online Tools",
  description:
    "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
  openGraph: {
    title: "Explore All Tools - 1000 Free Online Tools",
    description:
      "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/explore-all-tools",
  },
};

// All tools data grouped by category
const toolsByCategory = [
  {
    categoryName: "Image Tools",
    tools: [
      {
        name: "Image Compressor",
        description:
          "Compress images online - reduce file size while maintaining quality",
        href: "/image-tools/image-compressor",
      },
      {
        name: "Image Editor",
        description: "Edit images online with powerful editing tools",
        href: "/image-tools/image-editor",
      },
      {
        name: "Pick Color Code from Image",
        description:
          "Extract color codes from images - get HEX, RGB, HSL values",
        href: "/image-tools/pick-color-code-from-image",
      },
      {
        name: "Image Format Conversions",
        description:
          "Convert images between different formats - JPEG, PNG, WebP, AVIF and more",
        href: "/image-tools/image-format-conversions",
      },
      {
        name: "Background Remover",
        description: "Remove background from images automatically",
        href: "/image-tools/background-remover",
      },
      {
        name: "Image to GIF",
        description: "Convert images to animated GIF format",
        href: "/image-tools/image-to-gif",
      },
      {
        name: "Image Filters",
        description: "Apply beautiful filters and effects to your images",
        href: "/image-tools/image-filters",
      },
      {
        name: "Crop Image",
        description: "Crop images to your desired size and aspect ratio",
        href: "/image-tools/crop-image",
      },
      {
        name: "Sharpen Image",
        description: "Enhance image sharpness and clarity online",
        href: "/image-tools/sharpen-image",
      },
      {
        name: "Resize Image Dimensions",
        description: "Resize images by changing width and height dimensions",
        href: "/image-tools/resize-image-dimensions",
      },
      {
        name: "Image to PDF",
        description: "Convert images to PDF documents",
        href: "/image-tools/image-to-pdf",
      },
      {
        name: "Add Watermark on Image",
        description: "Add text or image watermarks to protect your photos",
        href: "/image-tools/add-watermark-on-image",
      },
      {
        name: "Blur Image",
        description: "Apply blur effect to images or specific areas",
        href: "/image-tools/blur-image",
      },
    ],
  },
  {
    categoryName: "Design Tools",
    tools: [
      {
        name: "Favicon Generator",
        description:
          "Create Professional Looking Favicon for Free, supports text, image, and emojis",
        href: "/design-tools/favicon-generator",
      },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: [
      {
        name: "Mock Data Generator",
        description:
          "Generate realistic test data for your applications to speed up development and testing.",
        href: "/developer-tools/mock-data-generator",
      },
    ],
  },
  {
    categoryName: "Video Tools",
    tools: [
      {
        name: "Video Compressor",
        description: "Compress videos online - reduce file size, No size limit",
        href: "/video-tools/video-compressor",
      },
      {
        name: "Video MetaData Viewer",
        description: "See Video or Audio files metadata",
        href: "/video-tools/video-metadata-viewer",
      },
      {
        name: "Video Player",
        description: "Play any video file format instantly, Supports subtitles",
        href: "/video-tools/video-player",
      },
      {
        name: "Video Format Converter",
        description:
          "Convert between video formats, Supports wide range of video formats",
        href: "/video-tools/video-format-converter",
      },
      {
        name: "Change Video FPS",
        description:
          "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
        href: "/video-tools/change-video-fps",
      },
      {
        name: "Crop Video",
        description: "Crop videos online - remove unwanted edges and reframe",
        href: "/video-tools/crop-video",
      },
      {
        name: "Enhance Video Quality",
        description: "Upscale, sharpen, denoise and improve video quality",
        href: "/video-tools/enhance-video-quality",
      },
      {
        name: "Extract Audio from Video",
        description:
          "Extract audio from video files - save as MP3, AAC, or WAV",
        href: "/video-tools/extract-audio-from-video",
      },
      {
        name: "Resize Video Dimensions",
        description: "Resize video to 4K, 1080p, 720p or custom dimensions",
        href: "/video-tools/resize-video-dimensions",
      },
      {
        name: "Rotate Video",
        description: "Rotate videos 90°, 180° or 270° - fix orientation",
        href: "/video-tools/rotate-video",
      },
      {
        name: "Video Color Space Transformation",
        description: "Adjust brightness, contrast, saturation, hue and more",
        href: "/video-tools/video-color-space-transformation",
      },
      {
        name: "Video Grayscale",
        description: "Convert videos to black and white instantly",
        href: "/video-tools/video-grayscale",
      },
      {
        name: "Video Overlays",
        description: "Add watermarks, logos or image overlays to videos",
        href: "/video-tools/video-overlays",
      },
      {
        name: "Video Transparency Maker",
        description:
          "Adjust video opacity and transparency with custom background",
        href: "/video-tools/video-transparency-maker",
      },
    ],
  },
  {
    categoryName: "Color Tools",
    tools: [
      {
        name: "Gradient Step Generator",
        description:
          "Generate smooth color gradients with customizable steps",
        href: "/color-tools/gradient-step-generator",
      },
      {
        name: "Gradient Palette Generator",
        description:
          "Create beautiful gradient palettes for your designs",
        href: "/color-tools/gradient-palette-generator",
      },
      {
        name: "Duotone Palette Generator",
        description:
          "Generate duotone color palettes from images or colors",
        href: "/color-tools/duotone-palette-generator",
      },
      {
        name: "Dominant Color Finder",
        description:
          "Extract dominant colors from images automatically",
        href: "/color-tools/dominant-color-finder",
      },
      {
        name: "Favorite Colors Manager",
        description:
          "Save, organize and manage your favorite color palettes",
        href: "/color-tools/favorite-colors-manager",
      },
      {
        name: "Color Palettes",
        description:
          "Browse and create stunning color palettes for any project",
        href: "/color-tools/color-palettes",
      },
      {
        name: "Contrast Checker",
        description:
          "Check color contrast ratios for WCAG accessibility compliance",
        href: "/color-tools/contrast-checker",
      },
      {
        name: "Web Safe Color Picker",
        description:
          "Pick from 216 web-safe colors that display consistently",
        href: "/color-tools/web-safe-color-picker",
      },
      {
        name: "Color Temperature to RGB",
        description:
          "Convert color temperature in Kelvin to RGB values",
        href: "/color-tools/color-temperature-to-rgb",
      },
      {
        name: "CSS Variables Generator",
        description:
          "Generate CSS custom properties for your color schemes",
        href: "/color-tools/css-variables-generator",
      },
      {
        name: "Advanced Color Picker",
        description:
          "Pick and fine-tune colors with advanced controls",
        href: "/color-tools/advanced-color-picker",
      },
      {
        name: "Color Scale Generator",
        description:
          "Create color scales with varying lightness and saturation",
        href: "/color-tools/color-scale-generator",
      },
      {
        name: "HSL to HEX Converter",
        description:
          "Convert HSL color values to HEX format instantly",
        href: "/color-tools/hsl-to-hex-converter",
      },
      {
        name: "Palette Duplicate Finder",
        description:
          "Find and remove duplicate colors from your palettes",
        href: "/color-tools/palette-duplicate-finder",
      },
      {
        name: "HEX to RGB Converter",
        description:
          "Convert HEX color codes to RGB values instantly",
        href: "/color-tools/hex-to-rgb-converter",
      },
      {
        name: "Color History Tool",
        description:
          "Track and revisit colors you've used previously",
        href: "/color-tools/color-history-tool",
      },
      {
        name: "HEX to CMYK Converter",
        description:
          "Convert HEX colors to CMYK for print design",
        href: "/color-tools/hex-to-cmyk-converter",
      },
      {
        name: "Shade Tint Tone Generator",
        description:
          "Generate shades, tints, and tones of any color",
        href: "/color-tools/shade-tint-tone-generator",
      },
      {
        name: "Palette Contrast Viewer",
        description:
          "Visualize how colors contrast when used together",
        href: "/color-tools/palette-contrast-viewer",
      },
      {
        name: "Palette Export Tool",
        description:
          "Export color palettes in multiple formats (CSS, JSON, etc.)",
        href: "/color-tools/palette-export-tool",
      },
      {
        name: "Text Color Suggestion Tool",
        description:
          "Get text color suggestions for any background color",
        href: "/color-tools/text-color-suggestion-tool",
      },
      {
        name: "Palette Sorter",
        description:
          "Sort palette colors by hue, saturation, or lightness",
        href: "/color-tools/palette-sorter",
      },
      {
        name: "Random Color Palette Generator",
        description:
          "Generate random color palettes for inspiration",
        href: "/color-tools/random-color-palette-generator",
      },
      {
        name: "RGB to HEX Converter",
        description:
          "Convert RGB color values to HEX format instantly",
        href: "/color-tools/rgb-to-hex-converter",
      },
      {
        name: "Color Harmony Generator",
        description:
          "Create harmonious color schemes (complementary, analogous, etc.)",
        href: "/color-tools/color-harmony-generator",
      },
      {
        name: "CSS Gradient Generator",
        description:
          "Generate CSS gradient code for linear and radial gradients",
        href: "/color-tools/css-gradient-generator",
      },
      {
        name: "Complementary Color Finder",
        description:
          "Find complementary colors that pair well together",
        href: "/color-tools/complementary-color-finder",
      },
      {
        name: "Custom Color Palette Generator",
        description:
          "Create custom palettes based on your preferred colors",
        href: "/color-tools/custom-color-palette-generator",
      },
      {
        name: "Palette Comparison Tool",
        description:
          "Compare multiple color palettes side by side",
        href: "/color-tools/palette-comparison-tool",
      },
      {
        name: "CSS Color Name Converter",
        description:
          "Convert between CSS color names and their HEX/RGB values",
        href: "/color-tools/css-color-name-converter",
      },
      {
        name: "HSL to HSV Converter",
        description:
          "Convert HSL color values to HSV format",
        href: "/color-tools/hsl-to-hsv-converter",
      },
      {
        name: "Monochrome Palette Generator",
        description:
          "Generate monochromatic color palettes from a single color",
        href: "/color-tools/monochrome-palette-generator",
      },
      {
        name: "Pastel Palette Generator",
        description:
          "Create soft pastel color palettes for gentle designs",
        href: "/color-tools/pastel-palette-generator",
      },
      {
        name: "RGB to HSL Converter",
        description:
          "Convert RGB color values to HSL format",
        href: "/color-tools/rgb-to-hsl-converter",
      },
      {
        name: "Warm or Cool Color Detector",
        description:
          "Determine if a color is warm or cool toned",
        href: "/color-tools/warm-or-cool-color-detector",
      },
      {
        name: "Dark Light Mode Preview",
        description:
          "Preview how colors look in dark and light modes",
        href: "/color-tools/dark-light-mode-preview",
      },
      {
        name: "Color Palette Generator",
        description:
          "Generate complete color palettes for your projects",
        href: "/color-tools/color-palette-generator",
      },
      {
        name: "RGB to CMYK Converter",
        description:
          "Convert RGB colors to CMYK for print production",
        href: "/color-tools/rgb-to-cmyk-converter",
      },
      {
        name: "Palette Merger",
        description:
          "Merge multiple color palettes into one unified palette",
        href: "/color-tools/palette-merger",
      },
      {
        name: "Color Picker",
        description:
          "Simple and intuitive color picker tool",
        href: "/color-tools/color-picker",
      },
      {
        name: "Color Wheel",
        description:
          "Interactive color wheel for exploring color relationships",
        href: "/color-tools/color-wheel",
      },
      {
        name: "HEX to HSL Converter",
        description:
          "Convert HEX color codes to HSL values",
        href: "/color-tools/hex-to-hsl-converter",
      },
      {
        name: "Extract Colors from Image",
        description:
          "Extract all colors from uploaded images",
        href: "/color-tools/extract-colors-from-image",
      },
    ],
  },
];

export default function ExploreAllToolsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore All Tools
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Browse our comprehensive collection of free online tools that run
            directly in your browser.
          </p>
        </div>
      </section>

      {/* Loop through each tool category */}
      {toolsByCategory.map((category, categoryIndex) => (
        <section key={categoryIndex} className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            {category.categoryName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 sm:gap-y-4 md:gap-y-6 gap-x-2 sm:gap-x-4 md:gap-x-6">
            {category.tools.map((tool, toolIndex) => (
              <Link
                href={tool.href}
                key={toolIndex}
                className="bg-card rounded-lg p-4 hover:shadow-xl border transition-shadow duration-300"
              >
                <h3 className="text-primary text-base md:text-xl font-semibold">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
