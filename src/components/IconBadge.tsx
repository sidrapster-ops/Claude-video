import React from 'react';
import {useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

export const IconBadge: React.FC<{
  icon: string;
  label: string;
  color?: string;
  delay?: number;
  size?: number;
}> = ({icon, label, color = COLORS.electricBlue, delay = 0, size = 70}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, stiffness: 120},
  });

  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          background: `${color}22`,
          border: `2px solid ${color}66`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.45,
          boxShadow: `0 0 20px ${color}33`,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 14,
          fontFamily: 'system-ui',
          color: COLORS.lightGray,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
};
