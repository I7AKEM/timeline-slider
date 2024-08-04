// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {useCallback, useState} from 'react';
// import styled from 'styled-components';
// import {BottomWidgetInner} from '../common/styled-components';
// import TimeRangeSliderFactory from '../common/time-range-slider';
// import FloatingTimeDisplayFactory from '../common/animation-control/floating-time-display';
import {timeRangeSliderFieldsSelector} from './time-range-filter';
import {TimeWidgetProps} from './types';
// import TimeWidgetTopFactory from './time-widget-top';
import TimeRangeSlider from "./time-range-slider.tsx";
import {BottomWidgetInner} from "./styled-components.tsx";
import styled from "styled-components";

const TimeBottomWidgetInner = styled(BottomWidgetInner)`
  padding: 6px 32px 24px 32px;
`;

const TimeWidget: React.FC<TimeWidgetProps> = ({
                                                 // datasets,
                                                 filter,
                                                 index,
                                                 // readOnly,
                                                 showTimeDisplay,
                                                 setFilterAnimationTime,
                                                 // onClose,
                                                 resetAnimation,
                                                 isAnimatable,
                                                 updateAnimationSpeed,
                                                 toggleAnimation,
                                                 // setFilterPlot,
                                                 setFilterAnimationWindow,
                                                 timeline
                                               }: TimeWidgetProps) => {
  const [isMinified, setMinified] = useState(false);


  const _updateAnimationSpeed = useCallback((speed: number) => updateAnimationSpeed(index, speed), [
    updateAnimationSpeed,
    index
  ]);

  const _toggleAnimation = useCallback(() => toggleAnimation(index), [toggleAnimation, index]);

  // const _onToggleMinify = useCallback(() => setMinified(!isMinified), [setMinified, isMinified]);

  const _setFilterAnimationWindow = useCallback(
      (animationWindow: string) => setFilterAnimationWindow({id: filter.id, animationWindow}),
      [setFilterAnimationWindow, filter.id]
  );

  const timeSliderOnChange = useCallback((value: number[]) => setFilterAnimationTime(index, 'value', value), [
    setFilterAnimationTime,
    index
  ]);

  return (
      <TimeBottomWidgetInner className="bottom-widget--inner">
        {/*<TimeWidgetTop*/}
        {/*  filter={filter}*/}
        {/*  readOnly={readOnly}*/}
        {/*  datasets={datasets}*/}
        {/*  setFilterPlot={setFilterPlot}*/}
        {/*  index={index}*/}
        {/*  onClose={onClose}*/}
        {/*  onToggleMinify={_onToggleMinify}*/}
        {/*  isMinified={isMinified}*/}
        {/*/>*/}
        {/* Once AnimationControl is able to display large timeline*/}
        {/* we can replace TimeRangeSlider with AnimationControl*/}
        <TimeRangeSlider
            {...timeRangeSliderFieldsSelector(filter)}
            onChange={timeSliderOnChange}
            toggleAnimation={_toggleAnimation}
            updateAnimationSpeed={_updateAnimationSpeed}
            setFilterAnimationWindow={_setFilterAnimationWindow}
            hideTimeTitle={showTimeDisplay}
            resetAnimation={resetAnimation}
            isAnimatable={isAnimatable}
            isMinified={isMinified} // TODO: Delete this prop
            timeline={timeline}
        />
        {/*{showTimeDisplay ? (*/}
        {/*    <FloatingTimeDisplay*/}
        {/*        currentTime={filter.value}*/}
        {/*        defaultTimeFormat={filter.defaultTimeFormat}*/}
        {/*        timeFormat={filter.timeFormat}*/}
        {/*        timezone={filter.timezone}*/}
        {/*    />*/}
        {/*) : null}*/}
      </TimeBottomWidgetInner>
  );
};

export default TimeWidget;
