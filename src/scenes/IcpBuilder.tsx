import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {GlassCard} from '../components/GlassCard';

const PersonaCard: React.FC<{
  title: string;
  role: string;
  traits: string[];
  delay: number;
  x: number;
  color: string;
}> = ({title, role, traits, delay, x, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 300,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <GlassCard width={340} height={330} delay={delay} borderColor={color}>
        <div style={{textAlign: 'center', width: '100%'}}>
          {/* Avatar circle */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${color}66, ${color}22)`,
              border: `2px solid ${color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: 24,
            }}
          >
            &#9679;
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              color: COLORS.white,
              marginBottom: 4,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.body,
              color,
              fontWeight: 600,
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {role}
          </div>
          <div style={{borderTop: `1px solid ${COLORS.darkGray}`, paddingTop: 12}}>
            {traits.map((trait, i) => {
              const traitProgress = spring({
                frame: frame - delay - 15 - i * 5,
                fps,
                config: {damping: 200},
              });
              const traitOpacity = interpolate(traitProgress, [0, 1], [0, 1]);
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 13,
                    fontFamily: FONTS.mono,
                    color: COLORS.lightGray,
                    marginBottom: 6,
                    opacity: traitOpacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'center',
                  }}
                >
                  <span style={{color, fontSize: 8}}>&#9632;</span>
                  {trait}
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export const IcpBuilder: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Connection lines between cards
  const lineProgress = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "Buying Committee" label
  const committeeOpacity = interpolate(frame, [85, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBackground
      orbs={[
        {x: 960, y: 300, color: COLORS.neonPurple, size: 400},
        {x: 200, y: 700, color: COLORS.electricBlue, size: 250},
        {x: 1700, y: 500, color: COLORS.hotPink, size: 280},
      ]}
      particleSeed="icp"
    >
      <AbsoluteFill style={{padding: 80}}>
        {/* Section label */}
        <div>
          <span
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: COLORS.electricBlue,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Step 02
          </span>
        </div>

        <AnimatedText text="ICP & Buying Committee" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="Builds the Ideal Customer Profile and maps the entire buying committee"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400, maxWidth: 800}}
        />

        {/* Persona Cards */}
        <PersonaCard
          title="Decision Maker"
          role="C-Suite / VP"
          traits={['Budget authority', 'Strategic vision', 'ROI focused', 'Risk-averse']}
          delay={25}
          x={80}
          color={COLORS.gold}
        />
        <PersonaCard
          title="Champion"
          role="Director / Sr. Manager"
          traits={['Internal advocate', 'Technical understanding', 'Pain-point aware', 'Change driver']}
          delay={40}
          x={490}
          color={COLORS.electricBlue}
        />
        <PersonaCard
          title="End User"
          role="Team Lead / IC"
          traits={['Daily workflow impact', 'Feature requirements', 'Adoption influence', 'Peer referrals']}
          delay={55}
          x={900}
          color={COLORS.green}
        />
        <PersonaCard
          title="Blocker"
          role="Legal / Procurement"
          traits={['Compliance checks', 'Vendor evaluation', 'Contract terms', 'Security review']}
          delay={70}
          x={1310}
          color={COLORS.hotPink}
        />

        {/* Connection lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            pointerEvents: 'none',
          }}
        >
          {/* Lines between cards */}
          <line
            x1={420}
            y1={465}
            x2={490}
            y2={465}
            stroke={COLORS.electricBlue}
            strokeWidth={1.5}
            strokeDasharray={`${lineProgress * 70} 70`}
            opacity={0.4}
          />
          <line
            x1={830}
            y1={465}
            x2={900}
            y2={465}
            stroke={COLORS.electricBlue}
            strokeWidth={1.5}
            strokeDasharray={`${lineProgress * 70} 70`}
            opacity={0.4}
          />
          <line
            x1={1240}
            y1={465}
            x2={1310}
            y2={465}
            stroke={COLORS.electricBlue}
            strokeWidth={1.5}
            strokeDasharray={`${lineProgress * 70} 70`}
            opacity={0.4}
          />
        </svg>

        {/* Buying Committee label */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: committeeOpacity,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: 30,
              background: `linear-gradient(135deg, ${COLORS.neonPurple}33, ${COLORS.electricBlue}33)`,
              border: `1px solid ${COLORS.neonPurple}44`,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontFamily: FONTS.heading,
                color: COLORS.white,
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              COMPLETE BUYING COMMITTEE MAPPED PER COMPANY
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
