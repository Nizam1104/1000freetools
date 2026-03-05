import VideoFormatsConversion from "@/components/video-tools/VideoFormatsConverter";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";

const faqData = [
  {
    question: "Can I convert an MKV file to MP4 without re-encoding the video?",
    answer:
      "Yes, in many cases. When the video track inside the MKV already uses a codec that MP4 supports, such as H.264, the converter performs a transmux operation. It moves the existing video and audio data into the new container without re-encoding, which completes in seconds and produces no quality loss.",
  },
  {
    question: "How long does it take to convert a large video file?",
    answer:
      "If the codecs are compatible and only the container changes, conversion is nearly instant regardless of file size. If the video needs to be re-encoded into a different codec, the time depends on the length and resolution of the video and your device's CPU speed. A 10-minute 1080p video may take several minutes to re-encode on a standard laptop.",
  },
  {
    question: "Does this tool support converting video to MP3 or WAV?",
    answer:
      "Yes. Selecting an audio output format such as MP3 or WAV extracts the audio track from the video and discards the video data. MP3 uses compressed audio and produces smaller files. WAV produces an uncompressed audio file with no quality loss, which is useful for audio editing workflows.",
  },
  {
    question: "Will converting a video reduce its quality?",
    answer:
      "A transmux operation produces no quality loss because the pixel data is not re-encoded. A re-encode operation applies a new compression pass, which can introduce a small quality reduction depending on the target codec and bitrate settings. If preserving the original quality is important, avoid re-encoding when possible.",
  },
  {
    question: "Can anyone else see the video files I convert with this tool?",
    answer:
      "No. The file is read from your local drive and processed inside your browser's memory. It is never uploaded to a server. No third party has access to your video at any point during or after conversion.",
  },
  {
    question: "Is there a maximum file size I can convert?",
    answer:
      "The tool runs entirely in your browser and does not upload files to a server. The practical limit is your device's available RAM. Most devices handle files up to a few gigabytes without issues. Very large files such as raw 4K footage above 10 GB may run out of available browser memory before conversion completes.",
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
            Free Online Video Converter — Convert MP4, MKV, MOV, WebM and More
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Convert video and audio files between formats directly in your browser. No uploads, no account, no file size limits. Supports MP4, WebM, MKV, MOV, MP3, WAV, and more.
          </p>
        </section>

        {/* Tool Component */}
        <section>
          <VideoFormatsConversion />
        </section>

        {/* What Format Conversion Does */}
        <section className="space-y-6">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                What Format Conversion Does
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Video files have two layers: the container (MP4, MKV, MOV) and the codecs inside (H.264, AAC, etc.). Conversion can change the container, the codecs, or both.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If the codecs are already compatible with the target format, the tool does a transmux — it copies the data into a new container without re-encoding. This takes seconds and loses zero quality. If the codecs aren't compatible, it re-encodes, which takes longer but produces a file that plays everywhere.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This runs locally in your browser. No upload means faster processing and complete privacy.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* When Format Conversion Helps */}
        <section className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">When You Need This</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">MKV files won't play on your TV</h3>
                <p className="text-sm text-muted-foreground">
                  Older smart TVs and media players don't support MKV. Convert to MP4 with H.264 video — it's a transmux if codecs match, so it takes seconds. The file plays on virtually any device.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Extract audio from video interviews</h3>
                <p className="text-sm text-muted-foreground">
                  3-hour video interview is several GB. You only need the audio. Convert to MP3 and get a file that's 10x smaller. Perfect for podcasts or study notes.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">MOV files from iPhone won't open on Windows</h3>
                <p className="text-sm text-muted-foreground">
                  Windows sometimes needs QuickTime codecs to open MOV files. Convert to MP4 and it plays in the default Windows player without installing anything extra.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">WebM for smaller website videos</h3>
                <p className="text-sm text-muted-foreground">
                  MP4 works everywhere but WebM with VP9 codec produces ~30% smaller files at the same quality. Convert background videos to WebM for faster page loads on mobile.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-muted">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Submit to platforms with format requirements</h3>
                <p className="text-sm text-muted-foreground">
                  Some portals only accept MP4 or AVI. Convert your WebM or MOV to the required format and submit without hassle. No need to contact support or buy conversion software.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Format Reference */}
        <section className="space-y-6">
          <Card className="overflow-hidden border-muted/50 bg-gradient-to-br from-card to-muted/20">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                Common Formats Explained
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">Video Containers</h3>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <strong className="text-foreground">MP4</strong> — Universal compatibility. Works on phones, TVs, computers, everything.
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <strong className="text-foreground">WebM</strong> — Web-optimized. Smaller files, modern browsers only.
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <strong className="text-foreground">MKV</strong> — Supports multiple audio/subtitle tracks. Limited device support.
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <strong className="text-foreground">MOV</strong> — Apple's format. Works great on Mac/iOS, sometimes needs conversion for Windows.
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Audio: MP3 vs WAV</h3>
                  <p className="text-muted-foreground mt-2">
                    MP3 compresses audio — smaller files, slight quality loss. Good for listening, sharing, podcasts. WAV is uncompressed — large files, no quality loss. Use for editing or archiving.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Transmux vs Re-encode</h3>
                  <p className="text-muted-foreground mt-2">
                    Transmux = copies data to new container without re-encoding. Takes seconds, zero quality loss. Re-encode = converts codecs. Takes longer, required when source and target formats use different codecs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Using This Tool */}
        <section className="space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How to Convert Video</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="relative font-semibold text-xl">Upload your file</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Drag or select your video. It stays on your device — no server upload. Works with MP4, MKV, MOV, WebM, AVI, and more.
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="relative font-semibold text-xl">Choose output format</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Pick MP4 for maximum compatibility, WebM for web use, or MOV for Apple devices. For audio-only, choose MP3 (compressed) or WAV (uncompressed).
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="relative font-semibold text-xl">Convert and download</h3>
              <p className="relative mt-2 text-sm text-muted-foreground text-left">
                Click Convert. Transmux finishes in seconds. Re-encoding takes longer — progress bar shows status. Download when done.
              </p>
            </div>
          </div>
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
