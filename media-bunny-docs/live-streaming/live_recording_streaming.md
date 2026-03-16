# Live Recording & Streaming

## Overview
The Live Recording & Streaming module provides capabilities to record from webcam/screen capture, record from microphone, live audio/video streaming to file, pause/resume recording, real-time encoding during capture, network upload streaming, and Media Source Extensions integration.

## Key Capabilities

### 1. Live Recording
- Record from webcam/screen capture
- Record from microphone
- Pause/resume recording functionality
- Real-time encoding during capture

### 2. Live Streaming
- Live audio/video streaming to file
- Network upload streaming
- Stream to various formats (MP4, WebM, MKV, etc.)

### 3. Integration Features
- Media Source Extensions integration
- Backpressure handling
- Progress monitoring
- Cancellation support

## API Reference

### MediaRecorder Integration
Mediabunny works with the Web MediaRecorder API to capture live media streams:

```ts
// Capture video from webcam
const stream = await navigator.mediaDevices.getUserMedia({ video: true });

// Or capture screen
const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

// Or capture audio
const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
```

### Media Source Extensions (MSE) Support
```ts
// Using with MSE for playback of recorded content
const mediaSource = new MediaSource();
videoElement.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
    // Add source buffer for playback
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm;codecs=vp8');
    // Write recorded data to sourceBuffer
});
```

### Streamable Formats
The following formats work well for live streaming:
- WebM (good for live streaming)
- MPEG-TS (designed for streaming)
- Fragmented MP4 (for adaptive streaming)

## Code Examples

### Example 1: Webcam Recording
```ts
import {
    Output,
    WebMOutputFormat,
    WritableStreamTarget,
} from 'mediabunny';

async function recordWebcam() {
    // Get video stream from webcam
    const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
    });
    
    // Create video element to play the stream
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    
    // Create a WritableStream to collect the recording data
    let recordedChunks = [];
    const writableStream = new WritableStream({
        write(chunk) {
            recordedChunks.push(chunk);
        },
        close() {
            // All recording data is now in recordedChunks
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            console.log('Recording complete:', blob);
        }
    });
    
    // Set up Mediabunny output
    const output = new Output({
        format: new WebMOutputFormat(),
        target: new WritableStreamTarget(writableStream),
    });
    
    // This is a conceptual example - actual live recording with Mediabunny
    // would involve connecting the video stream to Mediabunny's encoding pipeline
    // which typically requires a different approach than static file conversion
    
    // Stop recording after 10 seconds as an example
    setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
    }, 10000);
    
    return { video, stream };
}
```

### Example 2: Screen Recording
```ts
async function recordScreen() {
    try {
        // Get screen capture stream
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { 
                cursor: 'always',
                displaySurface: 'monitor'
            },
            audio: true
        });
        
        // Show the stream in a video element
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        
        // Create a MediaRecorder to capture the stream
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });
        
        let recordedChunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            console.log('Screen recording complete:', blob);
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Stop recording after 30 seconds as an example
        setTimeout(() => {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
        }, 30000);
        
        return { mediaRecorder, stream };
    } catch (error) {
        console.error('Screen recording failed:', error);
        throw error;
    }
}
```

### Example 3: Audio Recording from Microphone
```ts
async function recordMicrophone() {
    try {
        // Get audio stream from microphone
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });
        
        // Create MediaRecorder for audio
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });
        
        let recordedChunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            console.log('Audio recording complete:', blob);
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Stop recording after 15 seconds as an example
        setTimeout(() => {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
        }, 15000);
        
        return { mediaRecorder, stream };
    } catch (error) {
        console.error('Microphone recording failed:', error);
        throw error;
    }
}
```

