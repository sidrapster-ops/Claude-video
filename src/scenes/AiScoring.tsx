import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {GlassCard} from '../components/GlassCard';

const ScoreGauge: React.FC<{score: number; delay: number}> = ({score, delay}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const progress = interpolate(adjustedFrame, [0, 50], [0, score], {extrapolateRight: 'clamp'});
  const displayScore = Math.round(progress);

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const getColor = (s: number) => {
    if (s >= 80) return COLORS.green;
    if (s >= 60) return COLORS.gold;
    if (s >= 40) return COLORS.orange;
    return COLORS.red;
  };

  return (
    <div style={{position: 'relative', width: 280, height: 280}}>
      <svg width={280} height={280} viewBox="0 0 280 280">
        {/* Background circle */}
        <circle cx={140} cy={140} r={120} fill="none" stroke={`${COLORS.white}0A`} strokeWidth={10} />
        {/* Progress arc */}
        <circle
          cx={140}
          cy={140}
          r={120}
          fill="none"
          stroke={getColor(displayScore)}
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 140 140)"
          style={{filter: `drop-shadow(0 0 8px ${getColor(displayScore)}66)`}}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 280,
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontFamily: FONTS.heading,
            fontWeight: 800,
            color: getColor(displayScore),
          }}
        >
          {displayScore}
        </div>
        <div
          style={{
            fontSize: 14,
            fontFamily: FONTS.mono,
            color: COLORS.lightGray,
            letterSpacing: 2,
          }}
        >
          AI SCORE
        </div>
      </div>
    </div>
  );
};

const SignalItem: React.FC<{
  label: string;
  value: string;
  impact: 'positive' | 'negative' | 'neutral';
  delay: number;
}> = ({label, value, impact, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [20, 0]);

  const impactColors = {
    positive: COLORS.green,
    negative: COLORS.red,
    neutral: COLORS.gold,
  };

  const impactIcons = {
    positive: '\u2191',
    negative: '\u2193',
    neutral: '\u2192',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: `1px solid ${COLORS.darkGray}44`,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <span style={{fontSize: 14, fontFamily: FONTS.body, color: COLORS.lightGray}}>{label}</span>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 14, fontFamily: FONTS.mono, color: COLORS.white, fontWeight: 600}}>
          {value}
        </span>
        <span style={{color: impactColors[impact], fontSize: 16, fontWeight: 700}}>
          {impactIcons[impact]}
        </span>
      </div>
    </div>
  );
};

export const AiScoring: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneBackground
      orbs={[
        {x: 400, y: 500, color: COLORS.green, size: 350},
        {x: 1500, y: 400, color: COLORS.neonPurple, size: 300},
      ]}
      particleSeed="scoring"
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
            Step 06
          </span>
        </div>

        <AnimatedText text="AI-Powered Lead Scoring" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="Continuous scoring based on messaging replies, engagement, and external signals"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400}}
        />

        {/* Score gauge */}
        <div style={{position: 'absolute', left: 160, top: 320}}>
          <ScoreGauge score={87} delay={25} />
        </div>

        {/* Score label */}
        <div
          style={{
            position: 'absolute',
            left: 160,
            top: 620,
            width: 280,
            textAlign: 'center',
            opacity: interpolate(frame, [60, 75], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '6px 20px',
              borderRadius: 20,
              background: `${COLORS.green}22`,
              border: `1px solid ${COLORS.green}44`,
            }}
          >
            <span style={{fontSize: 14, fontFamily: FONTS.mono, color: COLORS.green, fontWeight: 600}}>
              SALES READY
            </span>
          </div>
        </div>

        {/* Scoring signals */}
        <div style={{position: 'absolute', right: 100, top: 300, width: 550}}>
          <GlassCard width={550} height={450} delay={20} borderColor={COLORS.electricBlue}>
            <div style={{width: '100%', padding: '0 8px'}}>
              <div
                style={{
                  fontSize: 16,
                  fontFamily: FONTS.heading,
                  color: COLORS.electricBlue,
                  fontWeight: 700,
                  marginBottom: 16,
                  letterSpacing: 1,
                }}
              >
                SCORING SIGNALS
              </div>
              <SignalItem label="Email open rate" value="78%" impact="positive" delay={40} />
              <SignalItem label="Content downloads" value="5 assets" impact="positive" delay={48} />
              <SignalItem label="Reply sentiment" value="Positive" impact="positive" delay={56} />
              <SignalItem label="Website visits" value="12 sessions" impact="positive" delay={64} />
              <SignalItem label="Pricing page views" value="3 visits" impact="positive" delay={72} />
              <SignalItem label="Competitor mentions" value="Low" impact="neutral" delay={80} />
              <SignalItem label="Budget timeline" value="Q2 2026" impact="positive" delay={88} />
              <SignalItem label="Decision committee" value="4/4 engaged" impact="positive" delay={96} />
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
