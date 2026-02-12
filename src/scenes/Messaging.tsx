import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {GlassCard} from '../components/GlassCard';

const MessageBubble: React.FC<{
  text: string;
  type: 'email' | 'linkedin' | 'content';
  delay: number;
  x: number;
  y: number;
}> = ({text, type, delay, x, y}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  const colors = {
    email: COLORS.electricBlue,
    linkedin: COLORS.linkedin,
    content: COLORS.neonPurple,
  };

  const labels = {
    email: 'EMAIL',
    linkedin: 'LINKEDIN',
    content: 'CONTENT',
  };

  const borderColor = colors[type];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 340,
          padding: 20,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${borderColor}33`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontFamily: FONTS.mono,
            color: borderColor,
            letterSpacing: 2,
            marginBottom: 8,
            fontWeight: 700,
          }}
        >
          {labels[type]}
        </div>
        <div
          style={{
            fontSize: 14,
            fontFamily: FONTS.body,
            color: COLORS.lightGray,
            lineHeight: 1.5,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

const JourneyStage: React.FC<{
  label: string;
  active: boolean;
  x: number;
  delay: number;
  color: string;
}> = ({label, active, x, delay, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        bottom: 160,
        textAlign: 'center',
        opacity,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: active ? color : 'transparent',
          border: `2px solid ${color}`,
          margin: '0 auto 8px',
          boxShadow: active ? `0 0 12px ${color}` : 'none',
        }}
      />
      <div
        style={{
          fontSize: 12,
          fontFamily: FONTS.mono,
          color: active ? color : COLORS.lightGray,
          fontWeight: active ? 700 : 400,
          letterSpacing: 1,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Messaging: React.FC = () => {
  const frame = useCurrentFrame();

  // Journey line
  const lineProgress = interpolate(frame, [60, 100], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBackground
      orbs={[
        {x: 960, y: 540, color: COLORS.neonPurple, size: 400},
        {x: 200, y: 300, color: COLORS.electricBlue, size: 250},
      ]}
      particleSeed="messaging"
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
            Step 05
          </span>
        </div>

        <AnimatedText text="Personalized Engagement" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="AI-crafted content and messaging tailored to each persona's psychology"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400}}
        />

        {/* Message examples */}
        <MessageBubble
          type="email"
          text="Hi Sarah, I noticed your team's focus on reducing deployment cycles. Our platform cut release times by 73% for teams with similar CI/CD challenges..."
          delay={25}
          x={80}
          y={280}
        />
        <MessageBubble
          type="linkedin"
          text="Great insights on your recent post about DevOps scalability. We've helped 200+ engineering leaders solve exactly that challenge with measurable results..."
          delay={40}
          x={480}
          y={340}
        />
        <MessageBubble
          type="content"
          text="[Whitepaper] 'The Data-Driven CTO's Guide to Reducing Infrastructure Costs by 40%' - Personalized for high-conscientiousness, ROI-focused decision makers"
          delay={55}
          x={880}
          y={280}
        />

        {/* Psychographic match indicator */}
        <div
          style={{
            position: 'absolute',
            right: 100,
            top: 450,
            opacity: interpolate(frame, [65, 80], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <GlassCard width={300} height={120} delay={65} borderColor={COLORS.green}>
            <div style={{textAlign: 'center'}}>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: FONTS.mono,
                  color: COLORS.green,
                  letterSpacing: 2,
                  marginBottom: 8,
                }}
              >
                PSYCH-MATCH SCORE
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontFamily: FONTS.heading,
                  fontWeight: 800,
                  color: COLORS.green,
                }}
              >
                94%
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Buying Journey Timeline */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 200,
            right: 200,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.heading,
              color: COLORS.white,
              fontWeight: 600,
              marginBottom: 20,
              textAlign: 'center',
              letterSpacing: 2,
            }}
          >
            BUYING JOURNEY POSITION
          </div>

          {/* Timeline bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 50,
              left: 60,
              right: 60,
              height: 2,
              background: `${COLORS.darkGray}`,
            }}
          >
            <div
              style={{
                width: `${lineProgress}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${COLORS.electricBlue}, ${COLORS.neonPurple})`,
              }}
            />
          </div>

          <JourneyStage label="Awareness" active={true} x={60} delay={70} color={COLORS.electricBlue} />
          <JourneyStage label="Interest" active={true} x={340} delay={78} color={COLORS.electricBlue} />
          <JourneyStage label="Consideration" active={true} x={610} delay={86} color={COLORS.neonPurple} />
          <JourneyStage label="Intent" active={false} x={910} delay={94} color={COLORS.darkGray} />
          <JourneyStage label="Purchase" active={false} x={1180} delay={102} color={COLORS.darkGray} />
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
