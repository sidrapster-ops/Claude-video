import React from 'react';
import {useCurrentFrame, random, interpolate} from 'remotion';
import {COLORS} from '../theme';

export const ParticleField: React.FC<{
  count?: number;
  seed?: string;
}> = ({count = 40, seed = 'particles'}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({length: count}, (_, i) => {
    const x = random(`${seed}-x-${i}`) * 1920;
    const y = random(`${seed}-y-${i}`) * 1080;
    const size = random(`${seed}-s-${i}`) * 3 + 1;
    const speed = random(`${seed}-sp-${i}`) * 0.3 + 0.1;
    const opacity = interpolate(
      Math.sin(frame * speed + random(`${seed}-ph-${i}`) * Math.PI * 2),
      [-1, 1],
      [0.1, 0.5],
    );

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x + Math.sin(frame * speed * 0.5) * 20,
          top: y + Math.cos(frame * speed * 0.3) * 15,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: COLORS.electricBlue,
          opacity,
        }}
      />
    );
  });

  return <>{particles}</>;
};
