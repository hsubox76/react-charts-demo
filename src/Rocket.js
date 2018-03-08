import React, { Component } from 'react';

const initialData = [225, 75, 200];

const rocketPath = `M410.079,272.079c0-143.122-76.558-246.158-111.489-271.183c-1.606-1.157-3.768-1.195-5.412-0.105
c-1.176,0.774-29.146,19.507-57.366,62.845c-25.895,39.78-56.763,108.735-56.753,211.044c-0.124,2.209-2.658,54.22,21.535,117.992
c-15.204,17.165-38.365,51.476-38.345,101.459c0.153,2.151,3.863,52.746,10.777,70.408c0.927,2.362,3.557,3.576,5.938,2.802
l15.472-5.059l6.847,23.706c0.421,1.472,1.53,2.648,2.974,3.174c1.435,0.507,3.041,0.307,4.312-0.545l64.136-43.509l0.144,37.657
c0.01,2.629,2.151,4.762,4.781,4.762l0,0h24.872h4.781c2.64,0,4.781-2.142,4.781-4.781v-35.582l68.448,41.626
c0.756,0.468,1.616,0.697,2.486,0.697c0.517,0,1.033-0.086,1.54-0.248c1.338-0.459,2.409-1.482,2.926-2.802
c0.765-1.97,6.32-16.438,8.836-26.077l17.289,5.948c1.243,0.439,2.61,0.325,3.776-0.287c1.167-0.603,2.027-1.674,2.391-2.945
c1.253-4.466,29.606-108.821-32.971-171.092C402.238,353.428,410.079,313.103,410.079,272.079z M340.895,213.289
c0,25.312-20.521,45.833-45.833,45.833c-25.312,0-45.833-20.521-45.833-45.833s20.521-45.833,45.833-45.833
C320.373,167.446,340.895,187.977,340.895,213.289z M258.188,330.315c0-20.675,16.763-37.428,37.428-37.428
c20.664,0,37.428,16.763,37.428,37.428c0,20.664-16.754,37.428-37.428,37.428C274.942,367.743,258.188,350.979,258.188,330.315z`

const IMG_HEIGHT = 589;

class PageOfLines extends Component {
  constructor() {
    super();
    this.state = {
      data: initialData
    }
  }
  incrementPledged = () => {
    const data = this.state.data;
    this.setState({
      data: [data[0], data[1] + 10, data[2] - 10]
    });
  };
  render() {
    const total = this.state.data.reduce((sum, item) => sum + item);
    const paid = IMG_HEIGHT * this.state.data[0] / total;
    const pledged = IMG_HEIGHT * this.state.data[1] / total;
    return (
      <div className="charts-container">
        <button onClick={this.incrementPledged}>
            more pledged
        </button>
        <div>
          <svg width="589.487px" height="400px" viewBox="200 0 389.487 589.487" >
            <defs>
              <clipPath id="paid">
                <rect x="0" y={IMG_HEIGHT - paid} width="600" height={paid} />
              </clipPath>
              <clipPath id="pledged">
                <rect x="0" y={IMG_HEIGHT - pledged - paid} width="600" height={pledged} />
              </clipPath>
            </defs>
            <g transform={`translate(0,${IMG_HEIGHT - paid - pledged})`}>
              <text alignment-baseline="hanging" font-size="36px" fill="#69a">pledged</text>
            </g>
            <g transform={`translate(0,${IMG_HEIGHT - paid})`}>
              <text alignment-baseline="hanging" font-size="36px" fill="#638">paid</text>
            </g>
            <path d={rocketPath} fill="#bbb" />
            <path d={rocketPath} fill="#638" clip-path="url(#paid)"/>
            <path d={rocketPath} clip-path="url(#pledged)" fill="#69a" />
          </svg>
        </div>
      </div>
    );
  }
}

export default PageOfLines;
