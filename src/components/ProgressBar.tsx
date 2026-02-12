import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../theme';

export const ProgressBar: React.FC<{
  progress: number;
  width?: number;
  height?: number;
  delay?: number;
  color?: string;
  label?: string;
}> = ({progress, width = 300, height = 8, delay = 0, color = COLORS.electricBlue, label}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const fillWidth = interpolate(adjustedFrame, [0, 40], [0, progress * 100], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', gap: 6}}>
      {label && (
        <div
          style={{
            fontSize: 14,
            fontFamily: 'system-ui',
            color: COLORS.lightGray,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{label}</span>
          <span style={{color}}>{Math.round(fillWidth)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          borderRadius: height / 2,
          backgroundColor: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${fillWidth}%`,
            height: '100%',
            borderRadius: height / 2,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
    </div>
  );
};
