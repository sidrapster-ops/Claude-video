import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from '../theme';
import {SceneBackground} from '../components/SceneBackground';
import {AnimatedText} from '../components/AnimatedText';
import {IconBadge} from '../components/IconBadge';
import {DataFlowLine} from '../components/DataFlowLine';

const DataStream: React.FC<{
  items: string[];
  x: number;
  y: number;
  delay: number;
  color: string;
}> = ({items, x, y, delay, color}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{position: 'absolute', left: x, top: y}}>
      {items.map((item, i) => {
        const itemDelay = delay + i * 8;
        const opacity = interpolate(frame, [itemDelay, itemDelay + 10], [0, 0.7], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const slideX = interpolate(frame, [itemDelay, itemDelay + 10], [-20, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              fontSize: 12,
              fontFamily: FONTS.mono,
              color,
              opacity,
              transform: `translateX(${slideX}px)`,
              marginBottom: 4,
              whiteSpace: 'nowrap',
            }}
          >
            &#8250; {item}
          </div>
        );
      })}
    </div>
  );
};

export const DataScraping: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Central hub animation
  const hubProgress = spring({frame: frame - 30, fps, config: {damping: 200}});
  const hubScale = interpolate(hubProgress, [0, 1], [0, 1]);
  const hubRotation = frame * 0.3;

  // Counter animation
  const dataPoints = Math.floor(
    interpolate(frame, [40, 130], [0, 12847], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <SceneBackground
      orbs={[
        {x: 960, y: 540, color: COLORS.neonPurple, size: 450},
        {x: 300, y: 300, color: COLORS.linkedin, size: 200},
        {x: 1600, y: 300, color: COLORS.reddit, size: 200},
        {x: 300, y: 800, color: COLORS.quora, size: 200},
        {x: 1600, y: 800, color: COLORS.web, size: 200},
      ]}
      particleSeed="scraping"
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
            Step 03
          </span>
        </div>

        <AnimatedText text="Public Intelligence Gathering" fontSize={56} gradient delay={3} />
        <AnimatedText
          text="Scrapes and aggregates public data from across the web"
          fontSize={22}
          color={COLORS.lightGray}
          delay={12}
          style={{marginTop: 8, fontWeight: 400}}
        />

        {/* Platform icons - four corners */}
        <div style={{position: 'absolute', left: 180, top: 350}}>
          <IconBadge icon="in" label="LinkedIn" color={COLORS.linkedin} delay={20} size={80} />
        </div>
        <div style={{position: 'absolute', right: 200, top: 350}}>
          <IconBadge icon="R" label="Reddit" color={COLORS.reddit} delay={30} size={80} />
        </div>
        <div style={{position: 'absolute', left: 180, bottom: 200}}>
          <IconBadge icon="Q" label="Quora" color={COLORS.quora} delay={40} size={80} />
        </div>
        <div style={{position: 'absolute', right: 200, bottom: 200}}>
          <IconBadge icon="W" label="Web" color={COLORS.web} delay={50} size={80} />
        </div>

        {/* Data flow lines to center */}
        <DataFlowLine startX={280} startY={410} endX={830} endY={520} delay={35} color={COLORS.linkedin} />
        <DataFlowLine startX={1640} startY={410} endX={1090} endY={520} delay={45} color={COLORS.reddit} />
        <DataFlowLine startX={280} startY={780} endX={830} endY={560} delay={55} color={COLORS.quora} />
        <DataFlowLine startX={1640} startY={780} endX={1090} endY={560} delay={65} color={COLORS.web} />

        {/* Central hub */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${hubScale})`,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: `2px solid ${COLORS.electricBlue}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${hubRotation}deg)`,
              background: `radial-gradient(circle, ${COLORS.deepNavy} 0%, rgba(10,14,39,0.8) 100%)`,
            }}
          >
            {/* Inner content */}
            <div
              style={{
                textAlign: 'center',
                transform: `rotate(${-hubRotation}deg)`,
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
                  fontSize: 11,
                  fontFamily: FONTS.mono,
                  color: COLORS.lightGray,
                  marginTop: 4,
                }}
              >
                COLLECTING
              </div>
            </div>
          </div>
        </div>

        {/* Data streams near platforms */}
        <DataStream
          items={['Job titles & roles', 'Company posts', 'Engagement data', 'Connections']}
          x={310}
          y={380}
          delay={50}
          color={COLORS.linkedin}
        />
        <DataStream
          items={['Industry discussions', 'Pain points', 'Tech stack mentions', 'Sentiment']}
          x={1380}
          y={380}
          delay={60}
          color={COLORS.reddit}
        />
        <DataStream
          items={['Expert answers', 'Topic interests', 'Thought leadership', 'Questions asked']}
          x={310}
          y={710}
          delay={70}
          color={COLORS.quora}
        />
        <DataStream
          items={['Blog content', 'Press releases', 'Case studies', 'Market signals']}
          x={1380}
          y={710}
          delay={80}
          color={COLORS.web}
        />

        {/* Data points counter */}
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontFamily: FONTS.mono,
              fontWeight: 700,
              color: COLORS.electricBlue,
            }}
          >
            {dataPoints.toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: FONTS.body,
              color: COLORS.lightGray,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            data points collected
          </div>
        </div>
      </AbsoluteFill>
    </SceneBackground>
  );
};
