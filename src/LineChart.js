import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CanvasChart from './canvas/Chart';
import CanvasLine from './canvas/Line';
import SVGChart from './svg/Chart';
import SVGLine from './svg/Line';

const sources = {
  svg: { Line: SVGLine, Chart: SVGChart },
  canvas: { Line: CanvasLine, Chart: CanvasChart }
};

class LineChart extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.array,
    max: PropTypes.number,
    type: PropTypes.string
  };
  static defaultProps = {
    width: 400,
    height: 400,
    data: [],
    max: 100,
    type: 'canvas'
  };
  render() {
    const { Chart, Line } = sources[this.props.type];
    return (
      <div className="chart-container">
        <div className="chart-title">{this.props.type}</div>
        <Chart
          width={this.props.width}
          height={this.props.height}
        >
          {[<Line
              key="line"
              data={this.props.data}
              chartWidth={this.props.width}
              chartHeight={this.props.height}
              color="#e27a3f"
            />]}
        </Chart>
      </div>
    );
  }
}

export default LineChart;
