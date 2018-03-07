import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bar from './svg/Bar';
import Chart from './svg/Chart';

const BAR_SPACING = 2;

class ChartContainer extends Component {
  static propTypes = {
    width: PropTypes.number
  };
  static defaultProps = {
    width: 400,
    height: 400,
    data: [],
    max: 100,
    barHeight: 30
  };
  render() {
    return (
      <div className="bar-chart-canvas">
        <div className="bar-labels">
          {this.props.data.map((item, index) => (
            <div
              className="bar-label"
              style={{ height: this.props.barHeight }}>
                {item.name}
            </div>
          ))}
        </div>
        <Chart
          width={this.props.width}
          height={this.props.height}
        >
          {this.props.data.map((item, index) => (
            <Bar
              key={'bar_' + index}
              width={this.props.width * item.value / this.props.max}
              height={this.props.barHeight}
              x={0}
              y={index * (this.props.barHeight + BAR_SPACING)}
              color={item.color}
            />
          ))}
        </Chart>
      </div>
    );
  }
}

export default ChartContainer;
