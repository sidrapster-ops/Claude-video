import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {GlassCard} from '../components/GlassCard';
import {DataFlowLine} from '../components/DataFlowLine';

const PlanItem: React.FC<{
  step: number;
  title: string;
  desc: string;
  delay: number;
}> = ({step, title, desc, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        marginBottom: 18,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          minWidth: 32,
          height: 32,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.neonPurple}, ${COLORS.electricBlue})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontFamily: FONTS.mono,
          color: COLORS.white,
          fontWeight: 700,
        }}
      >
        {step}
      </div>
      <div>
        <div
          style={{
            fontSize: 16,
            fontFamily: FONTS.heading,
            color: COLORS.white,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            fontFamily: FONTS.body,
            color: COLORS.lightGray,
            lineHeight: 1.4,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

export const SalesHandoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Handoff animation
  const handoffProgress = spring({frame: frame - 30, fps, config: {damping: 15, stiffness: 60}});
  const arrowX = interpolate(handoffProgress, [0, 1], [0, 1]);

  return (
    <SceneBackground
      orbs={[
        {x: 400, y: 400, color: COLORS.neonPurple, size: 300},
        {x: 1500, y: 500, color: COLORS.green, size: 350},
      ]}
      particleSeed="handoff"
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
            Step 07
          </span>
        </div>

        <AnimatedText text="Sales-Ready Handoff" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="Leads are passed to sales only when the buying journey signals readiness"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400}}
        />

        {/* Marketing box */}
        <div style={{position: 'absolute', left: 80, top: 300}}>
          <GlassCard width={320} height={180} delay={20} borderColor={COLORS.neonPurple}>
            <div style={{textAlign: 'center'}}>
              <div
                style={{
                  fontSize: 40,
                  marginBottom: 8,
                }}
              >
                &#9881;
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontFamily: FONTS.heading,
                  color: COLORS.neonPurple,
                  fontWeight: 700,
                }}
              >
                MARKETING
              </div>
              <div style={{fontSize: 13, fontFamily: FONTS.body, color: COLORS.lightGray, marginTop: 4}}>
                AI-Powered Nurturing
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Arrow / flow */}
        <DataFlowLine
          startX={420}
          startY={390}
          endX={730}
          endY={390}
          delay={35}
          color={COLORS.electricBlue}
          dotCount={5}
        />

        {/* Transfer indicator */}
        <div
          style={{
            position: 'absolute',
            left: 520,
            top: 320,
            opacity: interpolate(frame, [45, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            textAlign: 'center',
          }}
        >
          <div
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              background: `${COLORS.green}22`,
              border: `1px solid ${COLORS.green}44`,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: FONTS.mono,
                color: COLORS.green,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              SCORE: 87 &#x2713;
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              fontFamily: FONTS.mono,
              color: COLORS.lightGray,
              marginTop: 6,
            }}
          >
            JOURNEY: INTENT STAGE
          </div>
        </div>

        {/* Sales box */}
        <div style={{position: 'absolute', left: 750, top: 300}}>
          <GlassCard width={320} height={180} delay={40} borderColor={COLORS.green}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: 40, marginBottom: 8}}>&#9733;</div>
              <div
                style={{
                  fontSize: 22,
                  fontFamily: FONTS.heading,
                  color: COLORS.green,
                  fontWeight: 700,
                }}
              >
                SALES
              </div>
              <div style={{fontSize: 13, fontFamily: FONTS.body, color: COLORS.lightGray, marginTop: 4}}>
                Ready-to-Close Leads
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Engagement Plan */}
        <div style={{position: 'absolute', right: 80, top: 260}}>
          <GlassCard width={440} height={450} delay={50} borderColor={COLORS.gold}>
            <div style={{width: '100%', padding: '0 8px'}}>
              <div
                style={{
                  fontSize: 16,
                  fontFamily: FONTS.heading,
                  color: COLORS.gold,
                  fontWeight: 700,
                  marginBottom: 20,
                  letterSpacing: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                &#9888; SALES ENGAGEMENT PLAN
              </div>

              <PlanItem
                step={1}
                title="Opening: Reference pain point"
                desc="DevOps bottleneck flagged in Reddit discussion on r/devops"
                delay={60}
              />
              <PlanItem
                step={2}
                title="Value prop: ROI-centric pitch"
                desc="High conscientiousness profile - lead with data, not stories"
                delay={68}
              />
              <PlanItem
                step={3}
                title="Social proof: Peer validation"
                desc="Share case study from similar-sized SaaS company (67% match)"
                delay={76}
              />
              <PlanItem
                step={4}
                title="Champion enablement"
                desc="Provide internal deck for Sarah (champion) to present to CFO"
                delay={84}
              />
              <PlanItem
                step={5}
                title="Close strategy: Structured timeline"
                desc="Budget available Q2 - propose 30-day pilot with clear KPIs"
                delay={92}
              />
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
