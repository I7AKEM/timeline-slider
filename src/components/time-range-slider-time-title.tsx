// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import styled from 'styled-components';
import {Minus} from '../icons';
import {datetimeFormatter} from "../util";

interface TimeValueWrapperProps {
  isEnlarged?: boolean;
}

const TimeValueWrapper = styled.div<TimeValueWrapperProps>`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.timeTitleFontSize};
  justify-content: ${props => (props.isEnlarged ? 'center' : 'space-between')};

  .horizontal-bar {
    padding: 0 12px;
    color: ${props => props.theme.textColor};
  }

  .time-value {
    display: flex;
    flex-direction: ${props => (props.isEnlarged ? 'row' : 'column')};
    align-items: flex-start;
    max-width: ${props => (!props.isEnlarged ? '40%' : 'auto')};
    span {
      color: ${props => props.theme.textColor};
    }
  }

  .time-value:last-child {
    align-items: flex-end;
    text-align: right;
  }
`;

const TimeValue = ({value}) => (
  // render two lines if not enlarged
  <div className="time-value">
    <span>{value}</span>
  </div>
);

interface TimeTitleProps {
  value: number[];
  isEnlarged?: boolean;
  timezone?: string | null;
  timeFormat: string;
}

const TimeTitle = ({value, isEnlarged, timezone, timeFormat}: TimeTitleProps) => (
    <TimeValueWrapper isEnlarged={isEnlarged} className="time-range-slider__time-title">
        <TimeValue key={0} value={datetimeFormatter(timezone)(timeFormat)(value[0])} />
        {isEnlarged ? (
            <div className="horizontal-bar">
                <Minus height="12px" />
            </div>
        ) : null}
        <TimeValue key={1} value={datetimeFormatter(timezone)(timeFormat)(value[1])} />
    </TimeValueWrapper>
);

export default TimeTitle;
