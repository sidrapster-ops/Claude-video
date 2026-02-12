import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {GlassCard} from '../components/GlassCard';

const ScanLine: React.FC<{delay: number; y: number}> = ({delay, y}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const width = interpolate(adjustedFrame, [0, 15], [0, 100], {extrapolateRight: 'clamp'});
  const opacity = interpolate(adjustedFrame, [0, 5, 15, 25], [0, 0.8, 0.8, 0.3], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: y,
        width: `${width}%`,
        height: 2,
        background: `linear-gradient(90deg, ${COLORS.electricBlue}00, ${COLORS.electricBlue}, ${COLORS.electricBlue}00)`,
        opacity,
      }}
    />
  );
};

const DetectedItem: React.FC<{label: string; icon: string; delay: number; y: number}> = ({
  label,
  icon,
  delay,
  y,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        top: y,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: COLORS.green,
          boxShadow: `0 0 8px ${COLORS.green}`,
        }}
      />
      <span style={{fontSize: 16, color: COLORS.white, fontFamily: FONTS.mono}}>
        {icon} {label}
      </span>
    </div>
  );
};

export const WebsiteAnalysis: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Scene title
  const titleProgress = spring({frame, fps, config: {damping: 200}});
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Browser mockup
  const browserProgress = spring({frame: frame - 10, fps, config: {damping: 200}});
  const browserScale = interpolate(browserProgress, [0, 1], [0.9, 1]);
  const browserOpacity = interpolate(browserProgress, [0, 1], [0, 1]);

  // Scanning animation
  const scanY = interpolate(frame, [30, 120], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scanOpacity = frame > 30 && frame < 120 ? 0.6 : 0;

  // Right panel results
  const resultsOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBackground
      orbs={[
        {x: 300, y: 400, color: COLORS.electricBlue, size: 350},
        {x: 1600, y: 600, color: COLORS.neonPurple, size: 300},
      ]}
      particleSeed="website"
    >
      <AbsoluteFill style={{padding: 80}}>
        {/* Section label */}
        <div style={{opacity: titleOpacity, marginBottom: 8}}>
          <span
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: COLORS.electricBlue,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Step 01
          </span>
        </div>

        <AnimatedText text="Website Intelligence" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="Aisha scans your client's website to identify every product and service"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400, maxWidth: 700}}
        />

        {/* Browser mockup */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 260,
            width: 750,
            height: 420,
            borderRadius: 16,
            background: 'rgba(20, 24, 60, 0.8)',
            border: `1px solid ${COLORS.darkGray}`,
            overflow: 'hidden',
            opacity: browserOpacity,
            transform: `scale(${browserScale})`,
          }}
        >
          {/* Browser bar */}
          <div
            style={{
              height: 40,
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: 8,
            }}
          >
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#FF5F57'}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E'}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#28C840'}} />
            <div
              style={{
                marginLeft: 16,
                flex: 1,
                height: 24,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                fontSize: 12,
                color: COLORS.lightGray,
                fontFamily: FONTS.mono,
              }}
            >
              https://client-company.com
            </div>
          </div>

          {/* Page content mockup */}
          <div style={{padding: 24, position: 'relative'}}>
            {/* Fake content lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  height: i === 0 ? 20 : 10,
                  width: `${60 + Math.sin(i * 2) * 30}%`,
                  background: `rgba(255,255,255,${i === 0 ? 0.15 : 0.06})`,
                  borderRadius: 4,
                  marginBottom: i === 0 ? 20 : 12,
                }}
              />
            ))}

            {/* Scan line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: scanY,
                width: '100%',
                height: 3,
                background: `linear-gradient(90deg, transparent, ${COLORS.electricBlue}, transparent)`,
                opacity: scanOpacity,
                boxShadow: `0 0 20px ${COLORS.electricBlue}`,
              }}
            />

            {/* Scan lines overlay */}
            <ScanLine delay={35} y={30} />
            <ScanLine delay={50} y={90} />
            <ScanLine delay={65} y={150} />
            <ScanLine delay={80} y={210} />
          </div>
        </div>

        {/* Results panel */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: 260,
            width: 480,
            opacity: resultsOpacity,
          }}
        >
          <GlassCard width={480} height={420} delay={45} borderColor={COLORS.green}>
            <div style={{width: '100%', padding: '0 16px'}}>
              <div
                style={{
                  fontSize: 18,
                  fontFamily: FONTS.heading,
                  color: COLORS.green,
                  fontWeight: 700,
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{fontSize: 20}}>&#x2713;</span> Products & Services Identified
              </div>

              <div style={{position: 'relative'}}>
                <DetectedItem icon="&#9670;" label="Enterprise SaaS Platform" delay={60} y={0} />
                <DetectedItem icon="&#9670;" label="Cloud Infrastructure" delay={70} y={36} />
                <DetectedItem icon="&#9670;" label="API Integration Suite" delay={80} y={72} />
                <DetectedItem icon="&#9670;" label="Data Analytics Module" delay={90} y={108} />
                <DetectedItem icon="&#9670;" label="Security & Compliance" delay={100} y={144} />
                <DetectedItem icon="&#9670;" label="Professional Services" delay={110} y={180} />
                <DetectedItem icon="&#9670;" label="Training & Certification" delay={120} y={216} />
              </div>
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
