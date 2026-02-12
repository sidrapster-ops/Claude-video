# Remotion - Programmatic Video Creation with React

> Source: https://github.com/remotion-dev/remotion
> Version: 4.x
> License: Custom (free for individuals/small companies, commercial license required for larger organizations)

## Overview

Remotion is a framework for creating videos programmatically using React. It lets you use web technologies (React, CSS, Canvas, SVG, WebGL) to define video content as code instead of traditional video editing software.

## Quick Start

### Create a new project

```bash
npx create-video@latest
```

### Add to existing project

```bash
npm install remotion @remotion/cli @remotion/bundler
```

### Common additional packages

```bash
# Server-side rendering
npm install @remotion/renderer

# Embed player in web app
npm install @remotion/player

# Transitions
npm install @remotion/transitions

# AWS Lambda rendering
npm install @remotion/lambda

# Google Cloud Run rendering
npm install @remotion/cloudrun

# Media utilities
npm install @remotion/media-utils

# Google Fonts
npm install @remotion/google-fonts

# Lottie animations
npm install @remotion/lottie

# 3D with Three.js
npm install @remotion/three

# GIF support
npm install @remotion/gif

# Noise generation
npm install @remotion/noise

# SVG paths
npm install @remotion/paths

# SVG shapes
npm install @remotion/shapes

# Motion blur
npm install @remotion/motion-blur

# Tailwind CSS
npm install @remotion/tailwind

# Captions/subtitles
npm install @remotion/captions

# Preloading assets
npm install @remotion/preload

# Layout utilities
npm install @remotion/layout-utils

# Animation utilities
npm install @remotion/animation-utils

# Rive animations
npm install @remotion/rive

# Media parser (pure JS)
npm install @remotion/media-parser

# WebCodecs (browser encoding)
npm install @remotion/webcodecs
```

## CLI Commands

```bash
# Launch visual development studio
npx remotion studio

# Render a composition to video
npx remotion render <composition-id> <output-path>

# Render a still image
npx remotion still <composition-id> <output-path>

# Upgrade Remotion packages
npx remotion upgrade

# Get environment info
npx remotion versions
```

## Project Structure

A typical Remotion project:

```
my-video/
  src/
    Root.tsx              # Entry point - registers all compositions
    MyComposition.tsx     # A video composition component
    index.ts              # Calls registerRoot(RemotionRoot)
  public/                 # Static assets (images, fonts, audio, video)
  remotion.config.ts      # Remotion configuration (optional)
  package.json
  tsconfig.json
```

### Entry Point (src/index.ts)

```tsx
import {registerRoot} from 'remotion';
import {RemotionRoot} from './Root';

registerRoot(RemotionRoot);
```

### Root Component (src/Root.tsx)

```tsx
import {Composition, Still} from 'remotion';
import {MyVideo} from './MyVideo';
import {MyThumbnail} from './MyThumbnail';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'Hello World',
        }}
      />
      <Still
        id="MyThumbnail"
        component={MyThumbnail}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

## Core API Reference

### Components

#### `<Composition>`

Registers a video composition. Must be placed inside the root component.

```tsx
<Composition
  id="MyVideo"                    // Unique identifier (used in CLI)
  component={MyComponent}         // React component to render
  durationInFrames={300}          // Total frames
  fps={30}                        // Frames per second
  width={1920}                    // Video width in pixels
  height={1080}                   // Video height in pixels
  defaultProps={{...}}            // Default props passed to component
  schema={myZodSchema}           // Optional Zod schema for props validation
/>
```

#### `<Still>`

Like `<Composition>` but for single-frame images (no duration/fps).

```tsx
<Still
  id="MyThumbnail"
  component={MyComponent}
  width={1920}
  height={1080}
/>
```

#### `<AbsoluteFill>`

A full-size absolutely positioned container. The fundamental layout primitive.

```tsx
import {AbsoluteFill} from 'remotion';

<AbsoluteFill style={{backgroundColor: 'white'}}>
  {children}
</AbsoluteFill>
```

Equivalent to:
```css
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
display: flex;
justify-content: center;
align-items: center;
```

#### `<Sequence>`

Shows content for a specific time range within the video.

```tsx
import {Sequence} from 'remotion';

// Show from frame 30 to frame 80
<Sequence from={30} durationInFrames={50}>
  <MyElement />
</Sequence>

// Show from frame 60 onwards (no duration limit)
<Sequence from={60}>
  <AnotherElement />
</Sequence>

// Named sequence (shows in timeline)
<Sequence from={0} durationInFrames={100} name="Intro">
  <IntroSection />
