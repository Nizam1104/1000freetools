import VideoFormatsConversion from "@/components/video-tools/VideoFormatsConverter";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Card, CardContent } from "@/components/ui/card";

const faqData = [
  {
    question:
      "Do I need to download a sketchy desktop application to convert my MP4 file?",
    answer:
      "No. You can run a full video format conversion directly through your Chrome or Safari browser window. Because this tool utilizes local memory processing, it effectively turns your web browser into a secure, offline conversion engine without requiring you to install random executable files.",
  },
  {
    question:
      "Why did my WebM file instantly convert to MP4 in one second flat?",
    answer:
      "You likely triggered a raw transmuxing phase. If the internal video codec matches the new wrapper container you selected, the engine simply copies the raw audio and video streams and pastes them into the new format instead of slowly re-rendering every single frame.",
  },
  {
    question:
      "How do I extract just the background music from a YouTube recorded video?",
    answer:
      "Simply drop your video file into the converter and select MP3 or WAV from the Output Format dropdown menu. The processing engine will violently strip away the visual data track while completely preserving the original audio stream quality.",
  },
  {
    question:
      "Why does converting a video to AV1 codec drastically crash my laptop performance?",
    answer:
      "AV1 is an incredibly dense, highly advanced compression algorithm specifically designed to crush massive 4K files into tiny digital packages. Because the mathematics required are so wildly complex, older computer CPUs will effectively max out to 100% capacity trying to compile the data.",
  },
  {
    question:
      "Can anyone on the internet view the private videos I am converting?",
    answer:
      "Absolutely not. This completely sandboxed architecture guarantees your private footage never leaves your physical hardware. Your raw MP4 files are never uploaded to our servers, ensuring no external party can intercept your data.",
  },
  {
    question:
      "Is there a maximum Gb file size cap enforced by the conversion server?",
    answer:
      "Because we literally do not have a server crunching your files, we enforce absolutely zero arbitrary limits. However, your internet browser itself has a rigid internal RAM wall, meaning attempting to convert a massive 15GB raw ProRes file might force Google Chrome to crash.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function VideoFormatsConversionPage() {
  const relatedTools = [
    {
      name: "Video Compressor",
      description: "Compress videos online - reduce file size, No size limit",
      href: "/video-tools/video-compressor",
    },
    {
      name: "Video Metadata Viewer",
      description: "See Video or Audio files metadata",
      href: "/video-tools/video-metadata-viewer",
    },
    {
      name: "Video Player",
      description: "Play any video file format instantly, Supports subtitles",
      href: "/video-tools/video-player",
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
      description: "Extract audio from video files - save as MP3, AAC, or WAV",
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
  ];
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Free Online Video Converter – Convert MP4, WebM, MKV, MOV & More
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Convert video and audio files instantly in your browser — no
            uploads, completely free. Supports MP4, WebM, MOV, MP3, and more.
          </p>
        </section>

        {/* Tool Component */}
        <section>
          <VideoFormatsConversion />
        </section>

        {/* What The Tool Does Section */}
        <section className="space-y-6">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What it Does
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you try to play an obscure MKV movie file on your smart TV
                and receive an aggressive "Unsupported Format" error, you must
                convert the video to MP4 online to fix the problem. This browser
                architecture acts as a local digital translator, ripping open
                incompatible video containers and seamlessly repacking the raw
                visual data into a universally accepted format. Built entirely
                to run on your own CPU, this bypasses horrible cloud upload
                limits, allowing you to quickly smash massive WebM, MOV, or AVI
                files down to playable formats without paying exorbitant
                subscription fees.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Use</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Import your target file
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Push your corrupted or unsupported video directly into the
                browser dashboard. The internal system immediately inspects the
                hidden internal metadata, officially logging whether your clip
                is wrapped in an MP4, MOV, or obscure WebM container before
                establishing a baseline starting point.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Select a new destination
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Open the output dropdown to command the processor what specific
                architecture it should build. If you want maximum compatibility
                across vintage devices, select the MP4 wrapper powered by an
                H.264 video codec. For audio extraction, choose the specific MP3
                or WAV format.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">
                Execute the conversion
              </h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Hit the convert button to unleash your CPU power on the raw
                data. If the engine determines the codecs align perfectly, it
                performs a blazing-fast transmux copy. If the pixels must be
                entirely redrawn, you must monitor the progress bar until the
                heavy lifting finishes, eventually prompting the final download.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Use Cases</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Fixing smart TV playback issues
                </h3>
                <p className="text-sm text-muted-foreground">
                  Home theater enthusiasts frequently transfer high-fidelity MKV
                  movie rips onto a USB stick, only to discover their older LG
                  or Samsung television refuses to read the container.
                  Processing the heavy MKV rapidly into a standard MP4
                  completely resolves the agonizing black-screen error without
                  sacrificing a single pixel of visual quality.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Extracting podcast audio</h3>
                <p className="text-sm text-muted-foreground">
                  Digital media fans regularly encounter fantastic 3-hour long
                  video interviews on YouTube that contain excellent dialogue
                  but unnecessary static visuals. Injecting the downloaded video
                  file into the converter and forcing an MP3 output violently
                  rips away the gigabytes of heavy video data, leaving behind a
                  lightweight audio track perfect for a morning commute.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Prepping web animations</h3>
                <p className="text-sm text-muted-foreground">
                  Web developers crafting high-speed landing pages despise
                  standard MP4 background loops because they severely hurt SEO
                  loading speeds. Forcibly re-encoding that heavy video directly
                  into a streamlined WebM file natively utilizing the modern VP9
                  algorithm ensures the banner loads almost instantaneously for
                  mobile traffic.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Sanitizing Apple recordings</h3>
                <p className="text-sm text-muted-foreground">
                  Android owners or Windows desktop users often struggle to open
                  native MOV files furiously texted to them by iPhone users.
                  Dragging that frustrating proprietary Apple container through
                  the converter immediately unpacks the strange format and
                  neutralizes it back into a standard MP4 file capable of
                  playing on any cheap Android device.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">
                  Bypassing outdated application logic
                </h3>
                <p className="text-sm text-muted-foreground">
                  Students submitting massive final video assignments to
                  incredibly old university blackboard portals often watch the
                  system reject their state-of-the-art WebM renders. Smashing
                  that file backwards into a dinosaur-era AVI or basic MP4
                  container guarantees the inflexible academic software accepts
                  the submission properly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Settings Explained Section */}
        <section className="space-y-6">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Settings Explained
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">Container Architecture</h3>
                  <p className="text-muted-foreground mt-2">
                    The exact wrapper you choose (MP4, MKV, MOV) actively
                    dictates where your file can actually be opened.
                    Standardizing your workflow by choosing MP4 mathematically
                    guarantees your audience doesn't need to download VLC media
                    player just to witness your footage.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Audio Extraction Output</h3>
                  <p className="text-muted-foreground mt-2">
                    Choosing an audio designation like MP3 or WAV commands the
                    processor to actively ignore all color and movement data.
                    Choosing MP3 provides excellent storage compression, whereas
                    selecting WAV forces the engine to export an utterly
                    massive, uncompressed sonic waveform for professional music
                    editing.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Underlying Action (Transmux vs Encode)
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    When converting MKV to MP4 using identical internal codecs,
                    the engine performs a "Transmux"—physically copying the raw
                    data over in seconds. If you switch from H.264 to AV1, it
                    performs a brutal "Encode," demanding extreme CPU resources
                    to fundamentally rewrite billions of unique pixels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqData} />
        </section>

        <ToolLinkCards tools={relatedTools} />
      </div>
    </>
  );
}
