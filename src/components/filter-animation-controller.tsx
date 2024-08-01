// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {useCallback, useMemo} from 'react';
import {Timeline, TimeRangeFilter} from "../types";
import {ANIMATION_WINDOW} from "../constants";
import {getIntervalBins, getTimelineFromFilter} from "../util";
import AnimationControllerFactory from "./animation-control/animation-controller.ts";

interface FilterAnimationControllerProps {
  filter: TimeRangeFilter & {animationWindow?: string};
  filterIdx: number;
  setFilterAnimationTime: (idx: number, value: string, a: any[]) => void;
  children?: (
    isAnimating: boolean | undefined,
    startAnimation: () => void,
    pauseAnimation: () => void,
    resetAnimation: () => void,
    timeline: Timeline | undefined,
    setTimelineValue: (x: any) => void
  ) => React.ReactElement | null;
}

const FilterAnimationController: React.FC<FilterAnimationControllerProps> = ({
    filter,
    filterIdx,
    setFilterAnimationTime,
    children
  }) => {
    const intervalBins = useMemo(() => getIntervalBins(filter), [filter]);

    const steps = useMemo(() => (intervalBins ? intervalBins.map(x => x.x0) : null), [
      intervalBins
    ]);

    // @ts-ignore
  const AnimationController = new AnimationControllerFactory()

    const updateAnimation = useCallback(
      value => {
        switch (filter.animationWindow) {
          case ANIMATION_WINDOW.interval:
            const idx = value[1];
            setFilterAnimationTime(filterIdx, 'value', [
              intervalBins[idx].x0,
              intervalBins[idx].x1 - 1
            ]);
            break;
          default:
            setFilterAnimationTime(filterIdx, 'value', value);
            break;
        }
      },
      [filterIdx, intervalBins, filter.animationWindow, setFilterAnimationTime]
    );

    // if filter is synced merge the filter and animation config
    const timeline = getTimelineFromFilter(filter);

    return (
      <AnimationController
        key="filter-control"
        value={filter.value}
        domain={filter.domain}
        speed={filter.speed}
        isAnimating={filter.isAnimating}
        animationWindow={filter.animationWindow}
        steps={steps}
        updateAnimation={updateAnimation}
        setTimelineValue={setFilterAnimationTime}
        timeline={timeline}
        children={children}
      />
    );
  };

export default FilterAnimationController;