</Sequence>
```

Inside a `<Sequence>`, `useCurrentFrame()` resets to 0 at the sequence start.

#### `<Series>`

Plays sequences one after another without manual `from` calculation.

```tsx
import {Series} from 'remotion';

<Series>
  <Series.Sequence durationInFrames={60}>
    <IntroScene />
  </Series.Sequence>
  <Series.Sequence durationInFrames={90} offset={-10}> {/* overlap by 10 frames */}
    <MainScene />
  </Series.Sequence>
  <Series.Sequence durationInFrames={45}>
    <OutroScene />
  </Series.Sequence>
</Series>
```

#### `<Loop>`

Repeats content for a given number of iterations.

```tsx
import {Loop} from 'remotion';

<Loop durationInFrames={60} times={3}>
  <AnimatedElement />
</Loop>
```

#### `<Video>` / `<OffthreadVideo>`

Embeds video files. `<OffthreadVideo>` is recommended for better performance during rendering.

```tsx
import {Video, OffthreadVideo, staticFile} from 'remotion';

// OffthreadVideo (recommended for rendering)
<OffthreadVideo src={staticFile('background.mp4')} />

// Video (uses HTML5 video element, better for Player)
<Video src={staticFile('clip.mp4')} startFrom={30} endAt={120} volume={0.5} />
```

#### `<Audio>`

Embeds audio files.

```tsx
import {Audio, staticFile} from 'remotion';

<Audio
  src={staticFile('music.mp3')}
  startFrom={0}
  volume={(f) => Math.min(1, f / 30)}  // Fade in over 30 frames
/>
```

#### `<Img>`

Image component with `delayRender` built in (waits for image to load).

```tsx
import {Img, staticFile} from 'remotion';

<Img src={staticFile('logo.png')} style={{width: 200}} />
```

### Hooks

#### `useCurrentFrame()`

Returns the current frame number (0-indexed). Inside a `<Sequence>`, returns frames relative to sequence start.

```tsx
import {useCurrentFrame} from 'remotion';

const frame = useCurrentFrame(); // 0, 1, 2, 3, ...
```

#### `useVideoConfig()`

Returns the video configuration for the current composition.

```tsx
import {useVideoConfig} from 'remotion';

const {
  fps,              // Frames per second
  width,            // Video width
  height,           // Video height
  durationInFrames, // Total duration in frames
  id,               // Composition ID
  defaultProps,     // Default props
  defaultCodec,     // Default codec
} = useVideoConfig();
```

### Animation Functions

#### `interpolate()`

Maps a value from one range to another. The primary animation function.

```tsx
import {interpolate, Easing} from 'remotion';

const frame = useCurrentFrame();

// Linear fade in from frame 0-30
const opacity = interpolate(frame, [0, 30], [0, 1]);