### Example 4: Live Streaming with Pause/Resume
```ts
class LiveRecorder {
    constructor() {
        this.stream = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isPaused = false;
        this.pausedChunks = [];
    }
    
    async startRecording(options = {}) {
        // Default to video and audio
        const { video = true, audio = true, display = false } = options;
        
        try {
            if (display) {
                // Screen recording
                this.stream = await navigator.mediaDevices.getDisplayMedia({ 
                    video: true,
                    audio: true
                });
            } else {
                // Webcam recording
                this.stream = await navigator.mediaDevices.getUserMedia({ 
                    video,
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true
                    }
                });
            }
            
            const mimeType = 'video/webm;codecs=vp9';
            this.mediaRecorder = new MediaRecorder(this.stream, { mimeType });
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    if (!this.isPaused) {
                        this.recordedChunks.push(event.data);
                    } else {
                        // Store paused chunks separately if needed
                        this.pausedChunks.push(event.data);
                    }
                }
            };
            
            this.mediaRecorder.start();
            console.log('Recording started');
            
            return this.stream;
        } catch (error) {
            console.error('Failed to start recording:', error);
            throw error;
        }
    }
    
    pause() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.pause();
            this.isPaused = true;
            console.log('Recording paused');
        }
    }
    
    resume() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
            this.mediaRecorder.resume();
            this.isPaused = false;
            console.log('Recording resumed');
        }
    }
    
    async stop() {
        return new Promise((resolve) => {
            this.mediaRecorder.onstop = () => {
                this.stream.getTracks().forEach(track => track.stop());
                const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                console.log('Recording stopped and complete');
                resolve(blob);
            };
            
            this.mediaRecorder.stop();
        });
    }
    
    togglePause() {
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }
    
    getRecordingTime() {
        // Could track recording time if needed
        return this.mediaRecorder?.stream ? Date.now() - this.startTime : 0;
    }
}

// Usage example
const recorder = new LiveRecorder();

async function startExampleRecording() {
    await recorder.startRecording({
        video: true,
        audio: true,
        display: false  // Set to true for screen recording
    });
    
    // Pause after 10 seconds
    setTimeout(() => {
        recorder.pause();
        console.log('Paused after 10 seconds');
        
        // Resume after another 5 seconds
        setTimeout(() => {
            recorder.resume();
            console.log('Resumed after 5 second pause');
            
            // Stop after 20 more seconds of recording
            setTimeout(async () => {
                const recording = await recorder.stop();
                console.log('Final recording:', recording);
            }, 20000);
        }, 5000);
    }, 10000);
}
```

### Example 5: Real-time Encoding During Capture
```ts
// Real-time encoding requires a more complex setup involving:
// 1. Capturing the media stream
// 2. Processing each frame/sample in real-time
// 3. Encoding it using Mediabunny's encoders
// 4. Writing to output as it's produced

class RealTimeEncoder {
    constructor(outputFormat = 'webm') {
        this.outputFormat = outputFormat;
        this.encoder = null;
        this.outputChunks = [];
        this.isEncoding = false;
    }
    
    async initializeEncoder(width, height, frameRate = 30) {
        // This is a conceptual example - actual implementation would depend on
        // Mediabunny's specific real-time encoding API
        
        // In a real implementation, you would:
        // 1. Create a VideoEncoder (if available in browser)
        // 2. Configure it with Mediabunny settings
        // 3. Handle encoded chunks in real-time
        
        const config = {
            codec: 'vp8',
            width,
            height,
            bitrate: 2_000_000, // 2 Mbps
            framerate: frameRate
        };
        
        if ('VideoEncoder' in window) {
            this.encoder = new VideoEncoder({
                output: (chunk, metadata) => {
                    // Collect encoded chunks
                    this.outputChunks.push(chunk);
                },
                error: (e) => {
                    console.error('Encoding error:', e);
                }
            });
            
            this.encoder.configure(config);
            this.isEncoding = true;
        } else {
            console.warn('VideoEncoder not supported in this browser');
        }
    }
    
    encodeFrame(videoFrame) {
        if (this.isEncoding && this.encoder) {
            this.encoder.encode(videoFrame);
        }
    }
    
    async processStream(stream) {
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);
        
        // Process frames continuously
        const processNextFrame = async () => {
            if (!this.isEncoding) return;
            
            try {
                const bitmap = await imageCapture.grabFrame();
                
                // Convert to VideoFrame if available
                if ('VideoFrame' in window) {
                    const videoFrame = new VideoFrame(bitmap, {
                        timestamp: performance.now()
                    });
                    
                    this.encodeFrame(videoFrame);
                    
                    // Clean up
                    videoFrame.close();
                }
                
                // Continue processing
                setTimeout(processNextFrame, 1000 / 30); // ~30fps
            } catch (error) {
                console.error('Frame processing error:', error);
            }
        };
        
        processNextFrame();
    }
}

// Usage example
async function realTimeRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
    });
    
    const encoder = new RealTimeEncoder();
    
    // Initialize encoder with stream dimensions
    const videoTrack = stream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();
    
    await encoder.initializeEncoder(
        settings.width,
        settings.height,
        settings.frameRate
    );
    
    // Start processing the stream
    await encoder.processStream(stream);
    
    // Stop after 10 seconds for example
    setTimeout(() => {
        encoder.isEncoding = false;
        stream.getTracks().forEach(track => track.stop());
        
        // Combine all encoded chunks into a file
        const finalBlob = new Blob(encoder.outputChunks, {
            type: 'video/webm'
        });
        
        console.log('Real-time recording complete:', finalBlob);
    }, 10000);
}
```

