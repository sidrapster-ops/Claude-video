import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // AISHA text
  const aishaProgress = spring({frame: frame - 5, fps, config: {damping: 15, stiffness: 60}});
  const aishaScale = interpolate(aishaProgress, [0, 1], [0.5, 1]);
  const aishaOpacity = interpolate(aishaProgress, [0, 1], [0, 1]);

  // Tagline
  const taglineOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [25, 40], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA
  const ctaOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaScale = spring({frame: frame - 45, fps, config: {damping: 200}});

  // Kliqwise
  const brandOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow pulse
  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.3, 0.7]);

  return (
    <SceneBackground
      orbs={[
        {x: 960, y: 480, color: COLORS.neonPurple, size: 500},
        {x: 600, y: 600, color: COLORS.electricBlue, size: 300},
        {x: 1300, y: 400, color: COLORS.hotPink, size: 250},
      ]}
      particleSeed="outro"
    >
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* Glow behind text */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${COLORS.neonPurple}${Math.round(glowPulse * 60)
              .toString(16)
              .padStart(2, '0')} 0%, transparent 70%)`,
            opacity: aishaOpacity,
            filter: 'blur(50px)',
            top: 340,
          }}
        />

        {/* AISHA */}
        <div
          style={{
            opacity: aishaOpacity,
            transform: `scale(${aishaScale})`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 120,
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
            top: 510,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: FONTS.body,
              color: COLORS.lightGray,
              letterSpacing: 2,
              fontWeight: 400,
            }}
          >
            Turn Prospects into Pipeline. Intelligently.
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            position: 'absolute',
            top: 600,
            opacity: ctaOpacity,
            transform: `scale(${interpolate(ctaScale, [0, 1], [0.9, 1])})`,
          }}
        >
          <div
            style={{
              padding: '16px 48px',
              borderRadius: 40,
              background: `linear-gradient(135deg, ${COLORS.neonPurple}, ${COLORS.electricBlue})`,
              boxShadow: `0 4px 24px ${COLORS.neonPurple}44`,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontFamily: FONTS.heading,
                color: COLORS.white,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              BOOK A DEMO
            </span>
          </div>
        </div>

        {/* Kliqwise brand */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            opacity: brandOpacity,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontFamily: FONTS.heading,
              color: COLORS.lightGray,
              letterSpacing: 8,
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            Kliqwise
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: FONTS.mono,
              color: `${COLORS.lightGray}88`,
              marginTop: 8,
              letterSpacing: 3,
            }}
          >
            www.kliqwise.com
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
