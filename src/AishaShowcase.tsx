import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {SCENE_DURATIONS, COLORS} from './theme';
import {Intro} from './scenes/Intro';
import {WebsiteAnalysis} from './scenes/WebsiteAnalysis';
import {IcpBuilder} from './scenes/IcpBuilder';
import {DataScraping} from './scenes/DataScraping';
import {PsychModel} from './scenes/PsychModel';
import {Messaging} from './scenes/Messaging';
import {AiScoring} from './scenes/AiScoring';
import {SalesHandoff} from './scenes/SalesHandoff';
import {NurtureLoop} from './scenes/NurtureLoop';
import {Outro} from './scenes/Outro';

const TRANSITION_FRAMES = 15;

const FadeTransition: React.FC<{children: React.ReactNode; durationInFrames: number}> = ({
  children,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - TRANSITION_FRAMES, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return <AbsoluteFill style={{opacity: Math.min(fadeIn, fadeOut)}}>{children}</AbsoluteFill>;
};

export const AishaShowcase: React.FC = () => {
  const scenes = [
    {component: Intro, duration: SCENE_DURATIONS.intro},
    {component: WebsiteAnalysis, duration: SCENE_DURATIONS.websiteAnalysis},
    {component: IcpBuilder, duration: SCENE_DURATIONS.icpBuilder},
    {component: DataScraping, duration: SCENE_DURATIONS.dataScraping},
    {component: PsychModel, duration: SCENE_DURATIONS.psychModel},
    {component: Messaging, duration: SCENE_DURATIONS.messaging},
    {component: AiScoring, duration: SCENE_DURATIONS.aiScoring},
    {component: SalesHandoff, duration: SCENE_DURATIONS.salesHandoff},
    {component: NurtureLoop, duration: SCENE_DURATIONS.nurtureLoop},
    {component: Outro, duration: SCENE_DURATIONS.outro},
  ];

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.deepNavy}}>
      {scenes.map((scene, index) => {
        const from = currentFrame;
        currentFrame += scene.duration;
        const SceneComponent = scene.component;

        return (
          <Sequence key={index} from={from} durationInFrames={scene.duration} name={`Scene ${index + 1}`}>
            <FadeTransition durationInFrames={scene.duration}>
              <SceneComponent />
            </FadeTransition>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
