export const COLORS = {
  // Primary brand
  deepNavy: '#0A0E27',
  electricBlue: '#00D4FF',
  neonPurple: '#7B2FFF',
  hotPink: '#FF2D78',

  // Gradients
  gradientStart: '#0A0E27',
  gradientMid: '#141852',
  gradientEnd: '#1A1A5E',

  // Accents
  gold: '#FFB800',
  green: '#00E68A',
  orange: '#FF6B35',
  red: '#FF3B5C',

  // Neutrals
  white: '#FFFFFF',
  lightGray: '#B8C4D0',
  darkGray: '#2A2E45',

  // Platform colors
  linkedin: '#0A66C2',
  reddit: '#FF4500',
  quora: '#B92B27',
  web: '#00D4FF',
};

export const FONTS = {
  heading: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  body: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: '"SF Mono", "Fira Code", monospace',
};

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
};

// Scene durations in frames (at 30fps)
export const SCENE_DURATIONS = {
  intro: 120,          // 4s
  websiteAnalysis: 150, // 5s
  icpBuilder: 150,     // 5s
  dataScraping: 150,   // 5s
  psychModel: 150,     // 5s
  messaging: 135,      // 4.5s
  aiScoring: 150,      // 5s
  salesHandoff: 135,   // 4.5s
  nurtureLoop: 120,    // 4s
  outro: 90,           // 3s
};

export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
