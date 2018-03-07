import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Line extends Component {
  static propTypes = {
    data: PropTypes.array,
    chartWidth: PropTypes.number,
    chartHeight: PropTypes.number,
    ctx: PropTypes.object,
    color: PropTypes.string
  };
  static defaultProps = {
    color: '#999'
  };
  scaleData = (data) => {
    const xMax = data[data.length - 1][0];
    const yMax = data.reduce((max, cur) => Math.max(cur[1], max), 0);
    return data.map(point => [
      point[0] * this.props.chartWidth / xMax,
      this.props.chartHeight - point[1] * this.props.chartHeight / yMax
    ]);
  }
  render() {
    let pathString = ''
    if (this.props.data.length > 0) {
      const scaledData = this.scaleData(this.props.data);
      pathString = `M${scaledData[0][0]},${scaledData[0][1]}`;
      for (let i = 1; i < scaledData.length; i++) {
        pathString += `L${scaledData[i][0]},${scaledData[i][1]}`
      }
    }
    return (
      <path d={pathString} stroke={this.props.color} strokeWidth={3} fill="none" />
    );
  }
}

export default Line;
