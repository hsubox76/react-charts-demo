import React, { Component } from 'react';
import LineChart from './LineChart';

const initialLineData = [
  [0, 4],
  [1, 10],
  [2, 8],
  [3, 12],
  [4, 5],
  [5, 7]
];

class PageOfLines extends Component {
  constructor() {
    super();
    this.state = {
      lineData: initialLineData
    }
  }
  incrementEarth = () => {
    const newPoint = [this.state.lineData[0], this.state.lineData[1] + 5];
    this.setState({
      lineData: this.state.lineData.map(point => [point[0], point[1] + Math.random() * 5 - 2.5])
    });
  };
  render() {
    return (
      <div className="charts-container">
        <button onClick={this.incrementEarth}>
            new random data
        </button>
        <LineChart type="svg" data={this.state.lineData} height={140} />
        <LineChart type="canvas" data={this.state.lineData} height={140} />
      </div>
    );
  }
}

export default PageOfLines;
