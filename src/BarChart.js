import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DivBar from './div/Bar';
import DivChart from './div/Chart';
import CanvasBar from './canvas/Bar';
import CanvasChart from './canvas/Chart';
import SVGBar from './svg/Bar';
import SVGChart from './svg/Chart';

const BAR_SPACING = 2;

const sources = {
  div: { Bar: DivBar, Chart: DivChart },
  svg: { Bar: SVGBar, Chart: SVGChart },
  canvas: { Bar: CanvasBar, Chart: CanvasChart }
};

class BarChart extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.array,
    max: PropTypes.number,
    barHeight: PropTypes.number,
    type: PropTypes.string
  };
  static defaultProps = {
    width: 400,
    height: 400,
    data: [],
    max: 100,
    barHeight: 30,
    type: 'div'
  };
  render() {
    const { Chart, Bar } = sources[this.props.type];
    return (
      <div className="chart-container">
        <div className="chart-title">{this.props.type}</div>
        <div className="bar-labels">
          {this.props.data.map((item, index) => (
            <div
              key={index}
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

export default BarChart;
