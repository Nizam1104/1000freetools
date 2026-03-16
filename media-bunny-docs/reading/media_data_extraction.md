# Media Data Extraction

## Overview
The Media Data Extraction module provides capabilities to extract video frames and audio chunks at specific timestamps, decode video packets to raw frames and audio packets to raw samples, extract encoded packets without decoding, convert video frames to canvases and audio samples to AudioBuffers, and iterate over media data efficiently.

## Key Capabilities

### 1. Frame & Sample Extraction
- Extract video frames at specific timestamps
- Extract audio chunks at specific timestamps
- Decode video packets to raw frames
- Decode audio packets to raw samples
- Extract encoded packets without decoding

### 2. Data Conversion
- Convert video frames to canvases
- Convert audio samples to AudioBuffers
- Iterate over media data in ranges or at specific points

### 3. Efficient Processing
- Sparse iteration for efficient processing
- Canvas pool optimization
- Lazy/on-demand file reading

## API Reference

### Extracting Video Frames
```ts
import { Input, ALL_FORMATS, BlobSource } from 'mediabunny';

const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
});

// Extract a single frame at a specific timestamp
const frame = await input.getFrameAt(timestampInSeconds);

// Extract multiple frames at different timestamps
const frames = await Promise.all([
    input.getFrameAt(1),  // 1 second
    input.getFrameAt(10), // 10 seconds
    input.getFrameAt(30)  // 30 seconds
]);
```

### Extracting Audio Chunks
```ts
// Extract audio samples from a specific time range
const audioData = await input.getAudioAt({
    start: 5,    // start at 5 seconds
    duration: 10 // extract 10 seconds of audio
});
```

### Working with Packets
```ts
// Get raw video packet at a specific timestamp
const videoPacket = await input.getVideoPacketAt(timestamp);

// Get raw audio packet at a specific timestamp
const audioPacket = await input.getAudioPacketAt(timestamp);

// Iterate through video packets in a range
for await (const packet of input.iterateVideoPackets({ start: 0, end: 60 })) {
    console.log('Packet timestamp:', packet.timestamp);
    // Process packet data
}
```

### Converting to Canvas and AudioBuffer
```ts
// Convert video frame to canvas
const frame = await input.getFrameAt(10);
const canvas = new OffscreenCanvas(frame.displayWidth, frame.displayHeight);
const ctx = canvas.getContext('2d');
ctx.drawImage(frame, 0, 0);

// Convert audio samples to AudioBuffer
const audioSamples = await input.getAudioAt({ start: 5, duration: 3 });
const audioBuffer = audioSamples.toAudioBuffer();
```

## Code Examples

### Example 1: Create a Thumbnail Strip
```ts
async function createThumbnailStrip(file, timestamps) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    const frames = await Promise.all(
        timestamps.map(ts => input.getFrameAt(ts))
    );

    // Create a canvas for the thumbnail strip
    const stripWidth = frames[0]?.displayWidth || 100;
    const stripHeight = frames[0]?.displayHeight || 100;
    const canvas = new OffscreenCanvas(stripWidth * frames.length, stripHeight);
    const ctx = canvas.getContext('2d');

    // Draw each frame in sequence
    frames.forEach((frame, index) => {
        ctx.drawImage(frame, index * stripWidth, 0);
    });

    await input.end();
    
    return canvas.transferToImageBitmap();
}
```

### Example 2: Extract Audio Waveform Data
```ts
async function extractWaveformData(file, startTime, duration) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    // Get audio samples for the specified range
    const audioData = await input.getAudioAt({
        start: startTime,
        duration: duration
    });

    // Convert to AudioBuffer for analysis
    const audioBuffer = audioData.toAudioBuffer();
    
    // Extract waveform data
    const rawData = audioBuffer.getChannelData(0); // Get first channel
    const samples = 100; // Number of samples to extract
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData = [];

    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
    }

    await input.end();
    
    return filteredData;
}
```

### Example 3: Iterate Over Video Packets for Analysis
```ts
async function analyzeVideoStructure(file) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    const packets = [];
    
    // Iterate through all video packets to analyze structure
    for await (const packet of input.iterateVideoPackets()) {
        packets.push({
            timestamp: packet.timestamp,
            size: packet.data?.length || 0,
            isKeyFrame: packet.isKeyFrame,
            duration: packet.duration
        });
    }

    // Analyze for key frame intervals
    const keyFrames = packets.filter(p => p.isKeyFrame);
    const intervals = [];
    
    for (let i = 1; i < keyFrames.length; i++) {
        intervals.push(keyFrames[i].timestamp - keyFrames[i-1].timestamp);
    }

    console.log(`Average key frame interval: ${intervals.reduce((a, b) => a + b, 0) / intervals.length}s`);

    await input.end();
    
    return { packets, keyFrames, intervals };
}
```

### Example 4: Process Frames in Batches
```ts
async function processFramesInBatches(file, batchCount = 5) {
    const input = new Input({
        source: new BlobSource(file),
        formats: ALL_FORMATS,
    });

    const duration = await input.getDuration();
    const interval = duration / batchCount;
    
    const batches = [];
    
    for (let i = 0; i < batchCount; i++) {
        const timestamp = i * interval;
        const frame = await input.getFrameAt(timestamp);
        
        // Perform CPU-intensive processing
        const processedFrame = await processFrame(frame);
        
        batches.push({
            timestamp,
            frame: processedFrame
        });
    }

    await input.end();
    
    return batches;
}

async function processFrame(frame) {
    // Example processing: convert to grayscale
    const canvas = new OffscreenCanvas(frame.displayWidth, frame.displayHeight);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(frame, 0, 0);
    
    // Apply grayscale filter
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    return canvas;
}
```

## Performance Tips

- Use sparse iteration when you don't need every frame/sample
- Cache converted data (canvases, AudioBuffers) when possible
- Limit concurrent frame extractions to prevent memory overflow
- Use canvas pooling for intensive video processing
- For large video files, extract frames progressively rather than all at once
- Consider using lazy loading techniques for continuous playback scenarios