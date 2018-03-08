import React, { Component } from 'react';
import BarChart from './BarChart';

const initialData = [
  { name: 'earth', value: 50, color: '#efc94c' },
  { name: 'wind', value: 70, color: '#45b29d' },
  { name: 'fire', value: 90, color: '#e27a3f' },
  { name: 'water', value: 30, color: '#334d5c' },
];

class PageOfBars extends Component {
  constructor() {
    super();
    this.state = {
      data: initialData
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
        <BarChart type="div" data={this.state.data} height={140} />
        <BarChart type="svg" data={this.state.data} height={140} />
        <BarChart type="canvas" data={this.state.data} height={140} />
      </div>
    );
  }
}

export default PageOfBars;
