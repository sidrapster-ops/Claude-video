import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';

const LoopNode: React.FC<{
  label: string;
  icon: string;
  angle: number;
  radius: number;
  delay: number;
  color: string;
  cx: number;
  cy: number;
}> = ({label, icon, angle, radius, delay, color, cx, cy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Slowly rotate position
  const rotatedAngle = angle + frame * 0.003;
  const x = cx + Math.cos(rotatedAngle) * radius;
  const y = cy + Math.sin(rotatedAngle) * radius;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 60,
        top: y - 40,
        width: 120,
        textAlign: 'center',
        opacity,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: `${color}22`,
          border: `2px solid ${color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 8px',
          fontSize: 22,
          boxShadow: `0 0 16px ${color}33`,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 11,
          fontFamily: FONTS.mono,
          color,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const NurtureLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Central pulse
  const pulseScale = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.95, 1.05]);

  // Orbit ring progress
  const ringProgress = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Score rising animation
  const scoreStart = 52;
  const scoreEnd = 87;
  const scoreProgress = interpolate(frame, [50, 100], [scoreStart, scoreEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cx = 580;
  const cy = 520;
  const radius = 230;

  const nodes = [
    {label: 'Analyze', icon: '\u2699', angle: -Math.PI / 2, color: COLORS.electricBlue, delay: 25},
    {label: 'Personalize', icon: '\u270E', angle: -Math.PI / 6, color: COLORS.neonPurple, delay: 32},
    {label: 'Engage', icon: '\u2709', angle: Math.PI / 6, color: COLORS.hotPink, delay: 39},
    {label: 'Measure', icon: '\u2261', angle: Math.PI / 2, color: COLORS.gold, delay: 46},
    {label: 'Score', icon: '\u2605', angle: (5 * Math.PI) / 6, color: COLORS.green, delay: 53},
    {label: 'Optimize', icon: '\u21BB', angle: (7 * Math.PI) / 6, color: COLORS.orange, delay: 60},
  ];

  return (
    <SceneBackground
      orbs={[
        {x: 580, y: 520, color: COLORS.neonPurple, size: 400},
        {x: 1400, y: 300, color: COLORS.electricBlue, size: 250},
      ]}
      particleSeed="nurture"
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
            Step 08
          </span>
        </div>

        <AnimatedText text="Continuous Nurture Loop" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="Marketing keeps nurturing until the buying journey advances and AI score is high"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400, maxWidth: 900}}
        />

        {/* Orbit ring */}
        <svg
          style={{position: 'absolute', top: 0, left: 0, width: 1920, height: 1080, pointerEvents: 'none'}}
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={`${COLORS.electricBlue}22`}
            strokeWidth={2}
            strokeDasharray={`${ringProgress * 2 * Math.PI * radius} ${2 * Math.PI * radius}`}
          />
          {/* Rotating dot on the ring */}
          {ringProgress >= 1 && (
            <circle
              cx={cx + Math.cos(frame * 0.04) * radius}
              cy={cy + Math.sin(frame * 0.04) * radius}
              r={4}
              fill={COLORS.electricBlue}
              style={{filter: `drop-shadow(0 0 6px ${COLORS.electricBlue})`}}
            />
          )}
        </svg>

        {/* Central hub */}
        <div
          style={{
            position: 'absolute',
            left: cx - 65,
            top: cy - 65,
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.deepNavy}, ${COLORS.gradientMid})`,
            border: `2px solid ${COLORS.neonPurple}44`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${pulseScale})`,
            boxShadow: `0 0 40px ${COLORS.neonPurple}22`,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.mono,
              color: COLORS.electricBlue,
              letterSpacing: 2,
            }}
          >
            AISHA
          </div>
          <div
            style={{
              fontSize: 10,
              fontFamily: FONTS.mono,
              color: COLORS.lightGray,
              marginTop: 2,
            }}
          >
            NURTURING
          </div>
        </div>

        {/* Orbit nodes */}
        {nodes.map((node, i) => (
          <LoopNode
            key={i}
            label={node.label}
            icon={node.icon}
            angle={node.angle}
            radius={radius}
            delay={node.delay}
            color={node.color}
            cx={cx}
            cy={cy}
          />
        ))}

        {/* Right side: Score progression */}
        <div
          style={{
            position: 'absolute',
            right: 100,
            top: 300,
            width: 420,
          }}
        >
          <div
            style={{
              padding: 32,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${COLORS.darkGray}`,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontFamily: FONTS.heading,
                color: COLORS.white,
                fontWeight: 700,
                marginBottom: 24,
                letterSpacing: 1,
              }}
            >
              SCORE PROGRESSION
            </div>

            {/* Score bar */}
            <div style={{marginBottom: 16}}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span style={{fontSize: 13, fontFamily: FONTS.mono, color: COLORS.lightGray}}>
                  AI Score
                </span>
                <span
                  style={{
                    fontSize: 24,
                    fontFamily: FONTS.heading,
                    fontWeight: 800,
                    color: scoreProgress >= 80 ? COLORS.green : COLORS.gold,
                  }}
                >
                  {Math.round(scoreProgress)}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 10,
                  borderRadius: 5,
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${scoreProgress}%`,
                    height: '100%',
                    borderRadius: 5,
                    background:
                      scoreProgress >= 80
                        ? `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.green})`
                        : `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.gold})`,
                    transition: 'background 0.3s',
                    boxShadow: `0 0 10px ${scoreProgress >= 80 ? COLORS.green : COLORS.gold}44`,
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 4,
                }}
              >
                <span style={{fontSize: 10, fontFamily: FONTS.mono, color: COLORS.lightGray}}>0</span>
                <span style={{fontSize: 10, fontFamily: FONTS.mono, color: COLORS.green}}>
                  80 = Sales Ready
                </span>
                <span style={{fontSize: 10, fontFamily: FONTS.mono, color: COLORS.lightGray}}>100</span>
              </div>
            </div>

            {/* Journey stages */}
            <div style={{marginTop: 24}}>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: FONTS.mono,
                  color: COLORS.lightGray,
                  marginBottom: 12,
                  letterSpacing: 1,
                }}
              >
                BUYING JOURNEY
              </div>
              {['Awareness', 'Interest', 'Consideration', 'Intent'].map((stage, i) => {
                const stageActive = scoreProgress >= 52 + i * 10;
                return (
                  <div
                    key={stage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: stageActive ? COLORS.green : 'transparent',
                        border: `2px solid ${stageActive ? COLORS.green : COLORS.darkGray}`,
                        boxShadow: stageActive ? `0 0 8px ${COLORS.green}` : 'none',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: FONTS.body,
                        color: stageActive ? COLORS.white : COLORS.darkGray,
                        fontWeight: stageActive ? 600 : 400,
                      }}
                    >
                      {stage}
                    </span>
                    {stageActive && (
                      <span style={{fontSize: 12, color: COLORS.green, marginLeft: 'auto'}}>
                        &#x2713;
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
