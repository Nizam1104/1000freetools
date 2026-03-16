# Advanced Features

## Overview
The Advanced Features module provides capabilities for custom encoder/decoder registration, polyfill missing codecs, B-frame handling, key frame control, multiple track support (multiple videos, audios, subtitles), track language and metadata, subtitle support (WebVTT), backpressure handling, progress monitoring, cancellation support, sparse iteration for efficient processing, canvas pool optimization, and lazy/on-demand file reading.

## Key Capabilities

### 1. Custom Codecs and Extensibility
- Custom encoder/decoder registration
- Polyfill missing codecs
- WASM-based extensions

### 2. Frame Control
- B-frame handling
- Key frame control

### 3. Multi-track Support
- Multiple video tracks support
- Multiple audio tracks support
- Subtitle track support (WebVTT)
- Track language and metadata

### 4. Performance Optimization
- Backpressure handling
- Progress monitoring
- Cancellation support
- Sparse iteration for efficient processing
- Canvas pool optimization
- Lazy/on-demand file reading

## API Reference

### Custom Encoder Registration
```ts
import { registerEncoder, registerDecoder } from 'mediabunny';

// Register a custom encoder
registerEncoder(codecName, encoderClass);

// Register a custom decoder
registerDecoder(codecName, decoderClass);
```

### Example with MP3 Encoder Extension
```ts
import { registerMp3Encoder } from '@mediabunny/mp3-encoder';

// Register MP3 encoder (if not natively supported)
if (!(await canEncodeAudio('mp3'))) {
    registerMp3Encoder();
}
```

### Key Frame Control
```ts
const conversion = await Conversion.init({
    input,
    output,
    video: {
        keyFrameInterval: 2,  // Force key frame every 2 seconds
        forceTranscode: true  // Prevent direct copying to ensure key frames are set
    }
});
```

### Multiple Tracks
```ts
// Access multiple tracks from input
const tracks = await input.getTracks();

// Filter by track type and language
const englishAudioTracks = tracks.filter(t => 
    t.type === 'audio' && t.languageCode === 'eng'
);

const subtitleTracks = tracks.filter(t => t.type === 'text');
```

### Progress Monitoring and Cancellation
```ts
const conversion = await Conversion.init({ input, output });

// Monitor progress
conversion.onProgress = (progress) => {
    console.log(`Progress: ${Math.round(progress * 100)}%`);
};

// Cancel if needed
try {
    await conversion.execute();
} catch (error) {
    if (error.name === 'ConversionCanceledError') {
        console.log('Conversion was canceled');
    }
}

// From another context, cancel the conversion
await conversion.cancel();
```

### Sparse Iteration
```ts
// Efficiently iterate through key frames only
for await (const packet of input.iterateVideoPackets({ keyframesOnly: true })) {
    console.log(`Key frame at ${packet.timestamp}s`);
}

// Iterate through samples at specific intervals
for await (const sample of input.iterateVideoSamples({ interval: 5 })) {
    // Process sample every 5 seconds
}
```

## Code Examples

### Example 1: Registering a Custom MP3 Encoder
```ts
import {
    Input,
    Output,
    Mp3OutputFormat,
    BufferTarget,
    BlobSource,
    Conversion,
    ALL_FORMATS,
    canEncodeAudio
} from 'mediabunny';
import { registerMp3Encoder } from '@mediabunny/mp3-encoder';

async function ensureMp3Support() {
    // Check if MP3 encoding is supported natively
    if (!(await canEncodeAudio('mp3'))) {
        // Register the custom MP3 encoder if not supported
        registerMp3Encoder();
    }
}

async function createMp3FromVideo(inputFile) {
    await ensureMp3Support();
    
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp3OutputFormat(),
        target: new BufferTarget(),
    });
    
    // Remove video track to extract audio only
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            discard: true
        }
    });
    
    await conversion.execute();
    
    const mp3Buffer = output.target.buffer;
    const mp3Blob = new Blob([mp3Buffer], { type: 'audio/mpeg' });
    
    await input.end();
    
    return mp3Blob;
}
```

### Example 2: Key Frame Control
```ts
async function convertWithKeyFrameControl(inputFile, keyFrameInterval) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            keyFrameInterval: keyFrameInterval,  // Set key frame interval (in seconds)
            forceTranscode: true  // Ensure transcoding occurs to apply key frame settings
        }
    });
    
    await conversion.execute();
    
    const outputBuffer = output.target.buffer;
    const outputBlob = new Blob([outputBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return outputBlob;
}

// Create a video with key frames every second
const processedVideo = await convertWithKeyFrameControl(inputFile, 1.0);
```

