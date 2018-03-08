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
    const newEarth = Object.assign({}, this.state.data[0], { value: this.state.data[0].value + 10 });
    this.setState({
      data: [newEarth].concat(this.state.data.slice(1))
    });
  };
  render() {
    return (
      <div className="charts-container">
        <button onClick={this.incrementEarth}>
            more earth
        </button>
        <LineChart type="svg" data={this.state.lineData} height={140} />
        <LineChart type="canvas" data={this.state.lineData} height={140} />
      </div>
    );
  }
}

export default PageOfLines;