// Slide from left with clamping
const translateX = interpolate(frame, [0, 60], [-200, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// With easing
const scale = interpolate(frame, [0, 30], [0.5, 1], {
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Multiple keyframes
const y = interpolate(frame, [0, 30, 60, 90], [0, -100, -100, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

Options for extrapolation:
- `'extend'` (default) - continues the trend
- `'clamp'` - clamps to the output range
- `'identity'` - returns the input value

#### `spring()`

Physics-based spring animation. Returns a value that settles to 1.

```tsx
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: {
    damping: 200,     // default: 10
    stiffness: 100,   // default: 100
    mass: 1,          // default: 1
    overshootClamping: false,
  },
  from: 0,            // Start value (default: 0)
  to: 1,              // End value (default: 1)
  durationInFrames: 30, // Optional: limit duration
  delay: 10,          // Optional: delay in frames
  durationRestThreshold: 0.001,
});
```

#### `interpolateColors()`

Interpolates between colors.

```tsx
import {interpolateColors} from 'remotion';

const color = interpolateColors(
  frame,
  [0, 50, 100],
  ['#ff0000', '#00ff00', '#0000ff']
);
```

### Utility Functions

#### `staticFile()`

References files in the `public/` directory.

```tsx
import {staticFile} from 'remotion';

const src = staticFile('logo.png');     // -> /public/logo.png
const audio = staticFile('music.mp3');  // -> /public/music.mp3
```

#### `random()`

Deterministic random number generator (same seed = same result). Important for consistent renders.

```tsx
import {random} from 'remotion';

const value = random('my-seed');         // 0 to 1
const value2 = random(`item-${index}`);  // Deterministic per index
```

#### `delayRender()` / `continueRender()`

Delays rendering until async operations complete (data fetching, font loading, etc.).

```tsx
import {delayRender, continueRender} from 'remotion';

const MyComp: React.FC = () => {
  const [data, setData] = useState(null);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fetchData().then((d) => {
      setData(d);
      continueRender(handle);
    });
  }, [handle]);

  if (!data) return null;
  return <div>{data.title}</div>;
};
```

#### `getInputProps()`

Gets props passed via CLI `--props` flag or Lambda input.

```tsx
import {getInputProps} from 'remotion';

const props = getInputProps();
```

#### `getStaticFiles()`

Lists all files in the `public/` directory.

```tsx
import {getStaticFiles} from 'remotion';

const files = getStaticFiles(); // [{name: 'logo.png', src: '/logo.png', ...}]
```

## Configuration (remotion.config.ts)

```ts
import {Config} from '@remotion/cli/config';

// Set the default codec
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Webpack override
Config.overrideWebpackConfig((currentConfig) => {
  return {
    ...currentConfig,
    // custom webpack config
  };
});
```

## Server-Side Rendering (@remotion/renderer)

### renderMedia()

Render a composition to a video or audio file.

```ts
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';

// 1. Bundle the project
const bundled = await bundle({
  entryPoint: './src/index.ts',
  webpackOverride: (config) => config,
});

// 2. Select the composition
const composition = await selectComposition({
  serveUrl: bundled,
  id: 'MyVideo',
  inputProps: {title: 'Custom Title'},
});

// 3. Render
const result = await renderMedia({
  composition,
  serveUrl: bundled,
  codec: 'h264',
  outputLocation: 'out/video.mp4',
  inputProps: {title: 'Custom Title'},
  onProgress: ({progress}) => {
    console.log(`Rendering: ${(progress * 100).toFixed(1)}%`);
  },
});
```

### renderStill()

Render a single frame as an image.

```ts
import {renderStill, selectComposition} from '@remotion/renderer';

const composition = await selectComposition({
  serveUrl: bundled,
  id: 'MyThumbnail',
});

await renderStill({
  composition,
  serveUrl: bundled,
  output: 'out/thumbnail.png',
  imageFormat: 'png',
});
```

### Available codecs

- `'h264'` - MP4 (H.264) - most compatible
- `'h265'` - MP4 (H.265/HEVC) - smaller files
- `'vp8'` - WebM (VP8)
- `'vp9'` - WebM (VP9) - good quality/size ratio
- `'prores'` - Apple ProRes (for professional editing)
- `'gif'` - Animated GIF
- `'aac'` - Audio only (AAC)
- `'mp3'` - Audio only (MP3)
- `'wav'` - Audio only (WAV)

## Player (@remotion/player)

Embed a Remotion composition in any React web app.

```tsx
import {Player} from '@remotion/player';
import {MyVideo} from './MyVideo';

const App = () => {
  return (
    <Player
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{width: 800}}
      inputProps={{title: 'Hello'}}
      controls                      // Show default controls
      loop                          // Loop playback
      autoPlay                      // Auto-play on mount
      clickToPlay={true}            // Click to play/pause
      doubleClickToFullscreen={true}
      spaceKeyToPlayOrPause={true}
      moveToBeginningWhenEnded={true}
      showVolumeControls={true}
      allowFullscreen={true}
    />
  );
};
```

### Player ref methods

```tsx
import {PlayerRef} from '@remotion/player';

const playerRef = useRef<PlayerRef>(null);

playerRef.current?.play();
playerRef.current?.pause();
playerRef.current?.toggle();
playerRef.current?.seekTo(60);            // Seek to frame 60
playerRef.current?.getCurrentFrame();
playerRef.current?.isPlaying();
playerRef.current?.getVolume();
playerRef.current?.setVolume(0.5);
playerRef.current?.mute();
playerRef.current?.unmute();
playerRef.current?.requestFullscreen();
playerRef.current?.exitFullscreen();
```

### Player events

```tsx
playerRef.current?.addEventListener('play', () => {});
playerRef.current?.addEventListener('pause', () => {});
playerRef.current?.addEventListener('ended', () => {});
playerRef.current?.addEventListener('error', (e) => {});
playerRef.current?.addEventListener('timeupdate', (e) => {
  console.log(e.detail.frame);
});
playerRef.current?.addEventListener('fullscreenchange', (e) => {
  console.log(e.detail.isFullscreen);
});
```

### Thumbnail

```tsx
import {Thumbnail} from '@remotion/player';

<Thumbnail
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  compositionWidth={1920}
  compositionHeight={1080}
  frameToDisplay={45}
  style={{width: 300}}
/>
```

## Transitions (@remotion/transitions)

```tsx
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {flip} from '@remotion/transitions/flip';
import {clockWipe} from '@remotion/transitions/clock-wipe';

const MyVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <Scene1 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 30})}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <Scene2 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({direction: 'from-left'})}
        timing={springTiming({
          config: {damping: 200},
          durationInFrames: 30,
          durationRestThreshold: 0.001,
        })}
      />

      <TransitionSeries.Sequence durationInFrames={60}>
        <Scene3 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

### Available transition presentations

- `fade()` - Fade between scenes
- `slide({direction})` - Slide in from a direction (`'from-left'`, `'from-right'`, `'from-top'`, `'from-bottom'`)
- `wipe({direction})` - Wipe transition
- `flip({direction})` - 3D flip effect
- `clockWipe()` - Clock wipe effect
- `none()` - No visual transition (just timing)

## Media Utilities (@remotion/media-utils)

```tsx
import {getAudioData, getVideoMetadata, useAudioData, getWaveformPortion} from '@remotion/media-utils';

// Get audio duration and waveform data
const audioData = await getAudioData(src);

// React hook version
const audioData = useAudioData(src);

// Get video metadata
const {width, height, durationInSeconds} = await getVideoMetadata(src);

// Get waveform for visualization
const waveform = getWaveformPortion({
  audioData,
  startTimeInSeconds: 0,
  durationInSeconds: 5,
  numberOfSamples: 256,
});
```

## Google Fonts (@remotion/google-fonts)

```tsx
import {loadFont} from '@remotion/google-fonts/Roboto';

const {fontFamily} = loadFont();

// Or load specific variants
const {fontFamily} = loadFont('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

<div style={{fontFamily}}>Hello World</div>
```

## Preloading (@remotion/preload)

```tsx
import {preloadAudio, preloadVideo, preloadImage, preloadFont} from '@remotion/preload';

// Preload assets before they appear in the video
const freeAudio = preloadAudio('https://example.com/audio.mp3');
const freeVideo = preloadVideo(staticFile('clip.mp4'));
const freeImage = preloadImage('https://example.com/image.png');

// Call the returned function to cancel preloading
freeAudio();
```

## Noise (@remotion/noise)

```tsx
import {noise2D, noise3D, noise4D} from '@remotion/noise';

// 2D noise (useful for spatial effects)
const value = noise2D('my-seed', x * 0.01, y * 0.01); // -1 to 1

// 3D noise (add time dimension for animation)
const animatedValue = noise3D('my-seed', x * 0.01, y * 0.01, frame * 0.01);
```

## SVG Paths (@remotion/paths)

```tsx
import {
  getPointAtLength,
  getLength,
  interpolatePath,
  evolvePath,
  getSubpaths,
  parsePath,
  resetPath,
  scalePath,
  translatePath,
} from '@remotion/paths';

// Animate along a path
const length = getLength(path);
const point = getPointAtLength(path, length * progress);

// Morph between paths
const morphed = interpolatePath(progress, path1, path2);

// Draw path progressively
const evolved = evolvePath(progress, path); // 0 to 1
```

## SVG Shapes (@remotion/shapes)

```tsx
import {Circle, Rect, Triangle, Ellipse, Star, Pie} from '@remotion/shapes';
import {makeCircle, makeRect, makeTriangle} from '@remotion/shapes';

// Component usage
<Circle radius={100} fill="blue" />
<Rect width={200} height={100} cornerRadius={10} fill="red" />
<Triangle length={150} direction="up" fill="green" />
<Star points={5} innerRadius={50} outerRadius={100} fill="gold" />
<Pie radius={100} progress={0.75} fill="orange" closePath rotation={-90} />

// Programmatic path generation
const {path, width, height} = makeCircle({radius: 100});
```

## Lottie (@remotion/lottie)

```tsx
import {Lottie, getLottieMetadata} from '@remotion/lottie';
import animationData from './animation.json';

const MyAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      style={{width: 500}}
      playbackRate={1}
    />
  );
};

// Get metadata for setting composition duration
const metadata = getLottieMetadata(animationData);
// metadata.durationInSeconds, metadata.fps
```

## Three.js Integration (@remotion/three)

```tsx
import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame} from 'remotion';

const MyScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ThreeCanvas
      orthographic={false}
      width={1920}
      height={1080}
      camera={{fov: 75, position: [0, 0, 5]}}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh rotation={[0, frame * 0.02, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </ThreeCanvas>
  );
};
```

## AWS Lambda (@remotion/lambda)

### Deploy

```ts
import {deploySite, deployFunction} from '@remotion/lambda';

// Deploy bundled site to S3
const {serveUrl} = await deploySite({
  entryPoint: './src/index.ts',
  bucketName,
  region: 'us-east-1',
});

// Deploy Lambda function
const {functionName} = await deployFunction({
  region: 'us-east-1',
  timeoutInSeconds: 120,
  memorySizeInMb: 2048,
});
```

### Render

```ts
import {renderMediaOnLambda, getRenderProgress} from '@remotion/lambda/client';

const {renderId, bucketName} = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName,
  serveUrl,
  composition: 'MyVideo',
  inputProps: {title: 'Hello'},
  codec: 'h264',
});

// Poll for progress
const progress = await getRenderProgress({
  renderId,
  bucketName,
  region: 'us-east-1',
  functionName,
});
```

## Common Patterns

### Fade in/out

```tsx
const frame = useCurrentFrame();
const {durationInFrames} = useVideoConfig();

const fadeIn = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
const opacity = fadeIn * fadeOut;
```

### Staggered animations

```tsx
const items = ['First', 'Second', 'Third', 'Fourth'];

{items.map((item, i) => {
  const delay = i * 10; // 10 frame stagger
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const translateY = interpolate(progress, [0, 1], [50, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div key={item} style={{opacity, transform: `translateY(${translateY}px)`}}>
      {item}
    </div>
  );
})}
```

### Typewriter effect

```tsx
const frame = useCurrentFrame();
const text = 'Hello World';
const charsShown = Math.floor(interpolate(frame, [0, 60], [0, text.length], {
  extrapolateRight: 'clamp',
}));
const displayedText = text.slice(0, charsShown);
```

### Data-driven video

```tsx
const MyDataVideo: React.FC<{apiUrl: string}> = ({apiUrl}) => {
  const [data, setData] = useState(null);
  const [handle] = useState(() => delayRender('Fetching data'));

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [apiUrl, handle]);

  if (!data) return null;

  return (
    <AbsoluteFill>
      {data.items.map((item, i) => (
        <Sequence key={item.id} from={i * 90} durationInFrames={90}>
          <ItemCard {...item} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
```

### Using Zod schemas for props

```tsx
import {z} from 'zod';

export const mySchema = z.object({
  title: z.string(),
  color: z.string(),
  items: z.array(z.object({
    name: z.string(),
    value: z.number(),
  })),
});

// In Root.tsx
<Composition
  id="MyVideo"
  component={MyVideo}
  schema={mySchema}
  defaultProps={{
    title: 'Default Title',
    color: '#ffffff',
    items: [{name: 'Item 1', value: 42}],
  }}
  // ...
/>
```

## Best Practices

1. **Use `<OffthreadVideo>` over `<Video>`** for rendering - it's more reliable and performant
2. **Use `staticFile()`** for assets in the `public/` folder instead of import or relative paths
3. **Use `random(seed)`** instead of `Math.random()` for deterministic renders
4. **Use `delayRender()`** when loading async data, fonts, or images to prevent blank frames
5. **Use `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'`** on `interpolate()` to prevent values going beyond intended range
6. **Use `spring()`** for natural-feeling animations instead of linear interpolation
7. **Avoid `useEffect` for animations** - derive everything from `useCurrentFrame()` for deterministic results
8. **Keep compositions pure** - same frame number should always produce the same visual output
9. **Use `<Sequence>` and `<Series>`** to organize timeline instead of manual frame math
10. **Use `<Img>` instead of `<img>`** to ensure images are loaded before rendering

## Easing Functions

Available via `import {Easing} from 'remotion'`:

- `Easing.linear`
- `Easing.ease` (default CSS ease)
- `Easing.in(fn)`, `Easing.out(fn)`, `Easing.inOut(fn)`
- `Easing.bezier(x1, y1, x2, y2)`
- `Easing.circle`, `Easing.back(s)`, `Easing.elastic(bounciness)`
- `Easing.bounce`, `Easing.poly(n)`, `Easing.exp`
- `Easing.sin`, `Easing.quad`, `Easing.cubic`

## Supported Templates

When creating a new project with `npx create-video@latest`, available templates include:

- `template-helloworld` - Basic animated intro
- `template-blank` - Empty starting point
- `template-three` - 3D with Three.js
- `template-tiktok` - TikTok-style vertical video
- `template-audiogram` - Audiogram/podcast visualization
- `template-next-app` - Next.js integration
- `template-next-app-tailwind` - Next.js + Tailwind CSS
- `template-still` - For rendering images
- `template-overlay` - Overlay compositions
- `template-music-visualization` - Music visualizer
- `template-code-hike` - Code presentation
- `template-react-router` - React Router integration
- `template-prompt-to-video` - AI-powered video generation
