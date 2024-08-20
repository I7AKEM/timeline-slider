// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {forwardRef, useMemo} from 'react';
import styled, {withTheme} from 'styled-components';

import {isSideFilter} from "../util";
import {TimeRangeFilter} from "../types";
import TimeWidget from "./time-widget.tsx";
import FilterAnimationController from "./filter-animation-controller.tsx";

const bottomWidgetSelector = (props: any) => ({
    filters: props.filters,
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
        filters,
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

    const showTimeWidget = filters[0]?.mappedValue?.length > 0;

    const filter = (animatedFilter as TimeRangeFilter) || filters[enlargedFilterIdx];


    return (
        <>
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
                                    false
                                }
                                setFilterPlot={
                                    () => {}
                                }
                                setFilterAnimationTime={setTimelineValue}
                                setFilterAnimationWindow={
                                    () => {}
                                }
                                toggleAnimation={
                                    () => {}
                                }
                                updateAnimationSpeed={
                                    () => {}
                                }
                                resetAnimation={resetAnimation}
                                isAnimatable={
                                    false
                                }
                                timeline={timeline}
                                onClose={() => {}}
                            />
                        ) : null
                    }
                </FilterAnimationController>
            ) : null}
        </>
    );
};

export default withTheme(
    // @ts-ignore
    forwardRef((props: BottomWidgetThemedProps, ref) => <BottomWidget {...props} rootRef={ref}/>)
);


