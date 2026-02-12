import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {ProgressBar} from '../components/ProgressBar';

const TRAITS = [
  {name: 'Openness', score: 0.82, color: COLORS.electricBlue, desc: 'Innovation-driven, curious'},
  {name: 'Conscientiousness', score: 0.91, color: COLORS.green, desc: 'Detail-oriented, structured'},
  {name: 'Extraversion', score: 0.67, color: COLORS.gold, desc: 'Collaborative, social proof'},
  {name: 'Agreeableness', score: 0.74, color: COLORS.hotPink, desc: 'Consensus-seeking, team player'},
  {name: 'Neuroticism', score: 0.38, color: COLORS.neonPurple, desc: 'Risk-aware, cautious'},
];

const PentagonChart: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const drawProgress = interpolate(adjustedFrame, [0, 40], [0, 1], {extrapolateRight: 'clamp'});

  const cx = 200;
  const cy = 200;
  const maxR = 150;
  const sides = 5;

  // Pentagon grid lines
  const gridLines = [0.25, 0.5, 0.75, 1].map((scale) => {
    const points = Array.from({length: sides}, (_, i) => {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      return `${cx + Math.cos(angle) * maxR * scale},${cy + Math.sin(angle) * maxR * scale}`;
    }).join(' ');
    return points;
  });

  // Data points
  const scores = [0.82, 0.91, 0.67, 0.74, 0.38];
  const dataPoints = scores.map((score, i) => {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    const r = maxR * score * drawProgress;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  });

  // Axis labels positions
  const labelPositions = TRAITS.map((trait, i) => {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * (maxR + 40),
      y: cy + Math.sin(angle) * (maxR + 40),
      label: trait.name[0],
    };
  });

  return (
    <svg width={400} height={400} viewBox="0 0 400 400">
      {/* Grid */}
      {gridLines.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke={`${COLORS.white}11`}
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {Array.from({length: sides}, (_, i) => {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(angle) * maxR}
            y2={cy + Math.sin(angle) * maxR}
            stroke={`${COLORS.white}11`}
            strokeWidth={1}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPoints.join(' ')}
        fill={`${COLORS.electricBlue}22`}
        stroke={COLORS.electricBlue}
        strokeWidth={2}
      />

      {/* Data points */}
      {dataPoints.map((point, i) => {
        const [px, py] = point.split(',').map(Number);
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={5}
            fill={TRAITS[i].color}
            stroke={COLORS.white}
            strokeWidth={1}
          />
        );
      })}

      {/* Labels */}
      {labelPositions.map((pos, i) => (
        <text
          key={i}
          x={pos.x}
          y={pos.y}
          fill={TRAITS[i].color}
          fontSize={16}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {pos.label}
        </text>
      ))}
    </svg>
  );
};

export const PsychModel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneBackground
      orbs={[
        {x: 500, y: 500, color: COLORS.neonPurple, size: 400},
        {x: 1400, y: 400, color: COLORS.electricBlue, size: 300},
      ]}
      particleSeed="psych"
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
            Step 04
          </span>
        </div>

        <AnimatedText text="Big 5 Psychographic Analysis" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="OCEAN personality model analysis for precision targeting"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400}}
        />

        {/* Pentagon chart */}
        <div style={{position: 'absolute', left: 100, top: 280}}>
          <PentagonChart delay={25} />
        </div>

        {/* Trait bars */}
        <div
          style={{
            position: 'absolute',
            right: 100,
            top: 300,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            width: 500,
          }}
        >
          {TRAITS.map((trait, i) => {
            const barDelay = 35 + i * 10;
            const labelOpacity = interpolate(frame, [barDelay, barDelay + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div key={trait.name} style={{opacity: labelOpacity}}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontFamily: FONTS.heading,
                      fontWeight: 600,
                      color: COLORS.white,
                    }}
                  >
                    {trait.name}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: FONTS.mono,
                      color: trait.color,
                    }}
                  >
                    {trait.desc}
                  </span>
                </div>
                <ProgressBar
                  progress={trait.score}
                  width={500}
                  height={6}
                  delay={barDelay}
                  color={trait.color}
                />
              </div>
            );
          })}
        </div>

        {/* Insight box */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            right: 80,
            opacity: interpolate(frame, [100, 115], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div
            style={{
              padding: '16px 32px',
              borderRadius: 12,
              background: `linear-gradient(90deg, ${COLORS.neonPurple}22, ${COLORS.electricBlue}22)`,
              border: `1px solid ${COLORS.neonPurple}33`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{fontSize: 24}}>&#9889;</span>
            <span
              style={{
                fontSize: 16,
                fontFamily: FONTS.body,
                color: COLORS.lightGray,
              }}
            >
              <strong style={{color: COLORS.white}}>Insight:</strong> High Conscientiousness + Low
              Neuroticism = Respond best to data-driven, structured messaging with clear ROI metrics
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
