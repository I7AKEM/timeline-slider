// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {Component} from 'react';
import Base, {BaseProps} from './base.tsx';

export default class Reset extends Component<Partial<BaseProps>> {
  static defaultProps = {
    height: '16px',
    predefinedClassName: 'data-ex-icons-reset'
  };

  render() {
    return (
      <Base {...this.props}>
        <path d="M56 32.9v.001c0 12.739-9.788 23.192-22.255 24.248-1.127.095-2.083-.85-2.083-1.982v-5.256c0-.998.784-1.763 1.776-1.878 7.568-.882 13.46-7.332 13.46-15.132 0-8.402-6.834-15.235-15.234-15.235S16.43 24.499 16.429 32.9h7.313L13.463 49.865c-.773 1.278-2.63 1.269-3.393-.015L0 32.9h7.328c0-13.441 10.895-24.336 24.336-24.336S56 19.46 56 32.9z" />
      </Base>
    );
  }
}
