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
      <div
        style={{
          position: 'absolute',
          width: this.props.width,
          height: this.props.height,
          top: this.props.y,
          left: this.props.x,
          backgroundColor: this.props.color
        }}
      />
    );
  }
}

export default Bar;
