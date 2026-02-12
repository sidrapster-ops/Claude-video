import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../theme';
import {GlowingOrb} from './GlowingOrb';
import {ParticleField} from './ParticleField';

export const SceneBackground: React.FC<{
  children: React.ReactNode;
  orbs?: Array<{x: number; y: number; color?: string; size?: number}>;
  particleSeed?: string;
}> = ({children, orbs, particleSeed = 'bg'}) => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepNavy} 0%, ${COLORS.gradientMid} 50%, ${COLORS.gradientEnd} 100%)`,
        overflow: 'hidden',
      }}
    >
      <ParticleField seed={particleSeed} count={30} />
      {orbs?.map((orb, i) => (
        <GlowingOrb key={i} x={orb.x} y={orb.y} color={orb.color} size={orb.size} />
      ))}
      {children}
    </AbsoluteFill>
  );
};