### Example 6: Network Upload Streaming
```ts
class StreamUploader {
    constructor(uploadUrl) {
        this.uploadUrl = uploadUrl;
        this.encodedChunks = [];
        this.uploadSessionId = null;
        this.isUploading = false;
    }
    
    async startUploadSession() {
        const response = await fetch(`${this.uploadUrl}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                format: 'webm',
                timestamp: Date.now()
            })
        });
        
        const result = await response.json();
        this.uploadSessionId = result.sessionId;
        
        return this.uploadSessionId;
    }
    
    async uploadChunk(chunk) {
        if (!this.uploadSessionId) {
            throw new Error('Upload session not started');
        }
        
        // Send chunk with sessionId
        const formData = new FormData();
        formData.append('chunk', new Blob([chunk]), 'chunk.data');
        formData.append('sessionId', this.uploadSessionId);
        
        const response = await fetch(`${this.uploadUrl}/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }
        
        return response.json();
    }
    
    async finalizeUpload() {
        if (!this.uploadSessionId) {
            throw new Error('Upload session not started');
        }
        
        const response = await fetch(`${this.uploadUrl}/finalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: this.uploadSessionId
            })
        });
        
        this.uploadSessionId = null;
        this.isUploading = false;
        
        return response.json();
    }
    
    async processAndUpload(encodedStream) {
        this.isUploading = true;
        
        // Start upload session
        await this.startUploadSession();
        
        // Process encoded stream and upload chunks
        const reader = encodedStream.getReader();
        let result;
        
        try {
            while (!result?.done && this.isUploading) {
                result = await reader.read();
                
                if (result.value) {
                    try {
                        await this.uploadChunk(result.value);
                        console.log('Chunk uploaded successfully');
                    } catch (uploadError) {
                        console.error('Chunk upload failed:', uploadError);
                        // Handle retry logic or error recovery here
                    }
                }
            }
            
            if (this.isUploading) {
                // Finalize the upload
                await this.finalizeUpload();
                console.log('Upload completed successfully');
            }
        } finally {
            reader.releaseLock();
        }
    }
}

// Usage example with MediaRecorder
async function streamToServer() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
    });
    
    const uploader = new StreamUploader('https://api.example.com/live-upload');
    
    // Create a TransformStream to pipe recording data to uploader
    const { readable, writable } = new TransformStream();
    
    // Start the upload process
    const uploadPromise = uploader.processAndUpload(readable);
    
    // Pipe MediaRecorder data to the writable stream
    mediaRecorder.start();
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            const writer = writable.getWriter();
            writer.write(event.data);
            writer.releaseLock();
        }
    };
    
    // Stop recording after 30 seconds
    setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
    }, 30000);
    
    await uploadPromise;
}
```

### Example 7: Media Source Extensions Integration
```ts
class MSEStreamer {
    constructor(videoElement) {
        this.videoElement = videoElement;
        this.mediaSource = new MediaSource();
        this.sourceBuffer = null;
        this.isStreaming = false;
    }
    
    async initialize() {
        this.videoElement.src = URL.createObjectURL(this.mediaSource);
        
        return new Promise((resolve) => {
            this.mediaSource.addEventListener('sourceopen', async () => {
                // Add source buffer for incoming video chunks
                this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm;codecs=vp9');
                
                this.sourceBuffer.addEventListener('updateend', () => {
                    if (this.mediaSource.readyState === 'open' && this.pendingChunks && this.pendingChunks.length > 0) {
                        this.appendNextChunk();
                    }
                });
                
                resolve();
            });
        });
    }
    
    async receiveChunk(chunk) {
        if (!this.sourceBuffer || this.sourceBuffer.updating) {
            // Queue the chunk if source buffer is busy
            if (!this.pendingChunks) {
                this.pendingChunks = [];
            }
            this.pendingChunks.push(chunk);
            return;
        }
        
        this.sourceBuffer.appendBuffer(chunk);
    }
    
    appendNextChunk() {
        if (this.pendingChunks && this.pendingChunks.length > 0) {
            const chunk = this.pendingChunks.shift();
            this.sourceBuffer.appendBuffer(chunk);
        }
    }
    
    async startStreaming() {
        this.isStreaming = true;
        console.log('MSE streaming started');
    }
    