### Example 3: Multi-track Video Processing
```ts
async function processMultiTrackVideo(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const tracks = await input.getTracks();
    
    console.log(`Found ${tracks.length} tracks:`);
    tracks.forEach((track, index) => {
        console.log(`${index}: ${track.type} - ${track.languageCode || 'default'} - ${track.codec}`);
    });
    
    // Process only the first video track and English audio
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: (track) => {
            // Keep only the first video track
            return track.number === 0 ? {} : { discard: true };
        },
        audio: (track) => {
            // Keep only English audio tracks
            return track.languageCode === 'eng' ? {} : { discard: true };
        }
    });
    
    await conversion.execute();
    
    const multiTrackBuffer = output.target.buffer;
    const multiTrackBlob = new Blob([multiTrackBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return multiTrackBlob;
}
```

### Example 4: Subtitle Handling
```ts
async function processVideoWithSubtitles(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const tracks = await input.getTracks();
    const subtitleTracks = tracks.filter(t => t.type === 'text');
    
    console.log(`Found ${subtitleTracks.length} subtitle tracks`);
    
    // Convert video while preserving subtitles
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output
        // By default, subtitles will be preserved if supported by output format
    });
    
    await conversion.execute();
    
    const subtitledBuffer = output.target.buffer;
    const subtitledBlob = new Blob([subtitledBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return subtitledBlob;
}

// For WebVTT extraction
async function extractSubtitlesAsVtt(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Implementation would involve extracting subtitle tracks
    // and converting them to WebVTT format
    
    const tracks = await input.getTracks();
    const subtitleTracks = tracks.filter(t => t.type === 'text');
    
    // Process each subtitle track
    for (const track of subtitleTracks) {
        console.log(`Subtitle track: ${track.languageCode || 'default'}`);
        
        // Extract subtitle data (specific implementation depends on library API)
        // This would involve getting subtitle samples and converting to WebVTT
    }
    
    await input.end();
}
```

### Example 5: Progress Monitoring and Cancellation
```ts
class MonitoredConversion {
    constructor() {
        this.progress = 0;
        this.conversion = null;
        this.isCancelled = false;
    }
    
    async convert(input, output) {
        this.conversion = await Conversion.init({ input, output });
        
        // Set up progress monitoring
        this.conversion.onProgress = (progress) => {
            this.progress = progress;
            this.onProgressUpdate && this.onProgressUpdate(progress);
        };
        
        try {
            await this.conversion.execute();
            return true;
        } catch (error) {
            if (error.name === 'ConversionCanceledError') {
                console.log('Conversion was canceled');
                return false;
            }
            throw error;
        }
    }
    
    async cancel() {
        if (this.conversion && !this.isCancelled) {
            this.isCancelled = true;
            await this.conversion.cancel();
        }
    }
    
    onProgressUpdate(progressCallback) {
        this.onProgressUpdate = progressCallback;
    }
    
    getProgress() {
        return this.progress;
    }
}

// Usage example
async function convertWithMonitoring(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const converter = new MonitoredConversion();
    
    // Set up progress monitoring
    converter.onProgressUpdate((progress) => {
        console.log(`Conversion progress: ${Math.round(progress * 100)}%`);
        
        // Cancel if it takes too long (example condition)
        if (progress > 0.5) {
            // Just an example - normally you wouldn't cancel at 50%
            // unless there's a specific reason
        }
    });
    
    // Perform conversion
    const success = await converter.convert(input, output);
    
    if (success) {
        const resultBuffer = output.target.buffer;
        const resultBlob = new Blob([resultBuffer], { type: 'video/mp4' });
        
        await input.end();
        
        return resultBlob;
    } else {
        console.log('Conversion was cancelled or failed');
        await input.end();
        return null;
    }
}
```

### Example 6: Sparse Iteration for Efficient Processing
```ts
async function analyzeKeyFrames(inputFile) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const keyFrames = [];
    
    // Iterate only through key frames (more efficient than all frames)
    for await (const packet of input.iterateVideoPackets({ keyframesOnly: true })) {
        keyFrames.push({
            timestamp: packet.timestamp,
            size: packet.data?.length || 0,
            isKeyFrame: packet.isKeyFrame
        });
    }
    
    console.log(`Found ${keyFrames.length} key frames`);
    
    await input.end();
    
    return keyFrames;
}

async function sampleAtIntervals(inputFile, intervalSeconds = 10) {
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const samples = [];
    const duration = await input.getDuration();
    
    // Efficiently get samples at specific intervals
    for (let time = 0; time < duration; time += intervalSeconds) {
        try {
            const frame = await input.getFrameAt(time);
            samples.push({
                timestamp: time,
                frame: frame
            });
        } catch (error) {
            console.warn(`Could not extract frame at ${time}s:`, error);
        }
    }
    
    await input.end();
    
    return samples;
}
```

