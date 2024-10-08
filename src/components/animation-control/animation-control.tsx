// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import {media} from "../../styles";
import {Timeline} from "../../types";
import FloatingTimeDisplayFactory from "./floating-time-display.tsx";
import PlaybackControls from "./playback-controls.tsx";
import TimelineSlider from "../timeline-slider.tsx";


const SLIDER_MARGIN_PALM = 6;

const AnimationControlContainer = styled.div`
  padding: ${props => `${props.theme.bottomInnerPdVert}px ${props.theme.bottomInnerPdSide}px`};
  position: relative;
  margin-top: ${props => props.theme.bottomPanelGap}px;

  ${media.portable`
    border-top: 1px solid ${props => props.theme.panelBorderColor};
    border-left: 1px solid ${props => props.theme.panelBorderColor};
    padding: 12px 12px;
    margin-top: 0;
  `}
`;

const AnimationWidgetInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .animation-control__time-slider {
    display: flex;
    align-items: center;
    height: 32px;
    width: 100%;
  }
  .playback-controls {
    margin-left: 16px;
  }

  ${media.palm`
    flex-direction: column;
    .playback-controls {
      margin: 0;
    }
    .animation-control__time-slider {
      width: 100%;
      position: relative;
    }
    .animation-control__time-domain {
      position: absolute;
      top: -24px;

      &.domain-start {
        left: ${SLIDER_MARGIN_PALM}px;
      }
      &.domain-end {
        right: ${SLIDER_MARGIN_PALM}px;
      }
    }
  `};
`;

const TIMELINE_PLAYBACK_STYLE = {flex: 1};

export type AnimationControlProps = {
  timeline?: Timeline;
  isAnimatable?: boolean;
  isAnimating?: boolean;
  updateAnimationSpeed?: (val: number) => void;
  setAnimationWindow?: (id: string) => void;
  toggleAnimation: () => void;
  resetAnimation?: () => void;
  setTimelineValue: (value: number[]) => void;
  showTimeDisplay?: boolean;
  showTimeline?: boolean;
  showControls?: boolean;
  className?: string;
  style?: object;
};


  const AnimationControl: React.FC<AnimationControlProps> = ({
    className,
    style,
    isAnimatable,
    isAnimating,
    resetAnimation,
    toggleAnimation = () => {},
    updateAnimationSpeed = () => {},
    setTimelineValue,
    setAnimationWindow,
    timeline,
    showTimeline = true,
    showControls = true,
    showTimeDisplay = true
  }) => {
    if (!timeline) {
      return null;
    }

    const {animationWindow, value, speed, defaultTimeFormat, timeFormat, timezone} = timeline;
    // @ts-ignore
    const FloatingTimeDisplay = new FloatingTimeDisplayFactory()

    return (
      <AnimationControlContainer
        style={style}
        className={classnames('animation-control-container', className)}
      >
        <AnimationWidgetInner className="animation-widget--inner">
          {showTimeline ? (
            <TimelineSlider
              style={TIMELINE_PLAYBACK_STYLE}
              timeline={timeline}
              setTimelineValue={setTimelineValue}
            />
          ) : null}
          {showControls ? (
            <PlaybackControls
              className="animation-control-playpause"
              isAnimatable={isAnimatable}
              startAnimation={toggleAnimation}
              isAnimating={isAnimating}
              pauseAnimation={toggleAnimation}
              resetAnimation={resetAnimation}
              speed={speed}
              updateAnimationSpeed={updateAnimationSpeed}
              setFilterAnimationWindow={setAnimationWindow}
              animationWindow={animationWindow}
            />
          ) : null}
        </AnimationWidgetInner>
        {showTimeDisplay ? (
          <FloatingTimeDisplay
            currentTime={value}
            defaultTimeFormat={defaultTimeFormat}
            timeFormat={timeFormat}
            timezone={timezone}
          />
        ) : null}
      </AnimationControlContainer>
    );
  };


export default AnimationControl;
