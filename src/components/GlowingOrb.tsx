import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../theme';

export const GlowingOrb: React.FC<{
  size?: number;
  color?: string;
  x?: number;
  y?: number;
  pulseSpeed?: number;
}> = ({size = 300, color = COLORS.neonPurple, x = 0, y = 0, pulseSpeed = 0.05}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * pulseSpeed), [-1, 1], [0.8, 1.2]);
  const opacity = interpolate(Math.sin(frame * pulseSpeed * 0.7), [-1, 1], [0.3, 0.6]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size * pulse,
        height: size * pulse,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}88 0%, ${color}22 40%, transparent 70%)`,
        opacity,
        filter: `blur(${size * 0.15}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};