### Example 7: Backpressure Handling in Processing Pipeline
```ts
class ProcessingPipeline {
    constructor(bufferSizeLimit = 50) {
        this.bufferSizeLimit = bufferSizeLimit;
        this.processingQueue = [];
        this.activeProcesses = 0;
        this.maxConcurrent = 3;
    }
    
    async addTask(taskFn) {
        return new Promise((resolve, reject) => {
            const task = { fn: taskFn, resolve, reject };
            
            // Check if we should wait due to backpressure
            if (this.processingQueue.length >= this.bufferSizeLimit) {
                console.warn('Processing queue is full, backpressure detected');
                // In a real implementation, you might want to wait or drop frames
            }
            
            this.processingQueue.push(task);
            this.processNext();
        });
    }
    
    async processNext() {
        if (this.activeProcesses >= this.maxConcurrent || this.processingQueue.length === 0) {
            return;
        }
        
        this.activeProcesses++;
        const task = this.processingQueue.shift();
        
        try {
            const result = await task.fn();
            task.resolve(result);
        } catch (error) {
            task.reject(error);
        } finally {
            this.activeProcesses--;
            // Process next item in queue
            setTimeout(() => this.processNext(), 0);
        }
    }
    
    getQueueStatus() {
        return {
            queued: this.processingQueue.length,
            active: this.activeProcesses,
            utilization: (this.activeProcesses / this.maxConcurrent) * 100
        };
    }
}

// Example usage with media processing
async function processWithBackpressure(inputFile) {
    const pipeline = new ProcessingPipeline(20);  // Max 20 items in queue
    
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const duration = await input.getDuration();
    const interval = 1; // Process every 1 second
    
    const processingPromises = [];
    
    for (let t = 0; t < duration; t += interval) {
        const taskPromise = pipeline.addTask(async () => {
            const frame = await input.getFrameAt(t);
            
            // Simulate processing
            return {
                timestamp: t,
                processedFrame: frame
            };
        });
        
        processingPromises.push(taskPromise);
        
        // Log status periodically
        if (t % 10 === 0) {
            const status = pipeline.getQueueStatus();
            console.log(`Queue status: ${status.queued} queued, ${status.active} active`);
        }
    }
    
    const results = await Promise.all(processingPromises);
    
    await input.end();
    
    return results;
}
```

### Example 8: Canvas Pool Optimization
```ts
class CanvasPool {
    constructor(maxCanvases = 10) {
        this.maxCanvases = maxCanvases;
        this.availableCanvases = [];
        this.usedCanvases = new Set();
    }
    
    getCanvas(width, height) {
        let canvas;
        
        // Look for reusable canvas of correct size
        const idx = this.availableCanvases.findIndex(c => 
            c.width === width && c.height === height
        );
        
        if (idx !== -1) {
            canvas = this.availableCanvases.splice(idx, 1)[0];
        } else {
            // Create new canvas if needed and within limits
            if (this.usedCanvases.size < this.maxCanvases) {
                canvas = new OffscreenCanvas(width, height);
            } else {
                // Reuse the first available canvas and resize
                canvas = this.availableCanvases.pop();
                if (canvas) {
                    canvas.width = width;
                    canvas.height = height;
                } else {
                    // Last resort - create new canvas regardless of limit
                    canvas = new OffscreenCanvas(width, height);
                }
            }
        }
        
        this.usedCanvases.add(canvas);
        return canvas;
    }
    
    releaseCanvas(canvas) {
        if (this.usedCanvases.has(canvas)) {
            this.usedCanvases.delete(canvas);
            this.availableCanvases.push(canvas);
        }
    }
    
    clear() {
        this.availableCanvases.forEach(canvas => {
            // Optionally clear canvas data
        });
        this.availableCanvases = [];
        this.usedCanvases.clear();
    }
}

// Video processing with canvas pooling
async function processVideoWithCanvasPool(inputFile) {
    const canvasPool = new CanvasPool(5); // Pool up to 5 canvases
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });
    
    const conversion = await Conversion.init({
        input,
        output,
        video: {
            process: async (sample) => {
                // Get a canvas from the pool
                const canvas = canvasPool.getCanvas(
                    sample.displayWidth, 
                    sample.displayHeight
                );
                
                const ctx = canvas.getContext('2d');
                
                // Apply processing (e.g., grayscale)
                ctx.filter = 'grayscale(100%)';
                ctx.drawImage(sample, 0, 0);
                
                // Release canvas back to pool after use
                // In a real implementation, you might return the canvas
                // and release it after the conversion step
                
                return canvas;
            }
        }
    });
    
    await conversion.execute();
    
    // Clean up canvas pool
    canvasPool.clear();
    
    const processedBuffer = output.target.buffer;
    const processedBlob = new Blob([processedBuffer], { type: 'video/mp4' });
    
    await input.end();
    
    return processedBlob;
}
```

