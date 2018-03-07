import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bar extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string
  };
  static defaultProps = {
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    color: '#999'
  };
  render() {
    return (
      <rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill={this.props.color}
      />
    );
  }
}

export default Bar;
