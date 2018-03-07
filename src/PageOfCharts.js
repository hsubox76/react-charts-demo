import React, { Component } from 'react';
import CanvasChart from './CanvasChart';
import DivChart from './DivChart';
import SVGChart from './SVGChart';

const initialData = [
  { name: 'earth', value: 50, color: '#369' },
  { name: 'wind', value: 70, color: '#699' },
  { name: 'fire', value: 90, color: '#693' },
  { name: 'water', value: 30, color: '#66c' },
];

class PageOfCharts extends Component {
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
        <DivChart data={this.state.data} height={140} />
        <SVGChart data={this.state.data} height={140} />
        <CanvasChart data={this.state.data} height={140} />
      </div>
    );
  }
}

export default PageOfCharts;