### Example 9: Lazy/On-Demand File Reading
```ts
// Demonstration of lazy loading concepts
class LazyMediaLoader {
    constructor(source, format = 'auto') {
        this.source = source;
        this.format = format;
        this.metadataLoaded = false;
        this.tracksLoaded = false;
        this.input = null;
    }
    
    async loadMetadata() {
        if (!this.input) {
            this.input = new Input({
                source: this.source,
                formats: ALL_FORMATS,
            });
        }
        
        if (!this.metadataLoaded) {
            this.duration = await this.input.getDuration();
            this.formatInfo = await this.input.getFormat();
            this.metadataLoaded = true;
        }
        
        return {
            duration: this.duration,
            format: this.formatInfo
        };
    }
    
    async loadTracks() {
        await this.loadMetadata(); // Ensure metadata is loaded first
        
        if (!this.tracksLoaded) {
            this.tracks = await this.input.getTracks();
            this.tracksLoaded = true;
        }
        
        return this.tracks;
    }
    
    async getFrameAt(timestamp) {
        // Load metadata first if not already loaded
        await this.loadMetadata();
        return await this.input.getFrameAt(timestamp);
    }
    
    async cleanup() {
        if (this.input) {
            await this.input.end();
            this.input = null;
        }
    }
}

// Usage example
async function processWithLazyLoading(inputFile) {
    const loader = new LazyMediaLoader(new BlobSource(inputFile));
    
    // Only load metadata initially
    const metadata = await loader.loadMetadata();
    console.log(`Duration: ${metadata.duration}s`);
    
    // Load tracks only when needed
    const tracks = await loader.loadTracks();
    console.log(`Found ${tracks.length} tracks`);
    
    // Get specific frames on demand
    const frame = await loader.getFrameAt(10); // Get frame at 10 seconds
    
    // Clean up when done
    await loader.cleanup();
}
```

### Example 10: Comprehensive Advanced Feature Usage
```ts
async function advancedMediaProcessing(inputFile, options = {}) {
    const {
        targetFormat = 'mp4',
        preserveSubtitles = true,
        keyFrameInterval = null,
        maxResolution = null,
        targetLanguage = 'en',
        enableProgress = true,
        enableCancellation = true
    } = options;
    
    const input = new Input({
        source: new BlobSource(inputFile),
        formats: ALL_FORMATS,
    });
    
    // Set up output format
    let outputFormat;
    switch (targetFormat) {
        case 'mp4':
            outputFormat = new Mp4OutputFormat();
            break;
        case 'webm':
            outputFormat = new WebMOutputFormat();
            break;
        case 'mkv':
            outputFormat = new MatroskaOutputFormat();
            break;
        default:
            outputFormat = new Mp4OutputFormat();
    }
    
    const output = new Output({
        format: outputFormat,
        target: new BufferTarget(),
    });
    
    // Build conversion options
    const conversionOptions = {
        input,
        output
    };
    
    // Video processing options
    conversionOptions.video = {
        ...(keyFrameInterval && { keyFrameInterval }),
        ...(maxResolution && { 
            width: maxResolution.width, 
            height: maxResolution.height,
            fit: 'contain'
        })
    };
    
    // Audio processing options
    if (targetLanguage) {
        conversionOptions.audio = (track) => {
            if (track.languageCode !== targetLanguage) {
                return { discard: true };
            }
            return {};
        };
    }
    
    const conversion = await Conversion.init(conversionOptions);
    
    // Set up progress monitoring if enabled
    if (enableProgress) {
        conversion.onProgress = (progress) => {
            console.log(`Advanced processing progress: ${Math.round(progress * 100)}%`);
        };
    }
    
    // Perform the conversion
    try {
        await conversion.execute();
        
        const finalBuffer = output.target.buffer;
        const finalBlob = new Blob([finalBuffer], { 
            type: `video/${targetFormat}` 
        });
        
        await input.end();
        
        return {
            blob: finalBlob,
            discardedTracks: conversion.discardedTracks,
            utilizedTracks: conversion.utilizedTracks
        };
    } catch (error) {
        if (enableCancellation && error.name === 'ConversionCanceledError') {
            console.log('Advanced processing was canceled');
            await input.end();
            return { canceled: true };
        }
        throw error;
    }
}
```

## Performance Tips

- Use custom encoders/decoders sparingly, as they may add overhead
- Implement proper error handling for custom codec registration
- Monitor key frame intervals to balance file size and seekability
- For multi-track files, select only needed tracks to reduce processing time
- Use sparse iteration when you don't need every frame or sample
- Implement proper buffer management to handle backpressure
- Use canvas pools for intensive video processing to reduce allocation overhead
- Take advantage of lazy loading for large files to reduce initial memory usage
- Monitor resource utilization during long processing tasks
- Implement cancellation mechanisms for user-initiated operations that might take a long time