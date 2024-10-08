// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import {Reset, Play, Pause, Save, Rocket, AnchorWindow, FreeWindow} from '../../icons';
import {ANIMATION_WINDOW} from "../../constants";
import {AnimationItem} from "./animation-window-control.tsx";

const DEFAULT_BUTTON_HEIGHT = '20px';

interface StyledAnimationControlsProps {
  width?: number;
}

const StyledAnimationControls = styled.div<StyledAnimationControlsProps>`
  display: flex;
  position: relative;
  width: ${props => props.width}px;
  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const DEFAULT_ICONS = {
  reset: _ => <Reset height="18px" />,
  play: _ => <Play height="18px" />,
  pause: _ => <Pause height="18px" />,
  export: _ => <Save height="18px" />,
  speed: Rocket,
  animationFree: FreeWindow,
  animationIncremental: AnchorWindow
};

function nop() {}

const DEFAULT_ANIMATE_ITEMS = {
  [ANIMATION_WINDOW.free]: {
    id: ANIMATION_WINDOW.free,
    icon: DEFAULT_ICONS.animationFree,
    tooltip: 'tooltip.animationByWindow'
  },
  [ANIMATION_WINDOW.incremental]: {
    id: ANIMATION_WINDOW.incremental,
    icon: DEFAULT_ICONS.animationIncremental,
    tooltip: 'tooltip.animationByIncremental'
  }
};
interface PlaybackControlsProps {
  isAnimatable?: boolean;
  isAnimating?: boolean;
  width?: number;
  speed: number;
  animationWindow?: string;
  setFilterAnimationWindow?: (id: string) => void;
  updateAnimationSpeed?: (val: number) => void;
  pauseAnimation?: () => void;
  resetAnimation?: () => void;
  startAnimation: () => void;
  playbackIcons?: typeof DEFAULT_ICONS;
  animationItems?: {[key: string]: AnimationItem};
  buttonStyle?: string;
  buttonHeight?: string;
  playbackActionItems?: any[];
  className?: string;
}

  // eslint-disable-next-line complexity
  const PlaybackControls: React.FC<PlaybackControlsProps> = ({
    isAnimatable,
    isAnimating,
    width,
    speed,
    animationWindow,
    setFilterAnimationWindow,
    updateAnimationSpeed,
    pauseAnimation,
    resetAnimation,
    startAnimation,
    playbackIcons,
    animationItems,
    buttonStyle,
    buttonHeight,
    playbackActionItems = []
  }) => {
    const [isSpeedControlVisible, toggleSpeedControl] = useState(false);
    const [showAnimationWindowControl, setShowAnimationWindowControl] = useState(false);

    const toggleAnimationWindowControl = useCallback(() => {
      setShowAnimationWindowControl(!showAnimationWindowControl);
    }, [showAnimationWindowControl, setShowAnimationWindowControl]);
    const btnStyle = buttonStyle ? {[buttonStyle]: true} : {};

    const hideAndShowSpeedControl = useCallback(() => {
      if (!isSpeedControlVisible) {
        toggleSpeedControl(true);
      } else {
        // TODO: A HACK to allow input onblur get triggered before the input is unmounted
        // A better solution should be invested, see https://github.com/facebook/react/issues/12363
        window.setTimeout(() => toggleSpeedControl(false), 200);
      }
    }, [isSpeedControlVisible, toggleSpeedControl]);

    return (
      <StyledAnimationControls
        className={classnames('playback-controls', {
          disabled: !isAnimatable
        })}
        width={width}
      >
        {/** Window */}
        {playbackActionItems.map((ActionComponent, index) => (
          <ActionComponent
            key={index}
            toggleAnimationWindowControl={toggleAnimationWindowControl}
            showAnimationWindowControl={showAnimationWindowControl}
            btnStyle={btnStyle}
            hideAndShowSpeedControl={hideAndShowSpeedControl}
            animationItems={animationItems}
            animationWindow={animationWindow}
            buttonHeight={buttonHeight}
            setFilterAnimationWindow={setFilterAnimationWindow}
            updateAnimationSpeed={updateAnimationSpeed}
            isAnimating={isAnimating}
            pauseAnimation={pauseAnimation}
            resetAnimation={resetAnimation}
            startAnimation={startAnimation}
            playbackIcons={playbackIcons}
            isSpeedControlVisible={isSpeedControlVisible}
            speed={speed}
          />
        ))}
      </StyledAnimationControls>
    );
  };



export default PlaybackControls;
