// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project


import {TimeRangeFilter} from "../types/reducers";
import {DEFAULT_TIME_FORMAT, FILTER_VIEW_TYPES} from "../constants";
/*
 * TimeRangeFilter -> TimeRangeSlider -> RangeSlider
 */
export function timeRangeSliderFieldsSelector(filter: TimeRangeFilter) {
  const hasUserFormat = typeof filter.timeFormat === 'string';
  const timeFormat =
    (hasUserFormat ? filter.timeFormat : filter.defaultTimeFormat) || DEFAULT_TIME_FORMAT;

  return {
    id: filter.id,
    domain: filter.domain,
    bins: filter.bins,
    value: filter.value,
    plotType: filter.plotType,
    lineChart: filter.lineChart,
    yAxis: filter.yAxis,
    step: filter.step,
    speed: filter.speed,
    histogram:
      filter.view === FILTER_VIEW_TYPES.enlarged ? filter.enlargedHistogram : filter.histogram,
    animationWindow: filter.animationWindow,
    isAnimating: filter.isAnimating,
    timezone: filter.timezone,
    timeFormat,
    isMinified: filter.view === FILTER_VIEW_TYPES.minified,
    isEnlarged: filter.view === FILTER_VIEW_TYPES.enlarged
  };
}
