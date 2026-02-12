import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {COLORS} from '../theme';

export const DataFlowLine: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  color?: string;
  dotCount?: number;
}> = ({startX, startY, endX, endY, delay = 0, color = COLORS.electricBlue, dotCount = 3}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const lineProgress = interpolate(adjustedFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <>
      {/* Static line */}
      <div
        style={{
          position: 'absolute',
          left: startX,
          top: startY,
          width: length * lineProgress,
          height: 2,
          background: `linear-gradient(90deg, ${color}66, ${color}22)`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%',
        }}
      />
      {/* Flowing dots */}
      {lineProgress >= 1 &&
        Array.from({length: dotCount}, (_, i) => {
          const dotProgress = ((adjustedFrame * 0.03 + i / dotCount) % 1);
          const dotX = startX + dx * dotProgress;
          const dotY = startY + dy * dotProgress;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: dotX - 3,
                top: dotY - 3,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
                opacity: 0.8,
              }}
            />
          );
        })}
    </>
  );
};
