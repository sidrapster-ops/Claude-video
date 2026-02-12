import React from 'react';
import {useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

export const GlassCard: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
  delay?: number;
  style?: React.CSSProperties;
  borderColor?: string;
}> = ({children, width = 400, height = 250, delay = 0, style, borderColor = COLORS.electricBlue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, stiffness: 80},
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 20,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}33`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