    stopStreaming() {
        this.isStreaming = false;
        if (this.mediaSource.readyState === 'open') {
            this.mediaSource.endOfStream();
        }
        console.log('MSE streaming stopped');
    }
}

// Usage example: Receiving live stream via WebSocket and playing via MSE
async function setupLiveStreaming() {
    const mseStreamer = new MSEStreamer(document.getElementById('videoPlayer'));
    await mseStreamer.initialize();
    
    // Connect to WebSocket for live video chunks
    const ws = new WebSocket('ws://example.com/live-stream');
    
    ws.binaryType = 'arraybuffer';
    
    ws.onmessage = async (event) => {
        if (event.data instanceof ArrayBuffer) {
            await mseStreamer.receiveChunk(event.data);
        }
    };
    
    ws.onopen = () => {
        console.log('Connected to live stream');
        mseStreamer.startStreaming();
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        mseStreamer.stopStreaming();
    };
    
    ws.onclose = () => {
        console.log('Live stream connection closed');
        mseStreamer.stopStreaming();
    };
}
```

### Example 8: Backpressure Handling in Live Streams
```ts
class BackpressureManager {
    constructor(maxBufferSize = 10 * 1024 * 1024) { // 10 MB default
        this.maxBufferSize = maxBufferSize;
        this.currentBufferSize = 0;
        this.paused = false;
        this.pauseCallbacks = [];
        this.resumeCallbacks = [];
    }
    
    addData(size) {
        this.currentBufferSize += size;
        
        if (this.currentBufferSize > this.maxBufferSize && !this.paused) {
            this.paused = true;
            console.log('Backpressure threshold reached, pausing...');
            this.pauseCallbacks.forEach(callback => callback());
        } else if (this.currentBufferSize < this.maxBufferSize * 0.5 && this.paused) {
            this.paused = false;
            console.log('Buffer cleared, resuming...');
            this.resumeCallbacks.forEach(callback => callback());
        }
    }
    
    removeData(size) {
        this.currentBufferSize = Math.max(0, this.currentBufferSize - size);
        
        if (this.currentBufferSize < this.maxBufferSize * 0.5 && this.paused) {
            this.paused = false;
            console.log('Buffer cleared, resuming...');
            this.resumeCallbacks.forEach(callback => callback());
        }
    }
    
    onPause(callback) {
        this.pauseCallbacks.push(callback);
    }
    
    onResume(callback) {
        this.resumeCallbacks.push(callback);
    }
    
    isPaused() {
        return this.paused;
    }
    
    getUsagePercent() {
        return (this.currentBufferSize / this.maxBufferSize) * 100;
    }
}

// Example usage with MediaRecorder
async function recordingWithBackpressure() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    
    const mediaRecorder = new MediaRecorder(stream);
    const backpressureMgr = new BackpressureManager(5 * 1024 * 1024); // 5MB limit
    
    // Pause recording when buffer is full
    backpressureMgr.onPause(() => {
        if (mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            console.log('Recording paused due to backpressure');
        }
    });
    
    // Resume recording when buffer clears
    backpressureMgr.onResume(() => {
        if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
            console.log('Recording resumed after backpressure relief');
        }
    });
    
    let recordedChunks = [];
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            backpressureMgr.addData(event.data.size);
            
            // Simulate processing/transfer that reduces buffer
            setTimeout(() => {
                backpressureMgr.removeData(event.data.size);
            }, 1000); // Simulate 1 second processing time
        }
    };
    
    mediaRecorder.start(1000); // Collect data every 1 second
    
    // Monitor backpressure
    setInterval(() => {
        console.log(`Buffer usage: ${backpressureMgr.getUsagePercent().toFixed(1)}%, Paused: ${backpressureMgr.isPaused()}`);
    }, 500);
    
    // Stop after 30 seconds
    setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
    }, 30000);
}
```

## Performance Tips

- Use appropriate codecs for live streaming (VP9/VP8 for WebM, H.264 for MP4)
- Implement proper backpressure handling to prevent memory overflow
- Use MSE for smooth playback of streamed content
- Choose the right streaming format based on your use case:
  - WebM: Good for live streaming with low latency
  - MPEG-TS: Designed for streaming, good for live broadcast
  - Fragmented MP4: Good for adaptive streaming
- Monitor buffer sizes to prevent memory issues during long recordings
- Implement graceful degradation for browsers with limited codec support
- Use appropriate chunk sizes for network uploads to balance efficiency and reliability
- Consider using Web Workers for heavy processing during live recording to avoid UI blocking