import React from 'react';
import {Composition} from 'remotion';
import {AishaShowcase} from './AishaShowcase';
import {VIDEO, TOTAL_DURATION} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AishaShowcase"
        component={AishaShowcase}
        durationInFrames={TOTAL_DURATION}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
