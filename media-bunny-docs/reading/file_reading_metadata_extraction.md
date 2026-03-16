# File Reading & Metadata Extraction

## Overview
The File Reading & Metadata Extraction module provides capabilities to read metadata from media files, extract video and audio properties, read descriptive metadata tags, calculate frame rates and bitrate statistics, detect codec support, extract thumbnail images, and read from multiple sources.

## Key Capabilities

### 1. Metadata Extraction
- Read metadata from media files (duration, dimensions, resolution, codec info)
- Extract video properties (width, height, rotation, color space, HDR detection)
- Extract audio properties (channels, sample rate, bitrate)
- Read descriptive metadata tags (title, artist, cover art, custom tags)
- Calculate frame rates and bitrate statistics
- Detect codec support and decodability

### 2. Thumbnail Generation
- Extract thumbnail images from videos
- Generate equally-spaced thumbnails

### 3. Multiple Data Sources
- Read from multiple sources (memory, disk, network, streams)

## API Reference

### Input Class
```ts
import { Input, ALL_FORMATS, BlobSource } from 'mediabunny';

const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
});
```

### Reading File Metadata
```ts
// Get file duration
const duration = await input.getDuration();

// Get file dimensions
const dimensions = await input.getDimensions();

// Get file frame rate
const frameRate = await input.getFrameRate();

// Get file bitrate
const bitrate = await input.getBitrate();
```

### Reading Track Metadata
```ts
// Get all tracks in the file
const tracks = await input.getTracks();

// Get video tracks
const videoTracks = tracks.filter(track => track.type === 'video');

// Get audio tracks
const audioTracks = tracks.filter(track => track.type === 'audio');

// Access track properties
for (const track of videoTracks) {
    console.log('Width:', track.width);
    console.log('Height:', track.height);
    console.log('Rotation:', track.rotation);
    console.log('Color space:', track.colorSpace);
    console.log('HDR detected:', track.hdr);
}

for (const track of audioTracks) {
    console.log('Channels:', track.channelCount);
    console.log('Sample rate:', track.sampleRate);
    console.log('Bitrate:', track.bitrate);
}
```

### Reading Descriptive Metadata Tags
```ts
// Get metadata tags
const tags = await input.getTags();

console.log('Title:', tags.title);
console.log('Artist:', tags.artist);
console.log('Album:', tags.album);
console.log('Cover art:', tags.images);
```

## Supported Formats
- MP4, MOV, WebM, MKV
- MP3, WAV, AAC, FLAC
- Ogg, MPEG-TS

## Code Examples

### Example 1: Extract All File Information
```ts
async function extractFileInfo(file) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    // Extract basic properties
    const duration = await input.getDuration();
    const format = await input.getFormat();
    const mimeType = await input.getMimeType();
    
    console.log(`Duration: ${duration}s`);
    console.log(`Format: ${format.name}`);
    console.log(`MIME Type: ${mimeType}`);

    // Extract track information
    const tracks = await input.getTracks();
    
    for (const track of tracks) {
        if (track.type === 'video') {
            console.log(`Video: ${track.width}x${track.height}, ${track.frameRate}fps`);
        } else if (track.type === 'audio') {
            console.log(`Audio: ${track.channelCount} channels, ${track.sampleRate}Hz`);
        }
    }

    // Extract metadata tags
    const tags = await input.getTags();
    console.log('Tags:', tags);

    // Cleanup
    await input.end();
}
```

### Example 2: Detect Codec Support
```ts
async function checkCodecSupport(file) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    const tracks = await input.getTracks();
    
    for (const track of tracks) {
        // Check if track can be decoded
        if (track.type === 'video') {
            const canDecode = await canDecodeVideo(track.codec, {
                width: track.width,
                height: track.height,
            });
            console.log(`${track.codec} video can be decoded: ${canDecode}`);
        } else if (track.type === 'audio') {
            const canDecode = await canDecodeAudio(track.codec);
            console.log(`${track.codec} audio can be decoded: ${canDecode}`);
        }
    }

    await input.end();
}
```

### Example 3: Extract Thumbnails
```ts
async function extractThumbnails(file, numThumbnails = 5) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    const duration = await input.getDuration();
    const interval = duration / (numThumbnails + 1);

    const thumbnails = [];
    
    for (let i = 1; i <= numThumbnails; i++) {
        const timestamp = i * interval;
        const frame = await input.getFrameAt(timestamp);
        
        // Convert frame to image data
        const canvas = document.createElement('canvas');
        canvas.width = frame.displayWidth;
        canvas.height = frame.displayHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(frame, 0, 0);
        
        thumbnails.push(canvas.toDataURL());
    }

    await input.end();
    
    return thumbnails;
}
```

## Best Practices

- Always call `input.end()` to clean up resources after reading
- Use `ALL_FORMATS` when you want to support all possible input formats
- Check for errors in the input file before extracting metadata
- Be mindful of large files when extracting multiple frames or metadata