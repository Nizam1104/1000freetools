const urls = [
  "https://1000freetools.com/",
  "https://1000freetools.com/about",
  "https://1000freetools.com/contact",
  "https://1000freetools.com/explore-all-tools",

  "https://1000freetools.com/image-tools",
  "https://1000freetools.com/image-tools/image-compressor",

  "https://1000freetools.com/csv-tools/csv-viewer",

  "https://1000freetools.com/video-tools",
  "https://1000freetools.com/video-tools/video-compressor",
  "https://1000freetools.com/video-tools/video-metadata-viewer",
  "https://1000freetools.com/video-tools/change-video-fps",
  "https://1000freetools.com/video-tools/resize-video-dimensions",
  "https://1000freetools.com/video-tools/video-format-converter",
  "https://1000freetools.com/video-tools/video-transparency-maker",
  "https://1000freetools.com/video-tools/video-overlays",
  "https://1000freetools.com/video-tools/video-color-space-transformation",
  "https://1000freetools.com/video-tools/extract-audio-from-video",
  "https://1000freetools.com/video-tools/video-grayscale",
  "https://1000freetools.com/video-tools/crop-video",
  "https://1000freetools.com/video-tools/enhance-video-quality",
  "https://1000freetools.com/video-tools/rotate-video",
  "https://1000freetools.com/video-tools/video-player",

  "https://1000freetools.com/design-tools",
  "https://1000freetools.com/design-tools/favicon-generator",

  "https://1000freetools.com/developer-tools",
  "https://1000freetools.com/developer-tools/mock-data-generator",
];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    host: "1000freetools.com",
    key: "f7dd6e8f72054d3c9673eb39d3a7da3f",
    urlList: urls,
  }),
});

const text = await res.text();
console.log(res.status, text);
