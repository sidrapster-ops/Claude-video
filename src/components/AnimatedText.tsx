import React from 'react';
import {useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';

export const AnimatedText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
  gradient?: boolean;
}> = ({text, fontSize = 48, color = COLORS.white, delay = 0, style, gradient}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 200, stiffness: 100},
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  const textStyle: React.CSSProperties = {
    fontSize,
    fontFamily: FONTS.heading,
    fontWeight: 700,
    color: gradient ? 'transparent' : color,
    opacity,
    transform: `translateY(${translateY}px)`,
    ...(gradient
      ? {
          background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.neonPurple}, ${COLORS.hotPink})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }
      : {}),
    ...style,
  };

  return <div style={textStyle}>{text}</div>;
};

export const TypewriterText: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  speed?: number;
  style?: React.CSSProperties;
}> = ({text, fontSize = 24, color = COLORS.lightGray, delay = 0, speed = 1.5, style}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.floor(adjustedFrame * speed);
  const displayText = text.slice(0, Math.min(charsToShow, text.length));

  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  return (
    <div
      style={{
        fontSize,
        fontFamily: FONTS.mono,
        color,
        letterSpacing: 0.5,
        ...style,
      }}
    >
      {displayText}
      {charsToShow < text.length && (
        <span style={{opacity: cursorOpacity, color: COLORS.electricBlue}}>|</span>
      )}
    </div>
  );
};
