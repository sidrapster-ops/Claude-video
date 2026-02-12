import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {ParticleField} from '../components/ParticleField';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Logo ring animation
  const ringScale = spring({frame: frame - 5, fps, config: {damping: 15, stiffness: 80}});
  const ringRotation = frame * 0.5;
  const ringOpacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});

  // "KLIQWISE" text
  const kliqwiseProgress = spring({frame: frame - 15, fps, config: {damping: 200}});
  const kliqwiseOpacity = interpolate(kliqwiseProgress, [0, 1], [0, 1]);
  const kliqwiseY = interpolate(kliqwiseProgress, [0, 1], [30, 0]);

  // "presents" text
  const presentsOpacity = interpolate(frame, [35, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // "AISHA" big reveal
  const aishaProgress = spring({frame: frame - 55, fps, config: {damping: 12, stiffness: 60}});
  const aishaScale = interpolate(aishaProgress, [0, 1], [0.3, 1]);
  const aishaOpacity = interpolate(aishaProgress, [0, 1], [0, 1]);

  // Tagline
  const taglineOpacity = interpolate(frame, [80, 95], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const taglineY = interpolate(frame, [80, 95], [20, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Pulse glow behind AISHA
  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.4, 0.8]);

  return (
    <SceneBackground
      orbs={[
        {x: 960, y: 540, color: COLORS.neonPurple, size: 500},
        {x: 400, y: 300, color: COLORS.electricBlue, size: 250},
        {x: 1500, y: 700, color: COLORS.hotPink, size: 300},
      ]}
      particleSeed="intro"
    >
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* Rotating ring */}
        <div
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `2px solid ${COLORS.electricBlue}44`,
            transform: `scale(${ringScale}) rotate(${ringRotation}deg)`,
            opacity: ringOpacity * 0.5,
            top: 200,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: `1px solid ${COLORS.neonPurple}33`,
            transform: `scale(${ringScale}) rotate(${-ringRotation * 0.7}deg)`,
            opacity: ringOpacity * 0.3,
            top: 170,
          }}
        />

        {/* KLIQWISE */}
        <div
          style={{
            position: 'absolute',
            top: 280,
            opacity: kliqwiseOpacity,
            transform: `translateY(${kliqwiseY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontFamily: FONTS.heading,
              fontWeight: 300,
              color: COLORS.lightGray,
              letterSpacing: 12,
              textTransform: 'uppercase',
            }}
          >
            Kliqwise
          </div>
        </div>

        {/* presents */}
        <div
          style={{
            position: 'absolute',
            top: 330,
            opacity: presentsOpacity,
            fontSize: 18,
            fontFamily: FONTS.body,
            color: COLORS.lightGray,
            letterSpacing: 6,
            textTransform: 'uppercase',
            fontWeight: 300,
          }}
        >
          presents
        </div>

        {/* AISHA glow */}
        <div
          style={{
            position: 'absolute',
            top: 350,
            width: 600,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${COLORS.neonPurple}${Math.round(glowPulse * 99).toString().padStart(2, '0')} 0%, transparent 70%)`,
            opacity: aishaOpacity,
            filter: 'blur(40px)',
          }}
        />

        {/* AISHA */}
        <div
          style={{
            position: 'absolute',
            top: 380,
            opacity: aishaOpacity,
            transform: `scale(${aishaScale})`,
          }}
        >
          <div
            style={{
              fontSize: 140,
              fontFamily: FONTS.heading,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.neonPurple}, ${COLORS.hotPink})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: 8,
              lineHeight: 1,
            }}
          >
            AISHA
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            position: 'absolute',
            top: 550,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontFamily: FONTS.body,
              color: COLORS.lightGray,
              fontWeight: 400,
              letterSpacing: 2,
            }}
          >
            AI-Powered Sales & Marketing Intelligence
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
