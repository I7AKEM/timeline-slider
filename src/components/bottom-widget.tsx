// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {forwardRef, useMemo, useCallback, useEffect} from 'react';
import styled, {withTheme} from 'styled-components';

import {isSideFilter} from "../util";
import {TimeRangeFilter} from "../types";
import {FILTER_VIEW_TYPES} from "../constants";
import TimeWidget from "./time-widget.tsx";
import FilterAnimationController from "./filter-animation-controller.tsx";

const bottomWidgetSelector = (props: any) => ({
    filters: props.filters,
    datasets: props.datasets,
    // uiState: props.uiState,
    // layers: props.visState.layers,
    // animationConfig: props.visState.animationConfig,
    // visStateActions: props.visStateActions,
});

interface BottomWidgetContainerProps {
    hasPadding?: boolean;
    width?: number;
}

const BottomWidgetContainer = styled.div<BottomWidgetContainerProps>`
    display: flex;
    flex-direction: column;
    pointer-events: none !important; /* prevent padding from blocking input */

    & > * {
        /* all children should allow input */
        pointer-events: all;
    }

    width: 100%;
    z-index: 1;
`;

export type BottomWidgetProps = ReturnType<typeof bottomWidgetSelector>;
type ThemeProp = {
    theme: Record<string, any>;
};
type BottomWidgetThemedProps = BottomWidgetProps & ThemeProp;


const BottomWidget: React.FC<BottomWidgetThemedProps> = (props: BottomWidgetThemedProps) => {
    const {
        datasets,
        filters,
        // animationConfig,
        // visStateActions,
        // containerW,
        // layers,
        // rootRef,
        theme
    } = props;


    const enlargedFilterIdx = useMemo(() => filters.findIndex(f => !isSideFilter(f)), [filters]);

    const animatedFilterIdx = useMemo(() => filters.findIndex(f => f.isAnimating), [filters]);
    const animatedFilter = animatedFilterIdx > -1 ? filters[animatedFilterIdx] : null;

    const isLegendPinned = true;
    const spaceForLegendWidth = isLegendPinned
        ? theme.mapControl?.width +
        theme.mapControl?.mapLegend?.pinned?.right * 2 -
        theme.bottomWidgetPaddingRight
        : 0;

    // show playback control if layers contain trip layer & at least one trip layer is visible
    // const animatableLayer = useMemo(
    //     () =>
    //         layers.filter(l => true),
    //     [layers]
    // );

    // const readyToAnimation =
    //     Array.isArray(animationConfig.domain) && Number.isFinite(animationConfig.currentTime);
    // if animation control is showing, hide time display in time slider
    // const showFloatingTimeDisplay = !animatableLayer.length;
    // const showAnimationControl =
    //     animatableLayer.length && readyToAnimation && !animationConfig.hideControl;
    const showTimeWidget = filters[0]?.mappedValue?.length > 0;

    // if filter is not animating, pass in enlarged filter here because
    // animation controller needs to call reset on it
    const filter = (animatedFilter as TimeRangeFilter) || filters[enlargedFilterIdx];

    // const onClose = useCallback(
    //     () => visStateActions.setFilterView(enlargedFilterIdx, FILTER_VIEW_TYPES.side),
    //     [visStateActions, enlargedFilterIdx]
    // );

    return (
        <BottomWidgetContainer
            // width={containerW}
            style={{marginRight: spaceForLegendWidth}}
            className="bottom-widget--container"
            hasPadding={
                // showAnimationControl || showTimeWidget
                false
            }
            // ref={rootRef}
        >
            {/*<LayerAnimationController*/}
            {/*  animationConfig={animationConfig}*/}
            {/*  setLayerAnimationTime={visStateActions.setLayerAnimationTime}*/}
            {/*>*/}
            {/*  {(isAnimating, start, pause, resetAnimation, timeline, setTimelineValue) =>*/}
            {/*    showAnimationControl ? (*/}
            {/*      <LayerAnimationControl*/}
            {/*        updateAnimationSpeed={visStateActions.updateLayerAnimationSpeed}*/}
            {/*        toggleAnimation={visStateActions.toggleLayerAnimation}*/}
            {/*        isAnimatable={!animatedFilter}*/}
            {/*        isAnimating={isAnimating}*/}
            {/*        resetAnimation={resetAnimation}*/}
            {/*        setTimelineValue={setTimelineValue}*/}
            {/*        timeline={timeline}*/}
            {/*      />*/}
            {/*    ) : null*/}
            {/*  }*/}
            {/*</LayerAnimationController>*/}
            {filter ? (
                <FilterAnimationController
                    filter={filter}
                    filterIdx={animatedFilterIdx > -1 ? animatedFilterIdx : enlargedFilterIdx}
                    setFilterAnimationTime={
                    // visStateActions.setFilterAnimationTime
                        () => {}
                }
                >
                    {(isAnimating, start, pause, resetAnimation, timeline, setTimelineValue) =>
                        showTimeWidget && timeline ? (
                            <TimeWidget
                                // TimeWidget uses React.memo, here we pass width
                                // even though it doesnt use it, to force rerender
                                filter={filters[enlargedFilterIdx] as TimeRangeFilter}
                                index={enlargedFilterIdx}
                                datasets={{}}
                                readOnly={true}
                                showTimeDisplay={
                                    // showFloatingTimeDisplay
                                    false
                                }
                                setFilterPlot={
                                    // visStateActions.setFilterPlot
                                    () => {}
                                }
                                setFilterAnimationTime={setTimelineValue}
                                setFilterAnimationWindow={
                                    // visStateActions.setFilterAnimationWindow
                                    () => {}
                                }
                                toggleAnimation={
                                    // visStateActions.toggleFilterAnimation
                                    () => {}
                                }
                                updateAnimationSpeed={
                                    // visStateActions.updateFilterAnimationSpeed
                                    () => {}
                                }
                                resetAnimation={resetAnimation}
                                isAnimatable={
                                    // !animationConfig || !animationConfig.isAnimating
                                    false
                                }
                                timeline={timeline}
                                onClose={() => {}}
                            />
                        ) : null
                    }
                </FilterAnimationController>
            ) : null}
        </BottomWidgetContainer>
    );
};

export default withTheme(
    // @ts-ignore
    forwardRef((props: BottomWidgetThemedProps, ref) => <BottomWidget {...props} rootRef={ref}/>)
);


